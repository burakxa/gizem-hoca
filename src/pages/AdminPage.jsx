import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Sparkles, Copy, Check, BookOpen, Calendar, DollarSign, HelpCircle, Megaphone, ChevronDown, ChevronUp, Edit3, X } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldBorder:'rgba(212,175,55,0.2)', goldFaint:'rgba(212,175,55,0.08)', white:'rgba(255,255,255,0.92)', whiteMid:'rgba(255,255,255,0.65)', whiteLow:'rgba(255,255,255,0.3)' };

const templates = [
  {
    category: 'Blog Yazısı',
    icon: BookOpen,
    color: '#00e87a',
    items: [
      {
        label: 'Yeni Blog Yazısı',
        desc: 'allBlogPosts dizisine eklenecek hazır şablon',
        file: 'src/data/blogData.jsx → allBlogPosts dizisine ekle',
        content: `{
  id: 15,
  title: 'Buraya Başlık Yaz',
  date: '19 Temmuz 2026',
  category: 'Sağlık',
  summary: 'Buraya kısa açıklama yaz (1-2 cümle).',
  image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
  readTime: 5,
  tags: ['pilates', 'sağlık'],
  content: \`
    <p>Giriş paragrafı buraya gelecek.</p>
    <h3>Birinci Bölüm Başlığı</h3>
    <p>İçerik buraya gelecek.</p>
    <h3>İkinci Bölüm Başlığı</h3>
    <p>İçerik buraya gelecek.</p>
    <h3>Sonuç</h3>
    <p>Kapanış paragrafı buraya gelecek.</p>
  \`
}`
      },
      {
        label: 'Instagram Gönderisi',
        desc: 'Kopyalayıp direkt Instagram\'a yapıştır',
        file: 'Instagram → Yeni gönderi',
        content: `✨ [Konu hakkında dikkat çekici bir cümle]

[2-3 cümlelik açıklama. Öğrencilere fayda sağlayacak bilgi ver.]

👉 [Harekete geçirici mesaj — örn: "Ücretsiz deneme dersi için DM at!"]

#pilates #beşiktaş #istanbul #pilatesestrüdyosu #sağlıklıyaşam #reformerpilates #matpilates #wellness #gizemhoca`
      },
      {
        label: 'WhatsApp Duyurusu',
        desc: 'Öğrencilere toplu mesaj',
        file: 'WhatsApp → Toplu mesaj',
        content: `Merhaba! 👋

[Bu haftaki/ayki özel duyuru veya bilgi buraya]

📅 [Tarih/Saat varsa ekle]
📍 [Lokasyon: Stüdyo / Online]

Rezervasyon ve bilgi için bana yazabilirsiniz. 🙏

Sevgiyle,
Gizem Hoca ✦`
      },
    ]
  },
  {
    category: 'Program',
    icon: Calendar,
    color: '#75aadb',
    items: [
      {
        label: 'Yeni Ders Ekle',
        desc: 'ProgramPage.jsx → schedule nesnesine ekle',
        file: 'src/pages/ProgramPage.jsx → schedule[\'Gün\'] dizisine ekle',
        content: `{ time:'09:00', title:'Yeni Ders Adı', type:'Grup', spots:4, duration:50, level:'Tüm Seviyeler' }`
      },
      {
        label: 'Yeni Gün Ekle',
        desc: 'Schedule nesnesine yeni gün bloğu',
        file: 'src/pages/ProgramPage.jsx → schedule nesnesine ekle',
        content: `'Pazar': [
  { time:'10:00', title:'Mat Pilates', type:'Grup', spots:4, duration:50, level:'Başlangıç' },
  { time:'12:00', title:'Reformer Özel', type:'Bireysel', spots:1, duration:50, level:'Orta' },
],`
      },
      {
        label: 'Program Duyurusu',
        desc: 'Yeni ders için duyuru metni',
        file: 'WhatsApp / Instagram',
        content: `🆕 YENİ DERS EKLENDİ!

[Ders adı] dersimizi programa ekledik! 🎉

📅 Gün: [Gün adı]
🕐 Saat: [Saat]
👥 Format: [Grup / Bireysel / Online]
🎯 Seviye: [Başlangıç / Orta / İleri]

Kontenjan sınırlı! Yer ayırtmak için hemen yazın 👇
wa.me/905383135720`
      },
    ]
  },
  {
    category: 'Fiyat & Paket',
    icon: DollarSign,
    color: G.gold,
    items: [
      {
        label: 'Yeni Paket Ekle',
        desc: 'FiyatlarPage.jsx → plans dizisine ekle',
        file: 'src/pages/FiyatlarPage.jsx → plans dizisine ekle',
        content: `{
  name: 'ÖZEL', emoji: '💎', sub: 'Sınırlı süre kampanya',
  price: { b: '999', g: '599' }, sessions: '6 Ders', period: 'ay',
  features: [
    'Haftada 2 ders',
    'Mat pilates',
    'Kişisel program',
    'WhatsApp destek',
  ],
  color: '#75aadb',
}`
      },
      {
        label: 'Kampanya Metni',
        desc: 'İndirim duyurusu',
        file: 'WhatsApp / Instagram',
        content: `🎊 ÖZEL KAMPANYA!

[Kampanya adı veya sebebi] nedeniyle tüm paketlerde %[X] indirim!

🗓 Son gün: [Tarih]
💰 [Eski fiyat] yerine [Yeni fiyat]

Fırsatı kaçırmayın! 👇
wa.me/905383135720

#pilates #kampanya #beşiktaş`
      },
      {
        label: 'Fiyat Güncelleme',
        desc: 'Paket fiyatlarını değiştir',
        file: 'src/pages/FiyatlarPage.jsx → plans[].price',
        content: `// plans dizisinde şu alanları güncelle:
price: { b: 'YENİ_BİREYSEL_FİYAT', g: 'YENİ_GRUP_FİYATI' }

// Örnek:
// BAŞLANGIÇ paketi için: price: { b: '900', g: '500' }
// DÜZENLİ paketi için:   price: { b: '1600', g: '800' }
// YOĞUN paketi için:     price: { b: '2400', g: '1200' }`
      },
    ]
  },
  {
    category: 'SSS',
    icon: HelpCircle,
    color: '#ff9fd4',
    items: [
      {
        label: 'Yeni Soru Ekle',
        desc: 'SSFPage.jsx → faqs dizisine ekle',
        file: 'src/pages/SSFPage.jsx → faqs dizisinin ilgili kategorisine ekle',
        content: `{
  q: 'Buraya soruyu yaz?',
  a: 'Buraya cevabı yaz. Detaylı ve samimi bir dille açıkla.',
  tags: ['etiket1', 'etiket2'],
}`
      },
      {
        label: 'Yeni SSS Kategorisi',
        desc: 'Yeni bir kategori bloğu',
        file: 'src/pages/SSFPage.jsx → faqs dizisine yeni blok ekle',
        content: `{
  cat: 'Yeni Kategori',
  icon: '📌',
  items: [
    {
      q: 'Birinci soru?',
      a: 'Birinci cevap.',
      tags: ['etiket'],
    },
    {
      q: 'İkinci soru?',
      a: 'İkinci cevap.',
      tags: ['etiket'],
    },
  ],
},`
      },
    ]
  },
  {
    category: 'İçerik',
    icon: Megaphone,
    color: '#ffd166',
    items: [
      {
        label: 'E-posta Bülteni',
        desc: 'Aylık bülten taslağı',
        file: 'E-posta servisi / Mailchimp vb.',
        content: `Konu: [Ay] Pilates Bülteni — [Başlık]

Merhaba [İsim],

✨ BU AYKİ İPUCU
[Kısa pilates veya wellness ipucu — 2-3 cümle]

📅 YENİ DERSLER
[Varsa yeni eklenen dersler]

🎁 ÖZEL TEKLİF
[Varsa kampanya veya duyuru]

📖 BLOG'DAN
[Son blog yazısı başlığı ve linki]

Sorularınız için her zaman buradayım!
Sevgiyle,
Gizem Hoca

gizemhoca.net | wa.me/905383135720`
      },
      {
        label: 'Öğrenci Motivasyonu',
        desc: 'Öğrencilere teşvik mesajı',
        file: 'WhatsApp / Instagram Story',
        content: `💪 BUGÜNÜN MOTİVASYONU

"[İlham verici bir pilates veya sağlık alıntısı]"

Harekete başlamak için mükemmel bir gün beklemeye gerek yok.
Küçük bir adım, büyük bir dönüşümün başlangıcıdır. 🌟

Bugün dersini yaptın mı? 💬`
      },
      {
        label: 'Etkinlik Duyurusu',
        desc: 'Atölye veya özel ders duyurusu',
        file: 'WhatsApp / Instagram',
        content: `🗓 ETKİNLİK DUYURUSU

[Etkinlik Adı]

📅 Tarih: [Tarih]
🕐 Saat: [Saat]
📍 Yer: [Stüdyo / Online / Adres]
👥 Kontenjan: [Kaç kişi]
💰 Ücret: [Fiyat veya Ücretsiz]

[Etkinlik hakkında 2-3 cümle açıklama]

Yer ayırtmak için 👇
wa.me/905383135720

#pilates #workshop #beşiktaş #gizemhoca`
      },
    ]
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <motion.button onClick={copy} whileTap={{ scale:0.95 }}
      style={{ display:'flex', alignItems:'center', gap:'6px', background:copied?'rgba(0,232,122,0.12)':'rgba(212,175,55,0.1)', border:`1px solid ${copied?'rgba(0,232,122,0.3)':G.goldBorder}`, color:copied?'#00e87a':G.gold, fontSize:'12px', fontWeight:700, padding:'7px 14px', borderRadius:'999px', cursor:'pointer', fontFamily:'Montserrat', transition:'all 0.2s' }}>
      {copied ? <><Check size={13}/> Kopyalandı!</> : <><Copy size={13}/> Kopyala</>}
    </motion.button>
  );
}

function TemplateCard({ item }) {
  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState(item.content);

  return (
    <div style={{ border:`1px solid ${G.goldBorder}`, borderRadius:'12px', overflow:'hidden', marginBottom:'8px', background:'rgba(13,27,62,0.4)' }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width:'100%', textAlign:'left', padding:'14px 16px', background:'none', border:'none', cursor:'pointer', fontFamily:'Montserrat', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px' }}>
        <div>
          <div style={{ fontSize:'13px', fontWeight:900, color:'#fff' }}>{item.label}</div>
          <div style={{ fontSize:'11px', color:G.whiteMid, marginTop:'2px' }}>{item.desc}</div>
        </div>
        {open ? <ChevronUp size={15} style={{ color:G.gold, flexShrink:0 }} /> : <ChevronDown size={15} style={{ color:G.gold, flexShrink:0 }} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} style={{ overflow:'hidden' }}>
            <div style={{ padding:'0 16px 16px' }}>
              {/* Dosya yolu */}
              <div style={{ background:'rgba(212,175,55,0.06)', border:`1px solid rgba(212,175,55,0.15)`, borderRadius:'8px', padding:'8px 12px', marginBottom:'10px', display:'flex', alignItems:'center', gap:'8px' }}>
                <Edit3 size={12} style={{ color:G.gold, flexShrink:0 }} />
                <span style={{ fontSize:'11px', color:G.gold, fontWeight:700 }}>Nereye eklenecek:</span>
                <span style={{ fontSize:'11px', color:G.whiteMid }}>{item.file}</span>
              </div>
              {/* Düzenlenebilir içerik */}
              <textarea value={edited} onChange={e => setEdited(e.target.value)} rows={12}
                style={{ width:'100%', background:'rgba(7,16,41,0.8)', border:`1px solid ${G.goldBorder}`, borderRadius:'10px', padding:'12px 14px', fontSize:'12px', color:G.white, outline:'none', fontFamily:'monospace', resize:'vertical', lineHeight:1.7, boxSizing:'border-box' }} />
              <div style={{ display:'flex', gap:'8px', marginTop:'10px', flexWrap:'wrap' }}>
                <CopyButton text={edited} />
                <button onClick={() => setEdited(item.content)}
                  style={{ display:'flex', alignItems:'center', gap:'5px', background:'transparent', border:`1px solid rgba(255,255,255,0.1)`, color:G.whiteLow, fontSize:'11px', fontWeight:700, padding:'7px 12px', borderRadius:'999px', cursor:'pointer', fontFamily:'Montserrat' }}>
                  <X size={11} /> Sıfırla
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminPage() {
  const { isLoggedIn, login, logout } = useAdmin();
  const [pass, setPass] = useState('');
  const [activecat, setActiveCat] = useState('Blog Yazısı');

  if (!isLoggedIn) return (
    <div style={{ minHeight:'100vh', background:G.bg, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Montserrat' }}>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        style={{ background:G.dark, border:`1px solid ${G.goldBorder}`, borderRadius:'20px', padding:'40px', width:'min(400px,90vw)', textAlign:'center' }}>
        <div style={{ width:'64px', height:'64px', borderRadius:'16px', background:'rgba(212,175,55,0.12)', border:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:'28px' }}>
          ✦
        </div>
        <h1 style={{ fontSize:'22px', fontWeight:900, color:'#fff', marginBottom:'6px' }}>Admin Panel</h1>
        <p style={{ fontSize:'13px', color:G.whiteMid, marginBottom:'28px' }}>Gizem Hoca Site Yönetimi</p>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&login(pass)}
          placeholder="Şifre girin" autoFocus
          style={{ width:'100%', background:'rgba(212,175,55,0.07)', border:`1px solid ${G.goldBorder}`, borderRadius:'10px', padding:'12px 16px', fontSize:'14px', color:'#fff', outline:'none', fontFamily:'Montserrat', marginBottom:'12px', boxSizing:'border-box' }} />
        <motion.button onClick={()=>login(pass)} whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
          style={{ width:'100%', background:G.gold, color:G.bg, fontSize:'13px', fontWeight:900, padding:'13px', borderRadius:'999px', border:'none', cursor:'pointer', fontFamily:'Montserrat', letterSpacing:'0.06em' }}>
          Giriş Yap
        </motion.button>
      </motion.div>
    </div>
  );

  const activeTpl = templates.find(t => t.category === activecat);

  return (
    <div style={{ minHeight:'calc(100vh - 110px)', background:G.bg, fontFamily:'Montserrat', display:'grid', gridTemplateColumns:'220px 1fr' }}>

      {/* Sol sidebar */}
      <div style={{ background:G.dark, borderRight:`1px solid ${G.goldBorder}`, padding:'16px 10px', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'0 6px 16px', borderBottom:`1px solid ${G.goldBorder}`, marginBottom:'12px' }}>
          <div style={{ fontSize:'10px', fontWeight:900, letterSpacing:'0.15em', color:G.gold }}>ŞABLONLAR</div>
          <div style={{ fontSize:'11px', color:G.whiteMid, marginTop:'3px' }}>Seç, düzenle, kopyala</div>
        </div>

        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:'4px' }}>
          {templates.map(t => {
            const Icon = t.icon;
            const isActive = activecat === t.category;
            return (
              <button key={t.category} onClick={() => setActiveCat(t.category)}
                style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px', borderRadius:'10px', border:'none', background:isActive?`${t.color}18`:'transparent', color:isActive?t.color:G.whiteMid, cursor:'pointer', fontFamily:'Montserrat', fontSize:'13px', fontWeight:isActive?900:400, transition:'all 0.15s', textAlign:'left' }}>
                <Icon size={15} style={{ color:isActive?t.color:G.whiteMid, flexShrink:0 }} />
                {t.category}
                <span style={{ marginLeft:'auto', fontSize:'10px', background:`${t.color}22`, color:t.color, padding:'2px 7px', borderRadius:'999px' }}>{t.items.length}</span>
              </button>
            );
          })}
        </div>

        <button onClick={logout}
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', background:'rgba(255,68,68,0.08)', border:'1px solid rgba(255,68,68,0.2)', color:'rgba(255,100,100,0.8)', fontSize:'12px', fontWeight:700, padding:'10px', borderRadius:'10px', cursor:'pointer', fontFamily:'Montserrat', marginTop:'12px' }}>
          <LogOut size={13} /> Çıkış
        </button>
      </div>

      {/* Sağ içerik */}
      <div style={{ padding:'24px', overflowY:'auto' }}>
        {activeTpl && (
          <>
            <div style={{ marginBottom:'20px' }}>
              <h2 style={{ fontSize:'20px', fontWeight:900, color:'#fff', marginBottom:'5px' }}>{activeTpl.category} Şablonları</h2>
              <p style={{ fontSize:'13px', color:G.whiteMid }}>Şablonu tıkla → düzenle → kopyala → ilgili dosyaya yapıştır.</p>
            </div>

            {/* Nasıl kullanılır */}
            <div style={{ background:'rgba(212,175,55,0.06)', border:`1px solid rgba(212,175,55,0.2)`, borderRadius:'12px', padding:'14px 16px', marginBottom:'20px', display:'flex', alignItems:'flex-start', gap:'10px' }}>
              <span style={{ fontSize:'18px', flexShrink:0 }}>💡</span>
              <div style={{ fontSize:'12px', color:G.whiteMid, lineHeight:1.7 }}>
                <strong style={{ color:G.gold }}>Nasıl kullanılır:</strong> Şablona tıkla → köşeli parantez içindeki <span style={{ color:G.gold }}>[alanları]</span> kendi bilgilerinle değiştir → <strong style={{ color:'#fff' }}>Kopyala</strong> butonuna bas → ilgili dosyaya yapıştır → git push.
              </div>
            </div>

            {activeTpl.items.map((item, i) => (
              <TemplateCard key={i} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
