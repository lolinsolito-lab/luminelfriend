import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Loader2, Lock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendMessageToLuminel, Message } from '../services/luminelService';
import { clsx } from 'clsx';
import PaywallOverlay from './PaywallOverlay';

const MESSAGE_LIMIT = 5;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isPaywallActive = messageCount >= MESSAGE_LIMIT;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || isPaywallActive) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Incrementa contatore
    setMessageCount(prev => prev + 1);

    try {
      const responseContent = await sendMessageToLuminel(messages, input);

      const botMessage: Message = { role: 'model', content: responseContent };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-obsidian text-text-primary font-sans selection:bg-luminel-gold selection:text-black relative overflow-hidden">

      {/* PAYWALL OVERLAY */}
      <AnimatePresence>
        {isPaywallActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50"
          >
            <PaywallOverlay />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-stone-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luminel-dim to-stone-800 flex items-center justify-center shadow-lg shadow-luminel-gold/10 border border-white/10">
            <Sparkles className="w-5 h-5 text-luminel-glow" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-medium tracking-wide text-white">Luminel</h1>
            <p className="text-[10px] text-luminel-dim uppercase tracking-[0.2em] font-bold">Elite Companion</p>
          </div>
        </div>

        {/* Message Counter (Subtle Pressure) */}
        {!isPaywallActive && (
          <div className="text-xs font-mono text-stone-600">
            Memoria Guest: <span className={messageCount > 3 ? "text-red-500" : "text-stone-400"}>{messageCount}/{MESSAGE_LIMIT}</span>
          </div>
        )}
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 space-y-4">
            <div className="w-24 h-24 rounded-full bg-stone-900 flex items-center justify-center mb-4 border border-white/5 shadow-inner">
              <Sparkles className="w-10 h-10 text-stone-600" />
            </div>
            <p className="text-stone-400 font-serif italic text-xl max-w-md leading-relaxed">
              "Sono qui. La roccia nella tempesta. <br />Parlami."
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={clsx(
                "flex w-full",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={clsx(
                  "max-w-[85%] md:max-w-[70%] px-6 py-4 shadow-sm text-sm leading-relaxed",
                  msg.role === 'user'
                    ? "bg-stone-900/80 text-white rounded-2xl rounded-tr-sm border border-white/10"
                    : "text-stone-300 font-serif text-lg tracking-wide border-l-2 border-luminel-dim pl-6 py-2" // Luminel style: Editorial
                )}
              >
                <div className="prose prose-invert prose-stone max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start items-center gap-4 pl-4"
          >
            <div className="text-xs text-luminel-dim uppercase tracking-widest animate-pulse">Luminel sta riflettendo...</div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="p-4 md:p-6 bg-obsidian border-t border-white/5 relative z-20">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isPaywallActive}
            placeholder={isPaywallActive ? "Sessione Terminata" : "Scrivi qui..."}
            className="w-full bg-stone-900/30 text-stone-200 placeholder-stone-600 rounded-sm pl-5 pr-14 py-4 focus:outline-none focus:ring-1 focus:ring-luminel-dim/30 resize-none border border-white/10 shadow-inner min-h-[60px] max-h-[120px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
            style={{ minHeight: '60px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || isPaywallActive}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-stone-800 hover:bg-stone-700 text-luminel-gold rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPaywallActive ? <Lock className="w-5 h-5 text-red-500" /> : (isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />)}
          </button>
        </div>
        <div className="text-center mt-3 flex justify-center gap-4 opacity-50">
          <p className="text-[10px] text-stone-600 uppercase tracking-widest">End-to-End Encrypted</p>
          <p className="text-[10px] text-stone-600 uppercase tracking-widest">•</p>
          <p className="text-[10px] text-stone-600 uppercase tracking-widest">Guest Access</p>
        </div>
      </footer>
    </div>
  );
}
