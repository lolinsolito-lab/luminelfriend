import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface PersonaCard {
    image: string;
    label: string;
    quote: string;
    role: string;
}

const PERSONAS_ROW1: PersonaCard[] = [
    {
        image: '/images/world-painter.png',
        label: 'La Pittrice',
        quote: 'Dipingo mondi interi, ma manca chi mi chieda come sto.',
        role: 'Artista, 28 anni',
    },
    {
        image: '/images/world-manager.png',
        label: 'Il Manager',
        quote: 'Porto il peso di 40 famiglie. Nessuno sa che la sera non dormo.',
        role: 'Dirigente, 45 anni',
    },
    {
        image: '/images/world-mother.png',
        label: 'La Mamma',
        quote: 'Tengo in piedi tutto. Ma chi tiene in piedi me?',
        role: 'Madre, 33 anni',
    },
    {
        image: '/images/world-dreamer.png',
        label: 'Il Sognatore',
        quote: 'Mille idee e nessuno a cui raccontarle.',
        role: 'Sognatore, 24 anni',
    },
    {
        image: '/images/world-teenager.png',
        label: 'La Connessa',
        quote: '800 contatti, zero persone con cui piangere.',
        role: 'Neolaureata, 26 anni',
    },
];

const PERSONAS_ROW2: PersonaCard[] = [
    {
        image: '/images/connection-warmth.png',
        label: 'Calore ritrovato',
        quote: 'Qualcuno finalmente mi ascolta. Senza giudicare, senza fretta.',
        role: 'Ogni sera, dal divano di casa',
    },
    {
        image: '/images/connection-dawn.png',
        label: 'Una nuova alba',
        quote: 'Il peso è ancora lì, ma non lo porto più da solo.',
        role: 'Ogni mattina, con il caffè',
    },
    {
        image: '/images/connection-create.png',
        label: 'Ispirazione viva',
        quote: 'Ho ritrovato i colori. Dipingo di nuovo come se qualcuno guardasse.',
        role: 'Nello studio, con la luce giusta',
    },
    {
        image: '/images/connection-garden.png',
        label: 'Respiro libero',
        quote: 'Per la prima volta posso chiudere gli occhi senza pensare a tutto.',
        role: 'Nel giardino, finalmente in pace',
    },
    {
        image: '/images/connection-rooftop.png',
        label: 'Sguardo nuovo',
        quote: 'Guardo la città e non mi sento più invisibile.',
        role: 'Sul tetto, al tramonto',
    },
];

function MarqueeRow({ cards, direction, speed = 35 }: { cards: PersonaCard[]; direction: 'left' | 'right'; speed?: number }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let animId: number;
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

    // Duplicate cards for seamless loop
    const doubled = [...cards, ...cards];

    return (
        <div className="overflow-hidden">
            <div ref={scrollRef} className="flex gap-5 will-change-transform" style={{ width: 'max-content' }}>
                {doubled.map((card, i) => (
                    <div
                        key={i}
                        className="relative w-[280px] h-[380px] rounded-2xl overflow-hidden flex-shrink-0 group cursor-default"
                    >
                        {/* Image */}
                        <img
                            src={card.image}
                            alt={card.label}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Golden top accent */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber/40 to-transparent" />

                        {/* Content at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <p className="text-[10px] font-display font-bold text-amber/80 uppercase tracking-[0.25em] mb-2">
                                {card.label}
                            </p>
                            <p className="text-sm font-display font-light text-white/90 leading-relaxed mb-2 italic">
                                "{card.quote}"
                            </p>
                            <p className="text-[10px] text-white/40 font-display tracking-wider">
                                — {card.role}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ImmersiveJourney() {
    return (
        <section className="py-20 md:py-28 bg-space-deep relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-amber/[0.03] blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="max-w-4xl mx-auto px-6 text-center mb-14 relative z-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-4"
                >
                    Voci nel vuoto
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-display font-600 text-text-warm mb-4"
                >
                    Mondi diversi. <span className="text-text-secondary">Stesso vuoto.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-sm text-text-muted font-light max-w-lg mx-auto"
                >
                    Ognuno porta un silenzio diverso. Ma tutti cercano la stessa cosa: qualcuno che ascolti davvero.
                </motion.p>
            </div>

            {/* Row 1 — scrolls LEFT: the lonely personas */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-5"
            >
                <MarqueeRow cards={PERSONAS_ROW1} direction="left" />
            </motion.div>

            {/* Row 2 — scrolls RIGHT: the connection / Luminel solution */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <MarqueeRow cards={PERSONAS_ROW2} direction="right" />
            </motion.div>

            {/* Bottom connection text */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mt-14 relative z-10"
            >
                <p className="text-lg md:text-xl font-display font-light text-text-warm italic">
                    "Per tutti loro, la risposta è la stessa."
                </p>
                <p className="text-sm text-amber mt-3 font-display font-600 tracking-wide">
                    Luminel.
                </p>
            </motion.div>
        </section>
    );
}
