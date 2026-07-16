import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie_accepted');
    if (!accepted) setTimeout(() => setVisible(true), 1500);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_accepted', 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50"
        >
          <div className="bg-brand-black rounded-2xl p-5 shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <Cookie size={20} className="text-brand-lime flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-bold text-sm mb-1">🍪 Çerez Bildirimi</p>
                <p className="text-white/60 text-xs leading-relaxed">
                  Bu site, deneyiminizi geliştirmek için çerezler kullanmaktadır. KVKK kapsamında bilgi almak için <a href="/sss" className="text-brand-lime underline">SSS</a> sayfamızı ziyaret edebilirsiniz.
                </p>
              </div>
              <button onClick={() => setVisible(false)} className="text-white/30 hover:text-white transition-colors flex-shrink-0">
                <X size={16} />
              </button>
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={accept}
                className="flex-1 bg-brand-lime text-brand-black py-2 rounded-xl font-black text-xs"
                whileTap={{ scale: 0.97 }}
              >
                Kabul Et
              </motion.button>
              <motion.button
                onClick={() => setVisible(false)}
                className="flex-1 bg-white/10 text-white py-2 rounded-xl font-black text-xs"
                whileTap={{ scale: 0.97 }}
              >
                Reddet
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
