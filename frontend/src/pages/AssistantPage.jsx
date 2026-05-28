import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const INITIAL_MESSAGE = `**Welcome to VoteBuddy** — your personal guide to the Indian voting process.

I'm here to help you understand everything about elections in India — eligibility, voter registration, required documents, and what to expect on voting day.

To get started and give you the most relevant guidance, could you tell me:
Your name, age, state, and are you a first time voter? [eg.: I am [your name]. I am [age] years old and living in [state]. I am a first time voter / I am not a first time voter]`;

function AssistantPage() {
  const [userProfile, setUserProfile] = useState(null);  // { userId, age, state, firstTime }
  const [messages, setMessages] = useState([
    { role: 'model', content: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const messagesEndRef = useRef(null);

  // Auto-create a user session on mount
  useEffect(() => {
    const initSession = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ age: 0, location: 'India', firstTime: true }),
          signal: controller.signal
        });
        if (response.ok) {
          const data = await response.json();
          setUserProfile({ userId: data.userId, age: null, location: null, firstTime: null });
        } else {
          // Backend rejected — still allow chat with a temp local ID
          setUserProfile({ userId: `local-${Date.now()}`, age: null, location: null, firstTime: null });
        }
      } catch (err) {
        console.error('Failed to initialize session:', err);
        // Network error — still open the chat with a temp ID
        setUserProfile({ userId: `local-${Date.now()}`, age: null, location: null, firstTime: null });
      } finally {
        clearTimeout(timeoutId);
        setIsInitializing(false);
      }
    };
    initSession();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !userProfile || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          userId: userProfile.userId,
          message: userMessage,
          currentStep,
        }),
      });

      if (!response.ok) {
        let errorMsg = `Server error: ${response.status}`;
        try {
          const errData = await response.json();
          if (errData.error) errorMsg = errData.error;
        } catch (e) {}
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setCurrentStep(data.suggestedStep);

      // Try to extract profile info from the conversation
      if (data.extractedProfile) {
        setUserProfile(prev => ({ ...prev, ...data.extractedProfile }));
      }
      
      if (data.newUserId) {
        setUserProfile(prev => ({ ...prev, userId: data.newUserId }));
      }

      setMessages(prev => [...prev, { role: 'model', content: data.response }]);
    } catch (error) {
      console.error('Assistant error:', error);
      const msg = error.name === 'AbortError'
        ? 'The request timed out. Please check that the backend is running and try again.'
        : error.message.includes('Server error:') 
          ? "Sorry, I'm having trouble connecting right now. Please ensure the backend is running on port 3001."
          : error.message; // Display specific backend error messages
      setMessages(prev => [...prev, { role: 'model', content: msg }]);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  // Chat is ready as soon as we have a userId (not waiting for full profile)
  const isReady = !isInitializing && userProfile?.userId;

  return (
    <div className="flex-1 flex overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row h-[calc(100vh-4rem)]">

        {/* ── Chat Panel ── */}
        <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-800 shadow-sm relative transition-colors duration-300">


          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${msg.role === 'user'
                  ? 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                  : 'bg-brand-100 dark:bg-brand-900/50 text-brand-600'
                  }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                  ? 'bg-brand-600 text-white rounded-tr-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-sm'
                  }`}>
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div className="prose prose-sm prose-slate dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="shrink-0 w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-600 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-700 rounded-tl-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-500" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">VoteBuddy is typing…</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isReady ? 'Type your message…' : 'Starting session, please wait…'}
                disabled={!isReady || isLoading}
                className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:bg-white dark:focus:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || !isReady || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-600 text-white rounded-full hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>



      </div>
    </div>
  );
}

export default AssistantPage;
