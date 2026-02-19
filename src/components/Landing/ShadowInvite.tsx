import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Check } from 'lucide-react';

export default function ShadowInvite() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    // Mock send
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSent(true);
        setTimeout(() => {
            setEmail('');
            setSent(false);
        }, 3000);
    };

    return (
        <section className="py-32 px-6 bg-gradient-to-b from-obsidian to-black border-t border-white/5">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                <h2 className="text-2xl font-serif text-white">
                    Shadow Invite
                </h2>

                <p className="text-stone-400 leading-relaxed font-light">
                    Conosci un leader che sta portando un peso troppo grande? <br />
                    <span className="text-white">Inviagli la chiave del rifugio in modo anonimo.</span>
                </p>

                <form onSubmit={handleSend} className="relative max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Email del destinatario (anonimo)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-stone-900 border border-white/10 text-white px-6 py-4 rounded-sm focus:outline-none focus:border-luminel-gold/50 transition-colors placeholder-stone-600 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={sent}
                        className="absolute right-2 top-2 bottom-2 aspect-square bg-luminel-dim/20 hover:bg-luminel-gold/20 flex items-center justify-center rounded-sm transition-colors text-luminel-gold disabled:opacity-50"
                    >
                        {sent ? <Check className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                    </button>
                </form>

                {sent && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-luminel-gold uppercase tracking-widest"
                    >
                        Invito Anonimo Trasmesso.
                    </motion.p>
                )}
            </div>
        </section>
    );
}
