import React, { Suspense } from 'react';
import { Laminates } from '../../components/pages/Laminates';

export const metadata = {
  title: 'Laminates Portfolio | Swami Marvels',
  description: 'Explore our catalog of architectural laminates, acrylic panels, and surface solutions.'
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-12 font-mono text-xs text-stone-400">Loading catalogue...</div>}>
      <Laminates />
    </Suspense>
  );
}
