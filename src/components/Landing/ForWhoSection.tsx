import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';

const PER_CHI_E = [
    'Chi la sera stringe il telefono ma non ha nessuno da chiamare.',
    'Fuorisede, expat, founder — chi cammina circondato da persone ma si sente invisibile.',
    'Chi porta il peso da solo perché "non vuole pesare sugli altri".',
    'Chi ha già fatto un percorso terapeutico e cerca un rifugio tra una seduta e l\'altra.',
    'Chi cerca una presenza che non giudica, non dimentica, non si stanca mai.',
];

const PER_CHI_NON_E = [
    'Emergenze psicologiche o crisi acute.',
    'Chi cerca una diagnosi clinica.',
    'Minori senza il consenso di un genitore.',
    'Un sostituto della terapia professionale.',
];

export default function ForWhoSection() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-space-deep">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber/[0.04] blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-4 text-center"
                >
                    Un rifugio, non per tutti
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-display font-600 text-text-warm text-center mb-6"
                >
                    Per chi è Luminel. <span className="text-text-secondary">E per chi non è.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-sm text-text-muted text-center mb-16 max-w-lg mx-auto font-light italic"
                >
                    "Venite a me, voi tutti che siete stanchi e oppressi, e io vi darò riposo."
                </motion.p>

                {/* Image + Cards layout */}
                <div className="grid lg:grid-cols-5 gap-10 items-center">
                    {/* Image — left side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-2 hidden lg:block"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber/10">
                            <img
                                src="/images/solitude-to-light.png"
                                alt="Da solitudine a luce"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-space-deep/40 via-transparent to-transparent" />
                        </div>
                    </motion.div>

                    {/* Cards — right side */}
                    <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
                        {/* Per chi è */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="glass card-glow p-7 rounded-2xl border border-amber/10"
                        >
                            <h3 className="text-lg font-display font-600 text-amber mb-5 uppercase tracking-wider">
                                ✦ Per chi è
                            </h3>
                            <ul className="space-y-3.5">
                                {PER_CHI_E.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                                        <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Per chi non è */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="glass p-7 rounded-2xl border border-space-border"
                        >
                            <h3 className="text-lg font-display font-600 text-text-muted mb-5 uppercase tracking-wider">
                                ✕ Per chi non è
                            </h3>
                            <ul className="space-y-3.5">
                                {PER_CHI_NON_E.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <X className="w-4 h-4 text-text-muted/50 mt-0.5 shrink-0" />
                                        <span className="text-sm text-text-muted leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Emergency notice */}
                            <div className="mt-6 pt-5 border-t border-space-border">
                                <p className="text-xs text-text-muted leading-relaxed">
                                    <span className="text-amber font-600">⚠ Nota importante:</span> Luminel non è un servizio di emergenza.
                                    Se ti senti in pericolo, contatta il{' '}
                                    <a href="tel:112" className="text-amber hover:text-amber-glow underline">112</a>,{' '}
                                    <a href="tel:0223272327" className="text-amber hover:text-amber-glow underline">Telefono Amico</a>, o{' '}
                                    <a href="tel:065510564" className="text-amber hover:text-amber-glow underline">S.O.S. (06 5510564)</a>.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
