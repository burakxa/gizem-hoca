import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Check, MessageCircle } from 'lucide-react';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const plans = [
  {
    name: 'Başlangıç',
    subtitle: 'İlk adımı atmak isteyenler için',
    price: { bireysel: '800', grup: '400' },
    sessions: '4 Ders / Ay',
    features: [
      'Haftada 1 ders',
      'Mat pilates odaklı',
      'Temel hareket eğitimi',
      'Duruş analizi',
    ],
    cta: 'Başla',
    highlight: false,
  },
  {
    name: 'Düzenli',
    subtitle: 'En çok tercih edilen paket',
    price: { bireysel: '1400', grup: '700' },
    sessions: '8 Ders / Ay',
    features: [
      'Haftada 2 ders',
      'Mat + reformer',
      'Kişiselleştirilmiş program',
      'İlerleme takibi',
      'WhatsApp destek hattı',
    ],
    cta: 'Hemen Başla',
    highlight: true,
  },
  {
    name: 'Yoğun',
    subtitle: 'Hızlı ilerleme hedefleyenler için',
    price: { bireysel: '2200', grup: '1100' },
    sessions: '12 Ders / Ay',
    features: [
      'Haftada 3 ders',
      'Tüm ekipmanlar dahil',
      'Tam kişisel program',
      'Beslenme önerileri',
      'Öncelikli randevu',
      'Aylık değerlendirme seansı',
    ],
    cta: 'Başla',
    highlight: false,
  },
];

const faqs = [
  {
    q: 'Dersler nerede yapılıyor?',
    a: 'Stüdyomuzda yüz yüze veya online olarak gerçekleştirilmektedir. Online dersler Zoom üzerinden yapılır.',
  },
  {
    q: 'Ders iptal politikası nedir?',
    a: 'Dersten 24 saat önce bildirim yapılması durumunda ücretsiz iptal veya ders erteleme imkânı sunulmaktadır.',
  },
  {
    q: 'Grup dersleri kaç kişilik?',
    a: 'Grup derslerimiz maksimum 4 kişilik tutulmaktadır, böylece her öğrenciye bireysel ilgi gösterilmektedir.',
  },
  {
    q: 'Deneme dersi yapılabiliyor mu?',
    a: 'Evet! İlk ders için WhatsApp üzerinden bizimle iletişime geçerek ücretsiz tanışma seansı ayarlayabilirsiniz.',
  },
];

const FiyatlarPage = () => {
  const [lessonType, setLessonType] = useState('bireysel');
  const [openFaq, setOpenFaq] = useState(null);
  const phoneNumber = '905383135720';

  return (
    <>
      <Helmet>
        <title>Fiyatlar - Gizem Hoca Pilates</title>
        <meta name="description" content="Pilates ders paketleri ve fiyatları. Bireysel ve grup dersleri için uygun seçenekler." />
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
          Fiyatlar
        </motion.h1>
        <motion.p
          className="text-lg text-brand-black/70 mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Hedeflerinize en uygun paketi seçin.
        </motion.p>

        {/* Toggle */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className={`font-bold text-sm ${lessonType === 'bireysel' ? 'text-brand-black' : 'text-brand-black/40'}`}>Bireysel</span>
          <button
            onClick={() => setLessonType(lessonType === 'bireysel' ? 'grup' : 'bireysel')}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${lessonType === 'grup' ? 'bg-brand-black' : 'bg-brand-black/30'}`}
          >
            <span className={`absolute top-1 w-5 h-5 bg-brand-lime rounded-full shadow transition-all duration-300 ${lessonType === 'grup' ? 'left-8' : 'left-1'}`} />
          </button>
          <span className={`font-bold text-sm ${lessonType === 'grup' ? 'text-brand-black' : 'text-brand-black/40'}`}>Grup <span className="text-xs font-normal">(max 4 kişi)</span></span>
        </motion.div>

        {/* Paketler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className={`rounded-2xl p-6 flex flex-col ${
                plan.highlight
                  ? 'bg-brand-black text-brand-lime'
                  : 'bg-brand-black/8 border-2 border-brand-black/15 text-brand-black'
              }`}
            >
              {plan.highlight && (
                <span className="text-xs font-black tracking-widest bg-brand-lime text-brand-black px-3 py-1 rounded-full self-start mb-4">
                  EN POPÜLER
                </span>
              )}
              <h2 className="text-2xl font-black tracking-tight">{plan.name}</h2>
              <p className={`text-sm mt-1 mb-6 ${plan.highlight ? 'text-brand-lime/70' : 'text-brand-black/50'}`}>{plan.subtitle}</p>

              <div className="mb-2">
                <span className="text-4xl font-black">₺{plan.price[lessonType]}</span>
                <span className={`text-sm ml-1 ${plan.highlight ? 'text-brand-lime/60' : 'text-brand-black/40'}`}>/ay</span>
              </div>
              <p className={`text-sm font-semibold mb-6 ${plan.highlight ? 'text-brand-lime/70' : 'text-brand-black/50'}`}>{plan.sessions}</p>

              <ul className="space-y-2.5 flex-grow mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-brand-lime' : 'text-brand-black'}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Merhaba, "${plan.name}" paketi hakkında bilgi almak istiyorum.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  plan.highlight
                    ? 'bg-brand-lime text-brand-black hover:bg-brand-lime/80'
                    : 'bg-brand-black text-brand-lime hover:bg-brand-black/80'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* SSS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-3xl font-black text-brand-black tracking-tight mb-6">Sık Sorulan Sorular</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border-2 border-brand-black/15 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full text-left px-5 py-4 font-bold text-brand-black flex justify-between items-center"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className={`ml-4 text-xl font-black transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-5 pb-4 text-brand-black/70 text-sm leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FiyatlarPage;
