import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({}, { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error('/api/me error:', error);
    const isDbUnavailable =
      error?.name === 'MongooseServerSelectionError' ||
      String(error?.message || '').includes('ECONNREFUSED');
    if (isDbUnavailable) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    return NextResponse.json({}, { status: 500 });
  }
}
