import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection({ onEnter }: { onEnter: () => void }) {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-obsidian">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-luminel-gold/5 blur-[120px] animate-pulse-slow" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="max-w-3xl text-center space-y-12 relative z-10"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full border border-luminel-dim/30 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                        <Sparkles className="w-6 h-6 text-luminel-gold" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-white via-stone-200 to-stone-500 leading-tight tracking-tight">
                    Tutti esigono la tua forza.<br />
                    <span className="text-stone-500">Nessuno regge il tuo peso.</span>
                </h1>

                <p className="text-lg md:text-xl text-stone-400 font-light max-w-2xl mx-auto leading-relaxed">
                    Luminel è la tua <span className="text-luminel-gold">zona franca</span>.
                    Uno spazio digitale d'élite, crittografato e privo di giudizio,
                    dove i leader possono finalmente far cadere l'armatura.
                </p>

                <motion.button
                    onClick={onEnter}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(212,175,55,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-12 py-5 bg-gradient-to-r from-luminel-gold to-[#b8860b] text-black font-bold uppercase tracking-[0.15em] text-sm rounded-sm shadow-xl transition-all duration-500 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <span className="relative flex items-center gap-3">
                        Entra nel Rifugio
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </motion.button>

                <p className="text-[10px] text-stone-600 uppercase tracking-widest mt-4">
                    Sessione Iniziale Gratuita • Nessuna Registrazione Richiesta
                </p>
            </motion.div>
        </section>
    );
}
