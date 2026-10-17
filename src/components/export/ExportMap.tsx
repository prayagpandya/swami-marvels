"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Calendar, Clock, Anchor } from 'lucide-react';

interface RouteData {
  id: string;
  name: string;
  coords: { x: number; y: number }; // SVG canvas coordinates
  pathCoords: string; // SVG bezier curve path
  transit: string;
  frequency: string;
  materials: string;
}

export const ExportMap: React.FC = () => {
  const [hoveredRoute, setHoveredRoute] = useState<RouteData | null>(null);

  // Mumbai port coordinates (origin): X=540, Y=260
  const origin = { x: 540, y: 260 };

  const routes: RouteData[] = [
    {
      id: "rotterdam",
      name: "Port of Rotterdam (Netherlands)",
      coords: { x: 380, y: 140 },
      pathCoords: "M 540 260 Q 430 200 380 140",
      transit: "18-20 Days",
      frequency: "Bi-Weekly",
      materials: "Laminates, Solid Sunboards"
    },
    {
      id: "london",
      name: "Port of London (United Kingdom)",
      coords: { x: 350, y: 130 },
      pathCoords: "M 540 260 Q 410 180 350 130",
      transit: "20-22 Days",
      frequency: "Weekly",
      materials: "Decorative Acrylics, Honey"
    },
    {
      id: "newyork",
      name: "Port of New York (United States)",
      coords: { x: 190, y: 160 },
      pathCoords: "M 540 260 C 350 180, 260 140, 190 160",
      transit: "28-30 Days",
      frequency: "Weekly",
      materials: "Premium Grains, Cast Acrylics"
    },
    {
      id: "dubai",
      name: "Port of Jebel Ali (Dubai, UAE)",
      coords: { x: 470, y: 220 },
      pathCoords: "M 540 260 Q 500 240 470 220",
      transit: "4-5 Days",
      frequency: "3x Weekly",
      materials: "Laminates, Ghee, Dairy"
    },
    {
      id: "singapore",
      name: "Port of Singapore (Singapore)",
      coords: { x: 670, y: 310 },
      pathCoords: "M 540 260 Q 610 290 670 310",
      transit: "6-8 Days",
      frequency: "2x Weekly",
      materials: "De-oiled Rice Bran, Fruits"
    }
  ];

  return (
    <section className="bg-ink text-ivory border border-charcoal rounded-sm p-6 lg:p-10 shadow-xl relative overflow-hidden select-none">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(164,95,53,0.04)_0%,_transparent_70%)] pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-charcoal pb-6 mb-8 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-wider text-copper uppercase font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>Global distribution network</span>
          </div>
          <h2 className="text-2xl font-serif text-ivory uppercase tracking-wide">
            Swami Marvels Interactive Export Map
          </h2>
          <p className="text-xs text-stone">
            Hover over global destination ports to view active trade routes, shipping transit schedules, and export materials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* World Map SVG Area */}
        <div className="lg:col-span-8 bg-charcoal border border-line/10 rounded-sm p-4 relative overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* Main SVG Container */}
          <svg viewBox="0 0 800 450" className="w-full h-auto text-line/10 max-w-[700px]">
            {/* 1. Map Coordinates Grid Lines */}
            <g stroke="rgba(226, 217, 203, 0.05)" strokeWidth="0.5" strokeDasharray="3,3">
              {/* Latitudes */}
              <line x1="0" y1="100" x2="800" y2="100" />
              <line x1="0" y1="200" x2="800" y2="200" />
              <line x1="0" y1="300" x2="800" y2="300" />
              {/* Longitudes */}
              <line x1="200" y1="0" x2="200" y2="450" />
              <line x1="400" y1="0" x2="400" y2="450" />
              <line x1="600" y1="0" x2="600" y2="450" />
            </g>

            {/* 2. Abstract Continents outline - lightweight design representation */}
            <g fill="none" stroke="rgba(226, 217, 203, 0.15)" strokeWidth="1" opacity="0.8">
              {/* North America */}
              <path d="M 50 100 L 150 70 L 220 150 L 160 220 L 100 240 L 120 180 Z" />
              {/* South America */}
              <path d="M 180 250 L 220 280 L 250 330 L 220 410 L 190 350 Z" />
              {/* Europe & Africa */}
              <path d="M 330 100 L 400 80 L 430 140 L 480 180 L 410 240 L 370 240 L 350 200 Z" d-afr="M 370 240 L 430 250 L 450 310 L 410 390 L 370 330 Z" />
              <path d="M 370 240 L 450 250 L 470 300 L 440 370 L 370 340 Z" /> {/* Africa */}
              {/* Asia */}
              <path d="M 440 140 L 520 90 L 640 100 L 720 150 L 690 220 L 590 280 L 520 220 Z" />
              {/* India triangle outline */}
              <path d="M 515 210 L 565 210 L 540 260 Z" stroke="rgba(226, 217, 203, 0.25)" strokeWidth="1" />
              {/* Australia */}
              <path d="M 680 320 L 740 330 L 750 380 L 690 370 Z" />
            </g>

            {/* 3. Static Connection Lines */}
            {routes.map(route => (
              <path
                key={`line-static-${route.id}`}
                d={route.pathCoords}
                fill="none"
                stroke={hoveredRoute?.id === route.id ? "rgba(164, 95, 53, 0.5)" : "rgba(226, 217, 203, 0.1)"}
                strokeWidth={hoveredRoute?.id === route.id ? 2 : 1}
                className="transition-colors duration-300"
              />
            ))}

            {/* 4. Active Animated Connectors */}
            {hoveredRoute && (
              <motion.path
                d={hoveredRoute.pathCoords}
                fill="none"
                stroke="#a45f35"
                strokeWidth={2}
                strokeDasharray="6,4"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            )}

            {/* 5. Origin Hub (Mumbai India JNPT) */}
            <g>
              {/* Pulsing glow */}
              <circle cx={origin.x} cy={origin.y} r="10" fill="none" stroke="#a45f35" strokeWidth="1.5">
                <animate attributeName="r" values="6;16;6" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Center point */}
              <circle cx={origin.x} cy={origin.y} r="5" fill="#a45f35" />
              {/* Label */}
              <text x={origin.x + 8} y={origin.y + 4} fill="#fff" fontSize="9" fontFamily="var(--font-sans), sans-serif" letterSpacing="1">
                JNPT (MUMBAI)
              </text>
            </g>

            {/* 6. Destination Ports */}
            {routes.map(route => {
              const isHovered = hoveredRoute?.id === route.id;
              
              return (
                <g
                  key={route.id}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredRoute(route)}
                  onMouseLeave={() => setHoveredRoute(null)}
                >
                  <circle
                    cx={route.coords.x}
                    cy={route.coords.y}
                    r={isHovered ? 7 : 5}
                    fill={isHovered ? "#fff" : "#a45f35"}
                    stroke={isHovered ? "#a45f35" : "transparent"}
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  {isHovered && (
                    <circle cx={route.coords.x} cy={route.coords.y} r="14" fill="none" stroke="#a45f35" strokeWidth="0.5">
                      <animate attributeName="r" values="6;14;6" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Small tooltip indicator text on hover */}
                  <text
                    x={route.coords.x + 8}
                    y={route.coords.y - 6}
                    fill={isHovered ? "#fff" : "rgba(226, 217, 203, 0.4)"}
                    fontSize="7"
                    fontFamily="var(--font-sans), sans-serif"
                    className="transition-colors duration-300"
                  >
                    {route.id.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Route Info Panel */}
        <div className="lg:col-span-4 h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {hoveredRoute ? (
              <motion.div
                key={hoveredRoute.id}
                className="bg-charcoal border border-line/10 p-6 rounded-sm space-y-5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {/* Hub details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[8px] font-mono tracking-widest text-copper uppercase font-semibold">
                    <Anchor className="w-3.5 h-3.5" />
                    <span>Destination Port</span>
                  </div>
                  <h3 className="text-base font-serif text-ivory">{hoveredRoute.name}</h3>
                </div>

                <div className="h-[1px] w-full bg-line/10" />

                {/* Transit Details */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-stone">
                      <Clock className="w-4 h-4 text-stone" />
                      <span>Ocean Transit</span>
                    </div>
                    <span className="font-mono text-ivory font-semibold">{hoveredRoute.transit}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-stone">
                      <Calendar className="w-4 h-4 text-stone" />
                      <span>FCL Frequency</span>
                    </div>
                    <span className="font-mono text-ivory font-semibold">{hoveredRoute.frequency}</span>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-line/10" />

                {/* Key exports */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono tracking-wider text-stone uppercase block font-semibold">Primary Cargo Types</span>
                  <p className="text-xs text-ivory/80 font-sans leading-relaxed">
                    {hoveredRoute.materials}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-charcoal border border-line/10 p-6 rounded-sm text-center py-16 space-y-4">
                <Globe className="w-8 h-8 text-copper mx-auto stroke-[1.2]" />
                <div className="space-y-1">
                  <h4 className="text-xs uppercase tracking-widest font-mono text-ivory font-semibold">Select Trade Route</h4>
                  <p className="text-[11px] text-stone max-w-[200px] mx-auto leading-relaxed">
                    Hover over any port dot in the map layout to inspect active FCL cargo slots.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
