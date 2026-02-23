import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Link as LinkIcon, Linkedin, Twitter, MessageCircle } from 'lucide-react';

export default function DailyEvolution() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [copied, setCopied] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    const handleShare = (platform: string) => {
        const url = window.location.href;
        const text = "Ho appena scoperto Luminel, lo spazio sicuro dove le mie parole vengono ascoltate senza giudizio.";

        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                break;
        }
    };

    return (
        <section className="py-24 md:py-32 bg-space-deep relative overflow-hidden border-t border-white/[0.02]">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-amber/[0.02] blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center bg-[#151515] rounded-[2.5rem] p-6 md:p-12 shadow-2xl border border-white/5">

                    {/* Left Side - The Entity */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] md:h-[550px] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] group bg-[#0A0A0A] border border-white/5"
                    >
                        {/* Immagine Entità Fornita dall'Utente (Ribaltata orizzontalmente con -scale-x-100) */}
                        <img
                            src="/images/entity-gold.png"
                            alt="La Presenza Luminel"
                            className="w-full h-full object-cover object-center transform -scale-x-100 group-hover:-scale-x-[1.05] group-hover:scale-y-105 transition-transform duration-1000 opacity-90"
                            onError={(e) => {
                                // Fallback se l'immagine non è ancora stata caricata
                                e.currentTarget.src = "/images/world-manager.png";
                            }}
                        />

                        {/* Deep bottom gradient for text readability */}
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

                        {/* Text Overlay */}
                        <div className="absolute bottom-8 left-8 right-8 z-10">
                            <h3 className="text-3xl font-display font-bold text-white uppercase tracking-wider mb-1">
                                LA PRESENZA
                            </h3>
                            <p className="text-[#C29532] text-sm font-medium tracking-widest uppercase">
                                IL TUO SPAZIO BIANCO
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Side - Copy & Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-4 tracking-tight">
                            Migliora l'1% <br />
                            <span className="text-[#C29532]">Ogni Giorno.</span>
                        </h2>

                        <p className="text-xl text-white/90 font-medium mb-4">
                            Eleva la tua Mente. Plasma il tuo Futuro.
                        </p>

                        <p className="text-white/60 font-light leading-relaxed mb-8 max-w-lg">
                            Unisciti alla nostra cerchia ristretta. Riceverai ogni settimana riflessioni profonde su leadership emotiva, performance mentale e l'arte del silenzio performante — direttamente nella tua casella di posta.
                        </p>

                        {/* Newsletter Form */}
                        <form onSubmit={handleSubmit} className="mb-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="La tua email migliore"
                                    required
                                    className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C29532]/50 focus:bg-white/10 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success'}
                                    className={`px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center min-w-[160px]
                                        ${status === 'success'
                                            ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                                            : 'bg-[#C29532] text-white hover:bg-[#A37B24] shadow-[0_10px_20px_rgba(194,149,50,0.2)] hover:shadow-[0_15px_30px_rgba(194,149,50,0.4)]'
                                        }`}
                                >
                                    {status === 'loading' ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : status === 'success' ? (
                                        'Iscritto ✓'
                                    ) : (
                                        'Iscriviti'
                                    )}
                                </button>
                            </div>
                        </form>

                        <p className="text-xs text-white/40 mb-10">
                            La tua privacy è un patto sacro. Puoi annullare l'iscrizione in qualsiasi momento.
                        </p>

                        {/* Social Share Section */}
                        <div className="pt-8 border-t border-white/10">
                            <p className="text-sm text-white/80 font-medium mb-4">
                                Oppure, condividi questa visione con chi ne ha bisogno:
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => handleShare('whatsapp')}
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all group"
                                    aria-label="Condividi su WhatsApp"
                                >
                                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                    onClick={() => handleShare('linkedin')}
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all group"
                                    aria-label="Condividi su LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                    onClick={() => handleShare('twitter')}
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#1DA1F2] hover:border-[#1DA1F2] transition-all group"
                                    aria-label="Condividi su X/Twitter"
                                >
                                    <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                    onClick={() => handleShare('copy')}
                                    className="flex items-center justify-center px-6 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-medium text-sm gap-2"
                                >
                                    <LinkIcon className="w-4 h-4" />
                                    {copied ? 'Link copiato!' : 'Copia Link'}
                                </button>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
