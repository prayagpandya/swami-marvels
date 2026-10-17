"use client";

import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { VIEWPORT } from './variants';

interface ViewportAnimationProps {
  children: React.ReactNode;
  variants: Variants;
  className?: string;
  amount?: number;
  once?: boolean;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * Base wrapper: every entrance animation in the site runs through this so the
 * viewport rules stay identical everywhere.
 */
export function ViewportAnimation({
  children,
  variants,
  className,
  amount = VIEWPORT.amount,
  once = true,
  style,
  id
}: ViewportAnimationProps) {
  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}>
      
      {children}
    </motion.div>);

}