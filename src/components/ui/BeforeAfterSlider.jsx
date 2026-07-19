import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function BeforeAfterSlider({ before, after, beforeLabel = 'ÖNCE', afterLabel = 'SONRA' }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const p = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    setPos(p);
  }, []);

  const onMouseMove = (e) => { if (dragging.current) updatePos(e.clientX); };
  const onTouchMove = (e) => { updatePos(e.touches[0].clientX); };

  return (
    <div ref={containerRef}
      style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)', cursor: 'col-resize', userSelect: 'none' }}
      onMouseMove={onMouseMove} onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchMove={onTouchMove} onTouchEnd={() => { dragging.current = false; }}>

      {/* SONRA (arka) */}
      <img loading="lazy" src={after} alt="Sonra" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65) sepia(0.1)' }} />
      <div style={{ position: 'absolute', top: '12px', right: '14px', background: 'rgba(212,175,55,0.9)', color: '#0d1b3e', fontSize: '11px', fontWeight: 900, padding: '4px 10px', borderRadius: '999px', letterSpacing: '0.1em' }}>{afterLabel}</div>

      {/* ÖNCE (kırpılan) */}
      <div style={{ position: 'absolute', inset: 0, width: `${pos}%`, overflow: 'hidden' }}>
        <img loading="lazy" src={before} alt="Önce" style={{ position: 'absolute', inset: 0, width: containerRef.current?.offsetWidth || '100%', height: '100%', maxWidth: 'none', objectFit: 'cover', filter: 'brightness(0.6) grayscale(0.5)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '14px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '11px', fontWeight: 900, padding: '4px 10px', borderRadius: '999px', letterSpacing: '0.1em' }}>{beforeLabel}</div>
      </div>

      {/* Divider çizgisi */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: '2px', background: '#d4af37', transform: 'translateX(-50%)', pointerEvents: 'none' }} />

      {/* Sürükleme tutacağı */}
      <motion.div
        style={{ position: 'absolute', top: '50%', left: `${pos}%`, transform: 'translate(-50%, -50%)', width: '40px', height: '40px', borderRadius: '50%', background: '#d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'col-resize', boxShadow: '0 4px 16px rgba(212,175,55,0.5)', zIndex: 10 }}
        whileHover={{ scale: 1.1 }}
        onMouseDown={() => { dragging.current = true; }}
        onTouchStart={() => { dragging.current = true; }}>
        <span style={{ color: '#0d1b3e', fontSize: '14px', fontWeight: 900, userSelect: 'none' }}>⟷</span>
      </motion.div>
    </div>
  );
}
