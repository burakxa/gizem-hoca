import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'rgba(255,255,255,0.92)' };

const photos = [
  { src:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600', alt:'Mat Pilates', cat:'Mat', tall:true },
  { src:'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600', alt:'Reformer', cat:'Reformer' },
  { src:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', alt:'Yoga Flow', cat:'Online' },
  { src:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600', alt:'Studio', cat:'Stüdyo', tall:true },
  { src:'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600', alt:'Pilates Core', cat:'Mat' },
  { src:'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600', alt:'Balance', cat:'Reformer' },
  { src:'https://images.unsplash.com/photo-1540206395-68808572332f?w=600', alt:'Stretch', cat:'Mat' },
  { src:'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600', alt:'Pilates Class', cat:'Online', tall:true },
  { src:'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600', alt:'Wellness', cat:'Stüdyo' },
];

const cats = ['Tümü','Mat','Reformer','Online','Stüdyo'];

export default function GalleryPage() {
  const [selected, setSelected] = useState('Tümü');
  const [lightbox, setLightbox] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  const filtered = selected === 'Tümü' ? photos : photos.filter(p => p.cat === selected);

  return (
    <>
      <Helmet>
        <title>Galeri | Pilates Stüdyo Fotoğrafları | Gizem Hoca Maltepe</title>
        <meta name="description" content="Gizem Hoca Maltepe pilates stüdyosundan fotoğraflar. Mat pilates, reformer ve stüdyo ortamı." />
        <link rel="canonical" href="https://gizemhoca.net/galeri" />
      </Helmet>
      <div style={{ background:G.bg, minHeight:'100vh', fontFamily:'Montserrat,sans-serif' }}>

        {/* Başlık */}
        <div className="fade-up" style={{ padding:'clamp(24px,4vw,40px) clamp(16px,4vw,40px) 0', borderBottom:`1px solid ${G.goldBorder}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'28px', height:'2px', background:G.gold }} />
            <p style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.2em', color:G.gold }}>GALERİ</p>
          </div>
          <h1 style={{ fontSize:'clamp(32px,7vw,52px)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', marginBottom:'20px' }}>
            Stüdyodan<br /><span style={{ color:G.gold }}>Kareler</span>
          </h1>

          {/* Filtre */}
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', paddingBottom:'20px' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setSelected(c)}
                style={{ padding:'7px 16px', borderRadius:'999px', border:`1.5px solid ${selected===c ? G.gold : G.goldBorder}`, background:selected===c ? 'rgba(212,175,55,0.12)' : 'transparent', color:selected===c ? G.gold : 'rgba(255,255,255,0.5)', fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:'Montserrat', transition:'all 0.2s' }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div style={{ padding:'24px clamp(16px,4vw,40px)', columns:'repeat(auto-fill, minmax(260px, 1fr))', columnGap:'12px' }}>
          {filtered.map((photo, i) => (
            <motion.div key={`${photo.src}-${i}`}
              layout initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }}
              transition={{ delay: i * 0.06 }}
              onHoverStart={() => setHoverId(i)} onHoverEnd={() => setHoverId(null)}
              onClick={() => setLightbox(photo)}
              style={{ breakInside:'avoid', marginBottom:'12px', borderRadius:'12px', overflow:'hidden', cursor:'pointer', position:'relative', border:`1px solid ${hoverId===i ? G.gold : G.goldBorder}`, transition:'border-color 0.2s', display:'block' }}>
              <img loading="lazy" src={photo.src} alt={photo.alt}
                style={{ width:'100%', display:'block', objectFit:'cover', height: photo.tall ? '340px' : '220px', transition:'transform 0.5s ease', transform: hoverId===i ? 'scale(1.05)' : 'scale(1)', filter:'brightness(0.75) saturate(0.9)' }} />

              {/* Overlay */}
              <motion.div animate={{ opacity: hoverId===i ? 1 : 0 }} transition={{ duration:0.2 }}
                style={{ position:'absolute', inset:0, background:'rgba(13,27,62,0.5)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'8px' }}>
                <div style={{ width:'40px', height:'40px', borderRadius:'50%', background:G.gold, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <ZoomIn size={18} style={{ color:G.bg }} />
                </div>
                <span style={{ fontSize:'12px', fontWeight:700, color:'#fff', letterSpacing:'0.06em' }}>BÜYÜT</span>
              </motion.div>

              {/* Kategori */}
              <div style={{ position:'absolute', top:'10px', left:'10px', background:'rgba(7,16,41,0.8)', border:`1px solid ${G.goldBorder}`, color:G.gold, fontSize:'10px', fontWeight:700, padding:'3px 10px', borderRadius:'999px', backdropFilter:'blur(4px)' }}>
                {photo.cat}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setLightbox(null)}
              style={{ position:'fixed', inset:0, background:'rgba(7,16,41,0.97)', zIndex:9990, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
              <motion.div initial={{ scale:0.85, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.85, opacity:0 }}
                onClick={e => e.stopPropagation()}
                style={{ position:'relative', maxWidth:'860px', width:'100%' }}>
                <img loading="lazy" src={lightbox.src.replace('w=600','w=1200')} alt={lightbox.alt}
                  style={{ width:'100%', borderRadius:'12px', border:`1px solid ${G.goldBorder}`, display:'block', maxHeight:'80vh', objectFit:'contain' }} />
                <button onClick={() => setLightbox(null)}
                  style={{ position:'absolute', top:'-44px', right:0, background:'none', border:'none', color:'rgba(255,255,255,0.6)', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', fontFamily:'Montserrat', fontWeight:700 }}>
                  KAPAT <X size={14} />
                </button>
                <div style={{ position:'absolute', bottom:'12px', left:'12px', background:'rgba(7,16,41,0.8)', color:G.gold, fontSize:'11px', fontWeight:700, padding:'5px 12px', borderRadius:'999px', backdropFilter:'blur(4px)' }}>
                  {lightbox.cat} · {lightbox.alt}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
