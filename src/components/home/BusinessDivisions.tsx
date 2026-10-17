"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, LayersIcon, WheatIcon } from 'lucide-react';
import { Shell } from '../ui/Section';
import { FadeInView, SMOOTH_EASE } from '../motion/ViewportMotion';
import { cn } from '../../utils/cn';

const divisions = [
  {
    id: 'industrial',
    index: 'INDUSTRIAL & ARCHITECTURAL',
    title: 'Acrylic Sheets & Architectural Surfaces',
    copy: 'Direct enterprise B2B supply of 100% Virgin Cast Acrylics, PVC Sunboards, WPC Construction Boards, PP/HIPS Sheets, and 100 High-Performance ASA Architectural Laminates.',
    to: '/laminates',
    image: '/acryglo_cast_acrylic_sheets.webp',
    cta: 'Explore Surfaces Catalog',
    badges: ['305 Sheet Products', '100 ASA Laminates', 'PVC & WPC Boards', 'PP Flute & Floor Guard']
  },
  {
    id: 'agricultural',
    index: 'AGRICULTURAL COMMODITIES',
    title: 'APEDA Certified Food Exports',
    copy: 'APEDA-scheduled 100% Pure Vegetarian export commodities: Aged 1121 Basmati Rice, Alphonso Mango Pulp, Nashik Red Onions, Category 04 Dairy Skimmed Milk Powder & Natural Forest Honey.',
    to: '/export#apeda-schedule',
    image: '/Aged 1121 Basmati Rice (Premium).jpg',
    cta: 'Explore APEDA Produce',
    badges: ['27 APEDA Scheduled Lines', '100% Pure Veg Guarantee', 'Category 04: Dairy & Honey', 'Global Reefer & FCL Shipping']
  }
];

export function BusinessDivisions() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="w-full bg-[#FAFAFA] py-14 sm:py-20 lg:py-24 border-b border-zinc-200" aria-label="Our business divisions">
      <Shell>
        <FadeInView yOffset={15} className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-[0.68rem] uppercase tracking-widest font-mono text-zinc-500 font-medium">
              CORE OPERATIONAL DIVISIONS
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              Two Specialized Divisions. One High Standard.
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Engineered acrylic sheets and architectural surfaces paired with certified agricultural exports for global B2B buyers.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {divisions.map((division, i) => {
            const isActive = active === division.id;
            return (
              <FadeInView
                key={division.id}
                delay={i * 0.12}
                yOffset={25}
                className="h-full"
              >
                <article
                  onMouseEnter={() => setActive(division.id)}
                  onMouseLeave={() => setActive(null)}
                  className="group relative flex h-full min-h-[380px] sm:min-h-[460px] flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-8 lg:p-10 transition-all duration-300 hover:border-zinc-600 shadow-xl text-white"
                >
                  {/* Background Image with Dark Monochrome Gradient */}
                  <img
                    src={division.image}
                    alt={division.title}
                    loading="lazy"
                    className={cn(
                      'absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out',
                      isActive ? 'scale-105' : 'scale-100'
                    )}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/90 to-[#09090B]/40 transition-colors duration-500" />
                  
                  {/* Top index & icon */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-xs font-medium uppercase tracking-widest text-zinc-400">
                      {division.index}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-300 group-hover:border-zinc-600 group-hover:text-white transition-colors">
                      {i === 0 ? <LayersIcon className="h-4 w-4" /> : <WheatIcon className="h-4 w-4" />}
                    </div>
                  </div>

                  {/* Content & Action */}
                  <div className="relative z-10 mt-auto pt-16">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-white group-hover:text-zinc-100 transition-colors">
                      {division.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-400">
                      {division.copy}
                    </p>

                    {/* Highlights Grid with Subtle Indicator */}
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-zinc-800/80 pt-4">
                      {division.badges.map((badge) => (
                        <span key={badge} className="inline-flex items-center gap-1.5 rounded bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 text-[0.68rem] font-mono text-zinc-300 shadow-xs">
                          <span className="h-1.5 w-1.5 bg-amber-400 rounded-full shrink-0" />
                          <span>{badge}</span>
                        </span>
                      ))}
                    </div>

                    {/* CTA Button (Clean Monochrome White) */}
                    <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                      <Link
                        href={division.to}
                        className="inline-flex items-center gap-2 rounded bg-white hover:bg-zinc-200 text-black text-xs font-mono uppercase tracking-widest font-semibold px-5 py-2.5 shadow-sm transition-all duration-200"
                      >
                        <span>{division.cta}</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              </FadeInView>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}