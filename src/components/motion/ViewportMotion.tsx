"use client";

import React from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { cn } from '../../utils/cn';

// Smooth luxury cubic-bezier easing curve
export const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

export interface FadeInViewProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  className?: string;
  amount?: number | 'some' | 'all';
  once?: boolean;
}

/**
 * Animate a component smoothly ONLY when it enters the viewport.
 */
export function FadeInView({
  children,
  delay = 0,
  duration = 0.65,
  yOffset = 24,
  xOffset = 0,
  className,
  amount = 0.15,
  once = true,
  ...props
}: FadeInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-50px', amount }}
      transition={{
        duration,
        delay,
        ease: SMOOTH_EASE
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerGroupProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  amount?: number | 'some' | 'all';
  once?: boolean;
}

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: (custom: { staggerDelay: number; delayChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delayChildren
    }
  })
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: SMOOTH_EASE
    }
  }
};

/**
 * Container that staggers child animations ONLY when it enters the viewport.
 */
export function StaggerGroup({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.05,
  className,
  amount = 0.1,
  once = true,
  ...props
}: StaggerGroupProps) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      custom={{ staggerDelay, delayChildren }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-40px', amount }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      variants={staggerItemVariants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale-in card/image animation when scrolled into view.
 */
export function ScaleInView({
  children,
  delay = 0,
  duration = 0.7,
  className,
  ...props
}: HTMLMotionProps<'div'> & { delay?: number; duration?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px', amount: 0.15 }}
      transition={{ duration, delay, ease: SMOOTH_EASE }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
