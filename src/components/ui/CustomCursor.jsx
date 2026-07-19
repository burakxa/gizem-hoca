import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Sadece desktop'ta göster
    if (window.matchMedia('(hover: none)').matches) return;

    document.body.style.cursor = 'none';

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    let raf;
    const animRing = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animRing);
    };
    raf = requestAnimationFrame(animRing);

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const enterLink = (e) => {
      if (e.target.closest('a, button, [role="button"]')) setHovering(true);
    };
    const leaveLink = (e) => {
      if (!e.target.closest('a, button, [role="button"]')) setHovering(false);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);
    document.addEventListener('mouseover', enterLink);
    document.addEventListener('mouseout', leaveLink);

    return () => {
      document.body.style.cursor = '';
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('mouseover', enterLink);
      document.removeEventListener('mouseout', leaveLink);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99999, pointerEvents: 'none',
        width: clicking ? '6px' : '8px',
        height: clicking ? '6px' : '8px',
        background: '#d4af37',
        borderRadius: '50%',
        transition: 'width 0.1s, height 0.1s',
      }} />
      {/* Ring */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99998, pointerEvents: 'none',
        width: hovering ? '48px' : clicking ? '28px' : '36px',
        height: hovering ? '48px' : clicking ? '28px' : '36px',
        border: `1.5px solid ${hovering ? '#d4af37' : 'rgba(212,175,55,0.5)'}`,
        borderRadius: '50%',
        background: hovering ? 'rgba(212,175,55,0.08)' : 'transparent',
        transition: 'width 0.25s ease, height 0.25s ease, border-color 0.2s, background 0.2s',
      }} />
    </>
  );
}
