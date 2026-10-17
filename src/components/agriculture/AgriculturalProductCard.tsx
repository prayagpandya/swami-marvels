"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon, Mail, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { AgriculturalProduct } from '../../types/agriculturalProduct';
import { getApedaItemDisplay } from '../../data/agriculturalProducts';
import { SMOOTH_EASE } from '../motion/ViewportMotion';
import { cn } from '../../utils/cn';

interface Props {
  product: AgriculturalProduct;
  categoryName?: string;
  className?: string;
}

export function AgriculturalProductCard({ product, categoryName, className }: Props) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button')) return;
    router.push(`/agricultural-products/${product.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px', amount: 0.15 }}
      transition={{ duration: 0.6, ease: SMOOTH_EASE }}
      onClick={handleCardClick}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200/90 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-950 hover:shadow-xl cursor-pointer select-none',
        className
      )}
    >
      <Link
        href={`/agricultural-products/${product.slug}`}
        className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-zinc-100 block"
      >
        <img
          src={product.images[0]}
          alt={`${product.name} prepared for international export`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/alphonso_mangoes_Hapus.webp';
          }}
        />
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          <span className="rounded bg-black/85 backdrop-blur-md px-2 py-0.5 font-mono text-[0.65rem] font-medium tracking-wider text-emerald-400 border border-emerald-500/30">
            100% PURE VEG
          </span>
          <span className="rounded bg-black/85 backdrop-blur-md px-2 py-0.5 font-mono text-[0.65rem] font-medium tracking-wider text-zinc-300 border border-white/10 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            APEDA SCHEDULED
          </span>
        </div>
        <span className="pointer-events-none absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-white opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100">
          <ArrowUpRightIcon className="h-4 w-4 stroke-[2.5]" />
        </span>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[0.68rem] uppercase tracking-wider text-zinc-500 font-medium">
            {product.apedaItem ? getApedaItemDisplay(product) : (categoryName ?? 'Produce')}
          </p>
          {product.productCode && (
            <span className="font-mono text-[0.65rem] text-zinc-400">
              {product.productCode}
            </span>
          )}
        </div>

        <Link href={`/agricultural-products/${product.slug}`} className="mt-1.5">
          <h3 className="font-display text-[1.1rem] font-semibold leading-snug text-zinc-950 group-hover:text-zinc-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-[0.8rem] leading-relaxed text-zinc-600">
          {product.grade}
        </p>

        <div className="mt-auto pt-3.5 border-t border-zinc-100 flex items-center justify-between gap-2 font-mono text-xs">
          <span className="text-[0.72rem] text-zinc-600 flex items-center gap-1 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-zinc-900" />
            {product.availability}
          </span>
          <span className="text-[0.72rem] font-semibold text-zinc-700 group-hover:text-zinc-950 flex items-center gap-1 group-hover:translate-x-0.5 transition-all">
            View Details →
          </span>
        </div>
      </div>
    </motion.div>
  );
}