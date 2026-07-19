import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldBorder:'rgba(212,175,55,0.25)' };

export default function ExitPopup() {
  const [show, setShow] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    // 40 saniye sonra veya exit-intent'te göster
    const timer = setTimeout(() => {
      if (!shown) { setShow(true); setShown(true); }
    }, 40000);

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !shown) {
        setShow(true);
        setShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shown]);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setShow(false)}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:9995, backdropFilter:'blur(4px)' }} />

          <motion.div initial={{ opacity:0, scale:0.9, y:20 }} animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:0.9, y:20 }} transition={{ type:'spring', stiffness:280, damping:22 }}
            style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:9996, width:'min(440px,90vw)', background:G.dark, border:`1px solid ${G.goldBorder}`, borderRadius:'20px', overflow:'hidden', boxShadow:'0 24px 60px rgba(0,0,0,0.6)', fontFamily:'Montserrat,sans-serif' }}>

            {/* Altın üst şerit */}
            <div style={{ background:G.gold, padding:'10px', textAlign:'center' }}>
              <span style={{ fontSize:'12px', fontWeight:900, color:G.bg, letterSpacing:'0.06em' }}>
                🎁 ÖZEL TEKLİF — SADECE BUGÜN
              </span>
            </div>

            {/* İçerik */}
            <div style={{ padding:'28px 24px', textAlign:'center' }}>
              <div style={{ fontSize:'40px', marginBottom:'12px' }}>🎯</div>
              <h3 style={{ fontSize:'22px', fontWeight:900, color:'#fff', letterSpacing:'-0.02em', marginBottom:'10px' }}>
                Gitmeden Önce<br /><span style={{ color:G.gold }}>Ücretsiz Ders Al!</span>
              </h3>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.65)', lineHeight:1.7, marginBottom:'20px' }}>
                İlk tanışma seansın tamamen ücretsiz. Hiçbir taahhüt olmadan pilatesle tanış!
              </p>

              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                <a href="https://wa.me/905383135720?text=Merhaba!%20Ücretsiz%20tanışma%20seansı%20almak%20istiyorum."
                  target="_blank" rel="noopener noreferrer" onClick={() => setShow(false)}
                  style={{ display:'block', background:G.gold, color:G.bg, fontSize:'14px', fontWeight:900, padding:'14px', borderRadius:'999px', textDecoration:'none', boxShadow:'0 4px 20px rgba(212,175,55,0.4)', letterSpacing:'0.04em' }}>
                  💬 WhatsApp'tan Randevu Al
                </a>
                <button onClick={() => setShow(false)}
                  style={{ background:'none', border:'none', color:'rgba(255,255,255,0.35)', fontSize:'12px', cursor:'pointer', fontFamily:'Montserrat', padding:'6px' }}>
                  Hayır teşekkürler, bu fırsatı kaçırayım
                </button>
              </div>
            </div>

            {/* Kapat */}
            <button onClick={() => setShow(false)}
              style={{ position:'absolute', top:'12px', right:'12px', background:'rgba(255,255,255,0.1)', border:'none', borderRadius:'50%', width:'28px', height:'28px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'rgba(255,255,255,0.6)' }}>
              <X size={14} />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
