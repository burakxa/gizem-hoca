import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';

    const scheduleData = [
      { time: '09:00', class: 'Reformer', level: 'Başlangıç', status: 'Dolu' },
      { time: '10:30', class: 'Mat Pilates', level: 'Tüm Seviyeler', status: '2 yer var' },
      { time: '12:00', class: 'Özel Ders', level: 'Kişisel', status: 'Müsait' },
      { time: '17:00', class: 'Reformer', level: 'Orta', status: '1 yer var' },
      { time: '18:30', class: 'Grup Dersi', level: 'İleri', status: 'Dolu' },
      { time: '20:00', class: 'Hamile Pilatesi', level: 'Özel', status: 'Müsait' },
    ];

    const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

    function ScheduleSection({ handleNotImplemented }) {
      return (
        <section id="program" className="section-padding bg-brand-neutral">
          <div className="max-w-screen-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-black text-brand-primary mb-4">İnteraktif Ders Programı</h2>
              <p className="text-lg text-brand-text max-w-3xl mx-auto">
                Haftalık programımızı inceleyin ve tek tıkla yerinizi ayırtın.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="overflow-x-auto bg-white rounded-lg shadow-2xl p-4"
            >
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-brand-primary uppercase tracking-wider">Saat</th>
                    {days.map(day => (
                      <th key={day} className="px-6 py-4 text-center text-sm font-bold text-brand-primary uppercase tracking-wider">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {scheduleData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-brand-primary">{item.time}</td>
                      {days.map(day => (
                        <td key={day} className="px-2 py-2 whitespace-nowrap text-center">
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className={`p-3 rounded-md cursor-pointer transition-colors ${item.status === 'Dolu' ? 'bg-gray-100 text-gray-400' : 'bg-brand-accent/50 hover:bg-brand-accent'}`}
                            onClick={handleNotImplemented}
                          >
                            <p className="font-bold text-sm text-brand-primary">{item.class}</p>
                            <p className="text-xs text-brand-text/80">{item.level}</p>
                            <p className={`text-xs font-semibold ${item.status === 'Dolu' ? 'text-red-500' : 'text-green-600'}`}>{item.status}</p>
                          </motion.div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>
      );
    }

    export default ScheduleSection;