'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ChartIcon, GoldBarIcon, SilverBarIcon } from '@/components/Icons';

type SelectedMetal = 'gold' | 'silver' | 'platinum' | 'palladium' | null;

interface MetalPrices {
  gold: number;
  silver: number;
  platinum: number;
  palladium: number;
}

export default function CjenikPage() {
  const [prices, setPrices] = useState<MetalPrices>({ gold: 75.50, silver: 0.92, platinum: 32.50, palladium: 35.80 });
  const [changes, setChanges] = useState<Record<string, 'up' | 'down' | 'none'>>({});
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedMetal, setSelectedMetal] = useState<SelectedMetal>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => {
        const newPrices = { ...prev };
        const newChanges: Record<string, 'up' | 'down' | 'none'> = {};
        
        (Object.keys(newPrices) as (keyof MetalPrices)[]).forEach(metal => {
          const fluctuation = (Math.random() - 0.5) * 0.001;
          const oldPrice = newPrices[metal];
          newPrices[metal] = parseFloat((oldPrice * (1 + fluctuation)).toFixed(4));
          newChanges[metal] = newPrices[metal] > oldPrice ? 'up' : newPrices[metal] < oldPrice ? 'down' : 'none';
        });
        
        setChanges(newChanges);
        setLastUpdate(new Date());
        setTimeout(() => setChanges({}), 500);
        return newPrices;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goldKarats = [
    { karat: '24K', purity: '99.9%', mult: 0.999 },
    { karat: '22K', purity: '91.6%', mult: 0.916 },
    { karat: '21K', purity: '87.5%', mult: 0.875 },
    { karat: '18K', purity: '75.0%', mult: 0.750 },
    { karat: '14K', purity: '58.5%', mult: 0.585 },
    { karat: '10K', purity: '41.7%', mult: 0.417 },
    { karat: '9K', purity: '37.5%', mult: 0.375 },
  ];

  const silverPurities = [
    { label: '999', purity: '99.9%', mult: 0.999 },
    { label: '925', purity: '92.5%', mult: 0.925 },
    { label: '900', purity: '90.0%', mult: 0.900 },
    { label: '800', purity: '80.0%', mult: 0.800 },
  ];

  const platinumPurities = [
    { label: '950', purity: '95.0%', mult: 0.950 },
    { label: '900', purity: '90.0%', mult: 0.900 },
    { label: '850', purity: '85.0%', mult: 0.850 },
  ];

  const palladiumPurities = [
    { label: '950', purity: '95.0%', mult: 0.950 },
    { label: '500', purity: '50.0%', mult: 0.500 },
  ];

  const getPriceColor = (metal: string) => {
    if (changes[metal] === 'up') return '#4ade80';
    if (changes[metal] === 'down') return '#f87171';
    return '#ffffff';
  };

  const metalCards = [
    { key: 'gold', name: 'Zlato', price: prices.gold, icon: <GoldBarIcon size={48} />, color: '#d4a417' },
    { key: 'silver', name: 'Srebro', price: prices.silver, icon: <SilverBarIcon size={48} />, color: '#c0c0c0' },
    { key: 'platinum', name: 'Platina', price: prices.platinum, icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" fill="#e5e5e5" stroke="#9ca3af" strokeWidth="2"/>
        <text x="24" y="29" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b7280">Pt</text>
      </svg>
    ), color: '#e5e5e5' },
    { key: 'palladium', name: 'Paladij', price: prices.palladium, icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2"/>
        <text x="24" y="29" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b7280">Pd</text>
      </svg>
    ), color: '#d1d5db' },
  ];

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-16" style={{ minHeight: '100vh' }}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <ChartIcon size={48} />
              <h1 className="text-4xl gold-shimmer">Trenutne Cijene</h1>
            </div>
            <p className="text-gray-400 text-lg">Pratite cijene plemenitih metala u realnom vremenu</p>
            <p className="text-gray-500 text-sm mt-2">Kliknite na metal za detaljnu tablicu cijena</p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <div className="live-dot" />
              <span>Posljednje ažuriranje: {lastUpdate.toLocaleTimeString('hr-HR')}</span>
            </div>
          </div>

          <div className="grid grid-4 gap-4 mb-12">
            {metalCards.map(metal => (
              <button
                key={metal.key}
                onClick={() => setSelectedMetal(selectedMetal === metal.key ? null : metal.key as SelectedMetal)}
                className="price-card"
                style={{ 
                  cursor: 'pointer',
                  border: selectedMetal === metal.key ? `2px solid ${metal.color}` : '1px solid rgba(212, 164, 23, 0.15)',
                  background: selectedMetal === metal.key ? 'rgba(212, 164, 23, 0.08)' : '#141414',
                }}
              >
                <div className="price-card-icon">{metal.icon}</div>
                <div className="price-card-label">{metal.name}</div>
                <div className="price-card-value" style={{ color: getPriceColor(metal.key) }}>€{metal.price.toFixed(2)}</div>
                <div className="price-card-unit">po gramu</div>
                {selectedMetal === metal.key && (
                  <div style={{ marginTop: '8px', fontSize: '11px', color: metal.color }}>▼ Tablica ispod</div>
                )}
              </button>
            ))}
          </div>

          {selectedMetal === 'gold' && (
            <div className="card mb-8 fade-in" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', background: 'rgba(212, 164, 23, 0.08)', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(212, 164, 23, 0.2)' }}>
                <GoldBarIcon size={28} />
                <h2 style={{ fontSize: '20px', color: '#d4a417' }}>Cjenik Zlata po Karataži</h2>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Karataža</th>
                      <th>Čistoća</th>
                      <th style={{ textAlign: 'right' }}>Cijena/gram</th>
                      <th style={{ textAlign: 'right' }}>Cijena/unca</th>
                      <th style={{ textAlign: 'right' }}>Cijena/kg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {goldKarats.map((row, i) => (
                      <tr key={row.karat} style={{ background: i % 2 === 0 ? 'rgba(212, 164, 23, 0.03)' : 'transparent' }}>
                        <td style={{ fontWeight: 600, color: '#fbbf24' }}>{row.karat}</td>
                        <td style={{ color: '#9ca3af' }}>{row.purity}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>€{(prices.gold * row.mult).toFixed(2)}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>€{(prices.gold * row.mult * 31.1035).toFixed(2)}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>€{(prices.gold * row.mult * 1000).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedMetal === 'silver' && (
            <div className="card mb-8 fade-in" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', background: 'rgba(192, 192, 192, 0.08)', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(192, 192, 192, 0.2)' }}>
                <SilverBarIcon size={28} />
                <h2 style={{ fontSize: '20px', color: '#c0c0c0' }}>Cjenik Srebra po Čistoći</h2>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Oznaka</th>
                      <th>Čistoća</th>
                      <th style={{ textAlign: 'right' }}>Cijena/gram</th>
                      <th style={{ textAlign: 'right' }}>Cijena/unca</th>
                      <th style={{ textAlign: 'right' }}>Cijena/kg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {silverPurities.map((row, i) => (
                      <tr key={row.label} style={{ background: i % 2 === 0 ? 'rgba(192, 192, 192, 0.03)' : 'transparent' }}>
                        <td style={{ fontWeight: 600, color: '#d1d5db' }}>{row.label}</td>
                        <td style={{ color: '#9ca3af' }}>{row.purity}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>€{(prices.silver * row.mult).toFixed(3)}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>€{(prices.silver * row.mult * 31.1035).toFixed(2)}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>€{(prices.silver * row.mult * 1000).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedMetal === 'platinum' && (
            <div className="card mb-8 fade-in" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', background: 'rgba(229, 229, 229, 0.08)', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(229, 229, 229, 0.2)' }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="18" fill="#e5e5e5" stroke="#9ca3af" strokeWidth="2"/>
                  <text x="24" y="29" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b7280">Pt</text>
                </svg>
                <h2 style={{ fontSize: '20px', color: '#e5e5e5' }}>Cjenik Platine po Čistoći</h2>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Oznaka</th>
                      <th>Čistoća</th>
                      <th style={{ textAlign: 'right' }}>Cijena/gram</th>
                      <th style={{ textAlign: 'right' }}>Cijena/unca</th>
                      <th style={{ textAlign: 'right' }}>Cijena/kg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {platinumPurities.map((row, i) => (
                      <tr key={row.label} style={{ background: i % 2 === 0 ? 'rgba(229, 229, 229, 0.03)' : 'transparent' }}>
                        <td style={{ fontWeight: 600, color: '#e5e5e5' }}>{row.label}</td>
                        <td style={{ color: '#9ca3af' }}>{row.purity}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>€{(prices.platinum * row.mult).toFixed(2)}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>€{(prices.platinum * row.mult * 31.1035).toFixed(2)}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>€{(prices.platinum * row.mult * 1000).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedMetal === 'palladium' && (
            <div className="card mb-8 fade-in" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', background: 'rgba(209, 213, 219, 0.08)', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(209, 213, 219, 0.2)' }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="18" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2"/>
                  <text x="24" y="29" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b7280">Pd</text>
                </svg>
                <h2 style={{ fontSize: '20px', color: '#d1d5db' }}>Cjenik Paladija po Čistoći</h2>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Oznaka</th>
                      <th>Čistoća</th>
                      <th style={{ textAlign: 'right' }}>Cijena/gram</th>
                      <th style={{ textAlign: 'right' }}>Cijena/unca</th>
                      <th style={{ textAlign: 'right' }}>Cijena/kg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {palladiumPurities.map((row, i) => (
                      <tr key={row.label} style={{ background: i % 2 === 0 ? 'rgba(209, 213, 219, 0.03)' : 'transparent' }}>
                        <td style={{ fontWeight: 600, color: '#d1d5db' }}>{row.label}</td>
                        <td style={{ color: '#9ca3af' }}>{row.purity}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>€{(prices.palladium * row.mult).toFixed(2)}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>€{(prices.palladium * row.mult * 31.1035).toFixed(2)}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>€{(prices.palladium * row.mult * 1000).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!selectedMetal && (
            <div className="text-center py-12" style={{ background: 'rgba(212, 164, 23, 0.03)', borderRadius: '16px', border: '1px dashed rgba(212, 164, 23, 0.2)' }}>
              <p className="text-gray-500">Kliknite na jedan od metala iznad za prikaz detaljne tablice cijena</p>
            </div>
          )}

          <p className="text-center text-gray-500 text-sm mt-8">
            * Cijene se automatski ažuriraju svakih nekoliko sekundi. Konačna cijena otkupa može varirati.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
