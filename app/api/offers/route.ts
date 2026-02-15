import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Offer from '@/models/Offer';
import { requireAdmin } from '@/lib/auth';

/* =====================
   GET ACTIVE OFFER
===================== */
export async function GET() {
  try {
    await connectDB();

    const today = new Date();

    const offer = await Offer.findOne({
      active: true,
      startDate: { $lte: today },
      endDate: { $gte: today },
    }).lean();

    return NextResponse.json({ offer });
  } catch (error) {
    console.error('GET /api/offers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offer' },
      { status: 500 }
    );
  }
}

/* =====================
   ADD OFFER (ADMIN)
===================== */
export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (auth.response) return auth.response;

    await connectDB();

    const body = await req.json();

    // Convert date strings to Date objects
    const offerData = {
      title: body.title,
      subtitle: body.subtitle || undefined,
      description: body.description,
      image: body.image || undefined,
      bgColor: body.bgColor || 'bg-black',
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      active: true,
    };

    // Validate required fields
    if (!offerData.title || !offerData.description || !offerData.startDate || !offerData.endDate) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, startDate, and endDate are required' },
        { status: 400 }
      );
    }

    // Validate dates
    if (isNaN(offerData.startDate.getTime()) || isNaN(offerData.endDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    // Validate end date is after start date
    if (offerData.endDate < offerData.startDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Deactivate all existing offers before creating a new one
    await Offer.updateMany({ active: true }, { active: false });

    const offer = await Offer.create(offerData);

    return NextResponse.json({ offer }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/offers error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create offer' },
      { status: 500 }
    );
  }
}
