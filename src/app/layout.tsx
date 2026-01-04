import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Svijet Zlata | Otkup Zlata i Srebra',
  description: 'Vaš pouzdani partner za otkup zlata i srebra. Najbolje cijene na tržištu.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr">
      <body>{children}</body>
    </html>
  );
}
