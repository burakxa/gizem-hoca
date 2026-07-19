import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function FloatingBookBtn() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="https://wa.me/905383135720?text=Merhaba!%20Ders%20rezervasyonu%20yapmak%20istiyorum."
          target="_blank" rel="noopener noreferrer"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(212,175,55,0.45)' }}
          style={{
            position: 'fixed', bottom: '160px', right: '24px', zIndex: 47,
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#0d1b3e', border: '1.5px solid #d4af37',
            color: '#d4af37', fontSize: '15px', fontWeight: 900,
            padding: '10px 18px', borderRadius: '999px',
            textDecoration: 'none', letterSpacing: '0.06em',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}>
          <Calendar size={15} />
          REZERVASYON YAP
        </motion.a>
      )}
    </AnimatePresence>
  );
}
