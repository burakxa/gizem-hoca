import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ZONES = ['Sol Üst', 'Orta Üst', 'Sağ Üst', 'Sol Orta', 'Orta', 'Sağ Orta', 'Sol Alt', 'Orta Alt', 'Sağ Alt'];

// Kaleci SVG
const Keeper = ({ jumping, targetIdx }) => {
  const col = targetIdx % 3;
  const row = Math.floor(targetIdx / 3);
  const lean = col === 0 ? -30 : col === 2 ? 30 : 0;
  const jumpY = row === 0 ? -18 : row === 1 ? -6 : 4;

  return (
    <motion.div
      animate={jumping ? { x: lean, y: jumpY, rotate: lean * 0.4 } : { x: 0, y: 0, rotate: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, userSelect: 'none' }}>
      {/* Kafa */}
      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#f5d0a9', border: '2px solid #d4a574', position: 'relative' }}>
        {/* Gözler */}
        <div style={{ position: 'absolute', top: '7px', left: '4px', width: '4px', height: '4px', borderRadius: '50%', background: '#333' }} />
        <div style={{ position: 'absolute', top: '7px', right: '4px', width: '4px', height: '4px', borderRadius: '50%', background: '#333' }} />
        {/* Ağız */}
        <div style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '3px', borderRadius: '0 0 4px 4px', borderBottom: '2px solid #a0522d' }} />
      </div>
      {/* Gövde — kaleci forması sarı */}
      <div style={{ width: '28px', height: '22px', background: '#f8d000', borderRadius: '4px 4px 0 0', border: '1.5px solid #d4a000', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-1px' }}>
        <span style={{ fontSize: '8px', fontWeight: 900, color: '#0a1628' }}>1</span>
      </div>
      {/* Kollar */}
      <div style={{ position: 'absolute', top: '28px', left: '-10px', width: '12px', height: '14px', background: '#f8d000', borderRadius: '4px', border: '1px solid #d4a000', transform: 'rotate(-15deg)' }} />
      <div style={{ position: 'absolute', top: '28px', right: '-10px', width: '12px', height: '14px', background: '#f8d000', borderRadius: '4px', border: '1px solid #d4a000', transform: 'rotate(15deg)' }} />
      {/* Bacaklar */}
      <div style={{ display: 'flex', gap: '3px', marginTop: '-1px' }}>
        <div style={{ width: '11px', height: '14px', background: '#1a1a6e', borderRadius: '0 0 3px 3px', border: '1px solid #111' }} />
        <div style={{ width: '11px', height: '14px', background: '#1a1a6e', borderRadius: '0 0 3px 3px', border: '1px solid #111' }} />
      </div>
      {/* Ayaklar */}
      <div style={{ display: 'flex', gap: '3px' }}>
        <div style={{ width: '13px', height: '5px', background: '#222', borderRadius: '0 0 3px 3px' }} />
        <div style={{ width: '13px', height: '5px', background: '#222', borderRadius: '0 0 3px 3px' }} />
      </div>
      {/* Eldivenler */}
      <div style={{ position: 'absolute', top: '38px', left: '-16px', fontSize: '12px' }}>🧤</div>
      <div style={{ position: 'absolute', top: '38px', right: '-16px', fontSize: '12px' }}>🧤</div>
    </motion.div>
  );
};

// Messi SVG
const Messi = ({ kicking }) => (
  <motion.div
    animate={kicking ? { x: [0, 8, -4, 0], rotate: [0, -10, 5, 0] } : {}}
    transition={{ duration: 0.5 }}
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
    {/* Kafa */}
    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#f5d0a9', border: '2px solid #d4a574', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '6px', left: '4px', width: '3px', height: '3px', borderRadius: '50%', background: '#333' }} />
      <div style={{ position: 'absolute', top: '6px', right: '4px', width: '3px', height: '3px', borderRadius: '50%', background: '#333' }} />
      {/* Saç */}
      <div style={{ position: 'absolute', top: '-4px', left: 0, right: 0, height: '8px', background: '#3d2b1f', borderRadius: '50% 50% 0 0' }} />
    </div>
    {/* Gövde — Arjantin forması */}
    <div style={{ width: '26px', height: '20px', background: 'linear-gradient(90deg,#75aadb 33%,#fff 33%,#fff 66%,#75aadb 66%)', borderRadius: '3px 3px 0 0', border: '1px solid #5590c0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-1px' }}>
      <span style={{ fontSize: '7px', fontWeight: 900, color: '#0a1628' }}>10</span>
    </div>
    {/* Bacaklar */}
    <div style={{ display: 'flex', gap: '2px', marginTop: '-1px' }}>
      <div style={{ width: '10px', height: '12px', background: '#111', borderRadius: '0 0 2px 2px' }} />
      <motion.div animate={kicking ? { rotate: -40, y: -4 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }}
        style={{ width: '10px', height: '12px', background: '#111', borderRadius: '0 0 2px 2px', transformOrigin: 'top center' }} />
    </div>
    {/* Ayaklar */}
    <div style={{ display: 'flex', gap: '2px' }}>
      <div style={{ width: '12px', height: '5px', background: '#222', borderRadius: '0 0 3px 3px' }} />
      <div style={{ width: '12px', height: '5px', background: '#ffd700', borderRadius: '0 0 3px 3px' }} />
    </div>
  </motion.div>
);

export default function MessiGame({ onClose }) {
  const initScore = { goals: 0, saves: 0, shots: 0 };
  const [phase, setPhase] = useState('aim');
  const [selected, setSelected] = useState(null);
  const [keeperTarget, setKeeperTarget] = useState(null);
  const [ballAnim, setBallAnim] = useState(false);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(initScore);
  const [power, setPower] = useState(50);
  const [kicking, setKicking] = useState(false);

  // Güç barı
  useEffect(() => {
    if (phase !== 'aim') return;
    let dir = 1;
    const iv = setInterval(() => {
      setPower(p => {
        const n = p + dir * 2.5;
        if (n >= 100) { dir = -1; return 100; }
        if (n <= 0) { dir = 1; return 0; }
        return n;
      });
    }, 30);
    return () => clearInterval(iv);
  }, [phase]);

  const shoot = useCallback((idx) => {
    if (phase !== 'aim') return;
    setSelected(idx);
    setPhase('shoot');
    setKicking(true);

    const keeper = Math.floor(Math.random() * 9);
    setKeeperTarget(keeper);
    setBallAnim(true);

    setTimeout(() => setKicking(false), 500);

    setTimeout(() => {
      const isGoal = keeper !== idx;
      setResult(isGoal ? 'goal' : 'save');
      setScore(s => ({ goals: s.goals + (isGoal ? 1 : 0), saves: s.saves + (isGoal ? 0 : 1), shots: s.shots + 1 }));
      setPhase('result');
    }, 900);
  }, [phase]);

  const reset = useCallback(() => {
    setPhase('aim');
    setSelected(null);
    setKeeperTarget(null);
    setBallAnim(false);
    setResult(null);
    setKicking(false);
    setPower(50);
  }, []);

  // Top pozisyonu hesapla
  const getBallStyle = (idx) => {
    if (idx === null) return {};
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    return {
      left: `${col * 33.3 + 12}%`,
      top: `${row * 33.3 + 10}%`,
    };
  };

  const powerColor = power > 70 ? '#ff4444' : power > 40 ? '#f8d000' : '#75aadb';

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9985, background: 'radial-gradient(ellipse at 50% 80%, #1e4d1a 0%, #0a1f08 40%, #071220 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat,sans-serif', overflow: 'hidden' }}>

      {/* Çim çizgileri */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 10}%`, width: '10%', background: i % 2 === 0 ? 'rgba(0,80,0,0.3)' : 'transparent' }} />
        ))}
        {/* Penaltı noktası çizgisi */}
        <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ position: 'absolute', bottom: '19%', left: '50%', transform: 'translateX(-50%)', width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
      </div>

      {/* Üst skor barı */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(117,170,219,0.2)' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[{ n: score.goals, l: '⚽ GOL', c: '#00e87a' }, { n: score.saves, l: '🧤 KURTARMA', c: '#ff4444' }, { n: score.shots, l: '🎯 ŞUT', c: '#75aadb' }].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', marginTop: '2px' }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#f8d000', letterSpacing: '0.06em' }}>🇦🇷 MESSİ PENALTİ</div>
        <button onClick={onClose}
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '6px 14px', color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat' }}>
          ÇIKIŞ ✕
        </button>
      </div>

      {/* ANA OYUN ALANI */}
      <div style={{ width: 'min(480px,92vw)', position: 'relative' }}>

        {/* KALE */}
        <div style={{ position: 'relative', border: '4px solid rgba(255,255,255,0.9)', borderBottom: 'none', borderRadius: '3px 3px 0 0', background: 'rgba(0,0,30,0.3)', aspectRatio: '3/2', boxShadow: '0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)' }}>

          {/* Kale ağı çizgileri */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} viewBox="0 0 300 200" preserveAspectRatio="none">
            {[1,2].map(i => <line key={`v${i}`} x1={i*100} y1="0" x2={i*100} y2="200" stroke="white" strokeWidth="1"/>)}
            {[1,2].map(i => <line key={`h${i}`} x1="0" y1={i*66.7} x2="300" y2={i*66.7} stroke="white" strokeWidth="1"/>)}
            {/* Diyagonaller */}
            {Array.from({length:4}).map((_,i) => <line key={`d${i}`} x1={i*80} y1="0" x2={(i+1)*80} y2="200" stroke="white" strokeWidth="0.5"/>)}
          </svg>

          {/* Tıklanabilir bölgeler */}
          <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr' }}>
            {Array.from({ length: 9 }).map((_, idx) => (
              <motion.div key={idx} onClick={() => shoot(idx)}
                whileHover={phase === 'aim' ? { background: 'rgba(248,208,0,0.2)' } : {}}
                style={{ cursor: phase === 'aim' ? 'crosshair' : 'default', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'background 0.15s',
                  background: result === 'goal' && selected === idx ? 'rgba(0,232,122,0.2)' : result === 'save' && selected === idx ? 'rgba(255,68,68,0.2)' : 'transparent' }}>
                {phase === 'aim' && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.15)', fontWeight: 900 }}>{['↖','↑','↗','←','·','→','↙','↓','↘'][idx]}</span>}
              </motion.div>
            ))}
          </div>

          {/* Kaleci */}
          <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            <Keeper jumping={phase === 'shoot' || phase === 'result'} targetIdx={keeperTarget ?? 4} />
          </div>

          {/* Top */}
          <AnimatePresence>
            {ballAnim && selected !== null && (
              <motion.div key={`ball-${selected}`}
                initial={{ bottom: '-20px', left: '46%', fontSize: '14px', opacity: 1, scale: 0.5 }}
                animate={{ ...getBallStyle(selected), fontSize: '22px', opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ position: 'absolute', zIndex: 12, pointerEvents: 'none' }}>
                ⚽
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sonuç overlay */}
          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: result === 'goal' ? 'rgba(0,200,80,0.15)' : 'rgba(255,50,50,0.15)', zIndex: 20, pointerEvents: 'none', backdropFilter: 'blur(2px)' }}>
                <div style={{ fontSize: 'clamp(24px,6vw,44px)', fontWeight: 900, color: result === 'goal' ? '#00e87a' : '#ff4444', textShadow: `0 0 30px ${result === 'goal' ? '#00e87a' : '#ff4444'}`, letterSpacing: '-0.02em' }}>
                  {result === 'goal' ? '⚽ GOLAZO!' : '🧤 KURTARDI!'}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
                  {result === 'goal' ? `${ZONES[selected]} — NET!` : `Kaleci ${ZONES[keeperTarget]} tarafını kesti!`}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Kale direği altı */}
        <div style={{ height: '8px', background: 'rgba(255,255,255,0.85)', borderRadius: '0 0 4px 4px', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }} />

        {/* Çim + Messi + Top */}
        <div style={{ background: 'linear-gradient(180deg,#1a4016,#0d2a0a)', borderRadius: '0 0 12px 12px', padding: '16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '20px', minHeight: '80px' }}>
          {/* Penaltı noktası */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <Messi kicking={kicking} />
              {/* Top penaltı noktasında */}
              {!ballAnim && (
                <div style={{ fontSize: '18px', marginBottom: '4px' }}>⚽</div>
              )}
            </div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>L. MESSİ #10</div>
          </div>
        </div>

        {/* Güç barı + kontrol */}
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          {phase === 'aim' && (
            <>
              <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>
                ↑ KALEYE TIKLA — KÖŞE SEÇ ↑
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '999px', height: '8px', overflow: 'hidden', marginBottom: '4px' }}>
                <motion.div style={{ height: '100%', width: `${power}%`, background: powerColor, borderRadius: '999px', transition: 'background 0.1s' }} />
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>GÜÇ: {Math.round(power)}%</div>
            </>
          )}

          {phase === 'shoot' && (
            <div style={{ fontSize: '13px', fontWeight: 900, color: '#f8d000', letterSpacing: '0.1em' }}>
              ⚡ TOP YOLCULUKta...
            </div>
          )}

          {phase === 'result' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '4px' }}>
              <motion.button
                onClick={reset}
                whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(248,208,0,0.4)' }}
                whileTap={{ scale: 0.97 }}
                style={{ background: '#f8d000', color: '#0a1628', fontSize: '12px', fontWeight: 900, padding: '12px 28px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', letterSpacing: '0.06em' }}>
                TEKRAR ⚽
              </motion.button>
              <motion.button onClick={onClose}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 700, padding: '12px 20px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', fontFamily: 'Montserrat' }}>
                ÇIKIŞ
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Alt */}
      <div style={{ position: 'absolute', bottom: '12px', fontSize: '10px', color: 'rgba(255,255,255,0.15)', fontWeight: 900, letterSpacing: '0.1em' }}>
        🇦🇷 LA PULGA · {score.shots > 0 ? `${Math.round((score.goals / score.shots) * 100)}% İSABET` : 'İLK ŞUTUNU AT!'}
      </div>
    </motion.div>
  );
}
