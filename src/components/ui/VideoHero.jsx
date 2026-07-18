import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoHero() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      {/* YouTube embed sessiz arka plan */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: loaded ? 0.18 : 0 }} transition={{ duration: 1 }}
        style={{ position: 'absolute', inset: '-60px', zIndex: 0 }}>
        <iframe
          src="https://www.youtube.com/embed/2_pyykhX08M?autoplay=1&mute=1&loop=1&playlist=2_pyykhX08M&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none', transform: 'scale(1.3)' }}
          allow="autoplay"
          onLoad={() => setLoaded(true)}
          title="Pilates arka plan"
        />
      </motion.div>
      {/* Renk overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(13,27,62,0.95) 0%, rgba(13,27,62,0.8) 100%)', zIndex: 1 }} />
    </div>
  );
}
