import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

function BackToTopInner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={scrollTop}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          whileHover={{ scale: 1.1, boxShadow: '0 6px 20px rgba(212,175,55,0.4)' }}
          whileTap={{ scale: 0.95 }}
          title="Yukarı çık"
          style={{
            position: 'fixed', bottom: '24px', left: '24px', zIndex: 46,
            width: '42px', height: '42px', borderRadius: '50%',
            background: '#0d1b3e', border: '1.5px solid rgba(212,175,55,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#d4af37'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'}
        >
          <ChevronUp size={18} style={{ color: '#d4af37' }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default React.memo(BackToTopInner);
