"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  FolderIcon,
  LayoutDashboardIcon,
  LayersIcon,
  LeafIcon,
  MailIcon,
  MenuIcon,
  LockIcon,
  LogOutIcon
} from 'lucide-react';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { AdminButton, AdminInput } from './ui';
import { cn } from '../../utils/cn';
import { SMOOTH_EASE } from '../motion/ViewportMotion';

export type AdminSection =
  | 'dashboard'
  | 'products'
  | 'categories-collections'
  | 'categories'
  | 'collections';

const nav: { id: AdminSection; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
  { id: 'products', label: 'All Products (Catalog)', icon: LayersIcon },
  { id: 'categories-collections', label: 'Categories/Collections', icon: FolderIcon }
];

const AUTH_KEY = 'swami-marvels-admin-session';

export function AdminLayout({
  section,
  onSectionChange,
  children
}: {
  section: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  children: React.ReactNode;
}) {
  const { content } = usePublicCatalogue();
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setAuthed(window.localStorage.getItem(AUTH_KEY) === 'true');
  }, []);

  const signIn = (event: React.FormEvent) => {
    event.preventDefault();
    if (passcode.trim().length < 4) {
      setError('Enter at least 4 characters to continue.');
      return;
    }
    window.localStorage.setItem(AUTH_KEY, 'true');
    setAuthed(true);
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#09090B] px-5 py-24 pt-32 text-zinc-100">
        <motion.form
          onSubmit={signIn}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: SMOOTH_EASE }}
          className="w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-8 sm:p-10 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <img
              src={content.brand.mark}
              alt=""
              aria-hidden="true"
              className="h-10 w-auto object-contain brightness-0 invert"
            />
            <div>
              <span className="font-display text-base font-semibold tracking-widest text-white">
                SWAMI MARVELS
              </span>
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-zinc-300">
                Enterprise Operations Desk
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-zinc-700 pt-6">
            <div className="flex items-center gap-2 text-zinc-200">
              <LockIcon className="h-4 w-4 text-amber-400" />
              <h1 className="font-display text-xl font-semibold text-white">Admin Authentication</h1>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-zinc-300 font-mono">
              Secure administrative access. Enter master passcode to manage product catalog and global inquiries.
            </p>
          </div>

          <div className="mt-6">
            <label className="font-mono text-xs uppercase tracking-wider text-zinc-200 font-semibold" htmlFor="admin-pass">
              Passcode
            </label>
            <AdminInput
              id="admin-pass"
              type="password"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError('');
              }}
              placeholder="••••••••"
              className="mt-2 text-base tracking-widest"
              autoComplete="off"
            />
            {error && <p className="mt-2 text-xs text-red-400 font-mono font-semibold">{error}</p>}
          </div>

          <AdminButton type="submit" className="mt-6 w-full">
            Enter Admin Panel
          </AdminButton>

          <Link
            href="/"
            className="mt-5 block text-center font-mono text-xs text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to Public Website
          </Link>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-full bg-[#0A0A0E] text-zinc-100 mt-16 sm:mt-20 overflow-hidden">
      {/* Sidebar Navigation - Fixed in place (does not scroll with page) */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-[280px] shrink-0 border-r border-zinc-800 bg-[#0E0E12] transition-transform duration-300 ease-out lg:static lg:h-full lg:translate-x-0',
          navOpen ? 'top-16 sm:top-20 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Brand header */}
          <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-5">
            <img
              src={content.brand.mark}
              alt=""
              aria-hidden="true"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold tracking-wider text-white">SWAMI MARVELS</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-zinc-300 font-medium">
                  Control Center
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav aria-label="Admin sections" className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {nav.map((item) => {
              const Icon = item.icon;
              const isActive =
                section === item.id ||
                (item.id === 'categories-collections' && (section === 'categories' || section === 'collections'));
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSectionChange(item.id);
                    setNavOpen(false);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group relative flex w-full items-center gap-3 rounded-md px-3.5 py-2.5 text-left text-xs font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer',
                    isActive
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs border-l-2 border-amber-400'
                      : 'text-zinc-300 hover:bg-zinc-850 hover:text-white'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-colors',
                      isActive ? 'text-amber-400' : 'text-zinc-400 group-hover:text-white'
                    )}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer actions */}
          <div className="border-t border-zinc-800 p-3 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md px-3.5 py-2.5 font-mono text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Public Website
            </Link>
            <button
              type="button"
              onClick={() => {
                window.localStorage.removeItem(AUTH_KEY);
                setAuthed(false);
              }}
              className="flex w-full items-center gap-2 rounded-md px-3.5 py-2 text-left font-mono text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors cursor-pointer font-medium"
            >
              <LogOutIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile navigation */}
      {navOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Admin Section - The ONLY scrollable area */}
      <div className="min-w-0 flex-1 h-full overflow-y-auto bg-[#0A0A0E]">
        {/* Mobile top strip */}
        <div className="flex items-center gap-3 border-b border-zinc-800 bg-[#0E0E12] px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-label="Open admin navigation"
            className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-200 hover:bg-zinc-800"
          >
            <MenuIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="font-display text-sm font-semibold tracking-wider text-white">
            SWAMI MARVELS ADMIN
          </span>
        </div>

        {/* Generous container spacing */}
        <main className="mx-auto w-full max-w-[1920px] px-4 py-8 sm:px-8 sm:py-10 lg:px-12 xl:px-16">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: SMOOTH_EASE }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}