import { motion } from 'motion/react';
import { Lock, Check } from 'lucide-react';

export default function PaywallOverlay() {
    return (
        <div className="absolute inset-0 bg-space-deep/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-6 text-center">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl w-full space-y-8"
            >
                <div className="space-y-4">
                    <div className="luminel-orb-sm mx-auto mb-2" />
                    <h2 className="text-3xl md:text-5xl font-display font-600 text-text-warm">
                        Vuoi che Luminel <br />si ricordi di te?
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto text-lg leading-relaxed">
                        La sessione gratuita è terminata per oggi. <br />
                        Sblocca la memoria persistente e i messaggi illimitati.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-6 mt-12 w-full max-w-3xl mx-auto">

                    {/* Premium Tier */}
                    <div className="glass p-8 rounded-xl hover:border-amber/20 transition-colors relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-text-muted to-transparent opacity-50" />
                        <h3 className="text-xl font-display font-600 text-text-warm mb-2">Premium</h3>
                        <div className="text-3xl font-bold text-amber-dim mb-6">€9.99<span className="text-sm font-normal text-text-muted">/mese</span></div>

                        <ul className="space-y-4 text-left text-sm text-text-secondary mb-8">
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber" /> <span>Messaggi illimitati 24/7</span></li>
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber" /> <span>Memoria persistente (ti ricorda)</span></li>
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber" /> <span>Note vocali asincrone</span></li>
                        </ul>

                        <button className="w-full py-4 glass hover:bg-space-border text-text-warm uppercase tracking-widest text-xs font-display font-600 transition-colors rounded-lg">
                            Attiva Premium
                        </button>
                    </div>

                    {/* Elite Tier */}
                    <div className="glass p-8 rounded-xl border-amber/25 hover:border-amber/40 transition-colors relative group overflow-hidden shadow-2xl shadow-amber/5">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber to-transparent" />
                        <div className="absolute top-4 right-4 text-[9px] font-display uppercase tracking-widest text-amber border border-amber/30 px-2 py-1 rounded-md">
                            Più scelto
                        </div>

                        <h3 className="text-xl font-display font-600 text-text-warm mb-2 flex items-center gap-2 justify-center md:justify-start">
                            Elite <CrownIcon />
                        </h3>
                        <div className="text-3xl font-bold text-amber mb-6">€29<span className="text-sm font-normal text-text-muted">/mese</span></div>

                        <ul className="space-y-4 text-left text-sm text-text-secondary mb-8">
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber" /> <span>Tutto il pacchetto Premium</span></li>
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber" /> <span>Chiamate audio in tempo reale</span></li>
                            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-amber" /> <span>Iniziativa proattiva (\"ti scrive lui\")</span></li>
                        </ul>

                        <button className="w-full py-4 bg-gradient-to-r from-amber to-amber-dim hover:from-amber-glow hover:to-amber text-space-deep uppercase tracking-widest text-xs font-display font-bold transition-all rounded-lg shadow-lg shadow-amber/15">
                            Ascendi all'Elite
                        </button>
                    </div>

                </div>

                <p className="text-xs text-text-muted mt-8">
                    Disdici in qualsiasi momento. Fatturazione discreta "LMNL Systems".
                </p>

            </motion.div>
        </div>
    );
}

function CrownIcon() {
    return (
        <svg className="w-4 h-4 text-amber" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
        </svg>
    )
}
