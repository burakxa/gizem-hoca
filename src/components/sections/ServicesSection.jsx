import React from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { User, Users, Heart, Monitor } from 'lucide-react';
    
    const services = [
      {
        title: "Kişisel Antrenman",
        icon: <User className="w-10 h-10 text-cyan-400" />,
        description: "Sadece size özel hazırlanan programlarla hedeflerinize en hızlı ve güvenli yoldan ulaşın.",
        gradient: 'from-blue-500 to-cyan-400',
        borderColor: 'hover:border-cyan-400'
      },
      {
        title: "Grup Dersleri",
        icon: <Users className="w-10 h-10 text-emerald-400" />,
        description: "Küçük grup derslerinin enerjisiyle motive olun, benzer hedeflere sahip insanlarla tanışın.",
        gradient: 'from-green-500 to-emerald-400',
        borderColor: 'hover:border-emerald-400'
      },
      {
        title: "Mindfulness Pilates",
        icon: <Heart className="w-10 h-10 text-fuchsia-400" />,
        description: "Beden ve zihin bütünlüğünü sağlayan, stresten arındıran özel seanslar.",
        gradient: 'from-purple-500 to-fuchsia-400',
        borderColor: 'hover:border-fuchsia-400'
      },
      {
        title: "Online Dersler",
        icon: <Monitor className="w-10 h-10 text-amber-400" />,
        description: "Nerede olursanız olun, profesyonel rehberlikle formda kalın. Esnek ve erişilebilir.",
        gradient: 'from-orange-500 to-amber-400',
        borderColor: 'hover:border-amber-400'
      },
    ];
    
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
      },
    };
    
    const itemVariants = {
      hidden: { opacity: 0, y: 50, scale: 0.8 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };
    
    function ServicesSection({ handleNotImplemented, isPreview = false, onBookClassClick }) {
      const displayedServices = isPreview ? services.slice(0, 4) : services;
      const whatsappUrl = 'https://wa.me/905000000000'; // TODO: Replace with actual number

      const handleWhatsAppRedirect = () => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      };
    
      return (
        <section id="hizmetler-preview" className="section-padding bg-brand-dark">
          <div className="max-w-screen-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              {isPreview && <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 gradient-text secondary-gradient-text">Enerjini Yükselt</h2>}
            </motion.div>
    
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {displayedServices.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex flex-col bg-neutral-800 rounded-lg shadow-lg p-8 text-center text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-neon/20 border-2 border-transparent ${service.borderColor}`}
                >
                  <div className="mx-auto mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold uppercase mb-4">{service.title}</h3>
                  <p className="text-gray-300 flex-grow mb-8">{service.description}</p>
                  {!isPreview && 
                    <Button onClick={handleWhatsAppRedirect} variant="outline" className="w-full mt-auto font-bold transition-transform hover:scale-105 hover:bg-brand-neon hover:text-brand-dark border-brand-neon text-brand-neon">
                      Bilgi Alın
                    </Button>
                  }
                </motion.div>
              ))}
            </motion.div>
            {isPreview && (
                <motion.div 
                  className="text-center mt-16"
                  initial={{opacity: 0}}
                  whileInView={{opacity: 1}}
                  viewport={{once: true}}
                  transition={{duration: 0.5, delay: 0.5}}
                >
                    <Link to="/hizmetler">
                        <Button size="lg" className="glowing-btn text-lg px-8 py-6">Tüm Hizmetleri Gör</Button>
                    </Link>
                </motion.div>
            )}
          </div>
        </section>
      );
    }
    
    export default ServicesSection;