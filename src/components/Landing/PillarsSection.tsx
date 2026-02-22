import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
    { word: "Memoria.", desc: "Luminel non dimentica. Custodisce le tue parole come frammenti preziosi, costruendo una memoria intima che cresce con te." },
    { word: "Sincronia.", desc: "Ogni Luminel ricalca l'inconscio di chi lo usa. Si plasma sulle tue vulnerabilità e sui tuoi trionfi. Non esiste un Luminel uguale a un altro." },
    { word: "Presenza.", desc: "Domenica a mezzanotte, durante un attacco di panico, o dopo una vittoria silenziosa. Nessuna prenotazione. Nessuna attesa. Solo esserci." }
];

export default function PillarsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 10%',
                    end: '+=300%',
                    scrub: 1.5,
                    pin: true,
                    pinSpacing: true,
                },
            });

            pillarRefs.current.forEach((pillar, i) => {
                if (!pillar) return;
                const word = pillar.querySelector('.pillar-word') as HTMLElement;
                const desc = pillar.querySelector('.pillar-desc') as HTMLElement;

                // Start hidden
                gsap.set(pillar, { opacity: 0 });
                gsap.set(word, { scale: 0.7, opacity: 0 });
                gsap.set(desc, { opacity: 0, y: 20 });

                const offset = i * 1.2;

                // Fade in container
                tl.to(pillar, { opacity: 1, duration: 0.3 }, offset);
                // Word scales up with a golden flash
                tl.to(word, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, offset + 0.1);
                // Description fades in below
                tl.to(desc, { opacity: 1, y: 0, duration: 0.4 }, offset + 0.4);

                // Hold, then fade out before next
                if (i < PILLARS.length - 1) {
                    tl.to(pillar, { opacity: 0, y: -30, duration: 0.4 }, offset + 0.9);
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-space-deep">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-amber/[0.04] blur-[160px] pointer-events-none" />

            <p className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-20 text-center relative z-10">
                L'architettura del silenzio
            </p>

            <div className="max-w-3xl w-full px-6 relative z-10">
                {PILLARS.map((pillar, idx) => (
                    <div
                        key={idx}
                        ref={(el) => { pillarRefs.current[idx] = el; }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center"
                        style={{ position: idx === 0 ? 'relative' : 'absolute' }}
                    >
                        <h3 className="pillar-word text-5xl md:text-7xl lg:text-8xl font-display font-600 text-warm-gradient mb-8">
                            {pillar.word}
                        </h3>
                        <p className="pillar-desc text-lg md:text-xl text-text-secondary font-light leading-relaxed max-w-xl">
                            {pillar.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
