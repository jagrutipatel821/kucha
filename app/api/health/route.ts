import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { isDatabaseConnectionError } from '@/lib/dbErrors';
import {
  getRequiredEnv,
  isMissingEnvironmentVariableError,
} from '@/lib/serverEnv';

const REQUIRED_ENV_VARS = [
  'MONGODB_URI',
  'JWT_SECRET',
  'ADMIN_REGISTRATION_KEY',
  'CONTACT_EMAIL',
  'CONTACT_EMAIL_PASS',
] as const;

export async function GET() {
  try {
    for (const envName of REQUIRED_ENV_VARS) {
      getRequiredEnv(envName);
    }

    const mongoose = await connectDB();

    return NextResponse.json(
      {
        ok: true,
        env: 'present',
        db: {
          connected: mongoose.connection.readyState === 1,
          name: mongoose.connection.db?.databaseName || null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('/api/health error:', error);

    if (isMissingEnvironmentVariableError(error)) {
      return NextResponse.json(
        {
          ok: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    if (isDatabaseConnectionError(error)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Database unavailable',
        },
        { status: 503 }
      );
    }

    const message = error instanceof Error ? error.message : 'Unknown server error';
    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
