import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ onEnter }: { onEnter: () => void }) {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-space-deep">
            {/* Angelic Cloud Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[15%] left-[30%] w-[600px] h-[400px] rounded-full bg-amber/[0.06] blur-[150px]" />
                <div className="absolute top-[40%] right-[20%] w-[500px] h-[500px] rounded-full bg-champagne/[0.08] blur-[160px]" />
                <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[1000px] h-[400px] rounded-full bg-amber/[0.04] blur-[200px]" />
                {/* Cloud wisps */}
                <div className="absolute top-[20%] left-[10%] w-[300px] h-[100px] rounded-full bg-white/60 blur-[80px]" />
                <div className="absolute top-[30%] right-[15%] w-[250px] h-[80px] rounded-full bg-white/50 blur-[70px]" />
                <div className="absolute bottom-[25%] left-[20%] w-[350px] h-[120px] rounded-full bg-white/40 blur-[90px]" />
            </div>

            {/* Gold dust particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className={i % 3 === 0 ? "particle-light" : i % 3 === 1 ? "particle-soft" : "particle"}
                        style={{
                            left: `${10 + (i * 8)}%`,
                            bottom: `-${5 + (i * 2)}%`,
                            animationDuration: `${8 + i * 2}s`,
                            animationDelay: `${i * 1}s`,
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
                {/* The Orb — Luminel revealed from clouds */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="flex justify-center mb-8 relative"
                >
                    {/* Orb radiance ring */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{
                                scale: [1, 2, 1],
                                opacity: [0.2, 0, 0.2]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[120px] h-[120px] rounded-full bg-amber/15 blur-xl"
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
                    whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(196,154,42,0.2)" }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative px-12 py-5 bg-gradient-to-r from-amber to-amber-dim text-white font-display font-bold uppercase tracking-[0.12em] text-sm rounded-xl shadow-xl transition-all duration-500 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
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
