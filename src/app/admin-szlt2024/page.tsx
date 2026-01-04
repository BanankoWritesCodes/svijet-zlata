'use client';

import React, { useState, useEffect } from 'react';
import { LogoIcon, SettingsIcon, ChartIcon } from '@/components/Icons';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [settings, setSettings] = useState({ goldPrice: 75.5, silverPrice: 0.92, buyMargin: 10, sellMargin: 10 });
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (sessionStorage.getItem('adminAuth') === 'true') setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetch('/api/settings').then(r => r.json()).then(data => {
        if (data.goldPrice) setSettings(data);
      }).catch(() => {});
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      setLoginError('Pogrešno korisničko ime ili lozinka');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      setSaveStatus(res.ok ? 'success' : 'error');
    } catch {
      setSaveStatus('error');
    }
    setSaving(false);
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  if (!authenticated) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
          <div className="text-center mb-8">
            <div style={{ marginBottom: '16px' }}><LogoIcon size={80} /></div>
            <h1 className="text-2xl gold-shimmer">Admin Panel</h1>
            <p className="text-gray-500 mt-2">Svijet Zlata</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Korisničko ime</label>
              <input type="text" className="form-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="Korisničko ime" />
            </div>
            <div className="form-group">
              <label className="form-label">Lozinka</label>
              <input type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} placeholder="Lozinka" />
            </div>
            {loginError && <div className="alert alert-error mb-4">{loginError}</div>}
            <button type="submit" className="btn btn-gold btn-full">Prijava</button>
          </form>
        </div>
      </main>
    );
  }

  const buyGold = settings.goldPrice * (1 - settings.buyMargin / 100);
  const sellGold = settings.goldPrice * (1 + settings.sellMargin / 100);
  const buySilver = settings.silverPrice * (1 - settings.buyMargin / 100);
  const sellSilver = settings.silverPrice * (1 + settings.sellMargin / 100);

  return (
    <main style={{ minHeight: '100vh' }}>
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="flex items-center gap-3">
            <LogoIcon size={40} />
            <div>
              <h1 className="gold-shimmer" style={{ fontSize: '20px' }}>Admin Panel</h1>
              <p className="text-gray-500 text-sm">Svijet Zlata</p>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={handleLogout}>Odjava</button>
        </div>
      </header>

      <div className="container py-8">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {/* Prices */}
          <div className="admin-card">
            <div className="admin-card-header">
              <ChartIcon size={28} />
              <h2 className="admin-card-title">Bazne Cijene</h2>
            </div>
            
            <div className="form-group">
              <label className="form-label">Cijena zlata (€/gram)</label>
              <input type="number" className="form-input form-input-lg" value={settings.goldPrice} onChange={e => setSettings({ ...settings, goldPrice: parseFloat(e.target.value) || 0 })} step="0.01" />
            </div>
            <div className="form-group">
              <label className="form-label">Cijena srebra (€/gram)</label>
              <input type="number" className="form-input form-input-lg" value={settings.silverPrice} onChange={e => setSettings({ ...settings, silverPrice: parseFloat(e.target.value) || 0 })} step="0.001" />
            </div>
          </div>

          {/* Margins */}
          <div className="admin-card">
            <div className="admin-card-header">
              <SettingsIcon size={28} />
              <h2 className="admin-card-title">Marže</h2>
            </div>
            
            <div className="form-group">
              <label className="form-label">Marža za otkup - {settings.buyMargin}%</label>
              <input type="range" className="range-input" min="0" max="30" value={settings.buyMargin} onChange={e => setSettings({ ...settings, buyMargin: parseInt(e.target.value) })} />
              <div className="range-labels"><span>0%</span><span>15%</span><span>30%</span></div>
            </div>
            <div className="form-group">
              <label className="form-label">Marža za prodaju - {settings.sellMargin}%</label>
              <input type="range" className="range-input" min="0" max="30" value={settings.sellMargin} onChange={e => setSettings({ ...settings, sellMargin: parseInt(e.target.value) })} />
              <div className="range-labels"><span>0%</span><span>15%</span><span>30%</span></div>
            </div>
          </div>
        </div>

        {/* Preview Table */}
        <div className="admin-card mt-8">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Pregled Cijena</h2>
          </div>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Metal</th>
                  <th style={{ textAlign: 'right' }}>Bazna cijena</th>
                  <th style={{ textAlign: 'right', color: '#4ade80' }}>Otkupna cijena</th>
                  <th style={{ textAlign: 'right', color: '#f87171' }}>Prodajna cijena</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: '#fbbf24' }}>Zlato (24K)</td>
                  <td style={{ textAlign: 'right' }}>€{settings.goldPrice.toFixed(2)}/g</td>
                  <td style={{ textAlign: 'right', color: '#4ade80' }}>€{buyGold.toFixed(2)}/g</td>
                  <td style={{ textAlign: 'right', color: '#f87171' }}>€{sellGold.toFixed(2)}/g</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#d1d5db' }}>Srebro (999)</td>
                  <td style={{ textAlign: 'right' }}>€{settings.silverPrice.toFixed(3)}/g</td>
                  <td style={{ textAlign: 'right', color: '#4ade80' }}>€{buySilver.toFixed(3)}/g</td>
                  <td style={{ textAlign: 'right', color: '#f87171' }}>€{sellSilver.toFixed(3)}/g</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '14px', color: '#6b7280' }}>
            <p><strong>Otkupna cijena</strong> = cijena koju plaćate klijentu (bazna - {settings.buyMargin}%)</p>
            <p><strong>Prodajna cijena</strong> = cijena po kojoj prodajete klijentu (bazna + {settings.sellMargin}%)</p>
          </div>
        </div>

        {/* Save */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', marginTop: '24px' }}>
          {saveStatus === 'success' && <span className="text-green">Postavke spremljene!</span>}
          {saveStatus === 'error' && <span className="text-red">Greška pri spremanju</span>}
          <button className="btn btn-gold" onClick={handleSave} disabled={saving}>
            {saving ? 'Spremanje...' : 'Spremi postavke'}
          </button>
        </div>
      </div>
    </main>
  );
}
