"use client";

import React from 'react';
import { Hero } from '../../components/home/Hero';
import { BusinessDivisions } from '../../components/home/BusinessDivisions';
import { ProductCatalogPreview } from '../../components/home/ProductCatalogPreview';
import { AsaLaminateShowcase } from '../../components/home/AsaLaminateShowcase';
import { APEDAHomeBanner } from '../../components/home/APEDAHomeBanner';
import { WhySwamiMarvels } from '../../components/home/WhySwamiMarvels';
import { FinalCTA } from '../../components/home/FinalCTA';

export function Home() {
  return (
    <main className="w-full bg-white text-zinc-950">
      <Hero />
      <BusinessDivisions />
      <AsaLaminateShowcase />
      <ProductCatalogPreview />
      <APEDAHomeBanner />
      <WhySwamiMarvels />
      <FinalCTA />
    </main>
  );
}