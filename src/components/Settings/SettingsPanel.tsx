import { motion } from 'motion/react';
import { X, User, Shield, LogOut, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface SettingsPanelProps {
    onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
    const { user, signOut } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        setLoading(true);
        await signOut();
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-space-deep/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-space-surface border border-space-border/50 rounded-2xl p-6 shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors p-2 rounded-full hover:bg-space/50"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-display font-light text-text-warm mb-8">
                    Configurazione
                </h2>

                <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-space border border-space-border/30 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center text-amber">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-display text-text-warm">Account</p>
                            <p className="text-xs text-text-muted truncate">{user?.email}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <button className="w-full p-4 rounded-xl glass border border-space-border/30 flex items-center justify-between group hover:border-amber/30 transition-all">
                            <div className="flex items-center gap-3 text-text-secondary group-hover:text-amber transition-colors">
                                <Shield className="w-5 h-5" />
                                <span className="text-sm font-display tracking-wide">Privacy & Sicurezza</span>
                            </div>
                        </button>
                    </div>

                    <div className="pt-6 border-t border-space-border/50">
                        <button
                            onClick={handleSignOut}
                            disabled={loading}
                            className="w-full p-4 rounded-xl flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors text-sm font-display tracking-wide disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
                            Disconnetti
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
