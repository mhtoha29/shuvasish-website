'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const VIDEOS = [
  { id: 'VfixDU8h8Pw', title: 'Sora Gan — Original Song', cat: 'ORIGINAL' },
  { id: 'AD035mJe1v4', title: 'Podcast Episode', cat: 'PODCAST' },
  { id: 'eouQTu6GswY', title: 'Performance Video', cat: 'MUSIC' },
  { id: 'gYxqWJl4Bsg', title: 'Special Content', cat: 'FEATURED' },
];

function LiveWave({ color }: { color: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    c.width = c.offsetWidth; c.height = c.offsetHeight;
    let t = 0, raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2;
      for (let x = 0; x < c.width; x++) {
        const p = x / c.width;
        const y = c.height / 2 + Math.sin(p * Math.PI * 6 + t) * 12 + Math.sin(p * Math.PI * 14 + t * 1.4) * 6;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke(); t += 0.05; raf = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(raf);
  }, [color]);
  return <canvas ref={ref} style={{ width: '100%', height: '60px', display: 'block' }} />;
}

export default function BaapKaBeta() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="baapkabeta" className="section" style={{
      background: 'linear-gradient(180deg, var(--bg) 0%, #0f0800 40%, #120b00 60%, var(--bg) 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="sec-number" style={{ color: 'rgba(255,204,0,0.04)' }}>03</div>

      {/* Warm glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(255,204,0,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" ref={ref} style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="label" style={{ color: 'var(--gold)', display: 'block', marginBottom: '16px' }}>
            03 — Baap Ka Beta ♫
          </div>
          <h2 className="display-lg" style={{ marginBottom: '20px' }}>
            When Love<br /><span className="grad-gold">Becomes Music</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: '560px', margin: '0 auto', fontStyle: 'italic' }}>
            "He never needed me to push him. I just needed to create the space — and he filled it with something I couldn't have imagined."
          </p>
        </div>

        {/* Waveform strip */}
        <div style={{ background: 'rgba(255,204,0,0.05)', border: '1px solid rgba(255,204,0,0.1)', marginBottom: '64px', padding: '4px 0' }}>
          <LiveWave color="rgba(255,204,0,0.6)" />
        </div>

        {/* Main grid */}
        <div className="rg-2" style={{ gap: '48px', alignItems: 'start' }}>
          {/* Hero image */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-20px)', transition: 'opacity 0.8s, transform 0.8s' }}>
            <div style={{ position: 'relative' }}>
              <Image
                src="/images/bhoumik and son with guitter good picture for bap ka beta main section.png"
                alt="Shuvasish and Rituraj — Baap Ka Beta"
                width={540}
                height={700}
                style={{ width: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Bottom overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(0deg, rgba(15,8,0,0.95) 0%, transparent 100%)',
                padding: '32px 24px 24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: 'var(--gold)', letterSpacing: '2px' }}>
                      BAAP KA BETA
                    </div>
                    <div className="mono" style={{ color: 'rgba(255,204,0,0.5)', marginTop: '3px' }}>
                      বাপকা বেটা · SINCE 2019
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: 'var(--white)' }}>288K</div>
                    <div className="mono" style={{ color: 'var(--gold)', opacity: 0.6 }}>FAMILY</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform stats */}
            <div className="rg-3-2" style={{ gap: '2px', marginTop: '2px' }}>
              {[
                { p: 'Facebook', n: '288K', c: '#1877f2' },
                { p: 'YouTube', n: '86K', c: '#ff0000' },
                { p: 'Instagram', n: 'VIRAL', c: '#e1306c' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '16px', background: 'rgba(255,204,0,0.04)', border: '1px solid rgba(255,204,0,0.06)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: s.c }}>{s.n}</div>
                  <div className="mono" style={{ fontSize: '9px', opacity: 0.5, marginTop: '3px' }}>{s.p}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content */}
          <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.8s 0.3s' }}>
            {/* Story */}
            <div style={{ background: 'rgba(255,204,0,0.04)', border: '1px solid rgba(255,204,0,0.1)', padding: '28px', marginBottom: '24px' }}>
              <div className="label" style={{ color: 'var(--gold)', display: 'block', marginBottom: '16px' }}>★ Origin Story · 2019</div>
              <p className="body-md" style={{ lineHeight: 1.9, fontSize: '14px' }}>
                In 2019, Shuvasish recorded a cover of Tahsan&apos;s &quot;Alo Alo&quot; with young Rituraj.
                No plan. No marketing. Just a father, a son, and a phone camera.
              </p>
              <p className="body-md" style={{ lineHeight: 1.9, fontSize: '14px', marginTop: '12px' }}>
                It went viral overnight. Bangladesh fell in love.
                What started as a family moment became the country&apos;s favourite father-son duo —
                288K followers, original songs, TV appearances, and a Guinness World Record spotlight for Rituraj at age 9.
              </p>
            </div>

            {/* Photo grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px', marginBottom: '24px' }}>
              {[
                '/images/Baap Ka Beta (bhoumik with her father , bhoumik with her son).jpg',
                '/images/awared with son.jpg',
                '/images/bap ka beta awared father and son.jpg',
                '/images/awared with son and wife.jpg',
              ].map((src, i) => (
                <div key={i} style={{ overflow: 'hidden' }}>
                  <Image src={src} alt={`Baap Ka Beta moment ${i+1}`} width={240} height={180}
                    style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block', filter: 'brightness(0.8) sepia(0.1)', transition: 'transform 0.4s', }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
              ))}
            </div>

            {/* Videos */}
            <div className="label" style={{ color: 'var(--gold)', display: 'block', marginBottom: '12px' }}>▶ Watch the Story</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {VIDEOS.map(v => (
                <div key={v.id}>
                  {playing === v.id ? (
                    <div style={{ border: '1px solid rgba(255,204,0,0.15)' }}>
                      <iframe width="100%" height="220" src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
                        allow="autoplay; encrypted-media" allowFullScreen style={{ display: 'block', border: 'none' }} />
                      <button onClick={() => setPlaying(null)} style={{ width: '100%', padding: '8px', background: 'rgba(255,204,0,0.06)', border: 'none', color: 'var(--gold)', fontSize: '10px', letterSpacing: '2px', cursor: 'none' }}>CLOSE</button>
                    </div>
                  ) : (
                    <button onClick={() => setPlaying(v.id)} style={{
                      width: '100%', background: 'rgba(255,204,0,0.04)', border: '1px solid rgba(255,204,0,0.08)',
                      padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'none',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,204,0,0.25)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,204,0,0.07)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,204,0,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,204,0,0.04)'; }}
                    >
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ff0000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', flexShrink: 0 }}>▶</div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--white)' }}>{v.title}</div>
                        <div className="mono" style={{ fontSize: '9px', color: 'rgba(255,204,0,0.5)', marginTop: '2px' }}>{v.cat}</div>
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
