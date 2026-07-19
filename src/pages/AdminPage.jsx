import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader, LogOut, Sparkles, Plus, BookOpen, Calendar, DollarSign, HelpCircle, Star, Megaphone, Instagram, Mail, Copy, Check, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldBorder:'rgba(212,175,55,0.2)', goldFaint:'rgba(212,175,55,0.08)', white:'rgba(255,255,255,0.92)', whiteMid:'rgba(255,255,255,0.65)' };

const SYSTEM = `Sen Gizem Hoca Pilates stüdyosunun akıllı site yönetim asistanısın. Türkçe konuşuyorsun.

SITEYE EKLEME YAPMA YETKİN:
Kullanıcı senden bir şey eklenmesini istediğinde, tam ve kullanıma hazır JSX/JSON kodu veya içerik üret.

Blog yazısı ekle → allBlogPosts dizisine eklenecek tam nesneyi ver:
{
  id: [sonraki id],
  title: "...",
  date: "... 2026",
  category: "...",
  summary: "...",
  image: "https://images.unsplash.com/photo-...",
  readTime: [sayı],
  tags: ["...", "..."],
  content: \`<p>...</p><h3>...</h3><p>...</p>\`
}

Program dersi ekle → schedule nesnesine eklenecek ders:
{ time:"HH:MM", title:"...", type:"Grup|Bireysel|Online", spots:[sayı], duration:50, level:"..." }

SSS sorusu ekle → items dizisine:
{ q:"?", a:"...", tags:["..."] }

Fiyat paketi → plans dizisine:
{ name:"...", emoji:"...", sub:"...", price:{b:"...",g:"..."}, sessions:"...", period:"ay", features:["..."], color:"..." }

KURALLAR:
- Her zaman Türkçe yaz
- Pilates/wellness tonunu koru  
- Kodu hemen ver, açıklaması kısa olsun
- Hangi dosyaya nereye ekleneceğini söyle
- SEO için anahtar kelime ekle
- Gizem Hoca'nın sesini kullan (samimi, uzman, motive edici)`;

const quickActions = [
  {
    category: 'Blog',
    icon: BookOpen,
    color: '#00e87a',
    items: [
      { label:'Yeni Blog Yazısı', prompt:'Pilates ve hamilelik hakkında SEO uyumlu tam bir blog yazısı oluştur. allBlogPosts için hazır JSON formatında ver.' },
      { label:'Instagram Caption', prompt:'Bu haftaki pilates dersini tanıtan, emoji kullanan, 150 kelimelik Instagram gönderisi yaz.' },
      { label:'Motivasyon Metni', prompt:'Pilatese yeni başlamak isteyen ama çekinen birine özel kısa ve motive edici bir metin yaz.' },
    ]
  },
  {
    category: 'Program',
    icon: Calendar,
    color: '#75aadb',
    items: [
      { label:'Yeni Ders Ekle', prompt:'Salı saat 14:00\'te "Akşam Mat Pilates" grup dersi ekle. ProgramPage schedule nesnesine hazır format ver.' },
      { label:'Program Duyurusu', prompt:'Yeni eklenen Salı 14:00 Mat Pilates dersini duyuran WhatsApp/Instagram mesajı yaz.' },
      { label:'Sezon Programı', prompt:'Yaz sezonu için yeni ders programı öner. Sabah erken ve akşam geç saatler ekle.' },
    ]
  },
  {
    category: 'Fiyat',
    icon: DollarSign,
    color: G.gold,
    items: [
      { label:'Yeni Paket Ekle', prompt:'Öğrenci indirimi paketi oluştur — 8 ders, %20 indirimli. FiyatlarPage plans dizisine hazır format.' },
      { label:'Kampanya Metni', prompt:'Yaz kampanyası duyurusu için WhatsApp ve Instagram metni yaz. 2 ay %15 indirim.' },
      { label:'Fiyat Güncelle', prompt:'Tüm paketlerin yeni fiyatlarını belirlememe yardım et. Mevcut: Başlangıç ₺800, Düzenli ₺1400, Yoğun ₺2200.' },
    ]
  },
  {
    category: 'SSS',
    icon: HelpCircle,
    color: '#ff9fd4',
    items: [
      { label:'Yeni SSS Ekle', prompt:'"Pilates için yaş sınırı var mı?" sorusunu SSFPage için hazır format olarak ekle.' },
      { label:'SSS Kategorisi', prompt:'"Online Dersler" kategorisi için 5 yeni SSS sorusu ve cevabı yaz. SSFPage formatında.' },
      { label:'SSS Güncelle', prompt:'Mevcut SSS listesini gözden geçir ve eksik olabilecek 3 önemli soru öner.' },
    ]
  },
  {
    category: 'İçerik',
    icon: Megaphone,
    color: '#ffd166',
    items: [
      { label:'WhatsApp Mesajı', prompt:'Haftalık ders hatırlatma mesajı yaz. Kısa, samimi, emoji içersin.' },
      { label:'Email Bülteni', prompt:'Aylık pilates bülteni taslağı oluştur. Başlık, ipucu, yeni ders, motivasyon bölümleri içersin.' },
      { label:'Duyuru Metni', prompt:'Stüdyoda yapılan yenileme çalışmasını duyuran kısa ve heyecanlı bir metin yaz.' },
    ]
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} style={{ display:'flex', alignItems:'center', gap:'5px', background:'rgba(212,175,55,0.1)', border:`1px solid ${G.goldBorder}`, color:copied?'#00e87a':G.gold, fontSize:'11px', fontWeight:700, padding:'5px 12px', borderRadius:'999px', cursor:'pointer', fontFamily:'Montserrat', transition:'all 0.2s' }}>
      {copied ? <><Check size={12}/> Kopyalandı!</> : <><Copy size={12}/> Kopyala</>}
    </button>
  );
}

function Message({ msg }) {
  const isBot = msg.role === 'assistant';
  return (
    <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
      style={{ display:'flex', gap:'12px', alignItems:'flex-start', justifyContent:isBot?'flex-start':'flex-end', marginBottom:'16px' }}>
      {isBot && (
        <div style={{ width:'32px', height:'32px', borderRadius:'10px', background:'rgba(212,175,55,0.15)', border:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Bot size={15} style={{ color:G.gold }} />
        </div>
      )}
      <div style={{ maxWidth:'82%' }}>
        <div style={{ background:isBot?'rgba(13,27,62,0.7)':'rgba(212,175,55,0.12)', backdropFilter:'blur(8px)', border:`1px solid ${isBot?G.goldBorder:'rgba(212,175,55,0.3)'}`, borderRadius:isBot?'4px 14px 14px 14px':'14px 4px 14px 14px', padding:'13px 16px' }}>
          <pre style={{ fontSize:'13px', color:G.white, lineHeight:1.75, whiteSpace:'pre-wrap', fontFamily:'Montserrat', margin:0 }}>
            {msg.content}
          </pre>
        </div>
        {isBot && (
          <div style={{ marginTop:'6px' }}>
            <CopyButton text={msg.content} />
          </div>
        )}
      </div>
      {!isBot && (
        <div style={{ width:'32px', height:'32px', borderRadius:'10px', background:'rgba(212,175,55,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <User size={15} style={{ color:G.gold }} />
        </div>
      )}
    </motion.div>
  );
}

export default function AdminPage() {
  const { isLoggedIn, login, logout } = useAdmin();
  const [pass, setPass] = useState('');
  const [messages, setMessages] = useState([
    { role:'assistant', content:'Merhaba! 👋 Ben Gizem Hoca\'nın site asistanıyım.\n\nBenden şunları isteyebilirsin:\n• "Blog yaz: [konu]" → Hazır JSON formatında blog yazısı\n• "Program ekle: [gün saat ders]" → Hazır ders objesi\n• "SSS ekle: [soru]" → SSFPage için hazır format\n• "Fiyat paketi oluştur: [detay]" → FiyatlarPage için\n• "Instagram metni yaz: [konu]" → Sosyal medya içeriği\n\nSol panelden hızlı şablonları kullanabilir ya da direkt yazabilirsin. 🚀' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [openCat, setOpenCat] = useState('Blog');
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(m => [...m, { role:'user', content:msg }]);
    setLoading(true);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          model:'claude-sonnet-4-6',
          max_tokens:1000,
          system: SYSTEM,
          messages:[
            ...messages.filter(m=>m.role!=='assistant'||messages.indexOf(m)>0).map(m=>({ role:m.role, content:m.content })),
            { role:'user', content:msg }
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Bir hata oluştu.';
      setMessages(m => [...m, { role:'assistant', content:reply }]);
    } catch(e) {
      setMessages(m => [...m, { role:'assistant', content:'❌ Bağlantı hatası. Tekrar dene.' }]);
    }
    setLoading(false);
  };

  if (!isLoggedIn) return (
    <div style={{ minHeight:'100vh', background:G.bg, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Montserrat' }}>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        style={{ background:G.dark, border:`1px solid ${G.goldBorder}`, borderRadius:'20px', padding:'40px', width:'min(400px,90vw)', textAlign:'center' }}>
        <div style={{ width:'64px', height:'64px', borderRadius:'16px', background:'rgba(212,175,55,0.12)', border:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
          <Sparkles size={28} style={{ color:G.gold }} />
        </div>
        <h1 style={{ fontSize:'22px', fontWeight:900, color:'#fff', marginBottom:'6px' }}>Admin Panel</h1>
        <p style={{ fontSize:'13px', color:G.whiteMid, marginBottom:'28px' }}>Gizem Hoca Site Yönetimi</p>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&login(pass)}
          placeholder="Şifre" autoFocus
          style={{ width:'100%', background:'rgba(212,175,55,0.07)', border:`1px solid ${G.goldBorder}`, borderRadius:'10px', padding:'12px 16px', fontSize:'14px', color:'#fff', outline:'none', fontFamily:'Montserrat', marginBottom:'12px', boxSizing:'border-box' }} />
        <motion.button onClick={()=>login(pass)} whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
          style={{ width:'100%', background:G.gold, color:G.bg, fontSize:'13px', fontWeight:900, padding:'13px', borderRadius:'999px', border:'none', cursor:'pointer', fontFamily:'Montserrat', letterSpacing:'0.06em' }}>
          Giriş Yap
        </motion.button>
      </motion.div>
    </div>
  );

  return (
    <div style={{ height:'calc(100vh - 110px)', background:G.bg, fontFamily:'Montserrat', display:'grid', gridTemplateColumns:'280px 1fr', overflow:'hidden' }}>

      {/* Sol panel — Hızlı eylemler */}
      <div style={{ background:G.dark, borderRight:`1px solid ${G.goldBorder}`, overflowY:'auto', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'16px', borderBottom:`1px solid ${G.goldBorder}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' }}>
            <Zap size={14} style={{ color:G.gold }} />
            <span style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.12em', color:G.gold }}>HIZLI EYLEMLER</span>
          </div>
          <p style={{ fontSize:'11px', color:G.whiteMid }}>Tıkla, AI otomatik yapsın</p>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'8px' }}>
          {quickActions.map((cat) => {
            const Icon = cat.icon;
            const isOpen = openCat === cat.category;
            return (
              <div key={cat.category} style={{ marginBottom:'4px' }}>
                <button onClick={() => setOpenCat(isOpen ? null : cat.category)}
                  style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', borderRadius:'10px', border:'none', background:isOpen?`${cat.color}15`:'transparent', color:isOpen?cat.color:G.whiteMid, cursor:'pointer', fontFamily:'Montserrat', fontSize:'12px', fontWeight:900, transition:'all 0.2s' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    <Icon size={14} style={{ color:isOpen?cat.color:G.whiteMid }} />
                    {cat.category}
                  </div>
                  {isOpen ? <ChevronUp size={13}/> : <ChevronDown size={13}/>}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} style={{ overflow:'hidden' }}>
                      <div style={{ padding:'4px 4px 8px' }}>
                        {cat.items.map((item,i) => (
                          <button key={i} onClick={() => send(item.prompt)}
                            style={{ width:'100%', textAlign:'left', padding:'8px 12px', borderRadius:'8px', border:`1px solid transparent`, background:'transparent', color:G.whiteMid, fontSize:'12px', cursor:'pointer', fontFamily:'Montserrat', transition:'all 0.15s', marginBottom:'2px', lineHeight:1.4 }}
                            onMouseEnter={e => { e.currentTarget.style.background=`${cat.color}10`; e.currentTarget.style.color=cat.color; e.currentTarget.style.borderColor=`${cat.color}33`; }}
                            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=G.whiteMid; e.currentTarget.style.borderColor='transparent'; }}>
                            ↗ {item.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div style={{ padding:'12px', borderTop:`1px solid ${G.goldBorder}` }}>
          <button onClick={logout}
            style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', background:'rgba(255,68,68,0.08)', border:'1px solid rgba(255,68,68,0.2)', color:'rgba(255,100,100,0.8)', fontSize:'12px', fontWeight:700, padding:'9px', borderRadius:'10px', cursor:'pointer', fontFamily:'Montserrat' }}>
            <LogOut size={13} /> Çıkış
          </button>
        </div>
      </div>

      {/* Sağ — Chat */}
      <div style={{ display:'flex', flexDirection:'column', overflow:'hidden' }}>
        {/* Header */}
        <div style={{ padding:'14px 20px', borderBottom:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', gap:'10px', background:G.dark }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'rgba(212,175,55,0.15)', border:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Bot size={18} style={{ color:G.gold }} />
          </div>
          <div>
            <div style={{ fontSize:'14px', fontWeight:900, color:'#fff' }}>Site Asistanı</div>
            <div style={{ fontSize:'11px', color:'#00e87a', display:'flex', alignItems:'center', gap:'5px' }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#00e87a' }} />
              Aktif · Claude Sonnet
            </div>
          </div>
          <div style={{ marginLeft:'auto', fontSize:'11px', color:G.whiteMid }}>
            {messages.length - 1} mesaj
          </div>
        </div>

        {/* Mesajlar */}
        <div style={{ flex:1, overflowY:'auto', padding:'20px' }}>
          {messages.map((msg,i) => <Message key={i} msg={msg} />)}
          {loading && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ display:'flex', gap:'12px', alignItems:'flex-start', marginBottom:'16px' }}>
              <div style={{ width:'32px', height:'32px', borderRadius:'10px', background:'rgba(212,175,55,0.15)', border:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Bot size={15} style={{ color:G.gold }} />
              </div>
              <div style={{ background:'rgba(13,27,62,0.7)', border:`1px solid ${G.goldBorder}`, borderRadius:'4px 14px 14px 14px', padding:'14px 18px', display:'flex', gap:'6px', alignItems:'center' }}>
                {[0,1,2].map(i => (
                  <motion.div key={i} animate={{ y:[0,-6,0] }} transition={{ repeat:Infinity, duration:0.8, delay:i*0.15 }}
                    style={{ width:'7px', height:'7px', borderRadius:'50%', background:G.gold }} />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding:'14px 20px', borderTop:`1px solid ${G.goldBorder}`, background:G.dark }}>
          <div style={{ display:'flex', gap:'10px', alignItems:'flex-end' }}>
            <textarea value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); send(); } }}
              placeholder='Örn: "Blog yaz: sırt ağrısı için pilates hareketleri" ya da "Salı 15:00 reformer dersi ekle"'
              rows={2}
              style={{ flex:1, background:'rgba(212,175,55,0.07)', border:`1px solid ${G.goldBorder}`, borderRadius:'12px', padding:'12px 16px', fontSize:'13px', color:'#fff', outline:'none', fontFamily:'Montserrat', resize:'none', lineHeight:1.6 }} />
            <motion.button onClick={() => send()} disabled={!input.trim()||loading}
              whileHover={input.trim()&&!loading?{ scale:1.05 }:{}} whileTap={input.trim()&&!loading?{ scale:0.95 }:{}}
              style={{ width:'44px', height:'44px', borderRadius:'12px', background:input.trim()&&!loading?G.gold:'rgba(212,175,55,0.2)', border:'none', cursor:input.trim()&&!loading?'pointer':'default', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}>
              <Send size={16} style={{ color:input.trim()&&!loading?G.bg:'rgba(212,175,55,0.4)' }} />
            </motion.button>
          </div>
          <p style={{ fontSize:'10px', color:G.whiteMid, marginTop:'8px', textAlign:'center' }}>
            Enter → gönder · Shift+Enter → yeni satır · Kopyala butonu ile kodu al
          </p>
        </div>
      </div>
    </div>
  );
}
