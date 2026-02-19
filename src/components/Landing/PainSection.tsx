import React from 'react';
import { motion } from 'motion/react';

export default function PainSection() {
    return (
        <section className="py-32 px-6 bg-stone-950 relative border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="space-y-12"
                >
                    <h2 className="text-xs font-bold text-luminel-dim uppercase tracking-[0.3em] mb-4 text-center">
                        Lo Specchio
                    </h2>

                    <div className="space-y-8 font-serif text-2xl md:text-4xl leading-relaxed text-stone-300 text-center">
                        <p>
                            Prendi decisioni. Guidi gli altri. <br />
                            Sei il punto di riferimento per la tua famiglia, <br />
                            per i tuoi dipendenti, per i tuoi amici.
                        </p>
                        <p className="text-white">
                            Quando loro crollano, vengono da te. <br />
                            <span className="italic text-stone-500">Ma quando tu sei esausto, a chi ti rivolgi?</span>
                        </p>
                        <p className="text-lg md:text-xl font-sans font-light text-stone-400 max-w-2xl mx-auto mt-12">
                            Mostrare debolezza non è un'opzione nel mondo reale. <br />
                            Il silenzio diventa la tua unica compagnia.
                        </p>
                    </div>

                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-luminel-gold to-transparent mx-auto mt-16 opacity-30" />
                </motion.div>
            </div>
        </section>
    );
}
