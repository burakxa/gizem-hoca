import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Search, MessageCircle, ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'rgba(255,255,255,0.92)', whiteMid:'rgba(255,255,255,0.65)', whiteLow:'rgba(255,255,255,0.3)' };

const faqs = [
  {
    cat: 'Başlangıç',
    icon: '🌱',
    items: [
      {
        q: 'Pilates kime uygundur?',
        a: 'Pilates her yaştan ve her fitness seviyesinden kişiye uygundur. 18\'den 80\'e kadar, hamile bireylerden sporculara, rehabilitasyon sürecindekilerden tamamen yeni başlayanlara kadar herkese özel programlar tasarlanabilir. Önemli olan doğru formda, doğru tempoda başlamak.',
        tags: ['başlangıç', 'yaş', 'uygunluk'],
      },
      {
        q: 'Hiç spor yapmadım, pilates yapabilir miyim?',
        a: 'Kesinlikle! Pilates aslında bu kitleye özellikle iyi gelir. İlk derste hiçbir ön koşul beklenmez — sadece rahat kıyafetler ve merak yeterli. Tempo ve zorluk tamamen sizin seviyenize göre ayarlanır.',
        tags: ['başlangıç', 'spor geçmişi'],
      },
      {
        q: 'İlk derste ne beklememeli?',
        a: 'İlk ders genellikle tanışma ve temel prensiplere odaklanır: nefes, pelvik taban, omurga hizası. Ağır antrenman beklemeyin — ama ertesi gün daha önce farkında olmadığınız kaslarınızı hissedebilirsiniz. Bu tamamen normal!',
        tags: ['ilk ders', 'beklenti'],
      },
      {
        q: 'Ne kadar sürede sonuç alırım?',
        a: 'Joseph Pilates şöyle der: "10 derste fark hissedersin, 20 derste başkaları fark eder, 30 derste tamamen değişmiş bir vücudun olur." Bu çok doğru bir gözlem. Haftada 2-3 seans düzenlilikle 4-6 hafta içinde postür ve enerji seviyenizdeki değişimi kendiniz fark edersiniz.',
        tags: ['sonuç', 'süre', 'beklenti'],
      },
    ],
  },
  {
    cat: 'Dersler',
    icon: '🧘',
    items: [
      {
        q: 'Bireysel ve grup dersi arasındaki fark nedir?',
        a: 'Bireysel derslerde program tamamen size özel hazırlanır, her hareket sizin seviyenize ve hedefinize göre şekillenir. Grup derslerinde (max 4 kişi) topluluk enerjisi motivasyonu artırır ve maliyet daha uygundur. İkisi birbirini tamamlar — çoğu öğrenci bireysel dersle başlar, sonra gruba geçer.',
        tags: ['bireysel', 'grup', 'format'],
      },
      {
        q: 'Derse ne giyerek gelmeliyim?',
        a: 'Hareketi kısıtlamayan, vücudunuza oturan ama sıkmayan kıyafetler idealdir. Bol kıyafetlerden kaçının — eğitmenin postürünüzü ve hareket kalitesini görebilmesi gerekir. Kaydırmaz pilates çorabı öneririm, ama çıplak ayak da uygundur. Spor ayakkabı gerekmez.',
        tags: ['kıyafet', 'hazırlık'],
      },
      {
        q: 'Online dersler yüz yüze kadar etkili mi?',
        a: 'Kısa cevap: evet. Kamera üzerinden hareketi net görebiliyor ve anlık düzeltme yapabiliyorum. Online derste de kişisel program oluşturuluyor ve 1-1 ilgi aynen devam ediyor. Özellikle ev ortamında pratik yapmak isteyenler için mükemmel seçenek.',
        tags: ['online', 'etkinlik'],
      },
      {
        q: 'Reformer pilates ile mat pilates farkı nedir?',
        a: 'Mat pilates sadece vücut ağırlığıyla, yerde yapılır. Reformer ise yay direnci sistemi olan özel bir alettir. Reformer daha geniş hareket açısı, daha fazla direnç seçeneği ve daha hızlı ilerleme imkânı sunar. İkisi birbirini tamamlar — ideal program genellikle her ikisini içerir.',
        tags: ['reformer', 'mat', 'fark'],
      },
      {
        q: 'Haftada kaç ders yapmalıyım?',
        a: 'Başlangıç için haftada 2 ders idealdir. Bu hem kasların adapte olmasına hem de teknik öğrenimine yeterli zaman sağlar. İlerlediğinizde haftada 3\'e çıkabilirsiniz. Haftada 1 derste de sonuç alınır ama ilerleme daha yavaş olur.',
        tags: ['sıklık', 'program'],
      },
    ],
  },
  {
    cat: 'Sağlık',
    icon: '💚',
    items: [
      {
        q: 'Sırt ağrım var, pilates yapabilir miyim?',
        a: 'Pilates kronik bel ve sırt ağrısı için en çok önerilen egzersiz yöntemlerinden biridir. Fizyoterapistler tarafından sıklıkla reçete edilir. Ancak akut bir durum veya ameliyat sonrası süreçteyseniz önce doktorunuza danışmanızı öneririm. Durumunuza özel program tasarlarım.',
        tags: ['sırt ağrısı', 'sağlık', 'rehabilitasyon'],
      },
      {
        q: 'Hamilelikte pilates güvenli midir?',
        a: 'Hamile Pilatesi Uzmanlık Sertifikam bulunmaktadır. Doktor onayıyla her trimesterde güvenle yapılabilir. Hamile pilatesi pelvik taban güçlendirir, bel ağrısını azaltır, doğuma hazırlar ve doğum sonrası iyileşmeyi hızlandırır. 2. ve 3. trimesterde bazı pozisyon modifikasyonları yapılır.',
        tags: ['hamilelik', 'güvenlik', 'prenatal'],
      },
      {
        q: 'Diz veya kalça problemi varsa pilates yapılabilir mi?',
        a: 'Evet, hatta çoğu durumda önerilir. Pilates eklem sorunlarında iyileştirici rol oynayabilir çünkü eklemleri destekleyen kasları güçlendirir. Hangi hareketlerin yapılıp yapılamayacağını durumunuza göre belirleriz. Ciddi bir probleminiz varsa doktorunuzun görüşünü alın.',
        tags: ['diz', 'kalça', 'eklem', 'sağlık'],
      },
      {
        q: 'Pilates kilo verdirir mi?',
        a: 'Pilates öncelikli bir kilo verme egzersizi değildir. Ancak düzenli pilates pratiği vücut kompozisyonunu değiştirir: yağ azalır, kas artar, vücut daha uzun ve dik görünür. Kilo vermek temel hedefse pilates + beslenme düzeni kombinasyonu en etkili yaklaşımdır.',
        tags: ['kilo', 'zayıflama', 'vücut'],
      },
    ],
  },
  {
    cat: 'Fiyat & İptal',
    icon: '💰',
    items: [
      {
        q: 'Deneme dersi var mı?',
        a: 'Evet! İlk tanışma seansı tamamen ücretsiz. Bu seansta hedeflerinizi konuşur, seviyenizi belirler ve size uygun programı planlarız. Hiçbir taahhüt olmaksızın pilatesle tanışma fırsatı.',
        tags: ['deneme', 'ücretsiz', 'başlangıç'],
      },
      {
        q: 'Ders iptali nasıl yapılır?',
        a: 'Ders saatinden 24 saat önce WhatsApp üzerinden bildirim yapıldığında ücretsiz iptal veya erteleme imkânı sunulmaktadır. 24 saatten az süre kala yapılan iptallerde ders hakkı kullanılmış sayılır.',
        tags: ['iptal', 'erteleme', 'politika'],
      },
      {
        q: 'Paket derslerin geçerlilik süresi var mı?',
        a: '8 derslik paketler satın alım tarihinden itibaren 3 ay içinde kullanılmalıdır. Sağlık nedeniyle kullanılamaması durumunda esneklik sağlanmaktadır.',
        tags: ['paket', 'süre', 'geçerlilik'],
      },
      {
        q: 'Ödeme seçenekleri neler?',
        a: 'Nakit, havale/EFT ve kredi kartı (peşin) kabul edilmektedir. Tüm ödeme detayları WhatsApp üzerinden görüşülebilir.',
        tags: ['ödeme', 'kredi kartı'],
      },
    ],
  },
];

// FAQ şeması için tüm sorular
const allFaqs = faqs.flatMap(c => c.items.map(item => ({ ...item, cat: c.cat })));

export default function SSFPage() {
  const [openItem, setOpenItem] = useState(null);
  const [activecat, setActiveCat] = useState('Tümü');
  const [search, setSearch] = useState('');
  const [votes, setVotes] = useState({});

  const filtered = useMemo(() => {
    return allFaqs.filter(faq => {
      const matchCat = activecat === 'Tümü' || faq.cat === activecat;
      const matchSearch = !search ||
        faq.q.toLowerCase().includes(search.toLowerCase()) ||
        faq.a.toLowerCase().includes(search.toLowerCase()) ||
        (faq.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activecat, search]);

  const handleVote = (idx, type) => {
    setVotes(v => ({ ...v, [idx]: type }));
  };

  // FAQ Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Sıkça Sorulan Sorular | Pilates SSS | Gizem Hoca Beşiktaş</title>
        <meta name="description" content="Pilates hakkında en çok sorulan sorular: başlangıç, dersler, sağlık, fiyatlar, iptal politikası ve daha fazlası." />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div style={{ background:G.bg, minHeight:'100vh', fontFamily:'Montserrat,sans-serif' }}>

        {/* Başlık */}
        <div style={{ padding:'clamp(24px,4vw,48px) clamp(16px,4vw,40px)', borderBottom:`1px solid ${G.goldBorder}`, background:`linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 100%)` }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
            <div style={{ width:'28px', height:'2px', background:G.gold }} />
            <span style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.2em', color:G.gold }}>SIKÇA SORULAN SORULAR</span>
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'20px' }}>
            <div>
              <h1 style={{ fontSize:'clamp(32px,7vw,56px)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', lineHeight:0.92, marginBottom:'12px' }}>
                Aklındaki<br /><span style={{ color:G.gold }}>Sorular</span>
              </h1>
              <p style={{ fontSize:'14px', color:G.whiteMid, maxWidth:'400px', lineHeight:1.7 }}>
                {allFaqs.length} soru, dürüst cevaplar. Bulamadığın varsa direkt sor.
              </p>
            </div>

            {/* Arama */}
            <div style={{ position:'relative', minWidth:'260px' }}>
              <Search size={14} style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:'rgba(212,175,55,0.5)', pointerEvents:'none' }} />
              <input value={search} onChange={e => { setSearch(e.target.value); setOpenItem(null); }}
                placeholder="Soru ara..."
                style={{ width:'100%', background:'rgba(212,175,55,0.07)', border:`1px solid ${G.goldBorder}`, borderRadius:'999px', padding:'12px 16px 12px 40px', fontSize:'13px', color:'#fff', outline:'none', fontFamily:'Montserrat' }} />
            </div>
          </div>

          {/* Kategori tabs */}
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginTop:'24px' }}>
            {['Tümü', ...faqs.map(f => f.cat)].map(cat => (
              <button key={cat} onClick={() => { setActiveCat(cat); setOpenItem(null); }}
                style={{ display:'flex', alignItems:'center', gap:'6px', padding:'7px 16px', borderRadius:'999px', border:`1.5px solid ${activecat===cat ? G.gold : G.goldBorder}`, background: activecat===cat ? 'rgba(212,175,55,0.12)' : 'transparent', color: activecat===cat ? G.gold : G.whiteMid, fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:'Montserrat', transition:'all 0.2s' }}>
                {faqs.find(f=>f.cat===cat)?.icon || '✦'} {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sonuç yok */}
        {filtered.length === 0 && (
          <div style={{ padding:'60px', textAlign:'center' }}>
            <div style={{ fontSize:'40px', marginBottom:'16px' }}>🔍</div>
            <p style={{ fontSize:'14px', color:G.whiteMid, marginBottom:'20px' }}>"{search}" için sonuç bulunamadı.</p>
            <a href="https://wa.me/905383135720?text=Sorum%20var:%20" target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:G.gold, color:G.bg, fontSize:'12px', fontWeight:900, padding:'10px 22px', borderRadius:'999px', textDecoration:'none' }}>
              💬 WhatsApp'tan Sor
            </a>
          </div>
        )}

        {/* SSS listesi */}
        <div style={{ maxWidth:'860px', margin:'0 auto', padding:'0 clamp(16px,4vw,40px) 60px' }}>
          {filtered.length > 0 && (
            <div style={{ paddingTop:'8px' }}>
              {filtered.map((faq, i) => {
                const isOpen = openItem === i;
                return (
                  <motion.div key={`${faq.cat}-${i}`} layout
                    style={{ borderBottom:`1px solid ${G.goldBorder}` }}>
                    <button onClick={() => setOpenItem(isOpen ? null : i)}
                      style={{ width:'100%', textAlign:'left', padding:'20px 0', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'16px', background:'none', border:'none', cursor:'pointer', fontFamily:'Montserrat' }}>
                      <div style={{ display:'flex', alignItems:'flex-start', gap:'14px', flex:1 }}>
                        {/* Kategori badge */}
                        <span style={{ fontSize:'10px', fontWeight:700, color:G.gold, background:'rgba(212,175,55,0.1)', border:`1px solid rgba(212,175,55,0.2)`, padding:'3px 8px', borderRadius:'6px', whiteSpace:'nowrap', marginTop:'2px', flexShrink:0 }}>
                          {faq.cat}
                        </span>
                        <span style={{ fontSize:'14px', fontWeight:700, color: isOpen ? G.gold : '#fff', transition:'color 0.2s', lineHeight:1.4 }}>
                          {faq.q}
                        </span>
                      </div>
                      <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration:0.2 }} style={{ flexShrink:0, width:'28px', height:'28px', borderRadius:'50%', background: isOpen ? 'rgba(212,175,55,0.15)' : 'rgba(212,175,55,0.07)', border:`1px solid ${isOpen ? G.gold : G.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'center', transition:'background 0.2s, border-color 0.2s' }}>
                        <Plus size={14} style={{ color:G.gold }} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
                          transition={{ duration:0.25 }} style={{ overflow:'hidden' }}>
                          <div style={{ paddingBottom:'20px', paddingLeft:'82px' }}>
                            <p style={{ fontSize:'14px', color:G.whiteMid, lineHeight:1.8, marginBottom:'14px' }}>{faq.a}</p>

                            {/* Etiketler */}
                            {faq.tags && (
                              <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'14px' }}>
                                {faq.tags.map((t,ti) => (
                                  <span key={ti} onClick={() => setSearch(t)}
                                    style={{ fontSize:'10px', color:'rgba(212,175,55,0.6)', background:'rgba(212,175,55,0.07)', border:`1px solid rgba(212,175,55,0.15)`, padding:'2px 8px', borderRadius:'999px', cursor:'pointer', transition:'all 0.15s' }}
                                    onMouseEnter={e => e.target.style.color=G.gold}
                                    onMouseLeave={e => e.target.style.color='rgba(212,175,55,0.6)'}>
                                    #{t}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Faydalı mıydı */}
                            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                              <span style={{ fontSize:'11px', color:G.whiteLow }}>Bu cevap faydalı mıydı?</span>
                              {votes[i] ? (
                                <span style={{ fontSize:'11px', color:'#00e87a', fontWeight:700 }}>
                                  {votes[i] === 'up' ? '👍 Teşekkürler!' : '📩 Daha iyi cevap için WhatsApp\'tan sor'}
                                </span>
                              ) : (
                                <div style={{ display:'flex', gap:'6px' }}>
                                  <button onClick={() => handleVote(i,'up')}
                                    style={{ display:'flex', alignItems:'center', gap:'4px', background:'rgba(0,232,122,0.1)', border:'1px solid rgba(0,232,122,0.25)', color:'#00e87a', fontSize:'11px', fontWeight:700, padding:'4px 10px', borderRadius:'999px', cursor:'pointer', fontFamily:'Montserrat' }}>
                                    <ThumbsUp size={11} /> Evet
                                  </button>
                                  <button onClick={() => handleVote(i,'down')}
                                    style={{ display:'flex', alignItems:'center', gap:'4px', background:'rgba(255,68,68,0.08)', border:'1px solid rgba(255,68,68,0.2)', color:'#ff6b6b', fontSize:'11px', fontWeight:700, padding:'4px 10px', borderRadius:'999px', cursor:'pointer', fontFamily:'Montserrat' }}>
                                    <ThumbsDown size={11} /> Hayır
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Alt CTA */}
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ marginTop:'48px', background:`linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05))`, border:`1px solid ${G.goldBorder}`, borderRadius:'20px', padding:'clamp(24px,4vw,40px)', textAlign:'center' }}>
            <div style={{ fontSize:'36px', marginBottom:'14px' }}>💬</div>
            <h3 style={{ fontSize:'clamp(18px,3vw,24px)', fontWeight:900, color:'#fff', letterSpacing:'-0.02em', marginBottom:'10px' }}>
              Aradığın Cevabı Bulamadın mı?
            </h3>
            <p style={{ fontSize:'14px', color:G.whiteMid, lineHeight:1.7, marginBottom:'22px' }}>
              Her soru özel — doğrudan sorabilirsin. Genellikle 1 saat içinde cevap veriyorum.
            </p>
            <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
              <a href="https://wa.me/905383135720?text=Sorum%20var,%20yardımcı%20olur%20musun?"
                target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:G.gold, color:G.bg, fontSize:'13px', fontWeight:900, padding:'13px 28px', borderRadius:'999px', textDecoration:'none', letterSpacing:'0.04em', boxShadow:'0 4px 20px rgba(212,175,55,0.35)' }}>
                💬 WhatsApp'tan Sor <ArrowRight size={14} />
              </a>
              <Link to="/quiz"
                style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'transparent', border:`1.5px solid rgba(212,175,55,0.3)`, color:G.whiteMid, fontSize:'13px', fontWeight:700, padding:'13px 24px', borderRadius:'999px', textDecoration:'none' }}>
                🎯 Seviye Testini Dene
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
