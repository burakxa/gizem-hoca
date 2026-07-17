import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, ArrowUpRight } from 'lucide-react';

const G = { dark: '#071029', gold: '#d4af37', goldBorder: 'rgba(212,175,55,0.2)', goldFaint: 'rgba(212,175,55,0.07)', white: '#fff', whiteMid: 'rgba(255,255,255,0.4)' };

const HoverLink = ({ to, children }) => {
  const [h, setH] = useState(false);
  return (
    <Link to={to} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontSize: '12px', color: h ? G.gold : G.whiteMid, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '9px', textDecoration: 'none', transition: 'color 0.2s', fontWeight: h ? 700 : 400 }}>
      {h && <span style={{ color: G.gold, fontSize: '8px' }}>✦</span>} {children}
    </Link>
  );
};

const SocialBtn = ({ href, Icon, label }) => {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${h ? G.gold : G.goldBorder}`, background: h ? G.goldFaint : 'transparent', color: h ? G.gold : 'rgba(212,175,55,0.4)', transition: 'all 0.2s', transform: h ? 'translateY(-2px)' : 'translateY(0)' }}>
      <Icon size={16} />
    </a>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: G.dark, borderTop: `1px solid ${G.goldBorder}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', borderBottom: `1px solid ${G.goldBorder}` }}>
        <div style={{ padding: '32px', borderRight: `1px solid ${G.goldBorder}` }}>
          <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png"
            alt="Gizem Hoca" style={{ height: '36px', filter: 'brightness(0) invert(1)', marginBottom: '16px', display: 'block' }} />
          <p style={{ fontSize: '12px', color: G.whiteMid, lineHeight: 1.75, marginBottom: '20px', maxWidth: '240px' }}>Pilates sadece bir egzersiz değil, yaşam felsefesidir. ✦</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <SocialBtn href="https://www.instagram.com/gizemmhoca/" Icon={Instagram} label="Instagram" />
            <SocialBtn href="https://www.youtube.com/@gizemmhoca" Icon={Youtube} label="YouTube" />
            <SocialBtn href="https://facebook.com" Icon={Facebook} label="Facebook" />
          </div>
        </div>
        <div style={{ padding: '32px', borderRight: `1px solid ${G.goldBorder}` }}>
          <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold, marginBottom: '18px' }}>SAYFALAR</div>
          {[['/', 'Anasayfa'], ['/dersler', 'Dersler'], ['/program', 'Program'], ['/fiyatlar', 'Fiyatlar'], ['/galeri', 'Galeri']].map(([p, l]) => (
            <HoverLink key={p} to={p}>{l}</HoverLink>
          ))}
        </div>
        <div style={{ padding: '32px', borderRight: `1px solid ${G.goldBorder}` }}>
          <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold, marginBottom: '18px' }}>DAHA FAZLA</div>
          {[['/blog', 'Blog'], ['/hakkimda', 'Hakkımda'], ['/musteri-yorumlari', 'Yorumlar'], ['/sss', 'SSS'], ['/iletisim', 'İletişim']].map(([p, l]) => (
            <HoverLink key={p} to={p}>{l}</HoverLink>
          ))}
        </div>
        <div style={{ padding: '32px', background: 'rgba(212,175,55,0.06)' }}>
          <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold, marginBottom: '18px' }}>İLETİŞİM</div>
          <a href="https://wa.me/905383135720" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '12px', color: G.whiteMid, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = G.gold} onMouseLeave={e => e.currentTarget.style.color = G.whiteMid}>
            💬 +90 538 313 57 20
          </a>
          <a href="mailto:merhaba@gizemhoca.net"
            style={{ fontSize: '12px', color: G.whiteMid, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = G.gold} onMouseLeave={e => e.currentTarget.style.color = G.whiteMid}>
            ✉️ merhaba@gizemhoca.net
          </a>
          <p style={{ fontSize: '12px', color: G.whiteMid, marginBottom: '20px' }}>📍 Beşiktaş, İstanbul</p>
          <Link to="/iletisim"
            style={{ background: G.gold, color: '#0d1b3e', fontSize: '10px', fontWeight: 900, padding: '9px 20px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'all 0.2s', letterSpacing: '0.06em' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c49b2a'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,175,55,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = G.gold; e.currentTarget.style.boxShadow = 'none'; }}>
            DERS AL ✦ <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px' }}>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)' }}>© {year} Gizem Hoca Pilates. Tüm hakları saklıdır.</p>
        <p style={{ fontSize: '11px', color: 'rgba(212,175,55,0.25)' }}>Est. 2016 · Beşiktaş, İstanbul</p>
      </div>
    </footer>
  );
};

export default Footer;
