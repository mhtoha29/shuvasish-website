'use client';
import { useEffect, useRef, useState } from 'react';

const IDENTITIES = [
  {
    key: 'engineer',
    label: 'THE ENGINEER',
    color: '#4a9eff',
    desc: 'Precision. Systems. Structure. 14+ years of building from blueprints. Every output engineered to last.',
    stat: '350 PEOPLE LED',
    wave: (x: number, t: number) => Math.sign(Math.sin(x * 0.08 + t)) * 22, // square wave
  },
  {
    key: 'changemaker',
    label: 'THE CHANGEMAKER',
    color: '#2ecc71',
    desc: 'Clean energy. Carbon markets. Rural Bangladesh connected to global impact. SDG Champion. Asia Marketeer 2025.',
    stat: 'SDG CHAMPION',
    wave: (x: number, t: number) => Math.sin(x * 0.025 + t * 0.7) * 25, // slow sine
  },
  {
    key: 'creator',
    label: 'THE CREATOR',
    color: '#e74c3c',
    desc: 'Sound waves and viral content. Baap Ka Beta. 288K fans. Original songs. Authenticity over perfection.',
    stat: '288K COMMUNITY',
    wave: (x: number, t: number) => Math.sin(x * 0.07 + t) * 18 + Math.sin(x * 0.13 + t * 1.5) * 10, // erratic
  },
  {
    key: 'father',
    label: 'THE FATHER',
    color: '#f39c12',
    desc: 'Rituraj. The Guinness kid. The one who taught a father what legacy truly means.',
    stat: 'RITURAJ\'S DAD',
    wave: (x: number, t: number) => { // heartbeat
      const mod = x % 80;
      if (mod < 5) return mod * 5;
      if (mod < 10) return (10 - mod) * 10;
      if (mod < 15) return -(mod - 10) * 8;
      if (mod < 20) return (20 - mod) * 8;
      return Math.sin(t * 0.5) * 3;
    },
  },
];

export default function Frequency() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cy = canvas.height / 2;
      const activeId = activeRef.current;

      // Phosphor background glow
      ctx.fillStyle = 'rgba(3,13,30,0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scanline effect
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.fillRect(0, y, canvas.width, 1);
      }

      IDENTITIES.forEach((id, idx) => {
        const yOffset = (idx - 1.5) * 50;
        const isActive = activeId === id.key;
        const alpha = activeId ? (isActive ? 1 : 0.12) : 0.5;

        ctx.beginPath();
        ctx.strokeStyle = id.color;
        ctx.lineWidth = isActive ? 2.5 : 1;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = isActive ? 12 : 4;
        ctx.shadowColor = id.color;

        for (let x = 0; x < canvas.width; x++) {
          const y = cy + yOffset + id.wave(x, t * (1 + idx * 0.15));
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      t += 0.04;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  const activeData = IDENTITIES.find(i => i.key === (active || hovered));

  return (
    <section
      id="frequency"
      className="section"
      style={{
        background: 'linear-gradient(180deg, #030d1e 0%, #020810 50%, #030d1e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="sec-label" style={{ color: 'var(--purple)', justifyContent: 'center', display: 'flex' }}>
            05 / THE FREQUENCY
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '12px' }}>
            Four Signals.<br /><span style={{ color: 'var(--purple)' }}>One Frequency.</span>
          </h2>
          <p style={{ fontSize: '13px', color: 'rgba(224,224,224,0.4)', letterSpacing: '1px' }}>
            Click a wave to isolate — hover to preview
          </p>
        </div>

        {/* Oscilloscope */}
        <div style={{
          position: 'relative',
          border: '1px solid rgba(155,89,182,0.2)',
          background: 'rgba(2,8,16,0.8)',
          marginBottom: '32px',
          overflow: 'hidden',
        }}>
          {/* Screen bezel */}
          <div className="annotation" style={{
            position: 'absolute', top: 10, left: 16, zIndex: 2,
            color: 'rgba(155,89,182,0.4)',
          }}>
            OSCILLOSCOPE · IDENTITY.FREQ
          </div>
          <div className="annotation" style={{
            position: 'absolute', top: 10, right: 16, zIndex: 2,
            color: 'rgba(155,89,182,0.4)',
          }}>
            {active ? `CHANNEL: ${active.toUpperCase()}` : 'ALL CHANNELS'}
          </div>

          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '240px', display: 'block' }}
          />

          {/* Reset button */}
          {active && (
            <button
              onClick={() => setActive(null)}
              style={{
                position: 'absolute', bottom: 12, right: 12,
                background: 'rgba(155,89,182,0.1)',
                border: '1px solid rgba(155,89,182,0.3)',
                color: 'var(--purple)', padding: '4px 12px',
                fontSize: '9px', letterSpacing: '2px', cursor: 'none',
              }}
            >
              ALL CHANNELS
            </button>
          )}
        </div>

        {/* Identity buttons */}
        <div className="rg-4" style={{ gap: '12px', marginBottom: '32px' }}>
          {IDENTITIES.map(id => (
            <button
              key={id.key}
              onClick={() => setActive(a => a === id.key ? null : id.key)}
              onMouseEnter={() => setHovered(id.key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: active === id.key ? `${id.color}18` : 'rgba(10,15,30,0.6)',
                border: `1px solid ${active === id.key ? id.color : `${id.color}30`}`,
                padding: '16px 12px',
                cursor: 'none',
                transition: 'all 0.3s',
                textAlign: 'left',
              }}
            >
              {/* Mini wave preview */}
              <svg width="100%" height="24" style={{ display: 'block', marginBottom: '8px' }}>
                <polyline
                  points={Array.from({ length: 20 }, (_, i) => {
                    const x = (i / 19) * 100 + '%';
                    const y = 12 + id.wave(i * 8, 0) * 0.4;
                    return `${(i / 19) * 100}% ${Math.max(2, Math.min(22, y))}`;
                  }).join(' ')}
                  fill="none"
                  stroke={id.color}
                  strokeWidth="1.5"
                  opacity="0.7"
                />
              </svg>
              <div style={{ fontSize: '9px', fontWeight: 700, color: id.color, letterSpacing: '2px', marginBottom: '3px' }}>
                {id.label}
              </div>
              <div className="annotation" style={{ color: id.color, opacity: 0.4 }}>{id.stat}</div>
            </button>
          ))}
        </div>

        {/* Description panel */}
        <div style={{
          background: 'rgba(10,15,30,0.6)',
          border: `1px solid ${activeData ? activeData.color + '30' : 'rgba(155,89,182,0.1)'}`,
          padding: '24px 28px',
          minHeight: '80px',
          transition: 'border-color 0.3s',
        }}>
          {activeData ? (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{
                width: '3px', height: '48px',
                background: activeData.color,
                boxShadow: `0 0 8px ${activeData.color}`,
                flexShrink: 0,
              }} />
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: activeData.color, letterSpacing: '2px', marginBottom: '8px' }}>
                  {activeData.label}
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(224,224,224,0.7)', lineHeight: 1.8, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                  "{activeData.desc}"
                </p>
              </div>
            </div>
          ) : (
            <p style={{ fontSize: '12px', color: 'rgba(224,224,224,0.3)', letterSpacing: '1px', textAlign: 'center', lineHeight: 2 }}>
              SELECT A WAVEFORM TO ISOLATE ONE IDENTITY<br />
              ALL FOUR COMBINED = THE COMPLETE SIGNAL OF SHUVASISH BHOWMICK
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
