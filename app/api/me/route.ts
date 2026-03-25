import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { DatabaseUnavailableError, isDatabaseConnectionError } from '@/lib/dbErrors';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    // 200 + null when anonymous — avoids noisy 401s from navbar / session polls (not an auth failure)
    if (!user) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('/api/me error:', error);
    if (error instanceof DatabaseUnavailableError || isDatabaseConnectionError(error)) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    return NextResponse.json({}, { status: 500 });
  }
}
