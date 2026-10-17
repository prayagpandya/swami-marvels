import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function removeIdFieldFromMongo() {
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
    'media',
    'enquiries',
  ];

  console.log('\n--- REMOVING "id" FIELD ACROSS ALL COLLECTIONS ---');
  for (const colName of collections) {
    const col = db.collection(colName);

    // 1. Drop index on 'id' if exists
    try {
      await col.dropIndex('id_1');
      console.log(`Dropped index 'id_1' from collection: ${colName}`);
    } catch (e) {
      // index might not exist
    }

    // 2. Unset the 'id' field from all documents
    const result = await col.updateMany({}, { $unset: { id: "" } });
    console.log(`Collection [${colName}]: unset 'id' on ${result.modifiedCount} documents.`);

    // 3. Verify that 'id' is completely gone
    const sampleWithId = await col.findOne({ id: { $exists: true } });
    if (sampleWithId) {
      console.warn(`WARNING: Collection [${colName}] still has documents with 'id'!`);
    } else {
      console.log(`✓ Collection [${colName}] successfully verified: 0 documents have 'id' field.`);
    }
  }

  // Also verify sample document from products
  const sampleDoc = await db.collection('products').findOne({});
  console.log('\nSample document structure from "products":');
  console.log(JSON.stringify({
    _id: sampleDoc?._id,
    id: (sampleDoc as any)?.id,
    name: sampleDoc?.name,
    slug: sampleDoc?.slug,
    hasIdField: 'id' in (sampleDoc || {}),
  }, null, 2));

  await client.close();
  console.log('\nAll "id" fields have been removed from MongoDB Atlas successfully!');
}

removeIdFieldFromMongo().catch((err) => {
  console.error('Error removing id fields:', err);
  process.exit(1);
});
