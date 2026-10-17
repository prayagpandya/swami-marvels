"use client";

import React from 'react';
import { useMotionSettings } from '../../hooks/useMotionSettings';
import { scaleIn } from './variants';
import { ViewportAnimation } from './ViewportAnimation';

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  from?: number;
  delay?: number;
  duration?: number;
}

export function ScaleIn({ children, className, from = 0.96, delay = 0, duration = 0.55 }: ScaleInProps) {
  const { reduced, speed } = useMotionSettings();
  return (
    <ViewportAnimation
      className={className}
      variants={scaleIn(reduced ? 1 : from, duration * speed, delay * speed)}>
      
      {children}
    </ViewportAnimation>);

}