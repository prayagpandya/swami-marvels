"use client";

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  Trash2Icon,
  PencilIcon,
  FolderIcon,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers
} from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { AdminButton, AdminField, AdminInput, AdminPageHeader, AdminTextarea } from './ui';
import { AdminSingleImageUpload } from './AdminImageUpload';
import { SMOOTH_EASE } from '../motion/ViewportMotion';
import { cn } from '../../utils/cn';

type DivisionFilter = 'all' | 'acrylic-sheets' | 'asa-laminates' | 'agricultural';

interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  accent?: string;
  order: number;
  division: 'acrylic-sheets' | 'asa-laminates' | 'agricultural';
  divisionName: string;
  productCount: number;
}

interface SubcategoryItem {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  description?: string;
  image?: string;
  order: number;
  productCount: number;
}

interface DraftState {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  accent: string;
  order: number;
  division: 'acrylic-sheets' | 'asa-laminates' | 'agricultural';
  isNew: boolean;
  targetType: 'category' | 'subcategory';
  parentCategorySlug: string;
}

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function CategoryCollectionManager() {
  const store = useStore();
  const {
    products,
    laminates,
    agriculturalProducts,
    categories: agriCategories,
    collections: laminateCollections,
    sheetCategories,
    sheetSubcategories,
    saveCategory,
    deleteCategory,
    saveCollection,
    deleteCollection,
    saveSheetCategory,
    deleteSheetCategory,
    saveSheetSubcategory,
    deleteSheetSubcategory
  } = store;

  const [activeDivision, setActiveDivision] = useState<DivisionFilter>('all');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [notification, setNotification] = useState<string | null>(null);

  // Category & Subcategory draft state (for create/edit)
  const [draft, setDraft] = useState<DraftState | null>(null);

  const toggleCategoryExpanded = (catSlug: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catSlug]: !prev[catSlug]
    }));
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Sheet products (acrylic, pvc, wpc, pp)
  const sheetProducts = useMemo(() => {
    return (products || []).filter((p: any) => p.division !== 'agricultural' && p.mainCategory !== 'asa-laminates');
  }, [products]);

  // Unified categories list with live counts
  const unifiedCategories = useMemo((): CategoryItem[] => {
    const list: CategoryItem[] = [];

    // 1. Acrylic Sheet Categories
    (sheetCategories || []).forEach((sc, idx) => {
      const count = sheetProducts.filter((p: any) => p.mainCategory === sc.slug || p.category === sc.slug).length;
      list.push({
        id: sc.id,
        slug: sc.slug,
        name: sc.name,
        description: sc.description,
        image: sc.image || '/acryglo_cast_acrylic_sheets.webp',
        order: sc.order ?? idx + 1,
        division: 'acrylic-sheets',
        divisionName: 'Acrylic Sheets',
        productCount: count
      });
    });

    // 2. ASA Laminate Collections
    (laminateCollections || []).forEach((col, idx) => {
      const count = (laminates || []).filter((l: any) => l.collection === col.slug || l.category === col.slug).length;
      list.push({
        id: col.id,
        slug: col.slug,
        name: col.name,
        description: col.description,
        image: col.image || '/laminates.jpg',
        accent: col.accent || '#3F3F46',
        order: col.order ?? idx + 1,
        division: 'asa-laminates',
        divisionName: 'ASA Architectural Laminates',
        productCount: count
      });
    });

    // 3. Agricultural Categories
    (agriCategories || []).forEach((cat, idx) => {
      const count = (agriculturalProducts || []).filter((a: any) => a.category === cat.slug).length;
      list.push({
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        image: cat.image || '/alphonso_mangoes_Hapus.webp',
        order: cat.order ?? idx + 1,
        division: 'agricultural',
        divisionName: 'Agricultural Products (APEDA)',
        productCount: count
      });
    });

    return list;
  }, [sheetCategories, laminateCollections, agriCategories, sheetProducts, laminates, agriculturalProducts]);

  // Unified Sheet Subcategories with live product counts
  const unifiedSheetSubcategories = useMemo((): SubcategoryItem[] => {
    return (sheetSubcategories || []).map((sub, idx) => {
      const parentCat = (sheetCategories || []).find(
        (c) => c.slug === sub.categorySlug || c.id === sub.categorySlug
      );
      const parentName = parentCat ? parentCat.name : sub.categorySlug;
      const count = sheetProducts.filter(
        (p: any) =>
          p.subcategory === sub.slug ||
          p.subcategory === sub.id ||
          p.subcategorySlug === sub.slug
      ).length;

      return {
        id: sub.id,
        slug: sub.slug,
        name: sub.name,
        categorySlug: sub.categorySlug,
        categoryName: parentName,
        description: sub.description,
        image: sub.image || parentCat?.image || '/acryglo_cast_acrylic_sheets.webp',
        order: sub.order ?? idx + 1,
        productCount: count
      };
    });
  }, [sheetSubcategories, sheetCategories, sheetProducts]);

  // Filtered categories
  const filteredCategories = useMemo(() => {
    if (activeDivision === 'all') return unifiedCategories;
    return unifiedCategories.filter((c) => c.division === activeDivision);
  }, [unifiedCategories, activeDivision]);

  // Create new category handler (page header button)
  const startCreateCategory = () => {
    const targetDivision = activeDivision === 'all' ? 'acrylic-sheets' : activeDivision;
    setDraft({
      id: `cat-${Date.now()}`,
      slug: '',
      name: '',
      description: '',
      image: '',
      accent: '#D97706',
      order: 99,
      division: targetDivision,
      isNew: true,
      targetType: 'category',
      parentCategorySlug: ''
    });
  };

  // Create new subcategory under a specific category card
  const startCreateSubcategoryFor = (parentCat: CategoryItem) => {
    setDraft({
      id: `sub-${Date.now()}`,
      slug: '',
      name: '',
      description: '',
      image: '',
      accent: '#D97706',
      order: 99,
      division: 'acrylic-sheets',
      isNew: true,
      targetType: 'subcategory',
      parentCategorySlug: parentCat.slug
    });
    // Ensure parent category card is expanded
    setExpandedCategories((prev) => ({ ...prev, [parentCat.slug]: true }));
  };

  // Edit existing category handler
  const startEditCategory = (cat: CategoryItem) => {
    setDraft({
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      description: cat.description || '',
      image: cat.image || '',
      accent: cat.accent || '#3F3F46',
      order: cat.order,
      division: cat.division,
      isNew: false,
      targetType: 'category',
      parentCategorySlug: ''
    });
  };

  // Edit existing subcategory handler
  const startEditSubcategory = (sub: SubcategoryItem) => {
    setDraft({
      id: sub.id,
      slug: sub.slug,
      name: sub.name,
      description: sub.description || '',
      image: sub.image || '',
      accent: '#D97706',
      order: sub.order,
      division: 'acrylic-sheets',
      isNew: false,
      targetType: 'subcategory',
      parentCategorySlug: sub.categorySlug
    });
  };

  // Save Category / Subcategory Draft
  const saveCategoryDraft = () => {
    if (!draft || !draft.name.trim()) return;

    const finalSlug = draft.slug.trim() || slugify(draft.name);

    if (draft.division === 'acrylic-sheets' && draft.targetType === 'subcategory') {
      const parentSlug = draft.parentCategorySlug || (sheetCategories[0]?.slug || 'acrylic-sheets');
      saveSheetSubcategory({
        id: draft.id,
        slug: finalSlug,
        name: draft.name.trim(),
        categorySlug: parentSlug,
        description: draft.description.trim(),
        image: draft.image.trim() || '/acryglo_cast_acrylic_sheets.webp',
        order: draft.order
      });
      // Expand the parent category so the user sees the new subcategory immediately
      setExpandedCategories((prev) => ({ ...prev, [parentSlug]: true }));
      showNotification(`Saved subcategory "${draft.name}" successfully!`);
      setDraft(null);
      return;
    }

    if (draft.division === 'acrylic-sheets') {
      saveSheetCategory({
        id: draft.id,
        slug: finalSlug,
        name: draft.name.trim(),
        description: draft.description.trim(),
        image: draft.image.trim() || '/acryglo_cast_acrylic_sheets.webp',
        order: draft.order
      });
    } else if (draft.division === 'asa-laminates') {
      saveCollection({
        id: draft.id,
        slug: finalSlug,
        name: draft.name.trim(),
        description: draft.description.trim(),
        image: draft.image.trim() || '/laminates.jpg',
        accent: draft.accent,
        order: draft.order
      });
    } else if (draft.division === 'agricultural') {
      saveCategory({
        id: draft.id,
        slug: finalSlug,
        name: draft.name.trim(),
        description: draft.description.trim(),
        image: draft.image.trim() || '/alphonso_mangoes_Hapus.webp',
        order: draft.order
      });
    }

    showNotification(`Saved category "${draft.name}" successfully!`);
    setDraft(null);
  };

  // Delete Category
  const handleDeleteCategory = (cat: CategoryItem) => {
    if (cat.productCount > 0) {
      const confirmDelete = window.confirm(
        `This category currently has ${cat.productCount} product(s) assigned. Are you sure you want to delete it?`
      );
      if (!confirmDelete) return;
    } else {
      const confirmDelete = window.confirm(`Are you sure you want to delete category "${cat.name}"?`);
      if (!confirmDelete) return;
    }

    if (cat.division === 'acrylic-sheets') {
      deleteSheetCategory(cat.id);
    } else if (cat.division === 'asa-laminates') {
      deleteCollection(cat.id);
    } else if (cat.division === 'agricultural') {
      deleteCategory(cat.id);
    }

    showNotification(`Deleted category "${cat.name}"`);
  };

  // Delete Subcategory
  const handleDeleteSubcategory = (sub: SubcategoryItem) => {
    if (sub.productCount > 0) {
      const confirmDelete = window.confirm(
        `This subcategory currently has ${sub.productCount} product(s) assigned. Are you sure you want to delete it?`
      );
      if (!confirmDelete) return;
    } else {
      const confirmDelete = window.confirm(`Are you sure you want to delete subcategory "${sub.name}"?`);
      if (!confirmDelete) return;
    }

    deleteSheetSubcategory(sub.id);
    showNotification(`Deleted subcategory "${sub.name}"`);
  };

  return (
    <div className="pt-2 space-y-8 max-w-7xl">
      {/* Page Header */}
      <AdminPageHeader
        title="Categories/Collections"
        description="Master control terminal for creating, updating, viewing, and organizing all product categories and design collections across the website."
        action={
          <AdminButton onClick={startCreateCategory}>
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            New Category / Collection
          </AdminButton>
        }
      />

      {/* Instant Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2.5 rounded-lg border border-emerald-500/40 bg-emerald-950/80 px-4 py-3 text-xs font-mono text-emerald-300 shadow-lg"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Division Navigation Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All Divisions', count: unifiedCategories.length },
            { id: 'acrylic-sheets', label: 'Acrylic Sheets', count: (sheetCategories || []).length },
            { id: 'asa-laminates', label: 'ASA Laminates', count: (laminateCollections || []).length },
            { id: 'agricultural', label: 'Agricultural Products', count: (agriCategories || []).length }
          ].map((tab) => {
            const isActive = activeDivision === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveDivision(tab.id as DivisionFilter)}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded-lg border transition-all cursor-pointer whitespace-nowrap',
                  isActive
                    ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700 hover:bg-zinc-850'
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    'text-[0.62rem] px-1.5 py-0.2 rounded font-mono font-medium',
                    isActive ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
                  )}
                >
                  {tab.count} {tab.id === 'asa-laminates' ? 'Collections' : 'Categories'}
                </span>
              </button>
            );
          })}
        </div>

        <span className="font-mono text-xs text-zinc-400 shrink-0">
          Showing <strong className="text-white">{filteredCategories.length}</strong> Categories / Collections
        </span>
      </div>

      {/* Category Editor / Creator Modal / Drawer */}
      {draft && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: SMOOTH_EASE }}
          className="rounded-xl border border-amber-500/40 bg-zinc-900 p-6 shadow-2xl space-y-5"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold flex items-center gap-2">
              <FolderIcon className="h-4 w-4 text-amber-400" />
              <span>
                {draft.isNew
                  ? draft.targetType === 'subcategory'
                    ? `Add New Subcategory under: ${
                        sheetCategories.find((c) => c.slug === draft.parentCategorySlug)?.name || draft.parentCategorySlug
                      }`
                    : 'Create New Category / Collection'
                  : draft.targetType === 'subcategory'
                  ? `Edit Subcategory: ${draft.name}`
                  : `Edit Category: ${draft.name}`}
              </span>
            </h3>
            <span className="font-mono text-[0.65rem] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase">
              {draft.targetType === 'subcategory'
                ? `Subcategory · under ${
                    sheetCategories.find((c) => c.slug === draft.parentCategorySlug)?.name || draft.parentCategorySlug
                  }`
                : draft.division}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* If creating a top-level category/collection, allow selecting division */}
            {draft.isNew && draft.targetType === 'category' && (
              <AdminField label="Target Product Division" className="sm:col-span-2">
                <select
                  value={draft.division}
                  onChange={(e) => setDraft({ ...draft, division: e.target.value as any })}
                  className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="acrylic-sheets">Acrylic Sheets</option>
                  <option value="asa-laminates">ASA Architectural Laminates</option>
                  <option value="agricultural">Agricultural Products (APEDA)</option>
                </select>
              </AdminField>
            )}

            {/* If creating or editing a subcategory, show the Parent Sheet Category selector */}
            {draft.targetType === 'subcategory' && (
              <AdminField label="Parent Sheet Category *" className="sm:col-span-2">
                <select
                  value={draft.parentCategorySlug}
                  onChange={(e) => setDraft({ ...draft, parentCategorySlug: e.target.value })}
                  className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
                >
                  {(sheetCategories || []).map((sc) => (
                    <option key={sc.id || sc.slug} value={sc.slug}>
                      {sc.name} (/{sc.slug})
                    </option>
                  ))}
                </select>
              </AdminField>
            )}

            <AdminField label={draft.targetType === 'subcategory' ? 'Subcategory Name *' : 'Category / Collection Name *'}>
              <AdminInput
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder={
                  draft.targetType === 'subcategory'
                    ? 'e.g. Gold Mirror Acrylic, White PVC Foam Board...'
                    : 'e.g. Modern Living, Sunboard PVC, Basmati Rice...'
                }
              />
            </AdminField>

            <AdminField label="Slug (URL identifier)">
              <AdminInput
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                placeholder="Leave blank to auto-generate from name"
              />
            </AdminField>

            <div className="sm:col-span-2">
              <AdminSingleImageUpload
                value={draft.image || ''}
                onChange={(url) => setDraft({ ...draft, image: url })}
                label={draft.targetType === 'subcategory' ? 'Subcategory Cover Image' : 'Category / Collection Cover Image'}
                placeholder="e.g. /acryglo_cast_acrylic_sheets.webp"
              />
            </div>

            {draft.division === 'asa-laminates' && (
              <AdminField label="Palette Accent Swatch">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={draft.accent}
                    onChange={(e) => setDraft({ ...draft, accent: e.target.value })}
                    className="h-10 w-16 cursor-pointer rounded border border-zinc-800 bg-zinc-950 p-1"
                  />
                  <AdminInput
                    value={draft.accent}
                    onChange={(e) => setDraft({ ...draft, accent: e.target.value })}
                    className="font-mono"
                  />
                </div>
              </AdminField>
            )}

            <AdminField label="Scope & Description" className="sm:col-span-2">
              <AdminTextarea
                rows={3}
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                placeholder="Brief description of materials, finishes or export scope covered..."
              />
            </AdminField>
          </div>

          <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
            <AdminButton variant="outline" onClick={() => setDraft(null)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={saveCategoryDraft}>
              {draft.targetType === 'subcategory' ? 'Save Subcategory' : 'Save Category'}
            </AdminButton>
          </div>
        </motion.div>
      )}

      {/* Categories & Collections List with Nested Subcategories */}
      <div className="space-y-4">
        {filteredCategories.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-400 font-mono text-xs">
            No categories found for this division filter. Click "+ New Category / Collection" above to create one.
          </div>
        ) : (
          filteredCategories.map((category, index) => {
            const isAcrylic = category.division === 'acrylic-sheets';
            const subcategoriesForThisCat = isAcrylic
              ? unifiedSheetSubcategories.filter((s) => s.categorySlug === category.slug)
              : [];
            const isExpanded = !!expandedCategories[category.slug];

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: SMOOTH_EASE, delay: Math.min(index * 0.03, 0.3) }}
                className="rounded-xl border border-zinc-800 bg-zinc-900/80 shadow-lg hover:border-zinc-700/80 transition-all overflow-hidden"
              >
                {/* Category Main Row */}
                <div
                  onClick={() => {
                    if (isAcrylic) {
                      toggleCategoryExpanded(category.slug);
                    }
                  }}
                  className={cn(
                    "p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors",
                    isAcrylic ? "cursor-pointer hover:bg-zinc-850/60" : ""
                  )}
                >
                  {/* Category Info */}
                  <div className="flex items-center gap-4 min-w-0">
                    {category.accent ? (
                      <span
                        className="h-12 w-12 shrink-0 rounded-lg border border-zinc-700 shadow-sm"
                        style={{ backgroundColor: category.accent }}
                        aria-hidden="true"
                      />
                    ) : category.image ? (
                      <img
                        src={category.image}
                        alt=""
                        className="h-12 w-12 rounded-lg border border-zinc-700 shrink-0 object-cover bg-zinc-950"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 flex items-center justify-center shrink-0">
                        <FolderIcon className="h-5 w-5 text-zinc-500" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-semibold text-white truncate">{category.name}</h4>
                        <span className="font-mono text-[0.62rem] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 uppercase">
                          {category.divisionName}
                        </span>
                        {isAcrylic && (
                          <span className={cn(
                            "font-mono text-[0.62rem] px-2 py-0.5 rounded border uppercase transition-colors",
                            isExpanded
                              ? "bg-amber-400/20 text-amber-300 border-amber-400/40 font-bold"
                              : "bg-amber-400/10 text-amber-300 border-amber-400/30"
                          )}>
                            {subcategoriesForThisCat.length} Subcategories
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 font-mono text-xs text-zinc-400">
                        <strong className="text-amber-400 font-semibold">{category.productCount}</strong> product{category.productCount === 1 ? '' : 's'} assigned · <span className="text-zinc-500">/{category.slug}</span>
                      </p>
                      {category.description && (
                        <p className="mt-1 text-xs text-zinc-500 line-clamp-1 max-w-xl">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions: Add Subcategory (for Acrylic), Toggle Subcategories, Edit, Delete */}
                  <div className="flex items-center gap-2 shrink-0 self-end lg:self-center flex-wrap">
                    {isAcrylic && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            startCreateSubcategoryFor(category);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs font-mono font-medium transition-colors cursor-pointer"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                          <span>Add Subcategory</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCategoryExpanded(category.slug);
                          }}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer",
                            isExpanded
                              ? "border-amber-500/50 bg-amber-500/15 text-amber-300 font-bold shadow-xs hover:bg-amber-500/25"
                              : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800"
                          )}
                        >
                          <Layers className={cn("h-3.5 w-3.5", isExpanded ? "text-amber-400" : "text-zinc-400")} />
                          <span>
                            {isExpanded
                              ? `Hide Subcategories (${subcategoriesForThisCat.length})`
                              : `Subcategories (${subcategoriesForThisCat.length})`}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="h-3.5 w-3.5 text-amber-400" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </>
                    )}

                    <div onClick={(e) => e.stopPropagation()}>
                      <AdminButton size="sm" variant="outline" onClick={() => startEditCategory(category)}>
                        <PencilIcon className="h-3.5 w-3.5 text-zinc-300" />
                        <span>Edit</span>
                      </AdminButton>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <AdminButton
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteCategory(category)}
                        ariaLabel={`Delete ${category.name}`}
                      >
                        <Trash2Icon className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </AdminButton>
                    </div>
                  </div>
                </div>

                {/* Expandable Subcategories Section (for Acrylic Sheets) with AnimatePresence */}
                <AnimatePresence initial={false}>
                  {isAcrylic && isExpanded && (
                    <motion.div
                      key={`sub-panel-${category.slug}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: SMOOTH_EASE }}
                      className="border-t border-zinc-800/80 bg-zinc-950/70 p-4 sm:p-5 space-y-3.5 overflow-hidden"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                          <h5 className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                            Subcategories under <span className="text-white font-bold">{category.name}</span>
                          </h5>
                          <span className="font-mono text-[0.62rem] text-zinc-500">
                            ({subcategoriesForThisCat.length} total)
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => startCreateSubcategoryFor(category)}
                            className="text-[0.7rem] font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 px-2.5 py-1 rounded border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 transition-colors cursor-pointer"
                          >
                            <PlusIcon className="h-3 w-3" />
                            <span>Add Subcategory</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleCategoryExpanded(category.slug)}
                            className="text-[0.7rem] font-mono text-zinc-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer"
                            title="Collapse subcategories panel"
                          >
                            <ChevronUp className="h-3.5 w-3.5 text-zinc-400" />
                            <span>Collapse</span>
                          </button>
                        </div>
                      </div>

                      {subcategoriesForThisCat.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-zinc-800 p-6 text-center">
                          <p className="font-mono text-xs text-zinc-400">
                            No subcategories created under "{category.name}" yet.
                          </p>
                          <button
                            type="button"
                            onClick={() => startCreateSubcategoryFor(category)}
                            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs font-mono cursor-pointer"
                          >
                            <PlusIcon className="h-3 w-3" />
                            <span>Create First Subcategory</span>
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {subcategoriesForThisCat.map((sub) => (
                              <div
                                key={sub.id}
                                className="flex items-center justify-between gap-3 p-3 rounded-lg border border-zinc-800/90 bg-zinc-900/90 hover:border-zinc-700 transition-all"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  {sub.image ? (
                                    <img
                                      src={sub.image}
                                      alt=""
                                      className="h-9 w-9 rounded-md border border-zinc-700 shrink-0 object-cover bg-zinc-950"
                                    />
                                  ) : (
                                    <div className="h-9 w-9 rounded-md border border-zinc-700 bg-zinc-800 flex items-center justify-center shrink-0">
                                      <FolderIcon className="h-4 w-4 text-zinc-500" />
                                    </div>
                                  )}
                                  <div className="min-w-0">
                                    <h6 className="text-xs font-semibold text-white truncate">{sub.name}</h6>
                                    <p className="text-[0.65rem] font-mono text-zinc-400">
                                      <span className="text-amber-400 font-semibold">{sub.productCount}</span> products · <span className="text-zinc-500">/{sub.slug}</span>
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => startEditSubcategory(sub)}
                                    className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                                    title="Edit subcategory"
                                  >
                                    <PencilIcon className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteSubcategory(sub)}
                                    className="p-1.5 rounded text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                    title="Delete subcategory"
                                  >
                                    <Trash2Icon className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-center pt-2">
                            <button
                              type="button"
                              onClick={() => toggleCategoryExpanded(category.slug)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 text-[0.7rem] font-mono text-zinc-400 hover:text-amber-300 rounded border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-900 transition-colors cursor-pointer"
                            >
                              <ChevronUp className="h-3.5 w-3.5 text-zinc-400" />
                              <span>Collapse {category.name} Subcategories</span>
                            </button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function CategoryManager() {
  return <CategoryCollectionManager />;
}