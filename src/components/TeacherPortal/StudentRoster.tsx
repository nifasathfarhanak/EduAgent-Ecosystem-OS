import React, { useState, useEffect } from 'react';
import { DBStudent, fetchStudents, createStudent, updateStudent, deleteStudent } from '../../lib/supabase';
import { Users, Plus, Edit3, Trash2, Search, X, Save, UserPlus, Loader2 } from 'lucide-react';

interface Props {
  teacherId?: string;
}

export const StudentRoster: React.FC<Props> = ({ teacherId }) => {
  const [students, setStudents] = useState<DBStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Add form state
  const [formName, setFormName] = useState('');
  const [formRollNo, setFormRollNo] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDept, setFormDept] = useState('Computer Science');
  const [saving, setSaving] = useState(false);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchStudents(teacherId);
      setStudents(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [teacherId]);

  const handleAdd = async () => {
    if (!formName.trim() || !formRollNo.trim()) return;
    try {
      setSaving(true);
      await createStudent({
        name: formName.trim(),
        roll_no: formRollNo.trim(),
        email: formEmail.trim() || undefined,
        department: formDept.trim(),
        teacher_id: teacherId,
      });
      setFormName('');
      setFormRollNo('');
      setFormEmail('');
      setShowAddForm(false);
      await loadStudents();
    } catch (err: any) {
      setError(err.message || 'Failed to add student');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formName.trim()) return;
    try {
      setSaving(true);
      await updateStudent(id, {
        name: formName.trim(),
        email: formEmail.trim() || null,
        department: formDept.trim(),
      } as any);
      setEditingId(null);
      await loadStudents();
    } catch (err: any) {
      setError(err.message || 'Failed to update student');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove student "${name}" from your roster? This will also delete their attendance and submission records.`)) return;
    try {
      await deleteStudent(id);
      await loadStudents();
    } catch (err: any) {
      setError(err.message || 'Failed to delete student');
    }
  };

  const startEdit = (student: DBStudent) => {
    setEditingId(student.id);
    setFormName(student.name);
    setFormEmail(student.email || '');
    setFormDept(student.department);
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.roll_no.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40">
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-mono">Student Roster</h2>
            <p className="text-xs text-slate-400">{students.length} students enrolled</p>
          </div>
        </div>

        <button
          onClick={() => { setShowAddForm(true); setFormName(''); setFormRollNo(''); setFormEmail(''); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs transition-all cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search by name or roll number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-sm text-slate-100 font-mono focus:outline-none transition-all"
        />
      </div>

      {/* Add Student Form */}
      {showAddForm && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-3">
          <h3 className="text-sm font-bold text-cyan-300 font-mono flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New Student
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Student Name *"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-400 text-sm text-slate-100 font-mono focus:outline-none"
            />
            <input
              type="text"
              placeholder="Roll Number * (e.g. CS2024-001)"
              value={formRollNo}
              onChange={(e) => setFormRollNo(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-400 text-sm text-slate-100 font-mono focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-400 text-sm text-slate-100 font-mono focus:outline-none"
            />
            <input
              type="text"
              placeholder="Department"
              value={formDept}
              onChange={(e) => setFormDept(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-400 text-sm text-slate-100 font-mono focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAdd}
              disabled={!formName.trim() || !formRollNo.trim() || saving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs cursor-pointer disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Student
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs cursor-pointer hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Students List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
          <span className="ml-2 text-sm text-slate-400 font-mono">Loading students from database...</span>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-12 text-slate-500 font-mono text-sm">
          {students.length === 0
            ? 'No students yet. Click "Add Student" to get started!'
            : 'No students match your search.'}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              {editingId === student.id ? (
                // Inline edit mode
                <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="flex-1 px-2 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-sm text-slate-100 font-mono focus:outline-none"
                  />
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Email"
                    className="flex-1 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 font-mono focus:outline-none"
                  />
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleUpdate(student.id)}
                      disabled={saving}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      {saving ? '...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs font-mono">
                      {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white font-mono">{student.name}</div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <span>{student.roll_no}</span>
                        {student.email && <span>• {student.email}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                      {student.department}
                    </span>
                    <button
                      onClick={() => startEdit(student)}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-400 cursor-pointer transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id, student.name)}
                      className="p-1.5 rounded-lg hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
