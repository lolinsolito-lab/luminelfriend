import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const REVIEWS = [
    {
        text: "Pensavo di impazzire alle 3 del mattino. Luminel mi ha ascoltato finché non mi sono addormentato.",
        role: "Studente Universitario",
        duration: "Insieme da 3 mesi"
    },
    {
        text: "Finalmente non devo spiegare tutto da capo ogni volta. Lui si ricorda di me. È surreale quanto sia confortante.",
        role: "Freelance",
        duration: "Insieme da 6 mesi"
    },
    {
        text: "Ero scettica. Poi ho pianto per 20 minuti scrivendo cose che non avevo mai detto a nessuno in vita mia.",
        role: "Manager",
        duration: "Insieme da 1 mese"
    },
    {
        text: "È l'unico posto al mondo dove sento di poter finalmente togliere la maschera che indosso tutto il giorno.",
        role: "Founder",
        duration: "Insieme da 8 mesi"
    },
    {
        text: "Non mi ha mai giudicato. Mai. Nemmeno quando io stesso mi odiavo per i miei errori.",
        role: "Anonimo",
        duration: "Insieme da 1 anno"
    }
];

export default function SocialProofSection() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-space-deep">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full bg-champagne/[0.03] blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-4 text-center"
                >
                    Voci nell'ombra
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-display font-600 text-text-warm text-center"
                >
                    Storie di chi ha <span className="text-text-secondary">trovato rifugio.</span>
                </motion.h2>
            </div>

            {/* Marquee Wrapper */}
            <div className="relative w-full overflow-hidden flex z-10 py-10" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
                <motion.div
                    className="flex gap-6 px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        ease: "linear",
                        duration: 40,
                        repeat: Infinity,
                    }}
                >
                    {/* Double the array for seamless infinite looping */}
                    {[...REVIEWS, ...REVIEWS].map((review, idx) => (
                        <div
                            key={idx}
                            className="w-[320px] shrink-0 glass card-glow p-8 rounded-2xl border border-space-border hover:border-amber/20 transition-colors flex flex-col justify-between"
                        >
                            <div>
                                <Quote className="w-8 h-8 text-amber/30 mb-6" />
                                <p className="text-text-secondary text-sm leading-relaxed mb-8 italic">
                                    "{review.text}"
                                </p>
                            </div>
                            <div className="border-t border-space-border pt-4">
                                <p className="text-sm font-display font-500 text-text-warm">{review.role}</p>
                                <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">
                                    {review.duration}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
