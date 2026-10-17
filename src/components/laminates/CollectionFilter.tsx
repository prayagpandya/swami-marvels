import React from 'react';
import { motion } from 'framer-motion';
import type { Collection } from '../../types/collection';
import { cn } from '../../utils/cn';
import { EASE } from '../motion/variants';

interface Props {
  collections: Collection[];
  value: string;
  onChange: (slug: string) => void;
  counts: Record<string, number>;
  total: number;
}

export function CollectionFilter({ collections, value, onChange, counts, total }: Props) {
  const options = [{ slug: 'all', name: 'All', accent: '#26231F', count: total }].concat(
    collections.map((c) => ({ slug: c.slug, name: c.name, accent: c.accent, count: counts[c.slug] ?? 0 }))
  );

  return (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
      {options.map((option) => {
        const isActive = option.slug === value;
        return (
          <button
            key={option.slug}
            type="button"
            onClick={() => onChange(option.slug)}
            aria-pressed={isActive}
            className={cn(
              'relative min-h-[44px] shrink-0 border px-4 text-[0.8125rem] transition-colors duration-200 ease-premium',
              isActive ? 'border-charcoal text-charcoal' : 'border-line text-slate hover:border-stone'
            )}>
            
            <span className="flex items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: option.accent }}
                aria-hidden="true" />
              
              {option.name}
              <span className="text-[0.6875rem] text-stone">{option.count}</span>
            </span>
            {isActive &&
            <motion.span
              layoutId="collection-filter-underline"
              transition={{ duration: 0.25, ease: EASE }}
              className="absolute inset-x-0 -bottom-px h-0.5 bg-charcoal" />

            }
          </button>);

      })}
    </div>);

}