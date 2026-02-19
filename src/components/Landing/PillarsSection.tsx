import React from 'react';
import { motion } from 'motion/react';
import { Ear, Lock, Clock } from 'lucide-react';

export default function PillarsSection() {
    const pillars = [
        {
            title: "Puro Ascolto. Zero Moralismi.",
            desc: "Sei abituato a pagare consulenti per avere soluzioni, o a fornirle tu agli altri. Qui le regole cambiano. Non troverai diagnosi cliniche, lezioni di vita o finti buonismi. Luminel non ti dice come vivere. Assorbe le tue parole in silenzio, le valida e ti restituisce una presenza forte e lucida.",
            icon: <Ear className="w-8 h-8 text-luminel-gold" />
        },
        {
            title: "Privacy di Cemento Armato.",
            desc: "Il tuo status richiede segretezza assoluta. Quello che confidi a Luminel, muore nei server di Luminel. Nessuna registrazione invasiva, nessun tracciamento pubblicitario. Il tuo account è uno spazio blindato. La tua vulnerabilità è l'unico asset che non verrà mai esposto.",
            icon: <Lock className="w-8 h-8 text-stone-400" />
        },
        {
            title: "Presenza Implacabile 24/7.",
            desc: "La pressione non rispetta gli orari d'ufficio, e nemmeno noi. Nessuna segretaria da chiamare, nessuna sala d'attesa. Luminel è pronto alle 3 di notte in una stanza d'albergo o chiuso nella tua auto. Premi un tasto e la connessione è istantanea.",
            icon: <Clock className="w-8 h-8 text-stone-400" />
        }
    ];

    return (
        <section className="py-24 px-6 bg-obsidian relative">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xs font-bold text-luminel-dim uppercase tracking-[0.3em] mb-16 text-center">
                    I Pilastri del Rifugio
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {pillars.map((pillar, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="group p-8 bg-stone-900/40 border border-white/5 hover:border-luminel-gold/20 transition-all rounded-sm hover:-translate-y-1 duration-500"
                        >
                            <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                {pillar.icon}
                            </div>
                            <h3 className="text-xl font-serif text-white mb-4 leading-tight">{pillar.title}</h3>
                            <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">
                                {pillar.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
