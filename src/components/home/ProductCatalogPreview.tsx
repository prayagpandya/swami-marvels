"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, Layers, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Shell } from '../ui/Section';
import { PRIMARY_DIVISIONS, SHEET_CATEGORIES, LAMINATE_COLLECTIONS, CANONICAL_AGRI_CATEGORIES } from '../../data/productTaxonomy';
import { catalogProducts } from '../../data/catalogProducts';
import { agriculturalProducts as seedAgri } from '../../data/agriculturalProducts';
import type { Product } from '../../types/product';
import type { AgriculturalProduct } from '../../types/agriculturalProduct';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { FadeInView, SMOOTH_EASE } from '../motion/ViewportMotion';
import { cn } from '../../utils/cn';

type ActiveDivision = 'all' | 'acrylic-sheets' | 'asa-laminates' | 'agricultural';

export function ProductCatalogPreview() {
  const router = useRouter();
  const [activeDivision, setActiveDivision] = useState<ActiveDivision>('all');
  const [secondaryCategory, setSecondaryCategory] = useState<string>('all');
  const {
    products: storeProducts,
    laminates: storeLaminates,
    agriculturalProducts: storeAgri,
    sheetCategories: storeSheetCats,
    collections: storeCollections,
    categories: storeAgriCats
  } = usePublicCatalogue();

  // Normalize Laminates to Universal Product structure with proper images
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
        { label: 'Collection', value: l.collection === 'shine-craft' ? 'Shine Craft Acrylic' : l.collection },
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
        : [l.productCode === 'SC-001' ? '/mirror_acrylic_sheets.webp' : `/${(l.productCode || l.SKU || 'sv_1014').toLowerCase().replace('-', '_')}.webp`],
      featured: Boolean(l.featured),
      published: l.published
    }));
  }, [storeLaminates]);

  const sheetProducts = useMemo((): Product[] => {
    const list = storeProducts && storeProducts.length > 0 ? storeProducts : catalogProducts;
    return list.filter(p => p.mainCategory !== 'asa-laminates' && p.division !== 'agricultural');
  }, [storeProducts]);

  const allAgri = useMemo(() => {
    return storeAgri && storeAgri.length > 0 ? storeAgri : seedAgri;
  }, [storeAgri]);

  // Dynamic Categories from MongoDB Atlas / Store
  const dynamicSheetCategories = useMemo(() => {
    if (storeSheetCats && storeSheetCats.length > 0) {
      return storeSheetCats.map((sc) => ({
        id: sc.slug || sc.id,
        slug: sc.slug || sc.id,
        name: sc.name,
        count: sheetProducts.filter((p) => p.mainCategory === sc.slug || p.category === sc.slug).length
      }));
    }
    return SHEET_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
      ...c,
      count: sheetProducts.filter((p) => p.mainCategory === c.id || p.category === c.id).length
    }));
  }, [storeSheetCats, sheetProducts]);

  const dynamicLaminateCollections = useMemo(() => {
    if (storeCollections && storeCollections.length > 0) {
      return storeCollections.map((col) => ({
        id: col.slug || col.id,
        slug: col.slug || col.id,
        name: col.name,
        count: normalizedLaminates.filter((l) => l.category === col.slug || l.subcategory === col.slug || (l as any).collection === col.slug).length
      }));
    }
    return LAMINATE_COLLECTIONS.filter((c) => c.id !== 'all').map((c) => ({
      ...c,
      count: normalizedLaminates.filter((l) => l.category === c.slug).length
    }));
  }, [storeCollections, normalizedLaminates]);

  const dynamicAgriCategories = useMemo(() => {
    if (storeAgriCats && storeAgriCats.length > 0) {
      return storeAgriCats.map((cat) => ({
        id: cat.slug || cat.id,
        slug: cat.slug || cat.id,
        name: cat.name,
        count: allAgri.filter((a) => a.category === cat.slug || a.subcategory === cat.slug).length
      }));
    }
    return CANONICAL_AGRI_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
      ...c,
      count: allAgri.filter((a) => a.category === c.slug).length
    }));
  }, [storeAgriCats, allAgri]);

  // Handle Division tab changes
  const handleDivisionChange = (div: ActiveDivision) => {
    setActiveDivision(div);
    setSecondaryCategory('all');
  };

  // Exactly 6 products shown matching division & category selection
  const displayedProducts = useMemo((): (Product | AgriculturalProduct)[] => {
    if (activeDivision === 'all') {
      const p1 = sheetProducts.find(p => p.mainCategory === 'acrylic-sheets');
      const p2 = sheetProducts.find(p => p.mainCategory === 'pvc-sheets-boards');
      const p3 = sheetProducts.find(p => p.mainCategory === 'wpc-sheets-boards');
      const p4 = sheetProducts.find(p => p.mainCategory === 'pp-hips-apet-other');
      const p5 = normalizedLaminates.find(p => p.featured) || normalizedLaminates[0];
      const p6 = allAgri.find(p => p.slug === 'aged-1121-basmati-rice-premium')
                 || allAgri.find(p => p.featured)
                 || allAgri[0];
      return [p1, p2, p3, p4, p5, p6].filter((p): p is (Product | AgriculturalProduct) => Boolean(p));
    }

    if (activeDivision === 'acrylic-sheets') {
      if (secondaryCategory === 'all') {
        const p1 = sheetProducts.find(p => p.mainCategory === 'acrylic-sheets');
        const p2 = sheetProducts.find(p => p.mainCategory === 'pp-hips-apet-other');
        const p3 = sheetProducts.find(p => p.mainCategory === 'pvc-sheets-boards');
        const p4 = sheetProducts.find(p => p.mainCategory === 'wpc-sheets-boards');
        const others = sheetProducts.filter(p => ![p1?.id, p2?.id, p3?.id, p4?.id].includes(p.id));
        return [p1, p2, p3, p4, ...others].filter(Boolean).slice(0, 6) as Product[];
      }
      return sheetProducts.filter(p => p.mainCategory === secondaryCategory || p.category === secondaryCategory).slice(0, 6);
    }

    if (activeDivision === 'asa-laminates') {
      if (secondaryCategory === 'all') {
        return normalizedLaminates.slice(0, 6);
      }
      return normalizedLaminates.filter(l => l.category === secondaryCategory || l.subcategory === secondaryCategory || (l as any).subcategorySlug === secondaryCategory).slice(0, 6);
    }

    if (activeDivision === 'agricultural') {
      if (secondaryCategory === 'all') {
        const featured = allAgri.filter(p => p.featured);
        const others = allAgri.filter(p => !p.featured);
        return [...featured, ...others].slice(0, 6);
      }
      return allAgri.filter(a => a.category === secondaryCategory).slice(0, 6);
    }

    return [];
  }, [activeDivision, secondaryCategory, sheetProducts, normalizedLaminates, allAgri]);

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-zinc-200" aria-label="Explore Products">
      <Shell>
        
        {/* Section Header */}
        <FadeInView yOffset={15} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>CATALOG HIGHLIGHTS · CORE PRODUCT ARCHITECTURE</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              Engineered Product Architecture
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-600 max-w-xl leading-relaxed">
              Curated overview of high-volume acrylic sheets, architectural surfaces, and certified agricultural commodities.
            </p>
          </div>

          <Link
            href="/laminates?division=all"
            className="inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-black text-white font-mono text-xs uppercase tracking-wider px-6 py-3.5 rounded shadow-sm hover:shadow-md transition-all shrink-0"
          >
            <span>Browse All 432 Products</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </FadeInView>

        {/* GLIMPSE OF CATEGORIES (3 Primary Divisions matching Products page) */}
        <FadeInView delay={0.08} yOffset={20} className="mt-10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-medium flex items-center gap-2">
              <span>Primary Product Divisions & Categories</span>
            </h3>
            <Link
              href="/laminates?division=all"
              className="text-xs font-mono font-medium text-zinc-700 hover:text-black transition-colors flex items-center gap-1 hover:underline"
            >
              <span>View Full Classification Directory</span>
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>

          {/* 2 Primary Divisions Cards Grid (Acrylic Sheets & ASA Laminates) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: Acrylic Sheets */}
            <div className="group flex flex-col justify-between p-5 rounded-2xl border border-zinc-200/90 bg-[#FAFAFA] hover:bg-white hover:border-zinc-950 hover:shadow-lg transition-all duration-200">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-950 text-white font-semibold">
                    {sheetProducts.length} Items
                  </span>
                  <Link
                    href="/laminates?division=acrylic-sheets"
                    className="text-zinc-400 group-hover:text-black transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </div>
                <Link href="/laminates?division=acrylic-sheets">
                  <h4 className="font-display text-lg font-bold text-zinc-950 group-hover:text-amber-600 transition-colors">
                    Acrylic Sheets
                  </h4>
                </Link>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Virgin cast acrylic sheets, PVC foam boards, WPC construction boards & PP/HIPS industrial films.
                </p>

                <div className="mt-4 pt-3 border-t border-zinc-200/70">
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-zinc-400 font-medium block mb-2">
                    Sheet Categories ({dynamicSheetCategories.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dynamicSheetCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/laminates?division=acrylic-sheets&category=${cat.slug}`}
                        className="text-[0.68rem] font-mono px-2 py-1 rounded-md bg-white border border-zinc-200 hover:border-zinc-900 hover:bg-zinc-950 hover:text-white transition-all text-zinc-700"
                      >
                        {cat.name} ({cat.count})
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: ASA Laminates */}
            <div className="group flex flex-col justify-between p-5 rounded-2xl border border-zinc-200/90 bg-[#FAFAFA] hover:bg-white hover:border-zinc-950 hover:shadow-lg transition-all duration-200">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-950 text-white font-semibold">
                    {normalizedLaminates.length} Items
                  </span>
                  <Link
                    href="/laminates?division=asa-laminates"
                    className="text-zinc-400 group-hover:text-black transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </div>
                <Link href="/laminates?division=asa-laminates">
                  <h4 className="font-display text-lg font-bold text-zinc-950 group-hover:text-amber-600 transition-colors">
                    ASA Laminates
                  </h4>
                </Link>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Eximer technology architectural surfaces, anti-scratch finishes and decorative panels.
                </p>

                <div className="mt-4 pt-3 border-t border-zinc-200/70">
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-zinc-400 font-medium block mb-2">
                    Laminate Collections ({dynamicLaminateCollections.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dynamicLaminateCollections.map((col) => (
                      <Link
                        key={col.id}
                        href={`/laminates?division=asa-laminates&subcategory=${col.slug}`}
                        className="text-[0.68rem] font-mono px-2 py-1 rounded-md bg-white border border-zinc-200 hover:border-zinc-900 hover:bg-zinc-950 hover:text-white transition-all text-zinc-700"
                      >
                        {col.name} ({col.count})
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInView>

        {/* Filter Tabs for the Products (2-tier matching Products Page) */}
        <FadeInView delay={0.12} yOffset={20} className="mt-14 border-t border-zinc-200 pt-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                Filter Highlights By Division
              </span>
              <span className="hidden sm:block text-xs font-mono text-zinc-500 shrink-0">
                Showing <strong className="text-zinc-950">{displayedProducts.length}</strong> highlights
              </span>
            </div>

            {/* Primary Division Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 rail-scroll max-w-full">
              {PRIMARY_DIVISIONS.map((tab) => {
                const isTabActive = activeDivision === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleDivisionChange(tab.id as ActiveDivision)}
                    className={cn(
                      'flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border rounded-lg',
                      isTabActive
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs font-semibold'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:text-black hover:bg-zinc-50'
                    )}
                  >
                    <span>{tab.name}</span>
                    <span className={cn(
                      'text-[0.62rem] px-1.5 py-0.2 rounded font-mono font-medium',
                      isTabActive ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-600'
                    )}>
                      {tab.productsCount}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Secondary Category Sub-tabs when Acrylic Sheets is active */}
            {activeDivision === 'acrylic-sheets' && (
              <div className="mt-2 pt-3 border-t border-zinc-200/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-zinc-400 font-medium shrink-0 mr-1">
                  Categories:
                </span>
                <button
                  type="button"
                  onClick={() => setSecondaryCategory('all')}
                  className={cn(
                    'shrink-0 rounded-md px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer flex items-center gap-1.5',
                    secondaryCategory === 'all'
                      ? 'border-zinc-900 bg-zinc-900 text-white font-medium shadow-xs'
                      : 'border-zinc-200 bg-white/90 text-zinc-600 hover:bg-zinc-100 hover:text-black'
                  )}
                >
                  <span>All Sheet Types</span>
                  <span className={cn('text-[0.65rem] px-1.5 py-0.2 rounded font-mono', secondaryCategory === 'all' ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500')}>
                    {sheetProducts.length}
                  </span>
                </button>
                {dynamicSheetCategories.map((cat) => {
                  const isCatActive = secondaryCategory === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSecondaryCategory(cat.slug)}
                      className={cn(
                        'shrink-0 rounded-md px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer flex items-center gap-1.5',
                        isCatActive
                          ? 'border-zinc-900 bg-zinc-900 text-white font-medium shadow-xs'
                          : 'border-zinc-200 bg-white/90 text-zinc-600 hover:bg-zinc-100 hover:text-black'
                      )}
                    >
                      <span>{cat.name}</span>
                      <span className={cn('text-[0.65rem] px-1.5 py-0.2 rounded font-mono', isCatActive ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500')}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Secondary Collection Sub-tabs when ASA Laminates is active */}
            {activeDivision === 'asa-laminates' && (
              <div className="mt-2 pt-3 border-t border-zinc-200/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-zinc-400 font-medium shrink-0 mr-1">
                  Collections:
                </span>
                <button
                  type="button"
                  onClick={() => setSecondaryCategory('all')}
                  className={cn(
                    'shrink-0 rounded-md px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer flex items-center gap-1.5',
                    secondaryCategory === 'all'
                      ? 'border-zinc-900 bg-zinc-900 text-white font-medium shadow-xs'
                      : 'border-zinc-200 bg-white/90 text-zinc-600 hover:bg-zinc-100 hover:text-black'
                  )}
                >
                  <span>All Collections</span>
                  <span className={cn('text-[0.65rem] px-1.5 py-0.2 rounded font-mono', secondaryCategory === 'all' ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500')}>
                    {normalizedLaminates.length}
                  </span>
                </button>
                {dynamicLaminateCollections.map((col) => {
                  const isColActive = secondaryCategory === col.slug;
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setSecondaryCategory(col.slug)}
                      className={cn(
                        'shrink-0 rounded-md px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer flex items-center gap-1.5',
                        isColActive
                          ? 'border-zinc-900 bg-zinc-900 text-white font-medium shadow-xs'
                          : 'border-zinc-200 bg-white/90 text-zinc-600 hover:bg-zinc-100 hover:text-black'
                      )}
                    >
                      <span>{col.name}</span>
                      <span className={cn('text-[0.65rem] px-1.5 py-0.2 rounded font-mono', isColActive ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500')}>
                        {col.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Secondary Category Sub-tabs when Agricultural Products is active */}
            {activeDivision === 'agricultural' && (
              <div className="mt-2 pt-3 border-t border-zinc-200/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-zinc-400 font-medium shrink-0 mr-1">
                  APEDA Categories:
                </span>
                <button
                  type="button"
                  onClick={() => setSecondaryCategory('all')}
                  className={cn(
                    'shrink-0 rounded-md px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer flex items-center gap-1.5',
                    secondaryCategory === 'all'
                      ? 'border-zinc-900 bg-zinc-900 text-white font-medium shadow-xs'
                      : 'border-zinc-200 bg-white/90 text-zinc-600 hover:bg-zinc-100 hover:text-black'
                  )}
                >
                  <span>All APEDA Categories</span>
                  <span className={cn('text-[0.65rem] px-1.5 py-0.2 rounded font-mono', secondaryCategory === 'all' ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500')}>
                    {allAgri.length}
                  </span>
                </button>
                {dynamicAgriCategories.map((ag) => {
                  const isAgActive = secondaryCategory === ag.slug;
                  return (
                    <button
                      key={ag.id}
                      type="button"
                      onClick={() => setSecondaryCategory(ag.slug)}
                      className={cn(
                        'shrink-0 rounded-md px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer flex items-center gap-1.5',
                        isAgActive
                          ? 'border-zinc-900 bg-zinc-900 text-white font-medium shadow-xs'
                          : 'border-zinc-200 bg-white/90 text-zinc-600 hover:bg-zinc-100 hover:text-black'
                      )}
                    >
                      <span>{ag.name}</span>
                      <span className={cn('text-[0.65rem] px-1.5 py-0.2 rounded font-mono', isAgActive ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500')}>
                        {ag.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </FadeInView>

        {/* Exactly 6 Products Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: SMOOTH_EASE, delay: idx * 0.05 }}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest('a, button')) return;
                  const detailUrl = product.division === 'agricultural' ? `/agricultural-products/${product.slug}` : `/laminates/${product.slug}`;
                  router.push(detailUrl);
                }}
                className="group relative flex flex-col justify-between border border-zinc-200 bg-white p-5 hover:border-zinc-950 hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer select-none"
              >
                {/* Product Image */}
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 border border-zinc-200/80 rounded-xl">
                    <img
                      src={product.images?.[0] || (product.division === 'agricultural' ? '/alphonso_mangoes_Hapus.webp' : '/acryglo_cast_acrylic_sheets.webp')}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = product.division === 'agricultural' ? '/alphonso_mangoes_Hapus.webp' : '/acryglo_cast_acrylic_sheets.webp';
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-[0.65rem] bg-black/85 backdrop-blur-sm border border-zinc-700 px-2 py-0.5 text-zinc-200 rounded">
                        {product.productCode}
                      </span>
                      {product.division === 'agricultural' && (
                        <span className="font-mono text-[0.62rem] bg-emerald-950/90 text-emerald-300 border border-emerald-700/80 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                          APEDA · Pure Veg
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Title & Short Info */}
                  <div className="mt-4">
                    <span className="text-[0.68rem] font-mono text-zinc-500 uppercase tracking-wider font-medium block mb-1">
                      {product.division === 'agricultural'
                        ? ((product as Partial<AgriculturalProduct>).apedaSchedule?.split('/')[1]?.trim() || 'Agricultural Export')
                        : (product.mainCategory?.replace(/-/g, ' ') || product.category || 'Surface Materials')}
                    </span>
                    <h3 className="font-display text-base font-semibold text-zinc-950 group-hover:text-zinc-700 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed line-clamp-2">
                      {product.shortDescription || product.description}
                    </p>
                  </div>

                  {/* Specifications snippet */}
                  {product.specifications && product.specifications.length > 0 && (
                    <div className="mt-4 border-t border-zinc-100 pt-3 space-y-1.5 text-[0.72rem]">
                      {product.specifications.slice(0, 3).map((spec) => (
                        <div key={spec.label} className="flex items-center justify-between text-zinc-600 font-mono">
                          <span className="text-zinc-500">{spec.label}</span>
                          <span className="text-zinc-900 font-medium text-right truncate max-w-[55%]">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Status / Details Indicator */}
                <div className="mt-6 pt-3.5 border-t border-zinc-100 flex items-center justify-between gap-2 font-mono text-xs">
                  <span className="text-[0.72rem] text-zinc-500 flex items-center gap-1.5 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    {product.division === 'agricultural' ? ((product as Partial<AgriculturalProduct>).availability || 'Export Standard') : 'Wholesale B2B'}
                  </span>
                  <span className="text-[0.72rem] font-semibold text-zinc-700 group-hover:text-zinc-950 flex items-center gap-1 group-hover:translate-x-0.5 transition-all">
                    View Specifications →
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA Bar: Browse All Categories and Products */}
        <FadeInView delay={0.2} yOffset={25} className="mt-12 p-8 rounded-2xl border border-zinc-800 bg-[#09090B] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="font-mono text-[0.68rem] uppercase tracking-widest text-zinc-400 font-medium block mb-1">
              FULL B2B INVENTORY
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              {activeDivision === 'agricultural'
                ? 'Looking for APEDA certified agricultural commodities?'
                : activeDivision === 'asa-laminates'
                ? 'Looking for high-durability ASA architectural surfaces?'
                : 'Looking for a specific material grade, thickness, or sheet spec?'}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              {activeDivision === 'agricultural'
                ? 'Explore all 27 certified 100% Pure Vegetarian agricultural commodities across floriculture, fresh produce, grains, and honey.'
                : activeDivision === 'asa-laminates'
                ? 'Explore all 100 Eximer technology architectural laminates across 6 designer collections.'
                : 'Explore our complete directory across virgin cast acrylic sheets, PVC foam boards, WPC sheets, and PP/HIPS films.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href={activeDivision === 'all' ? '/laminates?division=all' : `/laminates?division=${activeDivision}`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black font-mono font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-md transition-all"
            >
              <span>
                {activeDivision === 'agricultural'
                  ? 'Explore Agricultural Products'
                  : activeDivision === 'asa-laminates'
                  ? 'Explore ASA Laminates'
                  : 'Explore All 432 Products'}
              </span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </FadeInView>

      </Shell>
    </section>
  );
}
