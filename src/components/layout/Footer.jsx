import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, ArrowUpRight } from 'lucide-react';

const G = { dark: '#071029', gold: '#d4af37', goldBorder: 'rgba(212,175,55,0.2)', whiteMid: 'rgba(255,255,255,0.72)' };

const HoverLink = ({ to, children }) => {
  const [h, setH] = useState(false);
  return (
    <Link to={to} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontSize: '14px', color: h ? G.gold : G.whiteMid, display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px', textDecoration: 'none', transition: 'color 0.2s', fontWeight: h ? 700 : 400 }}>
      {h && <span style={{ color: G.gold, fontSize: '11px' }}>✦</span>}{children}
    </Link>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();
  const footerBg = G.dark;
  const accentColor = G.gold;
  const borderCol = G.goldBorder;
  return (
    <footer style={{ background: footerBg, borderTop: `1px solid ${borderCol}` }}>
      {/* Desktop: 4 kolon, Mobil: stack */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: `1px solid ${borderCol}` }}
        className="footer-grid">
        <style>{`
          @media (max-width: 768px) {
            .footer-grid { grid-template-columns: 1fr 1fr !important; }
            .footer-cell { border-right: none !important; border-bottom: 1px solid rgba(212,175,55,0.15) !important; padding: 20px !important; }
          }
          @media (max-width: 480px) {
            .footer-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        <div className="footer-cell" style={{ padding: '28px', borderRight: `1px solid ${G.goldBorder}` }}>
          <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png"
            alt="Gizem Hoca" style={{ height: '32px', filter: 'brightness(0) invert(1)', marginBottom: '14px', display: 'block' }} />
          <p style={{ fontSize: '14px', color: G.whiteMid, lineHeight: 1.7, marginBottom: '18px' }}>Pilates sadece bir egzersiz değil, yaşam felsefesidir. ✦</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { href: 'https://www.instagram.com/gizemmhoca/', Icon: Instagram },
              { href: 'https://www.youtube.com/@gizemmhoca', Icon: Youtube },
              { href: 'https://facebook.com', Icon: Facebook },
            ].map(({ href, Icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${G.goldBorder}`, color: 'rgba(212,175,55,0.45)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = G.gold; e.currentTarget.style.color = G.gold; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = G.goldBorder; e.currentTarget.style.color = 'rgba(212,175,55,0.45)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-cell" style={{ padding: '28px', borderRight: `1px solid ${G.goldBorder}` }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', color: accentColor, marginBottom: '16px' }}>SAYFALAR</div>
          {[['/', 'Anasayfa'], ['/dersler', 'Dersler'], ['/program', 'Program'], ['/fiyatlar', 'Fiyatlar'], ['/galeri', 'Galeri']].map(([p, l]) => (
            <HoverLink key={p} to={p}>{l}</HoverLink>
          ))}
        </div>

        <div className="footer-cell" style={{ padding: '28px', borderRight: `1px solid ${G.goldBorder}` }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', color: accentColor, marginBottom: '16px' }}>DAHA FAZLA</div>
          {[['/blog', 'Blog'], ['/hakkimda', 'Hakkımda'], ['/musteri-yorumlari', 'Yorumlar'], ['/sss', 'SSS'], ['/iletisim', 'İletişim']].map(([p, l]) => (
            <HoverLink key={p} to={p}>{l}</HoverLink>
          ))}
        </div>

        <div className="footer-cell" style={{ padding: '28px', background: 'rgba(212,175,55,0.05)' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', color: accentColor, marginBottom: '16px' }}>İLETİŞİM</div>
          {[
            { href: 'https://wa.me/905383135720', text: '💬 +90 538 313 57 20' },
            { href: 'mailto:merhaba@gizemhoca.net', text: '✉️ merhaba@gizemhoca.net' },
          ].map(({ href, text }) => (
            <a key={href} href={href} style={{ fontSize: '14px', color: G.whiteMid, display: 'block', marginBottom: '10px', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = G.gold}
              onMouseLeave={e => e.currentTarget.style.color = G.whiteMid}>
              {text}
            </a>
          ))}
          <p style={{ fontSize: '14px', color: G.whiteMid, marginBottom: '18px' }}>📍 Beşiktaş, İstanbul</p>
          <Link to="/iletisim"
            style={{ background: G.gold, color: '#0d1b3e', fontSize: '14px', fontWeight: 900, padding: '9px 18px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c49b2a'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,175,55,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = G.gold; e.currentTarget.style.boxShadow = 'none'; }}>
            DERS AL ✦ <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 28px', flexWrap: 'wrap', gap: '8px' }}>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.18)' }}>© {year} Gizem Hoca Pilates. Tüm hakları saklıdır.</p>
        <p style={{ fontSize: '14px', color: 'rgba(212,175,55,0.25)' }}>Est. 2016 · Beşiktaş, İstanbul</p>
      </div>
    </footer>
  );
};

export default Footer;
