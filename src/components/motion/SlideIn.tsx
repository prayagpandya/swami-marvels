"use client";

import React from 'react';
import { useMotionSettings } from '../../hooks/useMotionSettings';
import { slideLeft, slideRight } from './variants';
import { ViewportAnimation } from './ViewportAnimation';

interface SlideInProps {
  children: React.ReactNode;
  className?: string;
  from?: 'left' | 'right';
  distance?: number;
  delay?: number;
  duration?: number;
  amount?: number;
}

export function SlideIn({
  children,
  className,
  from = 'left',
  distance = 56,
  delay = 0,
  duration = 0.7,
  amount
}: SlideInProps) {
  const { distance: scale, speed } = useMotionSettings();
  const build = from === 'left' ? slideRight : slideLeft;
  return (
    <ViewportAnimation
      className={className}
      amount={amount}
      variants={build(distance * scale, duration * speed, delay * speed)}>
      
      {children}
    </ViewportAnimation>);

}