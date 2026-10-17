"use client";

import React, { useState, useEffect } from 'react';
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
  Truck,
  ArrowUpRight,
  Mail
} from 'lucide-react';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { Shell } from '../../components/ui/Section';
import { AgriculturalProductCard } from '../agriculture/AgriculturalProductCard';
import { getApedaItemDisplay } from '../../data/agriculturalProducts';
import { FadeInView, SMOOTH_EASE } from '../motion/ViewportMotion';
import { cn } from '../../utils/cn';

export function AgriculturalProduct() {
  const { slug } = useParams<{ slug: string }>();
  const { agriculturalProducts, categories } = usePublicCatalogue();
  const router = useRouter();

  const product = agriculturalProducts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!product) {
      router.replace('/export');
    }
  }, [product, router]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'logistics' | 'compliance'>('specs');

  if (!product) return null;

  const category = categories.find((c) => c.slug === product.category);
  const images = product.images?.length ? product.images : ['/fruits_and_vegetables.webp'];

  const related = agriculturalProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <main className="w-full bg-white text-zinc-950 pt-20 sm:pt-24">
      <Shell className="py-6 sm:py-10">
        {/* Breadcrumb Bar */}
        <FadeInView yOffset={10}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 mb-8 border-b border-zinc-100 pb-4">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-zinc-400" />
            <Link href="/export#apeda-schedule" className="hover:text-black transition-colors">
              Agricultural Commodities
            </Link>
            {category && (
              <>
                <ChevronRight className="h-3 w-3 text-zinc-400" />
                <Link href="/export#apeda-schedule" className="hover:text-black transition-colors">
                  {category.name}
                </Link>
              </>
            )}
            <ChevronRight className="h-3 w-3 text-zinc-400" />
            <span className="text-zinc-950 font-semibold">{product.name}</span>
          </nav>
        </FadeInView>

        {/* Product Showcase */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 items-start">
          
          {/* Gallery with Image Switcher */}
          <FadeInView yOffset={20} className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm">
              <motion.img
                key={activeImageIndex}
                src={images[activeImageIndex]}
                alt={`${product.name} view ${activeImageIndex + 1}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: SMOOTH_EASE }}
                className="h-full w-full object-cover"
              />

              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="rounded-lg bg-black/85 backdrop-blur-md px-3 py-1 font-mono text-xs font-semibold text-emerald-400 border border-emerald-400/30">
                  100% PURE VEG
                </span>
                <span className="rounded-lg bg-black/85 backdrop-blur-md px-3 py-1 font-mono text-xs font-semibold text-zinc-200 border border-white/10 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  APEDA REGISTERED
                </span>
              </div>
            </div>

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
                          ? 'border-zinc-950 ring-2 ring-zinc-950/20 shadow-md'
                          : 'border-zinc-200 opacity-70 hover:opacity-100 hover:border-zinc-400'
                      )}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </FadeInView>

          {/* Product Overview */}
          <FadeInView delay={0.1} yOffset={20} className="flex flex-col justify-start">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded bg-zinc-100 border border-zinc-200 px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-zinc-800 font-semibold">
                {product.apedaSchedule ? product.apedaSchedule.split('/')[0].trim() : (category?.name ?? 'APEDA Scheduled Produce')}
              </span>
              {product.productCode && (
                <span className="rounded bg-zinc-50 border border-zinc-200 px-2.5 py-1 font-mono text-[0.7rem] text-zinc-600 font-medium">
                  {product.productCode}
                </span>
              )}
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-950 leading-tight">
              {product.name}
            </h1>

            {product.apedaItem && (
              <p className="mt-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Official APEDA Schedule Item: <span className="text-zinc-900 font-semibold">{getApedaItemDisplay(product)}</span>
              </p>
            )}

            <p className="mt-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quick Spec Metrics */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50/80 p-3 shadow-xs">
                <span className="font-mono text-[0.68rem] text-zinc-500 uppercase block">Grade & Spec</span>
                <span className="font-mono text-xs text-zinc-950 font-semibold mt-0.5 block truncate">
                  {product.grade}
                </span>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50/80 p-3 shadow-xs">
                <span className="font-mono text-[0.68rem] text-zinc-500 uppercase block">Packaging</span>
                <span className="font-mono text-xs text-zinc-900 font-medium mt-0.5 block truncate">
                  {product.packaging}
                </span>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50/80 p-3 shadow-xs">
                <span className="font-mono text-[0.68rem] text-zinc-500 uppercase block">Availability</span>
                <span className="font-mono text-xs text-zinc-900 font-semibold mt-0.5 block truncate">
                  {product.availability}
                </span>
              </div>
            </div>

            {/* Quotation CTA Box */}
            <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-950 text-white p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Export Consignment Desk
                  </div>
                  <div className="mt-1 font-mono text-lg font-semibold text-white">
                    FOB / CIF Export Orders
                  </div>
                  <p className="text-[0.75rem] text-zinc-400 mt-1 max-w-sm">
                    Container load (20ft/40ft FCL), refrigerated reefer, and air-cargo consignments dispatched with phytosanitary clearance.
                  </p>
                </div>

                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-white px-6 font-mono text-xs uppercase tracking-widest text-black font-semibold hover:bg-zinc-200 transition-colors shadow-sm shrink-0"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500 px-1">
              <span>B2B Export Logistics & Phytosanitary Desk:</span>
              <a 
                href="tel:+919867862233" 
                className="text-zinc-950 hover:underline flex items-center gap-1.5 font-semibold"
              >
                <PhoneCall className="h-3.5 w-3.5 text-zinc-900" />
                +91-986-786-2233
              </a>
            </div>
          </FadeInView>
        </div>

        {/* Technical & Compliance Tabs */}
        <FadeInView delay={0.15} yOffset={25} className="mt-16 pt-8 border-t border-zinc-200">
          <div className="flex gap-2 border-b border-zinc-200 pb-4 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all shrink-0 border',
                activeTab === 'specs'
                  ? 'bg-zinc-950 text-white font-semibold border-zinc-950 shadow-sm'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950'
              )}
            >
              <Layers className="h-3.5 w-3.5" />
              Technical Specifications
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('logistics')}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all shrink-0 border',
                activeTab === 'logistics'
                  ? 'bg-zinc-950 text-white font-semibold border-zinc-950 shadow-sm'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950'
              )}
            >
              <Truck className="h-3.5 w-3.5" />
              Export Logistics & Packaging
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('compliance')}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all shrink-0 border',
                activeTab === 'compliance'
                  ? 'bg-zinc-950 text-white font-semibold border-zinc-950 shadow-sm'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950'
              )}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              APEDA & Pure Veg Compliance
            </button>
          </div>

          <div className="mt-8">
            {activeTab === 'specs' && (
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs">
                <table className="w-full text-left font-mono text-xs">
                  <tbody>
                    {product.apedaSchedule && (
                      <tr className="border-b border-zinc-100 bg-zinc-50/70">
                        <td className="w-1/3 py-3.5 px-5 font-semibold text-zinc-500 uppercase tracking-wider">
                          APEDA Certificate Schedule
                        </td>
                        <td className="py-3.5 px-5 text-zinc-950 font-semibold">
                          {product.apedaSchedule}
                        </td>
                      </tr>
                    )}
                    {product.apedaItem && (
                      <tr className="border-b border-zinc-100 bg-white">
                        <td className="w-1/3 py-3.5 px-5 font-semibold text-zinc-500 uppercase tracking-wider">
                          Scheduled Product Line
                        </td>
                        <td className="py-3.5 px-5 text-zinc-950 font-semibold">
                          {getApedaItemDisplay(product)}
                        </td>
                      </tr>
                    )}
                    {product.origin && (
                      <tr className="border-b border-zinc-100 bg-zinc-50/70">
                        <td className="w-1/3 py-3.5 px-5 font-semibold text-zinc-500 uppercase tracking-wider">
                          Geographical Harvest Origin
                        </td>
                        <td className="py-3.5 px-5 text-zinc-950 font-semibold">
                          {product.origin}
                        </td>
                      </tr>
                    )}
                    {product.shelfLife && (
                      <tr className="border-b border-zinc-100 bg-white">
                        <td className="w-1/3 py-3.5 px-5 font-semibold text-zinc-500 uppercase tracking-wider">
                          Standard Shelf Stability
                        </td>
                        <td className="py-3.5 px-5 text-zinc-950 font-semibold">
                          {product.shelfLife}
                        </td>
                      </tr>
                    )}
                    {product.specifications?.map((spec, i) => (
                      <tr
                        key={spec.label}
                        className={cn(
                          'border-b border-zinc-100 transition-colors',
                          i % 2 === 0 ? 'bg-zinc-50/70' : 'bg-white'
                        )}
                      >
                        <td className="w-1/3 py-3.5 px-5 font-semibold text-zinc-500 uppercase tracking-wider">
                          {spec.label}
                        </td>
                        <td className="py-3.5 px-5 text-zinc-950 font-semibold">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'logistics' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xs">
                  <h3 className="font-display text-base text-zinc-950 font-bold mb-2">Export Packaging</h3>
                  <p className="text-xs font-mono text-zinc-700 leading-relaxed mb-3">
                    {product.packaging}
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Cartons, moisture-barrier multi-ply paper bags, and aseptic drums manufactured to international phytosanitary standards.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xs">
                  <h3 className="font-display text-base text-zinc-950 font-bold mb-2">Container Stuffing</h3>
                  <p className="text-xs font-mono text-zinc-700 leading-relaxed mb-3">
                    {product.containerLoad || 'Standard 20ft & 40ft FCL freight configurations'}
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Pre-cooled refrigerated reefer containers or ventilated standard dry boxes arranged for ocean and air transit.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xs">
                  <h3 className="font-display text-base text-zinc-950 font-bold mb-2">Export Documentation</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Complete commercial invoice, packing list, APEDA certification, Certificate of Origin, Government Phytosanitary Certificate, and lab test reports.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-zinc-700">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-950">
                  <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-900">
                      100% Pure Vegetarian Food Export Guarantee
                    </h4>
                    <p className="mt-1 text-xs text-emerald-800 leading-relaxed">
                      ✓ Absolutely <span className="font-bold text-red-600 bg-red-100/80 px-1.5 py-0.5 rounded border border-red-300">ZERO</span> meat, poultry, marine, or non-vegetarian food products are traded or exported by Swami Marvels under any circumstance.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white border border-zinc-200">
                  <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-zinc-900">
                    APEDA Scheduled Products Category 04 Restriction
                  </h4>
                  <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed">
                    Under the APEDA Scheduled Products Schedule, Category 04 is titled "Animal Products". In strict adherence to our commercial charter, export under Category 04 is exclusively confined to <strong>Item 01: Dairy Products</strong> (such as Spray-Dried Skimmed Milk Powder and Ghee) and <strong>Item 02: Natural Honey</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-zinc-200">
                  <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-zinc-900">
                    Phytosanitary & Port Health Inspection
                  </h4>
                  <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed">
                    Every export consignment undergoes pre-shipment sampling, laboratory quality inspection, and official Plant Quarantine / Port Health Department clearance prior to vessel loading.
                  </p>
                </div>
              </div>
            )}
          </div>
        </FadeInView>

        {/* Related Produce Grid */}
        {related.length > 0 && (
          <FadeInView delay={0.2} yOffset={30} className="mt-20 pt-10 border-t border-zinc-200">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                  Scheduled Commodities
                </span>
                <h2 className="font-display text-2xl font-bold text-zinc-950 mt-1">
                  More From {category?.name ?? 'This Category'}
                </h2>
              </div>
              <Link
                href="/export#apeda-schedule"
                className="inline-flex items-center gap-1 font-mono text-xs text-zinc-700 hover:text-black transition-colors"
              >
                View All APEDA Products
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <AgriculturalProductCard key={item.id} product={item} categoryName={category?.name} />
              ))}
            </div>
          </FadeInView>
        )}
      </Shell>
    </main>
  );
}
