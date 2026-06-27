import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { MessageCircle, Clock, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

const colorMap = {
  green: 'bg-green-50 border-green-200 text-green-800',
  black: 'bg-brand-black/5 border-brand-black/15 text-brand-black',
  purple: 'bg-purple-50 border-purple-200 text-purple-800',
  pink: 'bg-pink-50 border-pink-200 text-pink-800',
  blue: 'bg-blue-50 border-blue-200 text-blue-800',
};

const ProgramPage = () => {
  const [schedule, setSchedule] = useState([]);
  const [activeDay, setActiveDay] = useState('Pazartesi');
  const [loading, setLoading] = useState(true);
  const phoneNumber = '905383135720';

  useEffect(() => {
    supabase.from('schedule').select('*').eq('active', true).order('time')
      .then(({ data }) => {
        if (data) setSchedule(data);
        setLoading(false);
      });
  }, []);

  const handleBook = (lesson) => {
    const msg = `Merhaba! ${activeDay} ${lesson.time} saatindeki "${lesson.title}" (${lesson.type}) dersine rezervasyon yaptırmak istiyorum.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const dayLessons = schedule.filter(s => s.day === activeDay).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <>
      <Helmet>
        <title>Ders Programı - Gizem Hoca Pilates</title>
        <meta name="description" content="Haftalık pilates ders programı. Uygun saati seç, hemen rezervasyon yap." />
      </Helmet>
      <motion.div
        className="w-full h-full bg-brand-lime p-8 lg:p-16 overflow-y-auto"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-black text-brand-black leading-none tracking-tighter mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Program
        </motion.h1>
        <motion.p className="text-lg text-brand-black/70 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Uygun saati seç, WhatsApp ile hemen rezervasyon yap.
        </motion.p>

        <motion.div className="flex gap-2 overflow-x-auto pb-2 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {days.map(day => (
            <button key={day} onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-xl text-sm font-black whitespace-nowrap border-2 transition-all duration-200 ${
                activeDay === day ? 'bg-brand-black text-brand-lime border-brand-black' : 'bg-transparent text-brand-black border-brand-black/20 hover:border-brand-black/40'
              }`}>
              {day}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex items-center gap-2 text-brand-black/40 py-8">
            <RefreshCw size={18} className="animate-spin" />
            <span className="text-sm font-medium">Program yükleniyor...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {dayLessons.length === 0 && (
              <div className="text-center py-12 text-brand-black/30">
                <Clock size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-bold">Bu gün için ders yok</p>
              </div>
            )}
            {dayLessons.map((lesson, i) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`flex items-center justify-between rounded-2xl border-2 p-4 ${colorMap[lesson.color] || colorMap.black}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 font-black text-lg min-w-[60px]">
                    <Clock size={14} className="opacity-60" />
                    {lesson.time}
                  </div>
                  <div>
                    <div className="font-black text-base">{lesson.title}</div>
                    <div className="text-xs opacity-60 font-medium flex items-center gap-2 mt-0.5">
                      <span>{lesson.type}</span>
                      {lesson.spots === 0 ? (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">Dolu</span>
                      ) : (
                        <span>{lesson.spots} kontenjan kaldı</span>
                      )}
                    </div>
                  </div>
                </div>
                {lesson.spots > 0 ? (
                  <motion.button onClick={() => handleBook(lesson)}
                    className="flex items-center gap-2 bg-brand-black text-brand-lime px-4 py-2 rounded-xl font-black text-xs whitespace-nowrap"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <MessageCircle size={14} /> Rezervasyon
                  </motion.button>
                ) : (
                  <span className="text-xs font-bold opacity-40 px-4">Dolu</span>
                )}
              </motion.div>
            ))}
          </div>
        )}

        <motion.div className="mt-8 bg-brand-black/5 rounded-2xl p-5 text-sm text-brand-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <p className="font-bold text-brand-black mb-1">📌 Önemli Bilgiler</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Dersler 50 dakikadır.</li>
            <li>İptal için 24 saat öncesinden bildirim yapılmalıdır.</li>
            <li>Kontenjanlar değişebilir, güncel bilgi için WhatsApp'tan ulaşın.</li>
          </ul>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProgramPage;
