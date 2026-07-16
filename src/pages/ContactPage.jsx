import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { MessageCircle, Instagram, Youtube, MapPin, Mail, Send, Check } from 'lucide-react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    const msg = `Merhaba Gizem Hoca! Ben ${form.name}. Telefon: ${form.phone}.${form.message ? ' Mesajım: ' + form.message : ''}`;
    setTimeout(() => {
      window.open(`https://wa.me/905383135720?text=${encodeURIComponent(msg)}`, '_blank');
      setLoading(false);
      setSent(true);
      setForm({ name: '', phone: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 600);
  };

  const contacts = [
    { icon: <MessageCircle size={16} />, label: 'WHATSAPP', value: '+90 538 313 57 20', href: 'https://wa.me/905383135720', tag: 'EN HIZLI' },
    { icon: <Instagram size={16} />, label: 'INSTAGRAM', value: '@gizemmhoca', href: 'https://www.instagram.com/gizemmhoca/' },
    { icon: <Youtube size={16} />, label: 'YOUTUBE', value: '@gizemmhoca', href: 'https://www.youtube.com/@gizemmhoca' },
    { icon: <Mail size={16} />, label: 'E-POSTA', value: 'merhaba@gizemhoca.net', href: 'mailto:merhaba@gizemhoca.net' },
    { icon: <MapPin size={16} />, label: 'STÜDYO', value: 'Beşiktaş, İstanbul', href: null },
  ];

  return (
    <>
      <Helmet><title>İletişim - Gizem Hoca Pilates</title></Helmet>
      <div className="border-b-2 border-black p-8 lg:p-12">
        <p className="text-[10px] font-black tracking-widest text-black/40 mb-3">GİZEM HOCA PİLATES</p>
        <h1 className="text-5xl md:text-7xl font-black text-black leading-none tracking-tighter">İLETİŞİM</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black">
        {/* İletişim kanalları */}
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-black divide-y divide-black/10">
          {contacts.map((c, i) => (
            <div key={i}>
              {c.href ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 group hover:bg-black transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-black/40 group-hover:text-brand-lime transition-colors">{c.icon}</span>
                    <div>
                      <div className="text-[9px] font-black tracking-widest text-black/40 group-hover:text-white/40 transition-colors">{c.label}</div>
                      <div className="text-sm font-bold text-black group-hover:text-white transition-colors">{c.value}</div>
                    </div>
                  </div>
                  {c.tag && <span className="text-[9px] font-black tracking-widest bg-black text-brand-lime group-hover:bg-brand-lime group-hover:text-black px-3 py-1 transition-colors">{c.tag}</span>}
                </a>
              ) : (
                <div className="flex items-center gap-4 p-6">
                  <span className="text-black/30">{c.icon}</span>
                  <div>
                    <div className="text-[9px] font-black tracking-widest text-black/40">{c.label}</div>
                    <div className="text-sm font-bold text-black">{c.value}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Form */}
        <div className="p-8 lg:p-12">
          <p className="text-[10px] font-black tracking-widest text-black/40 mb-8">MESAJ GÖNDER</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black tracking-widest text-black/40 mb-2 block">AD SOYAD *</label>
                <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Adınız"
                  className="w-full border-2 border-black/10 focus:border-black bg-white px-4 py-3 text-sm outline-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest text-black/40 mb-2 block">TELEFON *</label>
                <input type="tel" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="05xx xxx xx xx"
                  className="w-full border-2 border-black/10 focus:border-black bg-white px-4 py-3 text-sm outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black tracking-widest text-black/40 mb-2 block">MESAJ</label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Sormak istedikleriniz..."
                rows={4}
                className="w-full border-2 border-black/10 focus:border-black bg-white px-4 py-3 text-sm outline-none transition-all resize-none" />
            </div>
            <motion.button type="submit" disabled={loading || sent} whileTap={{ scale: 0.98 }}
              className={`w-full py-4 text-[10px] font-black tracking-widest flex items-center justify-center gap-2 transition-colors ${
                sent ? 'bg-green-600 text-white' : 'bg-black text-brand-lime hover:bg-black/80'
              }`}>
              {sent ? <><Check size={14} /> WHATSAPP AÇILDI!</> : loading ? 'GÖNDERİLİYOR...' : <><Send size={14} /> WHATSAPP İLE GÖNDER</>}
            </motion.button>
            <p className="text-[10px] text-black/30 text-center">Form doldurulunca WhatsApp'ta hazır mesaj açılır.</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
