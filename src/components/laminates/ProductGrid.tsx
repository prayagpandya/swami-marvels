import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Laminate } from '../../types/laminate';
import type { Collection } from '../../types/collection';
import { ProductCard } from './ProductCard';
import { EASE } from '../motion/variants';

interface Props {
  products: Laminate[];
  collections: Collection[];
  emptyAction?: React.ReactNode;
}

export function ProductGrid({ products, collections, emptyAction }: Props) {
  if (!products.length) {
    return (
      <div className="border border-line px-6 py-20 text-center">
        <p className="font-display text-xl font-light text-charcoal">No surfaces match these filters</p>
        <p className="mx-auto mt-3 max-w-sm text-sm text-slate">
          Try clearing a filter, or send us the specification you are looking for and we will check availability.
        </p>
        {emptyAction && <div className="mt-7 flex justify-center">{emptyAction}</div>}
      </div>);

  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence mode="popLayout" initial={false}>
        {products.map((product) =>
        <motion.div
          key={product.id}
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.28, ease: EASE }}>
          
            <ProductCard
            product={product}
            collectionName={collections.find((c) => c.slug === product.collection)?.name} />
          
          </motion.div>
        )}
      </AnimatePresence>
    </div>);

}