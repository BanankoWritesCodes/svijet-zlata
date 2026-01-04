'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MailIcon, LocationIcon, PhoneIcon, EmailIcon } from '@/components/Icons';

export default function KontaktPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'procjena', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', subject: 'procjena', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setSubmitting(false);
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-16" style={{ minHeight: '100vh' }}>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <MailIcon size={48} />
              <h1 className="text-4xl gold-shimmer">Kontaktirajte Nas</h1>
            </div>
            <p className="text-gray-400 text-lg">Javite nam se za besplatnu procjenu ili bilo kakva pitanja</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
            {/* Form */}
            <div className="card" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '22px', color: '#d4a417', marginBottom: '24px' }}>Pošaljite upit</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Ime i prezime *</label>
                  <input type="text" className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Vaše ime" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email adresa *</label>
                  <input type="email" className="form-input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="vas@email.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Telefon</label>
                  <input type="tel" className="form-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+385 xx xxx xxxx" />
                </div>
                <div className="form-group">
                  <label className="form-label">Tema upita *</label>
                  <select className="form-select" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required>
                    <option value="procjena">Besplatna procjena</option>
                    <option value="otkup">Otkup zlata/srebra</option>
                    <option value="prodaja">Kupnja zlata/srebra</option>
                    <option value="informacije">Opće informacije</option>
                    <option value="ostalo">Ostalo</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Poruka *</label>
                  <textarea className="form-textarea" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required placeholder="Opišite svoj upit..." rows={5} />
                </div>
                <button type="submit" className="btn btn-gold btn-full" disabled={submitting}>
                  {submitting ? 'Slanje...' : 'Pošalji upit'}
                </button>
                
                {status === 'success' && (
                  <div className="alert alert-success mt-4">Hvala! Vaša poruka je uspješno poslana.</div>
                )}
                {status === 'error' && (
                  <div className="alert alert-error mt-4">Došlo je do greške. Molimo pokušajte ponovo.</div>
                )}
              </form>
            </div>

            {/* Info */}
            <div>
              <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '22px', color: '#d4a417', marginBottom: '24px' }}>Kontakt informacije</h2>
                
                <div className="contact-info-item">
                  <div className="contact-info-icon"><LocationIcon size={24} /></div>
                  <div className="contact-info-content">
                    <h4>Adresa</h4>
                    <p>Ulica primjer 123<br/>10000 Zagreb, Hrvatska</p>
                  </div>
                </div>
                
                <div className="contact-info-item">
                  <div className="contact-info-icon"><PhoneIcon size={24} /></div>
                  <div className="contact-info-content">
                    <h4>Telefon</h4>
                    <p>+385 1 234 5678<br/>+385 91 234 5678</p>
                  </div>
                </div>
                
                <div className="contact-info-item" style={{ marginBottom: 0 }}>
                  <div className="contact-info-icon"><EmailIcon size={24} /></div>
                  <div className="contact-info-content">
                    <h4>Email</h4>
                    <p>info@svijetzlata.hr</p>
                  </div>
                </div>
              </div>
              
              <div className="card" style={{ padding: '32px' }}>
                <h2 style={{ fontSize: '22px', color: '#d4a417', marginBottom: '24px' }}>Radno vrijeme</h2>
                <div className="hours-row">
                  <span className="text-gray-400">Ponedjeljak - Petak</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="hours-row">
                  <span className="text-gray-400">Subota</span>
                  <span>09:00 - 14:00</span>
                </div>
                <div className="hours-row">
                  <span className="text-gray-400">Nedjelja</span>
                  <span style={{ color: '#f87171' }}>Zatvoreno</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
