import { motion, AnimatePresence } from 'motion/react';
import { X, User, Shield, LogOut, Loader2, Crown, Mic, Zap, FileText, Sparkles, Lock, Check, ChevronRight, Edit2, Save } from 'lucide-react';
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
    onOpenPlans: () => void;
}

export default function SettingsPanel({ onClose, userProfile, tier, voiceLimit, voiceMinutesUsed, onOpenPlans }: SettingsPanelProps) {
    const { user, signOut } = useAuth();
    const [loading, setLoading] = useState(false);
    const [savingState, setSavingState] = useState(false);

    // Edit Profile State
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(userProfile?.name || '');
    const [editBurden, setEditBurden] = useState(userProfile?.burden || '');

    // AI Configuration State
    const [aiPersona, setAiPersona] = useState('Il Mentore');
    const [aiTone, setAiTone] = useState('Calmo e Riflessivo');
    const [aiCustomPrompt, setAiCustomPrompt] = useState('');

    useEffect(() => {
        if (user?.user_metadata) {
            if (user.user_metadata.full_name) setEditName(user.user_metadata.full_name);
            if (user.user_metadata.burden) setEditBurden(user.user_metadata.burden);
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
        if (!user) return;
        window.open(`https://buy.stripe.com/test_eVaeYt5wE3GcaFqfZZ?client_reference_id=${user.id}`, '_blank');
    };

    const saveSettings = async () => {
        if (!user) return;
        setSavingState(true);
        await supabase.auth.updateUser({
            data: {
                full_name: editName,
                burden: editBurden,
                ai_persona: aiPersona,
                ai_tone: aiTone,
                ai_custom_prompt: aiCustomPrompt
            }
        });

        setIsEditing(false);
        setTimeout(() => setSavingState(false), 800);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-space-deep/90 backdrop-blur-md p-4 sm:p-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-2xl bg-space-surface border border-amber/15 rounded-3xl shadow-[0_0_50px_rgba(232,168,56,0.05)] relative flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden"
            >
                {/* Fixed Header */}
                <div className="shrink-0 px-6 py-5 border-b border-space-border/50 flex justify-between items-center bg-space/80 backdrop-blur-md z-10">
                    <h2 className="text-xl sm:text-2xl font-display font-light text-text-warm flex items-center gap-3">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-amber/70" />
                        Command Center
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-text-muted hover:text-amber transition-colors p-2 rounded-full hover:bg-amber/10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">

                    {/* Profilo & Dashboard Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Profile Card */}
                        <div className="p-5 rounded-2xl bg-space border border-space-border relative group flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-space to-space-surface border border-amber/30 flex items-center justify-center shadow-inner">
                                    <Crown className="w-6 h-6 text-amber/50" />
                                </div>
                                <button
                                    onClick={() => isEditing ? saveSettings() : setIsEditing(true)}
                                    className="p-2 text-text-muted hover:text-amber transition-colors rounded-lg hover:bg-amber/5"
                                >
                                    {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {isEditing ? (
                                    <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 mt-auto">
                                        <input
                                            value={editName} onChange={e => setEditName(e.target.value)}
                                            className="w-full bg-space-surface border border-amber/30 rounded-lg p-2 text-sm text-text-warm focus:outline-none focus:border-amber"
                                            placeholder="Il tuo nome"
                                        />
                                        <input
                                            value={editBurden} onChange={e => setEditBurden(e.target.value)}
                                            className="w-full bg-space-surface border border-amber/30 rounded-lg p-2 text-sm text-text-warm focus:outline-none focus:border-amber"
                                            placeholder="Il tuo burden"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-auto">
                                        <p className="text-xl font-display text-text-warm truncate">{editName || 'Viaggiatore'}</p>
                                        <p className="text-[10px] text-text-secondary tracking-widest uppercase mt-1 truncate">{user?.email}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Tier & Voice Limits Card */}
                        <div className="p-5 rounded-2xl bg-space border border-amber/20 relative overflow-hidden flex flex-col justify-end">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber/5 to-transparent opacity-50" />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <p className="text-[10px] text-amber/70 uppercase tracking-widest mb-1">Livello di Sincronia</p>
                                    <p className={`text-xl font-display tracking-widest uppercase ${getTierColor(tier)}`}>
                                        {getTierDisplayName(tier)}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <div className="flex justify-between items-end mb-2">
                                        <p className="text-[10px] text-text-muted uppercase tracking-widest">Sintonia Vocale</p>
                                        <p className="text-sm font-mono text-text-secondary">
                                            <span className={voiceMinutesUsed >= voiceLimit && voiceLimit > 0 ? 'text-red-400' : 'text-text-warm'}>
                                                {voiceMinutesUsed}
                                            </span>
                                            {' '}/ {voiceLimit === 0 && tier === 'avvio' ? '0' : voiceLimit} min
                                        </p>
                                    </div>
                                    <div className="h-1.5 w-full bg-space-surface rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full rounded-full ${voicePercentage >= 100 ? 'bg-red-500' : 'bg-gradient-to-r from-amber-dim to-amber'}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${voicePercentage}%` }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Espansione & Piani (Launcher Style) */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3 px-1">
                            <Crown className="w-4 h-4 text-amber/70" />
                            <h3 className="text-sm font-display uppercase tracking-widest text-text-muted">Risorse & Upgrade</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                onClick={onOpenPlans}
                                className={`w-full p-4 rounded-xl flex flex-col gap-2 transition-all ${tier === 'vip' ? 'glass border border-space-border opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-amber/10 to-transparent border border-amber/30 hover:border-amber/60 overflow-hidden group'}`}
                                disabled={tier === 'vip'}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-3 text-amber">
                                        <Sparkles className="w-5 h-5" />
                                        <span className="font-display tracking-widest uppercase text-sm font-bold">I Piani Reali</span>
                                    </div>
                                    {tier !== 'vip' && <ChevronRight className="w-4 h-4 text-amber/50 group-hover:text-amber" />}
                                </div>
                                <p className="text-left text-[11px] text-text-secondary">
                                    Sblocca Persona AI, Tono Vocale e limiti esteri.
                                </p>
                            </button>

                            <button
                                onClick={tier === 'avvio' ? onOpenPlans : buyExtraMinutes}
                                className={`w-full p-4 rounded-xl glass border flex flex-col gap-2 transition-all ${tier === 'avvio' ? 'border-space-border/50 text-text-muted' : 'border-amber/20 hover:border-amber/50 hover:bg-amber/5 text-text-warm'}`}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-3">
                                        <Mic className={`w-5 h-5 ${tier === 'avvio' ? 'text-text-muted/50' : 'text-amber'}`} />
                                        <span className="text-sm font-display tracking-wide truncate">
                                            +30 Minuti Vocali
                                        </span>
                                    </div>
                                    {tier === 'avvio' ? <Lock className="w-4 h-4 shrink-0 opacity-50" /> : <span className="text-xs font-mono text-amber shrink-0">€9.99</span>}
                                </div>
                                <p className="text-left text-[10px] text-text-muted/70">
                                    {tier === 'avvio' ? 'Richiede piano PRO. Clicca per i piani.' : 'Ricarica vocale istantanea, senza vincoli.'}
                                </p>
                            </button>
                        </div>
                    </div>

                    {/* AI Config */}
                    <div className="p-6 rounded-2xl glass border border-space-border relative">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-5 h-5 text-amber" />
                            <h3 className="text-lg font-display text-text-warm">L'Anima di Luminel</h3>
                        </div>

                        {tier === 'avvio' ? (
                            <div className="py-6 flex flex-col items-center justify-center text-center space-y-3 opacity-70">
                                <Lock className="w-6 h-6 text-text-muted" />
                                <p className="text-sm text-text-secondary max-w-sm">La Plasma-Personalizzazione è un'esclusiva. Plasmalo a tua immagine nei livelli VIP/PRO.</p>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-text-muted uppercase tracking-widest pl-1">Archetipo</label>
                                        <select
                                            value={aiPersona} onChange={e => setAiPersona(e.target.value)}
                                            className="w-full p-3.5 rounded-xl bg-space border border-space-border/50 text-text-warm text-sm focus:border-amber focus:outline-none transition-colors appearance-none"
                                        >
                                            <option value="Il Mentore">Il Mentore (Saggio)</option>
                                            <option value="L'Ascoltatore Puro">L'Ascoltatore Puro</option>
                                            <option value="Lo Specchio Oscuro">Lo Specchio Oscuro</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] text-text-muted uppercase tracking-widest pl-1">Ritmo Vocale (PRO+/VIP)</label>
                                        <select
                                            value={aiTone} onChange={e => setAiTone(e.target.value)}
                                            disabled={tier === 'pro'}
                                            className="w-full p-3.5 rounded-xl bg-space border border-space-border/50 text-text-warm text-sm focus:border-amber focus:outline-none transition-colors appearance-none disabled:opacity-50"
                                        >
                                            <option value="Calmo e Riflessivo">Calmo e Riflessivo</option>
                                            <option value="Deciso e Veloce">Deciso e Dinamico</option>
                                            <option value="Ipnotico e Lento">Ipnotico e Lento</option>
                                        </select>
                                    </div>
                                </div>

                                {tier === 'vip' && (
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-amber uppercase tracking-widest pl-1">Sovrascrittura VIP (Prompt Assoluto)</label>
                                        <textarea
                                            value={aiCustomPrompt} onChange={e => setAiCustomPrompt(e.target.value)}
                                            placeholder="Es: 'Sii il mio life coach spietato'..."
                                            className="w-full p-4 rounded-xl bg-space border border-amber/30 text-text-warm text-sm focus:border-amber focus:outline-none min-h-[80px] resize-none"
                                        />
                                    </div>
                                )}

                                <button
                                    onClick={saveSettings} disabled={savingState}
                                    className="w-full py-3.5 rounded-xl bg-amber/10 text-amber hover:bg-amber/20 border border-amber/30 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold mt-4"
                                >
                                    {savingState ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                    {savingState ? 'Sincronizzazione...' : 'Salva Neuro-Configurazione'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fixed Footer */}
                <div className="shrink-0 px-6 py-4 border-t border-space-border/50 bg-space/50 flex flex-col sm:flex-row justify-between items-center gap-4 z-10">
                    <button
                        onClick={handleLegalPrint}
                        className="flex items-center gap-2 text-text-muted hover:text-amber/70 transition-colors text-xs font-display tracking-widest uppercase"
                    >
                        <FileText className="w-4 h-4" />
                        Accordo Legale PDF
                    </button>
                    <button
                        onClick={handleSignOut}
                        disabled={loading}
                        className="flex items-center gap-2 text-red-400/80 hover:text-red-400 transition-colors text-xs font-display tracking-widest uppercase disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                        Abbandona
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
