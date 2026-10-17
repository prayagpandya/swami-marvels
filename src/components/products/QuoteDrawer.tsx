"use client";

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useQuote } from '../../contexts/QuoteContext';
import { QuoteForm } from './QuoteForm';
import { EASE } from '../motion/variants';

export function QuoteDrawer() {
  const { isOpen, prefill, closeQuote } = useQuote();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuote();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, closeQuote]);

  return (
    <AnimatePresence>
      {isOpen &&
      <div className="fixed inset-0 z-[80]">
          <motion.button
          type="button"
          aria-label="Close quote request"
          onClick={closeQuote}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          className="absolute inset-0 h-full w-full cursor-default bg-ink/45" />
        
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label="Request a quote"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: EASE }}
          className="absolute right-0 top-0 flex h-full w-full max-w-[560px] flex-col bg-[#121212] border-l border-zinc-800 text-white shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          
            <header className="flex items-start justify-between gap-6 border-b border-zinc-800 px-6 py-6 sm:px-10 bg-[#0A0A0A]">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#FACC15]/15 text-[#FACC15] px-2.5 py-0.5 text-[0.7rem] uppercase tracking-wider font-semibold">
                  <span>B2B Wholesale & Export Inquiry</span>
                </div>
                <h2 className="mt-2.5 font-display text-2xl font-semibold text-white sm:text-3xl">Request a Quote</h2>
                {prefill?.product && (
                  <p className="mt-2 text-sm text-zinc-300">
                    Product: <span className="font-semibold text-[#FACC15]">{prefill.product}</span>
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={closeQuote}
                aria-label="Close"
                className="-mr-2 -mt-1 flex h-10 w-10 items-center justify-center text-zinc-400 transition-colors duration-150 hover:text-white">
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
              <QuoteForm prefill={prefill} compact invert={true} onSubmitted={() => undefined} />
            </div>
          </motion.aside>
        </div>
      }
    </AnimatePresence>);

}