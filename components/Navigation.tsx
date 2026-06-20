'use client';
import { useEffect, useState } from 'react';

const NAVS = [
  { id: 'hero', label: 'Home' },
  { id: 'engineer', label: 'Engineer' },
  { id: 'energy', label: 'Impact' },
  { id: 'baapkabeta', label: 'Music' },
  { id: 'speaker', label: 'Speaker' },
  { id: 'frequency', label: 'Frequency' },
  { id: 'content', label: 'Media' },
  { id: 'connect', label: 'Connect' },
];

export default function Navigation() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
      setScrolled(window.scrollY > 60);
      for (const s of NAVS) {
        const el = document.getElementById(s.id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= window.innerHeight * 0.5 && bottom >= window.innerHeight * 0.5) {
            setActive(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 48px',
        height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(2,10,22,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(79,142,245,0.08)' : '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
      }}>
        {/* Logo */}
        <div
          onClick={() => go('hero')}
          style={{ cursor: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div style={{
            width: '28px', height: '28px',
            border: '1.5px solid var(--blue)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, color: 'var(--blue)',
            fontFamily: 'var(--font-display)',
          }}>S</div>
          <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: 'var(--white)', fontFamily: 'var(--font-display)' }}>
            SHUVASISH
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {NAVS.map(n => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              style={{
                background: 'none', border: 'none', cursor: 'none',
                fontSize: '12px', fontWeight: 500,
                color: active === n.id ? 'var(--white)' : 'var(--dim)',
                padding: '6px 12px',
                position: 'relative',
                transition: 'color 0.3s',
                fontFamily: 'var(--font-body)',
              }}
            >
              {n.label}
              {active === n.id && (
                <div style={{
                  position: 'absolute', bottom: 0, left: '12px', right: '12px',
                  height: '1.5px', background: 'var(--blue)',
                  boxShadow: '0 0 8px var(--blue)',
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Book CTA */}
        <a
          href="#connect"
          onClick={e => { e.preventDefault(); go('connect'); }}
          className="btn-primary"
          style={{ padding: '9px 22px', fontSize: '11px' }}
        >
          Book Session
        </a>
      </nav>

      {/* Progress bar */}
      <div style={{
        position: 'fixed', top: '68px', left: 0, right: 0, zIndex: 999,
        height: '2px', background: 'rgba(79,142,245,0.08)',
      }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: 'linear-gradient(90deg, var(--blue), var(--green))',
          boxShadow: '0 0 8px var(--blue)',
          transition: 'width 0.1s',
        }} />
      </div>
    </>
  );
}
