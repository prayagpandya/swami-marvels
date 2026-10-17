"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { media } from '../../data/media';
import { Shell } from '../ui/Section';

const totalSlides = 3;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0
  })
};

export function HomeBanner() {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Autoplay slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setDirection(-1);
    setSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    if (index === slide) return;
    setDirection(index > slide ? 1 : -1);
    setSlide(index);
  };

  return (
    <section className="w-full bg-ivory pt-[86px] pb-4" aria-label="Featured Banner">
      <Shell>
        <div className="relative w-full aspect-square xs:aspect-[600/400] sm:aspect-[975/500] lg:aspect-[1216/480] h-auto overflow-hidden bg-sand/20 border border-line mt-4 sm:mt-6 lg:mt-8 rounded-xl lg:rounded-2xl">
          
          {/* Slide Content Carousel */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={slide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 }
              }}
              className="absolute inset-0 w-full h-full">
              
              <picture>
                <source
                  media="(max-width: 639px)"
                  srcSet={media.banners.mobile[slide]}
                />
                <source
                  media="(max-width: 1023px)"
                  srcSet={media.banners.tablet[slide]}
                />
                <img
                  src={media.banners.desktop[slide]}
                  alt={`Featured banner ${slide + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </picture>
              {/* Subtle overlay for styling coherence */}
              <div className="absolute inset-0 bg-ink/10" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-charcoal/20 bg-ivory/25 text-charcoal backdrop-blur-md transition-all duration-200 hover:border-charcoal hover:bg-charcoal hover:text-ivory hover:scale-105 cursor-pointer">
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-charcoal/20 bg-ivory/25 text-charcoal backdrop-blur-md transition-all duration-200 hover:border-charcoal hover:bg-charcoal hover:text-ivory hover:scale-105 cursor-pointer">
            <ArrowRightIcon className="h-4 w-4" />
          </button>

        </div>

        {/* Slide Indicator Dots */}
        <div className="mt-4 flex justify-center gap-2.5">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                slide === i ? 'bg-charcoal scale-110' : 'bg-charcoal/20 hover:bg-charcoal/40'
              }`}
            />
          ))}
        </div>
      </Shell>
    </section>
  );
}
