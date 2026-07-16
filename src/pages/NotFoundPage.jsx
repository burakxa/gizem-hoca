import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';

const NotFoundPage = () => (
  <>
    <Helmet><title>Sayfa Bulunamadı - Gizem Hoca Pilates</title></Helmet>
    <div className="border-b-2 border-black p-8 lg:p-12">
      <p className="text-[10px] font-black tracking-widest text-black/40 mb-3">GİZEM HOCA PİLATES</p>
      <h1 className="text-5xl md:text-7xl font-black text-black leading-none tracking-tighter">404</h1>
    </div>
    <div className="p-8 lg:p-12">
      <p className="text-xl font-black text-black mb-3">Sayfa Bulunamadı</p>
      <p className="text-sm text-black/50 mb-8">Aradığınız sayfa taşınmış veya silinmiş olabilir.</p>
      <Link to="/" className="inline-flex items-center gap-2 bg-black text-brand-lime text-[10px] font-black tracking-widest px-6 py-3 hover:bg-black/80 transition-colors">
        ANA SAYFAYA DÖN <ArrowRight size={14} />
      </Link>
    </div>
  </>
);

export default NotFoundPage;
