import React, { useEffect, useRef } from 'react';

export default function Confetti({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const container = containerRef.current;
    const colors = ['#75aadb', '#f8d000', '#ffffff', '#0a1628', '#c8e6ff'];

    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        const size = Math.random() * 12 + 6;
        const isCircle = Math.random() > 0.5;
        el.style.cssText = `
          position:absolute;
          width:${size}px; height:${size}px;
          background:${colors[Math.floor(Math.random() * colors.length)]};
          left:${Math.random() * 100}%;
          top:-20px;
          border-radius:${isCircle ? '50%' : '2px'};
          transform:rotate(${Math.random() * 360}deg);
          animation: fall ${Math.random() * 2 + 1.5}s ease-in forwards;
          opacity:1;
        `;
        container.appendChild(el);
        setTimeout(() => el.remove(), 4000);
      }, i * 30);
    }
  }, [active]);

  if (!active) return null;
  return (
    <>
      <style>{`@keyframes fall { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }`}</style>
      <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998, overflow: 'hidden' }} />
    </>
  );
}
