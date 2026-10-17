"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { Section, SectionHeading, Shell } from '../ui/Section';
import { EASE, VIEWPORT } from '../motion/variants';
import { useMotionSettings } from '../../hooks/useMotionSettings';
import { cn } from '../../utils/cn';

export function Collections() {
  const { collections, content, laminates } = usePublicCatalogue();
  const { speed, reduced } = useMotionSettings();

  const featured = collections.filter((c) => content.featuredCollections.includes(c.slug)).slice(0, 4);
  const list = featured.length ? featured : collections.slice(0, 4);

  return (
    <Section tone="cream" id="collections">
      <Shell>
        <SectionHeading
          eyebrow="Collections"
          title="Ranges built around how a space is used"
          description="Each collection groups surfaces that work together — so a specification can stay consistent across a whole project." />
        

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {list.map((collection, index) => {
            const count = laminates.filter((l) => l.collection === collection.slug).length;
            return (
              <motion.article
                key={collection.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: VIEWPORT.once, amount: 0.2 }}
                className="group">
                
                <Link href={`/laminates?collection=${collection.slug}`} className="block focus-visible:outline-none">
                  <motion.div
                    className="relative aspect-[16/11] w-full overflow-hidden bg-sand"
                    variants={{
                      hidden: { clipPath: reduced ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' },
                      show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.9 * speed, ease: EASE } }
                    }}>
                    
                    <motion.img
                      src={collection.image}
                      alt={`${collection.name} collection`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[700ms] ease-premium group-hover:scale-[1.04]"
                      variants={{
                        hidden: { scale: reduced ? 1 : 1.14 },
                        show: { scale: 1, transition: { duration: 1.2 * speed, ease: EASE } }
                      }} />
                    
                    <span
                      className="absolute bottom-0 left-0 h-1.5 w-0 transition-[width] duration-500 ease-premium group-hover:w-1/3"
                      style={{ backgroundColor: collection.accent }}
                      aria-hidden="true" />
                    
                  </motion.div>

                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div className="max-w-md">
                      <motion.h3
                        className="font-display text-[1.5rem] font-light text-charcoal sm:text-[1.75rem]"
                        variants={{
                          hidden: { opacity: 0, y: 18 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.55 * speed, ease: EASE, delay: 0.15 } }
                        }}>
                        
                        {collection.name}
                      </motion.h3>
                      <motion.p
                        className="mt-3 text-[0.9rem] leading-relaxed text-slate"
                        variants={{
                          hidden: { opacity: 0, y: 14 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.55 * speed, ease: EASE, delay: 0.22 } }
                        }}>
                        
                        {collection.description}
                      </motion.p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] text-charcoal">
                        Explore
                        <ArrowRightIcon
                          className="h-3.5 w-3.5 transition-transform duration-200 ease-premium group-hover:translate-x-1"
                          aria-hidden="true" />
                        
                      </span>
                    </div>
                    <span className="shrink-0 pt-1 text-[0.75rem] tracking-[0.12em] text-stone">
                      {String(count).padStart(2, '0')}
                    </span>
                  </div>
                </Link>
              </motion.article>);

          })}
        </div>
      </Shell>
    </Section>);

}