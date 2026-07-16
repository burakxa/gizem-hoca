import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t-2 border-black">
      <div className="grid grid-cols-1 md:grid-cols-4 border-b-2 border-black">
        <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-black">
          <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png"
            alt="Gizem Hoca" className="h-10 w-auto object-contain mb-4" />
          <p className="text-xs text-black/50 leading-relaxed">Pilates sadece bir egzersiz değil, yaşam felsefesidir.</p>
          <div className="flex gap-4 mt-4">
            <a href="https://www.instagram.com/gizemmhoca/" target="_blank" rel="noopener noreferrer"><Instagram size={18} className="text-black/40 hover:text-black transition-colors" /></a>
            <a href="https://www.youtube.com/@gizemmhoca" target="_blank" rel="noopener noreferrer"><Youtube size={18} className="text-black/40 hover:text-black transition-colors" /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={18} className="text-black/40 hover:text-black transition-colors" /></a>
          </div>
        </div>
        <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-black">
          <h3 className="text-xs font-black tracking-widest text-black mb-4">SAYFALAR</h3>
          <ul className="space-y-2">
            {[['/', 'Anasayfa'], ['/dersler', 'Dersler'], ['/program', 'Ders Programı'], ['/fiyatlar', 'Fiyatlar'], ['/galeri', 'Galeri']].map(([path, label]) => (
              <li key={path}><Link to={path} className="text-xs text-black/50 hover:text-black transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-black">
          <h3 className="text-xs font-black tracking-widest text-black mb-4">DAHA FAZLA</h3>
          <ul className="space-y-2">
            {[['/blog', 'Blog'], ['/hakkimda', 'Hakkımda'], ['/musteri-yorumlari', 'Yorumlar'], ['/sss', 'SSS'], ['/iletisim', 'İletişim']].map(([path, label]) => (
              <li key={path}><Link to={path} className="text-xs text-black/50 hover:text-black transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="p-8 bg-black">
          <h3 className="text-xs font-black tracking-widest text-brand-lime mb-4">İLETİŞİM</h3>
          <ul className="space-y-3">
            <li><a href="https://wa.me/905383135720" target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-brand-lime transition-colors">💬 +90 538 313 57 20</a></li>
            <li><a href="mailto:merhaba@gizemhoca.net" className="text-xs text-white/50 hover:text-brand-lime transition-colors">✉️ merhaba@gizemhoca.net</a></li>
            <li className="text-xs text-white/50">📍 Beşiktaş, İstanbul</li>
          </ul>
          <Link to="/iletisim" className="inline-block mt-6 bg-brand-lime text-black text-xs font-black tracking-widest px-4 py-2 hover:bg-brand-lime/80 transition-colors">
            DERS AL →
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center px-8 py-4">
        <p className="text-xs text-black/40">© {year} Gizem Hoca Pilates. Tüm hakları saklıdır.</p>
        <p className="text-xs text-black/30">Beşiktaş · İstanbul</p>
      </div>
    </footer>
  );
};

export default Footer;
