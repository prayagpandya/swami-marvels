"use client";

import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../motion/MotionContainer';

export const Applications: React.FC = () => {
  const items = [
    {
      title: "Premium Kitchens",
      desc: "High thermal stability and moisture-resistant laminates create pristine, sleek surfaces that resist spills and heavy use.",
      img: "/premium_kitchen.webp"
    },
    {
      title: "Commercial & Office Spaces",
      desc: "Scratch-resistant and durable panels suited for busy workspaces, reception desks, and decorative wall grids.",
      img: "/office_space.webp"
    },
    {
      title: "Luxury Furniture",
      desc: "Acrylic glass-like mirrors, colored sunboards, and high-gloss sheets for premium wardrobing, shelving, and panel detailing.",
      img: "/luxury_furniture.webp"
    },
    {
      title: "Signage & Exhibition Decor",
      desc: "Lightweight, easy-to-cut PVC foam boards and smart core stock optimized for flatbed printing, lettering, and retail displays.",
      img: "/exhibit_decor.webp"
    }
  ];

  return (
    <section className="bg-stone-50 py-24 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-6 mb-16 space-y-4">
        <span className="text-[10px] tracking-[0.25em] font-mono text-stone-500 uppercase block">
          Usage & Adaptability
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-900">
          Where Innovation Meets Space
        </h2>
        <p className="text-xs text-stone-500 font-sans max-w-lg">
          Our diverse range of materials is optimized for specific architectural demands, interior decors, and commercial signage requirements.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="space-y-4 group">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-200 border border-stone-300 shadow-sm rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-750"
                  />
                  <div className="absolute inset-0 bg-stone-950/20" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-serif text-stone-900 uppercase tracking-wide group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
