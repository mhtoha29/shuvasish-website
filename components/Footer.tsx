'use client';
export default function Footer() {
  return (
    <footer style={{
      padding: '44px 48px 36px',
      borderTop: '1px solid rgba(79,142,245,0.07)',
      background: '#010609',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '13px',
        color: 'rgba(240,244,255,0.55)',
        letterSpacing: '2px',
        marginBottom: '12px',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
      }}>
        © 2025 All frequencies reserved · Shuvasish Bhowmick
      </div>
      <div style={{ fontSize: '11px', color: 'rgba(240,244,255,0.38)', letterSpacing: '2px' }}>
        design and developed by{' '}
        <a
          href="https://mh-toha.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--blue)',
            textDecoration: 'none',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '3px',
            transition: 'color 0.3s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue-bright)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--blue)')}
        >
          MH-TOHA
        </a>
      </div>
    </footer>
  );
}
