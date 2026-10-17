"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchIcon, Sprout } from 'lucide-react';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { AgriculturalProductCard } from './AgriculturalProductCard';
import { Shell } from '../ui/Section';
import { FadeInView, SMOOTH_EASE } from '../motion/ViewportMotion';
import { cn } from '../../utils/cn';

export function AgricultureDiscovery() {
  const { agriculturalProducts, categories } = usePublicCatalogue();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') ?? 'all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const next = searchParams.get('category');
    if (next && next !== category) setCategory(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleCategory = (slug: string) => {
    setCategory(slug);
    const params = new URLSearchParams(searchParams);
    if (slug === 'all') params.delete('category');
    else params.set('category', slug);
    router.push('?' + params.toString(), { scroll: false });
  };

  const counts = useMemo(
    () =>
      agriculturalProducts.reduce<Record<string, number>>((acc, product) => {
        acc[product.category] = (acc[product.category] ?? 0) + 1;
        return acc;
      }, {}),
    [agriculturalProducts]
  );

  const results = useMemo(() => {
    const term = search.trim().toLowerCase();
    return agriculturalProducts.filter((product) => {
      if (category !== 'all' && product.category !== category) return false;
      if (!term) return true;
      return (
        product.name.toLowerCase().includes(term) || 
        product.grade.toLowerCase().includes(term) ||
        (product.apedaItem && product.apedaItem.toLowerCase().includes(term))
      );
    });
  }, [agriculturalProducts, category, search]);

  const options = useMemo(() => {
    const list = categories.map((c) => ({ slug: c.slug, name: c.name, count: counts[c.slug] ?? 0 }));
    list.sort((a, b) => a.name.localeCompare(b.name));
    return [{ slug: 'all', name: 'All APEDA Produce', count: agriculturalProducts.length }, ...list];
  }, [categories, counts, agriculturalProducts.length]);

  return (
    <section className="w-full bg-[#FAFAFA] py-14 lg:py-20 border-b border-zinc-200" id="categories" aria-label="Agricultural product catalogue">
      <Shell>
        <FadeInView yOffset={15}>
          {/* Category Tabs */}
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0 border-b border-zinc-200/80 pb-4">
            {options.map((option) => {
              const isActive = option.slug === category;
              return (
                <button
                  key={option.slug}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleCategory(option.slug)}
                  className={cn(
                    'min-h-[42px] shrink-0 rounded-lg px-4 py-2 text-xs font-mono tracking-wider transition-all duration-200 border cursor-pointer flex items-center shadow-xs',
                    isActive
                      ? 'border-zinc-950 bg-zinc-950 text-white font-semibold shadow-md'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:text-black hover:bg-zinc-100/70'
                  )}
                >
                  <span>{option.name}</span>
                  <span
                    className={cn(
                      'ml-2.5 text-[0.68rem] px-2 py-0.5 rounded font-mono font-medium',
                      isActive ? 'bg-zinc-800 text-zinc-100' : 'bg-zinc-100 text-zinc-600'
                    )}
                  >
                    {option.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Counter */}
          <div className="mt-6 flex flex-col gap-4 border-y border-zinc-200/80 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <SearchIcon
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search APEDA produce, schedule or grade..."
                aria-label="Search agricultural products"
                className="min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-4 text-xs font-mono text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-950 shadow-xs transition-colors"
              />
            </div>
            <p className="text-xs font-mono text-zinc-500" aria-live="polite">
              Displaying <span className="font-semibold text-zinc-950">{results.length}</span> of <span className="font-semibold text-zinc-950">{agriculturalProducts.length}</span> scheduled export commodities
            </p>
          </div>
        </FadeInView>

        {/* Product Cards Grid */}
        {results.length ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {results.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: SMOOTH_EASE }}
                >
                  <AgriculturalProductCard
                    product={product}
                    categoryName={categories.find((c) => c.slug === product.category)?.name}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-12 text-center shadow-xs">
            <Sprout className="mx-auto h-8 w-8 text-zinc-400 mb-3" />
            <h3 className="font-display text-xl font-bold text-zinc-950">No commodities match this filter</h3>
            <p className="mt-2 text-xs font-mono text-zinc-500 max-w-md mx-auto">
              Please refine your search query or connect with our APEDA export desk for custom contract cultivation and container shipments.
            </p>
          </div>
        )}
      </Shell>
    </section>
  );
}