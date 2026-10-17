"use client";

import React from 'react';
import { useMotionSettings } from '../../hooks/useMotionSettings';
import { clipReveal } from './variants';
import { ViewportAnimation } from './ViewportAnimation';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  amount?: number;
}

/** Clip-path wipe — used where a block should be uncovered rather than moved. */
export function Reveal({
  children,
  className,
  direction = 'up',
  duration = 0.85,
  amount
}: RevealProps) {
  const { speed, reduced } = useMotionSettings();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <ViewportAnimation className={className} amount={amount} variants={clipReveal(direction, duration * speed)}>
      {children}
    </ViewportAnimation>);

}