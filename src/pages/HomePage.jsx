import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, ChevronRight, PlayCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const GIZEM_PHOTO = 'https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/71e533503d331149fe73f8e165f13f5b.png';

const testimonials = [
  { name: 'Elif T.', job: 'Öğretmen', tag: 'Bireysel Ders', text: 'Sırt ağrılarım tamamen geçti, duruşum düzeldi. Gizem Hoca\'nın rehberliği inanılmaz.' },
  { name: 'Selin A.', job: 'Pazarlama Yöneticisi', tag: 'Grup Ders', text: 'Her ders sonrası yenilenmiş hissediyorum. Sadece egzersiz değil, tam anlamıyla terapi.' },
  { name: 'Merve K.', job: 'Doktor', tag: 'Online Ders', text: '3 ayda fark inanılmaz. Hem güçlendim hem de zihinsel olarak rahatladım.' },
];

const featuredVideos = [
  { id: '2_pyykhX08M', title: 'Postürünü Geri Kazan', duration: '25 dk' },
  { id: 'gYaAsuUH3ag', title: 'Dengeleyici Pilates Flow', duration: '40 dk' },
  { id: 'zCK3RRKMtCg', title: 'Mat Pilates Rutini', duration: '30 dk' },
];

const services = [
  { title: 'BİREYSEL DERS', desc: 'Size özel program, en hızlı ilerleme.' },
  { title: 'GRUP DERSİ', desc: 'Küçük gruplar, büyük motivasyon.' },
  { title: 'ONLİNE DERS', desc: 'Nerede olursanız olun, esnek seans.' },
  { title: 'REFORMER', desc: 'Profesyonel alet eğitimi.', dark: true },
];

const AnimatedNumber = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
};

const HomePage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [statsVisible, setStatsVisible] = useState(false);

  return (
    <div className="w-full bg-white">

      {/* ——— HERO SPLIT ——— */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[85vh]">
        {/* Sol — Siyah */}
        <motion.div
          className="bg-black p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        >
          <div className="absolute bottom-[-40px] right-[-20px] text-[200px] font-black text-white/[0.025] leading-none pointer-events-none select-none">G</div>
          <div>
            <p className="text-[10px] font-black tracking-[0.2em] text-white/30 mb-1">PİLATES EĞİTMENİ</p>
            <p className="text-[10px] font-black tracking-[0.2em] text-white/30">BEŞİKTAŞ · İSTANBUL</p>
          </div>
          <div>
            <motion.h1
              className="text-6xl md:text-7xl font-black text-white leading-none tracking-tighter mb-6"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            >
              GÜÇLEN.<br />ESNE.<br /><span className="text-brand-lime">HİSSET.</span>
            </motion.h1>
            <motion.p
              className="text-sm text-white/40 leading-relaxed max-w-xs mb-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            >
              Her öğrencimin kendi potansiyelini ortaya çıkarmasına yardımcı oluyorum — bedensel güç ve zihinsel huzurla.
            </motion.p>
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              <Link to="/fiyatlar">
                <button className="bg-brand-lime text-black text-xs font-black tracking-widest px-6 py-3 rounded-full hover:bg-brand-lime/80 transition-colors">
                  DERS AL →
                </button>
              </Link>
              <Link to="/hakkimda">
                <button className="bg-transparent text-white/50 text-xs font-black tracking-widest px-6 py-3 rounded-full border border-white/15 hover:border-white/30 transition-colors">
                  HAKKIMDA
                </button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            onViewportEnter={() => setStatsVisible(true)}
          >
            {[{ n: 500, s: '+', l: 'ÖĞRENCİ' }, { n: 8, s: '+', l: 'YIL' }, { n: 4, s: '', l: 'SERTİFİKA' }].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-brand-lime leading-none">
                  {statsVisible ? <AnimatedNumber target={stat.n} suffix={stat.s} /> : `0${stat.s}`}
                </div>
                <div className="text-[9px] font-black tracking-widest text-white/30 mt-1">{stat.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Sağ — Fotoğraf */}
        <motion.div
          className="relative overflow-hidden min-h-[400px]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
        >
          <img src={GIZEM_PHOTO} alt="Gizem Hoca"
            className="w-full h-full object-cover grayscale contrast-110 absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 bg-white text-black text-[9px] font-black tracking-widest px-3 py-1.5">
            ★ 500+ ÖĞRENCİ
          </div>
        </motion.div>
      </div>

      {/* ——— HİZMETLER BANT ——— */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t-2 border-b-2 border-black">
        {services.map((s, i) => (
          <motion.div
            key={i}
            className={`p-6 ${i < services.length - 1 ? 'border-r border-black/15' : ''} ${s.dark ? 'bg-black' : 'bg-white'}`}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
          >
            <div className={`text-[10px] font-black tracking-widest mb-2 ${s.dark ? 'text-brand-lime' : 'text-black'}`}>{s.title}</div>
            <div className={`text-xs leading-relaxed ${s.dark ? 'text-white/40' : 'text-black/50'}`}>{s.desc}</div>
          </motion.div>
        ))}
      </div>

      {/* ——— VİDEO + BİYO ——— */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black">
        {/* Video */}
        <div className="p-8 lg:p-12 border-b-2 md:border-b-0 md:border-r-2 border-black">
          <p className="text-[10px] font-black tracking-widest text-black/40 mb-6">ÖNE ÇIKAN DERSLER</p>
          <motion.div
            className="relative aspect-video bg-black rounded-sm overflow-hidden cursor-pointer mb-4 group"
            onClick={() => setSelectedVideo(featuredVideos[0])}
            whileHover={{ scale: 1.01 }}
          >
            <img src={`https://img.youtube.com/vi/${featuredVideos[0].id}/hqdefault.jpg`} alt={featuredVideos[0].title}
              className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-60 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-brand-lime rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <PlayCircle size={20} className="text-black" fill="black" strokeWidth={0} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-xs font-bold">{featuredVideos[0].title}</p>
              <p className="text-white/50 text-[10px]">{featuredVideos[0].duration}</p>
            </div>
          </motion.div>
          <div className="space-y-3">
            {featuredVideos.slice(1).map(video => (
              <div key={video.id}
                className="flex gap-3 items-center cursor-pointer group border-b border-black/8 pb-3 last:border-0"
                onClick={() => setSelectedVideo(video)}>
                <div className="w-16 h-10 overflow-hidden flex-shrink-0 relative">
                  <img src={`https://img.youtube.com/vi/${video.id}/default.jpg`} alt={video.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <PlayCircle size={14} className="text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-black group-hover:text-black/60 transition-colors">{video.title}</p>
                  <p className="text-[10px] text-black/40">{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/dersler" className="inline-flex items-center gap-2 mt-6 text-[10px] font-black tracking-widest text-black border-b-2 border-black pb-0.5 hover:text-black/50 transition-colors">
            TÜM DERSLER <ArrowRight size={12} />
          </Link>
        </div>

        {/* Biyografi */}
        <div className="p-8 lg:p-12">
          <p className="text-[10px] font-black tracking-widest text-black/40 mb-6">HAKKIMDA</p>
          <div className="aspect-[4/3] overflow-hidden mb-6">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800" alt="Pilates"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          <blockquote className="text-2xl font-black text-black leading-tight tracking-tight mb-4">
            "Pilates bir egzersiz değil, yaşam felsefesidir."
          </blockquote>
          <p className="text-xs text-black/55 leading-relaxed mb-6">
            Hareketin ve sağlığın hayatımızdaki dönüştürücü gücüne her zaman inandım. Derslerimde sadece fiziksel gücü değil, zihin-beden bütünlüğünü ön planda tutuyorum.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Balanced Body®', 'Hamile Pilatesi', 'Reformer', 'Postür'].map(cert => (
              <span key={cert} className="text-[10px] font-black border-2 border-black px-3 py-1 tracking-wide">{cert}</span>
            ))}
          </div>
          <Link to="/hakkimda" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-black border-b-2 border-black pb-0.5 hover:text-black/50 transition-colors">
            DAHA FAZLA <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* ——— YORUMLAR ——— */}
      <div className="bg-black p-8 lg:p-12 border-b-2 border-black">
        <div className="flex justify-between items-center mb-8">
          <p className="text-[10px] font-black tracking-widest text-white/30">ÖĞRENCİLER NE DİYOR?</p>
          <Link to="/musteri-yorumlari" className="text-[10px] font-black tracking-widest text-brand-lime/50 hover:text-brand-lime transition-colors flex items-center gap-1">
            TÜMÜ <ChevronRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div key={i}
              className="border border-white/10 p-6 hover:border-white/20 transition-colors"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              <div className="text-brand-lime text-xs mb-3">★★★★★</div>
              <p className="text-sm text-white/70 leading-relaxed italic mb-4">"{t.text}"</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-black text-brand-lime">— {t.name}</p>
                  <p className="text-[10px] text-white/25 mt-0.5">{t.job}</p>
                </div>
                <span className="text-[9px] font-black text-white/20 tracking-wide">{t.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ——— CTA ——— */}
      <div className="bg-brand-lime border-b-2 border-black p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight leading-tight">Başlamaya hazır mısın?</h2>
          <p className="text-sm text-black/50 mt-2">İlk ders için hemen iletişime geç.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/fiyatlar">
            <button className="bg-black text-brand-lime text-xs font-black tracking-widest px-7 py-4 hover:bg-black/80 transition-colors flex items-center gap-2">
              PAKETLERİ GÖR <ArrowRight size={14} />
            </button>
          </Link>
          <Link to="/iletisim">
            <button className="bg-transparent text-black text-xs font-black tracking-widest px-7 py-4 border-2 border-black hover:bg-black/5 transition-colors">
              İLETİŞİM
            </button>
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div onClick={e => e.stopPropagation()} className="relative w-full max-w-3xl aspect-video"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <iframe className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title} frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              <button className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors flex items-center gap-2 text-xs font-black tracking-widest"
                onClick={() => setSelectedVideo(null)}>
                KAPAT <X size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
