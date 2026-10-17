"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { Section, SectionHeading, Shell } from '../ui/Section';
import { EASE, VIEWPORT } from '../motion/variants';
import { Button } from '../ui/Button';

export function AgriculturePreview() {
  const { categories } = usePublicCatalogue();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = categories[activeIndex] ?? categories[0];

  if (!categories.length) return null;

  return (
    <Section tone="ivory">
      <Shell>
        <SectionHeading
          eyebrow="Agricultural Division"
          title="From Indian Produce to Global Markets"
          description="Fresh, processed and bulk agricultural products prepared for buyers who order by specification and volume."
          action={
          <Button to="/export#apeda-schedule" variant="outline" withArrow>
              View all products
            </Button>
          } />
        

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: VIEWPORT.once, amount: 0.1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative aspect-[4/3] w-full overflow-hidden bg-cream lg:aspect-auto lg:min-h-[520px]">
            
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.image}
                alt={active.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover" />
              
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 max-w-sm bg-ivory p-5 sm:p-6">
              <p className="label-xs text-stone">Category</p>
              <p className="mt-2 font-display text-xl font-light text-charcoal">{active.name}</p>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-slate">{active.description}</p>
            </div>
          </motion.div>

          <ul className="flex flex-col">
            {categories.map((category, index) =>
            <li key={category.id} className="border-t border-line last:border-b">
                <Link href="/export#apeda-schedule"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className="group flex items-center justify-between gap-6 py-5 sm:py-6">
                
                  <span className="flex items-baseline gap-4">
                    <span className="text-[0.7rem] tracking-[0.14em] text-stone">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-[1.2rem] font-light text-charcoal sm:text-[1.45rem]">
                      {category.name}
                    </span>
                  </span>
                  <ArrowRightIcon
                  className="h-4 w-4 shrink-0 text-stone transition-transform duration-200 ease-premium group-hover:translate-x-1 group-hover:text-charcoal"
                  aria-hidden="true" />
                
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Shell>
    </Section>);

}