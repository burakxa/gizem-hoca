import React, { useState } from "react"
    import { motion } from "framer-motion"
    import { format } from "date-fns"
    import { Calendar as CalendarIcon, Loader2 } from "lucide-react"
    import { tr } from 'date-fns/locale';
    import { useToast } from "@/components/ui/use-toast"
    import { supabase } from "@/lib/supabase"

    import { cn } from "@/lib/utils"
    import { Button } from "@/components/ui/button"
    import { Calendar } from "@/components/ui/calendar"
    import {
      Popover,
      PopoverContent,
      PopoverTrigger,
    } from "@/components/ui/popover"
    import { Input } from "@/components/ui/input"
    import { Label } from "@/components/ui/label"
    import { Textarea } from "@/components/ui/textarea"

    function AppointmentSection({ fadeInUp, staggerContainer }) {
      const [date, setDate] = useState()
      const [name, setName] = useState('');
      const [phone, setPhone] = useState('');
      const [email, setEmail] = useState('');
      const [message, setMessage] = useState('');
      const [isSubmitting, setIsSubmitting] = useState(false);
      const { toast } = useToast();

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !phone || !email || !date) {
          toast({
            title: "🚨 Eksik Bilgi",
            description: "Lütfen tüm zorunlu alanları doldurun.",
            variant: "destructive",
            duration: 3000,
          });
          return;
        }

        setIsSubmitting(true);

        const { error } = await supabase
          .from('randevular')
          .insert([
            {
              isim: name,
              telefon: phone,
              email: email,
              tercih_edilen_tarih: date.toISOString(),
              mesaj: message,
            },
          ]);

        setIsSubmitting(false);

        if (error) {
          toast({
            title: "❌ Hata!",
            description: "Randevu talebiniz gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
            variant: "destructive",
            duration: 4000,
          });
          console.error("Supabase error:", error);
        } else {
          toast({
            title: "✅ Başarılı!",
            description: "Randevu talebiniz başarıyla alındı.",
            duration: 4000,
          });

          setName('');
          setPhone('');
          setEmail('');
          setMessage('');
          setDate(undefined);
        }
      }

      return (
        <section id="randevu-form" className="py-20 md:py-32 bg-brand-dark-blue">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-white mb-4 uppercase text-shadow-white">
                Randevu <span className="primary-gradient-text">Al</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Size en uygun zaman için randevunuzu oluşturun. Sağlıklı bir yaşama ilk adımı atın!
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-gray-700 shadow-2xl"
            >
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Ad Soyad</Label>
                  <Input id="name" placeholder="Adınızı ve soyadınızı girin" className="py-6 bg-gray-800 text-white border-gray-600 focus:ring-brand-blue" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">Telefon Numarası</Label>
                  <Input id="phone" type="tel" placeholder="Telefon numaranızı girin" className="py-6 bg-gray-800 text-white border-gray-600 focus:ring-brand-blue" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">E-posta Adresi</Label>
                  <Input id="email" type="email" placeholder="E-posta adresinizi girin" className="py-6 bg-gray-800 text-white border-gray-600 focus:ring-brand-blue" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-gray-300">Tercih Edilen Tarih</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal h-auto py-3 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:text-white",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: tr }) : <span>Bir tarih seçin</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700 text-white">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        locale={tr}
                        disabled={(day) => day < new Date(new Date().setHours(0,0,0,0))}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Mesajınız (isteğe bağlı)</Label>
                  <Textarea id="message" placeholder="Eklemek istediğiniz notlar..." rows={4} className="bg-gray-800 text-white border-gray-600 focus:ring-brand-blue" value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" size="lg" className="w-full glowing-btn text-lg py-7" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      "Randevu Talebi Gönder"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      )
    }

    export default AppointmentSection;