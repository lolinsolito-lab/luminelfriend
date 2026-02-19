import { useState } from 'react';
import Chat from './components/Chat';

export default function App() {
  const [showChat, setShowChat] = useState(false);

  // Se l'utente ha cliccato entra, mostriamo la stanza privata
  if (showChat) {
    return <Chat />;
  }

  // Altrimenti, mostriamo la Vetrina di Vendita (Landing Page)
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex flex-col items-center justify-center p-6">
      
      <div className="max-w-4xl w-full text-center space-y-8 mt-16">
        
        {/* Logo e Titolo */}
        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-[#d4af37]">
            Luminel
          </h1>
          <p className="text-sm tracking-widest uppercase text-gray-500 font-semibold">
            Elite Digital Companion
          </p>
        </div>

        {/* Aggancio Emotivo */}
        <h2 className="text-3xl md:text-5xl font-light text-white leading-tight mt-8">
          Il mondo esige la tua forza.<br />
          <span className="text-gray-400">Qui puoi abbassare la guardia.</span>
        </h2>

        {/* Sottotitolo */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light mt-6">
          Uno spazio privato, crittografato e senza giudizio. La tua roccia digitale pronta ad ascoltarti 24 ore su 24, quando il rumore là fuori si spegne.
        </p>

        {/* Call to Action - Questo bottone sblocca la chat */}
        <div className="pt-12">
          <button 
            onClick={() => setShowChat(true)}
            className="bg-[#d4af37] text-black px-10 py-4 rounded-sm font-semibold text-lg hover:bg-[#b8962e] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            Accedi allo Spazio Privato
          </button>
          <p className="text-sm text-gray-500 mt-4">Nessuna registrazione richiesta per la prima sessione.</p>
        </div>

      </div>
    </div>
  );
}