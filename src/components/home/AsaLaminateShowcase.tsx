"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { Shell } from '../ui/Section';
import { FadeInView } from '../motion/ViewportMotion';

interface AsaLaminateItem {
  code: string;
  name: string;
  collection: string;
  finish: string;
  image: string;
  accent: string;
  tag: string;
  description: string;
}

const ASA_LAMINATES_SHOWCASE: AsaLaminateItem[] = [
  {
    code: 'SV-1025',
    name: 'Nordic Green',
    collection: 'Solid Tone',
    finish: 'Eximer Super-Matte',
    image: '/sv_1025.webp',
    accent: '#4B7B5B',
    tag: 'Anti-Fingerprint · Zero Gloss',
    description: 'Next-gen co-extruded ASA surface with thermal self-healing micro-texture and zero light reflectance.'
  },
  {
    code: 'SV-1001',
    name: 'Pure White',
    collection: 'Solid Tone',
    finish: 'Eximer Super-Matte',
    image: '/sv_1001.webp',
    accent: '#EAEAEA',
    tag: 'Architectural Pristine',
    description: 'Pristine architectural white engineered for luxury European kitchen cabinetry and minimalist wardrobe fascias.'
  },
  {
    code: 'SV-316',
    name: 'Warm Walnut',
    collection: 'Woodgrain Naturals',
    finish: 'Tactile Woodgrain',
    image: '/sv_316.webp',
    accent: '#8C6239',
    tag: 'Deep Realistic Grain',
    description: 'Deep architectural woodgrain texture with ultra-realistic tactile embossing, moisture immunity, and zero maintenance.'
  },
  {
    code: 'SV-704',
    name: 'Statuary Marble',
    collection: 'Stone & Mineral',
    finish: 'Polished Mineral',
    image: '/sv_704.webp',
    accent: '#A8A29E',
    tag: 'Veined Mineral Surface',
    description: 'Designer mineral veining replication without the excessive weight, porosity, or cracking vulnerability of natural stone.'
  },
  {
    code: 'SV-1036',
    name: 'Bottle Green',
    collection: 'Solid Tone',
    finish: 'Eximer Super-Matte',
    image: '/sv_1036.webp',
    accent: '#1B4D3E',
    tag: 'Deep Accent Shade',
    description: 'Rich jewel tone for striking architectural feature walls, corporate boardrooms, and bespoke retail counters.'
  },
  {
    code: 'SV-205',
    name: 'Modern Slate',
    collection: 'Modern Living & Textured',
    finish: 'Micro-Textured',
    image: '/sv_205.webp',
    accent: '#475569',
    tag: 'Contemporary Textured',
    description: 'Micro-embossed slate texture designed for heavy-traffic interior installations and tactile architectural millwork.'
  },
  {
    code: 'SV-802',
    name: 'Artistic Bronze',
    collection: 'Artistic Inspired',
    finish: 'Designer Sculpted',
    image: '/sv_802.webp',
    accent: '#9A6B42',
    tag: 'Sculpted Feature Surface',
    description: 'Warm metallic artistic finish tailored for bespoke hospitality interiors, feature backdrops, and signature furniture.'
  },
  {
    code: 'SV-1014',
    name: 'Pearl Grey',
    collection: 'Solid Tone',
    finish: 'Eximer Super-Matte',
    image: '/sv_1014.webp',
    accent: '#94A3B8',
    tag: 'Neutral Architectural',
    description: 'Sophisticated neutral grey offering effortless harmony with natural stone, matte black hardware, and brushed brass.'
  }
];

export function AsaLaminateShowcase() {
  // Default expanded card is SV-1025
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="w-full bg-[#0A0A0C] text-white py-16 sm:py-20 lg:py-28 border-b border-zinc-800 relative overflow-hidden" aria-label="ASA Laminates interactive showcase">
      {/* Soft ambient backlight glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      <Shell className="relative z-10 w-full">
        {/* Section Header */}
        <FadeInView yOffset={15} className="mb-10 lg:mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300 rounded-md mb-3 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-sans uppercase tracking-widest text-[0.68rem] font-semibold text-amber-300">
                ASA ARCHITECTURAL SURFACE PANELS
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Curated ASA Finishes. Hover to Inspect & Reveal Code.
            </h2>
            <p className="mt-3 text-xs sm:text-sm lg:text-base text-zinc-400 leading-relaxed max-w-xl">
              Engineered with advanced Eximer technology, offering super-matte finishes, zero-glare reflectance, and thermal scratch resistance. Hover over any layered surface panel below to expand and view its official catalog code.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/laminates?division=asa-laminates"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-sans font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-md shadow-sm transition-all"
            >
              <span>Explore All 100 ASA Shades</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeInView>

        {/* Desktop & Tablet: Overlapping / Layered Expanding Card Deck */}
        <div className="hidden md:flex items-stretch w-full h-[520px] lg:h-[580px] xl:h-[620px] gap-2 lg:gap-2.5 rounded-2xl overflow-hidden p-1.5 bg-zinc-950/80 border border-zinc-800/80 shadow-2xl backdrop-blur-sm">
          {ASA_LAMINATES_SHOWCASE.map((item, idx) => {
            const isExpanded = activeIndex === idx;

            return (
              <div
                key={item.code}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`relative overflow-hidden rounded-xl cursor-pointer transition-[flex-grow,flex-shrink,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isExpanded
                    ? 'flex-[5] shadow-2xl ring-1 ring-white/20'
                    : 'flex-[1] hover:flex-[1.2]'
                }`}
              >
                {/* Full Background Laminate Image - Pure Natural Brightness Without Any Dark Tint */}
                <img
                  src={item.image}
                  alt={`ASA Laminate ${item.name} (${item.code})`}
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isExpanded ? 'scale-105' : 'scale-100'
                  }`}
                />

                {/* Collapsed State: Crisp Vertical Label Without Any Darkening Layer Over the Laminate */}
                {!isExpanded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-1 z-10 pointer-events-none transition-opacity duration-300">
                    {/* Vertical Code Label In Subtle Glass Pill */}
                    <div className="[writing-mode:vertical-rl] rotate-180 flex items-center gap-2 px-2 py-3.5 rounded-full bg-black/60 backdrop-blur-xs border border-white/20 shadow-md">
                      <span className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                        {item.code}
                      </span>
                      <span className="text-[0.65rem] font-sans font-medium text-zinc-200 truncate max-h-24">
                        {item.name}
                      </span>
                    </div>
                  </div>
                )}

                {/* Expanded State: Soft Gradient Strictly Behind Bottom Text, Keeping the Rest of the Laminate Crystal Clear */}
                {isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-28 flex flex-col justify-end transition-opacity duration-400">
                    <div className="max-w-xl">
                      {/* Enormous, Ultra-Clear Code & Color Name */}
                      <div className="mb-2">
                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                          ASA SPECIFICATION CODE
                        </span>
                        <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-baseline gap-3">
                          <span>{item.code}</span>
                          <span className="text-lg sm:text-xl lg:text-2xl font-light text-zinc-300 font-sans">
                            — {item.name}
                          </span>
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Technical Specs Strip */}
                      <div className="flex flex-wrap items-center gap-2 mb-5">
                        <span className="text-[0.68rem] font-sans font-medium bg-white/10 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-zinc-200">
                          {item.tag}
                        </span>
                        <span className="text-[0.68rem] font-sans font-medium bg-white/10 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-zinc-200">
                          1220 x 2440 mm · 1.0mm
                        </span>
                        <span className="text-[0.68rem] font-sans font-medium bg-white/10 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-emerald-400 flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" /> Eximer Certified
                        </span>
                      </div>

                      {/* Action Link */}
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/laminates?search=${item.code}`}
                          className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black font-sans font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded shadow-sm transition-all"
                        >
                          <span>View {item.code} in Catalog</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-xs font-sans font-medium uppercase tracking-wider text-zinc-400 hover:text-white transition-colors py-2 px-3"
                        >
                          <span>Request Swatch Sample</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile View (< md): Touch-Friendly Horizontal Swipeable Cards */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none">
          {ASA_LAMINATES_SHOWCASE.map((item) => (
            <div
              key={item.code}
              className="relative shrink-0 w-[290px] h-[400px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 snap-center shadow-xl flex flex-col justify-end p-5"
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/25 pointer-events-none" />

              {/* Bottom Info */}
              <div className="relative z-10">
                <span className="font-sans text-[0.65rem] text-amber-400 uppercase tracking-widest font-semibold block mb-0.5">
                  ASA CATALOG CODE
                </span>
                <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                  {item.code} — {item.name}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[0.65rem] font-sans text-zinc-400">
                    {item.finish}
                  </span>
                  <Link
                    href={`/laminates?search=${item.code}`}
                    className="text-xs font-sans font-semibold text-amber-400 hover:underline flex items-center gap-1"
                  >
                    Catalog <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Feature Strip */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-zinc-800/80 text-xs text-zinc-400 font-sans">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-amber-400" />
            <span>100 Exclusive ASA Surface Shades (Solid, Wood, Stone, Textured & Artistic)</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Thickness: 1.0 mm</span>
            <span>Dimensions: 2440 x 1220 mm</span>
            <span className="text-emerald-400">Zero VOC Compliant</span>
          </div>
        </div>
      </Shell>
    </section>
  );
}
