"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '../../types/product';
import { cn } from '../../utils/cn';

interface UniversalProductCardProps {
  product: Product;
  className?: string;
}

export function UniversalProductCard({ product, className }: UniversalProductCardProps) {
  const router = useRouter();
  const isAgri = product.division === 'agricultural';
  const isLam = product.mainCategory === 'asa-laminates' || product.division === 'laminate' || (!!product.productCode && (product.productCode.startsWith('SV-') || product.productCode.startsWith('SC-')));

  const rawImage = product.images?.[0];
  let image = rawImage;
  if (!image || (isLam && image.includes('acrylic_solid_color_sheets'))) {
    if (isAgri) {
      image = '/alphonso_mangoes_Hapus.webp';
    } else if (isLam) {
      if (product.productCode === 'SC-001') {
        image = '/mirror_acrylic_sheets.webp';
      } else if (product.productCode) {
        image = `/${product.productCode.toLowerCase().replace('-', '_')}.webp`;
      } else {
        image = '/sv_1014.webp';
      }
    } else {
      image = '/acryglo_cast_acrylic_sheets.webp';
    }
  }

  const fallbackImage = isAgri
    ? '/alphonso_mangoes_Hapus.webp'
    : isLam
    ? (product.productCode === 'SC-001' ? '/mirror_acrylic_sheets.webp' : (product.productCode ? `/${product.productCode.toLowerCase().replace('-', '_')}.webp` : '/sv_1014.webp'))
    : '/acryglo_cast_acrylic_sheets.webp';

  const detailUrl = product.division === 'agricultural' 
    ? `/agricultural-products/${product.slug}` 
    : `/laminates/${product.slug}`;

  const thicknessSpec = product.specifications?.find(s => 
    s.label.toLowerCase().includes('thickness')
  )?.value;

  const dimensionSpec = product.specifications?.find(s => 
    s.label.toLowerCase().includes('dimension') || s.label.toLowerCase().includes('size')
  )?.value;

  const handleCardClick = (e: React.MouseEvent) => {
    // If clicked on an interactive link or button inside, do not trigger card navigation
    const target = e.target as HTMLElement;
    if (target.closest('a, button')) {
      return;
    }
    router.push(detailUrl);
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-950 hover:shadow-xl cursor-pointer select-none',
        className
      )}
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-100 block">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackImage;
          }}
        />
        
        {/* Code Badge */}
        {product.productCode && (
          <span className="absolute left-2.5 top-2.5 rounded bg-black/85 backdrop-blur-md px-2.5 py-1 font-mono text-[0.65rem] font-medium tracking-wider text-zinc-200 border border-zinc-800">
            {product.productCode}
          </span>
        )}

        {/* Agricultural Badge */}
        {product.division === 'agricultural' && (
          <span className="absolute right-2.5 top-2.5 rounded bg-emerald-950/90 backdrop-blur-md px-2 py-0.5 font-mono text-[0.62rem] font-semibold tracking-wider text-emerald-300 border border-emerald-700">
            100% PURE VEG
          </span>
        )}

        {/* Hover quick detail arrow */}
        <span className="pointer-events-none absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-white opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 stroke-[2]" />
        </span>
      </div>

      {/* Product Information */}
      <div className="mt-4 flex flex-1 flex-col">
        {/* Subcategory / Division label */}
        <div className="flex items-center justify-between gap-2 text-[0.68rem] font-mono text-zinc-500 uppercase tracking-wider">
          <span className="truncate text-zinc-600 font-medium">
            {product.subcategory?.replace(/-/g, ' ') || product.category?.replace(/-/g, ' ') || 'Swami Marvels'}
          </span>
          {product.brand && (
            <span className="text-zinc-400 shrink-0 font-normal">{product.brand}</span>
          )}
        </div>

        {/* Product Title (2 lines clamp) */}
        <div className="mt-1.5">
          <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-zinc-950 group-hover:text-zinc-700 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Short description */}
        <p className="mt-1.5 text-[0.8rem] leading-relaxed text-zinc-600 line-clamp-2">
          {product.shortDescription || product.description}
        </p>

        {/* Quick Specs Pills */}
        {(thicknessSpec || dimensionSpec) && (
          <div className="mt-3 flex flex-wrap gap-1.5 text-[0.68rem] font-mono text-zinc-700">
            {thicknessSpec && (
              <span className="rounded bg-zinc-100 px-2 py-0.5 border border-zinc-200/80 truncate max-w-[180px]">
                {thicknessSpec}
              </span>
            )}
            {dimensionSpec && (
              <span className="rounded bg-zinc-100 px-2 py-0.5 border border-zinc-200/80 truncate max-w-[180px]">
                {dimensionSpec}
              </span>
            )}
          </div>
        )}

        {/* Bottom Status Indicator */}
        <div className="mt-auto pt-3.5 border-t border-zinc-100 flex items-center justify-between gap-2 font-mono text-xs">
          <span className="text-zinc-500 flex items-center gap-1.5 text-[0.72rem] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Wholesale B2B
          </span>
          <span className="text-[0.72rem] font-semibold text-zinc-700 group-hover:text-zinc-950 flex items-center gap-1 group-hover:translate-x-0.5 transition-all">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}
