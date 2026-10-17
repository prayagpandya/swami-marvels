"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useMotionSettings } from '../../hooks/useMotionSettings';
import { EASE, VIEWPORT, stagger } from './variants';

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  each?: number;
  delayChildren?: number;
  amount?: number;
  as?: 'div' | 'ul' | 'nav' | 'section';
}

export function Stagger({
  children,
  className,
  each = 0.08,
  delayChildren = 0,
  amount = VIEWPORT.amount,
  as = 'div'
}: StaggerProps) {
  const { speed } = useMotionSettings();
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={stagger(each * speed, delayChildren * speed)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}>
      
      {children}
    </Component>);

}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  as?: 'div' | 'li' | 'article';
  style?: React.CSSProperties;
}

export function StaggerItem({
  children,
  className,
  distance = 22,
  as = 'div',
  style
}: StaggerItemProps) {
  const { distance: scale, speed } = useMotionSettings();
  const Component = motion[as];
  return (
    <Component
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: distance * scale },
        show: { opacity: 1, y: 0, transition: { duration: 0.55 * speed, ease: EASE } }
      }}>
      
      {children}
    </Component>);

}