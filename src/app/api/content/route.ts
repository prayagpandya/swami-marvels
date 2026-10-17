import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const doc = await db.collection('siteContent').findOne({ _id: 'current' as any });
    if (!doc) {
      return NextResponse.json({ success: false, error: 'Site content not found' }, { status: 404 });
    }
    const { _id, ...content } = doc;
    return NextResponse.json({ success: true, data: content });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDb();

    const updateDoc = {
      ...body,
      _id: 'current',
      updatedAt: new Date(),
    };

    await db.collection('siteContent').updateOne(
      { _id: 'current' as any },
      { $set: updateDoc },
      { upsert: true }
    );

    return NextResponse.json({ success: true, data: body });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
