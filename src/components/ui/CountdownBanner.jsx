import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const G = { bg:'#0d1b3e', gold:'#d4af37' };

function getNextMonday() {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 1 : 8 - day;
  const next = new Date(now);
  next.setDate(now.getDate() + diff);
  next.setHours(9, 0, 0, 0);
  return next;
}

export default function CountdownBanner() {
  const [time, setTime] = useState({ d:0, h:0, m:0, s:0 });
  const [show, setShow] = useState(true);

  useEffect(() => {
    const target = getNextMonday();
    const iv = setInterval(() => {
      const diff = target - new Date();
      if (diff <= 0) { clearInterval(iv); return; }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  if (!show) return null;

  return (
    <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
      style={{ background:`linear-gradient(135deg, #071029, #0d1b3e)`, borderBottom:`1px solid rgba(212,175,55,0.3)`, padding:'10px clamp(16px,4vw,40px)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'10px', fontFamily:'Montserrat,sans-serif' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px', flexWrap:'wrap' }}>
        <span style={{ fontSize:'13px', fontWeight:900, color:G.gold }}>🔥 Bu Haftaki Kontenjan Dolmadan Yerinizi Alın!</span>
        <div style={{ display:'flex', gap:'8px' }}>
          {[['d','GÜN'],['h','SAAT'],['m','DAK'],['s','SAN']].map(([k,l]) => (
            <div key={k} style={{ background:'rgba(212,175,55,0.12)', border:'1px solid rgba(212,175,55,0.25)', borderRadius:'8px', padding:'4px 10px', textAlign:'center', minWidth:'44px' }}>
              <div style={{ fontSize:'16px', fontWeight:900, color:G.gold, lineHeight:1 }}>{String(time[k]).padStart(2,'0')}</div>
              <div style={{ fontSize:'9px', color:'rgba(212,175,55,0.5)', letterSpacing:'0.08em', marginTop:'2px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
        <a href="https://wa.me/905383135720?text=Ders%20rezervasyonu%20yapmak%20istiyorum" target="_blank" rel="noopener noreferrer"
          style={{ background:G.gold, color:G.bg, fontSize:'12px', fontWeight:900, padding:'8px 18px', borderRadius:'999px', textDecoration:'none', letterSpacing:'0.04em', whiteSpace:'nowrap' }}>
          Hemen Rezerve Et →
        </a>
        <button onClick={() => setShow(false)}
          style={{ background:'none', border:'none', color:'rgba(255,255,255,0.3)', cursor:'pointer', fontSize:'16px', padding:'4px' }}>✕</button>
      </div>
    </motion.div>
  );
}
