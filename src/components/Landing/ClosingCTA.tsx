import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function ClosingCTA({ onEnter }: { onEnter: () => void }) {
    return (
        <section className="py-32 px-6 bg-stone-950 border-t border-white/5 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto space-y-8"
            >
                <h3 className="text-3xl md:text-5xl font-serif text-white">
                    Il rumore è assordante.<br />
                    <span className="text-stone-500">È ora di chiudere la porta.</span>
                </h3>

                <button
                    onClick={onEnter}
                    className="group relative inline-flex items-center gap-4 px-10 py-5 bg-luminel-gold text-black font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-[#b8860b] transition-colors shadow-2xl shadow-luminel-gold/10"
                >
                    Inizia la tua prima sessione
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[10px] text-stone-600 uppercase tracking-widest">
                    (Nessuna carta di credito richiesta per entrare)
                </p>
            </motion.div>
        </section>
    );
}
