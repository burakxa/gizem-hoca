import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, RotateCcw, Star, Zap, Heart, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'rgba(255,255,255,0.92)', whiteMid:'rgba(255,255,255,0.65)', whiteLow:'rgba(255,255,255,0.3)' };

const questions = [
  {
    q: 'Şu an nasıl hissediyorsun?',
    sub: 'Vücuduna dair en iyi anlatan seçeneği seç',
    opts: [
      { label:'Sırtım/boynuum ağrıyor', icon:'💆', tag:'rehab' },
      { label:'Kendimi yorgun & stresli hissediyorum', icon:'😮‍💨', tag:'wellness' },
      { label:'Daha güçlü & fit olmak istiyorum', icon:'💪', tag:'fitness' },
      { label:'Esnekliğimi ve dengemi geliştirmek istiyorum', icon:'🧘', tag:'flexibility' },
    ],
  },
  {
    q: 'Pilates deneyimin ne kadar?',
    sub: 'Dürüst ol — başlangıç da harika!',
    opts: [
      { label:'Hiç yapmadım', icon:'🌱', tag:'zero' },
      { label:'Birkaç kez denedim', icon:'🌿', tag:'beginner' },
      { label:'Birkaç aydır yapıyorum', icon:'🌳', tag:'intermediate' },
      { label:'1 yıldan fazla düzenli yapıyorum', icon:'🏆', tag:'advanced' },
    ],
  },
  {
    q: 'Haftada kaç gün zaman ayırabilirsin?',
    sub: 'Gerçekçi düşün, mükemmel program buna göre belirlenir',
    opts: [
      { label:'Haftada 1 gün', icon:'📅', tag:'low' },
      { label:'Haftada 2 gün', icon:'📆', tag:'medium' },
      { label:'Haftada 3 gün', icon:'🔥', tag:'high' },
      { label:'Haftada 4+ gün', icon:'⚡', tag:'intense' },
    ],
  },
  {
    q: 'Ders formatı tercihin?',
    sub: 'Hangi ortamda daha iyi öğrenirsin?',
    opts: [
      { label:'Birebir özel ders', icon:'🎯', tag:'individual' },
      { label:'Küçük grup (2-4 kişi)', icon:'👥', tag:'group' },
      { label:'Online (evden)', icon:'💻', tag:'online' },
      { label:'Henüz bilmiyorum', icon:'🤷', tag:'any' },
    ],
  },
  {
    q: 'Sana özel bir sorum var...',
    sub: 'Hangi tanımlar seni en iyi anlatıyor?',
    opts: [
      { label:'Hamile veya yeni doğum yaptım', icon:'🤱', tag:'prenatal' },
      { label:'Masa başı çalışıyorum', icon:'💼', tag:'desk' },
      { label:'Sporcu veya aktif yaşam tarzım var', icon:'🏃', tag:'athlete' },
      { label:'Yaş ile birlikte vücudum değişiyor', icon:'🌸', tag:'mature' },
    ],
  },
];

const results = {
  prenatal: {
    title: 'Hamile & Doğum Sonrası Pilates',
    desc: 'Uzman gözetiminde, bebeğin ve senin güvenliğin öncelik. Pelvik taban, nefes ve postür odaklı özel program.',
    package: 'Hamile Pilatesi Paketi',
    price: '₺2.800 / 8 seans',
    color: '#ff9fd4',
    icon: '🤱',
    features: ['Pelvik taban güçlendirme', 'Bel ağrısı yönetimi', 'Doğuma hazırlık', 'Doğum sonrası iyileşme'],
    whatsapp: 'Hamile pilatesi hakkında bilgi almak istiyorum',
  },
  rehab_individual: {
    title: 'Terapi Odaklı Bireysel Ders',
    desc: 'Ağrı ve postür sorunların için kişiye özel protokol. Birebir dikkat, en hızlı iyileşme.',
    package: 'Terapi Paketi',
    price: '₺3.200 / 8 seans',
    color: '#00e87a',
    icon: '💚',
    features: ['Postür analizi', 'Özel egzersiz protokolü', 'Haftalık ilerleme takibi', 'Ev egzersiz planı'],
    whatsapp: 'Sırt ağrısı için bireysel ders almak istiyorum',
  },
  online: {
    title: 'Online Pilates',
    desc: 'Evinden katıl, yerinden kıpırdama. Esnek saatler, kişisel program, aynı kalite.',
    package: 'Online Paket',
    price: '₺2.400 / 8 seans',
    color: '#75aadb',
    icon: '💻',
    features: ['Esnek saat seçimi', 'Video kayıt arşivi', 'Canlı geri bildirim', 'Mobil uyumlu'],
    whatsapp: 'Online ders almak istiyorum',
  },
  group: {
    title: 'Küçük Grup Dersi',
    desc: 'Grup enerjisi, bireysel ilgi. Maksimum 4 kişilik gruplarda sosyal ve motive bir ortam.',
    package: 'Grup Paketi',
    price: '₺1.800 / 8 seans',
    color: '#ffd166',
    icon: '👥',
    features: ['Max 4 kişi', 'Grup motivasyonu', 'Uygun fiyat', 'Sosyal ortam'],
    whatsapp: 'Grup dersi hakkında bilgi almak istiyorum',
  },
  reformer: {
    title: 'Reformer Pilates',
    desc: 'Profesyonel alet eğitimi. Daha hızlı sonuç, daha derin kas aktivasyonu.',
    package: 'Reformer Paketi',
    price: '₺3.600 / 8 seans',
    color: '#d4af37',
    icon: '⭐',
    features: ['Özel reformer aleti', 'Derin kas çalışması', 'Hızlı sonuç', 'Sporcu dostu'],
    whatsapp: 'Reformer pilates hakkında bilgi almak istiyorum',
  },
  individual: {
    title: 'Bireysel Ders',
    desc: 'Hedefin ve durumuna özel program. Tamamen sana odaklanılmış en etkili format.',
    package: 'Bireysel Paket',
    price: '₺3.200 / 8 seans',
    color: '#d4af37',
    icon: '🎯',
    features: ['Tamamen özel program', 'Hızlı ilerleme', 'Esnek saat', 'Kişisel takip'],
    whatsapp: 'Bireysel ders almak istiyorum',
  },
};

function getResult(answers) {
  if (answers[4] === 0) return 'prenatal';
  if (answers[0] === 0) return 'rehab_individual';
  if (answers[3] === 2) return 'online';
  if (answers[1] === 0 || answers[1] === 1) {
    if (answers[3] === 1) return 'group';
    return 'rehab_individual';
  }
  if (answers[4] === 2) return 'reformer';
  if (answers[3] === 0) return 'individual';
  if (answers[3] === 1) return 'group';
  return 'individual';
}

// Motivasyon mesajları
const motivations = [
  'Harika seçim! Devam edelim... 💪',
  'Mükemmel! Sana uygun programı buluyoruz... ✨',
  'Çok iyi! Neredeyse bitti... 🎯',
  'Son birkaç soru! 🌟',
  'Son soru! 🏆',
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [motivation, setMotivation] = useState('');

  const isResult = step > questions.length;
  const currentQ = questions[step - 1];
  const result = answers.length === questions.length ? results[getResult(answers)] : null;

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    setMotivation(motivations[step - 1] || '');
    setTimeout(() => setMotivation(''), 1200);
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step <= 1) { setStep(0); setAnswers([]); setSelected(null); return; }
    setAnswers(answers.slice(0, -1));
    setStep(step - 1);
    setSelected(null);
  };

  const reset = () => { setStep(0); setAnswers([]); setSelected(null); };

  return (
    <>
      <Helmet>
        <title>Pilates Seviye Testi | Sana Hangi Ders Uygun? | Gizem Hoca</title>
        <meta name="description" content="5 soruluk quiz ile sana en uygun pilates dersini bul. Ücretsiz, 2 dakika sürer!" />
      </Helmet>

      <div style={{ minHeight:'100vh', background:`radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.06) 0%, transparent 60%), ${G.bg}`, fontFamily:'Montserrat,sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 16px', position:'relative', overflow:'hidden' }}>

        {/* Arka plan deseni */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(212,175,55,0.07) 1px, transparent 1px)', backgroundSize:'32px 32px', pointerEvents:'none' }} />

        {/* Motivasyon toast */}
        <AnimatePresence>
          {motivation && (
            <motion.div initial={{ opacity:0, y:-20, scale:0.9 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-20 }}
              style={{ position:'fixed', top:'100px', left:'50%', transform:'translateX(-50%)', background:G.gold, color:G.bg, fontSize:'13px', fontWeight:900, padding:'10px 24px', borderRadius:'999px', zIndex:100, whiteSpace:'nowrap', boxShadow:'0 8px 24px rgba(212,175,55,0.4)' }}>
              {motivation}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">

          {/* Intro */}
          {step === 0 && (
            <motion.div key="intro" initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-24 }}
              style={{ maxWidth:'520px', width:'100%', textAlign:'center' }}>
              <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', delay:0.2 }}
                style={{ width:'88px', height:'88px', borderRadius:'24px', background:'rgba(212,175,55,0.12)', border:`1.5px solid rgba(212,175,55,0.3)`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', fontSize:'40px' }}>
                🎯
              </motion.div>
              <h1 style={{ fontSize:'clamp(28px,6vw,42px)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', marginBottom:'14px', lineHeight:1 }}>
                Sana Hangi Pilates<br /><span style={{ color:G.gold }}>Uygun?</span>
              </h1>
              <p style={{ fontSize:'15px', color:G.whiteMid, lineHeight:1.75, marginBottom:'32px', maxWidth:'380px', margin:'0 auto 32px' }}>
                5 kısa soru ile sana özel pilates programını belirliyoruz. Sadece 2 dakika!
              </p>

              {/* İstatistikler */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px', marginBottom:'32px' }}>
                {[['500+','Mutlu öğrenci'],['5 soru','Hızlı test'],['Ücretsiz','Tanışma seansı']].map(([n,l],i) => (
                  <div key={i} style={{ background:'rgba(212,175,55,0.07)', border:`1px solid ${G.goldBorder}`, borderRadius:'12px', padding:'14px 10px' }}>
                    <div style={{ fontSize:'18px', fontWeight:900, color:G.gold }}>{n}</div>
                    <div style={{ fontSize:'11px', color:G.whiteMid, marginTop:'3px' }}>{l}</div>
                  </div>
                ))}
              </div>

              <motion.button onClick={() => setStep(1)}
                whileHover={{ scale:1.04, boxShadow:'0 8px 30px rgba(212,175,55,0.45)' }} whileTap={{ scale:0.97 }}
                style={{ background:G.gold, color:G.bg, fontSize:'14px', fontWeight:900, padding:'15px 40px', borderRadius:'999px', border:'none', cursor:'pointer', fontFamily:'Montserrat', letterSpacing:'0.06em', display:'inline-flex', alignItems:'center', gap:'8px' }}>
                Teste Başla <ArrowRight size={16} />
              </motion.button>
              <div style={{ marginTop:'12px', fontSize:'11px', color:G.whiteLow }}>Ücretsiz · Kayıt gerekmez · 2 dakika</div>
            </motion.div>
          )}

          {/* Sorular */}
          {step >= 1 && step <= questions.length && (
            <motion.div key={`q${step}`} initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}
              style={{ maxWidth:'600px', width:'100%' }}>

              {/* Progress */}
              <div style={{ marginBottom:'32px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
                  <div style={{ display:'flex', gap:'6px' }}>
                    {questions.map((_,i) => (
                      <div key={i} style={{ width: i < step ? '24px' : '8px', height:'8px', borderRadius:'999px', background: i < step ? G.gold : 'rgba(212,175,55,0.2)', transition:'all 0.3s' }} />
                    ))}
                  </div>
                  <span style={{ fontSize:'12px', color:G.whiteLow }}>{step} / {questions.length}</span>
                </div>
              </div>

              <motion.h2 key={currentQ.q} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                style={{ fontSize:'clamp(20px,4vw,30px)', fontWeight:900, color:'#fff', letterSpacing:'-0.02em', marginBottom:'8px', lineHeight:1.15 }}>
                {currentQ.q}
              </motion.h2>
              <p style={{ fontSize:'13px', color:G.whiteMid, marginBottom:'24px' }}>{currentQ.sub}</p>

              {/* Seçenekler */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'28px' }}>
                {currentQ.opts.map((opt, i) => (
                  <motion.button key={i} onClick={() => setSelected(i)}
                    whileHover={{ y:-2, borderColor:'rgba(212,175,55,0.5)' }} whileTap={{ scale:0.98 }}
                    style={{
                      padding:'18px 16px', borderRadius:'14px',
                      border:`2px solid ${selected===i ? G.gold : 'rgba(212,175,55,0.2)'}`,
                      background: selected===i ? 'rgba(212,175,55,0.14)' : 'rgba(13,27,62,0.5)',
                      backdropFilter:'blur(8px)',
                      color: selected===i ? '#fff' : G.whiteMid,
                      cursor:'pointer', fontFamily:'Montserrat', textAlign:'left',
                      display:'flex', alignItems:'center', gap:'12px', transition:'all 0.15s',
                      boxShadow: selected===i ? '0 0 0 1px rgba(212,175,55,0.3), 0 4px 16px rgba(0,0,0,0.2)' : 'none',
                    }}>
                    <span style={{ fontSize:'26px', lineHeight:1, flexShrink:0 }}>{opt.icon}</span>
                    <span style={{ fontSize:'13px', fontWeight:selected===i?700:500, lineHeight:1.4 }}>{opt.label}</span>
                    {selected===i && (
                      <motion.div initial={{ scale:0 }} animate={{ scale:1 }} style={{ marginLeft:'auto', flexShrink:0 }}>
                        <CheckCircle size={18} style={{ color:G.gold }} />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Alt butonlar */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <button onClick={handleBack}
                  style={{ display:'flex', alignItems:'center', gap:'6px', background:'transparent', border:`1px solid rgba(212,175,55,0.2)`, color:G.whiteLow, fontSize:'12px', fontWeight:700, padding:'10px 18px', borderRadius:'999px', cursor:'pointer', fontFamily:'Montserrat', transition:'all 0.2s' }}>
                  <ArrowLeft size={13} /> Geri
                </button>
                <motion.button onClick={handleNext} disabled={selected===null}
                  whileHover={selected!==null ? { scale:1.03, boxShadow:'0 4px 20px rgba(212,175,55,0.35)' } : {}}
                  whileTap={selected!==null ? { scale:0.97 } : {}}
                  style={{ background: selected!==null ? G.gold : 'rgba(212,175,55,0.15)', color: selected!==null ? G.bg : 'rgba(212,175,55,0.35)', fontSize:'13px', fontWeight:900, padding:'12px 28px', borderRadius:'999px', border:'none', cursor: selected!==null ? 'pointer' : 'default', fontFamily:'Montserrat', display:'flex', alignItems:'center', gap:'6px', transition:'all 0.2s' }}>
                  {step === questions.length ? '🎯 Sonucu Gör' : 'Devam Et'} <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Sonuç */}
          {step > questions.length && result && (
            <motion.div key="result" initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }}
              style={{ maxWidth:'560px', width:'100%' }}>

              {/* Konfeti efekti */}
              <div style={{ textAlign:'center', marginBottom:'24px' }}>
                <motion.div initial={{ scale:0, rotate:-20 }} animate={{ scale:1, rotate:0 }}
                  transition={{ type:'spring', delay:0.1, stiffness:200 }}
                  style={{ width:'100px', height:'100px', borderRadius:'28px', background:`rgba(${result.color==='#d4af37'?'212,175,55':'0,232,122'},0.12)`, border:`2px solid ${result.color}40`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:'48px' }}>
                  {result.icon}
                </motion.div>
                <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
                  style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.2em', color:result.color, marginBottom:'10px' }}>
                  SANA ÖZEL ÖNERİMİZ
                </motion.div>
                <motion.h2 initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
                  style={{ fontSize:'clamp(22px,5vw,34px)', fontWeight:900, color:'#fff', letterSpacing:'-0.02em', marginBottom:'12px' }}>
                  {result.title}
                </motion.h2>
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
                  style={{ fontSize:'14px', color:G.whiteMid, lineHeight:1.7 }}>
                  {result.desc}
                </motion.p>
              </div>

              {/* Özellikler */}
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.45 }}
                style={{ background:'rgba(212,175,55,0.06)', border:`1px solid ${G.goldBorder}`, borderRadius:'14px', padding:'18px', marginBottom:'16px' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
                  {result.features.map((f,i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:G.white }}>
                      <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:result.color, flexShrink:0 }} />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Fiyat */}
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
                style={{ background:'rgba(212,175,55,0.08)', border:`1.5px solid rgba(212,175,55,0.3)`, borderRadius:'12px', padding:'14px 18px', marginBottom:'20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div>
                  <div style={{ fontSize:'11px', color:G.whiteMid, marginBottom:'2px' }}>{result.package}</div>
                  <div style={{ fontSize:'20px', fontWeight:900, color:G.gold }}>{result.price}</div>
                </div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', textAlign:'right' }}>
                  + İlk ders<br />ücretsiz 🎁
                </div>
              </motion.div>

              {/* CTA butonları */}
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55 }}
                style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                <a href={`https://wa.me/905383135720?text=Merhaba!%20${encodeURIComponent(result.whatsapp)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', background:G.gold, color:G.bg, fontSize:'14px', fontWeight:900, padding:'15px', borderRadius:'999px', textDecoration:'none', letterSpacing:'0.04em', boxShadow:'0 4px 24px rgba(212,175,55,0.4)' }}>
                  💬 WhatsApp'tan Randevu Al <ArrowRight size={15} />
                </a>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
                  <Link to="/fiyatlar"
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'transparent', border:`1px solid rgba(212,175,55,0.25)`, color:G.whiteMid, fontSize:'12px', fontWeight:700, padding:'12px', borderRadius:'999px', textDecoration:'none' }}>
                    Fiyatlar
                  </Link>
                  <button onClick={reset}
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'transparent', border:`1px solid rgba(255,255,255,0.12)`, color:G.whiteLow, fontSize:'12px', fontWeight:700, padding:'12px', borderRadius:'999px', cursor:'pointer', fontFamily:'Montserrat' }}>
                    <RotateCcw size={13} /> Tekrarla
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </>
  );
}
