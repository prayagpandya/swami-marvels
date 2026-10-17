"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, Trash2Icon, PencilIcon } from 'lucide-react';
import type { Collection } from '../../types/collection';
import { useStore } from '../../contexts/StoreContext';
import { AdminButton, AdminField, AdminInput, AdminPageHeader, AdminTextarea } from './ui';
import { AdminSingleImageUpload } from './AdminImageUpload';
import { SMOOTH_EASE } from '../motion/ViewportMotion';

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function CollectionManager() {
  const { collections, laminates, saveCollection, deleteCollection, moveCollection } = useStore();
  const [draft, setDraft] = useState<Collection | null>(null);

  const sorted = [...collections].sort((a, b) => a.order - b.order);

  const startNew = () =>
    setDraft({
      id: `col-${Date.now()}`,
      slug: '',
      name: '',
      description: '',
      accent: '#3F3F46',
      image: '',
      order: sorted.length + 1
    });

  const save = () => {
    if (!draft || !draft.name.trim()) return;
    saveCollection({ ...draft, slug: draft.slug || slugify(draft.name) });
    setDraft(null);
  };

  return (
    <div className="pt-2 space-y-8">
      <AdminPageHeader
        title="Architectural Collections"
        description="Group laminates and surface materials into curated collections and design catalogs."
        action={
          <AdminButton onClick={startNew}>
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            New Collection
          </AdminButton>
        }
      />

      {draft && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: SMOOTH_EASE }}
          className="rounded-lg border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl"
        >
          <h3 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-4 border-b border-zinc-800 pb-2">
            {draft.id.startsWith('col-') ? 'Create New Collection' : 'Edit Collection'}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Collection Name">
              <AdminInput
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="e.g. Matte Architectural Series"
              />
            </AdminField>
            <AdminField label="Palette Accent Swatch">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={draft.accent}
                  onChange={(e) => setDraft({ ...draft, accent: e.target.value })}
                  className="h-10 w-16 cursor-pointer rounded border border-zinc-800 bg-zinc-950 p-1"
                />
                <AdminInput
                  value={draft.accent}
                  onChange={(e) => setDraft({ ...draft, accent: e.target.value })}
                  className="font-mono"
                />
              </div>
            </AdminField>
            <div className="sm:col-span-2">
              <AdminSingleImageUpload
                value={draft.image || ''}
                onChange={(url) => setDraft({ ...draft, image: url })}
                label="Collection Cover Image"
                placeholder="e.g. /sv_1001_sandal_suede.webp"
              />
            </div>
            <AdminField label="Description" className="sm:col-span-2">
              <AdminTextarea
                rows={3}
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                placeholder="Design theme, surface finishes, and architectural applications..."
              />
            </AdminField>
          </div>
          <div className="mt-5 flex justify-end gap-3 border-t border-zinc-800 pt-4">
            <AdminButton variant="outline" onClick={() => setDraft(null)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={save}>Save Collection</AdminButton>
          </div>
        </motion.div>
      )}

      <motion.ul
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.35, ease: SMOOTH_EASE }}
        className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/70 divide-y divide-zinc-800/80 shadow-xl"
      >
        {sorted.map((collection, index) => {
          const assigned = laminates.filter((l) => l.collection === collection.slug).length;
          return (
            <li
              key={collection.id}
              className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-zinc-800/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span
                  className="h-10 w-10 shrink-0 rounded border border-zinc-800 shadow-xs"
                  style={{ backgroundColor: collection.accent }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{collection.name}</p>
                  <p className="mt-0.5 truncate font-mono text-xs text-zinc-400">
                    {assigned} product{assigned === 1 ? '' : 's'} assigned · <span className="text-zinc-500">/{collection.slug}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AdminButton
                  size="sm"
                  variant="outline"
                  onClick={() => moveCollection(collection.id, -1)}
                  ariaLabel="Move up"
                  disabled={index === 0}
                >
                  <ArrowUpIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </AdminButton>
                <AdminButton
                  size="sm"
                  variant="outline"
                  onClick={() => moveCollection(collection.id, 1)}
                  ariaLabel="Move down"
                  disabled={index === sorted.length - 1}
                >
                  <ArrowDownIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </AdminButton>
                <AdminButton size="sm" variant="outline" onClick={() => setDraft(collection)}>
                  <PencilIcon className="h-3.5 w-3.5" />
                  Edit
                </AdminButton>
                <AdminButton
                  size="sm"
                  variant="danger"
                  onClick={() => deleteCollection(collection.id)}
                  ariaLabel={`Delete ${collection.name}`}
                >
                  <Trash2Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </AdminButton>
              </div>
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
}