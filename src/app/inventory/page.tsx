'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { InventoryIcon, GoldBarIcon, RingIcon, CoinIcon, ScaleIcon } from '@/components/Icons';

interface InventoryItem {
  id: string;
  type: 'poluga' | 'nakit' | 'kovanica';
  metal: 'gold' | 'silver';
  karat?: string;
  weight: number;
  description: string;
  price: number;
}

const inventory: InventoryItem[] = [
  { id: '1', type: 'poluga', metal: 'gold', karat: '24k', weight: 100, description: 'Investicijska zlatna poluga 100g - PAMP Suisse', price: 8250 },
  { id: '2', type: 'poluga', metal: 'gold', karat: '24k', weight: 50, description: 'Investicijska zlatna poluga 50g - Heraeus', price: 4150 },
  { id: '3', type: 'kovanica', metal: 'gold', karat: '22k', weight: 31.1, description: 'Zlatnik Krugerrand 1oz - Južna Afrika', price: 2450 },
  { id: '4', type: 'nakit', metal: 'gold', karat: '18k', weight: 25, description: 'Zlatni lanac - italijanska izrada', price: 1650 },
  { id: '5', type: 'poluga', metal: 'silver', weight: 1000, description: 'Srebrna poluga 1kg - Argor-Heraeus', price: 950 },
  { id: '6', type: 'kovanica', metal: 'silver', weight: 31.1, description: 'Srebrnjak American Eagle 1oz - SAD', price: 38 },
];

const typeIcons = {
  poluga: <GoldBarIcon size={24} />,
  nakit: <RingIcon size={24} />,
  kovanica: <CoinIcon size={24} />,
};

export default function InventoryPage() {
  const [metalFilter, setMetalFilter] = useState<'all' | 'gold' | 'silver'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'poluga' | 'nakit' | 'kovanica'>('all');

  const filtered = inventory.filter(item => {
    if (metalFilter !== 'all' && item.metal !== metalFilter) return false;
    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    return true;
  });

  const totalValue = filtered.reduce((sum, item) => sum + item.price, 0);
  const totalWeight = filtered.reduce((sum, item) => sum + item.weight, 0);

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-16" style={{ minHeight: '100vh' }}>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <InventoryIcon size={48} />
              <h1 className="text-4xl gold-shimmer">Naša Ponuda</h1>
            </div>
            <p className="text-gray-400 text-lg">Pregledajte dostupno zlato i srebro na našem skladištu</p>
          </div>

          {/* Filters */}
          <div className="inventory-filters">
            <div className="filter-group">
              <span className="filter-label">Metal:</span>
              <div className="filter-buttons">
                {(['all', 'gold', 'silver'] as const).map(f => (
                  <button key={f} className={`filter-btn ${metalFilter === f ? 'active' : ''}`} onClick={() => setMetalFilter(f)}>
                    {f === 'all' ? 'Sve' : f === 'gold' ? 'Zlato' : 'Srebro'}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <span className="filter-label">Vrsta:</span>
              <div className="filter-buttons">
                {(['all', 'poluga', 'nakit', 'kovanica'] as const).map(f => (
                  <button key={f} className={`filter-btn ${typeFilter === f ? 'active' : ''}`} onClick={() => setTypeFilter(f)}>
                    {f === 'all' ? 'Sve' : f === 'poluga' ? 'Poluga' : f === 'nakit' ? 'Nakit' : 'Kovanica'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="inventory-stats">
            <div className="stat-card">
              <div className="stat-label">Dostupnih artikala</div>
              <div className="stat-value">{filtered.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Ukupna vrijednost</div>
              <div className="stat-value">€{totalValue.toLocaleString()}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Ukupna težina</div>
              <div className="stat-value">{totalWeight.toFixed(1)}g</div>
            </div>
          </div>

          {/* Grid */}
          <div className="inventory-grid">
            {filtered.map(item => (
              <div key={item.id} className="inventory-card">
                <div className="inventory-card-header">
                  <div className="inventory-card-icon">{typeIcons[item.type]}</div>
                  <span className={`inventory-card-badge ${item.metal === 'gold' ? 'badge-gold' : 'badge-silver'}`}>
                    {item.metal === 'gold' ? 'ZLATO' : 'SREBRO'}
                  </span>
                </div>
                <h3 className="inventory-card-title">{item.description}</h3>
                <div className="inventory-card-details">
                  <div className="inventory-detail">
                    <span className="inventory-detail-label">Vrsta:</span>
                    <span className="inventory-detail-value">{item.type === 'poluga' ? 'Poluga' : item.type === 'nakit' ? 'Nakit' : 'Kovanica'}</span>
                  </div>
                  {item.karat && (
                    <div className="inventory-detail">
                      <span className="inventory-detail-label">Karataža:</span>
                      <span className="inventory-detail-value">{item.karat}</span>
                    </div>
                  )}
                  <div className="inventory-detail">
                    <span className="inventory-detail-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ScaleIcon size={14} /> Težina:
                    </span>
                    <span className="inventory-detail-value">{item.weight}g</span>
                  </div>
                </div>
                <div className="inventory-card-price">
                  <span className="inventory-price-label">Cijena:</span>
                  <span className="inventory-price-value">€{item.price.toLocaleString()}</span>
                </div>
                <button className={`btn btn-full mt-4 ${item.metal === 'gold' ? 'btn-gold' : 'btn-silver'}`}>
                  Zainteresiran/a sam
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-xl">Nema dostupnih artikala za odabrane filtere</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
