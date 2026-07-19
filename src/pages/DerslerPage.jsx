import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { PlayCircle, X, ChevronLeft, ChevronRight, Clock, Users, Monitor, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'rgba(255,255,255,0.92)', whiteMid:'rgba(255,255,255,0.65)', whiteLow:'rgba(255,255,255,0.3)' };

const dersTypes = [
  { icon:'🧘', title:'Mat Pilates', sub:'Temel & ileri', desc:'Sadece vücut ağırlığınızla derin kas aktivasyonu. Her seviyeye uygun, en saf pilates deneyimi.', features:['Başlangıç dostu','Ev ortamında da uygulanabilir','Core güçlendirme','Esneklik geliştirme'], color:'#00e87a', href:'#video' },
  { icon:'⚙️', title:'Reformer Pilates', sub:'Alet eğitimi', desc:'Yay direnci sistemiyle çalışan özel reformer aletiyle daha derin kas aktivasyonu ve hızlı ilerleme.', features:['Daha hızlı sonuç','Geniş hareket açısı','Rehabilitasyon için ideal','Her seviyeye ayarlanabilir'], color:G.gold, href:'#video', popular:true },
  { icon:'🤱', title:'Hamile Pilatesi', sub:'Uzmanlık alanı', desc:'Doktor onaylı, trimestere özel güvenli program. Pelvik taban, nefes ve postür odaklı.', features:['Her trimester uygun','Pelvik taban güçlendirme','Doğuma hazırlık','Doğum sonrası iyileşme'], color:'#ff9fd4', href:'#video' },
  { icon:'💻', title:'Online Ders', sub:'Her yerden katıl', desc:'Evinden, ofisinden veya nerede olursan ol. Aynı kalite, esnek saatler, kişisel program.', features:['Esnek saat seçimi','Video arşivi','Canlı geri bildirim','Türkiye geneli'], color:'#75aadb', href:'#video' },
];

const videos = [
  { id:'2_pyykhX08M', title:'Postürünü Geri Kazan', sub:'25 dk · Postür & Mobilite', cat:'Postür', level:'Orta' },
  { id:'gYaAsuUH3ag', title:'Full Body Pilates Flow', sub:'40 dk · Tam Vücut', cat:'Full Body', level:'Orta' },
  { id:'zCK3RRKMtCg', title:'Kendine Ayırdığın 30 Dakika', sub:'30 dk · Mat', cat:'Başlangıç', level:'Başlangıç' },
  { id:'-1ELN5uIYUc', title:'Mini Ball ile Core & Leg', sub:'35 dk · Core', cat:'Core', level:'Orta' },
  { id:'AgcK7pnx8PM', title:'Kontroloji Serisi 1', sub:'45 dk · Reformer', cat:'Reformer', level:'İleri' },
  { id:'_QQvHmyQEx8', title:'Başlamak İçin Mükemmel Olmak Şart Değil', sub:'20 dk · Başlangıç', cat:'Başlangıç', level:'Başlangıç' },
  { id:'UBMk30rjy0o', title:'30 dk Tüm Vücut Mat', sub:'30 dk · Full Body', cat:'Full Body', level:'Orta' },
  { id:'g_tea8ZNk5A', title:'Core Güçlendirme', sub:'25 dk · Karın & Sırt', cat:'Core', level:'Orta' },
  { id:'oZRRHKmDMhI', title:'Sabah Pilates Rutini', sub:'20 dk · Enerji', cat:'Başlangıç', level:'Başlangıç' },
  { id:'VaoV1PrYft4', title:'Tam Vücut Germe Serisi', sub:'30 dk · Esneklik', cat:'Esneklik', level:'Başlangıç' },
  { id:'bKNNhBY_lSE', title:'Reformer Temelleri', sub:'40 dk · Reformer', cat:'Reformer', level:'Başlangıç' },
  { id:'l7MRcgvVBDQ', title:'Hamile Pilatesi — Güvenli Gebelik', sub:'30 dk · Hamile', cat:'Hamile', level:'Başlangıç' },
];

const cats = ['Tümü','Başlangıç','Core','Full Body','Postür','Reformer','Esneklik','Hamile'];
const levelColor = { 'Başlangıç':'#00e87a', 'Orta':G.gold, 'İleri':'#ff9fd4' };

export default function DerslerPage() {
  const [sel, setSel] = useState(null);
  const [cat, setCat] = useState('Tümü');
  const [page, setPage] = useState(1);
  const perPage = 6;
  const filtered = cat === 'Tümü' ? videos : videos.filter(v => v.cat === cat);
  const total = Math.ceil(filtered.length / perPage);
  const current = filtered.slice((page-1)*perPage, page*perPage);

  return (
    <>
      <Helmet>
        <title>Pilates Dersleri | Mat, Reformer, Hamile Pilatesi | Gizem Hoca</title>
        <meta name="description" content="Beşiktaş'ta mat pilates, reformer pilates, hamile pilatesi ve online pilates dersleri. Bireysel ve grup seçenekleri." />
      </Helmet>
      <div style={{ background:G.bg, fontFamily:'Montserrat,sans-serif', minHeight:'100vh' }}>

        {/* Başlık */}
        <div style={{ padding:'clamp(28px,5vw,48px) clamp(16px,4vw,40px)', borderBottom:`1px solid ${G.goldBorder}`, background:`linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 100%)` }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
            <div style={{ width:'28px', height:'2px', background:G.gold }} />
            <span style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.2em', color:G.gold }}>GİZEM HOCA PİLATES</span>
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'16px' }}>
            <div>
              <h1 style={{ fontSize:'clamp(36px,7vw,60px)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', lineHeight:0.9, marginBottom:'12px' }}>
                Ders<br /><span style={{ color:G.gold }}>Seçenekleri</span>
              </h1>
              <p style={{ fontSize:'14px', color:G.whiteMid, maxWidth:'420px', lineHeight:1.7 }}>
                Her seviye ve hedefe uygun pilates dersleri. İlk ders ücretsiz — başlamak için mükemmel zamanlama yok, şimdi başla.
              </p>
            </div>
            <Link to="/quiz"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:G.goldFaint, border:`1.5px solid rgba(212,175,55,0.35)`, color:G.gold, fontSize:'13px', fontWeight:900, padding:'12px 22px', borderRadius:'999px', textDecoration:'none', whiteSpace:'nowrap' }}>
              🎯 Hangi Ders Sana Uygun?
            </Link>
          </div>
        </div>

        {/* 4 Ders Tipi */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', borderBottom:`1px solid ${G.goldBorder}` }} className="services-grid">
          {dersTypes.map((d,i) => (
            <motion.div key={i} whileHover={{ background:'rgba(212,175,55,0.04)' }}
              initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
              style={{ padding:'clamp(20px,3vw,32px)', borderRight:i%2===0?`1px solid ${G.goldBorder}`:'none', borderBottom:i<2?`1px solid ${G.goldBorder}`:'none', position:'relative', transition:'background 0.2s' }}>
              {d.popular && (
                <div style={{ position:'absolute', top:'16px', right:'16px', background:G.gold, color:G.bg, fontSize:'9px', fontWeight:900, padding:'3px 10px', borderRadius:'999px', letterSpacing:'0.06em' }}>
                  EN POPÜLER ✦
                </div>
              )}
              <div style={{ fontSize:'32px', marginBottom:'12px' }}>{d.icon}</div>
              <div style={{ display:'flex', alignItems:'baseline', gap:'10px', marginBottom:'6px' }}>
                <h3 style={{ fontSize:'clamp(16px,2.5vw,20px)', fontWeight:900, color:'#fff', margin:0 }}>{d.title}</h3>
                <span style={{ fontSize:'11px', fontWeight:700, color:d.color, background:`${d.color}18`, border:`1px solid ${d.color}33`, padding:'2px 8px', borderRadius:'999px' }}>{d.sub}</span>
              </div>
              <p style={{ fontSize:'13px', color:G.whiteMid, lineHeight:1.7, marginBottom:'14px' }}>{d.desc}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'16px' }}>
                {d.features.map((f,j) => (
                  <span key={j} style={{ fontSize:'11px', color:G.whiteMid, display:'flex', alignItems:'center', gap:'4px' }}>
                    <span style={{ color:d.color, fontSize:'10px' }}>✦</span> {f}
                  </span>
                ))}
              </div>
              <a href={`https://wa.me/905383135720?text=${encodeURIComponent(`Merhaba! ${d.title} dersi hakkında bilgi almak istiyorum.`)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:'6px', background: d.popular?G.gold:'transparent', border:`1.5px solid ${d.popular?G.gold:d.color+'66'}`, color:d.popular?G.bg:d.color, fontSize:'12px', fontWeight:900, padding:'9px 18px', borderRadius:'999px', textDecoration:'none', transition:'all 0.2s' }}>
                Bilgi Al <ArrowRight size={13} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Video bölümü */}
        <div id="video" style={{ borderBottom:`1px solid ${G.goldBorder}` }}>
          <div style={{ padding:'clamp(16px,3vw,24px) clamp(16px,4vw,40px)', borderBottom:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <div style={{ width:'22px', height:'2px', background:G.gold }} />
              <span style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.15em', color:G.gold }}>ÜCRETSİZ VİDEO DERSLERİ</span>
            </div>
            {/* Kategori filtreleri */}
            <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
              {cats.map(c => (
                <button key={c} onClick={() => { setCat(c); setPage(1); }}
                  style={{ padding:'6px 12px', fontSize:'11px', fontWeight:700, borderRadius:'999px', border:`1.5px solid ${cat===c?G.gold:G.goldBorder}`, background:cat===c?'rgba(212,175,55,0.12)':'transparent', color:cat===c?G.gold:G.whiteMid, cursor:'pointer', fontFamily:'Montserrat', transition:'all 0.2s', whiteSpace:'nowrap' }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)' }} className="services-grid">
            {current.map((v,i) => (
              <motion.div key={v.id}
                initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }} transition={{ delay:i*0.05 }}
                onClick={() => setSel(v)} style={{ cursor:'pointer', borderRight:i%3!==2?`1px solid ${G.goldBorder}`:'none', borderBottom:`1px solid ${G.goldBorder}` }}>
                <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden' }}>
                  <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title}
                    style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.55) saturate(0.8)', transition:'transform 0.4s, filter 0.4s' }}
                    onMouseEnter={e => { e.target.style.transform='scale(1.06)'; e.target.style.filter='brightness(0.7) saturate(1)'; }}
                    onMouseLeave={e => { e.target.style.transform='scale(1)'; e.target.style.filter='brightness(0.55) saturate(0.8)'; }} />
                  <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <motion.div whileHover={{ scale:1.1 }} style={{ width:'48px', height:'48px', background:'rgba(212,175,55,0.9)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 20px rgba(212,175,55,0.5)' }}>
                      <PlayCircle size={22} style={{ color:G.bg }} />
                    </motion.div>
                  </div>
                  <div style={{ position:'absolute', top:'10px', left:'10px', display:'flex', gap:'6px' }}>
                    <span style={{ background:'rgba(7,16,41,0.85)', backdropFilter:'blur(4px)', color:G.gold, fontSize:'10px', fontWeight:700, padding:'3px 8px', borderRadius:'999px' }}>{v.cat}</span>
                    <span style={{ background:`${levelColor[v.level]}22`, border:`1px solid ${levelColor[v.level]}44`, color:levelColor[v.level], fontSize:'10px', fontWeight:700, padding:'3px 8px', borderRadius:'999px' }}>{v.level}</span>
                  </div>
                </div>
                <div style={{ padding:'14px 16px' }}>
                  <h3 style={{ fontSize:'13px', fontWeight:900, color:'#fff', lineHeight:1.35, marginBottom:'5px' }}>{v.title}</h3>
                  <p style={{ fontSize:'11px', color:G.whiteMid }}>{v.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sayfalama */}
          {total > 1 && (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', gap:'4px', borderTop:`1px solid ${G.goldBorder}` }}>
              <button onClick={() => setPage(p=>Math.max(1,p-1))} disabled={page===1}
                style={{ width:'36px', height:'36px', borderRadius:'50%', border:`1px solid ${G.goldBorder}`, background:'transparent', cursor:page===1?'default':'pointer', opacity:page===1?0.3:1, display:'flex', alignItems:'center', justifyContent:'center', color:G.gold }}>
                <ChevronLeft size={16} />
              </button>
              {Array.from({length:total},(_,i)=>i+1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  style={{ width:'36px', height:'36px', borderRadius:'50%', border:`1px solid ${page===n?G.gold:G.goldBorder}`, background:page===n?G.gold:'transparent', color:page===n?G.bg:G.whiteMid, fontSize:'12px', fontWeight:900, cursor:'pointer', fontFamily:'Montserrat', transition:'all 0.2s' }}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage(p=>Math.min(total,p+1))} disabled={page===total}
                style={{ width:'36px', height:'36px', borderRadius:'50%', border:`1px solid ${G.goldBorder}`, background:'transparent', cursor:page===total?'default':'pointer', opacity:page===total?0.3:1, display:'flex', alignItems:'center', justifyContent:'center', color:G.gold }}>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ padding:'clamp(24px,4vw,40px) clamp(16px,4vw,40px)', background:'rgba(212,175,55,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px' }}>
          <div>
            <h2 style={{ fontSize:'clamp(18px,3vw,24px)', fontWeight:900, color:'#fff', marginBottom:'6px' }}>Hazır mısın? 🎯</h2>
            <p style={{ fontSize:'13px', color:G.whiteMid }}>İlk tanışma seansı ücretsiz. Sana uygun dersi birlikte bulalım.</p>
          </div>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
            <a href="https://wa.me/905383135720?text=Merhaba!%20Ücretsiz%20tanışma%20seansı%20istiyorum."
              target="_blank" rel="noopener noreferrer"
              style={{ background:G.gold, color:G.bg, fontSize:'13px', fontWeight:900, padding:'12px 24px', borderRadius:'999px', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'8px' }}>
              💬 WhatsApp ile Randevu <ArrowRight size={14} />
            </a>
            <Link to="/fiyatlar" style={{ background:'transparent', border:`1px solid rgba(212,175,55,0.3)`, color:G.whiteMid, fontSize:'13px', fontWeight:700, padding:'12px 20px', borderRadius:'999px', textDecoration:'none' }}>
              Fiyatları Gör
            </Link>
          </div>
        </div>
      </div>

      {/* Video lightbox */}
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setSel(null)}
            style={{ position:'fixed', inset:0, background:'rgba(7,16,41,0.97)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9990, padding:'20px' }}>
            <motion.div onClick={e=>e.stopPropagation()} initial={{ scale:0.88, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.88, opacity:0 }}
              style={{ width:'100%', maxWidth:'900px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
                <div>
                  <div style={{ fontSize:'14px', fontWeight:900, color:'#fff' }}>{sel.title}</div>
                  <div style={{ fontSize:'12px', color:G.whiteMid, marginTop:'3px' }}>{sel.sub}</div>
                </div>
                <button onClick={() => setSel(null)}
                  style={{ display:'flex', alignItems:'center', gap:'6px', background:'rgba(255,255,255,0.08)', border:'none', color:G.whiteMid, fontSize:'12px', fontWeight:700, padding:'8px 14px', borderRadius:'999px', cursor:'pointer', fontFamily:'Montserrat' }}>
                  <X size={13} /> Kapat
                </button>
              </div>
              <div style={{ aspectRatio:'16/9', borderRadius:'12px', overflow:'hidden', border:`1px solid ${G.goldBorder}` }}>
                <iframe style={{ width:'100%', height:'100%', border:'none' }}
                  src={`https://www.youtube.com/embed/${sel.id}?autoplay=1&rel=0`}
                  title={sel.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
