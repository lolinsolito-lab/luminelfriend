import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, CheckCircle } from 'lucide-react';

export default function DisclaimerOverlay({ onAccept }: { onAccept: () => void }) {
    const [canAccept, setCanAccept] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setCanAccept(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-space-deep/98 z-[100] flex items-center justify-center p-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full glass border-amber/15 p-8 md:p-12 rounded-xl shadow-[0_0_60px_rgba(232,168,56,0.05)] relative"
            >
                <div className="flex justify-center mb-6">
                    <ShieldAlert className="w-12 h-12 text-amber" />
                </div>

                <h2 className="text-2xl md:text-3xl font-display font-600 text-text-warm mb-6">
                    Prima di iniziare
                </h2>

                <div className="text-left space-y-4 text-text-secondary text-sm leading-relaxed mb-8 max-h-[40vh] overflow-y-auto pr-2">
                    <p>
                        <strong className="text-text-warm">1. Natura del Servizio:</strong> Luminel è un'Intelligenza Artificiale avanzata progettata esclusivamente per scopi di <span className="text-amber">intrattenimento e compagnia virtuale</span>. Non è un essere umano, né un professionista della salute mentale.
                    </p>
                    <p>
                        <strong className="text-text-warm">2. Esclusione di Responsabilità Medica:</strong> Questo servizio <span className="text-red-400">NON fornisce consulenza medica, psicologica, psichiatrica o legale</span>. Le interazioni non costituiscono una diagnosi né una terapia.
                    </p>
                    <p>
                        <strong className="text-text-warm">3. Emergenze:</strong> Se ti trovi in una situazione di emergenza, pericolo di vita, o hai pensieri autolesionistici, <span className="text-text-warm border-b border-red-500">interrompi immediatamente l'uso</span> e contatta il numero unico di emergenza <strong>112</strong> o recati al pronto soccorso più vicino.
                    </p>
                    <p>
                        <strong className="text-text-warm">4. Accettazione dei Rischi:</strong> Proseguendo, accetti di utilizzare Luminel sotto la tua esclusiva responsabilità, manlevando i creatori da qualsiasi pretesa legale derivante dall'uso del software.
                    </p>
                </div>

                <button
                    onClick={onAccept}
                    disabled={!canAccept}
                    className={`w-full py-4 uppercase tracking-widest text-xs font-display font-bold transition-all duration-500 flex items-center justify-center gap-3 rounded-xl
            ${canAccept
                            ? 'bg-gradient-to-r from-amber to-amber-dim text-space-deep hover:from-amber-glow hover:to-amber cursor-pointer shadow-lg shadow-amber/15'
                            : 'glass text-text-muted cursor-not-allowed opacity-50'
                        }`}
                >
                    {canAccept ? (
                        <>
                            Accetto e comprendo
                            <CheckCircle className="w-4 h-4 ml-2" />
                        </>
                    ) : (
                        "Lettura in corso..."
                    )}
                </button>

                <p className="text-[10px] text-text-muted mt-6 uppercase tracking-widest font-mono">
                    Legal ID: LMNL-EU-2026-SECURE
                </p>

            </motion.div>
        </div>
    );
}
