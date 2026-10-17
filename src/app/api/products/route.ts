import { NextRequest, NextResponse } from 'next/server';
import { getDb, toMongoFilter } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const division = searchParams.get('division');

    const filter: any = {};
    if (category && category !== 'all') filter.category = category;
    if (division && division !== 'all') filter.division = division;

    const products = await db.collection('products').find(filter).toArray();
    const formatted = products.map((p: any) => {
      const strId = p._id ? p._id.toString() : '';
      const { id, ...rest } = p;
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
      return NextResponse.json({ success: false, error: 'Product Name is required.' }, { status: 400 });
    }

    const db = await getDb();
    const { id, _id, ...cleanBody } = body;
    const product = {
      ...cleanBody,
      updatedAt: new Date(),
    };

    if (id || _id) {
      const targetId = _id || id;
      const filter = toMongoFilter(targetId);
      await db.collection('products').updateOne(filter, { $set: product }, { upsert: true });
      return NextResponse.json({ success: true, data: { ...product, _id: targetId, id: targetId } });
    } else {
      const result = await db.collection('products').insertOne(product);
      const newId = result.insertedId.toString();
      return NextResponse.json({ success: true, data: { ...product, _id: newId, id: newId } });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
