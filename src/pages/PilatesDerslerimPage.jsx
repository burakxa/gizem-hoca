import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const dersler = [
  { title: "Grup Dersleri", description: "Küçük gruplarla enerjiyi paylaşın, motivasyonunuzu artırın. Her seviyeye uygun dersler mevcuttur." },
  { title: "Özel Dersler", description: "Birebir ilgi ile hedeflerinize daha hızlı ulaşın. Program tamamen size özel tasarlanır." },
  { title: "Reformer Pilates", description: "Aletli pilates ile daha yoğun ve kontrollü bir çalışma deneyimi. Güç, esneklik ve denge bir arada." },
  { title: "Mat Pilates", description: "Vücut ağırlığınızı kullanarak yapacağınız temel pilates hareketleri ile merkez bölgenizi güçlendirin." },
];

const fiyatlar = [
  { item: "Tek Ders", price: "350 TL" },
  { item: "8 Ders Paketi", price: "2.400 TL" },
  { item: "12 Ders Paketi", price: "3.300 TL" },
];

const PilatesDerslerimPage = () => {
  return (
    <>
      <Helmet>
        <title>Pilates Derslerim - Gizem Hoca Pilates</title>
        <meta name="description" content="Grup dersleri, özel dersler, reformer ve mat pilates seçenekleriyle size uygun programı bulun." />
      </Helmet>
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full flex flex-col bg-[#0d1b3e]"
      >
        <div className="w-full h-full md:w-1/2 md:fixed md:left-0 md:top-0 flex items-center justify-center p-8 lg:p-16">
          <motion.div 
            className="w-full h-full bg-cover bg-center grayscale"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1599402318494-082465b828a2)` }}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2 md:ml-auto bg-[#0d1b3e] p-8 lg:p-16 flex flex-col justify-center min-h-screen overflow-y-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-black text-white leading-none tracking-tighter mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Pilates Derslerim
          </motion.h1>
          
          <div className="space-y-8">
            {dersler.map((ders, index) => (
              <motion.div 
                key={ders.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <h2 className="text-2xl font-black tracking-tight">{ders.title}</h2>
                <p className="mt-2 text-lg font-medium">{ders.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-black tracking-tight mb-4">Fiyat Bilgileri</h2>
            <ul className="space-y-2">
              {fiyatlar.map((fiyat, index) => (
                <li key={index} className="flex justify-between text-lg font-bold border-b-2 border-[rgba(212,175,55,0.2)] pb-1">
                  <span>{fiyat.item}</span>
                  <span>{fiyat.price}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-4 font-medium">*Fiyatlar özel dersler için geçerlidir. Grup dersleri için iletişime geçin.</p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default PilatesDerslerimPage;