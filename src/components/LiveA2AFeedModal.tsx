import React, { useState, useEffect } from 'react';
import { X, Radio, Bot, ShieldCheck, Zap, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';

interface A2AMessage {
  id: string;
  timestamp: string;
  from: 'Learning Agent' | 'AST Grader Agent' | 'Teacher Alert Agent' | 'Parent Translator';
  to: 'Learning Agent' | 'AST Grader Agent' | 'Teacher Alert Agent' | 'Parent Translator' | 'Orchestrator';
  event: string;
  details: string;
  status: 'active' | 'completed' | 'routing';
}

interface LiveA2AFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveA2AFeedModal: React.FC<LiveA2AFeedModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<A2AMessage[]>([
    {
      id: 'a2a-101',
      timestamp: '12:01:14',
      from: 'AST Grader Agent',
      to: 'Learning Agent',
      event: 'AST_SCAN_COMPLETE',
      details: 'Detected tag:ASYNC_JS_ERROR in project repository. Latency 340ms.',
      status: 'completed',
    },
    {
      id: 'a2a-102',
      timestamp: '12:01:15',
      from: 'Learning Agent',
      to: 'Teacher Alert Agent',
      event: 'COMPETENCY_RISK_TRIGGER',
      details: 'Student cognitive score fell below 65% threshold on Async Promises.',
      status: 'completed',
    },
    {
      id: 'a2a-103',
      timestamp: '12:01:16',
      from: 'Teacher Alert Agent',
      to: 'Parent Translator',
      event: 'REMEDIAL_ACTION_DISPATCHED',
      details: 'Generated 3-step intervention roadmap. Notifying parent portal.',
      status: 'completed',
    },
    {
      id: 'a2a-104',
      timestamp: '12:01:20',
      from: 'Parent Translator',
      to: 'Orchestrator',
      event: 'JARGON_FREE_SUMMARY_CREATED',
      details: 'Translated AST telemetry into plain English progress update for parent dashboard.',
      status: 'active',
    },
  ]);

  useEffect(() => {
    if (!isOpen) return;

    // Simulate real-time agent message arrivals
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newMsg: A2AMessage = {
        id: `a2a-${Date.now()}`,
        timestamp: timeStr,
        from: 'Learning Agent',
        to: 'Orchestrator',
        event: 'SM2_RECALL_UPDATE',
        details: `SM-2 calculation updated retention score to ${(85 + Math.random() * 10).toFixed(1)}%.`,
        status: 'active',
      };
      setMessages((prev) => [newMsg, ...prev.slice(0, 7)]);
    }, 6000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-2xl p-5 shadow-[0_0_50px_rgba(16,185,129,0.25)] relative overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>Autonomous A2A Communication Trace</span>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">
                  LIVE
                </span>
              </h3>
              <p className="text-xs text-slate-400">Google ADK & Gemini Multi-Agent Inter-Agent Protocol</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Trace List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 font-mono text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-slate-950/80 border border-emerald-500/20 rounded-xl p-3 hover:border-emerald-500/50 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                <span className="px-1.5 py-0.5 text-[9px] rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-semibold">
                  {msg.event}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-300 font-bold mb-1">
                <span>{msg.from}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="text-cyan-300">{msg.to}</span>
              </div>

              <p className="text-slate-300 text-[11px] leading-relaxed font-sans">{msg.details}</p>

              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> State Synchronized
                </span>
                <span className="text-slate-500">Latency: 12ms</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
            <Activity className="w-4 h-4 animate-spin text-emerald-400" /> 4 Agents Connected
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-600/30"
          >
            Close Feed
          </button>
        </div>
      </div>
    </div>
  );
};
