"use client";

import React from 'react';
import type { Laminate } from '../../types/laminate';
import type { AgriculturalProduct } from '../../types/agriculturalProduct';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { ProductCard } from '../laminates/ProductCard';
import { AgriculturalProductCard } from '../agriculture/AgriculturalProductCard';
import { Section, SectionHeading, Shell } from '../ui/Section';
import { Stagger, StaggerItem } from '../motion/Stagger';

interface Props {
  title?: string;
  laminates?: Laminate[];
  agriculturalProducts?: AgriculturalProduct[];
}

export function RelatedProducts({ title = 'Related products', laminates = [], agriculturalProducts = [] }: Props) {
  const { collections, categories } = usePublicCatalogue();
  if (!laminates.length && !agriculturalProducts.length) return null;

  return (
    <Section tone="cream">
      <Shell>
        <SectionHeading title={title} eyebrow="Continue browsing" />
        <Stagger className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-4" each={0.07}>
          {laminates.map((product) =>
          <StaggerItem key={product.id} as="article">
              <ProductCard
              product={product}
              collectionName={collections.find((c) => c.slug === product.collection)?.name} />
            
            </StaggerItem>
          )}
          {agriculturalProducts.map((product) =>
          <StaggerItem key={product.id} as="article">
              <AgriculturalProductCard
              product={product}
              categoryName={categories.find((c) => c.slug === product.category)?.name} />
            
            </StaggerItem>
          )}
        </Stagger>
      </Shell>
    </Section>);

}