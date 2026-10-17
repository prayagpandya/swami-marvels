import { NextRequest, NextResponse } from 'next/server';
import { getDb, toMongoFilter } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const subcategories = await db.collection('sheetSubcategories').find({}).sort({ order: 1 }).toArray();
    const formatted = subcategories.map((sc: any) => {
      const strId = sc._id ? sc._id.toString() : '';
      const { id, ...rest } = sc;
      return { ...rest, _id: strId, id: id || strId };
    });
    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.categorySlug) {
      return NextResponse.json({ success: false, error: 'Subcategory Name and Parent Category are required.' }, { status: 400 });
    }

    const db = await getDb();
    const { id, _id, ...cleanBody } = body;
    const targetId = _id || id;
    const item = {
      ...cleanBody,
      id: targetId,
      updatedAt: new Date(),
    };

    if (targetId) {
      await db.collection('sheetSubcategories').updateOne(toMongoFilter(targetId), { $set: item }, { upsert: true });
      return NextResponse.json({ success: true, data: { ...item, _id: targetId, id: targetId } });
    } else {
      const result = await db.collection('sheetSubcategories').insertOne(item);
      const newId = result.insertedId.toString();
      return NextResponse.json({ success: true, data: { ...item, _id: newId, id: newId } });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
