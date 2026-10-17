import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  width?: number;
  height?: number;
  bytes: number;
}

/**
 * Upload a Buffer (e.g. from Next.js multipart form upload) to Cloudinary
 */
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string;
    public_id?: string;
    resource_type?: 'auto' | 'image' | 'video' | 'raw';
  } = {}
): Promise<UploadResult> {
  const { folder = 'swami-marvels', public_id, resource_type = 'auto' } = options;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id,
        resource_type,
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error('Upload to Cloudinary failed without response.'));
        } else {
          resolve(result as unknown as UploadResult);
        }
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Upload a file path directly from local disk (used during migration/seeding)
 */
export async function uploadFilePathToCloudinary(
  filePath: string,
  options: {
    folder?: string;
    public_id?: string;
    resource_type?: 'auto' | 'image' | 'video' | 'raw';
  } = {}
): Promise<UploadApiResponse> {
  const { folder = 'swami-marvels', public_id, resource_type = 'auto' } = options;

  return cloudinary.uploader.upload(filePath, {
    folder,
    public_id,
    resource_type,
    overwrite: true,
  });
}

export { cloudinary };
export default cloudinary;
