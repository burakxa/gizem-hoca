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
  { path: '/iletisim', label: 'İLETİŞİM' },
];

const HoverNavLink = ({ item }) => {
  const [h, setH] = useState(false);
  return (
    <NavLink to={item.path}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={({ isActive }) => ({
        padding: '7px 14px', fontSize: '10px', fontWeight: 900, letterSpacing: '0.08em',
        borderRadius: '999px', transition: 'all 0.2s', textDecoration: 'none',
        background: isActive ? G.gold : h ? 'rgba(212,175,55,0.15)' : 'transparent',
        color: isActive ? G.bg : h ? G.gold : 'rgba(255,255,255,0.45)',
        border: isActive ? 'none' : h ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent',
      })}>
      {item.label}
    </NavLink>
  );
};

const MainMenu = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Mobil menü açıkken scroll'u kilitle
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header style={{
      background: scrolled ? 'rgba(7,16,41,0.98)' : G.dark,
      borderBottom: '1px solid rgba(212,175,55,0.2)',
      position: 'sticky', top: 0, zIndex: 40,
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'background 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '60px' }}>
        {/* Logo */}
        <Link to="/" style={{ flexShrink: 0 }}>
          <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png"
            alt="Gizem Hoca" style={{ height: '36px', filter: 'brightness(0) invert(1)', display: 'block' }} />
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="hidden lg:flex">
          {menuItems.map(item => <HoverNavLink key={item.path} item={item} />)}
        </nav>

        {/* Sağ: sosyal + CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
            style={{ background: G.gold, color: G.bg, fontSize: '10px', fontWeight: 900, letterSpacing: '0.06em', padding: '9px 20px', borderRadius: '999px', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c49b2a'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,175,55,0.4)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = G.gold; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            DERS AL ✦
          </Link>

          {/* Hamburger — sadece mobil */}
          <button className="lg:hidden"
            onClick={() => setMobileOpen(o => !o)}
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: G.gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: 'fixed', inset: 0, top: '60px', background: 'rgba(0,0,0,0.6)', zIndex: 30 }} />

            {/* Menü paneli */}
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ position: 'fixed', top: '60px', right: 0, bottom: 0, width: '80%', maxWidth: '300px', background: G.dark, borderLeft: '1px solid rgba(212,175,55,0.2)', zIndex: 40, overflowY: 'auto', padding: '16px' }}>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
                {menuItems.map(item => (
                  <NavLink key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                    style={({ isActive }) => ({
                      padding: '12px 16px', fontSize: '12px', fontWeight: 900, letterSpacing: '0.08em',
                      borderRadius: '10px', textDecoration: 'none', transition: 'all 0.2s',
                      background: isActive ? G.gold : 'rgba(212,175,55,0.05)',
                      color: isActive ? G.bg : 'rgba(255,255,255,0.6)',
                      border: `1px solid ${isActive ? 'transparent' : 'rgba(212,175,55,0.1)'}`,
                    })}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <Link to="/iletisim" onClick={() => setMobileOpen(false)}
                style={{ display: 'block', textAlign: 'center', background: G.gold, color: G.bg, fontSize: '11px', fontWeight: 900, letterSpacing: '0.06em', padding: '14px', borderRadius: '999px', textDecoration: 'none', marginBottom: '20px' }}>
                DERS AL ✦
              </Link>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', paddingTop: '16px', borderTop: '1px solid rgba(212,175,55,0.15)' }}>
                {[
                  { href: 'https://www.instagram.com/gizemmhoca/', Icon: Instagram },
                  { href: 'https://www.youtube.com/@gizemmhoca', Icon: Youtube },
                  { href: 'https://facebook.com', Icon: Facebook },
                ].map(({ href, Icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(212,175,55,0.5)' }}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MainMenu;
