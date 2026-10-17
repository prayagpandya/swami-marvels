"use client";

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export type MotionTier = 'mobile' | 'tablet' | 'desktop';

interface MotionSettings {
  tier: MotionTier;
  /** Multiplier applied to travel distance. */
  distance: number;
  /** Multiplier applied to duration. */
  speed: number;
  reduced: boolean;
}

const getTier = (width: number): MotionTier => {
  if (width < 768) return 'mobile';
  if (width < 1280) return 'tablet';
  return 'desktop';
};

/**
 * Motion is responsive: shorter travel and quicker timing on small screens,
 * and effectively disabled when the user prefers reduced motion.
 */
export function useMotionSettings(): MotionSettings {
  const reduced = useReducedMotion();
  const [tier, setTier] = useState<MotionTier>(() =>
  typeof window === 'undefined' ? 'desktop' : getTier(window.innerWidth)
  );

  useEffect(() => {
    const onResize = () => setTier(getTier(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (reduced) {
    return { tier, distance: 0, speed: 0.01, reduced: true };
  }

  const distance = tier === 'mobile' ? 0.5 : tier === 'tablet' ? 0.75 : 1;
  const speed = tier === 'mobile' ? 0.8 : tier === 'tablet' ? 0.9 : 1;

  return { tier, distance, speed, reduced: false };
}