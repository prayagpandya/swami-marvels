import React from 'react';
import { cn } from '../../utils/cn';
import { FadeIn } from '../motion/FadeIn';
import { TextReveal } from '../motion/TextReveal';

export function Shell({ children, className }: {children: React.ReactNode;className?: string;}) {
  return <div className={cn('mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12 xl:px-16', className)}>{children}</div>;
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: 'ivory' | 'cream' | 'charcoal';
}

const tones = {
  ivory: 'bg-ivory text-charcoal',
  cream: 'bg-cream text-charcoal',
  charcoal: 'bg-charcoal text-ivory'
};

export function Section({ children, className, id, tone = 'ivory' }: SectionProps) {
  return (
    <section id={id} className={cn('w-full py-16 sm:py-20 lg:py-28', tones[tone], className)}>
      {children}
    </section>);

}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
  invert?: boolean;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  invert = false,
  className,
  titleClassName
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className
      )}>
      
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow &&
        <FadeIn distance={12} duration={0.5}>
            <p className={cn('label-xs mb-4', invert ? 'text-ivory/55' : 'text-stone')}>{eyebrow}</p>
          </FadeIn>
        }
        <TextReveal
          as="h2"
          text={title}
          className={cn(
            'font-display text-[1.9rem] font-light leading-[1.08] tracking-[-0.015em] sm:text-[2.4rem] lg:text-[3rem]',
            invert ? 'text-ivory' : 'text-charcoal',
            titleClassName
          )} />
        
        {description &&
        <FadeIn distance={16} delay={0.1}>
            <p
            className={cn(
              'mt-5 max-w-xl text-[0.95rem] leading-relaxed',
              invert ? 'text-ivory/70' : 'text-slate'
            )}>
            
              {description}
            </p>
          </FadeIn>
        }
      </div>
      {action &&
      <FadeIn distance={16} delay={0.15} className="shrink-0">
          {action}
        </FadeIn>
      }
    </div>);

}