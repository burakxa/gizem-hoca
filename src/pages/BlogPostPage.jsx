import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight, Share2, Tag } from 'lucide-react';
import { allBlogPosts } from '@/data/blogData';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldFaint:'rgba(212,175,55,0.1)', goldBorder:'rgba(212,175,55,0.2)', white:'rgba(255,255,255,0.92)', whiteMid:'rgba(255,255,255,0.65)' };

// Scroll progress bar
function ReadProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div style={{ position:'fixed', top:0, left:0, right:0, zIndex:9998, height:'3px', background:'rgba(212,175,55,0.15)' }}>
      <motion.div style={{ height:'100%', background:G.gold, width:`${progress}%`, transition:'width 0.1s linear' }} />
    </div>
  );
}

// İçindekiler
function TableOfContents({ content }) {
  const headings = [];
  const regex = /<h3[^>]*>(.*?)<\/h3>/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[1].replace(/<[^>]+>/g,'');
    const id = text.toLowerCase().replace(/[^a-z0-9ğüşıöç]/gi, '-').substring(0,40);
    headings.push({ text, id });
  }
  if (headings.length < 2) return null;
  return (
    <div style={{ background:'rgba(212,175,55,0.06)', border:`1px solid ${G.goldBorder}`, borderRadius:'12px', padding:'16px 20px', marginBottom:'28px' }}>
      <div style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.15em', color:G.gold, marginBottom:'12px' }}>İÇİNDEKİLER</div>
      <ol style={{ paddingLeft:'16px', margin:0 }}>
        {headings.map((h,i) => (
          <li key={i} style={{ marginBottom:'6px' }}>
            <a href={`#${h.id}`} style={{ fontSize:'13px', color:G.whiteMid, textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e => e.target.style.color=G.gold}
              onMouseLeave={e => e.target.style.color=G.whiteMid}>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Paylaşım butonları
function ShareButtons({ title, url }) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const buttons = [
    { label:'WhatsApp', color:'#25D366', bg:'rgba(37,211,102,0.12)', href:`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, icon:'💬' },
    { label:'Twitter', color:'#1DA1F2', bg:'rgba(29,161,242,0.12)', href:`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, icon:'🐦' },
    { label:'LinkedIn', color:'#0077B5', bg:'rgba(0,119,181,0.12)', href:`https://linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon:'💼' },
    { label:'Kopyala', color:G.gold, bg:'rgba(212,175,55,0.12)', href:null, icon:'🔗' },
  ];
  const [copied, setCopied] = useState(false);
  const copyUrl = () => {
    navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(()=>setCopied(false),2000); });
  };
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap', padding:'16px 0', borderTop:`1px solid ${G.goldBorder}`, borderBottom:`1px solid ${G.goldBorder}`, marginBottom:'28px' }}>
      <span style={{ fontSize:'12px', fontWeight:700, color:'rgba(255,255,255,0.4)', marginRight:'4px' }}>PAYLAŞ:</span>
      {buttons.map((b,i) => (
        b.href ? (
          <a key={i} href={b.href} target="_blank" rel="noopener noreferrer"
            style={{ display:'flex', alignItems:'center', gap:'5px', background:b.bg, border:`1px solid ${b.color}33`, color:b.color, fontSize:'11px', fontWeight:700, padding:'6px 12px', borderRadius:'999px', textDecoration:'none', transition:'all 0.2s' }}>
            {b.icon} {b.label}
          </a>
        ) : (
          <button key={i} onClick={copyUrl}
            style={{ display:'flex', alignItems:'center', gap:'5px', background:copied?'rgba(0,232,122,0.12)':b.bg, border:`1px solid ${copied?'#00e87a':b.color}33`, color:copied?'#00e87a':b.color, fontSize:'11px', fontWeight:700, padding:'6px 12px', borderRadius:'999px', cursor:'pointer', fontFamily:'Montserrat', transition:'all 0.2s' }}>
            {copied?'✅':'🔗'} {copied?'Kopyalandı!':b.label}
          </button>
        )
      ))}
    </div>
  );
}

export default function BlogPostPage() {
  const { id } = useParams();
  const post = allBlogPosts.find(p => String(p.id) === String(id));

  if (!post) return (
    <div style={{ padding:'80px', textAlign:'center', color:'rgba(255,255,255,0.5)', fontFamily:'Montserrat' }}>
      <div style={{ fontSize:'32px', marginBottom:'16px' }}>😔</div>
      <p>Yazı bulunamadı.</p>
      <Link to="/blog" style={{ color:'#d4af37', textDecoration:'none', fontSize:'13px', fontWeight:700, display:'inline-flex', alignItems:'center', gap:'6px', marginTop:'16px' }}>
        <ArrowLeft size={14} /> Blog'a Dön
      </Link>
    </div>
  );

  const related = allBlogPosts.filter(p => p.id !== post.id && (p.category === post.category || (post.tags||[]).some(t => (p.tags||[]).includes(t)))).slice(0,3);
  const currentUrl = `https://gizemhoca.net/blog/${post.id}`;

  // H3'lere id ekle
  const contentWithIds = post.content.replace(/<h3[^>]*>(.*?)<\/h3>/gi, (match, text) => {
    const clean = text.replace(/<[^>]+>/g,'');
    const id = clean.toLowerCase().replace(/[^a-z0-9ğüşıöç]/gi,'-').substring(0,40);
    return `<h3 id="${id}">${text}</h3>`;
  });

  // Article schema
  const schema = {
    "@context":"https://schema.org",
    "@type":"Article",
    "headline": post.title,
    "description": post.summary,
    "image": post.image || "https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/71e533503d331149fe73f8e165f13f5b.png",
    "author":{ "@type":"Person","name":"Gizem Hoca","url":"https://gizemhoca.net/hakkimda" },
    "publisher":{ "@type":"Organization","name":"Gizem Hoca Pilates","logo":{ "@type":"ImageObject","url":"https://horizons-cdn.hostinger.com/451c65e3-9af7-4c36-9235-9b5c17a191ce/5987e4c01aee4b6498a58f6a3b12f01e.png" }},
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage":{ "@type":"WebPage","@id": currentUrl }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Gizem Hoca Pilates</title>
        <meta name="description" content={post.summary} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <ReadProgress />

      <div style={{ background:G.bg, minHeight:'100vh', fontFamily:'Montserrat,sans-serif' }}>

        {/* Hero */}
        {post.image && (
          <div style={{ height:'clamp(200px,35vw,380px)', position:'relative', overflow:'hidden', borderBottom:`1px solid ${G.goldBorder}` }}>
            <img src={post.image.replace('w=800','w=1400')} alt={post.title}
              style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.45) saturate(0.7)' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(13,27,62,1) 0%, rgba(13,27,62,0.3) 60%, transparent 100%)' }} />
          </div>
        )}

        <div style={{ maxWidth:'780px', margin:'0 auto', padding:'clamp(24px,4vw,48px) clamp(16px,4vw,40px)' }}>

          {/* Geri */}
          <Link to="/blog" style={{ display:'inline-flex', alignItems:'center', gap:'6px', color:'rgba(212,175,55,0.6)', fontSize:'12px', fontWeight:700, textDecoration:'none', marginBottom:'24px', letterSpacing:'0.06em' }}>
            <ArrowLeft size={13} /> BLOG'A DÖN
          </Link>

          {/* Meta */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap', marginBottom:'16px' }}>
            <span style={{ background:'rgba(212,175,55,0.12)', border:`1px solid ${G.goldBorder}`, color:G.gold, fontSize:'11px', fontWeight:700, padding:'3px 10px', borderRadius:'999px' }}>{post.category}</span>
            {post.readTime && (
              <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color:'rgba(255,255,255,0.4)' }}>
                <Clock size={12} /> {post.readTime} dakika okuma
              </span>
            )}
            <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.3)' }}>{post.date}</span>
          </div>

          {/* Başlık */}
          <h1 style={{ fontSize:'clamp(24px,5vw,40px)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:'16px' }}>{post.title}</h1>
          <p style={{ fontSize:'15px', color:G.whiteMid, lineHeight:1.75, marginBottom:'28px', fontStyle:'italic', borderLeft:`3px solid ${G.gold}`, paddingLeft:'16px' }}>{post.summary}</p>

          {/* İçindekiler */}
          <TableOfContents content={post.content} />

          {/* İçerik */}
          <div className="blog-content" style={{ color:G.white, lineHeight:1.85, fontSize:'15px' }}
            dangerouslySetInnerHTML={{ __html: contentWithIds }} />

          {/* Etiketler */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginTop:'28px', marginBottom:'20px' }}>
              <Tag size={13} style={{ color:'rgba(212,175,55,0.5)', marginTop:'2px' }} />
              {post.tags.map((t,i) => (
                <span key={i} style={{ background:'rgba(212,175,55,0.08)', border:`1px solid rgba(212,175,55,0.15)`, color:'rgba(212,175,55,0.7)', fontSize:'11px', fontWeight:700, padding:'3px 10px', borderRadius:'999px' }}>#{t}</span>
              ))}
            </div>
          )}

          {/* Yazar */}
          <div style={{ display:'flex', alignItems:'center', gap:'14px', background:'rgba(212,175,55,0.06)', border:`1px solid ${G.goldBorder}`, borderRadius:'12px', padding:'16px', margin:'28px 0' }}>
            <div style={{ width:'48px', height:'48px', borderRadius:'50%', background:G.gold, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', fontWeight:900, color:G.bg, flexShrink:0 }}>G</div>
            <div>
              <div style={{ fontSize:'13px', fontWeight:900, color:'#fff', marginBottom:'2px' }}>Gizem Hoca</div>
              <div style={{ fontSize:'12px', color:G.whiteMid }}>Balanced Body® Sertifikalı Pilates Eğitmeni · 8+ yıl deneyim</div>
            </div>
            <Link to="/hakkimda" style={{ marginLeft:'auto', background:'transparent', border:`1px solid ${G.goldBorder}`, color:G.gold, fontSize:'11px', fontWeight:700, padding:'6px 14px', borderRadius:'999px', textDecoration:'none', whiteSpace:'nowrap' }}>
              Hakkımda
            </Link>
          </div>

          {/* Paylaşım */}
          <ShareButtons title={post.title} url={currentUrl} />

          {/* İlgili yazılar */}
          {related.length > 0 && (
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
                <div style={{ width:'22px', height:'2px', background:G.gold }} />
                <span style={{ fontSize:'11px', fontWeight:900, letterSpacing:'0.15em', color:G.gold }}>BUNLARI DA OKUYUN</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'10px' }}>
                {related.map((r,i) => (
                  <motion.div key={r.id} whileHover={{ y:-3 }}>
                    <Link to={`/blog/${r.id}`} style={{ display:'block', background:'rgba(13,27,62,0.5)', backdropFilter:'blur(8px)', border:`1px solid ${G.goldBorder}`, borderRadius:'12px', overflow:'hidden', textDecoration:'none', transition:'border-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor='rgba(212,175,55,0.4)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor=G.goldBorder}>
                      {r.image && <img src={r.image} alt={r.title} style={{ width:'100%', height:'110px', objectFit:'cover', filter:'brightness(0.6)' }} />}
                      <div style={{ padding:'12px' }}>
                        <div style={{ fontSize:'10px', fontWeight:700, color:G.gold, marginBottom:'6px' }}>{r.category}</div>
                        <div style={{ fontSize:'13px', fontWeight:700, color:'#fff', lineHeight:1.3, marginBottom:'4px' }}>{r.title}</div>
                        {r.readTime && <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.35)', display:'flex', alignItems:'center', gap:'3px' }}><Clock size={9}/>{r.readTime} dk</div>}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ marginTop:'40px', background:'rgba(212,175,55,0.08)', border:`1px solid ${G.goldBorder}`, borderRadius:'16px', padding:'24px', textAlign:'center' }}>
            <div style={{ fontSize:'24px', marginBottom:'10px' }}>🎯</div>
            <h3 style={{ fontSize:'18px', fontWeight:900, color:'#fff', marginBottom:'8px' }}>Bu konuda ders almak ister misin?</h3>
            <p style={{ fontSize:'13px', color:G.whiteMid, marginBottom:'16px' }}>İlk tanışma seansı ücretsiz. Gizem Hoca ile başla.</p>
            <a href="https://wa.me/905383135720?text=Merhaba!%20Ders%20almak%20istiyorum."
              target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:G.gold, color:G.bg, fontSize:'13px', fontWeight:900, padding:'12px 28px', borderRadius:'999px', textDecoration:'none', letterSpacing:'0.06em' }}>
              💬 WhatsApp'tan Ulaş <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .blog-content h3 { font-size: 20px; font-weight: 900; color: #fff; margin: 28px 0 12px; letter-spacing: -0.01em; }
        .blog-content p { margin-bottom: 16px; color: rgba(255,255,255,0.82); }
        .blog-content strong { color: #d4af37; font-weight: 700; }
        .blog-content ul, .blog-content ol { padding-left: 20px; margin-bottom: 16px; }
        .blog-content li { margin-bottom: 6px; color: rgba(255,255,255,0.78); font-size: 14px; }
        .blog-content h3::before { content: '✦ '; color: #d4af37; font-size: 14px; }
      `}</style>
    </>
  );
}
