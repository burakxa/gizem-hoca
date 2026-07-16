import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Facebook, Menu, X } from 'lucide-react';

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

const MainMenu = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header style={{ background: '#071029', borderBottom: '1px solid rgba(212,175,55,0.2)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div className="flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex-shrink-0">
          <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png"
            alt="Gizem Hoca" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map(item => (
            <NavLink key={item.path} to={item.path}
              style={({ isActive }) => ({
                padding: '6px 12px',
                fontSize: '10px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                borderRadius: '999px',
                transition: 'all 0.2s',
                background: isActive ? '#d4af37' : 'transparent',
                color: isActive ? '#0d1b3e' : 'rgba(255,255,255,0.5)',
              })}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://www.instagram.com/gizemmhoca/" target="_blank" rel="noopener noreferrer"><Instagram size={18} style={{ color: 'rgba(212,175,55,0.5)' }} /></a>
            <a href="https://www.youtube.com/@gizemmhoca" target="_blank" rel="noopener noreferrer"><Youtube size={18} style={{ color: 'rgba(212,175,55,0.5)' }} /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={18} style={{ color: 'rgba(212,175,55,0.5)' }} /></a>
          </div>
          <Link to="/iletisim" style={{ background: '#d4af37', color: '#0d1b3e', fontSize: '10px', fontWeight: 900, letterSpacing: '0.06em', padding: '8px 18px', borderRadius: '999px' }}>
            DERS AL
          </Link>
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(o => !o)} style={{ color: '#d4af37' }}>
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
                    padding: '10px 16px', fontSize: '11px', fontWeight: 900, letterSpacing: '0.08em', borderRadius: '999px',
                    background: isActive ? '#d4af37' : 'transparent',
                    color: isActive ? '#0d1b3e' : 'rgba(255,255,255,0.5)',
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
