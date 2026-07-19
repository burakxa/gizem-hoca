import React from 'react';
    import { motion } from 'framer-motion';

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { staggerChildren: 0.2, duration: 0.5 }
        }
    };

    function WhyMeSection() {
      return (
        <section id="why-me" className="section-padding bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
             <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="font-serif text-4xl font-bold text-brand-primary mb-4">Neden Ben?</h2>
                <p className="text-xl text-brand-text max-w-3xl mx-auto">
                    Farkı yaratan detaylardır. Size özel yaklaşımım ve felsefemle tanışın.
                </p>
              </motion.div>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative h-[500px] rounded-lg overflow-hidden"
              >
                <img loading="lazy"
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
                  alt="Eğitmen Gizem Hoca"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-brand-primary mix-blend-color"></div>
              </motion.div>
              <motion.div
                 variants={textVariants}
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, amount: 0.5 }}
              >
                <motion.h3 variants={textVariants} className="font-serif text-3xl font-bold text-brand-primary mb-6">Felsefem & Yaklaşımım</motion.h3>
                <motion.p variants={textVariants} className="mb-4 text-lg text-brand-text">
                  Her beden eşsizdir ve kendine özgü bir dili vardır. Benim görevim, bu dili anlamanıza ve bedeninizle yeniden bağ kurmanıza yardımcı olmaktır.
                </motion.p>
                <motion.p variants={textVariants} className="mb-6 text-lg text-brand-text">
                  Derslerimde sadece hareket etmeyiz; hareketin kalitesine, nefesin ritmine ve zihnin odaklanmasına önem veririz. Bu, sürdürülebilir sonuçlar ve bütünsel bir iyilik hali getirir.
                </motion.p>
                <motion.div variants={textVariants}>
                    <h4 className="font-bold text-brand-primary text-xl mb-3">Sertifikalarım</h4>
                    <div className="flex flex-wrap gap-4">
                        <motion.span whileHover={{ scale: 1.1, rotate: 5 }} className="bg-brand-accent/20 text-brand-primary px-4 py-2 rounded-full font-medium text-sm">Mat Pilates Uzmanı</motion.span>
                        <motion.span whileHover={{ scale: 1.1, rotate: -5 }} className="bg-brand-accent/20 text-brand-primary px-4 py-2 rounded-full font-medium text-sm">Reformer Pilates Uzmanı</motion.span>
                        <motion.span whileHover={{ scale: 1.1, rotate: 5 }} className="bg-brand-accent/20 text-brand-primary px-4 py-2 rounded-full font-medium text-sm">Hamile Pilatesi</motion.span>
                    </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      );
    }

    export default WhyMeSection;