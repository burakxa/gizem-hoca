import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Check, MessageCircle, Plus } from 'lucide-react';

const plans = [
  {
    name: 'BAŞLANGIÇ',
    subtitle: 'İlk adımı atmak isteyenler için',
    price: { bireysel: '800', grup: '400' },
    sessions: '4 Ders / Ay',
    features: ['Haftada 1 ders', 'Mat pilates odaklı', 'Temel hareket eğitimi', 'Duruş analizi'],
    dark: false,
  },
  {
    name: 'DÜZENLİ',
    subtitle: 'En çok tercih edilen paket',
    price: { bireysel: '1400', grup: '700' },
    sessions: '8 Ders / Ay',
    features: ['Haftada 2 ders', 'Mat + reformer', 'Kişiselleştirilmiş program', 'İlerleme takibi', 'WhatsApp destek'],
    dark: true,
    popular: true,
  },
  {
    name: 'YOĞUN',
    subtitle: 'Hızlı ilerleme hedefleyenler için',
    price: { bireysel: '2200', grup: '1100' },
    sessions: '12 Ders / Ay',
    features: ['Haftada 3 ders', 'Tüm ekipmanlar dahil', 'Tam kişisel program', 'Beslenme önerileri', 'Öncelikli randevu', 'Aylık değerlendirme'],
    dark: false,
  },
];

const faqs = [
  { q: 'Deneme dersi var mı?', a: 'Evet! WhatsApp üzerinden ücretsiz tanışma seansı ayarlayabilirsiniz.' },
  { q: 'Ders iptal politikası nedir?', a: '24 saat öncesinden bildirim yapılması durumunda ücretsiz iptal veya erteleme.' },
  { q: 'Grup dersleri kaç kişilik?', a: 'Maksimum 4 kişilik tutulmaktadır.' },
  { q: 'Paketlerin geçerlilik süresi?', a: 'Satın alma tarihinden itibaren 3 ay.' },
];

const FiyatlarPage = () => {
  const [lessonType, setLessonType] = useState('bireysel');
  const [openFaq, setOpenFaq] = useState(null);
  const phoneNumber = '905383135720';

  return (
    <>
      <Helmet>
        <title>Fiyatlar - Gizem Hoca Pilates</title>
        <meta name="description" content="Pilates ders paketleri ve fiyatları." />
      </Helmet>

      <div className="border-b-2 border-black p-8 lg:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black tracking-widest text-black/40 mb-3">GİZEM HOCA PİLATES</p>
          <h1 className="text-5xl md:text-7xl font-black text-black leading-none tracking-tighter">FİYATLAR</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-black tracking-widest ${lessonType === 'bireysel' ? 'text-black' : 'text-black/30'}`}>BİREYSEL</span>
          <button onClick={() => setLessonType(lessonType === 'bireysel' ? 'grup' : 'bireysel')}
            className={`relative w-14 h-7 transition-colors ${lessonType === 'grup' ? 'bg-black' : 'bg-black/20'}`}>
            <span className={`absolute top-1 w-5 h-5 bg-brand-lime transition-all ${lessonType === 'grup' ? 'left-8' : 'left-1'}`} />
          </button>
          <span className={`text-xs font-black tracking-widest ${lessonType === 'grup' ? 'text-black' : 'text-black/30'}`}>GRUP</span>
        </div>
      </div>

      {/* Paketler */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-black">
        {plans.map((plan, i) => (
          <motion.div key={plan.name}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`p-8 lg:p-10 border-b-2 md:border-b-0 md:border-r-2 border-black last:border-r-0 flex flex-col ${plan.dark ? 'bg-black' : 'bg-white'}`}>
            {plan.popular && (
              <span className="text-[9px] font-black tracking-widest bg-brand-lime text-black px-3 py-1 self-start mb-4">EN POPÜLER</span>
            )}
            <h2 className={`text-xs font-black tracking-widest mb-1 ${plan.dark ? 'text-brand-lime' : 'text-black'}`}>{plan.name}</h2>
            <p className={`text-xs mb-6 ${plan.dark ? 'text-white/40' : 'text-black/40'}`}>{plan.subtitle}</p>
            <div className="mb-1">
              <span className={`text-5xl font-black ${plan.dark ? 'text-white' : 'text-black'}`}>₺{plan.price[lessonType]}</span>
              <span className={`text-sm ml-1 ${plan.dark ? 'text-white/30' : 'text-black/30'}`}>/ay</span>
            </div>
            <p className={`text-xs font-black tracking-wide mb-8 ${plan.dark ? 'text-white/40' : 'text-black/40'}`}>{plan.sessions}</p>
            <ul className="space-y-3 flex-grow mb-8">
              {plan.features.map((f, j) => (
                <li key={j} className={`flex items-center gap-2 text-xs ${plan.dark ? 'text-white/70' : 'text-black/70'}`}>
                  <Check size={12} className={plan.dark ? 'text-brand-lime' : 'text-black'} />
                  {f}
                </li>
              ))}
            </ul>
            <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Merhaba! "${plan.name}" paketi hakkında bilgi almak istiyorum.`)}`}
              target="_blank" rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 py-3 text-xs font-black tracking-widest transition-colors ${
                plan.dark ? 'bg-brand-lime text-black hover:bg-brand-lime/80' : 'bg-black text-brand-lime hover:bg-black/80'
              }`}>
              <MessageCircle size={14} /> BİLGİ AL
            </a>
          </motion.div>
        ))}
      </div>

      {/* SSS */}
      <div className="p-8 lg:p-12">
        <p className="text-[10px] font-black tracking-widest text-black/40 mb-8">SIK SORULAN SORULAR</p>
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-t border-black/10">
              <button className="w-full text-left py-4 font-black text-sm text-black flex justify-between items-center gap-4"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  <Plus size={18} className="text-black/40 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} className="text-xs text-black/50 pb-4 leading-relaxed">
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="border-t border-black/10" />
        </div>
      </div>
    </>
  );
};

export default FiyatlarPage;
