"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  amount?: number;
}

export const FadeIn: React.FC<MotionProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = 'up',
  amount = 0.15
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 }
  };

  const initialOffset = directions[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // premium cubic-bezier ease
      }}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn: React.FC<MotionProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  amount = 0.15
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  amount?: number;
}> = ({
  children,
  className = "",
  staggerChildren = 0.1,
  delayChildren = 0,
  amount = 0.15
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren,
            delayChildren
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}> = ({
  children,
  className = "",
  direction = 'up'
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
    none: { x: 0, y: 0 }
  };

  const initialOffset = directions[direction];

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...initialOffset },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const TextReveal: React.FC<{
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}> = ({
  text,
  className = "",
  delay = 0,
  once = true
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: delay
            }
          }
        }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "100%" },
                visible: {
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                }
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
};

export const ImageReveal: React.FC<{
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  delay?: number;
}> = ({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-square",
  delay = 0
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      <motion.div
        className="absolute inset-0 bg-stone-900 z-10"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}
        style={{ originY: 0 }}
      />
      <motion.img
        src={src}
        alt={alt}
        className="object-cover w-full h-full"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
};
