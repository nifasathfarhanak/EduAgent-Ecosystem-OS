import React, { useState, useEffect } from 'react';
import { LanguageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Flame, Sparkles, Brain, Lightbulb, ArrowRight, Zap, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';

export interface Props {
  language?: LanguageType | string;
  onSetModality?: (modality: 'Text') => void;
}

export function DisengagementAnalogyEngine({ language = 'English', onSetModality }: Props) {
  const { t } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState("Memory Safety: Garbage Collection vs Rust Borrow Checker");
  const [analogyOutput, setAnalogyOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (onSetModality) {
      onSetModality('Text');
    }
  }, [onSetModality]);

  const topics = [
    "Paxos Consensus Protocol & Majority Quorums",
    "Memory Safety: Garbage Collection vs Rust Borrow Checker",
    "Database Locking: Optimistic (OCC) vs Pessimistic Concurrency",
    "OAuth 2.0 PKCE Code Challenge Authorization Flow",
    "TCP 3-Way Handshake vs QUIC UDP Connection Migration"
  ];

  const handleGenerateAnalogy = (topicText?: string) => {
    const targetTopic = topicText || selectedTopic;
    setLoading(true);
    setAnalogyOutput(null);

    setTimeout(() => {
      if (targetTopic.includes("Memory Safety")) {
        setAnalogyOutput(
          "🧹 **Garbage Collection vs Rust Borrow Checker Analogy:**\n\n" +
          "• **Garbage Collection (Java/Go):** Imagine hosting a massive party where you just drop trash anywhere on the floor. At the end of the night, a cleaning crew (GC) walks around sweeping everything up. It's easy for guests, but sometimes causes unexpected pauses (Stop-The-World).\n\n" +
          "• **Rust Borrow Checker:** Imagine a strict library where every single book has a strict logbook. If you take a book, nobody else can burn or rewrite it until you officially hand it back. It requires discipline upfront, but guarantees zero accidents!"
        );
      } else if (targetTopic.includes("Paxos")) {
        setAnalogyOutput(
          "🏛️ **Paxos Consensus Analogy:** Imagine a parliament of 5 ministers trying to pass a law across different cities. They send messengers who might get delayed. To pass a bill, a strict majority (Quorum) must agree on the exact version, preventing any rogue minister from changing laws unilaterally."
        );
      } else {
        setAnalogyOutput(
          `🚀 **Real-World Analogy for "${targetTopic}":**\n\nThink of this like traffic management on a multi-lane highway during rush hour. Synchronization mechanisms act like automated toll booths and traffic lights ensuring high throughput without collisions or data loss.`
        );
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Title Header Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
              <span>Disengagement Analogy Engine</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-sans">
                Cognitive Bridge
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Transforms abstract, dry computer science concepts into vivid real-world mental models.
            </p>
          </div>
        </div>

        <div className="px-3.5 py-1.5 bg-amber-500/10 text-amber-300 text-xs rounded-xl border border-amber-500/30 font-mono font-semibold flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Dry Theory → Intuitive Mental Model</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Topic Chips Left Column */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Select High-Stakes Topic</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-500">5 Ready</span>
          </div>

          <div className="space-y-2">
            {topics.map((t, idx) => {
              const isSelected = selectedTopic === t;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedTopic(t);
                    handleGenerateAnalogy(t);
                  }}
                  className={`w-full p-3 rounded-2xl text-left text-xs font-mono font-medium transition-all border cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10 ring-1 ring-amber-500/40'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <span className="line-clamp-1">{t}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-semibold text-slate-400">Custom Engineering Topic:</label>
              <input 
                type="text"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                placeholder="e.g. Distributed transactions 2PC"
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono shadow-inner"
              />
            </div>
            <button 
              type="button"
              onClick={() => handleGenerateAnalogy(selectedTopic)}
              disabled={loading}
              className="w-full mt-3 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-600/20 font-mono text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-200" />
              <span>{loading ? "Synthesizing Analogy..." : "Adapt to Real-World Analogy"}</span>
            </button>
          </div>
        </div>

        {/* Output Console Display */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <Brain className="w-4 h-4" />
                  <span>Cognitive Synthesis Output</span>
                </span>
              </div>
              <span className="font-mono text-[10px] bg-slate-950 text-slate-400 px-3 py-1 rounded-xl border border-slate-800">
                [PORTAL: Student] | [Feature: Text] | [Language: {String(language)}]
              </span>
            </div>

            <div className="min-h-[220px] text-sm text-slate-200 leading-relaxed font-sans pt-1">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-3 text-amber-400">
                  <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-mono text-xs text-slate-400">Distilling complexity into intuition...</span>
                </div>
              ) : analogyOutput ? (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-3 shadow-inner whitespace-pre-line">
                  {analogyOutput}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-2 text-slate-500">
                  <Lightbulb className="w-8 h-8 text-slate-600" />
                  <p className="font-mono text-xs">No analogy generated yet. Select a topic on the left to adapt instantly.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Powered by Gemini 1.5 Pro Disengagement Telemetry</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> High Retention
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const DisengagementStudio = DisengagementAnalogyEngine;
export default DisengagementAnalogyEngine;
