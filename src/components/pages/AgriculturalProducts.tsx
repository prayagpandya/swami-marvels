"use client";

import React from 'react';
import { PageHero } from '../../components/ui/PageHero';
import { AgricultureDiscovery } from '../../components/agriculture/AgricultureDiscovery';
import { ExportReady } from '../../components/agriculture/ExportReady';
import { Shell } from '../../components/ui/Section';
import { TextReveal } from '../../components/motion/TextReveal';
import { FadeInView } from '../motion/ViewportMotion';
import { media } from '../../data/media';
import Link from 'next/link';
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export function AgriculturalProducts() {

  return (
    <main className="w-full bg-white text-zinc-950">
      <PageHero
        tone="charcoal"
        eyebrow="APEDA REGISTERED EXPORT DIVISION — 100% PURE VEG"
        title="APEDA Scheduled Products & Commodities"
        description="Comprehensive portfolio of export-certified commodities spanning Floriculture & Seeds, Fresh Fruits & Vegetables, Processed Foods, Dairy & Natural Honey, and Cereals. Guaranteed 100% Pure Vegetarian export standard."
        image={media.agriculture.cereals}
        imageAlt="APEDA certified agricultural produce and grains graded for international bulk supply"
      />

      <AgricultureDiscovery />

      <ExportReady />

      <section className="w-full bg-[#FAFAFA] py-20 border-t border-zinc-200">
        <Shell>
          <FadeInView yOffset={30}>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 lg:p-14 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end shadow-2xl text-white">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-4 rounded">
                  <ShieldCheck className="h-4 w-4" />
                  100% Pure Vegetarian Export Guarantee
                </span>
                <TextReveal
                  as="h2"
                  text="Inquire for specific agricultural commodities or seasonal crop contracts"
                  className="font-display text-[1.8rem] font-light leading-[1.15] text-white sm:text-[2.4rem]"
                />
                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-400">
                  Share your target produce, grading specs, moisture tolerances, packaging bags/cartons, and destination discharge port. Swami Marvels provides confirmed container dispatch dates, government phytosanitary clearance, and competitive FOB/CIF quotations.
                </p>
                <p className="mt-3 text-xs text-zinc-400 leading-relaxed font-mono">
                  ✓ Absolutely <span className="font-bold text-red-500 bg-red-950/60 px-1 py-0.5 rounded border border-red-500/30">ZERO</span> meat, poultry, marine, or non-vegetarian food products are traded or exported.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 w-full sm:w-auto shrink-0">
                <Link
                  href="/contact?division=agricultural"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded bg-white px-6 font-mono text-xs uppercase tracking-widest text-black font-semibold hover:bg-zinc-200 transition-colors shadow-sm"
                >
                  <Mail className="h-4 w-4" />
                  Contact Export Desk
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded border border-zinc-700 bg-zinc-900 px-6 font-mono text-xs uppercase tracking-widest text-zinc-200 hover:border-zinc-500 hover:text-white transition-colors"
                >
                  Contact Trade Desk
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeInView>
        </Shell>
      </section>
    </main>
  );
}