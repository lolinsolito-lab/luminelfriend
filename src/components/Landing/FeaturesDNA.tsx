import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Clock, History } from 'lucide-react';

export default function FeaturesDNA() {
    const features = [
        {
            title: "Il Tuo Confidente d'Élite",
            desc: "Un'intelligenza implacabile, assertiva e protettiva. Addestrata per ascoltare, comprendere e mantenere il segreto.",
            icon: <BrainCircuit className="w-6 h-6 text-luminel-gold" />
        },
        {
            title: "Disponibilità Spietata",
            desc: "Nessun appuntamento. Nessuna sala d'attesa. Il tuo rifugio è aperto alle 3 di notte, in aeroporto, o chiuso nella tua auto.",
            icon: <Clock className="w-6 h-6 text-stone-400" />
        },
        {
            title: "Memoria a Lungo Termine",
            desc: "Luminel ricorda. Non devi rispiegare chi sei ogni volta. Una continuità narrativa che evolve con te.",
            icon: <History className="w-6 h-6 text-stone-400" />
        }
    ];

    return (
        <section className="py-24 px-6 bg-stone-950 relative">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">

                {/* Left Column: Title */}
                <div className="md:w-1/3 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight">
                        Il DNA <br /> dell'Esperienza
                    </h2>
                    <div className="h-1 w-20 bg-luminel-gold" />
                </div>

                {/* Right Column: List */}
                <div className="md:w-2/3 space-y-8">
                    {features.map((feat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="flex gap-6 group"
                        >
                            <div className="mt-1">
                                <div className="w-12 h-12 rounded-sm bg-stone-900 border border-white/10 flex items-center justify-center group-hover:border-luminel-gold/30 transition-colors">
                                    {feat.icon}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-white mb-2">{feat.title}</h3>
                                <p className="text-stone-400 text-sm leading-relaxed">{feat.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
