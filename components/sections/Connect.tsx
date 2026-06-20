'use client';
import { useState } from 'react';
import Image from 'next/image';

const BOT_URL = 'https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/06/19/16/20260619163626-OFBBTMBF.json';

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const FBIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const IGIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const YTIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const SESSIONS = [
  {
    type: 'CONSULTATION',
    icon: '⊛',
    dur: '30 – 60 min',
    tagline: 'Strategy & Market Intelligence',
    desc: 'Business strategy, sustainability roadmaps, Bangladesh market entry, supply chain, and clean energy investment. Cut through the noise with someone who has done it.',
    c: 'var(--blue)',
    cRaw: '#4f8ef5',
    features: ['Business Strategy', 'Clean Energy Markets', 'Bangladesh Expansion', 'Supply Chain Advisory'],
  },
  {
    type: 'MENTORSHIP',
    icon: '◎',
    dur: '45 min',
    tagline: 'Career & Personal Branding',
    desc: 'Navigate your career, build your voice online, and learn how to make your professional life as compelling as your creative one. Honest, direct, no fluff.',
    c: 'var(--green)',
    cRaw: '#00e5a0',
    features: ['Career Navigation', 'Personal Branding', 'Content Strategy', 'Sustainable Career Paths'],
  },
  {
    type: 'PARTNERSHIP',
    icon: '◈',
    dur: '60 min',
    tagline: 'Collaboration & Joint Ventures',
    desc: 'Brand collaborations, ATEC sustainability projects, content creation partnerships, or booking Shuvasish as a keynote speaker for your event or platform.',
    c: 'var(--gold)',
    cRaw: '#ffd700',
    features: ['Brand Collaboration', 'ATEC Projects', 'Keynote Booking', 'Content Creation'],
  },
];

const SOCIALS = [
  { label: 'LinkedIn', sub: '37K+ Followers', color: '#0077b5', icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/shuvasish/' },
  { label: 'Facebook', sub: 'Personal Page', color: '#1877f2', icon: <FBIcon />, href: 'https://www.facebook.com/shuvasish.bhowmick/' },
  { label: 'Baap Ka Beta', sub: '288K Community', color: '#f59e0b', icon: <YTIcon />, href: 'https://www.facebook.com/baapkabeta2019' },
  { label: 'Instagram', sub: 'Stories & Reels', color: '#e1306c', icon: <IGIcon />, href: 'https://www.instagram.com/shuvasish/' },
];

function SessionCard({ s, idx }: { s: typeof SESSIONS[0]; idx: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered ? `${s.cRaw}08` : 'rgba(4,11,26,0.7)',
        border: `1px solid ${hovered ? s.cRaw + '40' : 'rgba(240,244,255,0.07)'}`,
        padding: '40px 32px',
        transition: 'all 0.35s ease',
        display: 'flex', flexDirection: 'column',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? `0 20px 60px ${s.cRaw}14` : 'none',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: hovered ? `linear-gradient(90deg, ${s.cRaw}, transparent)` : 'transparent',
        transition: 'background 0.35s',
      }} />

      {/* Duration badge */}
      <div style={{
        position: 'absolute', top: '20px', right: '20px',
        fontSize: '9px', letterSpacing: '2px', fontWeight: 700,
        color: s.c, fontFamily: 'var(--font-display)',
        padding: '4px 10px', border: `1px solid ${s.cRaw}30`,
        background: `${s.cRaw}0a`,
      }}>
        {s.dur}
      </div>

      {/* Icon */}
      <div style={{
        fontSize: '36px', color: s.c,
        marginBottom: '20px',
        textShadow: hovered ? `0 0 24px ${s.cRaw}` : 'none',
        transition: 'text-shadow 0.35s',
        lineHeight: 1,
      }}>
        {s.icon}
      </div>

      {/* Type */}
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700,
        letterSpacing: '4px', color: s.c, marginBottom: '6px',
      }}>
        {s.type}
      </div>

      {/* Tagline */}
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 1.8vw, 22px)', fontWeight: 800,
        color: '#fff', marginBottom: '20px', lineHeight: 1.25,
      }}>
        {s.tagline}
      </div>

      {/* Description */}
      <p style={{
        fontSize: '13px', color: 'rgba(220,228,255,0.55)', lineHeight: 1.85,
        marginBottom: '24px', flex: 1,
        fontFamily: 'var(--font-body)',
      }}>
        {s.desc}
      </p>

      {/* Features */}
      <div style={{ marginBottom: '32px' }}>
        {s.features.map((f, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '7px 0',
            borderBottom: i < s.features.length - 1 ? '1px solid rgba(240,244,255,0.05)' : 'none',
          }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: s.c, flexShrink: 0 }} />
            <div style={{ fontSize: '12px', color: 'rgba(220,228,255,0.5)' }}>{f}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href="https://cal.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          padding: '14px 24px',
          background: hovered ? s.cRaw : 'transparent',
          border: `1px solid ${s.cRaw}`,
          color: hovered ? '#000' : s.c,
          textDecoration: 'none',
          fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
          fontFamily: 'var(--font-display)',
          transition: 'all 0.3s',
        }}
      >
        BOOK SESSION
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  );
}

export default function Connect() {
  const [showBot, setShowBot] = useState(false);

  return (
    <section id="connect" className="section" style={{
      background: 'var(--bg)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="sec-number" style={{ color: 'rgba(157,111,255,0.035)' }}>07</div>
      <div className="blueprint-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

      {/* Glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(157,111,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Section heading */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="label" style={{ color: 'var(--purple)', display: 'block', marginBottom: '16px' }}>07 — Connect</div>
          <h2 className="display-lg" style={{ marginBottom: '20px' }}>
            Let&apos;s Build Something<br />
            <span style={{ color: 'var(--purple)' }}>Extraordinary.</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: '520px', margin: '0 auto' }}>
            Shuvasish takes <strong style={{ color: '#fff' }}>limited sessions per month</strong>. Reserve yours before the calendar fills.
          </p>
        </div>

        {/* Session cards — 3 col */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '80px' }}>
          {SESSIONS.map((s, i) => <SessionCard key={i} s={s} idx={i} />)}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '64px', opacity: 0.2 }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(240,244,255,0.15)' }} />
          <div className="mono" style={{ fontSize: '9px' }}>OR</div>
          <div style={{ flex: 1, height: '1px', background: 'rgba(240,244,255,0.15)' }} />
        </div>

        {/* Bottom row: AI + Socials */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>

          {/* Bhoumik AI */}
          <div>
            <div className="label" style={{ color: 'var(--purple)', display: 'block', marginBottom: '16px' }}>◉ Talk to Bhoumik AI</div>
            <p className="body-md" style={{ marginBottom: '24px', fontSize: '13px', lineHeight: 1.8 }}>
              Have a quick question before booking? Chat with the AI trained as Shuvasish himself — his knowledge, his voice, available 24/7.
            </p>

            {!showBot ? (
              <button
                onClick={() => setShowBot(true)}
                style={{
                  width: '100%', padding: '24px', cursor: 'none',
                  background: 'rgba(157,111,255,0.05)', border: '1px solid rgba(157,111,255,0.18)',
                  display: 'flex', alignItems: 'center', gap: '20px',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(157,111,255,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(157,111,255,0.35)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(157,111,255,0.05)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(157,111,255,0.18)'; }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden',
                  border: '1px solid rgba(157,111,255,0.4)', flexShrink: 0,
                  background: 'rgba(157,111,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Image src="/images/ai-logo.png" alt="Bhoumik AI" width={56} height={56}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Ask Bhoumik AI</div>
                  <div className="mono" style={{ color: 'rgba(157,111,255,0.6)', marginTop: '3px', fontSize: '9px' }}>
                    AI TRAINED AS SHUVASISH · CLICK TO OPEN
                  </div>
                </div>
                <div style={{ color: 'rgba(157,111,255,0.4)', fontSize: '20px' }}>→</div>
              </button>
            ) : (
              <div style={{ border: '1px solid rgba(157,111,255,0.2)' }}>
                <div style={{
                  background: 'rgba(157,111,255,0.08)', padding: '12px 18px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderBottom: '1px solid rgba(157,111,255,0.12)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(157,111,255,0.4)' }}>
                      <Image src="/images/ai-logo.png" alt="Bhoumik AI" width={28} height={28} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--purple)', letterSpacing: '2px' }}>BHOUMIK AI</span>
                  </div>
                  <button onClick={() => setShowBot(false)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'none', fontSize: '14px' }}>✕</button>
                </div>
                <iframe src={BOT_URL} width="100%" height="440" style={{ display: 'block', border: 'none' }} title="Bhoumik AI" />
              </div>
            )}
          </div>

          {/* Social links */}
          <div>
            <div className="label" style={{ display: 'block', marginBottom: '16px' }}>Find Shuvasish Online</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '16px 20px', textDecoration: 'none',
                    background: 'rgba(4,11,26,0.6)', border: '1px solid rgba(240,244,255,0.06)',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = s.color + '50'; el.style.background = s.color + '0c'; el.style.transform = 'translateX(5px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(240,244,255,0.06)'; el.style.background = 'rgba(4,11,26,0.6)'; el.style.transform = 'translateX(0)'; }}
                >
                  <div style={{ color: s.color, flexShrink: 0 }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{s.label}</div>
                    <div className="mono" style={{ fontSize: '8px', color: 'var(--dim)', marginTop: '2px' }}>{s.sub}</div>
                  </div>
                  <div style={{ fontSize: '10px', color: s.color, opacity: 0.5 }}>↗</div>
                </a>
              ))}
            </div>

            {/* Closing quote */}
            <div style={{
              border: '1px solid rgba(240,244,255,0.06)',
              borderLeft: '2px solid rgba(157,111,255,0.4)',
              padding: '20px 24px',
              background: 'rgba(157,111,255,0.03)',
            }}>
              <p className="body-md" style={{ fontSize: '13px', fontStyle: 'italic', lineHeight: 1.9, color: 'rgba(220,228,255,0.5)' }}>
                &ldquo;The next chapter isn&rsquo;t drawn yet. Let&rsquo;s design it together.&rdquo;
              </p>
              <div className="mono" style={{ marginTop: '10px', opacity: 0.25, fontSize: '9px' }}>
                — SHUVASISH BHOWMICK · DHAKA, BANGLADESH
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
