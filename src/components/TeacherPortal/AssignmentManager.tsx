import React, { useState, useEffect } from 'react';
import {
  DBAssignment, DBSubmission, DBStudent,
  fetchAssignments, createAssignment, fetchSubmissions, fetchStudents, gradeSubmission
} from '../../lib/supabase';
import { FileText, Plus, Save, Loader2, ChevronDown, ChevronUp, Star, Brain, X, Calendar, Users } from 'lucide-react';

interface Props {
  teacherId?: string;
  courseId?: string;
}

export const AssignmentManager: React.FC<Props> = ({ teacherId, courseId }) => {
  const [assignments, setAssignments] = useState<DBAssignment[]>([]);
  const [students, setStudents] = useState<DBStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Record<string, DBSubmission[]>>({});
  const [loadingSubmissions, setLoadingSubmissions] = useState<string | null>(null);

  // Create form
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formDueDate, setFormDueDate] = useState('');
  const [formMaxMarks, setFormMaxMarks] = useState(100);
  const [saving, setSaving] = useState(false);

  // AI Grading state
  const [gradingId, setGradingId] = useState<string | null>(null);
  const [gradeScore, setGradeScore] = useState(0);
  const [gradeFeedback, setGradeFeedback] = useState('');
  const [aiGrading, setAiGrading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [assignData, studentData] = await Promise.all([
        fetchAssignments(courseId),
        fetchStudents(teacherId),
      ]);
      setAssignments(assignData);
      setStudents(studentData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [teacherId, courseId]);

  const handleCreate = async () => {
    if (!formTitle.trim()) return;
    try {
      setSaving(true);
      await createAssignment({
        title: formTitle.trim(),
        description: formDesc.trim() || undefined,
        course_id: courseId,
        due_date: formDueDate || undefined,
        max_marks: formMaxMarks,
        created_by: teacherId,
      });
      setFormTitle('');
      setFormDesc('');
      setFormDueDate('');
      setShowCreateForm(false);
      await loadData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const loadSubmissions = async (assignmentId: string) => {
    if (expandedId === assignmentId) {
      setExpandedId(null);
      return;
    }
    try {
      setLoadingSubmissions(assignmentId);
      const subs = await fetchSubmissions({ assignment_id: assignmentId });
      setSubmissions(prev => ({ ...prev, [assignmentId]: subs }));
      setExpandedId(assignmentId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingSubmissions(null);
    }
  };

  const handleAIGrade = async (submission: DBSubmission, assignment: DBAssignment) => {
    try {
      setAiGrading(true);
      // Call the Gemini AI grading endpoint
      const res = await fetch('/api/ai/grade-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eduagent-bearer-token-teacher',
        },
        body: JSON.stringify({
          submissionContent: submission.content,
          assignmentTitle: assignment.title,
          assignmentDescription: assignment.description,
          maxMarks: assignment.max_marks,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setGradeScore(data.suggestedScore || 0);
        setGradeFeedback(data.feedback || 'AI grading completed.');
      } else {
        // Fallback if AI endpoint not available
        setGradeScore(Math.round(assignment.max_marks * 0.75));
        setGradeFeedback('AI grading service unavailable. Please grade manually.');
      }
    } catch {
      setGradeScore(Math.round(assignment.max_marks * 0.75));
      setGradeFeedback('AI grading service unavailable. Please grade manually.');
    } finally {
      setAiGrading(false);
    }
  };

  const handleSaveGrade = async (submissionId: string) => {
    try {
      setSaving(true);
      await gradeSubmission(submissionId, {
        score: gradeScore,
        ai_feedback: gradeFeedback,
        graded_by: teacherId,
      });
      setGradingId(null);
      // Reload submissions for this assignment
      if (expandedId) {
        const subs = await fetchSubmissions({ assignment_id: expandedId });
        setSubmissions(prev => ({ ...prev, [expandedId!]: subs }));
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const getStudentName = (studentId: string) => {
    const s = students.find(st => st.id === studentId);
    return s ? s.name : 'Unknown Student';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/40">
            <FileText className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-mono">Assignments</h2>
            <p className="text-xs text-slate-400">{assignments.length} assignments created</p>
          </div>
        </div>

        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold font-mono text-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Assignment
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Create Form */}
      {showCreateForm && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-3">
          <h3 className="text-sm font-bold text-purple-300 font-mono flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Assignment
          </h3>
          <input
            type="text"
            placeholder="Assignment Title *"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-purple-400 text-sm text-slate-100 font-mono focus:outline-none"
          />
          <textarea
            placeholder="Description / Instructions (optional)"
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-purple-400 text-sm text-slate-100 font-mono focus:outline-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 font-mono block mb-1">Due Date</label>
              <input
                type="date"
                value={formDueDate}
                onChange={(e) => setFormDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-purple-400 text-sm text-slate-100 font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-mono block mb-1">Max Marks</label>
              <input
                type="number"
                value={formMaxMarks}
                onChange={(e) => setFormMaxMarks(parseInt(e.target.value) || 100)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-purple-400 text-sm text-slate-100 font-mono focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleCreate}
              disabled={!formTitle.trim() || saving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold font-mono text-xs cursor-pointer disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Create Assignment
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs cursor-pointer hover:bg-slate-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Assignments List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
          <span className="ml-2 text-sm text-slate-400 font-mono">Loading assignments...</span>
        </div>
      ) : assignments.length === 0 ? (
        <div className="text-center py-12 text-slate-500 font-mono text-sm">
          No assignments yet. Click "Create Assignment" to get started.
        </div>
      ) : (
        <div className="space-y-3">
          {assignments.map((assignment) => {
            const isExpanded = expandedId === assignment.id;
            const subs = submissions[assignment.id] || [];

            return (
              <div key={assignment.id} className="rounded-2xl bg-slate-950/80 border border-slate-800 overflow-hidden">
                {/* Assignment header */}
                <button
                  onClick={() => loadSubmissions(assignment.id)}
                  className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-slate-900/50 transition-all"
                >
                  <div className="text-left">
                    <div className="text-sm font-bold text-white font-mono">{assignment.title}</div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mt-1">
                      {assignment.due_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Due: {assignment.due_date}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" /> Max: {assignment.max_marks} marks
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {loadingSubmissions === assignment.id ? (
                      <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                    ) : (
                      <>
                        <span className="text-xs text-slate-500 font-mono">
                          {isExpanded ? `${subs.length} submissions` : 'View submissions'}
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </>
                    )}
                  </div>
                </button>

                {/* Submissions list */}
                {isExpanded && (
                  <div className="border-t border-slate-800 p-4 space-y-2">
                    {subs.length === 0 ? (
                      <p className="text-xs text-slate-500 font-mono text-center py-4">
                        No submissions yet for this assignment.
                      </p>
                    ) : (
                      subs.map((sub) => (
                        <div key={sub.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-bold text-white font-mono">{getStudentName(sub.student_id)}</span>
                              <span className="text-[11px] text-slate-400 font-mono ml-2">
                                Submitted: {new Date(sub.submitted_at).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {sub.score !== null ? (
                                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                                  {sub.score}/{assignment.max_marks}
                                </span>
                              ) : (
                                <button
                                  onClick={() => { setGradingId(sub.id); setGradeScore(0); setGradeFeedback(''); }}
                                  className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold cursor-pointer hover:bg-amber-500/30 transition-all"
                                >
                                  Grade
                                </button>
                              )}
                            </div>
                          </div>

                          {sub.content && (
                            <div className="text-xs text-slate-300 font-mono bg-slate-950 p-2 rounded-lg border border-slate-800 max-h-24 overflow-auto">
                              {sub.content}
                            </div>
                          )}

                          {sub.ai_feedback && (
                            <div className="text-xs text-cyan-300 font-mono bg-cyan-950/30 p-2 rounded-lg border border-cyan-500/20">
                              <span className="text-[10px] text-cyan-400 font-bold">AI Feedback:</span> {sub.ai_feedback}
                            </div>
                          )}

                          {/* Grading modal inline */}
                          {gradingId === sub.id && (
                            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold text-amber-300 font-mono">Grade Submission</h4>
                                <button
                                  onClick={() => handleAIGrade(sub, assignment)}
                                  disabled={aiGrading}
                                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold cursor-pointer hover:bg-cyan-500/30 transition-all disabled:opacity-50"
                                >
                                  {aiGrading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Brain className="w-3.5 h-3.5" />}
                                  AI Grade
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[10px] text-slate-400 font-mono block mb-1">Score (/{assignment.max_marks})</label>
                                  <input
                                    type="number"
                                    value={gradeScore}
                                    onChange={(e) => setGradeScore(parseInt(e.target.value) || 0)}
                                    max={assignment.max_marks}
                                    min={0}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-100 font-mono focus:outline-none focus:border-amber-400"
                                  />
                                </div>
                              </div>

                              <textarea
                                placeholder="Feedback for student..."
                                value={gradeFeedback}
                                onChange={(e) => setGradeFeedback(e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-400"
                              />

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleSaveGrade(sub.id)}
                                  disabled={saving}
                                  className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold font-mono text-xs cursor-pointer disabled:opacity-50"
                                >
                                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                  Save Grade
                                </button>
                                <button
                                  onClick={() => setGradingId(null)}
                                  className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
