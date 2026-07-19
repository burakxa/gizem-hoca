import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';

const G = { bg:'#0d1b3e', gold:'#d4af37', goldBorder:'rgba(212,175,55,0.2)', whiteMid:'rgba(255,255,255,0.78)' };

export default function NotFoundPage() {
  return (
    <>
      <Helmet><title>404 - Gizem Hoca Pilates</title></Helmet>
      <div style={{ background:G.bg, fontFamily:'Montserrat,sans-serif', minHeight:'100vh' }}>
        <div style={{ padding:'32px 40px', borderBottom:`1px solid ${G.goldBorder}` }}>
          <p style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.2em', color:G.gold, marginBottom:'6px' }}>GİZEM HOCA PİLATES</p>
          <h1 style={{ fontSize:'56px', fontWeight:900, color:'#fff', lineHeight:0.92, letterSpacing:'-0.03em' }}>404</h1>
        </div>
        <div style={{ padding:'40px' }}>
          <p style={{ fontSize:'20px', fontWeight:900, color:'#fff', marginBottom:'10px' }}>Sayfa Bulunamadı</p>
          <p style={{ fontSize:'13px', color:G.whiteMid, marginBottom:'28px' }}>Aradığınız sayfa taşınmış veya silinmiş olabilir.</p>
          <Link to="/" style={{ background:G.gold, color:G.bg, fontSize:'10px', fontWeight:900, letterSpacing:'0.06em', padding:'11px 22px', borderRadius:'999px', display:'inline-flex', alignItems:'center', gap:'8px' }}>
            ANA SAYFAYA DÖN <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}
