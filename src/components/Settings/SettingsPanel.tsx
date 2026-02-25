import { motion } from 'motion/react';
import { X, User, Shield, LogOut, Loader2, Crown, Mic, Zap, FileText } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserProfile } from '../../App';
import type { UserTier } from '../../hooks/useTierLimits';

interface SettingsPanelProps {
    onClose: () => void;
    userProfile?: UserProfile | null;
    tier: UserTier;
    voiceLimit: number;
    voiceMinutesUsed: number;
}

export default function SettingsPanel({ onClose, userProfile, tier, voiceLimit, voiceMinutesUsed }: SettingsPanelProps) {
    const { user, signOut } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        setLoading(true);
        await signOut();
        setLoading(false);
        onClose();
    };

    const getTierDisplayName = (t: string) => {
        switch (t) {
            case 'pro': return 'Luminel PRO';
            case 'pro_plus': return 'Luminel PRO+';
            case 'vip': return 'Luminel VIP';
            default: return 'Fase di Avvio';
        }
    };

    const getTierColor = (t: string) => {
        switch (t) {
            case 'pro': return 'text-amber';
            case 'pro_plus': return 'text-amber-glow';
            case 'vip': return 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]';
            default: return 'text-text-muted';
        }
    };

    const voicePercentage = voiceLimit > 0 ? Math.min((voiceMinutesUsed / voiceLimit) * 100, 100) : 0;

    const handleLegalPrint = () => {
        // Un semplice trucco per permettere all'utente di avere una copia:
        // In un'app reale questo genererebbe un PDF con react-pdf o richiamerebbe un endpoint,
        // ma la stampa via browser di una pagina dedicata è legalmente equivalente se ben formattata.
        alert("Il tuo accordo è registrato nei nostri server sicuri (ID: " + user?.id + "). La funzione di esportazione PDF sarà disponibile a breve.");
    };

    const buyExtraMinutes = () => {
        // Integrazione Stripe Payment Link per i minuti extra
        window.open('https://buy.stripe.com/test_eVaeYt5wE3GcaFqfZZ', '_blank'); // Placeholder/Test link
    };

    return (
        <div className="fixed inset-0 bg-space-deep/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-lg bg-space-surface border border-amber/15 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(232,168,56,0.05)] relative my-8"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-text-muted hover:text-amber transition-colors p-2 rounded-full hover:bg-amber/10"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-display font-light text-text-warm border-b border-space-border/50 pb-4 mb-8 flex items-center gap-3">
                    <User className="w-6 h-6 text-amber/70" />
                    Il Tuo Rifugio
                </h2>

                <div className="space-y-8">
                    {/* Profilo */}
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-space to-space-surface border border-amber/30 flex items-center justify-center shadow-inner">
                            <Crown className="w-8 h-8 text-amber/50" />
                        </div>
                        <div>
                            <p className="text-xl font-display text-text-warm">{userProfile?.name || 'Viaggiatore'}</p>
                            <p className="text-xs text-text-secondary tracking-widest uppercase mt-1">{user?.email}</p>
                        </div>
                    </div>

                    {/* Stato Tier & Voice */}
                    <div className="p-6 rounded-xl bg-space border border-amber/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="flex justify-between items-end mb-4 relative z-10">
                            <div>
                                <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Livello di Sincronia</p>
                                <p className={`text-lg font-display tracking-widest uppercase ${getTierColor(tier)}`}>
                                    {getTierDisplayName(tier)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Sintonia Vocale</p>
                                <p className="text-sm font-mono text-text-secondary">
                                    <span className={voiceMinutesUsed >= voiceLimit && voiceLimit > 0 ? 'text-red-400' : 'text-text-warm'}>
                                        {voiceMinutesUsed}
                                    </span>
                                    {' '}/ {voiceLimit === 0 && tier === 'avvio' ? '0' : voiceLimit} min
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-space-surface rounded-full overflow-hidden relative z-10">
                            <motion.div
                                className={`h-full rounded-full ${voicePercentage >= 100 ? 'bg-red-500' : 'bg-gradient-to-r from-amber-dim to-amber'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${voicePercentage}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            />
                        </div>

                        {tier === 'avvio' && (
                            <p className="text-[10px] text-amber/60 mt-4 leading-relaxed tracking-wide">
                                I messaggi vocali infondono l'anima in Luminel. Espandi il tuo rifugio a PRO per sbloccare la Sintonia Vocale.
                            </p>
                        )}
                    </div>

                    {/* Espansione (Acquisti) */}
                    {tier !== 'avvio' && (
                        <div className="space-y-3">
                            <p className="text-xs text-text-muted uppercase tracking-widest pl-1">Espansione Spazio-Temporale</p>
                            <button
                                onClick={buyExtraMinutes}
                                className="w-full p-4 rounded-xl glass border border-amber/20 flex items-center justify-between group hover:border-amber/50 hover:bg-amber/5 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 text-text-warm">
                                    <Mic className="w-5 h-5 text-amber" />
                                    <span className="text-sm font-display tracking-wide">Aggiungi +30 Minuti Vocali</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono text-amber">€9.99</span>
                                    <Zap className="w-4 h-4 text-amber/50 group-hover:text-amber transition-colors" />
                                </div>
                            </button>
                        </div>
                    )}

                    {/* Legal & Auth */}
                    <div className="pt-6 border-t border-space-border/50 space-y-3">
                        <button
                            onClick={handleLegalPrint}
                            className="w-full p-4 rounded-xl flex items-center justify-between text-text-secondary hover:text-text-warm hover:bg-space-surface transition-colors border border-transparent hover:border-space-border/50 group"
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-text-muted group-hover:text-amber/70 transition-colors" />
                                <span className="text-sm font-display tracking-wide">Ricevuta Accordo Legale (PDF)</span>
                            </div>
                            <Shield className="w-4 h-4 opacity-30" />
                        </button>

                        <button
                            onClick={handleSignOut}
                            disabled={loading}
                            className="w-full p-4 rounded-xl flex items-center justify-center gap-2 text-red-400/80 hover:text-red-400 hover:bg-red-400/10 transition-colors text-sm font-display tracking-widest uppercase disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
                            Abbandona il Rifugio
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
