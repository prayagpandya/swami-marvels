"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useMotionSettings } from '../../hooks/useMotionSettings';
import { EASE } from './variants';

interface TextRevealProps {
  text: string;
  className?: string;
  /** Rendered element for the line. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  each?: number;
  animateOnMount?: boolean;
}

/** Word-by-word mask reveal for editorial headlines. */
export function TextReveal({
  text,
  className = '',
  as = 'h2',
  delay = 0,
  each = 0.055,
  animateOnMount = false
}: TextRevealProps) {
  const { speed, reduced } = useMotionSettings();
  const Component = motion[as];
  const words = text.split(' ');

  const activation = animateOnMount ?
  { animate: 'show' as const } :
  { whileInView: 'show' as const, viewport: { once: true, amount: 0.4 } };

  if (reduced) {
    const Static = as;
    return <Static className={className}>{text}</Static>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      {...activation}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: each * speed, delayChildren: delay } }
      }}>
      {words.map((word, i) =>
      <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pr-[6px] pb-[8px] -mb-[8px]">
          <motion.span
          className="inline-block"
          variants={{
            hidden: { y: '108%' },
            show: { y: '0%', transition: { duration: 0.75 * speed, ease: EASE } }
          }}>
          
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      )}
    </Component>);

}