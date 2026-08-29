import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SpacedRetrievalCard, LanguageType } from '../../types';
import { getActiveStudentSession, recordStudentActivity } from '../../lib/telemetryStore';
import { Calendar, RotateCcw, CheckCircle2, Clock, Sparkles, Brain, Award, ArrowRight } from 'lucide-react';

interface Props {
  language?: LanguageType;
}

export const SpacedRetrieval: React.FC<Props> = ({ language }) => {
  const { t } = useLanguage();
  const [cards, setCards] = useState<SpacedRetrievalCard[]>([
    {
      id: 'c1',
      topic: 'Distributed Systems',
      concept: 'Paxos Consensus vs Raft Consensus',
      question: 'Why does Raft require a strict Leader node for log replication, whereas Paxos allows multi-proposer elections? What are the split-brain failure modes?',
      answer: 'Raft simplifies consensus by decomposing it into Leader Election, Log Replication, and Safety. If a leader is isolated, it cannot commit logs without a majority quorum (N/2 + 1). Paxos allows any node to propose, but requires 2 phases (Prepare/Promise, Accept/Accepted), which can lead to dueling proposers without a leader lease.',
      intervalDay: 1,
      lastReviewed: 'Today',
      nextReviewDate: 'Day 1 Queue',
      status: 'Review Due',
    },
    {
      id: 'c2',
      topic: 'Cloud Security',
      concept: 'OAuth 2.0 PKCE (Proof Key for Code Exchange)',
      question: 'Why is client_secret insufficient for single-page apps (SPAs) or native mobile apps? How does PKCE prevent authorization code injection?',
      answer: 'SPAs cannot securely conceal secrets in client bundle JavaScript. PKCE generates a dynamic high-entropy code_verifier on the client, hashes it to code_challenge (S256), and sends it in the auth request. The token endpoint verifies code_verifier against the original hash, preventing code interception.',
      intervalDay: 7,
      lastReviewed: '3 days ago',
      nextReviewDate: 'Day 7 Queue',
      status: 'In Progress',
    },
    {
      id: 'c3',
      topic: 'Database Internals',
      concept: 'Write-Ahead Logging (WAL) & ACID Isolation',
      question: 'How does Write-Ahead Logging guarantee Atomicity and Durability during a sudden server power crash before dirty pages are flushed to disk?',
      answer: 'WAL enforces that log records describing a change are persisted to non-volatile disk BEFORE the actual data pages are updated in buffer pool. On crash recovery, ARIES protocol runs REDO phase to restore state to crash time, followed by UNDO phase to rollback uncommitted transactions using undo log pointers.',
      intervalDay: 21,
      lastReviewed: '14 days ago',
      nextReviewDate: 'Day 21 Queue',
      status: 'Mastered',
    },
    {
      id: 'c4',
      topic: 'Kernel & OS',
      concept: 'eBPF (Extended Berkeley Packet Filter) Safety',
      question: 'How does the in-kernel eBPF verifier guarantee that user-space bytecode loaded into kernel hooks will never panic or freeze the Linux kernel?',
      answer: 'The eBPF verifier performs static analysis via Directed Acyclic Graph (DAG) depth-first traversal to ensure: 1) All memory dereferences are bounded and valid, 2) No infinite loops (bounded iterations only), 3) Program terminates within 1M instructions, and 4) No uninitialized registers are read.',
      intervalDay: 60,
      lastReviewed: '40 days ago',
      nextReviewDate: 'Day 60 Queue',
      status: 'Mastered',
    },
  ]);

  const [activeCardId, setActiveCardId] = useState<string>('c1');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const activeCard = cards.find((c) => c.id === activeCardId) || cards[0];

  const handleNextReview = (nextInterval: 1 | 7 | 21 | 60) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === activeCard.id
          ? {
              ...c,
              intervalDay: nextInterval,
              status: nextInterval === 60 ? 'Mastered' : 'In Progress',
              lastReviewed: 'Just now',
            }
          : c
      )
    );
    setShowAnswer(false);

    // Record student activity telemetry
    const activeStudent = getActiveStudentSession();
    recordStudentActivity({
      studentId: activeStudent.id,
      studentName: activeStudent.studentName,
      rollNo: activeStudent.rollNo,
      module: 'Spaced Retrieval Queue',
      actionType: 'Active Recall Queue Review',
      title: activeCard.concept,
      score: nextInterval === 60 ? '100%' : `${nextInterval}d Interval`,
      summary: `Reviewed active recall card: ${activeCard.topic} - ${activeCard.concept}`,
      diagnosedGap: nextInterval === 60 ? 'Mastered Concept' : `Scheduled for Day ${nextInterval} review`,
    });

    // Cycle to next card
    const currentIndex = cards.findIndex((c) => c.id === activeCard.id);
    const nextIndex = (currentIndex + 1) % cards.length;
    setActiveCardId(cards[nextIndex].id);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-mono">{t('spacedTitle', 'Spaced Retrieval & Active Recall Engine')}</h2>
            <p className="text-sm text-slate-400">
              {t('spacedSubtitle', 'Combats post-exam forgetting curves with targeted retrieval schedules (Day 1, 7, 21, 60) and senior engineering recall challenges.')}
            </p>
          </div>
        </div>

        {/* Schedule Interval Indicators */}
        <div className="flex items-center gap-2">
          {[1, 7, 21, 60].map((day) => (
            <div
              key={day}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                activeCard?.intervalDay === day
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              Day {day}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Queue List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{t('spacedReviewQueue', 'Spaced Review Queue')} ({cards.length})</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </h3>

          <div className="space-y-2">
            {cards.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCardId(c.id);
                  setShowAnswer(false);
                }}
                className={`w-full p-3.5 rounded-xl text-left border transition-all flex flex-col gap-1.5 ${
                  c.id === activeCard.id
                    ? 'bg-slate-950 border-amber-500/60 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                    {t(c.topic, c.topic)}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      c.status === 'Review Due'
                        ? 'bg-red-950 text-red-400 border border-red-800/60'
                        : c.status === 'Mastered'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : 'bg-amber-950 text-amber-300 border border-amber-800/60'
                    }`}
                  >
                    {t(c.status, c.status)}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{t(c.concept, c.concept)}</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mt-1 pt-1 border-t border-slate-900">
                  <span>Schedule: Day {c.intervalDay}</span>
                  <span>Last: {c.lastReviewed}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Recall Card Display */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between min-h-[420px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-amber-950/80 text-amber-300 px-3 py-1 rounded-lg border border-amber-800/60">
                  {t(activeCard.topic, activeCard.topic)}
                </span>
                <span className="text-xs font-mono text-slate-400">• Interval Schedule: Day {activeCard.intervalDay}</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>Active Recall Protocol</span>
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-3 font-mono">{t(activeCard.concept, activeCard.concept)}</h3>

            {/* Question */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 mb-4">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                {t('activeRecallChallenge', 'Active Recall Engineering Challenge:')}
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">{t(activeCard.question, activeCard.question)}</p>
            </div>

            {/* Ebbinghaus Retention Decay Curve Visualizer */}
            <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800/90 mb-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5" /> Ebbinghaus Retention Curve (SM-2 Math)
                </span>
                <span className="text-slate-400 text-[11px]">
                  Projected Recall: <strong className="text-emerald-400">{activeCard.intervalDay === 60 ? '98%' : activeCard.intervalDay === 21 ? '85%' : activeCard.intervalDay === 7 ? '68%' : '42%'}</strong>
                </span>
              </div>

              {/* Memory Retention Curve SVG Chart */}
              <div className="h-20 w-full relative pt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 60" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="10" x2="300" y2="10" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="35" x2="300" y2="35" stroke="#1e293b" strokeDasharray="3 3" />
                  {/* Decay Path without Spaced Repetition (Red) */}
                  <path
                    d="M 0 10 Q 60 55 300 58"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    opacity="0.6"
                  />
                  {/* SM-2 Spaced Retrieval Curve (Emerald) */}
                  <path
                    d="M 0 10 Q 50 40 70 12 Q 130 35 150 10 Q 220 28 240 8 L 300 8"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                  />
                  {/* Current Recall Point */}
                  <circle cx={activeCard.intervalDay === 60 ? '240' : activeCard.intervalDay === 21 ? '150' : activeCard.intervalDay === 7 ? '70' : '20'} cy="10" r="4" fill="#fbbf24" className="animate-ping" />
                  <circle cx={activeCard.intervalDay === 60 ? '240' : activeCard.intervalDay === 21 ? '150' : activeCard.intervalDay === 7 ? '70' : '20'} cy="10" r="4" fill="#fbbf24" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                <span className="text-red-400/80">-- Without Repetition (80% Forgetting in 14d)</span>
                <span className="text-emerald-400 font-bold">{"— SM-2 Spaced Queue (Iₙ = Iₙ₋₁ × EF)"}</span>
              </div>
            </div>

            {/* Answer Toggle */}
            {showAnswer ? (
              <div className="bg-emerald-950/20 p-5 rounded-xl border border-emerald-800/60 space-y-2 animate-fadeIn">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  {t('seniorExplanation', 'Senior Engineering Explanation & Solution:')}
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">{t(activeCard.answer, activeCard.answer)}</p>
              </div>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full py-4 bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 hover:border-amber-500/60 rounded-xl text-amber-400 text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('revealSolution', 'Reveal Senior Architectural Solution')}</span>
              </button>
            )}
          </div>

          {/* Interval Schedule Action Buttons */}
          {showAnswer && (
            <div className="mt-6 pt-4 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3 text-center">
                {t('rateRecallQuality', 'Rate Recall Quality to Schedule Next Spaced Repetition Interval:')}
              </span>

              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleNextReview(1)}
                  className="py-2.5 bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-200 rounded-xl text-xs font-mono font-bold transition-all text-center"
                >
                  Hard (Day 1)
                </button>
                <button
                  onClick={() => handleNextReview(7)}
                  className="py-2.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-800 text-amber-200 rounded-xl text-xs font-mono font-bold transition-all text-center"
                >
                  Good (Day 7)
                </button>
                <button
                  onClick={() => handleNextReview(21)}
                  className="py-2.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 text-cyan-200 rounded-xl text-xs font-mono font-bold transition-all text-center"
                >
                  Easy (Day 21)
                </button>
                <button
                  onClick={() => handleNextReview(60)}
                  className="py-2.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-200 rounded-xl text-xs font-mono font-bold transition-all text-center"
                >
                  Mastered (Day 60)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
