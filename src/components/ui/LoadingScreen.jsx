import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [done, setDone] = useState(() => {
    // Daha önce gösterildiyse bir daha gösterme
    return sessionStorage.getItem('loading_shown') === 'true';
  });

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem('loading_shown', 'true');
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          style={{
            position: 'fixed', inset: 0, background: '#071029', zIndex: 9999,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px',
          }}>
          <motion.img
            src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png"
            alt="Gizem Hoca"
            style={{ height: '52px', filter: 'brightness(0) invert(1)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
          <div style={{ width: '180px', height: '2px', background: 'rgba(212,175,55,0.15)', borderRadius: '999px', overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', background: '#d4af37', borderRadius: '999px' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </div>
          <motion.p
            style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.2em', color: 'rgba(212,175,55,0.4)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            PİLATES & WELLNESS
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
