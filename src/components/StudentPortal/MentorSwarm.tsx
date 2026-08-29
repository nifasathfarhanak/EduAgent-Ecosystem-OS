import React, { useState } from 'react';
import { LanguageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { MechaCard } from '../CyberVisuals';
import { Bot, Cpu, Terminal, Briefcase, Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  language: LanguageType;
}

export const MentorSwarm: React.FC<Props> = ({ language }) => {
  const { t } = useLanguage();
  const [selectedAgent, setSelectedAgent] = useState<'architect' | 'debugger' | 'career'>('architect');
  const [query, setQuery] = useState('');
  const [swarmResponse, setSwarmResponse] = useState<string | null>(
    'Hello! Select any specialized mentor agent above (System Architect, Code Debugger, or Career Coach) and ask a question.'
  );

  const agents = [
    { id: 'architect', name: 'System Architect Agent', desc: 'Distributed systems, database scaling, microservices', icon: Cpu, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' },
    { id: 'debugger', name: 'Code Debugger Agent', desc: 'Memory leaks, race conditions, AST error fixing', icon: Terminal, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' },
    { id: 'career', name: 'Career & STAR Coach Agent', desc: 'Interview prep, STAR framework, resume polish', icon: Briefcase, color: 'text-purple-400 border-purple-500/40 bg-purple-950/40' },
  ];

  const handleAskSwarm = () => {
    if (!query.trim()) return;
    if (selectedAgent === 'architect') {
      setSwarmResponse(`### 🏗️ System Architect Agent Guidance\n\nFor high-throughput concurrency, avoid single Redis master nodes (SPOF). Implement a **Redis Sentinel cluster with async read-replicas** and client-side circuit breakers.`);
    } else if (selectedAgent === 'debugger') {
      setSwarmResponse(`### 🐛 Code Debugger Agent Analysis\n\nDetected potential memory leak in event listener registration. Ensure you call \`removeEventListener()\` in unmount cleanup functions to prevent dangling DOM references.`);
    } else {
      setSwarmResponse(`### 💼 Career & STAR Coach Strategy\n\nStructure your answer using Situation (S), Task (T), Action (A), and Result (R). Always quantify your impact with numbers (e.g., "Reduced response latency by 35%").`);
    }
  };

  return (
    <div className="space-y-6">
      <MechaCard
        themeColor="cyan"
        title="24/7 Autonomous AI Mentor Swarm Panel"
        subTitle="A panel of 3 specialized AI agents (System Architect, Code Debugger, Career Coach) collaborating autonomously to guide your learning."
        badge="MULTI-AGENT SWARM // GOOGLE ADK ROUTER"
        icon={<Bot className="w-6 h-6" />}
      >
        <div className="pt-2 space-y-4">
          {/* Agent Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {agents.map((ag) => {
              const Icon = ag.icon;
              const isSelected = selectedAgent === ag.id;
              return (
                <button
                  key={ag.id}
                  onClick={() => setSelectedAgent(ag.id as any)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? `${ag.color} shadow-lg ring-1 ring-cyan-500/40 font-bold`
                      : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold text-slate-100">{ag.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{ag.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Prompt & Swarm Response Box */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Ask ${agents.find((a) => a.id === selectedAgent)?.name}...`}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none"
              />
              <button
                onClick={handleAskSwarm}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cyan-600/30"
              >
                <Send className="w-4 h-4" />
                <span>Ask Swarm</span>
              </button>
            </div>

            {swarmResponse && (
              <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 text-slate-200 space-y-2 leading-relaxed">
                <p className="whitespace-pre-line font-sans text-xs">{swarmResponse}</p>
              </div>
            )}
          </div>
        </div>
      </MechaCard>
    </div>
  );
};
