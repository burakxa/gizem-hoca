import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, MessageCircle } from 'lucide-react';

const G = { bg:'#0d1b3e', gold:'#d4af37', goldBorder:'rgba(212,175,55,0.2)', white:'#fff', whiteMid:'rgba(255,255,255,0.5)' };

const faqs = [
  { cat:'BAŞLANGIÇ', q:'Pilates kime uygundur?', a:'Pilates her yaştan ve her fitness seviyesinden kişiye uygundur. Yeni başlayanlardan sporculara kadar herkes için özel programlar oluşturulabilir.' },
  { cat:'BAŞLANGIÇ', q:'Daha önce hiç spor yapmadım, pilates yapabilir miyim?', a:'Kesinlikle! Pilates temposu ve zorluğu kişiye göre ayarlanabilen bir disiplindir. İlk derste temel hareketler öğretilir.' },
  { cat:'DERSLER', q:'Bireysel ve grup dersi arasındaki fark nedir?', a:'Bireysel derslerde program tamamen size özel hazırlanır. Grup derslerinde ise topluluk enerjisi yüksektir, maliyet daha uygundur.' },
  { cat:'DERSLER', q:'Derse ne giyerek gelmeliyim?', a:'Hareketi kısıtlamayan, vücudunuza oturan kıyafetler idealdir. Kaydırmaz çorap veya çıplak ayakla girilir.' },
  { cat:'DERSLER', q:'Online dersler yüz yüze kadar etkili mi?', a:'Evet! Kameradan pozisyonları düzeltebiliyor ve kişisel geri bildirim verebiliyorum.' },
  { cat:'SAĞLIK', q:'Sırt ağrım var, pilates yapabilir miyim?', a:'Pilates özellikle sırt ağrıları için tavsiye edilen bir yöntemdir. Doktorunuza danıştıktan sonra size özel program hazırlarım.' },
  { cat:'SAĞLIK', q:'Hamilelikte pilates güvenli midir?', a:'Hamile Pilatesi Uzmanlık Programı sertifikam bulunmaktadır. Doktor onayıyla güvenle yapılabilir.' },
  { cat:'FİYAT', q:'Deneme dersi var mı?', a:'Evet! WhatsApp üzerinden ücretsiz tanışma seansı ayarlayabilirsiniz.' },
  { cat:'FİYAT', q:'Ders iptal edebilir miyim?', a:'Dersten 24 saat önce bildirim yapılması durumunda ücretsiz iptal imkânı sunulmaktadır.' },
];

export default function SSFPage() {
  const [openItem, setOpenItem] = useState(null);

  return (
    <>
      <Helmet>
        <title>Sıkça Sorulan Sorular | Pilates Hakkında | Gizem Hoca</title>
        <meta name="description" content="Pilates hakkında merak edilen sorular ve cevapları. Başlangıç, fiyatlar, program ve daha fazlası." />
      </Helmet>
      <div style={{ background:G.bg, fontFamily:'Montserrat,sans-serif', minHeight:'100vh' }}>
        <div style={{ padding:'32px 40px', borderBottom:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'32px', height:'2px', background:G.gold }} />
          <div>
            <p style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.2em', color:G.gold, marginBottom:'6px' }}>GİZEM HOCA PİLATES</p>
            <h1 style={{ fontSize:'56px', fontWeight:900, color:'#fff', lineHeight:0.92, letterSpacing:'-0.03em' }}>SSS</h1>
          </div>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom:`1px solid ${G.goldBorder}` }}>
              <button onClick={() => setOpenItem(openItem===i ? null : i)}
                style={{ width:'100%', textAlign:'left', padding:'20px 40px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'16px', background:'none', border:'none', cursor:'pointer', fontFamily:'Montserrat' }}>
                <div style={{ display:'flex', gap:'24px', alignItems:'center' }}>
                  <span style={{ fontSize:'8px', fontWeight:900, letterSpacing:'0.1em', color:G.gold, minWidth:'80px' }}>{faq.cat}</span>
                  <span style={{ fontSize:'13px', fontWeight:900, color:'#fff' }}>{faq.q}</span>
                </div>
                <motion.div animate={{ rotate: openItem===i ? 45 : 0 }} transition={{ duration:0.2 }} style={{ flexShrink:0 }}>
                  <Plus size={18} style={{ color:G.gold }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openItem === i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} style={{ overflow:'hidden' }}>
                    <p style={{ padding:'0 40px 20px calc(40px + 24px + 80px)', fontSize:'12px', color:G.whiteMid, lineHeight:1.75 }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div style={{ padding:'32px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(212,175,55,0.06)', borderTop:`1px solid ${G.goldBorder}` }}>
          <div>
            <p style={{ fontSize:'18px', fontWeight:900, color:G.gold }}>Başka sorunuz var mı? ✦</p>
            <p style={{ fontSize:'12px', color:G.whiteMid, marginTop:'4px' }}>WhatsApp'tan hemen yanıt alın.</p>
          </div>
          <a href="https://wa.me/905383135720?text=Merhaba%2C%20sormak%20istedi%C4%9Fim%20bir%20sorum%20var." target="_blank" rel="noopener noreferrer"
            style={{ display:'flex', alignItems:'center', gap:'8px', background:G.gold, color:G.bg, fontSize:'10px', fontWeight:900, letterSpacing:'0.06em', padding:'11px 22px', borderRadius:'999px' }}>
            <MessageCircle size={14} /> WHATSAPP'TA SOR
          </a>
        </div>
      </div>
    </>
  );
}
