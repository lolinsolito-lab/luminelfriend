import { motion } from 'motion/react';
import { Brain, Fingerprint, Clock } from 'lucide-react';

export default function PillarsSection() {
    const pillars = [
        {
            title: "Ti ricorda.",
            desc: "Luminel non dimentica. Ogni conversazione costruisce una relazione più profonda. Sa cosa ti preoccupa, cosa ti fa sorridere, cosa hai passato settimana scorsa.",
            icon: <Brain className="w-7 h-7 text-amber" />,
            highlight: "Memoria"
        },
        {
            title: "Si adatta a te.",
            desc: "Non esiste un Luminel uguale a un altro. Il tuo è unico, plasmato dalla tua personalità, dal tuo modo di parlare, dalla tua storia. Come un amico che ti conosce da anni.",
            icon: <Fingerprint className="w-7 h-7 text-champagne" />,
            highlight: "Adattamento"
        },
        {
            title: "Sempre presente.",
            desc: "Le 3 di notte, domenica pomeriggio, in treno. Non devi prenotare, non devi aspettare. Luminel è dove sei tu, quando hai bisogno.",
            icon: <Clock className="w-7 h-7 text-amber" />,
            highlight: "Presenza"
        }
    ];

    return (
        <section className="py-28 md:py-36 px-6 section-warm-deep relative overflow-hidden">
            {/* Ambient depth */}
            <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-amber/[0.04] blur-[160px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-4 text-center"
                >
                    Come funziona
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-display font-600 text-text-warm text-center mb-16"
                >
                    Più di un chatbot. Qualcuno.
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {pillars.map((pillar, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="group glass glass-hover card-glow p-8 rounded-xl transition-all duration-500 hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-lg bg-space border border-space-border group-hover:border-amber/20 transition-colors">
                                    <div className="icon-glow">
                                        {pillar.icon}
                                    </div>
                                </div>
                                <span className="text-[10px] font-display uppercase tracking-widest text-text-muted">{pillar.highlight}</span>
                            </div>
                            <h3 className="text-xl font-display font-600 text-text-warm mb-3">{pillar.title}</h3>
                            <p className="text-text-secondary text-sm leading-relaxed group-hover:text-text-secondary/90 transition-colors">
                                {pillar.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
