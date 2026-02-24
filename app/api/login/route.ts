import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import {
  checkLoginLock,
  checkRequestRateLimit,
  clearLoginFailures,
  getClientIp,
  recordLoginFailure,
} from '@/lib/authRateLimit';

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_LOGIN_KEY = process.env.ADMIN_REGISTRATION_KEY;

export async function POST(req: Request) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json(
        { error: 'JWT secret is not configured on server' },
        { status: 500 }
      );
    }

    const ip = getClientIp(req);
    const ipRate = checkRequestRateLimit(ip);
    if (!ipRate.allowed) {
      return NextResponse.json(
        {
          error: 'Too many login attempts. Please try again shortly.',
          retryAfterSec: ipRate.retryAfterSec,
        },
        { status: 429 }
      );
    }

    await connectDB();

    const { email, password, adminKey } = await req.json();
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPassword = String(password || '');
    const lockKey = `${ip}:${normalizedEmail || 'unknown-email'}`;

    if (!normalizedEmail || !normalizedPassword) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    const lockStatus = checkLoginLock(lockKey);
    if (lockStatus.blocked) {
      return NextResponse.json(
        {
          error: 'Too many failed attempts. Please try again later.',
          retryAfterSec: lockStatus.retryAfterSec,
        },
        { status: 429 }
      );
    }

    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) {
      recordLoginFailure(lockKey);
      return NextResponse.json({ error: 'Email does not exist' }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: 'Account disabled' }, { status: 403 });
    }

    if (!user.password || typeof user.password !== 'string') {
      recordLoginFailure(lockKey);
      return NextResponse.json(
        { error: 'Account credentials are invalid. Please reset password.' },
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(normalizedPassword, user.password);
    if (!match) {
      recordLoginFailure(lockKey);
      return NextResponse.json({ error: 'Password is wrong' }, { status: 401 });
    }

    if (user.role === 'admin') {
      const providedAdminKey = String(adminKey || '').trim();
      const expectedAdminKey = String(ADMIN_LOGIN_KEY || '').trim();
      if (!expectedAdminKey) {
        return NextResponse.json(
          { error: 'Admin login key is not configured on server' },
          { status: 500 }
        );
      }
      if (!providedAdminKey || providedAdminKey !== expectedAdminKey) {
        recordLoginFailure(lockKey);
        return NextResponse.json({ error: 'Invalid admin secret key' }, { status: 401 });
      }
    }

    clearLoginFailures(lockKey);

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET as string, {
      expiresIn: '7d',
    });

    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      message: 'Login successful',
      role: user.role,
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
