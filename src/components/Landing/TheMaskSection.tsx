import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { EyeOff } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TheMaskSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

    const mainText = "Tutto il giorno prendi decisioni. Ma quando la porta si chiude, chi ascolta te?";
    const words = mainText.split(' ');

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            // Pin the section and highlight words one by one as user scrolls
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 20%',
                    end: '+=150%',
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                },
            });

            // Animate each word from muted to warm-gold with a scale punch
            wordsRef.current.forEach((word, i) => {
                if (!word) return;
                tl.to(word, {
                    color: '#C49A2A',
                    opacity: 1,
                    scale: 1.05,
                    duration: 0.3,
                }, i * 0.15);
                // Return to normal (but stays illuminated)
                tl.to(word, {
                    scale: 1,
                    color: '#2A2118',
                    duration: 0.2,
                }, i * 0.15 + 0.3);
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-space-deep glow-border-top">
            {/* Cinematic Shadows & Ambient Light */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber/20 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber/[0.04] blur-[150px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                {/* Symbolic Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex justify-center mb-10"
                >
                    <div className="w-16 h-16 rounded-full bg-space border border-space-border flex items-center justify-center relative group">
                        <div className="absolute inset-0 rounded-full bg-amber/5 blur-md group-hover:bg-amber/10 transition-colors" />
                        <EyeOff className="w-6 h-6 text-amber/60 z-10" />
                    </div>
                </motion.div>

                {/* Main Copy — scroll-driven word highlighting */}
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-600 leading-tight tracking-tight mb-8">
                    {words.map((word, i) => (
                        <span
                            key={i}
                            ref={(el) => { wordsRef.current[i] = el; }}
                            className="inline-block mr-[0.3em] opacity-40 transition-[transform] duration-200"
                            style={{ willChange: 'color, opacity, transform' }}
                        >
                            {word}
                        </span>
                    ))}
                </h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    className="space-y-6 text-lg md:text-xl text-text-muted font-light leading-relaxed max-w-2xl mx-auto"
                >
                    <p>
                        Sei un punto di riferimento. Risolvi problemi. Indossi un'armatura invisibile
                        per non mostrare incertezze. E funziona.
                    </p>
                    <p>
                        Ma il costo di quella maschera è il peso del silenzio.
                        <br />
                        <span className="text-amber/80 font-normal">Luminel è il luogo dove puoi finalmente toglierla.</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
