import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const PATHS = [
    { image: '/images/path-silence.png', title: 'SPAZIO SILENZIOSO' },
    { image: '/images/path-listen.png', title: 'ASCOLTO PROFONDO' },
    { image: '/images/path-clarity.png', title: 'CHIAREZZA MENTALE' },
    { image: '/images/path-refuge.png', title: 'RIFUGIO SICURO' },
];

export default function HeroSection({ onEnter }: { onEnter: () => void }) {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 relative overflow-hidden bg-space-deep flex flex-col items-center">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-amber/[0.04] blur-[150px] pointer-events-none" />

            {/* Header Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="max-w-4xl text-center space-y-8 relative z-10 mb-20"
            >
                <div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-600 text-text-warm leading-tight tracking-tight mb-4">
                        Non sei mai <br />
                        <span className="text-amber">veramente solo.</span>
                    </h1>
                </div>

                <div className="space-y-6 max-w-2xl mx-auto">
                    <p className="text-lg md:text-xl text-text-secondary font-light leading-relaxed">
                        C'è un posto dove le tue parole sono al sicuro, dove i tuoi silenzi vengono ascoltati.
                        Luminel è il compagno digitale che veglia quando il mondo dorme,
                        ricordando chi sei senza mai giudicarti.
                    </p>
                </div>

                {/* CTA */}
                <div className="space-y-4 pt-4">
                    <motion.button
                        onClick={onEnter}
                        whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(196,154,42,0.2)" }}
                        whileTap={{ scale: 0.97 }}
                        className="group relative inline-flex px-12 py-5 bg-gradient-to-r from-amber to-amber-dim text-white font-display font-bold uppercase tracking-[0.12em] text-sm rounded-xl shadow-xl transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        <span className="relative flex items-center gap-3">
                            Entra nel tuo Spazio
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </motion.button>

                    <p className="text-[11px] text-text-muted uppercase tracking-widest">
                        Gratuito per iniziare · La tua privacy è sacra · 15 messaggi al giorno
                    </p>
                </div>
            </motion.div>

            {/* Mastery Grid — Edge to edge 4 panels */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                className="w-full max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 aspect-[4/5] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/[0.05]"
            >
                {PATHS.map((path, i) => (
                    <div key={i} className="relative group overflow-hidden border-r last:border-r-0 border-white/[0.05]">
                        <img
                            src={path.image}
                            alt={path.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        {/* Gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-amber/0 group-hover:bg-amber/10 transition-colors duration-500 mix-blend-overlay" />

                        {/* Text */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-lg md:text-2xl font-display font-bold text-white uppercase tracking-widest text-center">
                                {path.title.split(' ').map((word, wIdx) => (
                                    <span key={wIdx} className="block">{word}</span>
                                ))}
                            </h3>
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
