import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { MessageCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const G = { bg:'#0d1b3e', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'#fff', whiteMid:'rgba(255,255,255,0.5)' };

const days = ['Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
const schedule = {
  'Pazartesi': [
    { time:'08:00', title:'Mat Pilates', type:'Grup', spots:2 },
    { time:'10:00', title:'Reformer', type:'Bireysel', spots:1 },
    { time:'17:00', title:'Mat Pilates', type:'Grup', spots:4 },
    { time:'19:00', title:'Mindfulness Pilates', type:'Grup', spots:3 },
  ],
  'Salı': [
    { time:'09:00', title:'Reformer', type:'Bireysel', spots:1 },
    { time:'11:00', title:'Hamile Pilatesi', type:'Grup', spots:2 },
    { time:'18:00', title:'Mat Pilates', type:'Grup', spots:0 },
    { time:'20:00', title:'Reformer', type:'Bireysel', spots:1 },
  ],
  'Çarşamba': [
    { time:'08:00', title:'Mat Pilates', type:'Grup', spots:3 },
    { time:'10:00', title:'Postür & Mobilite', type:'Grup', spots:4 },
    { time:'17:00', title:'Reformer', type:'Bireysel', spots:1 },
    { time:'19:00', title:'Mat Pilates', type:'Grup', spots:2 },
  ],
  'Perşembe': [
    { time:'09:00', title:'Hamile Pilatesi', type:'Grup', spots:1 },
    { time:'11:00', title:'Reformer', type:'Bireysel', spots:1 },
    { time:'18:00', title:'Mindfulness Pilates', type:'Grup', spots:3 },
    { time:'20:00', title:'Mat Pilates', type:'Grup', spots:0 },
  ],
  'Cuma': [
    { time:'08:00', title:'Mat Pilates', type:'Grup', spots:2 },
    { time:'10:00', title:'Reformer', type:'Bireysel', spots:1 },
    { time:'17:00', title:'Postür & Mobilite', type:'Grup', spots:4 },
    { time:'19:00', title:'Mat Pilates', type:'Grup', spots:1 },
  ],
  'Cumartesi': [
    { time:'09:00', title:'Mat Pilates', type:'Grup', spots:5 },
    { time:'11:00', title:'Reformer', type:'Grup', spots:3 },
    { time:'13:00', title:'Mindfulness Pilates', type:'Grup', spots:4 },
  ],
};


const G = { bg: '#0d1b3e', dark: '#071029', gold: '#d4af37', goldFaint: 'rgba(212,175,55,0.1)', goldBorder: 'rgba(212,175,55,0.2)', white: 'rgba(255,255,255,0.9)', whiteMid: 'rgba(255,255,255,0.5)' };

const spotsColor = (spots) => spots === 0 ? '#ff4444' : spots <= 1 ? '#f8a000' : spots <= 2 ? '#f8d000' : '#00e87a';
const spotsText = (spots) => spots === 0 ? 'DOLU' : spots === 1 ? '1 YER KALDI' : `${spots} YER`;

export default function ProgramPage() {
  const [activeDay, setActiveDay] = useState('Pazartesi');

  const handleBook = lesson => {
    const msg = `Merhaba! ${activeDay} ${lesson.time} saatindeki "${lesson.title}" (${lesson.type}) dersine rezervasyon yaptırmak istiyorum.`;
    window.open(`https://wa.me/905383135720?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Pilates Programı | Haftalık Ders Takvimi | Gizem Hoca</title>
        <meta name="description" content="Gizem Hoca'nın haftalık pilates ders programı. Sabah akşam seçenekleri, Pazartesi-Cumartesi. WhatsApp ile kolay rezervasyon." />
      </Helmet>
      <div style={{ background:G.bg, fontFamily:'Montserrat,sans-serif', minHeight:'100vh' }}>
        <div style={{ padding:'32px 40px', borderBottom:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'32px', height:'2px', background:G.gold }} />
          <div>
            <p style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.2em', color:G.gold, marginBottom:'6px' }}>GİZEM HOCA PİLATES</p>
            <h1 style={{ fontSize:'56px', fontWeight:900, color:'#fff', lineHeight:0.92, letterSpacing:'-0.03em' }}>PROGRAM</h1>
          </div>
        </div>

        <div className='day-tabs' style={{ display:'flex', overflowX:'auto', borderBottom:`1px solid ${G.goldBorder}` }}>
          {days.map(day => (
            <button key={day} onClick={() => setActiveDay(day)}
              style={{ padding:'10px 20px', fontSize:'9px', fontWeight:900, letterSpacing:'0.08em', whiteSpace:'nowrap', borderRight:`1px solid ${G.goldBorder}`, cursor:'pointer', border:'none', background: activeDay===day ? G.gold : 'transparent', color: activeDay===day ? G.bg : G.whiteMid, fontFamily:'Montserrat', borderRight:`1px solid ${G.goldBorder}` }}>
              {day.toUpperCase()}
            </button>
          ))}
        </div>

        <div>
          {(schedule[activeDay]||[]).map((lesson, i) => (
            <motion.div key={i} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.06 }}
              style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'clamp(12px,3vw,20px) clamp(16px,4vw,40px)', flexWrap:'wrap', gap:'10px', borderBottom:`1px solid ${G.goldBorder}`, opacity: lesson.spots===0 ? 0.4 : 1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'32px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', minWidth:'70px' }}>
                  <Clock size={14} style={{ color:G.gold }} />
                  <span style={{ fontSize:'18px', fontWeight:900, color:'#fff' }}>{lesson.time}</span>
                </div>
                <div>
                  <div style={{ fontSize:'13px', fontWeight:900, color:'#fff' }}>{lesson.title}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginTop:'4px' }}>
                    <span style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.1em', color:G.gold }}>{lesson.type.toUpperCase()}</span>
                    {lesson.spots === 0
                      ? <span style={{ fontSize:'8px', fontWeight:900, background:G.gold, color:G.bg, padding:'2px 8px', borderRadius:'999px' }}>DOLU</span>
                      : <span style={{ fontSize:'10px', color:G.whiteMid }}>{lesson.spots} kontenjan kaldı</span>
                    }
                  </div>
                </div>
              </div>
              {lesson.spots > 0 ? (
                <button onClick={() => handleBook(lesson)}
                  style={{ display:'flex', alignItems:'center', gap:'8px', background:G.gold, color:G.bg, fontSize:'9px', fontWeight:900, letterSpacing:'0.06em', padding:'9px 18px', borderRadius:'999px', border:'none', cursor:'pointer', fontFamily:'Montserrat' }}>
                  <MessageCircle size={13} /> REZERVASYON
                </button>
              ) : (
                <span style={{ fontSize:'10px', fontWeight:900, color:G.whiteMid, letterSpacing:'0.06em' }}>DOLU</span>
              )}
            </motion.div>
          ))}
        </div>

        <div style={{ padding:'28px 40px', background:G.goldFaint, borderTop:`1px solid ${G.goldBorder}` }}>
          <p style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.15em', color:G.gold, marginBottom:'12px' }}>ÖNEMLİ BİLGİLER</p>
          {['Dersler 50 dakikadır.', 'İptal için 24 saat öncesinden bildirim yapılmalıdır.', 'Kontenjanlar değişebilir, güncel bilgi için WhatsApp\'tan ulaşın.'].map((note, i) => (
            <p key={i} style={{ fontSize:'12px', color:G.whiteMid, marginBottom:'6px' }}>✦ {note}</p>
          ))}
        </div>
      </div>
    </>
  );
}
