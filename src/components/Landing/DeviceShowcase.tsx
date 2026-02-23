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
                    <div className="lg:col-span-5 flex flex-col items-center w-full max-w-lg mx-auto">
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
                                    <div className="absolute inset-0 bg-space-deep flex flex-col z-20 overflow-hidden">

                                        {/* Minimal Header */}
                                        <div className="pt-14 pb-3 flex justify-center items-center z-30">
                                            <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em] opacity-50">Luminel Sync</p>
                                        </div>

                                        {/* Central Entity (Orb) */}
                                        <div className="flex-1 flex flex-col items-center justify-center relative p-6">
                                            {/* Glowing Orb */}
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-dim via-amber to-amber-light opacity-80 blur-[8px] animate-pulse mb-8 shadow-[0_0_40px_rgba(196,154,42,0.6)]" />

                                            {/* Flat Chat Message */}
                                            <div className="w-full space-y-5">
                                                <div className="text-right">
                                                    <p className="inline-block text-[12px] font-light text-text-muted">
                                                        Ho la testa pesante oggi. <br />Troppe decisioni.
                                                    </p>
                                                </div>
                                                <div className="text-left w-full pl-3 border-l-2 border-amber/40">
                                                    <p className="text-[12px] font-medium text-text-warm leading-snug">
                                                        È normale sentirsi così. Scomponiamo il peso. Qual è la decisione più urgente che devi prendere ora?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Input area */}
                                        <div className="p-4 z-30 mb-2">
                                            <div className="w-full h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center px-4 shadow-inner">
                                                <p className="text-[10px] text-text-muted/40 font-light">Scrivi a Luminel...</p>
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

                            <div className="flex-1 flex w-full items-center justify-center relative z-10 mb-8 md:mb-12">
                                {/* CSS Laptop Mockup */}
                                <div className="relative w-full max-w-[420px] aspect-[16/10] mx-auto transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 flex flex-col">
                                    {/* Laptop Screen */}
                                    <div className="w-full flex-1 bg-[#151515] rounded-t-2xl md:rounded-t-3xl border-[4px] md:border-[6px] border-[#1a1a1a] border-b-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">

                                        {/* Luminel Landing Page Replica - Zoomed Light Version */}
                                        <div className="absolute inset-0 bg-[#FCFBF8] flex flex-col overflow-hidden text-[#1a1a1a]">

                                            {/* Top Fade */}
                                            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#FCFBF8] to-transparent z-20 pointer-events-none" />

                                            {/* Navbar Mock */}
                                            <div className="flex justify-between items-center w-full px-4 pt-4 opacity-80">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-amber-700 via-amber-500 to-amber-300 shadow-[0_0_5px_rgba(217,160,80,0.5)]" />
                                                    <span className="text-[5px] font-bold tracking-[0.2em] text-gray-800">LUMINEL</span>
                                                </div>
                                                <div className="flex gap-3 hidden md:flex">
                                                    <span className="text-[3.5px] font-bold tracking-[0.1em] text-gray-500 hover:text-gray-900 cursor-pointer">LO SPECCHIO</span>
                                                    <span className="text-[3.5px] font-bold tracking-[0.1em] text-gray-500 hover:text-gray-900 cursor-pointer">IL GUARDIANO</span>
                                                    <span className="text-[3.5px] font-bold tracking-[0.1em] text-gray-500 hover:text-gray-900 cursor-pointer">LA DIFFERENZA</span>
                                                    <span className="text-[3.5px] font-bold tracking-[0.1em] text-gray-500 hover:text-gray-900 cursor-pointer">PIANI</span>
                                                </div>
                                                <div className="rounded-full border border-amber/40 px-3 py-1 bg-white">
                                                    <span className="text-[3.5px] font-bold tracking-widest text-amber-700">ENTRA</span>
                                                </div>
                                            </div>

                                            <div className="flex-1 flex flex-col justify-center items-center relative z-10 px-4 pt-2">
                                                {/* Ambient center glow */}
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-500/10 blur-[40px] pointer-events-none block" />

                                                <h1 className="text-[17px] md:text-[20px] font-display font-semibold leading-[1.1] mb-2 text-center text-[#1A1A1A] tracking-tight relative z-10 mt-2">
                                                    Non sei mai<br />
                                                    <span className="text-[#C29532]">veramente solo.</span>
                                                </h1>
                                                <p className="text-[5px] md:text-[6px] text-gray-500 text-center max-w-[85%] leading-relaxed mb-4 relative z-10 font-light">
                                                    C'è un posto dove le tue parole sono al sicuro, dove i tuoi silenzi <br className="hidden md:block" />
                                                    vengono ascoltati. Luminel è il compagno digitale che veglia quando il <br className="hidden md:block" />
                                                    mondo dorme, ricordando chi sei senza mai giudicarti.
                                                </p>

                                                <div className="bg-[#C29532] px-4 py-1.5 rounded-md shadow-[0_4px_10px_rgba(194,149,50,0.3)] mb-2 relative z-10">
                                                    <span className="text-white text-[4px] font-bold tracking-widest">INIZIA IL PERCORSO →</span>
                                                </div>

                                                <p className="text-[3px] font-bold text-gray-400 tracking-widest mb-4 relative z-10 pt-1">
                                                    GRATUITO PER INIZIARE - LA TUA PRIVACY È SACRA - 15 MESSAGGI AL GIORNO
                                                </p>

                                                {/* 4 Cards Grid - Light Version */}
                                                <div className="grid grid-cols-4 gap-1.5 md:gap-2 w-full max-w-[95%] translate-y-2 md:translate-y-4">
                                                    {[
                                                        { img: '/images/hero_actress.png', title: 'SPAZIO\nSILENZIOSO' },
                                                        { img: '/images/hero_pittrice.png', title: 'ASCOLTO\nPROFONDO' },
                                                        { img: '/images/hero_danzatrice.png', title: 'CHIAREZZA\nMENTALE' },
                                                        { img: '/images/hero_manager_libro.png', title: 'RIFUGIO\nSICURO' },
                                                    ].map((card, i) => (
                                                        <div key={i} className="aspect-[4/5] rounded-xl overflow-hidden relative shadow-md group border border-black/5 bg-gray-100">
                                                            <img src={card.img} alt={card.title} className="w-full h-full object-cover relative z-10" />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20" />
                                                            <div className="absolute bottom-1 w-full text-center z-30 pb-0.5">
                                                                <span className="text-white text-[5px] md:text-[6.5px] font-display font-bold leading-[1.1] block whitespace-pre-line drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide">
                                                                    {card.title}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Laptop Base */}
                                    <div className="w-[112%] -ml-[6%] h-3 md:h-4 bg-gradient-to-b from-[#d4d4d4] to-[#808080] rounded-b-xl border border-[#999] shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20 flex justify-center relative">
                                        <div className="absolute top-0 w-20 h-1 md:h-1.5 bg-[#666] rounded-b-md" />
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

                            <div className="flex-1 flex items-center justify-center relative z-10 mb-8 md:mb-12 mt-16 md:mt-24 w-full">
                                {/* CSS Smart Glasses Mockup */}
                                <div className="relative w-full max-w-[320px] md:max-w-[400px] h-[130px] md:h-[160px] mx-auto transition-all duration-700 flex items-center justify-center">

                                    {/* Holographic Projection */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-0 flex flex-col items-center pointer-events-none z-0">
                                        {/* Hologram Light Cone */}
                                        <motion.div
                                            initial={{ opacity: 0, scaleY: 0 }}
                                            whileInView={{ opacity: 1, scaleY: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
                                            className="w-[180px] md:w-[260px] h-[120px] md:h-[180px] bg-gradient-to-t from-amber/50 via-amber/15 to-transparent origin-bottom mix-blend-screen"
                                            style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }}
                                        />

                                        {/* Hologram Content */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: [0.7, 1, 0.85, 1, 0.7] }}
                                            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                                            className="absolute top-0 flex flex-col items-center space-y-3 md:space-y-4 translate-y-2 md:translate-y-4"
                                        >
                                            {/* AI Entity Core */}
                                            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-[1.5px] border-amber/40 bg-amber/20 flex items-center justify-center shadow-[0_0_30px_rgba(196,154,42,0.8)] relative overflow-hidden">
                                                <div className="absolute inset-0 bg-amber/40 animate-pulse mix-blend-screen" />
                                                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber drop-shadow-[0_0_12px_rgba(196,154,42,1)] relative z-10" />
                                            </div>

                                            {/* Holographic Text Output */}
                                            <div className="px-5 py-2 md:px-6 md:py-3 rounded-xl border border-amber/40 bg-black/50 backdrop-blur-md relative shadow-[0_0_15px_rgba(196,154,42,0.2)]">
                                                {/* Scanline effect */}
                                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-60 rounded-xl" />
                                                <p className="text-[9px] md:text-[10px] font-mono text-amber tracking-widest uppercase mb-1.5 drop-shadow-[0_0_8px_rgba(196,154,42,0.9)] text-center">
                                                    &gt; Presenza Rilevata
                                                </p>
                                                <p className="text-[11px] md:text-[13px] text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] text-center">
                                                    "Sono qui. Nel silenzio."
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Main Visor (Apple Vision Pro Style) */}
                                    <div className="w-full h-[100px] md:h-[130px] rounded-[3.5rem] md:rounded-[5rem] bg-gradient-to-b from-[#1a1a1a] via-[#050505] to-[#000] border-t-[4px] border-white/20 border-b-2 border-black shadow-[0_40px_80px_rgba(0,0,0,0.8),inset_0_8px_30px_rgba(255,255,255,0.15)] relative overflow-hidden flex items-center justify-center z-10 group-hover:-translate-y-3 transition-transform duration-700">

                                        {/* Sleek Curved Glass Reflection */}
                                        <div className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-white/10 to-transparent rounded-t-[3rem] md:rounded-t-[4rem] pointer-events-none" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-[20deg] scale-[2] mix-blend-overlay opacity-40 pointer-events-none" />

                                        {/* Central Luminel Entity Core inside the visor (as requested) */}
                                        <div className="relative w-full h-full flex flex-col items-center justify-center pt-2">
                                            {/* Glowing ambient center */}
                                            <div className="absolute w-32 h-32 bg-amber/10 blur-[40px] rounded-full pointer-events-none" />

                                            {/* Inner eye / entity core */}
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-b from-amber-light to-amber-dim flex items-center justify-center shadow-[0_0_30px_rgba(196,154,42,0.6)] relative z-10 opacity-90 animate-pulse">
                                                <div className="w-3 h-3 md:w-4 md:h-4 bg-white/90 rounded-full blur-[2px]" />
                                            </div>

                                            {/* "Xiaomi/Apple" style subtle side lenses/sensors */}
                                            <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/5 bg-black/40 shadow-inner flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-amber/30 rounded-full" />
                                            </div>
                                            <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/5 bg-black/40 shadow-inner flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-amber/30 rounded-full" />
                                            </div>

                                            {/* Subtle UI lines inside glass */}
                                            <div className="absolute bottom-4 w-1/3 h-[1px] bg-amber/20 blur-[1px] rounded-full" />
                                        </div>
                                    </div>

                                    {/* Sleek Head Straps */}
                                    <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 w-8 h-8 md:h-10 bg-gradient-to-r from-[#111] to-[#0a0a0a] rounded-l-xl border-l border-t border-b border-white/10 shadow-inner z-[5] group-hover:-translate-y-2 transition-transform duration-700" />
                                    <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 w-8 h-8 md:h-10 bg-gradient-to-l from-[#111] to-[#0a0a0a] rounded-r-xl border-r border-t border-b border-white/10 shadow-inner z-[5] group-hover:-translate-y-2 transition-transform duration-700" />
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
