import React from 'react';

export const GaneshaIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 5C35 5 22 17 22 32c0 8 4 15 10 20-3 2-7 6-9 10-3 6-4 13-3 20 1 7 5 13 11 17 6 4 13 6 20 6s14-2 20-6c6-4 10-10 11-17 1-7 0-14-3-20-2-4-6-8-9-10 6-5 10-12 10-20 0-15-13-27-28-27zm0 4c13 0 24 10 24 23s-11 23-24 23-24-10-24-23S37 9 50 9zm0 46c10 0 19 8 19 18s-9 18-19 18-19-8-19-18 9-18 19-18zm0 4c-8 0-15 6-15 14s7 14 15 14 15-6 15-14-7-14-15-14z" />
    <path d="M50 20c-7 0-12 5-12 12s5 12 12 12 12-5 12-12-5-12-12-12zm0 4c4 0 8 4 8 8s-4 8-8 8-8-4-8-8 4-8 8-8z" />
  </svg>
);

export const MandalaIcon = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="1">
    <circle cx="100" cy="100" r="90" opacity="0.2" />
    <circle cx="100" cy="100" r="70" opacity="0.4" />
    <circle cx="100" cy="100" r="50" opacity="0.6" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 100 100)`}>
        <path d="M100 10 C110 30 130 30 140 10 C130 40 110 40 100 60 C90 40 70 40 60 10 C70 30 90 30 100 10" />
        <path d="M100 30 C105 45 115 45 120 30 C115 50 105 50 100 70 C95 50 85 50 80 30 C85 45 95 45 100 30" opacity="0.5" />
      </g>
    ))}
  </svg>
);

export const FloralDivider = ({ className }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>
    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-gold" />
    <MandalaIcon className="h-8 w-8 text-gold animate-spin-slow" />
    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-gold" />
  </div>
);

export const LotusIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 90c-15-20-25-30-25-45 0-10 10-20 25-10 15-10 25 0 25 10 0 15-10 25-25 45z" opacity="0.8" />
    <path d="M50 90c-10-15-15-22-15-30 0-7 7-14 15-7 8-7 15 0 15 7 0 8-5 15-15 30z" />
    <path d="M50 90c-20-10-30-15-40-10 5-15 15-20 25-10-5-10-10-20 0-25 10 5 15 15 15 45z" opacity="0.6" />
    <path d="M50 90c20-10 30-15 40-10-5-15-15-20-25-10 5-10 10-20 0-25-10 5-15 15-15 45z" opacity="0.6" />
  </svg>
);

export const WaxSeal = ({ className, onClick }) => (
  <button 
    type="button"
    className={`relative cursor-pointer group active:scale-95 touch-manipulation select-none ${className}`}
    onClick={onClick}
    aria-label="Tap to open invitation"
  >
    <div className="absolute inset-0 bg-red-700 rounded-full shadow-lg transform group-hover:scale-110 transition-transform" />
    <div className="absolute inset-2 border-2 border-gold/30 rounded-full" />
    <div className="absolute inset-0 flex items-center justify-center text-gold font-script text-2xl pt-1 font-bold pointer-events-none">
      ॐ
    </div>
  </button>
);
