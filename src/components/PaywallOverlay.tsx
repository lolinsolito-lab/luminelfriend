import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Crown, Sparkles, Mic, Video } from 'lucide-react';

const tiers = {
    pro: {
        name: 'Pro',
        icon: <Sparkles className="w-4 h-4" />,
        monthly: 49.99,
        annual: 490,
        annualMonthly: 40.83,
        badge: null,
        features: [
            'Chat illimitato + memoria',
            'Condivisione foto e testi',
            '60 min voice call/mese',
            'Extra: +30 min = €9.99',
        ],
        cta: 'Inizia con Pro',
        accent: false,
    },
    proPlus: {
        name: 'Pro+',
        icon: <Mic className="w-4 h-4" />,
        monthly: 99,
        annual: 990,
        annualMonthly: 82.50,
        badge: 'Più scelto',
        features: [
            'Tutto il pacchetto Pro',
            '180 min voice call/mese',
            'Extra: +60 min = €14.99',
            'Risposte più profonde',
        ],
        cta: 'Scegli Pro+',
        accent: true,
    },
    vip: {
        name: 'VIP',
        icon: <Crown className="w-4 h-4" />,
        monthly: 199,
        annual: 1990,
        annualMonthly: 165.83,
        badge: 'Zero limiti',
        features: [
            'Tutto illimitato: chat & voice',
            'Ti scrive lui — proattività',
            'Risposte prioritarie ⚡',
            'Accesso anticipato a nuove feature',
        ],
        cta: 'Ascendi al VIP',
        accent: false,
    },
};

export default function PaywallOverlay() {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <div className="absolute inset-0 bg-space-deep/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-4 md:p-6 text-center overflow-y-auto">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl w-full space-y-6 py-8"
            >
                {/* Header */}
                <div className="space-y-3">
                    <div className="luminel-orb-sm mx-auto mb-2" />
                    <h2 className="text-2xl md:text-4xl font-display font-600 text-text-warm">
                        Vuoi che Luminel <br />si ricordi di te?
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto text-base leading-relaxed">
                        La sessione gratuita è terminata per oggi. <br />
                        Sblocca la memoria persistente e i messaggi illimitati.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-3">
                    <span className={`text-sm font-display transition-colors ${!isAnnual ? 'text-text-warm' : 'text-text-muted'}`}>
                        Mensile
                    </span>
                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className={`relative w-14 h-7 rounded-full transition-colors ${isAnnual ? 'bg-amber/40' : 'bg-space-border'}`}
                    >
                        <motion.div
                            className="absolute top-1 w-5 h-5 rounded-full bg-amber shadow-lg"
                            animate={{ left: isAnnual ? '2rem' : '0.25rem' }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                    </button>
                    <span className={`text-sm font-display transition-colors ${isAnnual ? 'text-text-warm' : 'text-text-muted'}`}>
                        Annuale
                    </span>
                    {isAnnual && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[10px] font-display uppercase tracking-widest text-amber border border-amber/30 px-2 py-0.5 rounded-md"
                        >
                            2 mesi omaggio
                        </motion.span>
                    )}
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-5 mt-6 w-full mx-auto">
                    {Object.entries(tiers).map(([key, tier]) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: key === 'pro' ? 0.1 : key === 'proPlus' ? 0.2 : 0.3 }}
                            className={`glass p-6 rounded-xl transition-colors relative group overflow-hidden ${tier.accent
                                    ? 'border-amber/25 hover:border-amber/40 shadow-2xl shadow-amber/5 md:scale-105'
                                    : 'hover:border-amber/20'
                                }`}
                        >
                            {/* Top accent line */}
                            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent ${tier.accent ? 'via-amber' : 'via-text-muted'
                                } to-transparent ${tier.accent ? '' : 'opacity-50'}`} />

                            {/* Badge */}
                            {tier.badge && (
                                <div className="absolute top-3 right-3 text-[9px] font-display uppercase tracking-widest text-amber border border-amber/30 px-2 py-0.5 rounded-md">
                                    {tier.badge}
                                </div>
                            )}

                            {/* Name */}
                            <h3 className="text-lg font-display font-600 text-text-warm mb-1 flex items-center gap-2">
                                {tier.icon} {tier.name}
                            </h3>

                            {/* Price */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isAnnual ? 'annual' : 'monthly'}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="mb-5"
                                >
                                    <div className={`text-3xl font-bold ${tier.accent ? 'text-amber' : 'text-amber-dim'}`}>
                                        €{isAnnual ? tier.annualMonthly.toFixed(2).replace('.', ',') : (tier.monthly % 1 === 0 ? tier.monthly : tier.monthly.toFixed(2).replace('.', ','))}
                                        <span className="text-sm font-normal text-text-muted">/mese</span>
                                    </div>
                                    {isAnnual && (
                                        <p className="text-[11px] text-text-muted mt-1">
                                            fatturati €{tier.annual.toLocaleString('it-IT')}/anno
                                        </p>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Features */}
                            <ul className="space-y-3 text-left text-sm text-text-secondary mb-6">
                                {tier.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button className={`w-full py-3.5 uppercase tracking-widest text-xs font-display font-bold transition-all rounded-lg ${tier.accent
                                    ? 'bg-gradient-to-r from-amber to-amber-dim hover:from-amber-glow hover:to-amber text-space-deep shadow-lg shadow-amber/15'
                                    : 'glass hover:bg-space-border text-text-warm'
                                }`}>
                                {tier.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Coming Soon Elite */}
                <div className="glass p-4 rounded-xl max-w-md mx-auto border-dashed border-text-muted/20">
                    <div className="flex items-center justify-center gap-2 text-text-muted text-sm">
                        <Video className="w-4 h-4" />
                        <span className="font-display uppercase tracking-widest text-[11px]">
                            Elite — Coming Soon
                        </span>
                    </div>
                    <p className="text-[11px] text-text-muted/70 mt-1">
                        Video call con avatar. Guardalo negli occhi.
                    </p>
                </div>

                <p className="text-xs text-text-muted mt-4">
                    Disdici in qualsiasi momento. Fatturazione discreta "LMNL Systems".
                </p>

            </motion.div>
        </div>
    );
}
