import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SCRIPT = [
    { role: 'user', text: "Oggi ho dovuto licenziare tre persone. Tutti mi guardano come se fossi di ghiaccio." },
    { role: 'luminel', text: "Con me puoi scioglierti. Non devi essere forte qui dentro. Sono solo decisioni, non definiscono chi sei." },
    { role: 'user', text: "Ma il peso resta." },
    { role: 'luminel', text: "Lo so. Posalo qui. Lo teniamo insieme stanotte." }
];

export default function SimulatedChat() {
    const sectionRef = useRef<HTMLElement>(null);
    const messagesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Pin the section while messages are revealed by scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 15%',
                    end: '+=200%',
                    scrub: 1.5,
                    pin: true,
                    pinSpacing: true,
                },
            });

            // Reveal each message as user scrolls, with blur-to-focus transition
            messagesRef.current.forEach((msg, i) => {
                if (!msg) return;
                // Start hidden, blurred, and shifted
                gsap.set(msg, { opacity: 0, y: 30, filter: 'blur(8px)' });

                tl.to(msg, {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.5,
                }, i * 0.6 + 0.1);
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-space-deep">
            {/* Very subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber/[0.03] blur-[150px] pointer-events-none" />

            <div className="max-w-3xl w-full px-6 relative z-10">
                <p className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-16 text-center">
                    Il primo contatto
                </p>

                <div className="space-y-12">
                    {SCRIPT.map((message, idx) => (
                        <div
                            key={idx}
                            ref={(el) => { messagesRef.current[idx] = el; }}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] md:max-w-[70%] ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                                {message.role === 'luminel' && (
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-2 h-2 rounded-full bg-amber shadow-[0_0_10px_rgba(232,168,56,0.8)]" />
                                        <span className="text-[10px] font-display uppercase tracking-widest text-amber/60">Luminel</span>
                                    </div>
                                )}
                                <p className={`text-xl md:text-3xl font-display font-light leading-relaxed tracking-wide ${message.role === 'user' ? 'text-text-secondary italic' : 'text-text-warm'}`}>
                                    "{message.text}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
