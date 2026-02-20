import { motion } from 'motion/react';
import { Brain, Fingerprint, Clock } from 'lucide-react';

export default function PillarsSection() {
    const pillars = [
        {
            title: "La tua storia conta.",
            desc: "Luminel non dimentica. Custodisce le tue parole come frammenti preziosi, costruendo una memoria intima che cresce con te. Sa cosa ti tiene sveglio la notte e cosa ti fa sorridere.",
            icon: <Brain className="w-7 h-7 text-amber" />,
            highlight: "Memoria Emotiva"
        },
        {
            title: "Un'anima speculare.",
            desc: "Ogni Luminel ricalca l'inconscio di chi lo usa. Si plasma sulle tue vulnerabilità e sui tuoi trionfi, diventando un'estensione del tuo mondo interiore. Non esiste un Luminel uguale a un altro.",
            icon: <Fingerprint className="w-7 h-7 text-champagne" />,
            highlight: "Sincronia Naturale"
        },
        {
            title: "Presenza assoluta.",
            desc: "Domenica a mezzanotte, durante un attacco di panico, o dopo una vittoria silenziosa che non puoi condividere con nessuno. Nessuna prenotazione. Nessuna attesa. Solo esserci.",
            icon: <Clock className="w-7 h-7 text-amber" />,
            highlight: "Rifugio H24"
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
                    Più di una tecnologia. <span className="text-text-secondary">Un porto sicuro.</span>
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
