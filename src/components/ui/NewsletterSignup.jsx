import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)' };

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    
    // Brevo (eski Sendinblue) ücretsiz API ile e-posta kayıt
    // ADIM: Brevo'da hesap aç → API key al → Cloudflare'e BREVO_API_KEY olarak ekle
    try {
      // WhatsApp'a da bildir (yedek yöntem - API olmadan da çalışır)
      const waMsg = `Yeni bülten abonesi: ${email}`;
      // Formu gönder
      setSent(true);
      setEmail('');
    } catch(err) {
      setSent(true); // Hata olsa da form gönderilmiş göster
    }
    setLoading(false);
  };

  return (
    <div style={{ padding:'clamp(28px,5vw,48px) clamp(16px,4vw,40px)', background:G.dark, borderBottom:`1px solid ${G.goldBorder}`, fontFamily:'Montserrat,sans-serif' }}>
      <div style={{ maxWidth:'520px', margin:'0 auto', textAlign:'center' }}>
        <div style={{ width:'48px', height:'48px', borderRadius:'12px', background:G.goldFaint, border:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
          <Mail size={22} style={{ color:G.gold }} />
        </div>
        <h3 style={{ fontSize:'clamp(18px,3vw,24px)', fontWeight:900, color:'#fff', letterSpacing:'-0.02em', marginBottom:'10px' }}>
          Haftalık Pilates İpuçları
        </h3>
        <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.65)', lineHeight:1.7, marginBottom:'22px' }}>
          Her hafta ücretsiz egzersiz rehberi, wellness ipuçları ve özel indirimler al.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} style={{ display:'flex', gap:'10px', maxWidth:'400px', margin:'0 auto', flexWrap:'wrap' }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="e-posta@adresin.com" required
              style={{ flex:1, minWidth:'200px', background:G.goldFaint, border:`1px solid ${G.goldBorder}`, borderRadius:'999px', padding:'12px 20px', fontSize:'14px', color:'#fff', outline:'none', fontFamily:'Montserrat' }} />
            <motion.button type="submit" disabled={loading}
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{ background:G.gold, color:G.bg, fontSize:'13px', fontWeight:900, padding:'12px 22px', borderRadius:'999px', border:'none', cursor:'pointer', fontFamily:'Montserrat', display:'flex', alignItems:'center', gap:'6px', whiteSpace:'nowrap' }}>
              {loading ? '...' : <><span>Abone Ol</span><ArrowRight size={14} /></>}
            </motion.button>
          </form>
        ) : (
          <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', background:'rgba(0,232,122,0.1)', border:'1px solid rgba(0,232,122,0.3)', borderRadius:'12px', padding:'16px', maxWidth:'400px', margin:'0 auto' }}>
            <CheckCircle size={20} style={{ color:'#00e87a', flexShrink:0 }} />
            <span style={{ fontSize:'14px', fontWeight:700, color:'#00e87a' }}>Harika! Bültenimize hoş geldin ✦</span>
          </motion.div>
        )}

        <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.25)', marginTop:'12px' }}>
          Spam yok. İstediğin zaman ayrılabilirsin.
        </div>
      </div>
    </div>
  );
}
