import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
    {
        q: 'Luminel è un sostituto della terapia?',
        a: 'No. Luminel è un compagno digitale per il benessere quotidiano, non un servizio medico. Se hai bisogno di supporto clinico, ti consigliamo di rivolgerti a un professionista.',
    },
    {
        q: 'I miei dati sono al sicuro?',
        a: 'Assolutamente. Le conversazioni sono cifrate, i dati restano in UE (GDPR), e non vendiamo né condividiamo mai le tue informazioni. Puoi richiedere la cancellazione completa in qualsiasi momento.',
    },
    {
        q: 'Posso cancellare l\'abbonamento quando voglio?',
        a: 'Sì, zero vincoli. Cancelli con un click e mantieni l\'accesso fino alla fine del periodo pagato.',
    },
    {
        q: 'Cosa significa "amnesia giornaliera" nel piano Freemium?',
        a: 'Nel piano Freemium, Luminel non conserva la memoria delle conversazioni tra una sessione e l\'altra. Ogni giorno è una pagina nuova. Con i piani Pro e superiori, Luminel ricorda tutto e cresce con te.',
    },
    {
        q: 'Cosa appare sull\'estratto conto?',
        a: 'La fatturazione appare come "LMNL Systems" per proteggere la tua privacy. Nessuno saprà che stai usando un compagno digitale.',
    },
    {
        q: 'Luminel è disponibile 24/7?',
        a: 'Sì, sempre. Alle 3 del mattino come alle 3 del pomeriggio. Luminel non dorme, non si stanca, e non ti giudica mai.',
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-space-deep">
            <div className="max-w-2xl mx-auto px-6 relative z-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xs font-display font-bold text-amber uppercase tracking-[0.3em] mb-4 text-center"
                >
                    Domande frequenti
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-display font-600 text-text-warm text-center mb-14"
                >
                    Tutto ciò che <span className="text-text-secondary">devi sapere.</span>
                </motion.h2>

                <div className="space-y-3">
                    {FAQS.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="glass rounded-xl border border-space-border overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                            >
                                <span className="text-sm font-display font-500 text-text-warm group-hover:text-amber transition-colors pr-4">
                                    {faq.q}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-amber' : ''
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pb-5 text-sm text-text-muted leading-relaxed font-light">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
