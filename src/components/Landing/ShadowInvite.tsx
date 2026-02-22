import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Check } from 'lucide-react';

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

export default function ShadowInvite() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSent(true);
        setTimeout(() => {
            setEmail('');
            setSent(false);
        }, 3000);
    };

    return (
        <section className="py-28 md:py-36 px-6 section-warm-deep relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-amber/[0.05] blur-[140px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="relative min-h-[500px] flex items-center justify-center">

                    {/* Left scattered photos */}
                    <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[280px]">
                        {LEFT_PHOTOS.map((photo, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: photo.delay, duration: 0.5 }}
                                className={`absolute ${photo.size} ${photo.pos} rounded-xl overflow-hidden shadow-lg shadow-black/20`}
                                style={{ transform: `rotate(${photo.rotate})` }}
                            >
                                <img src={photo.src} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Center content */}
                    <div className="text-center max-w-md mx-auto relative z-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            {/* Big stat */}
                            <motion.p
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="text-5xl md:text-6xl font-display font-bold text-text-warm"
                            >
                                ∞
                            </motion.p>

                            <div className="space-y-3">
                                <p className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em]">
                                    Condividi la luce
                                </p>
                                <h2 className="text-2xl md:text-3xl font-display font-600 text-text-warm leading-snug">
                                    Conosci qualcuno che ha bisogno <br />di essere ascoltato?
                                </h2>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    Ogni persona che vedi qui aveva lo stesso vuoto dentro.
                                    Inviagli un invito anonimo — nessuno saprà che sei stato tu. <br />
                                    <span className="text-text-muted italic">A volte il gesto più grande è aprire una porta in silenzio.</span>
                                </p>
                            </div>

                            {/* Email form */}
                            <form onSubmit={handleSend} className="relative max-w-sm mx-auto">
                                <input
                                    type="email"
                                    placeholder="Email del destinatario"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-space-surface border border-space-border text-text-warm px-6 py-4 rounded-full focus:outline-none focus:border-amber/40 focus:shadow-[0_0_20px_rgba(232,168,56,0.08)] transition-all placeholder-text-muted text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={sent}
                                    className="absolute right-2 top-2 bottom-2 aspect-square bg-amber/10 hover:bg-amber/20 flex items-center justify-center rounded-full transition-colors text-amber disabled:opacity-50"
                                >
                                    {sent ? <Check className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                                </button>
                            </form>

                            {sent && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-xs text-amber uppercase tracking-widest"
                                >
                                    Invito trasmesso in silenzio.
                                </motion.p>
                            )}
                        </motion.div>
                    </div>

                    {/* Right scattered photos */}
                    <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[280px]">
                        {RIGHT_PHOTOS.map((photo, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: photo.delay, duration: 0.5 }}
                                className={`absolute ${photo.size} ${photo.pos} rounded-xl overflow-hidden shadow-lg shadow-black/20`}
                                style={{ transform: `rotate(${photo.rotate})` }}
                            >
                                <img src={photo.src} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
