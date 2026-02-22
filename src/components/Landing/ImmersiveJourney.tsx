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
        id: 'fuorisede',
        image: '/images/world-fuorisede.png',
        label: 'Il Fuorisede',
        quote: 'Sono le 3 del mattino. Il telefono è pieno di contatti, ma non c\'è nessuno da chiamare.',
        author: 'Studente, 22 anni',
        tint: 'rgba(10, 15, 40, 0.60)',
    },
    {
        id: 'founder',
        image: '/images/world-founder.png',
        label: 'Il Founder',
        quote: 'Oggi ho dovuto licenziare tre persone. Tutti mi guardano come se fossi di ghiaccio. Nessuno sa quanto tremo dentro.',
        author: 'Imprenditore, 34 anni',
        tint: 'rgba(30, 20, 10, 0.55)',
    },
    {
        id: 'invisibile',
        image: '/images/world-invisibile.png',
        label: 'L\'Invisibile',
        quote: 'Passo tra le persone come se non esistessi. Nessuno mi chiede mai come sto davvero.',
        author: 'Anonimo',
        tint: 'rgba(15, 15, 30, 0.60)',
    },
];

export default function ImmersiveJourney() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const panels = gsap.utils.toArray<HTMLElement>('.journey-panel');
        const texts = gsap.utils.toArray<HTMLElement>('.journey-text');

        // Total scroll distance — tighter = less empty space
        const scrollLength = panels.length * 80; // 80vh per panel instead of 100

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: `+=${scrollLength}vh`,
                scrub: 0.8,
                pin: true,
                anticipatePin: 1,
            },
        });

        // First panel text appears immediately
        if (texts[0]) {
            tl.fromTo(texts[0],
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.3 },
                0
            );
        }

        // For each subsequent panel, crossfade tightly
        panels.forEach((panel, i) => {
            if (i === 0) return;

            const prevText = texts[i - 1];
            const currText = texts[i];
            const timePoint = i * 0.8; // Tighter timeline spacing

            // Fade out previous text
            if (prevText) {
                tl.to(prevText,
                    { opacity: 0, y: -20, duration: 0.2 },
                    timePoint - 0.3
                );
            }

            // Crossfade panel (fade in new, slightly zoom)
            tl.fromTo(panel,
                { opacity: 0 },
                { opacity: 1, duration: 0.5 },
                timePoint - 0.15
            );

            // Fade in new text
            if (currText) {
                tl.fromTo(currText,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.3 },
                    timePoint + 0.1
                );
            }
        });

        // Fade out last text at the end
        const lastText = texts[texts.length - 1];
        if (lastText) {
            tl.to(lastText,
                { opacity: 0, y: -20, duration: 0.3 },
                panels.length * 0.8
            );
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
                className="absolute top-8 left-1/2 -translate-x-1/2 z-40 text-xs font-display font-bold text-amber uppercase tracking-[0.3em]"
            >
                Mondi diversi, stesso vuoto
            </motion.p>

            {/* Golden portal vignette */}
            <div
                className="absolute inset-0 z-30 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(212,168,64,0.06) 60%, rgba(212,168,64,0.12) 100%)',
                }}
            />

            {/* Film grain overlay — masks pixelation */}
            <div
                className="absolute inset-0 z-30 pointer-events-none opacity-[0.08] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />

            {/* World panels — stacked absolutely */}
            {WORLDS.map((world, i) => (
                <div
                    key={world.id}
                    className={`journey-panel absolute inset-0 w-full h-full ${i === 0 ? '' : 'opacity-0'}`}
                    style={{ zIndex: 10 + i }}
                >
                    {/* Background image — with quality enhancements */}
                    <div className="absolute inset-0">
                        <img
                            src={world.image}
                            alt={world.label}
                            className="w-full h-full object-cover"
                            style={{
                                imageRendering: 'auto',
                                filter: 'blur(0.5px) contrast(1.05) saturate(0.9)',
                            }}
                        />
                    </div>

                    {/* Dark color overlay */}
                    <div
                        className="absolute inset-0"
                        style={{ backgroundColor: world.tint }}
                    />

                    {/* Soft vignette edges */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
                        }}
                    />

                    {/* Content — separate div with journey-text class for animation */}
                    <div className="journey-text absolute inset-0 flex items-center justify-center z-20 opacity-0">
                        <div className="max-w-2xl mx-auto px-8 text-center">
                            <p className="text-xs font-display font-bold text-amber/80 uppercase tracking-[0.25em] mb-6">
                                {world.label}
                            </p>
                            <p className="text-xl md:text-2xl lg:text-3xl font-display font-light text-white/90 leading-relaxed mb-8 italic">
                                "{world.quote}"
                            </p>
                            <p className="text-sm text-white/40 font-display tracking-wide">
                                — {world.author}
                            </p>
                        </div>
                    </div>

                    {/* Bottom golden glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber/8 to-transparent z-20 pointer-events-none" />
                </div>
            ))}

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1.5"
                >
                    <div className="w-1 h-2 rounded-full bg-amber" />
                </motion.div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-display">Scorri</p>
            </div>
        </div>
    );
}
