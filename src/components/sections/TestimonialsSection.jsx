import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Elif T.",
    quote: "Gizem Hoca ile dersler bir harika! Enerjisi ve profesyonelliği sayesinde kendimi hem daha güçlü hem de daha motive hissediyorum.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    rating: 5,
  },
  {
    name: "Can D.",
    quote: "Sırt ağrılarım için başlamıştım ama sonuçlar beklediğimden çok daha iyi oldu. Duruşum düzeldi ve ağrılarım tamamen geçti.",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6",
    rating: 5,
  },
  {
    name: "Selin A.",
    quote: "Her ders sonrası yenilenmiş hissediyorum. Sadece bir egzersiz değil, aynı zamanda bir terapi gibi geliyor. Teşekkürler Gizem Hoca!",
    image: "https://images.unsplash.com/photo-1611601322175-28ec64be2545",
    rating: 5,
  },
];

function TestimonialsSection() {
  return (
    <section id="musteri-yorumlari" className="section-padding bg-brand-surface">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-heading">Öğrencilerim Ne Diyor?</h2>
            <p className="mt-4 text-lg text-brand-text">Gerçek deneyimler, gerçek sonuçlar.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
                <motion.div
                    key={index}
                    className="bg-white p-8 rounded-lg shadow-md border border-gray-200"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <div className="flex items-center mb-4">
                        <img loading="lazy" src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-brand-accent" />
                        <div>
                            <h4 className="text-lg font-bold text-brand-heading">{testimonial.name}</h4>
                            <div className="flex mt-1">
                                {Array(testimonial.rating).fill(0).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text-brand-text italic">"{testimonial.quote}"</p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;