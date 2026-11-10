import React from "react";

/**
 * Pure Japanese Visual Decorations (Cero Texto — Solo Geometría, Arte Zen y Wagara)
 */

// 1. Zen Ensō Circle (円相 - Símbolo de armonía, vacío y perfección Zen)
export const EnsoCircle: React.FC<{ className?: string; size?: number }> = ({
  className = "",
  size = 380,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    {/* Concentric subtle outer orbital ring */}
    <circle
      cx="100"
      cy="100"
      r="88"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeDasharray="4 6"
      opacity="0.35"
    />
    {/* Authentic Zen Ensō unclosed brushwork arc */}
    <path
      d="M 100 16 
         C 145 16, 184 55, 184 100 
         C 184 145, 145 184, 100 184 
         C 55 184, 16 145, 16 100 
         C 16 62, 42 30, 80 18"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.85"
    />
    {/* Inner subtle echo arc */}
    <path
      d="M 100 32
         C 136 32, 168 64, 168 100
         C 168 136, 136 168, 100 168
         C 64 168, 32 136, 32 100
         C 32 70, 52 44, 82 34"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
      opacity="0.4"
    />
    {/* Zen focal core point */}
    <circle cx="100" cy="100" r="2.5" fill="#d9483b" opacity="0.8" />
  </svg>
);

// 2. Seigaiha (青海波 - Olas del mar de la serenidad)
export const SeigaihaPattern: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 160 80"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <defs>
      <pattern id="seigaiha-tile" width="40" height="20" patternUnits="userSpaceOnUse">
        {/* Tier 1 wave */}
        <circle cx="20" cy="20" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="20" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="0.8" />

        {/* Tier 2 offset wave */}
        <circle cx="0" cy="10" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="0" cy="10" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="0" cy="10" r="12" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="0" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="0" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="0.8" />

        <circle cx="40" cy="10" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="40" cy="10" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="40" cy="10" r="12" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="40" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="40" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#seigaiha-tile)" />
  </svg>
);

// 3. Asanoha / Kumiko (麻の葉 / 組子 - Celosía geométrica sagrada)
export const AsanohaWatermark: React.FC<{ className?: string; size?: number }> = ({
  className = "",
  size = 280,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    {/* Hexagonal Star Lattice */}
    <polygon
      points="60,10 103.3,35 103.3,85 60,110 16.7,85 16.7,35"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.6"
    />
    <line x1="60" y1="10" x2="60" y2="110" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
    <line x1="16.7" y1="35" x2="103.3" y2="85" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
    <line x1="16.7" y1="85" x2="103.3" y2="35" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />

    {/* Inner Asanoha Rhombuses */}
    <polygon
      points="60,10 60,60 16.7,35"
      stroke="currentColor"
      strokeWidth="0.7"
      fill="none"
      opacity="0.4"
    />
    <polygon
      points="60,10 103.3,35 60,60"
      stroke="currentColor"
      strokeWidth="0.7"
      fill="none"
      opacity="0.4"
    />
    <polygon
      points="103.3,35 103.3,85 60,60"
      stroke="currentColor"
      strokeWidth="0.7"
      fill="none"
      opacity="0.4"
    />
    <polygon
      points="103.3,85 60,110 60,60"
      stroke="currentColor"
      strokeWidth="0.7"
      fill="none"
      opacity="0.4"
    />
    <polygon
      points="60,110 16.7,85 60,60"
      stroke="currentColor"
      strokeWidth="0.7"
      fill="none"
      opacity="0.4"
    />
    <polygon
      points="16.7,85 16.7,35 60,60"
      stroke="currentColor"
      strokeWidth="0.7"
      fill="none"
      opacity="0.4"
    />

    {/* Geometric Core */}
    <circle cx="60" cy="60" r="3" fill="#d9483b" opacity="0.75" />
  </svg>
);

// 4. Kamon Geometric Crest (家紋 - Emblema circular puramente geométrico sin texto)
export const KamonCrest: React.FC<{ className?: string; size?: number }> = ({
  className = "",
  size = 40,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    {/* Outer ring */}
    <circle cx="30" cy="30" r="27" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="30" cy="30" r="23" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 3" opacity="0.6" />
    {/* Inner Mitsudomoe / Geometric petals */}
    <circle cx="30" cy="18" r="9" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7" />
    <circle cx="20" cy="36" r="9" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7" />
    <circle cx="40" cy="36" r="9" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7" />
    {/* Red center dot */}
    <circle cx="30" cy="30" r="2.5" fill="#d9483b" />
  </svg>
);
