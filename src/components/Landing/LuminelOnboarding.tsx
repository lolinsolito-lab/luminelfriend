import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingProps {
    onComplete: (data: { name: string; burden: string }) => void;
}

export default function LuminelOnboarding({ onComplete }: OnboardingProps) {
    const [step, setStep] = useState(0); // 0: Start, 1: Name, 2: Burden, 3: Syncing
    const [name, setName] = useState('');
    const [burden, setBurden] = useState('');

    // Step 0 -> 1 auto transition
    useEffect(() => {
        if (step === 0) {
            const timer = setTimeout(() => setStep(1), 2000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    // Step 3 -> Complete auto transition
    useEffect(() => {
        if (step === 3) {
            const timer = setTimeout(() => {
                onComplete({ name, burden });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step, name, burden, onComplete]);

    const handleNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) setStep(2);
    };

    const handleBurdenSelect = (selectedBurden: string) => {
        setBurden(selectedBurden);
        setStep(3);
    };

    const burdens = [
        "Il peso della responsabilità.",
        "Il silenzio prolungato.",
        "La sensazione di non essere visto.",
        "Una decisione che non riesco a prendere."
    ];

    return (
        <div className="fixed inset-0 bg-space-deep z-[100] flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        scale: step === 3 ? [1, 2, 1] : 1,
                        opacity: step === 3 ? [0.1, 0.3, 0.1] : 0.05
                    }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber blur-[150px]"
                />
            </div>

            {/* Central Orb always present during onboarding */}
            <motion.div
                animate={{
                    scale: step === 3 ? [1, 1.2, 1] : [1, 1.05, 1],
                    boxShadow: step === 3 ? "0 0 100px rgba(232,168,56,0.5)" : "0 0 40px rgba(232,168,56,0.2)"
                }}
                transition={{ duration: step === 3 ? 1.5 : 4, repeat: Infinity, ease: "easeInOut" }}
                className="luminel-orb-sm mb-16 relative z-10"
                style={{ width: 64, height: 64 }}
            />

            <div className="w-full max-w-md relative z-10">
                <AnimatePresence mode="wait">

                    {/* Step 1: The Name */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 1 }}
                            className="text-center w-full"
                        >
                            <h2 className="text-2xl md:text-3xl font-display font-light text-text-warm mb-10 tracking-wide">
                                Prima di accendere la luce... <br />
                                <span className="text-text-secondary">Come desideri essere chiamato?</span>
                            </h2>
                            <form onSubmit={handleNameSubmit} className="relative">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                    placeholder="Il tuo nome, o uno pseudonimo"
                                    className="w-full bg-transparent border-b border-space-border/50 text-center text-xl text-amber focus:outline-none focus:border-amber/50 pb-4 placeholder-text-muted/30 transition-colors font-display"
                                />
                                {name.trim() && (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        type="submit"
                                        className="absolute right-0 bottom-4 text-xs tracking-[0.2em] uppercase text-text-muted hover:text-amber transition-colors"
                                    >
                                        Procedi
                                    </motion.button>
                                )}
                            </form>
                        </motion.div>
                    )}

                    {/* Step 2: The Burden */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 1 }}
                            className="text-center w-full"
                        >
                            <h2 className="text-2xl md:text-3xl font-display font-light text-text-warm mb-10 tracking-wide">
                                Quale peso stai portando stanotte,<br />
                                <span className="text-amber">{name}</span>?
                            </h2>
                            <div className="space-y-4">
                                {burdens.map((b, idx) => (
                                    <motion.button
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.15 + 0.5, duration: 0.8 }}
                                        onClick={() => handleBurdenSelect(b)}
                                        className="w-full p-6 text-left glass glass-hover rounded-xl border border-space-border/30 hover:border-amber/30 text-text-secondary hover:text-text-warm font-display tracking-wide transition-all duration-500 hover:pl-8 group"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 text-amber mr-2 transition-opacity">•</span>
                                        {b}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Immersive Sync */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center w-full mt-12"
                        >
                            <motion.p
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-sm font-display uppercase tracking-[0.4em] text-amber"
                            >
                                Sincronizzazione Emotiva...
                            </motion.p>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
