"use client";

import React from 'react';
import Link from 'next/link';
import {
  ArrowRightIcon,
  Mail,
  PhoneCall,
  Clock,
  Layers,
  Globe,
  ShieldCheck,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { Shell } from '../ui/Section';
import { TextReveal } from '../motion/TextReveal';
import { FadeInView } from '../motion/ViewportMotion';

export function FinalCTA() {
  const CAPABILITIES = [
    {
      icon: Clock,
      title: 'Rapid Quote Turnaround',
      description: 'Verified FOB/CIF pricing, caliper availability, and batch lead times within 2 hours.'
    },
    {
      icon: Layers,
      title: 'Custom Thickness & CNC Sizing',
      description: '1.0mm to 35mm thicknesses with precision diamond-cut edges and custom dimensions.'
    },
    {
      icon: Globe,
      title: 'Global Port Container Dispatch',
      description: 'Direct vessel loading via Mundra & Nhava Sheva with export-grade sea-worthy packing.'
    },
    {
      icon: ShieldCheck,
      title: 'APEDA & REACH Compliance',
      description: '100% Pure-Veg certified export supply chain and virgin PMMA batch test certificates.'
    }
  ];

  return (
    <section
      className="w-full bg-[#09090B] py-14 sm:py-20 lg:py-28 border-t border-zinc-800 text-white"
      aria-labelledby="final-cta-heading"
    >
      <Shell>
        <FadeInView yOffset={25}>
          <div className="relative overflow-hidden rounded-2xl bg-[#111114] p-6 sm:p-8 lg:p-12 xl:p-14 border border-zinc-800 shadow-2xl">
            {/* Ambient decorative lighting */}
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />
            <div className="absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-white/5 blur-[110px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Heading, Subheading, Description & Primary Action Buttons (7 cols on lg) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono tracking-widest uppercase mb-4 sm:mb-6 rounded">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Direct B2B Procurement Desk
                  </span>

                  <TextReveal
                    as="h2"
                    text="Looking for the right material or commodity?"
                    className="font-display text-[1.85rem] xs:text-[2.2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[2.6rem] lg:text-[3rem]"
                  />

                  <TextReveal
                    as="p"
                    text="Get in direct contact with our export and supply team."
                    className="mt-2.5 sm:mt-3 font-display text-[1.2rem] xs:text-[1.4rem] font-light leading-[1.15] text-zinc-400 sm:text-[1.7rem] lg:text-[1.9rem]"
                  />

                  <p className="mt-4 sm:mt-6 max-w-xl text-xs sm:text-sm leading-relaxed text-zinc-400 font-sans">
                    Send us your target specifications, sheet dimensions, thickness, or export container volume. Our commercial team responds with verified availability, batch lead time, and accurate FOB/CIF estimates.
                  </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[48px] sm:min-h-[52px] items-center justify-center gap-2.5 bg-white hover:bg-zinc-200 px-6 sm:px-7 font-mono text-xs uppercase tracking-widest text-black font-bold shadow-md transition-all duration-200 rounded active:scale-[0.98]"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Sales
                  </Link>

                  <Link
                    href="/contact"
                    className="group inline-flex min-h-[48px] sm:min-h-[52px] items-center justify-center gap-2.5 border border-zinc-700 bg-zinc-900/90 px-6 sm:px-7 font-mono text-xs uppercase tracking-widest text-white transition-all duration-200 hover:border-zinc-400 hover:bg-zinc-800 rounded active:scale-[0.98]"
                  >
                    <PhoneCall className="h-4 w-4 text-zinc-400" />
                    Contact Office
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Procurement Highlights & Fast-Track Capabilities Panel (5 cols on lg) */}
              <div className="lg:col-span-5">
                <div className="rounded-xl border border-zinc-800/90 bg-zinc-950/85 p-5 sm:p-6 backdrop-blur-md shadow-2xl flex flex-col gap-4">
                  {/* Panel Header */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800/80">
                    <span className="font-mono text-xs font-semibold tracking-wider text-zinc-200 uppercase">
                      Commercial Desk Capabilities
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-[0.65rem] font-mono text-emerald-400 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Mon-Sat
                    </span>
                  </div>

                  {/* 4 Feature Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5 pt-1">
                    {CAPABILITIES.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800/60 hover:border-zinc-700 transition-colors"
                        >
                          <div className="p-2 rounded-md bg-zinc-800 text-amber-400 shrink-0 mt-0.5 shadow-sm">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-mono text-xs font-semibold text-zinc-100">
                              {item.title}
                            </h3>
                            <p className="mt-0.5 text-[0.72rem] leading-relaxed text-zinc-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick Direct Desk Strip */}
                  <div className="mt-2 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <a
                      href="tel:+919867862233"
                      className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 text-amber-400" />
                      <span>+91-986-786-2233</span>
                    </a>
                    <a
                      href="mailto:info@swamimarvels.com"
                      className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5 text-amber-400" />
                      <span>info@swamimarvels.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInView>
      </Shell>
    </section>
  );
}