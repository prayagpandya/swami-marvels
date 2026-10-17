import React from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import type { Laminate } from '../../types/laminate';
import { cn } from '../../utils/cn';

interface ProductCardProps {
  product: Laminate;
  collectionName?: string;
  className?: string;
  aspect?: 'portrait' | 'square';
}

export function ProductCard({ product, collectionName, className, aspect = 'portrait' }: ProductCardProps) {
  const cleanCode = (product.productCode || '').toLowerCase().replace('-', '_');
  const image = (product.images && product.images.length > 0 && !product.images[0].includes('acrylic_solid_color_sheets'))
    ? product.images[0]
    : (product.productCode === 'SC-001' ? '/mirror_acrylic_sheets.webp' : (cleanCode ? `/${cleanCode}.webp` : '/sv_1014.webp'));

  const fallbackImage = product.productCode === 'SC-001'
    ? '/mirror_acrylic_sheets.webp'
    : (cleanCode ? `/${cleanCode}.webp` : '/sv_1014.webp');

  return (
    <Link href={`/laminates/${product.slug}`}
      className={cn('group flex h-full flex-col border border-line/60 bg-ivory/30 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-copper hover:shadow-[0_12px_24px_rgba(21,19,15,0.04)] focus-visible:outline-none', className)}
      aria-label={`${product.productCode} ${product.name} — view product`}>
      
      <div
        className={cn(
          'relative w-full overflow-hidden bg-cream',
          aspect === 'portrait' ? 'aspect-[4/5]' : 'aspect-square'
        )}>
        
        {image ?
        <img
          src={image}
          alt={`${product.name} laminate surface in ${product.colour}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[600ms] ease-premium group-hover:scale-[1.05]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackImage;
          }} /> :


        <div
          className="h-full w-full transition-transform duration-[600ms] ease-premium group-hover:scale-[1.05]"
          style={{ backgroundColor: product.swatch }}
          role="img"
          aria-label={`${product.name} — solid ${product.colour} surface`} />

        }

        <span className="absolute left-0 top-0 bg-ivory/92 px-3 py-1.5 text-[0.6875rem] font-medium tracking-[0.14em] text-charcoal">
          {product.productCode}
        </span>

        <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center bg-ivory text-charcoal opacity-0 transition-[opacity,transform] duration-300 ease-premium group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-display text-[1.0625rem] font-normal leading-snug text-charcoal">{product.name}</h3>
        <p className="mt-1.5 text-[0.8125rem] text-slate">
          {product.colour}
          {collectionName ? ` · ${collectionName}` : ''}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-4">
          <span
            className="h-3.5 w-3.5 rounded-full ring-1 ring-inset ring-ink/10"
            style={{ backgroundColor: product.swatch }}
            aria-hidden="true" />
          
          <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-stone">{product.finish.replace(/-/g, ' ')}</span>
        </div>
      </div>
    </Link>);

}