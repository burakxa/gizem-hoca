import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { MessageCircle, Plus } from 'lucide-react';

const plans = [
  { name: 'BAŞLANGIÇ', subtitle: 'İlk adımı atmak için', price: { bireysel: '800', grup: '400' }, sessions: '4 Ders / Ay', features: ['Haftada 1 ders', 'Mat pilates', 'Temel eğitim', 'Duruş analizi'], dark: false },
  { name: 'DÜZENLİ', subtitle: 'En çok tercih edilen', price: { bireysel: '1400', grup: '700' }, sessions: '8 Ders / Ay', features: ['Haftada 2 ders', 'Mat + reformer', 'Kişisel program', 'İlerleme takibi', 'WhatsApp destek'], dark: true, popular: true },
  { name: 'YOĞUN', subtitle: 'Hızlı ilerleme için', price: { bireysel: '2200', grup: '1100' }, sessions: '12 Ders / Ay', features: ['Haftada 3 ders', 'Tüm ekipmanlar', 'Tam program', 'Beslenme önerileri', 'Öncelikli randevu'], dark: false },
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

  return (
    <>
      <Helmet><title>Fiyatlar - Gizem Hoca Pilates</title></Helmet>
      <div className="bg-brand-bg">
        <div className="border-b-2 border-brand-black p-8 lg:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-[3px] bg-brand-lime" />
            <div>
              <p className="text-[10px] font-black tracking-widest text-brand-lime mb-1">GİZEM HOCA PİLATES</p>
              <h1 className="text-5xl md:text-7xl font-black text-brand-black leading-none tracking-tighter">FİYATLAR</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-black tracking-widest ${lessonType === 'bireysel' ? 'text-brand-black' : 'text-brand-brown'}`}>BİREYSEL</span>
            <button onClick={() => setLessonType(l => l === 'bireysel' ? 'grup' : 'bireysel')}
              className={`relative w-14 h-7 rounded-full transition-colors ${lessonType === 'grup' ? 'bg-brand-black' : 'bg-brand-tan'}`}>
              <span className={`absolute top-1 w-5 h-5 bg-brand-lime rounded-full transition-all ${lessonType === 'grup' ? 'left-8' : 'left-1'}`} />
            </button>
            <span className={`text-[10px] font-black tracking-widest ${lessonType === 'grup' ? 'text-brand-black' : 'text-brand-brown'}`}>GRUP</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-brand-black">
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`p-8 lg:p-10 border-b-2 md:border-b-0 md:border-r-2 border-brand-black last:border-r-0 flex flex-col ${plan.dark ? 'bg-brand-black' : 'bg-brand-bg'}`}>
              {plan.popular && (
                <span className="text-[9px] font-black tracking-widest bg-brand-lime text-brand-black px-3 py-1 self-start mb-4 rounded-full">EN POPÜLER ✦</span>
              )}
              <h2 className={`text-[10px] font-black tracking-widest mb-1 ${plan.dark ? 'text-brand-lime' : 'text-brand-lime'}`}>{plan.name}</h2>
              <p className={`text-xs mb-6 ${plan.dark ? 'text-brand-bg/40' : 'text-brand-brown'}`}>{plan.subtitle}</p>
              <div className="mb-1">
                <span className={`text-5xl font-black ${plan.dark ? 'text-brand-bg' : 'text-brand-black'}`}>₺{plan.price[lessonType]}</span>
                <span className={`text-sm ml-1 ${plan.dark ? 'text-brand-bg/30' : 'text-brand-brown'}`}>/ay</span>
              </div>
              <p className={`text-[10px] font-black tracking-wide mb-8 ${plan.dark ? 'text-brand-bg/40' : 'text-brand-brown'}`}>{plan.sessions}</p>
              <ul className="space-y-3 flex-grow mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className={`flex items-center gap-2 text-xs ${plan.dark ? 'text-brand-bg/70' : 'text-brand-brown'}`}>
                    <span className="text-brand-lime font-black">✦</span> {f}
                  </li>
                ))}
              </ul>
              <a href={`https://wa.me/905383135720?text=${encodeURIComponent(`Merhaba! "${plan.name}" paketi hakkında bilgi almak istiyorum.`)}`}
                target="_blank" rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-3 text-[10px] font-black tracking-wider rounded-full transition-colors ${
                  plan.dark ? 'bg-brand-lime text-brand-black hover:bg-brand-lime/80' : 'bg-brand-black text-brand-lime hover:bg-brand-black/80'
                }`}>
                <MessageCircle size={14} /> BİLGİ AL
              </a>
            </motion.div>
          ))}
        </div>

        <div className="p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-[2px] bg-brand-lime" />
            <p className="text-[10px] font-black tracking-widest text-brand-lime">SIK SORULAN SORULAR</p>
          </div>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="border-t border-brand-tan">
                <button className="w-full text-left py-5 font-black text-sm text-brand-black flex justify-between items-center gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <Plus size={18} className="text-brand-lime flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} className="text-sm text-brand-brown pb-5 leading-relaxed">
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <div className="border-t border-brand-tan" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FiyatlarPage;
