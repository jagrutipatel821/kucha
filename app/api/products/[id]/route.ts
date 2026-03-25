import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { requireAdmin } from '@/lib/auth';
import { isDatabaseConnectionError, isMongooseCastError } from '@/lib/dbErrors';

// GET single product
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
    }
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    if (isMongooseCastError(error)) {
      return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
    }
    if (isDatabaseConnectionError(error)) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT - Update
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin(request);
    if (auth.response) return auth.response;

    await connectDB();
    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
    }
    const updateData = await request.json();
    const updated = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product: updated });
  } catch (error) {
    if (isMongooseCastError(error)) {
      return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
    }
    if (isDatabaseConnectionError(error)) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin(request);
    if (auth.response) return auth.response;

    await connectDB();
    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
    }
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await Product.findByIdAndDelete(id);
    await Category.findOneAndUpdate({ name: product.category }, { $inc: { productCount: -1 } });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    if (isMongooseCastError(error)) {
      return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
    }
    if (isDatabaseConnectionError(error)) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
