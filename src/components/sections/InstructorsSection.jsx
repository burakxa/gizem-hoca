import React from 'react';
import { motion } from 'framer-motion';

function InstructorsSection({ fadeInUp, staggerContainer }) {
  const instructors = [
    {
      name: "Zeynep Aksoy",
      specialty: "Reformer Pilates Uzmanı",
      bio: "10 yılı aşkın tecrübesiyle Zeynep, her seviyeden öğrenciye rehberlik ediyor. Bireysel ihtiyaçlara özel programlar tasarlar.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734b584"
    },
    {
      name: "Emre Can",
      specialty: "Mat Pilates ve Fonksiyonel Antrenör",
      bio: "Enerjisi ve motivasyonuyla bilinen Emre, derslerini dinamik ve eğlenceli hale getirir. Güç ve esneklik odaklı çalışır.",
      image: "https://images.unsplash.com/photo-1567784193417-9757e403126d"
    },
    {
      name: "Deniz Yılmaz",
      specialty: "Hamile Pilatesi ve Postür Uzmanı",
      bio: "Deniz, özellikle hamilelik ve doğum sonrası pilates konusunda uzmandır. Duruş bozukluklarının düzeltilmesine yardımcı olur.",
      image: "https://images.unsplash.com/photo-1594381837508-821310011271"
    }
  ];

  return (
    <section id="egitmenler" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-6">
            Uzman <span className="gradient-text">Eğitmenlerimiz</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sertifikalı ve deneyimli eğitmen kadromuzla tanışın.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {instructors.map((instructor, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-emerald-100"
              />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{instructor.name}</h3>
              <p className="text-emerald-600 font-medium mb-3">{instructor.specialty}</p>
              <p className="text-gray-600">{instructor.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default InstructorsSection;