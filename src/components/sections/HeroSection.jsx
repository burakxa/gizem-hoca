import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section id="hero" className="relative h-[80vh] md:h-screen flex items-center justify-center text-center text-white overflow-hidden bg-brand-surface">
      <div className="absolute inset-0 z-0">
        <img loading="lazy" alt="Sakin bir pilates stüdyosu, güneş ışığı vuruyor" className="w-full h-full object-cover opacity-30" src="https://images.unsplash.com/photo-1687783615476-f4c12358ca9d" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-background via-brand-background/70 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-heading mb-4 leading-tight tracking-tight">
              Pilates Eğitmeni Gizem
            </h1>
         </motion.div>
         <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-brand-text max-w-2xl mx-auto mb-10"
          >
            Bedeniniz ve Zihniniz İçin Denge
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/iletisim">
              <Button size="lg" className="bg-brand-primary text-brand-heading hover:bg-brand-primary/80 font-bold text-lg rounded-full px-8 py-6 transition-all duration-300 shadow-md hover:shadow-lg">
                Hemen Başla <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;