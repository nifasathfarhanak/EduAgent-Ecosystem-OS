import React, { useState, useRef, useEffect } from 'react';
import { LanguageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { getActiveStudentSession } from '../../lib/telemetryStore';
import { MechaCard } from '../CyberVisuals';
import { Bot, Send, Sparkles, User, Loader2, ArrowRight } from 'lucide-react';

interface Props {
  language: LanguageType;
}

export const AIMentorChat: React.FC<Props> = ({ language }) => {
  const { t } = useLanguage();
  const activeStudent = getActiveStudentSession();
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: `Hello ${activeStudent.studentName}! I am Astro-X, your 24/7 AI Engineering Mentor. Based on your current diagnosed gap ("${activeStudent.keyLearningGap}"), ask me any question or request a step-by-step code explanation!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/student-mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          studentName: activeStudent.studentName,
          diagnosedGap: activeStudent.keyLearningGap,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: data.reply || `Based on your key gap (${activeStudent.keyLearningGap}), keep focusing on micro-quizzes in your Spaced Retrieval Queue!`,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: `Great question, ${activeStudent.studentName}! To master ${activeStudent.keyLearningGap}, break down the execution steps and write isolated unit test assertions in the sandbox.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <MechaCard
        themeColor="cyan"
        title="24/7 Persistent AI Mentor Chat"
        subTitle="Contextual AI guidance personalized to your active project score, telemetry logs, and key learning gaps."
        badge="GEMINI 2.5 FLASH // ASTRO-X CO-PILOT"
        icon={<Bot className="w-6 h-6" />}
      >
        <div className="pt-2 flex flex-col h-[480px] bg-slate-950/90 rounded-2xl border border-cyan-500/30 p-4 justify-between">
          {/* Chat Messages List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs font-sans ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center shrink-0 text-cyan-400">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-cyan-600 text-slate-950 font-semibold rounded-br-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>

                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300 font-bold font-mono">
                    You
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs p-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Astro-X is typing response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Astro-X anything about your code, gap, or architecture..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-sans focus:border-cyan-500 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shadow-md shadow-cyan-600/30"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </MechaCard>
    </div>
  );
};
