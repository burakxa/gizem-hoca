import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Clock, ArrowRight, Tag } from 'lucide-react';
import { allBlogPosts } from '@/data/blogData';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'rgba(255,255,255,0.92)', whiteMid:'rgba(255,255,255,0.65)' };

const cats = ['Tümü', 'Başlangıç', 'Sağlık', 'Rehber', 'Egzersiz', 'Hamile Pilatesi', 'İstanbul', 'Ekipman'];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Tümü');

  const filtered = useMemo(() => {
    return allBlogPosts.filter(p => {
      const matchCat = cat === 'Tümü' || p.category === cat;
      const matchSearch = !search || 
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.summary.toLowerCase().includes(search.toLowerCase()) ||
        (p.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [search, cat]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <Helmet>
        <title>Pilates Blog | Wellness İpuçları | Gizem Hoca Beşiktaş</title>
        <meta name="description" content="Pilates, sağlıklı yaşam ve wellness hakkında faydalı içerikler. Postür, core güçlendirme, hamile pilatesi, reformer rehberleri ve daha fazlası." />
      </Helmet>
      <div style={{ background:G.bg, minHeight:'100vh', fontFamily:'Montserrat,sans-serif' }}>

        {/* Başlık */}
        <div style={{ padding:'clamp(24px,4vw,40px) clamp(16px,4vw,40px) 0', borderBottom:`1px solid ${G.goldBorder}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px' }}>
            <div style={{ width:'28px', height:'2px', background:G.gold }} />
            <span style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.2em', color:G.gold }}>BLOG & REHBER</span>
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'16px', marginBottom:'20px' }}>
            <h1 style={{ fontSize:'clamp(28px,6vw,48px)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', lineHeight:0.95 }}>
              Pilates &<br /><span style={{ color:G.gold }}>Wellness</span>
            </h1>
            {/* Arama */}
            <div style={{ position:'relative', minWidth:'240px' }}>
              <Search size={14} style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:'rgba(212,175,55,0.5)', pointerEvents:'none' }} />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Yazı ara..."
                style={{ width:'100%', background:'rgba(212,175,55,0.08)', border:`1px solid ${G.goldBorder}`, borderRadius:'999px', padding:'10px 14px 10px 38px', fontSize:'13px', color:'#fff', outline:'none', fontFamily:'Montserrat' }} />
            </div>
          </div>

          {/* Kategori filtresi */}
          <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', paddingBottom:'20px', overflowX:'auto' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{ padding:'6px 14px', borderRadius:'999px', border:`1.5px solid ${cat===c ? G.gold : G.goldBorder}`, background:cat===c ? 'rgba(212,175,55,0.12)' : 'transparent', color:cat===c ? G.gold : 'rgba(255,255,255,0.5)', fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:'Montserrat', transition:'all 0.2s', whiteSpace:'nowrap' }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding:'60px', textAlign:'center', color:'rgba(255,255,255,0.4)', fontSize:'14px' }}>
            Arama sonucu bulunamadı.
          </div>
        ) : (
          <div style={{ padding:'clamp(16px,3vw,32px) clamp(16px,4vw,40px)' }}>

            {/* Öne çıkan yazı */}
            {featured && (
              <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                style={{ marginBottom:'28px' }}>
                <Link to={`/blog/${featured.id}`} style={{ textDecoration:'none', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0', borderRadius:'16px', overflow:'hidden', border:`1px solid ${G.goldBorder}`, background:'rgba(13,27,62,0.5)', backdropFilter:'blur(12px)' }} className="content-grid">
                  {featured.image && (
                    <div style={{ position:'relative', minHeight:'240px', overflow:'hidden' }}>
                      <img src={featured.image} alt={featured.title} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.65) saturate(0.8)' }} />
                      <div style={{ position:'absolute', top:'12px', left:'12px', background:G.gold, color:G.bg, fontSize:'10px', fontWeight:900, padding:'4px 10px', borderRadius:'999px' }}>
                        ✦ ÖNE ÇIKAN
                      </div>
                    </div>
                  )}
                  <div style={{ padding:'clamp(20px,3vw,32px)', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                    <div>
                      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px', flexWrap:'wrap' }}>
                        <span style={{ background:'rgba(212,175,55,0.12)', border:`1px solid ${G.goldBorder}`, color:G.gold, fontSize:'11px', fontWeight:700, padding:'3px 10px', borderRadius:'999px' }}>{featured.category}</span>
                        {featured.readTime && (
                          <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'11px', color:'rgba(255,255,255,0.4)' }}>
                            <Clock size={11} /> {featured.readTime} dk okuma
                          </span>
                        )}
                      </div>
                      <h2 style={{ fontSize:'clamp(18px,3vw,26px)', fontWeight:900, color:'#fff', letterSpacing:'-0.02em', marginBottom:'12px', lineHeight:1.2 }}>{featured.title}</h2>
                      <p style={{ fontSize:'13px', color:G.whiteMid, lineHeight:1.7 }}>{featured.summary}</p>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'6px', color:G.gold, fontSize:'12px', fontWeight:900, marginTop:'20px', letterSpacing:'0.06em' }}>
                      DEVAMINI OKU <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Diğer yazılar grid */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:'12px' }} className="blog-row">
              {rest.map((post, i) => (
                <motion.div key={post.id}
                  initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
                  whileHover={{ y:-4 }}>
                  <Link to={`/blog/${post.id}`} style={{ textDecoration:'none', display:'flex', flexDirection:'column', height:'100%', background:'rgba(13,27,62,0.5)', backdropFilter:'blur(12px)', border:`1px solid ${G.goldBorder}`, borderRadius:'14px', overflow:'hidden', transition:'border-color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor='rgba(212,175,55,0.4)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor=G.goldBorder}>
                    {post.image && (
                      <div style={{ height:'160px', overflow:'hidden' }}>
                        <img src={post.image} alt={post.title} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.65) saturate(0.8)', transition:'transform 0.4s' }}
                          onMouseEnter={e => e.target.style.transform='scale(1.05)'}
                          onMouseLeave={e => e.target.style.transform='scale(1)'} />
                      </div>
                    )}
                    <div style={{ padding:'16px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                      <div>
                        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'8px', flexWrap:'wrap' }}>
                          <span style={{ background:'rgba(212,175,55,0.1)', color:G.gold, fontSize:'10px', fontWeight:700, padding:'2px 8px', borderRadius:'999px' }}>{post.category}</span>
                          {post.readTime && (
                            <span style={{ display:'flex', alignItems:'center', gap:'3px', fontSize:'10px', color:'rgba(255,255,255,0.35)' }}>
                              <Clock size={10} /> {post.readTime} dk
                            </span>
                          )}
                        </div>
                        <h3 style={{ fontSize:'14px', fontWeight:900, color:'#fff', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.3 }}>{post.title}</h3>
                        <p style={{ fontSize:'12px', color:G.whiteMid, lineHeight:1.6 }}>{post.summary}</p>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:'4px', color:'rgba(212,175,55,0.7)', fontSize:'11px', fontWeight:700, marginTop:'14px' }}>
                        OKU <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
