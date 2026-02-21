import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { requireAdmin } from '@/lib/auth';

/* =========================
   GET – Fetch all products
========================= */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    const query: Record<string, any> = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

/* =========================
   POST – Create new product
========================= */
export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (auth.response) return auth.response;

    await connectDB();

    const formData = await request.formData();

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const brand = formData.get('brand') as string;
    const stock = Number(formData.get('stock')) || 0;
    const featured = formData.get('featured') === 'true';
    const status = (formData.get('status') as string) || 'active';
    const imageFile = formData.get('image') as File | null;

    let imageUrl = '';
    if (imageFile) {
      imageUrl = `/uploads/${imageFile.name}`;
    }

    const product = await Product.create({
      name,
      description,
      category,
      brand,
      stock,
      image: imageUrl,
      featured,
      status,
    });

    await Category.findOneAndUpdate(
      { name: category },
      { $inc: { productCount: 1 } }
    );

    return NextResponse.json({ product }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
