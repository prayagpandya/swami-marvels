import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function run() {
  const client = new MongoClient(process.env.MONGO_URI!);
  await client.connect();
  const db = client.db('swami_marvels_db');

  for (const col of ['products', 'laminates', 'agriculturalProducts']) {
    const total = await db.collection(col).countDocuments();
    const allDocs = await db.collection(col).find({}).toArray();
    let withCloudinary = 0;
    let withoutImages = 0;
    let withLocal = 0;
    for (const doc of allDocs) {
      const imgs = (doc as any).images || [];
      if (!imgs || imgs.length === 0) {
        withoutImages++;
      } else if (imgs.some((img: string) => typeof img === 'string' && img.includes('cloudinary.com'))) {
        withCloudinary++;
      } else {
        withLocal++;
      }
    }
    console.log(`${col} -> Total: ${total}, With Cloudinary: ${withCloudinary}, Local: ${withLocal}, Empty: ${withoutImages}`);
  }

  // Also check sheetCategories, collections, categories
  for (const col of ['sheetCategories', 'collections', 'categories']) {
    const total = await db.collection(col).countDocuments();
    const allDocs = await db.collection(col).find({}).toArray();
    let withCloudinary = 0;
    for (const doc of allDocs) {
      const img = (doc as any).image;
      if (typeof img === 'string' && img.includes('cloudinary.com')) {
        withCloudinary++;
      }
    }
    console.log(`${col} -> Total: ${total}, With Cloudinary: ${withCloudinary}`);
  }

  await client.close();
}

run().catch(console.error);
