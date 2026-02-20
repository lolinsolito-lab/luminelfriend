import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Edit3, Cookie } from 'lucide-react';
import { useEffect } from 'react';

export type LegalDocType = 'privacy' | 'terms' | 'cookies' | null;

interface LegalModalProps {
    isOpen: boolean;
    type: LegalDocType;
    onClose: () => void;
}

export default function LegalModal({ isOpen, type, onClose }: LegalModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen || !type) return null;

    const renderContent = () => {
        switch (type) {
            case 'privacy':
                return (
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 rounded-xl bg-space border border-space-border">
                                <Shield className="w-6 h-6 text-amber" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-display font-600">Privacy Policy</h2>
                        </div>
                        <div className="prose prose-amber max-w-none text-text-secondary leading-relaxed">
                            <p>Prendiamo la tua privacy con la massima serietà. Luminel è progettato secondo i principi di <strong>Privacy by Design</strong> e <strong>Data Minimization</strong>.</p>

                            <h3 className="text-xl font-display text-text-warm mt-8 mb-4">1. Dati Raccolti</h3>
                            <p>Raccogliamo esclusivamente i dati strettamente necessari per il funzionamento del servizio:</p>
                            <ul>
                                <li>Indirizzo email (solo per account Pro/VIP).</li>
                                <li>Trascrizioni testuali delle interazioni con l'AI, necessarie unicamente per fornire la "Memoria" del sistema.</li>
                            </ul>

                            <h3 className="text-xl font-display text-text-warm mt-8 mb-4">2. Nessun Addestramento Modelli</h3>
                            <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-xl my-4">
                                <p className="text-red-800 m-0 text-sm">
                                    <strong>Fondamentale:</strong> Le tue conversazioni private <strong>NON</strong> vengono mai utilizzate per addestrare modelli linguistici di terze parti (LLM). Il tuo spazio è chiuso, sacro e inviolabile.
                                </p>
                            </div>

                            <h3 className="text-xl font-display text-text-warm mt-8 mb-4">3. Ritenzione dei Dati</h3>
                            <p>Manteniamo la cronologia delle conversazioni solo finché l'account è attivo. L'utente può richiedere la cancellazione permanente di tutti i dati in qualsiasi momento. Entro 72 ore ogni traccia verrà distrutta permanentemente in accordo con il GDPR.</p>
                        </div>
                    </div>
                );
            case 'terms':
                return (
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 rounded-xl bg-space border border-space-border">
                                <Edit3 className="w-6 h-6 text-amber" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-display font-600">Terms of Service</h2>
                        </div>
                        <div className="prose prose-amber max-w-none text-text-secondary leading-relaxed">
                            <p>L'utilizzo di Luminel è soggetto all'accettazione integrale e incondizionata dei presenti termini.</p>

                            <h3 className="text-xl font-display text-text-warm mt-8 mb-4">1. Entertainment Purposes Only</h3>
                            <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-xl my-4">
                                <p className="text-red-800 m-0 text-sm mb-2">
                                    <strong>DISCLAIMER FONDAMENTALE:</strong> Luminel è un costrutto software basato su Intelligenza Artificiale (LLM). È progettato esclusivamente per scopi di <strong>intrattenimento, riflessione personale e svago</strong>.
                                </p>
                                <p className="text-red-800 m-0 text-sm">
                                    Luminel <strong>non è un essere umano</strong>, <strong>non è un professionista medico o psicologico</strong>, e <strong>non fornisce consulenza clinica</strong>.
                                </p>
                            </div>

                            <h3 className="text-xl font-display text-text-warm mt-8 mb-4">2. Manleva Totale di Responsabilità</h3>
                            <p>L'Utente accetta la piena e totale responsabilità per qualsiasi azione derivante dall'interazione con Luminel. Declinano esplicitamente ogni responsabilità per danni diretti, indiretti, psicologici o materiali.</p>

                            <h3 className="text-xl font-display text-text-warm mt-8 mb-4">3. Emergenze e Salute Mentale</h3>
                            <p>In caso di emergenza o crisi, l'Utente deve disconnettersi immediatamente e contattare le autorità pertinenti (es. 112). Luminel non monitora le chat per le emergenze in tempo reale.</p>
                        </div>
                    </div>
                );
            case 'cookies':
                return (
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 rounded-xl bg-space border border-space-border">
                                <Cookie className="w-6 h-6 text-amber" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-display font-600">Cookie Policy (GDPR)</h2>
                        </div>
                        <div className="prose prose-amber max-w-none text-text-secondary leading-relaxed">
                            <p>Il rispetto della tua intimità digitale parte da fondamenta silenziose e non invasive. Utilizziamo la tecnologia strettamente necessaria per offrirti l'esperienza Luminel.</p>

                            <h3 className="text-xl font-display text-text-warm mt-8 mb-4">1. Cookie Essenziali Tecnici</h3>
                            <p>Utilizziamo esclusivamente cookie e tecnologie di local storage (come IndexedDB/localStorage) necessari al funzionamento della piattaforma. Questo include:</p>
                            <ul>
                                <li>Mantenimento della sessione e autenticazione sicura.</li>
                                <li>Salvataggio temporaneo e criptato del contesto di conversazione nel tuo browser.</li>
                                <li>Preferenze di interfaccia.</li>
                            </ul>

                            <h3 className="text-xl font-display text-text-warm mt-8 mb-4">2. Nessun Tracciamento Invasivo</h3>
                            <div className="p-5 bg-amber/5 border border-amber/20 rounded-xl my-4">
                                <p className="text-amber-dim m-0 text-sm">
                                    <strong>Il nostro patto:</strong> Non utilizziamo cookie di profilazione per inviarti pubblicità mirata. I tuoi dati di navigazione non vengono mai venduti ad agenzie pubblicitarie di terze parti (es. Meta Pixel, Google Ads).
                                </p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-space-deep/80 backdrop-blur-md"
                    onClick={onClose}
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                    className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl glass shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="flex justify-end p-4 border-b border-space-border/50 shrink-0">
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-space-light/50 text-text-muted hover:text-text-warm transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto p-6 md:p-10 shrink-1">
                        {renderContent()}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
