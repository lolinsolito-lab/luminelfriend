import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PathCard {
    image: string;
    preLabel: string;
    boldLabel: string;
}

const PATHS: PathCard[] = [
    {
        image: '/images/world-painter.png',
        preLabel: 'Cerco',
        boldLabel: 'ISPIRAZIONE',
    },
    {
        image: '/images/world-teenager.png',
        preLabel: 'Cerco',
        boldLabel: 'CONNESSIONE',
    },
    {
        image: '/images/world-manager.png',
        preLabel: 'Porto il peso della',
        boldLabel: 'LEADERSHIP',
    },
    {
        image: '/images/world-mother.png',
        preLabel: 'Ho bisogno di',
        boldLabel: 'RESPIRO',
    },
    {
        image: '/images/world-dreamer.png',
        preLabel: 'Sto cercando',
        boldLabel: 'DIREZIONE',
    },
    {
        image: '/images/connection-warmth.png',
        preLabel: 'Cerco',
        boldLabel: 'CALORE',
    },
    {
        image: '/images/connection-dawn.png',
        preLabel: 'Sto attraversando una',
        boldLabel: 'RINASCITA',
    },
];

export default function PainSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const amount = 320;
        scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
        setTimeout(checkScroll, 400);
    };

    return (
        <section className="py-24 md:py-32 px-6 bg-space-deep relative overflow-hidden border-y border-white/[0.04]">
            {/* Ambient glow */}
            <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-amber/[0.03] blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header — left aligned like Mindvalley */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <p className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-3">
                        Lo specchio
                    </p>
                    <h2 className="text-3xl md:text-4xl font-display font-600 text-text-warm leading-tight mb-4">
                        Ognuno porta il suo silenzio.<br />
                        <span className="text-text-secondary">Qual è il tuo?</span>
                    </h2>
                    <p className="text-sm text-text-muted font-light max-w-lg">
                        Racconta i tuoi bisogni, e Luminel diventa il compagno che hai sempre cercato.
                    </p>
                </motion.div>

                {/* Horizontal Carousel */}
                <div className="relative">
                    {/* Cards container */}
                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {PATHS.map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="relative w-[220px] md:w-[260px] h-[340px] md:h-[400px] rounded-2xl overflow-hidden flex-shrink-0 snap-center group cursor-pointer"
                            >
                                {/* Image */}
                                <img
                                    src={card.image}
                                    alt={card.boldLabel}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Gradient overlay — stronger at bottom */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                {/* Hover brightening */}
                                <div className="absolute inset-0 bg-amber/0 group-hover:bg-amber/[0.05] transition-colors duration-500" />

                                {/* Text at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <p className="text-[11px] text-white/60 font-display tracking-wide mb-1">
                                        {card.preLabel}
                                    </p>
                                    <p className="text-xl md:text-2xl font-display font-bold text-white uppercase tracking-wider leading-tight">
                                        {card.boldLabel}
                                    </p>
                                </div>

                                {/* Golden top accent */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Navigation arrows */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={() => scroll('left')}
                            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${canScrollLeft
                                ? 'border-amber/30 text-amber hover:bg-amber/10'
                                : 'border-white/5 text-text-muted/30 cursor-not-allowed'
                                }`}
                            disabled={!canScrollLeft}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-6 py-2.5 bg-gradient-to-r from-amber to-amber-dim text-white font-display font-bold text-xs uppercase tracking-[0.15em] rounded-full shadow-lg"
                        >
                            Inizia il tuo percorso →
                        </motion.button>

                        <button
                            onClick={() => scroll('right')}
                            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${canScrollRight
                                ? 'border-amber/30 text-amber hover:bg-amber/10'
                                : 'border-white/5 text-text-muted/30 cursor-not-allowed'
                                }`}
                            disabled={!canScrollRight}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
