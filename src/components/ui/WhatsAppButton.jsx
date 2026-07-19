import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

function WhatsAppButton({ phoneNumber }) {
  const [hovered, setHovered] = useState(false);
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Merhaba, Pilates dersleri hakkında bilgi almak istiyorum.')}`;

  return (
    <motion.div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50, display: 'flex', alignItems: 'center', gap: '10px' }}
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2, type: 'spring', stiffness: 120 }}>

      <AnimatePresence>
        {hovered && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
            style={{ background: '#071029', border: '1px solid rgba(212,175,55,0.35)', borderRadius: '999px', padding: '8px 16px', whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#d4af37', letterSpacing: '0.04em' }}>Hemen Mesaj At</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a href={url} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        style={{
          width: '58px', height: '58px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #d4af37 0%, #b8960f 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
          border: '2px solid rgba(212,175,55,0.6)',
        }}>
        <MessageCircle size={26} style={{ color: '#0d1b3e' }} fill="none" strokeWidth={2} />
      </motion.a>
    </motion.div>
  );
}

export default WhatsAppButton;
