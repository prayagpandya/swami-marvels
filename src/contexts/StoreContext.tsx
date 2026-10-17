"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Laminate } from '../types/laminate';
import type { AgriculturalProduct } from '../types/agriculturalProduct';
import type { Product } from '../types/product';
import type { Collection } from '../types/collection';
import type { Category } from '../types/category';
import { laminates as seedLaminates } from '../data/laminates';
import { agriculturalProducts as seedAgri } from '../data/agriculturalProducts';
import { catalogProducts as seedCatalogProducts } from '../data/catalogProducts';
import { collections as seedCollections } from '../data/collections';
import { categories as seedCategories } from '../data/categories';
import { siteContent as seedContent } from '../data/siteContent';
import type { SiteContent } from '../data/siteContent';
import { ALL_SUBCATEGORIES } from '../data/productTaxonomy';

const STORAGE_KEY = 'swami-marvels-store-v18';

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  group: 'Product' | 'Collection' | 'Website' | 'PDF';
  addedAt: string;
}

export interface SheetCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  order: number;
}

export interface SheetSubcategory {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  group?: string;
  description?: string;
  image?: string;
  order?: number;
}

interface StoreState {
  products: Product[];
  laminates: Laminate[];
  agriculturalProducts: AgriculturalProduct[];
  collections: Collection[];
  categories: Category[];
  sheetCategories: SheetCategory[];
  sheetSubcategories: SheetSubcategory[];
  media: MediaAsset[];
  content: SiteContent;
}

interface StoreValue extends StoreState {
  saveProduct: (item: Product) => void;
  deleteProduct: (id: string) => void;
  saveLaminate: (item: Laminate) => void;
  deleteLaminate: (id: string) => void;
  saveAgriProduct: (item: AgriculturalProduct) => void;
  deleteAgriProduct: (id: string) => void;
  saveCollection: (item: Collection) => void;
  deleteCollection: (id: string) => void;
  moveCollection: (id: string, direction: -1 | 1) => void;
  saveCategory: (item: Category) => void;
  deleteCategory: (id: string) => void;
  moveCategory: (id: string, direction: -1 | 1) => void;
  saveSheetCategory: (item: SheetCategory) => void;
  deleteSheetCategory: (id: string) => void;
  moveSheetCategory: (id: string, direction: -1 | 1) => void;
  saveSheetSubcategory: (item: SheetSubcategory) => void;
  deleteSheetSubcategory: (id: string) => void;
  addMedia: (asset: Omit<MediaAsset, 'id' | 'addedAt'>) => void;
  deleteMedia: (id: string) => void;
  updateContent: (content: SiteContent) => void;
  resetStore: () => void;
}

const defaultMedia: MediaAsset[] = [
...seedCollections.map((c, i) => ({
  id: `media-col-${i}`,
  name: `${c.name} — collection image`,
  url: c.image,
  group: 'Collection' as const,
  addedAt: '2026-07-01T00:00:00.000Z'
})),
{
  id: 'media-web-1',
  name: 'Homepage hero interior',
  url: seedContent.hero.image,
  group: 'Website',
  addedAt: '2026-07-01T00:00:00.000Z'
},
{
  id: 'media-pdf-1',
  name: 'Laminate catalogue.pdf',
  url: '#',
  group: 'PDF',
  addedAt: '2026-07-04T00:00:00.000Z'
}];


export const defaultSheetCategories: SheetCategory[] = [
  { id: 'sc-1', slug: 'acrylic-sheets', name: 'Acrylic Sheets', description: 'High-clarity virgin cast acrylic sheets, AcryGlo colored acrylics, and mirror finishes.', image: '/acryglo_cast_acrylic_sheets.webp', order: 1 },
  { id: 'sc-2', slug: 'pp-hips-apet-other', name: 'PP / HIPS / APET / Display', description: 'PP floor guard sheets, HIPS thermoforming sheets, APET films, and roll-up standees.', image: '/PP_corrugated_sheets.webp', order: 2 },
  { id: 'sc-3', slug: 'pvc-sheets-boards', name: 'PVC Sheets & Boards', description: 'Signage and furniture grade PVC foam boards (Sunboard), transparent rigid sheets.', image: '/signage_grade_pvc_board.webp', order: 3 },
  { id: 'sc-4', slug: 'wpc-sheets-boards', name: 'WPC Sheets & Boards', description: 'Water-proof wood plastic composite boards, 3-layer sheets, and plywood alternatives.', image: '/PVC_and_WPC_board_furniture_grade.webp', order: 4 }
];

export const defaultSheetSubcategories: SheetSubcategory[] = ALL_SUBCATEGORIES
  .filter((s) => s.categorySlug !== 'asa-laminates' && s.categorySlug !== 'agricultural-exports')
  .map((s, idx) => ({
    id: s.id,
    slug: s.slug,
    name: s.name,
    categorySlug: s.categorySlug,
    group: s.group,
    description: s.description,
    order: idx + 1,
  }));

const initialState: StoreState = {
  products: seedCatalogProducts,
  laminates: seedLaminates,
  agriculturalProducts: seedAgri,
  collections: seedCollections,
  categories: seedCategories,
  sheetCategories: defaultSheetCategories,
  sheetSubcategories: defaultSheetSubcategories,
  media: defaultMedia,
  content: seedContent
};

const healState = (parsed: Partial<StoreState>): StoreState => {
  const state = { ...initialState, ...parsed };

  // 1. Heal collections - preserve Cloudinary / database image if present
  if (parsed.collections && parsed.collections.length > 0) {
    state.collections = parsed.collections.map((c) => {
      const seed = seedCollections.find((s) => s.id === c.id);
      return { ...(seed || {}), ...c, image: c.image || seed?.image || '' };
    });
  }

  // 2. Heal categories - preserve Cloudinary / database image if present
  if (parsed.categories && parsed.categories.length > 0) {
    state.categories = parsed.categories.map((cat) => {
      const seed = seedCategories.find((c) => c.id === cat.id);
      return { ...(seed || {}), ...cat, image: cat.image || seed?.image || '' };
    });
  }

  // 3. Heal laminates - preserve Cloudinary images
  if (parsed.laminates && parsed.laminates.length > 0) {
    state.laminates = parsed.laminates.map((lam) => {
      const seed = seedLaminates.find((l) => l.id === lam.id);
      return {
        ...(seed || {}),
        ...lam,
        images: (lam.images && lam.images.length > 0) ? lam.images : (seed?.images || [])
      };
    });
  }

  // 4. Heal agricultural products - preserve Cloudinary images
  if (parsed.agriculturalProducts && parsed.agriculturalProducts.length > 0) {
    state.agriculturalProducts = parsed.agriculturalProducts.map((agri) => {
      const seed = seedAgri.find((a) => a.id === agri.id);
      return {
        ...(seed || {}),
        ...agri,
        images: (agri.images && agri.images.length > 0) ? agri.images : (seed?.images || [])
      };
    });
  }

  // 5. Heal products - preserve Cloudinary images
  if (parsed.products && parsed.products.length > 0) {
    state.products = parsed.products.map((prod) => {
      const seed = seedCatalogProducts.find((p) => p.id === prod.id);
      return {
        ...(seed || {}),
        ...prod,
        images: (prod.images && prod.images.length > 0) ? prod.images : (seed?.images || [])
      };
    });
  } else {
    state.products = seedCatalogProducts;
  }

  // 6. Heal content
  if (parsed.content) {
    state.content = {
      ...seedContent,
      ...parsed.content,
      hero: { ...seedContent.hero, ...(parsed.content.hero || {}) },
      brand: { ...seedContent.brand, ...(parsed.content.brand || {}) },
      about: { ...seedContent.about, ...(parsed.content.about || {}) },
      contact: { ...seedContent.contact, ...(parsed.content.contact || {}) },
    };
  }

  // 7. Heal sheet categories
  if (parsed.sheetCategories && parsed.sheetCategories.length > 0) {
    state.sheetCategories = parsed.sheetCategories;
  } else {
    state.sheetCategories = defaultSheetCategories;
  }

  // 8. Heal sheet subcategories
  if (parsed.sheetSubcategories && parsed.sheetSubcategories.length > 0) {
    const seen = new Set<string>();
    const list: SheetSubcategory[] = [];
    parsed.sheetSubcategories.forEach((s) => {
      const key = s.slug || s.id;
      if (key && !seen.has(key)) {
        seen.add(key);
        list.push({ ...s, slug: s.slug || s.id });
      }
    });
    defaultSheetSubcategories.forEach((s) => {
      const key = s.slug || s.id;
      if (key && !seen.has(key)) {
        seen.add(key);
        list.push(s);
      }
    });
    state.sheetSubcategories = list;
  } else {
    state.sheetSubcategories = defaultSheetSubcategories;
  }

  // 9. Media
  if (parsed.media && parsed.media.length > 0) {
    state.media = parsed.media;
  }

  return state;
};

const StoreContext = createContext<StoreValue | null>(null);

const upsert = <T extends { id: string }>(list: T[], item: T): T[] => {
  const index = list.findIndex((entry) => entry.id === item.id);
  if (index === -1) return [item, ...list];
  const next = [...list];
  next[index] = item;
  return next;
};

const reorder = <T extends { id: string; order: number }>(list: T[], id: string, direction: -1 | 1): T[] => {
  const sorted = [...list].sort((a, b) => a.order - b.order);
  const index = sorted.findIndex((entry) => entry.id === id);
  const target = index + direction;
  if (index === -1 || target < 0 || target >= sorted.length) return list;
  const swapped = [...sorted];
  [swapped[index], swapped[target]] = [swapped[target], swapped[index]];
  return swapped.map((entry, i) => ({ ...entry, order: i + 1 }));
};

const apiSync = async (url: string, method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', body?: any) => {
  try {
    const res = await fetch(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      console.warn(`[API SYNC] ${method} ${url} responded with status:`, res.status);
    }
  } catch (err) {
    console.error(`[API SYNC ERROR] ${method} ${url}:`, err);
  }
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Initial mount: load cached local state first for 0ms layout shift, then sync fresh from MongoDB
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StoreState>;
        setState(healState(parsed));
      }
    } catch {
      /* storage unavailable */
    }
    setIsLoaded(true);

    // Fetch fresh database state from MongoDB Atlas
    fetch('/api/store')
      .then((res) => res.json())
      .then((res) => {
        if (res?.success && res?.data) {
          setState(healState(res.data));
        }
      })
      .catch((err) => {
        console.warn('Could not fetch latest store state from MongoDB:', err);
      });
  }, []);

  // 2. Persist local cache on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state, isLoaded]);

  // Product Mutations
  const saveProduct = useCallback((item: Product) => {
    setState((s) => ({ ...s, products: upsert(s.products || [], item) }));
    apiSync('/api/products', 'POST', item);
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setState((s) => ({ ...s, products: (s.products || []).filter((p) => p.id !== id) }));
    apiSync(`/api/products/${id}`, 'DELETE');
  }, []);

  // Laminate Mutations
  const saveLaminate = useCallback((item: Laminate) => {
    setState((s) => ({ ...s, laminates: upsert(s.laminates, item) }));
    apiSync('/api/laminates', 'POST', item);
  }, []);

  const deleteLaminate = useCallback((id: string) => {
    setState((s) => ({ ...s, laminates: s.laminates.filter((l) => l.id !== id) }));
    apiSync(`/api/laminates/${id}`, 'DELETE');
  }, []);

  // Agricultural Product Mutations
  const saveAgriProduct = useCallback((item: AgriculturalProduct) => {
    setState((s) => ({ ...s, agriculturalProducts: upsert(s.agriculturalProducts, item) }));
    apiSync('/api/agricultural-products', 'POST', item);
  }, []);

  const deleteAgriProduct = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      agriculturalProducts: s.agriculturalProducts.filter((p) => p.id !== id),
    }));
    apiSync(`/api/agricultural-products/${id}`, 'DELETE');
  }, []);

  // Collection Mutations
  const saveCollection = useCallback((item: Collection) => {
    setState((s) => ({ ...s, collections: upsert(s.collections, item) }));
    apiSync('/api/collections', 'POST', item);
  }, []);

  const deleteCollection = useCallback((id: string) => {
    setState((s) => ({ ...s, collections: s.collections.filter((c) => c.id !== id) }));
    apiSync(`/api/collections/${id}`, 'DELETE');
  }, []);

  const moveCollection = useCallback((id: string, direction: -1 | 1) => {
    setState((s) => {
      const updated = reorder(s.collections, id, direction);
      updated.forEach((c) => apiSync('/api/collections', 'POST', c));
      return { ...s, collections: updated };
    });
  }, []);

  // Category Mutations
  const saveCategory = useCallback((item: Category) => {
    setState((s) => ({ ...s, categories: upsert(s.categories, item) }));
    apiSync('/api/categories', 'POST', item);
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setState((s) => ({ ...s, categories: s.categories.filter((c) => c.id !== id) }));
    apiSync(`/api/categories/${id}`, 'DELETE');
  }, []);

  const moveCategory = useCallback((id: string, direction: -1 | 1) => {
    setState((s) => {
      const updated = reorder(s.categories, id, direction);
      updated.forEach((cat) => apiSync('/api/categories', 'POST', cat));
      return { ...s, categories: updated };
    });
  }, []);

  // Sheet Category Mutations
  const saveSheetCategory = useCallback((item: SheetCategory) => {
    setState((s) => ({
      ...s,
      sheetCategories: upsert(s.sheetCategories || defaultSheetCategories, item),
    }));
    apiSync('/api/sheet-categories', 'POST', item);
  }, []);

  const deleteSheetCategory = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      sheetCategories: (s.sheetCategories || defaultSheetCategories).filter((c) => c.id !== id),
    }));
    apiSync(`/api/sheet-categories/${id}`, 'DELETE');
  }, []);

  const moveSheetCategory = useCallback((id: string, direction: -1 | 1) => {
    setState((s) => {
      const updated = reorder(s.sheetCategories || defaultSheetCategories, id, direction);
      updated.forEach((sc) => apiSync('/api/sheet-categories', 'POST', sc));
      return { ...s, sheetCategories: updated };
    });
  }, []);

  // Sheet Subcategory Mutations
  const saveSheetSubcategory = useCallback((item: SheetSubcategory) => {
    setState((s) => ({
      ...s,
      sheetSubcategories: upsert(s.sheetSubcategories || defaultSheetSubcategories, item),
    }));
    apiSync('/api/sheet-subcategories', 'POST', item);
  }, []);

  const deleteSheetSubcategory = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      sheetSubcategories: (s.sheetSubcategories || defaultSheetSubcategories).filter(
        (sub) => sub.id !== id && sub.slug !== id
      ),
    }));
    apiSync(`/api/sheet-subcategories/${id}`, 'DELETE');
  }, []);

  // Media Library Mutations
  const addMedia = useCallback((asset: Omit<MediaAsset, 'id' | 'addedAt'>) => {
    const newAsset: MediaAsset = {
      ...asset,
      id: `media-${Date.now()}`,
      addedAt: new Date().toISOString(),
    };
    setState((s) => ({
      ...s,
      media: [newAsset, ...s.media],
    }));
    apiSync('/api/media', 'POST', newAsset);
  }, []);

  const deleteMedia = useCallback((id: string) => {
    setState((s) => ({ ...s, media: s.media.filter((m) => m.id !== id) }));
    apiSync(`/api/media/${id}`, 'DELETE');
  }, []);

  // Site Content Mutation
  const updateContent = useCallback((content: SiteContent) => {
    setState((s) => ({ ...s, content }));
    apiSync('/api/content', 'PUT', content);
  }, []);

  const resetStore = useCallback(() => {
    setState(initialState);
    fetch('/api/store')
      .then((res) => res.json())
      .then((res) => {
        if (res?.success && res?.data) setState(healState(res.data));
      });
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      ...state,
      saveProduct,
      deleteProduct,
      saveLaminate,
      deleteLaminate,
      saveAgriProduct,
      deleteAgriProduct,
      saveCollection,
      deleteCollection,
      moveCollection,
      saveCategory,
      deleteCategory,
      moveCategory,
      saveSheetCategory,
      deleteSheetCategory,
      moveSheetCategory,
      saveSheetSubcategory,
      deleteSheetSubcategory,
      addMedia,
      deleteMedia,
      updateContent,
      resetStore
    }),
    [
    state,
    saveProduct,
    deleteProduct,
    saveLaminate,
    deleteLaminate,
    saveAgriProduct,
    deleteAgriProduct,
    saveCollection,
    deleteCollection,
    moveCollection,
    saveCategory,
    deleteCategory,
    moveCategory,
    saveSheetCategory,
    deleteSheetCategory,
    moveSheetCategory,
    saveSheetSubcategory,
    deleteSheetSubcategory,
    addMedia,
    deleteMedia,
    updateContent,
    resetStore]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}

/** Public site only ever sees published records. */
export function usePublicCatalogue() {
  const { products, laminates, agriculturalProducts, collections, categories, sheetCategories, sheetSubcategories, content } = useStore();
  return useMemo(
    () => ({
      products: (products || []).filter((p) => p.published),
      laminates: laminates.filter((l) => l.published),
      agriculturalProducts: agriculturalProducts.filter((p) => p.published),
      collections: [...collections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
      categories: [...categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
      sheetCategories: [...(sheetCategories || defaultSheetCategories)].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
      sheetSubcategories: [...(sheetSubcategories || defaultSheetSubcategories)],
      content
    }),
    [products, laminates, agriculturalProducts, collections, categories, sheetCategories, sheetSubcategories, content]
  );
}