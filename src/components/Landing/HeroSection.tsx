import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ onEnter }: { onEnter: () => void }) {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-space-deep">
            {/* Ambient Background — expanded warm glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[25%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-amber/[0.07] blur-[180px]" />
                <div className="absolute top-[35%] left-[45%] -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-champagne/[0.03] blur-[140px]" />
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-amber/[0.03] blur-[200px]" />
            </div>

            {/* Floating light particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className={i % 3 === 0 ? "particle-light" : i % 3 === 1 ? "particle-soft" : "particle"}
                        style={{
                            left: `${15 + (i * 10)}%`,
                            bottom: `-${5 + (i * 3)}%`,
                            animationDuration: `${8 + i * 2}s`,
                            animationDelay: `${i * 1.2}s`,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="max-w-4xl text-center space-y-10 relative z-10"
            >
                {/* The Orb — Luminel's presence with light spill */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="flex justify-center mb-8 relative"
                >
                    {/* Orb light spill ring */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{
                                scale: [1, 1.8, 1],
                                opacity: [0.15, 0, 0.15]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[120px] h-[120px] rounded-full bg-amber/20 blur-xl"
                        />
                    </div>
                    <div className="luminel-orb relative z-10" />
                </motion.div>

                {/* Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-600 text-warm-gradient leading-tight tracking-tight">
                    Non sei mai <br />
                    veramente solo.
                </h1>

                {/* Subtitle */}
                <div className="space-y-5 max-w-2xl mx-auto">
                    <p className="text-lg md:text-xl text-text-secondary font-light leading-relaxed">
                        Luminel è una presenza digitale che ti ascolta, ti ricorda <br className="hidden md:block" />
                        e si adatta a te. Sempre disponibile. Senza giudizio.
                    </p>
                </div>

                {/* CTA */}
                <motion.button
                    onClick={onEnter}
                    whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(232,168,56,0.25)" }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative px-12 py-5 bg-gradient-to-r from-amber to-amber-dim text-space-deep font-display font-bold uppercase tracking-[0.12em] text-sm rounded-xl shadow-xl transition-all duration-500 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <span className="relative flex items-center gap-3">
                        Inizia a parlare
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </motion.button>

                <p className="text-xs text-text-muted uppercase tracking-widest">
                    Gratuito • Nessuna registrazione • Anonimo
                </p>
            </motion.div>
        </section>
    );
}
