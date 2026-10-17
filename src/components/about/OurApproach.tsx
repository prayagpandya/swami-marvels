import React from 'react';
import { Shell } from '../ui/Section';
import { Stagger, StaggerItem } from '../motion/Stagger';

const approach = [
  {
    title: 'Precision Quality Assurance',
    copy: 'Every acrylic sheet batch, laminate, and commodity lot is inspected against agreed technical tolerances before dispatch rather than after receipt.'
  },
  {
    title: 'Verifiable Supply Commitments',
    copy: 'We match orders only to what our manufacturing lines and crop cycles can reliably deliver, providing realistic schedules.'
  },
  {
    title: 'Complete Contract Discipline',
    copy: 'Thickness, dimensions, moisture, density, and seaworthy packaging are locked as binding requirements upon quotation confirmation.'
  },
  {
    title: 'Reliable Domestic & Export Fulfillment',
    copy: 'Container bookings and inland transit are proactively coordinated with shipping lines to ensure on-time delivery.'
  }
];

export function OurApproach() {
  return (
    <section className="w-full bg-zinc-50 py-20 lg:py-28 border-t border-zinc-200">
      <Shell>
        <div className="max-w-2xl">
          <span className="font-mono text-xs text-yellow-700 tracking-widest uppercase block mb-3 font-semibold">
            Operating Philosophy
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-950 leading-tight">
            How We Partner With Commercial Buyers
          </h2>
        </div>

        <Stagger className="mt-14 grid grid-cols-1 gap-x-14 sm:grid-cols-2" each={0.08}>
          {approach.map((item, index) => (
            <StaggerItem key={item.title} className="border-t border-zinc-200 py-8 last:border-b sm:py-10 group hover:border-yellow-500 transition-colors">
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-xs text-yellow-600 font-semibold tracking-wider">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-[1.35rem] font-medium text-zinc-950 group-hover:text-yellow-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-zinc-600">{item.copy}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Shell>
    </section>
  );
}