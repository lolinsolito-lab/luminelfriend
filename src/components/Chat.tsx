import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2, Lock, Mic, Phone } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendMessageToLuminel, Message } from '../services/luminelService';
import { clsx } from 'clsx';
import PaywallOverlay from './PaywallOverlay';
import DisclaimerOverlay from './DisclaimerOverlay';

// FREEMIUM LIMIT: 15 messages
const MESSAGE_LIMIT = 15;

export default function Chat() {
  // State for Disclaimer Acceptance (Session-based)
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  // AMNESIA LOGIC & SESSION INIT
  useEffect(() => {
    const today = new Date().toDateString();
    const lastSession = localStorage.getItem('luminel_last_session_date');

    if (lastSession !== today) {
      setMessages([]);
      setMessageCount(0);
      localStorage.setItem('luminel_last_session_date', today);
    } else {
      const savedCount = parseInt(localStorage.getItem('luminel_msg_count') || '0');
      setMessageCount(savedCount);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('luminel_msg_count', messageCount.toString());
  }, [messageCount]);

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

  const handleFeatureLocked = () => {
    setShowPaywall(true);
  };

  // 1. LEGAL GATEKEEPER
  if (!hasAcceptedDisclaimer) {
    return <DisclaimerOverlay onAccept={() => setHasAcceptedDisclaimer(true)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-space-deep text-text-warm font-sans relative overflow-hidden">

      {/* PAYWALL OVERLAY */}
      <AnimatePresence>
        {(isPaywallActive || showPaywall) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50"
          >
            <PaywallOverlay />
            {showPaywall && !isPaywallActive && (
              <button
                onClick={() => setShowPaywall(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-white z-[60] text-sm"
              >
                ✕ Chiudi
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-space/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="luminel-orb-sm" style={{ width: 36, height: 36 }} />
          <div>
            <h1 className="text-lg font-display font-600 tracking-wide text-text-warm">Luminel</h1>
            <p className="text-[10px] text-amber-dim uppercase tracking-[0.2em] font-display font-500">Online</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col items-end">
          {!isPaywallActive && (
            <div className="text-xs font-mono text-text-muted mb-1">
              <span className={messageCount > 10 ? "text-red-400" : "text-text-secondary"}>{messageCount}/{MESSAGE_LIMIT}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-[10px] text-text-muted uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan/60 animate-pulse"></span>
            Sessione attiva
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
            <div className="luminel-orb-sm mb-4" />
            <p className="text-text-secondary font-display text-xl max-w-md leading-relaxed">
              "Sono qui. Parlami."
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
                  "max-w-[85%] md:max-w-[70%] px-5 py-4 text-sm leading-relaxed",
                  msg.role === 'user'
                    ? "bg-space-surface text-text-warm rounded-2xl rounded-tr-sm border border-space-border"
                    : "text-text-secondary font-display text-base tracking-wide border-l-2 border-amber/30 pl-5 py-2"
                )}
              >
                <div className="prose prose-invert prose-sm max-w-none">
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
            <div className="text-xs text-amber-dim uppercase tracking-widest animate-pulse font-display">Luminel sta riflettendo...</div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="p-4 md:p-6 bg-space-deep border-t border-white/5 relative z-20">
        <div className="max-w-4xl mx-auto relative flex gap-3 items-end">

          {/* Locked Features */}
          <button onClick={handleFeatureLocked} className="p-3.5 glass text-text-muted hover:text-amber rounded-xl transition-colors mb-[1px]">
            <Mic className="w-5 h-5" />
          </button>
          <button onClick={handleFeatureLocked} className="p-3.5 glass text-text-muted hover:text-amber rounded-xl transition-colors mb-[1px]">
            <Phone className="w-5 h-5" />
          </button>

          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isPaywallActive}
              placeholder={isPaywallActive ? "Sessione terminata" : "Scrivi qui..."}
              className="w-full bg-space-surface text-text-warm placeholder-text-muted rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:ring-1 focus:ring-amber/30 resize-none border border-space-border min-h-[56px] max-h-[120px] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              rows={1}
              style={{ minHeight: '56px' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || isPaywallActive}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-space-light hover:bg-space-border text-amber rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isPaywallActive ? <Lock className="w-5 h-5 text-red-400" /> : (isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />)}
            </button>
          </div>
        </div>

        <div className="text-center mt-2 border-t border-white/5 pt-2">
          <p className="text-[9px] text-text-muted uppercase tracking-widest">
            Luminel è un'IA a scopo di intrattenimento. Non è un servizio medico.
          </p>
        </div>
      </footer>
    </div>
  );
}
