import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronRight, PlayCircle, X, Users, Monitor, Dumbbell, Sparkles } from 'lucide-react';
import Marquee from '@/components/ui/Marquee';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import GoogleReviews from '@/components/ui/GoogleReviews';
import { Link } from 'react-router-dom';

const PHOTO = 'https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/71e533503d331149fe73f8e165f13f5b.png';
const G = { bg: '#0d1b3e', dark: '#071029', gold: '#d4af37', goldFaint: 'rgba(212,175,55,0.1)', goldBorder: 'rgba(212,175,55,0.2)', white: 'rgba(255,255,255,0.9)', whiteMid: 'rgba(255,255,255,0.5)', whiteLow: 'rgba(255,255,255,0.15)' };

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

const services = [
  { Icon: Users, t: 'Bireysel Ders', d: 'Size özel program.' },
  { Icon: Sparkles, t: 'Grup Dersi', d: 'Max 4 kişi.' },
  { Icon: Monitor, t: 'Online Ders', d: 'Her yerden.' },
  { Icon: Dumbbell, t: 'Reformer', d: 'Alet eğitimi.', accent: true },
];

const AnimNum = ({ n, s }) => {
  const [c, setC] = useState(0);
  useEffect(() => {
    let v = 0;
    const t = setInterval(() => { v += n / 60; if (v >= n) { setC(n); clearInterval(t); } else setC(Math.floor(v)); }, 16);
    return () => clearInterval(t);
  }, [n]);
  return <>{c}{s}</>;
};

const GoldBtn = ({ to, children, outline, fullWidth }) => {
  const [h, setH] = useState(false);
  const el = (
    <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        padding: '12px 24px', borderRadius: '999px', fontSize: '11px', fontWeight: 900,
        letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Montserrat',
        width: fullWidth ? '100%' : 'auto',
        background: outline ? 'transparent' : h ? '#c49b2a' : G.gold,
        color: outline ? (h ? G.gold : G.whiteMid) : G.bg,
        border: outline ? `1.5px solid ${h ? G.gold : G.whiteLow}` : 'none',
        boxShadow: !outline && h ? '0 6px 20px rgba(212,175,55,0.35)' : 'none',
        transform: h ? 'translateY(-1px)' : 'translateY(0)',
      }}>
      {children}
    </span>
  );
  return to ? <Link to={to} style={{ textDecoration: 'none', display: fullWidth ? 'block' : 'inline-block' }}>{el}</Link> : el;
};

export default function HomePage() {
  const [selVideo, setSelVideo] = useState(null);
  const [statsVis, setStatsVis] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 500], [0, 80]);
  const heroTextY = useTransform(scrollY, [0, 400], [0, -40]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ background: G.bg, fontFamily: 'Montserrat, sans-serif' }}>
      <style>{`
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 88vh; border-bottom: 1px solid rgba(212,175,55,0.2); }
        .hero-photo { position: relative; overflow: hidden; min-height: 300px; }
        .services-grid { display: grid; grid-template-columns: repeat(4,1fr); border-bottom: 1px solid rgba(212,175,55,0.2); }
        .content-grid { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid rgba(212,175,55,0.2); }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
        .stats-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
        .hero-btns { display: flex; gap: 12px; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; min-height: auto !important; }
          .hero-photo { min-height: 280px !important; order: -1; }
          .services-grid { grid-template-columns: 1fr 1fr !important; }
          .content-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(3,1fr) !important; }
          .hero-btns { flex-direction: column !important; }
          .hero-btns > * { width: 100% !important; }
          .hero-left { padding: 32px 20px !important; }
          .cta-section { flex-direction: column !important; text-align: center !important; align-items: center !important; }
          .video-list-item { padding: 8px !important; }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* HERO */}
      <div className="hero-grid">
        <motion.div className="hero-left"
          style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: `1px solid ${G.goldBorder}`, position: 'relative', overflow: 'hidden' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {/* Dekoratif */}
          <div style={{ position: 'absolute', bottom: '-80px', left: '-50px', width: '320px', height: '320px', borderRadius: '50%', background: G.gold, opacity: 0.04, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', borderRadius: '50%', border: `2px solid ${G.gold}`, opacity: 0.07, pointerEvents: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '2px', background: G.gold, flexShrink: 0 }} />
            <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.18em', color: G.gold }}>PİLATES EĞİTMENİ · EST. 2016</span>
          </div>

          <div>
            <motion.h1
              style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '18px' }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
              <>Move.<br />Breathe.<br /><span style={{ color: G.gold }}>Thrive.</span></>
            </motion.h1>
            <motion.p
              style={{ fontSize: '13px', color: G.whiteMid, lineHeight: 1.75, maxWidth: '300px', marginBottom: '16px' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Hareketin dönüştürücü gücüne inanıyorum. Her öğrencimin potansiyelini ortaya çıkarmasına yardım ediyorum.
            </motion.p>

            {/* İLK DERS ÜCRETSİZ BADGE */}
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '999px', padding: '7px 16px', marginBottom: '20px' }}>
              <span style={{ fontSize: '14px' }}>🎁</span>
              <span style={{ fontSize: '11px', fontWeight: 900, color: G.gold, letterSpacing: '0.04em' }}>İLK TANITMA SEANSI ÜCRETSİZ</span>
            </motion.div>

            <motion.div className="hero-btns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <GoldBtn to="/iletisim" fullWidth={isMobile}>ÜCRETSİZ DERS AL <ArrowRight size={14} /></GoldBtn>
              <GoldBtn to="/fiyatlar" outline fullWidth={isMobile}>FİYATLAR</GoldBtn>
            </motion.div>
          </div>

          <motion.div className="stats-grid"
            style={{ paddingTop: '24px', borderTop: `1px solid ${G.goldBorder}`, marginTop: '24px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            onViewportEnter={() => setStatsVis(true)}>
            {[{ n: 500, s: '+', l: 'ÖĞRENCİ' }, { n: 8, s: '+', l: 'YIL' }, { n: 4, s: '', l: 'SERTİFİKA' }].map((st, i) => (
              <motion.div key={i} whileHover={{ y: -2 }}
                style={{ background: G.goldFaint, border: `1px solid ${G.goldBorder}`, borderRadius: '12px', padding: '14px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 900, color: G.gold, lineHeight: 1 }}>
                  {statsVis ? <AnimNum n={st.n} s={st.s} /> : `0${st.s}`}
                </div>
                <div style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.1em', color: G.whiteLow, marginTop: '5px' }}>{st.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Fotoğraf */}
        <motion.div className="hero-photo"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <img src={PHOTO} alt="Gizem Hoca"
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, filter: 'grayscale(0.2) brightness(0.65) sepia(0.15)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,16,41,0.75) 0%, rgba(7,16,41,0.1) 50%, transparent 100%)' }} />
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            style={{ position: 'absolute', top: '16px', left: '16px', background: G.gold, color: G.bg, fontSize: '9px', fontWeight: 900, padding: '6px 14px', borderRadius: '999px', letterSpacing: '0.06em' }}>
            ✦ 500+ MUTLU ÖĞRENCİ
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(7,16,41,0.85)', border: `1px solid ${G.gold}`, color: G.gold, fontSize: '9px', fontWeight: 900, padding: '6px 14px', borderRadius: '999px' }}>
            8+ Yıl Deneyim
          </motion.div>
        </motion.div>
      </div>

      {/* MARQUEE */}
      <Marquee />

      {/* HİZMETLER */}
      <div className="services-grid">
        {services.map((s, i) => {
          const { Icon } = s;
          return (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              style={{ padding: '20px 16px', borderRight: i < services.length - 1 ? `1px solid ${G.goldBorder}` : 'none', borderBottom: `1px solid ${G.goldBorder}`, background: s.accent ? G.goldFaint : 'transparent', transition: 'background 0.2s', cursor: 'default' }}
              whileHover={{ background: s.accent ? 'rgba(212,175,55,0.15)' : 'rgba(212,175,55,0.05)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', marginBottom: '12px', background: s.accent ? G.gold : G.goldFaint, border: `1px solid ${s.accent ? 'transparent' : G.goldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={17} style={{ color: s.accent ? G.bg : G.gold }} />
              </div>
              <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.04em', color: s.accent ? G.gold : '#fff', marginBottom: '5px' }}>{s.t}</div>
              <div style={{ fontSize: '11px', color: G.whiteMid, lineHeight: 1.5 }}>{s.d}</div>
            </motion.div>
          );
        })}
      </div>

      {/* VİDEO + BİYO */}
      <div className="content-grid">
        <div style={{ padding: 'clamp(24px, 4vw, 40px)', borderRight: `1px solid ${G.goldBorder}`, borderBottom: `1px solid ${G.goldBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '22px', height: '2px', background: G.gold }} />
            <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold }}>ÖNE ÇIKAN DERSLER</span>
          </div>
          <motion.div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${G.goldBorder}`, cursor: 'pointer', marginBottom: '14px' }}
            onClick={() => setSelVideo(videos[0])} whileHover={{ scale: 1.01 }}>
            <img src={`https://img.youtube.com/vi/${videos[0].id}/hqdefault.jpg`} alt={videos[0].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div whileHover={{ scale: 1.1 }}
                style={{ width: '52px', height: '52px', background: G.gold, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(212,175,55,0.5)' }}>
                <PlayCircle size={24} style={{ color: G.bg }} />
              </motion.div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px', background: 'linear-gradient(to top, rgba(7,16,41,0.95) 0%, transparent 100%)' }}>
              <p style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>{videos[0].title}</p>
              <p style={{ color: G.gold, fontSize: '10px', marginTop: '2px' }}>{videos[0].dur}</p>
            </div>
          </motion.div>
          {videos.slice(1).map(v => (
            <motion.div key={v.id} className="video-list-item" onClick={() => setSelVideo(v)} whileHover={{ background: G.goldFaint }}
              style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', padding: '10px', borderRadius: '8px', marginBottom: '6px', border: '1px solid transparent', transition: 'all 0.2s' }}>
              <div style={{ width: '60px', height: '38px', borderRadius: '5px', overflow: 'hidden', flexShrink: 0, border: `1px solid ${G.goldBorder}` }}>
                <img src={`https://img.youtube.com/vi/${v.id}/default.jpg`} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65)' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#fff', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.title}</p>
                <p style={{ fontSize: '10px', color: G.gold, marginTop: '2px' }}>{v.dur}</p>
              </div>
              <PlayCircle size={16} style={{ color: G.gold, flexShrink: 0 }} />
            </motion.div>
          ))}
          <Link to="/dersler" style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.1em', color: G.gold, display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '10px', textDecoration: 'none', borderBottom: `2px solid ${G.gold}`, paddingBottom: '2px' }}>
            TÜM DERSLER <ArrowRight size={12} />
          </Link>
        </div>

        <div style={{ padding: 'clamp(24px, 4vw, 40px)', borderBottom: `1px solid ${G.goldBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '22px', height: '2px', background: G.gold }} />
            <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold }}>HAKKIMDA</span>
          </div>
          <div style={{ borderRadius: '10px', overflow: 'hidden', aspectRatio: '4/3', marginBottom: '20px', border: `1px solid ${G.goldBorder}` }}>
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800" alt="Pilates"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6) sepia(0.15)', transition: 'transform 0.5s' }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
          </div>
          <blockquote style={{ fontSize: 'clamp(15px, 2vw, 19px)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: '12px', fontStyle: 'italic' }}>
            "Pilates bir egzersiz değil, yaşam felsefesidir."
          </blockquote>
          <p style={{ fontSize: '13px', color: G.whiteMid, lineHeight: 1.75, marginBottom: '16px' }}>
            Hareketin ve sağlığın hayatımızdaki dönüştürücü gücüne her zaman inandım.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {['Balanced Body®', 'Reformer', 'Hamile Pilatesi', 'Postür'].map(c => (
              <motion.span key={c} whileHover={{ borderColor: G.gold, color: '#fff' }}
                style={{ fontSize: '9px', fontWeight: 900, border: `1px solid ${G.goldBorder}`, color: G.gold, padding: '4px 10px', borderRadius: '999px', transition: 'all 0.2s' }}>
                {c}
              </motion.span>
            ))}
          </div>
          <Link to="/hakkimda" style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.1em', color: G.gold, display: 'inline-flex', alignItems: 'center', gap: '5px', textDecoration: 'none', borderBottom: `2px solid ${G.gold}`, paddingBottom: '2px' }}>
            DAHA FAZLA <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* ÖNCE / SONRA */}
      <div style={{ padding: 'clamp(28px,5vw,48px) clamp(16px,4vw,40px)', borderBottom: `1px solid ${G.goldBorder}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ width: '22px', height: '2px', background: G.gold }} />
          <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold }}>DÖNÜŞÜM HİKAYELERİ</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }} className="content-grid">
          <BeforeAfterSlider
            before="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800"
            after="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800"
            beforeLabel="BAŞLANGIÇ"
            afterLabel="3 AY SONRA"
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px', padding: '8px' }}>
            <h3 style={{ fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>
              Sadece 3 ayda<br /><span style={{ color: G.gold }}>inanılmaz dönüşüm</span>
            </h3>
            <p style={{ fontSize: '13px', color: G.whiteMid, lineHeight: 1.75 }}>
              Düzenli pilates pratiği ile öğrencilerimiz hem fiziksel hem zihinsel olarak güçleniyor. Fotoğrafı sürükleyerek farkı kendiniz görün.
            </p>
            <Link to="/musteri-yorumlari" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 900, letterSpacing: '0.1em', color: G.gold, textDecoration: 'none', borderBottom: `2px solid ${G.gold}`, paddingBottom: '2px', alignSelf: 'flex-start' }}>
              BAŞARILI HİKAYELER <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      <GoogleReviews />

      {/* YORUMLAR */}
      <div style={{ padding: 'clamp(28px, 5vw, 48px) clamp(16px, 4vw, 40px)', borderBottom: `1px solid ${G.goldBorder}`, background: G.dark }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '22px', height: '2px', background: G.gold }} />
            <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold }}>ÖĞRENCİLER NE DİYOR?</span>
          </div>
          <Link to="/musteri-yorumlari" style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(212,175,55,0.4)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = G.gold}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(212,175,55,0.4)'}>
            TÜMÜ <ChevronRight size={13} />
          </Link>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(212,175,55,0.4)', boxShadow: '0 8px 28px rgba(212,175,55,0.12)' }}
              style={{ border: `1px solid ${G.goldBorder}`, borderRadius: '12px', padding: '20px', background: G.goldFaint, transition: 'all 0.2s' }}>
              <div style={{ color: G.gold, fontSize: '13px', marginBottom: '10px', letterSpacing: '2px' }}>★★★★★</div>
              <p style={{ fontSize: '13px', color: G.white, lineHeight: 1.65, fontStyle: 'italic', marginBottom: '14px' }}>"{t.text}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 900, color: G.gold }}>— {t.name}</p>
                  <p style={{ fontSize: '10px', color: G.whiteLow, marginTop: '2px' }}>{t.job}</p>
                </div>
                <span style={{ fontSize: '8px', fontWeight: 900, color: 'rgba(212,175,55,0.3)', border: '1px solid rgba(212,175,55,0.15)', padding: '3px 8px', borderRadius: '999px' }}>{t.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section" style={{ padding: 'clamp(28px, 5vw, 48px) clamp(16px, 4vw, 40px)', borderBottom: `1px solid ${G.goldBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', background: 'rgba(212,175,55,0.06)' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>Başlamaya hazır mısın?</h2>
          <p style={{ fontSize: '13px', color: G.whiteMid, marginTop: '6px' }}>İlk ders için hemen iletişime geç.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <GoldBtn to="/fiyatlar">PAKETLERİ GÖR <ArrowRight size={14} /></GoldBtn>
          <GoldBtn to="/iletisim" outline>İLETİŞİM</GoldBtn>
        </div>
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {selVideo && (
          <motion.div style={{ position: 'fixed', inset: 0, background: 'rgba(7,16,41,0.97)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px' }}
            onClick={() => setSelVideo(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: '900px', aspectRatio: '16/9' }}
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <iframe style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: '10px', border: `1px solid ${G.goldBorder}` }}
                src={`https://www.youtube.com/embed/${selVideo.id}?autoplay=1`}
                title={selVideo.title} frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              <button onClick={() => setSelVideo(null)}
                style={{ position: 'absolute', top: '-44px', right: 0, color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px', fontWeight: 900, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Montserrat', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = G.gold}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                KAPAT <X size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Marquee + BeforeAfter anasayfaya eklendi — ayrı import'lar ile kullanılıyor
// Import'lar dosyanın başına eklenmeli ama dosya zaten büyük, 
// bunun yerine MusteriYorumlariPage'de referans verelim
