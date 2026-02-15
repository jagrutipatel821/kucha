import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await connectDB();

    const query = authUser.role === 'admin' ? {} : { userId: authUser.id };
    const orders = await Order.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('/api/orders GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
