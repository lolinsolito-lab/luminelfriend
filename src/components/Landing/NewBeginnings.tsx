import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';

interface AspirationCard {
    image: string;
    preLabel: string;
    boldLabel: string;
    description: string;
    modalContent: {
        title: string;
        body: string;
        bullets: string[];
    };
}

const ASPIRATIONS: AspirationCard[] = [
    {
        image: '/images/connection-rooftop.png',
        preLabel: "Voglio",
        boldLabel: "FAR CRESCERE L'AZIENDA",
        description: "Scale your business with absolute clarity and focus.",
        modalContent: {
            title: "La Visione dall'Alto",
            body: "Quando l'ansia scompare, resta la pura strategia. Luminel ti aiuta a scaricare il rumore di fondo, permettendoti di prendere decisioni aziendali con una lucidità spietata e una visione a lungo termine.",
            bullets: [
                "Decision-making senza interferenze emotive",
                "Gestione dello stress da leadership",
                "Focus assoluto sugli obiettivi aziendali"
            ]
        }
    },
    {
        image: '/images/connection-warmth.png',
        preLabel: "Cerco",
        boldLabel: "EQUILIBRIO E PACE",
        description: "Find harmony between your ambitions and your personal life.",
        modalContent: {
            title: "Il Calore del Rifugio",
            body: "Il successo esterno non deve costare il tuo benessere interno. Riconnettiti con la tua essenza e trova un equilibrio perfetto tra il ritmo frenetico del mondo e la tua pace interiore.",
            bullets: [
                "Distacco sano dai problemi lavorativi",
                "Presenza totale nei momenti personali",
                "Assenza di senso di colpa nel riposo"
            ]
        }
    },
    {
        image: '/images/hero_padronanza.png',
        preLabel: "Sto cercando",
        boldLabel: "PADRONANZA DI ME",
        description: "Achieve peak physical and mental performance every day.",
        modalContent: {
            title: "Padronanza Totale",
            body: "Riprendi il controllo del tuo corpo e della tua mente. Trasforma i pensieri dispersivi in una disciplina ferrea, dove tu sei l'unico artefice della tua energia quotidiana e delle tue abitudini.",
            bullets: [
                "Disciplina incrollabile",
                "Chiarezza mentale al risveglio",
                "Allineamento tra mente e corpo"
            ]
        }
    },
    {
        image: '/images/connection-dawn.png',
        preLabel: "Sto attraversando",
        boldLabel: "UNA TRANSIZIONE",
        description: "Navigate life changes with confidence and unwavering support.",
        modalContent: {
            title: "L'Alba del Cambiamento",
            body: "Ciò che sembra una fine è solo un nuovo inizio. Affronta i grandi bivi della vita sapendo di avere uno spazio sicuro dove elaborare i dubbi e pianificare la rinascita.",
            bullets: [
                "Gestione dell'incertezza",
                "Costruzione della nuova identità",
                "Pianificazione del futuro senza paura"
            ]
        }
    },
    {
        image: '/images/path-listen.png',
        preLabel: "Voglio ritrovare",
        boldLabel: "CONNESSIONI VERE",
        description: "Build deep, meaningful relationships in a disconnected world.",
        modalContent: {
            title: "Connessione Profonda",
            body: "In un mondo iper-connesso digitalmente, il vero lusso è l'intimità emotiva. Luminel ti allena all’ascolto vero di te stesso, aprendo le porte a relazioni umane autentiche e appaganti.",
            bullets: [
                "Empatia senza compromessi",
                "Vulnerabilità come forza",
                "Abbattimento delle maschere sociali"
            ]
        }
    },
    {
        image: '/images/connection-create.png',
        preLabel: "Cerco",
        boldLabel: "ISPIRAZIONE PURA",
        description: "Unlock your creative potential without limits.",
        modalContent: {
            title: "La Scintilla Creativa",
            body: "Quando liberi la mente dai pesi emotivi, la creatività fluisce in modo dirompente. Torna a creare per il puro piacere di farlo, senza la paura del giudizio esterno, ritrovando l'autenticità del tuo marchio.",
            bullets: [
                "Ritorno allo stato di flusso",
                "Esplorazione senza timore di fallire",
                "Ripristino dell'energia vitale"
            ]
        }
    }
];

export default function NewBeginnings() {
    const [activeIndex, setActiveIndex] = useState(2);
    const [selectedCard, setSelectedCard] = useState<AspirationCard | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePrevious = () => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : ASPIRATIONS.length - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev < ASPIRATIONS.length - 1 ? prev + 1 : 0));
    };

    const handleStartJourney = () => {
        document.getElementById('piani')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedCard) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedCard]);

    return (
        <section className="py-24 md:py-32 bg-[#FCFBF8] relative overflow-hidden border-b border-black/5">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-6 relative z-10 mb-16 md:mb-24 text-center md:text-left">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-[10px] md:text-[11px] font-bold text-[#1A1A1A]/50 uppercase tracking-[0.2em] mb-3"
                >
                    IL TUO NUOVO INIZIO
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-[#1A1A1A] mb-4 tracking-tight"
                >
                    L'Evoluzione del Silenzio
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-sm md:text-base text-[#1A1A1A]/60 font-light max-w-2xl leading-relaxed"
                >
                    Porta la tua azienda al vertice, coltiva relazioni autentiche e riprendi il controllo assoluto della tua mente.
                    <span className="font-medium text-[#1A1A1A]"> Affida a Luminel i tuoi obiettivi</span>, ed eleva la tua esistenza come mai hai fatto prima.
                </motion.p>
            </div>

            {/* Custom Carousel */}
            <div className="relative w-full overflow-visible mb-16" ref={containerRef}>
                <div className="flex justify-center items-center h-[450px] md:h-[550px] relative px-4 mx-auto w-full max-w-[1400px]">
                    <AnimatePresence initial={false} mode="popLayout">
                        {ASPIRATIONS.map((card, idx) => {
                            let offset = idx - activeIndex;
                            if (offset < -2) offset += ASPIRATIONS.length;
                            if (offset > 2) offset -= ASPIRATIONS.length;

                            const isActive = offset === 0;
                            const isVisible = Math.abs(offset) <= 2;

                            if (!isVisible) return null;

                            // Adjust constraints for mobile
                            const isMobile = window.innerWidth < 768;
                            const distanceMultiplier = isMobile ? 120 : 260; // Thighter on mobile
                            const xTranslate = offset * distanceMultiplier;
                            const scale = isActive ? 1.05 : 0.85;
                            const zIndex = 50 - Math.abs(offset);
                            const opacity = isActive ? 1 : 0.4;
                            const grayscale = isActive ? 0 : 40;

                            return (
                                <motion.div
                                    key={card.boldLabel}
                                    layout
                                    initial={{ opacity: 0, x: offset * 300 }}
                                    animate={{
                                        opacity,
                                        x: xTranslate,
                                        scale,
                                        zIndex,
                                        filter: `grayscale(${grayscale}%)`
                                    }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 25,
                                        mass: 1
                                    }}
                                    onClick={() => {
                                        if (isActive) {
                                            setSelectedCard(card);
                                        } else {
                                            setActiveIndex(idx);
                                        }
                                    }}
                                    className={`absolute w-[200px] md:w-[280px] h-[300px] md:h-[460px] rounded-[1.5rem] overflow-hidden ${isActive ? 'cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.2)] ring-4 ring-white' : 'cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:opacity-70 transition-opacity'}`}
                                >
                                    {/* Image */}
                                    <img
                                        src={card.image}
                                        alt={card.boldLabel}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Gradient matching reference (dark bottom gradient) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-90" />

                                    {/* Content */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col items-center justify-end text-center h-full">
                                        <motion.div
                                            animate={{ y: isActive ? 0 : 10 }}
                                            className="transform transition-transform w-full"
                                        >
                                            <p className="text-[9px] md:text-xs font-medium text-white/80 mb-1">
                                                {card.preLabel}
                                            </p>
                                            <h3 className={`font-display font-bold text-white leading-tight ${isActive ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'} uppercase tracking-tight`}>
                                                {card.boldLabel}
                                            </h3>

                                            {isActive && (
                                                <div className="mt-4 flex flex-col items-center">
                                                    <span className="text-[10px] md:text-xs bg-white text-black px-4 py-1.5 rounded-full font-bold uppercase tracking-wider mb-2 shadow-lg">
                                                        Scopri di più +
                                                    </span>
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Active card indicator glow */}
                                    {isActive && (
                                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#8C7A5B] to-transparent opacity-80" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 relative z-10 px-6">
                <button
                    onClick={handlePrevious}
                    className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-x-1 transition-all text-[#1A1A1A]"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <motion.button
                    onClick={handleStartJourney}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-[#C29532] text-white font-medium text-sm rounded-full shadow-[0_10px_20px_rgba(194,149,50,0.3)] hover:bg-[#A37B24] transition-colors flex items-center justify-center gap-2"
                >
                    <span>Inizia il percorso</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                </motion.button>

                <button
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center shadow-md hover:shadow-lg hover:translate-x-1 transition-all text-[#1A1A1A]"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#FCFBF8]/95 backdrop-blur-md"
                        onClick={() => setSelectedCard(null)}
                    >
                        <motion.div
                            initial={{ y: 50, scale: 0.95, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 20, scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-black/5 flex flex-col md:flex-row relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedCard(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors text-black"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Left Image */}
                            <div className="w-full md:w-5/12 h-[250px] md:h-auto relative">
                                <img
                                    src={selectedCard.image}
                                    alt={selectedCard.boldLabel}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="text-xs font-medium opacity-80">{selectedCard.preLabel}</p>
                                    <h3 className="text-3xl font-display font-bold uppercase leading-none">{selectedCard.boldLabel}</h3>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <h4 className="text-2xl font-display font-semibold text-[#1A1A1A]">
                                        {selectedCard.modalContent.title}
                                    </h4>
                                </div>

                                <p className="text-[#1A1A1A]/70 leading-relaxed mb-8">
                                    {selectedCard.modalContent.body}
                                </p>

                                <div className="space-y-4 mb-10">
                                    {selectedCard.modalContent.bullets.map((bullet, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#6A2DF2] mt-2.5 flex-shrink-0" />
                                            <p className="text-[#1A1A1A]/80 font-medium">{bullet}</p>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedCard(null);
                                        handleStartJourney();
                                    }}
                                    className="w-full md:w-auto self-start px-8 py-4 bg-[#1A1A1A] text-white font-medium text-sm rounded-full shadow-lg hover:bg-black transition-colors"
                                >
                                    Seleziona questo percorso
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
