import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { MessageCircle, Plus, CheckCircle, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'rgba(255,255,255,0.92)', whiteMid:'rgba(255,255,255,0.65)', whiteLow:'rgba(255,255,255,0.3)' };

const plans = [
  {
    name:'BAŞLANGIÇ', emoji:'🌱', sub:'Pilatesle tanışmak için',
    price:{ b:'800', g:'400' }, sessions:'4 Ders', period:'ay',
    features:['Haftada 1 ders','Mat pilates','Temel eğitim','Duruş analizi','WhatsApp destek'],
    color:'#00e87a',
  },
  {
    name:'DÜZENLİ', emoji:'⭐', sub:'En çok tercih edilen',
    price:{ b:'1.400', g:'700' }, sessions:'8 Ders', period:'ay',
    features:['Haftada 2 ders','Mat + Reformer','Kişisel program','İlerleme takibi','WhatsApp destek','Ev egzersiz planı'],
    color:G.gold, popular:true,
  },
  {
    name:'YOĞUN', emoji:'🔥', sub:'Hızlı dönüşüm için',
    price:{ b:'2.200', g:'1.100' }, sessions:'12 Ders', period:'ay',
    features:['Haftada 3 ders','Tüm ekipmanlar','Tam kişisel program','Öncelikli randevu','Beslenme önerileri','Aylık değerlendirme'],
    color:'#ff9fd4',
  },
];

const faqs = [
  { q:'Deneme dersi var mı?', a:'Evet! İlk tanışma seansı tamamen ücretsiz. Hiçbir taahhüt olmaksızın pilatesle tanışma fırsatı.' },
  { q:'Ders iptal politikası nedir?', a:'Ders saatinden 24 saat önce bildirim yapıldığında ücretsiz iptal veya erteleme. 24 saatten az süre kala iptallerde ders hakkı kullanılmış sayılır.' },
  { q:'Grup dersleri kaç kişilik?', a:'Maksimum 4 kişilik tutulmaktadır. Bu sayede her öğrenciye bireysel ilgi gösterilebilir.' },
  { q:'Paketlerin geçerlilik süresi?', a:'Satın alma tarihinden itibaren 3 ay. Sağlık nedeniyle kullanılamaması durumunda esneklik sağlanır.' },
  { q:'Online ders yüz yüze kadar etkili mi?', a:'Evet! Kamera üzerinden hareketi net görebiliyor ve anlık düzeltme yapabiliyorum. Aynı kişisel ilgi devam ediyor.' },
  { q:'Ödeme seçenekleri neler?', a:'Nakit, havale/EFT ve kredi kartı (peşin) kabul edilmektedir.' },
];

const guarantees = [
  { icon:Shield, title:'İlk Ders Ücretsiz', desc:'Hiçbir risk yok. Beğenmezsen ödeme yok.' },
  { icon:Star, title:'5.0 Google Puanı', desc:'47 gerçek öğrenci değerlendirmesi.' },
  { icon:Zap, title:'24 Saat İptal', desc:'Esnek takvim, hayat değişir anlıyoruz.' },
];

export default function FiyatlarPage() {
  const [type, setType] = useState('b');
  const [openFaq, setOpenFaq] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <Helmet>
        <title>Pilates Fiyatları 2026 Maltepe | Uygun Paketler | Gizem Hoca</title>
        <meta name="description" content="Maltepe pilates ders ücretleri ve paketleri 2026. Bireysel, grup ve online pilates fiyatları. İlk tanışma seansı ücretsiz. Sırt ağrısı için özel pilates." />
        <link rel="canonical" href="https://gizemhoca.net/fiyatlar" />
      </Helmet>
      <div style={{ background:G.bg, fontFamily:'Montserrat,sans-serif', minHeight:'100vh' }}>

        {/* Hero başlık */}
        <div style={{ padding:'clamp(28px,5vw,48px) clamp(16px,4vw,40px)', borderBottom:`1px solid ${G.goldBorder}`, background:`linear-gradient(180deg, rgba(212,175,55,0.05) 0%, transparent 100%)` }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
            <div style={{ width:'28px', height:'2px', background:G.gold }} />
            <span style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.2em', color:G.gold }}>FİYATLAR & PAKETLER</span>
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'20px' }}>
            <div>
              <h1 style={{ fontSize:'clamp(36px,7vw,60px)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', lineHeight:0.9, marginBottom:'12px' }}>
                Sana Uygun<br /><span style={{ color:G.gold }}>Paketi Bul</span>
              </h1>
              <p style={{ fontSize:'14px', color:G.whiteMid, maxWidth:'400px', lineHeight:1.7 }}>
                Şeffaf fiyatlar, esnek paketler. İlk ders her zaman ücretsiz.
              </p>
            </div>

            {/* Bireysel / Grup toggle */}
            <div style={{ background:'rgba(212,175,55,0.08)', border:`1px solid ${G.goldBorder}`, borderRadius:'14px', padding:'6px' }}>
              {[['b','Bireysel'],['g','Grup']].map(([key,label]) => (
                <button key={key} onClick={() => setType(key)}
                  style={{ padding:'10px 22px', borderRadius:'12px', border:'none', cursor:'pointer', fontFamily:'Montserrat', fontSize:'13px', fontWeight:900, letterSpacing:'0.04em', transition:'all 0.2s', background:type===key?G.gold:'transparent', color:type===key?G.bg:G.whiteMid }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ücretsiz ders banner */}
        <div style={{ padding:'14px clamp(16px,4vw,40px)', background:'rgba(212,175,55,0.07)', borderBottom:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ fontSize:'22px' }}>🎁</span>
            <div>
              <span style={{ fontSize:'14px', fontWeight:900, color:G.gold }}>İlk Tanışma Seansı Tamamen Ücretsiz!</span>
              <span style={{ fontSize:'13px', color:G.whiteMid, marginLeft:'10px' }}>Paket almadan önce pilatesle tanış.</span>
            </div>
          </div>
          <a href="https://wa.me/905383135720?text=Merhaba!%20Ücretsiz%20tanışma%20seansı%20almak%20istiyorum."
            target="_blank" rel="noopener noreferrer"
            style={{ background:G.gold, color:G.bg, fontSize:'12px', fontWeight:900, padding:'9px 20px', borderRadius:'999px', textDecoration:'none', letterSpacing:'0.05em', whiteSpace:'nowrap' }}>
            Ücretsiz Ders Al →
          </a>
        </div>

        {/* Paketler */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', borderBottom:`1px solid ${G.goldBorder}` }} className="price-grid">
          {plans.map((plan,i) => (
            <motion.div key={plan.name}
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
              onHoverStart={() => setHovered(i)} onHoverEnd={() => setHovered(null)}
              style={{ padding:'clamp(20px,3vw,36px)', borderRight:i<2?`1px solid ${G.goldBorder}`:'none', display:'flex', flexDirection:'column', position:'relative', background: hovered===i||plan.popular?`${plan.color}08`:'transparent', transition:'background 0.2s', borderTop:plan.popular?`3px solid ${plan.color}`:'3px solid transparent' }}>
              {plan.popular && (
                <motion.span initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.3 }}
                  style={{ fontSize:'10px', fontWeight:900, letterSpacing:'0.1em', background:G.gold, color:G.bg, padding:'4px 12px', borderRadius:'999px', alignSelf:'flex-start', marginBottom:'14px' }}>
                  EN POPÜLER ✦
                </motion.span>
              )}
              <div style={{ fontSize:'28px', marginBottom:'10px' }}>{plan.emoji}</div>
              <div style={{ fontSize:'12px', fontWeight:900, letterSpacing:'0.12em', color:plan.color, marginBottom:'3px' }}>{plan.name}</div>
              <div style={{ fontSize:'13px', color:G.whiteMid, marginBottom:'20px' }}>{plan.sub}</div>

              <AnimatePresence mode="wait">
                <motion.div key={type} initial={{ opacity:0, y:5 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-5 }}
                  style={{ marginBottom:'6px' }}>
                  <span style={{ fontSize:'clamp(36px,5vw,52px)', fontWeight:900, color:'#fff' }}>₺{plan.price[type]}</span>
                  <span style={{ fontSize:'13px', color:G.whiteMid, marginLeft:'5px' }}>/ay</span>
                </motion.div>
              </AnimatePresence>
              <div style={{ fontSize:'12px', fontWeight:900, letterSpacing:'0.06em', color:plan.color, marginBottom:'24px', display:'flex', alignItems:'center', gap:'6px' }}>
                <span style={{ background:`${plan.color}18`, border:`1px solid ${plan.color}33`, padding:'3px 10px', borderRadius:'999px' }}>{plan.sessions}</span>
              </div>

              <ul style={{ listStyle:'none', padding:0, flex:1, marginBottom:'24px', display:'flex', flexDirection:'column', gap:'9px' }}>
                {plan.features.map((f,j) => (
                  <li key={j} style={{ display:'flex', alignItems:'center', gap:'9px', fontSize:'13px', color:G.whiteMid }}>
                    <CheckCircle size={14} style={{ color:plan.color, flexShrink:0 }} /> {f}
                  </li>
                ))}
              </ul>

              <a href={`https://wa.me/905383135720?text=${encodeURIComponent(`Merhaba! "${plan.name}" paketi (${type==='b'?'Bireysel':'Grup'}) hakkında bilgi almak istiyorum.`)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', padding:'13px', borderRadius:'999px', fontSize:'13px', fontWeight:900, letterSpacing:'0.04em', cursor:'pointer', textDecoration:'none', background:plan.popular?G.gold:'transparent', color:plan.popular?G.bg:plan.color, border:`1.5px solid ${plan.popular?G.gold:plan.color+'55'}`, transition:'all 0.2s', boxShadow:plan.popular?'0 4px 20px rgba(212,175,55,0.3)':'none' }}>
                <MessageCircle size={14} /> Bilgi Al
              </a>
            </motion.div>
          ))}
        </div>

        {/* Güvenceler */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', borderBottom:`1px solid ${G.goldBorder}` }} className="services-grid">
          {guarantees.map((g,i) => {
            const Icon = g.icon;
            return (
              <div key={i} style={{ padding:'22px', textAlign:'center', borderRight:i<2?`1px solid ${G.goldBorder}`:'none' }}>
                <div style={{ width:'40px', height:'40px', borderRadius:'12px', background:G.goldFaint, border:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px' }}>
                  <Icon size={18} style={{ color:G.gold }} />
                </div>
                <div style={{ fontSize:'13px', fontWeight:900, color:'#fff', marginBottom:'4px' }}>{g.title}</div>
                <div style={{ fontSize:'12px', color:G.whiteMid }}>{g.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Karşılaştırma tablosu */}
        <div style={{ padding:'clamp(24px,4vw,40px) clamp(16px,4vw,40px)', borderBottom:`1px solid ${G.goldBorder}`, background:G.dark }}>
          <div style={{ textAlign:'center', marginBottom:'24px' }}>
            <div style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.18em', color:G.gold, marginBottom:'8px' }}>DETAYLI KARŞILAŞTIRMA</div>
            <h2 style={{ fontSize:'clamp(20px,4vw,28px)', fontWeight:900, color:'#fff', letterSpacing:'-0.02em' }}>Hangi Format Sana Uygun?</h2>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', minWidth:'500px' }}>
              <thead>
                <tr>
                  <th style={{ padding:'12px 16px', textAlign:'left', fontSize:'12px', color:G.whiteLow, borderBottom:`1px solid ${G.goldBorder}`, fontWeight:600 }}>Özellik</th>
                  {[['Grup','#00e87a'],['Bireysel',G.gold],['Online','#75aadb'],['Reformer','#ff9fd4']].map(([p,c]) => (
                    <th key={p} style={{ padding:'12px 16px', textAlign:'center', fontSize:'13px', color:p==='Bireysel'?G.gold:'#fff', borderBottom:`1px solid ${G.goldBorder}`, fontWeight:900, background:p==='Bireysel'?'rgba(212,175,55,0.08)':'transparent' }}>
                      {p}{p==='Bireysel'&&<span style={{ display:'block', fontSize:'11px', color:G.gold, marginTop:'3px' }}>⭐ POPÜLER</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Fiyat (8 seans)','₺1.800','₺3.200','₺2.400','₺3.600'],
                  ['Kişi başı','4 kişi','Sadece sen','Sadece sen','4 kişi'],
                  ['Esneklik','⭐⭐','⭐⭐⭐','⭐⭐⭐⭐⭐','⭐⭐'],
                  ['Kişisel program','❌','✅','✅','✅'],
                  ['Ekipman','Mat','Mat/Reformer','Mat (evde)','Reformer'],
                  ['İlk ders ücretsiz','✅','✅','✅','✅'],
                ].map(([feat,...vals],i) => (
                  <tr key={i} style={{ background:i%2===0?'rgba(212,175,55,0.03)':'transparent' }}>
                    <td style={{ padding:'12px 16px', fontSize:'13px', color:G.whiteMid, borderBottom:`1px solid rgba(212,175,55,0.08)` }}>{feat}</td>
                    {vals.map((v,j) => (
                      <td key={j} style={{ padding:'12px 16px', textAlign:'center', fontSize:'13px', color:j===1?G.gold:G.whiteMid, borderBottom:`1px solid rgba(212,175,55,0.08)`, background:j===1?'rgba(212,175,55,0.05)':'transparent', fontWeight:j===1?700:400 }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SSS */}
        <div style={{ padding:'clamp(24px,4vw,40px) clamp(16px,4vw,40px)', borderBottom:`1px solid ${G.goldBorder}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
            <div style={{ width:'22px', height:'2px', background:G.gold }} />
            <span style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.15em', color:G.gold }}>SIK SORULAN SORULAR</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0' }} className="content-grid">
            {faqs.map((faq,i) => (
              <div key={i} style={{ borderBottom:`1px solid ${G.goldBorder}`, borderRight:i%2===0?`1px solid ${G.goldBorder}`:'none', padding:'0 clamp(0px,2vw,24px)' }}>
                <button onClick={() => setOpenFaq(openFaq===i?null:i)}
                  style={{ width:'100%', textAlign:'left', padding:'16px 0', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'16px', background:'none', border:'none', cursor:'pointer', fontFamily:'Montserrat' }}>
                  <span style={{ fontSize:'13px', fontWeight:700, color:openFaq===i?G.gold:'#fff', transition:'color 0.2s', lineHeight:1.4 }}>{faq.q}</span>
                  <motion.div animate={{ rotate:openFaq===i?45:0 }} transition={{ duration:0.2 }} style={{ flexShrink:0, width:'24px', height:'24px', borderRadius:'50%', background:openFaq===i?'rgba(212,175,55,0.15)':'rgba(212,175,55,0.07)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Plus size={13} style={{ color:G.gold }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq===i && (
                    <motion.p initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
                      style={{ fontSize:'13px', color:G.whiteMid, paddingBottom:'16px', lineHeight:1.75, margin:0, overflow:'hidden' }}>
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Alt CTA */}
        <div style={{ padding:'clamp(24px,4vw,40px) clamp(16px,4vw,40px)', background:'rgba(212,175,55,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px' }}>
          <div>
            <h2 style={{ fontSize:'clamp(18px,3vw,24px)', fontWeight:900, color:'#fff', marginBottom:'6px' }}>Hâlâ kararsız mısın?</h2>
            <p style={{ fontSize:'13px', color:G.whiteMid }}>5 soruluk testimizi dene — sana uygun paketi bulalım.</p>
          </div>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
            <Link to="/quiz" style={{ background:G.gold, color:G.bg, fontSize:'13px', fontWeight:900, padding:'12px 22px', borderRadius:'999px', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'6px' }}>
              🎯 Seviye Testi <ArrowRight size={14} />
            </Link>
            <a href="https://wa.me/905383135720" target="_blank" rel="noopener noreferrer"
              style={{ background:'transparent', border:`1px solid rgba(212,175,55,0.3)`, color:G.whiteMid, fontSize:'13px', fontWeight:700, padding:'12px 20px', borderRadius:'999px', textDecoration:'none' }}>
              💬 WhatsApp'tan Sor
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
