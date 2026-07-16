import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, MessageCircle } from 'lucide-react';

const faqs = [
  { cat: 'BAŞLANGIÇ', q: 'Pilates kime uygundur?', a: 'Pilates her yaştan ve her fitness seviyesinden kişiye uygundur. Yeni başlayanlardan sporculara, hamile kadınlardan yaşlılara kadar herkes için özel programlar oluşturulabilir.' },
  { cat: 'BAŞLANGIÇ', q: 'Daha önce hiç spor yapmadım, pilates yapabilir miyim?', a: 'Kesinlikle! Pilates, temposu ve zorluğu kişiye göre ayarlanabilen bir disiplindir. İlk derste temel hareketler ve nefes teknikleri öğretilir.' },
  { cat: 'DERSLER', q: 'Bireysel ve grup dersi arasındaki fark nedir?', a: 'Bireysel derslerde program tamamen size özel hazırlanır. Grup derslerinde ise topluluk enerjisi yüksektir, maliyet daha uygundur.' },
  { cat: 'DERSLER', q: 'Derse ne giyerek gelmeliyim?', a: 'Hareketi kısıtlamayan, vücudunuza oturan kıyafetler idealdir. Kaydırmaz çorap veya çıplak ayakla girilir.' },
  { cat: 'DERSLER', q: 'Online dersler yüz yüze kadar etkili mi?', a: 'Evet! Kameradan pozisyonları düzeltebiliyor ve kişisel geri bildirim verebiliyorum. Yurt dışında yaşayan birçok öğrencim online devam etmektedir.' },
  { cat: 'SAĞLIK', q: 'Sırt ağrım var, pilates yapabilir miyim?', a: 'Pilates özellikle sırt ağrıları için tavsiye edilen bir yöntemdir. Önce doktorunuza danışmanızı öneririm, sonra size özel program hazırlarım.' },
  { cat: 'SAĞLIK', q: 'Hamilelikte pilates güvenli midir?', a: 'Hamile Pilatesi Uzmanlık Programı sertifikam bulunmaktadır. Doktor onayıyla hamileliğin her döneminde güvenle yapılabilir.' },
  { cat: 'FİYAT', q: 'Deneme dersi var mı?', a: 'Evet! WhatsApp üzerinden iletişime geçerek ücretsiz tanışma seansı ayarlayabilirsiniz.' },
  { cat: 'FİYAT', q: 'Ders iptal edebilir miyim?', a: 'Dersten 24 saat önce bildirim yapılması durumunda ücretsiz iptal veya ders erteleme imkânı sunulmaktadır.' },
];

const SSFPage = () => {
  const [openItem, setOpenItem] = useState(null);

  return (
    <>
      <Helmet><title>SSS - Gizem Hoca Pilates</title></Helmet>

      <div className="border-b-2 border-brand-black p-8 lg:p-12">
        <p className="text-[10px] font-black tracking-widest text-brand-black/40 mb-3">GİZEM HOCA PİLATES</p>
        <h1 className="text-5xl md:text-7xl font-black text-brand-black leading-none tracking-tighter">SSS</h1>
      </div>

      <div className="divide-y divide-black/10">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button className="w-full text-left p-6 lg:p-8 flex items-start justify-between gap-6 hover:bg-brand-black/[0.02] transition-colors"
              onClick={() => setOpenItem(openItem === i ? null : i)}>
              <div className="flex gap-6 items-start">
                <span className="text-[9px] font-black tracking-widest text-brand-black/30 mt-1 min-w-[80px]">{faq.cat}</span>
                <span className="text-sm font-black text-black">{faq.q}</span>
              </div>
              <motion.div animate={{ rotate: openItem === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 mt-0.5">
                <Plus size={18} className="text-brand-black/30" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openItem === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-6 lg:px-8 pb-6 pl-[134px] text-sm text-brand-black/55 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-brand-black bg-brand-black p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-lg font-black text-brand-lime">Başka sorunuz var mı?</p>
          <p className="text-sm text-white/40 mt-1">WhatsApp'tan hemen yanıt alın.</p>
        </div>
        <a href="https://wa.me/905383135720?text=Merhaba%2C%20sormak%20istedi%C4%9Fim%20bir%20sorum%20var." target="_blank" rel="noopener noreferrer">
          <button className="flex items-center gap-2 bg-brand-lime text-brand-black text-[10px] font-black tracking-widest px-6 py-3 hover:bg-brand-lime/80 transition-colors">
            <MessageCircle size={14} /> WHATSAPP'TA SOR
          </button>
        </a>
      </div>
    </>
  );
};

export default SSFPage;
