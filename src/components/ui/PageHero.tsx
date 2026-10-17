import React from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from '../motion/TextReveal';
import { EASE } from '../motion/variants';
import { Shell } from './Section';
import { useMotionSettings } from '../../hooks/useMotionSettings';
import { cn } from '../../utils/cn';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  tone?: 'ivory' | 'charcoal';
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  children,
  tone = 'ivory'
}: PageHeroProps) {
  const { reduced } = useMotionSettings();
  const invert = tone === 'charcoal';

  return (
    <section className={cn('w-full pt-16 sm:pt-20', invert ? 'bg-charcoal' : 'bg-ivory')} aria-labelledby="page-title">
      <Shell className={cn('py-12 sm:py-16 lg:py-20', image && 'lg:pb-0')}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
          className={cn('label-xs', invert ? 'text-ivory/50' : 'text-stone')}>
          
          {eyebrow}
        </motion.p>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <h1
            id="page-title"
            className={cn(
              'font-display text-[1.85rem] xs:text-[2.2rem] font-light leading-[1.08] tracking-tight sm:text-[2.8rem] lg:text-[3.5rem]',
              invert ? 'text-ivory' : 'text-charcoal'
            )}>
            
            <TextReveal as="span" text={title} className="block" animateOnMount delay={0.12} />
          </h1>
          {description &&
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.35 }}
            className={cn('max-w-xl text-[0.95rem] leading-relaxed', invert ? 'text-ivory/70' : 'text-slate')}>
            
              {description}
            </motion.p>
          }
        </div>

        {children && <div className="mt-10">{children}</div>}
      </Shell>

      {image &&
      <motion.div
        initial={reduced ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: 'inset(0% 0% 100% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="mt-10 h-[240px] w-full overflow-hidden sm:h-[360px] lg:h-[520px]">
        
          <motion.img
          src={image}
          alt={imageAlt}
          initial={reduced ? { scale: 1 } : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
          className="h-full w-full object-cover" />
        
        </motion.div>
      }
    </section>);

}