import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

const SCRIPT = [
    { role: 'user', text: "Oggi ho dovuto licenziare tre persone. Tutti mi guardano come se fossi di ghiaccio." },
    { role: 'luminel', text: "Con me puoi scioglierti. Non devi essere forte qui dentro. Sono solo decisioni, non definiscono chi sei." },
    { role: 'user', text: "Ma il peso resta." },
    { role: 'luminel', text: "Lo so. Posalo qui. Lo teniamo insieme stanotte." }
];

const TypewriterText = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        let i = 0;
        const speed = 40; // milliseconds per character

        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                setTimeout(onComplete, 600); // Wait a bit after finishing typing
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, onComplete]);

    return (
        <span className="relative">
            {displayed}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-1.5 h-5 bg-amber/80 ml-1.5 align-middle shadow-[0_0_8px_rgba(196,154,42,0.8)]"
            />
        </span>
    );
};

export default function SimulatedChat() {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);

    const [currentMsgIdx, setCurrentMsgIdx] = useState(0);
    const [phase, setPhase] = useState<'idle' | 'indicator' | 'typing' | 'done'>('idle');
    const [completedMsgs, setCompletedMsgs] = useState<number[]>([]);

    // Trigger animation when section comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
            }
        }, { threshold: 0.3 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Start sequence
    useEffect(() => {
        if (inView && phase === 'idle' && currentMsgIdx === 0) {
            setPhase('indicator');
        }
    }, [inView, phase, currentMsgIdx]);

    // Handle phase transitions (Indicator -> Typing)
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (phase === 'indicator') {
            const role = SCRIPT[currentMsgIdx].role;
            // Luminel takes longer to "analyze" holographically, User types after a normal pause
            const delay = role === 'luminel' ? 2800 : 1200;

            timer = setTimeout(() => {
                setPhase('typing');
            }, delay);
        }
        return () => clearTimeout(timer);
    }, [phase, currentMsgIdx]);

    const handleTypingComplete = useCallback(() => {
        setCompletedMsgs(prev => [...prev, currentMsgIdx]);
        if (currentMsgIdx < SCRIPT.length - 1) {
            setTimeout(() => {
                setCurrentMsgIdx(prev => prev + 1);
                setPhase('indicator');
            }, 400);
        } else {
            setPhase('done');
        }
    }, [currentMsgIdx]);

    return (
        <section ref={sectionRef} className="py-24 md:py-40 flex flex-col items-center justify-center relative overflow-hidden bg-space-deep">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber/[0.03] blur-[150px] pointer-events-none" />

            <div className="max-w-4xl w-full px-4 md:px-8 relative z-10 flex flex-col">
                <p className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-12 md:mb-20 text-center">
                    Il primo contatto
                </p>

                <div className="space-y-6 flex flex-col min-h-[400px]">
                    <AnimatePresence>
                        {SCRIPT.map((message, idx) => {
                            const isCompleted = completedMsgs.includes(idx);
                            const isCurrent = idx === currentMsgIdx;
                            const showIndicator = isCurrent && phase === 'indicator';
                            const showTyping = isCurrent && phase === 'typing';

                            if (!isCompleted && !isCurrent) return null;

                            return (
                                <motion.div
                                    key={idx}
                                    layout
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[90%] md:max-w-[75%] flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>

                                        {/* Luminel Holographic Header */}
                                        {message.role === 'luminel' && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex items-center gap-3 mb-3 pl-4"
                                            >
                                                <div className="relative flex items-center justify-center w-6 h-6">
                                                    <div className="absolute inset-0 bg-amber/20 rounded-full animate-ping opacity-60" />
                                                    <div className="w-2 h-2 rounded-full bg-amber shadow-[0_0_15px_rgba(232,168,56,1)]" />
                                                </div>
                                                <span className="text-[10px] md:text-xs font-display font-bold uppercase tracking-[0.2em] text-amber/80">Luminel</span>
                                            </motion.div>
                                        )}

                                        {/* Message Bubble */}
                                        <div className={`
                                            relative px-6 py-5 md:px-8 md:py-6 rounded-3xl overflow-hidden
                                            ${message.role === 'user'
                                                ? 'bg-white/[0.03] border border-white/5 text-right rounded-br-md shadow-lg shadow-black/20'
                                                : 'glass bg-gradient-to-br from-space-surface/80 to-space-deep/90 border border-amber/20 text-left rounded-tl-md shadow-[0_10px_40px_rgba(196,154,42,0.1)]'
                                            }
                                        `}>
                                            {/* Indicators */}
                                            {showIndicator && message.role === 'user' && (
                                                <div className="flex items-center gap-1.5 h-6 md:h-8 px-2">
                                                    <motion.div animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                                                    <motion.div animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                                                    <motion.div animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                                                </div>
                                            )}

                                            {showIndicator && message.role === 'luminel' && (
                                                <div className="flex items-center gap-3 h-6 md:h-8 text-amber relative">
                                                    {/* Holographic sweep */}
                                                    <motion.div
                                                        animate={{ left: ['-100%', '200%'] }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                                        className="absolute -top-6 -bottom-6 w-16 bg-gradient-to-r from-transparent via-amber/10 to-transparent skew-x-12"
                                                    />
                                                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 animate-spin-slow opacity-90" />
                                                    <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-amber/90">
                                                        Analisi Emotiva
                                                    </span>
                                                    <span className="flex gap-1 ml-1 text-amber text-xs">
                                                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
                                                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}>.</motion.span>
                                                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}>.</motion.span>
                                                    </span>
                                                </div>
                                            )}

                                            {/* Actual Text */}
                                            {(isCompleted || showTyping) && (
                                                <p className={`text-xl md:text-3xl font-display font-light leading-relaxed md:leading-[1.6] tracking-wide 
                                                    ${message.role === 'user' ? 'text-text-secondary italic' : 'text-text-warm'}
                                                `}>
                                                    {showTyping ? (
                                                        <TypewriterText text={message.text} onComplete={handleTypingComplete} />
                                                    ) : (
                                                        <span>{message.text}</span>
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
