import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { PlayCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

const videos = [
  { id: '2_pyykhX08M', title: 'Postürünü Geri Kazan - 25 Dakikalık Duruş ve Mobilite Çalışması' },
  { id: 'gYaAsuUH3ag', title: 'Vücudunu Hizada Tut! 40 Dakikalık Dengeleyici Pilates Flow' },
  { id: 'zCK3RRKMtCg', title: 'Yalnızca Mat ve Sen - Kendine Ayırdığın En Güzel 30 Dakika' },
  { id: '-1ELN5uIYUc', title: 'Evde Mini Ball ile Full Core & Leg & Back ! BU ANTRENMANI UNUTAMAYACAKSIN..' },
  { id: 'AgcK7pnx8PM', title: 'Gizem Hoca ile Kontroloji Serisi 1' },
  { id: '_QQvHmyQEx8', title: 'mükemmel olmak için başlamak zorundasın' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
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
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 4;

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const totalPages = Math.ceil(videos.length / videosPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          className="text-lg md:text-xl text-brand-black/80 mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Her seviyeye uygun derslerle bedeninizi keşfedin.
        </motion.p>

        <motion.div
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
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-brand-black">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
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