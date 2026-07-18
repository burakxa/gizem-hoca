import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { MessageCircle, Plus } from 'lucide-react';

const G = { bg: '#0d1b3e', dark: '#071029', gold: '#d4af37', goldFaint: 'rgba(212,175,55,0.1)', goldBorder: 'rgba(212,175,55,0.2)', white: '#fff', whiteMid: 'rgba(255,255,255,0.5)' };

const plans = [
  { name: 'BAŞLANGIÇ', sub: 'İlk adımı atmak için', price: { b: '800', g: '400' }, sessions: '4 Ders / Ay', features: ['Haftada 1 ders', 'Mat pilates', 'Temel eğitim', 'Duruş analizi'] },
  { name: 'DÜZENLİ', sub: 'En çok tercih edilen', price: { b: '1400', g: '700' }, sessions: '8 Ders / Ay', features: ['Haftada 2 ders', 'Mat + reformer', 'Kişisel program', 'İlerleme takibi', 'WhatsApp destek'], popular: true },
  { name: 'YOĞUN', sub: 'Hızlı ilerleme için', price: { b: '2200', g: '1100' }, sessions: '12 Ders / Ay', features: ['Haftada 3 ders', 'Tüm ekipmanlar', 'Tam program', 'Beslenme önerileri', 'Öncelikli randevu'] },
];

const faqs = [
  { q: 'Deneme dersi var mı?', a: 'Evet! WhatsApp üzerinden ücretsiz tanışma seansı ayarlayabilirsiniz.' },
  { q: 'Ders iptal politikası nedir?', a: '24 saat öncesinden bildirim yapılması durumunda ücretsiz iptal veya erteleme.' },
  { q: 'Grup dersleri kaç kişilik?', a: 'Maksimum 4 kişilik tutulmaktadır.' },
  { q: 'Paketlerin geçerlilik süresi?', a: 'Satın alma tarihinden itibaren 3 ay.' },
];

export default function FiyatlarPage() {
  const [type, setType] = useState('b');
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Helmet>
        <title>Pilates Fiyatları 2025 | Uygun Paketler | Gizem Hoca Beşiktaş</title>
        <meta name="description" content="Beşiktaş pilates ders ücretleri ve paketleri. Bireysel, grup ve online pilates fiyatları. İlk tanışma seansı ücretsiz. Esnek ödeme seçenekleri." />
      </Helmet>
  
      {/* ÜCRETSİZ DERS BANNER */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        style={{ margin: '0', padding: 'clamp(16px,3vw,20px) clamp(16px,4vw,40px)', background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.08))', borderBottom: '1px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🎁</span>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: '#d4af37' }}>İlk Tanışma Seansı Tamamen Ücretsiz!</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Paket almadan önce pilatesle tanış. Hiçbir taahhüt yok.</div>
          </div>
        </div>
        <a href="https://wa.me/905383135720?text=Merhaba!%20Ücretsiz%20tanışma%20seansı%20almak%20istiyorum." target="_blank" rel="noopener noreferrer"
          style={{ background: '#d4af37', color: '#0d1b3e', fontSize: '11px', fontWeight: 900, padding: '10px 22px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
          ÜCRETSİZ DERS AL →
        </a>
      </motion.div>

      <div style={{ background: G.bg, fontFamily: 'Montserrat,sans-serif', minHeight: '100vh' }}>
        <div style={{ padding: '32px 40px', borderBottom: `1px solid ${G.goldBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '32px', height: '2px', background: G.gold }} />
            <div>
              <p style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.2em', color: G.gold, marginBottom: '6px' }}>GİZEM HOCA PİLATES</p>
              <h1 style={{ fontSize: '56px', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em' }}>FİYATLAR</h1>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.06em', color: type === 'b' ? G.gold : G.whiteMid }}>BİREYSEL</span>
            <button onClick={() => setType(t => t === 'b' ? 'g' : 'b')}
              style={{ width: '48px', height: '26px', borderRadius: '999px', background: G.goldFaint, border: `1px solid ${G.goldBorder}`, position: 'relative', cursor: 'pointer' }}>
              <span style={{ position: 'absolute', top: '3px', width: '20px', height: '20px', background: G.gold, borderRadius: '50%', transition: 'all 0.2s', left: type === 'g' ? '24px' : '3px' }} />
            </button>
            <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.06em', color: type === 'g' ? G.gold : G.whiteMid }}>GRUP</span>
          </div>
        </div>

        <div className='price-grid' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: `1px solid ${G.goldBorder}` }}>
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              style={{ padding: '32px', borderRight: i < 2 ? `1px solid ${G.goldBorder}` : 'none', display: 'flex', flexDirection: 'column',
                background: plan.popular ? G.goldFaint : 'transparent' }}>
              {plan.popular && (
                <span style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.1em', background: G.gold, color: G.bg, padding: '4px 12px', borderRadius: '999px', alignSelf: 'flex-start', marginBottom: '14px' }}>EN POPÜLER ✦</span>
              )}
              <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.12em', color: G.gold, marginBottom: '4px' }}>{plan.name}</div>
              <div style={{ fontSize: '12px', color: G.whiteMid, marginBottom: '20px' }}>{plan.sub}</div>
              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontSize: '48px', fontWeight: 900, color: '#fff' }}>₺{plan.price[type]}</span>
                <span style={{ fontSize: '13px', color: G.whiteMid, marginLeft: '4px' }}>/ay</span>
              </div>
              <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.06em', color: G.whiteMid, marginBottom: '24px' }}>{plan.sessions}</div>
              <ul style={{ listStyle: 'none', padding: 0, flex: 1, marginBottom: '24px' }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: G.whiteMid, marginBottom: '10px' }}>
                    <span style={{ color: G.gold, fontWeight: 900 }}>✦</span> {f}
                  </li>
                ))}
              </ul>
              <a href={`https://wa.me/905383135720?text=${encodeURIComponent(`Merhaba! "${plan.name}" paketi hakkında bilgi almak istiyorum.`)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '999px', fontSize: '10px', fontWeight: 900, letterSpacing: '0.06em', cursor: 'pointer', background: plan.popular ? G.gold : 'transparent', color: plan.popular ? G.bg : G.gold, border: `1.5px solid ${G.gold}` }}>
                <MessageCircle size={14} /> BİLGİ AL
              </a>
            </motion.div>
          ))}
        </div>

        <div style={{ padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '2px', background: G.gold }} />
            <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold }}>SIK SORULAN SORULAR</span>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderTop: `1px solid ${G.goldBorder}` }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', padding: '18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 900, color: '#fff', fontFamily: 'Montserrat' }}>
                {faq.q}
                <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  <Plus size={18} style={{ color: G.gold, flexShrink: 0 }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    style={{ fontSize: '12px', color: G.whiteMid, paddingBottom: '18px', lineHeight: 1.7 }}>
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${G.goldBorder}` }} />
        </div>
      </div>
    </>
  );
}
