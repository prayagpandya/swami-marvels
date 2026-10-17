"use client";

import React from 'react';
import { useMotionSettings } from '../../hooks/useMotionSettings';
import { fadeDown, fadeUp } from './variants';
import { ViewportAnimation } from './ViewportAnimation';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down';
  distance?: number;
  delay?: number;
  duration?: number;
  amount?: number;
}

export function FadeIn({
  children,
  className,
  direction = 'up',
  distance = 28,
  delay = 0,
  duration = 0.6,
  amount
}: FadeInProps) {
  const { distance: scale, speed } = useMotionSettings();
  const build = direction === 'up' ? fadeUp : fadeDown;
  return (
    <ViewportAnimation
      className={className}
      amount={amount}
      variants={build(distance * scale, duration * speed, delay * speed)}>
      
      {children}
    </ViewportAnimation>);

}