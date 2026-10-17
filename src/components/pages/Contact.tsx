"use client";

import React from 'react';
import { PageHero } from '../../components/ui/PageHero';
import { ContactInformation } from '../../components/contact/ContactInformation';
import { ContactForm } from '../../components/contact/ContactForm';
import { Section, Shell } from '../../components/ui/Section';
import { TextReveal } from '../../components/motion/TextReveal';
import { FadeIn } from '../../components/motion/FadeIn';

export function Contact() {
  return (
    <>
      <PageHero
        tone="charcoal"
        eyebrow="CONTACT — MUMBAI COMMERCIAL DESK"
        title="Let's Connect"
        description="Send us a requirement, ask for samples, or start an export conversation." />
      

      <Section tone="ivory" className="py-16 sm:py-20 lg:py-28 border-t border-zinc-200">
        <Shell>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="label-xs mb-5 text-stone">Contact information</p>
              <ContactInformation />
            </div>
            <div>
              <TextReveal
                as="h2"
                text="Send us a message"
                className="font-display text-[1.7rem] font-light leading-[1.1] text-charcoal sm:text-[2.1rem]" />
              
              <FadeIn distance={18} delay={0.08} className="mt-8">
                <ContactForm />
              </FadeIn>
            </div>
          </div>
        </Shell>
      </Section>
    </>);

}