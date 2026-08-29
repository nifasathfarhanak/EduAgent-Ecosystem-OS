import React, { useState, useEffect } from 'react';
import { LanguageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { MechaCard } from '../CyberVisuals';
import {
  ShieldCheck,
  Users,
  GraduationCap,
  BookOpen,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Search,
  Activity,
  BarChart3,
  Sparkles,
  X,
} from 'lucide-react';

interface Props {
  language: LanguageType;
}

export const AdminPortal: React.FC<Props> = ({ language }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'teachers' | 'courses'>('dashboard');

  // Admin CRUD state
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ studentName: '', rollNo: '', email: '', targetRole: '' });

  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', department: '' });

  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ code: '', name: '' });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [stRes, tcRes, crRes] = await Promise.all([
        fetch('/api/admin/students'),
        fetch('/api/admin/teachers'),
        fetch('/api/admin/courses'),
      ]);
      const stData = await stRes.json();
      const tcData = await tcRes.json();
      const crData = await crRes.json();

      if (stData.students) setStudents(stData.students);
      if (tcData.teachers) setTeachers(tcData.teachers);
      if (crData.courses) setCourses(crData.courses);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Student CRUD
  const handleCreateStudent = async () => {
    if (!newStudent.studentName) return;
    try {
      const res = await fetch('/api/admin/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      const data = await res.json();
      if (data.student) setStudents((prev) => [...prev, data.student]);
      setShowAddStudent(false);
      setNewStudent({ studentName: '', rollNo: '', email: '', targetRole: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student profile?')) return;
    try {
      await fetch(`/api/admin/students/${id}`, { method: 'DELETE' });
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Teacher CRUD
  const handleCreateTeacher = async () => {
    if (!newTeacher.name) return;
    try {
      const res = await fetch('/api/admin/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeacher),
      });
      const data = await res.json();
      if (data.teacher) setTeachers((prev) => [...prev, data.teacher]);
      setShowAddTeacher(false);
      setNewTeacher({ name: '', email: '', department: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    if (!confirm('Delete this teacher profile?')) return;
    try {
      await fetch(`/api/admin/teachers/${id}`, { method: 'DELETE' });
      setTeachers((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Course CRUD
  const handleCreateCourse = async () => {
    if (!newCourse.code || !newCourse.name) return;
    try {
      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      });
      const data = await res.json();
      if (data.course) setCourses((prev) => [...prev, data.course]);
      setShowAddCourse(false);
      setNewCourse({ code: '', name: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    try {
      await fetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <MechaCard
        themeColor="cyan"
        title="EduAgent University Registrar & Administrator Portal"
        subTitle="Full University Administrative Operations — Student, Teacher, and Course CRUD management, role-based access control, and telemetry oversight."
        badge="ADMINISTRATOR CONSOLE // ROLE: ADMIN"
        icon={<ShieldCheck className="w-6 h-6" />}
      >
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
          {[
            { id: 'dashboard', label: 'University Dashboard', icon: BarChart3 },
            { id: 'students', label: `Students (${students.length})`, icon: GraduationCap },
            { id: 'teachers', label: `Teachers (${teachers.length})`, icon: Users },
            { id: 'courses', label: `Courses (${courses.length})`, icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
                    : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </MechaCard>

      {/* Tab 1: Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total Enrolled Students</span>
              <div className="text-3xl font-bold font-mono text-cyan-400 mt-2">{students.length}</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Active Faculty Members</span>
              <div className="text-3xl font-bold font-mono text-purple-400 mt-2">{teachers.length}</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">University Courses</span>
              <div className="text-3xl font-bold font-mono text-amber-400 mt-2">{courses.length}</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Critical Risk Interventions</span>
              <div className="text-3xl font-bold font-mono text-red-400 mt-2">
                {students.filter((s) => s.riskTier?.includes('CRITICAL')).length}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 font-mono text-xs">
            <h3 className="font-bold text-slate-200 uppercase tracking-wider">Recent System Operations & Audit Log</h3>
            <div className="space-y-2 text-slate-400">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <span>[ADMIN_CRUD] Admin synchronized student roster ({students.length} active records)</span>
                <span className="text-emerald-400 font-bold">SUCCESS</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <span>[AUTH_TOKEN] Bearer admin role authenticated (Permissions: admin:all)</span>
                <span className="text-cyan-400 font-bold">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Students Management */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-mono text-slate-200">Students Directory ({students.length})</h3>
            <button
              onClick={() => setShowAddStudent(true)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Student</span>
            </button>
          </div>

          <div className="overflow-x-auto bg-slate-900/90 border border-slate-800 rounded-2xl">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Target Track</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Risk Tier</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-950/60">
                    <td className="p-3 font-bold text-slate-100">{st.studentName}</td>
                    <td className="p-3 text-cyan-400">{st.rollNo}</td>
                    <td className="p-3 text-slate-300">{st.targetRole}</td>
                    <td className="p-3 font-bold text-emerald-400">{st.projectScore}%</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${st.riskTier?.includes('CRITICAL') ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'}`}>
                        {st.riskTier}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteStudent(st.id)}
                        className="p-1.5 text-red-400 hover:bg-red-950 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Teachers Management */}
      {activeTab === 'teachers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-mono text-slate-200">Faculty Members ({teachers.length})</h3>
            <button
              onClick={() => setShowAddTeacher(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-slate-950 font-mono font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add Faculty Member</span>
            </button>
          </div>

          <div className="overflow-x-auto bg-slate-900/90 border border-slate-800 rounded-2xl">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Faculty Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Assigned Course</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {teachers.map((tc) => (
                  <tr key={tc.id} className="hover:bg-slate-950/60">
                    <td className="p-3 font-bold text-slate-100">{tc.name}</td>
                    <td className="p-3 text-slate-400">{tc.email}</td>
                    <td className="p-3 text-purple-400">{tc.department}</td>
                    <td className="p-3 text-cyan-300">{tc.assignedCourseName || 'CS401 Machine Learning'}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteTeacher(tc.id)}
                        className="p-1.5 text-red-400 hover:bg-red-950 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Courses Management */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-mono text-slate-200">University Courses ({courses.length})</h3>
            <button
              onClick={() => setShowAddCourse(true)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-mono font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          </div>

          <div className="overflow-x-auto bg-slate-900/90 border border-slate-800 rounded-2xl">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Course Code</th>
                  <th className="p-3">Course Name</th>
                  <th className="p-3">Assigned Faculty</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {courses.map((cr) => (
                  <tr key={cr.id} className="hover:bg-slate-950/60">
                    <td className="p-3 font-bold text-amber-400">{cr.code}</td>
                    <td className="p-3 text-slate-100">{cr.name}</td>
                    <td className="p-3 text-purple-300">{cr.assignedTeacherName || 'Dr. Sarah Jenkins'}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteCourse(cr.id)}
                        className="p-1.5 text-red-400 hover:bg-red-950 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-5 w-full max-w-md space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-cyan-300">Add New Student Profile</h3>
              <button onClick={() => setShowAddStudent(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Student Name (e.g. Rohan Sharma)"
                value={newStudent.studentName}
                onChange={(e) => setNewStudent({ ...newStudent, studentName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
              />
              <input
                type="text"
                placeholder="Roll No (e.g. AST-2026-101)"
                value={newStudent.rollNo}
                onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
              />
              <input
                type="text"
                placeholder="Target Role (e.g. AI Cloud Architect)"
                value={newStudent.targetRole}
                onChange={(e) => setNewStudent({ ...newStudent, targetRole: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowAddStudent(false)} className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300">Cancel</button>
              <button onClick={handleCreateStudent} className="px-4 py-2 bg-cyan-600 font-bold rounded-xl text-slate-950">Create Student</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
