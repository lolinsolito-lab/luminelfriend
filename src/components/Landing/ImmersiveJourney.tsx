import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface World {
    id: string;
    image: string;
    label: string;
    quote: string;
    author: string;
    tint: string;
}

const WORLDS: World[] = [
    {
        id: 'painter',
        image: '/images/world-painter.png',
        label: 'La Pittrice',
        quote: 'Dipingo mondi interi, ma nella mia vita manca un colore: qualcuno che mi chieda come sto.',
        author: 'Artista, 28 anni',
        tint: 'rgba(20, 15, 5, 0.50)',
    },
    {
        id: 'connessa',
        image: '/images/world-teenager.png',
        label: 'La Connessa',
        quote: '800 contatti, 200 like, zero persone con cui piangere. Il telefono è pieno ma il cuore è vuoto.',
        author: 'Neolaureata, 26 anni',
        tint: 'rgba(10, 10, 25, 0.55)',
    },
    {
        id: 'manager',
        image: '/images/world-manager.png',
        label: 'Il Manager',
        quote: 'Porto il peso di 40 famiglie sulle spalle. Nessuno sa che la sera non riesco a dormire.',
        author: 'Dirigente, 45 anni',
        tint: 'rgba(15, 12, 20, 0.50)',
    },
    {
        id: 'mother',
        image: '/images/world-mother.png',
        label: 'La Mamma',
        quote: 'Mi sveglio alle 5 per avere 20 minuti di silenzio. Sono io che tengo in piedi tutto, ma chi tiene in piedi me?',
        author: 'Madre, 33 anni',
        tint: 'rgba(20, 15, 10, 0.45)',
    },
    {
        id: 'dreamer',
        image: '/images/world-dreamer.png',
        label: 'Il Sognatore',
        quote: 'Ho mille idee e nessuno a cui raccontarle. Le scrivo, le cancello, le riscrivo. Ma a chi parlo?',
        author: 'Sognatore, 24 anni',
        tint: 'rgba(10, 15, 25, 0.50)',
    },
];

export default function ImmersiveJourney() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const panels = gsap.utils.toArray<HTMLElement>('.journey-panel');
        const texts = gsap.utils.toArray<HTMLElement>('.journey-text');

        // Tighter scroll: 60vh per panel for 5 panels = 300vh total
        const scrollLength = panels.length * 60;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: `+=${scrollLength}vh`,
                scrub: 0.6,
                pin: true,
                anticipatePin: 1,
            },
        });

        // First panel text fades in
        if (texts[0]) {
            tl.fromTo(texts[0],
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.25 },
                0
            );
        }

        // Crossfade each subsequent panel tightly
        panels.forEach((panel, i) => {
            if (i === 0) return;

            const prevText = texts[i - 1];
            const currText = texts[i];
            const t = i * 0.6; // Tight spacing

            // Fade out prev text
            if (prevText) {
                tl.to(prevText, { opacity: 0, y: -15, duration: 0.15 }, t - 0.2);
            }

            // Crossfade to new panel
            tl.fromTo(panel,
                { opacity: 0 },
                { opacity: 1, duration: 0.35 },
                t - 0.1
            );

            // Fade in new text
            if (currText) {
                tl.fromTo(currText,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.25 },
                    t + 0.05
                );
            }
        });

        // Fade out last text
        const lastText = texts[texts.length - 1];
        if (lastText) {
            tl.to(lastText, { opacity: 0, y: -15, duration: 0.2 }, panels.length * 0.6);
        }

        return () => {
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === containerRef.current) st.kill();
            });
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0a0a14]">
            {/* Section header */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 z-40 text-[10px] font-display font-bold text-amber/80 uppercase tracking-[0.35em]"
            >
                Voci nel vuoto
            </motion.p>

            {/* Golden portal vignette */}
            <div
                className="absolute inset-0 z-30 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 35%, rgba(212,168,64,0.05) 65%, rgba(212,168,64,0.10) 100%)',
                }}
            />

            {/* Film grain overlay — masks any pixelation */}
            <div
                className="absolute inset-0 z-30 pointer-events-none opacity-[0.06] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '150px 150px',
                }}
            />

            {/* World panels */}
            {WORLDS.map((world, i) => (
                <div
                    key={world.id}
                    className={`journey-panel absolute inset-0 w-full h-full ${i === 0 ? '' : 'opacity-0'}`}
                    style={{ zIndex: 10 + i }}
                >
                    {/* Background image */}
                    <div className="absolute inset-0">
                        <img
                            src={world.image}
                            alt={world.label}
                            className="w-full h-full object-cover"
                            style={{
                                filter: 'blur(0.3px) contrast(1.08) saturate(0.85)',
                            }}
                        />
                    </div>

                    {/* Color overlay */}
                    <div className="absolute inset-0" style={{ backgroundColor: world.tint }} />

                    {/* Dark vignette */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.5) 100%)' }}
                    />

                    {/* Text content */}
                    <div className="journey-text absolute inset-0 flex items-center justify-center z-20 opacity-0">
                        <div className="max-w-xl mx-auto px-8 text-center">
                            <p className="text-[10px] font-display font-bold text-amber/70 uppercase tracking-[0.3em] mb-5">
                                {world.label}
                            </p>
                            <p className="text-lg md:text-xl lg:text-2xl font-display font-light text-white/90 leading-relaxed mb-6 italic">
                                "{world.quote}"
                            </p>
                            <p className="text-xs text-white/35 font-display tracking-wider">
                                — {world.author}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber/[0.06] to-transparent z-30 pointer-events-none" />

            {/* Scroll indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5">
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-7 rounded-full border border-white/25 flex items-start justify-center p-1"
                >
                    <div className="w-0.5 h-1.5 rounded-full bg-amber/80" />
                </motion.div>
                <p className="text-[9px] text-white/30 uppercase tracking-widest font-display">Scorri</p>
            </div>
        </div>
    );
}
