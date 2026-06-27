import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MainMenu from '@/components/layout/MainMenu';
import MobileMenu from '@/components/layout/MobileMenu';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { CountdownBanner, AnnouncementBanner } from '@/components/ui/CountdownBanner';
import { Menu, X } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, x: 16, transition: { duration: 0.2 } },
};

const PageLayout = ({ handleNotImplemented }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const phoneNumber = "905383135720";
  const location = useLocation();

  return (
    <div className="min-h-screen bg-brand-lime text-brand-black font-sans flex flex-col md:flex-row">
      <motion.button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-brand-lime rounded-full shadow"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menüyü aç/kapat"
        whileTap={{ scale: 0.9 }}
      >
        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
      </motion.button>

      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} handleNotImplemented={handleNotImplemented} />

      {/* Sol içerik */}
      <div className="hidden md:flex md:w-1/2 flex-col overflow-hidden">
        <CountdownBanner />
        <AnnouncementBanner />
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-full"
            >
              <Outlet context={{ handleNotImplemented }} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobil içerik */}
      <div className="block md:hidden w-full">
        <CountdownBanner />
        <AnnouncementBanner />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet context={{ handleNotImplemented }} />
          </motion.div>
        </AnimatePresence>
      </div>

      <MainMenu handleNotImplemented={handleNotImplemented} />
      <WhatsAppButton phoneNumber={phoneNumber} />
    </div>
  );
};

export default PageLayout;
