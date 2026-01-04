'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoIcon, ChartIcon, QuestionIcon, MailIcon, TradingIcon, WalletIcon } from './Icons';

export default function Navigation() {
  const pathname = usePathname();
  const [showAccount, setShowAccount] = useState(false);
  
  // Mock account data
  const mockAccount = {
    name: 'Demo Korisnik',
    balance: 5420.50,
    connected: true
  };
  
  const links = [
    { href: '/', label: 'Početna', icon: null, highlight: false },
    { href: '/cjenik', label: 'Cjenik', icon: <ChartIcon size={18} />, highlight: false },
    { href: '/trguj', label: 'Trguj', icon: <TradingIcon size={18} />, highlight: true },
    { href: '/faq', label: 'FAQ', icon: <QuestionIcon size={18} />, highlight: false },
    { href: '/kontakt', label: 'Kontakt', icon: <MailIcon size={18} />, highlight: false },
  ];

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <LogoIcon size={48} />
          <span className="gold-shimmer hide-mobile">Svijet Zlata</span>
        </Link>
        
        <div className="nav-links">
          {links.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`nav-link ${pathname === link.href ? 'active' : ''} ${link.highlight && pathname !== link.href ? 'highlight' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          
          {/* Account Button */}
          <div style={{ position: 'relative' }}>
            <button 
              className="nav-link account-btn"
              onClick={() => setShowAccount(!showAccount)}
              style={{ marginLeft: '8px', background: 'rgba(212, 164, 23, 0.1)', border: '1px solid rgba(212, 164, 23, 0.3)' }}
            >
              <WalletIcon size={18} />
              <span className="hide-mobile">€{mockAccount.balance.toLocaleString()}</span>
            </button>
            
            {showAccount && (
              <div className="account-dropdown">
                <div className="account-dropdown-header">
                  <div className="account-avatar">
                    <WalletIcon size={24} />
                  </div>
                  <div>
                    <div className="account-name">{mockAccount.name}</div>
                    <div className="account-status">
                      <span className="status-dot"></span>
                      Povezan
                    </div>
                  </div>
                </div>
                <div className="account-balance-section">
                  <div className="account-balance-label">Stanje računa</div>
                  <div className="account-balance-value">€{mockAccount.balance.toLocaleString('hr-HR', { minimumFractionDigits: 2 })}</div>
                </div>
                <div className="account-actions">
                  <button className="btn btn-sm btn-gold btn-full">Uplati</button>
                  <button className="btn btn-sm btn-outline btn-full" style={{ marginTop: '8px' }}>Isplati</button>
                </div>
                <div className="account-wallet-info">
                  <span style={{ fontSize: '11px', color: '#6b7280' }}>MetaMask / Trust Wallet</span>
                  <span style={{ fontSize: '11px', color: '#d4a417' }}>Uskoro dostupno</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
