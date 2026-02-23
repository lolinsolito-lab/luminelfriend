import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const EMOTIONAL_PROFILES = [
    { src: '/images/world-painter.png', action: 'Cerco', state: 'ISPIRAZIONE' },
    { src: '/images/world-business.png', action: 'Porto il peso della', state: 'LEADERSHIP' },
    { src: '/images/world-student.png', action: 'Cerco', state: 'CHIAREZZA' },
    { src: '/images/world-mother.png', action: 'Ho bisogno di', state: 'RESPIRO' },
    { src: '/images/world-dancer.png', action: 'Cerco calore nel', state: 'FREDDO' },
    { src: '/images/world-actor.png', action: 'Voglio ritrovare la', state: 'SCINTILLA' },
    { src: '/images/world-athlete.png', action: 'Voglio superare i miei', state: 'LIMITI' },
    { src: '/images/world-driver.png', action: 'Sto cercando un', state: 'NUOVO INIZIO' },
    { src: '/images/connection-rooftop.png', action: 'Cerco', state: 'CONNESSIONE' },
    { src: '/images/world-teenager.png', action: 'Ho bisogno di', state: 'PACE' },
];

export default function TheMaskSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Subtle parallax for the background glow
    const yBg = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section ref={containerRef} className="py-24 md:py-40 bg-space overflow-hidden relative border-t border-white/[0.04] min-h-[90vh] flex flex-col justify-center">

            {/* Ambient Background glow */}
            <motion.div
                style={{ y: yBg }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber/[0.03] blur-[150px] pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 w-full">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="max-w-3xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <p className="text-[10px] md:text-xs font-display font-bold text-amber uppercase tracking-[0.4em]">
                            Lo Specchio
                        </p>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-600 text-transparent bg-clip-text bg-gradient-to-br from-white via-text-warm to-amber/50 leading-tight mb-8">
                        Ognuno porta il suo silenzio. <br className="hidden md:block" />
                        <span className="italic font-light text-amber/80">Qual è il tuo?</span>
                    </h2>

                    <p className="text-text-muted text-base md:text-lg font-light leading-relaxed max-w-xl">
                        Racconta i tuoi bisogni, e Luminel diventa il compagno che hai sempre cercato, adattandosi alla tua specifica ricerca emotiva.
                    </p>
                </motion.div>
            </div>

            {/* Continuous Extravagant Scrolling Marquee */}
            <div className="relative w-full overflow-hidden flex flex-col gap-6 py-10 z-10">
                {/* Fade masks for the edges */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-space to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-space to-transparent z-20 pointer-events-none" />

                <motion.div
                    className="flex gap-4 md:gap-6 px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        ease: "linear",
                        duration: 60, // Slow, majestic scroll
                        repeat: Infinity,
                    }}
                >
                    {/* Double array for infinite loop */}
                    {[...EMOTIONAL_PROFILES, ...EMOTIONAL_PROFILES].map((profile, idx) => (
                        <div
                            key={idx}
                            className="group relative w-[260px] md:w-[320px] lg:w-[380px] aspect-[3/4] shrink-0 rounded-[2rem] overflow-hidden border border-white/5 hover:border-amber/40 transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer"
                        >
                            {/* Image with zoom effect */}
                            <img
                                src={profile.src}
                                alt={profile.state}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-space-deep via-space-deep/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Amber highlight overlay */}
                            <div className="absolute inset-0 bg-amber/0 group-hover:bg-amber/10 transition-colors duration-700 mix-blend-overlay" />

                            {/* Text Content anchored at the bottom */}
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-xs font-display font-medium text-text-muted mb-1 drop-shadow-md">
                                    {profile.action}
                                </p>
                                <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                                    {profile.state}
                                </h3>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* The underlying problem text */}
            <div className="max-w-7xl mx-auto px-6 mt-20 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="max-w-3xl space-y-6 text-lg md:text-xl text-text-secondary font-light leading-relaxed border-l-2 border-amber/20 pl-6 md:pl-10 py-2"
                >
                    <p>
                        Sei un punto di riferimento. Risolvi problemi. Indossi un'armatura invisibile
                        per non mostrare incertezze. E funziona.
                    </p>
                    <p className="text-text-warm font-medium">
                        Ma il costo di quella maschera è il peso del silenzio.
                    </p>
                </motion.div>
            </div>

        </section>
    );
}
