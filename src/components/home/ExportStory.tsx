import React from 'react';
import { Globe } from '../export/Globe';
import { ExportJourney } from '../export/ExportJourney';
import { Section, SectionHeading, Shell } from '../ui/Section';
import { Button } from '../ui/Button';
import { FadeIn } from '../motion/FadeIn';

export function ExportStory() {
  return (
    <Section tone="cream" className="overflow-hidden">
      <Shell>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Export"
              title="One process, from the sheet to the shipment"
              description="Both divisions run through the same export discipline — product agreed, packed correctly, documented and despatched." />
            
            <FadeIn delay={0.15} className="mt-9">
              <Button to="/export" variant="outline" withArrow>
                Explore export
              </Button>
            </FadeIn>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[620px]">
            <Globe className="h-full w-full" />
          </div>
        </div>

        <ExportJourney invert={false} className="mt-16 lg:mt-20" />
      </Shell>
    </Section>);

}