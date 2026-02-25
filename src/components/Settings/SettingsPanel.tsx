import { motion } from 'motion/react';
import { X, User, Shield, LogOut, Loader2, Crown, Mic, Zap, FileText, Sparkles, Lock, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserProfile } from '../../App';
import type { UserTier } from '../../hooks/useTierLimits';
import { generateLegalPDF } from '../../utils/generateLegalPDF';
import { supabase } from '../../services/supabaseClient';

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
    const [savingAi, setSavingAi] = useState(false);

    // AI Configuration State
    const [aiPersona, setAiPersona] = useState('Il Mentore');
    const [aiTone, setAiTone] = useState('Calmo e Riflessivo');
    const [aiCustomPrompt, setAiCustomPrompt] = useState('');

    useEffect(() => {
        if (user?.user_metadata) {
            if (user.user_metadata.ai_persona) setAiPersona(user.user_metadata.ai_persona);
            if (user.user_metadata.ai_tone) setAiTone(user.user_metadata.ai_tone);
            if (user.user_metadata.ai_custom_prompt) setAiCustomPrompt(user.user_metadata.ai_custom_prompt);
        }
    }, [user]);

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
        if (!user) return;
        const acceptedAt = user.user_metadata?.legal_accepted_at || new Date().toISOString();
        generateLegalPDF(user, acceptedAt);
    };

    const buyExtraMinutes = () => {
        window.open('https://buy.stripe.com/test_eVaeYt5wE3GcaFqfZZ', '_blank');
    };

    const saveAiConfiguration = async () => {
        if (!user) return;
        setSavingAi(true);
        await supabase.auth.updateUser({
            data: {
                ai_persona: aiPersona,
                ai_tone: aiTone,
                ai_custom_prompt: aiCustomPrompt
            }
        });
        setTimeout(() => setSavingAi(false), 800);
    };

    return (
        <div className="fixed inset-0 bg-space-deep/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-xl bg-space-surface border border-amber/15 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(232,168,56,0.05)] relative my-8 max-h-[90vh] overflow-y-auto custom-scrollbar"
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
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-space to-space-surface border border-amber/30 flex items-center justify-center shadow-inner shrink-0">
                            <Crown className="w-8 h-8 text-amber/50" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xl font-display text-text-warm truncate">{userProfile?.name || 'Viaggiatore'}</p>
                            <p className="text-xs text-text-secondary tracking-widest uppercase mt-1 truncate">{user?.email}</p>
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

                    {/* Personalizzazione AI */}
                    <div className="space-y-4 pt-4 border-t border-space-border/50">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-amber" />
                            <h3 className="text-lg font-display text-text-warm">Configurazione AI</h3>
                        </div>

                        {tier === 'avvio' ? (
                            <div className="p-6 rounded-xl border border-space-border/30 bg-space/50 flex flex-col items-center justify-center text-center space-y-3">
                                <Lock className="w-6 h-6 text-text-muted" />
                                <p className="text-sm text-text-secondary">La personalizzazione dell'Anima di Luminel è un'esclusiva dei livelli PRO, PRO+ e VIP.</p>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                {/* Archetipo (PRO e superiori) */}
                                <div className="space-y-2">
                                    <label className="text-xs text-text-muted uppercase tracking-widest pl-1">Archetipo Principale</label>
                                    <select
                                        value={aiPersona}
                                        onChange={(e) => setAiPersona(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-space border border-space-border/50 text-text-warm text-sm focus:border-amber/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="Il Mentore">Il Mentore (Saggio, Direttivo)</option>
                                        <option value="L'Ascoltatore Puro">L'Ascoltatore Puro (Empatico, Silenzioso)</option>
                                        <option value="Lo Specchio Oscuro">Lo Specchio Oscuro (Provocatorio, Diretto)</option>
                                    </select>
                                </div>

                                {/* Tono Vocale (PRO+ e VIP) */}
                                {(tier === 'pro_plus' || tier === 'vip') && (
                                    <div className="space-y-2">
                                        <label className="text-xs text-text-muted uppercase tracking-widest pl-1">Ritmo e Stile Vocale</label>
                                        <select
                                            value={aiTone}
                                            onChange={(e) => setAiTone(e.target.value)}
                                            className="w-full p-3 rounded-xl bg-space border border-space-border/50 text-text-warm text-sm focus:border-amber/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="Calmo e Riflessivo">Calmo e Riflessivo</option>
                                            <option value="Deciso e Veloce">Deciso e Dinamico</option>
                                            <option value="Ipnottico">Ipnotico e Lento</option>
                                        </select>
                                    </div>
                                )}

                                {/* Override VIP */}
                                {tier === 'vip' && (
                                    <div className="space-y-2">
                                        <label className="text-xs text-amber uppercase tracking-widest pl-1">VIP Override (Prompt Assoluto)</label>
                                        <textarea
                                            value={aiCustomPrompt}
                                            onChange={(e) => setAiCustomPrompt(e.target.value)}
                                            placeholder="Istruisci Luminel esplicitamente. Es: 'Agisci come il mio partner ideale' o 'Sii il mio life coach spietato e non darmi mai ragione'."
                                            className="w-full p-4 rounded-xl bg-space border border-amber/30 text-text-warm text-sm focus:border-amber focus:outline-none transition-colors min-h-[100px] resize-none placeholder:text-text-muted/50"
                                        />
                                    </div>
                                )}

                                <button
                                    onClick={saveAiConfiguration}
                                    disabled={savingAi}
                                    className="w-full py-3 rounded-xl bg-amber/10 text-amber hover:bg-amber/20 border border-amber/30 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-bold mt-2"
                                >
                                    {savingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                    {savingAi ? 'Sincronizzazione...' : 'Salva Configurazione'}
                                </button>
                            </div>
                        )}
                    </div>

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
