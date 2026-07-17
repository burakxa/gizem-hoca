import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── SABITLER ─── */
const W = 600, H = 340; // kale canvas boyutu (oransal)
const ZONES = [
  {x:12,y:12,label:'Sol Üst'},{x:50,y:10,label:'Orta Üst'},{x:88,y:12,label:'Sağ Üst'},
  {x:10,y:50,label:'Sol Orta'},{x:50,y:50,label:'Orta'},{x:90,y:50,label:'Sağ Orta'},
  {x:14,y:82,label:'Sol Alt'},{x:50,y:85,label:'Orta Alt'},{x:86,y:82,label:'Sağ Alt'},
];
const DIFF = { easy:{speed:0.55,accuracy:0.45,react:320}, medium:{speed:0.72,accuracy:0.62,react:220}, hard:{speed:0.88,accuracy:0.80,react:140} };

/* ─── RONALDO KALECİ SVG ─── */
const CR7 = ({ diving, diveDir }) => (
  <motion.div
    animate={diving ? { x: diveDir * 48, y: diveDir !== 0 ? -18 : -10, rotate: diveDir * 35 } : { x:0,y:0,rotate:0 }}
    transition={{ duration: 0.38, ease:'easeOut' }}
    style={{ display:'flex',flexDirection:'column',alignItems:'center',userSelect:'none',position:'relative' }}>
    {/* Kafa */}
    <div style={{ width:24,height:24,borderRadius:'50%',background:'#f0c080',border:'2px solid #c8853a',position:'relative' }}>
      <div style={{ position:'absolute',top:'-4px',left:0,right:0,height:12,background:'#1a0800',borderRadius:'50% 50% 0 0' }} />
      <div style={{ position:'absolute',top:8,left:4,width:4,height:4,borderRadius:'50%',background:'#111' }} />
      <div style={{ position:'absolute',top:8,right:4,width:4,height:4,borderRadius:'50%',background:'#111' }} />
    </div>
    {/* Gövde */}
    <div style={{ width:28,height:22,background:'linear-gradient(180deg,#cc1212,#aa0000)',border:'1px solid #880000',borderRadius:'3px 3px 0 0',display:'flex',alignItems:'center',justifyContent:'center',marginTop:-1,position:'relative' }}>
      <span style={{ fontSize:7,fontWeight:900,color:'#f8d000',letterSpacing:'0.02em' }}>CR7</span>
    </div>
    {/* Kollar */}
    <div style={{ position:'absolute',top:28,left:-11,width:12,height:14,background:'#cc1212',borderRadius:3,border:'1px solid #880000',transform:'rotate(-20deg)' }} />
    <div style={{ position:'absolute',top:28,right:-11,width:12,height:14,background:'#cc1212',borderRadius:3,border:'1px solid #880000',transform:'rotate(20deg)' }} />
    <div style={{ position:'absolute',top:38,left:-18,fontSize:14 }}>🧤</div>
    <div style={{ position:'absolute',top:38,right:-18,fontSize:14 }}>🧤</div>
    {/* Bacaklar */}
    <div style={{ display:'flex',gap:2 }}>
      <div style={{ width:12,height:10,background:'#006600',borderRadius:'0 0 2px 2px' }} />
      <div style={{ width:12,height:10,background:'#006600',borderRadius:'0 0 2px 2px' }} />
    </div>
    <div style={{ display:'flex',gap:2 }}>
      <div style={{ width:12,height:13,background:'#cc0000',borderRadius:'0 0 2px 2px' }} />
      <div style={{ width:12,height:13,background:'#cc0000',borderRadius:'0 0 2px 2px' }} />
    </div>
    <div style={{ display:'flex',gap:2 }}>
      <div style={{ width:14,height:5,background:'#111',borderRadius:'0 0 3px 3px' }} />
      <div style={{ width:14,height:5,background:'#111',borderRadius:'0 0 3px 3px' }} />
    </div>
    <div style={{ position:'absolute',bottom:-14,left:'50%',transform:'translateX(-50%)',background:'rgba(0,0,0,0.8)',color:'#f8d000',fontSize:7,fontWeight:900,padding:'1px 5px',borderRadius:3,whiteSpace:'nowrap' }}>CR7 🇵🇹</div>
  </motion.div>
);

/* ─── MESSİ ─── */
const Messi = ({ kicking }) => (
  <motion.div animate={kicking?{x:[0,14,-5,0],rotate:[0,-14,5,0]}:{}} transition={{duration:0.5}}
    style={{ display:'flex',flexDirection:'column',alignItems:'center',userSelect:'none',position:'relative' }}>
    <div style={{ width:28,height:28,borderRadius:'50%',background:'#f0c080',border:'2px solid #c8853a',position:'relative' }}>
      <div style={{ position:'absolute',top:'-4px',left:0,right:0,height:14,background:'#2d1500',borderRadius:'50% 50% 0 0' }} />
      <div style={{ position:'absolute',top:9,left:5,width:5,height:5,borderRadius:'50%',background:'#111' }} />
      <div style={{ position:'absolute',top:9,right:5,width:5,height:5,borderRadius:'50%',background:'#111' }} />
    </div>
    <div style={{ width:34,height:26,background:'linear-gradient(90deg,#75aadb 33%,#fff 33%,#fff 66%,#75aadb 66%)',border:'1px solid #5590c0',borderRadius:'3px 3px 0 0',display:'flex',alignItems:'center',justifyContent:'center',marginTop:-1 }}>
      <span style={{ fontSize:8,fontWeight:900,color:'#0a1628' }}>10</span>
    </div>
    <div style={{ position:'absolute',top:32,left:-12,width:13,height:15,background:'#75aadb',borderRadius:3,border:'1px solid #5590c0',transform:'rotate(-10deg)' }} />
    <div style={{ position:'absolute',top:32,right:-12,width:13,height:15,background:'#75aadb',borderRadius:3,border:'1px solid #5590c0',transform:'rotate(10deg)' }} />
    <div style={{ display:'flex',gap:3,marginTop:-1 }}>
      <div style={{ width:14,height:12,background:'#111',borderRadius:'0 0 2px 2px' }} />
      <motion.div animate={kicking?{rotate:-55,y:-6}:{rotate:0,y:0}} transition={{duration:0.28}}
        style={{ width:14,height:12,background:'#111',borderRadius:'0 0 2px 2px',transformOrigin:'top center' }} />
    </div>
    <div style={{ display:'flex',gap:3 }}>
      <div style={{ width:14,height:14,background:'#75aadb',borderRadius:'0 0 2px 2px' }} />
      <div style={{ width:14,height:14,background:'#75aadb',borderRadius:'0 0 2px 2px' }} />
    </div>
    <div style={{ display:'flex',gap:3 }}>
      <div style={{ width:16,height:6,background:'#222',borderRadius:'0 0 3px 3px' }} />
      <div style={{ width:16,height:6,background:'#f8d000',borderRadius:'0 0 3px 3px' }} />
    </div>
    <div style={{ position:'absolute',bottom:-16,left:'50%',transform:'translateX(-50%)',background:'rgba(0,0,0,0.8)',color:'#75aadb',fontSize:7,fontWeight:900,padding:'1px 5px',borderRadius:3,whiteSpace:'nowrap' }}>🇦🇷 MESSİ #10</div>
  </motion.div>
);

/* ─── ANA OYUN ─── */
export default function MessiGame({ onClose }) {
  const [screen, setScreen] = useState('menu'); // menu|aim|power|shoot|result|gameover
  const [difficulty, setDifficulty] = useState('medium');
  const [series, setSeries] = useState(5); // kaç penaltı
  const [round, setRound] = useState(0);
  const [score, setScore] = useState({ goals:0, saves:0 });

  // Şut mekanikleri
  const [aimX, setAimX] = useState(50);     // hedef X (%)
  const [aimY, setAimY] = useState(50);     // hedef Y (%)
  const [power, setPower] = useState(0);
  const [spin, setSpin] = useState(0);       // -1..1 (sol-sağ eğim)
  const [phase2, setPhase2] = useState('aim'); // aim|power|spin|shoot

  // Animasyon
  const [ballPos, setBallPos] = useState({ x:50, y:110 });
  const [crDive, setCrDive] = useState(false);
  const [crDir, setCrDir] = useState(0);
  const [kicking, setKicking] = useState(false);
  const [result, setResult] = useState(null); // 'goal'|'save'|'post'
  const [resultZone, setResultZone] = useState('');
  const [crowdFlash, setCrowdFlash] = useState(false);
  const [trailPos, setTrailPos] = useState([]);

  // Güç barı
  const powerDir = useRef(1);
  const spinDir = useRef(1);
  const powerIv = useRef(null);
  const spinIv = useRef(null);

  // Hedef crosshair hareketi
  const [mouseAim, setMouseAim] = useState(false);
  const kabuRef = useRef(null);

  const diff = DIFF[difficulty];

  /* Güç barı */
  useEffect(() => {
    if (phase2 !== 'power') { clearInterval(powerIv.current); return; }
    powerDir.current = 1;
    powerIv.current = setInterval(() => {
      setPower(p => {
        let n = p + powerDir.current * 3;
        if (n >= 100) { powerDir.current = -1; return 100; }
        if (n <= 0)   { powerDir.current = 1;  return 0;   }
        return n;
      });
    }, 28);
    return () => clearInterval(powerIv.current);
  }, [phase2]);

  /* Spin barı */
  useEffect(() => {
    if (phase2 !== 'spin') { clearInterval(spinIv.current); return; }
    spinDir.current = 1;
    spinIv.current = setInterval(() => {
      setSpin(s => {
        let n = s + spinDir.current * 0.04;
        if (n >= 1)  { spinDir.current = -1; return 1;  }
        if (n <= -1) { spinDir.current = 1;  return -1; }
        return n;
      });
    }, 28);
    return () => clearInterval(spinIv.current);
  }, [phase2]);

  /* Crosshair mouse takibi */
  const handleMouseMove = useCallback((e) => {
    if (phase2 !== 'aim' || !kabuRef.current) return;
    const rect = kabuRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setAimX(Math.min(95, Math.max(5, x)));
    setAimY(Math.min(95, Math.max(5, y)));
  }, [phase2]);

  /* Tıklama ile faz geçişi */
  const handleKaleClick = useCallback(() => {
    if (phase2 === 'aim')   { setPhase2('power'); return; }
    if (phase2 === 'power') { clearInterval(powerIv.current); setPhase2('spin'); return; }
    if (phase2 === 'spin')  { clearInterval(spinIv.current); fireShot(); return; }
  }, [phase2, aimX, aimY, power, spin]);

  const fireShot = useCallback(() => {
    setPhase2('shoot');
    setKicking(true);
    setTimeout(() => setKicking(false), 500);

    // Spin etkisi — hedefe sapma uygula
    const finalX = Math.min(96, Math.max(4, aimX + spin * 12));
    const finalY = aimY;

    // Top animasyonu trail ile
    const trail = [];
    for (let i = 0; i < 6; i++) {
      trail.push({ x: 50 + (finalX - 50) * (i/6), y: 110 - (110 - finalY) * (i/6) });
    }
    setTrailPos(trail);

    setTimeout(() => {
      setBallPos({ x: finalX, y: finalY });
    }, 50);

    // CR7 karar ver
    const crDecX = finalX < 33 ? -1 : finalX > 67 ? 1 : 0;
    setTimeout(() => {
      setCrDive(true);
      setCrDir(crDecX + (Math.random() > diff.accuracy ? (Math.random() > 0.5 ? 1 : -1) * (1 - diff.accuracy) * 2 : 0));
    }, diff.react);

    // Sonuç
    setTimeout(() => {
      // İsabet hesabı — köşelere gitmek daha kolay gol
      const isCorner = finalX < 18 || finalX > 82;
      const isLow = finalY > 70;
      const catchRadius = isCorner ? 8 : isLow ? 14 : 18;

      const crFinalX = 50 + crDir * 45;
      const dist = Math.sqrt(Math.pow(crFinalX - finalX, 2) + Math.pow(50 - finalY, 2));
      const isPost = (finalX < 4 || finalX > 96) && finalY < 90;
      const isSave = dist < catchRadius && !isPost;

      let res = isSave ? 'save' : isPost ? 'post' : 'goal';

      // Güce göre isabet şansı
      if (power < 25 && res === 'goal') {
        res = Math.random() > 0.6 ? 'save' : 'goal'; // düşük güçte save ihtimali
      }

      setResult(res);
      const nearestZone = ZONES.reduce((best, z) => {
        const d = Math.sqrt(Math.pow(z.x-finalX,2)+Math.pow(z.y-finalY,2));
        return d < Math.sqrt(Math.pow(best.x-finalX,2)+Math.pow(best.y-finalY,2)) ? z : best;
      }, ZONES[0]);
      setResultZone(nearestZone.label);

      if (res === 'goal') setCrowdFlash(true);
      setScore(s => ({ goals: s.goals + (res==='goal'?1:0), saves: s.saves + (res==='save'||res==='post'?1:0) }));
      setPhase2('result');
      setTimeout(() => { if (res==='goal') setCrowdFlash(false); }, 2000);
    }, 1050);
  }, [aimX, aimY, power, spin, diff, crDir]);

  const nextRound = useCallback(() => {
    if (round + 1 >= series) { setScreen('gameover'); return; }
    setRound(r => r+1);
    setPhase2('aim');
    setResult(null);
    setCrDive(false);
    setCrDir(0);
    setBallPos({x:50,y:110});
    setTrailPos([]);
    setPower(0);
    setSpin(0);
  }, [round, series]);

  const startGame = () => {
    setRound(0);
    setScore({goals:0,saves:0});
    setPhase2('aim');
    setResult(null);
    setCrDive(false);
    setBallPos({x:50,y:110});
    setTrailPos([]);
    setPower(0);
    setSpin(0);
    setScreen('game');
  };

  /* ─── MENÜ ─── */
  if (screen === 'menu') return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{ position:'fixed',inset:0,zIndex:9985,background:'radial-gradient(ellipse at 50% 80%,#1e5218 0%,#0a1f08 50%,#071220 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat,sans-serif',gap:24 }}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'clamp(28px,5vw,48px)',fontWeight:900,color:'#fff',letterSpacing:'-0.02em'}}>🇦🇷 MESSİ <span style={{color:'#f8d000'}}>vs</span> CR7 🇵🇹</div>
        <div style={{fontSize:13,color:'rgba(255,255,255,0.4)',marginTop:6,letterSpacing:'0.1em'}}>PENALTİ DÜELLOSU</div>
      </div>

      {/* Zorluk */}
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
        <div style={{fontSize:9,fontWeight:900,letterSpacing:'0.15em',color:'rgba(255,255,255,0.4)'}}>ZORLUK SEÇ</div>
        <div style={{display:'flex',gap:8}}>
          {[['easy','KOLAY','#00e87a'],['medium','ORTA','#f8d000'],['hard','ZOR','#ff4444']].map(([k,l,c])=>(
            <button key={k} onClick={()=>setDifficulty(k)}
              style={{padding:'8px 18px',borderRadius:'999px',border:`2px solid ${difficulty===k?c:'rgba(255,255,255,0.15)'}`,background:difficulty===k?c+'22':'transparent',color:difficulty===k?c:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:900,cursor:'pointer',fontFamily:'Montserrat',transition:'all 0.2s',letterSpacing:'0.06em'}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Seri */}
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
        <div style={{fontSize:9,fontWeight:900,letterSpacing:'0.15em',color:'rgba(255,255,255,0.4)'}}>KAÇ PENALTİ?</div>
        <div style={{display:'flex',gap:8}}>
          {[3,5,10].map(n=>(
            <button key={n} onClick={()=>setSeries(n)}
              style={{width:44,height:44,borderRadius:'50%',border:`2px solid ${series===n?'#f8d000':'rgba(255,255,255,0.15)'}`,background:series===n?'rgba(248,208,0,0.15)':'transparent',color:series===n?'#f8d000':'rgba(255,255,255,0.4)',fontSize:14,fontWeight:900,cursor:'pointer',fontFamily:'Montserrat',transition:'all 0.2s'}}>
              {n}
            </button>
          ))}
        </div>
      </div>

      <motion.button onClick={startGame} whileHover={{scale:1.05,boxShadow:'0 8px 30px rgba(248,208,0,0.5)'}} whileTap={{scale:0.97}}
        style={{background:'#f8d000',color:'#0a1628',fontSize:14,fontWeight:900,padding:'14px 40px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.08em',marginTop:8}}>
        BAŞLA ⚽
      </motion.button>

      <div style={{fontSize:10,color:'rgba(255,255,255,0.25)',textAlign:'center',letterSpacing:'0.08em',lineHeight:1.8}}>
        1. KALE'YE TIKLA → Hedef seç<br/>
        2. TIKLA → Güç ayarla<br/>
        3. TIKLA → Spin / Efekt<br/>
        4. SON TIKLA → Şut at!
      </div>

      <button onClick={onClose} style={{position:'absolute',top:14,right:14,background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:8,padding:'5px 12px',color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'Montserrat'}}>ÇIKIŞ ✕</button>
    </motion.div>
  );

  /* ─── GAME OVER ─── */
  if (screen === 'gameover') return (
    <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
      style={{ position:'fixed',inset:0,zIndex:9985,background:'radial-gradient(ellipse at 50% 60%,#1e5218,#071220)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat,sans-serif',gap:20 }}>
      <div style={{fontSize:'clamp(18px,4vw,32px)',fontWeight:900,color:'#fff',textAlign:'center'}}>
        {score.goals > score.saves ? '🏆 MESSİ KAZANDI!' : score.goals === score.saves ? '🤝 BERABERLİK!' : '😤 CR7 KURTARDI!'}
      </div>
      <div style={{display:'flex',gap:40,textAlign:'center'}}>
        <div><div style={{fontSize:48,fontWeight:900,color:'#00e87a'}}>{score.goals}</div><div style={{fontSize:10,color:'rgba(255,255,255,0.4)',letterSpacing:'0.1em'}}>GOL</div></div>
        <div style={{fontSize:36,fontWeight:900,color:'rgba(255,255,255,0.2)',alignSelf:'center'}}>–</div>
        <div><div style={{fontSize:48,fontWeight:900,color:'#ff4444'}}>{score.saves}</div><div style={{fontSize:10,color:'rgba(255,255,255,0.4)',letterSpacing:'0.1em'}}>KURTARMA</div></div>
      </div>
      <div style={{fontSize:12,color:'rgba(255,255,255,0.35)'}}>İsabet: {Math.round((score.goals/series)*100)}% • {series} penaltı</div>
      <div style={{display:'flex',gap:10,marginTop:8}}>
        <motion.button onClick={startGame} whileHover={{scale:1.05}} whileTap={{scale:0.97}}
          style={{background:'#f8d000',color:'#0a1628',fontSize:13,fontWeight:900,padding:'12px 28px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.06em'}}>
          TEKRAR ⚽
        </motion.button>
        <motion.button onClick={()=>setScreen('menu')} whileHover={{scale:1.03}} whileTap={{scale:0.97}}
          style={{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.6)',fontSize:13,fontWeight:700,padding:'12px 22px',borderRadius:'999px',border:'1px solid rgba(255,255,255,0.15)',cursor:'pointer',fontFamily:'Montserrat'}}>
          MENÜ
        </motion.button>
      </div>
      <button onClick={onClose} style={{position:'absolute',top:14,right:14,background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:8,padding:'5px 12px',color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'Montserrat'}}>ÇIKIŞ ✕</button>
    </motion.div>
  );

  /* ─── ANA OYUN EKRANI ─── */
  const powerColor = power > 75 ? '#ff4444' : power > 45 ? '#f8d000' : '#75aadb';

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{ position:'fixed',inset:0,zIndex:9985,fontFamily:'Montserrat,sans-serif',overflow:'hidden',background:'radial-gradient(ellipse at 50% 80%,#1e5218 0%,#0f2a08 55%,#071220 100%)' }}>

      {/* ─ ÇĐZGĐLĐ ÇĐM ─ */}
      <div style={{position:'absolute',inset:0,display:'flex',opacity:0.18}}>
        {Array.from({length:12}).map((_,i)=>(
          <div key={i} style={{flex:1,background:i%2===0?'rgba(0,0,0,0.2)':'transparent'}} />
        ))}
      </div>

      {/* ─ TRİBÜN ─ */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:'20%',background:'linear-gradient(180deg,#1a0a2e,#2a104a)',overflow:'hidden'}}>
        {Array.from({length:5}).map((_,row)=>(
          <div key={row} style={{position:'absolute',left:0,right:0,top:`${row*20}%`,height:'20%',display:'flex'}}>
            {Array.from({length:60}).map((_,i)=>{
              const c=['#75aadb','#fff','#f8d000','#c8e6ff','#75aadb'][i%5];
              return <div key={i} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{width:5,height:7,borderRadius:'50% 50% 0 0',background:c,opacity:0.45+Math.random()*0.4}} />
              </div>;
            })}
          </div>
        ))}
        {/* Arjantin bayrakları */}
        {[8,25,45,65,82,95].map((l,i)=>(
          <motion.div key={i} animate={{rotate:[-6,6,-6]}} transition={{duration:1.4+i*0.25,repeat:Infinity}}
            style={{position:'absolute',top:'15%',left:`${l}%`,fontSize:13,userSelect:'none'}}>🇦🇷</motion.div>
        ))}
        {/* Kalabalık flaşı */}
        <AnimatePresence>
          {crowdFlash && (
            <motion.div initial={{opacity:0}} animate={{opacity:[0,1,0.6,0]}} transition={{duration:1.8}}
              style={{position:'absolute',inset:0,background:'rgba(248,208,0,0.18)'}} />
          )}
        </AnimatePresence>
        {/* Skor paneli */}
        <div style={{position:'absolute',top:6,left:'50%',transform:'translateX(-50%)',background:'rgba(0,0,0,0.75)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:8,padding:'3px 16px',display:'flex',alignItems:'center',gap:14,backdropFilter:'blur(4px)'}}>
          <span style={{fontSize:10,fontWeight:900,color:'#75aadb'}}>🇦🇷 MESSİ</span>
          <span style={{fontSize:18,fontWeight:900,color:'#f8d000'}}>{score.goals} – {score.saves}</span>
          <span style={{fontSize:10,fontWeight:900,color:'#e61e1e'}}>CR7 🇵🇹</span>
        </div>
        {/* Tur göstergesi */}
        <div style={{position:'absolute',top:6,right:14,display:'flex',gap:4}}>
          {Array.from({length:series}).map((_,i)=>(
            <div key={i} style={{width:8,height:8,borderRadius:'50%',background:i<round?'#f8d000':i===round?'#75aadb':'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.2)'}} />
          ))}
        </div>
      </div>

      {/* ─ SAHA ÇİZGİLERİ ─ */}
      <div style={{position:'absolute',bottom:'22%',left:'15%',right:'15%',height:1,background:'rgba(255,255,255,0.15)'}} />
      <div style={{position:'absolute',bottom:'22%',left:'50%',width:10,height:10,borderRadius:'50%',background:'rgba(255,255,255,0.35)',transform:'translate(-50%,50%)'}} />
      <svg style={{position:'absolute',bottom:'17%',left:'22%',width:'56%',height:'14%',overflow:'visible',opacity:0.13}} viewBox="0 0 300 60">
        <path d="M 0 60 Q 150 -20 300 60" fill="none" stroke="white" strokeWidth="2" />
      </svg>

      {/* ─ KALE ─ */}
      <div style={{position:'absolute',top:'20%',left:'50%',transform:'translateX(-50%)',width:'min(520px,80vw)'}}>
        {/* Kale direği */}
        <div
          ref={kabuRef}
          onClick={phase2!=='result' ? handleKaleClick : undefined}
          onMouseMove={handleMouseMove}
          style={{
            position:'relative',
            border:'4px solid rgba(255,255,255,0.92)',
            borderBottom:'none',
            borderRadius:'2px 2px 0 0',
            background:'rgba(0,0,10,0.2)',
            backdropFilter:'blur(1px)',
            aspectRatio:'3/1.65',
            cursor: phase2==='aim'?'crosshair': phase2==='result'?'default':'pointer',
            boxShadow:'0 0 50px rgba(0,0,0,0.6)',
            overflow:'hidden',
          }}>

          {/* Kale ağı */}
          <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.1}} viewBox="0 0 300 160" preserveAspectRatio="none">
            {Array.from({length:9}).map((_,i)=><line key={`v${i}`} x1={(i+1)*28} y1="0" x2={(i+1)*28} y2="160" stroke="white" strokeWidth="1"/>)}
            {Array.from({length:6}).map((_,i)=><line key={`h${i}`} x1="0" y1={(i+1)*23} x2="300" y2={(i+1)*23} stroke="white" strokeWidth="1"/>)}
          </svg>

          {/* 9 bölge overlay */}
          <div style={{position:'absolute',inset:0,display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gridTemplateRows:'1fr 1fr 1fr',pointerEvents:'none'}}>
            {Array.from({length:9}).map((_,idx)=>(
              <div key={idx} style={{border:'1px dashed rgba(255,255,255,0.06)',
                background: result && ZONES[idx].label===resultZone && result==='goal' ? 'rgba(0,220,100,0.18)' :
                            result && ZONES[idx].label===resultZone && result!=='goal' ? 'rgba(255,60,60,0.18)' : 'transparent'}} />
            ))}
          </div>

          {/* Crosshair */}
          {phase2==='aim' && (
            <motion.div style={{position:'absolute',left:`${aimX}%`,top:`${aimY}%`,transform:'translate(-50%,-50%)',pointerEvents:'none',zIndex:30}}>
              <div style={{width:28,height:28,border:'2px solid #f8d000',borderRadius:'50%',position:'relative',boxShadow:'0 0 12px rgba(248,208,0,0.6)'}}>
                <div style={{position:'absolute',top:'50%',left:'-8px',right:'-8px',height:1,background:'#f8d000',opacity:0.7}} />
                <div style={{position:'absolute',left:'50%',top:'-8px',bottom:'-8px',width:1,background:'#f8d000',opacity:0.7}} />
              </div>
            </motion.div>
          )}

          {/* Top trail */}
          {trailPos.map((p,i)=>(
            <motion.div key={i} initial={{opacity:0.4}} animate={{opacity:0}}
              transition={{duration:0.5,delay:i*0.06}}
              style={{position:'absolute',left:`${p.x}%`,top:`${p.y}%`,transform:'translate(-50%,-50%)',fontSize:8,pointerEvents:'none',zIndex:18,opacity:0.3}}>⚽</motion.div>
          ))}

          {/* Top */}
          <AnimatePresence>
            {phase2==='shoot'||phase2==='result' ? (
              <motion.div
                key="ball"
                initial={{left:'48%',top:'105%',fontSize:10,opacity:1,rotate:0}}
                animate={{left:`${ballPos.x}%`,top:`${ballPos.y}%`,fontSize:26,rotate:spin*720}}
                transition={{duration:0.65,ease:[0.2,0.8,0.4,1]}}
                style={{position:'absolute',transform:'translate(-50%,-50%)',zIndex:20,pointerEvents:'none'}}>
                ⚽
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* CR7 kaleci */}
          <div style={{position:'absolute',bottom:8,left:'50%',transform:'translateX(-50%)',zIndex:15}}>
            <CR7 diving={crDive} diveDir={crDir} />
          </div>

          {/* Sonuç overlay */}
          <AnimatePresence>
            {result && (
              <motion.div initial={{opacity:0,scale:0.6}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
                transition={{type:'spring',stiffness:280,damping:18}}
                style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
                  background:result==='goal'?'rgba(0,200,80,0.2)':'rgba(220,30,30,0.2)',
                  backdropFilter:'blur(3px)',zIndex:25,pointerEvents:'none'}}>
                <div style={{fontSize:'clamp(20px,4vw,38px)',fontWeight:900,
                  color:result==='goal'?'#00e87a':result==='post'?'#f8d000':'#ff4444',
                  textShadow:`0 0 30px ${result==='goal'?'#00e87a':result==='post'?'#f8d000':'#ff4444'}`,letterSpacing:'-0.02em'}}>
                  {result==='goal'?'⚽ GOLAZO!':result==='post'?'🏃 DİREK!':'🧤 CR7 KURTARDI!'}
                </div>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.55)',marginTop:5}}>
                  {result==='goal'?`${resultZone} — NET!`:result==='post'?'Az kalsın...!':` Ronaldo ${resultZone} tarafını kesti!`}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Kale çerçeve altı */}
        <div style={{height:7,background:'rgba(255,255,255,0.88)',borderRadius:'0 0 4px 4px',boxShadow:'0 4px 20px rgba(0,0,0,0.5)'}} />
      </div>

      {/* ─ MESSİ (yakın plan, alt) ─ */}
      <div style={{position:'absolute',bottom:'12%',left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
        <Messi kicking={kicking} />
        {(phase2==='aim'||phase2==='power'||phase2==='spin') && !kicking && (
          <motion.div animate={{rotate:[0,360]}} transition={{duration:1.8,repeat:Infinity,ease:'linear'}}
            style={{fontSize:24,marginTop:4}}>⚽</motion.div>
        )}
      </div>

      {/* ─ ALT KONTROL PANELİ ─ */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,background:'rgba(0,0,0,0.65)',backdropFilter:'blur(10px)',borderTop:'1px solid rgba(255,255,255,0.08)',padding:'10px 20px 12px',minHeight:60}}>

        {/* AİM */}
        {phase2==='aim' && (
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:11,fontWeight:900,letterSpacing:'0.12em',color:'rgba(255,255,255,0.5)',marginBottom:4}}>🎯 MOUSEı HAREKET ETTİR — KALEYE TIKLA → GÜÇ</div>
            <div style={{fontSize:10,color:'rgba(255,255,255,0.25)',letterSpacing:'0.08em'}}>Köşelere nişan al! CR7 akıllı...</div>
          </div>
        )}

        {/* GÜÇ */}
        {phase2==='power' && (
          <div style={{display:'flex',alignItems:'center',gap:14}}>
            <div style={{fontSize:10,fontWeight:900,color:powerColor,letterSpacing:'0.1em',whiteSpace:'nowrap'}}>⚡ GÜÇ</div>
            <div style={{flex:1,background:'rgba(255,255,255,0.08)',borderRadius:'999px',height:12,overflow:'hidden',position:'relative'}}>
              <motion.div style={{height:'100%',width:`${power}%`,background:`linear-gradient(90deg,#75aadb,${powerColor})`,borderRadius:'999px',transition:'background 0.1s'}} />
              {/* Şeker kuşağı */}
              {power>85 && <div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(90deg,transparent,transparent 8px,rgba(255,0,0,0.2) 8px,rgba(255,0,0,0.2) 12px)'}} />}
            </div>
            <div style={{fontSize:14,fontWeight:900,color:powerColor,minWidth:42,textAlign:'right'}}>{Math.round(power)}%</div>
            <div style={{fontSize:10,fontWeight:900,color:'rgba(255,255,255,0.35)',letterSpacing:'0.06em',whiteSpace:'nowrap'}}>TIKLA → SPİN</div>
          </div>
        )}

        {/* SPİN */}
        {phase2==='spin' && (
          <div style={{display:'flex',alignItems:'center',gap:14}}>
            <div style={{fontSize:10,fontWeight:900,color:'#75aadb',letterSpacing:'0.1em',whiteSpace:'nowrap'}}>🌀 EFEKT</div>
            <div style={{flex:1,background:'rgba(255,255,255,0.08)',borderRadius:'999px',height:12,overflow:'hidden',position:'relative'}}>
              {/* Ortada 0, solda sol spin, sağda sağ spin */}
              <div style={{position:'absolute',left:'50%',top:0,bottom:0,width:2,background:'rgba(255,255,255,0.3)',transform:'translateX(-50%)'}} />
              <motion.div style={{
                position:'absolute',
                height:'100%',
                left: spin<0 ? `${50+spin*50}%` : '50%',
                width:`${Math.abs(spin)*50}%`,
                background: spin<0 ? 'linear-gradient(90deg,#75aadb,rgba(117,170,219,0.3))' : 'linear-gradient(90deg,rgba(248,208,0,0.3),#f8d000)',
                borderRadius:'999px',
              }} />
            </div>
            <div style={{fontSize:12,fontWeight:900,color:spin<-0.3?'#75aadb':spin>0.3?'#f8d000':'rgba(255,255,255,0.4)',minWidth:60,textAlign:'right',whiteSpace:'nowrap'}}>
              {spin<-0.3?'← Sol':spin>0.3?'Sağ →':'Düz'}
            </div>
            <div style={{fontSize:10,fontWeight:900,color:'rgba(255,255,255,0.35)',letterSpacing:'0.06em',whiteSpace:'nowrap'}}>TIKLA → ŞUT!</div>
          </div>
        )}

        {/* SHOOT */}
        {phase2==='shoot' && (
          <div style={{textAlign:'center',fontSize:14,fontWeight:900,color:'#f8d000',letterSpacing:'0.1em'}}>⚡ TOP FIRLADI!</div>
        )}

        {/* RESULT */}
        {phase2==='result' && (
          <div style={{display:'flex',justifyContent:'center',gap:10}}>
            {round+1 < series ? (
              <motion.button onClick={nextRound}
                whileHover={{scale:1.05,boxShadow:'0 6px 24px rgba(248,208,0,0.5)'}} whileTap={{scale:0.97}}
                style={{background:'#f8d000',color:'#0a1628',fontSize:13,fontWeight:900,padding:'10px 28px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.06em'}}>
                SONRAKI PENALTİ ⚽ ({round+1}/{series})
              </motion.button>
            ) : (
              <motion.button onClick={()=>setScreen('gameover')}
                whileHover={{scale:1.05}} whileTap={{scale:0.97}}
                style={{background:'#f8d000',color:'#0a1628',fontSize:13,fontWeight:900,padding:'10px 28px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.06em'}}>
                SONUCU GÖR 🏆
              </motion.button>
            )}
            <motion.button onClick={()=>setScreen('menu')}
              whileHover={{scale:1.03}} whileTap={{scale:0.97}}
              style={{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.55)',fontSize:13,fontWeight:700,padding:'10px 20px',borderRadius:'999px',border:'1px solid rgba(255,255,255,0.15)',cursor:'pointer',fontFamily:'Montserrat'}}>
              MENÜ
            </motion.button>
          </div>
        )}
      </div>

      {/* Üst skor */}
      <button onClick={onClose} style={{position:'absolute',top:8,right:10,background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'4px 10px',color:'rgba(255,255,255,0.45)',fontSize:10,fontWeight:700,cursor:'pointer',fontFamily:'Montserrat',zIndex:30}}>ÇIKIŞ ✕</button>

      {/* İsabet */}
      {score.goals+score.saves>0 && (
        <div style={{position:'absolute',bottom:64,right:14,fontSize:9,color:'rgba(255,255,255,0.2)',fontWeight:900}}>
          {Math.round((score.goals/(score.goals+score.saves))*100)}% İSABET
        </div>
      )}
    </motion.div>
  );
}
