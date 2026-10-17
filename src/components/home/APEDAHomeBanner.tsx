"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheckIcon, CheckCircle2Icon, FileTextIcon } from 'lucide-react';
import { Shell } from '../ui/Section';
import { FadeInView, ScaleInView } from '../motion/ViewportMotion';

export function APEDAHomeBanner() {
  return (
    <section className="w-full bg-[#FAFAFA] py-16 sm:py-20 border-b border-zinc-200" aria-label="APEDA Certification">
      <Shell>
        <FadeInView yOffset={25}>
          <div className="border border-zinc-800 bg-[#09090B] p-6 sm:p-10 lg:p-12 relative overflow-hidden rounded-2xl shadow-2xl text-white">
            
            {/* Subtle architectural ambient blur */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Info Column */}
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/90 px-3 py-1 text-xs text-zinc-300 font-mono uppercase tracking-wider rounded">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>Government of India APEDA Registered Exporter</span>
                </div>

                <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                  Certified 100% Pure Vegetarian Global Export
                </h2>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300 max-w-2xl">
                  Swami Marvels holds official registration with the Agricultural and Processed Food Products Export Development Authority (APEDA). We strictly uphold a <strong className="text-white font-medium">100% Pure Vegetarian export policy</strong>. Under APEDA Scheduled Category 04, our export operations are strictly restricted to <strong className="text-white font-medium">Dairy Products & Pure Forest Honey</strong> only.
                </p>

                <p className="mt-2 text-xs font-mono text-zinc-400">
                  ✓ Absolutely <span className="font-bold text-red-500 bg-red-950/70 px-1 py-0.5 rounded border border-red-500/30">ZERO</span> meat, poultry, marine, or non-vegetarian food products are traded or exported.
                </p>

                {/* 4 Feature Badges */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-zinc-800">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono">
                    <CheckCircle2Icon className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span>27 APEDA Scheduled Products Compliance</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono">
                    <CheckCircle2Icon className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span>Category 04: Dairy & Honey Exclusively</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono">
                    <CheckCircle2Icon className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span>Phytosanitary & Port Health Clearance</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono">
                    <CheckCircle2Icon className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span>FCL Dry & Calibrated Reefer Containers</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/export"
                    className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black font-mono font-semibold text-xs uppercase tracking-widest px-6 py-3.5 transition-colors rounded shadow-sm"
                  >
                    <FileTextIcon className="h-4 w-4" />
                    <span>View Official APEDA Certificate</span>
                  </Link>

                  <Link
                    href="/export#apeda-schedule"
                    className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-white font-mono font-medium text-xs uppercase tracking-widest px-5 py-3.5 transition-colors bg-zinc-900/90 rounded shadow-xs"
                  >
                    <span>Explore Agricultural Lines</span>
                  </Link>
                </div>
              </div>

              {/* Right Certificate Thumbnail Preview */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center">
                <Link
                  href="/export"
                  className="group relative block w-full max-w-xs border border-zinc-800 bg-zinc-950 p-2 shadow-xl transition-transform duration-300 hover:scale-[1.02] rounded-xl"
                >
                  <img
                    src="/apeda_certificate.webp"
                    alt="Official APEDA Scheduled Products Certificate for Swami Marvels"
                    className="w-full object-contain filter contrast-105 rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                    <span className="bg-white text-black font-mono font-semibold text-xs uppercase tracking-wider px-4 py-2 shadow-lg rounded">
                      Inspect Certificate →
                    </span>
                  </div>
                </Link>
                <span className="mt-2.5 text-[0.68rem] font-mono text-zinc-400 uppercase tracking-widest text-center">
                  Official APEDA Scheduled Products Certificate
                </span>
              </div>

            </div>
          </div>
        </FadeInView>
      </Shell>
    </section>
  );
}
