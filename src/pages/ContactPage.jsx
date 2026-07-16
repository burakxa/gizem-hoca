import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>İletişim - Gizem Hoca Pilates</title>
        <meta name="description" content="Dersler, programlar veya işbirlikleri hakkında bilgi almak için benimle iletişime geçin." />
      </Helmet>
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full flex flex-col md:flex-row bg-brand-lime"
      >
        <div className="w-full h-1/2 md:w-1/2 md:h-full flex items-center justify-center p-8 lg:p-16">
          <motion.div 
            className="w-full h-full bg-cover bg-center grayscale"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1571942674757-c342c31345c1)` }}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
          </motion.div>
        </div>
        
        <div className="w-full h-1/2 md:w-1/2 md:ml-auto bg-brand-lime p-8 lg:p-16 flex flex-col justify-center min-h-screen md:min-h-0 overflow-y-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-black text-brand-black leading-none tracking-tighter mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            İletişim
          </motion.h1>
          
          <motion.div 
            className="space-y-4 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>Dersler, programlar veya merak ettiğiniz herhangi bir konuda bana aşağıdaki kanallardan kolayca ulaşabilirsiniz.</p>
            <div>
              <p className="font-bold pt-4">Stüdyo Adresi:</p>
              <p>Levent Mah. Lale Sk. No:24, Beşiktaş/İstanbul</p>
            </div>
            <div>
              <p className="font-bold pt-4">E-posta:</p>
              <p><a href="mailto:merhaba@gizemhoca.com" className="underline hover:text-white transition-colors">merhaba@gizemhoca.com</a></p>
            </div>
            <div>
              <p className="font-bold pt-4">En Hızlı İletişim:</p>
              <p><a href="https://wa.me/905383135720" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">WhatsApp'tan yazın.</a></p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ContactPage;