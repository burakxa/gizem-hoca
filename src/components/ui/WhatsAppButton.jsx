import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const quickMessages = [
  'Ders programı hakkında bilgi almak istiyorum.',
  'Fiyatlar ve paketler hakkında bilgi almak istiyorum.',
  'Özel ders rezervasyonu yapmak istiyorum.',
  'Online ders seçenekleri hakkında bilgi almak istiyorum.',
];

function WhatsAppButton({ phoneNumber }) {
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = (msg) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Quick message panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="bg-[#25D366] p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Gizem Hoca</p>
                  <p className="text-white/80 text-xs">Genellikle birkaç dakika içinde yanıt verir</p>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">Hızlı mesaj seç</p>
              {quickMessages.map((msg, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(msg)}
                  className="w-full text-left text-sm bg-gray-50 hover:bg-[#25D366]/10 border border-gray-200 hover:border-[#25D366]/40 rounded-xl px-3 py-2.5 transition-all duration-200 text-gray-700 font-medium"
                >
                  {msg}
                </button>
              ))}
              <button
                onClick={() => sendMessage('Merhaba, bilgi almak istiyorum.')}
                className="w-full text-center text-sm text-[#25D366] font-bold mt-1 py-1 hover:underline"
              >
                Özel mesaj yaz →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        )}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 100 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative h-16 w-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/40"
          aria-label="WhatsApp ile İletişime Geçin"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="h-7 w-7" />
              </motion.div>
            ) : (
              <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageCircle className="h-7 w-7" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

export default WhatsAppButton;
