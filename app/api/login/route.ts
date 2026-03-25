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
import { isDatabaseConnectionError } from '@/lib/dbErrors';
import {
  getRequiredEnv,
  isMissingEnvironmentVariableError,
} from '@/lib/serverEnv';

export async function POST(req: Request) {
  try {
    const jwtSecret = getRequiredEnv('JWT_SECRET');

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

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    const { email, password, adminKey } = body;
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
      const expectedAdminKey = getRequiredEnv('ADMIN_REGISTRATION_KEY');
      if (!providedAdminKey || providedAdminKey !== expectedAdminKey) {
        recordLoginFailure(lockKey);
        return NextResponse.json({ error: 'Invalid admin secret key' }, { status: 401 });
      }
    }

    clearLoginFailures(lockKey);

    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
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
    if (isMissingEnvironmentVariableError(error)) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (isDatabaseConnectionError(error)) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
