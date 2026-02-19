import React, { useState } from 'react';
import Chat from './components/Chat';
import HeroSection from './components/Landing/HeroSection';
import PainSection from './components/Landing/PainSection';
import ParadigmSection from './components/Landing/ParadigmSection';
import PillarsSection from './components/Landing/PillarsSection';
import ShadowInvite from './components/Landing/ShadowInvite';
import ClosingCTA from './components/Landing/ClosingCTA';

function App() {
  const [showChat, setShowChat] = useState(false);

  const enterChat = () => {
    setShowChat(true);
  };

  if (showChat) {
    return <Chat />;
  }

  return (
    <div className="bg-obsidian min-h-screen text-text-primary selection:bg-luminel-gold selection:text-black">

      {/* 1. L'Ingresso (The Hook) */}
      <HeroSection onEnter={enterChat} />

      {/* 2. Lo Specchio (The Pain) */}
      <PainSection />

      {/* 3. I Pilastri (The Solution) - Replaced FeaturesDNA */}
      <PillarsSection />

      {/* 4. La Frattura (The Paradigm) - Moved after Pillars for better flow, or kept before? 
          User asked for Pillars AFTER Pain. Let's stick to the user's flow:
          Pain -> Pillars -> Closing. 
          Where does Paradigm go? User didn't specify, but it fits well as a "Why Us" after Pillars or before.
          Let's place it after Pain and before Pillars as a transition. 
      */}

      {/* actually, User said: "Sezione 3: I Pilastri... subito dopo la sezione del dolore".
          So: Hero -> Pain -> Pillars.
          And "Sezione 4: Chiusura".
          Paradigm and ShadowInvite are extra assets we have.
          Let's put Paradigm after Pillars to reinforce the "Non è terapia" point.
          Then ShadowInvite (Viral).
          Then ClosingCTA.
      */}

      {/* 3. I Pilastri del Rifugio */}
      <PillarsSection />

      {/* 4. La Frattura (Reinforcement) */}
      <ParadigmSection />

      {/* 5. Viralità Inversa */}
      <ShadowInvite />

      {/* 6. Chiusura */}
      <ClosingCTA onEnter={enterChat} />

      {/* Final Minimal Footer */}
      <footer className="py-12 bg-black border-t border-white/5 text-center">
        <p className="text-[10px] text-stone-700 uppercase tracking-[0.2em] mb-4">
          Luminel • Elite Digital Companion
        </p>
        <div className="flex justify-center gap-6 text-[10px] text-stone-600">
          <span className="hover:text-stone-400 cursor-pointer transition-colors">Legal Shield</span>
          <span className="hover:text-stone-400 cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-stone-400 cursor-pointer transition-colors">Contact</span>
        </div>
        <p className="mt-8 text-[9px] text-stone-800 font-mono">
          © 2026 LUMINEL SYSTEMS. ALL RIGHTS RESERVED.
        </p>
      </footer>

    </div>
  );
}

export default App;
