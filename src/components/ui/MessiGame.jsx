import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GW = 900, GH = 540;

/* ── Sabitler ── */
const GOAL = { x: 225, y: 58, w: 450, h: 198 };
const BALL0 = { x: GW/2, y: GH - 100 };
const KEEP0 = { x: GW/2, y: GOAL.y + GOAL.h * 0.55 };
const DIFF = {
  easy:   { accuracy: 0.35, react: 400, label:'KOLAY', color:'#00e87a' },
  medium: { accuracy: 0.60, react: 240, label:'ORTA',  color:'#f8d000' },
  hard:   { accuracy: 0.80, react: 130, label:'ZOR',   color:'#ff4444' },
};

export default function MessiGame({ onClose }) {
  const canvasRef = useRef(null);
  const gsRef     = useRef(null);
  const rafRef    = useRef(null);

  const [screen,  setScreen]  = useState('menu');
  const [uiPhase, setUiPhase] = useState('aim');
  const [result,  setResult]  = useState(null);
  const [score,   setScore]   = useState({ g:0, s:0 });
  const [round,   setRound]   = useState(0);
  const [diff,    setDiff]    = useState('medium');
  const [total,   setTotal]   = useState(5);

  /* ─── INIT ─────────────────────────────────────────────────── */
  function initGS(d, t) {
    return {
      phase: 'aim',
      aimX: GW/2, aimY: GOAL.y + GOAL.h/2,
      power: 0, spin: 0,
      ball: { x:BALL0.x, y:BALL0.y, z:0, vx:0,vy:0,vz:0, rot:0, size:14 },
      keeper: { x:KEEP0.x, y:KEEP0.y, tx:KEEP0.x, frame:0, diving:false },
      particles: [],
      netShake: 0,
      result: null, resultTimer: 0,
      cheering: false, cheerTimer: 0,
      kickAnim: 0,
      score: { g:0, s:0 },
      round: 0, total: t, diff: d,
      t: 0,
      crowd: buildCrowd(),
    };
  }

  function buildCrowd() {
    const rows = [
      { y:18, count:36, h:18, scale:0.45 },
      { y:36, count:40, h:18, scale:0.52 },
      { y:54, count:44, h:20, scale:0.60 },
      { y:74, count:48, h:20, scale:0.68 },
    ];
    const arr = [];
    const SHIRT = ['#e63030','#1d6be5','#f8d000','#fff','#2ecc71','#e67e22','#9b59b6','#ff69b4','#75aadb','#34495e'];
    rows.forEach(r => {
      for (let i = 0; i < r.count; i++) {
        arr.push({
          x: (i / r.count) * GW + (Math.random()-0.5)*8,
          y: r.y + Math.random()*4,
          shirt: SHIRT[Math.floor(Math.random()*SHIRT.length)],
          skin: ['#f5cba7','#d4a574','#c68642','#8d5524'][Math.floor(Math.random()*4)],
          wave: Math.random()*Math.PI*2,
          scale: r.scale,
          armUp: Math.random() > 0.6,
        });
      }
    });
    return arr;
  }

  /* ─── DRAW ──────────────────────────────────────────────────── */
  function drawFrame(ctx) {
    const g = gsRef.current;
    if (!g) return;
    g.t += 0.017;
    const t = g.t;

    ctx.clearRect(0, 0, GW, GH);

    // ── 1. GÖKYÜZÜ
    const sky = ctx.createLinearGradient(0, 0, 0, GH*0.18);
    sky.addColorStop(0, '#1565c0');
    sky.addColorStop(1, '#42a5f5');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, GW, GH*0.18);

    // ── 2. TRIBÜN ARKA YAPI
    const stand = ctx.createLinearGradient(0, 0, 0, GH*0.165);
    stand.addColorStop(0, '#3d2b6e');
    stand.addColorStop(1, '#5c3f9f');
    ctx.fillStyle = stand;
    ctx.fillRect(0, GH*0.02, GW, GH*0.16);

    // Tribün şeritleri (derinlik)
    for (let r = 0; r < 5; r++) {
      const ry = GH*0.02 + r*(GH*0.03);
      ctx.fillStyle = `rgba(0,0,0,${0.08+r*0.03})`;
      ctx.fillRect(0, ry, GW, 3);
    }

    // ── 3. SEYİRCİLER
    g.crowd.forEach(p => {
      p.wave += 0.022;
      const cheer = g.cheering;
      const arm = cheer ? Math.abs(Math.sin(p.wave))*1.1 : (p.armUp?Math.sin(p.wave*0.4+1)*0.2+0.1:0);
      const sc = p.scale;
      const px = p.x, py = p.y;

      // koltuk
      ctx.fillStyle = '#1a237e';
      ctx.fillRect(px - 7*sc, py + 14*sc, 14*sc, 6*sc);

      // gövde
      ctx.fillStyle = p.shirt;
      ctx.beginPath();
      ctx.ellipse(px, py+10*sc, 7*sc, 9*sc, 0, 0, Math.PI*2);
      ctx.fill();

      // kafa
      ctx.fillStyle = p.skin;
      ctx.beginPath();
      ctx.arc(px, py, 6*sc, 0, Math.PI*2);
      ctx.fill();

      // kollar
      if (arm > 0.05 || cheer) {
        ctx.strokeStyle = p.shirt;
        ctx.lineWidth = 3*sc;
        ctx.lineCap = 'round';
        // sol
        ctx.beginPath();
        ctx.moveTo(px-7*sc, py+8*sc);
        ctx.lineTo(px-7*sc - Math.cos(arm+0.5)*12*sc, py+8*sc - Math.sin(arm+0.5)*12*sc);
        ctx.stroke();
        // sağ
        ctx.beginPath();
        ctx.moveTo(px+7*sc, py+8*sc);
        ctx.lineTo(px+7*sc + Math.cos(arm+0.5)*12*sc, py+8*sc - Math.sin(arm+0.5)*12*sc);
        ctx.stroke();
      }
    });

    // Cheer parlaması
    if (g.cheering) {
      g.cheerTimer++;
      const a = Math.max(0, 0.18 - g.cheerTimer*0.003);
      ctx.fillStyle = `rgba(248,208,0,${a})`;
      ctx.fillRect(0, 0, GW, GH*0.2);
      if (a <= 0) { g.cheering = false; g.cheerTimer = 0; }
    }

    // Arjantin bayrakları
    for (let i = 0; i < 6; i++) {
      const bx = 55 + i*145, by = GH*0.005 + Math.sin(t*1.3+i)*3;
      ctx.strokeStyle = '#666'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(bx, by+22); ctx.lineTo(bx, by); ctx.stroke();
      ctx.fillStyle = '#75aadb'; ctx.fillRect(bx, by, 30, 18);
      ctx.fillStyle = '#fff';    ctx.fillRect(bx+9, by, 12, 18);
      ctx.fillStyle = '#75aadb'; ctx.fillRect(bx+10, by+6, 10, 6);
    }

    // ── 4. ÇİM ZEMİNİ — perspektifli
    // Zemin gradyan (perspektif yanılsaması)
    const grassTop = GH * 0.20;
    const grass = ctx.createLinearGradient(0, grassTop, 0, GH);
    grass.addColorStop(0, '#2e7d32');
    grass.addColorStop(0.3, '#388e3c');
    grass.addColorStop(0.7, '#43a047');
    grass.addColorStop(1, '#1b5e20');
    ctx.fillStyle = grass;
    ctx.fillRect(0, grassTop, GW, GH - grassTop);

    // Çim şeritleri — perspektifle daralan
    for (let i = 0; i < 14; i++) {
      if (i % 2 === 0) {
        // Perspektif trapez
        const topW  = GW / 14;
        const botW  = GW / 10;
        const topX  = i * topW;
        const botX  = i * botW - (botW - topW)*7;
        ctx.fillStyle = 'rgba(0,0,0,0.06)';
        ctx.beginPath();
        ctx.moveTo(topX, grassTop);
        ctx.lineTo(topX + topW, grassTop);
        ctx.lineTo(Math.min(GW, botX + botW), GH);
        ctx.lineTo(Math.max(0, botX), GH);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Perspektifli saha çizgileri
    // Ceza sahası
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 2;
    const csLeft  = GW*0.2, csRight = GW*0.8;
    const csTopY  = GOAL.y + GOAL.h + 5;
    const csBotY  = GH * 0.62;
    ctx.beginPath();
    ctx.moveTo(csLeft, csTopY);
    ctx.lineTo(csLeft - 20, csBotY);
    ctx.lineTo(csRight + 20, csBotY);
    ctx.lineTo(csRight, csTopY);
    ctx.stroke();

    // Penaltı noktası
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath();
    ctx.ellipse(GW/2, GH - 108, 5, 3, 0, 0, Math.PI*2);
    ctx.fill();

    // ── 5. KALE — gerçekçi perspektif
    drawGoal(ctx, t, g.netShake);
    g.netShake *= 0.88;

    // ── 6. SKOR PANELİ
    drawScorePanel(ctx, g);

    // ── 7. CR7 KALECİ
    drawKeeper(ctx, g.keeper, t);
    // Keeper hareketi
    g.keeper.x += (g.keeper.tx - g.keeper.x) * 0.1;
    g.keeper.frame += 0.12;

    // ── 8. TOP FİZİĞİ
    const B = g.ball;
    if (g.phase === 'flying') {
      B.x  += B.vx;
      B.y  += B.vy;
      B.z  += B.vz;
      B.vz -= 0.24;
      B.vy -= 0.025;
      B.vx += g.spin * 0.055;
      B.rot += B.vx * 0.07;
      B.size = Math.max(7, 14 + B.z * 0.12);
      // Top kale çizgisine (y bazlı) ulaştı mı?
    if (B.y <= GOAL.y + GOAL.h && B.y >= GOAL.y - 10 && B.x > GOAL.x - 20 && B.x < GOAL.x + GOAL.w + 20 && g._shotResolved !== true) {
      g._shotResolved = true;
      resolveShot(g);
    }
    // Ya da z sıfırlandı (yere düştü) — açık gitti
    if (B.z <= 0 && !g._shotResolved) {
      g._shotResolved = true;
      g.ball.z = 0;
      resolveShot(g);
    }
    }

    // Top gölgesi
    const bsX = g.phase === 'aim' ? BALL0.x : B.x;
    const bsY = g.phase === 'aim' ? BALL0.y : GH - 102;
    ctx.fillStyle = `rgba(0,0,0,${Math.max(0, 0.25 - (B.z||0)*0.002)})`;
    ctx.beginPath();
    ctx.ellipse(bsX, bsY + 8, B.size*1.3, B.size*0.38, 0, 0, Math.PI*2);
    ctx.fill();

    // Top çizimi
    const bx = g.phase === 'aim' ? BALL0.x : B.x;
    const by = g.phase === 'aim' ? BALL0.y : B.y;
    drawBall(ctx, bx, by, B.size, B.rot);

    // ── 9. MESSİ (ÖNDE, ARKASI DÖNÜK — büyük)
    drawMessi(ctx, g.kickAnim, t);
    if (g.kickAnim > 0) g.kickAnim -= 0.045;

    // ── 10. NİŞANGAH
    if (g.phase === 'aim') {
      const ax = g.aimX, ay = g.aimY;
      const pulse = 0.5 + Math.sin(t*5)*0.4;
      ctx.strokeStyle = `rgba(255,80,80,${pulse})`; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(ax, ay, 22, 0, Math.PI*2); ctx.stroke();
      ctx.strokeStyle = `rgba(255,255,80,${pulse*0.8})`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(ax, ay, 10, 0, Math.PI*2); ctx.stroke();
      // Çapraz çizgiler
      ctx.strokeStyle = `rgba(255,200,0,${pulse})`; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ax-34,ay); ctx.lineTo(ax-24,ay);
      ctx.moveTo(ax+24,ay); ctx.lineTo(ax+34,ay);
      ctx.moveTo(ax,ay-34); ctx.lineTo(ax,ay-24);
      ctx.moveTo(ax,ay+24); ctx.lineTo(ax,ay+34);
      ctx.stroke();
      // Nokta
      ctx.fillStyle = '#ff3333';
      ctx.beginPath(); ctx.arc(ax,ay,4,0,Math.PI*2); ctx.fill();
      // Bölge etiketi
      const zl = zoneLabel(ax,ay);
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(ax-42, ay+26, 84, 20);
      ctx.strokeStyle='rgba(255,200,0,0.6)'; ctx.lineWidth=1;
      ctx.strokeRect(ax-42, ay+26, 84, 20);
      ctx.fillStyle = '#f8d000'; ctx.font='bold 10px Arial'; ctx.textAlign='center';
      ctx.fillText(zl, ax, ay+40);
    }

    // ── 11. PARTİKÜLLER
    g.particles = g.particles.filter(p => p.life > 0);
    g.particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.14; p.life-=2; p.rot+=0.12;
      ctx.globalAlpha = p.life/100;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.sz/2,-p.sz/2,p.sz,p.sz);
      ctx.restore();
      ctx.globalAlpha = 1;
    });

    // GOL konfeti
    if (g.result==='goal' && g.resultTimer<40 && g.particles.length<100) {
      for(let i=0;i<8;i++) g.particles.push({
        x: g.ball.x+(Math.random()-0.5)*100,
        y: g.ball.y+(Math.random()-0.5)*60,
        vx:(Math.random()-0.5)*8, vy:-(Math.random()*8+2),
        c:['#f8d000','#75aadb','#fff','#00e87a','#ff69b4'][Math.floor(Math.random()*5)],
        sz:5+Math.random()*8, life:80+Math.random()*50, rot:Math.random()*Math.PI,
      });
    }

    // ── 12. SONUÇ YAZISI
    if (g.phase==='result' && g.result) {
      g.resultTimer++;
      const sc2 = 1 + Math.max(0,1-g.resultTimer*0.012)*0.4;
      const alpha = Math.min(1, g.resultTimer/8);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(GW/2, GH*0.42);
      ctx.scale(sc2,sc2);
      const msg = g.result==='goal'?'⚽  G O A L !':g.result==='save'?'🧤  KURTARDI!':g.result==='post'?'💥  DİREK!':'↗  AÇIK GİTTİ';
      const col = g.result==='goal'?'#00e87a':g.result==='post'?'#f8d000':'#ff4444';
      ctx.font='bold 52px Arial'; ctx.textAlign='center';
      // Gölge
      ctx.fillStyle='rgba(0,0,0,0.85)';
      ctx.fillRect(-200,-48,400,62);
      ctx.strokeStyle=col; ctx.lineWidth=2;
      ctx.strokeRect(-200,-48,400,62);
      ctx.fillStyle=col; ctx.shadowColor=col; ctx.shadowBlur=20;
      ctx.fillText(msg, 0, 0);
      ctx.shadowBlur=0;
      ctx.restore();
    }
  }

  /* ─── KALE ÇİZİMİ ──────────────────────────────────────────── */
  function drawGoal(ctx, t, netShake) {
    const G = GOAL;
    const sx = netShake * Math.sin(t*24) * 3;

    // Arka duvar/gölge
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(G.x-4, G.y-24, G.w+8, 24);

    // Kale ağı — perspektifli
    ctx.strokeStyle = 'rgba(255,255,255,0.22)'; ctx.lineWidth = 0.8;
    const cols = 18, rows = 9;
    for (let c=0; c<=cols; c++) {
      const px = G.x + c*(G.w/cols);
      // Perspektif: alt daha geniş
      const botPx = G.x + c*(G.w/cols) + sx;
      ctx.beginPath(); ctx.moveTo(px, G.y); ctx.lineTo(botPx, G.y+G.h); ctx.stroke();
    }
    for (let r=0; r<=rows; r++) {
      const py = G.y + r*(G.h/rows);
      const offset = sx * (r/rows);
      ctx.beginPath(); ctx.moveTo(G.x+offset, py); ctx.lineTo(G.x+G.w+offset, py); ctx.stroke();
    }

    // Direkler — kalın, beyaz, hafif gölgeli
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // Gölge direkler
    ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(G.x+3, G.y+2); ctx.lineTo(G.x+3, G.y+G.h+2);
    ctx.moveTo(G.x+G.w+3, G.y+2); ctx.lineTo(G.x+G.w+3, G.y+G.h+2);
    ctx.moveTo(G.x+3, G.y+2); ctx.lineTo(G.x+G.w+3, G.y+2);
    ctx.stroke();
    // Ana direkler
    ctx.strokeStyle = '#f0f0f0'; ctx.lineWidth = 7;
    ctx.shadowColor = 'rgba(255,255,255,0.4)'; ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(G.x, G.y); ctx.lineTo(G.x, G.y+G.h);
    ctx.moveTo(G.x+G.w, G.y); ctx.lineTo(G.x+G.w, G.y+G.h);
    ctx.moveTo(G.x, G.y); ctx.lineTo(G.x+G.w, G.y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Zemin çizgisi
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(G.x-6, G.y+G.h); ctx.lineTo(G.x+G.w+6, G.y+G.h); ctx.stroke();
  }

  /* ─── TOP ───────────────────────────────────────────────────── */
  function drawBall(ctx, x, y, size, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    // Beyaz
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(0,0,size,0,Math.PI*2); ctx.fill();
    // Siyah beşgenler
    ctx.fillStyle = '#111';
    for (let i=0;i<5;i++) {
      const a = (i/5)*Math.PI*2 + rot*0.3;
      ctx.beginPath();
      ctx.arc(Math.cos(a)*size*0.48, Math.sin(a)*size*0.48, size*0.3, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.beginPath(); ctx.arc(0,0,size*0.28,0,Math.PI*2); ctx.fill();
    // Parlaklık
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath(); ctx.arc(-size*0.28,-size*0.28,size*0.26,0,Math.PI*2); ctx.fill();
    ctx.restore();
  }

  /* ─── MESSİ (ARKASI DÖNÜK, BÜYÜK, GERÇEKÇİ) ───────────────── */
  function drawMessi(ctx, kick, t) {
    const mx = GW/2, my = GH - 10;
    const kk = kick;
    const breathe = Math.sin(t*1.8)*1.5; // nefes alma

    // Gölge
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath(); ctx.ellipse(mx, my-4, 46, 13, 0, 0, Math.PI*2); ctx.fill();

    // ── BACAKLAR
    // Sol bacak (normal)
    ctx.fillStyle = '#111'; // siyah şort
    ctx.beginPath();
    ctx.moveTo(mx-22, my-92);
    ctx.lineTo(mx-10, my-92);
    ctx.lineTo(mx-8,  my-58);
    ctx.lineTo(mx-24, my-58);
    ctx.closePath(); ctx.fill();
    // Sol çorap (Arjantin mavisi)
    ctx.fillStyle = '#75aadb';
    ctx.fillRect(mx-24, my-58, 16, 36);
    // Sol krampon
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(mx-16, my-6, 14, 7, -0.2, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#f0f0f0'; // krampon çizgisi
    ctx.fillRect(mx-26, my-10, 20, 3);

    // Sağ bacak (tekme atıyor)
    ctx.save();
    ctx.translate(mx+14, my-90);
    ctx.rotate(-kk * 0.75);
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.moveTo(-12,0); ctx.lineTo(0,0); ctx.lineTo(2,34); ctx.lineTo(-14,34);
    ctx.closePath(); ctx.fill();
    // Çorap
    ctx.fillStyle = '#75aadb';
    ctx.fillRect(-14, 34, 16, 34);
    // Krampon
    ctx.fillStyle = '#f8d000'; // altın krampon
    ctx.beginPath(); ctx.ellipse(-6, 68, 13, 7, 0.15, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(-18, 62, 20, 4);
    ctx.restore();

    // ── GÖVDE (Arjantin forması — ön görünüm değil ARK)
    // Forma arka
    const bodyGrad = ctx.createLinearGradient(mx-32, my-180, mx+32, my-180);
    bodyGrad.addColorStop(0,   '#4a9fd4');
    bodyGrad.addColorStop(0.28,'#6ab8e8');
    bodyGrad.addColorStop(0.32,'#e8e8e8');
    bodyGrad.addColorStop(0.5, '#f5f5f5');
    bodyGrad.addColorStop(0.68,'#e8e8e8');
    bodyGrad.addColorStop(0.72,'#6ab8e8');
    bodyGrad.addColorStop(1,   '#4a9fd4');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(mx-32, my-92+breathe);
    ctx.quadraticCurveTo(mx-36, my-150+breathe, mx-28, my-175+breathe);
    ctx.lineTo(mx+28, my-175+breathe);
    ctx.quadraticCurveTo(mx+36, my-150+breathe, mx+32, my-92+breathe);
    ctx.closePath(); ctx.fill();

    // 10 numara (arka)
    ctx.fillStyle = '#0a1628';
    ctx.font = 'bold 22px Arial'; ctx.textAlign = 'center';
    ctx.fillText('10', mx, my-128+breathe);

    // Forma kıvrım çizgileri
    ctx.strokeStyle = 'rgba(0,0,50,0.12)'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mx-15, my-92+breathe); ctx.quadraticCurveTo(mx-18, my-140+breathe, mx-12, my-172+breathe);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mx+15, my-92+breathe); ctx.quadraticCurveTo(mx+18, my-140+breathe, mx+12, my-172+breathe);
    ctx.stroke();

    // Şort (siyah)
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.moveTo(mx-30, my-95+breathe);
    ctx.lineTo(mx+30, my-95+breathe);
    ctx.lineTo(mx+24, my-58);
    ctx.lineTo(mx-24, my-58);
    ctx.closePath(); ctx.fill();

    // ── KOLLAR
    // Sol kol
    const lArmAngle = -0.15 + Math.sin(t*1.8)*0.08;
    ctx.fillStyle = '#6ab8e8';
    ctx.save();
    ctx.translate(mx-30, my-168+breathe);
    ctx.rotate(lArmAngle + 0.3);
    ctx.beginPath();
    ctx.moveTo(-7,0); ctx.lineTo(7,0); ctx.lineTo(9,44); ctx.lineTo(-9,44);
    ctx.closePath(); ctx.fill();
    // sol el/bilek
    ctx.fillStyle = '#f0c080';
    ctx.beginPath(); ctx.ellipse(0, 46, 8, 6, 0, 0, Math.PI*2); ctx.fill();
    ctx.restore();

    // Sağ kol (tekme atarken öne)
    ctx.fillStyle = '#6ab8e8';
    ctx.save();
    ctx.translate(mx+30, my-168+breathe);
    ctx.rotate(-0.3 - kk*0.4);
    ctx.beginPath();
    ctx.moveTo(-7,0); ctx.lineTo(7,0); ctx.lineTo(9,44); ctx.lineTo(-9,44);
    ctx.closePath(); ctx.fill();
    // sağ el
    ctx.fillStyle = '#f0c080';
    ctx.beginPath(); ctx.ellipse(0, 46, 8, 6, 0, 0, Math.PI*2); ctx.fill();
    ctx.restore();

    // ── BOYUN & KAFA (arkası dönük)
    ctx.fillStyle = '#f0c080';
    ctx.beginPath();
    ctx.ellipse(mx, my-180+breathe, 11, 9, 0, 0, Math.PI*2); ctx.fill(); // boyun

    // Kafa — arkası
    const headGrad = ctx.createRadialGradient(mx, my-210+breathe, 4, mx, my-210+breathe, 26);
    headGrad.addColorStop(0, '#f5d5a0');
    headGrad.addColorStop(0.6, '#e8b87a');
    headGrad.addColorStop(1, '#c8944a');
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.arc(mx, my-210+breathe, 26, 0, Math.PI*2); ctx.fill();

    // Saç (arkası dönük — Messi saçı)
    ctx.fillStyle = '#1a0a00';
    ctx.beginPath();
    ctx.arc(mx, my-218+breathe, 24, Math.PI*0.15, Math.PI*0.85); ctx.fill();
    ctx.beginPath();
    ctx.arc(mx, my-214+breathe, 26, Math.PI*1.05, Math.PI*1.95); ctx.fill();
    // Saç dokusu
    ctx.strokeStyle = '#2d1500'; ctx.lineWidth = 1.5;
    for (let i=-2;i<=2;i++) {
      ctx.beginPath();
      ctx.moveTo(mx+i*6, my-238+breathe);
      ctx.quadraticCurveTo(mx+i*4+2, my-220+breathe, mx+i*7, my-205+breathe);
      ctx.stroke();
    }

    // Kulak
    ctx.fillStyle = '#e0a870';
    ctx.beginPath(); ctx.ellipse(mx-25, my-208+breathe, 5, 7, -0.2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(mx+25, my-208+breathe, 5, 7, 0.2, 0, Math.PI*2); ctx.fill();
  }

  /* ─── CR7 KALECİ ────────────────────────────────────────────── */
  function drawKeeper(ctx, K, t) {
    const kx = K.x, ky = K.y;
    const idle = Math.abs(K.tx - K.x) < 8;
    const frame = K.frame;

    // Gölge
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(kx, ky+62, 26, 8, 0, 0, Math.PI*2); ctx.fill();

    // ── BACAKLAR
    const legSwing = idle ? Math.sin(frame)*4 : 0;
    // Sol bacak
    ctx.fillStyle = '#004d00';
    ctx.beginPath();
    ctx.moveTo(kx-15, ky+18); ctx.lineTo(kx-3, ky+18);
    ctx.lineTo(kx-2+legSwing, ky+48); ctx.lineTo(kx-16+legSwing, ky+48);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#cc0000';
    ctx.fillRect(kx-17+legSwing, ky+47, 16, 18);
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.ellipse(kx-9+legSwing, ky+66, 11, 6, -0.1, 0, Math.PI*2); ctx.fill();

    // Sağ bacak
    ctx.fillStyle = '#004d00';
    ctx.beginPath();
    ctx.moveTo(kx+3, ky+18); ctx.lineTo(kx+15, ky+18);
    ctx.lineTo(kx+16-legSwing, ky+48); ctx.lineTo(kx+2-legSwing, ky+48);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#cc0000';
    ctx.fillRect(kx+1-legSwing, ky+47, 16, 18);
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.ellipse(kx+9-legSwing, ky+66, 11, 6, 0.1, 0, Math.PI*2); ctx.fill();

    // ── GÖVDE (Portekiz forması — önden görünüm)
    const bodyGrad2 = ctx.createLinearGradient(kx-22, ky-30, kx+22, ky-30);
    bodyGrad2.addColorStop(0, '#c0392b');
    bodyGrad2.addColorStop(0.5, '#e74c3c');
    bodyGrad2.addColorStop(1, '#c0392b');
    ctx.fillStyle = bodyGrad2;
    ctx.beginPath();
    ctx.moveTo(kx-22, ky+20);
    ctx.quadraticCurveTo(kx-26, ky-10, kx-20, ky-32);
    ctx.lineTo(kx+20, ky-32);
    ctx.quadraticCurveTo(kx+26, ky-10, kx+22, ky+20);
    ctx.closePath(); ctx.fill();
    // CR7 yazısı
    ctx.fillStyle = '#f8d000';
    ctx.font = 'bold 10px Arial'; ctx.textAlign = 'center';
    ctx.fillText('CR7', kx, ky+4);
    // 1 numarası
    ctx.fillStyle = '#f8d000';
    ctx.font = 'bold 8px Arial';
    ctx.fillText('1', kx, ky-14);

    // ── KOLLAR & ELDİVENLER
    const diveDir = K.tx < GW/2 - 20 ? -1 : K.tx > GW/2 + 20 ? 1 : 0;
    const armL = diveDir * 0.5 - 0.4 + Math.sin(frame)*0.1;
    const armR = diveDir * 0.5 + 0.4 + Math.sin(frame+1)*0.1;

    // Sol kol
    ctx.fillStyle = '#c0392b';
    ctx.save(); ctx.translate(kx-20, ky-22);
    ctx.rotate(armL);
    ctx.fillRect(-6, 0, 12, 30); ctx.restore();
    // Sol eldiven
    ctx.fillStyle = '#f8a100';
    ctx.save(); ctx.translate(kx-20, ky-22);
    ctx.rotate(armL);
    ctx.beginPath(); ctx.arc(0, 36, 11, 0, Math.PI*2); ctx.fill();
    // Eldiven kıvrımları
    ctx.strokeStyle='rgba(0,0,0,0.2)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(-6,30); ctx.lineTo(-6,44); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,28); ctx.lineTo(0,46); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6,30); ctx.lineTo(6,44); ctx.stroke();
    ctx.restore();

    // Sağ kol
    ctx.fillStyle = '#c0392b';
    ctx.save(); ctx.translate(kx+20, ky-22);
    ctx.rotate(armR);
    ctx.fillRect(-6, 0, 12, 30); ctx.restore();
    // Sağ eldiven
    ctx.fillStyle = '#f8a100';
    ctx.save(); ctx.translate(kx+20, ky-22);
    ctx.rotate(armR);
    ctx.beginPath(); ctx.arc(0, 36, 11, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(0,0,0,0.2)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(-6,30); ctx.lineTo(-6,44); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,28); ctx.lineTo(0,46); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6,30); ctx.lineTo(6,44); ctx.stroke();
    ctx.restore();

    // ── KAFA (ön görünüm)
    // Boyun
    ctx.fillStyle = '#f0c080';
    ctx.fillRect(kx-9, ky-36, 18, 10);

    // Kafa
    const headGrad2 = ctx.createRadialGradient(kx-5, ky-60, 2, kx, ky-58, 24);
    headGrad2.addColorStop(0, '#fde3b0');
    headGrad2.addColorStop(0.7, '#f0c080');
    headGrad2.addColorStop(1, '#d4956a');
    ctx.fillStyle = headGrad2;
    ctx.beginPath(); ctx.arc(kx, ky-58, 22, 0, Math.PI*2); ctx.fill();

    // Saç (CR7 karakteristik)
    ctx.fillStyle = '#1a0800';
    ctx.beginPath(); ctx.arc(kx, ky-66, 20, Math.PI, 0); ctx.fill();
    ctx.fillRect(kx-10, ky-72, 20, 14);
    // Saç çizgileri
    ctx.strokeStyle = '#2d1500'; ctx.lineWidth = 1.2;
    for (let i=-1;i<=1;i++) {
      ctx.beginPath();
      ctx.moveTo(kx+i*8, ky-78);
      ctx.lineTo(kx+i*5, ky-65);
      ctx.stroke();
    }

    // Yüz
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(kx-7,ky-58,3.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(kx+7,ky-58,3.5,0,Math.PI*2); ctx.fill();
    // Kaşlar
    ctx.strokeStyle='#1a0800'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(kx-11,ky-64); ctx.lineTo(kx-3,ky-62); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(kx+11,ky-64); ctx.lineTo(kx+3,ky-62); ctx.stroke();
    // Burun
    ctx.strokeStyle='rgba(0,0,0,0.3)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(kx,ky-55); ctx.lineTo(kx-3,ky-49); ctx.lineTo(kx+3,ky-49); ctx.stroke();
    // Ağız (yoğunlaşmış ifade)
    ctx.strokeStyle='#8b4513'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(kx-6,ky-45); ctx.lineTo(kx+6,ky-45); ctx.stroke();

    // İsim etiketi
    ctx.fillStyle='rgba(0,0,0,0.7)';
    ctx.fillRect(kx-30,ky+70,60,16);
    ctx.fillStyle='#f8d000'; ctx.font='bold 8px Arial'; ctx.textAlign='center';
    ctx.fillText('RONALDO #1', kx, ky+81);
  }

  /* ─── SKOR PANELİ ───────────────────────────────────────────── */
  function drawScorePanel(ctx, g) {
    // Panel arka
    ctx.fillStyle='rgba(0,0,0,0.75)';
    ctx.fillRect(GW/2-100, 6, 200, 46);
    ctx.strokeStyle='rgba(255,255,255,0.12)'; ctx.lineWidth=1;
    ctx.strokeRect(GW/2-100, 6, 200, 46);

    // Takım isimleri
    ctx.fillStyle='#75aadb'; ctx.font='bold 11px Arial'; ctx.textAlign='left';
    ctx.fillText('🇦🇷 MESSİ', GW/2-90, 28);
    ctx.fillStyle='#e74c3c'; ctx.textAlign='right';
    ctx.fillText('CR7 🇵🇹', GW/2+90, 28);

    // Skor
    ctx.fillStyle='#f8d000'; ctx.font='bold 24px Arial'; ctx.textAlign='center';
    ctx.fillText(`${g.score.g}  –  ${g.score.s}`, GW/2, 42);

    // Turlar
    for (let i=0;i<g.total;i++) {
      ctx.beginPath();
      ctx.arc(GW/2 - (g.total-1)*12 + i*24, 60, 5.5, 0, Math.PI*2);
      ctx.fillStyle = i<g.round?'#f8d000': i===g.round?'#75aadb':'rgba(255,255,255,0.18)';
      ctx.fill();
    }

    // Zorluk
    const dc = DIFF[g.diff].color;
    ctx.fillStyle=dc; ctx.font='bold 8px Arial'; ctx.textAlign='right';
    ctx.fillText(DIFF[g.diff].label, GW-12, 20);
  }

  /* ─── ZONE LABEL ────────────────────────────────────────────── */
  function zoneLabel(x, y) {
    const G = GOAL;
    const col = x < G.x+G.w/3 ? 'Sol' : x < G.x+G.w*2/3 ? 'Orta' : 'Sağ';
    const row = y < G.y+G.h/3 ? 'Üst' : y < G.y+G.h*2/3 ? '' : 'Alt';
    if (!row) return col === 'Orta' ? 'Tam Orta' : `${col} Orta`;
    return `${col} ${row}`;
  }

  /* ─── ŞUT SONUCU ────────────────────────────────────────────── */
  function resolveShot(g) {
    const B=g.ball, K=g.keeper, G=GOAL;
    const inGoal = B.x>G.x+8 && B.x<G.x+G.w-8 && B.y>G.y+8 && B.y<G.y+G.h;
    const isPost = (B.x<G.x+10||B.x>G.x+G.w-10) && inGoal;
    const dist   = Math.hypot(B.x-K.x, B.y-K.y);
    const caught = dist < 48;
    const res = !inGoal?'wide': isPost?'post': caught?'save':'goal';
    g.result=res; g.phase='result'; g.resultTimer=0;
    if (res==='goal') { g.netShake=1; g.cheering=true; g.cheerTimer=0; }
    g.score = { g: g.score.g+(res==='goal'?1:0), s: g.score.s+(res!=='goal'?1:0) };
    setScore({...g.score});
    setResult(res);
    setUiPhase('result');
  }

  /* ─── CANVAS LOOP ───────────────────────────────────────────── */
  useEffect(() => {
    if (screen !== 'game') return;
    if (!gsRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let running = true;
    const loop = () => {
      if (!running) return;
      if (gsRef.current) {
        try { drawFrame(ctx); } catch(e) { console.error('draw error:', e); }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { running=false; cancelAnimationFrame(rafRef.current); };
  }, [screen]);

  /* ─── MOUSE ─────────────────────────────────────────────────── */
  const onMouseMove = useCallback(e => {
    const g=gsRef.current;
    if (!g||g.phase!=='aim') return;
    const rect=canvasRef.current?.getBoundingClientRect();
    if(!rect) return;
    const sx=GW/rect.width, sy=GH/rect.height;
    const x=(e.clientX-rect.left)*sx, y=(e.clientY-rect.top)*sy;
    const G=GOAL;
    if(x>G.x-15&&x<G.x+G.w+15&&y>G.y-15&&y<G.y+G.h+15) {
      g.aimX=Math.min(G.x+G.w-5,Math.max(G.x+5,x));
      g.aimY=Math.min(G.y+G.h-5,Math.max(G.y+5,y));
    }
  },[]);

  const onTouch = useCallback(e => {
    const g=gsRef.current;
    if(!g||g.phase!=='aim') return;
    const tc=e.touches[0];
    const rect=canvasRef.current?.getBoundingClientRect();
    if(!rect) return;
    const sx=GW/rect.width,sy=GH/rect.height;
    const x=(tc.clientX-rect.left)*sx,y=(tc.clientY-rect.top)*sy;
    const G=GOAL;
    if(x>G.x-15&&x<G.x+G.w+15&&y>G.y-15&&y<G.y+G.h+15) {
      g.aimX=Math.min(G.x+G.w-5,Math.max(G.x+5,x));
      g.aimY=Math.min(G.y+G.h-5,Math.max(G.y+5,y));
    }
  },[]);

  /* ─── TEK TIKLA ŞUT ─────────────────────────────────────────── */
  const onClick = useCallback(() => {
    const g=gsRef.current;
    if(!g||g.phase!=='aim') return;
    const normX = (g.aimX - GW/2) / (GOAL.w/2);
    g.spin = normX * 0.45;

    const tx=g.aimX, ty=g.aimY;
    // Kaç frame'de hedefe ulaşacağını hesapla
    const frames = 22;
    const vx = (tx - BALL0.x) / frames;
    const vy = (ty - BALL0.y) / frames;
    // vz: top frames frame sonunda z=0 olmalı
    // z(t) = vz*t - 0.5*g*t^2 = 0 => vz = 0.5*g*frames
    // ama biz z'nin en yüksekte olmasını istiyoruz yarı yolda
    // basit: vz = gravity * frames / 2
    const gravity = 0.24;
    const vz = gravity * frames / 2; // bu şekilde tam yay çizer

    g.ball={x:BALL0.x, y:BALL0.y, z:0,
      vx, vy, vz, rot:0, size:14};
    g.phase='flying'; g.kickAnim=1;
    setUiPhase('flying');

    // CR7 hareketi
    setTimeout(()=>{
      const correct=Math.random()<cfg.accuracy;
      if(correct) {
        g.keeper.tx = tx<GW*0.38?GOAL.x+55: tx>GW*0.62?GOAL.x+GOAL.w-55: GW/2;
      } else {
        g.keeper.tx = tx<GW/2?GOAL.x+GOAL.w-65:GOAL.x+65;
      }
      g.keeper.diving=true;
    }, cfg.react);
  },[]);

  /* ─── SONRAKI TUR ───────────────────────────────────────────── */
  const nextRound = useCallback(()=>{
    const g=gsRef.current; if(!g) return;
    const nr=g.round+1;
    if(nr>=g.total){ setScreen('gameover'); return; }
    // State güncelle
    g.round=nr; g.phase='aim'; g.result=null; g.resultTimer=0;
    g.ball={x:BALL0.x,y:BALL0.y,z:0,vx:0,vy:0,vz:0,rot:0,size:14};
    g._shotResolved=false;
    g.keeper={x:KEEP0.x,y:KEEP0.y,tx:KEEP0.x,frame:0,diving:false};
    g.particles=[]; g.netShake=0; g.kickAnim=0;
    g.aimX=GW/2; g.aimY=GOAL.y+GOAL.h/2;
    setRound(nr); setResult(null); setUiPhase('aim');
  },[]);

  const startGame=()=>{
    // Önce state sıfırla, sonra game state init et, sonra ekranı değiştir
    setRound(0); setScore({g:0,s:0}); setResult(null); setUiPhase('aim');
    const newGs = initGS(diff,total);
    gsRef.current = newGs;
    setTimeout(() => setScreen('game'), 0);
  };

  /* ─── MENÜ ─────────────────────────────────────────────────── */
  if(screen==='menu') return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,zIndex:9985,background:'radial-gradient(ellipse at 50% 70%,#1a5218,#0a1628)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat,sans-serif',gap:22}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'clamp(22px,5vw,42px)',fontWeight:900,color:'#fff'}}>🇦🇷 MESSİ <span style={{color:'#f8d000'}}>vs</span> CR7 🇵🇹</div>
        <div style={{fontSize:11,color:'rgba(255,255,255,0.3)',marginTop:5,letterSpacing:'0.12em'}}>PENALTİ DÜELLOSU</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        <div style={{fontSize:9,fontWeight:900,letterSpacing:'0.15em',color:'rgba(255,255,255,0.3)'}}>ZORLUK</div>
        <div style={{display:'flex',gap:8}}>
          {Object.entries(DIFF).map(([k,v])=>(
            <button key={k} onClick={()=>setDiff(k)}
              style={{padding:'8px 18px',borderRadius:'999px',border:`2px solid ${diff===k?v.color:'rgba(255,255,255,0.1)'}`,background:diff===k?v.color+'22':'transparent',color:diff===k?v.color:'rgba(255,255,255,0.35)',fontSize:11,fontWeight:900,cursor:'pointer',fontFamily:'Montserrat',transition:'all 0.2s'}}>
              {v.label}
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
      <motion.button onClick={startGame} whileHover={{scale:1.05,boxShadow:'0 8px 32px rgba(248,208,0,0.5)'}} whileTap={{scale:0.97}}
        style={{background:'#f8d000',color:'#0a1628',fontSize:14,fontWeight:900,padding:'13px 44px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.08em',marginTop:4}}>
        BAŞLA ⚽
      </motion.button>
      <div style={{fontSize:10,color:'rgba(255,255,255,0.18)',textAlign:'center',lineHeight:2,letterSpacing:'0.06em'}}>
        Fareyi kaleye götür → Tıkla → GOL!
      </div>
      <button onClick={onClose} style={{position:'absolute',top:14,right:14,background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'5px 12px',color:'rgba(255,255,255,0.4)',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'Montserrat'}}>✕</button>
    </motion.div>
  );

  /* ─── GAME OVER ──────────────────────────────────────────────── */
  if(screen==='gameover') return (
    <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,zIndex:9985,background:'radial-gradient(ellipse at 50% 60%,#1a5218,#071220)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat,sans-serif',gap:20}}>
      <div style={{fontSize:'clamp(20px,4vw,36px)',fontWeight:900,color:'#fff',textAlign:'center'}}>
        {score.g>score.s?'🏆 MESSİ KAZANDI!':score.g===score.s?'🤝 BERABERLİK!':'😤 CR7 KAZANDI!'}
      </div>
      <div style={{display:'flex',gap:48,textAlign:'center',margin:'8px 0'}}>
        <div><div style={{fontSize:56,fontWeight:900,color:'#00e87a',lineHeight:1}}>{score.g}</div><div style={{fontSize:9,color:'rgba(255,255,255,0.3)',letterSpacing:'0.1em',marginTop:4}}>GOL</div></div>
        <div style={{fontSize:40,fontWeight:900,color:'rgba(255,255,255,0.12)',alignSelf:'center'}}>–</div>
        <div><div style={{fontSize:56,fontWeight:900,color:'#ff4444',lineHeight:1}}>{score.s}</div><div style={{fontSize:9,color:'rgba(255,255,255,0.3)',letterSpacing:'0.1em',marginTop:4}}>KURTARMA</div></div>
      </div>
      <div style={{fontSize:12,color:'rgba(255,255,255,0.25)',letterSpacing:'0.1em'}}>İsabet: {Math.round((score.g/total)*100)}% • {total} Penaltı</div>
      <div style={{display:'flex',gap:10,marginTop:8}}>
        <motion.button onClick={startGame} whileHover={{scale:1.05,boxShadow:'0 6px 24px rgba(248,208,0,0.5)'}} whileTap={{scale:0.97}}
          style={{background:'#f8d000',color:'#0a1628',fontSize:13,fontWeight:900,padding:'12px 28px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.06em'}}>TEKRAR ⚽</motion.button>
        <motion.button onClick={()=>setScreen('menu')} whileHover={{scale:1.03}} whileTap={{scale:0.97}}
          style={{background:'rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.45)',fontSize:13,fontWeight:700,padding:'12px 20px',borderRadius:'999px',border:'1px solid rgba(255,255,255,0.1)',cursor:'pointer',fontFamily:'Montserrat'}}>MENÜ</motion.button>
      </div>
      <button onClick={onClose} style={{position:'absolute',top:14,right:14,background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'5px 12px',color:'rgba(255,255,255,0.4)',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'Montserrat'}}>✕</button>
    </motion.div>
  );

  /* ─── OYUN EKRANI ───────────────────────────────────────────── */
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,zIndex:9985,background:'#071220',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat,sans-serif'}}>

      <canvas ref={canvasRef} width={GW} height={GH}
        onMouseMove={onMouseMove} onTouchMove={onTouch}
        onClick={uiPhase==='result'?undefined:onClick}
        style={{width:'min(900px,100vw)',height:'auto',display:'block',
          cursor:uiPhase==='aim'?'crosshair':uiPhase==='result'?'default':'pointer',
          borderBottom:'1px solid rgba(255,255,255,0.08)'}}
      />

      {/* Alt panel */}
      <div style={{width:'min(900px,100vw)',background:'rgba(0,0,0,0.75)',backdropFilter:'blur(12px)',padding:'11px 20px 15px',minHeight:56,display:'flex',alignItems:'center',justifyContent:'center'}}>
        {uiPhase==='aim' && (
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:12,fontWeight:900,letterSpacing:'0.1em',color:'rgba(255,255,255,0.55)'}}>
              🎯 FAREYİ KALEYE GÖTÜR — TIKLA → ŞUT!
            </div>
            <div style={{fontSize:9,color:'rgba(255,255,255,0.2)',marginTop:2,letterSpacing:'0.08em'}}>
              Köşe üst: en zor — Kaleciye ısmarla!
            </div>
          </div>
        )}
        {uiPhase==='flying' && (
          <div style={{fontSize:14,fontWeight:900,color:'#f8d000',letterSpacing:'0.1em'}}>⚡ TOP FIRLADI!</div>
        )}
        {uiPhase==='result' && (
          <div style={{display:'flex',gap:10}}>
            {round+1<total?(
              <motion.button onClick={nextRound}
                whileHover={{scale:1.05,boxShadow:'0 6px 24px rgba(248,208,0,0.5)'}} whileTap={{scale:0.97}}
                style={{background:'#f8d000',color:'#0a1628',fontSize:13,fontWeight:900,padding:'10px 26px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.06em'}}>
                SONRAKI ⚽ ({round+1}/{total})
              </motion.button>
            ):(
              <motion.button onClick={()=>setScreen('gameover')}
                whileHover={{scale:1.05}} whileTap={{scale:0.97}}
                style={{background:'#f8d000',color:'#0a1628',fontSize:13,fontWeight:900,padding:'10px 26px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.06em'}}>
                SONUCU GÖR 🏆
              </motion.button>
            )}
            <motion.button onClick={()=>setScreen('menu')} whileHover={{scale:1.03}} whileTap={{scale:0.97}}
              style={{background:'rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.45)',fontSize:13,fontWeight:700,padding:'10px 18px',borderRadius:'999px',border:'1px solid rgba(255,255,255,0.1)',cursor:'pointer',fontFamily:'Montserrat'}}>
              MENÜ
            </motion.button>
          </div>
        )}
      </div>

      <button onClick={onClose} style={{position:'absolute',top:10,right:12,background:'rgba(0,0,0,0.5)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'5px 12px',color:'rgba(255,255,255,0.4)',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'Montserrat',zIndex:10}}>
        ✕ ÇIKIŞ
      </button>
    </motion.div>
  );
}
