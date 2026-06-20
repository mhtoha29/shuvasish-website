'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const STAGES = [
  { year: '2025', event: 'Asia Marketing Federation — Outstanding Marketeer', role: 'Award Recipient & Speaker', loc: 'Asia Pacific' },
  { year: '2025', event: 'CHIEF Fellowship — Asia Centre for Changemakers', role: 'Fellow & Speaker', loc: 'International' },
  { year: '2024', event: 'SDG Brand Champion Forum — Bangladesh Brand Forum', role: 'Keynote Panelist', loc: 'Dhaka, BD' },
  { year: '2024', event: 'Clean Cooking Alliance Leadership Forum', role: 'Industry Expert', loc: 'International' },
  { year: '2023', event: 'Renewable Energy & Sustainability Summit', role: 'Keynote Speaker', loc: 'Bangladesh' },
];

function PurpleParticles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    const pts = Array.from({ length: 35 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.25, vy: -Math.random() * 0.35 - 0.08,
      l: Math.random() * 400, ml: 350 + Math.random() * 200,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy; p.l++;
        if (p.l > p.ml) { p.y = c.height + 10; p.x = Math.random() * c.width; p.l = 0; }
        const a = Math.sin((p.l / p.ml) * Math.PI) * 0.28;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155,93,229,${a})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

export default function Speaker() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="speaker" className="section" style={{
      background: 'linear-gradient(180deg, var(--bg) 0%, #070112 45%, #080115 55%, var(--bg) 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="sec-number" style={{ color: 'rgba(155,93,229,0.035)' }}>04</div>

      {/* Purple ambient glow */}
      <div style={{ position: 'absolute', top: '35%', right: '20%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(155,93,229,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(79,142,245,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Particle field */}
      <PurpleParticles />

      <div className="container" ref={ref} style={{ position: 'relative', zIndex: 2 }}>

        {/* Section header */}
        <div style={{ marginBottom: '72px' }}>
          <div className="label" style={{ color: 'var(--purple)', marginBottom: '16px', display: 'block' }}>
            04 — The Voice
          </div>
          <h2 className="display-lg" style={{ marginBottom: '20px' }}>
            Words That<br />
            <span style={{
              background: 'linear-gradient(135deg, #9b5de5, #4f8ef5)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Move Nations
            </span>
          </h2>
          <p className="body-lg" style={{ maxWidth: '580px', fontStyle: 'italic' }}>
            &ldquo;The most powerful technology in the world is a human voice that truly believes in what it&rsquo;s saying — and can make a roomful of people believe it too.&rdquo;
          </p>
        </div>

        <div className="rg-2" style={{ gap: '48px', alignItems: 'start' }}>

          {/* LEFT — Images */}
          <div>
            {/* Hero stage photo */}
            <div style={{
              position: 'relative', overflow: 'hidden', marginBottom: '12px',
              opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.9s, transform 0.9s',
            }}>
              <Image
                src="/images/Bhoumik speach on stage.jpg"
                alt="Shuvasish Bhowmick speaking on stage"
                width={600} height={420}
                style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block', filter: 'brightness(0.75) saturate(0.85)' }}
              />
              {/* Purple color cast */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(155,93,229,0.18) 0%, transparent 60%)' }} />
              {/* Bottom overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(0deg, rgba(7,1,18,0.96) 0%, transparent 100%)',
                padding: '40px 24px 20px',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#fff', letterSpacing: '1px' }}>
                  On Stage. In Command.
                </div>
                <div className="mono" style={{ color: 'rgba(155,93,229,0.75)', marginTop: '4px', fontSize: '9px', letterSpacing: '2px' }}>
                  INTERNATIONAL SPEAKER · THOUGHT LEADER
                </div>
              </div>
            </div>

            {/* 3-photo strip */}
            <div className="rg-3-2" style={{ gap: '8px', marginBottom: '20px' }}>
              {[
                { src: '/images/speach time.jpg', label: 'In Flow' },
                { src: '/images/presentation time.jpg', label: 'The Pitch' },
                { src: '/images/bhoumik selfy with audience.jpg', label: 'With People' },
              ].map((item, i) => (
                <div key={i} style={{
                  overflow: 'hidden', position: 'relative',
                  opacity: vis ? 1 : 0,
                  transition: `opacity 0.7s ${0.15 + i * 0.12}s`,
                }}>
                  <Image src={item.src} alt={item.label} width={200} height={160}
                    style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block', filter: 'brightness(0.7)', transition: 'transform 0.4s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'rgba(7,1,18,0.7)', padding: '5px 8px',
                  }}>
                    <div className="mono" style={{ fontSize: '8px', color: 'rgba(155,93,229,0.7)' }}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Teaching image */}
            <div style={{
              position: 'relative', overflow: 'hidden',
              opacity: vis ? 1 : 0, transition: 'opacity 0.8s 0.4s',
            }}>
              <Image src="/images/teaching bhoumik.jpg" alt="Shuvasish mentoring" width={600} height={220}
                style={{ width: '100%', height: '165px', objectFit: 'cover', display: 'block', filter: 'brightness(0.65)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(79,142,245,0.2), rgba(155,93,229,0.1), transparent)' }} />
              <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 800, color: '#fff' }}>
                    Building Tomorrow&apos;s Changemakers
                  </div>
                  <div className="mono" style={{ color: 'rgba(79,142,245,0.7)', marginTop: '4px', fontSize: '9px' }}>
                    MENTOR · EDUCATOR · CATALYST
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Stats + Timeline */}
          <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.8s 0.3s' }}>

            {/* Speaking stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px', marginBottom: '36px' }}>
              {[
                { n: '50+', l: 'Keynotes', c: 'var(--purple)' },
                { n: '12+', l: 'Countries', c: 'var(--blue)' },
                { n: '37K+', l: 'LinkedIn', c: 'var(--green)' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '22px 14px',
                  background: 'rgba(155,93,229,0.05)',
                  border: '1px solid rgba(155,93,229,0.1)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 2.6vw, 38px)', fontWeight: 800, color: s.c }}>{s.n}</div>
                  <div className="mono" style={{ fontSize: '11px', color: 'rgba(240,244,255,0.75)', marginTop: '5px' }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Core message */}
            <div style={{
              background: 'rgba(155,93,229,0.05)', border: '1px solid rgba(155,93,229,0.12)',
              padding: '24px', marginBottom: '28px',
            }}>
              <div className="label" style={{ color: 'var(--purple)', display: 'block', marginBottom: '14px' }}>His Message</div>
              <p className="body-md" style={{ lineHeight: 1.9, fontSize: '13px' }}>
                Shuvasish speaks at the intersection of <strong style={{ color: 'var(--white)' }}>clean technology, human potential, and cultural identity</strong>.
                His talks challenge audiences to see sustainability not as sacrifice — but as the greatest business opportunity of our generation.
              </p>
              <p className="body-md" style={{ lineHeight: 1.9, fontSize: '13px', marginTop: '12px' }}>
                From rural Bangladesh kitchens to global carbon markets, his message carries the weight of real work done on the ground.
              </p>
            </div>

            {/* Stage timeline */}
            <div className="label" style={{ color: 'var(--purple)', display: 'block', marginBottom: '14px' }}>Stage Appearances</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {STAGES.map((e, i) => (
                <div key={i} onClick={() => setActive(i)}
                  style={{
                    display: 'flex', gap: '14px', alignItems: 'flex-start',
                    padding: '13px 16px',
                    background: active === i ? 'rgba(155,93,229,0.1)' : 'rgba(155,93,229,0.03)',
                    border: `1px solid ${active === i ? 'rgba(155,93,229,0.3)' : 'rgba(155,93,229,0.07)'}`,
                    cursor: 'none', transition: 'all 0.25s',
                    opacity: vis ? 1 : 0,
                    transform: vis ? 'none' : 'translateX(16px)',
                    transitionDelay: `${0.05 + i * 0.07}s`,
                  }}
                  onMouseEnter={el => {
                    if (active !== i) {
                      (el.currentTarget as HTMLElement).style.background = 'rgba(155,93,229,0.07)';
                      (el.currentTarget as HTMLElement).style.borderColor = 'rgba(155,93,229,0.18)';
                    }
                  }}
                  onMouseLeave={el => {
                    if (active !== i) {
                      (el.currentTarget as HTMLElement).style.background = 'rgba(155,93,229,0.03)';
                      (el.currentTarget as HTMLElement).style.borderColor = 'rgba(155,93,229,0.07)';
                    }
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 800,
                    color: active === i ? 'var(--purple)' : 'rgba(155,93,229,0.5)',
                    minWidth: '38px', paddingTop: '2px',
                  }}>{e.year}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: active === i ? '#fff' : 'rgba(240,244,255,0.7)', lineHeight: 1.4 }}>{e.event}</div>
                    <div className="mono" style={{ fontSize: '10px', color: 'rgba(240,244,255,0.65)', marginTop: '3px' }}>{e.role} · {e.loc}</div>
                  </div>
                  <div style={{ color: active === i ? 'var(--purple)' : 'rgba(155,93,229,0.25)', fontSize: '12px', paddingTop: '2px' }}>◈</div>
                </div>
              ))}
            </div>

            {/* Invite CTA */}
            <div style={{ marginTop: '28px', textAlign: 'right' }}>
              <a href="#connect"
                onClick={e => { e.preventDefault(); document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '11px 22px',
                  border: '1px solid rgba(155,93,229,0.3)',
                  background: 'rgba(155,93,229,0.07)',
                  color: 'var(--purple)', textDecoration: 'none',
                  fontSize: '11px', letterSpacing: '2px', fontWeight: 700,
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { (e.currentTarget).style.background = 'rgba(155,93,229,0.15)'; (e.currentTarget).style.borderColor = 'rgba(155,93,229,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget).style.background = 'rgba(155,93,229,0.07)'; (e.currentTarget).style.borderColor = 'rgba(155,93,229,0.3)'; }}
              >
                INVITE TO SPEAK
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
