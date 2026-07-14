'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import MessageBubble from '../../components/MessageBubble';
import ToolCallIndicator from '../../components/ToolCallIndicator';

export default function ChatDashboard() {
  const { token, username, logout } = useAuth();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toolCall, setToolCall] = useState<any | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId] = useState(() => Date.now().toString());

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, toolCall]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !token) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    setToolCall(null);

    try {
      const data = await api.sendMessage(sessionId, userMsg, token);
      
      if (data.toolCalls && data.toolCalls.length > 0) {
        setToolCall(data.toolCalls[0]);
        // Simulate a slight delay to show the tool indicator for UX
        setTimeout(() => {
          setToolCall(null);
          setMessages(prev => [...prev, { role: 'model', text: data.response }]);
          setLoading(false);
        }, 2000);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: data.response }]);
        setLoading(false);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'model', text: 'Error: ' + err.message }]);
      setLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div className="flex h-screen bg-zinc-950 text-white font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col hidden md:flex">
        <div className="p-5 border-b border-zinc-800">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Quizzo</h1>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Your Session</p>
          <div className="bg-zinc-800/50 p-3 rounded-xl border border-zinc-700/50 text-sm text-zinc-300 font-medium">
            Current Chat
          </div>
        </div>
        <div className="p-4 border-t border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-3 truncate">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center font-bold text-sm shadow-inner">
              {username?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium truncate">{username}</span>
          </div>
          <button onClick={logout} className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer" title="Log out">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-zinc-950">
        <header className="h-14 border-b border-zinc-800 flex items-center px-6 md:hidden">
          <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Quizzo</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">How can I help you teach today?</h2>
              <p className="text-zinc-400 max-w-md">I can generate quizzes, grade short-answer responses against a rubric, or summarize class performance.</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto pb-4">
              {messages.map((m, i) => (
                <MessageBubble key={i} role={m.role} text={m.text} />
              ))}
              {toolCall && <ToolCallIndicator toolName={toolCall.name} args={toolCall.args} />}
              {loading && !toolCall && (
                <div className="flex w-full justify-start my-4">
                  <div className="bg-zinc-800 rounded-2xl p-4 rounded-bl-sm border border-zinc-700/50 text-sm">
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </main>

        <div className="p-4 sm:p-6 bg-zinc-950/80 backdrop-blur border-t border-zinc-800/50">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative flex items-end">
            <textarea
              className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4 pr-14 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none min-h-[56px] max-h-32 transition-shadow"
              placeholder="Ask Quizzo to generate a quiz..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              rows={1}
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="absolute right-2 bottom-2 p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:bg-zinc-700 shadow-md active:scale-95 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
          <div className="text-center mt-3 text-xs text-zinc-500 font-medium tracking-wide">
            AI can make mistakes. Consider verifying important information.
          </div>
        </div>
      </div>
    </div>
  );
}
