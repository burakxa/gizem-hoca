import React from 'react';
    import { motion } from 'framer-motion';
    import { Plus } from 'lucide-react';

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

    function GallerySection() {
      return (
        <section id="galeri" className="section-padding bg-brand-dark">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  className="group relative aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer"
                >
                  <img loading="lazy"
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
          </div>
        </section>
      );
    }

    export default GallerySection;