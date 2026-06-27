import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function ContactFormSection({ handleNotImplemented }) {
  return (
    <section id="contact-form" className="section-padding bg-brand-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-heading">Bir Soru Sorun</h2>
          <p className="mt-4 text-lg text-brand-text">
            Dersler veya programlar hakkında daha fazla bilgi almak için formu doldurun.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 md:p-12 rounded-lg shadow-md border border-gray-200"
        >
          <form onSubmit={(e) => {e.preventDefault(); handleNotImplemented();}} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="home-name" className="font-medium">İsim</Label>
                <Input id="home-name" placeholder="Adınız Soyadınız" required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="home-email" className="font-medium">E-posta</Label>
                <Input id="home-email" type="email" placeholder="ornek@mail.com" required className="mt-2" />
              </div>
            </div>
            <div>
              <Label htmlFor="home-message" className="font-medium">Mesajınız</Label>
              <Textarea id="home-message" placeholder="Mesajınızı buraya yazın..." required rows={5} className="mt-2" />
            </div>
            <div>
              <Button type="submit" size="lg" className="w-full bg-brand-primary text-brand-heading hover:bg-brand-primary/80 font-bold text-lg rounded-full py-6 transition-all duration-300">
                Mesajı Gönder
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactFormSection;