'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { LogoIcon, ChartIcon, QuestionIcon, MailIcon, GoldBarIcon, SilverBarIcon, ScaleIcon } from '@/components/Icons';

// Animated Background Component
function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    r: number;
    opacity: number;
    cx: string;
    cy: string;
    opacityValues: string;
    cxDur: string;
    cyDur: string;
    opacityDur: string;
  }>>([]);

  const [lines, setLines] = useState<Array<{
    id: number;
    x1: string;
    y1: string;
    x2: string;
    y2: string;
    x1Dur: string;
    y1Dur: string;
    x2Dur: string;
    y2Dur: string;
    opacityDur: string;
  }>>([]);

  const [orbs, setOrbs] = useState<Array<{
    id: number;
    r: number;
    cx: string;
    cy: string;
    rValues: string;
    cxDur: string;
    cyDur: string;
    rDur: string;
  }>>([]);

  useEffect(() => {
    // Generate particles on client only
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      r: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      cx: `${Math.random() * 1920};${Math.random() * 1920};${Math.random() * 1920}`,
      cy: `${Math.random() * 1080};${Math.random() * 1080};${Math.random() * 1080}`,
      opacityValues: `${Math.random() * 0.3 + 0.1};${Math.random() * 0.6 + 0.3};${Math.random() * 0.3 + 0.1}`,
      cxDur: `${Math.random() * 20 + 30}s`,
      cyDur: `${Math.random() * 20 + 25}s`,
      opacityDur: `${Math.random() * 5 + 3}s`,
    }));
    setParticles(newParticles);

    // Generate lines
    const newLines = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x1: `${Math.random() * 1920};${Math.random() * 1920};${Math.random() * 1920}`,
      y1: `${Math.random() * 1080};${Math.random() * 1080};${Math.random() * 1080}`,
      x2: `${Math.random() * 1920};${Math.random() * 1920};${Math.random() * 1920}`,
      y2: `${Math.random() * 1080};${Math.random() * 1080};${Math.random() * 1080}`,
      x1Dur: `${Math.random() * 30 + 40}s`,
      y1Dur: `${Math.random() * 25 + 35}s`,
      x2Dur: `${Math.random() * 35 + 45}s`,
      y2Dur: `${Math.random() * 30 + 40}s`,
      opacityDur: `${Math.random() * 8 + 4}s`,
    }));
    setLines(newLines);

    // Generate orbs
    const newOrbs = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      r: Math.random() * 8 + 4,
      cx: `${Math.random() * 1920};${Math.random() * 1920};${Math.random() * 1920}`,
      cy: `${Math.random() * 1080};${Math.random() * 1080};${Math.random() * 1080}`,
      rValues: `${Math.random() * 5 + 3};${Math.random() * 10 + 6};${Math.random() * 5 + 3}`,
      cxDur: `${Math.random() * 40 + 50}s`,
      cyDur: `${Math.random() * 35 + 45}s`,
      rDur: `${Math.random() * 6 + 4}s`,
    }));
    setOrbs(newOrbs);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="animated-bg">
      <svg className="animated-bg-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="particleGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4a417" stopOpacity="1"/>
            <stop offset="100%" stopColor="#d4a417" stopOpacity="0"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Floating particles */}
        {particles.map((p) => (
          <circle
            key={`particle-${p.id}`}
            r={p.r}
            fill="url(#particleGrad)"
            filter="url(#glow)"
            opacity={p.opacity}
          >
            <animate attributeName="cx" values={p.cx} dur={p.cxDur} repeatCount="indefinite" />
            <animate attributeName="cy" values={p.cy} dur={p.cyDur} repeatCount="indefinite" />
            <animate attributeName="opacity" values={p.opacityValues} dur={p.opacityDur} repeatCount="indefinite" />
          </circle>
        ))}
        
        {/* Connecting lines */}
        {lines.map((l) => (
          <line
            key={`line-${l.id}`}
            stroke="#d4a417"
            strokeWidth="0.5"
            opacity="0.1"
          >
            <animate attributeName="x1" values={l.x1} dur={l.x1Dur} repeatCount="indefinite" />
            <animate attributeName="y1" values={l.y1} dur={l.y1Dur} repeatCount="indefinite" />
            <animate attributeName="x2" values={l.x2} dur={l.x2Dur} repeatCount="indefinite" />
            <animate attributeName="y2" values={l.y2} dur={l.y2Dur} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.05;0.15;0.05" dur={l.opacityDur} repeatCount="indefinite" />
          </line>
        ))}
        
        {/* Orbiting rings */}
        <g transform="translate(960, 400)">
          <ellipse rx="300" ry="100" fill="none" stroke="#d4a417" strokeWidth="0.5" opacity="0.1">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite" />
          </ellipse>
          <ellipse rx="400" ry="150" fill="none" stroke="#d4a417" strokeWidth="0.3" opacity="0.08">
            <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="80s" repeatCount="indefinite" />
          </ellipse>
          <ellipse rx="500" ry="200" fill="none" stroke="#d4a417" strokeWidth="0.3" opacity="0.05">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="100s" repeatCount="indefinite" />
          </ellipse>
        </g>
        
        {/* Larger glowing orbs */}
        {orbs.map((o) => (
          <circle
            key={`orb-${o.id}`}
            r={o.r}
            fill="none"
            stroke="#d4a417"
            strokeWidth="1"
            opacity="0.15"
            filter="url(#glow)"
          >
            <animate attributeName="cx" values={o.cx} dur={o.cxDur} repeatCount="indefinite" />
            <animate attributeName="cy" values={o.cy} dur={o.cyDur} repeatCount="indefinite" />
            <animate attributeName="r" values={o.rValues} dur={o.rDur} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-logo pulse-gold">
        <LogoIcon size={160} />
      </div>
      <h1 className="loading-title gold-shimmer">Svijet Zlata</h1>
      <p className="loading-subtitle">Otkup zlata i srebra</p>
      <div className="loading-bar">
        <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="loading-percent">{progress}%</p>
    </div>
  );
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const handleLoadComplete = () => {
    setLoading(false);
    setTimeout(() => setVisible(true), 50);
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      
      <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navigation />
        
        <main style={{ paddingTop: '80px', position: 'relative' }}>
          <AnimatedBackground />
          
          {/* Hero Section */}
          <section style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
            <div className="container text-center">
              <div className="fade-in">
                <div style={{ marginBottom: '32px' }}>
                  <LogoIcon size={140} />
                </div>
                
                <h1 style={{ fontSize: 'clamp(36px, 8vw, 72px)', marginBottom: '24px' }}>
                  <span className="gold-shimmer">Svijet Zlata</span>
                </h1>
                
                <p style={{ fontSize: '20px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto 48px', lineHeight: '1.7' }}>
                  Vaš pouzdani partner za otkup i prodaju zlata i srebra. 
                  Najbolje cijene, brza isplata, profesionalna usluga.
                </p>
                
                {/* Action Cards */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', marginBottom: '64px' }}>
                  <Link href="/kupujem">
                    <div className="action-card action-card-gold">
                      <div className="action-card-inner">
                        <svg width="80" height="80" viewBox="0 0 48 48" fill="none">
                          <defs>
                            <linearGradient id="actionGold1" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#fcd34d" />
                              <stop offset="100%" stopColor="#b8860b" />
                            </linearGradient>
                          </defs>
                          <circle cx="24" cy="24" r="20" fill="#141414" stroke="url(#actionGold1)" strokeWidth="2"/>
                          <path d="M24 14V34M14 24H34" stroke="url(#actionGold1)" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                        <span className="action-card-title" style={{ color: '#fbbf24' }}>Kupujem</span>
                        <span className="action-card-subtitle">Otkup vašeg zlata i srebra</span>
                      </div>
                    </div>
                  </Link>
                  
                  <Link href="/inventory">
                    <div className="action-card action-card-gold-dark">
                      <div className="action-card-inner">
                        <svg width="80" height="80" viewBox="0 0 48 48" fill="none">
                          <defs>
                            <linearGradient id="actionGold2" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#d4a417" />
                              <stop offset="100%" stopColor="#92400e" />
                            </linearGradient>
                          </defs>
                          <circle cx="24" cy="24" r="20" fill="#141414" stroke="url(#actionGold2)" strokeWidth="2"/>
                          <path d="M14 24H34" stroke="url(#actionGold2)" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                        <span className="action-card-title" style={{ color: '#d4a417' }}>Prodajem</span>
                        <span className="action-card-subtitle">Pregledaj naš inventar</span>
                      </div>
                    </div>
                  </Link>
                </div>
                
                {/* Feature Cards */}
                <div className="grid grid-3 gap-6" style={{ maxWidth: '900px', margin: '0 auto' }}>
                  <Link href="/cjenik">
                    <div className="card text-center" style={{ padding: '32px 24px' }}>
                      <div style={{ marginBottom: '16px' }}><ChartIcon size={48} /></div>
                      <h3 style={{ fontSize: '20px', color: '#d4a417', marginBottom: '8px' }}>Cjenik Zlata</h3>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>Pratite trenutne cijene u realnom vremenu</p>
                    </div>
                  </Link>
                  
                  <Link href="/faq">
                    <div className="card text-center" style={{ padding: '32px 24px' }}>
                      <div style={{ marginBottom: '16px' }}><QuestionIcon size={48} /></div>
                      <h3 style={{ fontSize: '20px', color: '#d4a417', marginBottom: '8px' }}>FAQ</h3>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>Odgovori na najčešća pitanja</p>
                    </div>
                  </Link>
                  
                  <Link href="/kontakt">
                    <div className="card text-center" style={{ padding: '32px 24px' }}>
                      <div style={{ marginBottom: '16px' }}><MailIcon size={48} /></div>
                      <h3 style={{ fontSize: '20px', color: '#d4a417', marginBottom: '8px' }}>Kontakt</h3>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>Javite nam se za besplatnu procjenu</p>
                    </div>
                  </Link>
                </div>
                
                {/* Trust Indicators */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px', marginTop: '64px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9ca3af' }}>
                    <GoldBarIcon size={32} />
                    <span>Certificirano zlato</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9ca3af' }}>
                    <SilverBarIcon size={32} />
                    <span>Kvalitetno srebro</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9ca3af' }}>
                    <ScaleIcon size={32} />
                    <span>Precizno mjerenje</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
