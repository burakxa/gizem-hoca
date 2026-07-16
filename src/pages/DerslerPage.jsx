import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { PlayCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'#fff', whiteMid:'rgba(255,255,255,0.5)' };

const videos = [
  { id: '2_pyykhX08M', title: 'Postürünü Geri Kazan - 25 Dakikalık Duruş ve Mobilite Çalışması', category: 'Postür' },
  { id: 'gYaAsuUH3ag', title: 'Vücudunu Hizada Tut! 40 Dakikalık Dengeleyici Pilates Flow', category: 'Full Body' },
  { id: 'zCK3RRKMtCg', title: 'Yalnızca Mat ve Sen - Kendine Ayırdığın En Güzel 30 Dakika', category: 'Başlangıç' },
  { id: '-1ELN5uIYUc', title: 'Evde Mini Ball ile Full Core & Leg & Back!', category: 'Core' },
  { id: 'AgcK7pnx8PM', title: 'Gizem Hoca ile Kontroloji Serisi 1', category: 'Reformer' },
  { id: '_QQvHmyQEx8', title: 'Mükemmel Olmak İçin Başlamak Zorundasın', category: 'Başlangıç' },
  { id: 'UBMk30rjy0o', title: '30 Dakikada Tüm Vücut - Mat Pilates Rutini', category: 'Full Body' },
  { id: 'g_tea8ZNk5A', title: 'Core Güçlendirme - Karın ve Sırt için Pilates', category: 'Core' },
  { id: 'oZRRHKmDMhI', title: 'Sabah Pilates Rutini - Güne Enerjik Başla', category: 'Başlangıç' },
  { id: 'VaoV1PrYft4', title: 'Esneklik ve Mobilite - Tam Vücut Germe Serisi', category: 'Esneklik' },
  { id: 'bKNNhBY_lSE', title: 'Reformer Pilates Temelleri', category: 'Reformer' },
  { id: 'l7MRcgvVBDQ', title: 'Hamile Pilatesi - Güvenli Gebelik Egzersizleri', category: 'Özel' },
];

const cats = ['TÜMÜ','BAŞLANGIÇ','CORE','FULL BODY','POSTÜR','REFORMER','ESNEKLİK','ÖZEL'];
const catMap = { 'TÜMÜ':'', 'BAŞLANGIÇ':'Başlangıç', 'CORE':'Core', 'FULL BODY':'Full Body', 'POSTÜR':'Postür', 'REFORMER':'Reformer', 'ESNEKLİK':'Esneklik', 'ÖZEL':'Özel' };

export default function DerslerPage() {
  const [sel, setSel] = useState(null);
  const [cat, setCat] = useState('TÜMÜ');
  const [page, setPage] = useState(1);
  const perPage = 6;
  const filtered = cat === 'TÜMÜ' ? videos : videos.filter(v => v.category === catMap[cat]);
  const total = Math.ceil(filtered.length / perPage);
  const current = filtered.slice((page-1)*perPage, page*perPage);

  return (
    <>
      <Helmet><title>Dersler - Gizem Hoca Pilates</title></Helmet>
      <div style={{ background: G.bg, fontFamily:'Montserrat,sans-serif', minHeight:'100vh' }}>
        <div style={{ padding:'32px 40px', borderBottom:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'32px', height:'2px', background:G.gold }} />
          <div>
            <p style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.2em', color:G.gold, marginBottom:'6px' }}>GİZEM HOCA PİLATES</p>
            <h1 style={{ fontSize:'56px', fontWeight:900, color:'#fff', lineHeight:0.92, letterSpacing:'-0.03em' }}>DERSLER</h1>
          </div>
        </div>

        <div style={{ display:'flex', overflowX:'auto', borderBottom:`1px solid ${G.goldBorder}` }}>
          {cats.map(c => (
            <button key={c} onClick={() => { setCat(c); setPage(1); }}
              style={{ padding:'10px 18px', fontSize:'9px', fontWeight:900, letterSpacing:'0.08em', whiteSpace:'nowrap', borderRight:`1px solid ${G.goldBorder}`, cursor:'pointer', border:'none', background: cat===c ? G.gold : 'transparent', color: cat===c ? G.bg : G.whiteMid, fontFamily:'Montserrat', borderRight:`1px solid ${G.goldBorder}` }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr' }}>
          {current.map((v, i) => (
            <motion.div key={v.id} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.05 }}
              style={{ borderBottom:`1px solid ${G.goldBorder}`, borderRight:`1px solid ${G.goldBorder}`, cursor:'pointer' }}
              onClick={() => setSel(v)}>
              <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden' }}>
                <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title}
                  style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.6)', transition:'all 0.4s' }} />
                <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(13,27,62,0.3)' }}>
                  <div style={{ width:'44px', height:'44px', background:G.gold, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <PlayCircle size={20} style={{ color:G.bg }} />
                  </div>
                </div>
                <span style={{ position:'absolute', top:'10px', left:'10px', background:G.gold, color:G.bg, fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:'999px', letterSpacing:'0.06em' }}>
                  {v.category.toUpperCase()}
                </span>
              </div>
              <div style={{ padding:'14px 16px', borderTop:`1px solid ${G.goldBorder}` }}>
                <h3 style={{ fontSize:'11px', fontWeight:700, color:'#fff', lineHeight:1.4 }}>{v.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {total > 1 && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', borderTop:`1px solid ${G.goldBorder}` }}>
            <button onClick={() => setPage(p=>p-1)} disabled={page===1}
              style={{ padding:'14px', border:'none', borderRight:`1px solid ${G.goldBorder}`, background:'transparent', cursor:'pointer', opacity: page===1?0.3:1 }}>
              <ChevronLeft size={20} style={{ color:G.gold }} />
            </button>
            {Array.from({length:total},(_,i)=>i+1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                style={{ width:'48px', height:'48px', fontSize:'11px', fontWeight:900, background: page===n?G.gold:'transparent', color: page===n?G.bg:G.whiteMid, border:'none', borderRight:`1px solid ${G.goldBorder}`, cursor:'pointer', fontFamily:'Montserrat' }}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(p=>p+1)} disabled={page===total}
              style={{ padding:'14px', border:'none', background:'transparent', cursor:'pointer', opacity: page===total?0.3:1 }}>
              <ChevronRight size={20} style={{ color:G.gold }} />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {sel && (
          <motion.div style={{ position:'fixed', inset:0, background:'rgba(7,16,41,0.97)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:'16px' }}
            onClick={() => setSel(null)} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <motion.div onClick={e=>e.stopPropagation()} style={{ position:'relative', width:'100%', maxWidth:'900px', aspectRatio:'16/9' }}
              initial={{ scale:0.9 }} animate={{ scale:1 }} exit={{ scale:0.9 }}>
              <iframe style={{ position:'absolute', inset:0, width:'100%', height:'100%', borderRadius:'8px', border:`1px solid ${G.goldBorder}` }}
                src={`https://www.youtube.com/embed/${sel.id}?autoplay=1`} title={sel.title} frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              <button style={{ position:'absolute', top:'-40px', right:0, color:G.whiteMid, background:'none', border:'none', cursor:'pointer', fontSize:'10px', fontWeight:900, letterSpacing:'0.1em', display:'flex', alignItems:'center', gap:'6px', fontFamily:'Montserrat' }}
                onClick={() => setSel(null)}>KAPAT <X size={14} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
