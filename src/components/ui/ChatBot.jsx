import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare } from 'lucide-react';

const G = { bg: '#0d1b3e', dark: '#071029', gold: '#d4af37', goldBorder: 'rgba(212,175,55,0.25)' };

const WA_NUM = '905383135720';
const WA_MSG = (q) => encodeURIComponent(`Merhaba! Şunu sormak istedim: "${q}"`);

const faqs = [
  { q: 'Deneme dersi var mı?', a: 'Evet! İlk tanışma seansı ücretsizdir. WhatsApp\'tan randevu alabilirsiniz.' },
  { q: 'Dersler nerede yapılıyor?', a: 'Beşiktaş\'taki stüdyomuzda bireysel & grup, online ise Zoom üzerinden.' },
  { q: 'Fiyatlar ne kadar?', a: 'Başlangıç paketi ₺800/ay\'dan başlıyor. Detaylı bilgi için fiyatlar sayfasına bakabilirsiniz.' },
  { q: 'Online ders mümkün mü?', a: 'Kesinlikle! Dünyanın her yerinden Zoom üzerinden ders alabilirsiniz.' },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: 'bot', text: 'Merhaba! 👋 Size nasıl yardımcı olabilirim? Aşağıdaki sorulardan birini seçin ya da WhatsApp\'tan yazın.' }
  ]);
  const [input, setInput] = useState('');
  const [pulse, setPulse] = useState(true);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);
  useEffect(() => { const t = setTimeout(() => setPulse(false), 4000); return () => clearTimeout(t); }, []);

  const sendMsg = (text) => {
    const q = text || input.trim();
    if (!q) return;
    setInput('');
    setMsgs(m => [...m, { from: 'user', text: q }]);
    setTimeout(() => {
      const match = faqs.find(f => q.toLowerCase().includes(f.q.toLowerCase().split(' ')[0]));
      const reply = match
        ? match.a
        : 'Bu konuda size WhatsApp üzerinden daha detaylı bilgi verebilirim!';
      setMsgs(m => [...m, { from: 'bot', text: reply, wa: !match }]);
    }, 600);
  };

  return (
    <>
      {/* Açma butonu */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        style={{ position: 'fixed', bottom: '96px', right: '24px', zIndex: 49, width: '52px', height: '52px', borderRadius: '50%', background: G.dark, border: `1.5px solid ${G.goldBorder}`, color: G.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
        {open ? <X size={20} /> : <MessageSquare size={20} />}
        {pulse && !open && (
          <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '14px', height: '14px', borderRadius: '50%', background: G.gold, border: '2px solid #0d1b3e', animation: 'pulse 1.5s infinite' }} />
        )}
      </motion.button>

      <style>{`@keyframes pulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.3)} }`}</style>

      {/* Chat paneli */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', bottom: '160px', right: '24px', zIndex: 48, width: '300px', borderRadius: '16px', background: G.bg, border: `1px solid ${G.goldBorder}`, boxShadow: '0 12px 40px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {/* Header */}
            <div style={{ background: G.gold, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(13,27,62,0.3)', flexShrink: 0 }}>
                <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/71e533503d331149fe73f8e165f13f5b.png" alt="Gizem Hoca" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 900, color: G.bg }}>Gizem Hoca</div>
                <div style={{ fontSize: '10px', color: 'rgba(13,27,62,0.6)' }}>Genellikle hızlı yanıt verir</div>
              </div>
              <button onClick={() => setOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: G.bg, opacity: 0.6 }}>
                <X size={16} />
              </button>
            </div>

            {/* Mesajlar */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '260px' }}>
              {msgs.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '85%', padding: '9px 12px', borderRadius: msg.from === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                    background: msg.from === 'user' ? G.gold : 'rgba(212,175,55,0.1)',
                    border: msg.from === 'user' ? 'none' : `1px solid ${G.goldBorder}`,
                    fontSize: '12px', lineHeight: 1.5,
                    color: msg.from === 'user' ? G.bg : 'rgba(255,255,255,0.85)',
                  }}>
                    {msg.text}
                    {msg.wa && (
                      <a href={`https://wa.me/${WA_NUM}?text=${WA_MSG(msgs.find(m => m.from === 'user')?.text || '')}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{ display: 'block', marginTop: '8px', background: G.gold, color: G.bg, fontSize: '10px', fontWeight: 900, padding: '5px 10px', borderRadius: '999px', textAlign: 'center', textDecoration: 'none' }}>
                        WhatsApp'tan Yaz →
                      </a>
                    )}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Hızlı sorular */}
            {msgs.length < 3 && (
              <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {faqs.map((f, i) => (
                  <button key={i} onClick={() => sendMsg(f.q)}
                    style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '999px', background: 'rgba(212,175,55,0.1)', border: `1px solid ${G.goldBorder}`, color: G.gold, cursor: 'pointer', fontFamily: 'Montserrat', fontWeight: 600 }}>
                    {f.q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: '10px 14px', borderTop: `1px solid ${G.goldBorder}`, display: 'flex', gap: '8px' }}>
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
                placeholder="Mesajınızı yazın..."
                style={{ flex: 1, background: 'rgba(212,175,55,0.08)', border: `1px solid ${G.goldBorder}`, borderRadius: '999px', padding: '8px 14px', fontSize: '12px', color: '#fff', outline: 'none', fontFamily: 'Montserrat' }} />
              <button onClick={() => sendMsg()}
                style={{ width: '34px', height: '34px', borderRadius: '50%', background: G.gold, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Send size={14} style={{ color: G.bg }} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
