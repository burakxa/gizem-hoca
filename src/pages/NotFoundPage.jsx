import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Search, BookOpen, Calendar, DollarSign } from 'lucide-react';
import { Helmet } from 'react-helmet';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldBorder:'rgba(212,175,55,0.2)', goldFaint:'rgba(212,175,55,0.08)', whiteMid:'rgba(255,255,255,0.65)', whiteLow:'rgba(255,255,255,0.3)' };

const suggestions = [
  { to:'/dersler', icon:BookOpen, label:'Dersler', sub:'Mat, Reformer, Hamile Pilatesi' },
  { to:'/fiyatlar', icon:DollarSign, label:'Fiyatlar', sub:'Uygun paketler' },
  { to:'/program', icon:Calendar, label:'Program', sub:'Haftalık ders takvimi' },
  { to:'/blog', icon:BookOpen, label:'Blog', sub:'Pilates ipuçları' },
];

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

  useEffect(() => {
    const iv = setInterval(() => {
      setCount(c => {
        if (c <= 1) { clearInterval(iv); navigate('/'); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>404 — Sayfa Bulunamadı | Gizem Hoca Pilates</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div style={{ minHeight:'100vh', background:`radial-gradient(ellipse at 30% 40%, rgba(212,175,55,0.05) 0%, transparent 60%), ${G.bg}`, fontFamily:'Montserrat,sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 16px', textAlign:'center', position:'relative', overflow:'hidden' }}>

        {/* Arka plan deseni */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(212,175,55,0.06) 1px, transparent 1px)', backgroundSize:'32px 32px', pointerEvents:'none' }} />

        {/* 404 büyük yazı */}
        <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ type:'spring', stiffness:200, damping:20 }}
          style={{ fontSize:'clamp(80px,20vw,160px)', fontWeight:900, color:'transparent', backgroundImage:`linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.4))`, WebkitBackgroundClip:'text', backgroundClip:'text', lineHeight:1, letterSpacing:'-0.05em', marginBottom:'8px', position:'relative', zIndex:1 }}>
          404
        </motion.div>

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }} style={{ position:'relative', zIndex:1 }}>
          <h1 style={{ fontSize:'clamp(20px,4vw,28px)', fontWeight:900, color:'#fff', letterSpacing:'-0.02em', marginBottom:'10px' }}>
            Bu Sayfa Bulunamadı
          </h1>
          <p style={{ fontSize:'14px', color:G.whiteMid, lineHeight:1.75, maxWidth:'400px', margin:'0 auto 28px' }}>
            Aradığın sayfa taşınmış, silinmiş ya da hiç olmamış olabilir. Seni doğru yere götürelim.
          </p>

          {/* Sayaç */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(212,175,55,0.08)', border:`1px solid ${G.goldBorder}`, borderRadius:'999px', padding:'8px 18px', marginBottom:'28px', fontSize:'13px', color:G.whiteMid }}>
            <div style={{ width:'20px', height:'20px', borderRadius:'50%', background:G.gold, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:900, color:G.bg, flexShrink:0 }}>
              {count}
            </div>
            saniye içinde ana sayfaya yönlendiriliyorsun
          </div>

          {/* Ana buton */}
          <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap', marginBottom:'36px' }}>
            <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:G.gold, color:G.bg, fontSize:'13px', fontWeight:900, padding:'13px 28px', borderRadius:'999px', textDecoration:'none', boxShadow:'0 4px 20px rgba(212,175,55,0.35)' }}>
              <Home size={15} /> Ana Sayfa
            </Link>
            <a href="https://wa.me/905383135720" target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'transparent', border:`1px solid rgba(212,175,55,0.3)`, color:G.whiteMid, fontSize:'13px', fontWeight:700, padding:'13px 22px', borderRadius:'999px', textDecoration:'none' }}>
              💬 Yardım Al
            </a>
          </div>

          {/* Hızlı linkler */}
          <div>
            <div style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.15em', color:G.gold, marginBottom:'12px' }}>POPÜLER SAYFALAR</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'8px', maxWidth:'360px', margin:'0 auto' }}>
              {suggestions.map((s,i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={i} whileHover={{ y:-3, borderColor:'rgba(212,175,55,0.4)' }}>
                    <Link to={s.to} style={{ display:'flex', alignItems:'center', gap:'10px', background:'rgba(13,27,62,0.5)', backdropFilter:'blur(8px)', border:`1px solid ${G.goldBorder}`, borderRadius:'12px', padding:'12px', textDecoration:'none', transition:'all 0.2s' }}>
                      <Icon size={16} style={{ color:G.gold, flexShrink:0 }} />
                      <div style={{ textAlign:'left' }}>
                        <div style={{ fontSize:'12px', fontWeight:700, color:'#fff' }}>{s.label}</div>
                        <div style={{ fontSize:'10px', color:G.whiteMid, marginTop:'2px' }}>{s.sub}</div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
