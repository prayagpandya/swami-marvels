import { NextRequest, NextResponse } from 'next/server';
import { getDb, toMongoFilter } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const collections = await db.collection('collections').find({}).sort({ order: 1 }).toArray();
    const formatted = collections.map((c: any) => {
      const strId = c._id ? c._id.toString() : '';
      const { id, ...rest } = c;
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
      return NextResponse.json({ success: false, error: 'Collection Name is required.' }, { status: 400 });
    }

    const db = await getDb();
    const { id, _id, ...cleanBody } = body;
    const item = {
      ...cleanBody,
      updatedAt: new Date(),
    };

    if (id || _id) {
      const targetId = _id || id;
      await db.collection('collections').updateOne(toMongoFilter(targetId), { $set: item }, { upsert: true });
      return NextResponse.json({ success: true, data: { ...item, _id: targetId, id: targetId } });
    } else {
      const result = await db.collection('collections').insertOne(item);
      const newId = result.insertedId.toString();
      return NextResponse.json({ success: true, data: { ...item, _id: newId, id: newId } });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
