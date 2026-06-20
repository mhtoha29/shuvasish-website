'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

function CountUp({ target, suffix = '', inView }: { target: number; suffix?: string; inView: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0; const step = Math.ceil(target / 70);
    const t = setInterval(() => { n += step; if (n >= target) { setV(target); clearInterval(t); } else setV(n); }, 18);
    return () => clearInterval(t);
  }, [inView, target]);
  return <>{v.toLocaleString()}{suffix}</>;
}

export default function CleanEnergy() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const bubbles: { x: number; y: number; r: number; vy: number; a: number; c: string }[] = [];
    const colors = ['rgba(0,229,160,', 'rgba(0,200,130,', 'rgba(79,142,245,'];
    for (let i = 0; i < 45; i++) {
      bubbles.push({ x: Math.random() * 800, y: 600 + Math.random() * 400, r: Math.random() * 5 + 2, vy: -(Math.random() * 0.6 + 0.2), a: Math.random() * 0.3 + 0.1, c: colors[Math.floor(Math.random() * colors.length)] });
    }
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach(b => {
        b.y += b.vy;
        if (b.y < -20) { b.y = canvas.height + 10; b.x = Math.random() * canvas.width; }
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `${b.c}${b.a})`; ctx.lineWidth = 1; ctx.stroke();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="energy" className="section" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, #020f08 50%, var(--bg) 100%)', position: 'relative', overflow: 'hidden' }}>
      <div className="sec-number" style={{ color: 'rgba(0,229,160,0.04)' }}>02</div>

      {/* Bubble canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* Green glow */}
      <div style={{ position: 'absolute', top: '40%', right: '15%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" ref={ref} style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ marginBottom: '72px' }}>
          <div className="label" style={{ color: 'var(--green)', marginBottom: '16px', display: 'block' }}>02 — The Changemaker</div>
          <h2 className="display-lg" style={{ marginBottom: '20px' }}>
            Decarbonising<br /><span className="grad-green">Bangladesh's Kitchen</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: '560px', fontStyle: 'italic' }}>
            "Clean energy is not charity. It's a business. When we make it financially sustainable, it scales."
          </p>
        </div>

        <div className="rg-2" style={{ gap: '48px' }}>
          {/* Left */}
          <div>
            {/* Impact numbers */}
            <div className="rg-2" style={{ gap: '2px', marginBottom: '32px' }}>
              {[
                { n: 37000, s: '+', l: 'LinkedIn Community', c: 'var(--green)' },
                { n: 14, s: '+', l: 'Years Experience', c: 'var(--blue)' },
                { n: 350, s: '', l: 'Team Members Led', c: 'var(--red)' },
                { n: 3, s: 'X', l: 'International Awards', c: 'var(--gold)' },
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '24px 20px', background: 'rgba(0,229,160,0.04)', border: '1px solid rgba(0,229,160,0.08)',
                  opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)',
                  transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s`,
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, color: stat.c, lineHeight: 1 }}>
                    {vis ? <CountUp target={stat.n} suffix={stat.s} inView={vis} /> : '—'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px', letterSpacing: '0.5px' }}>{stat.l}</div>
                </div>
              ))}
            </div>

            {/* Mission list */}
            <div style={{ background: 'rgba(0,229,160,0.04)', border: '1px solid rgba(0,229,160,0.1)', padding: '24px', marginBottom: '24px' }}>
              <div className="label" style={{ color: 'var(--green)', marginBottom: '16px', display: 'block' }}>ATEC Global Mission</div>
              {[
                'Biodigester installation for biogas from organic waste',
                'Smart electric cookstoves replacing fossil fuels',
                'Carbon credit generation for rural communities',
                'Connecting base-of-pyramid to global carbon markets',
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '12px', alignItems: 'flex-start',
                  padding: '10px 0', borderBottom: i < 3 ? '1px solid rgba(0,229,160,0.06)' : 'none',
                }}>
                  <div style={{ color: 'var(--green)', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>◈</div>
                  <div className="body-md" style={{ fontSize: '13px' }}>{item}</div>
                </div>
              ))}
            </div>

            {/* Awards */}
            {[
              { y: '2025', t: "Asia's Top Outstanding Digital Marketeer", o: 'Asia Marketing Federation' },
              { y: '2025', t: 'CHIEF Fellowship Scholarship', o: 'Asia Centre for Changemakers' },
              { y: '2024', t: 'SDG Brand Champion Award', o: 'Bangladesh Brand Forum' },
            ].map((a, i) => (
              <div key={i} style={{
                display: 'flex', gap: '16px', alignItems: 'center',
                padding: '12px 16px', marginBottom: '6px',
                background: 'rgba(255,204,0,0.04)', border: '1px solid rgba(255,204,0,0.08)',
                opacity: vis ? 1 : 0, transition: `opacity 0.5s ${0.4 + i * 0.1}s`,
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: 'var(--gold)', minWidth: '48px' }}>{a.y}</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--white)' }}>{a.t}</div>
                  <div className="mono" style={{ fontSize: '9px', opacity: 0.5, marginTop: '2px' }}>{a.o}</div>
                </div>
                <div style={{ marginLeft: 'auto', color: 'var(--gold)', fontSize: '18px' }}>★</div>
              </div>
            ))}
          </div>

          {/* Right: Images */}
          <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.8s 0.4s' }}>
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <Image src="/images/atec team.jpg" alt="ATEC Team" width={580} height={340}
                style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block', filter: 'brightness(0.75) saturate(0.9)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,229,160,0.08), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--white)' }}>ATEC Global · Bangladesh</div>
                <div className="mono" style={{ color: 'var(--green)', opacity: 0.8, marginTop: '2px' }}>DECARBONISING COOKING</div>
              </div>
            </div>

            <div className="rg-2" style={{ gap: '12px', marginBottom: '20px' }}>
              {['/images/awared.jpeg', '/images/bhoumik award.jpg'].map((src, i) => (
                <div key={i} style={{ position: 'relative', overflow: 'hidden' }}>
                  <Image src={src} alt="Award" width={260} height={200}
                    style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block', filter: 'brightness(0.75)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,204,0,0.06), transparent)' }} />
                </div>
              ))}
            </div>

            {/* Pipeline */}
            <div style={{ background: 'rgba(0,229,160,0.05)', border: '1px solid rgba(0,229,160,0.1)', padding: '16px 20px' }}>
              <div className="label" style={{ color: 'var(--green)', marginBottom: '12px', display: 'block' }}>CO₂ Conversion Flow</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                {['Organic Waste', '→', 'Biodigester', '→', 'Clean Energy', '→', 'Carbon Credit', '→', 'Global Market'].map((s, i) => (
                  <span key={i} style={{
                    fontSize: s === '→' ? '14px' : '11px',
                    color: s === '→' ? 'rgba(0,229,160,0.4)' : 'var(--muted)',
                    fontWeight: s !== '→' ? 600 : 300,
                    letterSpacing: s !== '→' ? '1px' : '0px',
                  }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
