import React from 'react';
import { motion } from 'framer-motion';
import { exportStages } from '../../data/features';
import { EASE, VIEWPORT } from '../motion/variants';
import { useMotionSettings } from '../../hooks/useMotionSettings';
import { cn } from '../../utils/cn';

interface ExportJourneyProps {
  invert?: boolean;
  className?: string;
}

/**
 * The signature sequence: a drawn route with six stages that resolve one after
 * another. Horizontal on large screens, a vertical timeline on small ones.
 */
export function ExportJourney({ invert = false, className }: ExportJourneyProps) {
  const { speed, reduced } = useMotionSettings();

  const lineColour = invert ? 'bg-zinc-800' : 'bg-zinc-300';
  const activeLine = 'bg-yellow-400';
  const dot = invert ? 'bg-yellow-400' : 'bg-yellow-500';

  return (
    <div className={cn('w-full', className)}>
      {/* Horizontal route — md and up */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: VIEWPORT.once, amount: 0.25 }}
        className="relative hidden md:block">
        
        <div className={cn('absolute left-0 right-0 top-[13px] h-px', lineColour)} aria-hidden="true" />
        <motion.div
          className={cn('absolute left-0 top-[13px] h-px origin-left', activeLine)}
          style={{ right: 0 }}
          variants={{
            hidden: { scaleX: reduced ? 1 : 0 },
            show: { scaleX: 1, transition: { duration: 1.5 * speed, ease: EASE } }
          }}
          aria-hidden="true" />
        

        <ol className="relative grid grid-cols-6 gap-4">
          {exportStages.map((stage, index) =>
          <motion.li
            key={stage.id}
            variants={{
              hidden: { opacity: 0, y: reduced ? 0 : 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45 * speed, ease: EASE, delay: 0.18 + index * 0.22 }
              }
            }}
            className="pr-3">
            
              <span className={cn('block h-[27px] w-[27px] rounded-full border shadow-xs', invert ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-300 bg-white')}>
                <span className={cn('mx-auto mt-[6.5px] block h-3 w-3 rounded-full', dot)} />
              </span>
              <p className={cn('mt-5 text-[0.72rem] tracking-[0.14em] font-mono font-bold', invert ? 'text-yellow-400' : 'text-yellow-700')}>
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3
              className={cn(
                'mt-2 font-display text-[1.1rem] font-bold lg:text-[1.25rem]',
                invert ? 'text-white' : 'text-zinc-950'
              )}>
                {stage.title}
              </h3>
              <p className={cn('mt-2 text-[0.825rem] leading-relaxed', invert ? 'text-zinc-300' : 'text-zinc-700')}>
                {stage.description}
              </p>
            </motion.li>
          )}
        </ol>
      </motion.div>

      {/* Vertical timeline — small screens */}
      <motion.ol
        initial="hidden"
        whileInView="show"
        viewport={{ once: VIEWPORT.once, amount: 0.1 }}
        className="relative md:hidden">
        
        <div className={cn('absolute bottom-2 left-[13px] top-2 w-px', lineColour)} aria-hidden="true" />
        <motion.div
          className={cn('absolute bottom-2 left-[13px] top-2 w-px origin-top', activeLine)}
          variants={{
            hidden: { scaleY: reduced ? 1 : 0 },
            show: { scaleY: 1, transition: { duration: 1.3 * speed, ease: EASE } }
          }}
          aria-hidden="true" />
        
        {exportStages.map((stage, index) =>
        <motion.li
          key={stage.id}
          variants={{
            hidden: { opacity: 0, x: reduced ? 0 : 12 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.4 * speed, ease: EASE, delay: 0.1 + index * 0.16 }
            }
          }}
          className="relative flex gap-5 pb-9 last:pb-0">
          
            <span
            className={cn(
              'relative z-10 mt-0.5 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full border shadow-xs',
              invert ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-300 bg-white'
            )}>
              <span className={cn('block h-3 w-3 rounded-full', dot)} />
            </span>
            <div>
              <p className={cn('text-[0.72rem] tracking-[0.14em] font-mono font-bold', invert ? 'text-yellow-400' : 'text-yellow-700')}>
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className={cn('mt-1.5 font-display text-[1.15rem] font-bold', invert ? 'text-white' : 'text-zinc-950')}>
                {stage.title}
              </h3>
              <p className={cn('mt-1.5 text-[0.85rem] leading-relaxed', invert ? 'text-zinc-300' : 'text-zinc-700')}>
                {stage.description}
              </p>
            </div>
          </motion.li>
        )}
      </motion.ol>
    </div>);
}