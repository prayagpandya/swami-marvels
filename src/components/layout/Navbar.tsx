"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { MenuIcon, ChevronDown } from 'lucide-react';
import { primaryNav } from '../../data/navigation';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { MobileMenu } from './MobileMenu';
import { media } from '../../data/media';
import { cn } from '../../utils/cn';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const productsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleProductsMouseEnter = () => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setProductsDropdownOpen(true);
  };

  const handleProductsMouseLeave = () => {
    productsTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 180);
  };

  const {
    products: storeProducts,
    laminates: storeLaminates,
    sheetCategories: storeSheetCats,
    collections: storeCollections,
  } = usePublicCatalogue();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const sheetProducts = (storeProducts || []).filter(
    (p) => p.mainCategory !== 'asa-laminates' && p.division !== 'agricultural'
  );
  const sheetProductsCount = sheetProducts.length;
  const laminatesCount = (storeLaminates || []).length;
  const totalSheetsCount = sheetProductsCount + laminatesCount;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsDropdownOpen(false);
  }, [pathname]);

  // Determine whether navbar has transparent background
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out border-b flex items-center',
          isTransparent
            ? 'bg-transparent border-transparent text-white h-20 sm:h-24'
            : 'border-zinc-800/90 bg-zinc-950/95 shadow-md backdrop-blur-md text-white h-16 sm:h-20'
        )}
      >
        <div className="mx-auto flex w-full max-w-[1240px] h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Brand & Circular Logo with Smooth Size/Border Animation on Scroll */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-3 sm:gap-4 py-2 group"
              aria-label="Swami Marvels — home"
            >
              {/* Animated Logo Container: Larger with White Border initially, shrinks on scroll */}
              <div
                className={cn(
                  'rounded-full overflow-hidden bg-black p-1 shadow-2xl flex items-center justify-center shrink-0 transition-all duration-300 ease-in-out',
                  isTransparent
                    ? 'h-14 w-14 sm:h-18 sm:w-18 border-2 border-white ring-2 ring-white/20'
                    : 'h-10 w-10 sm:h-12 sm:w-12 border border-white/80 ring-1 ring-white/10'
                )}
              >
                <img
                  src={media.brandMark}
                  alt="Swami Marvels Logo"
                  aria-hidden="true"
                  className="h-full w-full object-contain rounded-full bg-black transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <span
                className={cn(
                  'font-display font-bold tracking-[0.1em] sm:tracking-[0.12em] text-white transition-all duration-300',
                  isTransparent
                    ? 'text-lg sm:text-xl md:text-2xl drop-shadow-md'
                    : 'text-[1rem] sm:text-[1.15rem] md:text-[1.25rem]'
                )}
              >
                SWAMI MARVELS
              </span>
            </Link>
          </div>

          {/* Navigation Tabs (Centered) */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 px-2"
          >
            {primaryNav.map((item) => {
              const isProducts = item.label === 'Products';
              const isActive =
                pathname === item.to ||
                (item.to !== '/' && pathname.startsWith(item.to)) ||
                (isProducts &&
                  (pathname === '/products' ||
                    pathname.startsWith('/products') ||
                    pathname === '/laminates' ||
                    pathname.startsWith('/laminates')));
              const hasChildren = item.children && item.children.length > 0;

              return (
                <div
                  key={item.label}
                  className="relative group flex flex-col justify-center h-full"
                  onMouseEnter={isProducts ? handleProductsMouseEnter : undefined}
                  onMouseLeave={isProducts ? handleProductsMouseLeave : undefined}
                >
                  <Link
                    href={item.to}
                    onClick={() => {
                      if (isProducts) {
                        if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
                        setProductsDropdownOpen(false);
                      }
                    }}
                    className={cn(
                      'relative flex items-center gap-1.5 px-3.5 lg:px-4 py-2.5 text-[0.825rem] font-semibold tracking-[0.08em] uppercase transition-colors duration-200 cursor-pointer',
                      isActive
                        ? 'text-white font-bold'
                        : isTransparent
                        ? 'text-white/90 hover:text-white drop-shadow-sm'
                        : 'text-zinc-300 hover:text-white'
                    )}
                  >
                    <span>{item.label}</span>
                    {hasChildren && (
                      <ChevronDown
                        className={cn(
                          'h-3 w-3 transition-transform duration-200 opacity-70',
                          isProducts && productsDropdownOpen ? 'rotate-180' : 'group-hover:rotate-180'
                        )}
                      />
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-3.5 right-3.5 lg:left-4 lg:right-4 h-[2.5px] bg-[#FACC15] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Mega Dropdown Menu for Products (NO AGRICULTURAL PRODUCTS) */}
                  {(item.divisions || hasChildren) && (
                    <div
                      className={cn(
                        'absolute top-full left-1/2 -translate-x-1/2 w-[620px] pt-2 z-50 transition-all duration-200',
                        isProducts
                          ? productsDropdownOpen
                            ? 'block'
                            : 'hidden group-hover:block'
                          : 'hidden group-hover:block'
                      )}
                      onMouseEnter={isProducts ? handleProductsMouseEnter : undefined}
                      onMouseLeave={isProducts ? handleProductsMouseLeave : undefined}
                    >
                      <div className="bg-white text-zinc-950 border border-zinc-200 rounded-2xl shadow-2xl p-5 grid gap-4">
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                          <span className="text-[0.68rem] font-mono font-bold tracking-widest uppercase text-zinc-500">
                            Engineered Sheets & Architectural Panels
                          </span>
                          <span className="text-[0.65rem] bg-zinc-950 text-white font-mono px-2 py-0.5 rounded font-medium">
                            {totalSheetsCount} Products Available
                          </span>
                        </div>

                        {item.divisions ? (
                          <>
                            <div className="grid grid-cols-12 gap-5">
                              {/* Column 1: Acrylic Sheets with Dynamic Categories */}
                              <div className="col-span-6 bg-zinc-50/80 border border-zinc-200/80 rounded-xl p-3.5 flex flex-col justify-between">
                                <div>
                                  <Link
                                    href="/laminates?division=acrylic-sheets"
                                    onClick={() => setProductsDropdownOpen(false)}
                                    className="group/div flex items-center justify-between pb-2 border-b border-zinc-200/60"
                                  >
                                    <div>
                                      <span className="font-display text-sm font-bold text-zinc-950 group-hover/div:text-amber-600 transition-colors">
                                        Acrylic Sheets
                                      </span>
                                      <p className="text-[0.68rem] text-zinc-500 leading-tight mt-0.5">
                                        Virgin cast acrylic, PVC & decorative sheets
                                      </p>
                                    </div>
                                    <span className="text-[0.65rem] font-mono px-2 py-0.5 rounded bg-zinc-950 text-white font-semibold shrink-0">
                                      {sheetProductsCount} Items
                                    </span>
                                  </Link>

                                  <div className="mt-2.5 space-y-1">
                                    <span className="text-[0.62rem] font-mono uppercase tracking-wider text-zinc-400 font-medium block mb-1">
                                      Sheet Categories ({storeSheetCats?.length || 0}):
                                    </span>
                                    {(storeSheetCats && storeSheetCats.length > 0 ? storeSheetCats : item.divisions[0]?.categories).map((cat: any) => {
                                      const slug = cat.slug || cat.to?.split('category=')?.pop() || cat.id;
                                      const count = (storeProducts || []).filter((p: any) => p.mainCategory === slug || p.category === slug).length;
                                      return (
                                        <Link
                                          key={cat.slug || cat.label}
                                          href={`/laminates?division=acrylic-sheets&category=${slug}`}
                                          onClick={() => setProductsDropdownOpen(false)}
                                          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono text-zinc-700 hover:text-zinc-950 hover:bg-white border border-transparent hover:border-zinc-200 transition-all group/sub"
                                        >
                                          <span className="font-medium group-hover/sub:translate-x-0.5 transition-transform truncate">
                                            {cat.name || cat.label}
                                          </span>
                                          <span className="text-[0.62rem] text-zinc-500 bg-zinc-200/70 group-hover/sub:bg-zinc-950 group-hover/sub:text-white px-1.5 py-0.2 rounded shrink-0 ml-1 transition-colors">
                                            {count} Items
                                          </span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>

                              {/* Column 2: ASA Laminates with Dynamic Collections */}
                              <div className="col-span-6 bg-zinc-50/80 border border-zinc-200/80 rounded-xl p-3.5 flex flex-col justify-between">
                                <div>
                                  <Link
                                    href="/laminates?division=asa-laminates"
                                    onClick={() => setProductsDropdownOpen(false)}
                                    className="group/asa flex items-center justify-between pb-2 border-b border-zinc-200/60"
                                  >
                                    <div>
                                      <span className="font-display text-sm font-bold text-zinc-950 group-hover/asa:text-amber-600 transition-colors">
                                        ASA Laminates
                                      </span>
                                      <p className="text-[0.68rem] text-zinc-500 leading-tight mt-0.5">
                                        Eximer surface technology & decorative panels
                                      </p>
                                    </div>
                                    <span className="text-[0.65rem] font-mono px-2 py-0.5 rounded bg-zinc-950 text-white font-semibold shrink-0">
                                      {laminatesCount} Items
                                    </span>
                                  </Link>

                                  <div className="mt-2.5 space-y-1">
                                    <span className="text-[0.62rem] font-mono uppercase tracking-wider text-zinc-400 font-medium block mb-1">
                                      Laminate Collections ({storeCollections?.length || 0}):
                                    </span>
                                    {(storeCollections && storeCollections.length > 0 ? storeCollections : item.divisions[1]?.categories).map((col: any) => {
                                      const slug = col.slug || col.to?.split('subcategory=')?.pop() || col.id;
                                      const count = (storeLaminates || []).filter((l: any) => l.collection === slug || l.category === slug).length;
                                      return (
                                        <Link
                                          key={col.slug || col.label}
                                          href={`/laminates?division=asa-laminates&subcategory=${slug}`}
                                          onClick={() => setProductsDropdownOpen(false)}
                                          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono text-zinc-700 hover:text-zinc-950 hover:bg-white border border-transparent hover:border-zinc-200 transition-all group/sub"
                                        >
                                          <span className="font-medium group-hover/sub:translate-x-0.5 transition-transform truncate">
                                            {col.name || col.label}
                                          </span>
                                          <span className="text-[0.62rem] text-zinc-500 bg-zinc-200/70 group-hover/sub:bg-zinc-950 group-hover/sub:text-white px-1.5 py-0.2 rounded shrink-0 ml-1 transition-colors">
                                            {count} Items
                                          </span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Bottom Catalog Action Bar */}
                            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-mono">
                              <Link
                                href="/products"
                                onClick={() => setProductsDropdownOpen(false)}
                                className="text-zinc-800 hover:text-black font-semibold flex items-center gap-1.5 hover:underline"
                              >
                                <span>Browse Complete Sheets & Laminates Directory</span>
                                <span>→</span>
                              </Link>
                              <span className="text-[0.65rem] text-zinc-400">
                                Commercial B2B Supply & Warehousing
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="grid gap-1">
                            {item.children?.map((child) => (
                              <Link
                                key={child.label}
                                href={child.to}
                                onClick={() => setProductsDropdownOpen(false)}
                                className="flex items-start justify-between p-2.5 rounded-lg hover:bg-zinc-50 transition-colors group/item"
                              >
                                <div>
                                  <div className="text-[0.8125rem] font-medium text-zinc-900 group-hover/item:text-black transition-colors">
                                    {child.label}
                                  </div>
                                  {child.description && (
                                    <div className="text-xs text-zinc-500 mt-0.5">{child.description}</div>
                                  )}
                                </div>
                                {child.badge && (
                                  <span className="font-mono text-[0.65rem] font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 shrink-0">
                                    {child.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Primary CTA & Mobile Toggle (Right Column) */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3 shrink-0">
            <Link
              href="/contact"
              className={cn(
                'inline-flex items-center justify-center font-mono text-[0.7rem] sm:text-[0.75rem] font-bold uppercase tracking-[0.1em] sm:tracking-[0.14em] px-4 sm:px-5 py-2 sm:py-2.5 rounded transition-all duration-200 shrink-0 shadow-sm',
                isTransparent
                  ? 'bg-white hover:bg-zinc-200 text-black border border-white'
                  : 'bg-white hover:bg-zinc-200 text-black border border-white'
              )}
            >
              Contact
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
              className={cn(
                'flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border transition-colors lg:hidden shrink-0',
                isTransparent
                  ? 'border-white/40 text-white bg-black/40 backdrop-blur-md hover:bg-black/60 hover:border-white'
                  : 'border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 bg-zinc-900'
              )}
            >
              <MenuIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
