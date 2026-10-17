"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useMotionSettings } from '../../hooks/useMotionSettings';
import { EASE, VIEWPORT } from './variants';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  direction?: 'up' | 'left';
  delay?: number;
  priority?: boolean;
}

/** Mask wipe plus a settling scale on the image itself. */
export function ImageReveal({
  src,
  alt,
  className = '',
  imageClassName = '',
  direction = 'up',
  delay = 0,
  priority = false
}: ImageRevealProps) {
  const { speed, reduced } = useMotionSettings();
  const hiddenClip = direction === 'up' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)';

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduced ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: hiddenClip }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9 * speed, ease: EASE, delay }}>
      
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${imageClassName}`}
        initial={reduced ? { scale: 1 } : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: VIEWPORT.once, amount: 0.2 }}
        transition={{ duration: 1.1 * speed, ease: EASE, delay }} />
      
    </motion.div>);

}