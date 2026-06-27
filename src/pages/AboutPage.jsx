import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Hakkımda - Gizem Hoca Pilates</title>
        <meta name="description" content="Pilates eğitmeni Gizem Hoca'nın yolculuğunu, felsefesini ve uzmanlık alanlarını keşfedin." />
      </Helmet>
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full flex flex-col md:flex-row bg-brand-lime"

      >
        <div className="relative w-full h-full p-8 lg:p-16 flex flex-col justify-between overflow-hidden">
          <div className="relative z-10 w-full md:w-4/5 lg:w-3/4 flex flex-col justify-center flex-grow">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 mb-8"
            >
              <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/71e533503d331149fe73f8e165f13f5b.png" alt="Gizem Hoca" className="w-full h-full object-cover rounded-full grayscale" />
            </motion.div>
            
            <motion.div 
              className="space-y-6 text-lg font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p>
                Merhaba, ben Gizem. Hareketin ve sağlığın hayatımızdaki dönüştürücü gücüne her zaman inandım. Pilatesle tanışmam, kendi bedenimin sınırlarını keşfetme ve zihinsel dinginliği bulma arayışımla başladı. Bu yolculuk, kısa sürede bir tutkuya ve yaşam biçimine dönüştü.
              </p>
              <p>
                Amacım, her bir öğrencimin kendi potansiyelini ortaya çıkarmasına yardımcı olmak. Derslerimde sadece fiziksel gücü değil, aynı zamanda zihin-beden bütünlüğünü de ön planda tutuyorum. Pilatesin, doğru uygulandığında herkes için erişilebilir ve faydalı olduğuna inanıyorum.
              </p>
              <h2 className="text-2xl font-black tracking-tight pt-4">Sertifikalarım</h2>
              <ul className="list-disc list-inside">
                <li>Balanced Body® Mat 1 & 2</li>
                <li>Balanced Body® Reformer 1, 2 & 3</li>
                <li>Hamile Pilatesi Uzmanlık Programı</li>
                <li>Skolyoz ve Postür Bozuklukları için Pilates</li>
              </ul>
            </motion.div>
          </div>
          <div className="h-16 flex-shrink-0"></div>
        </div>
      </motion.div>
    </>
  );
};

export default AboutPage;