import { NextRequest, NextResponse } from 'next/server';
import { getDb, toMongoFilter } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const media = await db.collection('media').find({}).sort({ addedAt: -1 }).toArray();
    const formatted = media.map((m: any) => {
      const strId = m._id ? m._id.toString() : '';
      const { id, ...rest } = m;
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
    const db = await getDb();

    const { id, _id, ...cleanBody } = body;
    const asset = {
      name: cleanBody.name || 'Untitled Asset',
      url: cleanBody.url,
      group: cleanBody.group || 'Product',
      addedAt: cleanBody.addedAt || new Date().toISOString(),
    };

    const result = await db.collection('media').insertOne(asset);
    const newId = result.insertedId.toString();
    return NextResponse.json({ success: true, data: { ...asset, _id: newId, id: newId } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
