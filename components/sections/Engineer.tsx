'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

function CountUp({ target, suffix = '', inView }: { target: number; suffix?: string; inView: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => { n += step; if (n >= target) { setV(target); clearInterval(t); } else setV(n); }, 20);
    return () => clearInterval(t);
  }, [inView, target]);
  return <>{v.toLocaleString()}{suffix}</>;
}

function GearCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let rafId = 0;
    let disposed = false;

    import('three').then((THREE) => {
      if (disposed) return;

      const scene = new THREE.Scene();
      const W = canvas.offsetWidth || window.innerWidth;
      const H = canvas.offsetHeight || window.innerHeight;
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 200);
      camera.position.set(0, 0, 36);

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      // ── BETTER GEAR: proper tooth profile + EdgesGeometry (clean lines) ──
      function buildGear(teeth: number, outerR: number, innerR: number, holeR: number, depth: number) {
        const shape = new THREE.Shape();
        const ta = (Math.PI * 2) / teeth;
        for (let i = 0; i < teeth; i++) {
          const base = i * ta;
          if (i === 0) shape.moveTo(Math.cos(base - ta * 0.38) * innerR, Math.sin(base - ta * 0.38) * innerR);
          else shape.lineTo(Math.cos(base - ta * 0.38) * innerR, Math.sin(base - ta * 0.38) * innerR);
          shape.lineTo(Math.cos(base - ta * 0.16) * outerR, Math.sin(base - ta * 0.16) * outerR);
          shape.lineTo(Math.cos(base + ta * 0.16) * outerR, Math.sin(base + ta * 0.16) * outerR);
          shape.lineTo(Math.cos(base + ta * 0.38) * innerR, Math.sin(base + ta * 0.38) * innerR);
        }
        shape.closePath();
        const hole = new THREE.Path();
        hole.absarc(0, 0, holeR, 0, Math.PI * 2, true);
        shape.holes.push(hole);
        return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
      }

      const lineMat1 = new THREE.LineBasicMaterial({ color: 0x4f8ef5, transparent: true, opacity: 0.22 });
      const lineMat2 = new THREE.LineBasicMaterial({ color: 0x4f8ef5, transparent: true, opacity: 0.14 });
      const lineMat3 = new THREE.LineBasicMaterial({ color: 0x00e5a0, transparent: true, opacity: 0.10 });

      // Large gear — 18 teeth, right side
      const bigGeo = buildGear(18, 9.5, 7.5, 2.0, 1.8);
      const bigGear = new THREE.LineSegments(new THREE.EdgesGeometry(bigGeo, 10), lineMat1);
      bigGear.position.set(9, -2, 0);
      bigGear.rotation.x = Math.PI * 0.06;
      scene.add(bigGear);

      // Medium gear — 9 teeth, interlocked top-left of big
      // center distance = 9.5 + 5.2 = 14.7
      const midGeo = buildGear(9, 5.2, 3.9, 1.1, 1.5);
      const midGear = new THREE.LineSegments(new THREE.EdgesGeometry(midGeo, 10), lineMat2);
      midGear.position.set(9 - 10.8, -2 + 10.0, 0.3);
      midGear.rotation.x = Math.PI * 0.06;
      midGear.rotation.z = Math.PI / 9; // tooth phase offset
      scene.add(midGear);

      // Small gear — 6 teeth, interlocked right of big
      const smallGeo = buildGear(6, 3.2, 2.3, 0.7, 1.2);
      const smallGear = new THREE.LineSegments(new THREE.EdgesGeometry(smallGeo, 10), lineMat3);
      smallGear.position.set(9 + 12.4, -2 + 3.0, 0.5);
      smallGear.rotation.x = Math.PI * 0.06;
      smallGear.rotation.z = Math.PI / 6;
      scene.add(smallGear);

      // Gear ratios (counter-rotate for realism)
      const bigSpeed = 0.0025;
      const midSpeed = -(bigSpeed * 18) / 9;
      const smallSpeed = -(bigSpeed * 18) / 6;

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        bigGear.rotation.z += bigSpeed;
        midGear.rotation.z += midSpeed;
        smallGear.rotation.z += smallSpeed;
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        const w = canvas.offsetWidth, h = canvas.offsetHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      const cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        bigGeo.dispose(); lineMat1.dispose();
        midGeo.dispose(); lineMat2.dispose();
        smallGeo.dispose(); lineMat3.dispose();
      };
      (canvas as HTMLCanvasElement & { _gc?: () => void })._gc = cleanup;
    });

    return () => {
      disposed = true;
      const c = canvas as HTMLCanvasElement & { _gc?: () => void };
      if (c._gc) { c._gc(); delete c._gc; }
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
      }}
    />
  );
}

const MILESTONES = [
  { year: '2000s', role: 'B.Sc. Mechanical Engineering', co: 'MIST — Military Institute of Science & Technology', desc: 'Foundation forged in precision thinking, structural analysis, and engineering systems.', color: 'var(--blue)', idx: '01' },
  { year: '2008–2014', role: 'Business Development Leader', co: 'Navana CNG Ltd', desc: '6 years establishing dominant business models in the CNG sector across Bangladesh.', color: 'var(--blue)', idx: '02' },
  { year: '2014–2018', role: 'Chief Marketing Officer', co: 'Navana Engineering Ltd', desc: 'Led 350 people across sales and marketing. Redesigned supply chain for the entire Navana Group.', color: 'var(--red)', idx: '03' },
  { year: '2018–2020', role: 'Head of Business Development', co: 'UNIgas LPG Bangladesh', desc: 'Built national distribution networks across industrial, automotive, and commercial gas sectors.', color: 'var(--blue)', idx: '04' },
  { year: '2020 — NOW', role: 'Country Director', co: 'ATEC Australia International Ltd', desc: "Decarbonising Bangladesh's kitchen. Biogas, cookstoves, carbon credits — mission-driven leadership at scale.", color: 'var(--green)', idx: '05' },
];

const CERTS = [
  { t: 'CSCM', s: 'Supply Chain Manager · ISCEA 2013', c: 'var(--blue)' },
  { t: 'Six Sigma', s: 'Yellow Belt · 2014', c: 'var(--red)' },
  { t: 'PGD · PMP', s: 'Project Management · 2019', c: 'var(--gold)' },
  { t: 'MBA · IBA', s: 'University of Dhaka · 2025', c: 'var(--green)' },
];

export default function Engineer() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="engineer" className="section blueprint-bg" style={{ background: 'var(--bg)', overflow: 'hidden', position: 'relative' }}>
      {/* 3D Gears — background */}
      <GearCanvas />

      <div className="sec-number">01</div>

      <div className="container" ref={ref} style={{ position: 'relative', zIndex: 2 }}>

        {/* ── HEADER ── */}
        <div style={{
          marginBottom: '56px',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s, transform 0.7s',
        }}>
          <div className="label" style={{ marginBottom: '14px', display: 'block' }}>01 — The Engineer</div>
          <h2 className="display-lg" style={{ marginBottom: '16px' }}>
            14+ Years of<br />
            <span className="grad-red">Precision</span> &amp; <span className="grad-blue">Impact</span>
          </h2>
          <p className="body-lg">From mechanical blueprints to boardrooms — every role engineered with purpose.</p>
        </div>

        {/* ── STATS STRIP ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', marginBottom: '64px' }}>
          {[
            { n: 14, s: '+', l: 'Years Experience', c: 'var(--blue)' },
            { n: 350, s: '', l: 'People Led', c: 'var(--red)' },
            { n: 5, s: '', l: 'Companies', c: 'var(--gold)' },
            { n: 4, s: '', l: 'Certifications', c: 'var(--green)' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '24px 18px',
              background: 'rgba(6,15,36,0.75)',
              border: `1px solid ${s.c}18`,
              position: 'relative', overflow: 'hidden',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(24px)',
              transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s`,
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, ${s.c}, transparent)`,
                transform: vis ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: `transform 0.8s ${0.2 + i * 0.15}s cubic-bezier(0.4,0,0.2,1)`,
              }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 800, color: s.c, lineHeight: 1 }}>
                {vis ? <CountUp target={s.n} suffix={s.s} inView={vis} /> : '0'}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--dim)', letterSpacing: '2px', marginTop: '7px', textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>

          {/* ── TIMELINE ── */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', left: '7px', top: '12px', bottom: '8px', width: '1px',
              background: 'linear-gradient(180deg, var(--blue) 0%, var(--red) 50%, var(--green) 100%)',
              opacity: 0.3,
              transform: vis ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              transition: 'transform 1.4s cubic-bezier(0.4,0,0.2,1) 0.3s',
            }} />
            <div style={{
              position: 'absolute', left: '4px', top: '12px', bottom: '8px', width: '7px',
              background: 'linear-gradient(180deg, var(--blue), var(--red), var(--green))',
              opacity: vis ? 0.12 : 0, filter: 'blur(4px)',
              transition: 'opacity 1.6s 0.4s', pointerEvents: 'none',
            }} />

            {MILESTONES.map((m, i) => (
              <div key={i}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  display: 'flex', gap: '22px', marginBottom: '28px',
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'none' : 'translateX(-28px)',
                  transition: `opacity 0.65s ${0.15 + i * 0.12}s, transform 0.65s ${0.15 + i * 0.12}s`,
                  cursor: 'none',
                }}
              >
                <div style={{ paddingTop: '20px', flexShrink: 0 }}>
                  <div style={{
                    width: '15px', height: '15px', borderRadius: '50%',
                    border: `2px solid ${m.color}`,
                    background: i === MILESTONES.length - 1 ? m.color : 'var(--bg)',
                    boxShadow: hov === i || i === MILESTONES.length - 1 ? `0 0 12px ${m.color}` : 'none',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                    transform: hov === i ? 'scale(1.3)' : 'scale(1)',
                  }} />
                </div>

                <div style={{
                  flex: 1, padding: '18px 20px', position: 'relative', overflow: 'hidden',
                  background: hov === i ? `${m.color}09` : 'rgba(6,15,36,0.65)',
                  border: `1px solid ${hov === i ? m.color + '40' : 'rgba(240,244,255,0.06)'}`,
                  transform: hov === i ? 'translateX(6px)' : 'translateX(0)',
                  transition: 'all 0.3s ease',
                }}>
                  <div style={{
                    position: 'absolute', left: 0, top: '12%', bottom: '12%', width: '2px',
                    background: m.color, boxShadow: `0 0 8px ${m.color}`,
                    opacity: hov === i ? 1 : 0, transition: 'opacity 0.3s',
                  }} />
                  <div style={{
                    position: 'absolute', top: '10px', right: '14px',
                    fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 900,
                    color: m.color, opacity: hov === i ? 0.18 : 0.08, transition: 'opacity 0.3s',
                  }}>{m.idx}</div>
                  <div className="mono" style={{ color: m.color, opacity: 0.8, marginBottom: '5px', fontSize: '8px', letterSpacing: '2px' }}>{m.year}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '3px', fontFamily: 'var(--font-display)' }}>{m.role}</div>
                  <div className="mono" style={{ fontSize: '8px', color: 'var(--dim)', marginBottom: '9px', letterSpacing: '0.5px' }}>{m.co}</div>
                  <div className="body-md" style={{ fontSize: '12px', lineHeight: 1.75 }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT: VISUAL ── */}
          <div>
            <div style={{
              position: 'relative', overflow: 'hidden', marginBottom: '12px',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateX(28px)',
              transition: 'opacity 0.8s 0.25s, transform 0.8s 0.25s',
            }}>
              <Image
                src="/images/dealings pic.jpg"
                alt="Shuvasish — MOU Signing BTTF 2025"
                width={580} height={360}
                style={{ width: '100%', height: '290px', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: 'brightness(0.78) saturate(0.9)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(79,142,245,0.14), transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(0deg, rgba(2,10,22,0.96) 0%, transparent 100%)', padding: '32px 20px 16px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: '#fff' }}>MOU Signing · BTTF 2025</div>
                <div className="mono" style={{ color: 'var(--blue)', opacity: 0.7, marginTop: '3px', fontSize: '8px', letterSpacing: '1.5px' }}>BANGLADESH TRAVEL & TOURISM FAIR · DHAKA</div>
              </div>
              <div style={{ position: 'absolute', top: '10px', right: '10px', width: '22px', height: '22px', borderTop: '1.5px solid rgba(79,142,245,0.4)', borderRight: '1.5px solid rgba(79,142,245,0.4)', pointerEvents: 'none' }} />
            </div>

            <div style={{
              position: 'relative', overflow: 'hidden', marginBottom: '12px',
              opacity: vis ? 1 : 0, transition: 'opacity 0.8s 0.4s',
            }}>
              <Image
                src="/images/presentation time.jpg"
                alt="Shuvasish presenting"
                width={580} height={200}
                style={{ width: '100%', height: '145px', objectFit: 'cover', display: 'block', filter: 'brightness(0.72)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(255,77,106,0.15), transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '12px', left: '14px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, color: '#fff' }}>CMO · 350 People Led</div>
                <div className="mono" style={{ color: 'var(--red)', opacity: 0.7, marginTop: '2px', fontSize: '8px' }}>NAVANA ENGINEERING LTD</div>
              </div>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px',
              opacity: vis ? 1 : 0, transition: 'opacity 0.8s 0.55s',
            }}>
              {CERTS.map((c, i) => (
                <div key={i}
                  style={{
                    padding: '13px 14px',
                    background: 'rgba(6,15,36,0.75)',
                    border: `1px solid ${c.c}18`,
                    transition: 'all 0.25s', cursor: 'none',
                    opacity: vis ? 1 : 0,
                    transform: vis ? 'none' : 'translateY(12px)',
                    transitionDelay: `${0.6 + i * 0.08}s`,
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `${c.c}0c`;
                    el.style.borderColor = `${c.c}45`;
                    el.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(6,15,36,0.75)';
                    el.style.borderColor = `${c.c}18`;
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: c.c, marginBottom: '8px', boxShadow: `0 0 5px ${c.c}` }} />
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>{c.t}</div>
                  <div className="mono" style={{ opacity: 0.38, fontSize: '8px' }}>{c.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
