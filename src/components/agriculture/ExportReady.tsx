"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { media } from '../../data/media';
import { Shell } from '../ui/Section';
import { TextReveal } from '../motion/TextReveal';
import { FadeInView, SMOOTH_EASE } from '../motion/ViewportMotion';
import Link from 'next/link';
import { ShieldCheck, PackageCheck, Truck, ArrowRight } from 'lucide-react';

const points = [
  {
    icon: <PackageCheck className="h-5 w-5 text-white" />,
    title: 'FCL & Temperature-Controlled Reefer',
    copy: 'Container-load and calibrated reefer cargo organized strictly according to international grade, temperature, and moisture specifications.'
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-white" />,
    title: 'APEDA Phytosanitary & Port Health',
    copy: 'Consignments undergo official agricultural inspection, pesticide-residue screening, non-GMO testing, and government Phytosanitary clearance.'
  },
  {
    icon: <Truck className="h-5 w-5 text-white" />,
    title: 'Port-to-Port Global Despatch',
    copy: 'Complete documentation provided: Bill of Lading, Certificate of Origin, packing list, and certified pre-shipment lab assay reports.'
  }
];

export function ExportReady() {
  return (
    <section className="w-full bg-[#0A0A0C] py-20 lg:py-28 border-t border-zinc-800 text-white">
      <Shell>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-center">
          <FadeInView
            yOffset={30}
            className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 lg:aspect-auto lg:min-h-[460px] shadow-2xl"
          >
            <img
              src={media.agriculture.fruitsVegetables}
              alt="APEDA Scheduled Produce prepared for international ocean shipping"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </FadeInView>

          <FadeInView delay={0.1} yOffset={30} className="flex flex-col justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-700/80 text-zinc-300 text-xs font-mono tracking-widest uppercase mb-4 w-fit rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              APEDA Scheduled Export Framework
            </span>

            <TextReveal
              as="h2"
              text="Prepared for international food importers ordering by exact grade"
              className="font-display text-[1.8rem] font-light leading-[1.15] text-white sm:text-[2.2rem]"
            />

            <div className="mt-8 flex flex-col divide-y divide-zinc-800/80 border-y border-zinc-800/80">
              {points.map((point) => (
                <div key={point.title} className="py-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0 text-white shadow-xs">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-[1.05rem] font-semibold text-white">{point.title}</h3>
                      <p className="mt-1 max-w-lg text-[0.82rem] leading-relaxed text-zinc-400">{point.copy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#export-enquiry"
                className="inline-flex items-center gap-2 rounded bg-white px-6 py-3 font-mono text-xs uppercase tracking-widest text-black font-semibold hover:bg-zinc-200 transition-colors shadow-sm"
              >
                Inquire For Export
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#apeda-schedule"
                className="inline-flex items-center gap-2 rounded border border-zinc-700 bg-zinc-900 px-6 py-3 font-mono text-xs uppercase tracking-widest text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
              >
                View APEDA Catalog
              </a>
            </div>
          </FadeInView>
        </div>
      </Shell>
    </section>
  );
}