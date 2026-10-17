"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../contexts/StoreContext';
import { AdminPageHeader } from './ui';
import { SMOOTH_EASE } from '../motion/ViewportMotion';
import type { AdminSection } from './AdminLayout';
import { LayersIcon, LeafIcon, ArrowRightIcon, Sparkles } from 'lucide-react';

export function Dashboard({ onNavigate }: { onNavigate: (section: AdminSection, division?: string) => void }) {
  const { products, laminates, agriculturalProducts } = useStore();

  const stats = [
    {
      label: 'Total Products (All Divisions)',
      value: products.length + laminates.length + agriculturalProducts.length,
      section: 'products' as const,
      division: 'all',
      icon: LayersIcon
    },
    {
      label: 'Acrylic Sheets',
      value: products.length,
      section: 'products' as const,
      division: 'acrylic-sheets',
      icon: LayersIcon
    },
    {
      label: 'ASA Laminates',
      value: laminates.length,
      section: 'products' as const,
      division: 'asa-laminates',
      icon: Sparkles
    },
    {
      label: 'APEDA Agricultural Items',
      value: agriculturalProducts.length,
      section: 'products' as const,
      division: 'agricultural',
      icon: LeafIcon
    }
  ];

  return (
    <div className="space-y-10">
      <AdminPageHeader
        title="Operations Dashboard"
        description="Master control terminal for catalog items, APEDA agricultural commodities, and export procurement requests."
      />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.button
              key={stat.label}
              type="button"
              onClick={() => onNavigate(stat.section, stat.division)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, ease: SMOOTH_EASE, delay: index * 0.06 }}
              className="group relative flex flex-col justify-between rounded-lg border border-zinc-800 bg-zinc-900/70 p-6 text-left transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-zinc-400">
                  {stat.label}
                </span>
                <Icon className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              </div>

              <div className="mt-6 flex items-baseline justify-between">
                <p className="font-display text-3xl sm:text-4xl font-light text-white">
                  {stat.value}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1.5 font-mono text-[0.68rem] text-zinc-500 group-hover:text-zinc-300 transition-colors">
                <span>Manage records</span>
                <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}