import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube } from 'lucide-react';

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
  const linkClass = "block text-2xl font-black tracking-widest transition-colors duration-300";
  const activeLinkClass = "text-white";
  const inactiveLinkClass = "text-brand-black hover:text-white";

  return (
    <aside className="hidden md:flex md:w-1/2 bg-brand-lime flex-col justify-center items-center p-8 lg:p-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-auto"
      >
        <Link to="/" className="block w-[600px] transition-opacity hover:opacity-80">
          <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png" alt="Gizem Hoca Logo" className="w-full h-auto" />
        </Link>
      </motion.div>
      <nav className="relative py-6 w-full">
        <div className="absolute top-0 left-0 w-full h-px bg-brand-black/30" />
        <ul className="space-y-3 text-center">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.06 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
              >
                {item.label}
              </NavLink>
            </motion.li>
          ))}
        </ul>
        <div className="absolute bottom-0 left-0 w-full h-px bg-brand-black/30" />
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex space-x-6 mt-auto"
      >
        <a href="https://www.instagram.com/gizemmhoca/" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:text-white transition-colors"><Instagram size={28} /></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:text-white transition-colors"><Facebook size={28} /></a>
        <a href="https://www.youtube.com/@gizemmhoca" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:text-white transition-colors"><Youtube size={28} /></a>
      </motion.div>
    </aside>
  );
};

export default MainMenu;
