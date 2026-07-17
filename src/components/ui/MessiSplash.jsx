import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import MessiGame from '@/components/ui/MessiGame';

export default function MessiSplash() {
  const { isMessi } = useTheme();
  const [showSplash, setShowSplash] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const prevMessi = useRef(false);

  useEffect(() => {
    if (isMessi && !prevMessi.current) {
      setShowSplash(true);
      setShowGame(false);
      const t = setTimeout(() => {
        setShowSplash(false);
        setTimeout(() => setShowGame(true), 500);
      }, 4000);
      return () => clearTimeout(t);
    }
    prevMessi.current = isMessi;
  }, [isMessi]);

  useEffect(() => { prevMessi.current = isMessi; });

  useEffect(() => {
    if (!isMessi) { setShowSplash(false); setShowGame(false); }
  }, [isMessi]);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            transition={{ duration: 0.3 }}
            onClick={() => { setShowSplash(false); setTimeout(() => setShowGame(true), 300); }}
            style={{ position: 'fixed', inset: 0, zIndex: 9990, background: '#0a1628', cursor: 'pointer', overflow: 'hidden' }}>

            {/* Arjantin çizgiler */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', opacity: 0.05 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{ flex: 1, background: i % 2 === 0 ? 'transparent' : '#75aadb' }} />
              ))}
            </div>

            {/* Messi fotoğrafı — normal, tam ekran */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{ position: 'absolute', inset: 0 }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/800px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
                alt="Messi"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'brightness(0.55) saturate(0.9)' }}
              />
            </motion.div>

            {/* Gradyan overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0a1628 0%, transparent 20%, transparent 65%, #0a1628 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0a1628 0%, transparent 30%, transparent 70%, #0a1628 100%)', pointerEvents: 'none' }} />

            {/* 10 numarası */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ position: 'absolute', right: '4%', bottom: '15%', fontSize: 'clamp(120px,25vw,240px)', fontWeight: 900, color: 'rgba(248,208,0,0.1)', lineHeight: 1, letterSpacing: '-0.05em', fontFamily: 'Montserrat', pointerEvents: 'none', userSelect: 'none' }}>
              10
            </motion.div>

            {/* Üst şerit - Arjantin */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg,#75aadb 33%,#fff 33%,#fff 66%,#75aadb 66%)' }} />

            {/* Alt yazı */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
              style={{ position: 'absolute', bottom: '60px', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{ fontSize: 'clamp(9px,1.8vw,13px)', fontWeight: 900, letterSpacing: '0.3em', color: 'rgba(117,170,219,0.85)', marginBottom: '10px' }}>
                🇦🇷 ARJANTİN · 2022 FIFA DÜNYA ŞAMPİYONU
              </div>
              <div style={{ fontSize: 'clamp(32px,7vw,64px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                LIONEL <span style={{ color: '#f8d000' }}>MESSI</span>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
                style={{ fontSize: 'clamp(9px,1.5vw,12px)', color: 'rgba(255,255,255,0.35)', marginTop: '14px', letterSpacing: '0.15em' }}>
                ⚽ PENALTİ OYUNU BAŞLIYOR...
              </motion.div>
            </motion.div>

            {/* Progress bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'rgba(117,170,219,0.15)' }}>
              <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 4, ease: 'linear' }}
                style={{ height: '100%', background: 'linear-gradient(90deg,#75aadb,#f8d000)', borderRadius: '0 999px 999px 0' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGame && <MessiGame onClose={() => setShowGame(false)} />}
      </AnimatePresence>
    </>
  );
}
