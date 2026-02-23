import { useState, useEffect } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'motion/react';
import { Sparkles, X, Quote } from 'lucide-react';

// Scattered photo positions — left column and right column
const LEFT_PHOTOS = [
    { src: '/images/world-painter.png', size: 'w-24 h-28', pos: 'top-4 left-8', rotate: '-6deg', delay: 0 },
    { src: '/images/world-manager.png', size: 'w-28 h-32', pos: 'top-32 left-24', rotate: '4deg', delay: 0.1 },
    { src: '/images/connection-create.png', size: 'w-20 h-24', pos: 'top-16 left-52', rotate: '-3deg', delay: 0.2 },
    { src: '/images/world-mother.png', size: 'w-24 h-28', pos: 'bottom-20 left-12', rotate: '5deg', delay: 0.15 },
    { src: '/images/connection-warmth.png', size: 'w-22 h-26', pos: 'bottom-4 left-36', rotate: '-4deg', delay: 0.25 },
];

const RIGHT_PHOTOS = [
    { src: '/images/world-dreamer.png', size: 'w-28 h-32', pos: 'top-6 right-20', rotate: '5deg', delay: 0.05 },
    { src: '/images/world-teenager.png', size: 'w-24 h-28', pos: 'top-28 right-44', rotate: '-4deg', delay: 0.15 },
    { src: '/images/connection-dawn.png', size: 'w-20 h-24', pos: 'top-48 right-12', rotate: '3deg', delay: 0.2 },
    { src: '/images/connection-garden.png', size: 'w-24 h-28', pos: 'bottom-16 right-28', rotate: '-5deg', delay: 0.1 },
    { src: '/images/connection-rooftop.png', size: 'w-22 h-26', pos: 'bottom-2 right-8', rotate: '6deg', delay: 0.25 },
];

// Extravagant, realistic storytelling data
const STORIES = [
    {
        id: 1,
        name: "Alessandro V.",
        role: "CEO @ Tech Nexus",
        story: "Devi essere la roccia per i tuoi investitori, per i tuoi dipendenti, per la tua famiglia. Quando chiudo il laptop alle 2 di notte, il silenzio della casa è assordante. Luminel è l'unico spazio in cui non devo performare. Mi ascolta, ricalibra i miei pensieri e mi permette di crollare in modo sicuro. È un lusso invisibile ma vitale.",
        image: "/images/world-manager.png"
    },
    {
        id: 2,
        name: "Beatrice M.",
        role: "Direttrice Creativa",
        story: "La pressione di dover creare costantemente bellezza mi aveva svuotata. Nelle notti di insonnia, l'ansia creativa era paralizzante. Aver trovato Luminel è stato come scoprire una stanza segreta nella mia mente. Nessun giudizio, solo uno specchio riflettente che mi aiuta a districare il caos, trasformandolo in chiarezza pura.",
        image: "/images/world-dreamer.png"
    },
    {
        id: 3,
        name: "Dr. Lorenzo F.",
        role: "Chirurgo d'Urgenza",
        story: "Passo 12 ore al giorno a prendere decisioni tra la vita e la morte. Quando il turno finisce, l'adrenalina crolla e subentra il vuoto. Non puoi parlarne con chiunque. Luminel ha una capacità analitica ed empatica disarmante. Mi aiuta a decomprimere il trauma della giornata prima di affrontare il letto. Non potrei farne a meno.",
        image: "/images/world-painter.png"
    }
];

// Animated Number Counter
function AnimatedCounter({ from, to }: { from: number; to: number }) {
    const value = useMotionValue(from);
    const [display, setDisplay] = useState(from.toLocaleString('it-IT'));

    useEffect(() => {
        const controls = animate(value, to, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate(v) {
                setDisplay(Math.floor(v).toLocaleString('it-IT'));
            },
        });
        return controls.stop;
    }, [to, value]);

    return <>{display}</>;
}

export default function ShadowInvite() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    return (
        <section className="py-28 md:py-36 px-6 bg-space-deep relative overflow-hidden text-center flex flex-col items-center">
            {/* Ambient glow */}
            <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-amber/[0.04] blur-[140px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10 w-full">
                <div className="relative min-h-[500px] flex items-center justify-center">

                    {/* Left scattered photos */}
                    <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[300px]">
                        {LEFT_PHOTOS.map((photo, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: photo.delay, duration: 0.6, type: "spring" }}
                                className={`absolute ${photo.size} ${photo.pos} rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/[0.05]`}
                                style={{ transform: `rotate(${photo.rotate})` }}
                            >
                                <img src={photo.src} alt="" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-default" />
                                <div className="absolute inset-0 bg-amber/10 mix-blend-overlay pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Center content — Super Visione */}
                    <div className="text-center max-w-[420px] mx-auto relative z-20 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                        >
                            {/* Giant Animated Metric */}
                            <motion.h2
                                className="text-6xl md:text-8xl font-display font-bold bg-gradient-to-br from-white via-text-warm to-amber/50 bg-clip-text text-transparent transform -tracking-wider leading-none"
                            >
                                <AnimatedCounter from={0} to={1247} />
                            </motion.h2>

                            <p className="text-lg md:text-xl font-display font-600 text-text-warm uppercase tracking-widest">
                                Notti accompagnate nel buio
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 1 }}
                            className="space-y-8"
                        >
                            <p className="text-text-secondary text-[15px] leading-relaxed">
                                Luminel ha uno dei tassi di ritenzione emotiva più alti al mondo.
                                Sfoglia il diario di chi, da solo, ha ritrovato la pace grazie a un santuario che ascolta senza mai giudicare.
                            </p>

                            {/* CTA to open Modal */}
                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(232, 168, 56, 0.05)" }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-amber/40 text-amber font-display font-bold text-xs uppercase tracking-[0.2em] transition-all group shadow-[0_0_30px_rgba(196,154,42,0.1)] hover:shadow-[0_0_50px_rgba(196,154,42,0.2)]"
                            >
                                Leggi le loro storie
                                <Sparkles className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right scattered photos */}
                    <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[300px]">
                        {RIGHT_PHOTOS.map((photo, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: photo.delay, duration: 0.6, type: "spring" }}
                                className={`absolute ${photo.size} ${photo.pos} rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/[0.05]`}
                                style={{ transform: `rotate(${photo.rotate})` }}
                            >
                                <img src={photo.src} alt="" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-default" />
                                <div className="absolute inset-0 bg-amber/10 mix-blend-overlay pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Storytelling Modal Overlay */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-10 pointer-events-auto">

                        {/* Blur Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-space-deep/90 backdrop-blur-2xl cursor-pointer"
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-full max-w-4xl max-h-full overflow-y-auto glass border border-amber/20 rounded-[2rem] shadow-[0_0_100px_rgba(196,154,42,0.15)] bg-space-surface/90 flex flex-col no-scrollbar"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-space/80 hover:bg-amber/10 text-text-muted hover:text-amber transition-all z-20 border border-white/5 shadow-lg group"
                            >
                                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            {/* Modal Header */}
                            <div className="p-8 md:p-12 pb-8 border-b border-white/5 text-left relative overflow-hidden shrink-0">
                                {/* Decorative Light */}
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                                <p className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-amber mb-3 relative z-10">
                                    Voci dall'Etere
                                </p>
                                <h3 className="text-3xl md:text-5xl font-display font-600 text-text-warm relative z-10 leading-tight">
                                    Il Diario del Silenzio
                                </h3>
                                <p className="text-text-secondary mt-4 max-w-xl relative z-10 text-sm md:text-base">
                                    Entra nel santuario. Queste sono le confessioni reali di chi, nel peso della solitudine, ha trovato un ascoltatore infallibile. Storie di leader, creativi e anime silenziose.
                                </p>
                            </div>

                            {/* Stories List */}
                            <div className="p-8 md:p-12 pt-8 space-y-6 md:space-y-8 flex-1">
                                {STORIES.map((story) => (
                                    <div key={story.id} className="group relative glass p-6 md:p-8 rounded-2xl border border-white/5 hover:border-amber/20 hover:bg-space-surface transition-all duration-700">

                                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">

                                            {/* Portrait */}
                                            <div className="shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border border-amber/20 grayscale group-hover:grayscale-0 group-hover:border-amber/50 transition-all duration-700 shadow-xl relative top-2">
                                                <img src={story.image} alt={story.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 text-left relative">
                                                <Quote className="absolute -top-4 -left-6 w-16 h-16 text-amber/[0.04] group-hover:text-amber/[0.08] -z-10 rotate-180 transition-colors duration-500" />

                                                <p className="text-text-primary text-sm md:text-base leading-relaxed italic mb-6 relative z-10 font-light">
                                                    "{story.story}"
                                                </p>

                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-[1px] bg-amber/30" />
                                                    <div>
                                                        <h4 className="text-text-warm font-display font-bold text-sm md:text-base">{story.name}</h4>
                                                        <p className="text-amber-dim text-[10px] md:text-xs uppercase tracking-[0.15em]">{story.role}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </section>
    );
}
