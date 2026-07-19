import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Star, Users, Calendar, Heart, Shield, Zap, CheckCircle } from 'lucide-react';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'rgba(255,255,255,0.92)', whiteMid:'rgba(255,255,255,0.65)', whiteLow:'rgba(255,255,255,0.3)' };
const PHOTO = 'https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/71e533503d331149fe73f8e165f13f5b.png';

const stats = [
  { icon:Users, n:'500+', l:'Mutlu Öğrenci', color:'#00e87a' },
  { icon:Calendar, n:'8+', l:'Yıl Deneyim', color:G.gold },
  { icon:Award, n:'4', l:'Sertifika', color:'#75aadb' },
  { icon:Star, n:'5.0', l:'Google Puanı', color:'#ffd166' },
];

const certs = [
  { label:'Balanced Body® Mat Pilates 1 & 2', year:'2016', icon:'🏅' },
  { label:'Balanced Body® Reformer 1, 2 & 3', year:'2017', icon:'🏅' },
  { label:'Hamile Pilatesi Uzmanlık Programı', year:'2019', icon:'🤱' },
  { label:'Postür Bozuklukları & Rehabilitasyon', year:'2021', icon:'💚' },
];

const values = [
  { icon:Heart, title:'Kişiye Özel Yaklaşım', desc:'Her öğrencinin vücudu farklı. Program herkese ayrı hazırlanır.' },
  { icon:Shield, title:'Güvenli Ortam', desc:'Doğru teknik her şeyden önce gelir. Hız değil, kalite.' },
  { icon:Zap, title:'Görünür Sonuçlar', desc:'4-6 hafta içinde postür ve enerji seviyenizde fark edilir değişim.' },
  { icon:Star, title:'Sürekli Gelişim', desc:'Her yıl yeni eğitimlerle güncel ve etkili içerik.' },
];

const timeline = [
  { year:'2016', title:'Pilates Yolculuğu Başladı', desc:'Balanced Body® Mat Pilates sertifikası ile ilk adım.' },
  { year:'2017', title:'Reformer Uzmanlığı', desc:'Reformer eğitimlerini tamamlayarak alet pilatesi derslerine başladı.' },
  { year:'2019', title:'Hamile Pilatesi', desc:'Hamile öğrencilere özel sertifika programını bitirdi.' },
  { year:'2021', title:'Stüdyo Açıldı', desc:'Beşiktaş\'ta kendi stüdyosunu kurdu, 500+ öğrenciye ulaştı.' },
  { year:'2026', title:'Hâlâ Büyüyoruz', desc:'Online derslerle Türkiye geneline yayılan aktif topluluk.' },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('hikaye');

  return (
    <>
      <Helmet>
        <title>Hakkımda | Gizem Hoca - Certified Pilates Eğitmeni Beşiktaş</title>
        <meta name="description" content="Balanced Body® sertifikalı pilates eğitmeni Gizem Hoca hakkında. 8+ yıl deneyim, 500+ öğrenci, Beşiktaş İstanbul stüdyosu." />
      </Helmet>
      <div style={{ background:G.bg, fontFamily:'Montserrat,sans-serif', minHeight:'100vh' }}>

        {/* Hero */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'460px', borderBottom:`1px solid ${G.goldBorder}` }} className="about-split">
          {/* Sol: metin */}
          <div style={{ padding:'clamp(32px,5vw,56px) clamp(16px,4vw,40px)', display:'flex', flexDirection:'column', justifyContent:'space-between', borderRight:`1px solid ${G.goldBorder}` }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
                <div style={{ width:'28px', height:'2px', background:G.gold }} />
                <span style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.2em', color:G.gold }}>GİZEM HOCA PİLATES</span>
              </div>
              <h1 style={{ fontSize:'clamp(40px,7vw,68px)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', lineHeight:0.88, marginBottom:'20px' }}>
                Merhaba,<br />ben <span style={{ color:G.gold }}>Gizem.</span>
              </h1>
              <p style={{ fontSize:'15px', color:G.whiteMid, lineHeight:1.8, maxWidth:'440px', marginBottom:'24px' }}>
                Hareketin ve sağlığın hayatımızdaki dönüştürücü gücüne inanıyorum. 8 yıldır pilates eğitmeniyim, 500'den fazla öğrenciye kendi bedenlerini yeniden keşfettirdim.
              </p>
              <blockquote style={{ fontSize:'16px', fontStyle:'italic', color:G.white, borderLeft:`3px solid ${G.gold}`, paddingLeft:'16px', marginBottom:'28px', lineHeight:1.6 }}>
                "Pilates bir egzersiz değil, yaşam felsefesidir."
              </blockquote>
              <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                <Link to="/iletisim"
                  style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:G.gold, color:G.bg, fontSize:'13px', fontWeight:900, padding:'12px 24px', borderRadius:'999px', textDecoration:'none', letterSpacing:'0.06em', boxShadow:'0 4px 20px rgba(212,175,55,0.3)' }}>
                  Ücretsiz Ders Al <ArrowRight size={14} />
                </Link>
                <Link to="/quiz"
                  style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'transparent', border:`1px solid rgba(212,175,55,0.3)`, color:G.whiteMid, fontSize:'13px', fontWeight:700, padding:'12px 20px', borderRadius:'999px', textDecoration:'none' }}>
                  🎯 Seviye Testim
                </Link>
              </div>
            </div>
          </div>

          {/* Sağ: fotoğraf */}
          <div style={{ position:'relative', overflow:'hidden', minHeight:'360px' }}>
            <img src={PHOTO} alt="Gizem Hoca Pilates Eğitmeni"
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', filter:'brightness(0.7) saturate(0.85)' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(13,27,62,0.4) 0%, transparent 50%, rgba(13,27,62,0.6) 100%)' }} />
            {/* Floating badges */}
            <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4 }}
              style={{ position:'absolute', top:'20px', right:'20px', background:'rgba(7,16,41,0.9)', backdropFilter:'blur(12px)', border:`1px solid ${G.goldBorder}`, borderRadius:'14px', padding:'14px 18px', textAlign:'center' }}>
              <div style={{ fontSize:'28px', fontWeight:900, color:G.gold }}>500+</div>
              <div style={{ fontSize:'10px', color:G.whiteMid, fontWeight:700, letterSpacing:'0.08em' }}>MUTLU ÖĞRENCİ</div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.6 }}
              style={{ position:'absolute', bottom:'20px', right:'20px', background:'rgba(7,16,41,0.9)', backdropFilter:'blur(12px)', border:`1px solid rgba(212,175,55,0.3)`, borderRadius:'14px', padding:'12px 16px', display:'flex', alignItems:'center', gap:'10px' }}>
              <div style={{ color:'#ffd166', fontSize:'16px' }}>★★★★★</div>
              <div>
                <div style={{ fontSize:'14px', fontWeight:900, color:'#fff' }}>5.0</div>
                <div style={{ fontSize:'10px', color:G.whiteMid }}>47 yorum</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* İstatistikler */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:`1px solid ${G.goldBorder}` }} className="services-grid">
          {stats.map((s,i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} whileHover={{ background:'rgba(212,175,55,0.05)' }}
                initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                style={{ padding:'28px 20px', textAlign:'center', borderRight:i<3?`1px solid ${G.goldBorder}`:'none', transition:'background 0.2s' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:`${s.color}18`, border:`1px solid ${s.color}33`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
                  <Icon size={20} style={{ color:s.color }} />
                </div>
                <div style={{ fontSize:'clamp(24px,4vw,36px)', fontWeight:900, color:s.color }}>{s.n}</div>
                <div style={{ fontSize:'11px', fontWeight:700, letterSpacing:'0.1em', color:G.whiteLow, marginTop:'5px' }}>{s.l.toUpperCase()}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs: Hikaye / Sertifikalar / Değerler */}
        <div style={{ borderBottom:`1px solid ${G.goldBorder}` }}>
          <div style={{ display:'flex', borderBottom:`1px solid ${G.goldBorder}` }}>
            {[['hikaye','📖 Hikayem'],['sertifika','🏅 Sertifikalar'],['degerler','💎 Değerlerim'],['yolculuk','🗓 Yolculuk']].map(([key,label]) => (
              <button key={key} onClick={() => setActiveTab(key)}
                style={{ padding:'14px 22px', fontSize:'12px', fontWeight:900, letterSpacing:'0.06em', border:'none', borderRight:`1px solid ${G.goldBorder}`, cursor:'pointer', fontFamily:'Montserrat', background: activeTab===key ? 'rgba(212,175,55,0.1)' : 'transparent', color: activeTab===key ? G.gold : G.whiteMid, borderBottom: activeTab===key ? `2px solid ${G.gold}` : '2px solid transparent', transition:'all 0.2s' }}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ padding:'clamp(24px,4vw,40px) clamp(16px,4vw,40px)' }}>

            {/* Hikayem */}
            {activeTab === 'hikaye' && (
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ maxWidth:'680px' }}>
                <p style={{ fontSize:'15px', color:G.whiteMid, lineHeight:1.9, marginBottom:'18px' }}>
                  Pilatesle tanışmam kendi bedenimi keşfetme arayışımla başladı. Kronik bel ağrısı yaşayan biri olarak farklı egzersiz yöntemlerini denedim — ama pilates bambaşka bir şeydi. Sadece ağrıyı geçirmedi; duruşumu, nefes alış şeklimi, kendimi taşıma biçimimi değiştirdi.
                </p>
                <p style={{ fontSize:'15px', color:G.whiteMid, lineHeight:1.9, marginBottom:'18px' }}>
                  Bu dönüşümü başkalarıyla da paylaşmak istedim. 2016'da eğitmenlik sertifikamı aldım, o tarihten bu yana her yaştan, her seviyeden 500'den fazla öğrenciye eşlik ettim.
                </p>
                <p style={{ fontSize:'15px', color:G.whiteMid, lineHeight:1.9, marginBottom:'28px' }}>
                  Derslerimde tek bir hedef var: her öğrencinin kendi vücuduyla barışması, güçlenmesi ve kendini iyi hissetmesi. Hız değil, doğruluk. Rekabet değil, kişisel gelişim.
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {['Mat Pilates','Reformer','Hamile Pilatesi','Postür & Rehabilitasyon','Nefes Teknikleri','Core Güçlendirme'].map(tag => (
                    <span key={tag} style={{ fontSize:'12px', fontWeight:700, border:`1px solid ${G.goldBorder}`, color:G.gold, padding:'6px 14px', borderRadius:'999px', background:G.goldFaint }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Sertifikalar */}
            {activeTab === 'sertifika' && (
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'12px' }}>
                  {certs.map((c,i) => (
                    <motion.div key={i} initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ delay:i*0.08 }}
                      whileHover={{ y:-3, borderColor:'rgba(212,175,55,0.45)' }}
                      style={{ background:'rgba(13,27,62,0.5)', backdropFilter:'blur(12px)', border:`1px solid ${G.goldBorder}`, borderRadius:'14px', padding:'20px', display:'flex', gap:'14px', alignItems:'flex-start', transition:'all 0.2s' }}>
                      <div style={{ fontSize:'28px', flexShrink:0 }}>{c.icon}</div>
                      <div>
                        <div style={{ fontSize:'13px', fontWeight:900, color:'#fff', lineHeight:1.35, marginBottom:'6px' }}>{c.label}</div>
                        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                          <CheckCircle size={12} style={{ color:'#00e87a' }} />
                          <span style={{ fontSize:'11px', fontWeight:700, color:G.gold }}>{c.year} · Onaylı Sertifika</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div style={{ marginTop:'20px', padding:'16px 20px', background:'rgba(0,232,122,0.06)', border:'1px solid rgba(0,232,122,0.2)', borderRadius:'12px', display:'flex', alignItems:'center', gap:'12px' }}>
                  <Shield size={18} style={{ color:'#00e87a', flexShrink:0 }} />
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.7)', margin:0, lineHeight:1.6 }}>
                    Tüm sertifikalar uluslararası geçerliliğe sahip Balanced Body® akreditasyonlu programlardan alınmıştır.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Değerler */}
            {activeTab === 'degerler' && (
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'12px' }}>
                {values.map((v,i) => {
                  const Icon = v.icon;
                  return (
                    <motion.div key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
                      whileHover={{ y:-3 }}
                      style={{ background:'rgba(13,27,62,0.5)', backdropFilter:'blur(12px)', border:`1px solid ${G.goldBorder}`, borderRadius:'14px', padding:'22px', transition:'all 0.2s' }}>
                      <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:G.goldFaint, border:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'14px' }}>
                        <Icon size={20} style={{ color:G.gold }} />
                      </div>
                      <div style={{ fontSize:'14px', fontWeight:900, color:'#fff', marginBottom:'8px' }}>{v.title}</div>
                      <div style={{ fontSize:'13px', color:G.whiteMid, lineHeight:1.65 }}>{v.desc}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Yolculuk */}
            {activeTab === 'yolculuk' && (
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} style={{ maxWidth:'560px' }}>
                {timeline.map((t,i) => (
                  <div key={i} style={{ display:'flex', gap:'20px', marginBottom:'0' }}>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                      <div style={{ width:'36px', height:'36px', borderRadius:'50%', background: i===timeline.length-1?G.gold:G.goldFaint, border:`2px solid ${G.gold}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <span style={{ fontSize:'11px', fontWeight:900, color: i===timeline.length-1?G.bg:G.gold }}>{t.year.slice(2)}</span>
                      </div>
                      {i < timeline.length-1 && <div style={{ width:'2px', flex:1, background:`linear-gradient(to bottom, ${G.gold}, rgba(212,175,55,0.1))`, margin:'4px 0', minHeight:'40px' }} />}
                    </div>
                    <div style={{ paddingBottom:'28px' }}>
                      <div style={{ fontSize:'11px', fontWeight:900, color:G.gold, letterSpacing:'0.1em', marginBottom:'4px' }}>{t.year}</div>
                      <div style={{ fontSize:'14px', fontWeight:900, color:'#fff', marginBottom:'5px' }}>{t.title}</div>
                      <div style={{ fontSize:'13px', color:G.whiteMid, lineHeight:1.6 }}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding:'clamp(24px,4vw,40px) clamp(16px,4vw,40px)', background:'rgba(212,175,55,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px' }}>
          <div>
            <h2 style={{ fontSize:'clamp(18px,3vw,24px)', fontWeight:900, color:'#fff', marginBottom:'6px' }}>Birlikte çalışalım ✦</h2>
            <p style={{ fontSize:'13px', color:G.whiteMid }}>İlk tanışma seansı ücretsiz. Hemen başlayalım.</p>
          </div>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
            <Link to="/fiyatlar" style={{ background:G.gold, color:G.bg, fontSize:'13px', fontWeight:900, padding:'12px 22px', borderRadius:'999px', display:'inline-flex', alignItems:'center', gap:'6px', textDecoration:'none' }}>
              Paketleri Gör <ArrowRight size={14} />
            </Link>
            <Link to="/quiz" style={{ background:'transparent', border:`1px solid rgba(212,175,55,0.3)`, color:G.whiteMid, fontSize:'13px', fontWeight:700, padding:'12px 20px', borderRadius:'999px', textDecoration:'none' }}>
              🎯 Seviye Testi
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
