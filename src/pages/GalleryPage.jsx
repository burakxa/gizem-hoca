import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { X } from 'lucide-react';

const G = { bg:'#0d1b3e', gold:'#d4af37', goldBorder:'rgba(212,175,55,0.2)', whiteMid:'rgba(255,255,255,0.5)' };

const images = [
  { id:1, src:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', alt:'Mat pilates', category:'Stüdyo' },
  { id:2, src:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', alt:'Reformer', category:'Reformer' },
  { id:3, src:'https://images.unsplash.com/photo-1599402318494-082465b828a2?w=800', alt:'Esneme', category:'Dersler' },
  { id:4, src:'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800', alt:'Denge', category:'Dersler' },
  { id:5, src:'https://images.unsplash.com/photo-1571942674757-c342c31345c1?w=800', alt:'Pozisyon', category:'Dersler' },
  { id:6, src:'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800', alt:'Grup', category:'Grup' },
  { id:7, src:'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800', alt:'Stüdyo', category:'Stüdyo' },
  { id:8, src:'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800', alt:'Sabah', category:'Dersler' },
  { id:9, src:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', alt:'Meditasyon', category:'Mindfulness' },
  { id:10, src:'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800', alt:'Reformer grup', category:'Reformer' },
  { id:11, src:'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800', alt:'Bireysel', category:'Dersler' },
  { id:12, src:'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800', alt:'Detay', category:'Stüdyo' },
];

const cats = ['TÜMÜ','STÜDYO','DERSLER','REFORMER','GRUP','MİNDFULNESS'];
const catMap = { 'TÜMÜ':'', 'STÜDYO':'Stüdyo', 'DERSLER':'Dersler', 'REFORMER':'Reformer', 'GRUP':'Grup', 'MİNDFULNESS':'Mindfulness' };

export default function GalleryPage() {
  const [sel, setSel] = useState(null);
  const [cat, setCat] = useState('TÜMÜ');
  const filtered = cat === 'TÜMÜ' ? images : images.filter(i => i.category === catMap[cat]);

  return (
    <>
      <Helmet><title>Galeri - Gizem Hoca Pilates</title></Helmet>
      <div style={{ background:G.bg, fontFamily:'Montserrat,sans-serif', minHeight:'100vh' }}>
        <div style={{ padding:'32px 40px', borderBottom:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'32px', height:'2px', background:G.gold }} />
          <div>
            <p style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.2em', color:G.gold, marginBottom:'6px' }}>GİZEM HOCA PİLATES</p>
            <h1 style={{ fontSize:'56px', fontWeight:900, color:'#fff', lineHeight:0.92, letterSpacing:'-0.03em' }}>GALERİ</h1>
          </div>
        </div>
        <div style={{ display:'flex', overflowX:'auto', borderBottom:`1px solid ${G.goldBorder}` }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{ padding:'10px 18px', fontSize:'9px', fontWeight:900, letterSpacing:'0.08em', whiteSpace:'nowrap', borderRight:`1px solid ${G.goldBorder}`, cursor:'pointer', border:'none', background: cat===c ? G.gold : 'transparent', color: cat===c ? G.bg : G.whiteMid, fontFamily:'Montserrat', borderRight:`1px solid ${G.goldBorder}` }}>
              {c}
            </button>
          ))}
        </div>
        <div className='gallery-grid' style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div key={img.id} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ delay:i*0.04 }}
                style={{ aspectRatio:'1', overflow:'hidden', cursor:'pointer', borderBottom:`1px solid ${G.goldBorder}`, borderRight:`1px solid ${G.goldBorder}`, position:'relative' }}
                onClick={() => setSel(img)}>
                <img src={img.src} alt={img.alt} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.6)', transition:'all 0.4s' }} />
                <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'flex-end', padding:'10px', background:'linear-gradient(to top, rgba(7,16,41,0.7) 0%, transparent 60%)', opacity:0, transition:'opacity 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity=1} onMouseLeave={e => e.currentTarget.style.opacity=0}>
                  <p style={{ color:'#fff', fontSize:'9px', fontWeight:900, letterSpacing:'0.06em' }}>{img.alt.toUpperCase()}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {sel && (
          <motion.div style={{ position:'fixed', inset:0, background:'rgba(7,16,41,0.97)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:'16px' }}
            onClick={() => setSel(null)} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <motion.div onClick={e=>e.stopPropagation()} style={{ position:'relative', maxWidth:'860px', width:'100%' }}
              initial={{ scale:0.9 }} animate={{ scale:1 }} exit={{ scale:0.9 }}>
              <img src={sel.src} alt={sel.alt} style={{ width:'100%', objectFit:'contain', maxHeight:'80vh', borderRadius:'6px', border:`1px solid ${G.goldBorder}` }} />
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'12px' }}>
                <p style={{ color:'#fff', fontSize:'11px', fontWeight:700 }}>{sel.alt}</p>
                <button onClick={() => setSel(null)} style={{ color:G.whiteMid, background:'none', border:'none', cursor:'pointer', fontSize:'10px', fontWeight:900, letterSpacing:'0.1em', display:'flex', alignItems:'center', gap:'6px', fontFamily:'Montserrat' }}>
                  KAPAT <X size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
