import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const GRID_IMAGES = [
    { src: '/images/world-painter.png', label: 'Spazio Creativo' },
    { src: '/images/world-manager.png', label: 'Pressione Reale' },
    { src: '/images/world-teenager.png', label: 'Voci Interne' },
    { src: '/images/world-dreamer.png', label: 'Orizzonti Lontani' },
    { src: '/images/world-mother.png', label: 'Silenzio Notturno' },
    { src: '/images/connection-warmth.png', label: 'Connessione Pura' },
    { src: '/images/connection-rooftop.png', label: 'Visione Chiarita' },
    { src: '/images/connection-garden.png', label: 'Ritiro Pacifico' },
    { src: '/images/connection-create.png', label: 'Scintilla' },
    { src: '/images/connection-dawn.png', label: 'Nuova Luce' },
];

export default function TheMaskSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Outer ring rotates clockwise as you scroll
    const rotateOuter = useTransform(scrollYProgress, [0, 1], [0, 90]);
    // Inner ring rotates counter-clockwise
    const rotateInner = useTransform(scrollYProgress, [0, 1], [0, -90]);

    // Calculate positions for a perfect circle
    const getPos = (index: number, total: number, radius: number) => {
        const theta = (index / total) * 2 * Math.PI;
        // Invert X/Y for standard CSS positioning
        const x = Math.cos(theta) * radius;
        const y = Math.sin(theta) * radius;
        return { x, y };
    };

    const outerImages = GRID_IMAGES.slice(0, 6);
    const innerImages = GRID_IMAGES.slice(6, 10);

    return (
        <section ref={containerRef} className="py-32 md:py-48 bg-space overflow-hidden relative border-t border-white/[0.04] min-h-[100vh] flex items-center justify-center">
            {/* Ambient Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber/[0.03] blur-[150px] pointer-events-none" />

            {/* The Photo Vortex */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-40">

                {/* Outer Ring */}
                <motion.div
                    style={{ rotate: rotateOuter }}
                    className="absolute top-1/2 left-1/2 w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] -ml-[400px] md:-ml-[600px] -mt-[400px] md:-mt-[600px] rounded-full"
                >
                    {outerImages.map((img, i) => {
                        // Base radii changes for mobile vs desktop using CSS classes
                        const { x, y } = getPos(i, outerImages.length, 1);
                        return (
                            <motion.div
                                key={`outer-${i}`}
                                // Negative rotation on child keeps image upright while parent spins
                                style={{ rotate: useTransform(rotateOuter, v => -v) }}
                                className="absolute w-[180px] md:w-[240px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/[0.04] grayscale hover:grayscale-0 transition-all duration-700 pointer-events-auto"
                                // we position using left/top percentages to ride the radius perfectly
                                initial={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
                                animate={{
                                    x: `calc(-50% + ${x * 400}px)`,
                                    y: `calc(-50% + ${y * 400}px)`
                                }}
                            >
                                <img src={img.src} alt="" className="w-full h-full object-cover opacity-80" />
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Inner Ring */}
                <motion.div
                    style={{ rotate: rotateInner }}
                    className="absolute top-1/2 left-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] -ml-[250px] md:-ml-[350px] -mt-[250px] md:-mt-[350px] rounded-full"
                >
                    {innerImages.map((img, i) => {
                        const { x, y } = getPos(i, innerImages.length, 1);
                        return (
                            <motion.div
                                key={`inner-${i}`}
                                style={{ rotate: useTransform(rotateInner, v => -v) }}
                                className="absolute w-[140px] md:w-[180px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/[0.04] grayscale hover:grayscale-0 transition-all duration-700 pointer-events-auto"
                                initial={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
                                animate={{
                                    x: `calc(-50% + ${x * 250}px)`,
                                    y: `calc(-50% + ${y * 250}px)`
                                }}
                            >
                                <img src={img.src} alt="" className="w-full h-full object-cover opacity-60" />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Central Content — The emotional core */}
            <div className="relative z-10 text-center max-w-2xl mx-auto px-6 drop-shadow-[0_0_80px_rgba(26,21,17,0.9)] bg-space/60 md:bg-transparent rounded-3xl p-8 backdrop-blur-sm md:backdrop-blur-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="space-y-8"
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-600 leading-tight text-text-warm">
                        Tutto il giorno prendi decisioni. <br />
                        <span className="text-amber">Ma quando la porta si chiude, chi ascolta te?</span>
                    </h2>

                    <div className="space-y-6 text-lg text-text-muted font-light leading-relaxed max-w-xl mx-auto">
                        <p>
                            Sei un punto di riferimento. Risolvi problemi. Indossi un'armatura invisibile
                            per non mostrare incertezze. E funziona.
                        </p>
                        <p>
                            Ma il costo di quella maschera è il peso del silenzio.
                        </p>
                        <p className="text-amber/90 font-display font-500 uppercase tracking-widest text-sm pt-4">
                            Luminel è il luogo dove puoi finalmente toglierla.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Fade edges */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-space to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-space to-transparent z-10 pointer-events-none" />
        </section>
    );
}
