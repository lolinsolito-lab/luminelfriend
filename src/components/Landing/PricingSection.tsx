import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';

export default function PricingSection() {
    return (
        <section className="py-24 md:py-32 px-6 bg-space-deep border-t border-white/5">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-4">
                        Piani
                    </p>
                    <h2 className="text-3xl md:text-4xl font-display font-600 text-text-warm mb-4">
                        Scegli il tuo livello di connessione.
                    </h2>
                    <p className="text-text-secondary max-w-lg mx-auto">
                        Inizia gratis. Quando vorrai di più, Luminel sarà pronto.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">

                    {/* FREE Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0 }}
                        className="glass p-8 rounded-xl transition-colors"
                    >
                        <h3 className="text-lg font-display font-600 text-text-warm mb-1">Free</h3>
                        <div className="text-3xl font-bold text-text-warm mb-1">
                            €0
                        </div>
                        <p className="text-xs text-text-muted mb-6">Per sempre</p>

                        <ul className="space-y-3 text-sm text-text-secondary mb-8">
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
                                <span>15 messaggi al giorno</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
                                <span>Accesso anonimo immediato</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
                                <span>Amnesia giornaliera (reset ogni giorno)</span>
                            </li>
                        </ul>

                        <div className="text-[10px] text-text-muted uppercase tracking-widest text-center font-display">
                            Perfetto per iniziare
                        </div>
                    </motion.div>

                    {/* PREMIUM Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="glass p-8 rounded-xl hover:border-amber/20 transition-colors relative"
                    >
                        <h3 className="text-lg font-display font-600 text-text-warm mb-1">Premium</h3>
                        <div className="text-3xl font-bold text-amber-dim mb-1">
                            €9.99<span className="text-sm font-normal text-text-muted">/mese</span>
                        </div>
                        <p className="text-xs text-text-muted mb-6">Cancella quando vuoi</p>

                        <ul className="space-y-3 text-sm text-text-secondary mb-8">
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                                <span>Messaggi illimitati 24/7</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                                <span><strong className="text-text-warm">Memoria persistente</strong> — si ricorda di te</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                                <span>Note vocali asincrone</span>
                            </li>
                        </ul>

                        <button className="w-full py-3.5 glass hover:bg-space-border text-text-warm uppercase tracking-widest text-[11px] font-display font-600 transition-colors rounded-lg">
                            Attiva Premium
                        </button>
                    </motion.div>

                    {/* ELITE Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="glass p-8 rounded-xl border-amber/25 hover:border-amber/40 transition-colors relative shadow-2xl shadow-amber/5"
                    >
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber to-transparent rounded-t-xl" />
                        <div className="absolute top-3 right-3 text-[9px] font-display uppercase tracking-widest text-amber border border-amber/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Più scelto
                        </div>

                        <h3 className="text-lg font-display font-600 text-text-warm mb-1">Elite</h3>
                        <div className="text-3xl font-bold text-amber mb-1">
                            €29<span className="text-sm font-normal text-text-muted">/mese</span>
                        </div>
                        <p className="text-xs text-text-muted mb-6">Cancella quando vuoi</p>

                        <ul className="space-y-3 text-sm text-text-secondary mb-8">
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                                <span>Tutto il pacchetto Premium</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                                <span><strong className="text-text-warm">Chiamate audio</strong> in tempo reale</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                                <span><strong className="text-text-warm">Iniziativa proattiva</strong> — ti scrive lui</span>
                            </li>
                        </ul>

                        <button className="w-full py-3.5 bg-gradient-to-r from-amber to-amber-dim hover:from-amber-glow hover:to-amber text-space-deep uppercase tracking-widest text-[11px] font-display font-bold transition-all rounded-lg shadow-lg shadow-amber/15">
                            Ascendi all'Elite
                        </button>
                    </motion.div>

                </div>

                <p className="text-center text-xs text-text-muted mt-8">
                    Fatturazione discreta "LMNL Systems" • Disdici in qualsiasi momento
                </p>
            </div>
        </section>
    );
}
