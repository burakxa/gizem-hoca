import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'rgba(255,255,255,0.92)', whiteMid:'rgba(255,255,255,0.65)' };

const questions = [
  {
    q: 'Pilates deneyimin nedir?',
    opts: ['Hiç yapmadım', 'Birkaç kez denedim', '1 yıldan az', '1 yıldan fazla'],
    icons: ['🌱','🌿','🌳','🏆'],
  },
  {
    q: 'Temel hedefiniz ne?',
    opts: ['Sırt/boyun ağrısı', 'Kilo vermek', 'Güçlenmek', 'Esneklik & denge'],
    icons: ['💆','⚖️','💪','🧘'],
  },
  {
    q: 'Haftada kaç gün ayırabilirsin?',
    opts: ['1 gün', '2 gün', '3 gün', '4+ gün'],
    icons: ['1️⃣','2️⃣','3️⃣','🔥'],
  },
  {
    q: 'Tercih ettiğin ders formatı?',
    opts: ['Bireysel (1\'e 1)', 'Küçük grup', 'Online', 'Hepsini denerim'],
    icons: ['🧑','👥','💻','✨'],
  },
  {
    q: 'Bütçe tercihin?',
    opts: ['Uygun fiyatlı', 'Orta bütçe', 'Kaliteyi ön planda tutarım', 'Henüz karar vermedim'],
    icons: ['💚','💛','💎','🤔'],
  },
];

const results = {
  beginner_group: {
    title: 'Başlangıç Grup Dersi',
    desc: 'Pilates\'e yeni başlayanlar için harika başlangıç. Küçük grup ortamında motivasyonlu öğren.',
    package: 'Grup Paketi — 8 seans ₺1.800',
    color: '#00e87a',
    icon: '👥',
  },
  individual: {
    title: 'Bireysel Ders',
    desc: 'Hedefin ve durumuna özel program. En hızlı ilerleme bireysel dersle olur.',
    package: 'Bireysel Paket — 8 seans ₺3.200',
    color: '#d4af37',
    icon: '⭐',
  },
  online: {
    title: 'Online Ders',
    desc: 'Evinden veya ofisinden katıl. Esnek saatler, kişisel program.',
    package: 'Online Paket — 8 seans ₺2.400',
    color: '#75aadb',
    icon: '💻',
  },
  reformer: {
    title: 'Reformer Pilates',
    desc: 'Profesyonel alet eğitimi. Güçlenmek ve form için en etkili yöntem.',
    package: 'Reformer Paketi — 8 seans ₺3.600',
    color: '#ff69b4',
    icon: '🏋',
  },
};

function getResult(answers) {
  if (answers[2] === 0 || answers[2] === 1) {
    if (answers[3] === 2) return 'online';
    return 'beginner_group';
  }
  if (answers[1] === 2 || answers[1] === 0) return 'reformer';
  if (answers[3] === 0) return 'individual';
  if (answers[3] === 2) return 'online';
  return 'individual';
}

export default function QuizPage() {
  const [step, setStep] = useState(0); // 0=intro, 1-5=sorular, 6=sonuç
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (step >= questions.length) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step <= 1) { setStep(0); setAnswers([]); setSelected(null); return; }
    setAnswers(answers.slice(0, -1));
    setStep(step - 1);
    setSelected(null);
  };

  const result = answers.length === questions.length ? results[getResult(answers)] : null;

  return (
    <>
      <Helmet>
        <title>Pilates Seviye Testi | Sana Hangi Ders Uygun? | Gizem Hoca</title>
        <meta name="description" content="5 soruluk quiz ile sana en uygun pilates dersini bul. Başlangıç, bireysel, grup veya online — hemen öğren!" />
      </Helmet>
      <div style={{ minHeight:'100vh', background:G.bg, fontFamily:'Montserrat,sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 16px' }}>

        {/* İntro */}
        {step === 0 && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{ maxWidth:'480px', width:'100%', textAlign:'center' }}>
            <div style={{ fontSize:'48px', marginBottom:'16px' }}>🎯</div>
            <h1 style={{ fontSize:'clamp(24px,5vw,36px)', fontWeight:900, color:'#fff', letterSpacing:'-0.02em', marginBottom:'14px' }}>
              Sana Hangi Pilates<br /><span style={{ color:G.gold }}>Uygun?</span>
            </h1>
            <p style={{ fontSize:'15px', color:G.whiteMid, lineHeight:1.7, marginBottom:'28px' }}>
              5 kısa soruyla sana en uygun ders tipini buluyoruz. 2 dakika sürer!
            </p>
            <motion.button onClick={() => setStep(1)}
              whileHover={{ scale:1.04, boxShadow:'0 6px 24px rgba(212,175,55,0.4)' }} whileTap={{ scale:0.97 }}
              style={{ background:G.gold, color:G.bg, fontSize:'14px', fontWeight:900, padding:'14px 36px', borderRadius:'999px', border:'none', cursor:'pointer', fontFamily:'Montserrat', letterSpacing:'0.06em' }}>
              Teste Başla <ArrowRight size={16} style={{ verticalAlign:'middle', marginLeft:'4px' }} />
            </motion.button>
            <div style={{ marginTop:'16px', fontSize:'12px', color:'rgba(255,255,255,0.3)' }}>Ücretsiz · Kayıt gerekmez</div>
          </motion.div>
        )}

        {/* Sorular */}
        {step >= 1 && step <= questions.length && (
          <motion.div key={step} initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-30 }}
            style={{ maxWidth:'560px', width:'100%' }}>

            {/* Progress */}
            <div style={{ marginBottom:'28px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                <span style={{ fontSize:'12px', color:G.gold, fontWeight:900 }}>Soru {step} / {questions.length}</span>
                <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.35)' }}>{Math.round((step/questions.length)*100)}%</span>
              </div>
              <div style={{ background:'rgba(212,175,55,0.15)', borderRadius:'999px', height:'4px' }}>
                <motion.div initial={{ width:0 }} animate={{ width:`${(step/questions.length)*100}%` }}
                  style={{ height:'100%', background:G.gold, borderRadius:'999px', transition:'width 0.4s' }} />
              </div>
            </div>

            <h2 style={{ fontSize:'clamp(18px,4vw,26px)', fontWeight:900, color:'#fff', marginBottom:'24px', letterSpacing:'-0.01em' }}>
              {questions[step-1].q}
            </h2>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'28px' }}>
              {questions[step-1].opts.map((opt, i) => (
                <motion.button key={i} onClick={() => setSelected(i)}
                  whileHover={{ y:-2 }} whileTap={{ scale:0.98 }}
                  style={{
                    padding:'16px 14px', borderRadius:'12px', border:`2px solid ${selected===i ? G.gold : 'rgba(212,175,55,0.2)'}`,
                    background: selected===i ? 'rgba(212,175,55,0.15)' : G.goldFaint,
                    color: selected===i ? G.gold : G.whiteMid,
                    fontSize:'14px', fontWeight: selected===i ? 700 : 400,
                    cursor:'pointer', fontFamily:'Montserrat', textAlign:'left',
                    display:'flex', alignItems:'center', gap:'10px', transition:'all 0.15s',
                  }}>
                  <span style={{ fontSize:'20px' }}>{questions[step-1].icons[i]}</span>
                  <span>{opt}</span>
                  {selected===i && <CheckCircle size={16} style={{ marginLeft:'auto', color:G.gold, flexShrink:0 }} />}
                </motion.button>
              ))}
            </div>

            <div style={{ display:'flex', gap:'10px', justifyContent:'space-between' }}>
              <button onClick={handleBack}
                style={{ display:'flex', alignItems:'center', gap:'6px', background:'transparent', border:`1px solid rgba(212,175,55,0.2)`, color:'rgba(255,255,255,0.5)', fontSize:'13px', fontWeight:700, padding:'10px 18px', borderRadius:'999px', cursor:'pointer', fontFamily:'Montserrat' }}>
                <ArrowLeft size={14} /> Geri
              </button>
              <motion.button onClick={handleNext} disabled={selected===null}
                whileHover={selected!==null ? { scale:1.03 } : {}} whileTap={selected!==null ? { scale:0.97 } : {}}
                style={{ background: selected!==null ? G.gold : 'rgba(212,175,55,0.2)', color: selected!==null ? G.bg : 'rgba(212,175,55,0.4)', fontSize:'13px', fontWeight:900, padding:'10px 24px', borderRadius:'999px', border:'none', cursor: selected!==null ? 'pointer' : 'default', fontFamily:'Montserrat', display:'flex', alignItems:'center', gap:'6px', transition:'all 0.2s' }}>
                {step === questions.length ? 'Sonucu Gör 🎯' : 'Devam Et'} <ArrowRight size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Sonuç */}
        {step > questions.length && result && (
          <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
            style={{ maxWidth:'480px', width:'100%', textAlign:'center' }}>
            <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', delay:0.2 }}
              style={{ fontSize:'56px', marginBottom:'16px' }}>{result.icon}</motion.div>
            <div style={{ fontSize:'12px', fontWeight:900, letterSpacing:'0.15em', color:result.color, marginBottom:'10px' }}>
              SANA EN UYGUN DERS
            </div>
            <h2 style={{ fontSize:'clamp(22px,5vw,34px)', fontWeight:900, color:'#fff', letterSpacing:'-0.02em', marginBottom:'14px' }}>
              {result.title}
            </h2>
            <p style={{ fontSize:'15px', color:G.whiteMid, lineHeight:1.7, marginBottom:'20px' }}>{result.desc}</p>

            <div style={{ background:G.goldFaint, border:`1px solid ${G.goldBorder}`, borderRadius:'12px', padding:'16px', marginBottom:'24px' }}>
              <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', marginBottom:'4px' }}>Önerilen paket</div>
              <div style={{ fontSize:'15px', fontWeight:900, color:G.gold }}>{result.package}</div>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              <a href={`https://wa.me/905383135720?text=Merhaba! ${result.title} hakkında bilgi almak istiyorum.`}
                target="_blank" rel="noopener noreferrer"
                style={{ display:'block', background:G.gold, color:G.bg, fontSize:'14px', fontWeight:900, padding:'14px', borderRadius:'999px', textDecoration:'none', letterSpacing:'0.06em', boxShadow:'0 4px 20px rgba(212,175,55,0.35)' }}>
                💬 WhatsApp'tan Randevu Al
              </a>
              <Link to="/fiyatlar"
                style={{ display:'block', background:'transparent', border:`1px solid rgba(212,175,55,0.3)`, color:'rgba(255,255,255,0.65)', fontSize:'13px', fontWeight:700, padding:'12px', borderRadius:'999px', textDecoration:'none' }}>
                Tüm Paketleri Gör
              </Link>
              <button onClick={() => { setStep(0); setAnswers([]); setSelected(null); }}
                style={{ background:'none', border:'none', color:'rgba(255,255,255,0.35)', fontSize:'12px', cursor:'pointer', fontFamily:'Montserrat', marginTop:'4px' }}>
                Testi Tekrarla
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
