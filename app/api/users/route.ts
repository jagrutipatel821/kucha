import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (auth.response) return auth.response;

    await connectDB();
    const users = await User.find({})
      .select('_id firstName lastName email role isActive')
      .sort({ createdAt: -1 })
      .lean();

    const normalizedUsers = users.map((u) => ({
      _id: String(u._id),
      name: `${u.firstName} ${u.lastName}`.trim(),
      email: u.email,
      role: u.role,
      status: u.isActive ? 'approved' : 'blocked',
    }));

    return NextResponse.json({ users: normalizedUsers }, { status: 200 });
  } catch (error) {
    console.error('/api/users GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
