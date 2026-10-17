import { NextRequest, NextResponse } from 'next/server';
import { getDb, toMongoFilter } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const laminates = await db.collection('laminates').find({}).toArray();
    const formatted = laminates.map((l: any) => {
      const strId = l._id ? l._id.toString() : '';
      const { id, ...rest } = l;
      return { ...rest, _id: strId, id: strId };
    });
    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: 'Laminate Name is required.' }, { status: 400 });
    }

    const db = await getDb();
    const { id, _id, ...cleanBody } = body;
    const laminate = {
      ...cleanBody,
      updatedAt: new Date(),
    };

    if (id || _id) {
      const targetId = _id || id;
      await db.collection('laminates').updateOne(toMongoFilter(targetId), { $set: laminate }, { upsert: true });
      return NextResponse.json({ success: true, data: { ...laminate, _id: targetId, id: targetId } });
    } else {
      const result = await db.collection('laminates').insertOne(laminate);
      const newId = result.insertedId.toString();
      return NextResponse.json({ success: true, data: { ...laminate, _id: newId, id: newId } });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
