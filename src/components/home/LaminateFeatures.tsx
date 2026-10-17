import React from 'react';
import { motion } from 'framer-motion';
import { laminateFeatures } from '../../data/features';
import { Section, Shell } from '../ui/Section';
import { TextReveal } from '../motion/TextReveal';
import { FadeIn } from '../motion/FadeIn';
import { EASE, VIEWPORT } from '../motion/variants';
import { useMotionSettings } from '../../hooks/useMotionSettings';
import { cn } from '../../utils/cn';

export function LaminateFeatures() {
  const { speed, distance, reduced } = useMotionSettings();

  return (
    <Section tone="ivory">
      <Shell>
        <div className="max-w-2xl">
          <FadeIn distance={12} duration={0.5}>
            <p className="label-xs mb-4 text-stone">Characteristics</p>
          </FadeIn>
          <TextReveal
            as="h2"
            text="What the surface has to survive"
            className="font-display text-[1.9rem] font-light leading-[1.08] tracking-[-0.015em] text-charcoal sm:text-[2.4rem] lg:text-[3rem]" />
          
        </div>

        <div className="mt-16 flex flex-col">
          {laminateFeatures.map((feature, index) =>
          <motion.article
            key={feature.id}
            initial="hidden"
            whileInView="show"
            viewport={{ once: VIEWPORT.once, amount: 0.25 }}
            className={cn(
              'grid grid-cols-1 items-center gap-8 border-t border-line py-10 md:grid-cols-[auto_1fr_1fr] md:gap-14 lg:py-14',
              index === laminateFeatures.length - 1 && 'border-b'
            )}>
            
              <motion.span
              className="font-display text-[2.4rem] font-light leading-none text-sand md:text-[3.2rem]"
              variants={{
                hidden: { opacity: 0, y: 16 * distance },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 * speed, ease: EASE } }
              }}>
              
                {String(index + 1).padStart(2, '0')}
              </motion.span>

              <motion.div
              variants={{
                hidden: { opacity: 0, x: -24 * distance },
                show: { opacity: 1, x: 0, transition: { duration: 0.6 * speed, ease: EASE, delay: 0.08 } }
              }}>
              
                <h3 className="font-display text-[1.4rem] font-normal text-charcoal sm:text-[1.6rem]">
                  {feature.title}
                </h3>
                <p className="mt-4 max-w-md text-[0.9rem] leading-relaxed text-slate">{feature.description}</p>
              </motion.div>

              <motion.div
              className="relative aspect-[16/10] w-full overflow-hidden bg-cream md:aspect-[16/9]"
              variants={{
                hidden: { opacity: 0, x: reduced ? 0 : 40 * distance },
                show: { opacity: 1, x: 0, transition: { duration: 0.75 * speed, ease: EASE, delay: 0.12 } }
              }}>
              
                <img
                src={feature.image}
                alt={`${feature.title} illustrated on a Swami Marvels surface`}
                loading="lazy"
                className="h-full w-full object-cover" />
              
              </motion.div>
            </motion.article>
          )}
        </div>
      </Shell>
    </Section>);

}