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
    <header className="w-full bg-brand-bg border-b-2 border-brand-black sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex-shrink-0">
          <div className="text-xl font-black text-brand-black tracking-tight">
            GIZEM<span className="text-brand-lime">●</span>HOCA
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map(item => (
            <NavLink key={item.path} to={item.path}
              className={({ isActive }) =>
                `px-3 py-1.5 text-[10px] font-black tracking-wider transition-all duration-200 rounded-full ${
                  isActive ? 'bg-brand-black text-brand-bg' : 'text-brand-brown hover:text-brand-black'
                }`
              }>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://www.instagram.com/gizemmhoca/" target="_blank" rel="noopener noreferrer" className="text-brand-brown hover:text-brand-black transition-colors"><Instagram size={18} /></a>
            <a href="https://www.youtube.com/@gizemmhoca" target="_blank" rel="noopener noreferrer" className="text-brand-brown hover:text-brand-black transition-colors"><Youtube size={18} /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-brand-brown hover:text-brand-black transition-colors"><Facebook size={18} /></a>
          </div>
          <Link to="/iletisim" className="hidden lg:block bg-brand-lime text-brand-bg text-[10px] font-black tracking-wider px-5 py-2 rounded-full hover:bg-brand-lime/80 transition-colors">
            DERSE BAŞLA
          </Link>
          <button className="lg:hidden p-2 hover:bg-brand-black/5 rounded-full transition-colors" onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? <X size={24} className="text-brand-black" /> : <Menu size={24} className="text-brand-black" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t-2 border-brand-black">
            <nav className="flex flex-col p-4 gap-1">
              {menuItems.map(item => (
                <NavLink key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-sm font-black tracking-wider rounded-full transition-all ${
                      isActive ? 'bg-brand-black text-brand-bg' : 'text-brand-brown hover:text-brand-black'
                    }`
                  }>
                  {item.label}
                </NavLink>
              ))}
              <div className="flex gap-4 px-4 py-3 border-t border-brand-tan mt-2">
                <a href="https://www.instagram.com/gizemmhoca/" target="_blank" rel="noopener noreferrer"><Instagram size={20} className="text-brand-brown" /></a>
                <a href="https://www.youtube.com/@gizemmhoca" target="_blank" rel="noopener noreferrer"><Youtube size={20} className="text-brand-brown" /></a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MainMenu;
