import { NextRequest, NextResponse } from 'next/server';
import { uploadBufferToCloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize filename for public_id
    const originalName = file.name || 'upload';
    const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
    const cleanId = `${baseName.replace(/[^a-zA-Z0-9_-]/g, '_')}_${Date.now()}`;

    const isVideo = file.type.startsWith('video/');
    const isPdf = file.type === 'application/pdf';
    const resource_type = isVideo ? 'video' : isPdf ? 'raw' : 'image';

    const result = await uploadBufferToCloudinary(buffer, {
      folder: 'swami-marvels',
      public_id: cleanId,
      resource_type: resource_type,
    });

    return NextResponse.json({
      success: true,
      data: {
        url: result.secure_url,
        secure_url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        resource_type: result.resource_type,
        bytes: result.bytes,
        name: file.name,
      },
    });
  } catch (error: any) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to upload media to Cloudinary' },
      { status: 500 }
    );
  }
}
