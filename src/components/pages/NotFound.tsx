"use client";

import React from 'react';
import { Shell } from '../../components/ui/Section';
import { Button } from '../../components/ui/Button';

export function NotFound() {
  return (
    <section className="flex min-h-[70vh] w-full items-center bg-ivory pt-[86px]">
      <Shell>
        <p className="label-xs text-stone">404</p>
        <h1 className="mt-5 font-display text-[2.2rem] font-light leading-[1.05] text-charcoal sm:text-[3rem]">
          This page isn't here
        </h1>
        <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-slate">
          The page you were looking for may have moved. Browse the laminate catalogue or the agricultural product
          range instead.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button to="/laminates" withArrow>
            Explore laminates
          </Button>
          <Button to="/export#apeda-schedule" variant="outline" withArrow>
            Explore agricultural products
          </Button>
        </div>
      </Shell>
    </section>);

}