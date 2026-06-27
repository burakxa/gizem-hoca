import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MainMenu from '@/components/layout/MainMenu';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { CountdownBanner, AnnouncementBanner } from '@/components/ui/CountdownBanner';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const PageLayout = ({ handleNotImplemented }) => {
  const location = useLocation();
  const phoneNumber = "905383135720";

  return (
    <div className="min-h-screen bg-brand-lime flex flex-col">
      {/* Bannerlar */}
      <CountdownBanner />
      <AnnouncementBanner />

      {/* Üst navbar */}
      <MainMenu />

      {/* Sayfa içeriği */}
      <main className="flex-1 w-full max-w-6xl mx-auto">
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
      </main>

      {/* WhatsApp */}
      <WhatsAppButton phoneNumber={phoneNumber} />
    </div>
  );
};

export default PageLayout;
