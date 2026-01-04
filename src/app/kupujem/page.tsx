'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CalculatorIcon, GoldBarIcon, SilverBarIcon, RingIcon, CoinIcon, ScaleIcon } from '@/components/Icons';

type MetalType = 'gold' | 'silver';
type ItemType = 'poluga' | 'nakit' | 'kovanica';
type Karat = '24k' | '22k' | '18k' | '14k' | '9k';

const karatPurity: Record<Karat, number> = {
  '24k': 0.999, '22k': 0.916, '18k': 0.750, '14k': 0.585, '9k': 0.375,
};

const karatLabels: Record<Karat, string> = {
  '24k': '24 karata (99.9%)', '22k': '22 karata (91.6%)', '18k': '18 karata (75.0%)',
  '14k': '14 karata (58.5%)', '9k': '9 karata (37.5%)',
};

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="steps">
      {Array.from({ length: total }, (_, i) => (
        <React.Fragment key={i}>
          <div className={`step-circle ${i + 1 <= current ? 'active' : 'inactive'}`}>
            {i + 1}
          </div>
          {i < total - 1 && (
            <div className={`step-line ${i + 1 < current ? 'active' : 'inactive'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function KupujemPage() {
  const [step, setStep] = useState(1);
  const [metal, setMetal] = useState<MetalType | null>(null);
  const [itemType, setItemType] = useState<ItemType | null>(null);
  const [karat, setKarat] = useState<Karat | null>(null);
  const [weight, setWeight] = useState('');
  const [prices, setPrices] = useState({ gold: 75.5, silver: 0.92 });
  const [buyRate, setBuyRate] = useState(0.90);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.goldPrice) setPrices({ gold: data.goldPrice, silver: data.silverPrice });
        if (data.buyMargin) setBuyRate(1 - data.buyMargin / 100);
      })
      .catch(() => {});
  }, []);

  const calculatePrice = () => {
    if (!metal || !weight) return 0;
    const w = parseFloat(weight);
    if (isNaN(w)) return 0;
    const basePrice = metal === 'gold' 
      ? w * prices.gold * (karat ? karatPurity[karat] : 1)
      : w * prices.silver;
    return basePrice * buyRate;
  };

  const reset = () => {
    setStep(1);
    setMetal(null);
    setItemType(null);
    setKarat(null);
    setWeight('');
  };

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-16" style={{ minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <CalculatorIcon size={48} />
              <h1 className="text-4xl gold-shimmer">Kalkulator Otkupa</h1>
            </div>
            <p className="text-gray-400 text-lg">
              Izračunajte vrijednost vašeg zlata ili srebra u nekoliko koraka
            </p>
          </div>

          <StepIndicator current={step} total={4} />

          {/* Step 1: Metal Type */}
          {step === 1 && (
            <div className="fade-in">
              <h2 className="text-2xl text-center text-gold mb-8">Odaberite vrstu metala</h2>
              <div className="selection-grid" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <button className={`selection-card ${metal === 'gold' ? 'selected' : ''}`} onClick={() => setMetal('gold')}>
                  <div className="selection-card-icon"><GoldBarIcon size={64} /></div>
                  <div className="selection-card-title">Zlato</div>
                  <div className="selection-card-subtitle">Poluge, nakit, kovanice</div>
                </button>
                <button className={`selection-card ${metal === 'silver' ? 'selected' : ''}`} onClick={() => setMetal('silver')}>
                  <div className="selection-card-icon"><SilverBarIcon size={64} /></div>
                  <div className="selection-card-title">Srebro</div>
                  <div className="selection-card-subtitle">Poluge, nakit, pribor</div>
                </button>
              </div>
              <div className="text-center mt-8">
                <button className="btn btn-gold" disabled={!metal} onClick={() => setStep(2)}>
                  Dalje →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Item Type */}
          {step === 2 && (
            <div className="fade-in">
              <h2 className="text-2xl text-center text-gold mb-8">Odaberite vrstu predmeta</h2>
              <div className="selection-grid" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <button className={`selection-card ${itemType === 'poluga' ? 'selected' : ''}`} onClick={() => setItemType('poluga')}>
                  <div className="selection-card-icon"><GoldBarIcon size={56} /></div>
                  <div className="selection-card-title">Poluga</div>
                  <div className="selection-card-subtitle">Investicijske poluge</div>
                </button>
                <button className={`selection-card ${itemType === 'nakit' ? 'selected' : ''}`} onClick={() => setItemType('nakit')}>
                  <div className="selection-card-icon"><RingIcon size={56} /></div>
                  <div className="selection-card-title">Nakit</div>
                  <div className="selection-card-subtitle">Prstenje, lanci...</div>
                </button>
                <button className={`selection-card ${itemType === 'kovanica' ? 'selected' : ''}`} onClick={() => setItemType('kovanica')}>
                  <div className="selection-card-icon"><CoinIcon size={56} /></div>
                  <div className="selection-card-title">Kovanica</div>
                  <div className="selection-card-subtitle">Zlatne/srebrne kovanice</div>
                </button>
              </div>
              <div className="flex justify-center gap-4 mt-8">
                <button className="btn btn-ghost" onClick={() => setStep(1)}>← Natrag</button>
                <button className="btn btn-gold" disabled={!itemType} onClick={() => setStep(3)}>Dalje →</button>
              </div>
            </div>
          )}

          {/* Step 3: Karat / Weight */}
          {step === 3 && (
            <div className="fade-in">
              <h2 className="text-2xl text-center text-gold mb-8">
                {metal === 'gold' ? 'Odaberite karataže' : 'Unesite težinu'}
              </h2>
              
              {metal === 'gold' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', maxWidth: '600px', margin: '0 auto' }}>
                  {(Object.keys(karatPurity) as Karat[]).map(k => (
                    <button
                      key={k}
                      onClick={() => setKarat(k)}
                      style={{
                        padding: '16px',
                        background: karat === k ? 'rgba(212, 164, 23, 0.15)' : '#1a1a1a',
                        border: `2px solid ${karat === k ? '#d4a417' : '#27272a'}`,
                        borderRadius: '12px',
                        color: karat === k ? '#fbbf24' : '#d1d5db',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {karatLabels[k]}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                  <label className="form-label">Težina (grami)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    placeholder="Unesite težinu u gramima"
                    className="form-input form-input-lg"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}
              
              <div className="flex justify-center gap-4 mt-8">
                <button className="btn btn-ghost" onClick={() => setStep(2)}>← Natrag</button>
                <button 
                  className="btn btn-gold" 
                  disabled={metal === 'gold' ? !karat : !weight}
                  onClick={() => setStep(4)}
                >
                  Dalje →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {step === 4 && (
            <div className="fade-in">
              <h2 className="text-2xl text-center text-gold mb-8">
                {metal === 'gold' ? 'Unesite težinu i dobijte cijenu' : 'Konačna cijena'}
              </h2>
              
              <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '32px' }}>
                {/* Summary */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-gray-400">Metal:</span>
                    <span className="font-semibold">{metal === 'gold' ? 'Zlato' : 'Srebro'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-gray-400">Vrsta:</span>
                    <span className="font-semibold">{itemType === 'poluga' ? 'Poluga' : itemType === 'nakit' ? 'Nakit' : 'Kovanica'}</span>
                  </div>
                  {metal === 'gold' && karat && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="text-gray-400">Karataža:</span>
                      <span className="font-semibold">{karatLabels[karat]}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                    <span className="text-gray-400">Cijena po gramu:</span>
                    <span className="font-semibold">
                      €{(metal === 'gold' 
                        ? prices.gold * (karat ? karatPurity[karat] : 1) * buyRate
                        : prices.silver * buyRate
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Weight Input (for gold) */}
                {metal === 'gold' && (
                  <div style={{ marginBottom: '24px' }}>
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ScaleIcon size={18} /> Težina (grami)
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={e => setWeight(e.target.value)}
                      placeholder="Unesite težinu u gramima"
                      className="form-input form-input-lg text-center"
                      min="0"
                      step="0.01"
                    />
                  </div>
                )}

                {/* Final Price */}
                <div style={{ textAlign: 'center', padding: '32px 0', borderTop: '1px solid rgba(212, 164, 23, 0.2)' }}>
                  <p className="text-gray-400 mb-2">Otkupna cijena:</p>
                  <p className="gold-shimmer" style={{ fontSize: '56px', fontFamily: "'Playfair Display', serif" }}>
                    €{calculatePrice().toFixed(2)}
                  </p>
                  <p className="text-gray-500 text-sm mt-4">
                    * Konačna cijena može varirati ovisno o stanju predmeta
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
                  <button className="btn btn-ghost" onClick={() => setStep(3)}>← Natrag</button>
                  <button className="btn btn-gold" onClick={reset}>Nova kalkulacija</button>
                  <Link href="/kontakt" className="btn btn-silver">Kontaktirajte nas</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
