import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare, Minimize2 } from 'lucide-react';

const G = { bg: '#0d1b3e', dark: '#071029', gold: '#d4af37', goldBorder: 'rgba(212,175,55,0.25)' };
const WA = '905383135720';

const SYSTEM_PROMPT = `Sen Gizem Hoca Pilates stüdyosunun yapay zeka asistanısın. Türkçe konuşuyorsun, samimi ve yardımseversin.

Gizem Hoca hakkında bilgiler:
- İstanbul Beşiktaş'ta pilates eğitmeni, 8+ yıl deneyim, 500+ öğrenci
- Sertifikalar: Balanced Body® Mat 1&2, Reformer 1-2-3, Hamile Pilatesi, Postür & Rehabilitasyon
- Ders türleri: Bireysel (1 kişi), Grup (max 4 kişi), Online (Zoom), Reformer
- Fiyatlar: Bireysel 8 seans 3200₺, Grup 8 seans 1800₺, Online 8 seans 2400₺
- Program: Pazartesi-Cuma 08:00-19:00, Cumartesi 09:00-13:00
- İletişim: WhatsApp 0538 313 57 20, merhaba@gizemhoca.net
- İlk tanışma seansı ÜCRETSİZ
- Web: gizemhoca.net

Kurallar:
- Kısa ve net cevap ver (max 3 cümle)
- Randevu için hep WhatsApp'a yönlendir
- Fiyat sorularında paketleri öner
- Sıcak ve motive edici ol
- Emoji kullanabilirsin ama abartma`;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: 'assistant', text: 'Merhaba! 👋 Pilates hakkında merak ettiğin her şeyi sorabilirsin.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState(true);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);
  useEffect(() => { const t = setTimeout(() => setPulse(false), 5000); return () => clearTimeout(t); }, []);
  useEffect(() => { if (open && !minimized) inputRef.current?.focus(); }, [open, minimized]);

  const quickQuestions = [
    'İlk ders ücretsiz mi?',
    'Fiyatlar ne kadar?',
    'Online ders var mı?',
    'Nerede bulunuyorsunuz?',
  ];

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

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Üzgünüm, şu an cevap veremiyorum. WhatsApp\'tan ulaşabilirsiniz!';
      setMsgs(m => [...m, { role: 'assistant', text: reply }]);
    } catch {
      setMsgs(m => [...m, { role: 'assistant', text: 'Bağlantı sorunu oluştu. WhatsApp\'tan yazabilirsiniz! 💬' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Açma butonu */}
      <motion.button
        onClick={() => { setOpen(o => !o); setMinimized(false); }}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        style={{ position: 'fixed', bottom: '96px', right: '24px', zIndex: 49, width: '52px', height: '52px', borderRadius: '50%', background: G.dark, border: `1.5px solid ${G.goldBorder}`, color: G.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.35)' }}>
        {open ? <X size={20} /> : <MessageSquare size={20} />}
        {pulse && !open && (
          <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
            style={{ position: 'absolute', top: '-3px', right: '-3px', width: '13px', height: '13px', borderRadius: '50%', background: G.gold, border: '2px solid #0d1b3e' }} />
        )}
      </motion.button>

      {/* Chat paneli */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', bottom: '160px', right: '24px', zIndex: 48, width: '310px', borderRadius: '16px', background: G.bg, border: `1px solid ${G.goldBorder}`, boxShadow: '0 16px 48px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden', maxHeight: minimized ? '52px' : '440px', transition: 'max-height 0.3s ease' }}>

            {/* Header */}
            <div style={{ background: G.gold, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(13,27,62,0.3)', flexShrink: 0 }}>
                <img src="https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/71e533503d331149fe73f8e165f13f5b.png"
                  alt="Gizem Hoca" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: G.bg, lineHeight: 1 }}>Gizem Hoca AI</div>
                <div style={{ fontSize: '11px', color: 'rgba(13,27,62,0.55)', marginTop: '2px' }}>
                  {loading ? '⏳ Yazıyor...' : '🟢 Çevrimiçi'}
                </div>
              </div>
              <button onClick={() => setMinimized(m => !m)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(13,27,62,0.5)', padding: '2px' }}>
                <Minimize2 size={15} />
              </button>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(13,27,62,0.5)', padding: '2px' }}>
                <X size={15} />
              </button>
            </div>

            {!minimized && (
              <>
                {/* Mesajlar */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {msgs.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{
                        maxWidth: '88%', padding: '9px 12px', fontSize: '14px', lineHeight: 1.55,
                        borderRadius: msg.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                        background: msg.role === 'user' ? G.gold : 'rgba(212,175,55,0.1)',
                        border: msg.role === 'user' ? 'none' : `1px solid ${G.goldBorder}`,
                        color: msg.role === 'user' ? G.bg : 'rgba(255,255,255,0.88)',
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div style={{ display: 'flex', gap: '4px', padding: '8px 12px' }}>
                      {[0,1,2].map(i => (
                        <motion.div key={i} animate={{ y: [0,-5,0] }} transition={{ duration: 0.6, delay: i*0.15, repeat: Infinity }}
                          style={{ width: '6px', height: '6px', borderRadius: '50%', background: G.gold }} />
                      ))}
                    </div>
                  )}
                  <div ref={endRef} />
                </div>

                {/* Hızlı sorular */}
                {msgs.length <= 2 && (
                  <div style={{ padding: '0 12px 8px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {quickQuestions.map((q, i) => (
                      <button key={i} onClick={() => sendMsg(q)}
                        style={{ fontSize: '14px', padding: '4px 10px', borderRadius: '999px', background: 'rgba(212,175,55,0.1)', border: `1px solid ${G.goldBorder}`, color: G.gold, cursor: 'pointer', fontFamily: 'Montserrat', fontWeight: 600, transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.2)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; }}>
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* WhatsApp linki */}
                <div style={{ padding: '0 12px 8px' }}>
                  <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 700, color: '#25d366', textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}>
                    💬 WhatsApp'tan randevu al
                  </a>
                </div>

                {/* Input */}
                <div style={{ padding: '8px 12px 12px', borderTop: `1px solid ${G.goldBorder}`, display: 'flex', gap: '8px' }}>
                  <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMsg()}
                    placeholder="Mesajınızı yazın..."
                    style={{ flex: 1, background: 'rgba(212,175,55,0.08)', border: `1px solid ${G.goldBorder}`, borderRadius: '999px', padding: '8px 14px', fontSize: '14px', color: '#fff', outline: 'none', fontFamily: 'Montserrat' }} />
                  <button onClick={() => sendMsg()} disabled={loading || !input.trim()}
                    style={{ width: '34px', height: '34px', borderRadius: '50%', background: input.trim() ? G.gold : 'rgba(212,175,55,0.2)', border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                    <Send size={14} style={{ color: input.trim() ? G.bg : 'rgba(212,175,55,0.4)' }} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
