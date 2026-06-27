import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, MessageCircle } from 'lucide-react';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const faqs = [
  {
    category: 'Başlangıç',
    items: [
      {
        q: 'Pilates kime uygundur?',
        a: 'Pilates her yaştan ve her fitness seviyesinden kişiye uygundur. Yeni başlayanlardan sporculara, hamile kadınlardan yaşlılara kadar herkes için özel programlar oluşturulabilir.',
      },
      {
        q: 'Daha önce hiç spor yapmadım, pilates yapabilir miyim?',
        a: 'Kesinlikle! Pilates, temposu ve zorluğu kişiye göre ayarlanabilen bir disiplindir. İlk derste temel hareketler ve nefes teknikleri öğretilir, sizi zorlamadan ilerleriz.',
      },
      {
        q: 'Kaç derse kadar sonuç görürüm?',
        a: 'Joseph Pilates\'in meşhur sözü: "10 derste fark hissedersin, 20 derste başkaları fark eder, 30 derste yeni bir bedene sahip olursun." Haftada 2-3 ders düzenli olarak yapıldığında 4-6 haftada belirgin değişimler görülür.',
      },
    ],
  },
  {
    category: 'Dersler',
    items: [
      {
        q: 'Bireysel ve grup dersi arasındaki fark nedir?',
        a: 'Bireysel derslerde program tamamen size özel hazırlanır, anında geri bildirim alırsınız ve kendi hızınızda ilerlersiniz. Grup derslerinde ise topluluk enerjisi ve motivasyon yüksektir, maliyet daha uygundur. Her ikisi de kendi avantajları olan harika seçeneklerdir.',
      },
      {
        q: 'Derse ne giyerek gelmeliyim?',
        a: 'Hareketi kısıtlamayan, vücudunuza oturan kıyafetler idealdir. Çok bol kıyafetler eğitmeninizin pozisyonlarınızı görmesini zorlaştırır. Kaydırmaz çorap veya çıplak ayakla derse girilir.',
      },
      {
        q: 'Ders süresi ne kadar?',
        a: 'Tüm dersler 50 dakikadır. İlk ders biraz daha uzun sürebilir çünkü vücut değerlendirmesi ve hedef belirleme yapılır.',
      },
      {
        q: 'Online dersler yüz yüze dersler kadar etkili mi?',
        a: 'Evet! Doğru ekipman ve alan düzenlemesiyle online dersler çok verimli olabilir. Kameradan pozisyonları düzeltebiliyor ve kişisel geri bildirim verebiliyorum. Yurt dışında yaşayan birçok öğrencim online devam etmektedir.',
      },
    ],
  },
  {
    category: 'Sağlık',
    items: [
      {
        q: 'Sırt ağrım var, pilates yapabilir miyim?',
        a: 'Pilates özellikle sırt ağrıları için tavsiye edilen bir egzersiz yöntemidir. Ancak önce doktorunuza danışmanızı öneririm. Durumunuza göre size özel, omurgayı güçlendirici ve destekleyici bir program hazırlarım.',
      },
      {
        q: 'Hamilelikte pilates güvenli midir?',
        a: 'Hamile Pilatesi Uzmanlık Programı sertifikam bulunmaktadır. Hamilelik boyunca (1-2-3. trimester) güvenli egzersiz yapabilirsiniz. Doktor onayıyla başlamanız yeterlidir.',
      },
      {
        q: 'Doğum sonrası ne zaman başlayabilirim?',
        a: 'Normal doğumdan sonra genellikle 6-8 hafta, sezaryenden sonra ise doktor onayıyla 8-12 haftada başlanabilir. Doğum sonrası pilates, diastaz rekti ve pelvik taban rehabilitasyonu için çok faydalıdır.',
      },
    ],
  },
  {
    category: 'Fiyat & Rezervasyon',
    items: [
      {
        q: 'Deneme dersi var mı?',
        a: 'Evet! WhatsApp üzerinden iletişime geçerek ücretsiz tanışma seansı ayarlayabilirsiniz. Bu seansta hedeflerinizi konuşur, size en uygun programı belirleriz.',
      },
      {
        q: 'Ders iptal edebilir miyim?',
        a: 'Dersten 24 saat önce bildirim yapılması durumunda ücretsiz iptal veya ders erteleme imkânı sunulmaktadır. Daha geç bildirimlerde ders hakkı düşer.',
      },
      {
        q: 'Paket satın aldım, ne zaman kullanmalıyım?',
        a: 'Paketlerin geçerlilik süresi satın alma tarihinden itibaren 3 aydır. Bu süre içinde istediğiniz zaman kullanabilirsiniz.',
      },
    ],
  },
];

const SSFPage = () => {
  const [openItems, setOpenItems] = useState({});

  const toggle = (cat, i) => {
    const key = `${cat}-${i}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Helmet>
        <title>Sık Sorulan Sorular - Gizem Hoca Pilates</title>
        <meta name="description" content="Pilates hakkında merak ettiğiniz tüm sorular ve cevapları." />
      </Helmet>
      <motion.div
        className="w-full h-full bg-brand-lime p-8 lg:p-16 overflow-y-auto"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-black text-brand-black leading-none tracking-tighter mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          SSS
        </motion.h1>
        <motion.p
          className="text-lg text-brand-black/70 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Aklınızdaki soruların cevapları burada.
        </motion.p>

        <div className="space-y-10">
          {faqs.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + si * 0.1 }}
            >
              <h2 className="text-xl font-black text-brand-black mb-4 tracking-tight">{section.category}</h2>
              <div className="space-y-2">
                {section.items.map((item, i) => {
                  const key = `${section.category}-${i}`;
                  const isOpen = openItems[key];
                  return (
                    <div key={i} className="border-2 border-brand-black/12 rounded-2xl overflow-hidden">
                      <button
                        className="w-full text-left px-5 py-4 font-bold text-brand-black flex justify-between items-center gap-4"
                        onClick={() => toggle(section.category, i)}
                      >
                        <span className="text-sm md:text-base">{item.q}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <Plus size={20} className="text-brand-black/60" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <p className="px-5 pb-5 text-brand-black/70 text-sm leading-relaxed border-t border-brand-black/10 pt-4">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 bg-brand-black rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div>
            <p className="text-brand-lime font-black text-lg">Başka sorunuz var mı?</p>
            <p className="text-white/50 text-sm mt-1">WhatsApp'tan hemen yanıt alın.</p>
          </div>
          <a
            href="https://wa.me/905383135720?text=Merhaba%2C%20sormak%20istedi%C4%9Fim%20bir%20sorum%20var."
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-xl font-black text-sm whitespace-nowrap"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle size={16} />
              WhatsApp'ta Sor
            </motion.button>
          </a>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SSFPage;
