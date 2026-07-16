import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { PlayCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

const videos = [
  { id: '2_pyykhX08M', title: 'Postürünü Geri Kazan - 25 Dakikalık Duruş ve Mobilite Çalışması', category: 'Postür' },
  { id: 'gYaAsuUH3ag', title: 'Vücudunu Hizada Tut! 40 Dakikalık Dengeleyici Pilates Flow', category: 'Full Body' },
  { id: 'zCK3RRKMtCg', title: 'Yalnızca Mat ve Sen - Kendine Ayırdığın En Güzel 30 Dakika', category: 'Başlangıç' },
  { id: '-1ELN5uIYUc', title: 'Evde Mini Ball ile Full Core & Leg & Back!', category: 'Core' },
  { id: 'AgcK7pnx8PM', title: 'Gizem Hoca ile Kontroloji Serisi 1', category: 'Reformer' },
  { id: '_QQvHmyQEx8', title: 'Mükemmel Olmak İçin Başlamak Zorundasın', category: 'Başlangıç' },
  { id: 'UBMk30rjy0o', title: '30 Dakikada Tüm Vücut - Mat Pilates Rutini', category: 'Full Body' },
  { id: 'g_tea8ZNk5A', title: 'Core Güçlendirme - Karın ve Sırt için Pilates', category: 'Core' },
  { id: 'oZRRHKmDMhI', title: 'Sabah Pilates Rutini - Güne Enerjik Başla', category: 'Başlangıç' },
  { id: 'VaoV1PrYft4', title: 'Esneklik ve Mobilite - Tam Vücut Germe Serisi', category: 'Esneklik' },
  { id: 'bKNNhBY_lSE', title: 'Reformer Pilates Temelleri', category: 'Reformer' },
  { id: 'l7MRcgvVBDQ', title: 'Hamile Pilatesi - Güvenli Gebelik Egzersizleri', category: 'Özel' },
];

const categories = ['TÜMÜ', 'BAŞLANGIÇ', 'CORE', 'FULL BODY', 'POSTÜR', 'REFORMER', 'ESNEKLİK', 'ÖZEL'];
const catMap = { 'TÜMÜ': 'Tümü', 'BAŞLANGIÇ': 'Başlangıç', 'CORE': 'Core', 'FULL BODY': 'Full Body', 'POSTÜR': 'Postür', 'REFORMER': 'Reformer', 'ESNEKLİK': 'Esneklik', 'ÖZEL': 'Özel' };

const DerslerPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('TÜMÜ');
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;

  const filteredVideos = activeCategory === 'TÜMÜ' ? videos : videos.filter(v => v.category === catMap[activeCategory]);
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const currentVideos = filteredVideos.slice((currentPage - 1) * videosPerPage, currentPage * videosPerPage);

  return (
    <>
      <Helmet>
        <title>Dersler - Gizem Hoca Pilates</title>
        <meta name="description" content="Her seviyeye uygun online pilates dersleri." />
      </Helmet>

      {/* Başlık */}
      <div className="border-b-2 border-black p-8 lg:p-12">
        <p className="text-[10px] font-black tracking-widest text-black/40 mb-3">GİZEM HOCA PİLATES</p>
        <h1 className="text-5xl md:text-7xl font-black text-black leading-none tracking-tighter">DERSLER</h1>
      </div>

      {/* Kategori filtresi */}
      <div className="flex overflow-x-auto border-b-2 border-black">
        {categories.map(cat => (
          <button key={cat} onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
            className={`px-5 py-3 text-[10px] font-black tracking-widest whitespace-nowrap border-r border-black/10 transition-all ${
              activeCategory === cat ? 'bg-black text-brand-lime' : 'bg-white text-black/50 hover:text-black'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentVideos.map((video, i) => (
          <motion.div key={video.id}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
            className="border-b border-r border-black/10 group cursor-pointer"
            onClick={() => setSelectedVideo(video)}>
            <div className="relative aspect-video overflow-hidden">
              <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all flex items-center justify-center">
                <div className="w-12 h-12 bg-brand-lime rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                  <PlayCircle size={20} className="text-black" />
                </div>
              </div>
              <span className="absolute top-3 left-3 bg-black text-brand-lime text-[9px] font-black tracking-widest px-2 py-1">
                {video.category.toUpperCase()}
              </span>
            </div>
            <div className="p-4 border-t border-black/10">
              <h3 className="text-xs font-bold text-black leading-snug group-hover:text-black/50 transition-colors">{video.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-0 border-t-2 border-black">
          <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}
            className="p-4 border-r border-black/10 disabled:opacity-30 hover:bg-black/5 transition-colors">
            <ChevronLeft className="h-5 w-5 text-black" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setCurrentPage(n)}
              className={`w-12 h-12 text-xs font-black border-r border-black/10 transition-all ${
                currentPage === n ? 'bg-black text-brand-lime' : 'text-black/50 hover:bg-black/5'
              }`}>
              {n}
            </button>
          ))}
          <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}
            className="p-4 disabled:opacity-30 hover:bg-black/5 transition-colors">
            <ChevronRight className="h-5 w-5 text-black" />
          </button>
        </div>
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl aspect-video"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <iframe className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title} frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              <button className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors flex items-center gap-2 text-xs font-black tracking-widest"
                onClick={() => setSelectedVideo(null)}>KAPAT <X size={14} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DerslerPage;
