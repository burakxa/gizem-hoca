import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { MessageCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const schedule = {
  'Pazartesi': [
    { time: '08:00', title: 'Mat Pilates', type: 'Grup', spots: 2 },
    { time: '10:00', title: 'Reformer', type: 'Bireysel', spots: 1 },
    { time: '17:00', title: 'Mat Pilates', type: 'Grup', spots: 4 },
    { time: '19:00', title: 'Mindfulness Pilates', type: 'Grup', spots: 3 },
  ],
  'Salı': [
    { time: '09:00', title: 'Reformer', type: 'Bireysel', spots: 1 },
    { time: '11:00', title: 'Hamile Pilatesi', type: 'Grup', spots: 2 },
    { time: '18:00', title: 'Mat Pilates', type: 'Grup', spots: 0 },
    { time: '20:00', title: 'Reformer', type: 'Bireysel', spots: 1 },
  ],
  'Çarşamba': [
    { time: '08:00', title: 'Mat Pilates', type: 'Grup', spots: 3 },
    { time: '10:00', title: 'Postür & Mobilite', type: 'Grup', spots: 4 },
    { time: '17:00', title: 'Reformer', type: 'Bireysel', spots: 1 },
    { time: '19:00', title: 'Mat Pilates', type: 'Grup', spots: 2 },
  ],
  'Perşembe': [
    { time: '09:00', title: 'Hamile Pilatesi', type: 'Grup', spots: 1 },
    { time: '11:00', title: 'Reformer', type: 'Bireysel', spots: 1 },
    { time: '18:00', title: 'Mindfulness Pilates', type: 'Grup', spots: 3 },
    { time: '20:00', title: 'Mat Pilates', type: 'Grup', spots: 0 },
  ],
  'Cuma': [
    { time: '08:00', title: 'Mat Pilates', type: 'Grup', spots: 2 },
    { time: '10:00', title: 'Reformer', type: 'Bireysel', spots: 1 },
    { time: '17:00', title: 'Postür & Mobilite', type: 'Grup', spots: 4 },
    { time: '19:00', title: 'Mat Pilates', type: 'Grup', spots: 1 },
  ],
  'Cumartesi': [
    { time: '09:00', title: 'Mat Pilates', type: 'Grup', spots: 5 },
    { time: '11:00', title: 'Reformer', type: 'Grup', spots: 3 },
    { time: '13:00', title: 'Mindfulness Pilates', type: 'Grup', spots: 4 },
  ],
};

const ProgramPage = () => {
  const [activeDay, setActiveDay] = useState('Pazartesi');
  const phoneNumber = '905383135720';

  const handleBook = (lesson) => {
    const msg = `Merhaba! ${activeDay} ${lesson.time} saatindeki "${lesson.title}" (${lesson.type}) dersine rezervasyon yaptırmak istiyorum.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      <Helmet><title>Ders Programı - Gizem Hoca Pilates</title></Helmet>

      <div className="border-b-2 border-brand-black p-8 lg:p-12">
        <p className="text-[10px] font-black tracking-widest text-brand-black/40 mb-3">GİZEM HOCA PİLATES</p>
        <h1 className="text-5xl md:text-7xl font-black text-brand-black leading-none tracking-tighter">PROGRAM</h1>
      </div>

      {/* Gün seçimi */}
      <div className="flex overflow-x-auto border-b-2 border-brand-black">
        {days.map(day => (
          <button key={day} onClick={() => setActiveDay(day)}
            className={`px-5 py-3 text-[10px] font-black tracking-widest whitespace-nowrap border-r border-brand-black/10 transition-all ${
              activeDay === day ? 'bg-black text-brand-lime' : 'bg-brand-bg text-brand-black/50 hover:text-black'
            }`}>
            {day.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Dersler */}
      <div className="divide-y divide-black/10">
        {(schedule[activeDay] || []).map((lesson, i) => (
          <motion.div key={i}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
            className="flex items-center justify-between p-6 lg:p-8 hover:bg-brand-black/[0.02] transition-colors">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 font-black text-xl text-brand-black min-w-[70px]">
                <Clock size={14} className="text-brand-black/30" />
                {lesson.time}
              </div>
              <div>
                <div className="font-black text-black">{lesson.title}</div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-black tracking-widest text-brand-black/40">{lesson.type.toUpperCase()}</span>
                  {lesson.spots === 0
                    ? <span className="text-[9px] font-black tracking-widest bg-brand-black text-brand-lime px-2 py-0.5">DOLU</span>
                    : <span className="text-[10px] text-brand-black/30">{lesson.spots} kontenjan kaldı</span>
                  }
                </div>
              </div>
            </div>
            {lesson.spots > 0 ? (
              <button onClick={() => handleBook(lesson)}
                className="flex items-center gap-2 bg-brand-black text-brand-lime text-[10px] font-black tracking-widest px-4 py-2 hover:bg-brand-black/80 transition-colors">
                <MessageCircle size={13} /> REZERVASYON
              </button>
            ) : (
              <span className="text-[10px] font-black tracking-widest text-brand-black/20">DOLU</span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="border-t-2 border-brand-black p-8 lg:p-12 bg-brand-black/[0.02]">
        <p className="text-[10px] font-black tracking-widest text-brand-black/40 mb-3">ÖNEMLİ BİLGİLER</p>
        <ul className="space-y-2 text-xs text-brand-black/50">
          <li>→ Dersler 50 dakikadır.</li>
          <li>→ İptal için 24 saat öncesinden bildirim yapılmalıdır.</li>
          <li>→ Kontenjanlar değişebilir, güncel bilgi için WhatsApp'tan ulaşın.</li>
        </ul>
      </div>
    </>
  );
};

export default ProgramPage;
