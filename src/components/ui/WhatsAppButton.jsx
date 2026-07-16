import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

function WhatsAppButton({ phoneNumber }) {
 const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Merhaba, Pilates dersleri hakkında bilgi almak istiyorum.")}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 bg-brand-black text-brand-lime rounded-full h-16 w-16 flex items-center justify-center shadow-lg group"
      aria-label="WhatsApp ile İletişime Geçin"
    >
        <span className="absolute bottom-1/2 translate-y-1/2 right-full mr-3 px-3 py-1.5 bg-brand-black text-brand-lime text-sm font-semibold rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Hemen Mesaj At
            <svg className="absolute text-brand-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
        </span>
      <MessageCircle className="h-8 w-8" />
    </motion.a>
  );
}

export default WhatsAppButton;