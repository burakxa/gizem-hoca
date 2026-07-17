import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Star, Users, Calendar } from 'lucide-react';

const G = { bg: '#0d1b3e', dark: '#071029', gold: '#d4af37', goldFaint: 'rgba(212,175,55,0.1)', goldBorder: 'rgba(212,175,55,0.2)', white: 'rgba(255,255,255,0.9)', whiteMid: 'rgba(255,255,255,0.5)' };
const PHOTO = 'https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/71e533503d331149fe73f8e165f13f5b.png';

const certs = [
  { icon: Award, label: 'Balanced Body® Mat 1 & 2', year: '2016' },
  { icon: Award, label: 'Balanced Body® Reformer 1, 2 & 3', year: '2017' },
  { icon: Award, label: 'Hamile Pilatesi Uzmanlık Programı', year: '2019' },
  { icon: Award, label: 'Postür Bozuklukları & Rehabilitasyon', year: '2021' },
];

const stats = [
  { icon: Users, n: '500+', l: 'Mutlu Öğrenci' },
  { icon: Calendar, n: '8+', l: 'Yıl Deneyim' },
  { icon: Award, n: '4', l: 'Sertifika' },
  { icon: Star, n: '5.0', l: 'Ortalama Puan' },
];

export default function AboutPage() {
  return (
    <>
      <Helmet><title>Hakkımda - Gizem Hoca Pilates</title></Helmet>
      <div style={{ background: G.bg, fontFamily: 'Montserrat,sans-serif', minHeight: '100vh' }}>
        <style>{`
          @media (max-width: 768px) {
            .about-split { grid-template-columns: 1fr !important; }
            .about-stats { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>

        {/* Başlık */}
        <div style={{ padding: 'clamp(20px,4vw,32px) clamp(16px,4vw,40px)', borderBottom: `1px solid ${G.goldBorder}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '32px', height: '2px', background: G.gold, flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.2em', color: G.gold, marginBottom: '6px' }}>GİZEM HOCA PİLATES</p>
            <h1 style={{ fontSize: 'clamp(36px,8vw,56px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em' }}>HAKKIMDA</h1>
          </div>
        </div>

        {/* Profil kartı + içerik */}
        <div className="about-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${G.goldBorder}` }}>
          {/* Sol: Profil kartı */}
          <div style={{ borderRight: `1px solid ${G.goldBorder}`, padding: 'clamp(24px,4vw,48px) clamp(16px,4vw,40px)' }}>
            {/* Fotoğraf + imza kartı */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ position: 'relative', marginBottom: '28px' }}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '3/4', maxWidth: '320px', border: `2px solid ${G.goldBorder}` }}>
                <img src={PHOTO} alt="Gizem Hoca"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) sepia(0.1)', transition: 'transform 0.6s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                {/* Üzerine overlay badge */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px', background: 'linear-gradient(to top, rgba(7,16,41,0.95) 0%, transparent 100%)' }}>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#fff' }}>Gizem Hoca</div>
                  <div style={{ fontSize: '11px', color: G.gold, marginTop: '3px', letterSpacing: '0.06em' }}>Pilates Eğitmeni · Beşiktaş</div>
                </div>
              </div>

              {/* Sertifika rozeti - köşede */}
              <motion.div whileHover={{ scale: 1.05 }}
                style={{ position: 'absolute', top: '16px', right: '16px', background: G.gold, color: G.bg, borderRadius: '50%', width: '64px', height: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(212,175,55,0.4)', border: '2px solid rgba(255,255,255,0.2)' }}>
                <span style={{ fontSize: '18px', fontWeight: 900 }}>4</span>
                <span style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '0.05em', textAlign: 'center', lineHeight: 1.2 }}>SERTİ<br />FİKA</span>
              </motion.div>
            </motion.div>

            {/* Sertifikalar listesi */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '20px', height: '2px', background: G.gold }} />
                <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold }}>SERTİFİKALARIM</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {certs.map((cert, i) => {
                  const Icon = cert.icon;
                  return (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: G.goldFaint, border: `1px solid ${G.goldBorder}`, borderRadius: '10px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: G.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={14} style={{ color: G.bg }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{cert.label}</div>
                        <div style={{ fontSize: '10px', color: G.gold, marginTop: '2px' }}>{cert.year}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sağ: Biyografi */}
          <div style={{ padding: 'clamp(24px,4vw,48px) clamp(16px,4vw,40px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ fontSize: 'clamp(18px,3vw,24px)', fontWeight: 900, color: '#fff', lineHeight: 1.2, fontStyle: 'italic', marginBottom: '24px', paddingLeft: '16px', borderLeft: `3px solid ${G.gold}` }}>
                "Pilates bir egzersiz değil, yaşam felsefesidir."
              </motion.blockquote>

              <p style={{ fontSize: '14px', color: G.whiteMid, lineHeight: 1.85, marginBottom: '16px' }}>
                Merhaba, ben Gizem. Hareketin ve sağlığın hayatımızdaki dönüştürücü gücüne her zaman inandım. Pilatesle tanışmam, kendi bedenimin sınırlarını keşfetme arayışımla başladı.
              </p>
              <p style={{ fontSize: '14px', color: G.whiteMid, lineHeight: 1.85, marginBottom: '32px' }}>
                Derslerimde sadece fiziksel gücü değil, zihin-beden bütünlüğünü ön planda tutuyorum. Her öğrencimin kendine özgü yolculuğuna saygı duyarak, onların en iyi versiyonlarına ulaşmalarına yardım ediyorum.
              </p>

              {/* Uzmanlık etiketleri */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold, marginBottom: '12px' }}>UZMANLIK ALANLARI</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Mat Pilates', 'Reformer', 'Hamile Pilatesi', 'Postür', 'Rehabilitasyon', 'Nefes Teknikleri'].map(tag => (
                    <motion.span key={tag} whileHover={{ background: 'rgba(212,175,55,0.2)', color: '#fff' }}
                      style={{ fontSize: '10px', fontWeight: 700, border: `1px solid ${G.goldBorder}`, color: G.gold, padding: '5px 12px', borderRadius: '999px', transition: 'all 0.2s', cursor: 'default' }}>
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/iletisim"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: G.gold, color: G.bg, fontSize: '11px', fontWeight: 900, letterSpacing: '0.06em', padding: '13px 24px', borderRadius: '999px', textDecoration: 'none', transition: 'all 0.2s', alignSelf: 'flex-start' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c49b2a'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,175,55,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = G.gold; e.currentTarget.style.boxShadow = 'none'; }}>
              İLETİŞİME GEÇ <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* İstatistik kartları */}
        <div className="about-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: `1px solid ${G.goldBorder}` }}>
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ background: 'rgba(212,175,55,0.07)' }}
                style={{ padding: '28px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${G.goldBorder}` : 'none', transition: 'background 0.2s', cursor: 'default' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: G.goldFaint, border: `1px solid ${G.goldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <Icon size={20} style={{ color: G.gold }} />
                </div>
                <div style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 900, color: G.gold }}>{s.n}</div>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginTop: '5px' }}>{s.l.toUpperCase()}</div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ padding: 'clamp(24px,4vw,32px) clamp(16px,4vw,40px)', background: G.goldFaint, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(18px,3vw,24px)', fontWeight: 900, color: G.gold }}>Birlikte çalışalım. ✦</h2>
            <p style={{ fontSize: '13px', color: G.whiteMid, marginTop: '5px' }}>İlk adımı atmak için iletişime geçin.</p>
          </div>
          <Link to="/fiyatlar"
            style={{ background: G.gold, color: G.bg, fontSize: '11px', fontWeight: 900, letterSpacing: '0.06em', padding: '12px 22px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c49b2a'; }}
            onMouseLeave={e => { e.currentTarget.style.background = G.gold; }}>
            PAKETLERİ GÖR <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}
