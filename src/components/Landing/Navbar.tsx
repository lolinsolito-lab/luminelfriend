import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Perché', target: 'perche' },
    { label: 'Come funziona', target: 'pilastri' },
    { label: 'Piani', target: 'piani' },
    { label: 'Contatto', target: 'contatto' },
];

export default function Navbar({ onEnter }: { onEnter: () => void }) {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);

            // Detect active section
            const sections = navLinks.map(l => l.target);
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
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-space-deep/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

                    {/* Logo */}
                    <button
                        onClick={() => scrollTo('hero')}
                        className="flex items-center gap-2.5 group"
                    >
                        <img src="/favicon.svg" alt="Luminel" className="w-8 h-8 rounded-full group-hover:shadow-amber/40 transition-shadow" />
                        <span className="font-display font-600 text-text-warm text-lg tracking-wide">
                            Luminel
                        </span>
                    </button>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <button
                                key={link.target}
                                onClick={() => scrollTo(link.target)}
                                className={`text-xs font-display uppercase tracking-[0.15em] transition-colors relative py-1 ${activeSection === link.target
                                    ? 'text-amber'
                                    : 'text-text-muted hover:text-text-warm'
                                    }`}
                            >
                                {link.label}
                                {activeSection === link.target && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-amber rounded-full"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:block">
                        <button
                            onClick={onEnter}
                            className="text-[11px] font-display font-bold uppercase tracking-widest px-5 py-2.5 bg-gradient-to-r from-amber to-amber-dim hover:from-amber-glow hover:to-amber text-space-deep rounded-lg transition-all shadow-lg shadow-amber/15 hover:shadow-amber/30"
                        >
                            Parla con Luminel
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2"
                    >
                        <motion.div
                            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            className="w-5 h-[2px] bg-text-warm"
                        />
                        <motion.div
                            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-5 h-[2px] bg-text-warm"
                        />
                        <motion.div
                            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            className="w-5 h-[2px] bg-text-warm"
                        />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-[60px] left-0 right-0 z-40 bg-space-deep/95 backdrop-blur-xl border-b border-white/5 p-6"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map(link => (
                                <button
                                    key={link.target}
                                    onClick={() => scrollTo(link.target)}
                                    className={`text-sm font-display uppercase tracking-[0.15em] text-left py-2 transition-colors ${activeSection === link.target ? 'text-amber' : 'text-text-muted'
                                        }`}
                                >
                                    {link.label}
                                </button>
                            ))}
                            <button
                                onClick={() => { onEnter(); setMobileOpen(false); }}
                                className="mt-2 w-full text-[11px] font-display font-bold uppercase tracking-widest px-5 py-3 bg-gradient-to-r from-amber to-amber-dim text-space-deep rounded-lg"
                            >
                                Parla con Luminel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
