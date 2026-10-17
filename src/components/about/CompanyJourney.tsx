import React from 'react';
import { Shell } from '../ui/Section';
import { TextReveal } from '../motion/TextReveal';
import { FadeIn } from '../motion/FadeIn';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CompanyJourney() {
  return (
    <section className="w-full bg-white py-20 border-t border-zinc-200">
      <Shell>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <span className="font-mono text-xs text-yellow-700 tracking-widest uppercase block mb-3 font-semibold">
              Corporate Journey
            </span>
            <TextReveal
              as="h2"
              text="Built around two high-performance commercial divisions"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-950 leading-tight"
            />
          </div>
          <div>
            <FadeIn distance={18}>
              <p className="max-w-xl text-[0.95rem] leading-relaxed text-zinc-800">
                Swami Marvels was established to provide reliable, enterprise-grade supply across two synergistic industries: Acrylic Sheets & Architectural Surface Materials (serving fabricators, sign manufacturers, and interior contractors) and APEDA-Registered 100% Pure Vegetarian Agricultural Commodities (supplying international food importers and wholesale traders).
              </p>
              <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-zinc-600">
                Operating from Charkop Industrial Estate, Kandivali West, Mumbai, our team combines technical materials expertise with deep supply-chain and international shipping capabilities.
              </p>
            </FadeIn>
            <FadeIn distance={16} delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 rounded-md bg-zinc-950 px-6 py-3.5 font-mono text-xs uppercase tracking-wider font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm active:scale-[0.99]"
                >
                  <span>Contact Our Commercial Desk</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </Shell>
    </section>
  );
}