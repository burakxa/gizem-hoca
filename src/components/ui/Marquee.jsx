import React from 'react';

const items = [
  'Mat Pilates', 'Reformer', 'Hamile Pilatesi', 'Postür & Mobilite',
  'Balanced Body®', 'Mindfulness', 'Core Güçlendirme', 'Esneklik',
  'Online Ders', 'Bireysel Ders', 'Grup Dersi', 'Nefes Teknikleri',
];

export default function Marquee() {
  return (
    <div style={{
      overflow: 'hidden', background: '#d4af37', borderTop: '1px solid rgba(212,175,55,0.3)',
      borderBottom: '1px solid rgba(212,175,55,0.3)', padding: '10px 0',
    }}>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; gap: 0; animation: marquee 28s linear infinite; width: max-content; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '0 20px', fontSize: '11px', fontWeight: 900, letterSpacing: '0.12em', color: '#0d1b3e', whiteSpace: 'nowrap' }}>
            {item} <span style={{ opacity: 0.4 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
