import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

dotenv.config({ path: path.join(projectRoot, '.env') });

const mapPath = path.join(projectRoot, 'src', 'data', 'cloudinaryMap.json');
const cloudinaryMap: Record<string, string> = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

function getCloudinaryUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('https://res.cloudinary.com')) return url;

  // PVC specific placeholder mappings
  if (url.includes('pvc_transparent_rigid_sheet')) {
    return cloudinaryMap['/signage_grade_pvc_board.webp'] || 'https://res.cloudinary.com/xayygb77/image/upload/v1789808140/swami-marvels/signage_grade_pvc_board.webp';
  }
  if (url.includes('pvc_flexible_sheet_transparent_clear')) {
    return cloudinaryMap['/glossy_coloured_pvc_board.webp'] || 'https://res.cloudinary.com/xayygb77/image/upload/v1789808096/swami-marvels/glossy_coloured_pvc_board.webp';
  }

  const base = path.basename(url);
  if (cloudinaryMap[url]) return cloudinaryMap[url];
  if (cloudinaryMap[`/${base}`]) return cloudinaryMap[`/${base}`];
  if (cloudinaryMap[base]) return cloudinaryMap[base];

  return url;
}

async function run() {
  console.log('--- STEP 1: Updating Agricultural Products ---');
  const agriPath = path.join(projectRoot, 'src', 'data', 'agriculturalProducts.ts');
  const { agriculturalProducts } = await import('../src/data/agriculturalProducts');

  const updatedAgri = agriculturalProducts.map((p) => {
    let cleanItem = p.apedaItem ? p.apedaItem.replace(/^\d+\.\s*/, '').trim() : '';
    let itemNumber = 1;
    if (p.productCode) {
      const parts = p.productCode.split('-');
      if (parts.length >= 3) {
        itemNumber = parseInt(parts[2], 10) || 1;
      }
    }

    return {
      ...p,
      apedaItem: cleanItem,
      itemNumber,
      images: (p.images || []).map(getCloudinaryUrl),
    };
  });

  const agriFileContent = `import type { AgriculturalProduct } from '../types/agriculturalProduct';

export const agriculturalProducts: AgriculturalProduct[] = ${JSON.stringify(updatedAgri, null, 2)};

export const featuredAgriculturalProducts = agriculturalProducts.filter(p => p.featured && p.published);

export const getAgriculturalProduct = (slug: string) => agriculturalProducts.find(p => p.slug === slug);

export function getApedaItemDisplay(product?: Partial<AgriculturalProduct> | null): string {
  if (!product) return '';
  const item = product.apedaItem?.trim() || '';
  if (!item) return '';
  const cleanItem = item.replace(/^\\d+\\.\\s*/, '');
  if (product.itemNumber !== undefined && product.itemNumber !== null) {
    const num = String(product.itemNumber).padStart(2, '0');
    return \`\${num}. \${cleanItem}\`;
  }
  if (product.productCode) {
    const parts = product.productCode.split('-');
    if (parts.length >= 3 && !isNaN(Number(parts[2]))) {
      return \`\${parts[2].padStart(2, '0')}. \${cleanItem}\`;
    }
  }
  return cleanItem;
}
`;
  fs.writeFileSync(agriPath, agriFileContent, 'utf8');
  console.log(`Updated agriculturalProducts.ts (${updatedAgri.length} items with clean apedaItem, itemNumber, and Cloudinary URLs).`);

  console.log('\n--- STEP 2: Updating Catalog Products (Remove ASA duplicates & Add Cloudinary URLs) ---');
  const catalogPath = path.join(projectRoot, 'src', 'data', 'catalogProducts.ts');
  const { catalogProducts } = await import('../src/data/catalogProducts');

  // Filter out the 100 duplicate ASA laminates
  const sheetOnlyProducts = catalogProducts.filter((p) => p.mainCategory !== 'asa-laminates');
  console.log(`Original catalog products: ${catalogProducts.length} -> Sheet only products: ${sheetOnlyProducts.length}`);

  const updatedCatalog = sheetOnlyProducts.map((p) => ({
    ...p,
    images: (p.images || []).map(getCloudinaryUrl),
  }));

  const catalogFileContent = `import type { Product } from '../types/product';

export const catalogProducts: Product[] = ${JSON.stringify(updatedCatalog, null, 2)};

export const featuredProducts = catalogProducts.filter((p) => p.featured && p.published);

export const getProductBySlug = (slug: string) => catalogProducts.find((p) => p.slug === slug);

export const getProductsByDivision = (division: string) =>
  catalogProducts.filter((p) => p.division === division && p.published);
`;
  fs.writeFileSync(catalogPath, catalogFileContent, 'utf8');
  console.log(`Updated catalogProducts.ts (${updatedCatalog.length} items with direct Cloudinary URLs and 0 duplicate laminates).`);

  console.log('\n--- STEP 3: Updating Laminates Dataset with direct Cloudinary URLs ---');
  const { laminates } = await import('../src/data/laminates');
  const laminatesPath = path.join(projectRoot, 'src', 'data', 'laminates.ts');
  let lamContent = fs.readFileSync(laminatesPath, 'utf8');

  // Update getProductImage function in laminates.ts to resolve from Cloudinary
  const oldGetImageRegex = /const getProductImage = \(sku: string, collection: string\) => {[\s\S]*?};/;
  const newGetImageFunc = `const getProductImage = (sku: string, collection: string) => {
  if (sku === 'SC-001') {
    return 'https://res.cloudinary.com/xayygb77/image/upload/v1789808127/swami-marvels/mirror_acrylic_sheets.webp';
  }
  const cleanSku = sku.toLowerCase().replace('-', '_');
  const key = \`/\${cleanSku}.webp\`;
  // Cloudinary direct URL
  return \`https://res.cloudinary.com/xayygb77/image/upload/v1789808154/swami-marvels/\${cleanSku}.webp\`;
};`;

  if (oldGetImageRegex.test(lamContent)) {
    lamContent = lamContent.replace(oldGetImageRegex, newGetImageFunc);
    fs.writeFileSync(laminatesPath, lamContent, 'utf8');
    console.log('Updated getProductImage in laminates.ts to direct Cloudinary URLs.');
  }

  console.log('\n--- STEP 4: Synchronizing MongoDB Atlas Database ---');
  const client = new MongoClient(process.env.MONGO_URI!);
  await client.connect();
  const db = client.db('swami_marvels_db');

  // 1. Delete the 100 duplicate ASA laminates from 'products' collection
  const delResult = await db.collection('products').deleteMany({ mainCategory: 'asa-laminates' });
  console.log(`Deleted ${delResult.deletedCount} duplicate ASA laminates from 'products' collection.`);

  // 2. Update all 305 sheet products in 'products' collection with Cloudinary URLs
  console.log('Updating sheet products in MongoDB with direct Cloudinary URLs...');
  for (const p of updatedCatalog) {
    const { id, ...cleanDoc } = p as any;
    await db.collection('products').updateOne(
      { slug: p.slug },
      {
        $set: {
          ...cleanDoc,
          images: p.images,
          updatedAt: new Date(),
        },
        $unset: { id: '' }
      },
      { upsert: true }
    );
  }

  // 3. Update all 27 agricultural products in 'agriculturalProducts' collection
  console.log('Updating agricultural products in MongoDB with clean apedaItem, itemNumber, and Cloudinary URLs...');
  for (const a of updatedAgri) {
    const { id, ...cleanDoc } = a as any;
    await db.collection('agriculturalProducts').updateOne(
      { slug: a.slug },
      {
        $set: {
          ...cleanDoc,
          apedaItem: a.apedaItem,
          itemNumber: a.itemNumber,
          images: a.images,
          updatedAt: new Date(),
        },
        $unset: { id: '' }
      },
      { upsert: true }
    );
  }

  // 4. Update all 100 laminates in 'laminates' collection
  console.log('Verifying laminates collection in MongoDB with Cloudinary URLs...');
  const mongoLaminates = await db.collection('laminates').find({}).toArray();
  for (const l of mongoLaminates) {
    const cleanSku = (l.productCode || l.SKU || 'sv_1014').toLowerCase().replace('-', '_');
    const cloudinaryUrl = l.productCode === 'SC-001'
      ? 'https://res.cloudinary.com/xayygb77/image/upload/v1789808127/swami-marvels/mirror_acrylic_sheets.webp'
      : (cloudinaryMap[`/${cleanSku}.webp`] || `https://res.cloudinary.com/xayygb77/image/upload/v1789808154/swami-marvels/${cleanSku}.webp`);

    await db.collection('laminates').updateOne(
      { _id: l._id },
      {
        $set: {
          images: [cloudinaryUrl],
          image: cloudinaryUrl,
          updatedAt: new Date(),
        },
        $unset: { id: '' }
      }
    );
  }

  // 5. Verification queries
  const prodCount = await db.collection('products').countDocuments();
  const lamCount = await db.collection('laminates').countDocuments();
  const agriCount = await db.collection('agriculturalProducts').countDocuments();
  const totalCount = prodCount + lamCount + agriCount;

  console.log('\n--- VERIFICATION STATS ---');
  console.log(`Products (Sheets) in MongoDB:  ${prodCount} (Expected: 305)`);
  console.log(`Laminates in MongoDB:          ${lamCount} (Expected: 100)`);
  console.log(`Agri Products in MongoDB:      ${agriCount} (Expected: 27)`);
  console.log(`Total Products (All Divisions): ${totalCount} (Expected: 432)`);

  // Verify sample agricultural product
  const sampleAgri = await db.collection('agriculturalProducts').findOne({});
  console.log('\nSample Agricultural Document:');
  console.log(JSON.stringify({
    name: sampleAgri?.name,
    productCode: sampleAgri?.productCode,
    apedaItem: sampleAgri?.apedaItem,
    itemNumber: sampleAgri?.itemNumber,
    images: sampleAgri?.images,
  }, null, 2));

  await client.close();
  console.log('\n✓ Synchronization complete successfully!');
}

run().catch((err) => {
  console.error('Error during data preparation and sync:', err);
  process.exit(1);
});
