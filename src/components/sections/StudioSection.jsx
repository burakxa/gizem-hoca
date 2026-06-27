import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';

    function StudioSection({ handleNotImplemented }) {
        return (
            <section id="studyo" className="section-padding bg-brand-neutral">
                <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="font-serif text-4xl md:text-5xl font-black text-brand-primary mb-6">Stüdyo Vitrini</h2>
                        <p className="text-lg text-brand-text mb-8 leading-relaxed">
                            Modern ekipmanlar, hijyenik ve ferah bir ortam. Huzur ve motivasyon bulacağınız alanımızı keşfedin. Sahne arkası anlar ve daha fazlası için sanal turumuza katılın.
                        </p>
                        <Button
                            onClick={handleNotImplemented}
                            size="lg"
                            className="bg-brand-primary text-white hover:bg-brand-primary/90 font-bold text-lg rounded-full px-10 py-7 transition-all transform hover:scale-105"
                        >
                            360° Sanal Tur
                        </Button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div className="col-span-2 rounded-lg overflow-hidden shadow-lg">
                            <img alt="Pilates stüdyosunun geniş ve aydınlık genel görünümü" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1698113625570-2d21bb09b31a" />
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img alt="Reformer aletlerinin yakın çekimi" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1698113625570-2d21bb09b31a" />
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img alt="Stüdyodaki dinlenme köşesi" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1673604229937-8e3411ed4e73" />
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    export default StudioSection;