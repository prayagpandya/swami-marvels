"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ProductDivision } from '../types/product';

export interface QuotePrefill {
  division?: ProductDivision | '';
  product?: string;
  name?: string;
  productCode?: string;
  category?: string;
}

interface QuoteValue {
  isOpen: boolean;
  prefill: QuotePrefill;
  openQuote: (prefill?: QuotePrefill) => void;
  closeQuote: () => void;
}

const QuoteContext = createContext<QuoteValue | null>(null);

export function QuoteProvider({ children }: {children: React.ReactNode;}) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<QuotePrefill>({});

  const openQuote = useCallback((next: QuotePrefill = {}) => {
    setPrefill(next);
    setIsOpen(true);
  }, []);

  const closeQuote = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, prefill, openQuote, closeQuote }), [isOpen, prefill, openQuote, closeQuote]);

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote(): QuoteValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used inside QuoteProvider');
  return ctx;
}