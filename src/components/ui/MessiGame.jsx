import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ══════════════════════════════════════════════
   CANVAS-BASED PENALTY GAME
   Messi vs CR7 — tam stadyum, fizik, animasyon
══════════════════════════════════════════════ */

const W = 800, H = 500;
const GOAL = { x: 180, y: 60, w: 440, h: 220 };
const BALL_START = { x: W/2, y: H - 80 };
const KEEPER_START = { x: W/2, y: GOAL.y + GOAL.h - 60 };

// Seyirci renkleri
const CROWD_COLORS = ['#75aadb','#ffffff','#c8e6ff','#f8d000','#75aadb','#1a3d6e'];

function useCanvas(draw, deps=[]) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const loop = () => { draw(ctx, canvas); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, deps);
  return ref;
}

export default function MessiGame({ onClose }) {
  const [screen, setScreen] = useState('menu'); // menu|game|gameover
  const [difficulty, setDifficulty] = useState('medium');
  const [totalRounds, setTotalRounds] = useState(5);
  const [score, setScore] = useState({ goals: 0, saves: 0 });
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState('aim'); // aim|power|spin|flying|result
  const [result, setResult] = useState(null);
  const [crowdCheer, setCrowdCheer] = useState(false);

  // Fizik state
  const stateRef = useRef({
    phase: 'aim',
    aimX: W/2, aimY: GOAL.y + GOAL.h/2,
    power: 0, powerDir: 1,
    spin: 0, spinDir: 1,
    ball: { x: BALL_START.x, y: BALL_START.y, z: 0, vx: 0, vy: 0, vz: 0, rot: 0 },
    keeper: { x: KEEPER_START.x, y: KEEPER_START.y, targetX: KEEPER_START.x, state: 'idle', frame: 0 },
    crowd: Array.from({length: 120}, (_, i) => ({
      x: Math.random() * W,
      y: 10 + Math.random() * 70,
      color: CROWD_COLORS[Math.floor(Math.random() * CROWD_COLORS.length)],
      wave: Math.random() * Math.PI * 2,
      size: 6 + Math.random() * 4,
      arm: 0,
    })),
    particles: [],
    result: null,
    resultTimer: 0,
    cheering: false,
    kickAnim: 0,
    netShake: 0,
    difficulty: 'medium',
    round: 0,
    totalRounds: 5,
    score: { goals: 0, saves: 0 },
  });
  const s = stateRef.current;

  // Sync react state → ref
  useEffect(() => { s.phase = phase; }, [phase]);
  useEffect(() => { s.cheering = crowdCheer; }, [crowdCheer]);
  useEffect(() => { s.difficulty = difficulty; }, [difficulty]);

  const DIFF_CFG = {
    easy:   { speed: 0.5,  accuracy: 0.38, react: 380 },
    medium: { speed: 0.72, accuracy: 0.62, react: 240 },
    hard:   { speed: 0.9,  accuracy: 0.82, react: 130 },
  };

  // ─── ÇIZIM FONKSIYONLARI ───────────────────
  const draw = useCallback((ctx, canvas) => {
    const S = stateRef.current;
    const t = Date.now() / 1000;

    ctx.clearRect(0, 0, W, H);

    // 1. GÖK / GECE STADYUM
    const sky = ctx.createLinearGradient(0, 0, 0, H*0.35);
    sky.addColorStop(0, '#0a0618');
    sky.addColorStop(1, '#1a0a2e');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H*0.35);

    // 2. STADYUM AYDINLATMA
    for (let i = 0; i < 4; i++) {
      const lx = [80, 280, 520, 720][i];
      const lg = ctx.createRadialGradient(lx, 0, 0, lx, 0, 160);
      lg.addColorStop(0, 'rgba(255,240,200,0.18)');
      lg.addColorStop(1, 'rgba(255,240,200,0)');
      ctx.fillStyle = lg;
      ctx.fillRect(0, 0, W, H*0.35);
      // Direk
      ctx.fillStyle = '#888';
      ctx.fillRect(lx-3, 0, 6, 50);
      ctx.beginPath();
      ctx.arc(lx, 0, 14, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,240,200,0.9)';
      ctx.fill();
    }

    // 3. TRİBÜNLER
    const tribY = H * 0.04;
    const tribH = H * 0.26;

    // Sol tribün
    ctx.fillStyle = '#1a0a2e';
    ctx.fillRect(0, tribY, W*0.15, tribH);
    // Orta tribün
    const tribGrad = ctx.createLinearGradient(0, tribY, 0, tribY+tribH);
    tribGrad.addColorStop(0, '#120826');
    tribGrad.addColorStop(1, '#1e0a3c');
    ctx.fillStyle = tribGrad;
    ctx.fillRect(W*0.15, tribY, W*0.7, tribH);
    // Sağ tribün
    ctx.fillStyle = '#1a0a2e';
    ctx.fillRect(W*0.85, tribY, W*0.15, tribH);

    // Seyirciler
    S.crowd.forEach(p => {
      p.wave += 0.03;
      if (S.cheering) p.arm = Math.sin(p.wave) * 0.8;
      else p.arm = Math.sin(p.wave * 0.3) * 0.15;

      // Vücut
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.55, 0, Math.PI * 2);
      ctx.fill();
      // Kafa
      ctx.fillStyle = '#f0c080';
      ctx.beginPath();
      ctx.arc(p.x, p.y - p.size * 0.6, p.size * 0.38, 0, Math.PI * 2);
      ctx.fill();
      // Kol
      if (S.cheering) {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + Math.cos(p.wave)*p.size*1.2, p.y - p.size - Math.sin(p.wave)*p.size*1.2);
        ctx.stroke();
      }
    });

    // Arjantin bayrakları
    for (let i = 0; i < 8; i++) {
      const bx = 40 + i * 100;
      const by = tribY + 8 + Math.sin(t * 1.5 + i) * 4;
      // Sap
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(bx, by + 24);
      ctx.lineTo(bx, by);
      ctx.stroke();
      // Bayrak
      ctx.fillStyle = '#75aadb';
      ctx.fillRect(bx, by, 26, 16);
      ctx.fillStyle = '#fff';
      ctx.fillRect(bx + 8, by, 10, 16);
      ctx.fillStyle = '#75aadb';
      ctx.fillRect(bx + 9, by + 5, 8, 6);
    }

    // 4. ÇİM
    const grassY = H * 0.30;
    const grass = ctx.createLinearGradient(0, grassY, 0, H);
    grass.addColorStop(0, '#1a5c14');
    grass.addColorStop(0.4, '#1e6618');
    grass.addColorStop(1, '#0f3a0c');
    ctx.fillStyle = grass;
    ctx.fillRect(0, grassY, W, H - grassY);

    // Çim şeritleri
    for (let i = 0; i < 12; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.08)' : 'transparent';
      ctx.fillRect(i * (W/12), grassY, W/12, H - grassY);
    }

    // Saha çizgileri
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1.5;
    // Orta çizgi (perspektifli)
    ctx.beginPath();
    ctx.moveTo(0, H * 0.55);
    ctx.lineTo(W, H * 0.55);
    ctx.stroke();
    // Ceza sahası
    ctx.beginPath();
    ctx.rect(W*0.22, GOAL.y + GOAL.h - 10, W*0.56, H*0.28);
    ctx.stroke();
    // Penaltı noktası
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.beginPath();
    ctx.arc(W/2, H - 95, 4, 0, Math.PI*2);
    ctx.fill();
    // Penaltı yayı
    ctx.beginPath();
    ctx.arc(W/2, H - 95, 90, Math.PI*1.1, Math.PI*1.9, false);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.stroke();

    // 5. KALE ─ 3D perspektif
    const G = GOAL;
    // Arka ağ (üst)
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(G.x, G.y - 18, G.w, 18);
    // Kale direkleri
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.shadowColor = 'rgba(255,255,255,0.5)';
    ctx.shadowBlur = 6;
    // Sol direk
    ctx.beginPath();
    ctx.moveTo(G.x, G.y);
    ctx.lineTo(G.x, G.y + G.h);
    ctx.stroke();
    // Sağ direk
    ctx.beginPath();
    ctx.moveTo(G.x + G.w, G.y);
    ctx.lineTo(G.x + G.w, G.y + G.h);
    ctx.stroke();
    // Üst direk
    ctx.beginPath();
    ctx.moveTo(G.x, G.y);
    ctx.lineTo(G.x + G.w, G.y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Kale ağı
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 0.8;
    const shakeX = S.netShake * Math.sin(t * 20) * 2;
    const netCols = 16, netRows = 8;
    for (let c = 0; c <= netCols; c++) {
      ctx.beginPath();
      ctx.moveTo(G.x + c*(G.w/netCols) + (c/netCols)*shakeX, G.y);
      ctx.lineTo(G.x + c*(G.w/netCols) + shakeX, G.y + G.h);
      ctx.stroke();
    }
    for (let r = 0; r <= netRows; r++) {
      ctx.beginPath();
      ctx.moveTo(G.x + (r/netRows)*shakeX, G.y + r*(G.h/netRows));
      ctx.lineTo(G.x + G.w + shakeX, G.y + r*(G.h/netRows));
      ctx.stroke();
    }
    if (S.netShake > 0) S.netShake *= 0.92;

    // 6. SKOR TABELASI
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.beginPath();
    ctx.roundRect(W/2-90, 8, 180, 40, 8);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#75aadb';
    ctx.font = 'bold 10px Montserrat,sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('🇦🇷', W/2-80, 34);
    ctx.fillStyle = '#ff4444';
    ctx.textAlign = 'right';
    ctx.fillText('CR7 🇵🇹', W/2+82, 34);
    ctx.fillStyle = '#f8d000';
    ctx.font = 'bold 22px Montserrat,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${S.score.goals} – ${S.score.saves}`, W/2, 37);

    // Tur göstergesi
    for (let i = 0; i < S.totalRounds; i++) {
      ctx.beginPath();
      ctx.arc(W/2 - ((S.totalRounds-1)*10) + i*20, 58, 5, 0, Math.PI*2);
      ctx.fillStyle = i < S.round ? '#f8d000' : i === S.round ? '#75aadb' : 'rgba(255,255,255,0.2)';
      ctx.fill();
    }

    // 7. CR7 KALECİ
    const K = S.keeper;
    // Hareket yumuşatma
    K.x += (K.targetX - K.x) * 0.12;
    K.frame = (K.frame + 0.15) % (Math.PI * 2);

    const kx = K.x, ky = K.y;
    // Gölge
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(kx, ky+58, 22, 7, 0, 0, Math.PI*2);
    ctx.fill();

    // Bacaklar (Portekiz forması altı — yeşil şort)
    ctx.fillStyle = '#006600';
    ctx.fillRect(kx-14, ky+20, 12, 22);
    ctx.fillRect(kx+2, ky+20, 12, 22);
    // Çorap (kırmızı)
    ctx.fillStyle = '#cc0000';
    ctx.fillRect(kx-14, ky+40, 12, 16);
    ctx.fillRect(kx+2, ky+40, 12, 16);
    // Krampon
    ctx.fillStyle = '#111';
    ctx.fillRect(kx-16, ky+54, 14, 5);
    ctx.fillRect(kx+2, ky+54, 14, 5);

    // Gövde (kırmızı Portekiz forması)
    ctx.fillStyle = '#cc1212';
    ctx.beginPath();
    ctx.roundRect(kx-18, ky-20, 36, 42, 4);
    ctx.fill();
    // CR7 yazısı
    ctx.fillStyle = '#f8d000';
    ctx.font = 'bold 9px Montserrat,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CR7', kx, ky+2);

    // Kollar
    const armWave = K.state === 'idle' ? Math.sin(K.frame) * 0.2 : K.state === 'diving' ? (K.targetX < W/2 ? -1.2 : 1.2) : 0;
    // Sol kol
    ctx.strokeStyle = '#cc1212';
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(kx-16, ky-10);
    ctx.lineTo(kx-30 + Math.cos(Math.PI + armWave)*22, ky-10 + Math.sin(Math.PI + armWave)*22);
    ctx.stroke();
    // Sağ kol
    ctx.beginPath();
    ctx.moveTo(kx+16, ky-10);
    ctx.lineTo(kx+30 + Math.cos(armWave)*22, ky-10 + Math.sin(armWave)*22);
    ctx.stroke();
    // Eldivenler
    ctx.fillStyle = '#ff6600';
    ctx.beginPath();
    ctx.arc(kx-30 + Math.cos(Math.PI + armWave)*22, ky-10 + Math.sin(Math.PI + armWave)*22, 8, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(kx+30 + Math.cos(armWave)*22, ky-10 + Math.sin(armWave)*22, 8, 0, Math.PI*2);
    ctx.fill();

    // Kafa
    ctx.fillStyle = '#f0c080';
    ctx.beginPath();
    ctx.arc(kx, ky-30, 16, 0, Math.PI*2);
    ctx.fill();
    // Saç
    ctx.fillStyle = '#1a0800';
    ctx.beginPath();
    ctx.arc(kx, ky-38, 14, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(kx-8, ky-40, 16, 10);
    // Yüz
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(kx-5, ky-30, 2.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(kx+5, ky-30, 2.5, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#a0522d';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(kx, ky-24, 5, 0, Math.PI);
    ctx.stroke();
    // CR7 isim
    ctx.fillStyle = '#f8d000';
    ctx.font = 'bold 8px Montserrat,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('RONALDO', kx, ky+70);

    // 8. TOP
    const B = S.ball;
    if (S.phase === 'flying' || S.phase === 'result') {
      // Fizik güncelle
      if (S.phase === 'flying') {
        B.x += B.vx;
        B.y += B.vy;
        B.z += B.vz;
        B.vz -= 0.18; // yerçekimi
        B.vy -= 0.04;
        B.rot += B.vx * 0.05;
        // Spin etkisi
        B.vx += S.spin * 0.04;
        // Hedefe ulaşım kontrolü
        if (B.z <= 0 && B.y < GOAL.y + GOAL.h) {
          S.phase = 'result';
          setPhase('result');
          // Gol/Kurtarma hesapla
          const inGoal = B.x > GOAL.x+10 && B.x < GOAL.x+GOAL.w-10 && B.y > GOAL.y+10 && B.y < GOAL.y+GOAL.h-10;
          const keeperDist = Math.hypot(B.x - K.x, B.y - K.y);
          const caught = keeperDist < 45;
          const isPost = (B.x < GOAL.x + 8 || B.x > GOAL.x + GOAL.w - 8) && inGoal;

          let res;
          if (!inGoal) res = 'wide';
          else if (isPost) res = 'post';
          else if (caught) res = 'save';
          else res = 'goal';

          S.result = res;
          S.resultTimer = 0;
          setResult(res);

          if (res === 'goal') { S.netShake = 1; S.cheering = true; setCrowdCheer(true); setTimeout(() => { S.cheering = false; setCrowdCheer(false); }, 2500); }

          const newScore = {
            goals: S.score.goals + (res === 'goal' ? 1 : 0),
            saves: S.score.saves + (res !== 'goal' ? 1 : 0),
          };
          S.score = newScore;
          setScore({ ...newScore });
        }
      }
    }

    // Top çizimi
    const bSize = S.phase === 'aim' ? 16 : Math.max(8, 16 - B.z * 0.08);
    // Gölge
    const shadowSize = bSize * (1 - B.z * 0.005);
    ctx.fillStyle = `rgba(0,0,0,${Math.max(0, 0.3 - B.z * 0.002)})`;
    ctx.beginPath();
    ctx.ellipse(S.phase === 'aim' ? BALL_START.x : B.x, S.phase === 'aim' ? BALL_START.y : H - 75, shadowSize * 1.2, shadowSize * 0.4, 0, 0, Math.PI*2);
    ctx.fill();
    // Top
    const bx2 = S.phase === 'aim' ? BALL_START.x : B.x;
    const by2 = S.phase === 'aim' ? BALL_START.y : B.y;
    ctx.save();
    ctx.translate(bx2, by2);
    ctx.rotate(S.phase === 'aim' ? 0 : B.rot);
    // Beyaz daire
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(0, 0, bSize, 0, Math.PI*2);
    ctx.fill();
    // Siyah pentagonlar (basit)
    ctx.fillStyle = '#111';
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + B.rot;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * bSize * 0.5, Math.sin(a) * bSize * 0.5, bSize * 0.28, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    // Top parlaması
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.beginPath();
    ctx.arc(bx2 - bSize*0.3, by2 - bSize*0.3, bSize*0.28, 0, Math.PI*2);
    ctx.fill();

    // 9. MESSİ (önde, büyük)
    const mx = W/2, my = H - 30;
    // Gölge
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(mx, my+2, 30, 9, 0, 0, Math.PI*2);
    ctx.fill();

    const kick = S.kickAnim;
    if (S.kickAnim > 0) S.kickAnim -= 0.05;

    // Bacaklar (büyük)
    // Sol bacak
    ctx.fillStyle = '#111';
    ctx.fillRect(mx-20, my-60, 17, 35);
    ctx.fillStyle = '#75aadb';
    ctx.fillRect(mx-20, my-25, 17, 20);
    // Sağ bacak — tekme atıyor
    ctx.save();
    ctx.translate(mx+3, my-55);
    ctx.rotate(-kick * 0.8);
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, 17, 35);
    ctx.fillStyle = '#75aadb';
    ctx.fillRect(0, 35, 17, 20);
    ctx.fillStyle = '#f8d000';
    ctx.fillRect(-2, 52, 21, 8);
    ctx.restore();
    // Sol krampon
    ctx.fillStyle = '#222';
    ctx.fillRect(mx-22, my-8, 19, 8);

    // Gövde (Arjantin forması - büyük)
    const bodyGrad = ctx.createLinearGradient(mx-25, my-110, mx+25, my-110);
    bodyGrad.addColorStop(0, '#75aadb');
    bodyGrad.addColorStop(0.33, '#75aadb');
    bodyGrad.addColorStop(0.33, '#fff');
    bodyGrad.addColorStop(0.66, '#fff');
    bodyGrad.addColorStop(0.66, '#75aadb');
    bodyGrad.addColorStop(1, '#75aadb');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.roundRect(mx-25, my-105, 50, 50, 6);
    ctx.fill();
    ctx.fillStyle = '#0a1628';
    ctx.font = 'bold 11px Montserrat,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('10', mx, my-80);

    // Kollar
    ctx.strokeStyle = '#75aadb';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(mx-22, my-98);
    ctx.lineTo(mx-40, my-80 - kick*10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mx+22, my-98);
    ctx.lineTo(mx+38, my-75 + kick*8);
    ctx.stroke();

    // Kafa
    ctx.fillStyle = '#f0c080';
    ctx.beginPath();
    ctx.arc(mx, my-122, 22, 0, Math.PI*2);
    ctx.fill();
    // Saç
    ctx.fillStyle = '#2d1500';
    ctx.beginPath();
    ctx.arc(mx, my-132, 20, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(mx-12, my-138, 24, 14);
    // Yüz
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(mx-7, my-122, 3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(mx+7, my-122, 3, 0, Math.PI*2); ctx.fill();
    // İsim
    ctx.fillStyle = '#75aadb';
    ctx.font = 'bold 9px Montserrat,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🇦🇷 MESSİ #10', mx, my+14);

    // 10. NİŞAN GÖSTERGESI (aim fazında)
    if (S.phase === 'aim') {
      // Nişangah
      const ax = S.aimX, ay = S.aimY;
      ctx.strokeStyle = `rgba(248,208,0,${0.6 + Math.sin(t*4)*0.3})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ax, ay, 18, 0, Math.PI*2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ax-28, ay); ctx.lineTo(ax-20, ay);
      ctx.moveTo(ax+20, ay); ctx.lineTo(ax+28, ay);
      ctx.moveTo(ax, ay-28); ctx.lineTo(ax, ay-20);
      ctx.moveTo(ax, ay+20); ctx.lineTo(ax, ay+28);
      ctx.stroke();
      // Nokta
      ctx.fillStyle = '#f8d000';
      ctx.beginPath();
      ctx.arc(ax, ay, 3, 0, Math.PI*2);
      ctx.fill();
      // Bölge etiketi
      const zone = getZoneLabel(ax, ay);
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.beginPath();
      ctx.roundRect(ax - 40, ay + 22, 80, 18, 4);
      ctx.fill();
      ctx.fillStyle = '#f8d000';
      ctx.font = '9px Montserrat,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(zone, ax, ay + 34);
    }

    // 11. PARÇACIKAR (GOL efekti)
    S.particles = S.particles.filter(p => p.life > 0);
    S.particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.life -= 2;
      ctx.globalAlpha = p.life / 100;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      ctx.globalAlpha = 1;
    });

    // 12. GOL / KURTARMA YAZISI
    if (S.phase === 'result' && S.result) {
      S.resultTimer++;
      const alpha = Math.min(1, S.resultTimer / 10);
      const bounce = Math.max(0, 1 - S.resultTimer * 0.008);
      const scale = 1 + bounce * 0.3;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(W/2, H/2 - 40);
      ctx.scale(scale, scale);

      const msg = S.result === 'goal' ? 'GOLAZO! ⚽' : S.result === 'save' ? 'CR7 KURTARDI! 🧤' : S.result === 'post' ? 'DİREK! 🏃' : 'AÇIK GITMEDI! ↗';
      const col = S.result === 'goal' ? '#00e87a' : S.result === 'post' ? '#f8d000' : '#ff4444';

      // Gölge
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.font = 'bold 42px Montserrat,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(msg, 2, 2);
      // Yazı
      ctx.fillStyle = col;
      ctx.shadowColor = col;
      ctx.shadowBlur = 20;
      ctx.fillText(msg, 0, 0);
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // GOL'de parçacık oluştur
    if (S.result === 'goal' && S.particles.length < 60 && S.resultTimer < 30) {
      for (let i = 0; i < 5; i++) {
        S.particles.push({
          x: B.x + (Math.random()-0.5)*60,
          y: B.y + (Math.random()-0.5)*40,
          vx: (Math.random()-0.5)*6,
          vy: -(Math.random()*6+2),
          color: ['#f8d000','#75aadb','#fff','#00e87a'][Math.floor(Math.random()*4)],
          size: 4+Math.random()*6,
          life: 80+Math.random()*40,
        });
      }
    }
  }, []);

  function getZoneLabel(x, y) {
    const G = GOAL;
    const col = x < G.x + G.w/3 ? 'Sol' : x < G.x + G.w*2/3 ? 'Orta' : 'Sağ';
    const row = y < G.y + G.h/3 ? 'Üst' : y < G.y + G.h*2/3 ? 'Orta' : 'Alt';
    return col === 'Orta' && row === 'Orta' ? 'Ortası' : `${col} ${row}`;
  }

  const canvasRef = useCanvas(draw, [draw]);

  // ── MOUSE / TOUCH HAREKET ──
  const handleMouseMove = useCallback(e => {
    if (stateRef.current.phase !== 'aim') return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scaleX = W / rect.width, scaleY = H / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    // Sadece kale içinde
    const G = GOAL;
    if (x > G.x-10 && x < G.x+G.w+10 && y > G.y-10 && y < G.y+G.h+10) {
      stateRef.current.aimX = Math.min(G.x+G.w-5, Math.max(G.x+5, x));
      stateRef.current.aimY = Math.min(G.y+G.h-5, Math.max(G.y+5, y));
    }
  }, []);

  // ── GÜÇ BARI TIKLAMA DURUM MAKİNESİ ──
  const [uiPhase, setUiPhase] = useState('aim');
  const [powerVal, setPowerVal] = useState(0);
  const [spinVal, setSpinVal] = useState(0);
  const powerIv = useRef(null);
  const spinIv = useRef(null);
  const pDir = useRef(1);
  const sDir = useRef(1);

  useEffect(() => {
    if (uiPhase === 'power') {
      pDir.current = 1;
      powerIv.current = setInterval(() => {
        setPowerVal(p => {
          let n = p + pDir.current * 2.8;
          if (n >= 100) { pDir.current = -1; return 100; }
          if (n <= 0) { pDir.current = 1; return 0; }
          return n;
        });
      }, 25);
    } else {
      clearInterval(powerIv.current);
    }
    return () => clearInterval(powerIv.current);
  }, [uiPhase]);

  useEffect(() => {
    if (uiPhase === 'spin') {
      sDir.current = 1;
      spinIv.current = setInterval(() => {
        setSpinVal(s => {
          let n = s + sDir.current * 0.035;
          if (n >= 1) { sDir.current = -1; return 1; }
          if (n <= -1) { sDir.current = 1; return -1; }
          return n;
        });
      }, 25);
    } else {
      clearInterval(spinIv.current);
    }
    return () => clearInterval(spinIv.current);
  }, [uiPhase]);

  const handleCanvasClick = useCallback(() => {
    const S = stateRef.current;
    if (S.phase === 'aim') {
      setUiPhase('power');
      S.phase = 'power';
      setPhase('power');
    } else if (S.phase === 'power') {
      clearInterval(powerIv.current);
      S.power = powerVal;
      setUiPhase('spin');
      S.phase = 'spin';
      setPhase('spin');
    } else if (S.phase === 'spin') {
      clearInterval(spinIv.current);
      S.spin = spinVal;
      launchBall(S);
    }
  }, [powerVal, spinVal]);

  function launchBall(S) {
    const cfg = DIFF_CFG[S.difficulty];
    const tx = S.aimX, ty = S.aimY;
    const dist = Math.hypot(tx - BALL_START.x, ty - BALL_START.y);
    const speed = (S.power / 100) * 22 * cfg.speed;
    const frames = Math.max(18, dist / speed);

    S.ball.x = BALL_START.x;
    S.ball.y = BALL_START.y;
    S.ball.z = 0;
    S.ball.vx = (tx - BALL_START.x) / frames;
    S.ball.vy = (ty - BALL_START.y) / frames;
    S.ball.vz = (S.power / 100) * 8 + 3;
    S.ball.rot = 0;
    S.spin = spinVal;
    S.phase = 'flying';
    S.kickAnim = 1;
    setPhase('flying');
    setUiPhase('flying');

    // CR7 kaleci hareketi
    setTimeout(() => {
      if (Math.random() < cfg.accuracy) {
        S.keeper.targetX = tx < W*0.4 ? GOAL.x + 60 : tx > W*0.6 ? GOAL.x + GOAL.w - 60 : W/2;
      } else {
        S.keeper.targetX = tx < W/2 ? GOAL.x + GOAL.w - 80 : GOAL.x + 80;
      }
      S.keeper.state = 'diving';
    }, cfg.react);
  }

  const handleNextRound = useCallback(() => {
    const S = stateRef.current;
    const newRound = S.round + 1;
    S.round = newRound;
    setRound(newRound);

    if (newRound >= S.totalRounds) {
      setScreen('gameover');
      return;
    }

    // Reset
    S.phase = 'aim';
    S.result = null;
    S.resultTimer = 0;
    S.ball = { x: BALL_START.x, y: BALL_START.y, z: 0, vx:0,vy:0,vz:0,rot:0 };
    S.keeper = { x: KEEPER_START.x, y: KEEPER_START.y, targetX: KEEPER_START.x, state: 'idle', frame: 0 };
    S.particles = [];
    S.netShake = 0;
    S.aimX = W/2; S.aimY = GOAL.y + GOAL.h/2;
    setPhase('aim');
    setUiPhase('aim');
    setResult(null);
    setPowerVal(0);
    setSpinVal(0);
  }, []);

  const startGame = () => {
    const S = stateRef.current;
    S.round = 0;
    S.score = { goals: 0, saves: 0 };
    S.totalRounds = totalRounds;
    S.difficulty = difficulty;
    S.phase = 'aim';
    S.result = null;
    S.ball = { x: BALL_START.x, y: BALL_START.y, z: 0, vx:0,vy:0,vz:0,rot:0 };
    S.keeper = { x: KEEPER_START.x, y: KEEPER_START.y, targetX: KEEPER_START.x, state: 'idle', frame: 0 };
    S.particles = [];
    setRound(0);
    setScore({ goals: 0, saves: 0 });
    setPhase('aim');
    setUiPhase('aim');
    setResult(null);
    setPowerVal(0);
    setSpinVal(0);
    setScreen('game');
  };

  // ── MENÜ EKRANI ──
  if (screen === 'menu') return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{ position:'fixed',inset:0,zIndex:9985,background:'radial-gradient(ellipse at 50% 70%,#1e5218,#0a1628)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat,sans-serif',gap:22 }}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'clamp(26px,5vw,46px)',fontWeight:900,color:'#fff',letterSpacing:'-0.02em'}}>🇦🇷 MESSİ <span style={{color:'#f8d000'}}>vs</span> CR7 🇵🇹</div>
        <div style={{fontSize:12,color:'rgba(255,255,255,0.35)',marginTop:4,letterSpacing:'0.12em'}}>PENALTİ DÜELLOSU</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        <div style={{fontSize:9,fontWeight:900,letterSpacing:'0.15em',color:'rgba(255,255,255,0.35)'}}>ZORLUK</div>
        <div style={{display:'flex',gap:8}}>
          {[['easy','KOLAY','#00e87a'],['medium','ORTA','#f8d000'],['hard','ZOR','#ff4444']].map(([k,l,c])=>(
            <button key={k} onClick={()=>setDifficulty(k)}
              style={{padding:'8px 20px',borderRadius:'999px',border:`2px solid ${difficulty===k?c:'rgba(255,255,255,0.12)'}`,background:difficulty===k?c+'22':'transparent',color:difficulty===k?c:'rgba(255,255,255,0.4)',fontSize:11,fontWeight:900,cursor:'pointer',fontFamily:'Montserrat',transition:'all 0.2s',letterSpacing:'0.06em'}}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        <div style={{fontSize:9,fontWeight:900,letterSpacing:'0.15em',color:'rgba(255,255,255,0.35)'}}>KAÇ PENALTİ?</div>
        <div style={{display:'flex',gap:8}}>
          {[3,5,10].map(n=>(
            <button key={n} onClick={()=>setTotalRounds(n)}
              style={{width:48,height:48,borderRadius:'50%',border:`2px solid ${totalRounds===n?'#f8d000':'rgba(255,255,255,0.12)'}`,background:totalRounds===n?'rgba(248,208,0,0.15)':'transparent',color:totalRounds===n?'#f8d000':'rgba(255,255,255,0.35)',fontSize:16,fontWeight:900,cursor:'pointer',fontFamily:'Montserrat',transition:'all 0.2s'}}>
              {n}
            </button>
          ))}
        </div>
      </div>
      <motion.button onClick={startGame} whileHover={{scale:1.05,boxShadow:'0 8px 32px rgba(248,208,0,0.5)'}} whileTap={{scale:0.97}}
        style={{background:'#f8d000',color:'#0a1628',fontSize:15,fontWeight:900,padding:'14px 44px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.08em'}}>
        BAŞLA ⚽
      </motion.button>
      <div style={{fontSize:10,color:'rgba(255,255,255,0.2)',textAlign:'center',lineHeight:1.9,letterSpacing:'0.08em'}}>
        Fare ile kaleye nişan al → Tıkla (Güç) → Tıkla (Spin) → Tıkla (ŞUT!)
      </div>
      <button onClick={onClose} style={{position:'absolute',top:14,right:14,background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'5px 12px',color:'rgba(255,255,255,0.4)',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'Montserrat'}}>✕ ÇIKIŞ</button>
    </motion.div>
  );

  // ── GAME OVER ──
  if (screen === 'gameover') return (
    <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
      style={{ position:'fixed',inset:0,zIndex:9985,background:'radial-gradient(ellipse at 50% 60%,#1e5218,#071220)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat,sans-serif',gap:20 }}>
      <div style={{fontSize:'clamp(20px,4vw,36px)',fontWeight:900,color:'#fff',textAlign:'center'}}>
        {score.goals > score.saves ? '🏆 MESSİ KAZANDI!' : score.goals === score.saves ? '🤝 BERABERLİK!' : '😤 CR7 KAZANDI!'}
      </div>
      <div style={{display:'flex',gap:48,textAlign:'center',margin:'8px 0'}}>
        <div><div style={{fontSize:56,fontWeight:900,color:'#00e87a',lineHeight:1}}>{score.goals}</div><div style={{fontSize:10,color:'rgba(255,255,255,0.35)',letterSpacing:'0.1em',marginTop:4}}>GOL</div></div>
        <div style={{fontSize:40,fontWeight:900,color:'rgba(255,255,255,0.15)',alignSelf:'center'}}>–</div>
        <div><div style={{fontSize:56,fontWeight:900,color:'#ff4444',lineHeight:1}}>{score.saves}</div><div style={{fontSize:10,color:'rgba(255,255,255,0.35)',letterSpacing:'0.1em',marginTop:4}}>KURTARMA</div></div>
      </div>
      <div style={{fontSize:12,color:'rgba(255,255,255,0.3)',letterSpacing:'0.1em'}}>
        İsabet: {Math.round((score.goals/totalRounds)*100)}% • {totalRounds} Penaltı
      </div>
      <div style={{display:'flex',gap:10,marginTop:8}}>
        <motion.button onClick={startGame} whileHover={{scale:1.05,boxShadow:'0 6px 24px rgba(248,208,0,0.5)'}} whileTap={{scale:0.97}}
          style={{background:'#f8d000',color:'#0a1628',fontSize:13,fontWeight:900,padding:'12px 28px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.06em'}}>
          TEKRAR ⚽
        </motion.button>
        <motion.button onClick={()=>setScreen('menu')} whileHover={{scale:1.03}} whileTap={{scale:0.97}}
          style={{background:'rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.5)',fontSize:13,fontWeight:700,padding:'12px 22px',borderRadius:'999px',border:'1px solid rgba(255,255,255,0.12)',cursor:'pointer',fontFamily:'Montserrat'}}>
          MENÜ
        </motion.button>
      </div>
      <button onClick={onClose} style={{position:'absolute',top:14,right:14,background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'5px 12px',color:'rgba(255,255,255,0.4)',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'Montserrat'}}>✕</button>
    </motion.div>
  );

  // ── OYUN EKRANI ──
  const pColor = powerVal > 75 ? '#ff4444' : powerVal > 45 ? '#f8d000' : '#75aadb';

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{ position:'fixed',inset:0,zIndex:9985,background:'#071220',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat,sans-serif' }}>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={W} height={H}
        onMouseMove={handleMouseMove}
        onClick={phase==='result' ? undefined : handleCanvasClick}
        style={{ width:'min(800px,100vw)', height:'auto', display:'block', cursor: phase==='aim'?'crosshair':phase==='result'?'default':'pointer', borderRadius:'0 0 8px 8px' }}
      />

      {/* Alt kontrol */}
      <div style={{ width:'min(800px,100vw)',background:'rgba(0,0,0,0.7)',backdropFilter:'blur(12px)',borderTop:'1px solid rgba(255,255,255,0.08)',padding:'10px 20px 14px' }}>

        {uiPhase === 'aim' && (
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:11,fontWeight:900,letterSpacing:'0.12em',color:'rgba(255,255,255,0.45)',marginBottom:2}}>🎯 FAREYİ KALE İÇİNDE HAREKET ETTİR — TIKLAYINCA GÜÇ BAŞLAR</div>
            <div style={{fontSize:9,color:'rgba(255,255,255,0.2)',letterSpacing:'0.08em'}}>Köşeleri hedefle! CR7 akıllı kaleci...</div>
          </div>
        )}

        {uiPhase === 'power' && (
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{fontSize:10,fontWeight:900,color:pColor,whiteSpace:'nowrap',letterSpacing:'0.08em'}}>⚡ GÜÇ</div>
            <div style={{flex:1,background:'rgba(255,255,255,0.06)',borderRadius:'999px',height:14,overflow:'hidden',position:'relative',cursor:'pointer'}} onClick={handleCanvasClick}>
              <motion.div style={{height:'100%',width:`${powerVal}%`,background:`linear-gradient(90deg,#75aadb,${pColor})`,borderRadius:'999px'}} />
              {powerVal > 85 && <div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(90deg,transparent,transparent 6px,rgba(255,50,50,0.2) 6px,rgba(255,50,50,0.2) 10px)'}} />}
            </div>
            <div style={{fontSize:15,fontWeight:900,color:pColor,minWidth:42,textAlign:'right'}}>{Math.round(powerVal)}%</div>
            <div style={{fontSize:9,color:'rgba(255,255,255,0.3)',whiteSpace:'nowrap',letterSpacing:'0.06em'}}>TIKLA → SPİN</div>
          </div>
        )}

        {uiPhase === 'spin' && (
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{fontSize:10,fontWeight:900,color:'#75aadb',whiteSpace:'nowrap',letterSpacing:'0.08em'}}>🌀 EFEKT</div>
            <div style={{flex:1,background:'rgba(255,255,255,0.06)',borderRadius:'999px',height:14,overflow:'hidden',position:'relative',cursor:'pointer'}} onClick={handleCanvasClick}>
              <div style={{position:'absolute',left:'50%',top:0,bottom:0,width:2,background:'rgba(255,255,255,0.3)',transform:'translateX(-50%)'}} />
              <motion.div style={{
                position:'absolute',height:'100%',
                left: spinVal<0 ? `${50+spinVal*50}%` : '50%',
                width: `${Math.abs(spinVal)*50}%`,
                background: spinVal<0 ? 'linear-gradient(90deg,#75aadb,rgba(117,170,219,0.3))' : 'linear-gradient(90deg,rgba(248,208,0,0.3),#f8d000)',
                borderRadius:'999px',
              }} />
            </div>
            <div style={{fontSize:12,fontWeight:900,color:Math.abs(spinVal)>0.3?(spinVal<0?'#75aadb':'#f8d000'):'rgba(255,255,255,0.3)',minWidth:55,textAlign:'right',whiteSpace:'nowrap'}}>
              {spinVal<-0.3?'← Sol':spinVal>0.3?'Sağ →':'▲ Düz'}
            </div>
            <div style={{fontSize:9,color:'rgba(255,255,255,0.3)',whiteSpace:'nowrap',letterSpacing:'0.06em'}}>TIKLA → ŞUT!</div>
          </div>
        )}

        {uiPhase === 'flying' && (
          <div style={{textAlign:'center',fontSize:14,fontWeight:900,color:'#f8d000',letterSpacing:'0.12em'}}>
            ⚡ TOP FIRLADI!
          </div>
        )}

        {uiPhase === 'result' && (
          <div style={{display:'flex',justifyContent:'center',gap:10}}>
            {round + 1 < totalRounds ? (
              <motion.button onClick={handleNextRound}
                whileHover={{scale:1.05,boxShadow:'0 6px 24px rgba(248,208,0,0.5)'}} whileTap={{scale:0.97}}
                style={{background:'#f8d000',color:'#0a1628',fontSize:13,fontWeight:900,padding:'10px 28px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.06em'}}>
                SONRAKI ⚽ ({round+1}/{totalRounds})
              </motion.button>
            ) : (
              <motion.button onClick={()=>setScreen('gameover')}
                whileHover={{scale:1.05}} whileTap={{scale:0.97}}
                style={{background:'#f8d000',color:'#0a1628',fontSize:13,fontWeight:900,padding:'10px 28px',borderRadius:'999px',border:'none',cursor:'pointer',fontFamily:'Montserrat',letterSpacing:'0.06em'}}>
                SONUCU GÖR 🏆
              </motion.button>
            )}
            <motion.button onClick={()=>setScreen('menu')} whileHover={{scale:1.03}} whileTap={{scale:0.97}}
              style={{background:'rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.5)',fontSize:13,fontWeight:700,padding:'10px 18px',borderRadius:'999px',border:'1px solid rgba(255,255,255,0.12)',cursor:'pointer',fontFamily:'Montserrat'}}>
              MENÜ
            </motion.button>
          </div>
        )}
      </div>

      <button onClick={onClose} style={{position:'absolute',top:10,right:12,background:'rgba(0,0,0,0.5)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'5px 12px',color:'rgba(255,255,255,0.4)',fontSize:11,fontWeight:700,cursor:'pointer',fontFamily:'Montserrat',zIndex:10}}>✕ ÇIKIŞ</button>
    </motion.div>
  );
}
