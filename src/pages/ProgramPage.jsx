import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { MessageCircle, Clock, Users, Monitor, ChevronLeft, ChevronRight, ArrowRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'rgba(255,255,255,0.92)', whiteMid:'rgba(255,255,255,0.65)', whiteLow:'rgba(255,255,255,0.3)' };

const days = ['Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
const dayShort = { 'Pazartesi':'Pzt','Salı':'Sal','Çarşamba':'Çar','Perşembe':'Per','Cuma':'Cum','Cumartesi':'Cmt' };

const schedule = {
  'Pazartesi':[
    { time:'08:00', title:'Sabah Mat Pilates', type:'Grup', spots:2, duration:50, level:'Başlangıç' },
    { time:'10:00', title:'Reformer Özel', type:'Bireysel', spots:1, duration:50, level:'Orta' },
    { time:'17:00', title:'Mat Pilates', type:'Grup', spots:4, duration:50, level:'Tüm Seviyeler' },
    { time:'19:00', title:'Mindfulness Pilates', type:'Grup', spots:3, duration:50, level:'Tüm Seviyeler' },
  ],
  'Salı':[
    { time:'09:00', title:'Reformer Özel', type:'Bireysel', spots:1, duration:50, level:'İleri' },
    { time:'11:00', title:'Hamile Pilatesi', type:'Grup', spots:2, duration:50, level:'Hamile' },
    { time:'18:00', title:'Mat Pilates', type:'Grup', spots:0, duration:50, level:'Orta' },
    { time:'20:00', title:'Online Ders', type:'Online', spots:3, duration:50, level:'Tüm Seviyeler' },
  ],
  'Çarşamba':[
    { time:'08:00', title:'Sabah Mat Pilates', type:'Grup', spots:3, duration:50, level:'Başlangıç' },
    { time:'10:00', title:'Postür & Mobilite', type:'Grup', spots:4, duration:50, level:'Tüm Seviyeler' },
    { time:'17:00', title:'Reformer Özel', type:'Bireysel', spots:1, duration:50, level:'Orta' },
    { time:'19:00', title:'Mat Pilates', type:'Grup', spots:2, duration:50, level:'İleri' },
  ],
  'Perşembe':[
    { time:'09:00', title:'Hamile Pilatesi', type:'Grup', spots:1, duration:50, level:'Hamile' },
    { time:'11:00', title:'Reformer Özel', type:'Bireysel', spots:1, duration:50, level:'Tüm Seviyeler' },
    { time:'18:00', title:'Core & Güçlendirme', type:'Grup', spots:3, duration:50, level:'Orta' },
    { time:'20:00', title:'Online Ders', type:'Online', spots:0, duration:50, level:'Başlangıç' },
  ],
  'Cuma':[
    { time:'08:00', title:'Sabah Mat Pilates', type:'Grup', spots:2, duration:50, level:'Başlangıç' },
    { time:'10:00', title:'Reformer Özel', type:'Bireysel', spots:1, duration:50, level:'İleri' },
    { time:'17:00', title:'Postür & Mobilite', type:'Grup', spots:4, duration:50, level:'Tüm Seviyeler' },
    { time:'19:00', title:'Hafta Sonu Hazırlık', type:'Grup', spots:1, duration:50, level:'Orta' },
  ],
  'Cumartesi':[
    { time:'09:00', title:'Hafta Sonu Mat', type:'Grup', spots:5, duration:50, level:'Tüm Seviyeler' },
    { time:'11:00', title:'Reformer Grubu', type:'Grup', spots:3, duration:50, level:'Orta' },
    { time:'13:00', title:'Mindfulness & Esneklik', type:'Grup', spots:4, duration:50, level:'Tüm Seviyeler' },
  ],
};

const typeConfig = {
  'Grup':{ color:'#00e87a', bg:'rgba(0,232,122,0.1)', icon:<Users size={13}/> },
  'Bireysel':{ color:G.gold, bg:'rgba(212,175,55,0.1)', icon:<Clock size={13}/> },
  'Online':{ color:'#75aadb', bg:'rgba(117,170,219,0.1)', icon:<Monitor size={13}/> },
  'Hamile':{ color:'#ff9fd4', bg:'rgba(255,159,212,0.1)', icon:'🤱' },
};

const spotsInfo = (s) => s===0?{ text:'DOLU', color:'#ff4444', bg:'rgba(255,68,68,0.12)' }:
  s===1?{ text:'1 YER KALDI', color:'#f8a000', bg:'rgba(248,160,0,0.12)' }:
  s<=2?{ text:`${s} YER`, color:'#f8d000', bg:'rgba(248,208,0,0.12)' }:
  { text:`${s} YER`, color:'#00e87a', bg:'rgba(0,232,122,0.1)' };

export default function ProgramPage() {
  const [activeDay, setActiveDay] = useState('Pazartesi');
  const [view, setView] = useState('list'); // list | grid

  const handleBook = lesson => {
    const msg = `Merhaba! ${activeDay} ${lesson.time} saatindeki "${lesson.title}" (${lesson.type}) dersine rezervasyon yapmak istiyorum.`;
    window.open(`https://wa.me/905383135720?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const lessons = schedule[activeDay] || [];
  const totalSpots = lessons.reduce((a,l) => a + l.spots, 0);

  return (
    <>
      <Helmet>
        <title>Pilates Programı | Haftalık Ders Takvimi | Gizem Hoca Beşiktaş</title>
        <meta name="description" content="Gizem Hoca haftalık pilates ders programı. Mat, Reformer, Hamile Pilatesi, Online dersler. Pazartesi-Cumartesi sabah-akşam seçenekleri." />
      </Helmet>
      <div style={{ background:G.bg, fontFamily:'Montserrat,sans-serif', minHeight:'100vh' }}>

        {/* Başlık */}
        <div style={{ padding:'clamp(28px,5vw,48px) clamp(16px,4vw,40px)', borderBottom:`1px solid ${G.goldBorder}`, background:`linear-gradient(180deg, rgba(212,175,55,0.05) 0%, transparent 100%)` }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
            <div style={{ width:'28px', height:'2px', background:G.gold }} />
            <span style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.2em', color:G.gold }}>HAFTALIK PROGRAM</span>
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'16px' }}>
            <div>
              <h1 style={{ fontSize:'clamp(36px,7vw,60px)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', lineHeight:0.9, marginBottom:'12px' }}>
                Ders<br /><span style={{ color:G.gold }}>Takvimi</span>
              </h1>
              <p style={{ fontSize:'14px', color:G.whiteMid, maxWidth:'400px', lineHeight:1.7 }}>
                Sana uygun gün ve saati seç, WhatsApp ile hemen rezervasyon yap.
              </p>
            </div>
            {/* Özet istatistik */}
            <div style={{ display:'flex', gap:'10px' }}>
              {[['24','Haftalık ders'],['6','Gün / hafta'],['4','Ders türü']].map(([n,l],i) => (
                <div key={i} style={{ background:'rgba(212,175,55,0.07)', border:`1px solid ${G.goldBorder}`, borderRadius:'12px', padding:'12px 16px', textAlign:'center' }}>
                  <div style={{ fontSize:'20px', fontWeight:900, color:G.gold }}>{n}</div>
                  <div style={{ fontSize:'10px', color:G.whiteMid, fontWeight:700, marginTop:'3px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ders tipi açıklama şeridi */}
        <div style={{ display:'flex', overflowX:'auto', borderBottom:`1px solid ${G.goldBorder}`, padding:'0 clamp(16px,4vw,40px)' }}>
          {Object.entries(typeConfig).map(([type,cfg]) => (
            <div key={type} style={{ display:'flex', alignItems:'center', gap:'7px', padding:'12px 16px', flexShrink:0, borderRight:`1px solid ${G.goldBorder}` }}>
              <div style={{ background:cfg.bg, border:`1px solid ${cfg.color}44`, borderRadius:'6px', padding:'4px 8px', display:'flex', alignItems:'center', gap:'5px' }}>
                <span style={{ color:cfg.color, display:'flex' }}>{cfg.icon}</span>
                <span style={{ fontSize:'11px', fontWeight:700, color:cfg.color }}>{type}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gün sekmeleri */}
        <div style={{ borderBottom:`1px solid ${G.goldBorder}` }}>
          <div style={{ display:'flex', overflowX:'auto', padding:'12px clamp(16px,4vw,40px)', gap:'8px' }} className="day-tabs">
            {days.map(day => {
              const dayLessons = schedule[day] || [];
              const hasSpots = dayLessons.some(l => l.spots > 0);
              return (
                <motion.button key={day} onClick={() => setActiveDay(day)}
                  whileTap={{ scale:0.96 }}
                  style={{ padding:'10px 16px', borderRadius:'12px', border:`1.5px solid ${activeDay===day?G.gold:G.goldBorder}`, background:activeDay===day?'rgba(212,175,55,0.12)':'transparent', color:activeDay===day?G.gold:G.whiteMid, fontSize:'12px', fontWeight:900, cursor:'pointer', fontFamily:'Montserrat', transition:'all 0.2s', whiteSpace:'nowrap', flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }}>
                  <span style={{ fontSize:'10px', letterSpacing:'0.05em' }}>{dayShort[day]}</span>
                  <span>{day}</span>
                  {!hasSpots && <span style={{ fontSize:'9px', color:'#ff6b6b', fontWeight:700 }}>DOLU</span>}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Ders listesi */}
        <AnimatePresence mode="wait">
          <motion.div key={activeDay} initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-10 }}
            transition={{ duration:0.2 }}>
            {/* Gün başlığı */}
            <div style={{ padding:'16px clamp(16px,4vw,40px)', borderBottom:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'8px', background:'rgba(212,175,55,0.03)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <h2 style={{ fontSize:'16px', fontWeight:900, color:'#fff', margin:0 }}>{activeDay}</h2>
                <span style={{ fontSize:'12px', color:G.whiteMid }}>{lessons.length} ders</span>
                {totalSpots > 0 && <span style={{ fontSize:'11px', color:'#00e87a', fontWeight:700, background:'rgba(0,232,122,0.1)', padding:'2px 8px', borderRadius:'999px' }}>{totalSpots} toplam kontenjan</span>}
              </div>
              <Link to="/iletisim" style={{ fontSize:'12px', fontWeight:700, color:G.gold, textDecoration:'none', display:'flex', alignItems:'center', gap:'4px' }}>
                Özel saat isteği <ArrowRight size={12} />
              </Link>
            </div>

            {lessons.map((lesson,i) => {
              const spots = spotsInfo(lesson.spots);
              const tCfg = typeConfig[lesson.type] || typeConfig['Grup'];
              return (
                <motion.div key={i}
                  initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
                  style={{ display:'grid', gridTemplateColumns:'100px 1fr auto', alignItems:'center', gap:'clamp(12px,3vw,32px)', padding:'clamp(14px,2vw,20px) clamp(16px,4vw,40px)', borderBottom:`1px solid ${G.goldBorder}`, opacity:lesson.spots===0?0.45:1, transition:'background 0.2s' }}
                  onMouseEnter={e => { if(lesson.spots>0) e.currentTarget.style.background='rgba(212,175,55,0.03)'; }}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}>

                  {/* Saat */}
                  <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    <Clock size={14} style={{ color:G.gold, flexShrink:0 }} />
                    <div>
                      <div style={{ fontSize:'18px', fontWeight:900, color:'#fff', lineHeight:1 }}>{lesson.time}</div>
                      <div style={{ fontSize:'10px', color:G.whiteLow, marginTop:'2px' }}>{lesson.duration} dk</div>
                    </div>
                  </div>

                  {/* Ders bilgisi */}
                  <div>
                    <div style={{ fontSize:'14px', fontWeight:900, color:'#fff', marginBottom:'6px' }}>{lesson.title}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', background:tCfg.bg, border:`1px solid ${tCfg.color}44`, color:tCfg.color, fontSize:'11px', fontWeight:700, padding:'3px 9px', borderRadius:'999px' }}>
                        {tCfg.icon} {lesson.type}
                      </span>
                      <span style={{ fontSize:'11px', color:G.whiteLow, background:'rgba(255,255,255,0.05)', padding:'3px 9px', borderRadius:'999px' }}>
                        {lesson.level}
                      </span>
                      <span style={{ fontSize:'11px', fontWeight:700, color:spots.color, background:spots.bg, padding:'3px 9px', borderRadius:'999px' }}>
                        {spots.text}
                      </span>
                    </div>
                  </div>

                  {/* Rezervasyon butonu */}
                  <div>
                    {lesson.spots > 0 ? (
                      <motion.button onClick={() => handleBook(lesson)}
                        whileHover={{ scale:1.04, boxShadow:'0 4px 16px rgba(212,175,55,0.3)' }} whileTap={{ scale:0.97 }}
                        style={{ display:'flex', alignItems:'center', gap:'7px', background:G.gold, color:G.bg, fontSize:'11px', fontWeight:900, letterSpacing:'0.05em', padding:'10px 18px', borderRadius:'999px', border:'none', cursor:'pointer', fontFamily:'Montserrat', whiteSpace:'nowrap' }}>
                        <MessageCircle size={13} /> Rezerve Et
                      </motion.button>
                    ) : (
                      <span style={{ fontSize:'11px', fontWeight:900, color:'rgba(255,68,68,0.7)', letterSpacing:'0.06em' }}>DOLU</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Notlar */}
        <div style={{ padding:'clamp(16px,3vw,24px) clamp(16px,4vw,40px)', background:'rgba(212,175,55,0.04)', borderTop:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'flex-start', gap:'12px', flexWrap:'wrap' }}>
          <Info size={16} style={{ color:G.gold, flexShrink:0, marginTop:'2px' }} />
          <div style={{ display:'flex', flexWrap:'wrap', gap:'x12px 28px' }}>
            {['Dersler 50 dakikadır.','İptal için 24 saat öncesinden WhatsApp bildirimi yapılmalıdır.','Kontenjanlar değişebilir — güncel bilgi için WhatsApp\'tan ulaşın.','Online derslere bağlantı bilgisi rezervasyondan sonra iletilir.'].map((note,i) => (
              <div key={i} style={{ fontSize:'12px', color:G.whiteMid, padding:'4px 0', display:'flex', alignItems:'center', gap:'6px', minWidth:'200px' }}>
                <span style={{ color:G.gold, fontSize:'10px' }}>✦</span> {note}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding:'clamp(24px,4vw,40px) clamp(16px,4vw,40px)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px', background:'rgba(212,175,55,0.05)' }}>
          <div>
            <h2 style={{ fontSize:'clamp(18px,3vw,22px)', fontWeight:900, color:'#fff', marginBottom:'6px' }}>Programa katıl ✦</h2>
            <p style={{ fontSize:'13px', color:G.whiteMid }}>İlk tanışma seansı ücretsiz. Saat seç, hemen rezervasyon yap.</p>
          </div>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
            <a href="https://wa.me/905383135720?text=Merhaba!%20Programa%20katılmak%20istiyorum."
              target="_blank" rel="noopener noreferrer"
              style={{ background:G.gold, color:G.bg, fontSize:'13px', fontWeight:900, padding:'12px 24px', borderRadius:'999px', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'8px', boxShadow:'0 4px 16px rgba(212,175,55,0.3)' }}>
              <MessageCircle size={14} /> WhatsApp Rezervasyon
            </a>
            <Link to="/fiyatlar" style={{ background:'transparent', border:`1px solid rgba(212,175,55,0.3)`, color:G.whiteMid, fontSize:'13px', fontWeight:700, padding:'12px 20px', borderRadius:'999px', textDecoration:'none' }}>
              Fiyatlar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
