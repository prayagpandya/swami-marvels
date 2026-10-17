import React from 'react';
import { Shell } from '../ui/Section';
import { TextReveal } from '../motion/TextReveal';
import { FadeIn } from '../motion/FadeIn';
import { QuoteForm } from '../products/QuoteForm';

export function ExportEnquiry() {
  return (
    <section className="w-full bg-[#0A0A0A] py-20 lg:py-28 border-t border-zinc-800" id="export-enquiry">
      <Shell>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <FadeIn distance={12} duration={0.5}>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-mono tracking-widest uppercase mb-4">
                Global Trade Desk
              </span>
            </FadeIn>
            <TextReveal
              as="h2"
              text="Submit an international import enquiry"
              className="font-display text-[2rem] font-light leading-[1.1] text-white sm:text-[2.5rem]"
            />
            
            <FadeIn delay={0.1}>
              <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-zinc-400">
                Share your target division (Acrylic Sheets, ASA Laminates, or APEDA Certified Agricultural Produce), grade or sheet specs, estimated container quantity, and destination port. Our export logistics team responds within 24 business hours.
              </p>
              
              <div className="mt-8 space-y-3 font-mono text-xs text-zinc-400">
                <p>📍 Origin Ports: JNPT / Nhava Sheva / Mumbai Port</p>
                <p>📦 Delivery Terms: FOB, CIF, CFR, Ex-Works</p>
                <p>📄 Certifications: APEDA, Phytosanitary, Certificate of Origin, Test Reports</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn distance={22} delay={0.1}>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
              <QuoteForm invert submitLabel="Send Message" />
            </div>
          </FadeIn>
        </div>
      </Shell>
    </section>
  );
}