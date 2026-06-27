import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, ChevronRight, User, Users, Monitor, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const inspirationalQuotes = [
  "Bedeninle barış, ruhunu güçlendir.",
  "Her hareket, bir öncekinden daha güçlü hissettirir.",
  "Nefes al, hareket et, tekrarla.",
  "Zihnini sakinleştir, bedenini canlandır.",
  "Kendine ayırdığın her an, en değerli yatırımdır.",
];

const LoadingScreen = ({ onFinished }) => {
  const [quote, setQuote] = useState('');
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
    setQuote(inspirationalQuotes[randomIndex]);
    const timer = setTimeout(onFinished, 2200);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.p
        className="text-brand-lime text-2xl md:text-4xl font-black text-center tracking-tight p-8 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {quote}
      </motion.p>
    </motion.div>
  );
};

const GIZEM_PHOTO = 'https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/71e533503d331149fe73f8e165f13f5b.png';

const stats = [
  { number: '500+', label: 'Mutlu öğrenci' },
  { number: '8+', label: 'Yıl deneyim' },
  { number: '4', label: 'Sertifika' },
];

const services = [
  { icon: <User size={20} />, title: 'Bireysel Ders', desc: 'Sadece size özel program, en hızlı ilerleme.' },
  { icon: <Users size={20} />, title: 'Grup Dersi', desc: 'Küçük gruplar, büyük motivasyon.' },
  { icon: <Monitor size={20} />, title: 'Online Ders', desc: 'Nerede olursanız olun, esnek seans.' },
  { icon: <Heart size={20} />, title: 'Mindfulness', desc: 'Stres atın, zihin-beden bütünlüğü kurun.' },
];

const testimonials = [
  { name: 'Elif T.', text: 'Sırt ağrılarım tamamen geçti, duruşum düzeldi. Rehberliği inanılmaz.' },
  { name: 'Selin A.', text: 'Her ders sonrası yenilenmiş hissediyorum. Sadece egzersiz değil, terapi.' },
  { name: 'Merve K.', text: '3 ayda fark inanılmaz. Hem güçlendim hem de zihinsel olarak rahatladım.' },
];

const AnimatedNumber = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    const duration = 1500;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
};

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="w-full min-h-screen bg-brand-lime overflow-y-auto">

        {/* ——— HERO ——— */}
        <div className="relative min-h-screen flex flex-col p-8 lg:p-16 overflow-hidden">
          {/* Büyük arka plan yazı */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="text-[18vw] font-black text-brand-black/[0.04] tracking-tighter whitespace-nowrap select-none">
              PİLATES
            </span>
          </div>

          {/* Üst etiketler */}
          <motion.div
            className="flex justify-between items-start relative z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-2 flex-wrap">
              {['REFORMER', 'MAT', 'ONLINE', 'GRUP'].map((tag) => (
                <span key={tag} className="text-xs font-black border border-brand-black/25 rounded-full px-3 py-1 text-brand-black/50">
                  {tag}
                </span>
              ))}
            </div>
            <Star size={28} fill="black" strokeWidth={0} />
          </motion.div>

          {/* Ortadaki içerik — foto + metin yan yana */}
          <div className="flex-1 flex flex-col md:flex-row items-center gap-10 py-12 relative z-10">
            {/* Sol — Gizem'in fotoğrafı */}
            <motion.div
              className="relative flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-brand-black/10">
                <img
                  src={GIZEM_PHOTO}
                  alt="Gizem Hoca"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              {/* Yıl rozeti */}
              <motion.div
                className="absolute -bottom-2 -right-2 bg-brand-black text-brand-lime rounded-full w-16 h-16 flex flex-col items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
              >
                <span className="text-lg font-black leading-none">8+</span>
                <span className="text-[9px] font-bold leading-none opacity-70">yıl</span>
              </motion.div>
            </motion.div>

            {/* Sağ — metin */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <p className="text-sm font-black text-brand-black/40 tracking-widest mb-3">PİLATES EĞİTMENİ</p>
              <h1 className="text-4xl md:text-6xl font-black text-brand-black leading-none tracking-tighter mb-5">
                Ben Gizem.<br />Seninle<br />güçlenelim.
              </h1>
              <p className="text-base text-brand-black/65 max-w-sm leading-relaxed mb-8">
                Hareketin dönüştürücü gücüne inanıyorum. Her öğrencimin kendi potansiyelini ortaya çıkarmasına yardımcı oluyorum — bedensel güç ve zihinsel huzurla.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link to="/fiyatlar">
                  <motion.button
                    className="bg-brand-black text-brand-lime px-6 py-3 rounded-full font-black text-sm flex items-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Ders Al <ArrowRight size={15} />
                  </motion.button>
                </Link>
                <Link to="/hakkimda">
                  <motion.button
                    className="border-2 border-brand-black text-brand-black px-6 py-3 rounded-full font-black text-sm"
                    whileHover={{ scale: 1.03, backgroundColor: 'rgba(0,0,0,0.05)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Hakkımda
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Sayaçlar */}
          <motion.div
            className="relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-brand-black/15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            onViewportEnter={() => setStatsVisible(true)}
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-black text-brand-black">
                  {statsVisible ? <AnimatedNumber target={parseInt(stat.number)} suffix={stat.number.includes('+') ? '+' : ''} /> : '0'}
                </div>
                <div className="text-xs text-brand-black/45 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ——— HİZMETLER ——— */}
        <div className="bg-brand-black px-8 py-12 lg:px-16">
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black text-brand-lime tracking-tight">Hizmetler</h2>
            <Link to="/hizmetler" className="text-brand-lime/40 text-sm font-bold flex items-center gap-1 hover:text-brand-lime transition-colors">
              Tümü <ChevronRight size={14} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={i}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all duration-200 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3 }}
              >
                <div className="text-brand-lime mb-3 group-hover:scale-110 transition-transform">{s.icon}</div>
                <div className="text-brand-lime font-black text-sm mb-1">{s.title}</div>
                <div className="text-white/40 text-xs leading-relaxed">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ——— KISA BİYO ——— */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 px-8 py-12 lg:px-16 bg-brand-lime"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-full md:w-1/2 relative overflow-hidden rounded-2xl aspect-video md:aspect-square max-w-sm">
            <img
              src={GIZEM_PHOTO}
              alt="Gizem Hoca"
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs font-black tracking-widest text-brand-black/40 mb-3">HAKKIMDA</p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-black tracking-tight leading-tight mb-5">
              Pilates bir egzersiz değil,<br />yaşam felsefesidir.
            </h2>
            <p className="text-brand-black/65 leading-relaxed mb-5 text-sm">
              Hareketin ve sağlığın hayatımızdaki dönüştürücü gücüne her zaman inandım. Derslerimde sadece fiziksel gücü değil, zihin-beden bütünlüğünü ön planda tutuyorum.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Balanced Body® Reformer', 'Mat Pilates', 'Hamile Pilatesi', 'Postür Bozuklukları'].map((cert) => (
                <span key={cert} className="text-xs font-bold bg-brand-black/8 text-brand-black px-3 py-1.5 rounded-full">{cert}</span>
              ))}
            </div>
            <Link to="/hakkimda">
              <motion.button
                className="flex items-center gap-2 font-black text-sm text-brand-black border-b-2 border-brand-black pb-0.5"
                whileHover={{ gap: '10px' }}
              >
                Daha fazla <ArrowRight size={14} />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* ——— YORUMLAR ——— */}
        <div className="px-8 py-12 lg:px-16 bg-brand-lime border-t border-brand-black/10">
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black text-brand-black tracking-tight">Öğrenciler ne diyor?</h2>
            <Link to="/musteri-yorumlari" className="text-brand-black/40 text-sm font-bold flex items-center gap-1 hover:text-brand-black transition-colors">
              Tümü <ChevronRight size={14} />
            </Link>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="bg-brand-black rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#cddc4e" className="text-brand-lime" />)}
              </div>
              <p className="text-white text-xl font-medium leading-relaxed mb-6">
                "{testimonials[activeTestimonial].text}"
              </p>
              <div className="font-black text-brand-lime">— {testimonials[activeTestimonial].name}</div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-8 bg-brand-black' : 'w-1.5 bg-brand-black/20'}`}
              />
            ))}
          </div>
        </div>

        {/* ——— CTA ——— */}
        <motion.div
          className="px-8 py-12 lg:px-16 bg-brand-black flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl font-black text-brand-lime tracking-tight">Başlamaya hazır mısın?</h2>
            <p className="text-white/50 mt-2 text-sm">İlk ders için hemen iletişime geç.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/fiyatlar">
              <motion.button
                className="bg-brand-lime text-brand-black px-7 py-4 rounded-full font-black text-sm flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Paketleri Gör <ArrowRight size={16} />
              </motion.button>
            </Link>
            <Link to="/iletisim">
              <motion.button
                className="border-2 border-white/20 text-white px-7 py-4 rounded-full font-black text-sm hover:border-white/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                İletişim
              </motion.button>
            </Link>
          </div>
        </motion.div>

      </div>
    </>
  );
};

export default HomePage;
