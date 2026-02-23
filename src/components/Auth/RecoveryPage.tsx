import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

interface RecoveryPageProps {
    onSwitchToLogin: () => void;
    onBack: () => void;
}

export default function RecoveryPage({ onSwitchToLogin, onBack }: RecoveryPageProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
            redirectTo: window.location.origin + '/reset-password',
        });

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            setSent(true);
        }
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

                {!sent ? (
                    <>
                        <h1 className="text-2xl md:text-3xl font-display font-600 text-text-warm text-center mb-2">
                            Ritrova la via.
                        </h1>
                        <p className="text-sm text-text-muted text-center mb-10 font-light">
                            Inserisci la tua email e ti manderemo un link per rientrare nel tuo spazio.
                        </p>

                        {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-3 rounded-lg bg-red-900/20 border border-red-500/30 text-red-400 text-xs text-center font-display">
                                {error}
                            </motion.div>
                        )}

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
                                    autoFocus
                                />
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
                                        Invia il link
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </>
                ) : (
                    /* Success State */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="w-12 h-12 text-amber" />
                        </div>
                        <h2 className="text-2xl font-display font-600 text-text-warm mb-3">
                            Controlla la tua email.
                        </h2>
                        <p className="text-sm text-text-muted font-light leading-relaxed mb-8">
                            Se <span className="text-text-warm">{email}</span> è registrata, riceverai un link per reimpostare la tua password entro pochi minuti.
                        </p>
                    </motion.div>
                )}

                <div className="mt-8 text-center">
                    <button
                        onClick={onSwitchToLogin}
                        className="text-xs text-amber/80 hover:text-amber transition-colors font-display font-600"
                    >
                        ← Torna al login
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
