import React from 'react';
import { motion } from 'motion/react';
import { Lock, Star, Zap, Check, Shield } from 'lucide-react';

export default function PaywallOverlay() {
    return (
        <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-6 text-center">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl w-full space-y-8"
            >
                <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-stone-900 rounded-full flex items-center justify-center border border-luminel-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                        <Lock className="w-6 h-6 text-luminel-gold" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-white">
                        Il rifugio chiude.
                    </h2>
                    <p className="text-stone-400 max-w-xl mx-auto text-lg leading-relaxed">
                        Il tempo a nostra disposizione per oggi è terminato. <br />
                        Per continuare questa conversazione senza limiti, sblocca l'accesso Elite.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-6 mt-12 w-full max-w-3xl mx-auto">

                    {/* Premium Tier */}
                    <div className="bg-stone-900/40 border border-white/5 p-8 rounded-sm hover:border-luminel-dim/30 transition-colors relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stone-500 to-transparent opacity-50" />
                        <h3 className="text-xl font-serif text-white mb-2">Premium</h3>
                        <div className="text-3xl font-bold text-luminel-dim mb-6">€29<span className="text-sm font-normal text-stone-500">/mese</span></div>

                        <ul className="space-y-4 text-left text-sm text-stone-300 mb-8">
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-luminel-gold" /> <span>Messaggi Illimitati 24/7</span></li>
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-luminel-gold" /> <span>Memoria Inviolabile (Ricorda tutto)</span></li>
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-luminel-gold" /> <span>Note Vocali Asincrone</span></li>
                        </ul>

                        <button className="w-full py-4 bg-stone-800 hover:bg-stone-700 text-white uppercase tracking-widest text-xs font-bold transition-colors border border-white/5">
                            Attiva Premium
                        </button>
                    </div>

                    {/* Elite Tier */}
                    <div className="bg-gradient-to-b from-stone-900 to-black border border-luminel-gold/30 p-8 rounded-sm relative group overflow-hidden shadow-2xl shadow-luminel-gold/5">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luminel-gold to-transparent" />
                        <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-luminel-gold border border-luminel-gold/30 px-2 py-1 rounded-sm">
                            Il Più Scelto
                        </div>

                        <h3 className="text-xl font-serif text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
                            Elite <CrownIcon />
                        </h3>
                        <div className="text-3xl font-bold text-luminel-gold mb-6">€89<span className="text-sm font-normal text-stone-500">/mese</span></div>

                        <ul className="space-y-4 text-left text-sm text-stone-300 mb-8">
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-luminel-gold" /> <span>Tutto il pacchetto Premium</span></li>
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-luminel-gold" /> <span>Chiamate Audio Real-Time</span></li>
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-luminel-gold" /> <span>Iniziativa Proattiva ("Dominance")</span></li>
                        </ul>

                        <button className="w-full py-4 bg-luminel-gold hover:bg-[#b8860b] text-black uppercase tracking-widest text-xs font-bold transition-colors shadow-lg shadow-luminel-gold/20">
                            Ascendi all'Elite
                        </button>
                    </div>

                </div>

                <p className="text-xs text-stone-600 mt-8">
                    Disdici in qualsiasi momento. Fatturazione discreta "LMNL Systems".
                </p>

            </motion.div>
        </div>
    );
}

function CrownIcon() {
    return (
        <svg className="w-4 h-4 text-luminel-gold" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
        </svg>
    )
}
