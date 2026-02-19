import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendMessageToLuminel, Message } from '../services/luminelService';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Pass the *current* history (excluding the new message we just added locally for UI, 
      // or including it? The service expects history + new message separate.
      // My service: sendMessageToLuminel(history, newMessage)
      // So I pass the *previous* messages as history.
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
    <div className="flex flex-col h-screen bg-stone-950 text-stone-200 font-sans selection:bg-amber-900 selection:text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-stone-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-700 to-stone-800 flex items-center justify-center shadow-lg shadow-amber-900/20 border border-white/10">
            <Sparkles className="w-5 h-5 text-amber-100" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-medium tracking-wide text-stone-100">Luminel</h1>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-medium">Elite Companion</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 space-y-4">
            <div className="w-24 h-24 rounded-full bg-stone-900 flex items-center justify-center mb-4 border border-white/5">
              <Sparkles className="w-10 h-10 text-stone-600" />
            </div>
            <p className="text-stone-400 font-serif italic text-lg max-w-md">
              "Sono qui. La roccia nella tempesta. Parlami."
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
                  "max-w-[85%] md:max-w-[70%] rounded-2xl px-6 py-4 shadow-sm",
                  msg.role === 'user'
                    ? "bg-stone-800 text-stone-100 rounded-tr-sm border border-white/5"
                    : "bg-stone-900/50 text-stone-300 rounded-tl-sm border border-white/5 backdrop-blur-sm"
                )}
              >
                <div className="prose prose-invert prose-stone max-w-none leading-relaxed">
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
            className="flex justify-start"
          >
            <div className="bg-stone-900/50 rounded-2xl rounded-tl-sm px-6 py-4 flex items-center gap-2 border border-white/5">
              <div className="w-2 h-2 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="p-4 md:p-6 bg-stone-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi qui..."
            className="w-full bg-stone-900/50 text-stone-200 placeholder-stone-600 rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:ring-1 focus:ring-amber-900/50 resize-none border border-white/5 shadow-inner min-h-[60px] max-h-[120px]"
            rows={1}
            style={{ minHeight: '60px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-stone-800 hover:bg-stone-700 text-amber-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-[10px] text-stone-700 uppercase tracking-widest">Luminel AI • Private Session</p>
        </div>
      </footer>
    </div>
  );
}
