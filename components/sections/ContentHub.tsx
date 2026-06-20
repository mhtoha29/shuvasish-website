'use client';
import { useState } from 'react';
import Image from 'next/image';

const VIDEOS = [
  { id: 'AD035mJe1v4', title: 'YouTube Podcast — Full Episode', cat: 'INSIGHTS', thumb: 'https://img.youtube.com/vi/AD035mJe1v4/hqdefault.jpg' },
  { id: 'eouQTu6GswY', title: 'Special Video', cat: 'VIDEOS', thumb: 'https://img.youtube.com/vi/eouQTu6GswY/hqdefault.jpg' },
  { id: 'e_Hgur4AaJ4', title: 'Featured Content', cat: 'INSIGHTS', thumb: 'https://img.youtube.com/vi/e_Hgur4AaJ4/hqdefault.jpg' },
  { id: 'gYxqWJl4Bsg', title: 'Story Video', cat: 'VIDEOS', thumb: 'https://img.youtube.com/vi/gYxqWJl4Bsg/hqdefault.jpg' },
  { id: 'VfixDU8h8Pw', title: 'Sora Gan — Original Song with Son', cat: 'MUSIC', thumb: 'https://img.youtube.com/vi/VfixDU8h8Pw/hqdefault.jpg' },
  { id: 'fIVqEHAYp3M', title: 'Singing — Father & Son Moment', cat: 'MUSIC', thumb: 'https://img.youtube.com/vi/fIVqEHAYp3M/hqdefault.jpg' },
];

const CATS = ['ALL', 'VIDEOS', 'MUSIC', 'INSIGHTS'];

export default function ContentHub() {
  const [filter, setFilter] = useState('ALL');
  const [playing, setPlaying] = useState<string | null>(null);

  const filtered = filter === 'ALL' ? VIDEOS : VIDEOS.filter(v => v.cat === filter);

  return (
    <section
      id="content"
      className="blueprint-grid"
      style={{ padding: '120px 80px', position: 'relative' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <span className="sec-label">06 / CONTENT HUB</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>
              The <span className="grad-blue">Media Room</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {CATS.map(cat => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setPlaying(null); }}
                style={{
                  background: filter === cat ? 'var(--blue)' : 'rgba(10,20,50,0.6)',
                  border: '1px solid rgba(74,158,255,0.2)',
                  color: filter === cat ? 'var(--bg)' : 'rgba(74,158,255,0.5)',
                  padding: '6px 16px',
                  fontSize: '9px', letterSpacing: '2px',
                  cursor: 'none', fontWeight: filter === cat ? 700 : 400,
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video grid */}
        <div className="rg-3" style={{ gap: '16px' }}>
          {filtered.map((v, i) => (
            <div
              key={v.id}
              style={{
                border: '1px solid rgba(74,158,255,0.1)',
                overflow: 'hidden',
                background: 'rgba(5,12,28,0.8)',
                position: 'relative',
              }}
            >
              {playing === v.id ? (
                <div>
                  <iframe
                    width="100%" height="200"
                    src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ display: 'block', border: 'none' }}
                  />
                  <div style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '10px', color: 'rgba(224,224,224,0.6)' }}>{v.title}</div>
                    <button onClick={() => setPlaying(null)} style={{ background: 'none', border: 'none', color: 'rgba(74,158,255,0.5)', fontSize: '9px', letterSpacing: '1px', cursor: 'none' }}>
                      CLOSE
                    </button>
                  </div>
                </div>
              ) : (
                <div onClick={() => setPlaying(v.id)} style={{ cursor: 'none' }}>
                  {/* Thumbnail */}
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={v.thumb}
                      alt={v.title}
                      style={{
                        width: '100%', height: '180px', objectFit: 'cover',
                        display: 'block',
                        filter: 'brightness(0.7)',
                        transition: 'filter 0.3s, transform 0.3s',
                      }}
                      onMouseEnter={e => { (e.target as HTMLImageElement).style.filter = 'brightness(0.9)'; (e.target as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                      onMouseLeave={e => { (e.target as HTMLImageElement).style.filter = 'brightness(0.7)'; (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                    />
                    {/* Play button overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '50%',
                        background: 'rgba(255,0,0,0.85)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '16px', color: '#fff',
                        boxShadow: '0 0 16px rgba(255,0,0,0.4)',
                      }}>▶</div>
                    </div>

                    {/* Category tag */}
                    <div style={{
                      position: 'absolute', top: 8, left: 8,
                      background: 'rgba(3,13,30,0.85)',
                      border: '1px solid rgba(74,158,255,0.3)',
                      padding: '2px 8px',
                      fontSize: '8px', letterSpacing: '2px', color: 'var(--blue)',
                    }}>
                      {v.cat}
                    </div>
                  </div>

                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontSize: '11px', color: 'rgba(224,224,224,0.75)', lineHeight: 1.4, letterSpacing: '0.5px' }}>
                      {v.title}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Speaking section */}
        <div className="rg-2" style={{ marginTop: '48px', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Image
              src="/images/speach time.jpg"
              alt="Shuvasish speaking"
              width={560}
              height={300}
              style={{ width: '100%', height: '200px', objectFit: 'cover', filter: 'brightness(0.7)', border: '1px solid rgba(74,158,255,0.1)' }}
            />
            <div className="annotation" style={{
              position: 'absolute', bottom: 8, left: 8,
              background: 'rgba(3,13,30,0.85)', padding: '4px 10px',
            }}>
              SPEAKING — THOUGHT LEADERSHIP
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <Image
              src="/images/bhoumik selfy with audience.jpg"
              alt="With audience"
              width={560}
              height={300}
              style={{ width: '100%', height: '200px', objectFit: 'cover', filter: 'brightness(0.7)', border: '1px solid rgba(74,158,255,0.1)' }}
            />
            <div className="annotation" style={{
              position: 'absolute', bottom: 8, left: 8,
              background: 'rgba(3,13,30,0.85)', padding: '4px 10px',
            }}>
              COMMUNITY — 37K+ LINKEDIN FAMILY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
