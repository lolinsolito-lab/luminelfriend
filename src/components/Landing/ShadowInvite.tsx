import { useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { Sparkles } from 'lucide-react';

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

                            {/* Ghost Button CTA */}
                            <motion.a
                                href="#testimonianze"
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(232, 168, 56, 0.05)" }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-amber/40 text-amber font-display font-bold text-xs uppercase tracking-[0.2em] transition-all group"
                            >
                                Leggi le loro storie
                                <Sparkles className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                            </motion.a>
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
        </section>
    );
}
