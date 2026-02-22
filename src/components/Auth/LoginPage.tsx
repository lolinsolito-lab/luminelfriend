import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
    onLogin: (email: string, password: string) => void;
    onSwitchToRegister: () => void;
    onSwitchToRecovery: () => void;
    onBack: () => void;
}

export default function LoginPage({ onLogin, onSwitchToRegister, onSwitchToRecovery, onBack }: LoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) return;
        setLoading(true);
        // Simulate — will be replaced with Supabase auth
        setTimeout(() => {
            onLogin(email, password);
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="fixed inset-0 bg-space-deep z-[100] flex items-center justify-center p-6 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-amber/[0.05] blur-[150px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full max-w-sm relative z-10"
            >
                {/* Orb */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-glow via-amber to-amber-dim shadow-lg shadow-amber/20"
                    />
                </div>

                <h1 className="text-2xl md:text-3xl font-display font-600 text-text-warm text-center mb-2">
                    Bentornato.
                </h1>
                <p className="text-sm text-text-muted text-center mb-10 font-light">
                    Il tuo spazio ti stava aspettando.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-[10px] font-display uppercase tracking-[0.2em] text-text-muted mb-1.5 block">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="la.tua@email.com"
                            className="w-full px-4 py-3.5 bg-space border border-space-border rounded-xl text-text-warm text-sm font-light placeholder:text-text-muted/40 focus:outline-none focus:border-amber/40 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-display uppercase tracking-[0.2em] text-text-muted mb-1.5 block">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPw ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3.5 bg-space border border-space-border rounded-xl text-text-warm text-sm font-light placeholder:text-text-muted/40 focus:outline-none focus:border-amber/40 transition-colors pr-12"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw(!showPw)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-warm transition-colors"
                            >
                                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <button
                            type="button"
                            onClick={onSwitchToRecovery}
                            className="text-[11px] text-amber/70 hover:text-amber transition-colors font-display"
                        >
                            Password dimenticata?
                        </button>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-amber to-amber-dim text-white font-display font-600 uppercase tracking-[0.15em] text-xs rounded-xl shadow-lg shadow-amber/15 hover:shadow-amber/25 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                        ) : (
                            <>
                                Entra nella Luce
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="mt-8 text-center">
                    <span className="text-xs text-text-muted">Non hai ancora uno spazio? </span>
                    <button
                        onClick={onSwitchToRegister}
                        className="text-xs text-amber/80 hover:text-amber transition-colors font-display font-600"
                    >
                        Crealo ora
                    </button>
                </div>

                <button
                    onClick={onBack}
                    className="mt-6 w-full text-center text-[10px] text-text-muted/60 hover:text-text-muted transition-colors uppercase tracking-widest font-display"
                >
                    ← Torna alla vetrina
                </button>
            </motion.div>
        </div>
    );
}
