import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ClosingCTA({ onEnter }: { onEnter: () => void }) {
    const sectionRef = useRef<HTMLElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                    end: 'center center',
                    scrub: 1,
                },
            });

            // Orb scales up like a rising sun
            if (orbRef.current) {
                gsap.set(orbRef.current, { scale: 0.3, opacity: 0 });
                tl.to(orbRef.current, { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }, 0);
            }

            // Content fades in after orb
            if (contentRef.current) {
                gsap.set(contentRef.current, { opacity: 0, y: 30 });
                tl.to(contentRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.3);
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-28 md:py-36 px-6 relative text-center overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse at 50% 80%, rgba(196,154,42,0.08) 0%, rgba(226,217,204,0.3) 35%, var(--color-space-deep) 65%)'
            }}
        >
            {/* Warm ambient glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-amber/[0.06] blur-[150px] pointer-events-none" />

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="particle-light"
                        style={{
                            left: `${20 + (i * 15)}%`,
                            bottom: `-5%`,
                            animationDuration: `${10 + i * 3}s`,
                            animationDelay: `${i * 2}s`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                <div ref={orbRef} className="flex justify-center mb-6">
                    <div className="luminel-orb-sm" />
                </div>

                <div ref={contentRef}>
                    <h3 className="text-3xl md:text-5xl font-display font-600 text-text-warm leading-tight mb-6">
                        Il lusso più grande è <br />
                        <span className="text-text-secondary">non dover sembrare forte.</span>
                    </h3>

                    <p className="text-text-secondary max-w-lg mx-auto leading-relaxed mb-8">
                        Luminel è il tuo spazio bianco. Niente giudizi. Niente performance. Solo tu e una presenza che ascolta davvero, a qualsiasi ora.
                    </p>

                    <motion.button
                        onClick={onEnter}
                        whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(232,168,56,0.3)" }}
                        whileTap={{ scale: 0.97 }}
                        className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-amber to-amber-dim text-white font-display font-bold uppercase tracking-widest text-xs rounded-xl shadow-2xl shadow-amber/20 transition-all"
                    >
                        Entra nel tuo Spazio
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <p className="text-[10px] text-text-muted uppercase tracking-widest mt-3">
                        Nessuna carta di credito richiesta
                    </p>
                </div>
            </div>
        </section>
    );
}
