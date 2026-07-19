import React, { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { MessageSquare, X, Share2, Instagram, Facebook, Linkedin } from 'lucide-react';

    const socialLinks = [
      {
        name: 'WhatsApp',
        icon: <MessageSquare className="h-6 w-6" />,
        url: 'https://wa.me/905383135720', // TODO: Replace with actual number
        color: 'bg-green-500',
      },
      {
        name: 'Instagram',
        icon: <Instagram className="h-6 w-6" />,
        url: 'https://instagram.com', // TODO: Replace with actual profile
        color: 'bg-pink-500',
      },
      {
        name: 'Facebook',
        icon: <Facebook className="h-6 w-6" />,
        url: 'https://facebook.com', // TODO: Replace with actual profile
        color: 'bg-blue-600',
      },
      {
        name: 'LinkedIn',
        icon: <Linkedin className="h-6 w-6" />,
        url: 'https://linkedin.com', // TODO: Replace with actual profile
        color: 'bg-sky-700',
      },
    ];

    const widgetVariants = {
      hidden: { scale: 0, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 20, delay: 1 } },
    };

    const menuVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };
    
    const notificationVariants = {
        initial: { opacity: 0, y: 10, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20, delay: 2 } },
        exit: { opacity: 0, y: 10, scale: 0.9, transition: { duration: 0.2 } },
    }

    function ContactWidget({ isOpen, setIsOpen }) {
      const [showNotification, setShowNotification] = useState(true);

      const toggleOpen = () => {
          setIsOpen(!isOpen);
      }

      return (
        <>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-3"
              >
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                    className={`flex items-center gap-3 p-3 rounded-full text-white shadow-lg ${link.color}`}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
              {showNotification && !isOpen && (
                <motion.div
                  variants={notificationVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute bottom-full right-0 mb-3 p-3 bg-brand-neon text-brand-dark font-bold rounded-lg shadow-lg whitespace-nowrap"
                >
                  Bize Ulaşın!
                  <div className="absolute -bottom-1 right-4 w-3 h-3 bg-brand-neon transform rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.button
              variants={widgetVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.1 }}
              onClick={toggleOpen}
              className="h-16 w-16 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-2xl glowing-btn"
              aria-label="İletişim seçeneklerini aç"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-8 w-8" /> : <Share2 className="h-8 w-8" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </>
      );
    }

    export default ContactWidget;