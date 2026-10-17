"use client";

import React from 'react';
import { MapPin, Navigation, Phone, Mail } from 'lucide-react';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { Shell } from '../ui/Section';
import { TextReveal } from '../motion/TextReveal';
import { FadeIn } from '../motion/FadeIn';

export function Location() {
  const { content } = usePublicCatalogue();

  return (
    <section className="w-full bg-[#0D0D0D] py-20 border-t border-zinc-800">
      <Shell>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <span className="font-mono text-xs text-yellow-400 tracking-widest uppercase block mb-3">
              Corporate Headquarters
            </span>
            <TextReveal
              as="h2"
              text="Commercial Office & Operations Desk"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight"
            />
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-md">
              Located in Charkop Industrial Estate, Kandivali West, Mumbai. Meetings and technical sampling sessions are arranged by prior appointment.
            </p>
          </div>

          <FadeIn distance={18}>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 sm:p-10">
              <div className="flex items-center gap-3 text-yellow-400 mb-6">
                <MapPin className="h-6 w-6 shrink-0" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                  Registered Commercial Address
                </span>
              </div>

              <address className="not-italic space-y-1">
                {content.contact.addressLines.map((line, i) => (
                  <span
                    key={line}
                    className={`block font-display text-white ${
                      i === 0 ? 'text-xl font-medium text-yellow-400' : 'text-base font-light text-zinc-300'
                    }`}
                  >
                    {line}
                  </span>
                ))}
              </address>

              <div className="mt-6 pt-6 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Phone className="h-4 w-4 text-yellow-400 shrink-0" />
                  <a href="tel:+919867862233" className="hover:text-yellow-400 transition-colors">
                    +91-986-786-2233
                  </a>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Mail className="h-4 w-4 text-yellow-400 shrink-0" />
                  <a href="mailto:contact@swamimarvels.com" className="hover:text-yellow-400 transition-colors">
                    contact@swamimarvels.com
                  </a>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={content.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-mono text-xs uppercase tracking-wider font-semibold text-black hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/10"
                >
                  <Navigation className="h-4 w-4" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </Shell>
    </section>
  );
}