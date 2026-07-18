import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Facebook, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Confetti from '@/components/ui/Confetti';

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

export default function MainMenu() {
  const { isMessi, toggleMessi } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [sariHover, setSariHover] = useState(false);

  const M = { bg: '#0a1628', blue: '#75aadb', yellow: '#f8d000' };
  const N = { bg: '#071029', gold: '#d4af37', navy: '#0d1b3e' };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSari = () => {
    toggleMessi();
    if (!isMessi) {
      setConfettiActive(true);
      setTimeout(() => setConfettiActive(false), 4000);
    }
  };

  const navBg = isMessi
    ? scrolled ? 'rgba(10,22,40,0.97)' : M.bg
    : scrolled ? 'rgba(7,16,41,0.97)' : N.bg;

  const borderColor = isMessi ? 'rgba(117,170,219,0.3)' : 'rgba(212,175,55,0.2)';
  const activeColor = isMessi ? M.blue : N.gold;
  const textColor = isMessi ? 'rgba(117,170,219,0.5)' : 'rgba(255,255,255,0.45)';

  return (
    <>
      <Confetti active={confettiActive} />
      <header style={{ background: navBg, borderBottom: `1px solid ${borderColor}`, position: 'sticky', top: 0, zIndex: 40, backdropFilter: scrolled ? 'blur(12px)' : 'none', transition: 'background 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '60px' }}>

          {/* Logo */}
          <Link to="/" style={{ flexShrink: 0 }}>
            {isMessi ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '22px' }}>🇦🇷</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: M.blue, letterSpacing: '0.02em', lineHeight: 1 }}>
                    GIZEM<span style={{ color: M.yellow }}>10</span>HOCA
                  </div>
                  <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>PILATES & WELLNESS</div>
                </div>
              </div>
            ) : (
              <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png"
                alt="Gizem Hoca" style={{ height: '36px', filter: 'brightness(0) invert(1)', display: 'block' }} />
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: '2px' }}>
            {menuItems.map(item => (
              <NavLink key={item.path} to={item.path}
                style={({ isActive }) => ({
                  padding: '7px 12px', fontSize: '10px', fontWeight: 900, letterSpacing: '0.08em',
                  borderRadius: '999px', transition: 'all 0.2s', textDecoration: 'none',
                  background: isActive ? activeColor : 'transparent',
                  color: isActive ? (isMessi ? M.bg : '#0d1b3e') : textColor,
                })}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Sağ alan */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Sosyal ikonlar */}
            <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '10px' }}>
              {[{ href: 'https://www.instagram.com/gizemmhoca/', Icon: Instagram }, { href: 'https://www.youtube.com/@gizemmhoca', Icon: Youtube }, { href: 'https://facebook.com', Icon: Facebook }].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ color: isMessi ? 'rgba(117,170,219,0.45)' : 'rgba(212,175,55,0.45)', transition: 'all 0.2s', display: 'inline-flex' }}
                  onMouseEnter={e => { e.currentTarget.style.color = activeColor; e.currentTarget.style.transform = 'scale(1.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = isMessi ? 'rgba(117,170,219,0.45)' : 'rgba(212,175,55,0.45)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                  <Icon size={17} />
                </a>
              ))}
            </div>

            {/* SARI / Normal butonu */}
            <motion.button
              onClick={handleSari}
              onMouseEnter={() => setSariHover(true)}
              onMouseLeave={() => setSariHover(false)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="hidden lg:flex"
              style={{
                alignItems: 'center', gap: '6px',
                background: isMessi ? 'rgba(117,170,219,0.15)' : 'linear-gradient(135deg,#f8d000,#f8a000)',
                color: isMessi ? M.blue : '#0a1628',
                fontSize: '10px', fontWeight: 900, letterSpacing: '0.04em',
                padding: '8px 16px', borderRadius: '999px', border: isMessi ? `1px solid ${M.blue}` : 'none',
                cursor: 'pointer', fontFamily: 'Montserrat',
                boxShadow: !isMessi ? '0 2px 12px rgba(248,208,0,0.4)' : 'none',
                transition: 'all 0.3s',
              }}>
              {isMessi ? '↩ Normal Moda Dön' : '⚽ SARI'}
            </motion.button>

            {/* Ders Al */}
            <Link to="/iletisim" className="hidden lg:inline-block"
              style={{ background: activeColor, color: isMessi ? M.bg : '#0d1b3e', fontSize: '10px', fontWeight: 900, letterSpacing: '0.06em', padding: '9px 18px', borderRadius: '999px', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              {isMessi ? 'GOL ⚽' : 'DERS AL ✦'}
            </Link>

            {/* Hamburger */}
            <button className="lg:hidden"
              onClick={() => setMobileOpen(o => !o)}
              style={{ background: isMessi ? 'rgba(117,170,219,0.1)' : 'rgba(212,175,55,0.1)', border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '8px', cursor: 'pointer', color: activeColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

  
      {/* ÜCRETSIZ DERS TOP BAR */}
      <div style={{ background: G.gold, padding: '6px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '10px', fontWeight: 900, color: G.bg, letterSpacing: '0.06em' }}>
          🎁 İLK TANITMA SEANSI ÜCRETSİZ
        </span>
        <span style={{ fontSize: '9px', color: 'rgba(13,27,62,0.6)' }}>·</span>
        <a href="https://wa.me/905383135720?text=Ücretsiz%20tanışma%20seansı%20istiyorum"
          target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '10px', fontWeight: 900, color: G.bg, textDecoration: 'underline', letterSpacing: '0.04em' }}>
          Hemen Rezervasyon Yap →
        </a>
      </div>

      {/* Messi modunda arjantin şerit */}
        {isMessi && (
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ height: '3px', background: `linear-gradient(90deg, ${M.blue} 33%, #fff 33%, #fff 66%, ${M.blue} 66%)` }} />
        )}

        {/* Mobil menü */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                style={{ position: 'fixed', inset: 0, top: '60px', background: 'rgba(0,0,0,0.6)', zIndex: 30 }} />
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ position: 'fixed', top: '60px', right: 0, bottom: 0, width: '80%', maxWidth: '300px', background: isMessi ? M.bg : '#071029', borderLeft: `1px solid ${borderColor}`, zIndex: 40, overflowY: 'auto', padding: '16px' }}>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}>
                  {menuItems.map(item => (
                    <NavLink key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                      style={({ isActive }) => ({
                        padding: '12px 16px', fontSize: '12px', fontWeight: 900, letterSpacing: '0.08em',
                        borderRadius: '10px', textDecoration: 'none', transition: 'all 0.2s',
                        background: isActive ? activeColor : `rgba(${isMessi ? '117,170,219' : '212,175,55'},0.05)`,
                        color: isActive ? (isMessi ? M.bg : '#0d1b3e') : textColor,
                        border: `1px solid rgba(${isMessi ? '117,170,219' : '212,175,55'},0.1)`,
                      })}>
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
                <button onClick={() => { handleSari(); setMobileOpen(false); }}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', marginBottom: '10px', fontFamily: 'Montserrat', fontWeight: 900, fontSize: '11px', cursor: 'pointer', background: isMessi ? 'rgba(117,170,219,0.15)' : 'linear-gradient(135deg,#f8d000,#f8a000)', color: isMessi ? M.blue : '#0a1628', border: isMessi ? `1px solid ${M.blue}` : 'none' }}>
                  {isMessi ? '↩ Normal Moda Dön' : '⚽ SARI Moda Geç'}
                </button>
                <Link to="/iletisim" onClick={() => setMobileOpen(false)}
                  style={{ display: 'block', textAlign: 'center', background: activeColor, color: isMessi ? M.bg : '#0d1b3e', fontSize: '11px', fontWeight: 900, padding: '14px', borderRadius: '999px', textDecoration: 'none' }}>
                  {isMessi ? 'GOL ⚽' : 'DERS AL ✦'}
                </Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
