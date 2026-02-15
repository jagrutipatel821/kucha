import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import { connectDB } from '@/lib/mongodb';

type AppRole = 'user' | 'admin';

type TokenPayload = JwtPayload & {
  id?: string;
  role?: AppRole;
};

export type AuthUser = {
  id: string;
  role: AppRole;
  firstName: string;
  lastName: string;
  email: string;
};

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is missing in environment');
  }

  const token = request.cookies.get('token')?.value;
  if (!token) return null;

  let decoded: TokenPayload;
  try {
    decoded = jwt.verify(token, secret) as TokenPayload;
  } catch {
    return null;
  }

  if (!decoded.id) return null;

  await connectDB();
  const user = (await User.findById(decoded.id)
    .select('_id role isActive firstName lastName email')
    .lean()) as {
      _id: unknown;
      role: AppRole;
      isActive: boolean;
      firstName?: string;
      lastName?: string;
      email?: string;
    } | null;
  if (!user || !user.isActive) return null;

  return {
    id: String(user._id),
    role: user.role as AppRole,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
  };
}

export async function requireAdmin(
  request: NextRequest
): Promise<{ user?: AuthUser; response?: NextResponse }> {
  const user = await getAuthUser(request);
  if (!user) {
    return {
      response: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }),
    };
  }

  if (user.role !== 'admin') {
    return {
      response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    };
  }

  return { user };
}
