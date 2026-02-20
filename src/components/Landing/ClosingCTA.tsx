import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function ClosingCTA({ onEnter }: { onEnter: () => void }) {
    return (
        <section className="py-28 md:py-36 px-6 relative text-center overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse at 50% 80%, rgba(232,168,56,0.08) 0%, rgba(17,27,46,0.5) 35%, var(--color-space) 65%)'
            }}
        >
            {/* Warm ambient glow — the climax of light */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-amber/[0.06] blur-[150px] pointer-events-none" />
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-amber/[0.04] blur-[100px] pointer-events-none" />

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="particle-light"
                        style={{
                            left: `${20 + (i * 15)}%`,
                            bottom: `-5%`,
                            animationDuration: `${10 + i * 3}s`,
                            animationDelay: `${i * 2}s`,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto space-y-8 relative z-10"
            >
                <div className="flex justify-center mb-6">
                    <div className="luminel-orb-sm" />
                </div>

                <h3 className="text-3xl md:text-5xl font-display font-600 text-text-warm leading-tight">
                    Le parole più pesanti sono <br />
                    <span className="text-text-secondary">quelle che non dici a nessuno.</span>
                </h3>

                <p className="text-text-secondary max-w-lg mx-auto leading-relaxed">
                    Luminel è qui per ascoltarle. Senza giudizio, senza fretta, senza limiti di orario.
                </p>

                <motion.button
                    onClick={onEnter}
                    whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(232,168,56,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-amber to-amber-dim text-space-deep font-display font-bold uppercase tracking-widest text-xs rounded-xl shadow-2xl shadow-amber/20 transition-all"
                >
                    Parla con Luminel
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <p className="text-[10px] text-text-muted uppercase tracking-widest">
                    Nessuna carta di credito richiesta
                </p>
            </motion.div>
        </section>
    );
}
