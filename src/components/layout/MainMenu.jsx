import React, { useState } from 'react';
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
  const [hovered, setHovered] = useState(false);
  return (
    <NavLink
      to={item.path}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={({ isActive }) => ({
        padding: '7px 14px',
        fontSize: '10px',
        fontWeight: 900,
        letterSpacing: '0.08em',
        borderRadius: '999px',
        transition: 'all 0.2s',
        textDecoration: 'none',
        background: isActive ? G.gold : hovered ? 'rgba(212,175,55,0.15)' : 'transparent',
        color: isActive ? G.bg : hovered ? G.gold : 'rgba(255,255,255,0.45)',
        border: isActive ? 'none' : hovered ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent',
      })}>
      {item.label}
    </NavLink>
  );
};

const SocialIcon = ({ href, icon: Icon }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ transition: 'all 0.2s', color: hovered ? G.gold : 'rgba(212,175,55,0.45)', transform: hovered ? 'scale(1.15)' : 'scale(1)', display: 'inline-flex' }}>
      <Icon size={18} />
    </a>
  );
};

const MainMenu = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dersAlHover, setDersAlHover] = useState(false);

  return (
    <header style={{ background: G.dark, borderBottom: '1px solid rgba(212,175,55,0.2)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div className="flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex-shrink-0" style={{ transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png"
            alt="Gizem Hoca" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map(item => <HoverNavLink key={item.path} item={item} />)}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3">
            <SocialIcon href="https://www.instagram.com/gizemmhoca/" icon={Instagram} />
            <SocialIcon href="https://www.youtube.com/@gizemmhoca" icon={Youtube} />
            <SocialIcon href="https://facebook.com" icon={Facebook} />
          </div>
          <Link to="/iletisim"
            onMouseEnter={() => setDersAlHover(true)}
            onMouseLeave={() => setDersAlHover(false)}
            style={{
              background: dersAlHover ? '#c49b2a' : G.gold,
              color: G.bg, fontSize: '10px', fontWeight: 900, letterSpacing: '0.06em',
              padding: '9px 20px', borderRadius: '999px', textDecoration: 'none',
              transition: 'all 0.2s', display: 'inline-block',
              boxShadow: dersAlHover ? '0 4px 16px rgba(212,175,55,0.35)' : '0 2px 8px rgba(212,175,55,0.15)',
              transform: dersAlHover ? 'translateY(-1px)' : 'translateY(0)',
            }}>
            DERS AL ✦
          </Link>
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(o => !o)}
            style={{ color: G.gold, background: 'none', border: 'none', cursor: 'pointer' }}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden" style={{ borderTop: '1px solid rgba(212,175,55,0.15)' }}>
            <nav className="flex flex-col p-4 gap-1">
              {menuItems.map(item => (
                <NavLink key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                  style={({ isActive }) => ({
                    padding: '10px 16px', fontSize: '11px', fontWeight: 900, letterSpacing: '0.08em',
                    borderRadius: '999px', textDecoration: 'none',
                    background: isActive ? G.gold : 'transparent',
                    color: isActive ? G.bg : 'rgba(255,255,255,0.5)',
                  })}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MainMenu;
