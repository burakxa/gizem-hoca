import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook } from 'lucide-react';

const S = {
  wrap: { background: '#071029', borderTop: '1px solid rgba(212,175,55,0.2)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid rgba(212,175,55,0.1)' },
  cell: { padding: '28px', borderRight: '1px solid rgba(212,175,55,0.1)' },
  cellDark: { padding: '28px', background: 'rgba(212,175,55,0.06)' },
  heading: { fontSize: '10px', fontWeight: 900, letterSpacing: '0.15em', color: '#d4af37', marginBottom: '14px', display: 'block' },
  link: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px', textDecoration: 'none' },
  bottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 28px' },
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer style={S.wrap}>
      <div style={S.grid}>
        <div style={S.cell}>
          <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png"
            alt="Gizem Hoca" style={{ height: '36px', filter: 'brightness(0) invert(1)', marginBottom: '14px', display: 'block' }} />
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, marginBottom: '16px' }}>Pilates sadece bir egzersiz değil, yaşam felsefesidir.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="https://www.instagram.com/gizemmhoca/" target="_blank" rel="noopener noreferrer"><Instagram size={18} style={{ color: 'rgba(212,175,55,0.5)' }} /></a>
            <a href="https://www.youtube.com/@gizemmhoca" target="_blank" rel="noopener noreferrer"><Youtube size={18} style={{ color: 'rgba(212,175,55,0.5)' }} /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={18} style={{ color: 'rgba(212,175,55,0.5)' }} /></a>
          </div>
        </div>
        <div style={S.cell}>
          <span style={S.heading}>SAYFALAR</span>
          {[['/', 'Anasayfa'], ['/dersler', 'Dersler'], ['/program', 'Program'], ['/fiyatlar', 'Fiyatlar'], ['/galeri', 'Galeri']].map(([p, l]) => (
            <Link key={p} to={p} style={S.link}>{l}</Link>
          ))}
        </div>
        <div style={S.cell}>
          <span style={S.heading}>DAHA FAZLA</span>
          {[['/blog', 'Blog'], ['/hakkimda', 'Hakkımda'], ['/musteri-yorumlari', 'Yorumlar'], ['/sss', 'SSS'], ['/iletisim', 'İletişim']].map(([p, l]) => (
            <Link key={p} to={p} style={S.link}>{l}</Link>
          ))}
        </div>
        <div style={S.cellDark}>
          <span style={S.heading}>İLETİŞİM</span>
          <a href="https://wa.me/905383135720" target="_blank" rel="noopener noreferrer" style={S.link}>💬 +90 538 313 57 20</a>
          <a href="mailto:merhaba@gizemhoca.net" style={S.link}>✉️ merhaba@gizemhoca.net</a>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '16px' }}>📍 Beşiktaş, İstanbul</p>
          <Link to="/iletisim" style={{ background: '#d4af37', color: '#0d1b3e', fontSize: '10px', fontWeight: 900, padding: '8px 18px', borderRadius: '999px', letterSpacing: '0.06em', display: 'inline-block' }}>
            DERS AL ✦
          </Link>
        </div>
      </div>
      <div style={S.bottom}>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>© {year} Gizem Hoca Pilates. Tüm hakları saklıdır.</p>
        <p style={{ fontSize: '11px', color: 'rgba(212,175,55,0.3)' }}>Est. 2016 · Beşiktaş, İstanbul</p>
      </div>
    </footer>
  );
};

export default Footer;
