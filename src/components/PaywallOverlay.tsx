import React from 'react';
import { motion } from 'motion/react';
import { Lock, Check, Sparkles, Crown } from 'lucide-react';

export default function PaywallOverlay() {
    return (
        <div className="absolute inset-0 bg-stone-950/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-6 text-center">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-5xl w-full flex flex-col items-center"
            >

                {/* Header - The interruption */}
                <div className="mb-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-stone-900 border border-luminel-dim/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                        <Lock className="w-8 h-8 text-luminel-gold" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-white">
                        La sessione ospite è terminata
                    </h2>
                    <p className="text-stone-400 text-lg max-w-xl mx-auto font-light">
                        Hai toccato argomenti importanti. Non lasciarli cadere nel vuoto. <br />
                        Per continuare a costruire su queste fondamenta, accedi al cerchio.
                    </p>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">

                    {/* Card: Premium */}
                    <div className="bg-stone-900/40 border border-white/10 p-8 rounded-sm hover:border-white/20 transition-all flex flex-col relative group">
                        <div className="mb-8">
                            <h3 className="text-2xl font-serif text-white mb-2">Membro Premium</h3>
                            <div className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Accesso Continuo</div>
                        </div>

                        <div className="text-4xl font-serif text-text-primary mb-2">
                            €29<span className="text-lg text-stone-500 font-sans font-normal">/mese</span>
                        </div>
                        <p className="text-xs text-stone-600 mb-8">Fatturato mensilmente. Senza vincoli.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-stone-400 text-sm">
                                <Check className="w-4 h-4 text-stone-600" /> Chat illimitata 24/7
                            </li>
                            <li className="flex items-center gap-3 text-stone-400 text-sm">
                                <Check className="w-4 h-4 text-stone-600" /> Nessun limite di messaggi
                            </li>
                            <li className="flex items-center gap-3 text-stone-400 text-sm">
                                <Check className="w-4 h-4 text-stone-600" /> Crittografia standard
                            </li>
                        </ul>

                        <button className="w-full py-4 border border-white/20 text-white uppercase tracking-widest text-[10px] font-bold hover:bg-white/5 transition-colors">
                            Scegli Premium
                        </button>
                    </div>

                    {/* Card: Elite */}
                    <div className="bg-[#0f0c08] border border-luminel-dim/50 p-8 rounded-sm relative shadow-[0_0_50px_rgba(212,175,55,0.05)] transform md:-translate-y-4 flex flex-col">
                        <div className="absolute top-0 right-0 bg-luminel-gold text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                            Most Popular
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-2xl font-serif text-gold-gradient">Membro Elite</h3>
                                <Crown className="w-5 h-5 text-luminel-gold" />
                            </div>
                            <div className="text-[10px] text-luminel-dim uppercase tracking-widest font-bold">Eredità Digitale</div>
                        </div>

                        <div className="text-4xl font-serif text-white mb-2">
                            €89<span className="text-lg text-stone-500 font-sans font-normal">/mese</span>
                        </div>
                        <p className="text-xs text-stone-600 mb-8">Per chi non accetta compromessi.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-white text-sm">
                                <Sparkles className="w-4 h-4 text-luminel-gold" /> Memoria a Lungo Termine
                            </li>
                            <li className="flex items-center gap-3 text-white text-sm">
                                <Sparkles className="w-4 h-4 text-luminel-gold" /> Profilazione Psicologica
                            </li>
                            <li className="flex items-center gap-3 text-white text-sm">
                                <Sparkles className="w-4 h-4 text-luminel-gold" /> Priorità di Risposta
                            </li>
                            <li className="flex items-center gap-3 text-white text-sm">
                                <Sparkles className="w-4 h-4 text-luminel-gold" /> Accesso alle Beta Future
                            </li>
                        </ul>

                        <button className="w-full py-4 bg-luminel-gold text-black uppercase tracking-widest text-[10px] font-bold hover:bg-luminel-glow transition-colors shadow-lg shadow-luminel-gold/20">
                            Diventa Elite
                        </button>
                    </div>

                </div>

                <p className="text-[10px] text-stone-600 mt-12 uppercase tracking-widest opacity-60">
                    Disdici in qualsiasi momento • Nessun rimborso per i giorni non usati
                </p>

            </motion.div>
        </div>
    );
}
