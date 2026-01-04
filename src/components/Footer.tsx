import React from 'react';
import { LogoIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">
            <LogoIcon size={40} />
            <span className="gold-shimmer">Svijet Zlata</span>
          </div>
          <p className="footer-copy">© 2024 Svijet Zlata. Sva prava pridržana.</p>
        </div>
      </div>
    </footer>
  );
}
