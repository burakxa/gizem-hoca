import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ChevronDown } from 'lucide-react';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'#fff', whiteMid:'rgba(255,255,255,0.78)', whiteLow:'rgba(255,255,255,0.25)' };

const testimonials = [
  { name:'Elif T.', job:'Öğretmen', tag:'Bireysel Ders', date:'Mart 2025', text:'6 aydır devam ediyorum ve fark inanılmaz. Hem güçlendim hem kendimi çok daha iyi hissediyorum.' },
  { name:'Selin A.', job:'Pazarlama Yöneticisi', tag:'Reformer', date:'Şubat 2025', text:'Sırt ağrılarım için başlamıştım ama sonuçlar beklediğimden çok daha iyi oldu.' },
  { name:'Neslihan K.', job:'Avukat', tag:'Grup Ders', date:'Ocak 2025', text:'Her ders sonrası yenilenmiş hissediyorum. Sadece egzersiz değil, tam bir terapi.' },
  { name:'Merve K.', job:'Doktor', tag:'Online Ders', date:'Aralık 2024', text:'Uzun çalışma saatleri sonrası enerji seviyem gözle görülür arttı.' },
  { name:'Ayşe B.', job:'Ev Hanımı', tag:'Bireysel Ders', date:'Kasım 2024', text:'Doğum sonrası özel programla adım adım güçlendim. 4 ayda hem fiziksel hem psikolojik olarak çok daha iyiyim.' },
  { name:'Zeynep Ö.', job:'Mimar', tag:'Online Ders', date:'Ekim 2024', text:'Yurt dışından katılıyorum, hiç sorun yok. Sanki yanındaymış gibi pozisyonu düzeltiyor.' },
];

const tags = ['TÜMÜ','BİREYSEL DERS','GRUP DERS','REFORMER','ONLİNE DERS'];
const tagMap = { 'TÜMÜ':'', 'BİREYSEL DERS':'Bireysel Ders', 'GRUP DERS':'Grup Ders', 'REFORMER':'Reformer', 'ONLİNE DERS':'Online Ders' };

export default function MusteriYorumlariPage() {
  const [activeTag, setActiveTag] = useState('TÜMÜ');
  const [visibleCount, setVisibleCount] = useState(4);
  const filtered = activeTag === 'TÜMÜ' ? testimonials : testimonials.filter(t => t.tag === tagMap[activeTag]);
  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <Helmet>
        <title>Öğrenci Yorumları | Gizem Hoca Pilates Beşiktaş</title>
        <meta name="description" content="500+ öğrencinin Gizem Hoca pilates deneyimleri. Gerçek yorumlar ve dönüşüm hikayeleri." />
      </Helmet>
      <div style={{ background:G.bg, fontFamily:'Montserrat,sans-serif', minHeight:'100vh' }}>
        <div style={{ padding:'32px 40px', borderBottom:`1px solid ${G.goldBorder}`, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <div style={{ width:'32px', height:'2px', background:G.gold }} />
            <div>
              <p style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.2em', color:G.gold, marginBottom:'6px' }}>GİZEM HOCA PİLATES</p>
              <h1 style={{ fontSize:'56px', fontWeight:900, color:'#fff', lineHeight:0.92, letterSpacing:'-0.03em' }}>YORUMLAR</h1>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <span style={{ fontSize:'36px', fontWeight:900, color:G.gold }}>5.0</span>
            <div>
              <div style={{ color:G.gold, fontSize:'13px' }}>★★★★★</div>
              <div style={{ fontSize:'10px', color:G.whiteMid }}>{testimonials.length} yorum</div>
            </div>
          </div>
        </div>

        <div style={{ display:'flex', overflowX:'auto', borderBottom:`1px solid ${G.goldBorder}` }}>
          {tags.map(tag => (
            <button key={tag} onClick={() => { setActiveTag(tag); setVisibleCount(4); }}
              style={{ padding:'10px 18px', fontSize:'9px', fontWeight:900, letterSpacing:'0.08em', whiteSpace:'nowrap', borderRight:`1px solid ${G.goldBorder}`, cursor:'pointer', border:'none', background: activeTag===tag ? G.gold : 'transparent', color: activeTag===tag ? G.bg : G.whiteMid, fontFamily:'Montserrat', borderRight:`1px solid ${G.goldBorder}` }}>
              {tag}
            </button>
          ))}
        </div>

        <div>
          {visible.map((t, i) => (
            <motion.div key={t.name+t.tag} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.05 }}
              style={{ padding:'28px 40px', borderBottom:`1px solid ${G.goldBorder}`, display:'grid', gridTemplateColumns:'180px 1fr', gap:'24px' }}>
              <div>
                <p style={{ fontSize:'13px', fontWeight:900, color:'#fff' }}>{t.name}</p>
                <p style={{ fontSize:'11px', color:G.whiteMid, marginTop:'4px' }}>{t.job}</p>
                <p style={{ fontSize:'10px', color:G.whiteLow, marginTop:'4px' }}>{t.date}</p>
                <span style={{ display:'inline-block', marginTop:'8px', fontSize:'8px', fontWeight:900, letterSpacing:'0.06em', border:`1px solid ${G.goldBorder}`, color:G.gold, padding:'3px 10px', borderRadius:'999px' }}>
                  {t.tag.toUpperCase()}
                </span>
              </div>
              <div>
                <div style={{ color:G.gold, fontSize:'13px', marginBottom:'10px' }}>★★★★★</div>
                <p style={{ fontSize:'15px', color:G.white, lineHeight:1.7, fontStyle:'italic' }}>"{t.text}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div style={{ borderTop:`1px solid ${G.goldBorder}`, padding:'20px', textAlign:'center' }}>
            <button onClick={() => setVisibleCount(v=>v+4)}
              style={{ display:'inline-flex', alignItems:'center', gap:'6px', fontSize:'9px', fontWeight:900, letterSpacing:'0.1em', color:G.gold, background:'none', border:'none', cursor:'pointer', fontFamily:'Montserrat' }}>
              DAHA FAZLA <ChevronDown size={14} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
