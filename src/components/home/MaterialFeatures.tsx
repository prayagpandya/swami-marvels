"use client";

import React from 'react';
import { FadeIn } from '../motion/MotionContainer';

export const MaterialFeatures: React.FC = () => {
  const features = [
    {
      num: "01",
      title: "Anti-Scratch Shield",
      desc: "Engineered with advanced Eximer technology, our surfaces feature high scratch resistance, keeping interiors pristine even under high mechanical wear.",
      img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=600" // detailed smooth kitchen counter
    },
    {
      num: "02",
      title: "Water & Moisture Proof",
      desc: "100% waterproof substrates block swelling and warping, rendering WPC boards and core stocks ideal for bathrooms, kitchens, and marine interiors.",
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600" // water splash on slate tiles
    },
    {
      num: "03",
      title: "UV Color Stability",
      desc: "Protected by UV-fast technology, our colored sunboards and decorative panels prevent fading and discoloration under sunlight. Includes a 2-year warranty.",
      img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=600" // bright sunny room
    },
    {
      num: "04",
      title: "Eco-Friendly & Non-Toxic",
      desc: "EU REACH compliant surface products formulated without toxic chemicals, guaranteeing zero off-gassing and healthy indoor environmental quality.",
      img: "/eco-friendly_and_non-toxic.webp"
    }
  ];

  return (
    <section className="bg-stone-50 py-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center space-y-4">
        <span className="text-[10px] tracking-[0.25em] font-mono text-stone-500 uppercase block">
          Technical Specifications
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-900">
          Built for Endurance. Designed for Aesthetics.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={feature.num}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Text Area */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <FadeIn direction={isEven ? "right" : "left"}>
                  <div className="space-y-4">
                    <span className="text-4xl sm:text-5xl font-mono text-stone-300 font-light block">
                      {feature.num}
                    </span>
                    <h3 className="text-2xl font-serif text-stone-900 uppercase tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-stone-600 font-sans leading-relaxed text-sm sm:text-base">
                      {feature.desc}
                    </p>
                  </div>
                </FadeIn>
              </div>

              {/* Image Area */}
              <div
                className={`lg:col-span-6 ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <FadeIn direction="none" delay={0.2} className="relative aspect-[16/10] overflow-hidden bg-stone-100 border border-stone-200 shadow-lg rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-750"
                  />
                </FadeIn>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
