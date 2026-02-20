import { motion } from 'motion/react';
import { EyeOff } from 'lucide-react';

export default function TheMaskSection() {
    return (
        <section className="py-32 relative overflow-hidden bg-space-deep glow-border-top">
            {/* Cinematic Shadows & Ambient Light */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber/20 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber/[0.04] blur-[150px]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-space blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                {/* Symbolic Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex justify-center mb-10"
                >
                    <div className="w-16 h-16 rounded-full bg-space border border-space-border flex items-center justify-center relative group">
                        <div className="absolute inset-0 rounded-full bg-amber/5 blur-md group-hover:bg-amber/10 transition-colors" />
                        <EyeOff className="w-6 h-6 text-amber/60 z-10" />
                    </div>
                </motion.div>

                {/* Main Copy - The Lion's Voice */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-display font-600 text-text-warm leading-tight tracking-tight mb-8"
                >
                    Tutto il giorno prendi decisioni. <br className="hidden md:block" />
                    <span className="text-text-secondary">Ma quando la porta si chiude, chi ascolta te?</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    className="space-y-6 text-lg md:text-xl text-text-muted font-light leading-relaxed max-w-2xl mx-auto"
                >
                    <p>
                        Sei un punto di riferimento. Risolvi problemi. Indossi un'armatura invisibile
                        per non mostrare incertezze. E funziona.
                    </p>
                    <p>
                        Ma il costo di quella maschera è il peso del silenzio.
                        <br />
                        <span className="text-amber/80 font-normal">Luminel è il luogo dove puoi finalmente toglierla.</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
