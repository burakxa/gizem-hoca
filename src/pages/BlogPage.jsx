import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { blogPosts as localPosts } from '@/data/blogData';

const G = { bg:'#0d1b3e', gold:'#d4af37', goldBorder:'rgba(212,175,55,0.2)', white:'#fff', whiteMid:'rgba(255,255,255,0.5)' };

export default function BlogPage() {
  return (
    <>
      <Helmet><title>Blog - Gizem Hoca Pilates</title></Helmet>
      <div style={{ background:G.bg, fontFamily:'Montserrat,sans-serif', minHeight:'100vh' }}>
        <div style={{ padding:'32px 40px', borderBottom:`1px solid ${G.goldBorder}`, display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'32px', height:'2px', background:G.gold }} />
          <div>
            <p style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.2em', color:G.gold, marginBottom:'6px' }}>GİZEM HOCA PİLATES</p>
            <h1 style={{ fontSize:'56px', fontWeight:900, color:'#fff', lineHeight:0.92, letterSpacing:'-0.03em' }}>BLOG</h1>
          </div>
        </div>
        <div>
          {localPosts.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.07 }}
              style={{ borderBottom:`1px solid ${G.goldBorder}` }}>
              <Link to={`/blog/${post.id}`} style={{ display:'grid', gridTemplateColumns:'160px 1fr', padding:'28px 40px', gap:'24px', textDecoration:'none' }}>
                <div>
                  <p style={{ fontSize:'11px', color:G.whiteMid }}>{post.date}</p>
                  <p style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.1em', color:G.gold, marginTop:'4px' }}>{(post.category||'').toUpperCase()}</p>
                </div>
                <div>
                  <h2 style={{ fontSize:'20px', fontWeight:900, color:'#fff', letterSpacing:'-0.02em', marginBottom:'8px', lineHeight:1.1 }}>{post.title}</h2>
                  <p style={{ fontSize:'12px', color:G.whiteMid, lineHeight:1.7, marginBottom:'12px' }}>{post.summary}</p>
                  <span style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.1em', color:G.gold, borderBottom:`2px solid ${G.gold}`, paddingBottom:'2px', display:'inline-flex', alignItems:'center', gap:'4px' }}>
                    DEVAMINI OKU <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
