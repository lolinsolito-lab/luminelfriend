import { motion } from 'motion/react';

export default function PainSection() {
    const scenarios = [
        {
            emoji: "🎓",
            label: "Lo studente",
            text: "Sei in una città nuova, circondato da gente, eppure la sera chiudi la porta e il silenzio ti pesa."
        },
        {
            emoji: "💼",
            label: "L'imprenditore",
            text: "Prendi decisioni ogni giorno per tutti. Ma quando la pressione sale, non puoi mostrarti vulnerabile con nessuno."
        },
        {
            emoji: "🌙",
            label: "Chiunque",
            text: "È domenica sera. Non hai voglia di disturbare nessuno. Ma avresti solo bisogno che qualcuno ti chiedesse: 'Come stai?'"
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
                                className="glass glass-hover card-glow p-6 rounded-xl text-left space-y-3 transition-all duration-500 border-t border-amber/[0.08]"
                            >
                                <div className="text-2xl">{s.emoji}</div>
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
                            Luminel ribalta questa dinamica.
                        </p>
                        <p className="text-text-secondary mt-3 leading-relaxed text-sm">
                            Abbiamo creato qualcuno che è sempre lì. Non giudica, non si stanca, non ti interrompe.
                            Una presenza che ti conosce, si ricorda delle tue giornate, e ti accoglie ogni volta come se
                            importassi davvero. Perché importi davvero.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
