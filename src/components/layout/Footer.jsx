import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Heart } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-black text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png"
              alt="Gizem Hoca" className="h-14 w-auto object-contain mb-4 brightness-0 invert" />
            <p className="text-white/50 text-sm leading-relaxed">Pilates sadece bir egzersiz değil, yaşam felsefesidir. Bedeninizi güçlendirip zihninizi dinlendirin.</p>
          </div>
          <div>
            <h3 className="font-black text-brand-lime text-sm tracking-widest mb-4">SAYFALAR</h3>
            <ul className="space-y-2">
              {[['/', 'Anasayfa'], ['/hakkimda', 'Hakkımda'], ['/dersler', 'Dersler'], ['/program', 'Ders Programı'], ['/fiyatlar', 'Fiyatlar'], ['/galeri', 'Galeri'], ['/blog', 'Blog'], ['/sss', 'SSS'], ['/iletisim', 'İletişim']].map(([path, label]) => (
                <li key={path}><Link to={path} className="text-white/50 hover:text-brand-lime text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-black text-brand-lime text-sm tracking-widest mb-4">İLETİŞİM</h3>
            <ul className="space-y-2 mb-6">
              <li><a href="https://wa.me/905383135720" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-brand-lime text-sm transition-colors">💬 +90 538 313 57 20</a></li>
              <li><a href="mailto:merhaba@gizemhoca.net" className="text-white/50 hover:text-brand-lime text-sm transition-colors">✉️ merhaba@gizemhoca.net</a></li>
              <li className="text-white/50 text-sm">📍 Beşiktaş, İstanbul</li>
            </ul>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/gizemmhoca/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand-lime transition-colors"><Instagram size={22} /></a>
              <a href="https://www.youtube.com/@gizemmhoca" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand-lime transition-colors"><Youtube size={22} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand-lime transition-colors"><Facebook size={22} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© {year} Gizem Hoca Pilates. Tüm hakları saklıdır.</p>
          <p className="text-white/20 text-xs flex items-center gap-1">Made with <Heart size={10} className="text-brand-lime" /> in Istanbul</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
