import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MainMenu from '@/components/layout/MainMenu';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CookieBanner from '@/components/ui/CookieBanner';

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
      <MainMenu />
      <main className="flex-1 w-full max-w-6xl mx-auto w-full">
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
      <Footer />
      <WhatsAppButton phoneNumber={phoneNumber} />
      <CookieBanner />
    </div>
  );
};

export default PageLayout;
