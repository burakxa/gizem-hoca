import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const COLS = 3;
const ROWS = 3;
const ZONES = ['sol üst','orta üst','sağ üst','sol orta','orta','sağ orta','sol alt','orta alt','sağ alt'];

function MessiGame({ onClose }) {
  const [phase, setPhase] = useState('aim'); // aim | shoot | result
  const [selected, setSelected] = useState(null);
  const [keeperPos, setKeeperPos] = useState(4); // 0-8
  const [ballPos, setBallPos] = useState(null);
  const [score, setScore] = useState({ goals: 0, saves: 0, shots: 0 });
  const [result, setResult] = useState(null); // 'goal' | 'save'
  const [power, setPower] = useState(0);
  const powerRef = useRef(null);

  // Güç barı animasyonu
  useEffect(() => {
    if (phase !== 'aim') return;
    let dir = 1;
    const interval = setInterval(() => {
      setPower(p => {
        const next = p + dir * 3;
        if (next >= 100) dir = -1;
        if (next <= 0) dir = 1;
        return Math.min(100, Math.max(0, next));
      });
    }, 30);
    return () => clearInterval(interval);
  }, [phase]);

  const shoot = (zoneIdx) => {
    if (phase !== 'aim') return;
    setSelected(zoneIdx);
    setBallPos(zoneIdx);
    setPhase('shoot');

    // Kaleci rastgele yön seçiyor (biraz akıllı)
    const keeperZone = Math.floor(Math.random() * 9);
    setKeeperPos(keeperZone);

    setTimeout(() => {
      const isGoal = keeperZone !== zoneIdx;
      setResult(isGoal ? 'goal' : 'save');
      setScore(s => ({
        goals: s.goals + (isGoal ? 1 : 0),
        saves: s.saves + (isGoal ? 0 : 1),
        shots: s.shots + 1,
      }));
      setPhase('result');
    }, 900);
  };

  const next = () => {
    setPhase('aim');
    setSelected(null);
    setBallPos(null);
    setResult(null);
    setPower(0);
  };

  const goalCol = (idx) => Math.floor(idx / ROWS);
  const goalRow = (idx) => idx % COLS;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9985,
        background: 'rgba(7,18,32,0.97)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Montserrat, sans-serif',
        overflow: 'hidden',
      }}>

      {/* Arka plan çim */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${(i / 12) * 100}%`, width: `${100/12}%`, background: i % 2 === 0 ? '#2d5a27' : '#236b1e' }} />
        ))}
      </div>

      {/* Üst bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: 'rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#f8d000' }}>{score.goals}</div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>GOL</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#ff4444' }}>{score.saves}</div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>KURTARMA</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#75aadb' }}>{score.shots}</div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>ŞUT</div>
          </div>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#75aadb', letterSpacing: '0.08em' }}>🇦🇷 MESSİ PENALTI</div>
        <button onClick={onClose}
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '6px 14px', color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat' }}>
          ÇIKIŞ ✕
        </button>
      </div>

      {/* Kale + oyun alanı */}
      <div style={{ position: 'relative', width: 'min(420px, 90vw)', userSelect: 'none' }}>

        {/* Kale direği */}
        <div style={{ position: 'relative', background: 'rgba(255,255,255,0.04)', border: '3px solid rgba(255,255,255,0.85)', borderBottom: 'none', borderRadius: '4px 4px 0 0', aspectRatio: '3/2', marginBottom: 0 }}>

          {/* Kale içi ızgara — tıklanabilir bölgeler */}
          <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', gap: '0' }}>
            {Array.from({ length: 9 }).map((_, idx) => (
              <motion.div key={idx}
                onClick={() => shoot(idx)}
                whileHover={phase === 'aim' ? { background: 'rgba(248,208,0,0.15)', scale: 1.02 } : {}}
                style={{
                  border: '1px dashed rgba(255,255,255,0.12)',
                  cursor: phase === 'aim' ? 'crosshair' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', transition: 'background 0.15s',
                  background: selected === idx && result === 'goal' ? 'rgba(0,255,100,0.15)' :
                              selected === idx && result === 'save' ? 'rgba(255,50,50,0.15)' : 'transparent',
                }}>
                {/* Hedef göstergesi — aim modda hover */}
                {phase === 'aim' && (
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.1)', fontWeight: 900, letterSpacing: '0.06em' }}>
                    {['↖','↑','↗','←','·','→','↙','↓','↘'][idx]}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Top */}
          <AnimatePresence>
            {ballPos !== null && (
              <motion.div
                key="ball"
                initial={{ bottom: '-40px', left: '50%', x: '-50%', scale: 0.4 }}
                animate={{
                  bottom: `${(2 - Math.floor(ballPos / 3)) * 33 + 8}%`,
                  left: `${(ballPos % 3) * 33 + 12}%`,
                  x: '0%',
                  scale: 0.8,
                }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ position: 'absolute', fontSize: '28px', zIndex: 10, pointerEvents: 'none' }}>
                ⚽
              </motion.div>
            )}
          </AnimatePresence>

          {/* Kaleci */}
          <AnimatePresence>
            {phase !== 'aim' && (
              <motion.div
                key="keeper"
                initial={{ bottom: '5%', left: '50%', x: '-50%' }}
                animate={{
                  bottom: `${(2 - Math.floor(keeperPos / 3)) * 33 + 5}%`,
                  left: `${(keeperPos % 3) * 33 + 8}%`,
                  x: '0%',
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ position: 'absolute', fontSize: '32px', zIndex: 9, pointerEvents: 'none' }}>
                🧤
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sonuç etiketi */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: result === 'goal' ? 'rgba(0,200,80,0.12)' : 'rgba(255,50,50,0.12)',
                  zIndex: 20, pointerEvents: 'none',
                }}>
                <div style={{ fontSize: 'clamp(32px,8vw,56px)', fontWeight: 900, color: result === 'goal' ? '#00e87a' : '#ff4444', textShadow: '0 0 30px currentColor', letterSpacing: '-0.02em' }}>
                  {result === 'goal' ? 'GOLAZO! 🎉' : 'KURTARDI! 🧤'}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
                  {result === 'goal' ? `${ZONES[selected]} — perfect!` : `${ZONES[keeperPos]} tarafını kesti!`}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Kale altı çizgisi */}
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.7)', borderRadius: '0 0 4px 4px' }} />

        {/* Çim */}
        <div style={{ height: '60px', background: 'linear-gradient(180deg,#1e4d1a,#0f2d0c)', borderRadius: '0 0 8px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} />
        </div>
      </div>

      {/* Güç barı + talimat */}
      <div style={{ marginTop: '20px', textAlign: 'center', width: 'min(420px,90vw)' }}>
        {phase === 'aim' ? (
          <>
            <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>
              KALEYE TIKLAYABİLİRSİN ⚽
            </div>
            {/* Güç barı */}
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${power}%`, background: power > 70 ? '#ff4444' : power > 40 ? '#f8d000' : '#75aadb', borderRadius: '999px', transition: 'width 0.03s linear' }} />
            </div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '6px' }}>GÜÇ: {Math.round(power)}%</div>
          </>
        ) : result ? (
          <motion.button onClick={next}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{ background: '#f8d000', color: '#0a1628', fontSize: '12px', fontWeight: 900, padding: '12px 32px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', letterSpacing: '0.06em', boxShadow: '0 4px 20px rgba(248,208,0,0.4)' }}>
            TEKRAR ⚽
          </motion.button>
        ) : (
          <div style={{ fontSize: '11px', color: '#f8d000', fontWeight: 900, letterSpacing: '0.1em' }}>
            TOP YOLCULUKta... ⚡
          </div>
        )}
      </div>

      {/* Messi emoji sağ alt köşe */}
      <div style={{ position: 'absolute', bottom: '20px', right: '24px', fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontWeight: 900, letterSpacing: '0.06em' }}>
        🇦🇷 LA PULGA
      </div>
    </motion.div>
  );
}

export default MessiGame;
