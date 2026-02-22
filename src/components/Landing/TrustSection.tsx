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
                <div className="grid lg:grid-cols-5 gap-10 items-center">
                    {/* Cards — left side */}
                    <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
                        {TRUST_ITEMS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-5 rounded-2xl border border-space-border hover:border-amber/15 transition-colors group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 rounded-xl bg-amber/10 text-amber group-hover:bg-amber/15 transition-colors shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-display font-600 text-text-warm mb-1">{item.title}</h3>
                                        <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Image — right side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-2 hidden lg:block"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber/10">
                            <img
                                src="/images/shield-of-light.png"
                                alt="Scudo di luce protettiva"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-space-deep/40 via-transparent to-transparent" />
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
