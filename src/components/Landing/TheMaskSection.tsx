import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';

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

function InfiniteRow({ images, direction, speed = 40 }: { images: typeof GRID_IMAGES, direction: 'left' | 'right', speed?: number }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let animId: number;
        // Start from 0 or negative half depending on direction
        let pos = direction === 'left' ? 0 : -el.scrollWidth / 2;

        const step = () => {
            if (direction === 'left') {
                pos -= 0.5;
                if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0;
            } else {
                pos += 0.5;
                if (pos >= 0) pos = -el.scrollWidth / 2;
            }
            el.style.transform = `translateX(${pos}px)`;
            animId = requestAnimationFrame(step);
        };

        animId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animId);
    }, [direction, speed]);

    // Duplicate array for seamless looping
    const doubled = [...images, ...images];

    return (
        <div className="overflow-hidden w-full relative mb-4">
            <div ref={scrollRef} className="flex gap-4 will-change-transform" style={{ width: 'max-content' }}>
                {doubled.map((img, i) => (
                    <div
                        key={i}
                        className="relative w-[180px] md:w-[220px] aspect-square rounded-2xl overflow-hidden flex-shrink-0 group shadow-lg shadow-black/20"
                    >
                        <img
                            src={img.src}
                            alt={img.label}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                        {/* Title overlay */}
                        <div className="absolute bottom-3 left-0 right-0 text-center px-4">
                            <h3 className="text-white font-display font-bold text-sm tracking-wide leading-tight">
                                {img.label.split(' ').map((word, wIdx) => (
                                    <span key={wIdx} className="block">{word}</span>
                                ))}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function TheMaskSection() {
    // Slice images to create 3 different rows
    const row1 = GRID_IMAGES.slice(0, 5);
    const row2 = GRID_IMAGES.slice(5, 10);
    const row3 = [...GRID_IMAGES.slice(2, 5), ...GRID_IMAGES.slice(7, 9)];

    return (
        <section className="py-24 md:py-32 bg-space overflow-hidden relative border-t border-white/[0.04]">
            {/* Ambient Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-amber/[0.03] blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto space-y-6"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-600 leading-tight text-text-warm">
                        Tutto il giorno prendi decisioni. <br className="hidden md:block" />
                        <span className="text-text-secondary">Ma quando la porta si chiude, chi ascolta te?</span>
                    </h2>
                    <p className="text-lg text-text-muted font-light leading-relaxed">
                        Sei un punto di riferimento. Risolvi problemi. Indossi un'armatura invisibile
                        per non mostrare incertezze. Luminel è il luogo dove puoi finalmente toglierla,
                        per esplorare ogni frammento della tua mente con la spinta di un tasto.
                    </p>
                </motion.div>
            </div>

            {/* Immersive Background Grid with Phone Overlaid */}
            <div className="relative w-full overflow-hidden flex flex-col items-center justify-center py-10">

                {/* Scrolling Grid Background */}
                <div className="w-full relative z-0 opacity-40 hover:opacity-100 transition-opacity duration-1000">
                    <InfiniteRow images={row1} direction="left" />
                    <InfiniteRow images={row2} direction="right" />
                    <InfiniteRow images={row3} direction="left" />
                </div>

                {/* Central Floating Phone Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, type: "spring" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                >
                    <div className="relative">
                        {/* Massive drop shadow so it pops from the grid */}
                        <div className="absolute inset-0 bg-black/80 blur-3xl rounded-[3rem]" />

                        <img
                            src="/images/device-mobile.png"
                            alt="Luminel Mobile App"
                            className="w-[280px] md:w-[320px] h-auto object-contain relative z-10 drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                        />
                    </div>
                </motion.div>

                {/* Top/Bottom Fade Edges for the row section */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-space to-transparent z-10" />
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-space to-transparent z-10" />
            </div>
        </section>
    );
}
