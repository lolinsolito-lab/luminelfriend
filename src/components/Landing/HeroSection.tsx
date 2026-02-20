import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ onEnter }: { onEnter: () => void }) {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-space-deep">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber/5 blur-[150px]" />
                <div className="absolute top-[40%] left-[45%] -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-cyan/5 blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="max-w-4xl text-center space-y-10 relative z-10"
            >
                {/* The Orb — Luminel's presence */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="flex justify-center mb-8"
                >
                    <div className="luminel-orb" />
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
