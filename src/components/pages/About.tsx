"use client";

import React from 'react';
import { PageHero } from '../../components/ui/PageHero';
import { WhoWeAre } from '../../components/about/WhoWeAre';
import { OurApproach } from '../../components/about/OurApproach';
import { CompanyJourney } from '../../components/about/CompanyJourney';
import { WhySwamiMarvels } from '../../components/home/WhySwamiMarvels';
import { FinalCTA } from '../../components/home/FinalCTA';

export function About() {
  return (
    <main className="w-full bg-white text-zinc-950">
      <PageHero
        tone="charcoal"
        eyebrow="ENTERPRISE PROFILE — SWAMI MARVELS"
        title="Acrylic Sheets, Acrylic Laminates & Certified Agricultural Exports"
        description="Headquartered in Mumbai, Swami Marvels is an Enterprise Supplier of Cast Acrylic Sheets, PVC Foam Boards, WPC Sheets, PP/HIPS Sheets, Acrylic Laminates, and APEDA-Registered Pure Vegetarian Agricultural Commodities."
      />

      <WhoWeAre />
      <OurApproach />
      <CompanyJourney />
      <WhySwamiMarvels />
      <FinalCTA />
    </main>
  );
}