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
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: isMobile ? '0 20px' : '0 48px',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled || menuOpen ? 'rgba(2,10,22,0.96)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled && !menuOpen ? '1px solid rgba(79,142,245,0.08)' : '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s',
      }}>
        {/* Logo */}
        <div onClick={() => go('hero')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
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

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '2px' }}>
            {NAVS.map(n => (
              <button key={n.id} onClick={() => go(n.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: 500,
                color: active === n.id ? 'var(--white)' : 'rgba(240,244,255,0.70)',
                padding: '6px 10px',
                position: 'relative',
                transition: 'color 0.3s',
                fontFamily: 'var(--font-body)',
              }}>
                {n.label}
                {active === n.id && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: '10px', right: '10px',
                    height: '1.5px', background: 'var(--blue)',
                    boxShadow: '0 0 8px var(--blue)',
                  }} />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <a href="#connect" onClick={e => { e.preventDefault(); go('connect'); }}
            className="btn-primary" style={{ padding: '9px 22px', fontSize: '11px' }}>
            Book Session
          </a>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}
            aria-label="Menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: '24px', height: '2px',
                background: menuOpen ? 'var(--blue)' : 'var(--white)',
                borderRadius: '1px',
                transition: 'all 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 7px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px, -7px)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile full-screen menu */}
      {isMobile && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(1, 6, 18, 0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex', flexDirection: 'column',
          paddingTop: '96px', paddingLeft: '32px', paddingRight: '32px', paddingBottom: '48px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.77,0,0.175,1)',
          overflowY: 'auto',
        }}>
          {NAVS.map((n, i) => (
            <button key={n.id} onClick={() => go(n.id)} style={{
              background: 'none', border: 'none',
              borderBottom: '1px solid rgba(79,142,245,0.07)',
              padding: '16px 0',
              textAlign: 'left', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '16px',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
              transition: `opacity 0.4s ${i * 0.05}s, transform 0.4s ${i * 0.05}s`,
            }}>
              <span style={{ fontSize: '10px', color: 'var(--blue)', fontFamily: 'monospace', letterSpacing: '1px', minWidth: '24px' }}>
                0{i + 1}
              </span>
              <span style={{
                fontSize: '20px', fontWeight: 700,
                fontFamily: 'var(--font-display)',
                color: active === n.id ? 'var(--blue)' : 'var(--white)',
                letterSpacing: '1px',
              }}>
                {n.label.toUpperCase()}
              </span>
            </button>
          ))}
          <a href="#connect"
            onClick={e => { e.preventDefault(); go('connect'); }}
            className="btn-primary"
            style={{
              marginTop: '32px', justifyContent: 'center',
              opacity: menuOpen ? 1 : 0,
              transition: 'opacity 0.4s 0.45s',
            }}
          >
            Book a Session
          </a>
        </div>
      )}

      {/* Progress bar */}
      <div style={{
        position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 998,
        height: '2px', background: 'rgba(79,142,245,0.06)',
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
