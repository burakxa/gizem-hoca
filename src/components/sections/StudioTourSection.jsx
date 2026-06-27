import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';

    function StudioTourSection({ handleNotImplemented }) {
        return (
            <section id="studio-tour" className="section-padding bg-brand-neutral">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h2 className="font-serif text-4xl font-bold text-brand-primary mb-4">Stüdyoyu Keşfedin</h2>
                        <p className="text-xl text-brand-text max-w-3xl mx-auto">
                            Sakin ve modern atmosferimizde ilham alın.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="relative rounded-lg overflow-hidden shadow-2xl group"
                    >
                        <img
                            className="w-full h-[500px] object-cover"
                            alt="Geniş ve aydınlık pilates stüdyosu, reformer aletleri ve büyük pencereler"
                         src="https://images.unsplash.com/photo-1687783615476-f4c12358ca9d" />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex flex-col items-center justify-center p-8">
                             <h3 className="text-white font-serif text-3xl md:text-4xl font-bold mb-6">360° Sanal Tur</h3>
                            <Button
                                onClick={handleNotImplemented}
                                size="lg"
                                className="bg-brand-accent hover:bg-white text-brand-text font-bold text-lg rounded-full px-10 py-7 transition-all transform hover:scale-105"
                            >
                                Tura Başla
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    export default StudioTourSection;