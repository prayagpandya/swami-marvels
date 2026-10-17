"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XIcon, Plus, Trash2, Image, Layers } from 'lucide-react';
import type { Product, Specification } from '../../types/product';
import type { Laminate } from '../../types/laminate';
import type { AgriculturalProduct } from '../../types/agriculturalProduct';
import { useStore } from '../../contexts/StoreContext';
import { ALL_SUBCATEGORIES, getSubcategoriesByCategory } from '../../data/productTaxonomy';
import { AdminButton, AdminField, AdminInput, AdminSelect, AdminTextarea, Toggle } from './ui';
import { AdminMultiImageUpload } from './AdminImageUpload';
import { SMOOTH_EASE } from '../motion/ViewportMotion';

export type Division = 'products' | 'laminate' | 'agricultural';

interface Props {
  division: Division;
  initial?: any;
  onClose: () => void;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export function ProductForm({ division, initial, onClose }: Props) {
  const { sheetCategories, sheetSubcategories, collections, categories: agriCategories, saveProduct, saveLaminate, saveAgriProduct } = useStore();

  const isProducts = division === 'products';
  const isLaminate = division === 'laminate';

  const initialDivision = initial?.division ?? (isLaminate ? 'laminate' : division === 'agricultural' ? 'agricultural' : 'industrial');

  const defaultCategory =
    initialDivision === 'laminate'
      ? (collections[0]?.slug || 'solid-tone')
      : initialDivision === 'agricultural'
      ? (agriCategories[0]?.slug || 'fruits-vegetables')
      : (sheetCategories[0]?.slug || 'acrylic-sheets');

  // Form State
  const [form, setForm] = useState({
    id: initial?.id ?? '',
    name: initial?.name ?? '',
    productCode: initial?.productCode ?? '',
    brand: initial?.brand ?? 'Swami Marvels',
    division: initialDivision,
    mainCategory: initial?.mainCategory ?? initial?.category ?? initial?.collection ?? defaultCategory,
    subcategory: initial?.subcategory ?? (
      initialDivision === 'laminate'
        ? (collections[0]?.slug || 'solid-tone-laminates')
        : initialDivision === 'agricultural'
        ? (agriCategories[0]?.slug || 'fruits-vegetables')
        : 'acryglo-transparent-virgin-cast'
    ),
    shortDescription: initial?.shortDescription ?? '',
    description: initial?.description ?? '',
    availability: initial?.availability ?? 'In Stock - Immediate Despatch',
    pricingType: initial?.pricingType ?? 'quote_only',
    showPrice: initial?.showPrice ?? false,
    price: initial?.price ?? '',
    unit: initial?.unit ?? 'sheet',
    currency: initial?.currency ?? '₹',
    features: (initial?.features ?? []).join(', '),
    applications: Array.isArray(initial?.applications)
      ? initial.applications.join(', ')
      : '',
    images: initial?.images && initial.images.length > 0 ? initial.images : ['/acryglo_cast_acrylic_sheets.webp'],
    specifications: (initial?.specifications && Array.isArray(initial.specifications))
      ? initial.specifications
      : [
          { label: 'Material', value: 'Virgin Cast PMMA' },
          { label: 'Thickness Range', value: '2.0 mm to 25 mm' },
          { label: 'Standard Dimensions', value: '1220 x 2440 mm (4x8 ft)' }
        ],
    published: initial?.published ?? true,
    featured: initial?.featured ?? false,
    // Laminate specifics
    colour: initial?.colour ?? '',
    colourFamily: initial?.colourFamily ?? 'Beige',
    finish: initial?.finish ?? 'matte',
    collection: initial?.collection ?? (collections[0]?.slug ?? 'solid-tone'),
    // Agri specifics
    grade: initial?.grade ?? '',
    packaging: initial?.packaging ?? ''
  });

  const set = (key: string, value: any) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Specification row handlers
  const addSpecRow = () => {
    set('specifications', [...form.specifications, { label: '', value: '' }]);
  };

  const updateSpecRow = (index: number, field: 'label' | 'value', val: string) => {
    const next = [...form.specifications];
    next[index] = { ...next[index], [field]: val };
    set('specifications', next);
  };

  const removeSpecRow = (index: number) => {
    set('specifications', form.specifications.filter((_: any, i: number) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) return;

    const baseSlug = initial?.slug || `${slugify(form.name)}-${(form.productCode || 'sku').toLowerCase().replace(/[^a-z0-9]/g, '')}`;

    const isLaminate = form.division === 'laminate';
    const isAgri = form.division === 'agricultural';

    if (isLaminate) {
      const record: Laminate = {
        id: initial?.id ?? `lam-${Date.now()}`,
        slug: baseSlug,
        division: 'laminate',
        name: form.name,
        productCode: form.productCode,
        colour: form.colour,
        colourFamily: form.colourFamily,
        swatch: initial?.swatch || '#C9BCA8',
        collection: form.mainCategory || form.collection,
        finish: form.finish,
        dimensions: form.specifications?.find((s: any) => s.label.toLowerCase().includes('dimension'))?.value || '2440 × 1220 mm',
        thickness: form.specifications?.find((s: any) => s.label.toLowerCase().includes('thickness'))?.value || '1.0 mm',
        features: form.features.split(',').map((f: string) => f.trim()).filter(Boolean),
        applications: form.applications.split(',').map((a: string) => a.trim()).filter(Boolean),
        description: form.description,
        images: form.images,
        featured: form.featured,
        published: form.published
      };
      saveLaminate(record);
    } else if (isAgri) {
      const record: AgriculturalProduct = {
        id: initial?.id ?? `agri-${Date.now()}`,
        slug: baseSlug,
        division: 'agricultural',
        name: form.name,
        category: form.mainCategory,
        grade: form.grade,
        packaging: form.packaging,
        availability: form.availability,
        description: form.description,
        specifications: form.specifications.filter((s: Specification) => s.label.trim() && s.value.trim()),
        images: form.images,
        featured: form.featured,
        published: form.published
      };
      saveAgriProduct(record);
    } else {
      const record: Product = {
        id: initial?.id || `prod-${Date.now()}`,
        slug: baseSlug,
        name: form.name.trim(),
        productCode: form.productCode.trim(),
        brand: form.brand.trim() || 'Swami Marvels',
        division: 'industrial',
        mainCategory: form.mainCategory,
        category: form.mainCategory,
        subcategory: form.subcategory,
        shortDescription: form.shortDescription.trim(),
        description: form.description.trim(),
        availability: form.availability.trim(),
        pricingType: form.pricingType as any,
        showPrice: Boolean(form.showPrice),
        price: form.price ? Number(form.price) : undefined,
        unit: form.unit.trim(),
        currency: form.currency.trim(),
        images: form.images.filter(Boolean),
        specifications: form.specifications.filter((s: Specification) => s.label.trim() && s.value.trim()),
        features: form.features.split(',').map((f: string) => f.trim()).filter(Boolean),
        applications: form.applications.split(',').map((a: string) => a.trim()).filter(Boolean),
        published: form.published,
        featured: form.featured
      };
      saveProduct(record);
    }

    onClose();
  };

  // Dynamic subcategories based on current division and selected category
  const availableSubcategories = React.useMemo(() => {
    if (form.division === 'industrial') {
      const dynamicSubs = (sheetSubcategories || []).filter((s: any) => {
        if (s.categorySlug === form.mainCategory) return true;
        const matched = (sheetCategories || []).find(
          (c: any) => c.slug === form.mainCategory || c.id === form.mainCategory
        );
        if (matched) {
          return s.categorySlug === matched.slug || s.categorySlug === matched.id;
        }
        return false;
      });
      const seedSubs = getSubcategoriesByCategory(form.mainCategory);

      const seen = new Set<string>();
      const combined: any[] = [];
      [...dynamicSubs, ...seedSubs].forEach((sub: any) => {
        const slug = sub.slug || sub.id;
        if (!seen.has(slug)) {
          seen.add(slug);
          combined.push({
            id: sub.id,
            slug,
            name: sub.name,
            categorySlug: sub.categorySlug
          });
        }
      });

      if (combined.length > 0) return combined;
      return (sheetSubcategories || []).length > 0
        ? sheetSubcategories
        : ALL_SUBCATEGORIES.filter(s => s.categorySlug !== 'asa-laminates' && s.categorySlug !== 'agricultural-exports');
    }
    if (form.division === 'laminate') {
      return ALL_SUBCATEGORIES.filter(s => s.categorySlug === 'asa-laminates');
    }
    if (form.division === 'agricultural') {
      return ALL_SUBCATEGORIES.filter(s => s.categorySlug === 'agricultural-exports');
    }
    return [];
  }, [form.division, form.mainCategory, sheetSubcategories]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: SMOOTH_EASE }}
        className="h-full w-full max-w-2xl overflow-y-auto border-l border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-zinc-100 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
          <div>
            <h2 className="font-display text-xl font-medium text-white">
              {initial ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="font-mono text-xs text-zinc-400 mt-0.5">
              Swami Marvels Master Catalog
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-7">
          {/* General Information */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-white border-b border-zinc-800 pb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              General Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminField label="Product Name *">
                <AdminInput
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="e.g. AcryGlo Cast Acrylic Sheet"
                  required
                />
              </AdminField>

              <AdminField label="Product SKU / Code">
                <AdminInput
                  value={form.productCode}
                  onChange={(e) => set('productCode', e.target.value)}
                  placeholder="e.g. SM-AC-001"
                />
              </AdminField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminField label="Brand">
                <AdminInput
                  value={form.brand}
                  onChange={(e) => set('brand', e.target.value)}
                  placeholder="Swami Marvels"
                />
              </AdminField>

              <AdminField label="Primary Division">
                <AdminSelect
                  value={form.division}
                  onChange={(e) => {
                    const newDiv = e.target.value;
                    const defaultCat =
                      newDiv === 'laminate'
                        ? (collections[0]?.slug || 'solid-tone')
                        : newDiv === 'agricultural'
                        ? (agriCategories[0]?.slug || 'fruits-vegetables')
                        : (sheetCategories[0]?.slug || 'acrylic-sheets');
                    setForm(f => ({
                      ...f,
                      division: newDiv,
                      mainCategory: defaultCat,
                      collection: defaultCat
                    }));
                  }}
                >
                  <option value="industrial">Acrylic Sheets</option>
                  <option value="laminate">ASA Laminates</option>
                  <option value="agricultural">Agricultural Products (APEDA)</option>
                </AdminSelect>
              </AdminField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminField
                label={
                  form.division === 'laminate'
                    ? "Collection *"
                    : form.division === 'agricultural'
                    ? "APEDA Category *"
                    : "Sheet Category *"
                }
              >
                <AdminSelect
                  value={form.mainCategory}
                  onChange={(e) => {
                    const newCat = e.target.value;
                    setForm(f => ({
                      ...f,
                      mainCategory: newCat,
                      collection: newCat
                    }));
                  }}
                >
                  {form.division === 'laminate' ? (
                    collections.map((col) => (
                      <option key={col.id || col.slug} value={col.slug}>
                        {col.name}
                      </option>
                    ))
                  ) : form.division === 'agricultural' ? (
                    agriCategories.map((cat) => (
                      <option key={cat.id || cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    sheetCategories.map((sc) => (
                      <option key={sc.id || sc.slug} value={sc.slug}>
                        {sc.name}
                      </option>
                    ))
                  )}
                </AdminSelect>
              </AdminField>

              <AdminField label="Subcategory / Group">
                <AdminSelect
                  value={form.subcategory}
                  onChange={(e) => set('subcategory', e.target.value)}
                >
                  {availableSubcategories.map((sub: any) => (
                    <option key={sub.id || sub.slug} value={sub.slug}>
                      {sub.name}
                    </option>
                  ))}
                  {availableSubcategories.length === 0 && (
                    <option value={form.mainCategory}>General {form.mainCategory}</option>
                  )}
                </AdminSelect>
              </AdminField>
            </div>

            <AdminField label="Short Summary">
              <AdminInput
                value={form.shortDescription}
                onChange={(e) => set('shortDescription', e.target.value)}
                placeholder="Brief one-line summary for cards and search results"
              />
            </AdminField>

            <AdminField label="Detailed Description">
              <AdminTextarea
                rows={3}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Comprehensive technical description, performance characteristics, and material composition..."
              />
            </AdminField>
          </div>

          {/* Pricing & Commercial Terms */}
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-white border-b border-zinc-800 pb-2">
              Commercial Terms & Pricing
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <AdminField label="Pricing Policy">
                <AdminSelect
                  value={form.pricingType}
                  onChange={(e) => set('pricingType', e.target.value)}
                >
                  <option value="quote_only">Wholesale Quote Only</option>
                  <option value="fixed">Fixed Unit Price</option>
                  <option value="range">Range Based</option>
                </AdminSelect>
              </AdminField>

              <AdminField label="Unit Price">
                <AdminInput
                  type="number"
                  value={form.price}
                  onChange={(e) => set('price', e.target.value)}
                  placeholder="e.g. 1850"
                  disabled={form.pricingType === 'quote_only'}
                />
              </AdminField>

              <AdminField label="Unit Format">
                <AdminInput
                  value={form.unit}
                  onChange={(e) => set('unit', e.target.value)}
                  placeholder="e.g. sheet / sq.ft / MT"
                />
              </AdminField>
            </div>

            <div className="flex items-center gap-6">
              <Toggle
                checked={form.showPrice}
                onChange={(v) => set('showPrice', v)}
                label="Display Price Publicly"
              />
              <AdminField label="Availability Status" className="flex-1">
                <AdminInput
                  value={form.availability}
                  onChange={(e) => set('availability', e.target.value)}
                  placeholder="e.g. In Stock - Immediate Despatch"
                />
              </AdminField>
            </div>
          </div>

          {/* Multi-Image Gallery Manager with Cloudinary Direct Upload & Previews */}
          <AdminMultiImageUpload
            images={form.images}
            onChange={(imgs) => set('images', imgs)}
            label="Product Images"
          />

          {/* Specifications Key-Value Table */}
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-white">
                Technical Specifications ({form.specifications.length})
              </h3>
              <button
                type="button"
                onClick={addSpecRow}
                className="inline-flex items-center gap-1 font-mono text-xs text-zinc-300 hover:text-white font-medium"
              >
                <Plus className="h-3.5 w-3.5 text-amber-400" /> Add Row
              </button>
            </div>

            <div className="space-y-2">
              {form.specifications.map((spec: Specification, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <AdminInput
                    value={spec.label}
                    onChange={(e) => updateSpecRow(idx, 'label', e.target.value)}
                    placeholder="Specification (e.g. Thickness)"
                    className="w-1/3"
                  />
                  <AdminInput
                    value={spec.value}
                    onChange={(e) => updateSpecRow(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. 2.0 mm to 25 mm)"
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecRow(idx)}
                    className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Features & Applications */}
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-white border-b border-zinc-800 pb-2">
              Features & Applications
            </h3>

            <AdminField label="Key Features (comma-separated)">
              <AdminInput
                value={form.features}
                onChange={(e) => set('features', e.target.value)}
                placeholder="High Optical Clarity, UV Resistant, CNC Router friendly, Impact Resistant"
              />
            </AdminField>

            <AdminField label="Applications (comma-separated)">
              <AdminInput
                value={form.applications}
                onChange={(e) => set('applications', e.target.value)}
                placeholder="Architectural Signage, LED Lightboxes, Wall Cladding, POP Displays"
              />
            </AdminField>
          </div>

          {/* Visibility Toggles */}
          <div className="flex items-center gap-8 pt-4 border-t border-zinc-800">
            <Toggle
              checked={form.published}
              onChange={(v) => set('published', v)}
              label="Live / Published"
            />
            <Toggle
              checked={form.featured}
              onChange={(v) => set('featured', v)}
              label="Featured on Homepage"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800">
            <AdminButton type="button" variant="outline" onClick={onClose}>
              Cancel
            </AdminButton>
            <AdminButton type="submit">
              Save Product Record
            </AdminButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
