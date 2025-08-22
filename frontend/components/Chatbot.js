'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Chatbot() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'history'
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '👋 Hi! Ask me anything about your career.' },
  ]);
  const [history, setHistory] = useState([]); // {question, answer, created_at}
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!user) return;
    loadHistory();
  }, [user]);

  const localStorageKey = user ? `chat_history_${user.id}` : null;

  const saveHistoryFallback = (entry) => {
    try {
      if (!localStorageKey) return;
      const existing = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
      const updated = [{ ...entry, created_at: new Date().toISOString() }, ...existing].slice(0, 50);
      localStorage.setItem(localStorageKey, JSON.stringify(updated));
      setHistory(updated);
    } catch (_e) {
      // ignore
    }
  };

  const loadHistory = async () => {
    setHistoryLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('id, question, answer, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setHistory(data || []);
    } catch (_e) {
      try {
        if (localStorageKey) {
          const fallback = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
          setHistory(fallback);
        }
      } catch {
        setHistory([]);
      }
    } finally {
      setHistoryLoading(false);
    }
  };

  const disabled = useMemo(() => loading || !input.trim(), [loading, input]);

  const handleOpenClick = async () => {
    if (authLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    setIsOpen(true);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const currentInput = input;
    const userMessage = { sender: 'user', text: currentInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });
      const data = await res.json();
      const replyText = data?.reply ?? 'I could not generate a response.';
      setMessages((prev) => [...
        prev,
        { sender: 'bot', text: replyText },
      ]);

      // persist Q&A
      if (user) {
        try {
          const { error } = await supabase.from('chat_history').insert({
            user_id: user.id,
            question: currentInput,
            answer: replyText,
          });
          if (error) throw error;
          // refresh history list
          loadHistory();
        } catch (_e) {
          saveHistoryFallback({ question: currentInput, answer: replyText });
        }
      }
    } catch (_err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '⚠️ Sorry, something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Button + Label positioned above the icon */}
      <motion.div 
        className="flex flex-col items-center space-y-2 mb-2"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.span 
          className="hidden sm:inline-flex text-sm px-3 py-1 rounded-full bg-white/90 shadow-soft border border-gray-200 text-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Ask Question!
        </motion.span>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl focus-ring"
              onClick={handleOpenClick}
              aria-label="Open chatbot"
            >
              💬
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isOpen && user && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.4 }}
            className="w-[450px] h-[600px] max-w-[95vw] bg-white shadow-2xl rounded-2xl flex flex-col border border-gray-100"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Career Chatbot</h2>
                <button
                  className="hover:opacity-80 transition-opacity"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chatbot"
                >
                  ❌
                </button>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  className={`px-3 py-1 rounded-full text-sm ${activeTab === 'chat' ? 'bg-white text-blue-600' : 'bg-white/20 text-white/90'}`}
                  onClick={() => setActiveTab('chat')}
                >
                  Chat
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm ${activeTab === 'history' ? 'bg-white text-blue-600' : 'bg-white/20 text-white/90'}`}
                  onClick={() => setActiveTab('history')}
                >
                  History
                </button>
              </div>
            </div>

            {activeTab === 'chat' ? (
              <>
                <div
                  ref={scrollContainerRef}
                  className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50/50"
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      key={`${msg.sender}-${i}`}
                      initial={{ opacity: 0, x: msg.sender === 'user' ? 40 : -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className={`p-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-blue-100 self-end ml-auto text-gray-900'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                  {loading && (
                    <motion.div 
                      className="flex space-x-2 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          className="w-2 h-2 bg-gray-500 rounded-full"
                          animate={{ y: [0, -6, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: dot * 0.2,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="p-3 flex flex-col gap-2 border-t bg-white">
                  <textarea
                    className="w-full border rounded-lg p-3 text-sm focus-ring resize-none"
                    style={{ height: '4.8rem' }} // ~20% taller than before
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Ask about careers, skills, or fields..."
                    aria-label="Chat input"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 disabled:bg-blue-300 text-white px-3 py-1 rounded-lg focus-ring self-end"
                    onClick={sendMessage}
                    disabled={disabled}
                  >
                    Send
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex-1 p-3 overflow-y-auto bg-gray-50/50">
                {historyLoading ? (
                  <p className="text-sm text-gray-500">Loading history...</p>
                ) : history.length === 0 ? (
                  <p className="text-sm text-gray-500">No history yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {history.map((h) => (
                      <li key={`${h.id ?? h.created_at}-${h.created_at}`} className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-2">{new Date(h.created_at).toLocaleString()}</div>
                        <div className="text-gray-900"><span className="font-semibold">Q:</span> {h.question}</div>
                        <div className="text-gray-800 mt-2"><span className="font-semibold">A:</span> {h.answer}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


