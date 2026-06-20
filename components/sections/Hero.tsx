'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

const SLIDES = [
  {
    img: '/images/hero-02.png',
    alt: 'Shuvasish Bhowmick — Visionary Leader',
    tag: 'SUSTAINABILITY PIONEER',
    tagColor: 'var(--blue)',
    accent: 'ENGINEER · LEADER',
    accentColor: 'var(--blue)',
    pos: 'center center',
  },
  {
    img: '/images/Bhoumik speach on stage.jpg',
    alt: 'Shuvasish Bhowmick — On Stage',
    tag: 'KEYNOTE SPEAKER',
    tagColor: 'var(--red)',
    accent: 'CHANGEMAKER',
    accentColor: 'var(--red)',
    pos: 'center top',
  },
  {
    img: '/images/hero-03.png',
    alt: 'Shuvasish Bhowmick — Baap Ka Beta',
    tag: 'BAAP KA BETA',
    tagColor: 'var(--gold)',
    accent: 'CREATOR · FATHER',
    accentColor: 'var(--gold)',
    pos: 'center top',
  },
];

const ROLES = ['Mechanical Engineer', 'Sustainability Pioneer', 'Content Creator', 'Devoted Father'];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [nameComplete, setNameComplete] = useState(false);
  const particleRef = useRef<HTMLCanvasElement>(null);
  const threeRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Typewriter
  useEffect(() => {
    const name = 'SHUVASISH\nBHOWMICK';
    let i = 0;
    const t = setInterval(() => {
      setTyped(name.slice(0, i + 1));
      i++;
      if (i >= name.length) { clearInterval(t); setTimeout(() => setNameComplete(true), 400); }
    }, 60);
    return () => clearInterval(t);
  }, []);

  // Role cycling
  useEffect(() => {
    if (!nameComplete) return;
    const t = setInterval(() => setRoleIdx(p => (p + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, [nameComplete]);

  // Mouse parallax
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouseRef.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: -(e.clientY / window.innerHeight) * 2 + 1 };
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  // Three.js 3D universe
  useEffect(() => {
    const canvas = threeRef.current;
    if (!canvas) return;
    let rafId = 0;
    let disposed = false;

    import('three').then((THREE) => {
      if (disposed) return;
      const W = window.innerWidth, H = window.innerHeight;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
      camera.position.set(0, 0, 28);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      // Starfield
      const sPos = new Float32Array(5000 * 3);
      for (let i = 0; i < sPos.length; i++) sPos[i] = (Math.random() - 0.5) * 260;
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
      const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0x4f8ef5, size: 0.06, transparent: true, opacity: 0.5 }));
      scene.add(stars);

      // ── HERO GEAR (replaces torus knot) — mechanical engineer symbol ──
      function buildGear(teeth: number, outerR: number, innerR: number, holeR: number, depth: number) {
        const shape = new THREE.Shape();
        const ta = (Math.PI * 2) / teeth;
        for (let i = 0; i < teeth; i++) {
          const base = i * ta;
          if (i === 0) shape.moveTo(Math.cos(base - ta * 0.35) * innerR, Math.sin(base - ta * 0.35) * innerR);
          shape.lineTo(Math.cos(base - ta * 0.15) * outerR, Math.sin(base - ta * 0.15) * outerR);
          shape.lineTo(Math.cos(base + ta * 0.15) * outerR, Math.sin(base + ta * 0.15) * outerR);
          shape.lineTo(Math.cos(base + ta * 0.35) * innerR, Math.sin(base + ta * 0.35) * innerR);
        }
        shape.closePath();
        const hole = new THREE.Path();
        hole.absarc(0, 0, holeR, 0, Math.PI * 2, true);
        shape.holes.push(hole);
        return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
      }

      // Main gear — large, left-center
      const gearGeo = buildGear(18, 5.5, 4.2, 1.1, 1.4);
      const gearEdges = new THREE.EdgesGeometry(gearGeo, 12);
      const gearLines = new THREE.LineSegments(gearEdges, new THREE.LineBasicMaterial({ color: 0x4f8ef5, transparent: true, opacity: 0.28 }));
      gearLines.position.set(-4, 3, -14);
      scene.add(gearLines);

      // Small secondary gear — interlocked
      const gear2Geo = buildGear(9, 3.0, 2.2, 0.6, 1.0);
      const gear2Edges = new THREE.EdgesGeometry(gear2Geo, 12);
      const gear2Lines = new THREE.LineSegments(gear2Edges, new THREE.LineBasicMaterial({ color: 0x4f8ef5, transparent: true, opacity: 0.18 }));
      // Position: big outerR + small outerR = 5.5 + 3.0 = 8.5 units apart
      gear2Lines.position.set(-4 + 6.2, 3 + 5.8, -14);
      scene.add(gear2Lines);

      const gearSpeed = 0.006;
      const gear2Speed = -(gearSpeed * 18) / 9;

      // Icosahedron — bottom left
      const icoGeo = new THREE.IcosahedronGeometry(2.8, 1);
      const ico = new THREE.Mesh(icoGeo, new THREE.MeshBasicMaterial({ color: 0x00e5a0, wireframe: true, transparent: true, opacity: 0.12 }));
      ico.position.set(-8, -7, -20);
      scene.add(ico);

      // Large ring — upper center
      const rGeo = new THREE.TorusGeometry(5, 0.22, 8, 50);
      const ring = new THREE.Mesh(rGeo, new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.07 }));
      ring.position.set(0, 10, -24);
      ring.rotation.x = Math.PI / 3;
      scene.add(ring);

      // Octahedron
      const oGeo = new THREE.OctahedronGeometry(2, 0);
      const oct = new THREE.Mesh(oGeo, new THREE.MeshBasicMaterial({ color: 0xff4f60, wireframe: true, transparent: true, opacity: 0.14 }));
      oct.position.set(-2, -3, -8);
      scene.add(oct);

      // Small accent spheres
      const makeSmall = (color: number, x: number, y: number, z: number) => {
        const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 0), new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.3 }));
        m.position.set(x, y, z); scene.add(m); return m;
      };
      const s1 = makeSmall(0x9b5de5, -12, 4, -6);
      const s2 = makeSmall(0x00e5a0, 3, 8, -5);
      const s3 = makeSmall(0x4f8ef5, -6, -10, -10);

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        stars.rotation.y += 0.00008;
        gearLines.rotation.z += gearSpeed;
        gear2Lines.rotation.z += gear2Speed;
        ico.rotation.x += 0.003; ico.rotation.y += 0.004;
        ring.rotation.z += 0.006;
        oct.rotation.x += 0.007; oct.rotation.y += 0.009;
        s1.rotation.x += 0.012; s1.rotation.y += 0.015;
        s2.rotation.z += 0.01; s2.rotation.x += 0.008;
        s3.rotation.y += 0.013;
        camera.position.x += (mouseRef.current.x * 1.5 - camera.position.x) * 0.02;
        camera.position.y += (mouseRef.current.y * 1.0 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      const cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
      };
      (canvas as HTMLCanvasElement & { _d?: () => void })._d = cleanup;
    });

    return () => {
      disposed = true;
      const c = canvas as HTMLCanvasElement & { _d?: () => void };
      if (c._d) { c._d(); delete c._d; }
    };
  }, []);

  // Particle dust
  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: -Math.random() * 0.4 - 0.1,
      l: Math.random() * 300, ml: 280 + Math.random() * 200,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy; p.l++;
        if (p.l > p.ml) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; p.l = 0; }
        const a = Math.sin((p.l / p.ml) * Math.PI) * 0.28;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79,142,245,${a})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  // Slide advance
  const advance = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true); setPrev(current);
    setCurrent(c => (c + 1) % SLIDES.length);
    setTimeout(() => { setPrev(null); setTransitioning(false); }, 1200);
  }, [current, transitioning]);

  const goTo = (idx: number) => {
    if (idx === current || transitioning) return;
    setTransitioning(true); setPrev(current); setCurrent(idx);
    setTimeout(() => { setPrev(null); setTransitioning(false); }, 1200);
  };

  useEffect(() => {
    intervalRef.current = setInterval(advance, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [advance]);

  const slide = SLIDES[current];
  const lines = typed.split('\n');

  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh', minHeight: '720px',
      overflow: 'hidden', background: '#010812',
    }}>

      {/* ── THREE.JS UNIVERSE (behind everything) ── */}
      <canvas ref={threeRef} style={{ position: 'absolute', inset: 0, zIndex: 2, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* ── BLUEPRINT GRID ── */}
      <div className="blueprint-bg" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }} />

      {/* ── PARTICLE DUST ── */}
      <canvas ref={particleRef} style={{ position: 'absolute', inset: 0, zIndex: 3, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* ── SCANLINE ── */}
      <div className="scanline" style={{ zIndex: 4 }} />

      {/* ════════════════════════════════════════════════
          RIGHT SIDE — HERO IMAGE PANEL
      ════════════════════════════════════════════════ */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '46%', zIndex: 5,
      }}>
        {/* Image slides */}
        {SLIDES.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            clipPath: i === current ? 'inset(0 0% 0 0)' : (i === prev ? 'inset(0 0% 0 100%)' : 'inset(0 100% 0 0)'),
            transition: 'clip-path 1.15s cubic-bezier(0.77,0,0.175,1)',
            zIndex: i === current ? 2 : (i === prev ? 1 : 0),
          }}>
            <Image src={s.img} alt={s.alt} fill
              style={{ objectFit: 'cover', objectPosition: s.pos }}
              priority={i === 0}
            />
          </div>
        ))}

        {/* Left edge blend (dark to transparent) */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(90deg, #010812 0%, rgba(1,8,18,0.6) 20%, rgba(1,8,18,0.1) 45%, transparent 70%)',
        }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(0deg, #010812 0%, transparent 100%)',
        }} />
        {/* Top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '18%', zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(180deg, #010812 0%, transparent 100%)',
        }} />

        {/* Slide tag — over the image */}
        <div style={{
          position: 'absolute', top: '22%', right: '32px', zIndex: 4,
          opacity: nameComplete ? 1 : 0, transition: 'opacity 0.8s 0.4s',
        }}>
          <span style={{
            display: 'inline-block', padding: '6px 16px',
            border: `1px solid ${slide.tagColor}40`,
            color: slide.tagColor,
            background: `${slide.tagColor}12`,
            fontSize: '9px', letterSpacing: '4px', fontWeight: 700,
            fontFamily: 'var(--font-display)',
            backdropFilter: 'blur(4px)',
          }}>
            {slide.tag}
          </span>
        </div>

        {/* Slide number */}
        <div className="mono" style={{
          position: 'absolute', bottom: '52px', right: '32px', zIndex: 4,
          opacity: 0.35, fontSize: '9px',
        }}>
          {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </div>

        {/* Decorative corner brackets */}
        <div style={{
          position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px',
          borderTop: '1.5px solid rgba(79,142,245,0.35)', borderRight: '1.5px solid rgba(79,142,245,0.35)',
          zIndex: 4, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '16px', left: 0, width: '32px', height: '32px',
          borderBottom: '1.5px solid rgba(79,142,245,0.2)', borderLeft: '1.5px solid rgba(79,142,245,0.2)',
          zIndex: 4, pointerEvents: 'none',
        }} />
      </div>

      {/* ════════════════════════════════════════════════
          LEFT SIDE — TEXT CONTENT
      ════════════════════════════════════════════════ */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 6,
        display: 'flex', alignItems: 'center',
        paddingLeft: '60px',
        paddingRight: 'calc(46% + 24px)',
      }}>
        <div style={{ width: '100%' }}>

          {/* Coord tag */}
          <div className="mono" style={{ marginBottom: '24px', opacity: 0.35, fontSize: '9px' }}>
            23.8103°N · 90.4125°E · DHAKA·BD
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: 'var(--font-display, Syne), sans-serif',
            fontSize: 'clamp(32px, 3.8vw, 58px)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.035em',
            marginBottom: '28px',
            color: '#fff',
          }}>
            {lines.map((line, i) => (
              <span key={i} style={{ display: 'block' }}>
                {line}
                {i === lines.length - 1 && !nameComplete && (
                  <span className="blink" style={{ color: 'var(--blue)', fontWeight: 300 }}>|</span>
                )}
              </span>
            ))}
          </h1>

          {/* Accent */}
          <div style={{
            fontSize: 'clamp(10px, 1.1vw, 13px)', fontWeight: 700, letterSpacing: '6px',
            textTransform: 'uppercase', color: slide.accentColor,
            marginBottom: '14px', minHeight: '20px',
            opacity: nameComplete ? 1 : 0, transition: 'opacity 0.5s, color 0.8s',
          }}>
            ◈ {slide.accent}
          </div>

          {/* Role */}
          <div style={{
            fontSize: 'clamp(13px, 1.3vw, 17px)', color: 'rgba(220,228,255,0.5)',
            marginBottom: '44px', minHeight: '26px',
            opacity: nameComplete ? 1 : 0, transition: 'opacity 0.8s 0.3s',
            fontFamily: 'var(--font-body)',
          }}>
            {ROLES[roleIdx]}
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', marginBottom: '44px',
            opacity: nameComplete ? 1 : 0, transition: 'opacity 0.8s 0.5s',
          }}>
            {[
              { n: '14+', l: 'Years', sub: 'Experience' },
              { n: '288K', l: 'Fan', sub: 'Community' },
              { n: '350+', l: 'Team', sub: 'Members Led' },
              { n: '#1', l: 'Asia', sub: 'Marketeer' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '14px clamp(14px, 1.8vw, 26px)',
                borderLeft: i === 0 ? 'none' : '1px solid rgba(240,244,255,0.07)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.5vw, 38px)', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: '9px', color: 'var(--blue)', fontWeight: 700, letterSpacing: '2px', marginTop: '4px' }}>{s.l}</div>
                <div style={{ fontSize: '8px', color: 'rgba(240,244,255,0.22)', letterSpacing: '1.5px' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: '12px', flexWrap: 'wrap',
            opacity: nameComplete ? 1 : 0, transition: 'opacity 0.8s 0.7s',
          }}>
            <a href="#engineer"
              onClick={e => { e.preventDefault(); document.getElementById('engineer')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-primary">
              Enter His Universe
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </a>
            <a href="#connect"
              onClick={e => { e.preventDefault(); document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-outline">
              Book a Session
            </a>
          </div>

          {/* Slide dots */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            marginTop: '52px',
            opacity: nameComplete ? 1 : 0, transition: 'opacity 0.8s 0.9s',
          }}>
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{
                width: i === current ? '32px' : '7px', height: '2px',
                background: i === current ? 'var(--blue-bright)' : 'rgba(240,244,255,0.2)',
                border: 'none', cursor: 'none', borderRadius: '2px',
                transition: 'width 0.4s, background 0.3s',
                boxShadow: i === current ? '0 0 10px var(--blue)' : 'none',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '60px',
        display: 'flex', alignItems: 'center', gap: '10px',
        zIndex: 7, opacity: 0.35,
      }}>
        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, var(--blue), transparent)' }} className="pulse" />
        <div className="mono" style={{ fontSize: '8px' }}>SCROLL</div>
      </div>
    </section>
  );
}
