import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Facebook, Menu, X } from 'lucide-react';

const G = { dark: '#071029', gold: '#d4af37', bg: '#0d1b3e' };

const menuItems = [
  { path: '/', label: 'ANASAYFA' },
  { path: '/hakkimda', label: 'HAKKIMDA' },
  { path: '/dersler', label: 'DERSLER' },
  { path: '/program', label: 'PROGRAM' },
  { path: '/fiyatlar', label: 'FİYATLAR' },
  { path: '/galeri', label: 'GALERİ' },
  { path: '/blog', label: 'BLOG' },
  { path: '/sss', label: 'SSS' },
  { path: '/quiz', label: '🎯 TEST' },
  { path: '/iletisim', label: 'İLETİŞİM' },
];

export default function MainMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header style={{ background: scrolled ? 'rgba(7,16,41,0.97)' : G.dark, borderBottom: '1px solid rgba(212,175,55,0.2)', position: 'sticky', top: 0, zIndex: 40, backdropFilter: scrolled ? 'blur(12px)' : 'none', transition: 'background 0.3s' }}>

      {/* ÜCRETSİZ DERS TOP BAR */}
      <div style={{ background: G.gold, padding: '6px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '14px', fontWeight: 900, color: G.bg, letterSpacing: '0.06em' }}>
          🎁 İLK TANITMA SEANSI ÜCRETSİZ
        </span>
        <span style={{ fontSize: '11px', color: 'rgba(13,27,62,0.5)' }}>·</span>
        <a href="https://wa.me/905383135720?text=Ücretsiz%20tanışma%20seansı%20istiyorum"
          target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '14px', fontWeight: 900, color: G.bg, textDecoration: 'underline', letterSpacing: '0.04em' }}>
          Hemen Rezervasyon Yap →
        </a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '58px' }}>
        {/* Logo */}
        <Link to="/" style={{ flexShrink: 0 }}>
          <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png"
            alt="Gizem Hoca" style={{ height: '34px', filter: 'brightness(0) invert(1)', display: 'block' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: '2px' }}>
          {menuItems.map(item => (
            <NavLink key={item.path} to={item.path}
              style={({ isActive }) => ({
                padding: '7px 12px', fontSize: '14px', fontWeight: 900, letterSpacing: '0.08em',
                borderRadius: '999px', transition: 'all 0.2s', textDecoration: 'none',
                background: isActive ? G.gold : 'transparent',
                color: isActive ? G.bg : 'rgba(255,255,255,0.75)',
              })}
              onMouseEnter={e => { if (e.currentTarget.style.background !== G.gold) { e.currentTarget.style.background = 'rgba(212,175,55,0.12)'; e.currentTarget.style.color = G.gold; } }}
              onMouseLeave={e => { if (e.currentTarget.getAttribute('aria-current') !== 'page') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; } }}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Sağ alan */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '10px' }}>
            {[
              { href: 'https://www.instagram.com/gizemmhoca/', Icon: Instagram },
              { href: 'https://www.youtube.com/@gizemmhoca', Icon: Youtube },
              { href: 'https://facebook.com', Icon: Facebook },
            ].map(({ href, Icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(212,175,55,0.45)', transition: 'all 0.2s', display: 'inline-flex' }}
                onMouseEnter={e => { e.currentTarget.style.color = G.gold; e.currentTarget.style.transform = 'scale(1.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(212,175,55,0.45)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                <Icon size={17} />
              </a>
            ))}
          </div>

          <Link to="/iletisim" className="hidden lg:inline-block"
            style={{ background: G.gold, color: G.bg, fontSize: '14px', fontWeight: 900, letterSpacing: '0.06em', padding: '9px 18px', borderRadius: '999px', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            DERS AL ✦
          </Link>

          <button className="lg:hidden" onClick={() => setMobileOpen(o => !o)}
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: G.gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: 'fixed', inset: 0, top: '60px', background: 'rgba(0,0,0,0.6)', zIndex: 30 }} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ position: 'fixed', top: '60px', right: 0, bottom: 0, width: '80%', maxWidth: '300px', background: G.dark, borderLeft: '1px solid rgba(212,175,55,0.2)', zIndex: 40, overflowY: 'auto', padding: '16px' }}>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}>
                {menuItems.map(item => (
                  <NavLink key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                    style={({ isActive }) => ({
                      padding: '12px 16px', fontSize: '14px', fontWeight: 900, letterSpacing: '0.08em',
                      borderRadius: '10px', textDecoration: 'none',
                      background: isActive ? G.gold : 'rgba(212,175,55,0.05)',
                      color: isActive ? G.bg : 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(212,175,55,0.1)',
                    })}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <Link to="/iletisim" onClick={() => setMobileOpen(false)}
                style={{ display: 'block', textAlign: 'center', background: G.gold, color: G.bg, fontSize: '14px', fontWeight: 900, padding: '14px', borderRadius: '999px', textDecoration: 'none' }}>
                DERS AL ✦
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
