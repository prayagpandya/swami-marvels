import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { MongoClient } from 'mongodb';

// ES module path resolution & require hook
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const require = createRequire(import.meta.url);
for (const ext of ['.webp', '.jpg', '.jpeg', '.png', '.svg', '.gif', '.ico']) {
  require.extensions[ext] = (module: any, filename: string) => {
    const base = path.basename(filename);
    module.exports = { src: `/${base}`, default: { src: `/${base}` } };
  };
}

// Load environment variables from .env
dotenv.config({ path: path.join(projectRoot, '.env') });

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const MONGO_URI = process.env.MONGO_URI;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error('Missing Cloudinary credentials in .env');
  process.exit(1);
}

if (!MONGO_URI) {
  console.error('Missing MONGO_URI in .env');
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const MAP_PATH = path.join(projectRoot, 'src', 'data', 'cloudinaryMap.json');

// Load existing map if present
let urlMap: Record<string, string> = {};
if (fs.existsSync(MAP_PATH)) {
  try {
    urlMap = JSON.parse(fs.readFileSync(MAP_PATH, 'utf-8'));
    console.log(`Loaded existing Cloudinary map with ${Object.keys(urlMap).length / 2} items.`);
  } catch (err) {
    console.warn('Could not parse existing map file, starting fresh.');
  }
}

function saveMap() {
  fs.mkdirSync(path.dirname(MAP_PATH), { recursive: true });
  fs.writeFileSync(MAP_PATH, JSON.stringify(urlMap, null, 2), 'utf-8');
}

// Media file extensions to scan
const ALLOWED_EXTENSIONS = new Set([
  '.webp', '.jpg', '.jpeg', '.png', '.avif', '.gif', '.svg', '.mp4', '.webm', '.mov', '.pdf', '.ico'
]);

async function uploadFileToCloudinary(filePath: string, relativeName: string): Promise<string> {
  const cleanId = relativeName
    .replace(/\.[^/.]+$/, '') // remove extension
    .replace(/[^a-zA-Z0-9_-]/g, '_'); // sanitize public_id

  const ext = path.extname(filePath).toLowerCase();
  const isVideo = ['.mp4', '.webm', '.mov'].includes(ext);
  const isRaw = ['.pdf'].includes(ext);
  const resourceType = isVideo ? 'video' : isRaw ? 'raw' : 'image';

  console.log(`Uploading [${resourceType}] ${relativeName} -> swami-marvels/${cleanId}...`);

  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'swami-marvels',
    public_id: cleanId,
    resource_type: resourceType,
    overwrite: true,
  });

  return result.secure_url;
}

async function uploadAllStaticAssets() {
  const publicDir = path.join(projectRoot, 'public');
  if (!fs.existsSync(publicDir)) {
    console.warn('public directory not found at', publicDir);
    return;
  }

  const files = fs.readdirSync(publicDir);
  const mediaFiles = files.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ALLOWED_EXTENSIONS.has(ext);
  });

  console.log(`Found ${mediaFiles.length} media assets in public/ directory.`);

  let uploadedCount = 0;
  let skippedCount = 0;

  for (const filename of mediaFiles) {
    const key = `/${filename}`;
    if (urlMap[key] || urlMap[filename]) {
      skippedCount++;
      continue;
    }

    const fullPath = path.join(publicDir, filename);
    try {
      const secureUrl = await uploadFileToCloudinary(fullPath, filename);
      urlMap[key] = secureUrl;
      urlMap[filename] = secureUrl;
      uploadedCount++;
      if (uploadedCount % 10 === 0) {
        saveMap();
      }
    } catch (err: any) {
      console.error(`Failed to upload ${filename}:`, err?.message || err);
    }
  }

  saveMap();
  console.log(`Cloudinary asset sync complete: ${uploadedCount} uploaded, ${skippedCount} already cached.`);
}

function mapUrl(originalUrl: string | undefined): string {
  if (!originalUrl) return '';
  if (originalUrl.startsWith('http://') || originalUrl.startsWith('https://res.cloudinary.com')) {
    return originalUrl;
  }

  // 1. Direct match
  if (urlMap[originalUrl]) return urlMap[originalUrl];

  // 2. Add or strip leading slash
  const leading = originalUrl.startsWith('/') ? originalUrl : `/${originalUrl}`;
  if (urlMap[leading]) return urlMap[leading];

  const stripped = originalUrl.replace(/^\//, '');
  if (urlMap[stripped]) return urlMap[stripped];

  // 3. Basename match (e.g. if original was full path)
  const base = path.basename(originalUrl);
  if (urlMap[base]) return urlMap[base];
  if (urlMap[`/${base}`]) return urlMap[`/${base}`];

  // Return original as fallback
  return originalUrl;
}

function mapUrlList(urls: string[] | undefined): string[] {
  if (!urls || !Array.isArray(urls)) return [];
  return urls.map((u) => mapUrl(u));
}

async function seedMongoDB() {
  console.log('\nConnecting to MongoDB Atlas...');
  const client = new MongoClient(MONGO_URI!);
  await client.connect();
  console.log('Connected to MongoDB Atlas successfully.');

  const db = client.db('swami_marvels_db');

  // Dynamic import datasets from src/data
  console.log('Importing catalog datasets...');
  const { catalogProducts } = await import('../src/data/catalogProducts');
  const { laminates } = await import('../src/data/laminates');
  const { agriculturalProducts } = await import('../src/data/agriculturalProducts');
  const { collections } = await import('../src/data/collections');
  const { categories } = await import('../src/data/categories');
  const { siteContent } = await import('../src/data/siteContent');

  const defaultSheetCategories = [
    {
      id: 'sc-1',
      slug: 'acrylic-sheets',
      name: 'Acrylic Sheets',
      description: 'High-clarity virgin cast acrylic sheets, AcryGlo colored acrylics, and mirror finishes.',
      image: '/acryglo_cast_acrylic_sheets.webp',
      order: 1,
    },
    {
      id: 'sc-2',
      slug: 'pp-hips-apet-other',
      name: 'PP / HIPS / APET / Display',
      description: 'PP floor guard sheets, HIPS thermoforming sheets, APET films, and roll-up standees.',
      image: '/PP_corrugated_sheets.webp',
      order: 2,
    },
    {
      id: 'sc-3',
      slug: 'pvc-sheets-boards',
      name: 'PVC Sheets & Boards',
      description: 'Signage and furniture grade PVC foam boards (Sunboard), transparent rigid sheets.',
      image: '/signage_grade_pvc_board.webp',
      order: 3,
    },
    {
      id: 'sc-4',
      slug: 'wpc-sheets-boards',
      name: 'WPC Sheets & Boards',
      description: 'Water-proof wood plastic composite boards, 3-layer sheets, and plywood alternatives.',
      image: '/PVC_and_WPC_board_furniture_grade.webp',
      order: 4,
    },
  ];

  // 1. Seed Products (305 items)
  console.log(`Seeding 'products' collection (${catalogProducts.length} items)...`);
  const productsCol = db.collection('products');
  const mappedProducts = catalogProducts.map((p: any) => {
    const { id, ...clean } = p;
    return {
      ...clean,
      images: mapUrlList(p.images),
      updatedAt: new Date(),
    };
  });

  const productOps = mappedProducts.map((p: any) => ({
    updateOne: {
      filter: { slug: p.slug },
      update: { $set: p },
      upsert: true,
    },
  }));
  if (productOps.length > 0) {
    await productsCol.bulkWrite(productOps);
  }
  await productsCol.createIndex({ slug: 1 }, { unique: true });
  await productsCol.createIndex({ division: 1 });
  await productsCol.createIndex({ mainCategory: 1 });
  await productsCol.createIndex({ published: 1 });

  // 2. Seed Laminates (100 items)
  console.log(`Seeding 'laminates' collection (${laminates.length} items)...`);
  const laminatesCol = db.collection('laminates');
  const mappedLaminates = laminates.map((l: any) => {
    const { id, ...clean } = l;
    return {
      ...clean,
      images: mapUrlList(l.images),
      updatedAt: new Date(),
    };
  });

  const laminateOps = mappedLaminates.map((l: any) => ({
    updateOne: {
      filter: { slug: l.slug },
      update: { $set: l },
      upsert: true,
    },
  }));
  if (laminateOps.length > 0) {
    await laminatesCol.bulkWrite(laminateOps);
  }
  await laminatesCol.createIndex({ slug: 1 }, { unique: true });
  await laminatesCol.createIndex({ productCode: 1 });
  await laminatesCol.createIndex({ collection: 1 });
  await laminatesCol.createIndex({ published: 1 });

  // 3. Seed Agricultural Products (27 items)
  console.log(`Seeding 'agriculturalProducts' collection (${agriculturalProducts.length} items)...`);
  const agriCol = db.collection('agriculturalProducts');
  const mappedAgri = agriculturalProducts.map((a: any) => {
    const { id, ...clean } = a;
    return {
      ...clean,
      images: mapUrlList(a.images),
      updatedAt: new Date(),
    };
  });

  const agriOps = mappedAgri.map((a: any) => ({
    updateOne: {
      filter: { slug: a.slug },
      update: { $set: a },
      upsert: true,
    },
  }));
  if (agriOps.length > 0) {
    await agriCol.bulkWrite(agriOps);
  }
  await agriCol.createIndex({ slug: 1 }, { unique: true });
  await agriCol.createIndex({ category: 1 });
  await agriCol.createIndex({ published: 1 });

  // 4. Seed Collections (6 items)
  console.log(`Seeding 'collections' collection (${collections.length} items)...`);
  const collectionsCol = db.collection('collections');
  const mappedCollections = collections.map((c: any) => {
    const { id, ...clean } = c;
    return {
      ...clean,
      image: mapUrl(c.image),
      updatedAt: new Date(),
    };
  });

  const colOps = mappedCollections.map((c: any) => ({
    updateOne: {
      filter: { slug: c.slug },
      update: { $set: c },
      upsert: true,
    },
  }));
  if (colOps.length > 0) {
    await collectionsCol.bulkWrite(colOps);
  }
  await collectionsCol.createIndex({ slug: 1 }, { unique: true });
  await collectionsCol.createIndex({ order: 1 });

  // 5. Seed Categories (7 items)
  console.log(`Seeding 'categories' collection (${categories.length} items)...`);
  const categoriesCol = db.collection('categories');
  const mappedCategories = categories.map((cat: any) => {
    const { id, ...clean } = cat;
    return {
      ...clean,
      image: mapUrl(cat.image),
      updatedAt: new Date(),
    };
  });

  const catOps = mappedCategories.map((cat: any) => ({
    updateOne: {
      filter: { slug: cat.slug },
      update: { $set: cat },
      upsert: true,
    },
  }));
  if (catOps.length > 0) {
    await categoriesCol.bulkWrite(catOps);
  }
  await categoriesCol.createIndex({ slug: 1 }, { unique: true });
  await categoriesCol.createIndex({ order: 1 });

  // 6. Seed Sheet Categories (4 items)
  console.log(`Seeding 'sheetCategories' collection (${defaultSheetCategories.length} items)...`);
  const sheetCategoriesCol = db.collection('sheetCategories');
  const mappedSheetCategories = defaultSheetCategories.map((sc: any) => {
    const { id, ...clean } = sc;
    return {
      ...clean,
      image: mapUrl(sc.image),
      updatedAt: new Date(),
    };
  });

  const scOps = mappedSheetCategories.map((sc: any) => ({
    updateOne: {
      filter: { slug: sc.slug },
      update: { $set: sc },
      upsert: true,
    },
  }));
  if (scOps.length > 0) {
    await sheetCategoriesCol.bulkWrite(scOps);
  }
  await sheetCategoriesCol.createIndex({ slug: 1 }, { unique: true });
  await sheetCategoriesCol.createIndex({ order: 1 });

  // 7. Seed Site Content
  console.log(`Seeding 'siteContent' collection...`);
  const contentCol = db.collection('siteContent');
  const mappedContent = {
    ...siteContent,
    _id: 'current',
    brand: {
      ...siteContent.brand,
      mark: mapUrl('/swami_marvels_logo.webp'),
    },
    hero: {
      ...siteContent.hero,
      image: mapUrl('/reception.jpg'),
    },
    updatedAt: new Date(),
  };

  await contentCol.updateOne(
    { _id: 'current' as any },
    { $set: mappedContent },
    { upsert: true }
  );

  // 8. Seed Media collection
  console.log(`Seeding 'media' collection...`);
  const mediaCol = db.collection('media');
  const mediaEntries = Object.entries(urlMap)
    .filter(([key]) => key.startsWith('/'))
    .map(([key, secureUrl]) => {
      const filename = key.replace(/^\//, '');
      return {
        name: filename,
        url: secureUrl,
        group: filename.startsWith('sv_')
          ? 'Product'
          : filename.includes('hero') || filename.includes('reception')
          ? 'Website'
          : filename.includes('certificate') || filename.endsWith('.pdf')
          ? 'PDF'
          : 'Collection',
        addedAt: new Date().toISOString(),
      };
    });

  const mediaOps = mediaEntries.map((m: any) => ({
    updateOne: {
      filter: { url: m.url },
      update: { $set: m },
      upsert: true,
    },
  }));
  if (mediaOps.length > 0) {
    await mediaCol.bulkWrite(mediaOps);
  }
  await mediaCol.createIndex({ url: 1 }, { unique: true });

  console.log('\n=============================================');
  console.log('🎉 ALL COLLECTIONS SUCCESSFULLY SEEDED TO MONGODB:');
  console.log(` - products:            ${mappedProducts.length} items (with Cloudinary URLs)`);
  console.log(` - laminates:           ${mappedLaminates.length} items (with Cloudinary URLs)`);
  console.log(` - agriculturalProducts:${mappedAgri.length} items (with Cloudinary URLs)`);
  console.log(` - collections:         ${mappedCollections.length} items`);
  console.log(` - categories:          ${mappedCategories.length} items`);
  console.log(` - sheetCategories:     ${mappedSheetCategories.length} items`);
  console.log(` - siteContent:         1 document configured`);
  console.log(` - media:               ${mediaEntries.length} Cloudinary assets catalogued`);
  console.log('=============================================\n');

  await client.close();
}

async function main() {
  try {
    console.log('Starting Cloudinary media upload and MongoDB seeding...');
    await uploadAllStaticAssets();
    await seedMongoDB();
    console.log('Migration script finished successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed with error:', err);
    process.exit(1);
  }
}

main();
