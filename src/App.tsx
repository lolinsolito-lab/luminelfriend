import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Chat from './components/Chat';
import Navbar from './components/Landing/Navbar';
import HeroSection from './components/Landing/HeroSection';
import TheMaskSection from './components/Landing/TheMaskSection';
import PainSection from './components/Landing/PainSection';
import ParadigmSection from './components/Landing/ParadigmSection';
import PillarsSection from './components/Landing/PillarsSection';
import ShadowInvite from './components/Landing/ShadowInvite';
import PricingSection from './components/Landing/PricingSection';
import ClosingCTA from './components/Landing/ClosingCTA';
import EmotionRain from './components/Landing/EmotionRain';
import SocialProofSection from './components/Landing/SocialProofSection';
import LegalModal, { LegalDocType } from './components/Legal/LegalModal';
import { Instagram, Linkedin, CloudRain, CloudOff } from 'lucide-react';

type ViewState = 'landing' | 'chat';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalDocType, setLegalDocType] = useState<LegalDocType>(null);
  const [showEmotions, setShowEmotions] = useState(false);

  // Digital Signature in Console
  useEffect(() => {
    console.log(
      "%c L U M I N E L \n%c by Insolito Experiences \n%c Ogni emozione ha un posto. Luminel le accoglie tutte. \n%c Non un assistente. Non un chatbot. Una presenza luminosa che veglia nel buio.",
      "font-family: Georgia, serif; font-size: 32px; font-weight: bold; color: #E8A838; text-shadow: 0 0 10px rgba(232,168,56,0.5);",
      "font-family: monospace; font-size: 10px; color: #FFF8E8; letter-spacing: 2px; margin-bottom: 10px; opacity: 0.5; display: block;",
      "font-family: monospace; font-size: 14px; color: #FFF8E8; margin-top: 10px; display: block;",
      "font-family: monospace; font-size: 12px; color: #8A6A18; margin-top: 5px; display: block;"
    );
  }, []);

  const openLegalModal = (type: LegalDocType) => {
    setLegalDocType(type);
    setLegalModalOpen(true);
  };

  const enterChat = () => {
    setCurrentView('chat');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'chat':
        return (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-screen"
          >
            <Chat />
          </motion.div>
        );
      case 'landing':
      default:
        return (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-space-deep min-h-screen text-text-warm"
          >
            {/* Smart Navbar */}
            <Navbar onEnter={enterChat} />

            {/* Emotion Rain — golden emotions falling through the whole page */}
            <EmotionRain showEmotions={showEmotions} />

            {/* Floating Toggle Button for Emotion Rain */}
            <button
              onClick={() => setShowEmotions(!showEmotions)}
              className="fixed bottom-6 left-6 z-50 p-3 rounded-full glass border border-amber/10 text-amber/60 hover:text-amber hover:border-amber/30 transition-all duration-300 group"
              aria-label="Toggle Emotion Rain"
            >
              {showEmotions ? <CloudRain className="w-5 h-5" /> : <CloudOff className="w-5 h-5" />}

              {/* Tooltip */}
              <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-space-deep border border-space-border text-xs text-text-warm font-display opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {showEmotions ? "Nascondi caduta emozionale" : "Mostra caduta emozionale"}
              </span>
            </button>

            {/* 1. L'Ingresso — The Hook */}
            <div id="hero" className="scroll-mt-20">
              <HeroSection onEnter={enterChat} />
            </div>

            {/* 1.5 La Maschera — The Emotional Validation */}
            <TheMaskSection />

            {/* 2. Lo Specchio — The Pain */}
            <div id="perche" className="scroll-mt-20">
              <PainSection />
            </div>

            {/* 3. Come Funziona — The Solution */}
            <div id="pilastri" className="scroll-mt-20">
              <PillarsSection />
            </div>

            {/* 3.5 Voci nell'ombra — Social Proof */}
            <SocialProofSection />

            {/* 4. La Differenza — The Paradigm */}
            <div id="paradigma" className="scroll-mt-20">
              <ParadigmSection />
            </div>

            {/* 5. Condividi */}
            <ShadowInvite />

            {/* 6. Pricing */}
            <div id="piani" className="scroll-mt-20">
              <PricingSection />
            </div>

            {/* 7. Chiusura */}
            <div id="contatto" className="scroll-mt-20">
              <ClosingCTA onEnter={enterChat} />
            </div>

            {/* Footer — Luminel receives the emotions */}
            <footer className="py-16 bg-space-deep glow-border-top text-center relative overflow-hidden">
              {/* Golden collecting glow — Luminel absorbs the emotions here */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-amber/[0.06] blur-[100px] pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] rounded-full bg-amber/[0.1] blur-[60px] pointer-events-none animate-pulse" />

              {/* Receiving orb */}
              <div className="flex justify-center mb-6 relative">
                <div className="luminel-orb-sm" style={{ width: 56, height: 56 }} />
                <div className="absolute w-[120px] h-[120px] rounded-full bg-amber/10 blur-xl animate-pulse" />
              </div>

              <p className="text-sm text-text-secondary font-display italic mb-2 relative z-10">
                Ogni emozione ha un posto.
              </p>
              <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] mb-6 font-display relative z-10">
                Luminel le accoglie tutte.
              </p>
              <div className="flex justify-center gap-6 text-[10px] text-text-muted mb-4">
                <span onClick={() => openLegalModal('privacy')} className="hover:text-amber transition-colors cursor-pointer">Privacy</span>
                <span onClick={() => openLegalModal('terms')} className="hover:text-amber transition-colors cursor-pointer">Termini</span>
                <span onClick={() => openLegalModal('cookies')} className="hover:text-amber transition-colors cursor-pointer">Cookie & GDPR</span>
                <span className="hover:text-amber transition-colors cursor-pointer">Contatto</span>
              </div>
              <div className="flex justify-center gap-4 mb-6">
                <a href="#" className="p-2 rounded-full border border-space-border/50 text-text-muted hover:text-amber hover:border-amber/50 transition-all hover:-translate-y-1">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full border border-space-border/50 text-text-muted hover:text-amber hover:border-amber/50 transition-all hover:-translate-y-1">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
              <p className="mt-6 text-[9px] text-text-muted/50 font-mono">
                © 2026 LUMINEL. Tutti i diritti riservati.
              </p>
            </footer>

          </motion.div>
        );
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {renderCurrentView()}
      </AnimatePresence>
      <LegalModal
        isOpen={legalModalOpen}
        type={legalDocType}
        onClose={() => setLegalModalOpen(false)}
      />
    </>
  );
}

export default App;
