import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-bg border-t-2 border-brand-black">
      <div className="grid grid-cols-1 md:grid-cols-4 border-b-2 border-brand-black">
        <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-brand-black">
          <div className="text-lg font-black text-brand-black mb-4">GIZEM<span className="text-brand-lime">●</span>HOCA</div>
          <p className="text-xs text-brand-brown leading-relaxed mb-4">Pilates sadece bir egzersiz değil, yaşam felsefesidir.</p>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/gizemmhoca/" target="_blank" rel="noopener noreferrer"><Instagram size={18} className="text-brand-brown hover:text-brand-black transition-colors" /></a>
            <a href="https://www.youtube.com/@gizemmhoca" target="_blank" rel="noopener noreferrer"><Youtube size={18} className="text-brand-brown hover:text-brand-black transition-colors" /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={18} className="text-brand-brown hover:text-brand-black transition-colors" /></a>
          </div>
        </div>
        <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-brand-black">
          <h3 className="text-[10px] font-black tracking-widest text-brand-lime mb-4">SAYFALAR</h3>
          <ul className="space-y-2">
            {[['/', 'Anasayfa'], ['/dersler', 'Dersler'], ['/program', 'Program'], ['/fiyatlar', 'Fiyatlar'], ['/galeri', 'Galeri']].map(([p, l]) => (
              <li key={p}><Link to={p} className="text-xs text-brand-brown hover:text-brand-black transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-brand-black">
          <h3 className="text-[10px] font-black tracking-widest text-brand-lime mb-4">DAHA FAZLA</h3>
          <ul className="space-y-2">
            {[['/blog', 'Blog'], ['/hakkimda', 'Hakkımda'], ['/musteri-yorumlari', 'Yorumlar'], ['/sss', 'SSS'], ['/iletisim', 'İletişim']].map(([p, l]) => (
              <li key={p}><Link to={p} className="text-xs text-brand-brown hover:text-brand-black transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div className="p-8 bg-brand-black">
          <h3 className="text-[10px] font-black tracking-widest text-brand-lime mb-4">İLETİŞİM</h3>
          <ul className="space-y-3">
            <li><a href="https://wa.me/905383135720" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-bg/50 hover:text-brand-lime transition-colors">💬 +90 538 313 57 20</a></li>
            <li><a href="mailto:merhaba@gizemhoca.net" className="text-xs text-brand-bg/50 hover:text-brand-lime transition-colors">✉️ merhaba@gizemhoca.net</a></li>
            <li className="text-xs text-brand-bg/50">📍 Beşiktaş, İstanbul</li>
          </ul>
          <Link to="/iletisim" className="inline-block mt-6 bg-brand-lime text-brand-bg text-[10px] font-black tracking-wider px-5 py-2 rounded-full hover:bg-brand-lime/80 transition-colors">
            DERS AL ✦
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center px-8 py-4">
        <p className="text-xs text-brand-brown">© {year} Gizem Hoca Pilates. Tüm hakları saklıdır.</p>
        <p className="text-xs text-brand-tan">Est. 2016 · Beşiktaş, İstanbul</p>
      </div>
    </footer>
  );
};

export default Footer;
