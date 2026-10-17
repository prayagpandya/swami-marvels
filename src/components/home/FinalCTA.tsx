"use client";

import React from 'react';
import { ArrowRightIcon, Mail, PhoneCall } from 'lucide-react';
import { Shell } from '../ui/Section';
import { TextReveal } from '../motion/TextReveal';
import { FadeInView } from '../motion/ViewportMotion';
import Link from 'next/link';

export function FinalCTA() {

  return (
    <section className="w-full bg-[#09090B] py-14 sm:py-20 lg:py-28 border-t border-zinc-800 text-white" aria-labelledby="final-cta-heading">
      <Shell>
        <FadeInView yOffset={25}>
          <div className="relative overflow-hidden rounded-2xl bg-[#111114] p-5 sm:p-8 lg:p-12 xl:p-16 border border-zinc-800 shadow-2xl">
            {/* Subtle decorative glow */}
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono tracking-widest uppercase mb-4 sm:mb-6 rounded">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Direct B2B Procurement Desk
                </span>
                <TextReveal
                  as="h2"
                  text="Looking for the right material or commodity?"
                  className="font-display text-[1.85rem] xs:text-[2.2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[2.8rem] lg:text-[3.2rem]"
                />
                <TextReveal
                  as="p"
                  text="Get in direct contact with our export and supply team."
                  className="mt-2.5 sm:mt-3 font-display text-[1.3rem] xs:text-[1.6rem] font-light leading-[1.15] text-zinc-400 sm:text-[2rem] lg:text-[2.4rem]"
                />

                <p className="mt-4 sm:mt-6 max-w-xl text-xs sm:text-sm leading-relaxed text-zinc-400">
                  Send us your target specifications, sheet dimensions, thickness, or export container volume. Our commercial team responds with verified availability, batch lead time, and accurate FOB/CIF estimates.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] sm:min-h-[52px] items-center justify-center gap-2.5 bg-white hover:bg-zinc-200 px-6 sm:px-7 font-mono text-xs uppercase tracking-widest text-black font-semibold shadow-sm transition-all duration-200 rounded"
                >
                  <Mail className="h-4 w-4" />
                  Contact Sales
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex min-h-[48px] sm:min-h-[52px] items-center justify-center gap-2.5 border border-zinc-700 bg-zinc-900/90 px-6 sm:px-7 font-mono text-xs uppercase tracking-widest text-white transition-all duration-200 hover:border-zinc-400 rounded"
                >
                  <PhoneCall className="h-4 w-4 text-zinc-400" />
                  Contact Office
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </FadeInView>
      </Shell>
    </section>
  );
}