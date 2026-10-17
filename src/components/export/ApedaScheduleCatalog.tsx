"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, FileCheck, ArrowUpRight, ArrowRight, Layers, CheckCircle2, Sprout } from 'lucide-react';
import { Shell } from '../ui/Section';
import { FadeInView, SMOOTH_EASE } from '../motion/ViewportMotion';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { agriculturalProducts as seedProducts, getApedaItemDisplay } from '../../data/agriculturalProducts';
import type { AgriculturalProduct } from '../../types/agriculturalProduct';
import { cn } from '../../utils/cn';

interface ScheduleCategoryMeta {
  id: string;
  scheduleNumber: string;
  englishTitle: string;
  description: string;
  isPureVegCategory04?: boolean;
}

const APEDA_SCHEDULE_CATEGORIES: ScheduleCategoryMeta[] = [
  {
    id: 'floriculture-seeds',
    scheduleNumber: '01',
    englishTitle: 'Floriculture & Seeds',
    description: 'Commercial cut flowers, certified hybrid vegetable seeds, and pharmacopeia-grade organic herbal and medicinal plants.'
  },
  {
    id: 'fruits-vegetables',
    scheduleNumber: '02',
    englishTitle: 'Fresh Fruits & Vegetables',
    description: 'Fresh red onions from Nashik, GI-tagged Alphonso and Kesar mangoes, Thompson seedless table grapes, Kashmiri walnuts, and selected fresh produce.'
  },
  {
    id: 'processed-fruits-vegetables',
    scheduleNumber: '03',
    englishTitle: 'Processed Fruits & Vegetables',
    description: 'Dehydrated onion flakes and powders, aseptic Alphonso mango pulp, authentic traditional Indian pickles, and processed fruit purees.'
  },
  {
    id: 'dairy-honey',
    scheduleNumber: '04',
    englishTitle: 'Dairy Products & Honey (Pure Vegetarian)',
    description: 'Strictly pure vegetarian dairy commodities: spray-dried skimmed milk powder (SMP) and 100% natural multifloral raw forest honey.',
    isPureVegCategory04: true
  },
  {
    id: 'other-processed-foods',
    scheduleNumber: '05',
    englishTitle: 'Other Processed Foods',
    description: 'Shelled bold groundnuts, food-grade refined guar gum (E412), chemical-free sugarcane jaggery, pure cocoa powder, and fortified cereal preparations.'
  },
  {
    id: 'cereals',
    scheduleNumber: '06',
    englishTitle: 'Cereals & Basmati Rice',
    description: 'Aged 1121 extra long grain basmati rice, long grain silky polished non-basmati rice, high-protein milling wheat, and Indian coarse nutri-millets.'
  },
  {
    id: 'de-oiled-rice-bran',
    scheduleNumber: '08',
    englishTitle: 'De-oiled Rice Bran',
    description: 'Nutrient-dense de-oiled rice bran meal (DORB) supplied loose or in food-grade bags for feed and industrial applications.'
  }
];

export function ApedaScheduleCatalog() {
  const router = useRouter();
  const { agriculturalProducts: storeProducts, categories: storeCategories } = usePublicCatalogue();
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const allAgri = useMemo(() => {
    return storeProducts && storeProducts.length > 0 ? storeProducts : seedProducts;
  }, [storeProducts]);

  const combinedCategories = useMemo<ScheduleCategoryMeta[]>(() => {
    const existingIds = new Set(APEDA_SCHEDULE_CATEGORIES.map((c) => c.id));
    const custom: ScheduleCategoryMeta[] = (storeCategories || [])
      .filter((c) => !existingIds.has(c.slug))
      .map((c, i) => ({
        id: c.slug,
        scheduleNumber: String(APEDA_SCHEDULE_CATEGORIES.length + i + 1).padStart(2, '0'),
        englishTitle: c.name,
        description: c.description || `${c.name} certified APEDA export catalog.`,
        isPureVegCategory04: false
      }));
    return [...APEDA_SCHEDULE_CATEGORIES, ...custom];
  }, [storeCategories]);

  // Alphabetically arranged tabs (with 'all' at the beginning)
  const tabOptions = useMemo(() => {
    const list = combinedCategories.map((c) => {
      const count = allAgri.filter((p) => p.category === c.id).length;
      return {
        id: c.id,
        name: c.englishTitle,
        count
      };
    });
    list.sort((a, b) => a.name.localeCompare(b.name));
    return [{ id: 'all', name: 'All APEDA Categories', count: allAgri.length }, ...list];
  }, [combinedCategories, allAgri]);

  // Filtered categories and products
  const displayedCategories = useMemo(() => {
    const term = search.trim().toLowerCase();

    return combinedCategories.filter((cat) => {
      if (selectedCat !== 'all' && cat.id !== selectedCat) return false;
      return true;
    }).map((cat) => {
      const categoryProducts = allAgri.filter((p) => {
        if (p.category !== cat.id) return false;
        if (!term) return true;
        return (
          p.name.toLowerCase().includes(term) ||
          (p.productCode && p.productCode.toLowerCase().includes(term)) ||
          (p.apedaItem && p.apedaItem.toLowerCase().includes(term)) ||
          p.grade.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
        );
      });

      return {
        ...cat,
        products: categoryProducts
      };
    }).filter((cat) => cat.products.length > 0);
  }, [selectedCat, allAgri, search]);

  const totalMatchingProducts = useMemo(() => {
    return displayedCategories.reduce((acc, cat) => acc + cat.products.length, 0);
  }, [displayedCategories]);

  return (
    <section className="w-full bg-[#FAFAFA] pt-8 pb-20 sm:pt-10 sm:pb-24 lg:pt-12 lg:pb-28" id="apeda-schedule">
      <Shell>
        
        {/* Section Header */}
        <FadeInView yOffset={20}>
          <div className="max-w-3xl">
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-emerald-800 font-semibold flex items-center gap-2 mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              MINISTRY OF COMMERCE & INDUSTRY · GOVERNMENT OF INDIA
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-950 tracking-tight leading-tight">
              APEDA Certified Export Categories & Products
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
              Official Certified portfolio registered under the <strong>APEDA Act 1985</strong> (Registration Certificate No. 207180) for Swami Marvels. Below is the complete statutory breakdown across all 7 certified categories and 27 export commodities.
            </p>
          </div>

          {/* Strict Pure Vegetarian Provision Callout */}
          <div className="mt-6 rounded-xl border border-emerald-300/80 bg-emerald-50/70 p-5 text-zinc-900 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-emerald-700 p-1 text-white shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-emerald-950">
                    Strict 100% Pure Vegetarian Export Guarantee
                  </h4>
                  <p className="mt-1 text-xs text-emerald-900 leading-relaxed">
                    Under the APEDA statutory schedule, Category 04 ("Animal Products") registration for Swami Marvels is strictly and solely restricted to <strong>Item 01: Dairy Products</strong> and <strong>Item 02: Natural Honey</strong>. Absolutely <span className="bg-red-600 text-white font-bold px-1.5 py-0.5 rounded shadow-xs">ZERO</span> meat, poultry, marine, or non-vegetarian food products are traded or exported.
                  </p>
                </div>
              </div>

              <a
                href="/apeda_certificate.webp"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-emerald-600 bg-white px-3.5 py-2 font-mono text-xs text-emerald-950 hover:bg-emerald-100/80 font-medium transition-colors"
              >
                <FileCheck className="h-3.5 w-3.5 text-emerald-700" />
                <span>View Certificate</span>
              </a>
            </div>
          </div>
        </FadeInView>

        {/* Filter Controls & Search */}
        <div className="mt-10 space-y-4">
          {/* Alphabetical Category Filter Tabs */}
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0 border-b border-zinc-200 pb-3">
            {tabOptions.map((tab) => {
              const isActive = selectedCat === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCat(tab.id)}
                  className={cn(
                    'min-h-[40px] shrink-0 rounded-lg px-3.5 py-2 text-xs font-mono tracking-wider transition-all duration-200 border cursor-pointer flex items-center gap-2 shadow-xs',
                    isActive
                      ? 'border-zinc-950 bg-zinc-950 text-white font-semibold shadow-md'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:text-black hover:bg-zinc-100/70'
                  )}
                >
                  <span>{tab.name}</span>
                  <span
                    className={cn(
                      'text-[0.68rem] px-2 py-0.5 rounded font-mono font-medium',
                      isActive ? 'bg-zinc-800 text-zinc-100' : 'bg-zinc-100 text-zinc-600'
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input and Counter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="relative w-full sm:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search APEDA commodities, schedules, or codes..."
                className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-4 font-mono text-xs text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-950 shadow-xs transition-colors"
              />
            </div>

            <span className="font-mono text-xs text-zinc-500 shrink-0">
              Showing <strong className="text-zinc-950">{totalMatchingProducts}</strong> scheduled products in <strong className="text-zinc-950">{displayedCategories.length}</strong> categories
            </span>
          </div>
        </div>

        {/* Categories & Products Showcase */}
        <div className="mt-12 space-y-16">
          {displayedCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs"
            >
              {/* Category Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-100 pb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="rounded bg-zinc-950 px-2.5 py-1 font-mono text-[0.68rem] font-bold text-amber-400 uppercase tracking-widest">
                      Schedule {category.scheduleNumber}
                    </span>
                    {category.isPureVegCategory04 && (
                      <span className="rounded bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 font-mono text-[0.68rem] font-bold">
                        100% PURE VEG ONLY
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-950">
                    {category.englishTitle}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 max-w-3xl leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg text-zinc-600 font-medium">
                    {category.products.length} {category.products.length === 1 ? 'Commodity' : 'Commodities'}
                  </span>
                </div>
              </div>

              {/* Products Grid for this Category */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => router.push(`/agricultural-products/${product.slug}`)}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200/90 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-950 hover:shadow-xl cursor-pointer select-none"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-zinc-100">
                        <img
                          src={product.images?.[0] || '/alphonso_mangoes_Hapus.webp'}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/alphonso_mangoes_Hapus.webp';
                          }}
                        />

                        {/* Top Code Badge & APEDA Schedule Item */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-[0.65rem] bg-black/85 backdrop-blur-sm border border-zinc-700 px-2 py-0.5 text-zinc-200 rounded font-medium">
                            {product.productCode}
                          </span>
                        </div>

                        {/* Hover quick detail arrow */}
                        <span className="pointer-events-none absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950 text-white opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100">
                          <ArrowUpRight className="h-3.5 w-3.5 stroke-[2]" />
                        </span>
                      </div>

                      {/* Certificate Item Specification Tag */}
                      <div className="mt-3.5 flex items-center gap-1.5 min-w-0">
                        <span
                          className="text-[0.68rem] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded font-semibold truncate block max-w-full"
                          title={getApedaItemDisplay(product) || `Item ${category.scheduleNumber}`}
                        >
                          {getApedaItemDisplay(product) || `Item ${category.scheduleNumber}`}
                        </span>
                      </div>

                      {/* Product Title */}
                      <h4
                        className="mt-2 font-display text-base font-semibold leading-snug text-zinc-950 group-hover:text-zinc-700 transition-colors line-clamp-2"
                        title={product.name}
                      >
                        {product.name}
                      </h4>

                      {/* Grade & Description */}
                      <p
                        className="mt-1.5 text-xs text-zinc-600 line-clamp-2 leading-relaxed break-words"
                        title={product.grade}
                      >
                        {product.grade}
                      </p>

                      {/* Packaging Snippet */}
                      {product.packaging && (
                        <div className="mt-3 border-t border-zinc-100 pt-2.5 text-[0.72rem] font-mono text-zinc-500 flex items-baseline gap-1.5 min-w-0">
                          <span className="text-zinc-400 shrink-0">Packaging:</span>
                          <span
                            className="text-zinc-800 truncate min-w-0 flex-1 block"
                            title={product.packaging}
                          >
                            {product.packaging}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Footer - Clean Indicator */}
                    <div className="mt-5 pt-3.5 border-t border-zinc-100 flex items-center justify-between gap-3 font-mono text-xs min-w-0">
                      <span
                        className="text-[0.72rem] text-zinc-500 flex items-center gap-1.5 font-medium min-w-0 truncate"
                        title={product.availability || 'Export Certified'}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span className="truncate">{product.availability || 'Export Certified'}</span>
                      </span>
                      <span className="text-[0.72rem] font-semibold text-zinc-700 group-hover:text-zinc-950 flex items-center gap-1 group-hover:translate-x-0.5 transition-all shrink-0">
                        View Details →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {displayedCategories.length === 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center shadow-xs">
              <Sprout className="mx-auto h-8 w-8 text-zinc-400 mb-3" />
              <h3 className="font-display text-xl font-medium text-zinc-950">No commodities found</h3>
              <p className="mt-2 text-xs font-mono text-zinc-500 max-w-md mx-auto">
                No scheduled products matched "{search}". Try clearing your search query or choose "All APEDA Categories".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedCat('all');
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-zinc-950 hover:bg-zinc-800 px-6 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold text-white transition-colors shadow-sm cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA Bar */}
        <FadeInView delay={0.2} yOffset={25} className="mt-16 p-8 rounded-2xl border border-zinc-800 bg-[#09090B] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="font-mono text-[0.68rem] uppercase tracking-widest text-emerald-400 font-medium block mb-1">
              FULL APEDA SCHEDULE COMPLIANCE
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Need Phytosanitary Documentation or Container Quotation?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              Swami Marvels provides full B2B phytosanitary certifications, certificate of origin, pre-shipment lab analysis, and custom export packing for all scheduled commodities.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Link
              href="/contact?inquiry=apeda-export"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-400 hover:bg-amber-300 px-6 py-3 font-mono text-xs uppercase tracking-wider font-bold text-zinc-950 transition-colors shadow-md cursor-pointer"
            >
              Contact Export Desk
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeInView>

      </Shell>
    </section>
  );
}
