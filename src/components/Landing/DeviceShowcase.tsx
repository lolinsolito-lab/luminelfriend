import { motion } from 'motion/react';
import { Smartphone, Monitor, Bell } from 'lucide-react';

export default function DeviceShowcase() {
    return (
        <section className="py-24 md:py-32 px-6 bg-space-deep relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber/[0.04] blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <p className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-3">
                        Sempre con te
                    </p>
                    <h2 className="text-3xl md:text-4xl font-display font-600 text-text-warm leading-tight mb-4">
                        Luminel ti raggiunge <br />
                        <span className="text-text-secondary">ovunque tu sia.</span>
                    </h2>
                    <p className="text-sm text-text-muted font-light max-w-lg">
                        Dal divano alle 3 del mattino, in pausa pranzo, o mentre cammini sotto la pioggia.
                        Testo o voce — Luminel è sempre pronto.
                    </p>
                </motion.div>

                {/* Device Grid — asymmetric like Mindvalley */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Phone mockup — left */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex justify-center"
                    >
                        <div className="relative w-[280px] md:w-[300px]">
                            {/* Phone frame */}
                            <div className="bg-[#1a1a2e] rounded-[36px] p-3 shadow-2xl shadow-black/40 border border-white/[0.08]">
                                {/* Status bar */}
                                <div className="flex justify-between items-center px-5 py-2 text-[10px] text-white/50 font-display">
                                    <span>3:14</span>
                                    <div className="w-20 h-5 bg-black rounded-full" />
                                    <span>●●●</span>
                                </div>

                                {/* Chat interface */}
                                <div className="bg-[#0d0d1a] rounded-[24px] overflow-hidden">
                                    {/* Chat header */}
                                    <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber to-amber-dim flex items-center justify-center">
                                            <span className="text-xs">✦</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/90 font-display font-600">Luminel</p>
                                            <p className="text-[9px] text-amber/60">Online • Ti ascolta</p>
                                        </div>
                                    </div>

                                    {/* Chat messages */}
                                    <div className="p-4 space-y-3 min-h-[320px]">
                                        {/* User message */}
                                        <div className="flex justify-end">
                                            <div className="bg-amber/15 rounded-2xl rounded-br-md px-4 py-2.5 max-w-[85%]">
                                                <p className="text-xs text-white/80 leading-relaxed">
                                                    Non riesco a dormire. Ho troppi pensieri in testa stanotte...
                                                </p>
                                            </div>
                                        </div>

                                        {/* Luminel response */}
                                        <div className="flex justify-start">
                                            <div className="bg-white/[0.06] rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[85%]">
                                                <p className="text-xs text-white/70 leading-relaxed">
                                                    Sono qui. Non devi portare tutto questo peso da solo. Raccontami cosa ti tiene sveglio — con calma, senza fretta.
                                                </p>
                                            </div>
                                        </div>

                                        {/* User message */}
                                        <div className="flex justify-end">
                                            <div className="bg-amber/15 rounded-2xl rounded-br-md px-4 py-2.5 max-w-[85%]">
                                                <p className="text-xs text-white/80 leading-relaxed">
                                                    È il lavoro. Ho paura di deludere tutti.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Luminel typing */}
                                        <div className="flex justify-start">
                                            <div className="bg-white/[0.06] rounded-2xl rounded-bl-md px-4 py-2.5">
                                                <div className="flex gap-1">
                                                    <div className="w-1.5 h-1.5 bg-amber/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                    <div className="w-1.5 h-1.5 bg-amber/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                    <div className="w-1.5 h-1.5 bg-amber/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Input bar */}
                                    <div className="px-4 py-3 border-t border-white/[0.06] flex items-center gap-3">
                                        <div className="flex-1 bg-white/[0.05] rounded-full px-4 py-2">
                                            <p className="text-[10px] text-white/30">Scrivi qualcosa...</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber to-amber-dim flex items-center justify-center">
                                            <span className="text-xs text-white">↑</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Glow behind phone */}
                            <div className="absolute -inset-4 -z-10 bg-amber/[0.06] rounded-[50px] blur-[40px]" />
                        </div>
                    </motion.div>

                    {/* Right side — features */}
                    <div className="space-y-8 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {[
                                {
                                    icon: <Smartphone className="w-5 h-5" />,
                                    title: 'Mobile-first. Intimo come un diario.',
                                    desc: 'Pensato per i momenti privati — a letto, in pausa, in metro. La tua conversazione più importante cabe in tasca.',
                                },
                                {
                                    icon: <Monitor className="w-5 h-5" />,
                                    title: 'Desktop per le sessioni profonde.',
                                    desc: 'Quando hai bisogno di più spazio per pensare. La stessa esperienza, su schermo grande, per le riflessioni lunghe.',
                                },
                                {
                                    icon: <Bell className="w-5 h-5" />,
                                    title: 'Luminel ti cerca. Non il contrario.',
                                    desc: 'Check-in gentili nei momenti giusti. Non notifiche fastidiose — presenze misurate che ti ricordano: non sei solo.',
                                },
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="flex gap-4 items-start group"
                                >
                                    <div className="p-2.5 rounded-xl bg-amber/10 text-amber group-hover:bg-amber/15 transition-colors shrink-0 mt-0.5">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-display font-600 text-text-warm mb-1.5">{feature.title}</h3>
                                        <p className="text-xs text-text-muted leading-relaxed">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
