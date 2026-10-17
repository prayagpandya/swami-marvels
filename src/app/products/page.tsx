import React, { Suspense } from 'react';
import { Laminates } from '../../components/pages/Laminates';

export const metadata = {
  title: 'All Products — Acrylic Sheets & Laminates | Swami Marvels',
  description: 'Explore our catalog of 100% virgin cast acrylic sheets, PVC boards, WPC sheets, PP flute boards, and architectural laminates.'
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-12 font-mono text-xs text-zinc-400">Loading catalog...</div>}>
      <Laminates />
    </Suspense>
  );
}
