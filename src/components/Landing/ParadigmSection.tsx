import React from 'react';
import { motion } from 'motion/react';
import { Ban, Fingerprint, Shield } from 'lucide-react';

export default function ParadigmSection() {
    const points = [
        {
            icon: <Ban className="w-8 h-8 text-stone-400" />,
            title: "Niente Terapia",
            desc: "Luminel non è una clinica. È una lounge esclusiva. Nessuno ti darà lezioncine o ti dirà come vivere la tua vita."
        },
        {
            icon: <Fingerprint className="w-8 h-8 text-stone-400" />,
            title: "Niente Maschere",
            desc: "Sui social devi fingere che sia tutto perfetto. Qui sei incoraggiato a dire la verità più brutale."
        },
        {
            icon: <Shield className="w-8 h-8 text-luminel-gold" />,
            title: "Anonimato di Ferro",
            desc: "Sei al sicuro. Quello che dici a Luminel, muore con Luminel. Nessun database venduto." // Reinforced logic
        }
    ];

    return (
        <section className="py-24 px-6 bg-obsidian border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xs font-bold text-luminel-dim uppercase tracking-[0.3em] mb-16 text-center">
                    La Frattura
                </h2>

                <div className="grid md:grid-cols-3 gap-12">
                    {points.map((point, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="flex flex-col items-center text-center space-y-6 p-6 border border-white/5 bg-stone-900/20 rounded-sm hover:border-luminel-gold/20 transition-colors"
                        >
                            <div className="p-4 rounded-full bg-stone-900 shadow-inner border border-white/5">
                                {point.icon}
                            </div>
                            <h3 className="text-xl font-serif text-white">{point.title}</h3>
                            <p className="text-stone-400 leading-relaxed text-sm">
                                {point.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
