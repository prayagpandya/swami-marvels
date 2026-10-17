"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  FileText, 
  PhoneCall, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Package, 
  ArrowLeft,
  Sparkles,
  Mail
} from 'lucide-react';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { Shell } from '../../components/ui/Section';
import { UniversalProductCard } from '../products/UniversalProductCard';
import { EASE } from '../../components/motion/variants';
import { cn } from '../../utils/cn';
import type { Product } from '../../types/product';

export function LaminateProduct() {
  const { slug } = useParams<{ slug: string }>();
  const { products, laminates } = usePublicCatalogue();
  const router = useRouter();

  // Find either in comprehensive products catalog or legacy laminates
  const product = products.find((p) => p.slug === slug);
  const fallbackLaminate = !product ? laminates.find((l) => l.slug === slug) : null;

  useEffect(() => {
    if (!product && !fallbackLaminate) {
      router.replace('/laminates');
    }
  }, [product, fallbackLaminate, router]);

  // Gallery state
  const images = useMemo(() => {
    if (product?.images?.length && !product.images[0].includes('acrylic_solid_color_sheets')) {
      return product.images;
    }
    if (fallbackLaminate?.images?.length && !fallbackLaminate.images[0].includes('acrylic_solid_color_sheets')) {
      return fallbackLaminate.images;
    }
    const code = product?.productCode || fallbackLaminate?.productCode || '';
    if (code === 'SC-001') return ['/mirror_acrylic_sheets.webp'];
    if (code) return [`/${code.toLowerCase().replace('-', '_')}.webp`];
    return ['/sv_1014.webp'];
  }, [product, fallbackLaminate]);

  const imageFallback = useMemo(() => {
    if (product?.images?.[0]) return product.images[0];
    if (product?.division === 'industrial' || product?.mainCategory === 'acrylic-sheets') {
      return '/acryglo_cast_acrylic_sheets.webp';
    }
    const code = product?.productCode || fallbackLaminate?.productCode || '';
    if (code === 'SC-001') return '/mirror_acrylic_sheets.webp';
    if (code) return `/${code.toLowerCase().replace('-', '_')}.webp`;
    return '/sv_1014.webp';
  }, [product, fallbackLaminate]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'applications' | 'packaging'>('specs');

  if (!product && !fallbackLaminate) return null;

  // Normalized fields
  const title = product?.name || fallbackLaminate?.name || '';
  const productCode = product?.productCode || fallbackLaminate?.productCode || '';
  const description = product?.description || fallbackLaminate?.description || '';
  const shortDesc = product?.shortDescription || '';
  const brand = product?.brand || 'Swami Marvels';
  const category = product?.mainCategory || product?.category || fallbackLaminate?.collection || 'Acrylic Sheets';
  const subcategory = product?.subcategory || (fallbackLaminate?.collection === 'shine-craft' ? 'Shine Craft Acrylic' : fallbackLaminate?.finish || '');
  const availability = product?.availability || 'In Stock - Ready for Despatch';
  
  // Specs
  const specs = product?.specifications || [
    { label: 'Product Code', value: productCode },
    { label: 'Collection', value: fallbackLaminate?.collection === 'shine-craft' ? 'Shine Craft Acrylic' : (fallbackLaminate?.collection || 'Standard') },
    { label: 'Finish', value: fallbackLaminate?.finish || 'Standard' },
    { label: 'Colour', value: fallbackLaminate?.colour || 'Standard' },
    { label: 'Dimensions', value: fallbackLaminate?.dimensions || '2440 x 1220 mm' },
    { label: 'Thickness', value: fallbackLaminate?.thickness || '1.0 mm' },
  ];

  const features = product?.features?.length 
    ? product.features 
    : ['High Surface Durability', 'Dimensional Stability', 'Moisture & Impact Resistant', 'Precision Sizing'];

  const applications = product?.applications?.length
    ? product.applications
    : ['Architectural Signage', 'Interior Joinery & Paneling', 'Retail Displays', 'Commercial Fixtures'];

  // Related products from same category or subcategory
  const related: Product[] = useMemo(() => {
    if (fallbackLaminate) {
      const sameCol = laminates.filter(
        (l) => l.slug !== slug && l.collection === fallbackLaminate.collection
      );
      const pool = sameCol.length >= 4
        ? sameCol
        : [...sameCol, ...laminates.filter((l) => l.slug !== slug && l.collection !== fallbackLaminate.collection)];

      return pool.slice(0, 4).map((l): Product => {
        const code = l.productCode || '';
        const img = (l.images && l.images.length > 0 && !l.images[0].includes('acrylic_solid_color_sheets'))
          ? l.images[0]
          : (code === 'SC-001' ? '/mirror_acrylic_sheets.webp' : (code ? `/${code.toLowerCase().replace('-', '_')}.webp` : '/sv_1014.webp'));

        return {
          id: l.id,
          slug: l.slug,
          name: l.name,
          productCode: code,
          division: 'laminate',
          mainCategory: 'asa-laminates',
          category: 'asa-laminates',
          subcategory: l.collection === 'shine-craft' ? 'Shine Craft Acrylic' : l.collection,
          brand: 'Swami Marvels',
          shortDescription: `${l.finish} finish | ${l.thickness} thickness`,
          description: l.description,
          specifications: [
            { label: 'Collection', value: l.collection === 'shine-craft' ? 'Shine Craft Acrylic' : l.collection },
            { label: 'Finish', value: l.finish },
            { label: 'Colour', value: l.colour },
            { label: 'Dimensions', value: l.dimensions },
            { label: 'Thickness', value: l.thickness }
          ],
          features: l.features || [],
          applications: l.applications || [],
          availability: 'In Stock - Ready for Despatch',
          pricingType: 'quote_only',
          showPrice: false,
          images: [img],
          featured: Boolean(l.featured),
          published: l.published
        };
      });
    }

    return products
      .filter((p) => (p.subcategory === product?.subcategory || p.mainCategory === product?.mainCategory) && p.slug !== slug)
      .slice(0, 4);
  }, [product, fallbackLaminate, laminates, products, slug]);

  return (
    <main className="w-full bg-white text-zinc-950 pt-20 sm:pt-24">
      <Shell className="py-6 sm:py-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 mb-8">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/laminates" className="hover:text-black transition-colors">
            Products
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/laminates?category=${category}`} className="hover:text-black transition-colors capitalize">
            {category.replace(/-/g, ' ')}
          </Link>
          {subcategory && (
            <>
              <ChevronRight className="h-3 w-3" />
              <Link href={`/laminates?subcategory=${subcategory}`} className="hover:text-black transition-colors capitalize">
                {subcategory.replace(/-/g, ' ')}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-900 font-semibold">{productCode || title}</span>
        </nav>

        {/* Product Hero: Left Gallery, Right Information */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 items-start">
          
          {/* Left Column: Image Switcher Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Featured Image Display */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm">
              <motion.img
                key={activeImageIndex}
                src={images[activeImageIndex]}
                alt={`${title} view ${activeImageIndex + 1}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = imageFallback;
                }}
              />

              {/* Code Badge */}
              {productCode && (
                <div className="absolute top-4 left-4 rounded-lg bg-black/80 backdrop-blur-md px-3 py-1.5 font-mono text-xs font-semibold text-yellow-400 border border-yellow-400/30">
                  {productCode}
                </div>
              )}

              {/* Swami Marvels Brand Stamp */}
              <div className="absolute bottom-4 right-4 rounded-lg bg-black/80 backdrop-blur-md px-3 py-1 font-mono text-[0.7rem] text-zinc-300 border border-zinc-700">
                {brand}
              </div>
            </div>

            {/* Thumbnail Gallery Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => {
                  const isActive = idx === activeImageIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        'relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-zinc-100 transition-all duration-200',
                        isActive
                          ? 'border-yellow-400 ring-2 ring-yellow-400/30 shadow-md'
                          : 'border-zinc-200 opacity-70 hover:opacity-100 hover:border-zinc-400'
                      )}
                    >
                      <img
                        src={img}
                        alt={`${title} thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = imageFallback;
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Commercial & Technical Overview */}
          <div className="flex flex-col justify-start">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded bg-zinc-100 border border-zinc-200 px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-zinc-800 font-semibold">
                {category.replace(/-/g, ' ')}
              </span>
              <span className="rounded bg-zinc-50 border border-zinc-200 px-2.5 py-1 font-mono text-xs text-zinc-600 font-medium">
                {brand}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-950 leading-tight">
              {title}
            </h1>

            {/* Short Description */}
            {shortDesc && (
              <p className="mt-3 text-sm lg:text-base text-zinc-700 font-normal leading-relaxed">
                {shortDesc}
              </p>
            )}

            {/* Detailed Description */}
            <p className="mt-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {description}
            </p>

            {/* Availability & Commercial Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-4 py-4 border-y border-zinc-200">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-700 font-medium">
                <CheckCircle2 className="h-4 w-4 text-zinc-900" />
                <span>{availability}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <ShieldCheck className="h-4 w-4 text-zinc-900" />
                <span>Standard B2B Warranty</span>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block">
                    Commercial Pricing
                  </span>
                  {product?.showPrice && product.price ? (
                    <div className="mt-1 font-mono text-2xl font-bold text-zinc-950">
                      {product.currency || '₹'} {product.price}
                      {product.unit && <span className="text-sm font-normal text-zinc-500"> / {product.unit}</span>}
                    </div>
                  ) : (
                    <div className="mt-1 font-mono text-lg font-semibold text-zinc-950">
                      Wholesale B2B Rate on Request
                    </div>
                  )}
                  <p className="text-[0.75rem] text-zinc-500 mt-0.5">
                    Tiered wholesale rates applicable for crate, pallet, and 20ft/40ft container consignments.
                  </p>
                </div>

                {/* Primary Quote Trigger */}
                <Link
                  href={`/contact?product=${encodeURIComponent(title)}`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg bg-zinc-950 px-6 font-mono text-xs uppercase tracking-widest text-white font-medium hover:bg-black transition-colors shadow-sm shrink-0"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Direct Contact Callout */}
            <div className="mt-4 flex items-center justify-between gap-4 text-xs font-mono text-zinc-500 px-1">
              <span>Fast inquiries & specification support:</span>
              <a 
                href="tel:+919867862233" 
                className="text-zinc-950 hover:text-yellow-600 hover:underline flex items-center gap-1.5 font-semibold"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                +91-986-786-2233
              </a>
            </div>
          </div>
        </div>

        {/* Technical Data Tabs Section */}
        <div className="mt-16 pt-8 border-t border-zinc-200">
          {/* Tabs Bar */}
          <div className="flex gap-2 border-b border-zinc-200 pb-4 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors shrink-0 border',
                activeTab === 'specs'
                  ? 'bg-zinc-950 text-white font-semibold border-zinc-950 shadow-xs'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950'
              )}
            >
              <Layers className="h-3.5 w-3.5" />
              Specifications
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('features')}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors shrink-0 border',
                activeTab === 'features'
                  ? 'bg-zinc-950 text-white font-semibold border-zinc-950 shadow-xs'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950'
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Key Features
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('applications')}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors shrink-0 border',
                activeTab === 'applications'
                  ? 'bg-zinc-950 text-white font-semibold border-zinc-950 shadow-xs'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950'
              )}
            >
              Applications
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('packaging')}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors shrink-0 border',
                activeTab === 'packaging'
                  ? 'bg-zinc-950 text-white font-semibold border-zinc-950 shadow-xs'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950'
              )}
            >
              <Package className="h-3.5 w-3.5" />
              Packing & Shipping
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'specs' && (
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                <table className="w-full text-left font-mono text-xs">
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr
                        key={spec.label}
                        className={cn(
                          'border-b border-zinc-100 transition-colors',
                          i % 2 === 0 ? 'bg-zinc-50/60' : 'bg-white'
                        )}
                      >
                        <td className="w-1/3 py-3.5 px-5 font-semibold text-zinc-500 uppercase tracking-wider">
                          {spec.label}
                        </td>
                        <td className="py-3.5 px-5 text-zinc-900 font-semibold">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4"
                  >
                    <CheckCircle2 className="h-4 w-4 text-yellow-600 shrink-0" />
                    <span className="text-sm text-zinc-800 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {applications.map((app, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-zinc-200 bg-white p-5 hover:border-yellow-400 hover:shadow-md transition-all"
                  >
                    <div className="h-2 w-8 bg-yellow-400 rounded-full mb-3" />
                    <h3 className="font-display text-base text-zinc-900 font-semibold">{app}</h3>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'packaging' && (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 space-y-4 text-sm text-zinc-700">
                <p>
                  <strong className="text-zinc-950 font-mono">Surface Protection:</strong> Covered with dual-side high-tensile polyethylene (PE) masking film or craft paper to protect surfaces during CNC milling, laser cutting, and transit.
                </p>
                <p>
                  <strong className="text-zinc-950 font-mono">Pallet Packing:</strong> Standard fumigated wooden pallets or metal crates with edge-protectors and strapping to prevent warping or transport shock.
                </p>
                <p>
                  <strong className="text-zinc-950 font-mono">Container Stuffing:</strong> Optimized 20ft GP (up to 18-20 MT) and 40ft HQ container loading plans for domestic truckloads and global ocean export.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-zinc-200">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-yellow-700 font-semibold">
                  Related Products
                </span>
                <h2 className="font-display text-2xl font-bold text-zinc-950 mt-1">
                  More From This Category
                </h2>
              </div>
              <Link
                href="/laminates"
                className="inline-flex items-center gap-1 font-mono text-xs text-zinc-600 hover:text-black transition-colors"
              >
                View Full Catalog
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <UniversalProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </Shell>
    </main>
  );
}
