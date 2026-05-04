import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import StepsPanel from '../components/Steps/StepsPanel';

function AssistantPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [messages, setMessages] = useState([
    { role: 'model', content: "Hi! I'm your VoteBuddy. I'm here to guide you through the voting process step-by-step." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const messagesEndRef = useRef(null);

  // Form state for onboarding
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [firstTime, setFirstTime] = useState('yes');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('https://votebuddy.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: parseInt(age, 10),
          location,
          firstTime: firstTime === 'yes'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();

      const profile = { userId: data.userId, age: parseInt(age, 10), location, firstTime: firstTime === 'yes' };
      setUserProfile(profile);

      // Determine initial message based on profile
      let initialMsg = '';
      if (profile.age < 18) {
        initialMsg = "Thanks for sharing! Since you are under 18, you aren't eligible to vote just yet. However, it's great you're learning about the process! What would you like to know about elections?";
        setCurrentStep(1); // Keep at eligibility
      } else if (profile.firstTime) {
        initialMsg = `Great! Since you're a first-time voter from ${profile.location}, I'll guide you carefully through the basics. Let's start with Step 1: Eligibility and Registration. Have you registered to vote yet?`;
        setCurrentStep(2); // Move to registration
      } else {
        initialMsg = `Welcome back! I see you're voting in ${profile.location}. How can I help you prepare for this election? Need to check your registration, find documents, or locate your polling booth?`;
        setCurrentStep(4); // Move towards voting day prep
      }

      setMessages(prev => [...prev, { role: 'model', content: initialMsg }]);
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to start session. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://votebuddy.onrender.com/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userProfile.userId,
          message: userMessage,
          currentStep: currentStep
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setCurrentStep(data.suggestedStep);
      setMessages(prev => [...prev, { role: 'model', content: data.response }]);

    } catch (error) {
      console.error('Error fetching from assistant API:', error);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-slate-50">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row h-[calc(100vh-4rem)]">

        {/* Left Side: Chat Interface */}
        <div className="flex-1 flex flex-col h-full bg-white md:border-r border-slate-200 shadow-sm relative">

          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-white z-10">
            <h2 className="text-lg font-semibold text-slate-800">Your Personal Guide</h2>
            <p className="text-sm text-slate-500">Ask anything about voting, registration, or polling booths.</p>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {!userProfile ? (
              // Onboarding Form
              <div className="max-w-md mx-auto mt-8 p-6 bg-brand-50 border border-brand-100 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Let's personalize your guide!</h3>
                    <p className="text-sm text-slate-600">Tell me a bit about yourself.</p>
                  </div>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 18"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">State/Location</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. California"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Is this your first time voting?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="firstTime" value="yes" checked={firstTime === 'yes'} onChange={(e) => setFirstTime(e.target.value)} className="text-brand-600 focus:ring-brand-500" />
                        <span className="text-sm text-slate-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="firstTime" value="no" checked={firstTime === 'no'} onChange={(e) => setFirstTime(e.target.value)} className="text-brand-600 focus:ring-brand-500" />
                        <span className="text-sm text-slate-700">No</span>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg shadow-sm transition-colors mt-2"
                  >
                    Start Guided Assistant
                  </button>
                </form>
              </div>
            ) : (
              // Chat History
              <>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-brand-100 text-brand-600'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Message Bubble */}
                    <div className={`px-4 py-3 rounded-2xl ${msg.role === 'user'
                        ? 'bg-brand-600 text-white rounded-tr-sm'
                        : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                      }`}>
                      {msg.role === 'user' ? (
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                      ) : (
                        <div className="text-sm leading-relaxed prose prose-sm prose-slate max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-slate-100 text-slate-800 rounded-tl-sm flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-brand-500" />
                      <span className="text-sm text-slate-500">Assistant is typing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={userProfile ? "Type your message..." : "Please fill out the form first..."}
                disabled={!userProfile || isLoading}
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || !userProfile || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-600 text-white rounded-full hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Steps Panel */}
        {userProfile && (
          <div className="w-full md:w-80 bg-slate-50 p-6 flex flex-col h-full border-t md:border-t-0 md:border-l border-slate-200 overflow-y-auto">
            <StepsPanel currentStep={currentStep} userProfile={userProfile} />
          </div>
        )}

      </div>
    </div>
  );
}

export default AssistantPage;
