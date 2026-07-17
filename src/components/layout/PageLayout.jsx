import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MainMenu from '@/components/layout/MainMenu';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CookieBanner from '@/components/ui/CookieBanner';
import LoadingScreen from '@/components/ui/LoadingScreen';
import ChatBot from '@/components/ui/ChatBot';
import { useTheme } from '@/contexts/ThemeContext';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

const PageLayout = ({ handleNotImplemented }) => {
  const location = useLocation();
  const { isMessi } = useTheme();

  return (
    <>
      <LoadingScreen />

      {/* Messi modu global CSS */}
      {isMessi && (
        <style>{`
          :root {
            --messi-blue: #75aadb;
            --messi-yellow: #f8d000;
            --messi-bg: #0a1628;
            --messi-dark: #071220;
          }
          body { background: #0a1628 !important; }
          /* Tüm altın renkleri mavi yap */
          [style*="color: #d4af37"], [style*="color:#d4af37"] { color: #75aadb !important; }
          [style*="background: #d4af37"], [style*="background:#d4af37"] { background: #f8d000 !important; }
          [style*="background: #0d1b3e"], [style*="background:#0d1b3e"] { background: #0a1628 !important; }
          [style*="background: #071029"], [style*="background:#071029"] { background: #071220 !important; }
          [style*="border.*d4af37"] { border-color: rgba(117,170,219,0.3) !important; }
          /* Scrollbar Arjantin mavisi */
          ::-webkit-scrollbar-thumb { background: rgba(117,170,219,0.4) !important; }
          ::selection { background: rgba(117,170,219,0.3) !important; }
        `}</style>
      )}

      <div style={{ minHeight: '100vh', background: isMessi ? '#0a1628' : '#0d1b3e', display: 'flex', flexDirection: 'column', transition: 'background 0.5s' }}>
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
        <ChatBot />
        <CookieBanner />
      </div>
    </>
  );
};

export default PageLayout;
