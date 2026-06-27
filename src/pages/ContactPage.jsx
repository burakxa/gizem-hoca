import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { MessageCircle, Instagram, Youtube, MapPin, Mail, Send, Check } from 'lucide-react';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    // WhatsApp'a yönlendir
    const msg = `Merhaba Gizem Hoca! Ben ${form.name}.${form.phone ? ' Telefon: ' + form.phone + '.' : ''}${form.message ? ' Mesajım: ' + form.message : ''}`;
    setTimeout(() => {
      window.open(`https://wa.me/905383135720?text=${encodeURIComponent(msg)}`, '_blank');
      setLoading(false);
      setSent(true);
      setForm({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 600);
  };

  return (
    <>
      <Helmet>
        <title>İletişim - Gizem Hoca Pilates</title>
        <meta name="description" content="Dersler ve programlar hakkında bilgi almak için iletişime geçin." />
      </Helmet>
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full bg-brand-lime p-8 lg:p-16 overflow-y-auto"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-black text-brand-black leading-none tracking-tighter mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          İletişim
        </motion.h1>
        <motion.p
          className="text-lg text-brand-black/70 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Soru ve talepleriniz için ulaşın.
        </motion.p>

        {/* İletişim kartları */}
        <motion.div
          className="grid grid-cols-1 gap-3 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {[
            { icon: <MessageCircle size={18} />, label: 'WhatsApp', value: '+90 538 313 57 20', href: 'https://wa.me/905383135720', tag: 'En hızlı' },
            { icon: <Instagram size={18} />, label: 'Instagram', value: '@gizemmhoca', href: 'https://www.instagram.com/gizemmhoca/', tag: null },
            { icon: <Youtube size={18} />, label: 'YouTube', value: '@gizemmhoca', href: 'https://www.youtube.com/@gizemmhoca', tag: null },
            { icon: <Mail size={18} />, label: 'E-posta', value: 'merhaba@gizemhoca.net', href: 'mailto:merhaba@gizemhoca.net', tag: null },
            { icon: <MapPin size={18} />, label: 'Stüdyo', value: 'Beşiktaş, İstanbul', href: null, tag: null },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-brand-black/5 hover:bg-brand-black hover:text-brand-lime rounded-xl px-4 py-3 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-brand-black group-hover:text-brand-lime">{item.icon}</span>
                    <div>
                      <div className="text-xs text-brand-black/40 group-hover:text-brand-lime/60">{item.label}</div>
                      <div className="font-bold text-sm text-brand-black group-hover:text-brand-lime">{item.value}</div>
                    </div>
                  </div>
                  {item.tag && <span className="text-xs bg-brand-black text-brand-lime group-hover:bg-brand-lime group-hover:text-brand-black px-2 py-0.5 rounded-full font-bold transition-colors">{item.tag}</span>}
                </a>
              ) : (
                <div className="flex items-center gap-3 bg-brand-black/5 rounded-xl px-4 py-3">
                  <span className="text-brand-black/50">{item.icon}</span>
                  <div>
                    <div className="text-xs text-brand-black/40">{item.label}</div>
                    <div className="font-bold text-sm text-brand-black">{item.value}</div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-black text-brand-black mb-4">Mesaj Gönder</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-brand-black/50 mb-1 block">Ad Soyad *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Adınız"
                  className="w-full bg-brand-black/5 border-2 border-transparent focus:border-brand-black rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-black/50 mb-1 block">Telefon *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="05xx xxx xx xx"
                  className="w-full bg-brand-black/5 border-2 border-transparent focus:border-brand-black rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-brand-black/50 mb-1 block">Mesaj</label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Sormak istedikleriniz..."
                rows={3}
                className="w-full bg-brand-black/5 border-2 border-transparent focus:border-brand-black rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all resize-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading || sent}
              className={`w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                sent ? 'bg-green-500 text-white' : 'bg-brand-black text-brand-lime hover:bg-brand-black/80'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              {sent ? (
                <><Check size={16} /> WhatsApp açıldı!</>
              ) : loading ? (
                'Gönderiliyor...'
              ) : (
                <><Send size={16} /> WhatsApp ile Gönder</>
              )}
            </motion.button>
            <p className="text-xs text-brand-black/40 text-center">Form doldurulunca WhatsApp'ta hazır mesaj açılır.</p>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ContactPage;
