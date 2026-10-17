"use client";

import React, { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      setError('Please enter the admin passcode');
      return;
    }

    setIsLoading(true);
    setError('');

    // Authenticate with environment variable
    setTimeout(() => {
      const validPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || 'admin123';
      if (passcode === validPasscode) {
        sessionStorage.setItem('sm_admin_authenticated', 'true');
        onLoginSuccess();
      } else {
        setError('Incorrect passcode. Please try again.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4 select-none relative overflow-hidden">
      {/* Abstract background graphics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-stone-900/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm bg-stone-900 border border-stone-850 p-8 rounded-sm shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] tracking-[0.25em] font-mono text-amber-500 uppercase block font-semibold">
            Secure Entry
          </span>
          <h1 className="text-xl font-light tracking-widest font-sans text-stone-100 uppercase">
            SWAMI MARVELS
          </h1>
          <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">
            Control Panel Authentication
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter admin passcode"
              className="w-full pl-9 pr-4 py-3 bg-stone-950 border border-stone-800 focus:outline-none focus:border-amber-500 text-xs text-stone-100 placeholder-stone-700 rounded-sm font-mono tracking-widest"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-[11px] font-mono bg-red-950/20 border border-red-900/30 p-2.5 rounded-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-950 transition-colors text-xs font-semibold uppercase tracking-widest font-mono rounded-sm cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Authenticate'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-[8.5px] text-stone-600 uppercase tracking-widest font-mono">
            Authorized Personnel Only • IP Logged
          </p>
        </div>
      </div>
    </div>
  );
};
