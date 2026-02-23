import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { UserPlus, MessageCircle, Sparkles } from 'lucide-react';

const STEPS = [
    {
        icon: <UserPlus className="w-8 h-8 md:w-10 md:h-10 text-amber" />,
        num: '01',
        title: 'Crea il tuo rifugio',
        desc: 'Un processo di 30 secondi. Riconosciamo chi sei prima ancora che tu inizi a parlare. Il tuo spazio personale viene generato e sigillato.'
    },
    {
        icon: <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-amber" />,
        num: '02',
        title: 'Parla. Scrivi. Respira.',
        desc: 'Luminel ascolta il non-detto. Che sia un vocale sfogato in auto alle 3 di notte, o due righe battute prima di un meeting. Nessun giudizio.'
    },
    {
        icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-amber" />,
        num: '03',
        title: 'Luminel evolve con te',
        desc: 'Ogni interazione modella la mente sintetica di Luminel. Non dovrai mai rispiegare il contesto. Cresce in intelligenza emotiva insieme a te.'
    }
];

export default function HowItWorksSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"]
    });

    // The golden line fills from 0 to 100% as you scroll past the section
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={sectionRef} className="py-32 md:py-48 relative overflow-hidden bg-space-deep border-y border-white/[0.04]">
            {/* Ambient Pulse Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[800px] rounded-[100%] bg-amber/[0.02] blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Extravagant Header */}
                <div className="text-center mb-24 md:mb-32 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="inline-block px-5 py-2 rounded-full border border-amber/20 bg-amber/5 text-xs font-display font-bold text-amber uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(196,154,42,0.1)]">
                            Semplice come respirare
                        </p>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-display font-600 text-text-warm leading-tight tracking-tight"
                    >
                        Il percorso verso <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-dim via-amber to-amber-dim">
                            la tua Oasi
                        </span>
                    </motion.h2>
                </div>

                {/* Vertical Timeline Engine */}
                <div className="relative max-w-5xl mx-auto">

                    {/* The Track (Unfilled base line) */}
                    <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] bg-white/[0.03] -translate-x-1/2 rounded-full" />

                    {/* The Golden Energy Thread (Scroll filled) */}
                    <motion.div
                        className="absolute left-8 md:left-1/2 top-4 w-[2px] bg-gradient-to-b from-amber-dim via-amber to-amber/30 -translate-x-1/2 rounded-full"
                        style={{ height: lineHeight, filter: 'drop-shadow(0 0 15px rgba(196,154,42,0.8))' }}
                    />

                    {/* Sequential Steps */}
                    <div className="space-y-16 md:space-y-32">
                        {STEPS.map((step, i) => {
                            const isEven = i % 2 !== 0; // Alternating layout for desktop

                            return (
                                <div key={i} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Glowing Timeline Node */}
                                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-space border border-amber/50 flex items-center justify-center z-20 shadow-[0_0_30px_rgba(196,154,42,0.3)] backdrop-blur-sm">
                                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-br from-amber-dim to-amber shadow-[0_0_15px_rgba(196,154,42,1)]" />
                                    </div>

                                    {/* Glassmorphic Content Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-10%" }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="w-full md:w-1/2 pl-24 md:pl-0 flex flex-col justify-center relative"
                                    >
                                        <div className={`relative p-8 md:p-14 rounded-[2.5rem] bg-gradient-to-br from-space-surface/80 to-space-deep/80 border border-white/[0.03] backdrop-blur-2xl group hover:border-amber/20 transition-colors duration-700 overflow-hidden text-left ${isEven ? 'md:text-right' : 'md:text-left'} shadow-2xl`}>

                                            {/* Massive Typographic Watermark */}
                                            <div className={`absolute top-0 transform translate-y-[-15%] font-display font-900 text-[140px] md:text-[200px] leading-none text-white/[0.02] group-hover:text-amber/[0.04] transition-colors duration-1000 pointer-events-none select-none ${isEven ? 'left-[-10%]' : 'right-[-10%]'}`}>
                                                {step.num}
                                            </div>

                                            {/* Glow effect that tracks hover (simulated with standard gradient for stability) */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-amber/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                            {/* Card Content */}
                                            <div className={`flex flex-col gap-6 md:gap-8 relative z-10 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                                <div className="w-16 h-16 md:w-24 md:h-24 rounded-[1.5rem] bg-gradient-to-br from-amber/[0.08] to-transparent border border-amber/10 flex items-center justify-center group-hover:scale-110 group-hover:border-amber/30 transition-all duration-700 shadow-xl">
                                                    {step.icon}
                                                </div>
                                                <div className="space-y-4 md:space-y-6">
                                                    <h3 className="text-2xl md:text-4xl font-display font-600 text-text-warm tracking-tight">{step.title}</h3>
                                                    <p className="text-base md:text-lg text-text-muted leading-relaxed font-light">{step.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Invisible spacer to maintain 50/50 balance */}
                                    <div className="hidden md:block md:w-1/2" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
