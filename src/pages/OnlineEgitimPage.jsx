import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const OnlineEgitimPage = ({ handleNotImplemented }) => {
  return (
    <>
      <Helmet>
        <title>Online Eğitim - Gizem Hoca Pilates</title>
        <meta name="description" content="Nerede olursanız olun, Pilates'e devam edin. Zoom üzerinden canlı, interaktif derslerle formunuzu koruyun." />
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
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b)` }}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2 md:ml-auto bg-brand-lime p-8 lg:p-16 flex flex-col justify-center min-h-screen overflow-y-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-black text-brand-black leading-none tracking-tighter mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Online Eğitim
          </motion.h1>
          
          <motion.p 
            className="text-lg font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Nerede olursanız olun, Pilates'e devam edin. Zoom üzerinden canlı, interaktif derslerle formunuzu koruyun.
          </motion.p>

          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl font-black tracking-tight mb-4">Ders Saatleri</h2>
            <ul className="list-disc list-inside font-medium text-lg space-y-1">
              <li>Salı & Perşembe: 19:00 - 20:00</li>
              <li>Cumartesi: 11:00 - 12:00</li>
            </ul>
          </motion.div>

          <motion.form 
            onSubmit={handleNotImplemented}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-black tracking-tight mb-4">Kayıt Ol</h2>
            <div>
              <Label htmlFor="name" className="font-bold">İsim</Label>
              <Input id="name" type="text" required className="mt-1 bg-transparent border-2 border-black rounded-none placeholder:text-gray-700 focus:ring-brand-lime-darker focus:border-brand-lime-darker" />
            </div>
            <div>
              <Label htmlFor="email" className="font-bold">E-posta</Label>
              <Input id="email" type="email" required className="mt-1 bg-transparent border-2 border-black rounded-none placeholder:text-gray-700 focus:ring-brand-lime-darker focus:border-brand-lime-darker" />
            </div>
            <Button type="submit" className="w-full bg-black text-white font-bold text-lg py-3 rounded-none hover:bg-white hover:text-black transition-colors duration-300">
              KAYIT İÇİN GÖNDER
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </>
  );
};

export default OnlineEgitimPage;