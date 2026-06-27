import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Menu, X } from 'lucide-react';

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
    <>
      {/* NAVBAR */}
      <header className="w-full bg-brand-lime border-b-2 border-brand-black/10 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png"
              alt="Gizem Hoca"
              className="h-16 w-auto"
            />
          </Link>

          {/* Masaüstü menü */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-xs font-black tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-black text-brand-lime'
                      : 'text-brand-black hover:bg-brand-black/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Sağ - sosyal medya + mobil buton */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3">
              <a href="https://www.instagram.com/gizemmhoca/" target="_blank" rel="noopener noreferrer"
                className="text-brand-black hover:text-brand-black/50 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@gizemmhoca" target="_blank" rel="noopener noreferrer"
                className="text-brand-black hover:text-brand-black/50 transition-colors">
                <Youtube size={20} />
              </a>
            </div>

            {/* Mobil hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-brand-black/10 transition-colors"
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobil menü dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-brand-black/10"
            >
              <nav className="flex flex-col px-4 py-3 gap-1">
                {menuItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded-xl text-sm font-black tracking-wider transition-all duration-200 ${
                        isActive
                          ? 'bg-brand-black text-brand-lime'
                          : 'text-brand-black hover:bg-brand-black/10'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <div className="flex gap-4 px-4 py-3 border-t border-brand-black/10 mt-2">
                  <a href="https://www.instagram.com/gizemmhoca/" target="_blank" rel="noopener noreferrer"
                    className="text-brand-black"><Instagram size={22} /></a>
                  <a href="https://www.youtube.com/@gizemmhoca" target="_blank" rel="noopener noreferrer"
                    className="text-brand-black"><Youtube size={22} /></a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default MainMenu;
