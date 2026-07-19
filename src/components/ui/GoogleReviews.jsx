import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const G = { bg: '#0d1b3e', dark: '#071029', gold: '#d4af37', goldFaint: 'rgba(212,175,55,0.1)', goldBorder: 'rgba(212,175,55,0.2)' };

const reviews = [
  { name: 'Ayşe K.', rating: 5, time: '2 hafta önce', text: 'Gizem Hoca\'nın derslerine 3 aydır devam ediyorum. Sırt ağrılarım tamamen geçti. Harika bir eğitmen!' },
  { name: 'Merve D.', rating: 5, time: '1 ay önce', text: 'Hamile pilatesi için geldim, çok profesyonel ve güvenilir bir yaklaşım. Kesinlikle tavsiye ederim.' },
  { name: 'Selin T.', rating: 5, time: '3 hafta önce', text: 'Reformer derslerine başlayalı 6 ay oldu. Vücudum çok güçlendi, postürüm düzeldi. Teşekkürler!' },
];

function GoogleReviews() {
  return (
    <div style={{ padding: 'clamp(28px,5vw,40px) clamp(16px,4vw,40px)', background: G.dark, borderBottom: `1px solid ${G.goldBorder}`, fontFamily: 'Montserrat,sans-serif' }}>
      {/* Başlık */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '22px', height: '2px', background: G.gold }} />
          <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold }}>GOOGLE DEĞERLENDİRMELERİ</span>
        </div>
        {/* Google logo renkleri */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#fff' }}>5.0</span>
            <div style={{ color: '#f8d000', fontSize: '14px', letterSpacing: '2px' }}>★★★★★</div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)' }}>47 değerlendirme</div>
            <div style={{ display: 'flex', gap: '3px', marginTop: '2px' }}>
              {'GOOGLE'.split('').map((l, i) => (
                <span key={i} style={{ fontSize: '14px', fontWeight: 900, color: ['#4285f4','#ea4335','#fbbc04','#34a853','#4285f4','#ea4335'][i] }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Yorumlar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '20px' }} className="testimonials-grid">
        {reviews.map((r, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -3, borderColor: 'rgba(212,175,55,0.4)' }}
            style={{ background: G.goldFaint, border: `1px solid ${G.goldBorder}`, borderRadius: '12px', padding: '16px', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: G.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: G.bg, flexShrink: 0 }}>
                {r.name[0]}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>{r.name}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '1px' }}>{r.time}</div>
              </div>
            </div>
            <div style={{ color: '#f8d000', fontSize: '14px', marginBottom: '8px', letterSpacing: '2px' }}>{'★'.repeat(r.rating)}</div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, fontStyle: 'italic' }}>"{r.text}"</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <a href="https://g.page/r/gizemhoca/review" target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 900, color: 'rgba(212,175,55,0.6)', textDecoration: 'none', border: '1px solid rgba(212,175,55,0.2)', padding: '7px 16px', borderRadius: '999px', transition: 'all 0.2s', letterSpacing: '0.06em' }}
          onMouseEnter={e => { e.currentTarget.style.color = G.gold; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(212,175,55,0.6)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'; }}>
          TÜM DEĞERLENDİRMELERİ GÖR <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

export default React.memo(GoogleReviews);
