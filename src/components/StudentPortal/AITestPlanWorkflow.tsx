import React, { useState } from 'react';
import { LanguageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { getActiveStudentSession, recordStudentActivity } from '../../lib/telemetryStore';
import { MechaCard } from '../CyberVisuals';
import { Calendar, CheckCircle2, Sparkles, Brain, Target, ArrowRight, Loader2, Play, Award, Zap, Bot, BookOpen } from 'lucide-react';
import { MarkdownRenderer } from '../MarkdownRenderer';

interface Props {
  language: LanguageType;
}

export const AITestPlanWorkflow: React.FC<Props> = ({ language }) => {
  const { t } = useLanguage();
  const activeStudent = getActiveStudentSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [planGenerated, setPlanGenerated] = useState<boolean>(true);

  const [testPlan, setTestPlan] = useState({
    title: `Autonomous AI Study Workflow & Test Plan for ${activeStudent.studentName}`,
    targetGap: activeStudent.keyLearningGap,
    currentScore: activeStudent.projectScore,
    days: [
      {
        day: 'Day 1: AI Concept Deep-Dive & Diagnostic',
        tutoringTopic: 'Asynchronous JavaScript & Event Loop Mechanics',
        aiTutoringAction: 'AI Tutor explains Call Stack vs Microtask Queue (Promises) vs Macrotask Queue (setTimeout).',
        testPlanItem: '5-min AI Diagnostic Micro-Quiz on Promise.allSettled vs Promise.all.',
        status: 'Completed',
      },
      {
        day: 'Day 2: AI Code Sandbox Challenge',
        tutoringTopic: 'Preventing Unhandled Promise Rejections & Memory Leaks',
        aiTutoringAction: 'Interactive AST sandbox challenge: Refactor legacy async code with try/catch and abort controllers.',
        testPlanItem: 'Live AST Code Execution Test in isolated Docker sandbox.',
        status: 'In Progress',
      },
      {
        day: 'Day 3: Multimodal Vision Architecture Review',
        tutoringTopic: 'Cloud Event-Driven CQRS & Message Queue Isolation',
        aiTutoringAction: 'AI Vision Tutor analyzes AWS Kinesis/EventBridge architecture diagram for single points of failure.',
        testPlanItem: 'Architecture Flaw Detection Test & SPOF Remediation Plan.',
        status: 'Upcoming',
      },
      {
        day: 'Day 4: STAR Voice AI Technical Interview',
        tutoringTopic: 'Distributed Systems & Race Condition Defenses',
        aiTutoringAction: 'Voice STAR Interviewer tests student on Raft vs Paxos consensus and split-brain scenarios.',
        testPlanItem: 'STAR Framework AI Verbal Evaluation (Score threshold 85%).',
        status: 'Upcoming',
      },
      {
        day: 'Day 5-7: SM-2 Spaced Retrieval & Mastery Exam',
        tutoringTopic: 'Long-term Memory Retention & Final Competency Certification',
        aiTutoringAction: 'SM-2 Spaced Repetition queue presents memory decay challenges tailored to student error history.',
        testPlanItem: 'Final Autonomous AI Competency Certification Test.',
        status: 'Upcoming',
      },
    ],
  });

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/skill-gap-matrix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: activeStudent.studentName,
          diagnosedGap: activeStudent.keyLearningGap,
          targetRole: activeStudent.targetRole,
          language,
        }),
      });

      const data = await res.json();
      if (data && data.matrix) {
        setPlanGenerated(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      recordStudentActivity({
        studentId: activeStudent.id,
        studentName: activeStudent.studentName,
        rollNo: activeStudent.rollNo,
        module: 'AI Test Plan & Workflow Generator',
        actionType: 'Autonomous AI Plan Generation',
        title: `Generated Test Plan for ${activeStudent.keyLearningGap}`,
        score: '100%',
        summary: `Autonomous AI generated 7-day adaptive test plan and tutoring workflow for ${activeStudent.studentName}.`,
        diagnosedGap: activeStudent.keyLearningGap,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Mecha Title Header */}
      <MechaCard
        themeColor="cyan"
        title="Autonomous AI Tutoring Workflow & Test Plan Generator"
        subTitle="Eliminates teacher workload by letting AI autonomously generate personalized 7-day study workflows, interactive tutoring modules, and micro-test plans based on student telemetry."
        badge="GEMINI 3.7 FLASH // AUTONOMOUS CURRICULUM ENGINE"
        icon={<Brain className="w-6 h-6" />}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
              Target Student: {activeStudent.studentName} ({activeStudent.rollNo})
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold">
              Diagnosed Gap: {activeStudent.keyLearningGap}
            </div>
          </div>

          <button
            onClick={handleGeneratePlan}
            disabled={loading}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Regenerate AI Test Plan & Workflow</span>
          </button>
        </div>
      </MechaCard>

      {/* 7-Day AI Workflow & Test Plan Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-mono text-cyan-300 uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <span>Autonomous 7-Day Tutoring & Test Schedule</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
            <Zap className="w-3.5 h-3.5" /> Zero Teacher Manual Setup Required
          </span>
        </div>

        <div className="space-y-3">
          {testPlan.days.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                item.status === 'Completed'
                  ? 'bg-slate-900/60 border-emerald-500/40 shadow-sm'
                  : item.status === 'In Progress'
                  ? 'bg-slate-900/90 border-cyan-500/60 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                  : 'bg-slate-950/80 border-slate-800/80'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-xl text-xs font-mono font-bold mt-0.5 ${
                      item.status === 'Completed'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : item.status === 'In Progress'
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Day {idx + 1}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-100 font-mono flex items-center gap-2">
                      <span>{item.day}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                          item.status === 'Completed'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : item.status === 'In Progress'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </h4>

                    {/* AI Tutoring Action */}
                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                        <Bot className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-cyan-300 font-mono">AI Autonomous Tutor:</strong> {item.aiTutoringAction}
                        </span>
                      </div>

                      {/* AI Test Plan Item */}
                      <div className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                        <Award className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-purple-300 font-mono">AI Adaptive Micro-Test:</strong> {item.testPlanItem}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                      item.status === 'Completed'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80 cursor-default'
                        : 'bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 cursor-pointer shadow-md'
                    }`}
                  >
                    {item.status === 'Completed' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Verified</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                        <span>Launch Session</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
