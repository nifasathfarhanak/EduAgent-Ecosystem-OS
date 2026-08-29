import React, { useState } from 'react';
import { LanguageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { MechaCard } from '../CyberVisuals';
import { Swords, Trophy, Users, Timer, CheckCircle2, Play, Zap, ShieldAlert, Award } from 'lucide-react';

interface Props {
  language: LanguageType;
}

export const P2PArena: React.FC<Props> = ({ language }) => {
  const { t } = useLanguage();
  const [battleState, setBattleState] = useState<'idle' | 'matched' | 'completed'>('idle');
  const [userCode, setUserCode] = useState<string>(`// Fix Async Race Condition Challenge
async function fetchUserData(userId) {
  let cache = {};
  if (cache[userId]) return cache[userId];
  const data = await api.get('/user/' + userId);
  cache[userId] = data; // Race condition hazard
  return data;
}`);

  const [refereeFeedback, setRefereeFeedback] = useState<string | null>(null);

  const handleStartMatch = () => {
    setBattleState('matched');
  };

  const handleSubmitBattleCode = () => {
    setBattleState('completed');
    setRefereeFeedback('AI Referee Score: 96/100! Excellent use of Atomic Map & Mutex locks. Opponent timed out after 3m 20s. You won +150 Skill XP!');
  };

  return (
    <div className="space-y-6">
      <MechaCard
        themeColor="red"
        title="P2P Gamified AI Micro-Coding Battle Arena"
        subTitle="1v1 mobile coding battles paired by AI based on shared skill gaps. The AI referee scores code elegance, latency, and memory safety."
        badge="AI REFEREE // 1V1 COMPETITION ARENA"
        icon={<Swords className="w-6 h-6" />}
      >
        <div className="pt-2 space-y-4">
          {battleState === 'idle' && (
            <div className="bg-slate-950/90 border border-red-500/30 rounded-2xl p-6 text-center space-y-3">
              <Trophy className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
              <h3 className="text-base font-bold text-slate-100 font-mono">1v1 Mobile Debugging Match</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Compete live against a peer to fix an async race condition bug in under 5 minutes.
              </p>
              <button
                onClick={handleStartMatch}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                Find Opponent & Match
              </button>
            </div>
          )}

          {battleState === 'matched' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-red-500/40 text-xs font-mono">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> You vs Cadet Priya (BMSIT)
                </span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Timer className="w-4 h-4" /> 04:32 Remaining
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <span className="text-slate-400 uppercase tracking-wider block">Your Battle Code Editor:</span>
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  rows={7}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-cyan-300 font-mono text-xs focus:border-red-500 focus:outline-none"
                />
              </div>

              <button
                onClick={handleSubmitBattleCode}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-mono font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                Submit Code to AI Referee
              </button>
            </div>
          )}

          {battleState === 'completed' && (
            <div className="bg-emerald-950/30 border border-emerald-500/50 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
              <Award className="w-12 h-12 text-amber-400 mx-auto" />
              <h3 className="text-base font-bold text-emerald-300 font-mono">VICTORY! +150 Skill XP Gained</h3>
              <p className="text-xs text-slate-200 font-sans leading-relaxed max-w-lg mx-auto">
                {refereeFeedback}
              </p>
              <button
                onClick={() => setBattleState('idle')}
                className="px-5 py-2 bg-slate-900 border border-slate-700 hover:border-emerald-400 text-slate-200 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer"
              >
                Back to Battle Lobby
              </button>
            </div>
          )}
        </div>
      </MechaCard>
    </div>
  );
};
