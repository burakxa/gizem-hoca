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
    <header className="w-full bg-white border-b-2 border-black sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex-shrink-0">
          <img
            src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png"
            alt="Gizem Hoca"
            className="h-12 w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map(item => (
            <NavLink key={item.path} to={item.path}
              className={({ isActive }) =>
                `px-3 py-1.5 text-[10px] font-black tracking-widest transition-all duration-200 ${
                  isActive ? 'bg-black text-brand-lime' : 'text-black/60 hover:text-black'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://www.instagram.com/gizemmhoca/" target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-colors"><Instagram size={18} /></a>
            <a href="https://www.youtube.com/@gizemmhoca" target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-colors"><Youtube size={18} /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-colors"><Facebook size={18} /></a>
          </div>
          <Link to="/iletisim" className="hidden lg:block bg-black text-brand-lime text-[10px] font-black tracking-widest px-4 py-2 hover:bg-black/80 transition-colors">
            DERS AL
          </Link>
          <button className="lg:hidden p-2 hover:bg-black/5 transition-colors" onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t-2 border-black"
          >
            <nav className="flex flex-col">
              {menuItems.map(item => (
                <NavLink key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-6 py-3 text-sm font-black tracking-widest border-b border-black/10 transition-all ${
                      isActive ? 'bg-black text-brand-lime' : 'text-black hover:bg-black/5'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="flex gap-4 px-6 py-4">
                <a href="https://www.instagram.com/gizemmhoca/" target="_blank" rel="noopener noreferrer"><Instagram size={20} className="text-black/50" /></a>
                <a href="https://www.youtube.com/@gizemmhoca" target="_blank" rel="noopener noreferrer"><Youtube size={20} className="text-black/50" /></a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MainMenu;
