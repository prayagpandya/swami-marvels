"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../motion/variants';
import { cn } from '../../utils/cn';

export interface SpecTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function ProductSpecifications({ tabs }: {tabs: SpecTab[];}) {
  const [active, setActive] = useState(tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div className="w-full">
      <div role="tablist" aria-label="Product details" className="flex gap-6 border-b border-line">
        {tabs.map((tab) =>
        <button
          key={tab.id}
          role="tab"
          type="button"
          aria-selected={tab.id === active}
          onClick={() => setActive(tab.id)}
          className={cn(
            'relative min-h-[48px] text-[0.8125rem] uppercase tracking-[0.12em] transition-colors duration-200',
            tab.id === active ? 'text-charcoal' : 'text-stone hover:text-slate'
          )}>
          
            {tab.label}
            {tab.id === active &&
          <motion.span
            layoutId="spec-tab-indicator"
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute inset-x-0 -bottom-px h-0.5 bg-charcoal" />

          }
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab?.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: EASE }}
          role="tabpanel"
          className="pt-7">
          
          {activeTab?.content}
        </motion.div>
      </AnimatePresence>
    </div>);

}

export function SpecList({ items }: {items: {label: string;value: string;}[];}) {
  return (
    <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
      {items.map((item) =>
      <div key={item.label} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
          <dt className="text-[0.75rem] uppercase tracking-[0.12em] text-stone">{item.label}</dt>
          <dd className="text-right text-[0.9rem] text-charcoal">{item.value}</dd>
        </div>
      )}
    </dl>);

}