"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { Shell } from '../ui/Section';
import { TextReveal } from '../motion/TextReveal';
import { EASE, VIEWPORT } from '../motion/variants';
import { useMotionSettings } from '../../hooks/useMotionSettings';
import { media } from '../../data/media';

export function WhoWeAre() {
  const { content } = usePublicCatalogue();
  const { speed } = useMotionSettings();

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-t border-zinc-200">
      <Shell>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:items-stretch">
          <div>
            <span className="font-mono text-xs text-yellow-700 tracking-widest uppercase block mb-3 font-semibold">
              Corporate Foundation
            </span>
            <TextReveal
              as="h2"
              text="Two disciplined divisions, one rigorous standard of supply"
              className="font-display text-[2rem] font-light leading-[1.08] text-zinc-950 sm:text-[2.6rem]"
            />
            
            <p className="mt-7 max-w-xl text-base leading-relaxed text-zinc-800 font-medium">
              {content.about.intro}
            </p>
            {content.about.body.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: VIEWPORT.once, amount: 0.3 }}
                transition={{ duration: 0.55 * speed, ease: EASE, delay: 0.08 * index }}
                className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-zinc-600"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65 * speed, ease: EASE }}
            className="relative aspect-[4/3] lg:aspect-auto lg:h-full w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-xl"
          >
            <img
              src={media.divisions.laminate}
              alt="Acrylic sheets and surface materials manufactured by Swami Marvels"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </Shell>
    </section>
  );
}