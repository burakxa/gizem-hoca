import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { X } from 'lucide-react';

const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', alt: 'Mat pilates dersi', category: 'Stüdyo' },
  { id: 2, src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', alt: 'Reformer çalışması', category: 'Reformer' },
  { id: 3, src: 'https://images.unsplash.com/photo-1599402318494-082465b828a2?w=800', alt: 'Esneme hareketleri', category: 'Dersler' },
  { id: 4, src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800', alt: 'Pilates topu ile denge', category: 'Dersler' },
  { id: 5, src: 'https://images.unsplash.com/photo-1571942674757-c342c31345c1?w=800', alt: 'Pozisyon düzeltme', category: 'Dersler' },
  { id: 6, src: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800', alt: 'Grup dersi', category: 'Grup' },
  { id: 7, src: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800', alt: 'Stüdyo görünümü', category: 'Stüdyo' },
  { id: 8, src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800', alt: 'Sabah dersi', category: 'Dersler' },
  { id: 9, src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', alt: 'Meditasyon', category: 'Mindfulness' },
  { id: 10, src: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800', alt: 'Reformer grup', category: 'Reformer' },
  { id: 11, src: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800', alt: 'Bireysel ders', category: 'Dersler' },
  { id: 12, src: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800', alt: 'Stüdyo detay', category: 'Stüdyo' },
];

const categories = ['TÜMÜ', 'STÜDYO', 'DERSLER', 'REFORMER', 'GRUP', 'MİNDFULNESS'];
const catMap = { 'TÜMÜ': '', 'STÜDYO': 'Stüdyo', 'DERSLER': 'Dersler', 'REFORMER': 'Reformer', 'GRUP': 'Grup', 'MİNDFULNESS': 'Mindfulness' };

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('TÜMÜ');
  const filtered = activeCategory === 'TÜMÜ' ? images : images.filter(img => img.category === catMap[activeCategory]);

  return (
    <>
      <Helmet><title>Galeri - Gizem Hoca Pilates</title></Helmet>
      <div className="border-b-2 border-brand-black p-8 lg:p-12">
        <p className="text-[10px] font-black tracking-widest text-brand-black/40 mb-3">GİZEM HOCA PİLATES</p>
        <h1 className="text-5xl md:text-7xl font-black text-brand-black leading-none tracking-tighter">GALERİ</h1>
      </div>
      <div className="flex overflow-x-auto border-b-2 border-brand-black">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-5 py-3 text-[10px] font-black tracking-widest whitespace-nowrap border-r border-brand-black/10 transition-all ${
              activeCategory === cat ? 'bg-black text-brand-lime' : 'bg-brand-bg text-brand-black/50 hover:text-black'
            }`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {filtered.map((image, i) => (
            <motion.div key={image.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}
              className="border-b border-r border-brand-black/10 aspect-square overflow-hidden cursor-pointer group relative"
              onClick={() => setSelectedImage(image)}>
              <img src={image.src} alt={image.alt}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-all" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all">
                <p className="text-white text-[10px] font-black tracking-wide">{image.alt.toUpperCase()}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div className="fixed inset-0 bg-brand-black/95 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div onClick={e => e.stopPropagation()} className="relative max-w-4xl w-full"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <img src={selectedImage.src} alt={selectedImage.alt} className="w-full object-contain max-h-[80vh]" />
              <div className="mt-3 flex justify-between items-center">
                <p className="text-white text-xs font-bold">{selectedImage.alt}</p>
                <button onClick={() => setSelectedImage(null)}
                  className="text-white/60 hover:text-white text-[10px] font-black tracking-widest flex items-center gap-2 transition-colors">
                  KAPAT <X size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;
