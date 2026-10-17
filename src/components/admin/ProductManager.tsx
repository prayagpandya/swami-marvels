"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PencilIcon, PlusIcon, StarIcon, Trash2Icon, Layers, Leaf, Sparkles, Filter, Search } from 'lucide-react';
import type { Product } from '../../types/product';
import type { Laminate } from '../../types/laminate';
import type { AgriculturalProduct } from '../../types/agriculturalProduct';
import { useStore } from '../../contexts/StoreContext';
import { AdminButton, AdminInput, AdminPageHeader, EmptyState, Toggle } from './ui';
import { ProductForm } from './ProductForm';
import { SMOOTH_EASE } from '../motion/ViewportMotion';
import { cn } from '../../utils/cn';
import { ALL_SUBCATEGORIES, getSubcategoriesByCategory } from '../../data/productTaxonomy';

export type ActiveDivision = 'acrylic-sheets' | 'asa-laminates' | 'agricultural' | 'all';

interface Props {
  division?: any;
  initialDivision?: ActiveDivision;
}

export function ProductManager({ division, initialDivision = 'acrylic-sheets' }: Props) {
  const store = useStore();
  const [activeDivision, setActiveDivision] = useState<ActiveDivision>(
    division === 'laminate' ? 'asa-laminates' : division === 'agricultural' ? 'agricultural' : initialDivision
  );

  useEffect(() => {
    if (initialDivision) {
      setActiveDivision(initialDivision);
    }
  }, [initialDivision]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [formOpen, setFormOpen] = useState(false);

  // Sheets data (acrylic, pvc, wpc, pp)
  const sheetProducts = useMemo(() => {
    return store.products.filter((p: any) => p.division !== 'agricultural' && p.mainCategory !== 'asa-laminates');
  }, [store.products]);

  // ASA Laminates data
  const laminateProducts = useMemo(() => {
    return store.laminates;
  }, [store.laminates]);

  // Agricultural Products data
  const agriProducts = useMemo(() => {
    return store.agriculturalProducts;
  }, [store.agriculturalProducts]);

  // Combined product list based on selected division
  const currentList = useMemo(() => {
    if (activeDivision === 'acrylic-sheets') return sheetProducts;
    if (activeDivision === 'asa-laminates') return laminateProducts;
    if (activeDivision === 'agricultural') return agriProducts;
    // 'all': Combine all
    return [...sheetProducts, ...laminateProducts, ...agriProducts];
  }, [activeDivision, sheetProducts, laminateProducts, agriProducts]);

  // Filter options for the active division
  const categoryOptions = useMemo(() => {
    if (activeDivision === 'acrylic-sheets') {
      return [
        { id: 'all', label: 'All Sheet Types', count: sheetProducts.length },
        ...(store.sheetCategories || []).map((sc) => ({
          id: sc.slug,
          label: sc.name,
          count: sheetProducts.filter((p: any) => p.mainCategory === sc.slug || p.category === sc.slug).length
        }))
      ];
    }

    if (activeDivision === 'asa-laminates') {
      return [
        { id: 'all', label: 'All Collections', count: laminateProducts.length },
        ...(store.collections || []).map((col) => ({
          id: col.slug,
          label: col.name,
          count: laminateProducts.filter((l: any) => l.collection === col.slug || l.category === col.slug || l.subcategory === col.slug).length
        }))
      ];
    }

    if (activeDivision === 'agricultural') {
      return [
        { id: 'all', label: 'All APEDA Categories', count: agriProducts.length },
        ...(store.categories || []).map((cat) => ({
          id: cat.slug,
          label: cat.name,
          count: agriProducts.filter((p: any) => p.category === cat.slug).length
        }))
      ];
    }

    return [];
  }, [activeDivision, sheetProducts, laminateProducts, agriProducts, store.sheetCategories, store.collections, store.categories]);

  // Subcategories list when Acrylic Sheets is active
  const availableSubcategories = useMemo(() => {
    if (activeDivision !== 'acrylic-sheets') return [];
    const dynamicSubs = (store.sheetSubcategories || []).filter((s: any) =>
      selectedCategory === 'all' ? true : s.categorySlug === selectedCategory
    );
    const seedSubs = selectedCategory === 'all'
      ? ALL_SUBCATEGORIES.filter((s: any) => s.categorySlug !== 'asa-laminates' && s.categorySlug !== 'agricultural-exports')
      : getSubcategoriesByCategory(selectedCategory);

    const seen = new Set<string>();
    const list: any[] = [];
    [...dynamicSubs, ...seedSubs].forEach((sub: any) => {
      const slug = sub.slug || sub.id;
      if (!seen.has(slug)) {
        seen.add(slug);
        list.push(sub);
      }
    });

    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [activeDivision, selectedCategory, store.sheetSubcategories]);

  // Count of featured products in the current active list
  const featuredCount = useMemo(() => {
    return currentList.filter((p: any) => Boolean(p.featured)).length;
  }, [currentList]);

  // Filtered dataset
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return currentList.filter((p: any) => {
      // Featured filter
      if (onlyFeatured && !p.featured) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (activeDivision === 'acrylic-sheets') {
          if (p.mainCategory !== selectedCategory && p.category !== selectedCategory) return false;
        } else if (activeDivision === 'asa-laminates') {
          if (p.collection !== selectedCategory && p.subcategory !== selectedCategory) return false;
        } else if (activeDivision === 'agricultural') {
          if (p.category !== selectedCategory) return false;
        }
      }

      // Subcategory filter (for sheets)
      if (activeDivision === 'acrylic-sheets' && selectedSubcategory !== 'all') {
        if (p.subcategory !== selectedSubcategory && p.subcategorySlug !== selectedSubcategory) return false;
      }

      // Search query
      if (term) {
        const matchesName = p.name?.toLowerCase().includes(term);
        const matchesCode = (p.productCode || p.SKU || '')?.toLowerCase().includes(term);
        const matchesCategory = (p.category || p.mainCategory || '')?.toLowerCase().includes(term);
        const matchesSubcategory = (p.subcategory || p.collection || '')?.toLowerCase().includes(term);
        const matchesDesc = p.description?.toLowerCase().includes(term);
        if (!matchesName && !matchesCode && !matchesCategory && !matchesSubcategory && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [currentList, activeDivision, selectedCategory, selectedSubcategory, search, onlyFeatured]);

  const handleSave = (item: any) => {
    const isLaminate = item.division === 'laminate' || 'collection' in item;
    const isAgri = item.division === 'agricultural' || 'apedaSchedule' in item;

    if (isLaminate) {
      store.saveLaminate(item as Laminate);
    } else if (isAgri) {
      store.saveAgriProduct(item as AgriculturalProduct);
    } else {
      store.saveProduct(item as Product);
    }
  };

  const handleRemove = (product: any) => {
    const isLaminate = product.division === 'laminate' || 'collection' in product;
    const isAgri = product.division === 'agricultural' || 'apedaSchedule' in product;

    if (isLaminate) {
      store.deleteLaminate(product.id);
    } else if (isAgri) {
      store.deleteAgriProduct(product.id);
    } else {
      store.deleteProduct(product.id);
    }
  };

  const handleDivisionChange = (div: ActiveDivision) => {
    setActiveDivision(div);
    setSelectedCategory('all');
    setSelectedSubcategory('all');
  };

  return (
    <div className="pt-2 space-y-6">
      {/* Page Header */}
      <AdminPageHeader
        title="Master Product Catalog"
        description="Comprehensive inventory management across Acrylic Sheets, ASA Architectural Laminates, and APEDA Agricultural Commodities."
        action={
          <AdminButton
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            <PlusIcon className="h-4 w-4 text-zinc-950" aria-hidden="true" />
            <span>Add Product</span>
          </AdminButton>
        }
      />

      {/* Primary Division Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2.5 border-b border-zinc-800 pb-4">
        <button
          type="button"
          onClick={() => handleDivisionChange('acrylic-sheets')}
          className={cn(
            'flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-150 border cursor-pointer',
            activeDivision === 'acrylic-sheets'
              ? 'bg-zinc-800 text-white font-semibold border-zinc-600 shadow-sm border-b-2 border-b-amber-400'
              : 'bg-[#121216] text-zinc-300 hover:text-white hover:bg-zinc-800 border-zinc-700/80'
          )}
        >
          <Layers className={cn('h-4 w-4', activeDivision === 'acrylic-sheets' ? 'text-amber-400' : 'text-zinc-400')} />
          <span>Acrylic Sheets</span>
          <span className={cn('text-[0.68rem] px-2 py-0.5 rounded font-mono font-semibold', activeDivision === 'acrylic-sheets' ? 'bg-amber-400/20 text-amber-300' : 'bg-zinc-800 text-zinc-300')}>
            {sheetProducts.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleDivisionChange('asa-laminates')}
          className={cn(
            'flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-150 border cursor-pointer',
            activeDivision === 'asa-laminates'
              ? 'bg-zinc-800 text-white font-semibold border-zinc-600 shadow-sm border-b-2 border-b-amber-400'
              : 'bg-[#121216] text-zinc-300 hover:text-white hover:bg-zinc-800 border-zinc-700/80'
          )}
        >
          <Sparkles className={cn('h-4 w-4', activeDivision === 'asa-laminates' ? 'text-amber-400' : 'text-zinc-400')} />
          <span>ASA Laminates</span>
          <span className={cn('text-[0.68rem] px-2 py-0.5 rounded font-mono font-semibold', activeDivision === 'asa-laminates' ? 'bg-amber-400/20 text-amber-300' : 'bg-zinc-800 text-zinc-300')}>
            {laminateProducts.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleDivisionChange('agricultural')}
          className={cn(
            'flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-150 border cursor-pointer',
            activeDivision === 'agricultural'
              ? 'bg-zinc-800 text-white font-semibold border-zinc-600 shadow-sm border-b-2 border-b-amber-400'
              : 'bg-[#121216] text-zinc-300 hover:text-white hover:bg-zinc-800 border-zinc-700/80'
          )}
        >
          <Leaf className={cn('h-4 w-4', activeDivision === 'agricultural' ? 'text-emerald-400' : 'text-zinc-400')} />
          <span>Agricultural Products</span>
          <span className={cn('text-[0.68rem] px-2 py-0.5 rounded font-mono font-semibold', activeDivision === 'agricultural' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-zinc-800 text-zinc-300')}>
            {agriProducts.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleDivisionChange('all')}
          className={cn(
            'flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-150 border cursor-pointer',
            activeDivision === 'all'
              ? 'bg-zinc-800 text-white font-semibold border-zinc-600 shadow-sm border-b-2 border-b-amber-400'
              : 'bg-[#121216] text-zinc-300 hover:text-white hover:bg-zinc-800 border-zinc-700/80'
          )}
        >
          <span>All Products</span>
          <span className={cn('text-[0.68rem] px-2 py-0.5 rounded font-mono font-semibold', activeDivision === 'all' ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-300')}>
            {sheetProducts.length + laminateProducts.length + agriProducts.length}
          </span>
        </button>
      </div>

      {/* Secondary Category Filter Pills */}
      {categoryOptions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="font-mono text-[0.72rem] uppercase tracking-wider text-zinc-300 font-semibold mr-1 flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-amber-400" />
            <span>Category:</span>
          </span>
          {categoryOptions.map((opt) => {
            const isSelected = selectedCategory === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(opt.id);
                  setSelectedSubcategory('all');
                }}
                className={cn(
                  'px-3.5 py-1.5 rounded-md text-xs font-mono transition-all border cursor-pointer flex items-center gap-2',
                  isSelected
                    ? 'bg-white text-zinc-950 font-semibold border-white shadow-xs'
                    : 'bg-[#16161C] text-zinc-300 hover:text-white hover:bg-zinc-800 border-zinc-700'
                )}
              >
                <span>{opt.label}</span>
                <span className={cn('text-[0.68rem] px-1.5 py-0.2 rounded font-semibold', isSelected ? 'bg-zinc-200 text-zinc-950' : 'bg-zinc-800 text-zinc-400')}>
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Subcategory dropdown (if Sheet Products active) */}
      {activeDivision === 'acrylic-sheets' && availableSubcategories.length > 0 && (
        <div className="flex items-center gap-3 bg-[#14141A] p-3 rounded-lg border border-zinc-700/80">
          <span className="font-mono text-xs text-zinc-200 font-semibold whitespace-nowrap">
            Subcategory:
          </span>
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="bg-[#1C1C24] border border-zinc-700 text-white rounded-md px-3 py-1.5 text-xs font-mono outline-none focus:border-amber-400"
          >
            <option value="all">All Subcategories ({sheetProducts.length} items)</option>
            {availableSubcategories.map((sub: any) => (
              <option key={sub.id} value={sub.slug}>
                {sub.name}
              </option>
            ))}
          </select>
          {selectedSubcategory !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedSubcategory('all')}
              className="text-xs font-mono text-amber-400 hover:underline cursor-pointer"
            >
              Clear subcategory filter
            </button>
          )}
        </div>
      )}

      {/* Search, Featured Filter & Results Counter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="w-full sm:max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            <AdminInput
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name, SKU / code, or specs..."
              aria-label="Search products"
              className="pl-10"
            />
          </div>

          {/* Featured Only Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setOnlyFeatured((prev) => !prev)}
            className={cn(
              'shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-150 border cursor-pointer select-none',
              onlyFeatured
                ? 'bg-amber-400 text-zinc-950 font-bold border-amber-400 shadow-md ring-2 ring-amber-400/30'
                : 'bg-[#16161C] text-zinc-300 hover:text-white hover:bg-zinc-800 border-zinc-700'
            )}
            aria-pressed={onlyFeatured}
            title={onlyFeatured ? 'Showing featured products only. Click to show all products.' : 'Filter to display featured products only.'}
          >
            <StarIcon
              className={cn(
                'h-3.5 w-3.5',
                onlyFeatured ? 'fill-zinc-950 stroke-zinc-950' : 'fill-none stroke-amber-400'
              )}
            />
            <span>Featured Only</span>
            <span
              className={cn(
                'text-[0.68rem] px-1.5 py-0.2 rounded font-mono font-semibold',
                onlyFeatured ? 'bg-zinc-950 text-amber-300' : 'bg-zinc-800 text-zinc-300'
              )}
            >
              {featuredCount}
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 font-mono text-xs text-zinc-300 font-medium shrink-0">
          {(onlyFeatured || selectedCategory !== 'all' || selectedSubcategory !== 'all' || search.trim()) && (
            <button
              type="button"
              onClick={() => {
                setOnlyFeatured(false);
                setSelectedCategory('all');
                setSelectedSubcategory('all');
                setSearch('');
              }}
              className="text-amber-400 hover:underline cursor-pointer flex items-center gap-1 text-[0.75rem]"
            >
              Reset filters
            </button>
          )}
          <p>
            Showing <span className="text-white font-bold text-sm">{filtered.length}</span> of {currentList.length} items
          </p>
        </div>
      </div>

      {/* Product Catalog Master View: Fluid Table (Desktop/Tablet) + Cards (Mobile) */}
      {filtered.length ? (
        <>
          {/* Desktop & Tablet Table (Fluid 100% Width - Zero Horizontal Scrollbar) */}
          <div className="hidden md:block rounded-xl border border-zinc-700 bg-[#121217] shadow-2xl overflow-hidden">
            <table className="w-full text-left text-sm table-auto">
              <thead>
                <tr className="border-b border-zinc-700 bg-[#16161D] text-xs uppercase tracking-wider text-zinc-100 font-mono">
                  <th className="px-4 py-3.5 font-bold">Product & Title</th>
                  <th className="px-3 py-3.5 font-bold whitespace-nowrap w-[110px]">Code / SKU</th>
                  <th className="px-3 py-3.5 font-bold whitespace-nowrap">Category & Division</th>
                  <th className="px-3 py-3.5 font-bold whitespace-nowrap max-w-[200px] xl:max-w-[260px]">Specifications / Grade</th>
                  <th className="px-3 py-3.5 font-bold whitespace-nowrap w-[140px]">Status</th>
                  <th className="px-4 py-3.5 text-right font-bold whitespace-nowrap w-[90px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <AnimatePresence initial={false}>
                  {filtered.map((product: any) => {
                    const isAgri = product.division === 'agricultural' || 'apedaSchedule' in product;
                    const isLam = product.division === 'laminate' || 'collection' in product;
                    const image = product.images?.[0] || (isAgri ? '/alphonso_mangoes_Hapus.webp' : '/acryglo_cast_acrylic_sheets.webp');
                    const productCode = product.productCode || product.SKU || 'SM-ITEM';
                    const specText = isAgri
                      ? (product.grade || product.packaging || 'Export Class A+')
                      : isLam
                      ? '1 MM (+/- 10) · Eximer Tech'
                      : (product.specifications?.[0]?.value || '1220 x 2440 mm (4x8 ft)');
                    const catText = product.category?.replace(/-/g, ' ') || product.subcategory?.replace(/-/g, ' ') || 'Standard';
                    const divText = isAgri ? 'APEDA Agricultural' : isLam ? 'ASA Architectural Laminate' : 'Acrylic Sheets';

                    return (
                      <motion.tr
                        key={product.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: SMOOTH_EASE }}
                        className="hover:bg-zinc-800/60 transition-colors"
                      >
                        {/* Product Name & Image */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={image}
                              alt=""
                              className="h-10 w-10 rounded-lg border border-zinc-700 object-cover shrink-0 bg-black"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = isAgri ? '/alphonso_mangoes_Hapus.webp' : '/acryglo_cast_acrylic_sheets.webp';
                              }}
                            />
                            <div className="min-w-0 flex-1">
                              <span className="font-semibold text-white block text-sm leading-snug line-clamp-1" title={product.name}>
                                {product.name}
                              </span>
                              <span className="text-xs font-mono text-zinc-400 block truncate">
                                {product.brand || 'Swami Marvels'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Code / SKU */}
                        <td className="px-3 py-3 font-mono text-xs whitespace-nowrap">
                          <span className="inline-flex items-center whitespace-nowrap rounded bg-zinc-800/90 px-2.5 py-1 text-xs font-bold text-amber-400 border border-zinc-700 tracking-wider font-mono">
                            {productCode}
                          </span>
                        </td>

                        {/* Category & Division */}
                        <td className="px-3 py-3 font-mono text-xs">
                          <span className="block font-semibold text-zinc-100 capitalize truncate max-w-[170px]" title={catText}>
                            {catText}
                          </span>
                          <span className="text-[0.72rem] text-zinc-400 capitalize block truncate max-w-[170px]">
                            {divText}
                          </span>
                        </td>

                        {/* Specifications / Grade */}
                        <td className="px-3 py-3 font-mono text-xs text-zinc-300">
                          <span className="block truncate max-w-[200px] xl:max-w-[260px] text-zinc-300 font-medium" title={specText}>
                            {specText}
                          </span>
                        </td>

                        {/* Status Toggle & Featured Star (Combined) */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Toggle
                              checked={product.published ?? true}
                              onChange={(value) => handleSave({ ...product, published: value })}
                              label={product.published ? 'Live' : 'Draft'}
                            />
                            <button
                              type="button"
                              onClick={() => handleSave({ ...product, featured: !product.featured })}
                              aria-label={product.featured ? 'Remove from featured' : 'Mark as featured'}
                              title={product.featured ? 'Featured product (click to unmark)' : 'Mark as featured'}
                              className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                            >
                              <StarIcon
                                className="h-4 w-4"
                                fill={product.featured ? '#FBBF24' : 'none'}
                                stroke={product.featured ? '#FBBF24' : 'currentColor'}
                              />
                            </button>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditing(product);
                                setFormOpen(true);
                              }}
                              title={`Edit ${product.name}`}
                              aria-label={`Edit ${product.name}`}
                              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/90 hover:bg-zinc-700 px-2.5 py-1.5 text-xs font-mono font-medium text-zinc-200 transition-colors cursor-pointer shadow-xs"
                            >
                              <PencilIcon className="h-3.5 w-3.5 text-zinc-200" />
                              <span className="hidden xl:inline">Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemove(product)}
                              aria-label={`Delete ${product.name}`}
                              title={`Delete ${product.name}`}
                              className="inline-flex items-center justify-center rounded-md border border-red-900/40 bg-red-950/30 hover:bg-red-900/60 p-1.5 text-red-400 hover:text-red-300 transition-colors cursor-pointer shadow-xs"
                            >
                              <Trash2Icon className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile & Small Device Card Layout (Fluid - Zero Horizontal Scrolling) */}
          <div className="md:hidden space-y-3">
            <AnimatePresence initial={false}>
              {filtered.map((product: any) => {
                const isAgri = product.division === 'agricultural' || 'apedaSchedule' in product;
                const isLam = product.division === 'laminate' || 'collection' in product;
                const image = product.images?.[0] || (isAgri ? '/alphonso_mangoes_Hapus.webp' : '/acryglo_cast_acrylic_sheets.webp');
                const productCode = product.productCode || product.SKU || 'SM-ITEM';
                const specText = isAgri
                  ? (product.grade || product.packaging || 'Export Class A+')
                  : isLam
                  ? '1 MM (+/- 10) · Eximer Tech'
                  : (product.specifications?.[0]?.value || '1220 x 2440 mm (4x8 ft)');
                const catText = product.category?.replace(/-/g, ' ') || product.subcategory?.replace(/-/g, ' ') || 'Standard';
                const divText = isAgri ? 'APEDA Agricultural' : isLam ? 'ASA Laminate' : 'Acrylic Sheets';

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: SMOOTH_EASE }}
                    className="rounded-xl border border-zinc-700 bg-[#121217] p-4 shadow-xl space-y-3"
                  >
                    {/* Header Row: Thumbnail + Product Name + SKU */}
                    <div className="flex items-start gap-3">
                      <img
                        src={image}
                        alt=""
                        className="h-12 w-12 rounded-lg border border-zinc-700 object-cover shrink-0 bg-black mt-0.5"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = isAgri ? '/alphonso_mangoes_Hapus.webp' : '/acryglo_cast_acrylic_sheets.webp';
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-white text-sm leading-snug line-clamp-2">
                            {product.name}
                          </h3>
                          <span className="inline-flex items-center rounded bg-zinc-800 px-2 py-0.5 text-[0.68rem] font-bold text-amber-400 border border-zinc-700 font-mono shrink-0">
                            {productCode}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-zinc-400 mt-0.5">{product.brand || 'Swami Marvels'}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs font-mono">
                          <span className="text-zinc-200 font-semibold capitalize">{catText}</span>
                          <span className="text-zinc-500">·</span>
                          <span className="text-zinc-400 text-[0.72rem] capitalize">{divText}</span>
                        </div>
                      </div>
                    </div>

                    {/* Specifications Info Strip */}
                    <div className="rounded-lg bg-zinc-900/90 px-3 py-1.5 text-xs font-mono text-zinc-300 border border-zinc-800 flex items-center justify-between gap-2">
                      <span className="text-zinc-500 text-[0.68rem] uppercase font-bold shrink-0">Specs:</span>
                      <span className="truncate text-zinc-300 font-medium">{specText}</span>
                    </div>

                    {/* Bottom Controls: Live Toggle + Featured Star + Edit + Delete */}
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                      <div className="flex items-center gap-2.5">
                        <Toggle
                          checked={product.published ?? true}
                          onChange={(value) => handleSave({ ...product, published: value })}
                          label={product.published ? 'Live' : 'Draft'}
                        />
                        <button
                          type="button"
                          onClick={() => handleSave({ ...product, featured: !product.featured })}
                          aria-label={product.featured ? 'Remove from featured' : 'Mark as featured'}
                          className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          <StarIcon
                            className="h-4 w-4"
                            fill={product.featured ? '#FBBF24' : 'none'}
                            stroke={product.featured ? '#FBBF24' : 'currentColor'}
                          />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditing(product);
                            setFormOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-mono font-medium transition-colors cursor-pointer"
                        >
                          <PencilIcon className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(product)}
                          aria-label={`Delete ${product.name}`}
                          className="flex items-center justify-center p-2 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-300 border border-red-900/40 transition-colors cursor-pointer"
                        >
                          <Trash2Icon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <div className="mt-8">
          <EmptyState message="No products match the selected category or search criteria." />
        </div>
      )}

      {/* Product Add / Edit Drawer */}
      <AnimatePresence>
        {formOpen && (
          <ProductForm
            division={
              editing
                ? editing.division === 'laminate' || 'collection' in editing
                  ? 'laminate'
                  : editing.division === 'agricultural' || 'apedaSchedule' in editing
                    ? 'agricultural'
                    : 'products'
                : activeDivision === 'asa-laminates'
                  ? 'laminate'
                  : activeDivision === 'agricultural'
                    ? 'agricultural'
                    : 'products'
            }
            initial={editing}
            onClose={() => {
              setFormOpen(false);
              setEditing(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
