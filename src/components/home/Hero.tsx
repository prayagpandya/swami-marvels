"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { Shell } from '../ui/Section';

interface HeroSlide {
  id: string;
  category: string;
  badge: string;
  title: string;
  description: string;
  specs: string;
  image: string;
  primaryLink: string;
  primaryText: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'acrylic-sheets',
    category: 'Acrylic Sheets Division',
    badge: '1.0mm TO 35mm GAUGES · 30+ COLOUR PALETTES',
    title: 'Virgin Cast Acrylic Sheets in All Thicknesses & Colors',
    description:
      'Explore our complete spectrum: from 2mm ultra-thin to 30mm heavy-gauge solid cast PMMA. Available in crystal-clear transparent, opal white, deep black, mirror, and vibrant cast acrylic colors with diamond-polished edges.',
    specs: 'Gauges: 1.0mm – 35mm · Clear, Opal, Mirror, Tinted & Solid Color Cast PMMA',
    image: '/hero_acrylic_colors_and_mm.webp',
    primaryLink: '/laminates?division=acrylic-sheets',
    primaryText: 'Explore Acrylic Sheets'
  },
  {
    id: 'asa-laminates',
    category: 'Architectural Surfaces',
    badge: 'EXIMER SURFACE TECH · SIGNATURE COLOUR PALETTE',
    title: 'ASA Super-Matte Laminates Across Curated Colors',
    description:
      'Ultra-matte velvety tactile architectural surfaces featuring our complete designer palette: Nordic Sage, Charcoal Graphite, Cashmere Beige, Warm Alabaster, Terracotta, and Midnight Navy with matching edge-banding.',
    specs: 'Thickness: 1.0mm & 1.2mm · Zero Reflection Eximer Finish · Scratch Healing',
    image: '/hero_asa_color_palette.webp',
    primaryLink: '/laminates?division=asa-laminates',
    primaryText: 'Explore ASA Laminates'
  },
  {
    id: 'asa-super-matte',
    category: 'Precision Architectural Surfaces',
    badge: '1.0mm TO 2.0mm GAUGES · SEAMLESS EDGE-BANDING',
    title: 'Precision ASA Super-Matte Panels & Edge-Banding Systems',
    description:
      'Engineered with advanced electron-beam cured excimer technology for velvety anti-fingerprint surfaces, thermal micro-scratch healing, and matching 1.0mm to 2.0mm edge-banding for flawless seamless cabinetry.',
    specs: 'Gauges: 1.0mm, 1.2mm, 1.5mm, 2.0mm · Anti-Fingerprint · Zero-Joint Edge Banding',
    image: '/hero_asa_super_matte_mm.webp',
    primaryLink: '/laminates?division=asa-laminates',
    primaryText: 'Explore ASA Panels'
  },
  {
    id: 'woodgrain-laminate',
    category: 'Textured Surface Panels',
    badge: 'ARCHITECTURAL TIMBER VARIETIES · 3D TACTILE GRAIN',
    title: 'Natural Woodgrain Panels Across Premium Timber Tones',
    description:
      'Authentic tactile woodgrain reproductions across American Walnut, Golden Teak, Scandinavian Light Oak, Smoked Ash, and Rich Rosewood. Lifetime UV color fastness with zero timber maintenance.',
    specs: 'Dimensions: 1220 × 2440 mm · 5 Natural Timber Species · Deep Synchronized Grain',
    image: '/hero_woodgrain_finishes_palette.webp',
    primaryLink: '/laminates?division=asa-laminates&subcategory=woodgrain-naturals',
    primaryText: 'Explore Woodgrain Panels'
  },
  {
    id: 'pvc-wpc-boards',
    category: 'Rigid Architectural Boards',
    badge: '3mm TO 25mm THICKNESS GAUGES · 100% WATERPROOF',
    title: 'Rigid PVC Foam Boards & Solid WPC Sheets',
    description:
      'Complete stepped thickness range from 3mm, 5mm, 8mm, 12mm, 18mm to 25mm. High-density rigid Celuka foam and solid WPC composite construction engineered for precision CNC routing and exterior installations.',
    specs: 'Thickness: 3mm, 5mm, 8mm, 12mm, 18mm, 25mm · High Density 0.55 – 0.70 g/cm³',
    image: '/hero_pvc_wpc_thickness_lineup.webp',
    primaryLink: '/laminates?division=acrylic-sheets&category=pvc-sheets-boards',
    primaryText: 'Explore PVC & WPC Boards'
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  // Keyboard navigation (ArrowLeft and ArrowRight)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlePrev, handleNext]);

  // Auto slide rotation every 5.5 seconds, pauses when user hovers
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const active = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative w-full h-screen min-h-screen flex items-center justify-center bg-black text-white overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Product Slider"
    >
      {/* Background Slides with Smooth Fade Transitions */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover object-center scale-100 transition-transform duration-10000 ease-out transform"
          />
          {/* Lightweight subtle directional scrim allowing product details, colors and finishes to shine vibrantly */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
        </div>
      ))}

      {/* Left Navigation Arrow */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/45 hover:bg-black/85 text-white/80 hover:text-white border border-white/20 hover:border-white backdrop-blur-md shadow-2xl transition-all duration-200 active:scale-95 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/45 hover:bg-black/85 text-white/80 hover:text-white border border-white/20 hover:border-white backdrop-blur-md shadow-2xl transition-all duration-200 active:scale-95 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Slide Content Overlay */}
      <Shell className="relative z-20 w-full pt-20 sm:pt-24 pb-20 px-8 sm:px-16">
        <div className="max-w-3xl relative">
          {/* Subtle localized ambient contrast glow behind text for razor-sharp legibility over bright images */}
          <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-r from-black/55 via-black/30 to-transparent blur-3xl pointer-events-none -z-10 rounded-3xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Category & Badge */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/25 bg-black/65 backdrop-blur-md shadow-xl mb-4">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-[0.68rem] sm:text-xs uppercase tracking-widest text-zinc-200 font-semibold">
                  {active.badge}
                </span>
              </div>

              {/* Clear-Cut Headline with crisp drop-shadow */}
              <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                {active.title}
              </h1>

              {/* Clear-Cut Description with enhanced contrast */}
              <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed max-w-2xl font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {active.description}
              </p>

              {/* Specification Callout */}
              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-black/45 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-mono text-zinc-100 shadow-md">
                  <Layers className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="truncate">{active.specs}</span>
                </div>
              </div>

              {/* Action Buttons to Products Page */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href={active.primaryLink}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white hover:bg-zinc-100 text-black font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-[0.98]"
                >
                  <span>{active.primaryText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/laminates?division=all"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 hover:border-white bg-black/50 hover:bg-black/70 backdrop-blur-md text-white font-mono font-semibold text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-7 py-3.5 shadow-md transition-all duration-200"
                >
                  <span>Full Products Catalog</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Shell>

      {/* Dots on Bottom Center Showing Status of the Current Slide */}
      <div
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-xl"
        role="tablist"
        aria-label="Hero slide switcher"
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              aria-selected={isActive}
              role="tab"
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isActive
                  ? 'w-8 h-2.5 bg-amber-400 shadow-md ring-2 ring-amber-400/30'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}