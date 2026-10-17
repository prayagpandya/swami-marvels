"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { media } from '../../data/media';

export function InitialPreloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const duration = 2000; // 2.0s duration for a smooth, premium loading experience

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Linear, synchronous percentage matching the visual bar exactly
      const currentPct = Math.min(100, Math.max(0, Math.round(rawProgress * 100)));
      setProgress(currentPct);

      if (rawProgress < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsComplete(true);
          // Restore body scrolling
          document.body.style.overflow = '';
          // Remove from DOM after exit animation finishes
          setTimeout(() => {
            setShouldRender(false);
          }, 600);
        }, 300);
      }
    };

    const frameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = '';
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="site-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070709] select-none pointer-events-auto"
          role="status"
          aria-label="Loading Swami Marvels"
          aria-live="polite"
        >
          {/* Subtle ambient luxury backdrop glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.08)_0%,_transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Center Logo with Breathing Gold Ring */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center mb-6"
            >
              {/* Pulsing subtle glow ring */}
              <div className="absolute -inset-2.5 rounded-full bg-amber-400/20 blur-xl animate-pulse" />

              <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full p-1.5 bg-black border-2 border-white/80 ring-4 ring-amber-400/20 shadow-[0_0_35px_rgba(245,158,11,0.35)] flex items-center justify-center overflow-hidden">
                <img
                  src={media.brandMark}
                  alt="Swami Marvels Logo"
                  className="h-full w-full object-contain rounded-full bg-black"
                />
              </div>
            </motion.div>

            {/* Brand Typography */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="font-display font-bold tracking-[0.18em] text-white text-xl sm:text-2xl uppercase">
                SWAMI MARVELS
              </h1>
              <p className="mt-1.5 font-mono text-[0.65rem] sm:text-[0.72rem] tracking-[0.22em] uppercase text-zinc-400">
                Architectural Surfaces · Industrial Sheets · Exports
              </p>
            </motion.div>

            {/* Sleek Loading Bar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 flex flex-col items-center w-full"
            >
              {/* Outer Track */}
              <div className="w-64 sm:w-80 h-2.5 rounded-full bg-zinc-900 border border-zinc-700/80 p-0.5 overflow-hidden shadow-inner relative">
                {/* Active Progress Fill Bar */}
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 shadow-[0_0_14px_rgba(251,191,36,0.95)] transition-[width] duration-75 ease-out"
                  style={{ width: `${Math.max(progress, progress > 0 ? 2 : 0)}%` }}
                />
              </div>

              {/* Progress Percentage & Status */}
              <div className="mt-2.5 flex items-center justify-between w-64 sm:w-80 text-[0.62rem] font-mono uppercase tracking-widest text-zinc-400">
                <span>Loading Catalogue</span>
                <span className="text-amber-400 font-bold">{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
