import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MainMenu from '@/components/layout/MainMenu';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CookieBanner from '@/components/ui/CookieBanner';
import LoadingScreen from '@/components/ui/LoadingScreen';
import ChatBot from '@/components/ui/ChatBot';
import FloatingBookBtn from '@/components/ui/FloatingBookBtn';
import BackToTop from '@/components/ui/BackToTop';
import CountdownBanner from '@/components/ui/CountdownBanner';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollAnimator from '@/components/ui/ScrollAnimator';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

const PageLayout = ({ handleNotImplemented }) => {
  const location = useLocation();
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollAnimator />
      <div style={{ minHeight: '100vh', background: '#0d1b3e', display: 'flex', flexDirection: 'column' }}>
        <CountdownBanner />
        <MainMenu />
        <main style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Outlet context={{ handleNotImplemented }} />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppButton phoneNumber="905383135720" />
        <FloatingBookBtn />
        <BackToTop />
        <ChatBot />
        <CookieBanner />
      </div>
    </>
  );
};

export default PageLayout;
