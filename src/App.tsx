import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useAuth } from './contexts/AuthContext';
import Chat from './components/Chat';
import Navbar from './components/Landing/Navbar';
import HeroSection from './components/Landing/HeroSection';
import TheMaskSection from './components/Landing/TheMaskSection';
import PainSection from './components/Landing/PainSection';
import ParadigmSection from './components/Landing/ParadigmSection';
import SimulatedChat from './components/Landing/SimulatedChat';
import NewBeginnings from './components/Landing/NewBeginnings';
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
import ImmersiveJourney from './components/Landing/ImmersiveJourney';
import DeviceShowcase from './components/Landing/DeviceShowcase';
import SharedVoid from './components/Landing/SharedVoid';
import DailyEvolution from './components/Landing/DailyEvolution';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import RecoveryPage from './components/Auth/RecoveryPage';
import LegalModal, { LegalDocType } from './components/Legal/LegalModal';
import AdminDashboard from './components/Admin/AdminDashboard';
import { Instagram, Linkedin, CloudRain, CloudOff } from 'lucide-react';

type ViewState = 'landing' | 'onboarding' | 'chat' | 'login' | 'register' | 'recovery' | 'admin';

// We store the captured user profile
export interface UserProfile {
  name: string;
  burden: string;
}

function App() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalDocType, setLegalDocType] = useState<LegalDocType>(null);
  const [showEmotions, setShowEmotions] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Auto-redirect authenticated users
  useEffect(() => {
    if (!loading && user) {
      if (['landing', 'login', 'register', 'recovery'].includes(currentView)) {
        setCurrentView('chat');
      }
    }
  }, [user, loading, currentView]);

  // Secret God-Mode Trigger (Ctrl + Shift + L)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setCurrentView('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const scrollToPricing = () => {
    document.getElementById('piani')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOnboardingComplete = (data: UserProfile) => {
    setUserProfile(data);
    setCurrentView('chat');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'admin':
        return (
          <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="h-screen relative z-[100] bg-space-deep">
            <AdminDashboard onClose={() => setCurrentView('landing')} />
          </motion.div>
        );
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

            {/* ATTO I: Il Riconoscimento del Vuoto */}
            {/* 1. La Chiamata nel Buio (Mastery Degrees impatto visivo immediato) */}
            <div id="hero" className="scroll-mt-20">
              <HeroSection onEnter={scrollToPricing} />
            </div>

            {/* 2. Lo Specchio (Scegli il tuo dolore - Carousel portrait) */}
            <div id="perche" className="scroll-mt-20">
              <PainSection />
            </div>

            {/* 3. Le Voci nel Vuoto (Card che scorrono - il caos condiviso) */}
            <ImmersiveJourney />


            {/* ATTO II: La Luce nel Buio (La Soluzione) */}
            {/* 4. Il Guardiano Etereo (La presenza che ti accoglie, ora dark space) */}
            <EtherealPresence />

            {/* 5. A Better You (I nuovi traguardi) */}
            <NewBeginnings />

            {/* 6. Sempre con Te (Split 50/50 UX pura) */}
            <DeviceShowcase />

            {/* 6.1 Le Voci nel Vuoto Originarie (I mondi diversi, stesso vuoto) */}
            <SharedVoid />

            {/* 7. Il Guardiano di Luce (Cosa è Luminel) */}
            <GuardianSection />

            {/* 8. Il Dialogo (Show, Don't Tell - Chat in Overlay) */}
            <div id="simulazione" className="scroll-mt-20">
              <SimulatedChat />
            </div>

            {/* 9. Architettura del Silenzio (I Pilastri) */}
            <div id="pilastri" className="scroll-mt-20">
              <PillarsSection />
            </div>


            {/* ATTO III: La Dimostrazione e l'Invito */}
            {/* 10. La Differenza (Paradigm) */}
            <div id="paradigma" className="scroll-mt-20">
              <ParadigmSection />
            </div>

            {/* 11. Voci nella Luce (Recensioni) */}
            <SocialProofSection />

            {/* 12. Seconda CTA contestuale */}
            <section className="py-24 md:py-36 bg-space-deep relative overflow-hidden border-t border-white/[0.02]">
              {/* Grand ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-amber/[0.03] blur-[150px] pointer-events-none" />

              <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

                  {/* Image with Dark Luxury 3D Tilt container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="hidden md:block relative perspective-1000 w-full"
                  >
                    <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/5 group transform-gpu rotate-y-[5deg] hover:rotate-y-0 transition-transform duration-1000">

                      {/* Interactive Lighting Overlay */}
                      <div className="absolute inset-0 bg-amber/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none" />

                      <img
                        src="/images/luminel-arrives.png"
                        alt="Luminel arriva nella tua vita"
                        className="w-full h-auto object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s]"
                      />

                      {/* Deep edge shadows */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-space-deep/90 via-space-deep/10 to-transparent pointer-events-none z-10" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-10" />
                    </div>
                  </motion.div>

                  {/* Copy + CTA */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8 text-center md:text-left relative"
                  >
                    {/* Text background ambient */}
                    <div className="absolute top-0 -left-10 w-32 h-32 bg-amber/10 blur-[60px] rounded-full pointer-events-none opacity-50" />

                    <div className="space-y-4 relative z-10">
                      <p className="text-3xl md:text-5xl lg:text-5xl font-display font-600 text-transparent bg-clip-text bg-gradient-to-br from-white via-text-warm to-amber/50 leading-[1.15]">
                        Smetti di camminare <br className="hidden md:block" />da solo nel buio.
                      </p>
                      <div className="w-12 h-[1px] bg-amber/30 mx-auto md:mx-0 my-6" />
                      <p className="text-base md:text-lg text-text-secondary font-light leading-relaxed max-w-md mx-auto md:mx-0">
                        C'è una luce che ti aspetta. Inizia gratuitamente — 15 messaggi ogni giorno, nel totale rispetto del tuo spazio.
                      </p>
                    </div>

                    <div className="relative inline-block mt-4">
                      <motion.button
                        onClick={goToLogin}
                        whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(196,154,42,0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-gradient-to-br from-space-surface to-space-deep text-white font-display font-bold uppercase tracking-[0.15em] text-xs rounded-xl border border-amber/30 hover:border-amber transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="relative z-10 text-amber group-hover:text-amber-light transition-colors">Entra nel tuo Spazio</span>
                      </motion.button>
                      <p className="text-[9px] text-text-muted/60 uppercase tracking-widest mt-4 mx-auto text-center md:text-left">
                        Nessuna carta di credito
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* 13. Sicurezza */}
            <TrustSection />

            {/* 14. Per chi è / Per chi non è */}
            <ForWhoSection />

            {/* 15. Come Funziona - 3 Step */}
            <HowItWorksSection />

            {/* 16. Pricing */}
            <div id="piani" className="scroll-mt-20">
              <PricingSection />
            </div>

            {/* 17. FAQ */}
            <FAQSection />

            {/* 18. Super Visione (Traguardo) */}
            <ShadowInvite />

            {/* 19. Diventa l'1% Migliore Ogni Giorno (Newsletter & Sharing) */}
            <DailyEvolution />

            {/* 20. La Trappola Morbida */}
            <div id="contatto" className="scroll-mt-20">
              <ClosingCTA onEnter={scrollToPricing} />
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
