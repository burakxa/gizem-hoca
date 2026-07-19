import React from 'react';
import { Link } from 'react-router-dom';

const G = { bg:'#0d1b3e', dark:'#071029', gold:'#d4af37', goldBorder:'rgba(212,175,55,0.2)' };

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // Production'da error logging servisi buraya eklenebilir
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight:'100vh', background:G.bg, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Montserrat,sans-serif', padding:'24px' }}>
          <div style={{ textAlign:'center', maxWidth:'480px' }}>
            <div style={{ fontSize:'64px', marginBottom:'16px' }}>⚠️</div>
            <h1 style={{ fontSize:'24px', fontWeight:900, color:'#fff', marginBottom:'10px' }}>Bir şeyler ters gitti</h1>
            <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.6)', lineHeight:1.7, marginBottom:'28px' }}>
              Sayfa yüklenirken beklenmedik bir hata oluştu. Endişelenme, diğer sayfalar çalışmaya devam ediyor.
            </p>
            <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={() => { this.setState({ hasError:false }); window.location.reload(); }}
                style={{ background:G.gold, color:G.bg, fontSize:'13px', fontWeight:900, padding:'12px 24px', borderRadius:'999px', border:'none', cursor:'pointer', fontFamily:'Montserrat' }}>
                Sayfayı Yenile
              </button>
              <Link to="/" onClick={() => this.setState({ hasError:false })}
                style={{ background:'transparent', border:`1px solid rgba(212,175,55,0.3)`, color:'rgba(255,255,255,0.6)', fontSize:'13px', fontWeight:700, padding:'12px 20px', borderRadius:'999px', textDecoration:'none' }}>
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
