import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GW = 800, GH = 520;
const GOAL = { x: 190, y: 55, w: 420, h: 210 };
const BALL0 = { x: GW/2, y: GH - 85 };
const KEEP0 = { x: GW/2, y: GOAL.y + GOAL.h - 55 };

const DIFF = {
  easy:   { accuracy: 0.38, react: 380, name:'KOLAY', color:'#00e87a' },
  medium: { accuracy: 0.62, react: 240, name:'ORTA',  color:'#f8d000' },
  hard:   { accuracy: 0.82, react: 130, name:'ZOR',   color:'#ff4444' },
};

export default function MessiGame({ onClose }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const gs        = useRef(null); // game state

  const [screen,   setScreen]   = useState('menu');
  const [uiPhase,  setUiPhase]  = useState('aim');
  const [_power, _setPower] = useState(0); // unused
  const [_spin, _setSpin] = useState(0); // unused
  const [result,   setResult]   = useState(null);
  const [score,    setScore]    = useState({ g:0, s:0 });
  const [round,    setRound]    = useState(0);
  const [diff,     setDiff]     = useState('medium');
  const [total,    setTotal]    = useState(5);

  const powerIv = useRef(null);
  const spinIv  = useRef(null);
  const pDir    = useRef(1);
  const sDir    = useRef(1);

  // ─── INIT GAME STATE ───────────────────────────────────────────────────────
  function initGS(d, t) {
    return {
      phase: 'aim',
      aimX: GW/2, aimY: GOAL.y + GOAL.h/2,
      power: 0, spin: 0,
      ball: { x: BALL0.x, y: BALL0.y, z: 0, vx:0,vy:0,vz:0, rot:0, size:16 },
      keeper: { x: KEEP0.x, y: KEEP0.y, tx: KEEP0.x, state:'idle', frame:0 },
      particles: [],
      netShake: 0,
      result: null, resultTimer: 0,
      cheering: false, cheerTimer: 0,
      kickAnim: 0,
      score: { g:0, s:0 },
      round: 0, total: t,
      diff: d,
      crowd: Array.from({length:110}, (_, i) => ({
        x: 20 + (i % 55) * (GW/55),
        y: 12 + Math.floor(i/55) * 28 + Math.random()*8,
        color: ['#75aadb','#fff','#c8e6ff','#f8d000','#75aadb','#1a3d6e'][i%6],
        wave: Math.random()*Math.PI*2,
        size: 6 + Math.random()*3,
      })),
      t: 0,
    };
  }

  // ─── DRAW ──────────────────────────────────────────────────────────────────
  function drawFrame(ctx) {
    const g = gs.current;
    if (!g) return;
    g.t += 0.016;
    const t = g.t;

    ctx.clearRect(0, 0, GW, GH);

    // ── SKY
    const sky = ctx.createLinearGradient(0,0,0,GH*0.32);
    sky.addColorStop(0,'#08051a'); sky.addColorStop(1,'#160830');
    ctx.fillStyle = sky; ctx.fillRect(0,0,GW,GH*0.32);

    // ── LIGHTS
    for (let i=0;i<4;i++) {
      const lx = [60,270,530,740][i];
      const lg = ctx.createRadialGradient(lx,0,0,lx,0,180);
      lg.addColorStop(0,'rgba(255,245,180,0.22)');
      lg.addColorStop(1,'rgba(255,245,180,0)');
      ctx.fillStyle=lg; ctx.fillRect(0,0,GW,GH*0.38);
      ctx.fillStyle='#aaa'; ctx.fillRect(lx-3,0,6,46);
      ctx.fillStyle='rgba(255,245,180,0.95)';
      ctx.beginPath(); ctx.arc(lx,0,13,0,Math.PI*2); ctx.fill();
    }

    // ── TRIBÜN
    const tri = ctx.createLinearGradient(0,10,0,GH*0.3);
    tri.addColorStop(0,'#110624'); tri.addColorStop(1,'#1c0838');
    ctx.fillStyle=tri; ctx.fillRect(0,10,GW,GH*0.3);

    // Seyirciler
    g.crowd.forEach(p => {
      p.wave += 0.025;
      const arm = g.cheering ? Math.sin(p.wave)*1.1 : Math.sin(p.wave*0.3)*0.15;
      // kafa
      ctx.fillStyle=p.color; ctx.beginPath();
      ctx.arc(p.x, p.y+p.size*0.5, p.size*0.55, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle='#f0c080'; ctx.beginPath();
      ctx.arc(p.x, p.y-p.size*0.15, p.size*0.38, 0, Math.PI*2); ctx.fill();
      if (g.cheering) {
        ctx.strokeStyle=p.color; ctx.lineWidth=2;
        ctx.beginPath();
        ctx.moveTo(p.x,p.y+p.size*0.2);
        ctx.lineTo(p.x+Math.cos(p.wave+1)*p.size*1.1, p.y-p.size*0.5-Math.sin(p.wave+1)*p.size*1.3);
        ctx.stroke();
      }
    });

    // Arjantin bayrakları
    for (let i=0;i<7;i++) {
      const bx=50+i*110, by=14+Math.sin(t*1.4+i)*4;
      ctx.strokeStyle='#777'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(bx,by+22); ctx.lineTo(bx,by); ctx.stroke();
      ctx.fillStyle='#75aadb'; ctx.fillRect(bx,by,26,16);
      ctx.fillStyle='#fff';    ctx.fillRect(bx+8,by,10,16);
      ctx.fillStyle='#75aadb'; ctx.fillRect(bx+9,by+5,8,6);
    }

    // Cheer flash
    if (g.cheering) {
      g.cheerTimer++;
      ctx.fillStyle=`rgba(248,208,0,${Math.max(0,0.12-g.cheerTimer*0.002)})`;
      ctx.fillRect(0,0,GW,GH*0.32);
      if (g.cheerTimer>60) { g.cheering=false; g.cheerTimer=0; }
    }

    // ── SAHA ZEMINI
    const grass = ctx.createLinearGradient(0,GH*0.28,0,GH);
    grass.addColorStop(0,'#1a5c14'); grass.addColorStop(0.5,'#1e6618'); grass.addColorStop(1,'#0f3a0c');
    ctx.fillStyle=grass; ctx.fillRect(0,GH*0.28,GW,GH*0.72);
    // Şeritler
    for (let i=0;i<12;i++) {
      if (i%2===0) { ctx.fillStyle='rgba(0,0,0,0.07)'; ctx.fillRect(i*(GW/12),GH*0.28,GW/12,GH*0.72); }
    }

    // Çizgiler
    ctx.strokeStyle='rgba(255,255,255,0.28)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(0,GH*0.56); ctx.lineTo(GW,GH*0.56); ctx.stroke();
    ctx.beginPath(); ctx.rect(GW*0.23, GOAL.y+GOAL.h-8, GW*0.54, GH*0.32); ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,0.55)';
    ctx.beginPath(); ctx.arc(GW/2, GH-100, 4, 0, Math.PI*2); ctx.fill();
    // Yay
    ctx.beginPath(); ctx.arc(GW/2, GH-100, 88, Math.PI*1.08, Math.PI*1.92, false);
    ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.stroke();

    // ── KALE
    const G = GOAL;
    // Arka gölge
    ctx.fillStyle='rgba(0,0,0,0.18)'; ctx.fillRect(G.x,G.y-20,G.w,20);
    // Ağ
    ctx.strokeStyle='rgba(255,255,255,0.13)'; ctx.lineWidth=0.8;
    const sx = g.netShake * Math.sin(t*22)*2.5;
    g.netShake *= 0.9;
    for (let c=0;c<=14;c++) {
      ctx.beginPath();
      ctx.moveTo(G.x + c*(G.w/14) + (c/14)*sx, G.y);
      ctx.lineTo(G.x + c*(G.w/14) + sx,         G.y + G.h);
      ctx.stroke();
    }
    for (let r=0;r<=7;r++) {
      ctx.beginPath();
      ctx.moveTo(G.x + (r/7)*sx, G.y + r*(G.h/7));
      ctx.lineTo(G.x + G.w + sx, G.y + r*(G.h/7));
      ctx.stroke();
    }
    // Direkler
    ctx.strokeStyle='#fff'; ctx.lineWidth=5;
    ctx.shadowColor='rgba(255,255,255,0.6)'; ctx.shadowBlur=8;
    ctx.beginPath();
    ctx.moveTo(G.x,G.y); ctx.lineTo(G.x,G.y+G.h);
    ctx.moveTo(G.x+G.w,G.y); ctx.lineTo(G.x+G.w,G.y+G.h);
    ctx.moveTo(G.x,G.y); ctx.lineTo(G.x+G.w,G.y);
    ctx.stroke(); ctx.shadowBlur=0;

    // ── SKOR PANELİ
    ctx.fillStyle='rgba(0,0,0,0.72)';
    ctx.beginPath(); ctx.rect(GW/2-92,6,184,42); ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,0.12)'; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle='#75aadb'; ctx.font='bold 10px Arial'; ctx.textAlign='left';
    ctx.fillText('🇦🇷 MESSİ', GW/2-84, 32);
    ctx.fillStyle='#ff5555'; ctx.textAlign='right';
    ctx.fillText('CR7 🇵🇹', GW/2+84, 32);
    ctx.fillStyle='#f8d000'; ctx.font='bold 20px Arial'; ctx.textAlign='center';
    ctx.fillText(`${g.score.g} – ${g.score.s}`, GW/2, 36);

    // Tur noktaları
    for (let i=0;i<g.total;i++) {
      ctx.beginPath(); ctx.arc(GW/2-((g.total-1)*11)+i*22, 58, 5, 0, Math.PI*2);
      ctx.fillStyle = i<g.round?'#f8d000': i===g.round?'#75aadb':'rgba(255,255,255,0.15)';
      ctx.fill();
    }

    // ── CR7 KALECİ
    const K = g.keeper;
    K.x += (K.tx - K.x) * 0.11;
    K.frame += 0.14;
    const kx=K.x, ky=K.y;
    const idle = K.state==='idle';
    const armSwing = idle ? Math.sin(K.frame)*18 : (K.tx<GW/2 ? -55 : 55);

    // Gölge
    ctx.fillStyle='rgba(0,0,0,0.22)';
    ctx.beginPath(); ctx.ellipse(kx, ky+60, 22, 7, 0, 0, Math.PI*2); ctx.fill();

    // Bacaklar
    ctx.fillStyle='#005500'; ctx.fillRect(kx-14,ky+22,12,22); ctx.fillRect(kx+2,ky+22,12,22);
    ctx.fillStyle='#cc0000'; ctx.fillRect(kx-14,ky+42,12,16); ctx.fillRect(kx+2,ky+42,12,16);
    ctx.fillStyle='#111';    ctx.fillRect(kx-16,ky+56,15,5);  ctx.fillRect(kx+1,ky+56,15,5);

    // Gövde (kırmızı)
    ctx.fillStyle='#cc1212'; ctx.fillRect(kx-18,ky-20,36,44);
    ctx.fillStyle='#f8d000'; ctx.font='bold 8px Arial'; ctx.textAlign='center';
    ctx.fillText('CR7', kx, ky+3);

    // Kollar
    const arm1a = Math.atan2(-20, -16) + (armSwing/90)*Math.PI*0.6;
    const arm2a = Math.atan2(-20,  16) - (armSwing/90)*Math.PI*0.6;
    ctx.strokeStyle='#cc1212'; ctx.lineWidth=9; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(kx-16,ky-10);
    ctx.lineTo(kx-16+Math.cos(arm1a)*26, ky-10+Math.sin(arm1a)*26); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(kx+16,ky-10);
    ctx.lineTo(kx+16+Math.cos(arm2a)*26, ky-10+Math.sin(arm2a)*26); ctx.stroke();

    // Eldivenler
    ctx.fillStyle='#ff6600';
    ctx.beginPath(); ctx.arc(kx-16+Math.cos(arm1a)*26, ky-10+Math.sin(arm1a)*26, 8, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(kx+16+Math.cos(arm2a)*26, ky-10+Math.sin(arm2a)*26, 8, 0, Math.PI*2); ctx.fill();

    // Kafa
    ctx.fillStyle='#f0c080'; ctx.beginPath(); ctx.arc(kx,ky-30,16,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#1a0800'; ctx.beginPath(); ctx.arc(kx,ky-38,14,Math.PI,0); ctx.fill();
    ctx.fillRect(kx-8,ky-42,16,10);
    ctx.fillStyle='#111';
    ctx.beginPath(); ctx.arc(kx-5,ky-30,2.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(kx+5,ky-30,2.5,0,Math.PI*2); ctx.fill();

    // İsim
    ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.fillRect(kx-28,ky+65,56,14);
    ctx.fillStyle='#f8d000'; ctx.font='bold 7px Arial'; ctx.textAlign='center';
    ctx.fillText('RONALDO', kx, ky+75);

    // ── TOP FİZİĞİ
    const B = g.ball;
    if (g.phase==='flying') {
      B.x  += B.vx;
      B.y  += B.vy;
      B.z  += B.vz;
      B.vz -= 0.22;
      B.vy -= 0.03;
      B.vx += g.spin * 0.05;
      B.rot += B.vx * 0.06;
      B.size = Math.max(8, 16 + B.z*0.15);
      if (B.z <= 0 && B.y < GOAL.y+GOAL.h+10) resolveShot(g);
    }

    // Top gölgesi
    ctx.fillStyle=`rgba(0,0,0,${Math.max(0,0.3-B.z*0.003)})`;
    ctx.beginPath();
    ctx.ellipse(
      g.phase==='aim' ? BALL0.x : B.x,
      g.phase==='aim' ? BALL0.y : GH-78,
      B.size*1.2, B.size*0.35, 0, 0, Math.PI*2
    ); ctx.fill();

    // Top
    const bx = g.phase==='aim' ? BALL0.x : B.x;
    const by = g.phase==='aim' ? BALL0.y : B.y;
    ctx.save(); ctx.translate(bx,by); ctx.rotate(B.rot);
    ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(0,0,B.size,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#111';
    for (let i=0;i<5;i++) {
      const a = (i/5)*Math.PI*2 + B.rot;
      ctx.beginPath(); ctx.arc(Math.cos(a)*B.size*0.5, Math.sin(a)*B.size*0.5, B.size*0.28, 0, Math.PI*2); ctx.fill();
    }
    ctx.fillStyle='rgba(255,255,255,0.4)';
    ctx.beginPath(); ctx.arc(-B.size*0.3,-B.size*0.3,B.size*0.28,0,Math.PI*2); ctx.fill();
    ctx.restore();

    // ── MESSİ
    const mx=GW/2, my=GH-28;
    const kk = g.kickAnim;
    if (g.kickAnim>0) g.kickAnim -= 0.04;

    ctx.fillStyle='rgba(0,0,0,0.28)';
    ctx.beginPath(); ctx.ellipse(mx,my+2,32,10,0,0,Math.PI*2); ctx.fill();

    // Bacaklar
    ctx.fillStyle='#111'; ctx.fillRect(mx-20,my-62,16,36);
    ctx.fillStyle='#75aadb'; ctx.fillRect(mx-20,my-28,16,22);
    // Tekme bacağı
    ctx.save(); ctx.translate(mx+4,my-58); ctx.rotate(-kk*0.85);
    ctx.fillStyle='#111';    ctx.fillRect(0,0,16,36);
    ctx.fillStyle='#75aadb'; ctx.fillRect(0,36,16,22);
    ctx.fillStyle='#f8d000'; ctx.fillRect(-2,56,20,8);
    ctx.restore();
    // Sol krampon
    ctx.fillStyle='#222'; ctx.fillRect(mx-22,my-8,18,8);

    // Gövde — Arjantin forması
    const bg = ctx.createLinearGradient(mx-24,0,mx+24,0);
    bg.addColorStop(0,'#75aadb'); bg.addColorStop(0.32,'#75aadb');
    bg.addColorStop(0.32,'#fff'); bg.addColorStop(0.68,'#fff');
    bg.addColorStop(0.68,'#75aadb'); bg.addColorStop(1,'#75aadb');
    ctx.fillStyle=bg; ctx.fillRect(mx-24,my-108,48,50);
    ctx.fillStyle='#0a1628'; ctx.font='bold 10px Arial'; ctx.textAlign='center';
    ctx.fillText('10', mx, my-82);

    // Kollar
    ctx.strokeStyle='#75aadb'; ctx.lineWidth=11; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(mx-22,my-98); ctx.lineTo(mx-40,my-80-kk*12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(mx+22,my-98); ctx.lineTo(mx+40,my-72+kk*10); ctx.stroke();

    // Kafa
    ctx.fillStyle='#f0c080'; ctx.beginPath(); ctx.arc(mx,my-125,22,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#2d1500'; ctx.beginPath(); ctx.arc(mx,my-135,20,Math.PI,0); ctx.fill();
    ctx.fillRect(mx-12,my-140,24,14);
    ctx.fillStyle='#111';
    ctx.beginPath(); ctx.arc(mx-7,my-125,3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(mx+7,my-125,3,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(0,0,0,0.55)'; ctx.fillRect(mx-30,my+12,60,14);
    ctx.fillStyle='#75aadb'; ctx.font='bold 8px Arial'; ctx.textAlign='center';
    ctx.fillText('🇦🇷 MESSİ #10', mx, my+22);

    // ── NİŞAN (aim fazı)
    if (g.phase==='aim') {
      const ax=g.aimX, ay=g.aimY;
      const pulse = 0.55 + Math.sin(t*5)*0.35;
      ctx.strokeStyle=`rgba(248,208,0,${pulse})`; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(ax,ay,20,0,Math.PI*2); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ax-30,ay); ctx.lineTo(ax-22,ay);
      ctx.moveTo(ax+22,ay); ctx.lineTo(ax+30,ay);
      ctx.moveTo(ax,ay-30); ctx.lineTo(ax,ay-22);
      ctx.moveTo(ax,ay+22); ctx.lineTo(ax,ay+30);
      ctx.stroke();
      ctx.fillStyle='#f8d000'; ctx.beginPath(); ctx.arc(ax,ay,3,0,Math.PI*2); ctx.fill();
      // Bölge
      const zl = zoneLabel(ax,ay);
      ctx.fillStyle='rgba(0,0,0,0.65)'; ctx.fillRect(ax-38,ay+24,76,18);
      ctx.fillStyle='#f8d000'; ctx.font='9px Arial'; ctx.textAlign='center';
      ctx.fillText(zl, ax, ay+36);
    }

    // ── PARTİKÜLLER
    g.particles = g.particles.filter(p=>p.life>0);
    g.particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.15; p.life-=2; p.rot+=0.1;
      ctx.globalAlpha=p.life/100;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot);
      ctx.fillStyle=p.c;
      ctx.fillRect(-p.sz/2,-p.sz/2,p.sz,p.sz);
      ctx.restore();
      ctx.globalAlpha=1;
    });

    // ── SONUÇ YAZISI
    if (g.phase==='result' && g.result) {
      g.resultTimer++;
      const alpha = Math.min(1, g.resultTimer/10);
      const bounce = Math.max(0,1-g.resultTimer*0.01)*0.3;
      const sc = 1 + bounce;
      ctx.save();
      ctx.globalAlpha=alpha;
      ctx.translate(GW/2, GH/2-60);
      ctx.scale(sc,sc);
      const txt = g.result==='goal'?'⚽ GOLAZO!': g.result==='save'?'🧤 CR7 KURTARDI!': g.result==='post'?'🏃 DİREK!':'↗ AÇIK';
      const col = g.result==='goal'?'#00e87a': g.result==='post'?'#f8d000':'#ff4444';
      ctx.font='bold 44px Arial'; ctx.textAlign='center';
      ctx.fillStyle='rgba(0,0,0,0.8)'; ctx.fillText(txt,2,2);
      ctx.fillStyle=col; ctx.shadowColor=col; ctx.shadowBlur=24;
      ctx.fillText(txt,0,0);
      ctx.shadowBlur=0; ctx.restore();
    }

    // Gol konfeti
    if (g.result==='goal' && g.resultTimer < 35 && g.particles.length < 80) {
      for (let i=0;i<6;i++) {
        g.particles.push({
          x: g.ball.x+(Math.random()-0.5)*80,
          y: g.ball.y+(Math.random()-0.5)*50,
          vx:(Math.random()-0.5)*7, vy:-(Math.random()*7+2),
          c:['#f8d000','#75aadb','#fff','#00e87a'][Math.floor(Math.random()*4)],
          sz:4+Math.random()*7, life:80+Math.random()*40, rot:Math.random()*Math.PI,
        });
      }
    }
  }

  function zoneLabel(x,y) {
    const G=GOAL;
    const col = x<G.x+G.w/3?'Sol': x<G.x+G.w*2/3?'Orta':'Sağ';
    const row = y<G.y+G.h/3?'Üst': y<G.y+G.h*2/3?'':'Alt';
    return row?`${col} ${row}`:col==='Orta'?'Orta':'Orta';
  }

  function resolveShot(g) {
    const B=g.ball, K=g.keeper, G=GOAL;
    const inGoal = B.x>G.x+6 && B.x<G.x+G.w-6 && B.y>G.y+6 && B.y<G.y+G.h;
    const isPost = (B.x<G.x+8||B.x>G.x+G.w-8) && inGoal;
    const dist   = Math.hypot(B.x-K.x, B.y-K.y);
    const caught = dist < 44;
    const res = !inGoal?'wide': isPost?'post': caught?'save':'goal';
    g.result=res; g.phase='result'; g.resultTimer=0;
    if (res==='goal') { g.netShake=1; g.cheering=true; g.cheerTimer=0; }
    g.score = { g: g.score.g+(res==='goal'?1:0), s: g.score.s+(res!=='goal'?1:0) };
    setScore({...g.score});
    setResult(res);
    setUiPhase('result');
  }

  // ─── CANVAS LOOP ──────────────────────────────────────────────────────────
  // power bar removed

  // spin bar removed

  // ─── TIKLA ────────────────────────────────────────────────────────────────
  const onClick = useCallback(()=>{
    const g=gs.current; if(!g) return;
    if (g.phase==='aim') {
      // Direkt şut! — güç ve spin otomatik
      const distX = g.aimX - GW/2;
      const normX = distX / (GOAL.w/2); // -1..1
      // Köşe hedeflendiyse otomatik spin ver
      g.power = 72 + Math.abs(normX)*18; // köşeye güç
      g.spin  = normX * 0.55;            // hedefe göre hafif kavis
      launch(g);
    }
  },[]);

  function launch(g) {
    const cfg=DIFF[g.diff];
    const tx=g.aimX, ty=g.aimY;
    const spd = (g.power/100)*20 + 8;
    const frames=Math.max(16, Math.hypot(tx-BALL0.x,ty-BALL0.y) / spd);
    g.ball={x:BALL0.x,y:BALL0.y,z:0,
      vx:(tx-BALL0.x)/frames, vy:(ty-BALL0.y)/frames,
      vz:(g.power/100)*9+2.5, rot:0, size:16};
    g.phase='flying'; g.kickAnim=1;
    setUiPhase('flying');

    // CR7 atla
    setTimeout(()=>{
      const correct = Math.random()<cfg.accuracy;
      if(correct) {
        g.keeper.tx = tx<GW*0.38?GOAL.x+55: tx>GW*0.62?GOAL.x+GOAL.w-55: GW/2;
      } else {
        g.keeper.tx = tx<GW/2 ? GOAL.x+GOAL.w-70 : GOAL.x+70;
      }
      g.keeper.state='diving';
    }, cfg.react);
  }

  // ─── SONRAKI TUR ──────────────────────────────────────────────────────────
  const nextRound = useCallback(()=>{
    const g=gs.current; if(!g) return;
    const nr=g.round+1;
    if(nr>=g.total) { setScreen('gameover'); return; }
    g.round=nr; setRound(nr);
    g.phase='aim'; g.result=null; g.resultTimer=0;
    g.ball={x:BALL0.x,y:BALL0.y,z:0,vx:0,vy:0,vz:0,rot:0,size:16};
    g.keeper={x:KEEP0.x,y:KEEP0.y,tx:KEEP0.x,state:'idle',frame:0};
    g.particles=[]; g.netShake=0; g.kickAnim=0;
    g.aimX=GW/2; g.aimY=GOAL.y+GOAL.h/2;
    setResult(null); setUiPhase('aim'); setPower(0); setSpin(0);
  },[]);

  const startGame = ()=>{
    gs.current=initGS(diff,total);
    setRound(0); setScore({g:0,s:0}); setResult(null);
    setUiPhase('aim'); setPower(0); setSpin(0); setScreen('game');
  };

  // ── MENÜ
  if(screen==='menu') return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,zIndex:9985,background:'radial-gradient(ellipse at 50% 70%,#1a4f14,#0a1628)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat,sans-serif',gap:20}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'clamp(24px,5vw,44px)',fontWeight:900,color:'#fff'}}>🇦🇷 MESSİ <span style={{color:'#f8d000'}}>vs</span> CR7 🇵🇹</div>
        <div style={{fontSize:11,color:'rgba(255,255,255,0.3)',marginTop:4,letterSpacing:'0.12em'}}>PENALTİ DÜELLOSU</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        <div style={{fontSize:9,fontWeight:900,letterSpacing:'0.15em',color:'rgba(255,255,255,0.3)'}}>ZORLUK</div>
        <div style={{display:'flex',gap:8}}>
          {Object.entries(DIFF).map(([k,v])=>(
            <button key={k} onClick={()=>setDiff(k)}
              style={{padding:'8px 18px',borderRadius:'999px',border:`2px solid ${diff===k?v.color:'rgba(255,255,255,0.1)'}`,background:diff===k?v.color+'22':'transparent',color:diff===k?v.color:'rgba(255,255,255,0.35)',fontSize:11,fontWeight:900,cursor:'pointer',fontFamily:'Montserrat',transition:'all 0.2s'}}>
              {v.name}
            </button>
          ))}
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        <div style={{fontSize:9,fontWeight:900,letterSpacing:'0.15em',color:'rgba(255,255,255,0.3)'}}>KAÇ PENALTİ?</div>
        <div style={{display:'flex',gap:8}}>
          {[3,5,10].map(n=>(
            <button key={n} onClick={()=>setTotal(n)}
              style={{width:46,height:46,borderRadius:'50%',border:`2px solid ${total===n?'#f8d000':'rgba(255,255,255,0.1)'}`,background:total===n?'rgba(248,208,0,0.12)':'transparent',color:total===n?'#f8d000':'rgba(255,255,255,0.3)',fontSize:15,fontWeight:900,cursor:'pointer',fontFamily:'Montserrat',transition:'all 0.2s'}}>
              {n}
            </button>
          ))}
        </div>
      </div>
      <motion.button onClick={startGame} whileHover={{scale:1.06,boxShadow:'0 8px 30px rgba(248,208,0,0.5)'}} whileTap={{scale:0.97}}
        style={{background:'#f8d000',color:'#0a1628',fontSize:14,fontWeight:900,padding:'13px 42px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.08em',marginTop:4}}>
        BAŞLA ⚽
      </motion.button>
      <div style={{fontSize:10,color:'rgba(255,255,255,0.18)',textAlign:'center',lineHeight:2,letterSpacing:'0.08em'}}>
        Fare → Nişan al · Tıkla → Güç · Tıkla → Spin · Tıkla → ŞUT!
      </div>
      <button onClick={onClose} style={{position:'absolute',top:12,right:12,background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'5px 12px',color:'rgba(255,255,255,0.35)',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'Montserrat'}}>✕</button>
    </motion.div>
  );

  // ── GAME OVER
  if(screen==='gameover') return (
    <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,zIndex:9985,background:'radial-gradient(ellipse at 50% 60%,#1a4f14,#071220)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat,sans-serif',gap:18}}>
      <div style={{fontSize:'clamp(18px,4vw,34px)',fontWeight:900,color:'#fff',textAlign:'center'}}>
        {score.g>score.s?'🏆 MESSİ KAZANDI!': score.g===score.s?'🤝 BERABERLİK!':'😤 CR7 KAZANDI!'}
      </div>
      <div style={{display:'flex',gap:44,textAlign:'center',margin:'6px 0'}}>
        <div><div style={{fontSize:54,fontWeight:900,color:'#00e87a',lineHeight:1}}>{score.g}</div><div style={{fontSize:9,color:'rgba(255,255,255,0.3)',letterSpacing:'0.1em',marginTop:3}}>GOL</div></div>
        <div style={{fontSize:36,fontWeight:900,color:'rgba(255,255,255,0.12)',alignSelf:'center'}}>–</div>
        <div><div style={{fontSize:54,fontWeight:900,color:'#ff4444',lineHeight:1}}>{score.s}</div><div style={{fontSize:9,color:'rgba(255,255,255,0.3)',letterSpacing:'0.1em',marginTop:3}}>KURTARMA</div></div>
      </div>
      <div style={{fontSize:11,color:'rgba(255,255,255,0.25)',letterSpacing:'0.1em'}}>İsabet: {Math.round((score.g/total)*100)}% • {total} penaltı</div>
      <div style={{display:'flex',gap:10,marginTop:6}}>
        <motion.button onClick={startGame} whileHover={{scale:1.05,boxShadow:'0 6px 24px rgba(248,208,0,0.5)'}} whileTap={{scale:0.97}}
          style={{background:'#f8d000',color:'#0a1628',fontSize:13,fontWeight:900,padding:'12px 28px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.06em'}}>TEKRAR ⚽</motion.button>
        <motion.button onClick={()=>setScreen('menu')} whileHover={{scale:1.03}} whileTap={{scale:0.97}}
          style={{background:'rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.45)',fontSize:13,fontWeight:700,padding:'12px 20px',borderRadius:'999px',border:'1px solid rgba(255,255,255,0.1)',cursor:'pointer',fontFamily:'Montserrat'}}>MENÜ</motion.button>
      </div>
      <button onClick={onClose} style={{position:'absolute',top:12,right:12,background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'5px 12px',color:'rgba(255,255,255,0.35)',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'Montserrat'}}>✕</button>
    </motion.div>
  );

  // ── OYUN EKRANI
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,zIndex:9985,background:'#071220',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat,sans-serif'}}>
      <canvas ref={canvasRef} width={GW} height={GH}
        onMouseMove={onMouseMove} onTouchMove={onTouch}
        onClick={uiPhase==='result'?undefined:onClick}
        style={{width:'min(800px,100vw)',height:'auto',display:'block',
          cursor:uiPhase==='aim'?'crosshair':uiPhase==='result'?'default':'pointer',
          borderRadius:'0 0 6px 6px'}}
      />

      {/* Kontrol paneli */}
      <div style={{width:'min(800px,100vw)',background:'rgba(0,0,0,0.72)',backdropFilter:'blur(12px)',borderTop:'1px solid rgba(255,255,255,0.07)',padding:'10px 20px 14px',minHeight:58}}>
        {uiPhase==='aim' && (
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:11,fontWeight:900,letterSpacing:'0.1em',color:'rgba(255,255,255,0.4)',marginBottom:2}}>🎯 FAREYİ HAREKET ETTİR — TIKLA → ŞUT!</div>
            <div style={{fontSize:9,color:'rgba(255,255,255,0.18)',letterSpacing:'0.06em'}}>Köşeleri hedefle, CR7'ye şans verme!</div>
          </div>
        )}
        
        {uiPhase==='flying' && (
          <div style={{textAlign:'center',fontSize:14,fontWeight:900,color:'#f8d000',letterSpacing:'0.1em'}}>⚡ TOP FIRLADI!</div>
        )}
        {uiPhase==='result' && (
          <div style={{display:'flex',justifyContent:'center',gap:10}}>
            {round+1<total ? (
              <motion.button onClick={nextRound}
                whileHover={{scale:1.05,boxShadow:'0 6px 24px rgba(248,208,0,0.5)'}} whileTap={{scale:0.97}}
                style={{background:'#f8d000',color:'#0a1628',fontSize:13,fontWeight:900,padding:'10px 26px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.06em'}}>
                SONRAKI ⚽ ({round+1}/{total})
              </motion.button>
            ) : (
              <motion.button onClick={()=>setScreen('gameover')}
                whileHover={{scale:1.05}} whileTap={{scale:0.97}}
                style={{background:'#f8d000',color:'#0a1628',fontSize:13,fontWeight:900,padding:'10px 26px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.06em'}}>
                SONUCU GÖR 🏆
              </motion.button>
            )}
            <motion.button onClick={()=>setScreen('menu')} whileHover={{scale:1.03}} whileTap={{scale:0.97}}
              style={{background:'rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.4)',fontSize:13,fontWeight:700,padding:'10px 18px',borderRadius:'999px',border:'1px solid rgba(255,255,255,0.1)',cursor:'pointer',fontFamily:'Montserrat'}}>
              MENÜ
            </motion.button>
          </div>
        )}
      </div>
      <button onClick={onClose} style={{position:'absolute',top:10,right:12,background:'rgba(0,0,0,0.5)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'5px 12px',color:'rgba(255,255,255,0.35)',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'Montserrat',zIndex:10}}>✕ ÇIKIŞ</button>
    </motion.div>
  );
}
