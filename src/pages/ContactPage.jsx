import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MessageCircle, Instagram, Youtube, MapPin, Mail, Send, Check } from 'lucide-react';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'#fff', whiteMid:'rgba(255,255,255,0.78)' };

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', phone:'', message:'' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    const msg = `Merhaba Gizem Hoca! Ben ${form.name}. Telefon: ${form.phone}.${form.message ? ' Mesajım: '+form.message : ''}`;
    setTimeout(() => {
      window.open(`https://wa.me/905383135720?text=${encodeURIComponent(msg)}`, '_blank');
      setLoading(false); setSent(true);
      setForm({ name:'', phone:'', message:'' });
      setTimeout(() => setSent(false), 4000);
    }, 600);
  };

  const contacts = [
    { icon:<MessageCircle size={16}/>, label:'WHATSAPP', value:'+90 538 313 57 20', href:'https://wa.me/905383135720', tag:'EN HIZLI' },
    { icon:<Instagram size={16}/>, label:'INSTAGRAM', value:'@gizemmhoca', href:'https://www.instagram.com/gizemmhoca/' },
    { icon:<Youtube size={16}/>, label:'YOUTUBE', value:'@gizemmhoca', href:'https://www.youtube.com/@gizemmhoca' },
    { icon:<Mail size={16}/>, label:'E-POSTA', value:'merhaba@gizemhoca.net', href:'mailto:merhaba@gizemhoca.net' },
    { icon:<MapPin size={16}/>, label:'STÜDYO', value:'Beşiktaş, İstanbul', href:null },
  ];

  const inputStyle = { width:'100%', background:G.goldFaint, border:`1px solid ${G.goldBorder}`, padding:'10px 14px', fontSize:'12px', color:'#fff', outline:'none', fontFamily:'Montserrat', borderRadius:'4px', boxSizing:'border-box' };

  return (
    <>
      <Helmet>
        <title>İletişim | Gizem Hoca Pilates Beşiktaş İstanbul</title>
        <meta name="description" content="Gizem Hoca pilates stüdyosu iletişim bilgileri. Beşiktaş İstanbul. WhatsApp: 0538 313 57 20. Randevu ve bilgi için ulaşın." />
      </Helmet>
      <div style={{ background:G.bg, fontFamily:'Montserrat,sans-serif', minHeight:'100vh' }}>
        <div style={{ padding:'32px 40px', borderBottom:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'32px', height:'2px', background:G.gold }} />
          <div>
            <p style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.2em', color:G.gold, marginBottom:'6px' }}>GİZEM HOCA PİLATES</p>
            <h1 style={{ fontSize:'56px', fontWeight:900, color:'#fff', lineHeight:0.92, letterSpacing:'-0.03em' }}>İLETİŞİM</h1>
          </div>
        </div>

        <div className='contact-split' style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:`1px solid ${G.goldBorder}` }}>
          <div style={{ borderRight:`1px solid ${G.goldBorder}` }}>
            {contacts.map((c, i) => (
              <div key={i} style={{ borderBottom: i < contacts.length-1 ? `1px solid ${G.goldBorder}` : 'none' }}>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer"
                    style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 28px', textDecoration:'none' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                      <span style={{ color:G.gold }}>{c.icon}</span>
                      <div>
                        <div style={{ fontSize:'8px', fontWeight:900, letterSpacing:'0.12em', color:G.whiteMid }}>{c.label}</div>
                        <div style={{ fontSize:'13px', fontWeight:700, color:'#fff', marginTop:'2px' }}>{c.value}</div>
                      </div>
                    </div>
                    {c.tag && <span style={{ fontSize:'8px', fontWeight:900, background:G.gold, color:G.bg, padding:'3px 10px', borderRadius:'999px', letterSpacing:'0.06em' }}>{c.tag}</span>}
                  </a>
                ) : (
                  <div style={{ display:'flex', alignItems:'center', gap:'14px', padding:'18px 28px' }}>
                    <span style={{ color:G.whiteMid }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize:'8px', fontWeight:900, letterSpacing:'0.12em', color:G.whiteMid }}>{c.label}</div>
                      <div style={{ fontSize:'13px', fontWeight:700, color:'#fff', marginTop:'2px' }}>{c.value}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ padding:'32px 28px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'24px' }}>
              <div style={{ width:'20px', height:'2px', background:G.gold }} />
              <span style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.15em', color:G.gold }}>MESAJ GÖNDER</span>
            </div>
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                <div>
                  <label style={{ fontSize:'8px', fontWeight:900, letterSpacing:'0.1em', color:G.whiteMid, display:'block', marginBottom:'6px' }}>AD SOYAD *</label>
                  <input type="text" required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Adınız" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize:'8px', fontWeight:900, letterSpacing:'0.1em', color:G.whiteMid, display:'block', marginBottom:'6px' }}>TELEFON *</label>
                  <input type="tel" required value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="05xx xxx xx xx" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ fontSize:'8px', fontWeight:900, letterSpacing:'0.1em', color:G.whiteMid, display:'block', marginBottom:'6px' }}>MESAJ</label>
                <textarea value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="Sormak istedikleriniz..." rows={4} style={{ ...inputStyle, resize:'none' }} />
              </div>
              <motion.button type="submit" disabled={loading||sent} whileTap={{ scale:0.97 }}
                style={{ padding:'13px', borderRadius:'999px', fontSize:'10px', fontWeight:900, letterSpacing:'0.06em', border:'none', cursor:'pointer', fontFamily:'Montserrat', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', background: sent ? '#1a6b3c' : G.gold, color: sent ? '#fff' : G.bg }}>
                {sent ? <><Check size={14}/> WHATSAPP AÇILDI!</> : loading ? 'GÖNDERİLİYOR...' : <><Send size={14}/> WHATSAPP İLE GÖNDER</>}
              </motion.button>
              <p style={{ fontSize:'10px', color:G.whiteMid, textAlign:'center' }}>Form doldurulunca WhatsApp'ta hazır mesaj açılır.</p>
            </form>
          </div>
        </div>
      </div>

      {/* GOOGLE MAPS */}
      <div style={{ borderBottom: `1px solid ${G.goldBorder}` }}>
        <div style={{ padding: 'clamp(20px,4vw,32px) clamp(16px,4vw,40px)', borderBottom: `1px solid ${G.goldBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '22px', height: '2px', background: G.gold }} />
            <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold }}>KONUM</span>
          </div>
        </div>
        <div style={{ position: 'relative', paddingBottom: '35%', minHeight: '280px' }}>
          <iframe
            title="Gizem Hoca Pilates Konum - Beşiktaş İstanbul"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.5!2d29.0044!3d41.0439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQmXFn2lrdGHFnw!5e0!3m2!1str!2str!4v1234567890"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', filter: 'grayscale(1) invert(0.85) hue-rotate(180deg)' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
          <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
            <a href="https://maps.google.com/?q=Beşiktaş+İstanbul" target="_blank" rel="noopener noreferrer"
              style={{ background: G.gold, color: G.bg, fontSize: '15px', fontWeight: 900, padding: '8px 16px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.06em' }}>
              Yol Tarifi Al →
            </a>
          </div>
        </div>
      </div>

    </>
  );
}
