import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Chat from './components/Chat';
import Navbar from './components/Landing/Navbar';
import HeroSection from './components/Landing/HeroSection';
import PainSection from './components/Landing/PainSection';
import ParadigmSection from './components/Landing/ParadigmSection';
import PillarsSection from './components/Landing/PillarsSection';
import ShadowInvite from './components/Landing/ShadowInvite';
import PricingSection from './components/Landing/PricingSection';
import ClosingCTA from './components/Landing/ClosingCTA';

function App() {
  const [showChat, setShowChat] = useState(false);

  const enterChat = () => {
    setShowChat(true);
  };

  return (
    <AnimatePresence mode="wait">
      {showChat ? (
        <motion.div
          key="chat"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-screen"
        >
          <Chat />
        </motion.div>
      ) : (
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

          {/* 1. L'Ingresso — The Hook */}
          <div id="hero" className="scroll-mt-20">
            <HeroSection onEnter={enterChat} />
          </div>

          {/* 2. Lo Specchio — The Pain */}
          <div id="perche" className="scroll-mt-20">
            <PainSection />
          </div>

          {/* 3. Come Funziona — The Solution */}
          <div id="pilastri" className="scroll-mt-20">
            <PillarsSection />
          </div>

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

          {/* Footer */}
          <footer className="py-10 bg-space-deep border-t border-white/5 text-center">
            <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] mb-4 font-display">
              Luminel • Il tuo compagno digitale
            </p>
            <div className="flex justify-center gap-6 text-[10px] text-text-muted">
              <span className="hover:text-text-secondary cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-text-secondary cursor-pointer transition-colors">Termini</span>
              <span className="hover:text-text-secondary cursor-pointer transition-colors">Contatto</span>
            </div>
            <p className="mt-6 text-[9px] text-text-muted/50 font-mono">
              © 2026 LUMINEL. Tutti i diritti riservati.
            </p>
          </footer>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
