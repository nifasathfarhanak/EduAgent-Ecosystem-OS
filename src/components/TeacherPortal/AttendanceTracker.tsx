import React, { useState, useEffect } from 'react';
import { DBStudent, DBAttendance, fetchStudents, fetchAttendance, markAttendance } from '../../lib/supabase';
import { Calendar, CheckCircle2, XCircle, Clock, Save, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  teacherId?: string;
  courseId?: string;
}

export const AttendanceTracker: React.FC<Props> = ({ teacherId, courseId }) => {
  const [students, setStudents] = useState<DBStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Attendance state: studentId -> status
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'present' | 'absent' | 'late'>>({});
  const [existingRecords, setExistingRecords] = useState<DBAttendance[]>([]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const studentsData = await fetchStudents(teacherId);
      setStudents(studentsData);

      // Load existing attendance for the selected date
      const attendanceData = await fetchAttendance({ date: selectedDate, course_id: courseId });
      setExistingRecords(attendanceData);

      // Populate the map from existing records
      const map: Record<string, 'present' | 'absent' | 'late'> = {};
      for (const rec of attendanceData) {
        map[rec.student_id] = rec.status;
      }
      // Default unmarked students to 'present'
      for (const s of studentsData) {
        if (!map[s.id]) {
          map[s.id] = 'present';
        }
      }
      setAttendanceMap(map);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [teacherId, courseId, selectedDate]);

  const toggleStatus = (studentId: string) => {
    setAttendanceMap(prev => {
      const current = prev[studentId] || 'present';
      const next = current === 'present' ? 'absent' : current === 'absent' ? 'late' : 'present';
      return { ...prev, [studentId]: next };
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMsg(null);

      const records = students.map(s => ({
        student_id: s.id,
        course_id: courseId,
        date: selectedDate,
        status: attendanceMap[s.id] || 'present' as const,
        marked_by: teacherId,
      }));

      await markAttendance(records);
      setSuccessMsg(`Attendance saved for ${selectedDate} — ${students.length} students marked.`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err.message || 'Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  const changeDate = (delta: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + delta);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const isToday = selectedDate === new Date().toISOString().split('T')[0];

  const presentCount = Object.values(attendanceMap).filter(s => s === 'present').length;
  const absentCount = Object.values(attendanceMap).filter(s => s === 'absent').length;
  const lateCount = Object.values(attendanceMap).filter(s => s === 'late').length;

  const statusConfig = {
    present: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-950/80 border-emerald-500/40', label: 'Present' },
    absent: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-950/80 border-red-500/40', label: 'Absent' },
    late: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-950/80 border-amber-500/40', label: 'Late' },
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40">
            <Calendar className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-mono">Attendance Tracker</h2>
            <p className="text-xs text-slate-400">Mark daily attendance for your class</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || students.length === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs transition-all cursor-pointer disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Attendance
        </button>
      </div>

      {/* Date Picker */}
      <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-xl p-3">
        <button onClick={() => changeDate(-1)} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-100 focus:outline-none focus:border-cyan-400"
          />
          {isToday && (
            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold">
              TODAY
            </span>
          )}
        </div>

        <button onClick={() => changeDate(1)} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/20 text-center">
          <div className="text-xl font-bold text-emerald-400 font-mono">{presentCount}</div>
          <div className="text-[11px] text-slate-400 font-mono">Present</div>
        </div>
        <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/20 text-center">
          <div className="text-xl font-bold text-red-400 font-mono">{absentCount}</div>
          <div className="text-[11px] text-slate-400 font-mono">Absent</div>
        </div>
        <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/20 text-center">
          <div className="text-xl font-bold text-amber-400 font-mono">{lateCount}</div>
          <div className="text-[11px] text-slate-400 font-mono">Late</div>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono">{error}</div>
      )}
      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono">{successMsg}</div>
      )}

      {/* Student Attendance List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
          <span className="ml-2 text-sm text-slate-400 font-mono">Loading...</span>
        </div>
      ) : students.length === 0 ? (
        <div className="text-center py-12 text-slate-500 font-mono text-sm">
          No students in roster. Add students first in the Student Roster tab.
        </div>
      ) : (
        <div className="space-y-1.5">
          {students.map((student) => {
            const status = attendanceMap[student.id] || 'present';
            const config = statusConfig[status];
            const Icon = config.icon;

            return (
              <button
                key={student.id}
                onClick={() => toggleStatus(student.id)}
                className={`w-full p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${config.bg}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center text-white font-bold text-[10px] font-mono border border-slate-700">
                    {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white font-mono">{student.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{student.roll_no}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${config.color}`} />
                  <span className={`text-xs font-bold font-mono ${config.color}`}>{config.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Instructions */}
      <p className="text-[11px] text-slate-500 font-mono text-center">
        Click on a student to toggle: Present → Absent → Late → Present. Then click "Save Attendance".
      </p>
    </div>
  );
};
