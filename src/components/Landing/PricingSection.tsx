import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, Mic, Crown, Video } from 'lucide-react';

const tiers = [
    {
        key: 'free',
        name: 'Freemium',
        monthly: 0,
        annual: 0,
        annualMonthly: 0,
        sub: 'Per sempre',
        accent: false,
        badge: null,
        features: [
            '15 messaggi al giorno',
            'Accesso anonimo immediato',
            'Amnesia giornaliera (reset ogni giorno)',
        ],
        cta: 'Perfetto per iniziare',
        ctaStyle: 'label',
        icon: null,
    },
    {
        key: 'pro',
        name: 'Pro',
        monthly: 49.99,
        annual: 490,
        annualMonthly: 40.83,
        sub: 'Cancella quando vuoi',
        accent: false,
        badge: null,
        features: [
            'Chat illimitato + memoria',
            'Condivisione foto e testi',
            '60 min voice call/mese',
            'Extra: +30 min = €9.99',
        ],
        cta: 'Inizia con Pro',
        ctaStyle: 'ghost',
        icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    {
        key: 'proPlus',
        name: 'Pro+',
        monthly: 99,
        annual: 990,
        annualMonthly: 82.50,
        sub: 'Cancella quando vuoi',
        accent: true,
        badge: 'Più scelto',
        features: [
            'Tutto il pacchetto Pro',
            '180 min voice call/mese',
            'Extra: +60 min = €14.99',
            'Risposte più profonde',
        ],
        cta: 'Scegli Pro+',
        ctaStyle: 'solid',
        icon: <Mic className="w-3.5 h-3.5" />,
    },
    {
        key: 'vip',
        name: 'VIP',
        monthly: 199,
        annual: 1990,
        annualMonthly: 165.83,
        sub: 'Cancella quando vuoi',
        accent: false,
        badge: 'Zero limiti',
        features: [
            'Tutto illimitato: chat & voice',
            'Ti scrive lui — proattività',
            'Risposte prioritarie ⚡',
            'Accesso anticipato a nuove feature',
        ],
        cta: 'Ascendi al VIP',
        ctaStyle: 'ghost',
        icon: <Crown className="w-3.5 h-3.5" />,
    },
];

export default function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <section className="py-24 md:py-32 px-6 bg-space-deep border-t border-white/5">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
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

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-3 mb-10">
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

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-4 gap-5">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass p-7 rounded-xl transition-colors relative overflow-hidden ${tier.accent
                                    ? 'border-amber/25 hover:border-amber/40 shadow-2xl shadow-amber/5 md:scale-[1.03]'
                                    : 'hover:border-amber/15'
                                }`}
                        >
                            {/* Top accent line */}
                            {(tier.accent || tier.key === 'vip') && (
                                <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent ${tier.accent ? 'via-amber' : 'via-amber-dim'
                                    } to-transparent`} />
                            )}

                            {/* Badge */}
                            {tier.badge && (
                                <div className="absolute top-3 right-3 text-[9px] font-display uppercase tracking-widest text-amber border border-amber/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> {tier.badge}
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
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.2 }}
                                    className="mb-1"
                                >
                                    {tier.monthly === 0 ? (
                                        <div className="text-3xl font-bold text-text-warm">€0</div>
                                    ) : (
                                        <div className={`text-3xl font-bold ${tier.accent ? 'text-amber' : 'text-amber-dim'}`}>
                                            €{isAnnual
                                                ? tier.annualMonthly.toFixed(2).replace('.', ',')
                                                : (tier.monthly % 1 === 0 ? tier.monthly : tier.monthly.toFixed(2).replace('.', ','))
                                            }
                                            <span className="text-sm font-normal text-text-muted">/mese</span>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Subtitle */}
                            <p className="text-xs text-text-muted mb-5">
                                {tier.monthly === 0
                                    ? tier.sub
                                    : isAnnual
                                        ? `fatturati €${tier.annual.toLocaleString('it-IT')}/anno`
                                        : tier.sub
                                }
                            </p>

                            {/* Features */}
                            <ul className="space-y-3 text-sm text-text-secondary mb-7">
                                {tier.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-2.5">
                                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.monthly === 0 ? 'text-cyan' : 'text-amber'}`} />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            {tier.ctaStyle === 'label' ? (
                                <div className="text-[10px] text-text-muted uppercase tracking-widest text-center font-display">
                                    {tier.cta}
                                </div>
                            ) : tier.ctaStyle === 'solid' ? (
                                <button className="w-full py-3.5 bg-gradient-to-r from-amber to-amber-dim hover:from-amber-glow hover:to-amber text-space-deep uppercase tracking-widest text-[11px] font-display font-bold transition-all rounded-lg shadow-lg shadow-amber/15">
                                    {tier.cta}
                                </button>
                            ) : (
                                <button className="w-full py-3.5 glass hover:bg-space-border text-text-warm uppercase tracking-widest text-[11px] font-display font-600 transition-colors rounded-lg">
                                    {tier.cta}
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Coming Soon Elite */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8 glass p-4 rounded-xl max-w-md mx-auto border-dashed border-text-muted/20 text-center"
                >
                    <div className="flex items-center justify-center gap-2 text-text-muted text-sm">
                        <Video className="w-4 h-4" />
                        <span className="font-display uppercase tracking-widest text-[11px]">
                            Elite — Coming Soon
                        </span>
                    </div>
                    <p className="text-[11px] text-text-muted/70 mt-1">
                        Video call con avatar. Guardalo negli occhi.
                    </p>
                </motion.div>

                <p className="text-center text-xs text-text-muted mt-8">
                    Fatturazione discreta "LMNL Systems" • Disdici in qualsiasi momento
                </p>
            </div>
        </section>
    );
}
