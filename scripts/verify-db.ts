import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function verifyDatabase() {
  console.log('Connecting to MongoDB Atlas...');
  const client = new MongoClient(MONGO_URI!);
  await client.connect();

  const db = client.db('swami_marvels_db');

  const collections = [
    'products',
    'laminates',
    'agriculturalProducts',
    'collections',
    'categories',
    'sheetCategories',
    'siteContent',
    'media',
  ];

  console.log('\n--- VERIFYING COLLECTIONS ---');
  for (const name of collections) {
    const count = await db.collection(name).countDocuments();
    const sample = await db.collection(name).findOne({});
    let sampleImg =
      sample?.images?.[0] ||
      sample?.image ||
      sample?.url ||
      (name === 'siteContent' ? sample?.brand?.mark : 'N/A');
    console.log(
      `[Collection: ${name.padEnd(20)}] Count: ${String(count).padStart(3)} | Sample Asset: ${
        sampleImg ? sampleImg.slice(0, 65) + '...' : 'None'
      }`
    );
  }

  // Verify Cloudinary URLs specifically
  const sampleProduct = await db
    .collection('products')
    .findOne({ 'images.0': { $regex: /cloudinary/ } });
  console.log('\n--- VERIFYING CLOUDINARY INTEGRATION ---');
  if (sampleProduct) {
    console.log(
      '✓ Found product with Cloudinary image:',
      sampleProduct.name,
      '\n  ->',
      sampleProduct.images[0]
    );
  } else {
    console.error('✗ No Cloudinary image found on products');
  }

  const sampleLaminate = await db
    .collection('laminates')
    .findOne({ 'images.0': { $regex: /cloudinary/ } });
  if (sampleLaminate) {
    console.log(
      '✓ Found laminate with Cloudinary image:',
      sampleLaminate.name,
      '\n  ->',
      sampleLaminate.images[0]
    );
  }

  const sampleAgri = await db
    .collection('agriculturalProducts')
    .findOne({ 'images.0': { $regex: /cloudinary/ } });
  if (sampleAgri) {
    console.log(
      '✓ Found agri product with Cloudinary image:',
      sampleAgri.name,
      '\n  ->',
      sampleAgri.images[0]
    );
  }

  await client.close();
  console.log('\nDatabase verification completed successfully!');
}

verifyDatabase().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
