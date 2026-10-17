export interface NavLink {
  label: string;
  to: string;
  description?: string;
  badge?: string;
}

export interface NavDivision {
  division: string;
  divisionSlug: string;
  divisionBadge: string;
  to: string;
  description: string;
  categories: NavLink[];
}

export interface NavItem extends NavLink {
  children?: NavLink[];
  divisions?: NavDivision[];
}

export const PRODUCT_DIVISIONS_NAV: NavDivision[] = [
  {
    division: 'Acrylic Sheets',
    divisionSlug: 'acrylic-sheets',
    divisionBadge: '305 Items',
    to: '/laminates?division=acrylic-sheets',
    description: 'Virgin Cast Acrylic, PVC Foam Boards, WPC & PP Flute Sheets',
    categories: [
      { label: 'All Sheet Types', to: '/laminates?division=acrylic-sheets', badge: '305' },
      { label: 'Acrylic Sheets', to: '/laminates?division=acrylic-sheets&category=acrylic-sheets', badge: '164' },
      { label: 'PP / HIPS / APET / Display', to: '/laminates?division=acrylic-sheets&category=pp-hips-apet-other', badge: '40' },
      { label: 'PVC Sheets & Boards', to: '/laminates?division=acrylic-sheets&category=pvc-sheets-boards', badge: '69' },
      { label: 'WPC Sheets & Boards', to: '/laminates?division=acrylic-sheets&category=wpc-sheets-boards', badge: '32' }
    ]
  },
  {
    division: 'ASA Laminates',
    divisionSlug: 'asa-laminates',
    divisionBadge: '100 Items',
    to: '/laminates?division=asa-laminates',
    description: 'Eximer Technology Architectural Surfaces & Decorative Panels',
    categories: [
      { label: 'All Collections', to: '/laminates?division=asa-laminates', badge: '100' },
      { label: 'Solid Tone', to: '/laminates?division=asa-laminates&subcategory=solid-tone', badge: '43' },
      { label: 'Modern Living & Textured', to: '/laminates?division=asa-laminates&subcategory=modern-living', badge: '26' },
      { label: 'Woodgrain Naturals', to: '/laminates?division=asa-laminates&subcategory=woodgrain-naturals', badge: '12' },
      { label: 'Shine Craft Acrylic', to: '/laminates?division=asa-laminates&subcategory=shine-craft', badge: '11' },
      { label: 'Stone & Mineral', to: '/laminates?division=asa-laminates&subcategory=stone-mineral', badge: '9' },
      { label: 'Artistic Inspired', to: '/laminates?division=asa-laminates&subcategory=artistic-inspired', badge: '3' }
    ]
  },
  {
    division: 'Agricultural Products',
    divisionSlug: 'agricultural',
    divisionBadge: '27 Items',
    to: '/laminates?division=agricultural',
    description: 'Certified 100% Pure Veg APEDA Export Commodities',
    categories: [
      { label: 'All APEDA Categories', to: '/laminates?division=agricultural', badge: '27' },
      { label: 'Fresh Fruits & Vegetables', to: '/laminates?division=agricultural&subcategory=fruits-vegetables', badge: '10' },
      { label: 'Organic Products', to: '/laminates?division=agricultural&subcategory=organic-products', badge: '4' },
      { label: 'Floriculture & Seeds', to: '/laminates?division=agricultural&subcategory=floriculture-seeds', badge: '3' },
      { label: 'Processed Produce', to: '/laminates?division=agricultural&subcategory=processed-fruits-vegetables', badge: '3' },
      { label: 'Other Processed Foods', to: '/laminates?division=agricultural&subcategory=other-processed-foods', badge: '3' },
      { label: 'Cereals & Basmati Rice', to: '/laminates?division=agricultural&subcategory=cereals', badge: '2' },
      { label: 'Dairy & Honey (Pure Veg)', to: '/laminates?division=agricultural&subcategory=dairy-honey', badge: '2' }
    ]
  }
];

export const primaryNav: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Products',
    to: '/products',
    divisions: PRODUCT_DIVISIONS_NAV.filter(d => d.divisionSlug !== 'agricultural'),
    children: [
      { label: 'Acrylic Sheets', to: '/laminates?division=acrylic-sheets', description: 'Virgin cast acrylic, PVC & decorative sheets', badge: '305 Items' },
      { label: 'ASA Laminates', to: '/laminates?division=asa-laminates', description: 'Eximer technology architectural surfaces', badge: '100 Items' },
      { label: 'All Products', to: '/products', description: 'Full commercial catalog across all divisions', badge: '432 Items' }
    ]
  },
  { label: 'Export', to: '/export' },
  { label: 'About', to: '/about' }
];