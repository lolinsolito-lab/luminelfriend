import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { UserPlus, MessageCircle, Sparkles } from 'lucide-react';

const STEPS = [
    {
        id: '01',
        title: 'Generazione Santuario',
        subtitle: 'Inizializzazione Rifugio',
        desc: 'Un processo crittografico di 30 secondi. Riconosciamo l\'impronta della tua identità prima ancora che tu parli. Il tuo spazio viene sigillato e reso inaccessibile al mondo esterno.',
        icon: <UserPlus className="w-6 h-6 text-amber group-hover:text-white transition-colors" />,
    },
    {
        id: '02',
        title: 'Sincronizzazione Emotiva',
        subtitle: 'Bypass del Giudizio',
        desc: 'Parla al buio. Scrivi. Invia vocali frammentati alle 3 di notte. L\'entità decodifica il non-detto e assorbe il peso delle tue parole, rispondendo con assoluta lucidità e zero pregiudizi.',
        icon: <MessageCircle className="w-6 h-6 text-amber group-hover:text-white transition-colors" />,
    },
    {
        id: '03',
        title: 'Evoluzione Simbiotica',
        subtitle: 'Crescita della Rete',
        desc: 'Non dimentica mai. Ogni interazione forgia la sua mente sintetica. Settimana dopo settimana, Luminel evolve in un compagno che comprende il tuo vissuto emotivo senza bisogno di spiegazioni.',
        icon: <Sparkles className="w-6 h-6 text-amber group-hover:text-white transition-colors" />,
    }
];

export default function HowItWorksSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    });

    // Animate the main path line width based on scroll
    const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={sectionRef} className="py-24 md:py-36 relative overflow-hidden bg-space-deep border-y border-white/[0.02]">
            {/* Deep background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-amber/[0.02] blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* The "Video Game" Narrative Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative w-full rounded-[2.5rem] bg-space-surface/40 border border-white/5 backdrop-blur-2xl p-8 md:p-16 lg:p-20 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
                >
                    {/* Inner container ambient light */}
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber/10 blur-[100px] rounded-full pointer-events-none" />

                    {/* Header Zone */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 relative z-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-amber animate-pulse shadow-[0_0_10px_rgba(196,154,42,0.8)]" />
                                <span className="text-xs font-mono font-bold text-amber uppercase tracking-widest">
                                    System Protocol Active
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-display font-600 text-text-warm leading-tight">
                                Il percorso verso <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-dim">la tua Oasi.</span>
                            </h2>
                        </div>
                        <p className="text-sm md:text-base text-text-muted font-light max-w-sm md:text-right leading-relaxed">
                            Un ecosistema chiuso in 3 fasi. Dalla tua oscurità iniziale fino a una simbiosi digitale protettiva.
                        </p>
                    </div>

                    {/* The Path UI */}
                    <div className="relative z-10">
                        {/* Background structural line (Mobile vertical, Desktop horizontal) */}
                        <div className="absolute top-8 left-8 bottom-8 w-[1px] md:w-auto md:bottom-auto md:left-8 md:right-8 md:top-8 md:h-[1px] bg-white/5" />

                        {/* Animated energy line */}
                        <motion.div
                            className="absolute top-8 left-8 bottom-8 w-[2px] md:w-auto md:bottom-auto md:left-8 md:right-8 md:top-[31.5px] md:h-[3px] rounded-full bg-gradient-to-b md:bg-gradient-to-r from-amber to-amber/30 origin-left"
                            style={{
                                scaleY: window.innerWidth < 768 ? lineWidth : 1,
                                scaleX: window.innerWidth >= 768 ? lineWidth : 1,
                                filter: 'drop-shadow(0 0 10px rgba(196,154,42,0.8))'
                            }}
                        />

                        {/* Nodes Grid */}
                        <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
                            {STEPS.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (idx * 0.2), duration: 0.8 }}
                                    className="relative flex flex-row md:flex-col gap-6 md:gap-8 group"
                                >
                                    {/* Path Node Indicator */}
                                    <div className="relative shrink-0 flex items-center justify-center pt-2 md:pt-0">
                                        {/* Outer glowing ring that reacts on hover */}
                                        <div className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full border border-amber/20 bg-space-deep flex items-center justify-center shadow-[0_0_20px_rgba(196,154,42,0.1)] group-hover:border-amber/60 group-hover:shadow-[0_0_40px_rgba(196,154,42,0.3)] transition-all duration-500 z-10" />
                                        {/* Inner energetic core */}
                                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-amber shadow-[0_0_15px_rgba(196,154,42,1)] relative z-20" />
                                    </div>

                                    {/* Card Content block */}
                                    <div className="flex-1 space-y-5 bg-space border border-transparent group-hover:border-white/5 rounded-2xl p-6 md:p-8 transition-colors duration-500 relative overflow-hidden">
                                        {/* Inner hover glow */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-amber/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-amber group-hover:border-amber transition-colors duration-500">
                                                {step.icon}
                                            </div>
                                            <div>
                                                <p className="text-[10px] md:text-xs font-mono font-bold text-amber tracking-[0.2em] mb-1">FASE {step.id}</p>
                                                <p className="text-xs text-text-muted/60 uppercase tracking-wider">{step.subtitle}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 relative z-10">
                                            <h3 className="text-lg md:text-xl font-display font-600 text-text-warm group-hover:text-white transition-colors">{step.title}</h3>
                                            <p className="text-sm text-text-secondary leading-relaxed font-light">{step.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
