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

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const linkClass = "block text-3xl font-black tracking-widest transition-colors duration-300";
  const activeLinkClass = "text-white";
  const inactiveLinkClass = "text-brand-black hover:text-white";

  const backdropVariants = {
    open: { opacity: 1, display: 'block' },
    closed: { opacity: 0, transitionEnd: { display: 'none' } },
  };

  const menuVariants = {
    open: { x: 0 },
    closed: { x: '100%' },
  };

  return (
    <motion.div
      className="fixed inset-0 z-40"
      variants={backdropVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="fixed top-0 right-0 h-full w-full bg-brand-lime flex flex-col justify-between p-8 overflow-y-auto"
        variants={menuVariants}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
      >
        <div />
        <nav className="relative py-6">
          <div className="absolute top-0 left-0 w-full h-px bg-brand-black/30" />
          <ul className="space-y-4 text-center">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-0 left-0 w-full h-px bg-brand-black/30" />
        </nav>

        <div className="flex justify-center space-x-6">
          <a href="https://www.instagram.com/gizemmhoca/" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:text-white transition-colors"><Instagram size={28} /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:text-white transition-colors"><Facebook size={28} /></a>
          <a href="https://www.youtube.com/@gizemmhoca" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:text-white transition-colors"><Youtube size={28} /></a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;
