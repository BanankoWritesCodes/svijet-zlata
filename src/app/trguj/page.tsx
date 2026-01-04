'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { TradingIcon } from '@/components/Icons';

type Metal = 'XAU' | 'XAG' | 'XPT' | 'XPD';
type Currency = 'EUR' | 'USD';
type OrderType = 'market' | 'limit';
type TimeFrame = '1s' | '1m' | '5m' | '15m' | '1h' | '4h' | '1d';

interface PriceData {
  time: number;
  price: number;
}

interface Position {
  id: string;
  metal: Metal;
  currency: Currency;
  type: 'long' | 'short';
  amount: number;
  leverage: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  openedAt: number;
}

const metalInfo: Record<Metal, { name: string; basePriceEUR: number; basePriceUSD: number; color: string }> = {
  XAU: { name: 'Zlato', basePriceEUR: 2650, basePriceUSD: 2890, color: '#d4a417' },
  XAG: { name: 'Srebro', basePriceEUR: 30.5, basePriceUSD: 33.2, color: '#c0c0c0' },
  XPT: { name: 'Platina', basePriceEUR: 980, basePriceUSD: 1068, color: '#e5e5e5' },
  XPD: { name: 'Paladij', basePriceEUR: 1050, basePriceUSD: 1145, color: '#b8b8b8' },
};

const allPairs: { metal: Metal; currency: Currency; label: string }[] = [
  { metal: 'XAU', currency: 'EUR', label: 'XAU/EUR - Zlato/Euro' },
  { metal: 'XAU', currency: 'USD', label: 'XAU/USD - Zlato/Dolar' },
  { metal: 'XAG', currency: 'EUR', label: 'XAG/EUR - Srebro/Euro' },
  { metal: 'XAG', currency: 'USD', label: 'XAG/USD - Srebro/Dolar' },
  { metal: 'XPT', currency: 'EUR', label: 'XPT/EUR - Platina/Euro' },
  { metal: 'XPT', currency: 'USD', label: 'XPT/USD - Platina/Dolar' },
  { metal: 'XPD', currency: 'EUR', label: 'XPD/EUR - Paladij/Euro' },
  { metal: 'XPD', currency: 'USD', label: 'XPD/USD - Paladij/Dolar' },
];

const timeframes: { value: TimeFrame; label: string; intervalMs: number; historyPoints: number }[] = [
  { value: '1s', label: '1s', intervalMs: 1000, historyPoints: 60 },
  { value: '1m', label: '1m', intervalMs: 1000, historyPoints: 60 },
  { value: '5m', label: '5m', intervalMs: 5000, historyPoints: 60 },
  { value: '15m', label: '15m', intervalMs: 15000, historyPoints: 60 },
  { value: '1h', label: '1h', intervalMs: 60000, historyPoints: 60 },
  { value: '4h', label: '4h', intervalMs: 240000, historyPoints: 60 },
  { value: '1d', label: '1d', intervalMs: 1440000, historyPoints: 30 },
];

const POSITIONS_STORAGE_KEY = 'svijet-zlata-positions';

export default function TradingPage() {
  const [selectedPair, setSelectedPair] = useState('XAU/EUR');
  const [orderType, setOrderType] = useState<OrderType>('market');
  const [amount, setAmount] = useState('100');
  const [leverage, setLeverage] = useState(10);
  const [limitPrice, setLimitPrice] = useState('');
  const [timeframe, setTimeframe] = useState<TimeFrame>('1m');
  const [currentPrice, setCurrentPrice] = useState(metalInfo.XAU.basePriceEUR);
  const [priceChange, setPriceChange] = useState(0);
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const [selectedMetal, selectedCurrency] = selectedPair.split('/') as [Metal, Currency];

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem(POSITIONS_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPositions(parsed);
      } catch (e) {
        console.error('Failed to parse saved positions:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (isClient && positions.length >= 0) {
      localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(positions));
    }
  }, [positions, isClient]);

  const currentTimeframeConfig = timeframes.find(t => t.value === timeframe) || timeframes[1];

  useEffect(() => {
    const basePrice = selectedCurrency === 'EUR' 
      ? metalInfo[selectedMetal].basePriceEUR 
      : metalInfo[selectedMetal].basePriceUSD;
    const history: PriceData[] = [];
    let price = basePrice;
    const now = Date.now();
    
    for (let i = currentTimeframeConfig.historyPoints; i >= 0; i--) {
      price = price * (1 + (Math.random() - 0.5) * 0.002);
      history.push({ 
        time: now - i * currentTimeframeConfig.intervalMs, 
        price 
      });
    }
    
    setPriceHistory(history);
    setCurrentPrice(history[history.length - 1].price);
  }, [selectedMetal, selectedCurrency, timeframe, currentTimeframeConfig.historyPoints, currentTimeframeConfig.intervalMs]);

  useEffect(() => {
    const updateInterval = timeframe === '1s' ? 1000 : 
                          timeframe === '1m' ? 1000 :
                          timeframe === '5m' ? 2000 :
                          timeframe === '15m' ? 3000 :
                          timeframe === '1h' ? 5000 :
                          timeframe === '4h' ? 10000 : 15000;

    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const volatility = timeframe === '1s' ? 0.0005 :
                          timeframe === '1m' ? 0.001 :
                          timeframe === '5m' ? 0.002 :
                          timeframe === '15m' ? 0.003 :
                          timeframe === '1h' ? 0.005 :
                          timeframe === '4h' ? 0.008 : 0.01;
        
        const change = (Math.random() - 0.5) * volatility;
        const newPrice = prev * (1 + change);
        setPriceChange(change * 100);
        
        setPriceHistory(history => {
          const newHistory = [...history.slice(-(currentTimeframeConfig.historyPoints - 1)), { 
            time: Date.now(), 
            price: newPrice 
          }];
          return newHistory;
        });
        
        setPositions(pos => pos.map(p => {
          if (p.metal === selectedMetal && p.currency === selectedCurrency) {
            const priceDiff = newPrice - p.entryPrice;
            const direction = p.type === 'long' ? 1 : -1;
            const pnl = direction * priceDiff * (p.amount / p.entryPrice) * p.leverage;
            const pnlPercent = (pnl / p.amount) * 100;
            return { ...p, currentPrice: newPrice, pnl, pnlPercent };
          }
          return p;
        }));
        
        return newPrice;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [selectedMetal, selectedCurrency, timeframe, currentTimeframeConfig.historyPoints]);

  const getChartDimensions = () => {
    const width = 800;
    const height = 400;
    const padding = { top: 40, right: 80, bottom: 50, left: 60 };
    return { width, height, padding };
  };

  const generateChartPath = () => {
    if (priceHistory.length < 2) return '';
    const { width, height, padding } = getChartDimensions();
    const minPrice = Math.min(...priceHistory.map(d => d.price)) * 0.999;
    const maxPrice = Math.max(...priceHistory.map(d => d.price)) * 1.001;
    const priceRange = maxPrice - minPrice || 1;
    
    const points = priceHistory.map((d, i) => {
      const x = padding.left + (i / (priceHistory.length - 1)) * (width - padding.left - padding.right);
      const y = height - padding.bottom - ((d.price - minPrice) / priceRange) * (height - padding.top - padding.bottom);
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  const generateAreaPath = () => {
    if (priceHistory.length < 2) return '';
    const { width, height, padding } = getChartDimensions();
    const minPrice = Math.min(...priceHistory.map(d => d.price)) * 0.999;
    const maxPrice = Math.max(...priceHistory.map(d => d.price)) * 1.001;
    const priceRange = maxPrice - minPrice || 1;
    
    const points = priceHistory.map((d, i) => {
      const x = padding.left + (i / (priceHistory.length - 1)) * (width - padding.left - padding.right);
      const y = height - padding.bottom - ((d.price - minPrice) / priceRange) * (height - padding.top - padding.bottom);
      return `${x},${y}`;
    });
    
    const lastX = width - padding.right;
    const firstX = padding.left;
    const bottomY = height - padding.bottom;
    return `M ${firstX},${bottomY} L ${points.join(' L ')} L ${lastX},${bottomY} Z`;
  };

  const getPriceY = (price: number) => {
    if (priceHistory.length < 2) return 200;
    const { height, padding } = getChartDimensions();
    const minPrice = Math.min(...priceHistory.map(d => d.price)) * 0.999;
    const maxPrice = Math.max(...priceHistory.map(d => d.price)) * 1.001;
    const priceRange = maxPrice - minPrice || 1;
    return height - padding.bottom - ((price - minPrice) / priceRange) * (height - padding.top - padding.bottom);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    if (timeframe === '1s' || timeframe === '1m') {
      return date.toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } else if (timeframe === '5m' || timeframe === '15m' || timeframe === '1h') {
      return date.toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('hr-HR', { day: '2-digit', month: '2-digit' });
    }
  };

  const openPosition = (type: 'long' | 'short') => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return;
    
    const newPosition: Position = {
      id: Date.now().toString(),
      metal: selectedMetal,
      currency: selectedCurrency,
      type,
      amount: amountNum,
      leverage,
      entryPrice: currentPrice,
      currentPrice,
      pnl: 0,
      pnlPercent: 0,
      openedAt: Date.now(),
    };
    setPositions(prev => [...prev, newPosition]);
  };

  const closePosition = (id: string) => {
    setPositions(prev => prev.filter(p => p.id !== id));
  };

  const positionSize = parseFloat(amount) * leverage || 0;
  const currencySymbol = selectedCurrency === 'EUR' ? '€' : '$';
  const currentPositions = positions.filter(p => p.metal === selectedMetal && p.currency === selectedCurrency);

  const timeLabels = priceHistory.length > 0 ? [
    priceHistory[0],
    priceHistory[Math.floor(priceHistory.length / 4)],
    priceHistory[Math.floor(priceHistory.length / 2)],
    priceHistory[Math.floor(priceHistory.length * 3 / 4)],
    priceHistory[priceHistory.length - 1],
  ] : [];

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-16" style={{ minHeight: '100vh' }}>
        <div className="container">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <TradingIcon size={48} />
              <h1 className="text-4xl gold-shimmer">Trgovanje</h1>
            </div>
            <p className="text-gray-400">Trgujte plemenitim metalima s polugom do 500x</p>
            {positions.length > 0 && (
              <p className="text-sm mt-2" style={{ color: '#d4a417' }}>
                📊 {positions.length} aktivn{positions.length === 1 ? 'a' : 'e'} pozicij{positions.length === 1 ? 'a' : 'e'} (lokalno spremljeno)
              </p>
            )}
          </div>

          <div className="trading-container">
            <div className="trading-panel">
              <div className="trading-panel-header">
                <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Nova Pozicija</h2>
              </div>

              <div className="trading-input-group">
                <div className="trading-input-label">
                  <span>Trgovinski par</span>
                </div>
                <select
                  className="form-select"
                  value={selectedPair}
                  onChange={e => setSelectedPair(e.target.value)}
                  style={{ fontSize: '16px', fontWeight: '600', padding: '14px 48px 14px 16px', background: '#1a1a1a', border: '1px solid rgba(212, 164, 23, 0.3)' }}
                >
                  {allPairs.map(pair => (
                    <option key={`${pair.metal}/${pair.currency}`} value={`${pair.metal}/${pair.currency}`}>
                      {pair.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="order-type-tabs">
                <button className={`order-type-tab ${orderType === 'market' ? 'active' : ''}`} onClick={() => setOrderType('market')}>Market</button>
                <button className={`order-type-tab ${orderType === 'limit' ? 'active' : ''}`} onClick={() => setOrderType('limit')}>Limit</button>
              </div>

              <div className="trading-input-group">
                <div className="trading-input-label">
                  <span>Iznos</span>
                  <span style={{ color: '#6b7280' }}>Dostupno: {currencySymbol}5,420.50</span>
                </div>
                <div className="trading-input-wrapper">
                  <input type="number" className="trading-input" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" />
                  <span className="trading-input-suffix">{selectedCurrency}</span>
                </div>
              </div>

              {orderType === 'limit' && (
                <div className="trading-input-group">
                  <div className="trading-input-label">
                    <span>Limit Cijena</span>
                    <span style={{ color: '#d4a417' }}>Trenutna: {currencySymbol}{currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="trading-input-wrapper">
                    <input type="number" className="trading-input" value={limitPrice} onChange={e => setLimitPrice(e.target.value)} placeholder={currentPrice.toFixed(2)} />
                    <span className="trading-input-suffix">{selectedCurrency}</span>
                  </div>
                </div>
              )}

              <div className="leverage-slider-container">
                <div className="trading-input-label"><span>Poluga (Leverage)</span></div>
                <div className="leverage-value">{leverage}x</div>
                <input type="range" className="leverage-slider" min="1" max="500" value={leverage} onChange={e => setLeverage(parseInt(e.target.value))} />
                <div className="leverage-marks"><span>1x</span><span>100x</span><span>250x</span><span>500x</span></div>
              </div>

              <div className="position-info">
                <div className="position-row"><span>Veličina pozicije</span><span style={{ color: '#fff', fontWeight: '600' }}>{currencySymbol}{positionSize.toLocaleString()}</span></div>
                <div className="position-row"><span>Likvidacijska cijena</span><span style={{ color: '#ef4444' }}>{currencySymbol}{(currentPrice * (1 - 1/leverage)).toFixed(2)}</span></div>
                <div className="position-row"><span>Naknada</span><span>{currencySymbol}{(positionSize * 0.001).toFixed(2)}</span></div>
              </div>

              <div className="buy-sell-buttons" style={{ marginTop: '20px' }}>
                <button className="btn-buy" onClick={() => openPosition('long')}>Long / Kupi</button>
                <button className="btn-sell" onClick={() => openPosition('short')}>Short / Prodaj</button>
              </div>
            </div>

            <div className="chart-container">
              <div className="chart-header">
                <div className="chart-metal-info">
                  <div>
                    <div className="chart-metal-name">{selectedPair}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <span className="chart-metal-price">{currencySymbol}{currentPrice.toFixed(2)}</span>
                      <span className={`chart-metal-change ${priceChange >= 0 ? 'up' : 'down'}`}>
                        {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(3)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="timeframe-selector">
                  {timeframes.map(tf => (
                    <button key={tf.value} className={`timeframe-btn ${timeframe === tf.value ? 'active' : ''}`} onClick={() => setTimeframe(tf.value)}>{tf.label}</button>
                  ))}
                </div>
              </div>
              
              <div className="chart-canvas">
                <svg viewBox="0 0 800 400" className="chart-svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={metalInfo[selectedMetal].color} stopOpacity="0.3"/>
                      <stop offset="100%" stopColor={metalInfo[selectedMetal].color} stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  {[0, 1, 2, 3, 4].map(i => (
                    <line key={`h-${i}`} x1="60" y1={40 + i * 70} x2="720" y2={40 + i * 70} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  ))}
                  
                  {timeLabels.map((data, i) => {
                    const { width, padding } = getChartDimensions();
                    const x = padding.left + (i / 4) * (width - padding.left - padding.right);
                    return (
                      <text key={`time-${i}`} x={x} y={390} textAnchor="middle" fontSize="10" fill="#6b7280">
                        {data && formatTime(data.time)}
                      </text>
                    );
                  })}
                  
                  <path d={generateAreaPath()} fill="url(#chartGradient)" />
                  <path d={generateChartPath()} fill="none" stroke={metalInfo[selectedMetal].color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                  {currentPositions.map(position => {
                    const entryY = getPriceY(position.entryPrice);
                    const isProfit = position.pnl >= 0;
                    
                    return (
                      <g key={position.id}>
                        <line x1="60" y1={entryY} x2="720" y2={entryY} stroke={position.type === 'long' ? '#22c55e' : '#ef4444'} strokeWidth="1" strokeDasharray="6,4" opacity="0.7" />
                        <g style={{ cursor: 'pointer' }} onMouseEnter={() => setHoveredPosition(position.id)} onMouseLeave={() => setHoveredPosition(null)} onClick={() => closePosition(position.id)}>
                          <rect x="60" y={entryY - 14} width={hoveredPosition === position.id ? 100 : 70} height="28" rx="4" fill={position.type === 'long' ? '#22c55e' : '#ef4444'} />
                          <text x={hoveredPosition === position.id ? 110 : 95} y={entryY + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="#000">
                            {hoveredPosition === position.id ? 'MARKET CLOSE' : `${position.type.toUpperCase()} ${position.leverage}x`}
                          </text>
                        </g>
                        <rect x="630" y={entryY - 12} width="85" height="24" rx="4" fill={isProfit ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'} stroke={isProfit ? '#22c55e' : '#ef4444'} strokeWidth="1" />
                        <text x="672" y={entryY + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={isProfit ? '#22c55e' : '#ef4444'}>
                          {isProfit ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                        </text>
                      </g>
                    );
                  })}
                  
                  {priceHistory.length > 0 && (
                    <>
                      <line x1="60" y1={getPriceY(currentPrice)} x2="720" y2={getPriceY(currentPrice)} stroke={metalInfo[selectedMetal].color} strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
                      <rect x="715" y={getPriceY(currentPrice) - 12} width="80" height="24" rx="4" fill={metalInfo[selectedMetal].color} />
                      <text x="755" y={getPriceY(currentPrice) + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="#000">{currentPrice.toFixed(2)}</text>
                    </>
                  )}
                </svg>
              </div>
            </div>
          </div>

          {positions.length > 0 && (
            <div className="positions-panel">
              <div className="positions-header">
                <h3 className="positions-title">Otvorene Pozicije ({positions.length})</h3>
                <button onClick={() => { if (confirm('Jeste li sigurni da želite zatvoriti sve pozicije?')) { setPositions([]); } }} style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontSize: '13px' }}>
                  Zatvori sve
                </button>
              </div>
              
              {positions.map(position => (
                <div key={position.id} className="position-card">
                  <div className="position-card-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className={`position-type ${position.type}`}>{position.type === 'long' ? 'LONG' : 'SHORT'}</span>
                      <span style={{ fontWeight: '600' }}>{position.metal}/{position.currency}</span>
                      <span style={{ color: '#6b7280' }}>{position.leverage}x</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span className={`position-pnl ${position.pnl >= 0 ? 'positive' : 'negative'}`}>
                        {position.pnl >= 0 ? '+' : ''}{position.currency === 'EUR' ? '€' : '$'}{position.pnl.toFixed(2)} ({position.pnlPercent.toFixed(2)}%)
                      </span>
                      <button onClick={() => closePosition(position.id)} className="market-close-btn">Market Close</button>
                    </div>
                  </div>
                  <div className="position-details">
                    <div><div className="position-detail-label">Veličina</div><div className="position-detail-value">{position.currency === 'EUR' ? '€' : '$'}{(position.amount * position.leverage).toLocaleString()}</div></div>
                    <div><div className="position-detail-label">Ulazna cijena</div><div className="position-detail-value">{position.currency === 'EUR' ? '€' : '$'}{position.entryPrice.toFixed(2)}</div></div>
                    <div><div className="position-detail-label">Trenutna cijena</div><div className="position-detail-value">{position.currency === 'EUR' ? '€' : '$'}{position.currentPrice.toFixed(2)}</div></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
