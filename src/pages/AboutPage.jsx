import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const G = { bg: '#0d1b3e', dark: '#071029', gold: '#d4af37', goldFaint: 'rgba(212,175,55,0.1)', goldBorder: 'rgba(212,175,55,0.2)', white: 'rgba(255,255,255,0.85)', whiteMid: 'rgba(255,255,255,0.45)' };
const PHOTO = 'https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/71e533503d331149fe73f8e165f13f5b.png';

export default function AboutPage() {
  return (
    <>
      <Helmet><title>Hakkımda - Gizem Hoca Pilates</title></Helmet>
      <div style={{ background: G.bg, fontFamily: 'Montserrat,sans-serif', minHeight: '100vh' }}>
        <div style={{ padding: '32px 40px', borderBottom: `1px solid ${G.goldBorder}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '32px', height: '2px', background: G.gold }} />
          <div>
            <p style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.2em', color: G.gold, marginBottom: '6px' }}>GİZEM HOCA PİLATES</p>
            <h1 style={{ fontSize: '56px', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em' }}>HAKKIMDA</h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${G.goldBorder}` }}>
          <div style={{ overflow: 'hidden', minHeight: '420px', borderRight: `1px solid ${G.goldBorder}` }}>
            <img src={PHOTO} alt="Gizem Hoca" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65) sepia(0.2)' }} />
          </div>
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <blockquote style={{ fontSize: '22px', fontWeight: 900, color: '#fff', lineHeight: 1.15, fontStyle: 'italic', marginBottom: '20px' }}>
                "Pilates bir egzersiz değil, yaşam felsefesidir."
              </blockquote>
              <p style={{ fontSize: '13px', color: G.whiteMid, lineHeight: 1.8, marginBottom: '14px' }}>
                Merhaba, ben Gizem. Hareketin ve sağlığın hayatımızdaki dönüştürücü gücüne her zaman inandım.
              </p>
              <p style={{ fontSize: '13px', color: G.whiteMid, lineHeight: 1.8, marginBottom: '24px' }}>
                Derslerimde sadece fiziksel gücü değil, zihin-beden bütünlüğünü ön planda tutuyorum. Her öğrencimin kendine özgü yolculuğuna saygı duyarak çalışıyorum.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '20px', height: '2px', background: G.gold }} />
                <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold }}>SERTİFİKALARIM</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '28px' }}>
                {['Balanced Body® Mat 1 & 2', 'Balanced Body® Reformer 1, 2 & 3', 'Hamile Pilatesi Uzmanlık Programı', 'Postür Bozuklukları & Rehabilitasyon'].map((c, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: G.whiteMid, marginBottom: '8px' }}>
                    <span style={{ color: G.gold, fontWeight: 900 }}>✦</span> {c}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/iletisim" style={{ background: G.gold, color: G.bg, fontSize: '10px', fontWeight: 900, letterSpacing: '0.06em', padding: '11px 22px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px', alignSelf: 'flex-start' }}>
              İLETİŞİME GEÇ <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: `1px solid ${G.goldBorder}` }}>
          {[{ n: '500+', l: 'MUTLU ÖĞRENCİ' }, { n: '8+', l: 'YIL DENEYİM' }, { n: '4', l: 'SERTİFİKA' }].map((s, i) => (
            <div key={i} style={{ padding: '32px', textAlign: 'center', borderRight: i < 2 ? `1px solid ${G.goldBorder}` : 'none' }}>
              <div style={{ fontSize: '40px', fontWeight: 900, color: G.gold }}>{s.n}</div>
              <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginTop: '6px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '32px 40px', background: G.goldFaint, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: G.gold }}>Birlikte çalışalım. ✦</h2>
            <p style={{ fontSize: '13px', color: G.whiteMid, marginTop: '6px' }}>İlk adımı atmak için iletişime geçin.</p>
          </div>
          <Link to="/fiyatlar" style={{ background: G.gold, color: G.bg, fontSize: '10px', fontWeight: 900, letterSpacing: '0.06em', padding: '11px 22px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            PAKETLERİ GÖR <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}
