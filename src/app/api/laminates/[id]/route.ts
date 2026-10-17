import { NextRequest, NextResponse } from 'next/server';
import { getDb, toMongoFilter } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { id: _, _id: __, ...cleanBody } = body;

    const db = await getDb();
    const laminate = {
      ...cleanBody,
      updatedAt: new Date(),
    };

    await db.collection('laminates').updateOne(
      toMongoFilter(id),
      { $set: laminate },
      { upsert: true }
    );

    return NextResponse.json({ success: true, data: { ...laminate, _id: id, id } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDb();

    const result = await db.collection('laminates').deleteOne(toMongoFilter(id));
    return NextResponse.json({ success: true, deletedCount: result.deletedCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
