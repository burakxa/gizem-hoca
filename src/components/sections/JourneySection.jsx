import React from 'react';
    import { motion } from 'framer-motion';
    import { PlayCircle, Target, Award } from 'lucide-react';

    const journeySteps = [
      {
        icon: <PlayCircle size={40} className="text-brand-accent" />,
        title: "Başlangıç",
        description: "Pilates dünyasına ilk adımı atın. Temel prensipleri öğrenin ve bedeninizi tanıyın.",
      },
      {
        icon: <Target size={40} className="text-brand-accent" />,
        title: "İlerleme",
        description: "Tekniğinizi geliştirin, gücünüzü ve esnekliğinizi artırın. Yeni hareketlerle meydan okuyun.",
      },
      {
        icon: <Award size={40} className="text-brand-accent" />,
        title: "Dönüşüm",
        description: "Bedeniniz ve zihniniz arasındaki uyumu yakalayın. Pilatesi bir yaşam tarzı haline getirin.",
      },
    ];

    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3,
        },
      },
    };

    const item = {
      hidden: { opacity: 0, y: 50 },
      show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    function JourneySection() {
      return (
        <section id="journey" className="section-padding bg-brand-neutral">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl font-bold text-brand-primary mb-4"
            >
              Pilates Yolculuğunuz
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-brand-text max-w-3xl mx-auto mb-16"
            >
              Herkesin yolculuğu özeldir. Sizin için hazırladığımız aşamalarla potansiyelinizi keşfedin.
            </motion.p>

            <motion.div 
              className="relative"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-accent/30 -translate-y-1/2 hidden md:block"></div>
              <div className="grid md:grid-cols-3 gap-12">
                {journeySteps.map((step, index) => (
                  <motion.div key={index} className="relative z-10" variants={item}>
                    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                      <div className="mb-6 bg-brand-primary/10 p-4 rounded-full">{step.icon}</div>
                      <h3 className="text-2xl font-serif font-bold text-brand-primary mb-3">{step.title}</h3>
                      <p className="text-brand-text leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      );
    }

    export default JourneySection;