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
  useEffect(() => { if (!isMessi) { setShowSplash(false); setShowGame(false); } }, [isMessi]);

  const skipToGame = () => {
    setShowSplash(false);
    setTimeout(() => setShowGame(true), 300);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            transition={{ duration: 0.4 }}
            onClick={skipToGame}
            style={{ position: 'fixed', inset: 0, zIndex: 9990, background: '#0a1628', cursor: 'pointer', overflow: 'hidden', fontFamily: 'Montserrat,sans-serif' }}>

            {/* Arjantin çizgiler arka plan */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', opacity: 0.07 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{ flex: 1, background: i % 2 === 0 ? 'transparent' : '#75aadb' }} />
              ))}
            </div>

            {/* Messi fotoğrafı — Wikipedia'dan doğrudan */}
            <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
              style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Birden fazla fallback */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
                alt="Messi"
                crossOrigin="anonymous"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 15%', filter: 'brightness(0.5) saturate(0.85)' }}
                onError={(e) => {
                  e.target.src = 'https://cdn.britannica.com/02/220602-050-A5B81DCE/Lionel-Messi-Argentina-World-Cup-2022.jpg';
                  e.target.onerror = () => {
                    e.target.style.display = 'none';
                  };
                }}
              />
            </motion.div>

            {/* Koyu gradyanlar — fotoğrafı çerçevele */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0a1628 0%, transparent 22%, transparent 60%, #0a1628 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0a1628 0%, transparent 20%, transparent 80%, #0a1628 100%)', pointerEvents: 'none' }} />

            {/* 10 numarası — sol üst */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
              style={{ position: 'absolute', left: '4%', top: '50%', transform: 'translateY(-50%)', fontSize: 'clamp(100px,20vw,200px)', fontWeight: 900, color: 'rgba(248,208,0,0.1)', lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none' }}>
              10
            </motion.div>

            {/* Üst Arjantin şerit */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg,#75aadb 33%,#fff 33%,#fff 66%,#75aadb 66%)' }} />

            {/* Alt yazı */}
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }}
              style={{ position: 'absolute', bottom: '64px', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{ fontSize: 'clamp(9px,1.8vw,13px)', fontWeight: 900, letterSpacing: '0.28em', color: '#75aadb', marginBottom: '10px' }}>
                🇦🇷 ARJANTİN · 2022 FIFA DÜNYA ŞAMPİYONU
              </div>
              <div style={{ fontSize: 'clamp(32px,7vw,68px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, textShadow: '0 4px 32px rgba(0,0,0,0.8)' }}>
                LIONEL <span style={{ color: '#f8d000' }}>MESSI</span>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                style={{ fontSize: 'clamp(9px,1.5vw,12px)', color: 'rgba(255,255,255,0.35)', marginTop: '14px', letterSpacing: '0.15em' }}>
                ⚽ PENALTİ OYUNU BAŞLIYOR — RONALDO KALECİ!
              </motion.div>
            </motion.div>

            {/* Progress bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.08)' }}>
              <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 4, ease: 'linear' }}
                style={{ height: '100%', background: 'linear-gradient(90deg,#75aadb,#fff,#f8d000)' }} />
            </div>

            {/* Tıkla ipucu */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
              style={{ position: 'absolute', top: '16px', right: '20px', fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', pointerEvents: 'none' }}>
              ATLAMAK İÇİN TIKLAYıN
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGame && <MessiGame onClose={() => setShowGame(false)} />}
      </AnimatePresence>
    </>
  );
}
