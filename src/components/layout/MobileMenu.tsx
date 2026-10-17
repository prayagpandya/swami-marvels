"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import { primaryNav } from '../../data/navigation';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { EASE } from '../motion/variants';
import { cn } from '../../utils/cn';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);

  const {
    products: storeProducts,
    laminates: storeLaminates,
    agriculturalProducts: storeAgri,
    sheetCategories: storeSheetCats,
    collections: storeCollections,
    categories: storeAgriCats
  } = usePublicCatalogue();

  const sheetProducts = (storeProducts || []).filter(p => p.mainCategory !== 'asa-laminates' && p.division !== 'agricultural');
  const sheetProductsCount = sheetProducts.length;
  const laminatesCount = (storeLaminates || []).length;
  const agriCount = (storeAgri || []).length;
  const totalCount = sheetProductsCount + laminatesCount + agriCount;

  const dynamicDivisions = useMemo(() => [
    {
      division: 'Acrylic Sheets',
      divisionBadge: `${sheetProductsCount} Items`,
      to: '/laminates?division=acrylic-sheets',
      categories: (storeSheetCats && storeSheetCats.length > 0
        ? storeSheetCats.map((sc) => ({
            label: sc.name,
            to: `/laminates?division=acrylic-sheets&category=${sc.slug}`,
            badge: `${sheetProducts.filter(p => p.mainCategory === sc.slug || p.category === sc.slug).length} Items`
          }))
        : [
            { label: 'All Sheet Types', to: '/laminates?division=acrylic-sheets', badge: `${sheetProductsCount} Items` },
            { label: 'Acrylic Sheets', to: '/laminates?division=acrylic-sheets&category=acrylic-sheets', badge: '164 Items' }
          ]
      )
    },
    {
      division: 'ASA Laminates',
      divisionBadge: `${laminatesCount} Items`,
      to: '/laminates?division=asa-laminates',
      categories: (storeCollections && storeCollections.length > 0
        ? storeCollections.map((col) => ({
            label: col.name,
            to: `/laminates?division=asa-laminates&subcategory=${col.slug}`,
            badge: `${(storeLaminates || []).filter(l => l.collection === col.slug || l.category === col.slug).length} Items`
          }))
        : [
            { label: 'All Collections', to: '/laminates?division=asa-laminates', badge: `${laminatesCount} Items` },
            { label: 'Solid Tone', to: '/laminates?division=asa-laminates&subcategory=solid-tone', badge: '43 Items' }
          ]
      )
    }
  ], [storeSheetCats, storeCollections, sheetProducts, storeLaminates, sheetProductsCount, laminatesCount]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/40"
          />
        
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[380px] flex-col bg-[#121212] border-l border-zinc-800 shadow-2xl text-white"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu">
          
            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
              <span className="font-display text-[1rem] tracking-[0.16em] text-white font-semibold">SWAMI MARVELS</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="-mr-2 flex h-10 w-10 items-center justify-center text-zinc-400 hover:text-white">
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <motion.nav
              aria-label="Mobile"
              className="flex-1 overflow-y-auto px-6 py-4"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } } }}>
            
              {primaryNav.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, x: 18 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } }
                  }}
                  className="border-b border-zinc-800/60">
              
                  <div className="flex items-center justify-between">
                    {(() => {
                      const isActive = pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to));
                      return (
                        <Link
                          href={item.to}
                          onClick={onClose}
                          className={cn(
                            'flex-1 py-3.5 font-display text-[1.15rem] tracking-wide transition-colors duration-200',
                            isActive ? 'text-[#FACC15] font-medium' : 'text-zinc-200 hover:text-white'
                          )}>
                          {item.label}
                        </Link>
                      );
                    })()}
                    {item.children && (
                      <button
                        type="button"
                        aria-expanded={expanded === item.label}
                        aria-label={`Toggle ${item.label} links`}
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        className="flex h-10 w-10 items-center justify-center text-zinc-400 hover:text-white">
                        {expanded === item.label ? (
                          <MinusIcon className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <PlusIcon className="h-4 w-4" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </div>
                  <AnimatePresence initial={false}>
                    {expanded === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: EASE }}
                        className="overflow-hidden pb-3 pt-1"
                      >
                        {item.divisions ? (
                          <div className="space-y-4 py-2 pl-2">
                            {dynamicDivisions.map((div) => (
                              <div key={div.division} className="border-l-2 border-zinc-700/60 pl-3 py-1">
                                <div className="flex items-center justify-between mb-1.5">
                                  <Link
                                    href={div.to}
                                    onClick={onClose}
                                    className="text-sm font-semibold text-white hover:text-[#FACC15] transition-colors"
                                  >
                                    {div.division}
                                  </Link>
                                  <span className="text-[0.62rem] font-mono text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded font-medium">
                                    {div.divisionBadge}
                                  </span>
                                </div>
                                <div className="space-y-1 pl-1">
                                  {div.categories.map((cat) => (
                                    <Link
                                      key={cat.label}
                                      href={cat.to}
                                      onClick={onClose}
                                      className="flex items-center justify-between py-1 text-xs text-zinc-400 hover:text-white transition-colors"
                                    >
                                      <span>{cat.label}</span>
                                      {cat.badge && (
                                        <span className="text-[0.6rem] font-mono text-zinc-500">
                                          {cat.badge}
                                        </span>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <div className="pt-2">
                              <Link
                                href="/laminates?division=all"
                                onClick={onClose}
                                className="block py-2 text-center text-xs font-mono font-semibold text-black bg-[#FACC15] rounded hover:bg-yellow-400 transition-colors"
                              >
                                View All {totalCount} Products →
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <ul className="space-y-1">
                            {item.children?.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.to}
                                  onClick={onClose}
                                  className="block py-2 pl-3 text-sm text-zinc-400 hover:text-[#FACC15] hover:bg-zinc-800/40 transition-colors"
                                >
                                  <span className="font-medium text-zinc-300">{child.label}</span>
                                  {child.description && (
                                    <span className="block text-[0.7rem] text-zinc-400 mt-0.5">{child.description}</span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.nav>

            <div className="border-t border-zinc-800 p-5 space-y-3 bg-[#0A0A0A]">
              <Link
                href="/contact"
                onClick={onClose}
                className="flex min-h-[48px] w-full items-center justify-center bg-white hover:bg-zinc-200 text-[0.75rem] font-mono font-semibold uppercase tracking-[0.14em] text-black shadow-sm transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
