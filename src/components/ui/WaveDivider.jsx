import React from 'react';

export default function WaveDivider({ color = '#071029', flip = false, height = 48 }) {
  return (
    <div className="wave-divider" style={{ background: 'transparent', transform: flip ? 'rotate(180deg)' : 'none' }}>
      <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" style={{ height, display: 'block', width: '100%' }} preserveAspectRatio="none">
        <path d="M0,24 C180,48 360,0 540,24 C720,48 900,0 1080,24 C1260,48 1380,16 1440,24 L1440,48 L0,48 Z" fill={color} />
      </svg>
    </div>
  );
}
