"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingContact: React.FC = () => {
  const pathname = usePathname();
  const phoneNumber = "+919867862233";
  const whatsappNumber = "919867862233";

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end pointer-events-auto">
      {/* Phone Button */}
      <motion.a
        href={`tel:${phoneNumber}`}
        className="w-12 h-12 bg-stone-900 hover:bg-stone-850 text-stone-100 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative group border border-stone-800"
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <Phone className="w-5 h-5 shrink-0" />
        
        {/* Tooltip */}
        <span className="absolute right-14 bg-stone-900 text-stone-100 border border-stone-800 text-[10px] uppercase font-mono tracking-widest px-3 py-1.5 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
          Call +91 98678 62233
        </span>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative group border border-emerald-400/20"
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        {/* Official WhatsApp Logo: Solid white bubble with emerald phone cutout */}
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <path
            fill="white"
            d="M19.077 4.928A9.886 9.886 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.884 9.884 0 0 0 4.79 1.24h.01c5.46 0 9.91-4.45 9.91-9.91a9.888 9.888 0 0 0-2.88-6.932z"
          />
          <path
            fill="#10b981"
            d="M16.768 13.978c-.273-.137-1.616-.797-1.867-.889-.25-.09-.432-.137-.615.137-.182.273-.706.89-.865 1.072-.16.182-.32.205-.593.069-.273-.137-1.15-.423-2.19-1.353-.81-.72-1.356-1.61-1.515-1.884-.16-.273-.018-.42.12-.557.123-.123.273-.32.41-.478.136-.159.182-.273.273-.455.09-.182.046-.341-.023-.478-.069-.137-.615-1.482-.843-2.029-.22-.53-.46-.456-.63-.465-.17-.009-.364-.009-.557-.009-.194 0-.51.073-.778.365-.268.29-1.025 1.003-1.025 2.446 0 1.443 1.047 2.839 1.195 3.037 1.48 1.943 3.385 2.966 5.337 3.645.545.19 1.066.305 1.463.393.497.11 1.002.055 1.378-.001.42-.063 1.299-.53 1.48-.992.183-.463.183-.86.128-.942-.055-.082-.2-.137-.473-.274z"
          />
        </svg>
        
        {/* Tooltip */}
        <span className="absolute right-14 bg-stone-900 text-stone-100 border border-stone-800 text-[10px] uppercase font-mono tracking-widest px-3 py-1.5 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
};
