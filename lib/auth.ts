import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import { connectDB } from '@/lib/mongodb';
import { DatabaseUnavailableError, isDatabaseConnectionError } from '@/lib/dbErrors';
import {
  getRequiredEnv,
  isMissingEnvironmentVariableError,
} from '@/lib/serverEnv';

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
  const secret = getRequiredEnv('JWT_SECRET');

  const token = request.cookies.get('token')?.value;
  if (!token) return null;

  let decoded: TokenPayload;
  try {
    decoded = jwt.verify(token, secret) as TokenPayload;
  } catch {
    return null;
  }

  if (!decoded.id) return null;

  let user: {
    _id: unknown;
    role: AppRole;
    isActive: boolean;
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;

  try {
    await connectDB();
    user = (await User.findById(decoded.id)
      .select('_id role isActive firstName lastName email')
      .lean()) as typeof user;
  } catch (error) {
    if (isDatabaseConnectionError(error)) {
      throw new DatabaseUnavailableError();
    }
    throw error;
  }

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
  let user: AuthUser | null;
  try {
    user = await getAuthUser(request);
  } catch (error) {
    if (error instanceof DatabaseUnavailableError) {
      return {
        response: NextResponse.json({ error: 'Database unavailable' }, { status: 503 }),
      };
    }
    if (isMissingEnvironmentVariableError(error)) {
      return {
        response: NextResponse.json({ error: error.message }, { status: 500 }),
      };
    }
    throw error;
  }

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
