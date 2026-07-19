import React, { useEffect, useRef, useState } from 'react';

function CustomCursorInner() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    // Touch / mobil kontrolü
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    document.body.style.cursor = 'none';

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
      }
    };

    const animRing = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px) translate(-50%,-50%)`;
      }
      rafRef.current = requestAnimationFrame(animRing);
    };
    rafRef.current = requestAnimationFrame(animRing);

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const over = (e) => { if (e.target.closest('a,button,[role="button"]')) setHovering(true); };
    const out = (e) => { if (!e.target.closest('a,button,[role="button"]')) setHovering(false); };

    document.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      document.body.style.cursor = '';
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  // Touch cihazlarda render etme
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) return null;

  return (
    <>
      <div ref={dotRef} style={{ position:'fixed', top:0, left:0, zIndex:99999, pointerEvents:'none', width: clicking?'6px':'8px', height: clicking?'6px':'8px', background:'#d4af37', borderRadius:'50%', transition:'width 0.1s, height 0.1s', willChange:'transform' }} />
      <div ref={ringRef} style={{ position:'fixed', top:0, left:0, zIndex:99998, pointerEvents:'none', width: hovering?'48px':clicking?'28px':'36px', height: hovering?'48px':clicking?'28px':'36px', border:`1.5px solid ${hovering?'#d4af37':'rgba(212,175,55,0.5)'}`, borderRadius:'50%', background: hovering?'rgba(212,175,55,0.08)':'transparent', transition:'width 0.25s, height 0.25s, border-color 0.2s', willChange:'transform' }} />
    </>
  );
}

export default React.memo(CustomCursorInner);
