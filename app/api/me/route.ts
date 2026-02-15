import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({}, { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('/api/me error:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
