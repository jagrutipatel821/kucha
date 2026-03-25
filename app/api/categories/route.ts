import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import { requireAdmin } from '@/lib/auth';
import { isDatabaseConnectionError } from '@/lib/dbErrors';

// GET - Fetch all categories
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query: any = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    const categories = await Category.find(query).sort({ name: 1 });

    return NextResponse.json({ categories }, { status: 200 });

  } catch (error) {
    console.error('Error fetching categories:', error);
    if (isDatabaseConnectionError(error)) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - Create new category
export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (auth.response) return auth.response;

    await connectDB();

    const categoryData = await request.json();

    // Validate required fields
    if (!categoryData.name || !categoryData.description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name: categoryData.name });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 400 }
      );
    }

    // Create category
    const category = new Category(categoryData);
    await category.save();

    return NextResponse.json(
      { message: 'Category created successfully', category },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating category:', error);
    if (isDatabaseConnectionError(error)) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    const err = error as { name?: string; code?: number };
    if (err?.name === 'ValidationError') {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }
    if (err?.code === 11000) {
      return NextResponse.json({ error: 'Category with this name already exists' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

