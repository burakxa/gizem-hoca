import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const testimonials = [
  { name: "Elif T.", quote: "Gizem Hoca ile dersler bir harika! Enerjisi ve profesyonelliği sayesinde kendimi hem daha güçlü hem de daha motive hissediyorum." },
  { name: "Can D.", quote: "Sırt ağrılarım için başlamıştım ama sonuçlar beklediğimden çok daha iyi oldu. Duruşum düzeldi ve ağrılarım tamamen geçti." },
  { name: "Selin A.", quote: "Her ders sonrası yenilenmiş hissediyorum. Sadece bir egzersiz değil, aynı zamanda bir terapi gibi geliyor. Teşekkürler Gizem Hoca!" },
];

const MusteriYorumlariPage = () => {
  return (
    <>
      <Helmet>
        <title>Müşteri Yorumları - Gizem Hoca Pilates</title>
        <meta name="description" content="Öğrencilerimizin Gizem Hoca Pilates deneyimleri ve geri bildirimleri." />
      </Helmet>
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full flex flex-col bg-brand-lime"
      >
        <div className="w-full h-full md:w-1/2 md:fixed md:left-0 md:top-0 flex items-center justify-center p-8 lg:p-16">
          <motion.div 
            className="w-full h-full bg-cover bg-center grayscale"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1607962837359-5e7e89f86776)` }}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2 md:ml-auto bg-brand-lime p-8 lg:p-16 flex flex-col justify-center min-h-screen overflow-y-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-black text-brand-black leading-none tracking-tighter mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Müşteri Yorumları
          </motion.h1>
          
          <div className="space-y-10">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <p className="text-xl font-medium italic">"{testimonial.quote}"</p>
                <h3 className="text-2xl font-black tracking-tight mt-3">- {testimonial.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MusteriYorumlariPage;