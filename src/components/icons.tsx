import * as React from 'react';

export function VeritasLearnLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M10 30 L50 10 L90 30 L50 50 Z"
        stroke="url(#logoGradient)"
        strokeWidth="5"
        fill="transparent"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M10 50 L50 30 L90 50 L50 70 Z"
        stroke="hsl(var(--primary))"
        strokeWidth="5"
        fill="transparent"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M10 70 L50 50 L90 70 L50 90 Z"
        stroke="hsl(var(--foreground))"
        strokeOpacity="0.5"
        strokeWidth="5"
        fill="transparent"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
