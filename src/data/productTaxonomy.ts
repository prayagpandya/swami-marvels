/**
 * Swami Marvels - Comprehensive Product Taxonomy
 * Sourced from Dilip Plastics product catalog structure + Swami Marvels Local Catalog
 * Total: 65 Subcategories (305 Products) + ASA Laminates + 7 APEDA Agricultural Categories
 */

export interface SubcategoryMeta {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  group?: string;
  productCount: number;
  description?: string;
}

export interface MainCategoryMeta {
  id: string;
  slug: string;
  name: string;
  division: 'industrial' | 'agricultural';
  description: string;
  subcategoriesCount: number;
  productsCount: number;
  image: string;
}

export interface PrimaryDivisionMeta {
  id: 'acrylic-sheets' | 'asa-laminates' | 'agricultural' | 'all';
  slug: string;
  name: string;
  productsCount: number;
  description: string;
  image: string;
  badge?: string;
}

export const PRIMARY_DIVISIONS: PrimaryDivisionMeta[] = [
  {
    id: 'acrylic-sheets',
    slug: 'acrylic-sheets',
    name: 'Acrylic Sheets',
    productsCount: 305,
    description: 'Virgin cast acrylic sheets, PVC foam boards, WPC sheets, and PP/HIPS industrial films.',
    image: '/acryglo_cast_acrylic_sheets.webp',
    badge: '305 Items'
  },
  {
    id: 'asa-laminates',
    slug: 'asa-laminates',
    name: 'ASA Laminates',
    productsCount: 100,
    description: 'Eximer technology architectural surfaces and decorative panels with European REACH compliance.',
    image: '/laminates.jpg',
    badge: '100 Items'
  },
  {
    id: 'agricultural',
    slug: 'agricultural',
    name: 'Agricultural Products',
    productsCount: 27,
    description: 'Certified 100% Pure Vegetarian APEDA export commodities: Cereals, Basmati Rice, Fresh Produce, Honey.',
    image: '/alphonso_mangoes_Hapus.webp',
    badge: '27 Items'
  },
  {
    id: 'all',
    slug: 'all',
    name: 'All Products',
    productsCount: 432,
    description: 'Comprehensive B2B product catalogue across acrylic sheets, architectural surfaces, and agricultural lines.',
    image: '/acryglo_cast_acrylic_sheets.webp',
    badge: '432 Items'
  }
];

export const SHEET_CATEGORIES = [
  { id: 'all', name: 'All Sheet Types', count: 305, slug: 'all' },
  { id: 'acrylic-sheets', name: 'Acrylic Sheets', count: 164, slug: 'acrylic-sheets' },
  { id: 'pp-hips-apet-other', name: 'PP / HIPS / APET / Display', count: 40, slug: 'pp-hips-apet-other' },
  { id: 'pvc-sheets-boards', name: 'PVC Sheets & Boards', count: 69, slug: 'pvc-sheets-boards' },
  { id: 'wpc-sheets-boards', name: 'WPC Sheets & Boards', count: 32, slug: 'wpc-sheets-boards' }
];

export const LAMINATE_COLLECTIONS = [
  { id: 'all', name: 'All Collections', count: 100, slug: 'all' },
  { id: 'artistic-inspired', name: 'Artistic Inspired', count: 3, slug: 'artistic-inspired' },
  { id: 'modern-living', name: 'Modern Living & Textured', count: 26, slug: 'modern-living' },
  { id: 'shine-craft', name: 'Shine Craft Acrylic', count: 11, slug: 'shine-craft' },
  { id: 'solid-tone', name: 'Solid Tone', count: 43, slug: 'solid-tone' },
  { id: 'stone-mineral', name: 'Stone & Mineral', count: 9, slug: 'stone-mineral' },
  { id: 'woodgrain-naturals', name: 'Woodgrain Naturals', count: 12, slug: 'woodgrain-naturals' }
];

export const CANONICAL_AGRI_CATEGORIES = [
  { id: 'all', name: 'All APEDA Categories', count: 27, slug: 'all' },
  { id: 'cereals', name: 'Cereals & Basmati Rice', count: 2, slug: 'cereals' },
  { id: 'dairy-honey', name: 'Dairy & Honey (Pure Veg)', count: 2, slug: 'dairy-honey' },
  { id: 'floriculture-seeds', name: 'Floriculture & Seeds', count: 3, slug: 'floriculture-seeds' },
  { id: 'fruits-vegetables', name: 'Fresh Fruits & Vegetables', count: 10, slug: 'fruits-vegetables' },
  { id: 'organic-products', name: 'Organic Products', count: 4, slug: 'organic-products' },
  { id: 'other-processed-foods', name: 'Other Processed Foods', count: 3, slug: 'other-processed-foods' },
  { id: 'processed-fruits-vegetables', name: 'Processed Produce', count: 3, slug: 'processed-fruits-vegetables' }
];

export const MAIN_CATEGORIES: MainCategoryMeta[] = [
  {
    id: 'cat-acrylic',
    slug: 'acrylic-sheets',
    name: 'Acrylic Sheets',
    division: 'industrial',
    description: 'High-clarity virgin cast acrylic sheets, AcryGlo colored and frosted acrylics, and specialty mirror finishes.',
    subcategoriesCount: 35,
    productsCount: 164,
    image: '/acryglo_cast_acrylic_sheets.webp'
  },
  {
    id: 'cat-pvc',
    slug: 'pvc-sheets-boards',
    name: 'PVC Sheets & Boards',
    division: 'industrial',
    description: 'Signage and furniture grade PVC foam boards (Sunboard), transparent rigid sheets, flexible rolls, and curtain strips.',
    subcategoriesCount: 11,
    productsCount: 69,
    image: '/signage_grade_pvc_board.webp'
  },
  {
    id: 'cat-wpc',
    slug: 'wpc-sheets-boards',
    name: 'WPC Sheets & Boards',
    division: 'industrial',
    description: 'Termite-proof, water-proof wood plastic composite boards, 3-layer sheets, and high-density construction plywood alternatives.',
    subcategoriesCount: 7,
    productsCount: 32,
    image: '/PVC_and_WPC_board_furniture_grade.webp'
  },
  {
    id: 'cat-pp-hips',
    slug: 'pp-hips-apet-other',
    name: 'PP / HIPS / APET / Display & Other',
    division: 'industrial',
    description: 'PP floor guard sheets, HIPS thermoforming sheets, APET transparent films, corrugated flute sheets, and roll-up standees.',
    subcategoriesCount: 12,
    productsCount: 40,
    image: '/PP_corrugated_sheets.webp'
  },
  {
    id: 'cat-asa',
    slug: 'asa-laminates',
    name: 'ASA Architectural Laminates',
    division: 'industrial',
    description: 'Premium exterior and interior decorative laminates engineered with Eximer technology and European REACH compliance.',
    subcategoriesCount: 6,
    productsCount: 100,
    image: '/laminates.jpg'
  },
  {
    id: 'cat-agri',
    slug: 'agricultural-exports',
    name: 'Agricultural Products (APEDA)',
    division: 'agricultural',
    description: 'Certified 100% Pure Vegetarian export commodities: Floriculture, Fresh Onions, Grapes, Mango Pulp, Pure Honey, and Basmati Rice.',
    subcategoriesCount: 7,
    productsCount: 27,
    image: '/alphonso_mangoes_Hapus.webp'
  }
];

export const ACRYLIC_SUBCATEGORIES: SubcategoryMeta[] = [
  // Virgin Cast Acrylic (14)
  { id: 'sub-ac-1', name: 'AcryGlo Transparent Virgin Cast Acrylic Sheets', slug: 'acryglo-transparent-virgin-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 14 },
  { id: 'sub-ac-2', name: 'AcryGlo Milky White Cast Acrylic Sheets', slug: 'acryglo-milky-white-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 13 },
  { id: 'sub-ac-3', name: 'AcryGlo Black Cast Acrylic Sheets', slug: 'acryglo-black-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 13 },
  { id: 'sub-ac-4', name: 'Opal White Virgin Cast Acrylic Sheets', slug: 'opal-white-virgin-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 12 },
  { id: 'sub-ac-5', name: 'Milky White Virgin Cast Acrylic Sheets', slug: 'milky-white-virgin-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 12 },
  { id: 'sub-ac-6', name: 'Black Virgin Cast Acrylic Sheets', slug: 'black-virgin-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 12 },
  { id: 'sub-ac-7', name: 'AcryGlo Opal White Cast Acrylic Sheets', slug: 'acryglo-opal-white-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 11 },
  { id: 'sub-ac-8', name: 'Transparent Virgin Cast Acrylic Sheets', slug: 'transparent-virgin-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 11 },
  { id: 'sub-ac-9', name: 'Blue Virgin Cast Acrylic Sheets', slug: 'blue-virgin-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 3 },
  { id: 'sub-ac-10', name: 'Red Virgin Cast Acrylic Sheets', slug: 'red-virgin-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 3 },
  { id: 'sub-ac-11', name: 'Orange Virgin Cast Acrylic Sheets', slug: 'orange-virgin-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 3 },
  { id: 'sub-ac-12', name: 'Lemon Yellow Virgin Cast Acrylic Sheets', slug: 'lemon-yellow-virgin-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 3 },
  { id: 'sub-ac-13', name: 'Mango Yellow Virgin Cast Acrylic Sheets', slug: 'mango-yellow-virgin-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 3 },
  { id: 'sub-ac-14', name: 'Green Virgin Cast Acrylic Sheets', slug: 'green-virgin-cast', categorySlug: 'acrylic-sheets', group: 'Virgin Cast Acrylic', productCount: 3 },

  // AcryGlo Cast Acrylic (12)
  { id: 'sub-ac-15', name: 'AcryGlo Cast Acrylic Sheets', slug: 'acryglo-cast-acrylic-sheets', categorySlug: 'acrylic-sheets', group: 'AcryGlo Cast Acrylic', productCount: 3 },
  { id: 'sub-ac-16', name: 'AcryGlo Green Cast Acrylic Sheets', slug: 'acryglo-green-cast', categorySlug: 'acrylic-sheets', group: 'AcryGlo Cast Acrylic', productCount: 2 },
  { id: 'sub-ac-17', name: 'AcryGlo Red Cast Acrylic Sheets', slug: 'acryglo-red-cast', categorySlug: 'acrylic-sheets', group: 'AcryGlo Cast Acrylic', productCount: 2 },
  { id: 'sub-ac-18', name: 'AcryGlo Blue Cast Acrylic Sheets', slug: 'acryglo-blue-cast', categorySlug: 'acrylic-sheets', group: 'AcryGlo Cast Acrylic', productCount: 2 },
  { id: 'sub-ac-19', name: 'AcryGlo Yellow Cast Acrylic Sheets', slug: 'acryglo-yellow-cast', categorySlug: 'acrylic-sheets', group: 'AcryGlo Cast Acrylic', productCount: 2 },
  { id: 'sub-ac-20', name: '1.8mm AcryGlo Orange Cast Acrylic Sheets', slug: '1-8mm-acryglo-orange-cast', categorySlug: 'acrylic-sheets', group: 'AcryGlo Cast Acrylic', productCount: 2 },
  { id: 'sub-ac-21', name: 'Acryglo Matt Clear Cast Acrylic Sheets', slug: 'acryglo-matt-clear-cast', categorySlug: 'acrylic-sheets', group: 'AcryGlo Cast Acrylic', productCount: 2 },
  { id: 'sub-ac-22', name: 'Acryglo Matt Black Cast Acrylic Sheets', slug: 'acryglo-matt-black-cast', categorySlug: 'acrylic-sheets', group: 'AcryGlo Cast Acrylic', productCount: 2 },
  { id: 'sub-ac-23', name: 'AcryGlo Brown Cast Acrylic Sheets', slug: 'acryglo-brown-cast', categorySlug: 'acrylic-sheets', group: 'AcryGlo Cast Acrylic', productCount: 2 },
  { id: 'sub-ac-24', name: 'AcryGlo Grey Cast Acrylic Sheets', slug: 'acryglo-grey-cast', categorySlug: 'acrylic-sheets', group: 'AcryGlo Cast Acrylic', productCount: 2 },
  { id: 'sub-ac-25', name: 'AcryGlo Sky Blue Cast Acrylic Sheet', slug: 'acryglo-sky-blue-cast', categorySlug: 'acrylic-sheets', group: 'AcryGlo Cast Acrylic', productCount: 2 },
  { id: 'sub-ac-26', name: 'Acryglo Matt Milky White Cast Acrylic Sheets', slug: 'acryglo-matt-milky-white-cast', categorySlug: 'acrylic-sheets', group: 'AcryGlo Cast Acrylic', productCount: 1 },

  // Other Acrylic (9)
  { id: 'sub-ac-27', name: 'Acrylic Sheets With Adhesive', slug: 'acrylic-sheets-with-adhesive', categorySlug: 'acrylic-sheets', group: 'Other Acrylic', productCount: 4 },
  { id: 'sub-ac-28', name: 'Gold Mirror Acrylic Sheets', slug: 'gold-mirror-acrylic-sheets', categorySlug: 'acrylic-sheets', group: 'Other Acrylic', productCount: 3 },
  { id: 'sub-ac-29', name: 'Rose Mirror Acrylic Sheets', slug: 'rose-mirror-acrylic-sheets', categorySlug: 'acrylic-sheets', group: 'Other Acrylic', productCount: 3 },
  { id: 'sub-ac-30', name: 'Copper Mirror Acrylic Sheets', slug: 'copper-mirror-acrylic-sheets', categorySlug: 'acrylic-sheets', group: 'Other Acrylic', productCount: 3 },
  { id: 'sub-ac-31', name: 'Silver Mirror Acrylic Sheets', slug: 'silver-mirror-acrylic-sheets', categorySlug: 'acrylic-sheets', group: 'Other Acrylic', productCount: 3 },
  { id: 'sub-ac-32', name: 'Milky White Extruded Acrylic Sheets', slug: 'milky-white-extruded-acrylic', categorySlug: 'acrylic-sheets', group: 'Other Acrylic', productCount: 3 },
  { id: 'sub-ac-33', name: 'Acrylic Sheet', slug: 'general-acrylic-sheet', categorySlug: 'acrylic-sheets', group: 'Other Acrylic', productCount: 2 },
  { id: 'sub-ac-34', name: 'Transparent Extruded Acrylic Sheet', slug: 'transparent-extruded-acrylic', categorySlug: 'acrylic-sheets', group: 'Other Acrylic', productCount: 2 },
  { id: 'sub-ac-35', name: 'Black Extruded Acrylic Sheets', slug: 'black-extruded-acrylic', categorySlug: 'acrylic-sheets', group: 'Other Acrylic', productCount: 1 }
];

export const PVC_SUBCATEGORIES: SubcategoryMeta[] = [
  { id: 'sub-pvc-1', name: 'White PVC Foam Board', slug: 'white-pvc-foam-board', categorySlug: 'pvc-sheets-boards', productCount: 20 },
  { id: 'sub-pvc-2', name: 'Transparent Rigid PVC Sheets', slug: 'transparent-rigid-pvc-sheets', categorySlug: 'pvc-sheets-boards', productCount: 10 },
  { id: 'sub-pvc-3', name: 'Transparent Flexible PVC Rolls', slug: 'transparent-flexible-pvc-rolls', categorySlug: 'pvc-sheets-boards', productCount: 10 },
  { id: 'sub-pvc-4', name: 'Opaque White Rigid PVC Sheets', slug: 'opaque-white-rigid-pvc-sheets', categorySlug: 'pvc-sheets-boards', productCount: 7 },
  { id: 'sub-pvc-5', name: 'Klassik White PVC Foam Sheet', slug: 'klassik-white-pvc-foam-sheet', categorySlug: 'pvc-sheets-boards', productCount: 5 },
  { id: 'sub-pvc-6', name: 'PVC Sheet', slug: 'general-pvc-sheet', categorySlug: 'pvc-sheets-boards', productCount: 4 },
  { id: 'sub-pvc-7', name: 'Black PVC Foam Board', slug: 'black-pvc-foam-board', categorySlug: 'pvc-sheets-boards', productCount: 3 },
  { id: 'sub-pvc-8', name: 'Clear Rigid PVC Sheet', slug: 'clear-rigid-pvc-sheet', categorySlug: 'pvc-sheets-boards', productCount: 3 },
  { id: 'sub-pvc-9', name: 'PVC Plywood', slug: 'pvc-plywood', categorySlug: 'pvc-sheets-boards', productCount: 3 },
  { id: 'sub-pvc-10', name: 'PVC Strip Curtain Rolls', slug: 'pvc-strip-curtain-rolls', categorySlug: 'pvc-sheets-boards', productCount: 2 },
  { id: 'sub-pvc-11', name: 'PVC Board', slug: 'general-pvc-board', categorySlug: 'pvc-sheets-boards', productCount: 2 }
];

export const WPC_SUBCATEGORIES: SubcategoryMeta[] = [
  { id: 'sub-wpc-1', name: 'Kwality Wood WPC Sheet', slug: 'kwality-wood-wpc-sheet', categorySlug: 'wpc-sheets-boards', productCount: 10 },
  { id: 'sub-wpc-2', name: 'Strong Board WPC Sheet', slug: 'strong-board-wpc-sheet', categorySlug: 'wpc-sheets-boards', productCount: 8 },
  { id: 'sub-wpc-3', name: 'Tuffwood WPC Sheet', slug: 'tuffwood-wpc-sheet', categorySlug: 'wpc-sheets-boards', productCount: 5 },
  { id: 'sub-wpc-4', name: 'Woodpecker WPC Sheet', slug: 'woodpecker-wpc-sheet', categorySlug: 'wpc-sheets-boards', productCount: 4 },
  { id: 'sub-wpc-5', name: '3 Layer White WPC Board', slug: '3-layer-white-wpc-board', categorySlug: 'wpc-sheets-boards', productCount: 2 },
  { id: 'sub-wpc-6', name: 'Superwood WPC Sheet', slug: 'superwood-wpc-sheet', categorySlug: 'wpc-sheets-boards', productCount: 2 },
  { id: 'sub-wpc-7', name: 'WPC Plywood', slug: 'wpc-plywood', categorySlug: 'wpc-sheets-boards', productCount: 1 }
];

export const PP_HIPS_SUBCATEGORIES: SubcategoryMeta[] = [
  { id: 'sub-pp-1', name: 'White PP Floor Guard Sheets', slug: 'white-pp-floor-guard-sheets', categorySlug: 'pp-hips-apet-other', productCount: 8 },
  { id: 'sub-pp-2', name: 'White HIPS Sheets', slug: 'white-hips-sheets', categorySlug: 'pp-hips-apet-other', productCount: 6 },
  { id: 'sub-pp-3', name: 'PP Corrugated Printing Sheets', slug: 'pp-corrugated-printing-sheets', categorySlug: 'pp-hips-apet-other', productCount: 5 },
  { id: 'sub-pp-4', name: 'File Clip', slug: 'file-clip', categorySlug: 'pp-hips-apet-other', productCount: 4 },
  { id: 'sub-pp-5', name: 'Transparent APET Sheets', slug: 'transparent-apet-sheets', categorySlug: 'pp-hips-apet-other', productCount: 4 },
  { id: 'sub-pp-6', name: 'Stationery PP Sheet', slug: 'stationery-pp-sheet', categorySlug: 'pp-hips-apet-other', productCount: 4 },
  { id: 'sub-pp-7', name: 'Roll Up Standee', slug: 'roll-up-standee', categorySlug: 'pp-hips-apet-other', productCount: 3 },
  { id: 'sub-pp-8', name: 'Black GI Roll Up Standee', slug: 'black-gi-roll-up-standee', categorySlug: 'pp-hips-apet-other', productCount: 2 },
  { id: 'sub-pp-9', name: 'Polycarbonate Films', slug: 'polycarbonate-films', categorySlug: 'pp-hips-apet-other', productCount: 1 },
  { id: 'sub-pp-10', name: 'Light Diffusion Sheet', slug: 'light-diffusion-sheet', categorySlug: 'pp-hips-apet-other', productCount: 1 },
  { id: 'sub-pp-11', name: 'Flex Banner', slug: 'flex-banner', categorySlug: 'pp-hips-apet-other', productCount: 1 },
  { id: 'sub-pp-12', name: 'New Items', slug: 'new-items', categorySlug: 'pp-hips-apet-other', productCount: 1 }
];

export const ASA_LAMINATE_SUBCATEGORIES: SubcategoryMeta[] = [
  { id: 'sub-asa-1', name: 'Solid Tone ASA Laminates', slug: 'solid-tone-laminates', categorySlug: 'asa-laminates', productCount: 43 },
  { id: 'sub-asa-2', name: 'Woodgrain Naturals ASA Laminates', slug: 'woodgrain-naturals-laminates', categorySlug: 'asa-laminates', productCount: 12 },
  { id: 'sub-asa-3', name: 'Stone & Mineral ASA Laminates', slug: 'stone-mineral-laminates', categorySlug: 'asa-laminates', productCount: 9 },
  { id: 'sub-asa-4', name: 'Shine Craft Acrylic Laminates', slug: 'shine-craft-acrylic-laminates', categorySlug: 'asa-laminates', productCount: 7 },
  { id: 'sub-asa-5', name: 'Artistic Inspired ASA Laminates', slug: 'artistic-inspired-laminates', categorySlug: 'asa-laminates', productCount: 3 },
  { id: 'sub-asa-6', name: 'Modern Living & Textured ASA Laminates', slug: 'modern-living-laminates', categorySlug: 'asa-laminates', productCount: 26 }
];

export const AGRI_CATEGORIES: SubcategoryMeta[] = [
  { id: 'sub-ag-1', name: 'Floriculture & Seeds', slug: 'floriculture-seeds', categorySlug: 'agricultural-exports', productCount: 3, description: 'Cut roses, carnations, and hybrid vegetable seeds.' },
  { id: 'sub-ag-2', name: 'Fruits & Vegetables', slug: 'fruits-vegetables', categorySlug: 'agricultural-exports', productCount: 4, description: 'Nashik red onions, Alphonso mangoes, Thompson seedless grapes, and walnuts.' },
  { id: 'sub-ag-3', name: 'Processed Fruits & Vegetables', slug: 'processed-fruits-vegetables', categorySlug: 'agricultural-exports', productCount: 3, description: 'Aseptic Alphonso mango pulp, pickles, and dehydrated onion flakes.' },
  { id: 'sub-ag-4', name: 'Dairy Products & Honey (Cat 04)', slug: 'dairy-honey', categorySlug: 'agricultural-exports', productCount: 2, description: 'Under APEDA Animal Products category, Swami Marvels exports ONLY skimmed milk powder and multifloral honey.' },
  { id: 'sub-ag-5', name: 'Other Processed Foods', slug: 'other-processed-foods', categorySlug: 'agricultural-exports', productCount: 3, description: 'Shelled raw groundnuts, guar gum powder, and organic sugarcane jaggery.' },
  { id: 'sub-ag-6', name: 'Cereals', slug: 'cereals', categorySlug: 'agricultural-exports', productCount: 2, description: 'Aged 1121 Basmati rice and long grain non-basmati rice.' },
  { id: 'sub-ag-7', name: 'De-oiled Rice Bran', slug: 'de-oiled-rice-bran', categorySlug: 'agricultural-exports', productCount: 1, description: 'High protein feed-grade de-oiled rice bran (DORB).' }
];

export const ALL_SUBCATEGORIES: SubcategoryMeta[] = [
  ...ACRYLIC_SUBCATEGORIES,
  ...PVC_SUBCATEGORIES,
  ...WPC_SUBCATEGORIES,
  ...PP_HIPS_SUBCATEGORIES,
  ...ASA_LAMINATE_SUBCATEGORIES,
  ...AGRI_CATEGORIES
];

export const getSubcategoriesByCategory = (categorySlug: string): SubcategoryMeta[] => {
  return ALL_SUBCATEGORIES.filter(s => s.categorySlug === categorySlug);
};

export const PARENT_DIVISIONS = MAIN_CATEGORIES.map(cat => ({
  id: cat.slug,
  name: cat.name,
  subcategories: ALL_SUBCATEGORIES.filter(s => s.categorySlug === cat.slug)
}));
