"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { exportProcess } from '../../data/features';
import { Shell } from '../ui/Section';
import { EASE, VIEWPORT } from '../motion/variants';
import { useMotionSettings } from '../../hooks/useMotionSettings';
import { cn } from '../../utils/cn';

export function ExportProcess() {
  const { speed, distance, reduced } = useMotionSettings();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#0D0D0D] py-20 lg:py-28 border-t border-zinc-800">
      <Shell>
        <div className="max-w-2xl">
          <span className="font-mono text-xs text-[#FACC15] tracking-widest uppercase block mb-3 font-semibold">
            Operational Protocol
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight">
            Five Steps from Enquiry to Container Despatch
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Every export parameter is documented and verified in writing, ensuring strict alignment on specifications, port logistics, and documentation.
          </p>
        </div>

        <div
          className="mt-14 flex flex-col"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {exportProcess.map((step, index) => {
            const isHovered = hoveredIndex === index;
            // The line ABOVE this section is yellow if this section or the previous section is hovered
            const isTopLineYellow = hoveredIndex === index || hoveredIndex === index - 1;
            // The line BELOW the last section is yellow when the last section is hovered
            const isBottomLineYellow = index === exportProcess.length - 1 && hoveredIndex === index;

            return (
              <React.Fragment key={step.id}>
                {/* Line ABOVE this section */}
                <div
                  className={cn(
                    "h-px w-full transition-colors duration-200",
                    isTopLineYellow ? "bg-[#FACC15]" : "bg-zinc-800"
                  )}
                  aria-hidden="true"
                />

                <motion.div
                  onMouseEnter={() => setHoveredIndex(index)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: VIEWPORT.once, amount: 0.3 }}
                  className={cn(
                    "grid grid-cols-[auto_1fr] items-start gap-6 py-8 sm:grid-cols-[110px_1fr_1.1fr] sm:gap-10 lg:py-10 group transition-colors duration-200 cursor-default px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-xs",
                    isHovered && "bg-white/[0.015]"
                  )}
                >
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, scale: reduced ? 1 : 0.9 },
                      show: { opacity: 1, scale: 1, transition: { duration: 0.4 * speed, ease: EASE } }
                    }}
                    className={cn(
                      "font-mono text-2xl font-bold transition-colors duration-200 sm:text-3xl",
                      isHovered ? "text-[#FACC15]" : "text-yellow-400/60"
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.span>

                  <motion.h3
                    variants={{
                      hidden: { opacity: 0, x: -20 * distance },
                      show: { opacity: 1, x: 0, transition: { duration: 0.5 * speed, ease: EASE, delay: 0.06 } }
                    }}
                    className={cn(
                      "font-display text-[1.3rem] font-normal transition-colors duration-200 sm:text-[1.5rem]",
                      isHovered ? "text-[#FACC15]" : "text-white"
                    )}
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    variants={{
                      hidden: { opacity: 0, x: 20 * distance },
                      show: { opacity: 1, x: 0, transition: { duration: 0.5 * speed, ease: EASE, delay: 0.12 } }
                    }}
                    className={cn(
                      "col-span-2 max-w-lg text-[0.9rem] leading-relaxed transition-colors duration-200 sm:col-span-1",
                      isHovered ? "text-zinc-300" : "text-zinc-400"
                    )}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>

                {/* Line BELOW the last section */}
                {index === exportProcess.length - 1 && (
                  <div
                    className={cn(
                      "h-px w-full transition-colors duration-200",
                      isBottomLineYellow ? "bg-[#FACC15]" : "bg-zinc-800"
                    )}
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}