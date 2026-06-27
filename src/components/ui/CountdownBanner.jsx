import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    if (!targetDate) return;
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTimeLeft({ expired: true });
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return timeLeft;
};

const pad = (n) => String(n ?? 0).padStart(2, '0');

export const CountdownBanner = () => {
  const [data, setData] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    supabase.from('settings').select('value').eq('key', 'countdown').single()
      .then(({ data: row }) => { if (row) setData(row.value); });
  }, []);

  const countdown = useCountdown(data?.date);

  if (!data?.enabled || !data?.date || dismissed || countdown.expired) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
        className="bg-brand-black text-brand-lime overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold opacity-60 tracking-widest">{data.title?.toUpperCase()}</span>
            <div className="flex items-center gap-2">
              {[{ v: countdown.days, l: 'GG' }, { v: countdown.hours, l: 'SS' }, { v: countdown.minutes, l: 'DK' }, { v: countdown.seconds, l: 'SN' }].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <div className="font-black text-lg leading-none">{pad(v)}</div>
                  <div className="text-[9px] opacity-50">{l}</div>
                </div>
              ))}
            </div>
            {data.subtitle && <span className="text-xs opacity-60">{data.subtitle}</span>}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {data.link && (
              <Link to={data.link}>
                <span className="text-xs bg-brand-lime text-brand-black px-3 py-1 rounded-full font-black">Rezervasyon</span>
              </Link>
            )}
            <button onClick={() => setDismissed(true)} className="opacity-40 hover:opacity-80 transition-opacity"><X size={16} /></button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export const AnnouncementBanner = () => {
  const [data, setData] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    supabase.from('settings').select('value').eq('key', 'announcement').single()
      .then(({ data: row }) => { if (row) setData(row.value); });
  }, []);

  if (!data?.enabled || !data?.text || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
        className="bg-brand-lime border-b-2 border-brand-black/10 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 gap-4">
          <p className="text-sm font-medium text-brand-black flex-1">{data.text}</p>
          <div className="flex items-center gap-3 flex-shrink-0">
            {data.link && (
              <Link to={data.link}>
                <span className="text-xs bg-brand-black text-brand-lime px-3 py-1 rounded-full font-black">{data.linkText || 'Detaylar'}</span>
              </Link>
            )}
            <button onClick={() => setDismissed(true)} className="opacity-40 hover:opacity-80 transition-opacity"><X size={14} /></button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
