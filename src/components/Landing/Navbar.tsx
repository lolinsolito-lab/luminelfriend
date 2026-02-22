import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
    { label: 'Lo Specchio', target: 'perche' },
    { label: 'Il Guardiano', target: 'simulazione' },
    { label: 'La Differenza', target: 'paradigma' },
    { label: 'Piani', target: 'piani' },
];

export default function Navbar({ onEnter }: { onEnter: () => void }) {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);

            const sections = ['hero', ...navLinks.map(l => l.target)];
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setMobileOpen(false);
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-space-deep/80 backdrop-blur-2xl border-b border-space-border/50'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

                    {/* Logo — The Orb + Name */}
                    <button
                        onClick={() => scrollTo('hero')}
                        className="flex items-center gap-3 group"
                    >
                        {/* Mini Orb instead of favicon */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-glow via-amber to-amber-dim shadow-lg shadow-amber/20 group-hover:shadow-amber/40 transition-shadow relative">
                            <div className="absolute inset-0 rounded-full bg-white/20 blur-[2px]" />
                            <div className="absolute top-1.5 left-2 w-2 h-1.5 rounded-full bg-white/40" />
                        </div>
                        <span className="font-display font-600 text-text-warm text-base tracking-[0.08em] uppercase">
                            Luminel
                        </span>
                    </button>

                    {/* Desktop Nav — Minimal, poetic labels */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map(link => (
                            <button
                                key={link.target}
                                onClick={() => scrollTo(link.target)}
                                className={`text-[11px] font-display tracking-[0.15em] uppercase transition-all duration-300 relative py-1 ${activeSection === link.target
                                    ? 'text-amber'
                                    : 'text-text-muted hover:text-text-warm'
                                    }`}
                            >
                                {link.label}
                                {activeSection === link.target && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-amber/60 rounded-full"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* CTA — Evocative, not transactional */}
                    <div className="hidden md:block">
                        <button
                            onClick={onEnter}
                            className="group text-[10px] font-display font-600 uppercase tracking-[0.2em] px-6 py-2.5 border border-amber/30 hover:border-amber/60 text-amber hover:text-amber-glow rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-amber/10 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative">Entra</span>
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2"
                    >
                        <motion.div
                            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            className="w-5 h-[1.5px] bg-text-warm origin-center"
                        />
                        <motion.div
                            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                            className="w-5 h-[1.5px] bg-text-warm"
                        />
                        <motion.div
                            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            className="w-5 h-[1.5px] bg-text-warm origin-center"
                        />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu — Full overlay, cinematic */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-space-deep/98 backdrop-blur-2xl flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.target}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 + 0.1 }}
                                    onClick={() => scrollTo(link.target)}
                                    className={`text-lg font-display tracking-[0.2em] uppercase transition-colors ${activeSection === link.target ? 'text-amber' : 'text-text-muted'
                                        }`}
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                onClick={() => { onEnter(); setMobileOpen(false); }}
                                className="mt-6 text-sm font-display font-600 uppercase tracking-[0.2em] px-8 py-3 border border-amber/40 text-amber rounded-full hover:border-amber/70 transition-all"
                            >
                                Entra
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
