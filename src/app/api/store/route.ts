import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();

    const [
      products,
      laminates,
      agriculturalProducts,
      collections,
      categories,
      sheetCategories,
      sheetSubcategories,
      contentDoc,
      media,
    ] = await Promise.all([
      db.collection('products').find({}).toArray(),
      db.collection('laminates').find({}).toArray(),
      db.collection('agriculturalProducts').find({}).toArray(),
      db.collection('collections').find({}).sort({ order: 1 }).toArray(),
      db.collection('categories').find({}).sort({ order: 1 }).toArray(),
      db.collection('sheetCategories').find({}).sort({ order: 1 }).toArray(),
      db.collection('sheetSubcategories').find({}).sort({ order: 1 }).toArray(),
      db.collection('siteContent').findOne({ _id: 'current' as any }),
      db.collection('media').find({}).sort({ addedAt: -1 }).toArray(),
    ]);

    // Format documents with string _id (and alias id)
    const clean = (items: any[]) =>
      items.map((doc: any) => {
        const strId = doc._id ? doc._id.toString() : '';
        const { id, ...rest } = doc;
        return {
          ...rest,
          _id: strId,
          id: id || strId,
        };
      });

    let content = null;
    if (contentDoc) {
      const { _id, ...restContent } = contentDoc;
      content = restContent;
    }

    return NextResponse.json({
      success: true,
      data: {
        products: clean(products),
        laminates: clean(laminates),
        agriculturalProducts: clean(agriculturalProducts),
        collections: clean(collections),
        categories: clean(categories),
        sheetCategories: clean(sheetCategories),
        sheetSubcategories: clean(sheetSubcategories),
        content,
        media: clean(media),
      },
    });
  } catch (error: any) {
    console.error('Error fetching store data from MongoDB:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch store data' },
      { status: 500 }
    );
  }
}
