import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import {
  Lock, LogOut, Save, Plus, Trash2, Edit2, Check, X,
  Bell, Calendar, MessageSquare, BookOpen, Clock, Eye, EyeOff, RefreshCw
} from 'lucide-react';

// ── küçük yardımcılar ──────────────────────────────────────
const Toggle = ({ value, onChange }) => (
  <div onClick={() => onChange(!value)}
    className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${value ? 'bg-brand-black' : 'bg-brand-black/20'}`}>
    <div className={`w-5 h-5 bg-brand-lime rounded-full shadow m-0.5 transition-transform ${value ? 'translate-x-6' : ''}`} />
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    {label && <label className="text-xs font-bold text-brand-black/50 mb-1.5 block">{label}</label>}
    <input className="w-full bg-white/60 border-2 border-brand-black/10 focus:border-brand-black rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all" {...props} />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    {label && <label className="text-xs font-bold text-brand-black/50 mb-1.5 block">{label}</label>}
    <textarea className="w-full bg-white/60 border-2 border-brand-black/10 focus:border-brand-black rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all resize-none" {...props} />
  </div>
);

const SaveBtn = ({ onClick, saved, loading }) => (
  <motion.button onClick={onClick} whileTap={{ scale: 0.97 }}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-all ${saved ? 'bg-green-500 text-white' : 'bg-brand-black text-brand-lime'}`}>
    {loading ? <RefreshCw size={15} className="animate-spin" /> : saved ? <Check size={15} /> : <Save size={15} />}
    {saved ? 'Kaydedildi!' : loading ? 'Kaydediliyor...' : 'Kaydet'}
  </motion.button>
);

// ── Tab bileşenleri ────────────────────────────────────────

const SettingsTab = () => {
  const [countdown, setCountdown] = useState({ enabled: false, title: 'Sonraki Grup Dersine', date: '', subtitle: 'Yerini ayırt!', link: '/program' });
  const [announcement, setAnnouncement] = useState({ enabled: false, text: '', link: '', linkText: 'Detaylar' });
  const [saved, setSaved] = useState({ countdown: false, announcement: false });
  const [loading, setLoading] = useState({ countdown: false, announcement: false });

  useEffect(() => {
    supabase.from('settings').select('*').then(({ data }) => {
      data?.forEach(row => {
        if (row.key === 'countdown') setCountdown(row.value);
        if (row.key === 'announcement') setAnnouncement(row.value);
      });
    });
  }, []);

  const save = async (key, value, field) => {
    setLoading(l => ({ ...l, [field]: true }));
    await supabase.from('settings').upsert({ key, value, updated_at: new Date().toISOString() });
    setLoading(l => ({ ...l, [field]: false }));
    setSaved(s => ({ ...s, [field]: true }));
    setTimeout(() => setSaved(s => ({ ...s, [field]: false })), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Geri sayım */}
      <div className="bg-brand-black/5 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-brand-black">⏱ Geri Sayım Sayacı</h2>
          <Toggle value={countdown.enabled} onChange={v => setCountdown(c => ({ ...c, enabled: v }))} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="BAŞLIK" value={countdown.title} onChange={e => setCountdown(c => ({ ...c, title: e.target.value }))} />
          <Input label="TARİH & SAAT" type="datetime-local" value={countdown.date} onChange={e => setCountdown(c => ({ ...c, date: e.target.value }))} />
          <Input label="ALT YAZI" value={countdown.subtitle} onChange={e => setCountdown(c => ({ ...c, subtitle: e.target.value }))} />
          <Input label="BUTON LİNKİ" value={countdown.link} onChange={e => setCountdown(c => ({ ...c, link: e.target.value }))} />
        </div>
        <SaveBtn onClick={() => save('countdown', countdown, 'countdown')} saved={saved.countdown} loading={loading.countdown} />
      </div>

      {/* Duyuru */}
      <div className="bg-brand-black/5 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-brand-black">📢 Duyuru Banner'ı</h2>
          <Toggle value={announcement.enabled} onChange={v => setAnnouncement(a => ({ ...a, enabled: v }))} />
        </div>
        <Textarea label="DUYURU METNİ" rows={2} value={announcement.text} onChange={e => setAnnouncement(a => ({ ...a, text: e.target.value }))} placeholder="🎉 Bu ay ilk derse gelenler için %20 indirim!" />
        <div className="grid grid-cols-2 gap-3">
          <Input label="BUTON LİNKİ" value={announcement.link} onChange={e => setAnnouncement(a => ({ ...a, link: e.target.value }))} placeholder="/fiyatlar" />
          <Input label="BUTON METNİ" value={announcement.linkText} onChange={e => setAnnouncement(a => ({ ...a, linkText: e.target.value }))} placeholder="Detaylar" />
        </div>
        {announcement.text && (
          <div className="bg-brand-black rounded-xl px-4 py-2.5 flex items-center justify-between gap-3">
            <p className="text-brand-lime text-sm flex-1">{announcement.text}</p>
            <span className="text-xs bg-brand-lime text-brand-black px-3 py-1 rounded-full font-black">{announcement.linkText}</span>
          </div>
        )}
        <SaveBtn onClick={() => save('announcement', announcement, 'announcement')} saved={saved.announcement} loading={loading.announcement} />
      </div>
    </div>
  );
};

const TestimonialsTab = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: '', job: '', tag: 'Bireysel Ders', rating: 5, text: '', date: '' });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (data) setList(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setLoading(true);
    if (editing) {
      await supabase.from('testimonials').update(form).eq('id', editing);
    } else {
      await supabase.from('testimonials').insert(form);
    }
    setLoading(false);
    setForm({ name: '', job: '', tag: 'Bireysel Ders', rating: 5, text: '', date: '' });
    setEditing(null);
    setShowForm(false);
    load();
  };

  const del = async (id) => {
    if (!confirm('Silmek istediğine emin misin?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    load();
  };

  const togglePublish = async (id, current) => {
    await supabase.from('testimonials').update({ published: !current }).eq('id', id);
    load();
  };

  const startEdit = (t) => {
    setForm({ name: t.name, job: t.job || '', tag: t.tag || 'Bireysel Ders', rating: t.rating || 5, text: t.text, date: t.date || '' });
    setEditing(t.id);
    setShowForm(true);
  };

  const tags = ['Bireysel Ders', 'Grup Ders', 'Reformer', 'Online Ders', 'Hamile Pilatesi'];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-brand-black/50">{list.length} yorum</p>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ name: '', job: '', tag: 'Bireysel Ders', rating: 5, text: '', date: '' }); }}
          className="flex items-center gap-2 bg-brand-black text-brand-lime px-4 py-2 rounded-xl font-black text-sm">
          <Plus size={15} /> Yeni Yorum
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-brand-black/5 rounded-2xl p-5 space-y-3">
            <h3 className="font-black text-brand-black">{editing ? 'Yorumu Düzenle' : 'Yeni Yorum Ekle'}</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input label="AD SOYAD" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Elif T." />
              <Input label="MESLEK" value={form.job} onChange={e => setForm(f => ({ ...f, job: e.target.value }))} placeholder="Öğretmen" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-brand-black/50 mb-1.5 block">KATEGORİ</label>
                <select value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                  className="w-full bg-white/60 border-2 border-brand-black/10 focus:border-brand-black rounded-xl px-4 py-2.5 text-sm font-medium outline-none">
                  {tags.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <Input label="TARİH" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="Mart 2025" />
            </div>
            <Textarea label="YORUM METNİ" rows={3} value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} placeholder="Müşteri yorumu..." />
            <div className="flex gap-3">
              <motion.button onClick={save} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-brand-black text-brand-lime px-5 py-2.5 rounded-xl font-black text-sm">
                {loading ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
                {editing ? 'Güncelle' : 'Kaydet'}
              </motion.button>
              <button onClick={() => { setShowForm(false); setEditing(null); }}
                className="px-5 py-2.5 rounded-xl border-2 border-brand-black/20 font-bold text-sm text-brand-black/60">
                İptal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {list.map(t => (
          <div key={t.id} className={`bg-brand-black rounded-2xl p-4 ${!t.published ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-black text-brand-lime text-sm">{t.name}</span>
                <span className="text-white/40 text-xs ml-2">{t.job} · {t.date}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => togglePublish(t.id, t.published)} className="p-1.5 rounded-lg bg-white/10 text-white/60 hover:text-white transition-colors">
                  <Eye size={14} />
                </button>
                <button onClick={() => startEdit(t)} className="p-1.5 rounded-lg bg-white/10 text-white/60 hover:text-white transition-colors">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => del(t.id)} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:text-red-300 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="text-white/70 text-xs line-clamp-2">"{t.text}"</p>
            <span className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded-full mt-2 inline-block">{t.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogTab = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: '', summary: '', content: '', category: 'Genel', date: '', published: true });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) setList(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setLoading(true);
    if (editing) {
      await supabase.from('blog_posts').update(form).eq('id', editing);
    } else {
      await supabase.from('blog_posts').insert(form);
    }
    setLoading(false);
    setForm({ title: '', summary: '', content: '', category: 'Genel', date: '', published: true });
    setEditing(null);
    setShowForm(false);
    load();
  };

  const del = async (id) => {
    if (!confirm('Silmek istediğine emin misin?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    load();
  };

  const startEdit = (p) => {
    setForm({ title: p.title, summary: p.summary || '', content: p.content || '', category: p.category || 'Genel', date: p.date || '', published: p.published });
    setEditing(p.id);
    setShowForm(true);
  };

  const cats = ['Genel', 'Başlangıç', 'Reformer', 'Hamilelik', 'Sağlık', 'Doğum Sonrası', 'Evde Pilates'];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-brand-black/50">{list.length} yazı</p>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ title: '', summary: '', content: '', category: 'Genel', date: '', published: true }); }}
          className="flex items-center gap-2 bg-brand-black text-brand-lime px-4 py-2 rounded-xl font-black text-sm">
          <Plus size={15} /> Yeni Yazı
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-brand-black/5 rounded-2xl p-5 space-y-3">
            <h3 className="font-black text-brand-black">{editing ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı'}</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input label="BAŞLIK" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Yazı başlığı" />
              <Input label="TARİH" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="15 Haziran 2026" />
            </div>
            <div>
              <label className="text-xs font-bold text-brand-black/50 mb-1.5 block">KATEGORİ</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full bg-white/60 border-2 border-brand-black/10 focus:border-brand-black rounded-xl px-4 py-2.5 text-sm font-medium outline-none">
                {cats.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <Textarea label="ÖZET" rows={2} value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} placeholder="Kısa özet..." />
            <Textarea label="İÇERİK (HTML desteklenir)" rows={6} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="<p>Yazı içeriği...</p>" />
            <div className="flex items-center gap-3">
              <Toggle value={form.published} onChange={v => setForm(f => ({ ...f, published: v }))} />
              <span className="text-sm font-bold text-brand-black/60">{form.published ? 'Yayında' : 'Taslak'}</span>
            </div>
            <div className="flex gap-3">
              <motion.button onClick={save} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-brand-black text-brand-lime px-5 py-2.5 rounded-xl font-black text-sm">
                {loading ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
                {editing ? 'Güncelle' : 'Yayınla'}
              </motion.button>
              <button onClick={() => { setShowForm(false); setEditing(null); }}
                className="px-5 py-2.5 rounded-xl border-2 border-brand-black/20 font-bold text-sm text-brand-black/60">
                İptal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {list.map(p => (
          <div key={p.id} className={`bg-brand-black/5 rounded-2xl p-4 ${!p.published ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold mr-2 ${p.published ? 'bg-green-100 text-green-700' : 'bg-brand-black/10 text-brand-black/50'}`}>
                  {p.published ? 'Yayında' : 'Taslak'}
                </span>
                <span className="text-xs text-brand-black/40">{p.date} · {p.category}</span>
                <h3 className="font-black text-brand-black mt-1 text-sm">{p.title}</h3>
                {p.summary && <p className="text-xs text-brand-black/50 mt-0.5 line-clamp-1">{p.summary}</p>}
              </div>
              <div className="flex gap-2 ml-3 flex-shrink-0">
                <button onClick={() => startEdit(p)} className="p-1.5 rounded-lg bg-brand-black/8 text-brand-black/60 hover:text-brand-black transition-colors">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => del(p.id)} className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ScheduleTab = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ day: 'Pazartesi', time: '', title: '', type: 'Grup', spots: 4, active: true });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeDay, setActiveDay] = useState('Pazartesi');

  const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const types = ['Grup', 'Bireysel', 'Online'];

  const load = useCallback(async () => {
    const { data } = await supabase.from('schedule').select('*').order('time');
    if (data) setList(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setLoading(true);
    if (editing) {
      await supabase.from('schedule').update(form).eq('id', editing);
    } else {
      await supabase.from('schedule').insert(form);
    }
    setLoading(false);
    setForm({ day: activeDay, time: '', title: '', type: 'Grup', spots: 4, active: true });
    setEditing(null);
    setShowForm(false);
    load();
  };

  const del = async (id) => {
    if (!confirm('Silmek istediğine emin misin?')) return;
    await supabase.from('schedule').delete().eq('id', id);
    load();
  };

  const startEdit = (s) => {
    setForm({ day: s.day, time: s.time, title: s.title, type: s.type, spots: s.spots, active: s.active });
    setEditing(s.id);
    setShowForm(true);
  };

  const dayList = list.filter(s => s.day === activeDay);

  return (
    <div className="space-y-4">
      {/* Gün seçimi */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map(d => (
          <button key={d} onClick={() => setActiveDay(d)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap border-2 transition-all ${activeDay === d ? 'bg-brand-black text-brand-lime border-brand-black' : 'border-brand-black/15 text-brand-black/60'}`}>
            {d}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-brand-black/50">{activeDay} · {dayList.length} ders</p>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ day: activeDay, time: '', title: '', type: 'Grup', spots: 4, active: true }); }}
          className="flex items-center gap-2 bg-brand-black text-brand-lime px-4 py-2 rounded-xl font-black text-sm">
          <Plus size={15} /> Ders Ekle
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-brand-black/5 rounded-2xl p-5 space-y-3">
            <h3 className="font-black text-brand-black">{editing ? 'Dersi Düzenle' : 'Yeni Ders'}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-brand-black/50 mb-1.5 block">GÜN</label>
                <select value={form.day} onChange={e => setForm(f => ({ ...f, day: e.target.value }))}
                  className="w-full bg-white/60 border-2 border-brand-black/10 focus:border-brand-black rounded-xl px-4 py-2.5 text-sm font-medium outline-none">
                  {days.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <Input label="SAAT" type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
              <Input label="DERS ADI" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Mat Pilates" />
              <div>
                <label className="text-xs font-bold text-brand-black/50 mb-1.5 block">TÜRÜ</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full bg-white/60 border-2 border-brand-black/10 focus:border-brand-black rounded-xl px-4 py-2.5 text-sm font-medium outline-none">
                  {types.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <Input label="KONTENJAN" type="number" min="0" max="20" value={form.spots} onChange={e => setForm(f => ({ ...f, spots: parseInt(e.target.value) }))} />
            </div>
            <div className="flex gap-3">
              <motion.button onClick={save} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-brand-black text-brand-lime px-5 py-2.5 rounded-xl font-black text-sm">
                {loading ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
                {editing ? 'Güncelle' : 'Ekle'}
              </motion.button>
              <button onClick={() => { setShowForm(false); setEditing(null); }}
                className="px-5 py-2.5 rounded-xl border-2 border-brand-black/20 font-bold text-sm text-brand-black/60">
                İptal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {dayList.length === 0 && (
          <div className="text-center py-8 text-brand-black/30">
            <Clock size={32} className="mx-auto mb-2 opacity-30" />
            <p className="font-bold text-sm">Bu gün için ders yok</p>
          </div>
        )}
        {dayList.map(s => (
          <div key={s.id} className={`flex items-center justify-between bg-brand-black/5 rounded-xl px-4 py-3 ${!s.active ? 'opacity-40' : ''}`}>
            <div className="flex items-center gap-4">
              <span className="font-black text-brand-black text-base w-12">{s.time}</span>
              <div>
                <div className="font-bold text-brand-black text-sm">{s.title}</div>
                <div className="text-xs text-brand-black/40">{s.type} · {s.spots === 0 ? 'Dolu' : `${s.spots} kontenjan`}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(s)} className="p-1.5 rounded-lg bg-brand-black/8 text-brand-black/60 hover:text-brand-black transition-colors">
                <Edit2 size={14} />
              </button>
              <button onClick={() => del(s.id)} className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:text-red-600 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Ana Admin Sayfası ──────────────────────────────────────
const AdminPage = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoginLoading(false);
    if (err) setError('E-posta veya şifre hatalı!');
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const tabs = [
    { id: 'settings', label: 'Duyuru & Sayaç', icon: <Bell size={15} /> },
    { id: 'testimonials', label: 'Yorumlar', icon: <MessageSquare size={15} /> },
    { id: 'blog', label: 'Blog', icon: <BookOpen size={15} /> },
    { id: 'schedule', label: 'Program', icon: <Clock size={15} /> },
  ];

  if (!session) {
    return (
      <>
        <Helmet><title>Admin Girişi - Gizem Hoca</title></Helmet>
        <div className="w-full min-h-screen bg-brand-lime flex items-center justify-center p-8">
          <motion.div className="w-full max-w-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-brand-black rounded-full p-3"><Lock size={20} className="text-brand-lime" /></div>
              <div>
                <h1 className="text-2xl font-black text-brand-black">Admin Paneli</h1>
                <p className="text-sm text-brand-black/50">Gizem Hoca Pilates</p>
              </div>
            </div>
            <form onSubmit={login} className="space-y-3">
              <Input label="E-POSTA" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@gizemhoca.net" />
              <div className="relative">
                <label className="text-xs font-bold text-brand-black/50 mb-1.5 block">ŞİFRE</label>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/60 border-2 border-brand-black/10 focus:border-brand-black rounded-xl px-4 py-2.5 pr-12 text-sm font-medium outline-none transition-all"
                />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 bottom-2.5 text-brand-black/40">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && <p className="text-red-600 text-sm font-bold">{error}</p>}
              <motion.button type="submit" whileTap={{ scale: 0.97 }}
                className="w-full bg-brand-black text-brand-lime py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2">
                {loginLoading ? <RefreshCw size={15} className="animate-spin" /> : <Lock size={15} />}
                {loginLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Admin Paneli - Gizem Hoca</title></Helmet>
      <div className="w-full min-h-screen bg-brand-lime p-6 lg:p-10 overflow-y-auto">
        {/* Üst bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-brand-black tracking-tight">Admin Paneli</h1>
            <p className="text-xs text-brand-black/40 mt-1">{session.user.email}</p>
          </div>
          <button onClick={logout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-brand-black/20 text-brand-black/60 text-sm font-bold hover:border-brand-black/50 transition-colors">
            <LogOut size={15} /> Çıkış
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-brand-black text-brand-lime border-brand-black' : 'border-brand-black/15 text-brand-black/60 hover:border-brand-black/30'
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {activeTab === 'settings' && <SettingsTab />}
            {activeTab === 'testimonials' && <TestimonialsTab />}
            {activeTab === 'blog' && <BlogTab />}
            {activeTab === 'schedule' && <ScheduleTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default AdminPage;
