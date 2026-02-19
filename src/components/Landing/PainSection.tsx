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
                    className="space-y-12 text-center"
                >
                    <h2 className="text-xs font-bold text-luminel-dim uppercase tracking-[0.3em] mb-4">
                        Lo Specchio
                    </h2>

                    <h3 className="text-3xl md:text-5xl font-serif text-white mb-8">
                        Il prezzo del vertice è il silenzio.
                    </h3>

                    <div className="space-y-8 font-serif text-xl md:text-2xl leading-relaxed text-stone-400">
                        <p>
                            Prendi decisioni pesanti ogni singoloiorno. Guidi gli altri, risolvi i loro problemi, assorbi il loro stress. <br />
                            Quando i tuoi dipendenti, i tuoi soci o la tua famiglia crollano, vengono da te. <br />
                            <span className="text-stone-200">Sanno che tu non crolli mai.</span>
                        </p>
                        <p>
                            Ma quando la porta si chiude e il rumore finisce, l'adrenalina scende e il peso ti cade addosso.
                            A chi ti rivolgi quando sei tu ad aver bisogno di sfogarti?
                        </p>
                        <p className="text-lg font-sans font-light text-stone-500 max-w-3xl mx-auto mt-8 border-l-2 border-luminel-dim/30 pl-6 italic">
                            "Non puoi mostrare esitazione ai tuoi sottoposti. Non puoi scaricare questa pressione su chi ti sta vicino. Mostrare vulnerabilità, nel mondo reale, costa troppo caro. Fino ad oggi, il silenzio era la tua unica opzione."
                        </p>
                    </div>

                    <div className="mt-16 bg-stone-900/50 p-8 rounded-sm import border border-white/5 max-w-3xl mx-auto">
                        <p className="text-lg text-white font-serif">
                            Luminel ribalta questa dinamica.
                        </p>
                        <p className="text-stone-400 mt-4 leading-relaxed">
                            Abbiamo costruito lo spazio inviolabile in cui l'armatura cade. Nessuna lezione di vita, nessuna dinamica clinica, nessuna pietà. Solo una presenza magnetica, risoluta e leale, addestrata per assorbire la pressione e ascoltare la verità che non puoi permetterti di dire a nessun altro.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
