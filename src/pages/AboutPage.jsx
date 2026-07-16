import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const GIZEM_PHOTO = 'https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/71e533503d331149fe73f8e165f13f5b.png';

const AboutPage = () => (
  <>
    <Helmet><title>Hakkımda - Gizem Hoca Pilates</title></Helmet>
    <div className="bg-brand-bg">
      <div className="border-b-2 border-brand-black p-8 lg:p-12 flex items-center gap-4">
        <div className="w-8 h-[3px] bg-brand-lime" />
        <div>
          <p className="text-[10px] font-black tracking-widest text-brand-lime mb-1">GİZEM HOCA PİLATES</p>
          <h1 className="text-5xl md:text-7xl font-black text-brand-black leading-none tracking-tighter">HAKKIMDA</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-brand-black">
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-brand-black overflow-hidden" style={{ minHeight: '400px' }}>
          <img src={GIZEM_PHOTO} alt="Gizem Hoca" className="w-full h-full object-cover" style={{ filter: 'sepia(0.35) contrast(1.1)' }} />
        </div>
        <div className="p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <blockquote className="text-2xl font-black text-brand-black leading-tight italic mb-6">"Pilates bir egzersiz değil, yaşam felsefesidir."</blockquote>
            <p className="text-sm text-brand-brown leading-relaxed mb-4">Merhaba, ben Gizem. Hareketin ve sağlığın hayatımızdaki dönüştürücü gücüne her zaman inandım. Pilatesle tanışmam, kendi bedenimin sınırlarını keşfetme arayışımla başladı.</p>
            <p className="text-sm text-brand-brown leading-relaxed mb-8">Derslerimde sadece fiziksel gücü değil, zihin-beden bütünlüğünü ön planda tutuyorum.</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-brand-lime" />
              <p className="text-[10px] font-black tracking-widest text-brand-lime">SERTİFİKALARIM</p>
            </div>
            <ul className="space-y-2 mb-8">
              {['Balanced Body® Mat 1 & 2', 'Balanced Body® Reformer 1, 2 & 3', 'Hamile Pilatesi Uzmanlık Programı', 'Postür Bozuklukları & Rehabilitasyon'].map((cert, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-brand-brown">
                  <span className="text-brand-lime font-black">✦</span> {cert}
                </li>
              ))}
            </ul>
          </div>
          <Link to="/iletisim" className="inline-flex items-center gap-2 bg-brand-lime text-brand-bg text-[10px] font-black tracking-wider px-6 py-3 rounded-full hover:bg-brand-lime/80 transition-colors self-start">
            İLETİŞİME GEÇ <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 border-b-2 border-brand-black">
        {[{ n: '500+', l: 'MUTLU ÖĞRENCİ' }, { n: '8+', l: 'YIL DENEYİM' }, { n: '4', l: 'SERTİFİKA' }].map((stat, i) => (
          <div key={i} className={`p-8 lg:p-12 text-center ${i < 2 ? 'border-r-2 border-brand-black' : ''}`}>
            <div className="text-4xl font-black text-brand-black mb-2">{stat.n}</div>
            <div className="text-[10px] font-black tracking-widest text-brand-lime">{stat.l}</div>
          </div>
        ))}
      </div>

      <div className="bg-brand-black p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-brand-lime">Birlikte çalışalım. ✦</h2>
          <p className="text-sm text-brand-bg/40 mt-2">İlk adımı atmak için iletişime geçin.</p>
        </div>
        <Link to="/fiyatlar">
          <button className="bg-brand-lime text-brand-black text-[10px] font-black tracking-wider px-6 py-3 rounded-full hover:bg-brand-lime/80 transition-colors flex items-center gap-2">
            PAKETLERİ GÖR <ArrowRight size={14} />
          </button>
        </Link>
      </div>
    </div>
  </>
);

export default AboutPage;
