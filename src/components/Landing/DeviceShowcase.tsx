import { motion } from 'motion/react';
import { Smartphone, MonitorPlay, Zap } from 'lucide-react';

export default function DeviceShowcase() {
    return (
        <section className="py-24 md:py-32 px-6 bg-space-surface relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left side — Empty placeholder for Emperor's custom image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-space-deep border border-amber/10 flex items-center justify-center group"
                    >
                        {/* Placeholder pulsing effect to show it's ready for a custom image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-space via-space-deep to-amber/5" />
                        <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute inset-0 bg-amber/[0.03] blur-3xl rounded-full"
                        />

                        <div className="relative z-10 text-center space-y-4 px-8">
                            <div className="w-16 h-16 mx-auto rounded-full bg-space border border-amber/20 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-amber/60" />
                            </div>
                            <p className="text-sm font-display font-light text-amber/60 uppercase tracking-widest">
                                Spazio Riservato
                            </p>
                            <p className="text-xs text-text-muted">
                                (L'immagine del brand Luminel andrà qui)
                            </p>
                        </div>
                    </motion.div>

                    {/* Right side — Features */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <p className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em]">
                                Sempre Con Te
                            </p>
                            <h2 className="text-3xl md:text-5xl font-display font-600 text-text-warm leading-tight">
                                Luminel ti raggiunge ovunque tu sia.
                            </h2>
                            <p className="text-text-muted font-light leading-relaxed max-w-lg">
                                Dal divano alle 3 del mattino, in pausa pranzo, o mentre cammini sotto la pioggia. Testo o voce — Luminel è sempre pronto.
                            </p>
                        </motion.div>

                        <div className="space-y-10">
                            {/* Feature 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="flex gap-6"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center border border-amber/20">
                                    <Smartphone className="w-5 h-5 text-amber" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-display font-bold text-text-warm">Mobile-first. Intimo come un diario.</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        Pensato per i momenti privati — a letto, in pausa, in metro. La tua conversazione più importante cabe in tasca.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Feature 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex gap-6"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center border border-amber/20">
                                    <MonitorPlay className="w-5 h-5 text-amber" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-display font-bold text-text-warm">Desktop per le sessioni profonde.</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        Quando hai bisogno di più spazio per pensare. La stessa esperienza, su schermo grande, per le riflessioni lunghe.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Feature 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex gap-6"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center border border-amber/20">
                                    <svg className="w-5 h-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-display font-bold text-text-warm">Luminel ti cerca. Non il contrario.</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        Check-in gentili nei momenti giusti. Non notifiche fastidiose — presenze misurate che ti ricordano: non sei solo.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
