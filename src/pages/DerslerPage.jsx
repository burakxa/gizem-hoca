import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { PlayCircle, X } from 'lucide-react';
import Pagination from '@/components/ui/Pagination.jsx';

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
  { id: 'bKNNhBY_lSE', title: 'Reformer Pilates Temelleri - Gizem Hoca ile', category: 'Reformer' },
  { id: 'l7MRcgvVBDQ', title: 'Hamile Pilatesi - Güvenli Gebelik Egzersizleri', category: 'Özel' },
];

const categories = ['Tümü', 'Başlangıç', 'Core', 'Full Body', 'Postür', 'Reformer', 'Esneklik', 'Özel'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 250, damping: 25 } },
  exit: { scale: 0.8, opacity: 0 },
};

const DerslerPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;

  const filteredVideos = activeCategory === 'Tümü'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Dersler - Gizem Hoca Pilates</title>
        <meta name="description" content="Her seviyeye uygun online pilates dersleri ile formunuzu koruyun ve enerjinizi yükseltin." />
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
          Dersler
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-brand-black/80 mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Her seviyeye uygun derslerle bedeninizi keşfedin.
        </motion.p>

        {/* Kategori Filtresi */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 border-brand-black transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-brand-black text-brand-lime'
                  : 'bg-transparent text-brand-black hover:bg-brand-black/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {currentVideos.map((video) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                className="group bg-black/5 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <span className="absolute top-3 left-3 bg-brand-black text-brand-lime text-xs font-bold px-2 py-1 rounded-full">
                    {video.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-brand-black">{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl aspect-video"
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <motion.button
                className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-black"
                onClick={() => setSelectedVideo(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DerslerPage;
