"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shell } from '../ui/Section';
import { TextReveal } from '../motion/TextReveal';
import { FadeInView, SMOOTH_EASE } from '../motion/ViewportMotion';
import { CheckCircle2, ShieldCheck, FileCheck, ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';

export function ExportDivisions() {
  return (
    <section className="w-full bg-white py-16 lg:py-24 border-t border-zinc-200">
      <Shell>
        
        {/* APEDA Official Certificate Spotlight Banner */}
        <FadeInView yOffset={25} className="mb-14 sm:mb-20 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-8 lg:p-12 shadow-2xl text-white">
          <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 font-mono text-xs text-emerald-400 font-medium tracking-wider uppercase">
                  <ShieldCheck className="h-4 w-4" />
                  100% Pure Vegetarian Only
                </span>
                <span className="inline-flex items-center gap-1.5 rounded bg-zinc-900 border border-zinc-700/80 px-3 py-1 font-mono text-xs text-zinc-300 font-medium tracking-wider uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Government APEDA Certified
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight">
                Official APEDA Registration & Compliance
              </h2>

              <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Swami Marvels holds valid registration with the Agricultural and Processed Food Products Export Development Authority (APEDA), Ministry of Commerce & Industry, Government of India.
              </p>

              <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-5">
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-200 font-semibold flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-zinc-400" />
                  Category 04 Strict Pure-Vegetarian Provision:
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Under the APEDA Scheduled Products Schedule, Category 04 is titled "Animal Products". For Swami Marvels, export under Category 04 is strictly and solely limited to <strong>Item 01: Dairy Products</strong> (such as Pure Ghee, Butter, and Milk Powders) and <strong>Item 02: Natural Honey</strong>. 
                </p>
                <p className="mt-2.5 text-xs text-emerald-400 font-mono">
                  ✓ Absolutely <span className="bg-red-600 text-white font-bold px-1.5 py-0.5 rounded tracking-wider shadow-xs">ZERO</span> meat, poultry, marine, or non-vegetarian food products are traded or exported.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="/apeda_certificate.webp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded bg-white px-5 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold text-black hover:bg-zinc-200 transition-colors shadow-md"
                >
                  Inspect APEDA Certificate
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#apeda-schedule"
                  className="inline-flex items-center gap-2 rounded border border-zinc-700 bg-zinc-900/80 px-5 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold text-zinc-200 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  View All Scheduled Products ↓
                </a>
              </div>
            </div>

            {/* Certificate Preview Card */}
            <div className="relative group overflow-hidden rounded-xl border-2 border-zinc-800 bg-zinc-950 p-2 shadow-2xl">
              <a href="/apeda_certificate.webp" target="_blank" rel="noopener noreferrer" className="block relative aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src="/apeda_certificate.webp"
                  alt="Government of India APEDA Scheduled Products Registration Certificate for Swami Marvels"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="font-mono text-xs text-white bg-zinc-900/90 border border-zinc-700 px-4 py-2 rounded flex items-center gap-2">
                    Click to view high-res certificate →
                  </span>
                </div>
              </a>
              <div className="p-3 text-center">
                <p className="font-mono text-xs text-zinc-400">
                  APEDA Act 1985 (2 of 1986) — Registered Scheduled Products Exporter
                </p>
              </div>
            </div>
          </div>
        </FadeInView>

        {/* Dual Export Corridors */}
        <div className="space-y-20">
          
          {/* Corridor 1: Acrylic Sheets & Surface Materials */}
          <FadeInView yOffset={30} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-md">
              <img
                src="/acryglo_cast_acrylic_sheets.webp"
                alt="Acrylic Sheets and Surface Materials Export Packaging"
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 font-mono text-xs px-3 py-1 bg-black/85 backdrop-blur-md rounded border border-white/10 text-white">
                Corridor 01
              </div>
            </div>

            <div>
              <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase block mb-2 font-semibold">
                Export Corridor 01
              </span>
              <TextReveal
                as="h3"
                text="Acrylic Sheets & Surface Materials"
                className="font-display text-2xl sm:text-3xl text-zinc-950 font-light leading-tight"
              />
              <p className="mt-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Engineered for signmakers, fabricators, and architectural contractors globally. Consignments are packed in heat-treated, fumigated solid timber crates with edge corner guards and moisture-barrier wrap to eliminate transit abrasion.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  '100% Virgin Cast PMMA Acrylic Sheets (Clear, Opal, Colors, Mirror)',
                  'Rigid PVC Sunboards & Foam Sheets (1mm to 30mm)',
                  'High Density WPC Solid Sheets & Architectural Laminates',
                  'PP Flute Protection Sheets & High-Impact Polystyrene (HIPS)',
                  'Full 20ft & 40ft Container Load (FCL) shipping via Nhava Sheva (JNPT) / Mumbai port'
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700">
                    <CheckCircle2 className="h-4 w-4 text-zinc-950 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/laminates"
                  className="inline-flex items-center gap-2 rounded bg-zinc-950 px-5 py-2.5 font-mono text-xs uppercase tracking-wider font-medium text-white hover:bg-black transition-colors shadow-sm"
                >
                  Browse Surfaces Catalog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeInView>

          {/* Corridor 2: Agricultural Commodities */}
          <FadeInView yOffset={30} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="font-mono text-xs text-emerald-700 tracking-widest uppercase block mb-2 font-semibold">
                Export Corridor 02 — 100% Pure Veg
              </span>
              <TextReveal
                as="h3"
                text="APEDA-Certified Agricultural Produce"
                className="font-display text-2xl sm:text-3xl text-zinc-950 font-light leading-tight"
              />
              <p className="mt-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Consignments harvested, graded, and packed strictly to destination quarantine specifications. Temperature-controlled reefer containers maintain optimal humidity and shelf life throughout ocean voyage.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  'Fresh Seasonal Fruits & Export-Grade Vegetables',
                  'Commercial Floriculture & Hybrid Seeds',
                  'High-Protein Cereals, Non-Basmati & Basmati Rice, Grains',
                  'Dairy Products (Spray-Dried Skimmed Milk Powder) & Natural Honey (Category 04)',
                  'Complete Phytosanitary, Certificate of Origin & Pre-shipment lab tests'
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#apeda-schedule"
                  className="inline-flex items-center gap-2 rounded bg-zinc-950 px-5 py-2.5 font-mono text-xs uppercase tracking-wider font-medium text-white hover:bg-black transition-colors shadow-sm cursor-pointer"
                >
                  View Scheduled Commodities Portfolio ↓
                </a>
                <a
                  href="#export-enquiry"
                  className="inline-flex items-center gap-2 rounded border border-zinc-300 bg-white px-5 py-2.5 font-mono text-xs uppercase tracking-wider font-medium text-zinc-800 hover:text-black hover:border-zinc-900 transition-colors cursor-pointer"
                >
                  Inquire Agro Export
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-md order-1 lg:order-2">
              <img
                src="/fruits_and_vegetables.webp"
                alt="Agricultural Produce and Cereals Export Consignment"
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 font-mono text-xs px-3 py-1 bg-black/85 backdrop-blur-md rounded border border-emerald-500/30 text-emerald-400">
                Corridor 02
              </div>
            </div>
          </FadeInView>

        </div>
      </Shell>
    </section>
  );
}
