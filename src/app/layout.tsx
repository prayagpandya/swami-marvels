import React from 'react';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '../contexts/StoreContext';
import { QuoteProvider } from '../contexts/QuoteContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FloatingContact } from '../components/layout/FloatingContact';
import { InitialPreloader } from '../components/layout/InitialPreloader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Swami Marvels | Acrylic Sheets, PVC Foam Boards & Agricultural Exports',
  description: 'Swami Marvels is a premier international B2B supplier and exporter of Acrylic Sheets, PVC & WPC Boards, PP & Decorative Sheets, and APEDA-Certified Agricultural Commodities.',
  keywords: 'Swami Marvels, Acrylic Sheets, Virgin Cast Acrylic, PVC Foam Board, WPC Board, PP Flute, APET, Agricultural exports, APEDA certified, Basmati Rice, Honey, Dairy Products, B2B Export',
  openGraph: {
    title: 'Swami Marvels | Premium Acrylic Sheets, Laminates & Agricultural Exports',
    description: 'B2B supply and international export of Acrylic Sheets, PVC & WPC Boards, and Certified Agricultural Commodities.',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen w-full flex flex-col bg-[#0A0A0A] text-[#FAFAFA] selection:bg-[#FACC15] selection:text-black font-sans antialiased">
        <StoreProvider>
          <QuoteProvider>
            <InitialPreloader />
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
            <FloatingContact />
          </QuoteProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
