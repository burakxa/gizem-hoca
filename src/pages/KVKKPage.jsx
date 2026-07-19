import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Shield } from 'lucide-react';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldBorder:'rgba(212,175,55,0.2)', goldFaint:'rgba(212,175,55,0.08)', white:'rgba(255,255,255,0.92)', whiteMid:'rgba(255,255,255,0.65)' };

const sections = [
  {
    title: '1. Veri Sorumlusu',
    content: `Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında Gizem Hoca Pilates tarafından hazırlanmıştır.

Veri Sorumlusu: Gizem Hoca Pilates
Web sitesi: gizemhoca.net
E-posta: merhaba@gizemhoca.net
Telefon: 0538 313 57 20`
  },
  {
    title: '2. Toplanan Kişisel Veriler',
    content: `Sitemizi ziyaret ettiğinizde veya iletişim formlarımızı kullandığınızda aşağıdaki veriler toplanabilmektedir:

• Ad ve soyad
• Telefon numarası
• E-posta adresi
• IP adresi ve tarayıcı bilgileri (çerezler aracılığıyla)
• Mesaj içerikleri (iletişim formu)

Bu veriler; randevu oluşturma, e-bülten gönderimi ve müşteri hizmetleri amacıyla kullanılmaktadır.`
  },
  {
    title: '3. Kişisel Verilerin İşlenme Amaçları',
    content: `Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:

• Ders rezervasyonu ve randevu yönetimi
• E-posta bülteni gönderimi (açık rızanız ile)
• Müşteri hizmetleri ve destek
• Hizmetlerin iyileştirilmesi ve analiz
• Yasal yükümlülüklerin yerine getirilmesi`
  },
  {
    title: '4. Çerez (Cookie) Politikası',
    content: `Sitemizde aşağıdaki çerez türleri kullanılmaktadır:

• Zorunlu Çerezler: Sitenin düzgün çalışması için gereklidir.
• Analitik Çerezler: Google Analytics aracılığıyla ziyaretçi istatistikleri toplanmaktadır.
• Pazarlama Çerezleri: Meta Pixel aracılığıyla reklam hedefleme yapılmaktadır.

Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz. Ancak bu durumda sitenin bazı özellikleri çalışmayabilir.`
  },
  {
    title: '5. Kişisel Verilerin Paylaşımı',
    content: `Kişisel verileriniz, açık rızanız olmaksızın üçüncü taraflarla paylaşılmamaktadır. Aşağıdaki durumlar istisna oluşturmaktadır:

• Yasal zorunluluk halinde yetkili kamu kurumları ile
• Google Analytics (anonim istatistik verisi)
• Cloudflare (hosting altyapısı)

Kişisel verileriniz yurt dışına aktarılmamaktadır.`
  },
  {
    title: '6. Veri Saklama Süreleri',
    content: `• İletişim formu verileri: 2 yıl
• E-bülten abonelik verileri: Abonelikten çıkana kadar
• Analitik veriler: 26 ay (Google Analytics varsayılanı)

Saklama süresi dolduğunda verileriniz güvenli şekilde silinmektedir.`
  },
  {
    title: '7. Haklarınız (KVKK Madde 11)',
    content: `KVKK kapsamında aşağıdaki haklara sahipsiniz:

• Kişisel verilerinizin işlenip işlenmediğini öğrenme
• Kişisel verileriniz hakkında bilgi talep etme
• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme
• Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme
• Verilerin eksik veya yanlış işlenmesi halinde düzeltilmesini isteme
• Kişisel verilerin silinmesini veya yok edilmesini isteme
• İşlenen verilerin otomatik sistemler aracılığıyla analiz edilmesiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme

Haklarınızı kullanmak için: merhaba@gizemhoca.net adresine e-posta gönderebilirsiniz.`
  },
  {
    title: '8. İletişim ve Başvuru',
    content: `KVKK kapsamındaki başvurularınızı aşağıdaki kanallar aracılığıyla iletebilirsiniz:

E-posta: merhaba@gizemhoca.net
WhatsApp: 0538 313 57 20

Başvurularınız 30 gün içinde yanıtlanacaktır.

Son güncelleme tarihi: Temmuz 2026`
  },
];

export default function KVKKPage() {
  const [open, setOpen] = useState(null);
  return (
    <>
      <Helmet>
        <title>KVKK & Gizlilik Politikası | Gizem Hoca Pilates Maltepe</title>
        <meta name="description" content="Gizem Hoca Pilates kişisel verilerin korunması kanunu aydınlatma metni ve gizlilik politikası." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div style={{ background:G.bg, minHeight:'100vh', fontFamily:'Montserrat,sans-serif' }}>
        <div style={{ maxWidth:'760px', margin:'0 auto', padding:'clamp(24px,4vw,48px) clamp(16px,4vw,40px)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'24px' }}>
            <div style={{ width:'48px', height:'48px', borderRadius:'12px', background:G.goldFaint, border:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Shield size={22} style={{ color:G.gold }} />
            </div>
            <div>
              <h1 style={{ fontSize:'clamp(22px,4vw,32px)', fontWeight:900, color:'#fff', letterSpacing:'-0.02em' }}>KVKK Aydınlatma Metni</h1>
              <p style={{ fontSize:'13px', color:G.whiteMid, marginTop:'3px' }}>Kişisel Verilerin Korunması Kanunu Kapsamında</p>
            </div>
          </div>
          <div style={{ background:'rgba(212,175,55,0.06)', border:`1px solid ${G.goldBorder}`, borderRadius:'12px', padding:'14px 18px', marginBottom:'28px', fontSize:'13px', color:G.whiteMid, lineHeight:1.7 }}>
            Bu aydınlatma metni, 6698 sayılı KVKK'nın 10. maddesi uyarınca hazırlanmıştır. Verileriniz güvende — asla üçüncü taraflarla satılmaz.
          </div>
          {sections.map((s, i) => (
            <motion.div key={i} style={{ borderBottom:`1px solid ${G.goldBorder}` }}>
              <button onClick={() => setOpen(open===i?null:i)}
                style={{ width:'100%', textAlign:'left', padding:'16px 0', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'16px', background:'none', border:'none', cursor:'pointer', fontFamily:'Montserrat' }}>
                <span style={{ fontSize:'14px', fontWeight:700, color:open===i?G.gold:'#fff', transition:'color 0.2s' }}>{s.title}</span>
                <motion.div animate={{ rotate:open===i?45:0 }} style={{ width:'24px', height:'24px', borderRadius:'50%', background:open===i?G.goldFaint:'rgba(212,175,55,0.06)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ color:G.gold, fontSize:'18px', lineHeight:1 }}>+</span>
                </motion.div>
              </button>
              <AnimatePresence>
                {open===i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} style={{ overflow:'hidden' }}>
                    <div style={{ paddingBottom:'20px', fontSize:'13px', color:G.whiteMid, lineHeight:1.85, whiteSpace:'pre-line' }}>{s.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
