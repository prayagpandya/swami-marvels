"use client";

import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { PageHero } from '../../components/ui/PageHero';
import { ProductDiscovery } from '../../components/laminates/ProductDiscovery';
import { Shell } from '../../components/ui/Section';
import { FadeInView } from '../motion/ViewportMotion';
import { TextReveal } from '../../components/motion/TextReveal';
import Link from 'next/link';

export function Laminates() {

  return (
    <main className="w-full bg-white text-zinc-950">
      <PageHero
        tone="charcoal"
        eyebrow="Acrylic Sheets & Surface Materials"
        title="Acrylic Sheets & Architectural Surfaces"
        description="Comprehensive inventory of 100% Virgin Cast Acrylic Sheets, Rigid PVC Sunboards, High-Density WPC Boards, PP Flute Protection Boards, HIPS, and Architectural Laminates for industrial fabrication, signage, and contract interiors."
      />

      <ProductDiscovery />

      {/* Industrial Specification & Quotation CTA */}
      <section className="w-full bg-[#FAFAFA] py-20 border-t border-zinc-200">
        <Shell>
          <FadeInView yOffset={25}>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 lg:p-14 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end shadow-2xl text-white">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono tracking-widest uppercase mb-4 rounded">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Custom Batch & Container Orders
                </span>
                <TextReveal
                  as="h2"
                  text="Require custom thickness, specific density, or bulk crate packing?"
                  className="font-display text-[2rem] font-light leading-[1.1] text-white sm:text-[2.6rem]"
                />
                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-400">
                  Swami Marvels supplies standard sheet formats (1220 × 2440 mm, 2050 × 3050 mm) and precision cut-to-size dimensions. Send us your technical drawings or bills of quantity for instant wholesale evaluation.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 w-full sm:w-auto shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 bg-white px-7 font-mono text-xs uppercase tracking-widest text-black font-semibold hover:bg-zinc-200 transition-colors shadow-sm rounded"
                >
                  <Mail className="h-4 w-4" />
                  Contact Sales
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 border border-zinc-700 bg-zinc-900 px-7 font-mono text-xs uppercase tracking-widest text-zinc-200 hover:border-zinc-500 hover:text-white transition-colors rounded"
                >
                  Contact Engineers
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