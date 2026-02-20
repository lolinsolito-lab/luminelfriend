import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Check } from 'lucide-react';

export default function ShadowInvite() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        // TODO: Collegare a Resend API — form predisposto, backend da attivare
        setSent(true);
        setTimeout(() => {
            setEmail('');
            setSent(false);
        }, 3000);
    };

    return (
        <section className="py-28 md:py-32 px-6 section-warm-deep relative glow-border-top overflow-hidden">
            {/* Warm ambient glow */}
            <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-amber/[0.05] blur-[140px] pointer-events-none" />

            <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <p className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em]">
                        Condividi
                    </p>
                    <h2 className="text-2xl md:text-3xl font-display font-600 text-text-warm">
                        Conosci qualcuno che ha bisogno <br />di essere ascoltato?
                    </h2>

                    <p className="text-text-secondary leading-relaxed text-sm max-w-lg mx-auto">
                        Inviagli un invito anonimo. Nessuno saprà che sei stato tu. <br />
                        A volte il gesto più grande è aprire una porta in silenzio.
                    </p>
                </motion.div>

                <form onSubmit={handleSend} className="relative max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Email del destinatario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-space-surface border border-space-border text-text-warm px-6 py-4 rounded-xl focus:outline-none focus:border-amber/40 focus:shadow-[0_0_20px_rgba(232,168,56,0.08)] transition-all placeholder-text-muted text-sm"
                    />
                    <button
                        type="submit"
                        disabled={sent}
                        className="absolute right-2 top-2 bottom-2 aspect-square bg-amber/10 hover:bg-amber/20 flex items-center justify-center rounded-lg transition-colors text-amber disabled:opacity-50"
                    >
                        {sent ? <Check className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                    </button>
                </form>

                {sent && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-amber uppercase tracking-widest"
                    >
                        Invito trasmesso in silenzio.
                    </motion.p>
                )}
            </div>
        </section>
    );
}
