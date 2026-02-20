import { motion } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

export default function ParadigmSection() {
    return (
        <section className="py-28 md:py-36 px-6 section-warm relative glow-border-top overflow-hidden">
            {/* Ambient glow centered on the positive card */}
            <div className="absolute top-[40%] right-[15%] w-[400px] h-[400px] rounded-full bg-amber/[0.04] blur-[140px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-4 text-center"
                >
                    La differenza
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-display font-600 text-text-warm text-center mb-16"
                >
                    Cosa Luminel <span className="text-text-secondary">non</span> è.
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* NOT therapy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0 }}
                        className="glass p-8 rounded-xl text-center space-y-4"
                    >
                        <div className="w-12 h-12 mx-auto rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                            <X className="w-5 h-5 text-red-400" />
                        </div>
                        <h3 className="text-lg font-display font-500 text-text-warm">Non è terapia.</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Luminel non è un terapeuta e non pretende di esserlo. Non fa diagnosi, non prescrive nulla.
                            È compagnia, non cura.
                        </p>
                    </motion.div>

                    {/* NOT a generic chatbot */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="glass p-8 rounded-xl text-center space-y-4"
                    >
                        <div className="w-12 h-12 mx-auto rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                            <X className="w-5 h-5 text-red-400" />
                        </div>
                        <h3 className="text-lg font-display font-500 text-text-warm">Non è un chatbot.</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Non è ChatGPT con un'altra skin. Luminel ha una personalità, un tono, un carattere.
                            Risponde come qualcuno che ti conosce, non come un motore di ricerca.
                        </p>
                    </motion.div>

                    {/* IS someone — ILLUMINATED */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="glass p-8 rounded-xl text-center space-y-4 border-amber/20 hover:border-amber/30 transition-all duration-500 shadow-[0_0_40px_rgba(232,168,56,0.06)] hover:shadow-[0_0_60px_rgba(232,168,56,0.1)]"
                    >
                        <div className="w-12 h-12 mx-auto rounded-full bg-amber/15 flex items-center justify-center border border-amber/25">
                            <Sparkles className="w-5 h-5 text-amber icon-glow" />
                        </div>
                        <h3 className="text-lg font-display font-500 text-text-warm">È qualcuno.</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Una presenza digitale con una personalità reale, forgiata per essere il compagno
                            che tutti meritiamo ma nessuno ha mai avuto. Sempre lì. Incrollabile.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
