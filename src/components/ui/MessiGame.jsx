import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ZONES = ['Sol Üst','Orta Üst','Sağ Üst','Sol','Orta','Sağ','Sol Alt','Orta Alt','Sağ Alt'];

export default function MessiGame({ onClose }) {
  const [phase, setPhase] = useState('aim'); // aim | shoot | result
  const [selected, setSelected] = useState(null);
  const [crPos, setCrPos] = useState(4);       // Ronaldo pozisyonu 0-8
  const [ballXY, setBallXY] = useState(null);  // {x,y} yüzde
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ goals: 0, saves: 0, shots: 0 });
  const [power, setPower] = useState(50);
  const [kicking, setKicking] = useState(false);
  const [crowd, setCrowd] = useState(false);
  const powerDir = useRef(1);

  // Güç barı
  useEffect(() => {
    if (phase !== 'aim') return;
    const iv = setInterval(() => {
      setPower(p => {
        let n = p + powerDir.current * 2.5;
        if (n >= 100) { powerDir.current = -1; n = 100; }
        if (n <= 0) { powerDir.current = 1; n = 0; }
        return n;
      });
    }, 30);
    return () => clearInterval(iv);
  }, [phase]);

  // Zone'dan (x,y) koordinatı
  const zoneToXY = (idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    return { x: col * 33 + 17, y: row * 33 + 12 };
  };

  const shoot = useCallback((idx) => {
    if (phase !== 'aim') return;
    setSelected(idx);
    setPhase('shoot');
    setKicking(true);
    setBallXY(zoneToXY(idx));

    // Ronaldo akıllıca atlıyor — %60 ihtimalle doğru tarafa
    const col = idx % 3;
    let crIdx;
    if (Math.random() < 0.6) {
      // Doğru tarafa atla
      crIdx = col === 0 ? [0,3,6][Math.floor(Math.random()*3)] :
              col === 2 ? [2,5,8][Math.floor(Math.random()*3)] :
              [1,4,7][Math.floor(Math.random()*3)];
    } else {
      crIdx = Math.floor(Math.random() * 9);
    }
    setCrPos(crIdx);

    setTimeout(() => setKicking(false), 500);

    setTimeout(() => {
      const isGoal = crIdx !== idx;
      setResult(isGoal ? 'goal' : 'save');
      setScore(s => ({ goals: s.goals + (isGoal?1:0), saves: s.saves + (isGoal?0:1), shots: s.shots + 1 }));
      setPhase('result');
      if (isGoal) { setCrowd(true); setTimeout(() => setCrowd(false), 2000); }
    }, 900);
  }, [phase]);

  const reset = useCallback(() => {
    setPhase('aim');
    setSelected(null);
    setCrPos(4);
    setBallXY(null);
    setResult(null);
    setKicking(false);
    setPower(50);
    powerDir.current = 1;
  }, []);

  // Ronaldo x,y pozisyonu kale içinde
  const crXY = zoneToXY(crPos);
  const powerColor = power > 70 ? '#ff4444' : power > 40 ? '#f8d000' : '#75aadb';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9985, fontFamily: 'Montserrat,sans-serif', overflow: 'hidden' }}>

      {/* ===== ARKA PLAN: STAD ===== */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #1a0a2e 0%, #0d1220 30%, #1a3d10 70%, #0f2a08 100%)' }} />

      {/* Seyirciler — üst şerit */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '22%', overflow: 'hidden' }}>
        {/* Tribün arka plan */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#1a0a2e,#2d1040)' }} />
        {/* Seyirci sıraları */}
        {Array.from({ length: 6 }).map((_, row) => (
          <div key={row} style={{ position: 'absolute', left: 0, right: 0, top: `${row * 16}%`, height: '16%', display: 'flex' }}>
            {Array.from({ length: 60 }).map((_, i) => {
              const colors = ['#75aadb','#fff','#f8d000','#75aadb','#c8e6ff','#fff'];
              const c = colors[Math.floor(Math.random() * colors.length)];
              return (
                <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '6px', height: '8px', borderRadius: '50% 50% 0 0', background: c, opacity: 0.5 + Math.random() * 0.4 }} />
                </div>
              );
            })}
          </div>
        ))}
        {/* Kalabalık efekti — GOL! */}
        <AnimatePresence>
          {crowd && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0,1,1,0] }} transition={{ duration: 2 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(248,208,0,0.15)' }} />
          )}
        </AnimatePresence>
        {/* Arjantin bayrakları */}
        {[10, 30, 55, 75, 90].map((l, i) => (
          <motion.div key={i} animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 1.5 + i * 0.3, repeat: Infinity }}
            style={{ position: 'absolute', top: '10%', left: `${l}%`, fontSize: '14px', userSelect: 'none' }}>
            🇦🇷
          </motion.div>
        ))}
        {/* Skor tabelası */}
        <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '4px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '10px', fontWeight: 900, color: '#75aadb' }}>🇦🇷 MESSİ</span>
          <span style={{ fontSize: '16px', fontWeight: 900, color: '#f8d000' }}>{score.goals} - {score.saves}</span>
          <span style={{ fontSize: '10px', fontWeight: 900, color: '#e61e1e' }}>CR7 🇵🇹</span>
        </div>
      </div>

      {/* Yan tribünler */}
      <div style={{ position: 'absolute', left: 0, top: '22%', bottom: '25%', width: '8%', background: 'linear-gradient(90deg,#1a0a2e,transparent)', opacity: 0.8 }} />
      <div style={{ position: 'absolute', right: 0, top: '22%', bottom: '25%', width: '8%', background: 'linear-gradient(270deg,#1a0a2e,transparent)', opacity: 0.8 }} />

      {/* Çim */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '75%', background: 'linear-gradient(180deg,#1e5218 0%,#16400f 60%,#0f2a08 100%)' }}>
        {/* Çim çizgileri */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 10}%`, width: '10%', background: i % 2 === 0 ? 'rgba(0,0,0,0.08)' : 'transparent' }} />
        ))}
        {/* Saha çizgileri */}
        <div style={{ position: 'absolute', top: '40%', left: '10%', right: '10%', height: '1px', background: 'rgba(255,255,255,0.25)' }} />
        {/* Ceza sahası */}
        <div style={{ position: 'absolute', top: '18%', left: '28%', right: '28%', height: '28%', border: '1px solid rgba(255,255,255,0.2)', borderBottom: 'none' }} />
        {/* Penaltı noktası */}
        <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
        {/* Penaltı yayı */}
        <svg style={{ position: 'absolute', top: '12%', left: '22%', width: '56%', height: '30%', overflow: 'visible', opacity: 0.18 }} viewBox="0 0 280 90">
          <path d="M 0 90 Q 140 -20 280 90" fill="none" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      {/* ===== KALE ===== */}
      <div style={{ position: 'absolute', top: '22%', left: '50%', transform: 'translateX(-50%)', width: 'min(420px,75vw)' }}>
        {/* Kale direği yapısı */}
        <div style={{ position: 'relative', border: '4px solid rgba(255,255,255,0.92)', borderBottom: 'none', borderRadius: '2px 2px 0 0', background: 'rgba(0,0,20,0.25)', backdropFilter: 'blur(2px)', aspectRatio: '3/1.7', boxShadow: '0 0 40px rgba(0,0,0,0.6), inset 0 0 30px rgba(0,0,0,0.3)' }}>

          {/* Kale ağı */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }} viewBox="0 0 300 170" preserveAspectRatio="none">
            {Array.from({ length: 8 }).map((_, i) => <line key={`v${i}`} x1={(i+1)*33} y1="0" x2={(i+1)*33} y2="170" stroke="white" strokeWidth="1"/>)}
            {Array.from({ length: 5 }).map((_, i) => <line key={`h${i}`} x1="0" y1={(i+1)*28} x2="300" y2={(i+1)*28} stroke="white" strokeWidth="1"/>)}
            <line x1="0" y1="0" x2="300" y2="170" stroke="white" strokeWidth="0.5" />
            <line x1="300" y1="0" x2="0" y2="170" stroke="white" strokeWidth="0.5" />
          </svg>

          {/* Tıklanabilir 3x3 bölge */}
          <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr' }}>
            {Array.from({ length: 9 }).map((_, idx) => (
              <motion.div key={idx} onClick={() => shoot(idx)}
                whileHover={phase === 'aim' ? { background: 'rgba(248,208,0,0.18)', scale: 1 } : {}}
                style={{
                  cursor: phase === 'aim' ? 'crosshair' : 'default',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.15s',
                  background: result === 'goal' && selected === idx ? 'rgba(0,220,100,0.2)' :
                              result === 'save' && selected === idx ? 'rgba(255,60,60,0.2)' : 'transparent',
                }}>
                {phase === 'aim' && (
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.12)', fontWeight: 900 }}>
                    {['↖','↑','↗','←','·','→','↙','↓','↘'][idx]}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Ronaldo kaleci — CSS karakter */}
          <motion.div
            animate={phase !== 'aim' ? {
              left: `${crXY.x}%`,
              top: `${crXY.y}%`,
            } : { left: '44%', top: '55%' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ position: 'absolute', transform: 'translate(-50%,-50%)', zIndex: 15, pointerEvents: 'none', userSelect: 'none' }}>
            {/* Ronaldo figürü */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              {/* Kafa */}
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#f0c080', border: '2px solid #d4956a', position: 'relative', zIndex: 2 }}>
                {/* Saç — karakteristik CR7 */}
                <div style={{ position: 'absolute', top: '-3px', left: '-1px', right: '-1px', height: '10px', background: '#1a0a00', borderRadius: '50% 50% 0 0' }} />
                <div style={{ position: 'absolute', top: '-1px', left: '7px', width: '6px', height: '4px', background: '#2d1500', borderRadius: '0 0 4px 4px', zIndex: 3 }} />
                {/* Gözler */}
                <div style={{ position: 'absolute', top: '7px', left: '3px', width: '4px', height: '4px', borderRadius: '50%', background: '#222' }} />
                <div style={{ position: 'absolute', top: '7px', right: '3px', width: '4px', height: '4px', borderRadius: '50%', background: '#222' }} />
              </div>
              {/* Gövde — Portekiz forması (kırmızı) */}
              <div style={{ width: '26px', height: '20px', background: '#cc1212', borderRadius: '3px 3px 0 0', border: '1px solid #990000', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-1px', zIndex: 2, position: 'relative' }}>
                <span style={{ fontSize: '7px', fontWeight: 900, color: '#f8d000', textShadow: '0 0 4px rgba(0,0,0,0.5)' }}>CR7</span>
              </div>
              {/* Kollar */}
              <div style={{ position: 'absolute', top: '26px', left: '-9px', width: '11px', height: '13px', background: '#cc1212', borderRadius: '3px', border: '1px solid #990000', transform: 'rotate(-20deg)', zIndex: 1 }} />
              <div style={{ position: 'absolute', top: '26px', right: '-9px', width: '11px', height: '13px', background: '#cc1212', borderRadius: '3px', border: '1px solid #990000', transform: 'rotate(20deg)', zIndex: 1 }} />
              {/* Eldiven */}
              <div style={{ position: 'absolute', top: '36px', left: '-16px', fontSize: '13px', zIndex: 3 }}>🧤</div>
              <div style={{ position: 'absolute', top: '36px', right: '-16px', fontSize: '13px', zIndex: 3 }}>🧤</div>
              {/* Şort */}
              <div style={{ display: 'flex', gap: '2px', marginTop: '-1px', zIndex: 2, position: 'relative' }}>
                <div style={{ width: '11px', height: '10px', background: '#006600', borderRadius: '0 0 2px 2px' }} />
                <div style={{ width: '11px', height: '10px', background: '#006600', borderRadius: '0 0 2px 2px' }} />
              </div>
              {/* Çorap + kramponlar */}
              <div style={{ display: 'flex', gap: '2px', zIndex: 2 }}>
                <div style={{ width: '11px', height: '12px', background: '#cc0000', borderRadius: '0 0 2px 2px', border: '1px solid #990000' }} />
                <div style={{ width: '11px', height: '12px', background: '#cc0000', borderRadius: '0 0 2px 2px', border: '1px solid #990000' }} />
              </div>
              <div style={{ display: 'flex', gap: '2px' }}>
                <div style={{ width: '13px', height: '5px', background: '#111', borderRadius: '0 0 3px 3px' }} />
                <div style={{ width: '13px', height: '5px', background: '#111', borderRadius: '0 0 3px 3px' }} />
              </div>
              {/* CR7 isim etiketi */}
              <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.75)', color: '#f8d000', fontSize: '7px', fontWeight: 900, padding: '1px 5px', borderRadius: '3px', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
                CR7 🇵🇹
              </div>
            </div>
          </motion.div>

          {/* Top — uçuş animasyonu */}
          <AnimatePresence>
            {ballXY && (
              <motion.div
                key={`ball-${selected}`}
                initial={{ left: '48%', top: '110%', fontSize: '10px', scale: 0.3 }}
                animate={{ left: `${ballXY.x}%`, top: `${ballXY.y}%`, fontSize: '24px', scale: 1 }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ position: 'absolute', zIndex: 20, pointerEvents: 'none', transform: 'translate(-50%,-50%)' }}>
                ⚽
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sonuç overlay */}
          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: result === 'goal' ? 'rgba(0,200,80,0.18)' : 'rgba(220,30,30,0.18)', backdropFilter: 'blur(3px)', zIndex: 25, pointerEvents: 'none' }}>
                <div style={{ fontSize: 'clamp(22px,5vw,40px)', fontWeight: 900, color: result === 'goal' ? '#00e87a' : '#ff4444', textShadow: `0 0 30px ${result === 'goal' ? '#00e87a' : '#ff4444'}`, letterSpacing: '-0.02em' }}>
                  {result === 'goal' ? '⚽ GOLAZO!' : '🧤 CR7 KURTARDI!'}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '5px' }}>
                  {result === 'goal' ? `${ZONES[selected]} — NET FIRLADI!` : `Ronaldo ${ZONES[crPos]} tarafını kesti!`}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Kale alt direği */}
        <div style={{ height: '7px', background: 'rgba(255,255,255,0.88)', borderRadius: '0 0 4px 4px', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }} />
      </div>

      {/* ===== MESSI + TOP (yakın plan) ===== */}
      <div style={{ position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        {/* Messi figürü */}
        <motion.div animate={kicking ? { x: [0, 12, -4, 0], rotate: [0, -12, 4, 0] } : {}} transition={{ duration: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', position: 'relative' }}>
          {/* Kafa */}
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#f0c080', border: '2px solid #d4956a', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-4px', left: 0, right: 0, height: '14px', background: '#2d1500', borderRadius: '50% 50% 0 0' }} />
            <div style={{ position: 'absolute', top: '9px', left: '5px', width: '5px', height: '5px', borderRadius: '50%', background: '#222' }} />
            <div style={{ position: 'absolute', top: '9px', right: '5px', width: '5px', height: '5px', borderRadius: '50%', background: '#222' }} />
            <div style={{ position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '3px', borderRadius: '0 0 4px 4px', borderBottom: '2px solid #a0522d' }} />
          </div>
          {/* Gövde — Arjantin forması */}
          <div style={{ width: '32px', height: '24px', background: 'linear-gradient(90deg,#75aadb 33%,#fff 33%,#fff 66%,#75aadb 66%)', borderRadius: '3px 3px 0 0', border: '1px solid #5590c0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-1px', position: 'relative', zIndex: 2 }}>
            <span style={{ fontSize: '8px', fontWeight: 900, color: '#0a1628' }}>10</span>
          </div>
          {/* Kollar */}
          <div style={{ position: 'absolute', top: '32px', left: '-10px', width: '13px', height: '15px', background: '#75aadb', borderRadius: '3px', border: '1px solid #5590c0', transform: 'rotate(-10deg)' }} />
          <div style={{ position: 'absolute', top: '32px', right: '-10px', width: '13px', height: '15px', background: '#75aadb', borderRadius: '3px', border: '1px solid #5590c0', transform: 'rotate(10deg)' }} />
          {/* Şort */}
          <div style={{ display: 'flex', gap: '3px', marginTop: '-1px', zIndex: 2 }}>
            <div style={{ width: '13px', height: '12px', background: '#111', borderRadius: '0 0 2px 2px' }} />
            <motion.div animate={kicking ? { rotate: -50, y: -5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }}
              style={{ width: '13px', height: '12px', background: '#111', borderRadius: '0 0 2px 2px', transformOrigin: 'top center', zIndex: 2 }} />
          </div>
          {/* Çorap + krampon */}
          <div style={{ display: 'flex', gap: '3px', zIndex: 2 }}>
            <div style={{ width: '13px', height: '14px', background: '#75aadb', borderRadius: '0 0 2px 2px' }} />
            <div style={{ width: '13px', height: '14px', background: '#75aadb', borderRadius: '0 0 2px 2px' }} />
          </div>
          <div style={{ display: 'flex', gap: '3px' }}>
            <div style={{ width: '15px', height: '6px', background: '#222', borderRadius: '0 0 3px 3px' }} />
            <div style={{ width: '15px', height: '6px', background: '#f8d000', borderRadius: '0 0 3px 3px' }} />
          </div>
          {/* İsim */}
          <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.75)', color: '#75aadb', fontSize: '8px', fontWeight: 900, padding: '2px 7px', borderRadius: '4px', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
            🇦🇷 MESSİ #10
          </div>
        </motion.div>

        {/* Top penaltı noktasında */}
        {!ballXY && (
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ fontSize: '22px', marginTop: '8px' }}>⚽</motion.div>
        )}
      </div>

      {/* ===== ALT KONTROL PANELİ ===== */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px' }}>
        {phase === 'aim' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
              KALEYE TIKLA ⚽
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', width: `${power}%`, background: powerColor, borderRadius: '999px', transition: 'background 0.1s' }} />
            </div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: powerColor, minWidth: '45px', textAlign: 'right' }}>
              {Math.round(power)}%
            </div>
          </div>
        )}

        {phase === 'shoot' && (
          <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 900, color: '#f8d000', letterSpacing: '0.1em' }}>
            ⚡ TOP FIRLADI!
          </div>
        )}

        {phase === 'result' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <motion.button onClick={reset}
              whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(248,208,0,0.5)' }} whileTap={{ scale: 0.97 }}
              style={{ background: '#f8d000', color: '#0a1628', fontSize: '13px', fontWeight: 900, padding: '10px 28px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', letterSpacing: '0.06em' }}>
              TEKRAR ⚽
            </motion.button>
            <motion.button onClick={onClose}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 700, padding: '10px 20px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', fontFamily: 'Montserrat' }}>
              ÇIKIŞ
            </motion.button>
          </div>
        )}
      </div>

      {/* Üst skor barı */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', padding: '8px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          {[{ n: score.goals, l: '⚽ GOL', c: '#00e87a' }, { n: score.saves, l: '🧤 KURTARMA', c: '#ff4444' }, { n: score.shots, l: '🎯 ŞUT', c: '#75aadb' }].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#f8d000', letterSpacing: '0.05em' }}>
          🇦🇷 MESSİ vs CR7 🇵🇹
        </div>
        <button onClick={onClose}
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '5px 12px', color: 'rgba(255,255,255,0.55)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat' }}>
          ÇIKIŞ ✕
        </button>
      </div>

      {/* Alt isabetlilik */}
      {score.shots > 0 && (
        <div style={{ position: 'absolute', bottom: '58px', right: '16px', fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontWeight: 900 }}>
          İSABET: {Math.round((score.goals / score.shots) * 100)}%
        </div>
      )}
    </motion.div>
  );
}
