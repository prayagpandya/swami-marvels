"use client";

import React, { useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { ProductCard } from '../laminates/ProductCard';
import { Button } from '../ui/Button';
import { Section, SectionHeading, Shell } from '../ui/Section';
import { Stagger, StaggerItem } from '../motion/Stagger';

export function FeaturedLaminates() {
  const { laminates, collections } = usePublicCatalogue();
  const railRef = useRef<HTMLDivElement>(null);

  const featured = laminates.filter((l) => l.featured).slice(0, 8);
  const items = featured.length >= 4 ? featured : laminates.slice(0, 8);

  const scrollBy = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.min(rail.clientWidth * 0.8, 640), behavior: 'smooth' });
  };

  return (
    <Section tone="ivory">
      <Shell>
        <SectionHeading
          eyebrow="Surfaces"
          title="Explore Our Laminates"
          description="A working palette of woodgrains, stones and solid tones — supplied in standard sheets for furniture, joinery and interior applications."
          action={
          <div className="flex items-center gap-3">
              <div className="hidden gap-2 md:flex">
                <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Scroll products left"
                className="flex h-11 w-11 items-center justify-center border border-line text-charcoal transition-colors duration-200 hover:border-charcoal">
                
                  <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Scroll products right"
                className="flex h-11 w-11 items-center justify-center border border-line text-charcoal transition-colors duration-200 hover:border-charcoal">
                
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <Button to="/laminates" variant="outline" withArrow>
                View all laminates
              </Button>
            </div>
          } />
      </Shell>

      <Shell className="mt-12">
        <div
          ref={railRef}
          className="rail-scroll flex w-full snap-x snap-mandatory gap-5 overflow-x-auto pb-6">
          <Stagger
            className="flex gap-5"
            each={0.06}
            amount={0.05}>
            
            {items.map((product) =>
            <StaggerItem
              key={product.id}
              as="article"
              className="w-[220px] shrink-0 snap-start sm:w-[260px] lg:w-[300px]">
              
                <ProductCard
                product={product}
                collectionName={collections.find((c) => c.slug === product.collection)?.name} />
              
              </StaggerItem>
            )}
          </Stagger>
        </div>
      </Shell>
    </Section>);

}