import React from 'react';

export const LogoIcon = ({ size = 120 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <defs>
      <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fcd34d" />
        <stop offset="30%" stopColor="#d4a417" />
        <stop offset="70%" stopColor="#b8860b" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="55" fill="none" stroke="url(#logoGold)" strokeWidth="4"/>
    <circle cx="60" cy="60" r="48" fill="none" stroke="url(#logoGold)" strokeWidth="1" opacity="0.5"/>
    <path d="M35 70L30 50H90L85 70H35Z" fill="url(#logoGold)" stroke="#92400e" strokeWidth="1.5"/>
    <path d="M30 50L38 40H82L90 50H30Z" fill="url(#logoGold)" stroke="#92400e" strokeWidth="1.5"/>
    <path d="M38 40L44 35H76L82 40H38Z" fill="#fcd34d" stroke="#92400e" strokeWidth="1"/>
    <circle cx="25" cy="25" r="3" fill="url(#logoGold)"/>
    <circle cx="95" cy="25" r="3" fill="url(#logoGold)"/>
    <circle cx="25" cy="95" r="3" fill="url(#logoGold)"/>
    <circle cx="95" cy="95" r="3" fill="url(#logoGold)"/>
  </svg>
);

export const GoldBarIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fcd34d" />
        <stop offset="50%" stopColor="#d4a417" />
        <stop offset="100%" stopColor="#b8860b" />
      </linearGradient>
    </defs>
    <path d="M8 36L4 20H44L40 36H8Z" fill="url(#goldGrad)" stroke="#92400e" strokeWidth="2"/>
    <path d="M4 20L10 12H38L44 20H4Z" fill="url(#goldGrad)" stroke="#92400e" strokeWidth="2"/>
    <path d="M10 12L14 8H34L38 12H10Z" fill="#fcd34d" stroke="#92400e" strokeWidth="1.5"/>
  </svg>
);

export const SilverBarIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e4e4e7" />
        <stop offset="50%" stopColor="#c0c0c0" />
        <stop offset="100%" stopColor="#71717a" />
      </linearGradient>
    </defs>
    <path d="M8 36L4 20H44L40 36H8Z" fill="url(#silverGrad)" stroke="#52525b" strokeWidth="2"/>
    <path d="M4 20L10 12H38L44 20H4Z" fill="url(#silverGrad)" stroke="#52525b" strokeWidth="2"/>
    <path d="M10 12L14 8H34L38 12H10Z" fill="#e4e4e7" stroke="#52525b" strokeWidth="1.5"/>
  </svg>
);

export const RingIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fcd34d" />
        <stop offset="50%" stopColor="#d4a417" />
        <stop offset="100%" stopColor="#b8860b" />
      </linearGradient>
    </defs>
    <ellipse cx="24" cy="28" rx="16" ry="10" fill="none" stroke="url(#ringGold)" strokeWidth="6"/>
    <path d="M24 8L20 18H28L24 8Z" fill="#a855f7" stroke="#9333ea" strokeWidth="1"/>
    <circle cx="24" cy="10" r="3" fill="#c084fc"/>
  </svg>
);

export const CoinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="coinGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fcd34d" />
        <stop offset="50%" stopColor="#d4a417" />
        <stop offset="100%" stopColor="#b8860b" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="18" fill="url(#coinGold)" stroke="#92400e" strokeWidth="2"/>
    <circle cx="24" cy="24" r="14" fill="none" stroke="#92400e" strokeWidth="1" opacity="0.5"/>
    <text x="24" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">€</text>
  </svg>
);

export const ChartIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="4" y="4" width="40" height="40" rx="4" fill="#141414" stroke="#d4a417" strokeWidth="2"/>
    <path d="M10 34L18 26L26 30L38 14" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="10" cy="34" r="2" fill="#22c55e"/>
    <circle cx="18" cy="26" r="2" fill="#22c55e"/>
    <circle cx="26" cy="30" r="2" fill="#22c55e"/>
    <circle cx="38" cy="14" r="2" fill="#22c55e"/>
  </svg>
);

export const QuestionIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" fill="#141414" stroke="#d4a417" strokeWidth="2"/>
    <text x="24" y="32" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#d4a417">?</text>
  </svg>
);

export const MailIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="4" y="10" width="40" height="28" rx="4" fill="#141414" stroke="#d4a417" strokeWidth="2"/>
    <path d="M4 14L24 26L44 14" stroke="#d4a417" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const InventoryIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="6" y="8" width="36" height="32" rx="3" fill="#141414" stroke="#d4a417" strokeWidth="2"/>
    <line x1="6" y1="18" x2="42" y2="18" stroke="#d4a417" strokeWidth="2"/>
    <rect x="12" y="24" width="24" height="4" rx="1" fill="#d4a417" opacity="0.6"/>
    <rect x="12" y="32" width="18" height="4" rx="1" fill="#d4a417" opacity="0.4"/>
  </svg>
);

export const CalculatorIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="8" y="4" width="32" height="40" rx="4" fill="#141414" stroke="#d4a417" strokeWidth="2"/>
    <rect x="12" y="8" width="24" height="10" rx="2" fill="#1a1a1a" stroke="#d4a417" strokeWidth="1"/>
    <rect x="12" y="22" width="6" height="6" rx="1" fill="#d4a417"/>
    <rect x="21" y="22" width="6" height="6" rx="1" fill="#d4a417"/>
    <rect x="30" y="22" width="6" height="6" rx="1" fill="#d4a417"/>
    <rect x="12" y="31" width="6" height="6" rx="1" fill="#d4a417"/>
    <rect x="21" y="31" width="6" height="6" rx="1" fill="#d4a417"/>
    <rect x="30" y="31" width="6" height="6" rx="1" fill="#d4a417"/>
  </svg>
);

export const SettingsIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="8" fill="none" stroke="#d4a417" strokeWidth="2"/>
    <path d="M24 4V10M24 38V44M4 24H10M38 24H44M9.86 9.86L14.1 14.1M33.9 33.9L38.14 38.14M38.14 9.86L33.9 14.1M14.1 33.9L9.86 38.14" stroke="#d4a417" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ScaleIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="scaleGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fcd34d" />
        <stop offset="50%" stopColor="#d4a417" />
        <stop offset="100%" stopColor="#b8860b" />
      </linearGradient>
    </defs>
    <line x1="24" y1="6" x2="24" y2="42" stroke="url(#scaleGold)" strokeWidth="3"/>
    <line x1="6" y1="16" x2="42" y2="16" stroke="url(#scaleGold)" strokeWidth="3"/>
    <path d="M6 16L10 28H2L6 16Z" fill="url(#scaleGold)"/>
    <path d="M42 16L46 28H38L42 16Z" fill="url(#scaleGold)"/>
    <rect x="18" y="38" width="12" height="6" fill="url(#scaleGold)"/>
  </svg>
);

export const ChevronDown = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TradingIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="4" y="4" width="40" height="40" rx="4" fill="#141414" stroke="#d4a417" strokeWidth="2"/>
    <path d="M8 32L16 24L22 28L32 16L40 20" stroke="#d4a417" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 16H32V20" stroke="#d4a417" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 38H40" stroke="#6b7280" strokeWidth="1"/>
  </svg>
);

export const WalletIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="4" y="12" width="40" height="28" rx="4" fill="#141414" stroke="#d4a417" strokeWidth="2"/>
    <path d="M4 20H44" stroke="#d4a417" strokeWidth="2"/>
    <circle cx="36" cy="28" r="3" fill="#d4a417"/>
    <path d="M8 12V10C8 8 10 6 12 6H36C38 6 40 8 40 10V12" stroke="#d4a417" strokeWidth="2"/>
  </svg>
);

export const LocationIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#d4a417" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export const PhoneIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#d4a417" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

export const EmailIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#d4a417" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
