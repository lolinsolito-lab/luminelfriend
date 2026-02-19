import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, CheckCircle } from 'lucide-react';

export default function DisclaimerOverlay({ onAccept }: { onAccept: () => void }) {
    const [canAccept, setCanAccept] = useState(false);

    // Force a small delay so they actually see it
    useEffect(() => {
        const timer = setTimeout(() => setCanAccept(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-stone-950/98 z-[100] flex items-center justify-center p-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full border border-luminel-dim/30 bg-stone-900/50 p-8 md:p-12 rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.05)] relative"
            >
                <div className="flex justify-center mb-6">
                    <ShieldAlert className="w-12 h-12 text-luminel-gold" />
                </div>

                <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
                    Protocollo di Sicurezza
                </h2>

                <div className="text-left space-y-4 text-stone-400 text-sm leading-relaxed mb-8 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-luminel-dim/20">
                    <p>
                        <strong className="text-white">1. Natura del Servizio:</strong> Luminel è un'Intelligenza Artificiale avanzata progettata esclusivamente per scopi di <span className="text-luminel-gold">intrattenimento e supporto narrativo</span>. Non è un essere umano, né un professionista della salute mentale.
                    </p>
                    <p>
                        <strong className="text-white">2. Esclusione di Responsabilità Medica:</strong> Questo servizio <span className="text-red-400">NON fornisce consulenza medica, psicologica, psichiatrica o legale</span>. Le interazioni non costituiscono una diagnosi né una terapia.
                    </p>
                    <p>
                        <strong className="text-white">3. Emergenze:</strong> Se ti trovi in una situazione di emergenza, pericolo di vita, o hai pensieri autolesionistici, <span className="text-white border-b border-red-500">interrompi immediatamente l'uso</span> e contatta il numero unico di emergenza <strong>112</strong> o recati al pronto soccorso più vicino.
                    </p>
                    <p>
                        <strong className="text-white">4. Accettazione dei Rischi:</strong> Proseguendo, accetti di utilizzare Luminel sotto la tua esclusiva responsabilità, manlevando i creatori da qualsiasi pretesa legale derivante dall'uso del software.
                    </p>
                </div>

                <button
                    onClick={onAccept}
                    disabled={!canAccept}
                    className={`w-full py-4 uppercase tracking-widest text-xs font-bold transition-all duration-500 flex items-center justify-center gap-3 rounded-sm
            ${canAccept
                            ? 'bg-luminel-gold text-black hover:bg-luminel-glow cursor-pointer shadow-lg shadow-luminel-gold/10'
                            : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-white/5 opacity-50'
                        }`}
                >
                    {canAccept ? (
                        <>
                            Accetto e Comprendo
                            <CheckCircle className="w-4 h-4 ml-2" />
                        </>
                    ) : (
                        "Lettura in corso..."
                    )}
                </button>

                <p className="text-[10px] text-stone-600 mt-6 uppercase tracking-widest font-mono">
                    Legal ID: LMNL-EU-2026-SECURE
                </p>

            </motion.div>
        </div>
    );
}
