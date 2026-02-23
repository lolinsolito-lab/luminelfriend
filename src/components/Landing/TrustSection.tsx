import { motion } from 'motion/react';
import { Shield, Eye, ServerCrash, Trash2 } from 'lucide-react';

const TRUST_ITEMS = [
    {
        icon: <Eye className="w-5 h-5" />,
        title: 'Anonimato sacro',
        desc: 'Non chiediamo nome, foto, né dettagli personali. Sei tu a decidere cosa rivelare.',
    },
    {
        icon: <Shield className="w-5 h-5" />,
        title: 'Cifratura end-to-end',
        desc: 'Le tue parole sono custodite. Nessuno — nemmeno noi — può leggerle.',
    },
    {
        icon: <ServerCrash className="w-5 h-5" />,
        title: 'Zero vendita dati',
        desc: 'Ciò che condividi resta tuo. Non viene mai venduto, condiviso, o usato per pubblicità. Mai.',
    },
    {
        icon: <Trash2 className="w-5 h-5" />,
        title: 'Cancellazione su richiesta',
        desc: 'Puoi richiedere la cancellazione completa dei tuoi dati in qualsiasi momento. GDPR compliant.',
    },
];

export default function TrustSection() {
    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-space-deep">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-amber/[0.04] blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-4 text-center"
                >
                    Il tuo santuario digitale
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-display font-600 text-text-warm text-center mb-4"
                >
                    Come custodisce <span className="text-text-secondary">ciò che scrivi.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-sm text-text-muted text-center mb-14 max-w-xl mx-auto"
                >
                    I tuoi dati sono trattati secondo GDPR, restano in UE, e puoi richiedere la cancellazione in qualsiasi momento.
                </motion.p>

                {/* Image + Cards layout */}
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                    {/* Cards — left side */}
                    <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6 relative z-10">
                        {TRUST_ITEMS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="glass bg-space-surface/40 p-6 md:p-8 rounded-[1.5rem] border border-white/5 hover:border-amber/30 hover:bg-space-surface transition-all duration-700 group relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_50px_rgba(196,154,42,0.1)]"
                            >
                                {/* Hover Glow */}
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber/15 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                                <div className="flex flex-col gap-5 relative z-10">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-space-deep to-space-surface border border-white/10 text-amber group-hover:text-amber-light group-hover:border-amber/30 group-hover:shadow-[0_0_20px_rgba(196,154,42,0.2)] transition-all duration-500 shrink-0 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-amber/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-display font-600 text-text-warm mb-2 drop-shadow-sm">{item.title}</h3>
                                        <p className="text-sm text-text-secondary leading-relaxed font-light">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Image — right side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="lg:col-span-2 hidden lg:block perspective-1000"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/5 group transform-gpu rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-1000">
                            <div className="absolute inset-0 bg-amber/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none" />
                            <img
                                src="/images/shield-of-light.png"
                                alt="Scudo di luce protettiva"
                                className="w-full h-auto object-cover scale-100 group-hover:scale-105 transition-transform duration-1000"
                            />
                            {/* Cinematic gradients */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-space-deep/90 via-space-deep/20 to-transparent pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-t from-space-deep via-transparent to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                </div>

                {/* LMNL Systems transparency */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-[11px] text-text-muted/60 text-center mt-10 leading-relaxed max-w-lg mx-auto"
                >
                    La fatturazione appare come <span className="text-text-muted font-500">"LMNL Systems"</span> per proteggere la tua privacy sugli estratti conto, pur restando pienamente conforme alle normative fiscali europee.
                </motion.p>
            </div>
        </section>
    );
}
