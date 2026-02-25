import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, Mic, Crown, Video } from 'lucide-react';

const tiers = [
    {
        key: 'free',
        name: 'Avvio',
        monthly: 0,
        annual: 0,
        annualMonthly: 0,
        sub: 'Sempre gratis',
        accent: false,
        badge: null,
        features: [
            '15 messaggi al giorno',
            'Accesso completamente anonimo',
            'Conversazione che si resetta ogni 24h',
            'Nessun vincolo, zero impegno',
        ],
        cta: 'Inizia Nel Silenzio',
        ctaStyle: 'simple',
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
            'Conversazioni scritte illimitate',
            'Memoria persistente (ti ricorda nel tempo)',
            'Personalità AI: scelta tra 3 Archetipi',
            '1 Ora di voce al mese (Sintesi Digitale)',
            'Crediti Extra: +30 min a €9,99',
        ],
        cta: 'Luminel Base',
        ctaStyle: 'ghost',
        icon: <Sparkles className="w-4 h-4 text-amber-dim" />,
    },
    {
        key: 'proPlus',
        name: 'Pro+',
        monthly: 99,
        annual: 990,
        annualMonthly: 82.50,
        sub: 'L\'esperienza completa',
        accent: true,
        badge: 'SCELTA DEI LEADER',
        features: [
            'Tutto il privilegio del piano Pro',
            'Voce Premium ultra-realistica (HD)',
            '3 Ore di voce al mese (Timbro Premium)',
            'Personalità AI: regola Tono e Stile',
            'Crediti Extra: +60 min a €14,99',
        ],
        cta: 'Sblocca il tuo Santuario',
        ctaStyle: 'solid',
        icon: <Mic className="w-4 h-4 text-amber" />,
    },
    {
        key: 'vip',
        name: 'VIP',
        monthly: 199,
        annual: 1990,
        annualMonthly: 165.83,
        sub: 'Senza restrizioni',
        accent: false,
        badge: 'ESCLUSIVA',
        features: [
            'Personalità AI: controllo totale (Prompt Override)',
            '25 Ore di voce Premium incluse al mese',
            'Luminel ti scrive per primo (Proattivo)',
            'Risposte prioritarie e canale diretto Founder',
            'Analisi emotiva profonda tra le righe',
        ],
        cta: 'Dominio Totale',
        ctaStyle: 'ghost',
        icon: <Crown className="w-4 h-4 text-champagne" />,
    },
];

export default function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <section className="py-32 md:py-48 px-6 bg-space-deep relative overflow-hidden">
            {/* Ambient Background Grid & Glows */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] rounded-[100%] bg-amber/[0.03] blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Luxury Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-24"
                >
                    <p className="inline-block px-5 py-2 rounded-full border border-amber/20 bg-amber/5 text-[10px] md:text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-6 shadow-[0_0_20px_rgba(196,154,42,0.1)]">
                        Il Pedaggio del Silenzio
                    </p>
                    <h2 className="text-4xl md:text-6xl font-display font-600 text-text-warm leading-tight mb-6">
                        Inizia gratis. <br className="hidden md:block" />
                        <span className="text-text-muted">Evolvi quando sei pronto.</span>
                    </h2>
                </motion.div>

                {/* Billing Toggle Masterpiece */}
                <div className="flex flex-col items-center justify-center gap-4 mb-16">
                    <div className="flex items-center gap-6 p-2 rounded-full bg-space border border-white/[0.05] shadow-2xl">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-6 py-2 rounded-full text-sm font-display uppercase tracking-widest transition-all duration-500 ${!isAnnual ? 'bg-amber/10 text-amber shadow-[0_0_15px_rgba(196,154,42,0.2)]' : 'text-text-muted hover:text-text-warm'}`}
                        >
                            Mensile
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-6 py-2 rounded-full text-sm font-display uppercase tracking-widest transition-all duration-500 ${isAnnual ? 'bg-amber/10 text-amber shadow-[0_0_15px_rgba(196,154,42,0.2)]' : 'text-text-muted hover:text-text-warm'}`}
                        >
                            Annuale
                        </button>
                    </div>

                    <AnimatePresence>
                        {isAnnual && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-amber flex items-center gap-2"
                            >
                                <Sparkles className="w-3 h-3" /> Risparmi il 16% (2 mesi gratis)
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Ultimate Pricing Grid */}
                <div className="grid md:grid-cols-4 gap-6 lg:gap-8 items-center">
                    {tiers.map((tier, i) => {
                        const isMain = tier.accent;
                        return (
                            <motion.div
                                key={tier.key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                                className={`relative group ${isMain ? 'md:-my-8 z-20' : 'z-10'}`}
                            >
                                <div className={`
                                h-full p-8 md:p-10 rounded-[2rem] backdrop-blur-3xl transition-all duration-500
                                ${isMain
                                        ? 'bg-gradient-to-b from-space-surface via-space-deep to-space-deep border border-amber/40 shadow-[0_0_50px_rgba(196,154,42,0.15)] ring-1 ring-white/5 md:scale-105'
                                        : 'bg-space-surface/50 border border-white/[0.05] hover:border-amber/20 hover:bg-space-surface/80'
                                    }
                            `}>
                                    {/* Top Accent Beam */}
                                    {isMain && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-amber to-transparent shadow-[0_0_20px_rgba(196,154,42,0.8)]" />
                                    )}

                                    {/* Badge */}
                                    {tier.badge && (
                                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-[9px] font-display font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 shadow-xl ${isMain ? 'bg-amber text-space-deep' : 'bg-space-deep border border-champagne/30 text-champagne'}`}>
                                            {isMain && <Sparkles className="w-3 h-3" />}
                                            {tier.badge}
                                        </div>
                                    )}

                                    {/* Card Header */}
                                    <div className="mb-8">
                                        <h3 className={`text-xl font-display font-600 mb-2 flex items-center gap-2 ${isMain ? 'text-amber' : 'text-text-warm'}`}>
                                            {tier.icon} {tier.name}
                                        </h3>

                                        <div className="h-[70px] flex flex-col justify-end">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={isAnnual ? 'annual' : 'monthly'}
                                                    initial={{ opacity: 0, x: -5 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 5 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {tier.monthly === 0 ? (
                                                        <div className="text-4xl md:text-5xl font-display font-400 text-text-warm">€0</div>
                                                    ) : (
                                                        <div className="flex items-baseline gap-2">
                                                            <span className={`text-4xl md:text-5xl font-display font-400 ${isMain ? 'text-text-warm' : 'text-text-primary'}`}>
                                                                €{isAnnual ? Math.floor(tier.annualMonthly) : Math.floor(tier.monthly)}
                                                            </span>
                                                            <div className="flex flex-col text-left">
                                                                <span className={`text-sm ${isMain ? 'text-text-warm' : 'text-text-primary'}`}>
                                                                    ,{(isAnnual ? tier.annualMonthly : tier.monthly).toFixed(2).split('.')[1]}
                                                                </span>
                                                                <span className="text-[10px] text-text-muted uppercase tracking-widest">/mese</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>

                                            <p className={`text-xs mt-2 ${isMain ? 'text-amber-dim' : 'text-text-muted'}`}>
                                                {tier.monthly === 0 ? tier.sub : isAnnual ? `Fatturati €${tier.annual}/anno` : tier.sub}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <ul className="space-y-4 mb-10 min-h-[160px]">
                                        {tier.features.map((f, j) => (
                                            <li key={j} className="flex items-start gap-3">
                                                <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${isMain ? 'bg-amber/10' : 'bg-white/5'}`}>
                                                    <Check className={`w-3 h-3 ${isMain ? 'text-amber' : 'text-text-muted group-hover:text-text-primary'}`} />
                                                </div>
                                                <span className={`text-sm tracking-wide ${isMain ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-warm transition-colors'}`}>
                                                    {f}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button Masterpiece */}
                                    <button className={`
                                    w-full py-4 px-6 rounded-xl text-xs font-display font-bold uppercase tracking-[0.15em] transition-all duration-500
                                    ${tier.ctaStyle === 'solid'
                                            ? 'bg-gradient-to-r from-amber to-amber-dim text-white shadow-[0_0_30px_rgba(196,154,42,0.3)] hover:shadow-[0_0_50px_rgba(196,154,42,0.5)] hover:scale-[1.02]'
                                            : tier.ctaStyle === 'ghost'
                                                ? 'border border-white/10 text-text-primary hover:border-amber/40 hover:text-amber hover:bg-amber/5'
                                                : 'bg-transparent text-text-muted hover:text-text-warm'
                                        }
                                `}>
                                        {tier.cta}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* The Elite Vision (Sneak Peek) */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-20 md:mt-32 relative max-w-4xl mx-auto"
                >
                    {/* Magical floating glow for the waitlist */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-amber/[0.02] via-champagne/[0.05] to-amber/[0.02] blur-[40px] rounded-full pointer-events-none" />

                    <div className="relative overflow-hidden rounded-[2.5rem] bg-space border border-amber/10 p-1 md:p-2 group hover:border-amber/30 transition-colors duration-1000 shadow-2xl">
                        {/* Shimmer effect inside border */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2s] ease-in-out" />

                        <div className="relative bg-space-deep rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 md:gap-16">

                            {/* Orbital Eye (Icon representation) */}
                            <div className="relative shrink-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-28 h-28 md:w-36 md:h-36 rounded-full border border-dashed border-amber/20"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full border border-amber/10"
                                />
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-amber/20 to-transparent flex items-center justify-center backdrop-blur-md border border-amber/30 shadow-[0_0_30px_rgba(196,154,42,0.2)]">
                                    <Video className="w-6 h-6 md:w-8 md:h-8 text-amber" />
                                </div>
                            </div>

                            {/* Vision Content */}
                            <div className="flex-1 text-center md:text-left">
                                <span className="inline-block px-4 py-1.5 rounded-full border border-space-border bg-space text-[9px] font-display font-bold uppercase tracking-[0.2em] text-text-muted mb-6 shadow-inner">
                                    In Sviluppo 2025
                                </span>
                                <h3 className="text-3xl md:text-4xl font-display font-400 text-text-warm mb-4 leading-tight">
                                    L'ultimo confine. <br className="hidden md:block" />
                                    <span className="font-600 bg-clip-text text-transparent bg-gradient-to-r from-amber to-champagne">Guardalo negli occhi.</span>
                                </h3>
                                <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto md:mx-0 font-light">
                                    Prepariamo l'Era Elite: videochiamate con un avatar in tempo reale. Le sue espressioni cambiano in base alla tua voce. Non sarà più solo un'IA, sarà una vera presenza visiva.
                                </p>

                                <button className="group/btn relative px-8 md:px-10 py-4 overflow-hidden rounded-xl bg-space border border-amber/20 hover:border-amber/50 transition-colors shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                    <span className="relative z-10 text-[10px] md:text-xs font-display font-bold uppercase tracking-[0.2em] text-amber">
                                        Iscriviti alla Lista d'Attesa Privata
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer note */}
                <p className="text-center text-[10px] uppercase tracking-widest text-text-muted/50 mt-16 font-display">
                    Fatturazione sicura "LMNL Systems" • Nessun vincolo
                </p>

            </div>
        </section>
    );
}
