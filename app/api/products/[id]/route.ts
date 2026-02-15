import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { requireAdmin } from '@/lib/auth';

// GET single product
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT - Update
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request);
    if (auth.response) return auth.response;

    await connectDB();
    const updateData = await request.json();
    const updated = await Product.findByIdAndUpdate(params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAdmin(request);
    if (auth.response) return auth.response;

    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await Product.findByIdAndDelete(params.id);
    await Category.findOneAndUpdate({ name: product.category }, { $inc: { productCount: -1 } });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
