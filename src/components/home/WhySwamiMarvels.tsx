"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { reasons } from '../../data/features';
import { Shell } from '../ui/Section';
import { TextReveal } from '../motion/TextReveal';
import { FadeInView, SMOOTH_EASE } from '../motion/ViewportMotion';
import { ShieldCheck, Award, Globe, MessageSquare } from 'lucide-react';

const reasonIcons = [
  <ShieldCheck key="1" className="h-5 w-5 text-white" />,
  <Award key="2" className="h-5 w-5 text-white" />,
  <Globe key="3" className="h-5 w-5 text-white" />,
  <MessageSquare key="4" className="h-5 w-5 text-white" />,
];

export function WhySwamiMarvels() {
  return (
    <section className="w-full bg-white py-14 sm:py-20 lg:py-28 border-t border-zinc-200" aria-label="Why choose Swami Marvels">
      <Shell>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <FadeInView yOffset={15}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-mono tracking-widest uppercase mb-4 rounded font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Enterprise Assurance
              </div>
            </FadeInView>
            <TextReveal
              as="h2"
              text="Judged on precision, consistency, and what actually ships"
              className="font-display text-[1.85rem] xs:text-[2.2rem] font-bold leading-[1.1] tracking-tight text-zinc-950 sm:text-[2.5rem] lg:text-[2.8rem]"
            />
            <FadeInView delay={0.1} yOffset={15}>
              <p className="mt-4 sm:mt-6 text-zinc-600 leading-relaxed text-xs sm:text-sm lg:text-base max-w-md">
                Swami Marvels bridges high-grade acrylic sheets, acrylic laminates, and government-certified agricultural commodities with reliable global shipping and transparent trade practices.
              </p>
            </FadeInView>
          </div>

          <ol className="flex flex-col">
            {reasons.map((reason, index) => (
              <motion.li
                key={reason.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px', amount: 0.2 }}
                transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: index * 0.08 }}
                className="group border-t border-zinc-200 py-6 sm:py-8 last:border-b transition-colors duration-300 hover:border-zinc-900 lg:py-10"
              >
                <div className="flex gap-4 sm:gap-8">
                  <div className="flex flex-col items-center pt-1 shrink-0">
                    <span className="font-mono text-xs bg-zinc-950 text-white font-semibold px-2 py-0.5 rounded tracking-wider shadow-xs">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="mt-2.5 p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white group-hover:border-zinc-600 transition-colors shadow-xs">
                      {reasonIcons[index % reasonIcons.length]}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-[1.25rem] font-semibold text-zinc-950 sm:text-[1.45rem] group-hover:text-zinc-700 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-zinc-600">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Shell>
    </section>
  );
}