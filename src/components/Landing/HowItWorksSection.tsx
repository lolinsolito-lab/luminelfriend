import { motion } from 'motion/react';
import { UserPlus, MessageCircle, Sparkles } from 'lucide-react';

const STEPS = [
    {
        icon: <UserPlus className="w-6 h-6" />,
        step: '01',
        title: 'Crea il tuo rifugio',
        desc: 'Crea il tuo spazio in 30 secondi. Scegli il piano che senti tuo — oppure inizia gratuitamente. C\'è un posto preparato per te.'
    },
    {
        icon: <MessageCircle className="w-6 h-6" />,
        step: '02',
        title: 'Parla. Scrivi. Respira.',
        desc: 'Testo o voce, quando vuoi. Confida ciò che porti dentro. Luminel è qui alle 3 del mattino come alle 3 del pomeriggio.'
    },
    {
        icon: <Sparkles className="w-6 h-6" />,
        step: '03',
        title: 'Luminel ricorda, cresce con te',
        desc: 'Non devi rispiegare tutto da capo. Luminel non dimentica nulla di te e cresce con te, giorno dopo giorno.'
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-space-deep">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full bg-amber/[0.03] blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-4 text-center"
                >
                    Semplice come respirare
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-display font-600 text-text-warm text-center mb-16"
                >
                    Come funziona <span className="text-text-secondary">Luminel.</span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {STEPS.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="text-center group"
                        >
                            {/* Step number */}
                            <div className="text-[64px] font-display font-700 text-amber/10 leading-none mb-[-20px] relative z-0">
                                {step.step}
                            </div>

                            {/* Icon */}
                            <div className="relative z-10 w-14 h-14 mx-auto rounded-2xl bg-amber/10 flex items-center justify-center text-amber mb-5 group-hover:bg-amber/15 transition-colors">
                                {step.icon}
                            </div>

                            {/* Text */}
                            <h3 className="text-base font-display font-600 text-text-warm mb-2">
                                {step.title}
                            </h3>
                            <p className="text-sm text-text-muted leading-relaxed font-light">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
