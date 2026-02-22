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
    tint: string; // overlay color
}

const WORLDS: World[] = [
    {
        id: 'fuorisede',
        image: '/images/world-fuorisede.png',
        label: 'Il Fuorisede',
        quote: 'Sono le 3 del mattino. Il telefono è pieno di contatti, ma non c\'è nessuno da chiamare.',
        author: 'Studente, 22 anni',
        tint: 'rgba(10, 15, 40, 0.55)',
    },
    {
        id: 'founder',
        image: '/images/world-founder.png',
        label: 'Il Founder',
        quote: 'Oggi ho dovuto licenziare tre persone. Tutti mi guardano come se fossi di ghiaccio. Nessuno sa quanto tremo dentro.',
        author: 'Imprenditore, 34 anni',
        tint: 'rgba(30, 20, 10, 0.50)',
    },
    {
        id: 'invisibile',
        image: '/images/world-invisibile.png',
        label: 'L\'Invisibile',
        quote: 'Passo tra le persone come se non esistessi. Nessuno mi chiede mai come sto davvero.',
        author: 'Anonimo',
        tint: 'rgba(15, 15, 30, 0.55)',
    },
];

export default function ImmersiveJourney() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const panels = gsap.utils.toArray<HTMLElement>('.journey-panel');

        // Pin the container and scrub through panels
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: () => `+=${panels.length * 100}%`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });

        // Animate each panel in sequence
        panels.forEach((panel, i) => {
            if (i === 0) return; // First panel is already visible

            // Fade in the next panel
            tl.fromTo(
                panel,
                { opacity: 0, scale: 1.05 },
                { opacity: 1, scale: 1, duration: 1 },
                i - 0.3
            );

            // Animate the text elements
            const quote = panel.querySelector('.journey-quote');
            const meta = panel.querySelector('.journey-meta');
            if (quote) {
                tl.fromTo(
                    quote,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6 },
                    i
                );
            }
            if (meta) {
                tl.fromTo(
                    meta,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4 },
                    i + 0.2
                );
            }
        });

        // Animate first panel's text
        const firstQuote = panels[0]?.querySelector('.journey-quote');
        const firstMeta = panels[0]?.querySelector('.journey-meta');
        if (firstQuote) {
            tl.fromTo(
                firstQuote,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6 },
                0
            );
        }
        if (firstMeta) {
            tl.fromTo(
                firstMeta,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4 },
                0.2
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === containerRef.current) st.kill();
            });
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
            {/* Section label */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 z-30 text-xs font-display font-bold text-amber uppercase tracking-[0.3em]"
            >
                Mondi diversi, stesso vuoto
            </motion.p>

            {/* Golden portal vignette — always visible */}
            <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(212,168,64,0.08) 70%, rgba(212,168,64,0.15) 100%)',
                }}
            />

            {/* World panels — stacked */}
            {WORLDS.map((world, i) => (
                <div
                    key={world.id}
                    className={`journey-panel absolute inset-0 w-full h-full ${i === 0 ? '' : 'opacity-0'}`}
                    style={{ zIndex: 10 + i }}
                >
                    {/* Background image */}
                    <img
                        src={world.image}
                        alt={world.label}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Color overlay */}
                    <div
                        className="absolute inset-0"
                        style={{ backgroundColor: world.tint }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="max-w-2xl mx-auto px-8 text-center">
                            {/* Label */}
                            <p className="text-xs font-display font-bold text-amber/70 uppercase tracking-[0.25em] mb-6">
                                {world.label}
                            </p>

                            {/* Quote */}
                            <p className="journey-quote text-xl md:text-2xl lg:text-3xl font-display font-light text-white leading-relaxed mb-8 italic">
                                "{world.quote}"
                            </p>

                            {/* Author */}
                            <p className="journey-meta text-sm text-white/50 font-display tracking-wide">
                                — {world.author}
                            </p>
                        </div>
                    </div>

                    {/* Bottom golden glow — portal hint */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber/10 to-transparent z-10 pointer-events-none" />
                </div>
            ))}

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
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
