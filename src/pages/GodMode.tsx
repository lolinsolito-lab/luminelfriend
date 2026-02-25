import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../services/supabaseClient';
import {
    Shield,
    Users,
    Activity,
    Crown,
    Mic,
    RefreshCw,
    X,
    Database,
    TrendingUp,
    BarChart3,
    Ticket,
    LogOut,
    ArrowLeft,
    ChevronRight,
    Search,
    Edit2,
    CheckCircle2
} from 'lucide-react';

interface Profile {
    id: string;
    full_name: string;
    tier: string;
    messages_count_today: number;
    voice_minutes_used: number;
    voice_minutes_limit: number;
    updated_at: string;
}

interface Transaction {
    id: string;
    amount: number;
    type: string;
    created_at: string;
}

export default function GodMode({ onNavigate }: { onNavigate: (view: any) => void }) {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'promos'>('overview');

    // Auth Check
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session || session.user.email !== 'jaramichael@hotmail.com') {
                onNavigate('chat');
            } else {
                fetchData();
            }
        };
        checkAuth();
    }, [onNavigate]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch Profiles
            const { data: profilesData, error: profError } = await supabase
                .from('profiles')
                .select('*')
                .order('updated_at', { ascending: false });

            if (profError) throw profError;
            setProfiles(profilesData || []);

            // Fetch Transactions for last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const { data: transData, error: transError } = await supabase
                .from('transactions')
                .select('*')
                .gte('created_at', thirtyDaysAgo.toISOString())
                .order('created_at', { ascending: false });

            if (transError) {
                console.error("TransError:", transError);
                // Non blocchiamo se mancano le transazioni inizialmente
            } else {
                setTransactions(transData || []);
            }

        } catch (err: any) {
            setError(err.message || 'Errore di caricamento dati imperiali.');
        } finally {
            setLoading(false);
        }
    };

    // --- Metrics Calculations ---
    const totalUsers = profiles.length;
    const vipUsers = profiles.filter(p => p.tier === 'vip').length;
    const proPlusUsers = profiles.filter(p => p.tier === 'pro_plus').length;
    const payingUsers = profiles.filter(p => p.tier !== 'avvio').length;

    const totalVoiceMinutesUsed = profiles.reduce((acc, p) => acc + (p.voice_minutes_used || 0), 0);
    const estimatedApiCost = (totalVoiceMinutesUsed * 0.05).toFixed(2);

    const revenue30Days = transactions.reduce((acc, t) => acc + Number(t.amount), 0);
    const averageOrderValue = transactions.length > 0 ? (revenue30Days / transactions.length).toFixed(2) : '0.00';

    // --- Quick Actions ---
    const handleUpgradeUser = async (userId: string, newTier: string) => {
        const confirm = window.confirm(`Sei sicuro di forzare l'upgrade di questo utente a ${newTier.toUpperCase()}?`);
        if (!confirm) return;

        let baseVoiceLimit = 0;
        if (newTier === 'pro') baseVoiceLimit = 60;
        if (newTier === 'pro_plus') baseVoiceLimit = 180;
        if (newTier === 'vip') baseVoiceLimit = 1500;

        const { error } = await supabase
            .from('profiles')
            .update({
                tier: newTier,
                voice_minutes_limit: baseVoiceLimit
            })
            .eq('id', userId);

        if (error) {
            alert("Errore nell'aggiornamento: " + error.message);
        } else {
            fetchData();
        }
    };

    const handleAddMinutes = async (userId: string, currentLimit: number) => {
        const amountStr = window.prompt("Quanti minuti bonus vuoi aggiungere?");
        if (!amountStr) return;
        const amount = parseInt(amountStr);
        if (isNaN(amount) || amount <= 0) return;

        const { error } = await supabase
            .from('profiles')
            .update({ voice_minutes_limit: currentLimit + amount })
            .eq('id', userId);

        if (error) {
            alert("Errore nell'aggiunta minuti: " + error.message);
        } else {
            fetchData();
        }
    };

    return (
        <div className="min-h-screen bg-[#FCFBF8] text-[#1A1A1A] flex font-sans">

            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-[#E5E0D8] flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.02)] z-10 p-6">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C29532] to-[#A67C00] flex items-center justify-center shadow-[0_0_15px_rgba(194,149,50,0.4)]">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-display font-bold text-[#1A1A1A]">God Mode</h1>
                        <p className="text-[9px] uppercase tracking-widest text-[#C29532] font-semibold">Imperial Access</p>
                    </div>
                </div>

                <nav className="flex-1 flex flex-col gap-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-[#FDFBF7] text-[#C29532] shadow-sm border border-[#E5E0D8]' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <BarChart3 className="w-4 h-4" /> Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'users' ? 'bg-[#FDFBF7] text-[#C29532] shadow-sm border border-[#E5E0D8]' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Users className="w-4 h-4" /> Utenti (Impero)
                    </button>
                    <button
                        onClick={() => setActiveTab('promos')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'promos' ? 'bg-[#FDFBF7] text-[#C29532] shadow-sm border border-[#E5E0D8]' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Ticket className="w-4 h-4" /> Sconti & Promozioni
                    </button>
                </nav>

                <div className="pt-6 border-t border-[#E5E0D8] flex flex-col gap-2">
                    <button
                        onClick={() => onNavigate('chat')}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Torna a Luminel
                    </button>
                    <button
                        onClick={async () => { await supabase.auth.signOut(); onNavigate('login'); }}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Disconnetti
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#E5E0D8] flex items-center justify-between px-10 sticky top-0 z-20">
                    <h2 className="text-xl font-display font-semibold text-[#1A1A1A]">
                        {activeTab === 'overview' && 'Vista Elicottero'}
                        {activeTab === 'users' && 'Gestione Sudditi'}
                        {activeTab === 'promos' && 'Codici Promozionali'}
                    </h2>

                    <button
                        onClick={fetchData}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg text-xs font-display font-semibold uppercase tracking-widest bg-white border border-[#E5E0D8] text-[#1A1A1A] hover:bg-[#FDFBF7] hover:border-[#C29532] transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Sincronizzazione...' : 'Aggiorna Dati'}
                    </button>
                </header>

                <main className="p-10 max-w-7xl mx-auto space-y-8">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-sm flex items-center gap-2">
                            <X className="w-4 h-4" /> {error}
                        </div>
                    )}

                    {activeTab === 'overview' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">

                            {/* KPI Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Revenue */}
                                <div className="bg-gradient-to-br from-[#0A261E] to-[#05130F] p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                                            <span className="text-xs uppercase tracking-widest text-emerald-100/70 font-semibold">Revenue (30gg)</span>
                                        </div>
                                    </div>
                                    <div className="text-4xl font-bold text-white font-display">
                                        €{revenue30Days.toFixed(2)}
                                    </div>
                                </div>

                                {/* Users */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E0D8]">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Users className="w-4 h-4 text-blue-500" />
                                        <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Utenti Totali</span>
                                    </div>
                                    <div className="text-4xl font-bold text-[#1A1A1A] font-display">
                                        {totalUsers}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 font-medium">{payingUsers} Utenti Paganti</p>
                                </div>

                                {/* API Costs */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E0D8]">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Database className="w-4 h-4 text-red-500" />
                                        <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Costi API (Voce)</span>
                                    </div>
                                    <div className="text-4xl font-bold text-red-500 font-display">
                                        €{estimatedApiCost}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 font-medium">{totalVoiceMinutesUsed} min consumati</p>
                                </div>

                                {/* AOV */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E0D8]">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Activity className="w-4 h-4 text-[#C29532]" />
                                        <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Avg. Order Value</span>
                                    </div>
                                    <div className="text-4xl font-bold text-[#C29532] font-display">
                                        €{averageOrderValue}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 font-medium">Ultime {transactions.length} transazioni</p>
                                </div>
                            </div>

                            {/* Chart Area (Mock for now, ready for Recharts) */}
                            <div className="bg-white rounded-2xl shadow-sm border border-[#E5E0D8] p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-lg font-display font-semibold text-[#1A1A1A]">Andamento Entrate</h3>
                                        <p className="text-sm text-gray-500">Vendite processate tramite Stripe negli ultimi 30 giorni</p>
                                    </div>
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold flex items-center gap-1 border border-emerald-100">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Data
                                    </span>
                                </div>

                                <div className="h-64 w-full bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center flex-col gap-3">
                                    <BarChart3 className="w-8 h-8 text-gray-300" />
                                    <p className="text-sm text-gray-400 font-medium">Il grafico verrà generato all'arrivo delle prime transazioni.</p>
                                </div>
                            </div>

                        </motion.div>
                    )}

                    {activeTab === 'users' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-[#E5E0D8] overflow-hidden">
                            <div className="p-4 border-b border-[#E5E0D8] bg-gray-50/50 flex items-center justify-between">
                                <div className="relative">
                                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Cerca suddito per nome o ID..."
                                        className="pl-10 pr-4 py-2 border border-[#E5E0D8] rounded-lg text-sm w-64 focus:outline-none focus:border-[#C29532] focus:ring-1 focus:ring-[#C29532] transition-shadow bg-white"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[#FDFBF7] text-[10px] uppercase font-display tracking-widest text-gray-500 font-semibold border-b border-[#E5E0D8]">
                                        <tr>
                                            <th className="px-6 py-4">Utente</th>
                                            <th className="px-6 py-4">Status & Livello</th>
                                            <th className="px-6 py-4 text-center">Consumo Voce</th>
                                            <th className="px-6 py-4 text-right">Azioni God Mode</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#E5E0D8]">
                                        {profiles.length === 0 ? (
                                            <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">Nessun utente nell'Impero.</td></tr>
                                        ) : profiles.map(profile => (
                                            <tr key={profile.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-[#1A1A1A]">{profile.full_name || 'Anonimo'}</div>
                                                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">{profile.id}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border ${profile.tier === 'vip' ? 'bg-[#C29532]/10 text-[#C29532] border-[#C29532]/30' :
                                                        profile.tier === 'pro_plus' ? 'bg-amber-100/50 text-amber-700 border-amber-200' :
                                                            profile.tier === 'pro' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                                'bg-gray-100 text-gray-500 border-gray-200'
                                                        }`}>
                                                        {profile.tier}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <div className="text-xs font-semibold text-[#1A1A1A]">
                                                            {profile.voice_minutes_used} <span className="text-gray-400 font-normal">/ {profile.voice_minutes_limit} min</span>
                                                        </div>
                                                        {profile.voice_minutes_limit > 0 && (
                                                            <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                                                                <div
                                                                    className={`h-full ${profile.voice_minutes_used >= profile.voice_minutes_limit ? 'bg-red-500' : 'bg-[#C29532]'}`}
                                                                    style={{ width: `${Math.min((profile.voice_minutes_used / profile.voice_minutes_limit) * 100, 100)}%` }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleUpgradeUser(profile.id, 'vip')}
                                                                className="px-2 py-1 text-[9px] font-bold uppercase rounded bg-[#C29532]/10 text-[#C29532] hover:bg-[#C29532] hover:text-white transition-colors border border-[#C29532]/20"
                                                            >
                                                                Make VIP
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpgradeUser(profile.id, 'pro_plus')}
                                                                className="px-2 py-1 text-[9px] font-bold uppercase rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors border border-gray-200"
                                                            >
                                                                Make Pro+
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => handleAddMinutes(profile.id, profile.voice_minutes_limit)}
                                                            className="flex items-center gap-1 px-2 py-1 text-[9px] font-bold uppercase rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors border border-emerald-100"
                                                        >
                                                            <CheckCircle2 className="w-3 h-3" /> Aggiungi Minuti
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'promos' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center p-20 bg-white rounded-2xl shadow-sm border border-[#E5E0D8]">
                            <div className="text-center space-y-4 max-w-sm">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Ticket className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-[#1A1A1A]">Engine Promozionale</h3>
                                <p className="text-sm text-gray-500">
                                    La tabella promo_codes è pronta nel database.
                                    Presto potrai generare codici sconto (es. NATALE50) e decidere le regole di applicazione.
                                </p>
                                <button className="mt-4 px-6 py-2 bg-[#C29532] text-white rounded-lg text-sm font-semibold opacity-50 cursor-not-allowed">
                                    Database Syncing...
                                </button>
                            </div>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
}
