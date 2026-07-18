import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader, LogOut, Sparkles } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const G = { bg: '#0d1b3e', dark: '#071029', gold: '#d4af37', goldBorder: 'rgba(212,175,55,0.2)', goldFaint: 'rgba(212,175,55,0.08)' };

const ADMIN_SYSTEM = `Sen Gizem Hoca Pilates stüdyosunun akıllı site yönetim asistanısın. Türkçe konuşuyorsun.

Yapabileceklerin:
- Blog yazısı oluştur (başlık, içerik, kategori)
- Program güncellemesi öner (gün, saat, ders türü)
- Fiyat paketi taslağı hazırla
- SSS cevabı yaz
- Sosyal medya paylaşımı oluştur (Instagram, Facebook)
- E-posta taslağı hazırla
- Duyuru metni yaz
- Öğrenci motivasyon mesajı oluştur

Konu: Pilates, wellness, sağlıklı yaşam, egzersiz

Yanıtlarını her zaman şu formatta ver:
1. Ne yaptığını kısaca açıkla
2. İçeriği net ve kullanıma hazır ver
3. Gerekirse ek öneri sun

Profesyonel ama sıcak bir ton kullan. Gizem Hoca'nın markasına uygun yaz.`;

const SUGGESTIONS = [
  { icon: '📝', label: 'Blog Yaz', prompt: 'Pilatesin duruş bozukluklarına etkisi hakkında 300 kelimelik bir blog yazısı yaz.' },
  { icon: '📱', label: 'Instagram Postu', prompt: 'Bu haftaki Mat Pilates dersi için Instagram postu ve 10 hashtag yaz.' },
  { icon: '📅', label: 'Haftalık Duyuru', prompt: 'Bu haftaki ders programı için kısa ve çekici bir duyuru metni yaz.' },
  { icon: '💌', label: 'Hoş Geldin E-postası', prompt: 'Yeni öğrencilere gönderilecek sıcak bir hoş geldin e-postası yaz.' },
  { icon: '❓', label: 'SSS Cevabı', prompt: '"Pilates başlamak için ideal yaş var mı?" sorusuna profesyonel bir cevap yaz.' },
  { icon: '🎯', label: 'Motivasyon Mesajı', prompt: 'Öğrencilere düzenli pratik yapmaları için motive edici kısa bir mesaj yaz.' },
];

export default function AdminPage() {
  const { isAdmin, login, logout } = useAdmin();
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [msgs, setMsgs] = useState([
    { role: 'assistant', text: 'Merhaba! 👋 Ben site yönetim asistanınım. Blog yazısı, sosyal medya postu, duyuru metni veya istediğin her içeriği hazırlayabilirim. Ne yapalım?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) { setLoginError(''); }
    else { setLoginError('Şifre yanlış!'); }
  };

  const sendMsg = async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput('');
    const newMsgs = [...msgs, { role: 'user', text: q }];
    setMsgs(newMsgs);
    setLoading(true);

    try {
      const history = newMsgs.slice(1).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.text,
      }));

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: ADMIN_SYSTEM,
          messages: history,
        }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Bir hata oluştu, tekrar deneyin.';
      setMsgs(m => [...m, { role: 'assistant', text: reply }]);
    } catch {
      setMsgs(m => [...m, { role: 'assistant', text: 'Bağlantı hatası oluştu. Lütfen tekrar deneyin.' }]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  // ── GİRİŞ EKRANI
  if (!isAdmin) return (
    <div style={{ minHeight: '100vh', background: G.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat,sans-serif' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: '360px', padding: '40px', background: G.dark, border: `1px solid ${G.goldBorder}`, borderRadius: '16px', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: G.goldFaint, border: `1px solid ${G.goldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Bot size={24} style={{ color: G.gold }} />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>Admin Paneli</h1>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '6px' }}>AI Site Yönetim Asistanı</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Şifre"
            style={{ background: G.goldFaint, border: `1px solid ${loginError ? '#ff4444' : G.goldBorder}`, borderRadius: '10px', padding: '12px 16px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'Montserrat', width: '100%' }} />
          {loginError && <p style={{ fontSize: '11px', color: '#ff4444', margin: 0 }}>{loginError}</p>}
          <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{ background: G.gold, color: G.bg, fontSize: '12px', fontWeight: 900, padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', letterSpacing: '0.06em' }}>
            GİRİŞ YAP ✦
          </motion.button>
        </form>
      </motion.div>
    </div>
  );

  // ── ADMIN EKRANI
  return (
    <div style={{ minHeight: '100vh', background: G.bg, display: 'flex', flexDirection: 'column', fontFamily: 'Montserrat,sans-serif' }}>

      {/* Header */}
      <div style={{ background: G.dark, borderBottom: `1px solid ${G.goldBorder}`, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: G.goldFaint, border: `1px solid ${G.goldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={18} style={{ color: G.gold }} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff' }}>AI Site Asistanı</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '1px' }}>Gizem Hoca Pilates · Admin</div>
          </div>
        </div>
        <button onClick={logout}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', border: `1px solid ${G.goldBorder}`, borderRadius: '8px', padding: '7px 14px', color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat', transition: 'all 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
          <LogOut size={13} /> Çıkış
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', maxWidth: '960px', width: '100%', margin: '0 auto', padding: '24px', gap: '20px' }}>

        {/* Sol: Öneriler */}
        <div style={{ width: '200px', flexShrink: 0 }}>
          <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', color: G.gold, marginBottom: '12px' }}>HAZIR ŞABLONLAR</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {SUGGESTIONS.map((s, i) => (
              <motion.button key={i} onClick={() => sendMsg(s.prompt)}
                whileHover={{ x: 4, background: 'rgba(212,175,55,0.12)' }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '10px', background: G.goldFaint, border: `1px solid ${G.goldBorder}`, cursor: 'pointer', fontFamily: 'Montserrat', textAlign: 'left', transition: 'all 0.15s' }}>
                <span style={{ fontSize: '16px' }}>{s.icon}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{s.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sağ: Chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: G.dark, border: `1px solid ${G.goldBorder}`, borderRadius: '16px', overflow: 'hidden' }}>

          {/* Mesajlar */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: 0, maxHeight: 'calc(100vh - 280px)' }}>
            {msgs.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: G.goldFaint, border: `1px solid ${G.goldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Bot size={13} style={{ color: G.gold }} />
                  </div>
                )}
                <div style={{ maxWidth: '80%' }}>
                  <div style={{
                    padding: '12px 16px', fontSize: '13px', lineHeight: 1.7,
                    borderRadius: msg.role === 'user' ? '14px 14px 0 14px' : '14px 14px 14px 0',
                    background: msg.role === 'user' ? G.gold : G.goldFaint,
                    border: msg.role === 'user' ? 'none' : `1px solid ${G.goldBorder}`,
                    color: msg.role === 'user' ? G.bg : 'rgba(255,255,255,0.88)',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {msg.text}
                  </div>
                  {msg.role === 'assistant' && i > 0 && (
                    <button onClick={() => copyText(msg.text, i)}
                      style={{ marginTop: '5px', fontSize: '10px', color: copied === i ? '#00e87a' : 'rgba(212,175,55,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', fontWeight: 600, padding: '2px 0', transition: 'color 0.2s' }}>
                      {copied === i ? '✓ Kopyalandı!' : '⎘ Kopyala'}
                    </button>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: G.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <User size={13} style={{ color: G.bg }} />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: G.goldFaint, border: `1px solid ${G.goldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Loader size={13} style={{ color: G.gold, animation: 'spin 1s linear infinite' }} />
                </div>
                <div style={{ padding: '12px 16px', background: G.goldFaint, border: `1px solid ${G.goldBorder}`, borderRadius: '14px 14px 14px 0', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0,1,2].map(i => (
                    <motion.div key={i} animate={{ y: [0,-5,0] }} transition={{ duration: 0.6, delay: i*0.15, repeat: Infinity }}
                      style={{ width: '6px', height: '6px', borderRadius: '50%', background: G.gold }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '16px', borderTop: `1px solid ${G.goldBorder}`, display: 'flex', gap: '10px' }}>
            <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); } }}
              placeholder="Ne yazmamı istersin? Örn: 'Hamile pilatesi hakkında blog yaz' veya 'Cuma dersi için Instagram postu'"
              rows={2}
              style={{ flex: 1, background: G.goldFaint, border: `1px solid ${G.goldBorder}`, borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'Montserrat', resize: 'none', lineHeight: 1.5 }} />
            <motion.button onClick={() => sendMsg()} disabled={loading || !input.trim()}
              whileHover={input.trim() ? { scale: 1.05 } : {}} whileTap={input.trim() ? { scale: 0.97 } : {}}
              style={{ width: '44px', height: '44px', borderRadius: '12px', background: input.trim() ? G.gold : G.goldFaint, border: `1px solid ${input.trim() ? 'transparent' : G.goldBorder}`, cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s', alignSelf: 'flex-end' }}>
              <Send size={16} style={{ color: input.trim() ? G.bg : 'rgba(212,175,55,0.3)' }} />
            </motion.button>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
