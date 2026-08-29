import React, { useState } from 'react';
import { LanguageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { StudentProfile } from '../../lib/telemetryStore';
import { MechaCard } from '../CyberVisuals';
import { Bot, Sparkles, CheckCircle2, Loader2, MessageSquare, BookOpen, ChevronRight } from 'lucide-react';

interface Props {
  language: LanguageType;
  students: StudentProfile[];
  teacherName: string;
}

export const AIMentoringHub: React.FC<Props> = ({ language, students, teacherName }) => {
  const { t } = useLanguage();
  const atRiskStudents = students.filter((s) => s.riskTier !== '[ON-TRACK]');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile>(atRiskStudents[0] || students[0]);
  const [loading, setLoading] = useState(false);
  const [mentoringScript, setMentoringScript] = useState<string | null>(null);
  const [completedSessions, setCompletedSessions] = useState<Record<string, boolean>>({});

  const handleGenerateScript = async (student: StudentProfile) => {
    setSelectedStudent(student);
    setLoading(true);
    setMentoringScript(null);

    try {
      const res = await fetch('/api/ai/mentor-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: student.studentName,
          diagnosedGap: student.keyLearningGap,
          score: student.projectScore,
          teacherName,
        }),
      });

      const data = await res.json();
      setMentoringScript(data.script || `1:1 Mentoring Script for ${student.studentName}:\n1. Ask: "Walk me through how you handled state lock initialization in your last project."\n2. Analogy: Compare mutex locks to a single key for a shared workspace.\n3. Assignment: Assign 15-min sandbox refactoring challenge.`);
    } catch (err) {
      setMentoringScript(`1:1 Mentoring Script for ${student.studentName}:\n1. Ask about ${student.keyLearningGap}.\n2. Demonstrate code isolation.\n3. Assign micro-quiz.`);
    } finally {
      setLoading(false);
    }
  };

  const toggleDone = (studentId: string) => {
    setCompletedSessions((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  return (
    <div className="space-y-6">
      <MechaCard
        themeColor="purple"
        title="AI Mentoring Hub & 1:1 Student Script Generator"
        subTitle="Generates personalized 3-step mentoring scripts for educators ('What to say in your next 1:1 session') to help at-risk students overcome conceptual bottlenecks."
        badge="GEMINI 2.5 FLASH // PEDAGOGY AI ASSISTANT"
        icon={<Bot className="w-6 h-6" />}
      >
        <div className="pt-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: At-Risk Students List */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
              At-Risk Students ({atRiskStudents.length})
            </h3>

            <div className="space-y-2">
              {students.map((st) => {
                const isSelected = st.id === selectedStudent?.id;
                const isDone = !!completedSessions[st.id];

                return (
                  <button
                    key={st.id}
                    onClick={() => handleGenerateScript(st)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between font-mono text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-purple-950/80 text-purple-300 border-purple-400 shadow-md ring-1 ring-purple-400/40'
                        : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        <span>{st.studentName}</span>
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />}
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans line-clamp-1">{st.keyLearningGap}</div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${st.projectScore < 70 ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}`}>
                        {st.projectScore}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: AI Mentoring Script Display */}
          <div className="lg:col-span-2 bg-slate-950/90 rounded-2xl border border-purple-500/30 p-5 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <span>Mentoring Script for {selectedStudent.studentName}</span>
                    <span className="text-xs text-purple-400 font-normal font-sans">({selectedStudent.rollNo})</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">Diagnosed Gap: {selectedStudent.keyLearningGap}</p>
                </div>

                <button
                  onClick={() => toggleDone(selectedStudent.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    completedSessions[selectedStudent.id]
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-800'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{completedSessions[selectedStudent.id] ? 'Session Completed' : 'Mark as Done'}</span>
                </button>
              </div>

              {loading ? (
                <div className="py-12 text-center text-purple-400 font-mono text-xs space-y-2">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-purple-400" />
                  <p>Generating personalized 1:1 script for {selectedStudent.studentName}...</p>
                </div>
              ) : (
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3 font-sans text-xs leading-relaxed text-slate-200">
                  <p className="whitespace-pre-line leading-relaxed">{mentoringScript || 'Click any student on the left to generate an AI 1:1 mentoring script.'}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Prepared for: {teacherName}</span>
              <span className="text-purple-400 font-semibold">Gemini 2.5 Pedagogy Engine</span>
            </div>
          </div>
        </div>
      </MechaCard>
    </div>
  );
};
