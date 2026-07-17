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
      // 4 saniye sonra splash kapan, oyun aç
      const t = setTimeout(() => {
        setShowSplash(false);
        setTimeout(() => setShowGame(true), 500);
      }, 4000);
      return () => clearTimeout(t);
    }
    prevMessi.current = isMessi;
  }, [isMessi]);

  useEffect(() => {
    prevMessi.current = isMessi;
  });

  // Messi modu kapanınca her şeyi kapat
  useEffect(() => {
    if (!isMessi) { setShowSplash(false); setShowGame(false); }
  }, [isMessi]);

  return (
    <>
      {/* SPLASH */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            transition={{ duration: 0.3 }}
            onClick={() => { setShowSplash(false); setTimeout(() => setShowGame(true), 300); }}
            style={{ position: 'fixed', inset: 0, zIndex: 9990, background: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}>

            {/* Çizgili arka plan */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', opacity: 0.06 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{ flex: 1, background: i % 2 === 0 ? 'transparent' : '#75aadb' }} />
              ))}
            </div>

            <style>{`
              .messi-dot {
                width: 100%; height: 100%;
                object-fit: cover;
                object-position: top center;
                filter: grayscale(1) contrast(1.5) brightness(0.8);
                -webkit-mask-image: radial-gradient(circle 2.5px at center, black 1.5px, transparent 1.5px);
                -webkit-mask-size: 7px 7px;
                mask-image: radial-gradient(circle 2.5px at center, black 1.5px, transparent 1.5px);
                mask-size: 7px 7px;
              }
              .messi-dot-color {
                width: 100%; height: 100%;
                object-fit: cover;
                object-position: top center;
                filter: grayscale(0.3) contrast(1.2) brightness(0.5) sepia(0.6) hue-rotate(190deg) saturate(4);
                -webkit-mask-image: radial-gradient(circle 1.8px at center, black 1px, transparent 1px);
                -webkit-mask-size: 7px 7px;
                mask-image: radial-gradient(circle 1.8px at center, black 1px, transparent 1px);
                mask-size: 7px 7px;
                mix-blend-mode: screen;
                opacity: 0.6;
                position: absolute; inset: 0;
              }
              @keyframes mReveal { 0%{clip-path:inset(100% 0 0 0);opacity:0} 100%{clip-path:inset(0% 0 0 0);opacity:1} }
              .mReveal { animation: mReveal 1s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
            `}</style>

            {/* Messi fotoğraf — halftone */}
            <div className="mReveal" style={{ position: 'absolute', inset: 0 }}>
              <img
                className="messi-dot"
                src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=90"
                alt="Messi"
                onError={e => {
                  e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/800px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg';
                }}
              />
              <img
                className="messi-dot-color"
                src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=90"
                alt=""
                aria-hidden="true"
                onError={e => {
                  e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/800px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg';
                }}
              />
            </div>

            {/* Gradyan */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0a1628 0%, transparent 18%, transparent 70%, #0a1628 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0a1628 0%, transparent 12%, transparent 88%, #0a1628 100%)', pointerEvents: 'none' }} />

            {/* 10 numarası */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-55%)', fontSize: 'clamp(100px,22vw,200px)', fontWeight: 900, color: 'rgba(248,208,0,0.08)', lineHeight: 1, letterSpacing: '-0.05em', fontFamily: 'Montserrat', pointerEvents: 'none', userSelect: 'none' }}>
              10
            </motion.div>

            {/* Yazı */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }}
              style={{ position: 'absolute', bottom: '60px', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{ fontSize: 'clamp(9px,1.8vw,13px)', fontWeight: 900, letterSpacing: '0.3em', color: 'rgba(117,170,219,0.7)', marginBottom: '10px' }}>🇦🇷 ARJANTİN · 2022 FIFA DÜNYA ŞAMPİYONU</div>
              <div style={{ fontSize: 'clamp(28px,6vw,52px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                LIONEL <span style={{ color: '#f8d000' }}>MESSI</span>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
                style={{ fontSize: 'clamp(9px,1.5vw,12px)', color: 'rgba(255,255,255,0.3)', marginTop: '12px', letterSpacing: '0.12em' }}>
                ⚽ PENALTI OYUNU BAŞLIYOR...
              </motion.div>
            </motion.div>

            {/* Progress bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'rgba(117,170,219,0.15)' }}>
              <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 4, ease: 'linear' }}
                style={{ height: '100%', background: 'linear-gradient(90deg,#75aadb,#f8d000)', borderRadius: '0 999px 999px 0' }} />
            </div>

            {/* Arjantin şerit — üst */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg,#75aadb 33%,#fff 33%,#fff 66%,#75aadb 66%)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* OYUN */}
      <AnimatePresence>
        {showGame && (
          <MessiGame onClose={() => setShowGame(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
