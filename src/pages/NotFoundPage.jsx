import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => (
  <>
    <Helmet><title>Sayfa Bulunamadı - Gizem Hoca Pilates</title></Helmet>
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-8 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="text-[120px] font-black text-brand-black/10 leading-none mb-4 select-none">404</div>
        <h1 className="text-4xl font-black text-brand-black tracking-tight mb-3">Sayfa Bulunamadı</h1>
        <p className="text-brand-black/60 text-lg mb-8 max-w-sm">Aradığınız sayfa taşınmış veya silinmiş olabilir.</p>
        <Link to="/">
          <motion.button
            className="flex items-center gap-2 bg-brand-black text-brand-lime px-6 py-3 rounded-full font-black text-sm mx-auto"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft size={16} /> Ana Sayfaya Dön
          </motion.button>
        </Link>
      </motion.div>
    </div>
  </>
);

export default NotFoundPage;
