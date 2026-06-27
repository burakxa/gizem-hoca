import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Star, ChevronDown } from 'lucide-react';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const testimonials = [
  {
    name: 'Elif T.',
    job: 'Öğretmen',
    rating: 5,
    date: 'Mart 2025',
    text: 'Gizem Hoca ile dersler bir harika! Enerjisi ve profesyonelliği sayesinde kendimi hem daha güçlü hem de daha motive hissediyorum. 6 aydır devam ediyorum ve fark inanılmaz.',
    tag: 'Bireysel Ders',
  },
  {
    name: 'Selin A.',
    job: 'Pazarlama Yöneticisi',
    rating: 5,
    date: 'Şubat 2025',
    text: 'Sırt ağrılarım için başlamıştım ama sonuçlar beklediğimden çok daha iyi oldu. Duruşum düzeldi ve ağrılarım tamamen geçti. Masa başında çok daha rahat oturuyorum.',
    tag: 'Reformer',
  },
  {
    name: 'Neslihan K.',
    job: 'Avukat',
    rating: 5,
    date: 'Ocak 2025',
    text: 'Her ders sonrası yenilenmiş hissediyorum. Sadece bir egzersiz değil, aynı zamanda bir terapi gibi geliyor. Hem bedenime hem zihnime çok iyi geliyor. Teşekkürler Gizem Hoca!',
    tag: 'Grup Ders',
  },
  {
    name: 'Merve K.',
    job: 'Doktor',
    rating: 5,
    date: 'Aralık 2024',
    text: 'Uzun çalışma saatleri sonrası vücudum çok yoruluyordu. Pilates derslerine başladıktan sonra enerji seviyem gözle görülür şekilde arttı. Gizem Hoca\'nın anlayışlı ve sabırlı yaklaşımı çok değerli.',
    tag: 'Online Ders',
  },
  {
    name: 'Ayşe B.',
    job: 'Ev Hanımı',
    rating: 5,
    date: 'Kasım 2024',
    text: 'Doğum sonrası kendimi çok iyi hissetmiyordum. Gizem Hoca\'nın özel programıyla adım adım güçlendim. 4 ayda hem fiziksel hem de psikolojik olarak kendimi çok daha iyi hissediyorum.',
    tag: 'Bireysel Ders',
  },
  {
    name: 'Zeynep Ö.',
    job: 'Mimar',
    rating: 5,
    date: 'Ekim 2024',
    text: 'Online dersleri çok verimli. Gizem Hoca kameradan bile pozisyonu düzeltiyor, sanki yanındaymış gibi. Yurt dışından katılıyorum ve hiç sorun yaşamıyorum.',
    tag: 'Online Ders',
  },
];

const tags = ['Tümü', 'Bireysel Ders', 'Grup Ders', 'Reformer', 'Online Ders'];

const MusteriYorumlariPage = () => {
  const [activeTag, setActiveTag] = useState('Tümü');
  const [visibleCount, setVisibleCount] = useState(4);

  const filtered = activeTag === 'Tümü' ? testimonials : testimonials.filter(t => t.tag === activeTag);
  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <Helmet>
        <title>Müşteri Yorumları - Gizem Hoca Pilates</title>
        <meta name="description" content="Öğrencilerimizin Gizem Hoca Pilates deneyimleri ve geri bildirimleri." />
      </Helmet>
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full bg-brand-lime p-8 lg:p-16 overflow-y-auto"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-black text-brand-black leading-none tracking-tighter mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Yorumlar
        </motion.h1>

        {/* Özet */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#000" className="text-brand-black" />)}
          </div>
          <span className="text-2xl font-black text-brand-black">5.0</span>
          <span className="text-brand-black/50 text-sm">· {testimonials.length} yorum</span>
        </motion.div>

        {/* Filtreler */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => { setActiveTag(tag); setVisibleCount(4); }}
              className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 border-brand-black transition-all duration-200 ${
                activeTag === tag ? 'bg-brand-black text-brand-lime' : 'bg-transparent text-brand-black hover:bg-brand-black/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Yorumlar */}
        <div className="space-y-4">
          <AnimatePresence>
            {visible.map((t, i) => (
              <motion.div
                key={t.name + t.tag}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-brand-black rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-black text-brand-lime text-lg">{t.name}</div>
                    <div className="text-white/40 text-sm">{t.job} · {t.date}</div>
                  </div>
                  <span className="text-xs bg-white/10 text-white/60 px-3 py-1 rounded-full font-medium">{t.tag}</span>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="#cddc4e" className="text-brand-lime" />)}
                </div>
                <p className="text-white/80 leading-relaxed">"{t.text}"</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleCount < filtered.length && (
          <motion.button
            onClick={() => setVisibleCount(v => v + 4)}
            className="mt-6 w-full py-3 border-2 border-brand-black rounded-xl font-bold text-brand-black flex items-center justify-center gap-2 hover:bg-brand-black/5 transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            Daha fazla göster <ChevronDown size={16} />
          </motion.button>
        )}
      </motion.div>
    </>
  );
};

export default MusteriYorumlariPage;
