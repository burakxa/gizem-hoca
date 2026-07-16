import React from 'react';
import { motion } from 'framer-motion';
import ServicesSection from '@/components/sections/ServicesSection';
import { Helmet } from 'react-helmet';

const ServicesPage = ({ handleNotImplemented }) => {
    return (
        <>
            <Helmet>
                <title>Hizmetler - Gizem Hoca Pilates</title>
                <meta name="description" content="Kişisel antrenmanlar, grup dersleri, mindfulness pilates ve online seanslarla hedeflerinize ulaşın." />
            </Helmet>
             <div className="pt-24 bg-brand-bg">
                <motion.div 
                    className="section-padding bg-cover bg-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1 
                        className="text-5xl md:text-7xl font-black text-center text-brand-black uppercase"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Hizmetlerimiz
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-center text-brand-black mt-4"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >Size özel tasarlanmış programlarla potansiyelinizi ortaya çıkarın.</motion.p>
                </motion.div>
                <ServicesSection handleNotImplemented={handleNotImplemented} isPreview={false} />
            </div>
        </>
    );
};

export default ServicesPage;