import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, PlayCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const PHOTO = 'https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/71e533503d331149fe73f8e165f13f5b.png';
const G = { bg: '#0d1b3e', dark: '#071029', gold: '#d4af37', goldFaint: 'rgba(212,175,55,0.12)', goldBorder: 'rgba(212,175,55,0.25)', white: 'rgba(255,255,255,0.85)', whiteMid: 'rgba(255,255,255,0.45)', whiteLow: 'rgba(255,255,255,0.15)' };

const testimonials = [
  { name: 'Elif T.', job: 'Öğretmen', tag: 'Bireysel', text: 'Sırt ağrılarım tamamen geçti, duruşum düzeldi. Rehberliği inanılmaz.' },
  { name: 'Selin A.', job: 'Pazarlama', tag: 'Grup', text: 'Her ders sonrası yenilenmiş hissediyorum. Adeta terapi.' },
  { name: 'Merve K.', job: 'Doktor', tag: 'Online', text: '3 ayda fark inanılmaz. Hem güçlendim hem rahatladım.' },
];

const videos = [
  { id: '2_pyykhX08M', title: 'Postürünü Geri Kazan', dur: '25 dk' },
  { id: 'gYaAsuUH3ag', title: 'Dengeleyici Pilates Flow', dur: '40 dk' },
  { id: 'zCK3RRKMtCg', title: 'Mat Pilates Rutini', dur: '30 dk' },
];

const AnimNum = ({ n, s }) => {
  const [c, setC] = useState(0);
  useEffect(() => {
    let v = 0; const step = n / 60;
    const t = setInterval(() => { v += step; if (v >= n) { setC(n); clearInterval(t); } else setC(Math.floor(v)); }, 16);
    return () => clearInterval(t);
  }, [n]);
  return <>{c}{s}</>;
};

const Btn = ({ style, ...p }) => <button style={{ borderRadius: '999px', fontFamily: 'Montserrat', fontWeight: 900, letterSpacing: '0.06em', fontSize: '10px', cursor: 'pointer', border: 'none', ...style }} {...p} />;

export default function HomePage() {
  const [selVideo, setSelVideo] = useState(null);
  const [statsVis, setStatsVis] = useState(false);
  const [activeT, setActiveT] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActiveT(p => (p + 1) % testimonials.length), 3500);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ background: G.bg, fontFamily: 'Montserrat, sans-serif' }}>

      {/* HERO */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '85vh', borderBottom: `1px solid ${G.goldBorder}` }}>
        <motion.div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: `1px solid ${G.goldBorder}`, position: 'relative', overflow: 'hidden' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <div style={{ position: 'absolute', bottom: '-60px', left: '-40px', width: '260px', height: '260px', borderRadius: '50%', background: G.gold, opacity: 0.04, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', border: `3px solid ${G.gold}`, opacity: 0.08, pointerEvents: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '2px', background: G.gold }} />
            <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.2em', color: G.gold }}>PİLATES EĞİTMENİ · EST. 2016</span>
          </div>

          <div>
            <motion.h1 style={{ fontSize: '60px', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '18px' }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
              Move.<br />Breathe.<br /><span style={{ color: G.gold }}>Thrive.</span>
            </motion.h1>
            <motion.p style={{ fontSize: '13px', color: G.whiteMid, lineHeight: 1.7, maxWidth: '280px', marginBottom: '24px' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Hareketin dönüştürücü gücüne inanıyorum. Her öğrencimin potansiyelini ortaya çıkarmasına yardım ediyorum.
            </motion.p>
            <motion.div style={{ display: 'flex', gap: '10px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Link to="/fiyatlar"><Btn style={{ background: G.gold, color: G.bg, padding: '11px 22px' }}>DERS AL →</Btn></Link>
              <Link to="/hakkimda"><Btn style={{ background: 'transparent', color: G.whiteMid, padding: '11px 18px', border: `1.5px solid ${G.whiteLow}` }}>HAKKIMDA</Btn></Link>
            </motion.div>
          </div>

          <motion.div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', paddingTop: '24px', borderTop: `1px solid ${G.goldBorder}` }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            onViewportEnter={() => setStatsVis(true)}>
            {[{ n: 500, s: '+', l: 'ÖĞRENCİ' }, { n: 8, s: '+', l: 'YIL' }, { n: 4, s: '', l: 'SERTİFİKA' }].map((st, i) => (
              <div key={i} style={{ background: G.goldFaint, border: `1px solid ${G.goldBorder}`, borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 900, color: G.gold, lineHeight: 1 }}>
                  {statsVis ? <AnimNum n={st.n} s={st.s} /> : `0${st.s}`}
                </div>
                <div style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.1em', color: G.whiteLow, marginTop: '4px' }}>{st.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div style={{ position: 'relative', overflow: 'hidden', minHeight: '400px' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <img src={PHOTO} alt="Gizem Hoca" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, filter: 'grayscale(0.3) brightness(0.7) sepia(0.2)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,16,41,0.7) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', top: '16px', left: '16px', background: G.gold, color: G.bg, fontSize: '9px', fontWeight: 900, padding: '6px 14px', borderRadius: '999px', letterSpacing: '0.06em' }}>
            ✦ 500+ ÖĞRENCİ
          </div>
          <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(7,16,41,0.8)', border: `1px solid ${G.gold}`, color: G.gold, fontSize: '9px', fontWeight: 900, padding: '6px 14px', borderRadius: '999px' }}>
            8+ Yıl Deneyim
          </div>
        </motion.div>
      </div>

      {/* HİZMETLER */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: `1px solid ${G.goldBorder}` }}>
        {[
          { icon: '👤', t: 'Bireysel Ders', d: 'Size özel program.' },
          { icon: '👥', t: 'Grup Dersi', d: 'Max 4 kişi.' },
          { icon: '💻', t: 'Online Ders', d: 'Her yerden.' },
          { icon: '🏋️', t: 'Reformer', d: 'Alet eğitimi.', accent: true },
        ].map((s, i) => (
          <motion.div key={i} style={{ padding: '20px', borderRight: i < 3 ? `1px solid ${G.goldBorder}` : 'none', background: s.accent ? G.goldFaint : 'transparent' }}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <div style={{ fontSize: '22px', marginBottom: '10px' }}>{s.icon}</div>
            <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.06em', color: s.accent ? G.gold : '#fff', marginBottom: '5px' }}>{s.t}</div>
            <div style={{ fontSize: '11px', color: G.whiteMid, lineHeight: 1.5 }}>{s.d}</div>
          </motion.div>
        ))}
      </div>

      {/* VİDEO + BİYO */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${G.goldBorder}` }}>
        <div style={{ padding: '40px', borderRight: `1px solid ${G.goldBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '2px', background: G.gold }} />
            <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold }}>ÖNE ÇIKAN DERSLER</span>
          </div>
          <motion.div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${G.goldBorder}`, cursor: 'pointer', marginBottom: '14px' }}
            onClick={() => setSelVideo(videos[0])} whileHover={{ scale: 1.01 }}>
            <img src={`https://img.youtube.com/vi/${videos[0].id}/hqdefault.jpg`} alt={videos[0].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '48px', height: '48px', background: G.gold, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PlayCircle size={22} style={{ color: G.bg }} />
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px', background: 'linear-gradient(to top, rgba(7,16,41,0.9) 0%, transparent 100%)' }}>
              <p style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>{videos[0].title}</p>
              <p style={{ color: G.gold, fontSize: '9px' }}>{videos[0].dur}</p>
            </div>
          </motion.div>
          {videos.slice(1).map(v => (
            <div key={v.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', paddingBottom: '12px', marginBottom: '12px', borderBottom: `1px solid ${G.goldBorder}` }}
              onClick={() => setSelVideo(v)}>
              <div style={{ width: '60px', height: '38px', borderRadius: '4px', overflow: 'hidden', border: `1px solid ${G.goldBorder}`, flexShrink: 0 }}>
                <img src={`https://img.youtube.com/vi/${v.id}/default.jpg`} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
              </div>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{v.title}</p>
                <p style={{ fontSize: '9px', color: G.gold }}>{v.dur}</p>
              </div>
            </div>
          ))}
          <Link to="/dersler" style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.1em', color: G.gold, borderBottom: `2px solid ${G.gold}`, paddingBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            TÜM DERSLER <ArrowRight size={12} />
          </Link>
        </div>

        <div style={{ padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '2px', background: G.gold }} />
            <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold }}>HAKKIMDA</span>
          </div>
          <div style={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '4/3', marginBottom: '20px', border: `1px solid ${G.goldBorder}` }}>
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800" alt="Pilates"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6) sepia(0.2)' }} />
          </div>
          <blockquote style={{ fontSize: '18px', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '12px', fontStyle: 'italic' }}>
            "Pilates bir egzersiz değil, yaşam felsefesidir."
          </blockquote>
          <p style={{ fontSize: '12px', color: G.whiteMid, lineHeight: 1.7, marginBottom: '16px' }}>
            Hareketin ve sağlığın hayatımızdaki dönüştürücü gücüne her zaman inandım.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {['Balanced Body®', 'Reformer', 'Hamile Pilatesi', 'Postür'].map(c => (
              <span key={c} style={{ fontSize: '9px', fontWeight: 900, border: `1px solid ${G.goldBorder}`, color: G.gold, padding: '4px 10px', borderRadius: '999px' }}>{c}</span>
            ))}
          </div>
          <Link to="/hakkimda" style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.1em', color: G.gold, borderBottom: `2px solid ${G.gold}`, paddingBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            DAHA FAZLA <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* YORUMLAR */}
      <div style={{ padding: '40px', borderBottom: `1px solid ${G.goldBorder}`, background: G.dark }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '24px', height: '2px', background: G.gold }} />
            <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold }}>ÖĞRENCİLER NE DİYOR?</span>
          </div>
          <Link to="/musteri-yorumlari" style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(212,175,55,0.4)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            TÜMÜ <ChevronRight size={12} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
          {testimonials.map((t, i) => (
            <motion.div key={i} style={{ border: `1px solid ${G.goldBorder}`, borderRadius: '10px', padding: '20px', background: G.goldFaint }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ color: G.gold, fontSize: '11px', marginBottom: '10px' }}>★★★★★</div>
              <p style={{ fontSize: '12px', color: G.white, lineHeight: 1.65, fontStyle: 'italic', marginBottom: '14px' }}>"{t.text}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 900, color: G.gold }}>— {t.name}</p>
                  <p style={{ fontSize: '9px', color: G.whiteLow, marginTop: '2px' }}>{t.job}</p>
                </div>
                <span style={{ fontSize: '8px', fontWeight: 900, color: 'rgba(212,175,55,0.3)', letterSpacing: '0.06em' }}>{t.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '40px', borderBottom: `1px solid ${G.goldBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: G.goldFaint }}>
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>Başlamaya hazır mısın?</h2>
          <p style={{ fontSize: '13px', color: G.whiteMid, marginTop: '6px' }}>İlk ders için hemen iletişime geç.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/fiyatlar"><Btn style={{ background: G.gold, color: G.bg, padding: '12px 24px' }}>PAKETLERİ GÖR →</Btn></Link>
          <Link to="/iletisim"><Btn style={{ background: 'transparent', color: '#fff', padding: '12px 20px', border: `1.5px solid ${G.whiteLow}` }}>İLETİŞİM</Btn></Link>
        </div>
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {selVideo && (
          <motion.div style={{ position: 'fixed', inset: 0, background: 'rgba(7,16,41,0.97)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px' }}
            onClick={() => setSelVideo(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: '900px', aspectRatio: '16/9' }}
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <iframe style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: '8px' }}
                src={`https://www.youtube.com/embed/${selVideo.id}?autoplay=1`}
                title={selVideo.title} frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              <button style={{ position: 'absolute', top: '-40px', right: 0, color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px', fontWeight: 900, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px' }}
                onClick={() => setSelVideo(null)}>KAPAT <X size={14} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
