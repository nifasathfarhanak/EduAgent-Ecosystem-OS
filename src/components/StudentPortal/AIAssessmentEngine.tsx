import React, { useState } from 'react';
import { LanguageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { getActiveStudentSession, recordStudentActivity } from '../../lib/telemetryStore';
import { MechaCard } from '../CyberVisuals';
import { FileCheck, Sparkles, CheckCircle2, AlertTriangle, Send, Award, Clock, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

interface Props {
  language: LanguageType;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

export const AIAssessmentEngine: React.FC<Props> = ({ language }) => {
  const { t } = useLanguage();
  const activeStudent = getActiveStudentSession();
  const [subject, setSubject] = useState<string>('CS401 — Machine Learning & Neural Nets');
  const [generating, setGenerating] = useState<boolean>(false);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] = useState<{
    scorePct: number;
    scoreText: string;
    diagnosedGap: string;
    aiFeedback: string;
  } | null>(null);

  const handleGenerateAssessment = async () => {
    setGenerating(true);
    setIsSubmitted(false);
    setUserAnswers({});
    setAssessmentResult(null);

    try {
      const res = await fetch('/api/ai/generate-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, language }),
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        setQuestions(getDefaultAssessmentQuestions(subject));
      }
    } catch (err) {
      setQuestions(getDefaultAssessmentQuestions(subject));
    } finally {
      setGenerating(false);
    }
  };

  const getDefaultAssessmentQuestions = (subj: string): AssessmentQuestion[] => [
    {
      id: 1,
      question: `In ${subj}, what is the main purpose of non-linear activation functions in deep neural networks?`,
      options: [
        'To reduce disk storage requirements',
        'To enable the network to learn complex non-linear decision boundaries',
        'To convert integer outputs to floating point values',
        'To automatically fix syntax errors in training data',
      ],
      correctIdx: 1,
      explanation: 'Activation functions introduce non-linearity, allowing networks to approximate complex functions beyond linear combinations.',
    },
    {
      id: 2,
      question: 'Which optimization algorithm adapts learning rates individually for each parameter based on historical gradient moments?',
      options: ['Batch Gradient Descent', 'Stochastic Gradient Descent (SGD)', 'Adam (Adaptive Moment Estimation)', 'Random Walk Search'],
      correctIdx: 2,
      explanation: 'Adam computes adaptive learning rates for each parameter by maintaining exponential moving averages of gradients and squared gradients.',
    },
    {
      id: 3,
      question: 'What symptom indicates that a model is experiencing severe overfitting on training data?',
      options: [
        'High training accuracy paired with poor validation dataset performance',
        'Equal training and validation loss curves',
        'Fast execution speed on GPU hardware',
        'Zero weight parameters in the model checkpoint',
      ],
      correctIdx: 0,
      explanation: 'Overfitting occurs when a model memorizes noise in the training set, causing high training score but poor generalization on validation data.',
    },
  ];

  const handleSubmitAssessment = () => {
    if (questions.length === 0) return;
    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIdx) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / questions.length) * 100);
    const scoreText = `${scorePct}/100`;

    let diagnosedGap = 'Mastered Subject Fundamentals';
    if (scorePct < 70) {
      diagnosedGap = `Conceptual gap in ${subject} optimization & memory mechanics`;
    } else if (scorePct < 85) {
      diagnosedGap = `Needs practice on parameter tuning & edge cases in ${subject}`;
    }

    const aiFeedback = scorePct >= 80
      ? `Outstanding work ${activeStudent.studentName}! Your assessment report has been submitted to your professor.`
      : `Good effort ${activeStudent.studentName}! Focus review on parameter optimization. Assessment report dispatched to professor.`;

    const result = {
      scorePct,
      scoreText,
      diagnosedGap,
      aiFeedback,
    };

    setAssessmentResult(result);
    setIsSubmitted(true);

    // Automatically submit telemetry assessment report to Teacher Portal / Backend
    recordStudentActivity({
      studentId: activeStudent.id,
      studentName: activeStudent.studentName,
      rollNo: activeStudent.rollNo,
      module: `Subject Assessment: ${subject}`,
      actionType: 'SUBJECT_ASSESSMENT_SUBMISSION',
      title: `Completed ${subject} AI Assessment`,
      score: scoreText,
      summary: `Scored ${scoreText} on ${questions.length}-question AI assessment. Diagnosed Gap: "${diagnosedGap}".`,
      diagnosedGap,
      details: {
        subject,
        scorePct,
        totalQuestions: questions.length,
        correctCount,
      },
    });
  };

  return (
    <div className="space-y-6">
      <MechaCard
        themeColor="cyan"
        title="AI Subject Assessment & Teacher Telemetry Dispatcher"
        subTitle="AI generates subject assessments, grades student responses, diagnoses learning gaps, and automatically dispatches certified assessment reports to the Teacher Portal."
        badge="GEMINI 2.5 FLASH // AUTOMATED TELEMETRY DISPATCH"
        icon={<FileCheck className="w-6 h-6" />}
      >
        <div className="pt-2 space-y-5">
          {/* Subject Selector & Generate Button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
            >
              <option value="CS401 — Machine Learning & Neural Nets">CS401 — Machine Learning & Neural Nets</option>
              <option value="CS302 — Distributed Systems & Cloud">CS302 — Distributed Systems & Cloud</option>
              <option value="CS501 — Advanced Cybersecurity & PKCE">CS501 — Advanced Cybersecurity & PKCE</option>
              <option value="Database B-Tree Indexing & Query Plans">Database B-Tree Indexing & Query Plans</option>
            </select>

            <button
              onClick={handleGenerateAssessment}
              disabled={generating}
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating AI Questions...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Create Subject Assessment</span>
                </>
              )}
            </button>
          </div>

          {/* Active Questions Container */}
          {questions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-xs text-slate-400">
                <span className="text-cyan-400 font-bold">Subject: {subject}</span>
                <span>{questions.length} Questions</span>
              </div>

              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div key={q.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-sans text-xs">
                    <div className="font-bold text-white flex items-start gap-2">
                      <span className="text-cyan-400 font-mono">Q{idx + 1}.</span>
                      <span>{q.question}</span>
                    </div>

                    <div className="space-y-2 pt-1 font-mono text-xs">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAnswers[q.id] === optIdx;
                        let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/40';

                        if (isSubmitted) {
                          if (optIdx === q.correctIdx) {
                            optionStyle = 'bg-emerald-950 text-emerald-300 border-emerald-500 font-bold';
                          } else if (isSelected && optIdx !== q.correctIdx) {
                            optionStyle = 'bg-red-950 text-red-400 border-red-500 font-bold';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-cyan-950 text-cyan-300 border-cyan-400 font-bold shadow-md';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isSubmitted}
                            onClick={() => setUserAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                            className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" />}
                          </button>
                        );
                      })}
                    </div>

                    {isSubmitted && (
                      <p className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800 leading-relaxed font-sans">
                        <strong className="text-cyan-300 font-mono">Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit Assessment Button */}
              {!isSubmitted ? (
                <button
                  onClick={handleSubmitAssessment}
                  disabled={Object.keys(userAnswers).length < questions.length}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Assessment & Dispatch Report to Teacher</span>
                </button>
              ) : (
                assessmentResult && (
                  <div className="bg-emerald-950/40 border-2 border-emerald-500/50 rounded-2xl p-5 text-center space-y-3">
                    <Award className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
                    <h3 className="text-base font-bold font-mono text-emerald-300">
                      Assessment Report Submitted to Teacher Portal!
                    </h3>
                    <div className="text-2xl font-mono font-bold text-cyan-400">Score: {assessmentResult.scoreText}</div>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">{assessmentResult.aiFeedback}</p>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-amber-300 inline-block">
                      Telemetry Record Dispatched: Diagnosed Gap = "{assessmentResult.diagnosedGap}"
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </MechaCard>
    </div>
  );
};
