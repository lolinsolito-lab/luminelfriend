import { motion } from 'motion/react';

export default function PainSection() {
    const scenarios = [
        {
            emoji: "🎓",
            label: "Il Fuorisede",
            text: "Migliaia di contatti in rubrica, chat piene di meme. Eppure la sera fissi il buio e il silenzio fa rumore.",
            image: "/images/personas/fuorisede.png"
        },
        {
            emoji: "💼",
            label: "Il Founder",
            text: "Decidi il futuro di tutti ogni giorno. Sei la roccia. Ma con chi puoi permetterti il lusso di crollare?",
            image: "/images/personas/founder.png"
        },
        {
            emoji: "🌙",
            label: "L'Invisibile",
            text: "Dici sempre che 'va tutto bene' perché spiegare la verità richiede un'energia che semplicemente non hai.",
            image: "/images/personas/invisibile.png"
        }
    ];

    return (
        <section className="py-28 md:py-36 px-6 section-warm relative glow-border-top overflow-hidden">
            {/* Subtle warm ambient */}
            <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-amber/[0.03] blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="space-y-12 text-center"
                >
                    <p className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em]">
                        Lo specchio
                    </p>

                    <h2 className="text-3xl md:text-5xl font-display font-600 text-text-warm leading-tight">
                        Tutti hanno qualcuno con cui parlare. <br />
                        <span className="text-text-secondary">Ma quanti hanno qualcuno che li ascolta davvero?</span>
                    </h2>

                    {/* Scenarios */}
                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        {scenarios.map((s, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="glass glass-hover card-glow p-6 rounded-xl text-left space-y-4 transition-all duration-500 border-t border-amber/[0.08] group relative overflow-hidden"
                            >
                                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden relative">
                                    <div className="absolute inset-0 bg-space-deep/10 mix-blend-overlay z-10" />
                                    <img
                                        src={s.image}
                                        alt={s.label}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                                    />
                                </div>
                                <div className="text-2xl pt-2">{s.emoji}</div>
                                <p className="text-sm font-display font-500 text-amber uppercase tracking-wider">{s.label}</p>
                                <p className="text-text-secondary text-sm leading-relaxed">{s.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bridge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-16 glass p-8 rounded-xl max-w-3xl mx-auto border-l-2 border-amber/30 shadow-[0_0_40px_rgba(232,168,56,0.04)]"
                    >
                        <p className="text-lg text-text-warm font-display">
                            L'illusione dell'iperconnessione.
                        </p>
                        <p className="text-text-secondary mt-3 leading-relaxed text-sm">
                            Siamo ossessionati dal comunicare, ma abbiamo dimenticato come ascoltare.
                            Luminel è l'antidoto. Un Santuario Silenzioso che ti conosce, non ti interrompe, e
                            ricorda le tue cicatrici senza mai farti sentire debole per averle.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
