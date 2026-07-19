import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Instagram, Youtube, MapPin, Mail, Send, Check, Clock, Phone, Star, ArrowRight, Calendar } from 'lucide-react';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'rgba(255,255,255,0.92)', whiteMid:'rgba(255,255,255,0.65)', whiteLow:'rgba(255,255,255,0.3)' };

const hours = [
  { day:'Pazartesi – Cuma', time:'08:00 – 19:00', open:true },
  { day:'Cumartesi', time:'09:00 – 14:00', open:true },
  { day:'Pazar', time:'Kapalı', open:false },
];

const socials = [
  { icon:<MessageCircle size={18}/>, label:'WhatsApp', sub:'En hızlı iletişim yolu', value:'+90 538 313 57 20', href:'https://wa.me/905383135720?text=Merhaba!', color:'#25D366', bg:'rgba(37,211,102,0.1)', badge:'EN HIZLI' },
  { icon:<Instagram size={18}/>, label:'Instagram', sub:'Ders videolarını takip et', value:'@gizemmhoca', href:'https://www.instagram.com/gizemmhoca/', color:'#E1306C', bg:'rgba(225,48,108,0.1)' },
  { icon:<Youtube size={18}/>, label:'YouTube', sub:'Ücretsiz pilates içerikleri', value:'@gizemmhoca', href:'https://www.youtube.com/@gizemmhoca', color:'#FF0000', bg:'rgba(255,0,0,0.08)' },
  { icon:<Mail size={18}/>, label:'E-posta', sub:'Detaylı sorular için', value:'merhaba@gizemhoca.net', href:'mailto:merhaba@gizemhoca.net', color:G.gold, bg:G.goldFaint },
];

const faqs = [
  { q:'İlk ders ücretli mi?', a:'Hayır! İlk tanışma seansı tamamen ücretsiz.' },
  { q:'Hangi bölgelere hizmet veriyorsunuz?', a:'Beşiktaş stüdyomuzda yüz yüze, tüm Türkiye\'ye online ders.' },
  { q:'Bireysel mi grup mu?', a:'Her ikisi de mevcut. Sana uygun formatı birlikte belirleriz.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', phone:'', interest:'', message:'' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    const interest = form.interest ? ` İlgilendiğim ders: ${form.interest}.` : '';
    const msg = `Merhaba Gizem Hoca! Ben ${form.name}. Telefon: ${form.phone}.${interest}${form.message ? ' Notum: '+form.message : ''}`;
    setTimeout(() => {
      window.open(`https://wa.me/905383135720?text=${encodeURIComponent(msg)}`, '_blank');
      setLoading(false); setSent(true);
      setForm({ name:'', phone:'', interest:'', message:'' });
      setTimeout(() => setSent(false), 5000);
    }, 600);
  };

  const inp = { width:'100%', background:'rgba(212,175,55,0.07)', border:`1px solid ${G.goldBorder}`, padding:'11px 14px', fontSize:'13px', color:'#fff', outline:'none', fontFamily:'Montserrat', borderRadius:'10px', boxSizing:'border-box', transition:'border-color 0.2s' };

  return (
    <>
      <Helmet>
        <title>İletişim | Gizem Hoca Pilates Beşiktaş İstanbul</title>
        <meta name="description" content="Gizem Hoca pilates stüdyosu iletişim bilgileri. Beşiktaş İstanbul. WhatsApp: 0538 313 57 20. Ücretsiz tanışma seansı için randevu alın." />
      </Helmet>

      <div style={{ background:G.bg, fontFamily:'Montserrat,sans-serif', minHeight:'100vh' }}>

        {/* Hero başlık */}
        <div style={{ padding:'clamp(28px,5vw,48px) clamp(16px,4vw,40px)', borderBottom:`1px solid ${G.goldBorder}`, background:`linear-gradient(180deg, rgba(212,175,55,0.05) 0%, transparent 100%)` }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
            <div style={{ width:'28px', height:'2px', background:G.gold }} />
            <span style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.2em', color:G.gold }}>GİZEM HOCA PİLATES</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', alignItems:'flex-end', gap:'20px', flexWrap:'wrap' }} className="contact-split">
            <div>
              <h1 style={{ fontSize:'clamp(36px,7vw,64px)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', lineHeight:0.9, marginBottom:'16px' }}>
                Hadi<br /><span style={{ color:G.gold }}>Tanışalım</span>
              </h1>
              <p style={{ fontSize:'14px', color:G.whiteMid, lineHeight:1.75, maxWidth:'420px' }}>
                İlk adımı atmak için çok iyi bir gün. Ücretsiz tanışma seansın için yaz — 24 saat içinde cevap veriyorum.
              </p>
            </div>
            {/* Yanıt süresi badge */}
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.3 }}
              style={{ background:'rgba(37,211,102,0.1)', border:'1.5px solid rgba(37,211,102,0.3)', borderRadius:'16px', padding:'16px 20px', textAlign:'center', flexShrink:0 }}>
              <div style={{ fontSize:'28px', fontWeight:900, color:'#25D366', lineHeight:1 }}>~1 saat</div>
              <div style={{ fontSize:'11px', color:'rgba(37,211,102,0.7)', marginTop:'4px', fontWeight:700 }}>ortalama yanıt süresi</div>
            </motion.div>
          </div>
        </div>

        {/* Ana içerik grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.1fr', borderBottom:`1px solid ${G.goldBorder}` }} className="contact-split">

          {/* Sol — iletişim kanalları + saatler */}
          <div style={{ borderRight:`1px solid ${G.goldBorder}` }}>

            {/* Sosyal kanallar */}
            <div style={{ padding:'28px clamp(16px,4vw,32px)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'18px' }}>
                <div style={{ width:'18px', height:'2px', background:G.gold }} />
                <span style={{ fontSize:'10px', fontWeight:900, letterSpacing:'0.15em', color:G.gold }}>İLETİŞİM KANALLARI</span>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                {socials.map((s,i) => (
                  <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ x:4, borderColor:'rgba(212,175,55,0.4)' }}
                    style={{ display:'flex', alignItems:'center', gap:'14px', padding:'14px 16px', background:'rgba(13,27,62,0.4)', backdropFilter:'blur(8px)', border:`1px solid ${G.goldBorder}`, borderRadius:'12px', textDecoration:'none', transition:'all 0.2s' }}>
                    <div style={{ width:'40px', height:'40px', borderRadius:'10px', background:s.bg, border:`1px solid ${s.color}33`, display:'flex', alignItems:'center', justifyContent:'center', color:s.color, flexShrink:0 }}>
                      {s.icon}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'2px' }}>
                        <span style={{ fontSize:'12px', fontWeight:900, color:'#fff' }}>{s.label}</span>
                        {s.badge && <span style={{ fontSize:'9px', fontWeight:900, background:s.color, color:'#fff', padding:'2px 7px', borderRadius:'999px', letterSpacing:'0.05em' }}>{s.badge}</span>}
                      </div>
                      <div style={{ fontSize:'11px', color:G.whiteMid }}>{s.sub}</div>
                    </div>
                    <div style={{ fontSize:'12px', fontWeight:700, color:s.color, flexShrink:0 }}>
                      {s.value.replace('@','')}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Çalışma saatleri */}
            <div style={{ padding:'0 clamp(16px,4vw,32px) 28px' }}>
              <div style={{ background:'rgba(13,27,62,0.4)', border:`1px solid ${G.goldBorder}`, borderRadius:'14px', overflow:'hidden' }}>
                <div style={{ padding:'14px 18px', borderBottom:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', gap:'10px' }}>
                  <Clock size={15} style={{ color:G.gold }} />
                  <span style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.12em', color:G.gold }}>ÇALIŞMA SAATLERİ</span>
                </div>
                {hours.map((h,i) => (
                  <div key={i} style={{ padding:'12px 18px', borderBottom:i<hours.length-1?`1px solid rgba(212,175,55,0.08)`:'none', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontSize:'13px', color:h.open?G.white:G.whiteLow }}>{h.day}</span>
                    <span style={{ fontSize:'13px', fontWeight:700, color:h.open?G.gold:'rgba(255,68,68,0.7)' }}>{h.time}</span>
                  </div>
                ))}
                <div style={{ padding:'12px 18px', background:'rgba(212,175,55,0.06)', display:'flex', alignItems:'center', gap:'8px' }}>
                  <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#00e87a', flexShrink:0 }} />
                  <span style={{ fontSize:'11px', color:'rgba(0,232,122,0.8)', fontWeight:700 }}>Şu an online — WhatsApp'tan yazabilirsin</span>
                </div>
              </div>
            </div>

            {/* Stüdyo bilgisi */}
            <div style={{ padding:'0 clamp(16px,4vw,32px) 28px' }}>
              <div style={{ background:'rgba(13,27,62,0.4)', border:`1px solid ${G.goldBorder}`, borderRadius:'14px', padding:'16px 18px', display:'flex', gap:'14px', alignItems:'flex-start' }}>
                <div style={{ width:'40px', height:'40px', borderRadius:'10px', background:G.goldFaint, border:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <MapPin size={18} style={{ color:G.gold }} />
                </div>
                <div>
                  <div style={{ fontSize:'12px', fontWeight:900, color:'#fff', marginBottom:'4px' }}>Stüdyo Adresi</div>
                  <div style={{ fontSize:'13px', color:G.whiteMid, lineHeight:1.6 }}>Beşiktaş, İstanbul</div>
                  <div style={{ fontSize:'11px', color:G.whiteLow, marginTop:'4px' }}>Online dersler için adres gerekmez</div>
                  <a href="https://maps.google.com/?q=Beşiktaş+İstanbul" target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:'4px', fontSize:'11px', fontWeight:700, color:G.gold, textDecoration:'none', marginTop:'8px' }}>
                    Yol tarifi al <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ — Form */}
          <div style={{ padding:'28px clamp(16px,4vw,32px)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px' }}>
              <div style={{ width:'18px', height:'2px', background:G.gold }} />
              <span style={{ fontSize:'10px', fontWeight:900, letterSpacing:'0.15em', color:G.gold }}>ÜCRETSİZ DERS İÇİN YAZ</span>
            </div>
            <p style={{ fontSize:'13px', color:G.whiteMid, marginBottom:'22px', lineHeight:1.6 }}>
              Formu doldur, WhatsApp'ta hazır mesaj açılsın. Birkaç dakikada randevu oluşturabilirsin.
            </p>

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                <div>
                  <label style={{ fontSize:'10px', fontWeight:900, letterSpacing:'0.1em', color:G.whiteMid, display:'block', marginBottom:'6px' }}>AD SOYAD *</label>
                  <input type="text" required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                    placeholder="Adınız Soyadınız" style={inp}
                    onFocus={e=>e.target.style.borderColor=G.gold} onBlur={e=>e.target.style.borderColor=G.goldBorder} />
                </div>
                <div>
                  <label style={{ fontSize:'10px', fontWeight:900, letterSpacing:'0.1em', color:G.whiteMid, display:'block', marginBottom:'6px' }}>TELEFON *</label>
                  <input type="tel" required value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}
                    placeholder="05xx xxx xx xx" style={inp}
                    onFocus={e=>e.target.style.borderColor=G.gold} onBlur={e=>e.target.style.borderColor=G.goldBorder} />
                </div>
              </div>

              {/* İlgilendiğin ders */}
              <div>
                <label style={{ fontSize:'10px', fontWeight:900, letterSpacing:'0.1em', color:G.whiteMid, display:'block', marginBottom:'8px' }}>HANGİ DERS İLGİNİ ÇEKİYOR?</label>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px' }}>
                  {['Mat Pilates','Reformer','Hamile Pilatesi','Online Ders'].map(opt => (
                    <button key={opt} type="button" onClick={() => setForm(f=>({...f, interest: f.interest===opt ? '' : opt}))}
                      style={{ padding:'9px 12px', borderRadius:'10px', border:`1.5px solid ${form.interest===opt ? G.gold : G.goldBorder}`, background: form.interest===opt ? 'rgba(212,175,55,0.12)' : 'rgba(212,175,55,0.05)', color: form.interest===opt ? G.gold : G.whiteMid, fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:'Montserrat', transition:'all 0.15s', textAlign:'left' }}>
                      {form.interest===opt ? '✓ ' : ''}{opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize:'10px', fontWeight:900, letterSpacing:'0.1em', color:G.whiteMid, display:'block', marginBottom:'6px' }}>MESAJ <span style={{ fontWeight:400, color:G.whiteLow }}>(opsiyonel)</span></label>
                <textarea value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                  placeholder="Sormak istedikleriniz, özel durumunuz..."
                  rows={3} style={{ ...inp, resize:'none' }}
                  onFocus={e=>e.target.style.borderColor=G.gold} onBlur={e=>e.target.style.borderColor=G.goldBorder} />
              </div>

              <motion.button type="submit" disabled={loading||sent} whileTap={{ scale:0.97 }}
                whileHover={{ boxShadow:'0 6px 24px rgba(212,175,55,0.4)' }}
                style={{ padding:'14px', borderRadius:'999px', fontSize:'13px', fontWeight:900, letterSpacing:'0.06em', border:'none', cursor: sent||loading ? 'default' : 'pointer', fontFamily:'Montserrat', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', background: sent ? '#1a6b3c' : G.gold, color: sent ? '#fff' : G.bg, transition:'all 0.2s', boxShadow:'0 4px 16px rgba(212,175,55,0.3)' }}>
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.span key="sent" initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <Check size={15} /> WhatsApp Açıldı! 🎉
                    </motion.span>
                  ) : loading ? (
                    <motion.span key="loading">Gönderiliyor...</motion.span>
                  ) : (
                    <motion.span key="idle" style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <MessageCircle size={15} /> WhatsApp ile Gönder
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <p style={{ fontSize:'11px', color:G.whiteLow, textAlign:'center', lineHeight:1.6 }}>
                🔒 Bilgileriniz yalnızca randevu için kullanılır. Spam yok.
              </p>
            </form>

            {/* Hızlı SSS */}
            <div style={{ marginTop:'24px', borderTop:`1px solid ${G.goldBorder}`, paddingTop:'20px' }}>
              <div style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.12em', color:G.gold, marginBottom:'12px' }}>HIZLI CEVAPLAR</div>
              {faqs.map((f,i) => (
                <div key={i} style={{ borderBottom:i<faqs.length-1?`1px solid rgba(212,175,55,0.08)`:'none' }}>
                  <button onClick={() => setOpenFaq(openFaq===i?null:i)}
                    style={{ width:'100%', textAlign:'left', padding:'10px 0', background:'none', border:'none', cursor:'pointer', fontFamily:'Montserrat', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'8px' }}>
                    <span style={{ fontSize:'13px', fontWeight:700, color: openFaq===i?G.gold:'#fff' }}>{f.q}</span>
                    <span style={{ color:G.gold, fontSize:'16px', transition:'transform 0.2s', transform:openFaq===i?'rotate(45deg)':'none' }}>+</span>
                  </button>
                  <AnimatePresence>
                    {openFaq===i && (
                      <motion.p initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
                        style={{ fontSize:'12px', color:G.whiteMid, lineHeight:1.7, overflow:'hidden', paddingBottom:'10px', margin:0 }}>
                        {f.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div style={{ borderBottom:`1px solid ${G.goldBorder}` }}>
          <div style={{ padding:'clamp(16px,3vw,24px) clamp(16px,4vw,40px)', borderBottom:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <div style={{ width:'22px', height:'2px', background:G.gold }} />
              <span style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.15em', color:G.gold }}>STÜDYO KONUMU — BEŞİKTAŞ, İSTANBUL</span>
            </div>
            <a href="https://maps.google.com/?q=Beşiktaş+İstanbul" target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:G.gold, color:G.bg, fontSize:'11px', fontWeight:900, padding:'8px 18px', borderRadius:'999px', textDecoration:'none', letterSpacing:'0.05em' }}>
              <MapPin size={12} /> Yol Tarifi Al
            </a>
          </div>
          <div style={{ position:'relative', paddingBottom:'32%', minHeight:'260px' }}>
            <iframe
              title="Gizem Hoca Pilates Konum - Beşiktaş İstanbul"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.5!2d29.0044!3d41.0439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQmXFn2lrdGHFnw!5e0!3m2!1str!2str!4v1234567890"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none', filter:'grayscale(1) invert(0.88) hue-rotate(180deg)' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Alt güven bantları */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', borderBottom:`1px solid ${G.goldBorder}` }} className="services-grid">
          {[
            { icon:'⚡', title:'Hızlı Yanıt', sub:'Ortalama 1 saat içinde' },
            { icon:'🎁', title:'İlk Ders Ücretsiz', sub:'Hiçbir taahhüt yok' },
            { icon:'⭐', title:'5.0 Google Puanı', sub:'47 değerlendirme' },
          ].map((item,i) => (
            <div key={i} style={{ padding:'20px', textAlign:'center', borderRight:i<2?`1px solid ${G.goldBorder}`:'none' }}>
              <div style={{ fontSize:'28px', marginBottom:'8px' }}>{item.icon}</div>
              <div style={{ fontSize:'13px', fontWeight:900, color:'#fff', marginBottom:'4px' }}>{item.title}</div>
              <div style={{ fontSize:'11px', color:G.whiteMid }}>{item.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
