"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { applications } from '../../data/applications';
import { Section, SectionHeading, Shell } from '../ui/Section';
import { EASE } from '../motion/variants';
import { cn } from '../../utils/cn';

interface Props {
  tone?: 'ivory' | 'cream';
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function ApplicationSection({
  tone = 'cream',
  eyebrow = 'Applications',
  title = 'Where these surfaces go to work',
  description = 'Select an application to see the environment the surface has to perform in.'
}: Props) {
  const [activeSlug, setActiveSlug] = useState(applications[0].slug);
  const active = applications.find((a) => a.slug === activeSlug) ?? applications[0];

  return (
    <Section tone={tone} id="applications">
      <Shell>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(280px,1fr)_1.35fr] lg:gap-14">
          <div>
            {/* Mobile: chips. Desktop: stacked editorial list. */}
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:hidden">
              {applications.map((application) =>
              <button
                key={application.slug}
                type="button"
                onClick={() => setActiveSlug(application.slug)}
                className={cn(
                  'min-h-[44px] shrink-0 border px-4 text-[0.8125rem] transition-colors duration-200',
                  application.slug === activeSlug ?
                  'border-charcoal bg-charcoal text-ivory' :
                  'border-line text-slate'
                )}>
                
                  {application.name}
                </button>
              )}
            </div>

            <ul className="hidden lg:block">
              {applications.map((application, index) => {
                const isActive = application.slug === activeSlug;
                return (
                  <li key={application.slug} className="border-t border-line last:border-b">
                    <button
                      type="button"
                      onMouseEnter={() => setActiveSlug(application.slug)}
                      onFocus={() => setActiveSlug(application.slug)}
                      onClick={() => setActiveSlug(application.slug)}
                      aria-pressed={isActive}
                      className="group flex w-full items-baseline gap-5 py-6 text-left">
                      
                      <span className={cn('text-[0.7rem] tracking-[0.14em]', isActive ? 'text-charcoal' : 'text-stone')}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1">
                        <span
                          className={cn(
                            'block font-display text-[1.5rem] font-light transition-colors duration-300',
                            isActive ? 'text-charcoal' : 'text-stone'
                          )}>
                          
                          {application.name}
                        </span>
                        <AnimatePresence initial={false}>
                          {isActive &&
                          <motion.span
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="block overflow-hidden text-[0.875rem] leading-relaxed text-slate">
                            
                              <span className="block pt-3">{application.description}</span>
                            </motion.span>
                          }
                        </AnimatePresence>
                      </span>
                    </button>
                  </li>);

              })}
            </ul>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand lg:aspect-[16/11]">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.slug}
                src={active.image}
                alt={`${active.name} interior finished with laminate surfaces`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover" />
              
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 bg-ivory px-5 py-3 lg:hidden">
              <p className="font-display text-lg text-charcoal">{active.name}</p>
            </div>
          </div>
        </div>
      </Shell>
    </Section>);

}