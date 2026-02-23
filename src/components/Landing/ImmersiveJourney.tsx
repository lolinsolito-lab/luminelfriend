import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface PersonaCard {
    image: string;
    label: string;
    quote: string;
}

const PERSONAS_ROW1: PersonaCard[] = [
    {
        image: '/images/world-painter.png',
        label: 'La Pittrice',
        quote: 'Dipingo mondi interi, ma manca chi mi chieda come sto.',
    },
    {
        image: '/images/world-manager.png',
        label: 'Il Manager',
        quote: 'Porto il peso di 40 famiglie. Nessuno sa che la sera non dormo.',
    },
    {
        image: '/images/world-mother.png',
        label: 'La Mamma',
        quote: 'Tengo in piedi tutto. Ma chi tiene in piedi me?',
    },
    {
        image: '/images/world-dreamer.png',
        label: 'Il Sognatore',
        quote: 'Mille idee e nessuno a cui raccontarle.',
    },
    {
        image: '/images/world-teenager.png',
        label: 'La Connessa',
        quote: '800 contatti, zero persone con cui piangere.',
    },
];

const PERSONAS_ROW2: PersonaCard[] = [
    {
        image: '/images/connection-warmth.png',
        label: 'Calore ritrovato',
        quote: 'Qualcuno finalmente mi ascolta. Senza giudicare, senza fretta.',
    },
    {
        image: '/images/connection-dawn.png',
        label: 'Una nuova alba',
        quote: 'Il peso è ancora lì, ma non lo porto più da solo.',
    },
    {
        image: '/images/connection-create.png',
        label: 'Ispirazione viva',
        quote: 'Ho ritrovato i colori. Dipingo di nuovo come se qualcuno guardasse.',
    },
    {
        image: '/images/connection-garden.png',
        label: 'Respiro libero',
        quote: 'Per la prima volta posso chiudere gli occhi senza pensare a tutto.',
    },
    {
        image: '/images/connection-rooftop.png',
        label: 'Sguardo nuovo',
        quote: 'Guardo la città e non mi sento più invisibile.',
    },
];

function MarqueeRow({ cards, direction, speed = 0.5 }: { cards: PersonaCard[]; direction: 'left' | 'right'; speed?: number }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let animId: number;
        let pos = direction === 'left' ? 0 : -el.scrollWidth / 2;

        const step = () => {
            if (direction === 'left') {
                pos -= speed;
                if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0;
            } else {
                pos += speed;
                if (pos >= 0) pos = -el.scrollWidth / 2;
            }
            el.style.transform = `translateX(${pos}px)`;
            animId = requestAnimationFrame(step);
        };

        animId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animId);
    }, [direction, speed]);

    // Duplicate cards for seamless loop
    const doubled = [...cards, ...cards, ...cards];

    return (
        <div className="overflow-hidden">
            <div ref={scrollRef} className="flex gap-4 md:gap-6 will-change-transform" style={{ width: 'max-content' }}>
                {doubled.map((card, i) => (
                    <div
                        key={i}
                        className="relative w-[180px] md:w-[240px] aspect-square rounded-2xl md:rounded-3xl overflow-hidden flex-shrink-0 shadow-[0_10px_20px_rgba(0,0,0,0.05)] border border-black/5 opacity-80 hover:opacity-100 grayscale-[30%] hover:grayscale-0 transition-all duration-700 cursor-default"
                    >
                        {/* Image */}
                        <img
                            src={card.image}
                            alt={card.label}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                        {/* Golden top accent */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

                        {/* Content at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 pointer-events-none">
                            <p className="text-[9px] md:text-[10px] font-display font-bold text-amber-400 uppercase tracking-[0.25em] mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                                {card.label}
                            </p>
                            <p className="text-xs md:text-sm font-display font-medium text-white/95 leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                                "{card.quote}"
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
        <section className="py-24 md:py-32 bg-[#FCFBF8] relative overflow-hidden border-b border-black/5">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-6 text-center z-10 relative mb-12 md:mb-16">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-[10px] md:text-[11px] font-bold text-[#C29532] uppercase tracking-[0.3em] mb-4"
                >
                    Voci nel vuoto
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-[#1A1A1A] mb-4 tracking-tight"
                >
                    Mondi diversi. <span className="text-[#8C7A5B]">Unica presenza.</span>
                </motion.h2>
            </div>

            {/* Central Phone + Background Marquees */}
            <div className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center">

                {/* Marquees Layer (Behind) */}
                <div className="absolute inset-0 z-0 flex flex-col justify-center gap-4 md:gap-6 overflow-hidden">
                    <MarqueeRow cards={PERSONAS_ROW1} direction="left" speed={0.4} />
                    <MarqueeRow cards={PERSONAS_ROW2} direction="right" speed={0.4} />

                    {/* Fade edges to blend with background seamlessly */}
                    <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#FCFBF8] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#FCFBF8] to-transparent z-10 pointer-events-none" />
                </div>

                {/* Central Phone Layer (Foreground) */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-20 w-[240px] h-[500px] md:w-[280px] md:h-[580px] rounded-[3rem] border-[6px] md:border-[8px] border-[#1A1A1A] bg-white overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15),0_0_60px_rgba(194,149,50,0.1)] flex flex-col hover:scale-[1.02] transition-transform duration-700 mx-auto group"
                >
                    {/* Phone Reflection Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/[0.02] to-transparent z-30 pointer-events-none" />

                    {/* Top Ambient Light Flare */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-500/10 blur-[40px] pointer-events-none" />

                    {/* Dynamic Island Mock */}
                    <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 w-20 md:w-24 h-6 md:h-7 bg-[#1A1A1A] rounded-full z-40 border border-white/10 shadow-inner" />

                    {/* Phone Inner Content */}
                    <div className="flex-1 flex flex-col items-center justify-end pb-20 md:pb-28 relative z-10">
                        {/* Central Glow / Icon */}
                        <div className="mb-6 relative">
                            {/* Inner ambient pulse */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-amber-400/20 blur-[20px] rounded-full pointer-events-none"
                            />
                            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-[#C29532] relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-700" strokeWidth={1.5} />
                        </div>

                        <p className="text-[10px] md:text-xs font-display text-[#1a1a1a] tracking-[0.25em] uppercase font-semibold mb-2 drop-shadow-sm">
                            Ascolto Attivo
                        </p>
                        <p className="text-[8px] md:text-[10px] text-gray-500 font-light tracking-widest uppercase">
                            Connesso a migliaia di silenzi
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
