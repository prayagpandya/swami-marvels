"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MailIcon, MapPinIcon, PhoneIcon, Navigation } from 'lucide-react';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { Shell } from '../ui/Section';
import { FadeInView } from '../motion/ViewportMotion';
import { media } from '../../data/media';

export function Footer() {
  const pathname = usePathname();
  const {
    products: storeProducts,
    laminates: storeLaminates,
    agriculturalProducts: storeAgri,
    sheetCategories: storeSheetCats,
    collections: storeCollections,
    categories: storeAgriCats,
    content
  } = usePublicCatalogue();

  const sheetProducts = (storeProducts || []).filter(p => p.mainCategory !== 'asa-laminates' && p.division !== 'agricultural');
  const sheetProductsCount = sheetProducts.length;
  const laminatesCount = (storeLaminates || []).length;
  const agriCount = (storeAgri || []).length;
  const totalCount = sheetProductsCount + laminatesCount + agriCount;

  const dynamicColumns = useMemo(() => [
    {
      title: 'Acrylic Sheets',
      links: [
        { label: `All Sheet Types (${sheetProductsCount} Items)`, to: '/laminates?division=acrylic-sheets' },
        ...(storeSheetCats && storeSheetCats.length > 0
          ? storeSheetCats.map(sc => ({
              label: `${sc.name} (${sheetProducts.filter(p => p.mainCategory === sc.slug || p.category === sc.slug).length})`,
              to: `/laminates?division=acrylic-sheets&category=${sc.slug}`
            }))
          : [
              { label: 'Acrylic Sheets (164 Items)', to: '/laminates?division=acrylic-sheets&category=acrylic-sheets' },
              { label: 'PP / HIPS / APET / Display (40 Items)', to: '/laminates?division=acrylic-sheets&category=pp-hips-apet-other' },
              { label: 'PVC Sheets & Boards (69 Items)', to: '/laminates?division=acrylic-sheets&category=pvc-sheets-boards' },
              { label: 'WPC Sheets & Boards (32 Items)', to: '/laminates?division=acrylic-sheets&category=wpc-sheets-boards' }
            ]
        ),
        { label: `ASA Laminates (${laminatesCount} Items)`, to: '/laminates?division=asa-laminates' }
      ]
    },
    {
      title: 'Agricultural Exports (APEDA)',
      links: [
        { label: `All APEDA Categories (${agriCount} Items)`, to: '/laminates?division=agricultural' },
        ...(storeAgriCats && storeAgriCats.length > 0
          ? storeAgriCats.map(cat => ({
              label: `${cat.name} (${(storeAgri || []).filter(a => a.category === cat.slug || a.subcategory === cat.slug).length})`,
              to: `/laminates?division=agricultural&subcategory=${cat.slug}`
            }))
          : [
              { label: 'Fresh Fruits & Vegetables (10)', to: '/laminates?division=agricultural&subcategory=fruits-vegetables' },
              { label: 'Organic Products (4)', to: '/laminates?division=agricultural&subcategory=organic-products' }
            ]
        )
      ]
    },
    {
      title: 'Enterprise & Catalog',
      links: [
        { label: `All Products (${totalCount} Items)`, to: '/laminates?division=all' },
        { label: 'Export Schedule & Compliance', to: '/export' },
        { label: 'About Swami Marvels', to: '/about' },
        { label: 'Contact & Headquarters', to: '/contact' },
        { label: 'Admin Management Portal', to: '/admin' }
      ]
    }
  ], [storeSheetCats, storeAgriCats, sheetProducts, storeLaminates, storeAgri, sheetProductsCount, laminatesCount, agriCount, totalCount]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="w-full bg-[#08080A] text-white border-t border-zinc-800">
      <Shell className="py-16 lg:py-20">
        <FadeInView yOffset={20}>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
            <div>
              <div className="flex items-center gap-3.5">
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden border border-zinc-700 bg-black p-1 shadow-sm flex items-center justify-center shrink-0">
                  <img src={media.brandMark} alt="Swami Marvels Logo" aria-hidden="true" className="h-full w-full object-contain rounded-full bg-black" />
                </div>
                <span className="font-display text-lg tracking-[0.16em] font-semibold text-white">SWAMI MARVELS</span>
              </div>
              <p className="mt-5 max-w-sm text-xs sm:text-sm leading-relaxed text-zinc-400">
                Premium B2B Trading House and International Exporter of Agricultural Commodities &amp; Importer of Cast Acrylics Sheets, PVC Foam Boards, WPC Sheets, PP &amp; Decorative Sheets, Acrylic Laminates.
              </p>

              <div className="mt-5 flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-300 rounded font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>APEDA Registered Exporter · 100% Pure Veg</span>
                </div>
                <div className="text-[0.72rem] font-mono text-zinc-400">
                  ✓ Strictly <span className="font-bold text-red-500 bg-red-950/80 px-1 py-0.5 rounded border border-red-500/40">ZERO</span> meat, poultry, or marine products traded.
                </div>
              </div>

              <ul className="mt-7 space-y-3 text-xs sm:text-sm text-zinc-300 font-mono">
                <li className="flex items-start gap-3">
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                  <a href="tel:+919867862233" className="hover:text-white transition-colors">
                    +91-986-786-2233
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                  <a href="mailto:info@swamimarvels.com" className="hover:text-white transition-colors">
                    info@swamimarvels.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                  <div className="font-sans text-xs text-zinc-400 leading-relaxed">
                    <p className="text-zinc-300 leading-relaxed">
                      16/B, 1st Floor, The Chambers,<br />
                      Opp NKGSB Bank, Sector 1,<br />
                      Charkop Industrial Estate,<br />
                      Kandivali West,<br />
                      Mumbai - 400067,<br />
                      Maharashtra, India
                    </p>
                    <div className="mt-2 flex items-center gap-2.5">
                      <a
                        href="#footer-map"
                        className="inline-flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300 hover:underline"
                      >
                        View Map Below ↓
                      </a>
                      <span className="text-zinc-600">·</span>
                      <a
                        href="https://www.google.com/maps/place/SWAMI+MARVELS/@19.2102522,72.8269633,979m/data=!3m1!1e3!4m6!3m5!1s0x3be7b759dca179e7:0x829b4f3862a40f2f!8m2!3d19.2102512!4d72.8269632!16s%2Fg%2F11rj682bx6?hl=en&entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white hover:underline"
                      >
                        Google Maps ↗
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {dynamicColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-xs font-mono uppercase tracking-widest font-semibold text-zinc-300 border-b border-zinc-800/80 pb-2">
                  {column.title}
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.to}
                        className="group inline-flex text-xs text-zinc-400 transition-colors duration-200 hover:text-white"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-[width] duration-300 ease-out group-hover:w-full" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Whole Google Map Section for Corporate Address */}
          <div id="footer-map" className="mt-14 pt-10 border-t border-zinc-800/80">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
              <div>
                <span className="text-[0.68rem] font-mono text-amber-400 font-semibold tracking-widest uppercase flex items-center gap-1.5 mb-1.5">
                  <MapPinIcon className="h-3.5 w-3.5 text-amber-400" />
                  Corporate Headquarters & Operations Desk
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-light text-white tracking-tight">
                  Locate Swami Marvels on Google Maps
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                  16/B, 1st Floor, The Chambers, Opp NKGSB Bank, Sector 1, Charkop Industrial Estate, Kandivali West, Mumbai - 400067, Maharashtra, India
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="https://www.google.com/maps/place/SWAMI+MARVELS/@19.2102522,72.8269633,979m/data=!3m1!1e3!4m6!3m5!1s0x3be7b759dca179e7:0x829b4f3862a40f2f!8m2!3d19.2102512!4d72.8269632!16s%2Fg%2F11rj682bx6?hl=en&entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-zinc-500 px-4 py-2 font-mono text-xs text-zinc-200 hover:text-white transition-all shadow-md group"
                >
                  <Navigation className="h-3.5 w-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
                  <span>Get Directions</span>
                  <span className="text-zinc-500 group-hover:text-zinc-300">↗</span>
                </a>
              </div>
            </div>

            {/* Whole Responsive Google Map Embed */}
            <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              <iframe
                title="Swami Marvels Headquarters Google Map"
                src="https://maps.google.com/maps?q=Swami%20Marvels,%2016/B,%20The%20Chambers,%20Charkop%20Industrial%20Estate,%20Kandivali%20West,%20Mumbai%20400067&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-zinc-800 pt-8 text-xs font-mono text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Swami Marvels. All rights reserved. Domestic & International B2B Trade House.</p>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-zinc-300">About</Link>
              <Link href="/export" className="hover:text-zinc-300">Export</Link>
              <Link href="/admin" className="hover:text-zinc-300">Admin Portal</Link>
            </div>
          </div>
        </FadeInView>
      </Shell>
    </footer>
  );
}
