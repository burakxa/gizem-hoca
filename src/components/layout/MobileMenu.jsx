import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const menuItems = [
  { path: '/', label: 'ANA SAYFA' },
  { path: '/hakkimda', label: 'HAKKIMDA' },
  { path: '/blog', label: 'BLOG' },
  { path: '/galeri', label: 'GALERİ' },
  { path: '/dersler', label: 'DERSLER' },
];

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const linkClass = "block text-4xl font-black tracking-widest transition-colors duration-300";
  const activeLinkClass = "text-white"; // Active link is white
  const inactiveLinkClass = "text-brand-black hover:text-white"; // Inactive link is black, turns white on hover

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
        className="fixed top-0 right-0 h-full w-full bg-brand-lime flex flex-col justify-between p-8"
        variants={menuVariants}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
      >
        <div />
        <nav className="relative py-8">
          <div className="absolute top-0 left-0 w-full h-px bg-brand-black/30" />
          <ul className="space-y-6 text-center">
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
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:text-white transition-colors"><Instagram size={32} /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:text-white transition-colors"><Facebook size={32} /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-brand-black hover:text-white transition-colors"><Youtube size={32} /></a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;