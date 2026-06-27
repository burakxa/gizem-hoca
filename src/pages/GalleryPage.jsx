import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, X } from 'lucide-react';

const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', alt: 'Mat pilates dersi', category: 'Stüdyo' },
  { id: 2, src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', alt: 'Reformer aleti çalışması', category: 'Reformer' },
  { id: 3, src: 'https://images.unsplash.com/photo-1599402318494-082465b828a2?w=800', alt: 'Esneme hareketleri', category: 'Dersler' },
  { id: 4, src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800', alt: 'Pilates topu ile denge', category: 'Dersler' },
  { id: 5, src: 'https://images.unsplash.com/photo-1571942674757-c342c31345c1?w=800', alt: 'Pozisyon düzeltme', category: 'Dersler' },
  { id: 6, src: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800', alt: 'Grup dersi', category: 'Grup' },
  { id: 7, src: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800', alt: 'Stüdyo görünümü', category: 'Stüdyo' },
  { id: 8, src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800', alt: 'Sabah dersi', category: 'Dersler' },
  { id: 9, src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', alt: 'Meditasyon ve nefes', category: 'Mindfulness' },
  { id: 10, src: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800', alt: 'Reformer grup dersi', category: 'Reformer' },
  { id: 11, src: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800', alt: 'Bireysel ders', category: 'Dersler' },
  { id: 12, src: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800', alt: 'Stüdyo detay', category: 'Stüdyo' },
];

const categories = ['Tümü', 'Stüdyo', 'Dersler', 'Reformer', 'Grup', 'Mindfulness'];

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const filtered = activeCategory === 'Tümü' ? images : images.filter(img => img.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Galeri - Gizem Hoca Pilates</title>
        <meta name="description" content="Stüdyomuzdan ve derslerimizden ilham veren anlar." />
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
          Galeri
        </motion.h1>
        <motion.p
          className="text-lg text-brand-black/70 mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Stüdyomuzdan ve derslerimizden ilham veren anlar.
        </motion.p>

        {/* Kategoriler */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 border-brand-black transition-all duration-200 ${
                activeCategory === cat ? 'bg-brand-black text-brand-lime' : 'bg-transparent text-brand-black hover:bg-brand-black/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filtered.map((image, i) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-bold text-sm">{image.alt}</p>
                  <span className="text-white/60 text-xs">{image.category}</span>
                </div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              className="relative"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl p-4">
                <p className="text-white font-bold">{selectedImage.alt}</p>
                <p className="text-white/60 text-sm">{selectedImage.category}</p>
              </div>
              <motion.button
                className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-black shadow-lg"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;
