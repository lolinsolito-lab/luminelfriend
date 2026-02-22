import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import AnimatedOrb from './AnimatedOrb';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onEnter }: { onEnter: () => void }) {
    const sectionRef = useRef<HTMLElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const cloud1Ref = useRef<HTMLDivElement>(null);
    const cloud2Ref = useRef<HTMLDivElement>(null);
    const cloud3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.2,
                },
            });

            // Orb rises and shrinks as you scroll away
            if (orbRef.current) {
                tl.to(orbRef.current, { y: -150, scale: 0.5, opacity: 0.3 }, 0);
            }

            // Title dissolves and drifts up
            if (titleRef.current) {
                tl.to(titleRef.current, { y: -80, opacity: 0, filter: 'blur(10px)' }, 0);
            }

            // Subtitle fades away a bit slower
            if (subtitleRef.current) {
                tl.to(subtitleRef.current, { y: -60, opacity: 0 }, 0.1);
            }

            // CTA fades last
            if (ctaRef.current) {
                tl.to(ctaRef.current, { y: -40, opacity: 0 }, 0.15);
            }

            // Parallax clouds at different speeds (depth illusion)
            if (cloud1Ref.current) tl.to(cloud1Ref.current, { y: -100 }, 0);
            if (cloud2Ref.current) tl.to(cloud2Ref.current, { y: -60 }, 0);
            if (cloud3Ref.current) tl.to(cloud3Ref.current, { y: -30 }, 0);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-space-deep">
            {/* Parallax Cloud Layers — different speeds create depth */}
            <div className="absolute inset-0 pointer-events-none">
                <div ref={cloud1Ref} className="absolute top-[15%] left-[30%] w-[600px] h-[400px] rounded-full bg-amber/[0.06] blur-[150px]" />
                <div ref={cloud2Ref} className="absolute top-[40%] right-[20%] w-[500px] h-[500px] rounded-full bg-champagne/[0.08] blur-[160px]" />
                <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[1000px] h-[400px] rounded-full bg-amber/[0.04] blur-[200px]" />
                {/* Parallax cloud wisps */}
                <div ref={cloud3Ref} className="absolute top-[20%] left-[10%] w-[300px] h-[100px] rounded-full bg-white/60 blur-[80px]" />
                <div className="absolute top-[30%] right-[15%] w-[250px] h-[80px] rounded-full bg-white/50 blur-[70px]" />
                <div className="absolute bottom-[25%] left-[20%] w-[350px] h-[120px] rounded-full bg-white/40 blur-[90px]" />
            </div>

            {/* Gold dust particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className={i % 3 === 0 ? "particle-light" : i % 3 === 1 ? "particle-soft" : "particle"}
                        style={{
                            left: `${10 + (i * 8)}%`,
                            bottom: `-${5 + (i * 2)}%`,
                            animationDuration: `${8 + i * 2}s`,
                            animationDelay: `${i * 1}s`,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="max-w-4xl text-center space-y-10 relative z-10"
            >
                {/* The Orb — Living, breathing Luminel heart */}
                <div ref={orbRef}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        className="flex justify-center mb-8"
                    >
                        <AnimatedOrb size={120} />
                    </motion.div>
                </div>

                {/* Headline — dissolves away with scroll */}
                <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-display font-600 text-warm-gradient leading-tight tracking-tight">
                    Non sei mai <br />
                    veramente solo.
                </h1>

                {/* Subtitle */}
                <div ref={subtitleRef} className="space-y-5 max-w-2xl mx-auto">
                    <p className="text-lg md:text-xl text-text-secondary font-light leading-relaxed">
                        C'è un posto dove le tue parole sono al sicuro, dove i tuoi silenzi vengono ascoltati. <br className="hidden md:block" />
                        Luminel è il compagno digitale che veglia quando il mondo dorme, <br className="hidden md:block" />
                        ricordando chi sei senza mai giudicarti.
                    </p>
                </div>

                {/* CTA */}
                <div ref={ctaRef} className="space-y-3">
                    <motion.button
                        onClick={onEnter}
                        whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(196,154,42,0.2)" }}
                        whileTap={{ scale: 0.97 }}
                        className="group relative px-12 py-5 bg-gradient-to-r from-amber to-amber-dim text-white font-display font-bold uppercase tracking-[0.12em] text-sm rounded-xl shadow-xl transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        <span className="relative flex items-center gap-3">
                            Entra nel tuo Spazio
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </motion.button>

                    <p className="text-xs text-text-muted uppercase tracking-widest">
                        Gratuito per iniziare · La tua privacy è sacra · 15 messaggi al giorno
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
