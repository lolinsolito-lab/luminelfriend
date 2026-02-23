import { motion } from 'motion/react';
import { Sparkles, Command } from 'lucide-react';

export default function DeviceShowcase() {
    return (
        <section className="py-24 md:py-32 px-6 bg-space-deep relative overflow-hidden text-center md:text-left">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber/[0.02] blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.01] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header Title Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto space-y-6 mb-20 md:mb-28"
                >
                    <p className="text-xs font-display font-bold text-amber uppercase tracking-[0.4em]">
                        Sempre Con Te
                    </p>
                    <h2 className="text-4xl md:text-6xl font-display font-600 text-transparent bg-clip-text bg-gradient-to-br from-white via-text-warm to-amber/50 leading-tight">
                        Luminel ti raggiunge <br className="hidden md:block" />ovunque tu sia.
                    </h2>
                    <p className="text-text-muted text-lg font-light leading-relaxed max-w-2xl mx-auto">
                        Dal divano alle 3 del mattino, in pausa pranzo, o mentre cammini sotto la pioggia. Testo o voce — Luminel è sempre pronto.
                    </p>
                </motion.div>

                {/* 3-Device Extravagant Grid */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

                    {/* Left Column - Phone (Col span 5) */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full glass bg-gradient-to-b from-space-surface/60 to-space-surface/20 rounded-[2.5rem] p-8 md:p-12 border border-white/5 hover:border-amber/20 transition-all duration-700 flex flex-col relative overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.1)] hover:shadow-[0_0_60px_rgba(196,154,42,0.1)]"
                        >
                            {/* Inner Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                            {/* CSS Phone Mockup */}
                            <div className="flex-1 flex items-center justify-center relative z-10 mb-12">
                                <div className="relative w-[240px] h-[500px] md:w-[260px] md:h-[540px] rounded-[3rem] bg-[#0a0a0a] border-[8px] border-[#1a1a1a] shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_80px_rgba(196,154,42,0.1)] overflow-hidden mx-auto transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                                    {/* Reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 z-30 pointer-events-none" />

                                    {/* Dynamic Island */}
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-40 border border-white/5 shadow-inner" />

                                    {/* Inner Screen */}
                                    <div className="absolute inset-0 bg-space-deep flex flex-col z-20">
                                        {/* Chat UI Header */}
                                        <div className="pt-16 pb-4 border-b border-white/5 flex flex-col items-center justify-center bg-space-surface/80 backdrop-blur-md">
                                            <div className="w-10 h-10 rounded-full border border-amber/20 bg-amber/5 flex items-center justify-center shadow-[0_0_20px_rgba(196,154,42,0.1)] mb-2 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-amber/20 blur-md" />
                                                <Sparkles className="w-5 h-5 text-amber relative z-10" />
                                            </div>
                                            <p className="text-[9px] font-display font-bold text-text-warm uppercase tracking-widest">Luminel</p>
                                        </div>

                                        {/* Chat Messages */}
                                        <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden relative">
                                            <div className="self-end max-w-[85%] bg-amber/10 border border-amber/20 rounded-2xl rounded-tr-sm p-3 shadow-sm transform translate-y-2">
                                                <p className="text-[11px] text-text-warm leading-relaxed opacity-90">Ho la testa pesante oggi. Troppe decisioni.</p>
                                            </div>
                                            <div className="self-start max-w-[85%] bg-space-surface border border-white/10 rounded-2xl rounded-tl-sm p-3 shadow-md relative transform translate-y-2">
                                                <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center">
                                                    <Sparkles className="w-3 h-3 text-amber" />
                                                </div>
                                                <p className="text-[11px] text-text-secondary leading-relaxed">È normale sentirsi così. Scomponiamo il peso. Qual è la decisione più urgente che devi prendere ora?</p>
                                            </div>
                                        </div>

                                        {/* Input area */}
                                        <div className="p-4 bg-space-surface/80 backdrop-blur-md border-t border-white/5">
                                            <div className="w-full h-10 rounded-full border border-white/10 bg-space-deep flex items-center px-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber/50 animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 text-center space-y-3 mt-auto">
                                <h3 className="text-xl md:text-2xl font-display font-bold text-text-warm">Mobile-first. Intimo.</h3>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    Pensato per i momenti privati — a letto, in pausa, in metro. La tua conversazione più importante cabe in tasca.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Desktop & Glasses (Col span 7) */}
                    <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-12">

                        {/* Top Right - Laptop Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex-1 glass bg-gradient-to-b from-space-surface/60 to-space-surface/20 rounded-[2.5rem] p-8 md:p-12 border border-white/5 hover:border-amber/20 transition-all duration-700 flex flex-col relative overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.1)] hover:shadow-[0_0_60px_rgba(196,154,42,0.1)]"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                            <div className="flex-1 flex items-center justify-center relative z-10 mb-12">
                                {/* CSS Laptop Mockup */}
                                <div className="relative w-full max-w-[420px] aspect-[16/10] mx-auto transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 flex flex-col">
                                    {/* Laptop Screen */}
                                    <div className="w-full flex-1 bg-[#0a0a0a] rounded-t-2xl border-[4px] border-[#1a1a1a] border-b-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">

                                        {/* Luminel Landing Page replica */}
                                        <div className="absolute inset-0 bg-space-deep p-4 flex flex-col">
                                            {/* Header */}
                                            <div className="flex justify-between items-center mb-6">
                                                <div className="flex items-center gap-1">
                                                    <Sparkles className="w-3 h-3 text-amber" />
                                                    <span className="text-[7px] font-display font-bold text-text-warm tracking-widest uppercase">Luminel</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="w-6 h-1 bg-text-muted/20 rounded" />
                                                    <div className="w-6 h-1 bg-text-muted/20 rounded" />
                                                </div>
                                            </div>

                                            {/* Mini Hero */}
                                            <div className="flex-1 flex flex-col items-center justify-center text-center">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber/10 to-transparent flex items-center justify-center mb-4 border border-amber/10 shadow-[0_0_30px_rgba(196,154,42,0.1)] relative">
                                                    <div className="w-8 h-8 rounded-full bg-amber/20 blur-md absolute" />
                                                    <Sparkles className="w-5 h-5 text-amber relative z-10" />
                                                </div>
                                                <div className="w-32 h-2.5 bg-gradient-to-r from-text-warm to-text-secondary rounded-full mb-2" />
                                                <div className="w-40 h-2.5 bg-gradient-to-r from-text-warm to-text-secondary rounded-full mb-4" />
                                                <div className="w-20 h-1.5 bg-text-muted/30 rounded-full mb-6" />
                                                <div className="w-16 h-5 rounded-full bg-amber/10 border border-amber/30" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Laptop Base */}
                                    <div className="w-[112%] -ml-[6%] h-3 md:h-4 bg-gradient-to-b from-[#d4d4d4] to-[#808080] rounded-b-xl border border-[#999] shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20 flex justify-center relative">
                                        <div className="absolute top-0 w-20 h-1 bg-[#666] rounded-b-md" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 text-center space-y-3 mt-auto">
                                <h3 className="text-xl md:text-2xl font-display font-bold text-text-warm">Desktop per sessioni profonde.</h3>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    Quando hai bisogno di più spazio per pensare. La stessa esperienza, su schermo grande, per le riflessioni lunghe.
                                </p>
                            </div>
                        </motion.div>

                        {/* Bottom Right - Smart Glasses Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex-1 glass bg-gradient-to-b from-space-surface/60 to-space-surface/20 rounded-[2.5rem] p-8 md:p-12 border border-white/5 hover:border-amber/20 transition-all duration-700 flex flex-col relative overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.1)] hover:shadow-[0_0_60px_rgba(196,154,42,0.1)]"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                            <div className="flex-1 flex items-center justify-center relative z-10 mb-12">
                                {/* CSS Smart Glasses Mockup */}
                                <div className="relative w-full max-w-[320px] h-[140px] md:h-[160px] mx-auto transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 flex items-center justify-center">
                                    {/* Main Visor */}
                                    <div className="w-full h-[100px] md:h-[120px] rounded-[3rem] bg-gradient-to-b from-[#1a1a1a] via-[#050505] to-[#000] border-t border-white/20 border-b border-black shadow-[0_30px_60px_rgba(0,0,0,0.7),inset_0_2px_15px_rgba(255,255,255,0.1)] relative overflow-hidden flex items-center justify-center z-10">
                                        {/* Visor Core Reflection */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 scale-150 mix-blend-overlay opacity-30 pointer-events-none" />

                                        {/* Lenses / AI 'Eyes' */}
                                        <div className="flex items-center gap-2 md:gap-4 relative z-10 px-4 md:px-6 w-full justify-between">
                                            <div className="w-[110px] h-[50px] md:w-[120px] md:h-[60px] rounded-[40%] bg-gradient-to-br from-amber/20 to-transparent border border-amber/10 shadow-[inset_0_0_30px_rgba(196,154,42,0.2)] relative overflow-hidden group-hover:from-amber/30 transition-colors duration-700">
                                                <div className="absolute -left-4 -top-4 w-12 h-12 md:w-16 md:h-16 bg-white/10 blur-xl rounded-full" />
                                                <div className="absolute right-4 bottom-4 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber/80 blur-[2px] shadow-[0_0_10px_rgba(196,154,42,1)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                                    <div className="w-1 h-3 bg-amber rounded-full shadow-[0_0_10px_rgba(196,154,42,1)]" />
                                                </div>
                                            </div>
                                            <div className="w-[110px] h-[50px] md:w-[120px] md:h-[60px] rounded-[40%] bg-gradient-to-bl from-amber/20 to-transparent border border-amber/10 shadow-[inset_0_0_30px_rgba(196,154,42,0.2)] relative overflow-hidden group-hover:from-amber/30 transition-colors duration-700">
                                                <div className="absolute -right-4 -top-4 w-12 h-12 md:w-16 md:h-16 bg-white/10 blur-xl rounded-full" />
                                                <div className="absolute left-4 bottom-4 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber/80 blur-[2px] shadow-[0_0_10px_rgba(196,154,42,1)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                                    <div className="w-1 h-3 bg-amber rounded-full shadow-[0_0_10px_rgba(196,154,42,1)]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Head Straps */}
                                    <div className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-4 w-6 h-8 md:h-10 bg-gradient-to-r from-[#111] to-[#222] rounded-r-xl border-r border-t border-b border-[#333] shadow-inner z-[5]" />
                                    <div className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-4 w-6 h-8 md:h-10 bg-gradient-to-l from-[#111] to-[#222] rounded-l-xl border-l border-t border-b border-[#333] shadow-inner z-[5]" />
                                </div>
                            </div>

                            <div className="relative z-10 text-center space-y-3 mt-auto">
                                <h3 className="text-xl md:text-2xl font-display font-bold text-text-warm">Occhi Intelligenti. Sempre pronto.</h3>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    Check-in gentili nei momenti giusti. Non notifiche fastidiose — presenze misurate che ti ricordano: non sei solo.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
