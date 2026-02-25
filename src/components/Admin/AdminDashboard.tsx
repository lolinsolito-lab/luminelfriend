import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../../services/supabaseClient';
import { Shield, Users, Activity, Crown, Mic, RefreshCw, X, Database } from 'lucide-react';

interface Profile {
    id: string;
    full_name: string;
    tier: string;
    messages_count_today: number;
    voice_minutes_used: number;
    voice_minutes_limit: number;
    updated_at: string;
}

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfiles = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data, error: sbError } = await supabase
                .from('profiles')
                .select('*')
                .order('updated_at', { ascending: false });

            if (sbError) throw sbError;
            setProfiles(data || []);
        } catch (err: any) {
            setError(err.message || 'Errore di caricamento utenti');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    // Compute Metrics
    const totalUsers = profiles.length;
    const vipUsers = profiles.filter(p => p.tier === 'vip').length;
    const proPlusUsers = profiles.filter(p => p.tier === 'pro_plus').length;
    const totalVoiceMinutesUsed = profiles.reduce((acc, p) => acc + (p.voice_minutes_used || 0), 0);

    // Rough API Cost estimation based on voice usage (0.07€/min per ElevenLabs for Pro+/VIP, mostly)
    // Non-vip might use standard voice but let's do a fast blended estimate.
    const estimatedApiCost = (totalVoiceMinutesUsed * 0.05).toFixed(2);

    return (
        <div className="absolute inset-0 bg-space-deep/95 backdrop-blur-2xl z-50 flex flex-col p-6 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto w-full space-y-8 py-10"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-space-border pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-amber/10 border border-amber/30 flex items-center justify-center shadow-[0_0_20px_rgba(196,154,42,0.2)]">
                            <Shield className="w-6 h-6 text-amber" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-display font-600 text-text-warm tracking-wide">
                                Luminel Imperial God-Mode
                            </h1>
                            <p className="text-text-muted text-sm uppercase tracking-widest mt-1">
                                Centro di Controllo Assoluto
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full glass hover:bg-space-border hover:text-amber transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Top Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="glass p-6 rounded-2xl border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                        <div className="flex items-center justify-between mb-4">
                            <Users className="w-5 h-5 text-amber-dim" />
                            <span className="text-[10px] uppercase tracking-widest text-text-muted font-display">Sudditi Totali</span>
                        </div>
                        <div className="text-4xl font-bold text-text-warm">{totalUsers}</div>
                    </div>

                    <div className="glass p-6 rounded-2xl border-white/5 relative overflow-hidden group border-b-2 border-b-champagne/50">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-champagne/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                        <div className="flex items-center justify-between mb-4">
                            <Crown className="w-5 h-5 text-champagne" />
                            <span className="text-[10px] uppercase tracking-widest text-text-muted font-display">Livelli VIP / PRO+</span>
                        </div>
                        <div className="text-4xl font-bold text-champagne">{vipUsers} <span className="text-lg text-text-muted font-normal">/ {proPlusUsers}</span></div>
                    </div>

                    <div className="glass p-6 rounded-2xl border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                        <div className="flex items-center justify-between mb-4">
                            <Mic className="w-5 h-5 text-cyan-400 opacity-70" />
                            <span className="text-[10px] uppercase tracking-widest text-text-muted font-display">Minuti Vocali</span>
                        </div>
                        <div className="text-4xl font-bold text-text-primary">{totalVoiceMinutesUsed}</div>
                    </div>

                    <div className="glass p-6 rounded-2xl border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                        <div className="flex items-center justify-between mb-4">
                            <Database className="w-5 h-5 text-red-400 opacity-70" />
                            <span className="text-[10px] uppercase tracking-widest text-text-muted font-display">Costo API Stimato</span>
                        </div>
                        <div className="text-4xl font-bold text-red-400">€{estimatedApiCost}</div>
                    </div>
                </div>

                {/* Database Table */}
                <div className="glass rounded-2xl overflow-hidden border border-white/5">
                    <div className="p-6 border-b border-space-border flex items-center justify-between bg-white/[0.01]">
                        <h2 className="text-lg font-display font-600 text-text-warm flex items-center gap-2">
                            <Activity className="w-4 h-4 text-amber" /> Flusso Utenti
                        </h2>
                        <button
                            onClick={fetchProfiles}
                            disabled={loading}
                            className="px-4 py-2 rounded-lg text-xs font-display uppercase tracking-widest bg-space-border hover:bg-space-light transition-colors flex items-center gap-2"
                        >
                            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Sincronizza
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        {error ? (
                            <div className="p-8 text-center text-red-400 bg-red-400/5">{error}</div>
                        ) : (
                            <table className="w-full text-left text-sm text-text-secondary">
                                <thead className="bg-space/50 text-xs uppercase font-display tracking-widest text-text-muted sticky top-0">
                                    <tr>
                                        <th className="px-6 py-4 font-normal">Nome Utente</th>
                                        <th className="px-6 py-4 font-normal">Tier</th>
                                        <th className="px-6 py-4 font-normal text-center">Msg Oggi</th>
                                        <th className="px-6 py-4 font-normal text-center">Voce Consumata</th>
                                        <th className="px-6 py-4 font-normal text-right">Ultimo Accesso</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-space-border">
                                    {profiles.length === 0 && !loading && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-text-muted">Nessun utente trovato nell'impero.</td>
                                        </tr>
                                    )}
                                    {profiles.map((profile) => (
                                        <tr key={profile.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4 font-medium text-text-warm">
                                                {profile.full_name || 'Fantasma Anonimo'}
                                                <div className="text-[10px] text-text-muted font-mono mt-0.5">{profile.id.substring(0, 8)}...</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest ${profile.tier === 'vip' ? 'bg-champagne/20 text-champagne border border-champagne/30' :
                                                        profile.tier === 'pro_plus' ? 'bg-amber/20 text-amber border border-amber/30' :
                                                            profile.tier === 'pro' ? 'bg-white/10 text-white border border-white/20' :
                                                                'bg-space text-text-muted border border-space-border'
                                                    }`}>
                                                    {profile.tier}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {profile.messages_count_today}
                                            </td>
                                            <td className="px-6 py-4 text-center border-l border-r border-space/50">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className={profile.voice_minutes_used >= profile.voice_minutes_limit && profile.voice_minutes_limit > 0 ? 'text-red-400 font-bold' : 'text-text-primary'}>
                                                        {profile.voice_minutes_used || 0}
                                                    </span>
                                                    <span className="text-text-muted text-xs">/ {profile.voice_minutes_limit || 0} min</span>
                                                </div>
                                                {/* Progress Bar Visual */}
                                                {profile.voice_minutes_limit > 0 && (
                                                    <div className="w-24 h-1 bg-space-border rounded-full mx-auto mt-2 overflow-hidden">
                                                        <div
                                                            className={`h-full ${profile.voice_minutes_used >= profile.voice_minutes_limit ? 'bg-red-500' : 'bg-amber'}`}
                                                            style={{ width: `${Math.min((profile.voice_minutes_used / profile.voice_minutes_limit) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right text-xs font-mono text-text-muted">
                                                {new Date(profile.updated_at).toLocaleString('it-IT', { dateStyle: 'short', timeStyle: 'short' })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
