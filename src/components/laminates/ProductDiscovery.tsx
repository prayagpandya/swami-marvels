"use client";

import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, Layers, Sparkles, Filter } from 'lucide-react';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { UniversalProductCard } from '../products/UniversalProductCard';
import { Shell } from '../ui/Section';
import { EASE } from '../motion/variants';
import { cn } from '../../utils/cn';
import { ALL_SUBCATEGORIES, getSubcategoriesByCategory } from '../../data/productTaxonomy';
import type { Product } from '../../types/product';

export type PrimaryDivision = 'acrylic-sheets' | 'asa-laminates' | 'agricultural' | 'all';

const DIVISION_TABS: { id: PrimaryDivision; name: string }[] = [
  { id: 'acrylic-sheets', name: 'Acrylic Sheets' },
  { id: 'asa-laminates', name: 'ASA Laminates' },
  { id: 'agricultural', name: 'Agricultural Products' },
  { id: 'all', name: 'All Products' }
];

const SHEET_CATEGORIES = [
  { id: 'all', name: 'All Sheet Types' },
  { id: 'acrylic-sheets', name: 'Acrylic Sheets' },
  { id: 'pp-hips-apet-other', name: 'PP / HIPS / APET / Display' },
  { id: 'pvc-sheets-boards', name: 'PVC Sheets & Boards' },
  { id: 'wpc-sheets-boards', name: 'WPC Sheets & Boards' }
];

const LAMINATE_COLLECTIONS = [
  { id: 'all', name: 'All Collections' },
  { id: 'artistic-inspired', name: 'Artistic Inspired' },
  { id: 'modern-living', name: 'Modern Living & Textured' },
  { id: 'shine-craft', name: 'Shine Craft Acrylic' },
  { id: 'solid-tone', name: 'Solid Tone' },
  { id: 'stone-mineral', name: 'Stone & Mineral' },
  { id: 'woodgrain-naturals', name: 'Woodgrain Naturals' }
];

const AGRI_CATEGORIES = [
  { id: 'all', name: 'All APEDA Categories' },
  { id: 'cereals', name: 'Cereals & Basmati Rice' },
  { id: 'dairy-honey', name: 'Dairy & Honey (Pure Veg)' },
  { id: 'floriculture-seeds', name: 'Floriculture & Seeds' },
  { id: 'fruits-vegetables', name: 'Fresh Fruits & Vegetables' },
  { id: 'organic-products', name: 'Organic Products' },
  { id: 'other-processed-foods', name: 'Other Processed Foods' },
  { id: 'processed-fruits-vegetables', name: 'Processed Produce' }
];

const INITIAL_VISIBLE_COUNT = 24;

export function ProductDiscovery() {
  const {
    products: storeProducts,
    laminates: storeLaminates,
    agriculturalProducts: storeAgri,
    sheetCategories: storeSheetCats,
    sheetSubcategories: storeSheetSubs,
    collections: storeCollections,
    categories: storeAgriCats
  } = usePublicCatalogue();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Dynamic Categories synced with MongoDB Atlas & Admin Panel
  const dynamicSheetCategories = useMemo(() => {
    if (storeSheetCats && storeSheetCats.length > 0) {
      return [
        { id: 'all', slug: 'all', name: 'All Sheet Types' },
        ...storeSheetCats.map((sc) => ({
          id: sc.slug || sc.id,
          slug: sc.slug || sc.id,
          name: sc.name
        }))
      ];
    }
    return SHEET_CATEGORIES.map((c) => ({ ...c, slug: c.id }));
  }, [storeSheetCats]);

  const dynamicLaminateCollections = useMemo(() => {
    if (storeCollections && storeCollections.length > 0) {
      return [
        { id: 'all', slug: 'all', name: 'All Collections' },
        ...storeCollections.map((col) => ({
          id: col.slug || col.id,
          slug: col.slug || col.id,
          name: col.name
        }))
      ];
    }
    return LAMINATE_COLLECTIONS.map((c) => ({ ...c, slug: c.id }));
  }, [storeCollections]);

  const dynamicAgriCategories = useMemo(() => {
    if (storeAgriCats && storeAgriCats.length > 0) {
      return [
        { id: 'all', slug: 'all', name: 'All APEDA Categories' },
        ...storeAgriCats.map((cat) => ({
          id: cat.slug || cat.id,
          slug: cat.slug || cat.id,
          name: cat.name
        }))
      ];
    }
    return AGRI_CATEGORIES.map((c) => ({ ...c, slug: c.id }));
  }, [storeAgriCats]);

  // Normalize Laminates to Universal Product structure
  const normalizedLaminates = useMemo((): Product[] => {
    return (storeLaminates || []).map((l: any) => ({
      id: l.id,
      slug: l.slug,
      name: l.name,
      productCode: l.productCode,
      division: 'industrial',
      mainCategory: 'asa-laminates',
      category: l.collection,
      subcategory: l.collection === 'shine-craft' ? 'Shine Craft Acrylic' : l.collection,
      subcategorySlug: l.collection,
      brand: 'Swami Marvels',
      shortDescription: `${l.name} (${l.colour}) - ${l.finish} finish architectural laminate.`,
      description: l.description || `${l.name} (${l.colour}) - ${l.finish} finish architectural laminate.`,
      specifications: [
        { label: 'Collection', value: l.collection === 'shine-craft' ? 'Shine Craft Acrylic' : (dynamicLaminateCollections.find(c => c.id === l.collection || c.slug === l.collection)?.name || l.collection) },
        { label: 'Colour', value: l.colour },
        { label: 'Finish', value: l.finish },
        { label: 'Thickness', value: l.thickness },
        { label: 'Dimensions', value: l.dimensions }
      ],
      features: l.features || [],
      applications: l.applications || [],
      availability: 'In Stock - Fast Despatch',
      pricingType: 'quote_only',
      showPrice: false,
      images: (l.images && l.images.length > 0 && l.images[0] && !l.images[0].includes('acrylic_solid_color_sheets'))
        ? l.images
        : (l.image && !l.image.includes('acrylic_solid_color_sheets')
          ? [l.image]
          : [l.productCode === 'SC-001' ? '/mirror_acrylic_sheets.webp' : `/${(l.productCode || l.SKU || 'sv_1014').toLowerCase().replace('-', '_')}.webp`]),
      featured: Boolean(l.featured),
      published: l.published
    }));
  }, [storeLaminates]);

  // Normalize Agricultural Products to Universal Product structure
  const normalizedAgri = useMemo((): Product[] => {
    return (storeAgri || []).map((a: any) => ({
      id: a.id,
      slug: a.slug,
      name: a.name,
      productCode: a.productCode || 'APEDA-EXP',
      division: 'agricultural',
      mainCategory: 'agricultural',
      category: a.category,
      subcategory: a.category,
      subcategorySlug: a.category,
      brand: 'Swami Marvels',
      shortDescription: a.grade || 'Certified 100% Pure Vegetarian Export Commodity',
      description: a.description || a.grade || 'APEDA scheduled export commodity.',
      specifications: a.specifications || [],
      features: ['100% Pure Vegetarian Export Guarantee', 'Phytosanitary Certified', 'Standard Export Packaging'],
      applications: ['Bulk International Trade', 'Retail Distribution', 'Food Processing'],
      availability: a.availability || 'In Stock - Export Ready',
      pricingType: 'quote_only',
      showPrice: false,
      images: a.images && a.images.length > 0 ? a.images : ['/alphonso_mangoes_Hapus.webp'],
      featured: Boolean(a.featured),
      published: a.published
    }));
  }, [storeAgri]);

  // Filter industrial sheets
  const sheetProducts = useMemo((): Product[] => {
    return (storeProducts || []).filter((p: any) => p.division !== 'agricultural' && p.mainCategory !== 'asa-laminates');
  }, [storeProducts]);

  // Initial values from URL params
  const paramDivision = searchParams.get('division') as PrimaryDivision | null;
  const paramCategory = searchParams.get('category');
  const paramSubcategory = searchParams.get('subcategory') || searchParams.get('collection');
  const paramQ = searchParams.get('q');

  // Determine active division based on category, subcategory or explicit division param
  const initialDivision: PrimaryDivision = useMemo(() => {
    if (paramDivision && ['acrylic-sheets', 'asa-laminates', 'agricultural', 'all'].includes(paramDivision)) {
      return paramDivision;
    }
    if (paramCategory === 'asa-laminates' || paramCategory === 'laminates') return 'asa-laminates';
    if (paramCategory === 'agricultural' || paramCategory === 'agricultural-exports') return 'agricultural';
    if (searchParams.get('collection')) return 'asa-laminates';
    if (paramSubcategory && LAMINATE_COLLECTIONS.some(c => c.id === paramSubcategory)) return 'asa-laminates';
    if (paramSubcategory && AGRI_CATEGORIES.some(a => a.id === paramSubcategory)) return 'agricultural';
    if (paramCategory && paramCategory !== 'all') return 'acrylic-sheets';
    return 'acrylic-sheets';
  }, [paramDivision, paramCategory, paramSubcategory, searchParams]);

  const [division, setDivision] = useState<PrimaryDivision>(initialDivision);
  const [secondaryCategory, setSecondaryCategory] = useState<string>(
    paramCategory && paramCategory !== 'all' && paramCategory !== 'asa-laminates' && paramCategory !== 'agricultural'
      ? paramCategory
      : 'all'
  );
  const [subcategory, setSubcategory] = useState<string>(paramSubcategory ?? 'all');
  const [search, setSearch] = useState<string>(paramQ ?? '');
  const [subSearch, setSubSearch] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const lastSyncedSearchRef = useRef<string>(paramQ ?? '');

  // Keep state in sync with URL
  useEffect(() => {
    if (paramDivision && ['acrylic-sheets', 'asa-laminates', 'agricultural', 'all'].includes(paramDivision)) {
      setDivision(paramDivision);
    } else if (paramCategory === 'asa-laminates') {
      setDivision('asa-laminates');
    } else if (paramCategory === 'agricultural') {
      setDivision('agricultural');
    } else if (searchParams.get('collection')) {
      setDivision('asa-laminates');
    } else if (paramSubcategory && LAMINATE_COLLECTIONS.some(c => c.id === paramSubcategory)) {
      setDivision('asa-laminates');
    } else if (paramSubcategory && AGRI_CATEGORIES.some(a => a.id === paramSubcategory)) {
      setDivision('agricultural');
    } else if (paramCategory && paramCategory !== 'all') {
      setDivision('acrylic-sheets');
    }

    if (paramCategory) {
      if (paramCategory !== 'asa-laminates' && paramCategory !== 'agricultural' && paramCategory !== 'all') {
        setSecondaryCategory(paramCategory);
      } else {
        setSecondaryCategory('all');
      }
    }
    if (paramSubcategory) setSubcategory(paramSubcategory);
    if (paramQ !== null && paramQ !== lastSyncedSearchRef.current) {
      setSearch(paramQ);
      lastSyncedSearchRef.current = paramQ;
    }
  }, [paramDivision, paramCategory, paramSubcategory, paramQ, searchParams]);

  // Debounced search sync to URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = search.trim();
      if (trimmed === lastSyncedSearchRef.current) return;
      lastSyncedSearchRef.current = trimmed;

      const params = new URLSearchParams(window.location.search);
      if (trimmed) params.set('q', trimmed);
      else params.delete('q');

      const newQuery = params.toString() ? '?' + params.toString() : '';
      if (window.location.search !== newQuery) {
        const basePath = window.location.pathname.startsWith('/products') ? '/products' : '/laminates';
        router.replace(basePath + newQuery, { scroll: false });
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [search, router]);

  const updateUrl = (newDiv: PrimaryDivision, newCat: string, newSub: string) => {
    const params = new URLSearchParams();
    if (newDiv !== 'acrylic-sheets') params.set('division', newDiv);
    if (newCat && newCat !== 'all') params.set('category', newCat);
    if (newSub && newSub !== 'all') params.set('subcategory', newSub);
    const trimmed = search.trim();
    if (trimmed) params.set('q', trimmed);
    lastSyncedSearchRef.current = trimmed;

    setVisibleCount(INITIAL_VISIBLE_COUNT);
    const basePath = window.location.pathname.startsWith('/products') ? '/products' : '/laminates';
    router.replace(basePath + (params.toString() ? '?' + params.toString() : ''), { scroll: false });
  };

  const handleDivisionChange = (newDiv: PrimaryDivision) => {
    setDivision(newDiv);
    setSecondaryCategory('all');
    setSubcategory('all');
    setSubSearch('');
    updateUrl(newDiv, 'all', 'all');
  };

  const handleSecondaryCategoryChange = (catId: string) => {
    setSecondaryCategory(catId);
    setSubcategory('all');
    setSubSearch('');
    updateUrl(division, catId, 'all');
  };

  const handleSubcategoryChange = (subSlug: string) => {
    setSubcategory(subSlug);
    updateUrl(division, secondaryCategory, subSlug);
    setMobileFilterOpen(false);
  };

  const clearAllFilters = () => {
    setDivision('acrylic-sheets');
    setSecondaryCategory('all');
    setSubcategory('all');
    setSearch('');
    setSubSearch('');
    lastSyncedSearchRef.current = '';
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    const basePath = window.location.pathname.startsWith('/products') ? '/products' : '/laminates';
    router.replace(basePath, { scroll: false });
  };

  // Products under active primary division
  const divisionProducts = useMemo((): Product[] => {
    if (division === 'acrylic-sheets') return sheetProducts;
    if (division === 'asa-laminates') return normalizedLaminates;
    if (division === 'agricultural') return normalizedAgri;
    return [...sheetProducts, ...normalizedLaminates, ...normalizedAgri];
  }, [division, sheetProducts, normalizedLaminates, normalizedAgri]);

  // Subcategories / Collections list for the left sidebar
  const sidebarItems = useMemo(() => {
    let items: { id: string; slug: string; name: string; count: number }[] = [];

    if (division === 'acrylic-sheets') {
      let subs: any[] = [];
      const dynamicSubs = (storeSheetSubs || []).filter((s: any) => {
        if (secondaryCategory === 'all') return true;
        if (s.categorySlug === secondaryCategory) return true;
        const matched = (storeSheetCats || []).find((c: any) => c.slug === secondaryCategory || c.id === secondaryCategory);
        if (matched) {
          return s.categorySlug === matched.slug || s.categorySlug === matched.id;
        }
        return false;
      });
      const seedSubs = secondaryCategory === 'all'
        ? ALL_SUBCATEGORIES.filter((s: any) => s.categorySlug !== 'asa-laminates' && s.categorySlug !== 'agricultural-exports')
        : getSubcategoriesByCategory(secondaryCategory);

      const existingSlugs = new Set<string>();
      [...dynamicSubs, ...seedSubs].forEach((sub: any) => {
        const slug = sub.slug || sub.id;
        if (!existingSlugs.has(slug)) {
          existingSlugs.add(slug);
          subs.push(sub);
        }
      });

      // Automatically include any custom subcategories / categories found in sheetProducts
      sheetProducts.forEach((p: any) => {
        if (secondaryCategory !== 'all' && p.mainCategory !== secondaryCategory && p.category !== secondaryCategory) return;
        const subSlug = p.subcategorySlug || p.subcategory;
        if (subSlug && !existingSlugs.has(subSlug)) {
          existingSlugs.add(subSlug);
          subs.push({
            id: subSlug,
            slug: subSlug,
            name: p.subcategory || subSlug,
            categorySlug: p.mainCategory || 'acrylic-sheets'
          });
        }
      });

      items = subs.map((sub: any) => {
        const count = sheetProducts.filter(
          (p: any) => p.subcategory === sub.slug || p.subcategory === sub.id || p.subcategorySlug === sub.slug
        ).length;
        return {
          id: sub.id,
          slug: sub.slug,
          name: sub.name,
          count: count || sub.productCount || 0
        };
      });
    } else if (division === 'asa-laminates') {
      items = dynamicLaminateCollections.filter((c) => c.id !== 'all').map((col) => {
        const count = normalizedLaminates.filter(
          (l: any) => l.category === col.id || l.subcategory === col.id || (l as any).collection === col.id
        ).length;
        return {
          id: col.id,
          slug: col.id,
          name: col.name,
          count
        };
      });
    } else if (division === 'agricultural') {
      items = dynamicAgriCategories.filter((c) => c.id !== 'all').map((cat) => {
        const count = normalizedAgri.filter(
          (a: any) => a.category === cat.id || a.subcategory === cat.id
        ).length;
        return {
          id: cat.id,
          slug: cat.id,
          name: cat.name,
          count
        };
      });
    } else {
      // 'all'
      const sheetDynamicSubs = (storeSheetSubs || []).map((s: any) => ({
        id: s.id,
        slug: s.slug || s.id,
        name: s.name,
        count: sheetProducts.filter((p: any) => p.subcategory === s.slug || p.subcategory === s.id || p.subcategorySlug === s.slug).length
      }));
      const sheetSubs = ALL_SUBCATEGORIES.filter((s: any) => s.categorySlug !== 'asa-laminates' && s.categorySlug !== 'agricultural-exports').map((s) => ({
        id: s.id,
        slug: s.slug,
        name: s.name,
        count: sheetProducts.filter((p: any) => p.subcategory === s.slug || p.subcategory === s.id).length
      }));
      const seenAll = new Set<string>();
      const combinedSheetSubs: any[] = [];
      [...sheetDynamicSubs, ...sheetSubs].forEach((sub) => {
        if (!seenAll.has(sub.slug)) {
          seenAll.add(sub.slug);
          combinedSheetSubs.push(sub);
        }
      });
      const lamCols = dynamicLaminateCollections.filter((c) => c.id !== 'all').map((c) => ({
        id: c.id,
        slug: c.id,
        name: c.name,
        count: normalizedLaminates.filter((l: any) => l.category === c.id || (l as any).collection === c.id).length
      }));
      const agriCats = dynamicAgriCategories.filter((c) => c.id !== 'all').map((c) => ({
        id: c.id,
        slug: c.id,
        name: c.name,
        count: normalizedAgri.filter((a: any) => a.category === c.id).length
      }));
      items = [...combinedSheetSubs, ...lamCols, ...agriCats];
    }

    if (subSearch.trim()) {
      const q = subSearch.toLowerCase();
      items = items.filter((item) => item.name.toLowerCase().includes(q));
    }

    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [
    division,
    secondaryCategory,
    sheetProducts,
    normalizedLaminates,
    normalizedAgri,
    subSearch,
    dynamicLaminateCollections,
    dynamicAgriCategories,
    storeSheetSubs,
    storeSheetCats
  ]);

  // Filtered Products
  const filteredProducts = useMemo((): Product[] => {
    const term = search.trim().toLowerCase();

    return divisionProducts.filter((p: any) => {
      // Secondary category filter (for acrylic sheets)
      if (division === 'acrylic-sheets' && secondaryCategory !== 'all') {
        const matchesCategory = p.mainCategory === secondaryCategory || p.category === secondaryCategory;
        if (!matchesCategory) return false;
      }

      // Subcategory / Collection / APEDA category filter
      if (subcategory !== 'all') {
        const matchesSub =
          p.subcategory === subcategory ||
          p.subcategorySlug === subcategory ||
          p.category === subcategory;
        if (!matchesSub) return false;
      }

      // Search query
      if (term) {
        const nameMatch = p.name?.toLowerCase().includes(term);
        const codeMatch = p.productCode?.toLowerCase().includes(term);
        const descMatch = p.description?.toLowerCase().includes(term);
        const specMatch = p.specifications?.some((s: any) =>
          s.label?.toLowerCase().includes(term) || s.value?.toLowerCase().includes(term)
        );
        const featureMatch = p.features?.some((f: any) => f.toLowerCase().includes(term));
        const appMatch = p.applications?.some((a: any) => a.toLowerCase().includes(term));

        if (!nameMatch && !codeMatch && !descMatch && !specMatch && !featureMatch && !appMatch) {
          return false;
        }
      }

      return true;
    });
  }, [divisionProducts, division, secondaryCategory, subcategory, search]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasActiveFilters =
    secondaryCategory !== 'all' ||
    subcategory !== 'all' ||
    Boolean(search.trim());

  const activeDivisionObject = useMemo(() => {
    return DIVISION_TABS.find((d) => d.id === division);
  }, [division]);

  const activeSubcategoryObject = useMemo(() => {
    if (subcategory === 'all') return null;
    return sidebarItems.find((s) => s.slug === subcategory || s.id === subcategory);
  }, [subcategory, sidebarItems]);

  return (
    <section className="w-full bg-[#F6F7F9] py-10 lg:py-14 border-b border-zinc-200" id="catalogue">
      <Shell>
        
        {/* =========================================================================
            PRIMARY DIVISION TABS BAR (Top Bar: Acrylic Sheets, ASA Laminates, Agri, All)
            ========================================================================= */}
        <div className="border-b border-zinc-200/90 pb-5">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
              Primary Product Divisions
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-black transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                Reset Filters
              </button>
            )}
          </div>

          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {DIVISION_TABS.map((tab) => {
              const isActive = tab.id === division;
              const count =
                tab.id === 'acrylic-sheets'
                  ? sheetProducts.length
                  : tab.id === 'asa-laminates'
                  ? normalizedLaminates.length
                  : tab.id === 'agricultural'
                  ? normalizedAgri.length
                  : sheetProducts.length + normalizedLaminates.length + normalizedAgri.length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleDivisionChange(tab.id)}
                  className={cn(
                    'min-h-[44px] shrink-0 rounded-lg px-4 py-2 text-xs font-mono tracking-wider transition-all duration-150 border cursor-pointer flex items-center shadow-xs',
                    isActive
                      ? 'border-zinc-950 bg-zinc-950 text-white font-semibold shadow-sm'
                      : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 hover:text-black hover:bg-zinc-100/80'
                  )}
                >
                  <span>{tab.name}</span>
                  <span
                    className={cn(
                      'ml-2.5 text-[0.68rem] px-2 py-0.5 rounded font-mono font-semibold',
                      isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-600'
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary Category Sub-tabs for Acrylic Sheets */}
          {division === 'acrylic-sheets' && (
            <div className="mt-4 pt-4 border-t border-zinc-200/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-[0.68rem] uppercase tracking-wider text-zinc-400 font-medium shrink-0 mr-1">
                Categories:
              </span>
              {dynamicSheetCategories.map((cat) => {
                const isCatActive = secondaryCategory === cat.id;
                const catCount =
                  cat.id === 'all'
                    ? sheetProducts.length
                    : sheetProducts.filter((p) => p.mainCategory === cat.id || p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSecondaryCategoryChange(cat.id)}
                    className={cn(
                      'shrink-0 rounded-md px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer flex items-center gap-1.5',
                      isCatActive
                        ? 'border-zinc-900 bg-zinc-900 text-white font-medium shadow-xs'
                        : 'border-zinc-200 bg-white/90 text-zinc-600 hover:bg-zinc-100 hover:text-black'
                    )}
                  >
                    <span>{cat.name}</span>
                    <span className={cn('text-[0.65rem] px-1.5 py-0.2 rounded font-mono', isCatActive ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500')}>
                      {catCount}
                    </span>
                  </button>
                );
              })}
            </div>
          )}


          {/* Secondary Collection Sub-tabs for ASA Laminates */}
          {division === 'asa-laminates' && (
            <div className="mt-4 pt-4 border-t border-zinc-200/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-[0.68rem] uppercase tracking-wider text-zinc-400 font-medium shrink-0 mr-1">
                Collections:
              </span>
              {dynamicLaminateCollections.map((col) => {
                const isColActive = subcategory === col.id || (col.id === 'all' && subcategory === 'all');
                const colCount =
                  col.id === 'all'
                    ? normalizedLaminates.length
                    : normalizedLaminates.filter((l) => l.category === col.id || l.subcategory === col.id || (l as any).collection === col.id).length;

                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => handleSubcategoryChange(col.id)}
                    className={cn(
                      'shrink-0 rounded-md px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer flex items-center gap-1.5',
                      isColActive
                        ? 'border-zinc-900 bg-zinc-900 text-white font-medium shadow-xs'
                        : 'border-zinc-200 bg-white/90 text-zinc-600 hover:bg-zinc-100 hover:text-black'
                    )}
                  >
                    <span>{col.name}</span>
                    <span className={cn('text-[0.65rem] px-1.5 py-0.2 rounded font-mono', isColActive ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500')}>
                      {colCount}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Secondary Category Sub-tabs for Agricultural Products */}
          {division === 'agricultural' && (
            <div className="mt-4 pt-4 border-t border-zinc-200/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-[0.68rem] uppercase tracking-wider text-zinc-400 font-medium shrink-0 mr-1">
                APEDA Categories:
              </span>
              {dynamicAgriCategories.map((cat) => {
                const isCatActive = subcategory === cat.id || (cat.id === 'all' && subcategory === 'all');
                const catCount =
                  cat.id === 'all'
                    ? normalizedAgri.length
                    : normalizedAgri.filter((a) => a.category === cat.id || a.subcategory === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSubcategoryChange(cat.id)}
                    className={cn(
                      'shrink-0 rounded-md px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer flex items-center gap-1.5',
                      isCatActive
                        ? 'border-zinc-900 bg-zinc-900 text-white font-medium shadow-xs'
                        : 'border-zinc-200 bg-white/90 text-zinc-600 hover:bg-zinc-100 hover:text-black'
                    )}
                  >
                    <span>{cat.name}</span>
                    <span className={cn('text-[0.65rem] px-1.5 py-0.2 rounded font-mono', isCatActive ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500')}>
                      {catCount}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile Subcategories Dropdown Trigger (< lg screens) */}
        <div className="mt-5 flex items-center justify-between lg:hidden border border-zinc-200 bg-white p-3 rounded-lg shadow-xs">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <Filter className="h-4 w-4 text-zinc-700 shrink-0" />
            <span className="font-mono text-xs font-semibold text-zinc-900 shrink-0">
              Filter:
            </span>
            <span className="font-mono text-xs text-zinc-600 break-words leading-tight">
              {activeSubcategoryObject?.name || (subcategory === 'all' ? 'All Subcategories' : subcategory)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="rounded bg-zinc-950 px-3 py-1.5 font-mono text-xs text-white font-medium shadow-xs shrink-0"
          >
            {mobileFilterOpen ? 'Close' : 'Filter by Subcategory'}
          </button>
        </div>

        {/* Mobile Subcategories Dropdown Panel (< lg screens) */}
        {mobileFilterOpen && (
          <div className="mt-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-lg lg:hidden space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
              <span className="font-mono text-xs uppercase tracking-wider font-semibold text-zinc-900">
                Select Subcategory / Collection
              </span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-zinc-400 hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
              <button
                type="button"
                onClick={() => handleSubcategoryChange('all')}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono text-left',
                  subcategory === 'all'
                    ? 'bg-zinc-950 text-white font-semibold'
                    : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                )}
              >
                <span>All Items</span>
                <span>({divisionProducts.length})</span>
              </button>
              {sidebarItems.map((sub: any) => {
                const isSubActive = sub.slug === subcategory || sub.id === subcategory;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => handleSubcategoryChange(sub.slug)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono text-left transition-colors',
                      isSubActive
                        ? 'bg-zinc-950 text-white font-semibold'
                        : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                    )}
                  >
                    <span className="break-words leading-tight pr-2 flex-1">{sub.name}</span>
                    <span className="shrink-0 text-[0.68rem] text-zinc-400">
                      ({sub.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Master Two-Column Layout: Left Side Subcategories / Right Side Products */}
        <div className="mt-8 flex flex-col lg:flex-row items-start gap-6">
          
          {/* =========================================================================
              LEFT SECTION: Dedicated Subcategories / Collections Filter Panel
              Narrower footprint to maximize product card display width!
              ========================================================================= */}
          <aside className="hidden lg:block lg:w-60 xl:w-64 shrink-0 lg:sticky lg:top-28">
            <div className="rounded-xl border border-zinc-200/90 bg-white p-4 shadow-sm space-y-3">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-950 text-white">
                    <Layers className="h-3.5 w-3.5 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="font-mono text-xs uppercase tracking-wider font-semibold text-zinc-950">
                      {division === 'asa-laminates' ? 'Laminate Collections' : division === 'agricultural' ? 'APEDA Categories' : 'Subcategories'}
                    </h2>
                    <p className="font-mono text-[0.68rem] text-zinc-400">
                      {activeDivisionObject?.name}
                    </p>
                  </div>
                </div>

                <span className="rounded bg-zinc-100 px-2 py-0.5 font-mono text-[0.68rem] font-semibold text-zinc-600">
                  {sidebarItems.length}
                </span>
              </div>

              {/* Subcategories Search Filter */}
              {sidebarItems.length > 7 && (
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={subSearch}
                    onChange={(e) => setSubSearch(e.target.value)}
                    placeholder="Filter subcategories..."
                    className="w-full rounded-md border border-zinc-200 bg-zinc-50/70 py-1.5 pl-8 pr-7 text-xs font-mono text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-500 focus:bg-white transition-colors"
                  />
                  {subSearch && (
                    <button
                      type="button"
                      onClick={() => setSubSearch('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-black"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              )}

              {/* Subcategories Filter Buttons List (Without 'truncate' — full text displayed!) */}
              <div className="max-h-[calc(100vh-280px)] overflow-y-auto pr-1 space-y-1.5 no-scrollbar">
                {/* "All" Button */}
                <button
                  type="button"
                  onClick={() => handleSubcategoryChange('all')}
                  className={cn(
                    'group flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left font-mono text-xs transition-all duration-150 border cursor-pointer',
                    subcategory === 'all'
                      ? 'border-zinc-950 bg-zinc-950 text-white font-semibold shadow-xs'
                      : 'border-zinc-200/70 bg-zinc-50/60 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {subcategory === 'all' && (
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                    )}
                    <span className="font-medium">
                      {division === 'asa-laminates' ? 'All Collections' : division === 'agricultural' ? 'All APEDA Categories' : 'All Subcategories'}
                    </span>
                  </div>
                  <span
                    className={cn(
                      'rounded px-1.5 py-0.5 text-[0.68rem] font-semibold shrink-0 ml-2',
                      subcategory === 'all' ? 'bg-white/20 text-white' : 'bg-zinc-200/60 text-zinc-600'
                    )}
                  >
                    {divisionProducts.length}
                  </span>
                </button>

                {/* Specific Subcategory / Collection Buttons - Full text with break-words */}
                {sidebarItems.map((sub: any) => {
                  const isSubActive = sub.slug === subcategory || sub.id === subcategory;

                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => handleSubcategoryChange(sub.slug)}
                      className={cn(
                        'group flex w-full items-start justify-between rounded-lg px-3.5 py-2.5 text-left font-mono text-xs transition-all duration-150 border cursor-pointer gap-2',
                        isSubActive
                          ? 'border-zinc-950 bg-zinc-950 text-white font-semibold shadow-xs'
                          : 'border-zinc-200/70 bg-zinc-50/60 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950'
                      )}
                    >
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        {isSubActive ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-transparent shrink-0 mt-1.5" />
                        )}
                        <span className="break-words leading-snug whitespace-normal flex-1">
                          {sub.name}
                        </span>
                      </div>
                      <span
                        className={cn(
                          'shrink-0 rounded px-1.5 py-0.5 text-[0.68rem] font-semibold mt-0.5',
                          isSubActive ? 'bg-white/20 text-white' : 'bg-zinc-200/60 text-zinc-600'
                        )}
                      >
                        {sub.count}
                      </span>
                    </button>
                  );
                })}

                {sidebarItems.length === 0 && (
                  <p className="py-4 text-center font-mono text-xs text-zinc-400">
                    No matching item
                  </p>
                )}
              </div>

              {/* Active Subcategory Reset */}
              {subcategory !== 'all' && (
                <div className="border-t border-zinc-100 pt-3">
                  <button
                    type="button"
                    onClick={() => handleSubcategoryChange('all')}
                    className="flex w-full items-center justify-center gap-1.5 rounded-md border border-zinc-200 py-2 font-mono text-xs text-zinc-600 hover:bg-zinc-100 hover:text-black transition-colors cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                    Reset to All
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* =========================================================================
              RIGHT SECTION: Products Grid Filtered by Left Selection & Search
              ========================================================================= */}
          <div className="min-w-0 flex-1 w-full space-y-6">
            
            {/* Search, Filter Tags & Result Counter Bar */}
            <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Search Field */}
                <div className="relative w-full sm:max-w-md">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setVisibleCount(INITIAL_VISIBLE_COUNT);
                    }}
                    placeholder="Search by product name, code, material specs..."
                    autoComplete="off"
                    className="min-h-[42px] w-full rounded-lg border border-zinc-200 bg-zinc-50/70 pl-10 pr-10 text-xs font-mono text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-500 focus:bg-white transition-colors"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('');
                        setVisibleCount(INITIAL_VISIBLE_COUNT);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer"
                      title="Clear search"
                      aria-label="Clear search"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Counter */}
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto font-mono text-xs text-zinc-600">
                  <p aria-live="polite">
                    Showing <span className="font-semibold text-zinc-950">{displayedProducts.length}</span> of{' '}
                    <span className="font-semibold text-zinc-950">{filteredProducts.length}</span> items
                  </p>
                </div>
              </div>

              {/* Active Filter Chips */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100">
                  <span className="font-mono text-[0.68rem] uppercase tracking-wider text-zinc-400 font-semibold">
                    Active Filters:
                  </span>

                  {secondaryCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 border border-zinc-200/80 px-2.5 py-1 font-mono text-[0.72rem] text-zinc-800">
                      <span>Category: {SHEET_CATEGORIES.find((c) => c.id === secondaryCategory)?.name || secondaryCategory}</span>
                      <button
                        type="button"
                        onClick={() => handleSecondaryCategoryChange('all')}
                        className="p-0.5 hover:text-black"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  {subcategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-zinc-950 text-white px-2.5 py-1 font-mono text-[0.72rem]">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span>{activeSubcategoryObject?.name || subcategory}</span>
                      <button
                        type="button"
                        onClick={() => handleSubcategoryChange('all')}
                        className="p-0.5 text-zinc-400 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  {search.trim() && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 border border-zinc-200/80 px-2.5 py-1 font-mono text-[0.72rem] text-zinc-800">
                      <span>Query: "{search.trim()}"</span>
                      <button
                        type="button"
                        onClick={() => setSearch('')}
                        className="p-0.5 hover:text-black"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="font-mono text-[0.72rem] text-zinc-500 hover:text-black underline underline-offset-2 ml-1"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid - Increased card width */}
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {displayedProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: EASE }}
                      >
                        <UniversalProductCard product={product} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Load More Button */}
                {filteredProducts.length > displayedProducts.length && (
                  <div className="pt-6 text-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + 24)}
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-8 py-3.5 font-mono text-xs uppercase tracking-widest font-semibold text-white hover:bg-zinc-800 transition-all shadow-md cursor-pointer active:scale-[0.99]"
                    >
                      Load More Products ({filteredProducts.length - displayedProducts.length} remaining)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center shadow-xs">
                <Sparkles className="mx-auto h-8 w-8 text-zinc-400 mb-3" />
                <h3 className="font-display text-xl font-medium text-zinc-950">No products found</h3>
                <p className="mt-2 text-xs font-mono text-zinc-500 max-w-md mx-auto">
                  No products matched your selected category, subcategory, or search keywords. Try choosing another category from the left section or reset filters.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-zinc-950 hover:bg-zinc-800 px-6 py-3 font-mono text-xs uppercase tracking-wider font-semibold text-white transition-colors shadow-sm cursor-pointer"
                >
                  View All Catalog Products
                </button>
              </div>
            )}
          </div>
        </div>
      </Shell>
    </section>
  );
}
