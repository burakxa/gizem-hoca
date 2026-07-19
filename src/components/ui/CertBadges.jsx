import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Star } from 'lucide-react';

const G = { gold: '#d4af37', goldFaint: 'rgba(212,175,55,0.1)', goldBorder: 'rgba(212,175,55,0.2)', bg: '#0d1b3e' };

const certs = [
  { icon: Award, label: 'Balanced Body®', sub: 'Mat 1 & 2', year: '2016' },
  { icon: Shield, label: 'Balanced Body®', sub: 'Reformer 1-2-3', year: '2017' },
  { icon: Star, label: 'Hamile Pilatesi', sub: 'Uzmanlık', year: '2019' },
  { icon: Award, label: 'Postür & Rehab', sub: 'Sertifika', year: '2021' },
];

export default function CertBadges() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
      {certs.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -3, borderColor: 'rgba(212,175,55,0.5)' }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', background: G.goldFaint, border: `1px solid ${G.goldBorder}`, borderRadius: '12px', padding: '10px 14px', minWidth: '160px', transition: 'all 0.2s', cursor: 'default' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: G.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={16} style={{ color: G.bg }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: G.gold, lineHeight: 1.2 }}>{c.label}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.78)', marginTop: '2px' }}>{c.sub} · {c.year}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
