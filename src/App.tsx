import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Chat from './components/Chat';
import Navbar from './components/Landing/Navbar';
import HeroSection from './components/Landing/HeroSection';
import TheMaskSection from './components/Landing/TheMaskSection';
import PainSection from './components/Landing/PainSection';
import ParadigmSection from './components/Landing/ParadigmSection';
import SimulatedChat from './components/Landing/SimulatedChat';
import PillarsSection from './components/Landing/PillarsSection';
import SocialProofSection from './components/Landing/SocialProofSection';
import ShadowInvite from './components/Landing/ShadowInvite';
import PricingSection from './components/Landing/PricingSection';
import ClosingCTA from './components/Landing/ClosingCTA';
import EmotionRain from './components/Landing/EmotionRain';
import LuminelOnboarding from './components/Landing/LuminelOnboarding';
import EtherealPresence from './components/Landing/EtherealPresence';
import GuardianSection from './components/Landing/GuardianSection';
import InteractiveCursor from './components/Landing/InteractiveCursor';
import ForWhoSection from './components/Landing/ForWhoSection';
import TrustSection from './components/Landing/TrustSection';
import HowItWorksSection from './components/Landing/HowItWorksSection';
import FAQSection from './components/Landing/FAQSection';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import RecoveryPage from './components/Auth/RecoveryPage';
import LegalModal, { LegalDocType } from './components/Legal/LegalModal';
import { Instagram, Linkedin, CloudRain, CloudOff } from 'lucide-react';

type ViewState = 'landing' | 'onboarding' | 'chat' | 'login' | 'register' | 'recovery';

// We store the captured user profile
export interface UserProfile {
  name: string;
  burden: string;
}

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalDocType, setLegalDocType] = useState<LegalDocType>(null);
  const [showEmotions, setShowEmotions] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Activate Lenis smooth scrolling
  useSmoothScroll();

  // Digital Signature in Console
  useEffect(() => {
    console.log(
      "%c L U M I N E L \n%c by Insolito Experiences \n%c Ogni emozione ha un posto. Luminel le accoglie tutte. \n%c Non un assistente. Non un chatbot. Una presenza luminosa che veglia accanto a te.",
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

  const enterOnboarding = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView('onboarding');
  };

  const goToLogin = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView('login');
  };

  const handleOnboardingComplete = (data: UserProfile) => {
    setUserProfile(data);
    setCurrentView('chat');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <LoginPage
              onLogin={() => setCurrentView('onboarding')}
              onSwitchToRegister={() => setCurrentView('register')}
              onSwitchToRecovery={() => setCurrentView('recovery')}
              onBack={() => setCurrentView('landing')}
            />
          </motion.div>
        );
      case 'register':
        return (
          <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <RegisterPage
              onRegister={() => setCurrentView('onboarding')}
              onSwitchToLogin={() => setCurrentView('login')}
              onBack={() => setCurrentView('landing')}
            />
          </motion.div>
        );
      case 'recovery':
        return (
          <motion.div key="recovery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <RecoveryPage
              onSwitchToLogin={() => setCurrentView('login')}
              onBack={() => setCurrentView('landing')}
            />
          </motion.div>
        );
      case 'chat':
        return (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-screen"
          >
            <Chat userProfile={userProfile} />
          </motion.div>
        );
      case 'onboarding':
        return (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-screen bg-space-deep"
          >
            <LuminelOnboarding onComplete={handleOnboardingComplete} />
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
            <Navbar onEnter={goToLogin} />

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

            {/* 0. La Presenza — The Ethereal Guardian greets you */}
            <EtherealPresence />

            {/* 1. L'Ingresso — The Hook */}
            <div id="hero" className="scroll-mt-20">
              <HeroSection onEnter={goToLogin} />
            </div>

            {/* 1.5 La Maschera — The Emotional Validation */}
            <TheMaskSection />

            {/* 2. Lo Specchio — The Pain */}
            <div id="perche" className="scroll-mt-20">
              <PainSection />
            </div>

            {/* 2.5 Il Guardiano di Luce — What Luminel IS */}
            <GuardianSection />

            {/* 3. Il Dialogo — Simulated Chat (Show, Don't Tell) */}
            <div id="simulazione" className="scroll-mt-20">
              <SimulatedChat />
            </div>

            {/* 4. Come Funziona — The Architecture of Silence (Evolved Pillars) */}
            <div id="pilastri" className="scroll-mt-20">
              <PillarsSection />
            </div>

            {/* 5. La Differenza — The Paradigm */}
            <div id="paradigma" className="scroll-mt-20">
              <ParadigmSection />
            </div>

            {/* 5.5 Voci nella Luce — Social Proof */}
            <SocialProofSection />

            {/* 5.6 Seconda CTA contestuale — "Ora è il tuo turno" */}
            <section className="py-20 md:py-28 bg-space-deep relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-amber/[0.05] blur-[120px] pointer-events-none" />
              <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="hidden md:block"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber/10">
                      <img
                        src="/images/luminel-arrives.png"
                        alt="Luminel arriva nella tua vita"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-space-deep/30 via-transparent to-transparent" />
                    </div>
                  </motion.div>

                  {/* Copy + CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6 text-center md:text-left"
                  >
                    <p className="text-2xl md:text-3xl font-display font-600 text-text-warm leading-snug">
                      Smetti di camminare <br className="hidden md:block" />da solo nel buio.
                    </p>
                    <p className="text-sm text-text-muted font-light leading-relaxed max-w-sm mx-auto md:mx-0">
                      C'è una luce che ti aspetta. Inizia gratuitamente — 15 messaggi ogni giorno, senza carta di credito.
                    </p>
                    <motion.button
                      onClick={goToLogin}
                      whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(212,168,64,0.25)' }}
                      whileTap={{ scale: 0.97 }}
                      className="px-10 py-4 bg-gradient-to-r from-amber to-amber-dim text-white font-display font-bold uppercase tracking-[0.12em] text-sm rounded-xl shadow-xl"
                    >
                      Entra nel tuo Spazio
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* 5.7 Sicurezza — Trust Section */}
            <TrustSection />

            {/* 5.8 Per chi è / Per chi non è */}
            <ForWhoSection />

            {/* 5.9 Come Funziona — 3 Step */}
            <HowItWorksSection />

            {/* 6. Pricing — The Premium Filter */}
            <div id="piani" className="scroll-mt-20">
              <PricingSection />
            </div>

            {/* 6.5 FAQ — Riduce biezioni pre-acquisto */}
            <FAQSection />

            {/* 7. Condividi — The Secret Invitation */}
            <ShadowInvite />

            {/* 8. Chiusura — The Final Trap */}
            <div id="contatto" className="scroll-mt-20">
              <ClosingCTA onEnter={goToLogin} />
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
      <InteractiveCursor />
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
