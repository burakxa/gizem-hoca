import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, PlayCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const GIZEM_PHOTO = 'https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/71e533503d331149fe73f8e165f13f5b.png';

const testimonials = [
  { name: 'Elif T.', job: 'Öğretmen', tag: 'Bireysel Ders', text: 'Sırt ağrılarım tamamen geçti, duruşum düzeldi. Rehberliği inanılmaz.' },
  { name: 'Selin A.', job: 'Pazarlama', tag: 'Grup Ders', text: 'Her ders sonrası yenilenmiş hissediyorum. Adeta terapi.' },
  { name: 'Merve K.', job: 'Doktor', tag: 'Online', text: '3 ayda fark inanılmaz. Hem güçlendim hem rahatladım.' },
];

const featuredVideos = [
  { id: '2_pyykhX08M', title: 'Postürünü Geri Kazan', duration: '25 dk' },
  { id: 'gYaAsuUH3ag', title: 'Dengeleyici Pilates Flow', duration: '40 dk' },
  { id: 'zCK3RRKMtCg', title: 'Mat Pilates Rutini', duration: '30 dk' },
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-brand-bg">

      {/* ——— HERO ——— */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[85vh] border-b-2 border-brand-black">
        {/* Sol */}
        <motion.div className="p-10 lg:p-16 flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 border-brand-black relative overflow-hidden"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="absolute bottom-[-60px] left-[-40px] w-[280px] h-[280px] rounded-full bg-brand-lime opacity-[0.06] pointer-events-none" />
          <div className="absolute top-[-30px] right-[-30px] w-[100px] h-[100px] rounded-full border-4 border-brand-lime opacity-10 pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[3px] bg-brand-lime" />
              <span className="text-[10px] font-black tracking-[0.2em] text-brand-lime">PİLATES STÜDYOsu · EST. 2016</span>
            </div>
          </div>

          <div>
            <motion.h1 className="text-6xl md:text-7xl font-black text-brand-black leading-none tracking-tighter mb-6"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
              Move.<br />Breathe.<br /><span className="text-brand-lime">Thrive.</span>
            </motion.h1>
            <motion.p className="text-sm text-brand-brown leading-relaxed max-w-xs mb-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Hareketin dönüştürücü gücüne inanıyorum. Her öğrencimin potansiyelini ortaya çıkarmasına yardım ediyorum — bedensel güç ve zihinsel huzurla.
            </motion.p>
            <motion.div className="flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Link to="/fiyatlar">
                <button className="bg-brand-lime text-brand-bg text-[10px] font-black tracking-wider px-6 py-3 rounded-full hover:bg-brand-lime/80 transition-colors flex items-center gap-2">
                  DERS AL <ArrowRight size={13} />
                </button>
              </Link>
              <Link to="/hakkimda">
                <button className="bg-transparent text-brand-black text-[10px] font-black tracking-wider px-6 py-3 rounded-full border-2 border-brand-black hover:bg-brand-black/5 transition-colors">
                  HAKKIMDA
                </button>
              </Link>
            </motion.div>
          </div>

          <motion.div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-brand-tan"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            onViewportEnter={() => setStatsVisible(true)}>
            {[{ n: 500, s: '+', l: 'MUTLU ÖĞRENCİ' }, { n: 8, s: '+', l: 'YIL DENEYİM' }, { n: 4, s: '', l: 'SERTİFİKA' }].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-brand-black">
                  {statsVisible ? <AnimatedNumber target={stat.n} suffix={stat.s} /> : `0${stat.s}`}
                </div>
                <div className="text-[9px] font-black tracking-wider text-brand-brown mt-1">{stat.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Sağ — Fotoğraf */}
        <motion.div className="relative overflow-hidden min-h-[400px]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <img src={GIZEM_PHOTO} alt="Gizem Hoca"
            className="w-full h-full object-cover absolute inset-0" style={{ filter: 'sepia(0.35) contrast(1.1)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent" />
          <div className="absolute top-5 left-5 bg-brand-bg text-brand-black text-[9px] font-black tracking-wider px-4 py-2 rounded-full border-2 border-brand-black">
            ✦ 500+ ÖĞRENCİ
          </div>
          <div className="absolute bottom-5 right-5 bg-brand-lime text-brand-bg text-[9px] font-black tracking-wider px-4 py-2 rounded-full">
            8+ Yıl Deneyim ✦
          </div>
        </motion.div>
      </div>

      {/* ——— HİZMETLER ——— */}
      <div className="bg-brand-black border-b-2 border-brand-black">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { icon: '👤', title: 'Bireysel Ders', desc: 'Size özel program, en hızlı ilerleme.' },
            { icon: '👥', title: 'Grup Dersi', desc: 'Küçük gruplar, büyük motivasyon.' },
            { icon: '💻', title: 'Online Ders', desc: 'Nerede olursanız olun, esnek seans.' },
            { icon: '🏋️', title: 'Reformer', desc: 'Profesyonel alet eğitimi.', accent: true },
          ].map((s, i) => (
            <motion.div key={i}
              className={`p-6 ${i < 3 ? 'border-r border-brand-bg/10' : ''} ${s.accent ? 'bg-brand-lime' : ''}`}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="text-2xl mb-4">{s.icon}</div>
              <div className={`text-xs font-black tracking-wider mb-2 ${s.accent ? 'text-brand-bg' : 'text-brand-bg'}`}>{s.title}</div>
              <div className={`text-xs leading-relaxed ${s.accent ? 'text-brand-black/60' : 'text-brand-bg/40'}`}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ——— VİDEO + BİYO ——— */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-brand-black">
        <div className="p-8 lg:p-12 border-b-2 md:border-b-0 md:border-r-2 border-brand-black">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[2px] bg-brand-lime" />
            <p className="text-[10px] font-black tracking-widest text-brand-lime">ÖNE ÇIKAN DERSLER</p>
          </div>
          <motion.div className="relative aspect-video rounded-lg overflow-hidden cursor-pointer mb-4 border-2 border-brand-black group"
            onClick={() => setSelectedVideo(featuredVideos[0])} whileHover={{ scale: 1.01 }}>
            <img src={`https://img.youtube.com/vi/${featuredVideos[0].id}/hqdefault.jpg`} alt={featuredVideos[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              style={{ filter: 'sepia(0.3) contrast(1.1)' }} />
            <div className="absolute inset-0 bg-brand-black/30 flex items-center justify-center">
              <div className="w-14 h-14 bg-brand-lime rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border-2 border-brand-black">
                <PlayCircle size={22} className="text-brand-black" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-brand-black/80 to-transparent">
              <p className="text-brand-bg text-xs font-bold">{featuredVideos[0].title}</p>
              <p className="text-brand-bg/50 text-[10px]">{featuredVideos[0].duration}</p>
            </div>
          </motion.div>
          <div className="space-y-3">
            {featuredVideos.slice(1).map(video => (
              <div key={video.id} className="flex gap-3 items-center cursor-pointer group border-b border-brand-tan pb-3 last:border-0"
                onClick={() => setSelectedVideo(video)}>
                <div className="w-16 h-10 overflow-hidden flex-shrink-0 rounded border border-brand-tan">
                  <img src={`https://img.youtube.com/vi/${video.id}/default.jpg`} alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform" style={{ filter: 'sepia(0.3)' }} />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-black group-hover:text-brand-lime transition-colors">{video.title}</p>
                  <p className="text-[10px] text-brand-brown">{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/dersler" className="inline-flex items-center gap-2 mt-6 text-[10px] font-black tracking-widest text-brand-lime border-b-2 border-brand-lime pb-0.5">
            TÜM DERSLER <ArrowRight size={12} />
          </Link>
        </div>

        <div className="p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[2px] bg-brand-lime" />
            <p className="text-[10px] font-black tracking-widest text-brand-lime">HAKKIMDA</p>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-lg border-2 border-brand-black mb-6">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800" alt="Pilates"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              style={{ filter: 'sepia(0.3) contrast(1.1)' }} />
          </div>
          <blockquote className="text-xl font-black text-brand-black leading-tight mb-4 italic">
            "Pilates bir egzersiz değil, yaşam felsefesidir."
          </blockquote>
          <p className="text-xs text-brand-brown leading-relaxed mb-6">
            Hareketin ve sağlığın hayatımızdaki dönüştürücü gücüne her zaman inandım. Derslerimde zihin-beden bütünlüğünü ön planda tutuyorum.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Balanced Body®', 'Reformer', 'Hamile Pilatesi', 'Postür'].map(cert => (
              <span key={cert} className="text-[10px] font-black border-2 border-brand-black text-brand-black px-3 py-1 rounded-full">{cert}</span>
            ))}
          </div>
          <Link to="/hakkimda" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-brand-lime border-b-2 border-brand-lime pb-0.5">
            DAHA FAZLA <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* ——— YORUMLAR ——— */}
      <div className="bg-brand-black p-8 lg:p-12 border-b-2 border-brand-black">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-[2px] bg-brand-lime" />
            <p className="text-[10px] font-black tracking-widest text-brand-lime">ÖĞRENCİLER NE DİYOR?</p>
          </div>
          <Link to="/musteri-yorumlari" className="text-[10px] font-black tracking-wider text-brand-lime/50 hover:text-brand-lime transition-colors flex items-center gap-1">
            TÜMÜ <ChevronRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div key={i} className="border border-brand-bg/10 rounded-lg p-6 hover:border-brand-lime/30 transition-colors"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-brand-lime text-xs mb-3">★★★★★</div>
              <p className="text-sm text-brand-bg/70 leading-relaxed italic mb-4">"{t.text}"</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-black text-brand-lime">— {t.name}</p>
                  <p className="text-[10px] text-brand-bg/25 mt-0.5">{t.job}</p>
                </div>
                <span className="text-[9px] font-black text-brand-bg/20 tracking-wide">{t.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ——— CTA ——— */}
      <div className="bg-brand-lime border-b-2 border-brand-black p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-brand-black tracking-tight">Başlamaya hazır mısın?</h2>
          <p className="text-sm text-brand-black/50 mt-2">İlk ders için hemen iletişime geç.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/fiyatlar">
            <button className="bg-brand-black text-brand-lime text-[10px] font-black tracking-wider px-7 py-4 rounded-full hover:bg-brand-black/80 transition-colors flex items-center gap-2">
              PAKETLERİ GÖR <ArrowRight size={14} />
            </button>
          </Link>
          <Link to="/iletisim">
            <button className="bg-transparent text-brand-black text-[10px] font-black tracking-wider px-7 py-4 rounded-full border-2 border-brand-black hover:bg-brand-black/5 transition-colors">
              İLETİŞİM
            </button>
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div className="fixed inset-0 bg-brand-black/95 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl aspect-video"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <iframe className="absolute inset-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title} frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              <button className="absolute -top-10 right-0 text-brand-bg/60 hover:text-brand-bg transition-colors flex items-center gap-2 text-[10px] font-black tracking-widest"
                onClick={() => setSelectedVideo(null)}>KAPAT <X size={14} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
