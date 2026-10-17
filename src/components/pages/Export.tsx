"use client";

import React from 'react';
import { ApedaScheduleCatalog } from '../../components/export/ApedaScheduleCatalog';
import { ExportReady } from '../../components/agriculture/ExportReady';
import { ExportJourney } from '../../components/export/ExportJourney';
import { ExportProcess } from '../../components/export/ExportProcess';
import { ExportEnquiry } from '../../components/export/ExportEnquiry';
import { Globe } from '../../components/export/Globe';
import { Shell } from '../../components/ui/Section';

export function Export() {
  return (
    <main className="w-full bg-[#FAFAFA] text-zinc-950 pt-16 sm:pt-20">
      {/* Official APEDA Scheduled Categories & Products Catalog */}
      <ApedaScheduleCatalog />

      {/* Prepared for International Food Importers Section */}
      <ExportReady />

      {/* 6-Stage Journey & 3D Interactive Globe */}
      <section className="w-full bg-zinc-50 py-20 lg:py-28 border-t border-zinc-200 overflow-hidden">
        <Shell>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div>
              <span className="font-mono text-xs text-yellow-700 tracking-widest uppercase block mb-3 font-semibold">
                Transit Architecture
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-950 leading-tight">
                Product to Destination Port, Stage by Stage
              </h2>
              <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl">
                Six disciplined operational stages, each confirmed with verified inspection protocols before dispatch to guarantee zero damage and customs clearance.
              </p>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[500px]">
              <Globe className="h-full w-full" />
            </div>
          </div>

          <ExportJourney invert={false} className="mt-16 lg:mt-20" />
        </Shell>
      </section>

      <ExportProcess />

      <ExportEnquiry />
    </main>
  );
}