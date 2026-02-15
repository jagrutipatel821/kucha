import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { firstName, lastName, email, password } = await req.json();
    const normalizedFirstName = String(firstName || '').trim();
    const normalizedLastName = String(lastName || '').trim();
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPassword = String(password || '');

    if (
      !normalizedFirstName ||
      !normalizedLastName ||
      !normalizedEmail ||
      !normalizedPassword
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (normalizedPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(normalizedPassword, 10);

    await User.create({
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'Registration successful' }, { status: 201 });
  } catch (error: any) {
    console.error('REGISTER ERROR:', error);

    if (error?.code === 11000) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
