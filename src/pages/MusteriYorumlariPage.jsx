import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ChevronDown } from 'lucide-react';

const testimonials = [
  { name: 'Elif T.', job: 'Öğretmen', tag: 'Bireysel Ders', rating: 5, date: 'Mart 2025', text: '6 aydır devam ediyorum ve fark inanılmaz. Hem güçlendim hem de kendimi çok daha iyi hissediyorum.' },
  { name: 'Selin A.', job: 'Pazarlama Yöneticisi', tag: 'Reformer', rating: 5, date: 'Şubat 2025', text: 'Sırt ağrılarım için başlamıştım ama sonuçlar beklediğimden çok daha iyi oldu. Duruşum düzeldi.' },
  { name: 'Neslihan K.', job: 'Avukat', tag: 'Grup Ders', rating: 5, date: 'Ocak 2025', text: 'Her ders sonrası yenilenmiş hissediyorum. Sadece egzersiz değil, tam anlamıyla bir terapi.' },
  { name: 'Merve K.', job: 'Doktor', tag: 'Online Ders', rating: 5, date: 'Aralık 2024', text: 'Uzun çalışma saatleri sonrası enerji seviyem gözle görülür arttı. Anlayışlı ve sabırlı yaklaşımı çok değerli.' },
  { name: 'Ayşe B.', job: 'Ev Hanımı', tag: 'Bireysel Ders', rating: 5, date: 'Kasım 2024', text: 'Doğum sonrası özel programla adım adım güçlendim. 4 ayda hem fiziksel hem psikolojik olarak çok daha iyiyim.' },
  { name: 'Zeynep Ö.', job: 'Mimar', tag: 'Online Ders', rating: 5, date: 'Ekim 2024', text: 'Yurt dışından katılıyorum, hiç sorun yok. Sanki yanındaymış gibi pozisyonu düzeltiyor.' },
];

const tags = ['TÜMÜ', 'BİREYSEL DERS', 'GRUP DERS', 'REFORMER', 'ONLİNE DERS'];
const tagMap = { 'TÜMÜ': '', 'BİREYSEL DERS': 'Bireysel Ders', 'GRUP DERS': 'Grup Ders', 'REFORMER': 'Reformer', 'ONLİNE DERS': 'Online Ders' };

const MusteriYorumlariPage = () => {
  const [activeTag, setActiveTag] = useState('TÜMÜ');
  const [visibleCount, setVisibleCount] = useState(4);
  const filtered = activeTag === 'TÜMÜ' ? testimonials : testimonials.filter(t => t.tag === tagMap[activeTag]);
  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <Helmet><title>Müşteri Yorumları - Gizem Hoca Pilates</title></Helmet>
      <div className="border-b-2 border-brand-black p-8 lg:p-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-black tracking-widest text-brand-black/40 mb-3">GİZEM HOCA PİLATES</p>
          <h1 className="text-5xl md:text-7xl font-black text-brand-black leading-none tracking-tighter">YORUMLAR</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-black">5.0</span>
          <div><div className="text-brand-lime text-sm">★★★★★</div><div className="text-[10px] text-brand-black/40">{testimonials.length} yorum</div></div>
        </div>
      </div>
      <div className="flex overflow-x-auto border-b-2 border-brand-black">
        {tags.map(tag => (
          <button key={tag} onClick={() => { setActiveTag(tag); setVisibleCount(4); }}
            className={`px-5 py-3 text-[10px] font-black tracking-widest whitespace-nowrap border-r border-brand-black/10 transition-all ${
              activeTag === tag ? 'bg-black text-brand-lime' : 'bg-brand-bg text-brand-black/50 hover:text-black'
            }`}>
            {tag}
          </button>
        ))}
      </div>
      <div className="divide-y divide-black/10">
        {visible.map((t, i) => (
          <motion.div key={t.name + t.tag} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
            className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-black text-black">{t.name}</p>
              <p className="text-xs text-brand-black/40 mt-1">{t.job}</p>
              <p className="text-xs text-brand-black/30 mt-1">{t.date}</p>
              <span className="inline-block mt-2 text-[9px] font-black tracking-widest border border-brand-black/20 px-2 py-0.5 text-brand-black/50">{t.tag.toUpperCase()}</span>
            </div>
            <div className="md:col-span-3">
              <div className="text-brand-lime text-sm mb-3">★★★★★</div>
              <p className="text-lg text-brand-black/80 leading-relaxed italic">"{t.text}"</p>
            </div>
          </motion.div>
        ))}
      </div>
      {visibleCount < filtered.length && (
        <div className="border-t-2 border-brand-black p-6 text-center">
          <button onClick={() => setVisibleCount(v => v + 4)}
            className="flex items-center gap-2 text-[10px] font-black tracking-widest text-brand-black/50 hover:text-black transition-colors mx-auto">
            DAHA FAZLA GÖSTER <ChevronDown size={14} />
          </button>
        </div>
      )}
    </>
  );
};

export default MusteriYorumlariPage;
