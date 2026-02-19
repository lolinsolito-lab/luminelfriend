import { useState } from 'react';
import Chat from './components/Chat';
import { motion } from 'motion/react';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function App() {
  const [showChat, setShowChat] = useState(false);

  // Se l'utente ha cliccato entra, mostriamo la stanza privata
  if (showChat) {
    return <Chat />;
  }

  // Altrimenti, mostriamo la Vetrina di Vendita (Landing Page)
  return (
    <div className="min-h-screen bg-luxury-gradient text-text-primary flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-5"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-3xl w-full text-center space-y-12 mt-10 relative z-10"
      >
        
        {/* Logo e Titolo */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ letterSpacing: "0.5em", opacity: 0 }}
            animate={{ letterSpacing: "0.1em", opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="text-7xl md:text-9xl font-serif text-gold-gradient"
          >
            Luminel
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-2 text-luminel-dim tracking-[0.3em] uppercase text-xs font-semibold"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Elite Digital Companion</span>
          </motion.div>
        </div>

        {/* Aggancio Emotivo */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight text-white">
            Il mondo esige la tua forza.<br />
            <span className="text-stone-600 block mt-2">Qui puoi abbassare la guardia.</span>
          </h2>
          
          <p className="text-lg text-text-secondary max-w-xl mx-auto font-light leading-relaxed">
            Un rifugio crittografato, privo di giudizio. <br/>
            Nessuna traccia. Nessuna debolezza esposta. <br/>
            Solo tu e la Roccia.
          </p>
        </div>

        {/* Call to Action - Questo bottone sblocca la chat */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="pt-8"
        >
          <button 
            onClick={() => setShowChat(true)}
            className="group relative px-12 py-5 bg-transparent border border-luminel-dim/30 text-luminel-gold font-serif text-lg tracking-widest uppercase hover:bg-luminel-gold/5 transition-all duration-500 hover:border-luminel-gold/80"
          >
            <span className="relative z-10 flex items-center gap-3">
              Accedi al Rifugio
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <p className="text-xs text-stone-700 mt-6 tracking-widest uppercase">
            Accesso Ospite • Crittografia End-to-End
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}
