import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, X } from 'lucide-react';

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b", alt: "Aydınlık pilates stüdyosu" },
  { id: 2, src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", alt: "Reformer aletinde egzersiz" },
  { id: 3, src: "https://images.unsplash.com/photo-1599402318494-082465b828a2", alt: "Mat üzerinde esneme hareketleri" },
  { id: 4, src: "https://images.unsplash.com/photo-1518611012118-696072aa579a", alt: "Pilates topu ile denge çalışması" },
  { id: 5, src: "https://images.unsplash.com/photo-1571942674757-c342c31345c1", alt: "Eğitmen yardımıyla pozisyon düzeltme" },
  { id: 6, src: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776", alt: "Ders sonrası mutlu öğrenciler" },
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
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

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <>
            <Helmet>
                <title>Galeri - Gizem Hoca Pilates</title>
                <meta name="description" content="Stüdyomuzun enerjisi, derslerimizden anlar ve mutlu öğrencilerimiz. İlham alın!" />
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
                    className="text-lg md:text-xl text-brand-black/80 mb-12"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Stüdyomuzdan ve derslerimizden ilham veren anlar.
                </motion.p>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                  {images.map((image) => (
                    <motion.div
                      key={image.id}
                      variants={itemVariants}
                      className="group relative aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        src={image.src} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-all duration-300"></div>
                      <div className="absolute inset-0 flex flex-col items-start justify-end p-6 text-white">
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                          <Plus className="w-5 h-5" />
                        </div>
                        <p className="font-bold text-lg tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {image.alt}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedImage(null)}
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <motion.div
                            variants={modalVariants}
                            onClick={(e) => e.stopPropagation()}
                            className="relative"
                        >
                            <img 
                                src={selectedImage.src} 
                                alt={selectedImage.alt}
                                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            />
                            <motion.button
                                className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-black"
                                onClick={() => setSelectedImage(null)}
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

export default GalleryPage;