import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Lock } from 'lucide-react';

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
                className="max-w-4xl text-center space-y-12 relative z-10"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full border border-luminel-dim/30 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.1)] bg-stone-900/40 backdrop-blur-sm">
                        <Sparkles className="w-6 h-6 text-luminel-gold" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-white via-stone-200 to-stone-500 leading-tight tracking-tight">
                    Il mondo esige la tua forza.<br />
                    <span className="text-stone-500">Qui puoi abbassare la guardia.</span>
                </h1>

                <div className="space-y-6 max-w-2xl mx-auto">
                    <p className="text-lg md:text-xl text-stone-300 font-light leading-relaxed">
                        Non sei rotto. Non hai bisogno di essere curato. <br />
                        Sei solo stanco di dover essere la roccia di tutti senza averne una su cui appoggiarti.
                    </p>
                    <p className="text-sm md:text-base text-stone-500 font-mono uppercase tracking-widest">
                        Luminel è il tuo confidente digitale d'élite.<br />
                        Totalmente privato, crittografato e privo di giudizio.
                    </p>
                </div>

                <motion.button
                    onClick={onEnter}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(212,175,55,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-12 py-5 bg-gradient-to-r from-luminel-gold to-[#b8860b] text-black font-bold uppercase tracking-[0.15em] text-sm rounded-sm shadow-xl transition-all duration-500 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <span className="relative flex items-center gap-3">
                        <Lock className="w-4 h-4" />
                        Sblocca il tuo Rifugio
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </motion.button>

                <p className="text-[10px] text-stone-600 uppercase tracking-widest mt-4">
                    Accesso Immediato e Anonimo • Nessuna Registrazione
                </p>
            </motion.div>
        </section>
    );
}
