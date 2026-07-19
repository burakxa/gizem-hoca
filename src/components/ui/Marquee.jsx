import React, { useEffect, useRef, useState } from 'react';

const G = { gold:'#d4af37', bg:'#0d1b3e' };

function MarqueeInner() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = ['Mat Pilates','Reformer','Hamile Pilatesi','Online Ders','Postür Düzeltme','Core Güçlendirme','Maltepe','Maltepe','İstanbul','Wellness'];

  return (
    <div ref={ref} style={{ background:G.gold, overflow:'hidden', padding:'8px 0', userSelect:'none' }}>
      <div style={{ display:'flex', width:'max-content', animationPlayState: visible ? 'running' : 'paused' }}>
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'12px', padding:'0 20px', fontSize:'11px', fontWeight:900, color:G.bg, letterSpacing:'0.1em', whiteSpace:'nowrap' }}>
            {item} <span style={{ opacity:0.4 }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
        div[style*="max-content"] { animation: marquee 25s linear infinite; }
      `}</style>
    </div>
  );
}

export default React.memo(MarqueeInner);
