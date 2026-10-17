import { NextRequest, NextResponse } from 'next/server';
import { getDb, toMongoFilter } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDb();

    const result = await db.collection('media').deleteOne(toMongoFilter(id));
    return NextResponse.json({ success: true, deletedCount: result.deletedCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
