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
  Edit2,
  CheckCircle2,
  Search,
  Activity,
  BarChart3,
  Sparkles,
  X,
  Save,
  Filter,
  Check,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals - Add
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    studentName: '',
    rollNo: '',
    email: '',
    targetRole: '',
    projectScore: 85,
    attendancePct: 90,
    riskTier: 'STABLE',
  });

  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    department: 'Computer Science & Engineering',
    assignedCourseName: 'CS201 Data Structures & Algorithms',
    studentCount: 25,
  });

  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    assignedTeacherName: 'Prof. Sharma',
    studentCount: 30,
  });

  // Modals - Edit
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<any | null>(null);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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
    if (!newStudent.studentName.trim()) return;
    try {
      const res = await fetch('/api/admin/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      const data = await res.json();
      if (data.student) {
        setStudents((prev) => [...prev, data.student]);
        showToast(`Student "${newStudent.studentName}" created successfully!`);
      }
      setShowAddStudent(false);
      setNewStudent({
        studentName: '',
        rollNo: '',
        email: '',
        targetRole: '',
        projectScore: 85,
        attendancePct: 90,
        riskTier: 'STABLE',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStudent = async () => {
    if (!editingStudent || !editingStudent.studentName.trim()) return;
    try {
      const res = await fetch(`/api/admin/students/${editingStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingStudent),
      });
      const data = await res.json();
      if (data.student) {
        setStudents((prev) => prev.map((s) => (s.id === editingStudent.id ? data.student : s)));
        showToast(`Student "${editingStudent.studentName}" updated successfully!`);
      }
      setEditingStudent(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteStudent = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete student profile "${name}"?`)) return;
    try {
      await fetch(`/api/admin/students/${id}`, { method: 'DELETE' });
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showToast(`Student "${name}" deleted.`);
    } catch (err) {
      console.error(err);
    }
  };

  // Teacher CRUD
  const handleCreateTeacher = async () => {
    if (!newTeacher.name.trim()) return;
    try {
      const res = await fetch('/api/admin/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeacher),
      });
      const data = await res.json();
      if (data.teacher) {
        setTeachers((prev) => [...prev, data.teacher]);
        showToast(`Faculty member "${newTeacher.name}" added successfully!`);
      }
      setShowAddTeacher(false);
      setNewTeacher({
        name: '',
        email: '',
        department: 'Computer Science & Engineering',
        assignedCourseName: 'CS201 Data Structures & Algorithms',
        studentCount: 25,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTeacher = async () => {
    if (!editingTeacher || !editingTeacher.name.trim()) return;
    try {
      const res = await fetch(`/api/admin/teachers/${editingTeacher.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTeacher),
      });
      const data = await res.json();
      if (data.teacher) {
        setTeachers((prev) => prev.map((t) => (t.id === editingTeacher.id ? data.teacher : t)));
        showToast(`Faculty member "${editingTeacher.name}" updated successfully!`);
      }
      setEditingTeacher(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTeacher = async (id: string, name: string) => {
    if (!confirm(`Delete faculty member "${name}"?`)) return;
    try {
      await fetch(`/api/admin/teachers/${id}`, { method: 'DELETE' });
      setTeachers((prev) => prev.filter((t) => t.id !== id));
      showToast(`Faculty member "${name}" deleted.`);
    } catch (err) {
      console.error(err);
    }
  };

  // Course CRUD
  const handleCreateCourse = async () => {
    if (!newCourse.code.trim() || !newCourse.name.trim()) return;
    try {
      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      });
      const data = await res.json();
      if (data.course) {
        setCourses((prev) => [...prev, data.course]);
        showToast(`Course "${newCourse.code} - ${newCourse.name}" added successfully!`);
      }
      setShowAddCourse(false);
      setNewCourse({
        code: '',
        name: '',
        assignedTeacherName: 'Prof. Sharma',
        studentCount: 30,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCourse = async () => {
    if (!editingCourse || !editingCourse.code.trim() || !editingCourse.name.trim()) return;
    try {
      const res = await fetch(`/api/admin/courses/${editingCourse.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCourse),
      });
      const data = await res.json();
      if (data.course) {
        setCourses((prev) => prev.map((c) => (c.id === editingCourse.id ? data.course : c)));
        showToast(`Course "${editingCourse.code}" updated successfully!`);
      }
      setEditingCourse(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCourse = async (id: string, name: string) => {
    if (!confirm(`Delete course "${name}"?`)) return;
    try {
      await fetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
      setCourses((prev) => prev.filter((c) => c.id !== id));
      showToast(`Course "${name}" deleted.`);
    } catch (err) {
      console.error(err);
    }
  };

  // Search filter
  const filteredStudents = students.filter(
    (s) =>
      s.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.targetRole?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCourses = courses.filter(
    (c) =>
      c.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-950 border border-emerald-400 text-emerald-200 px-4 py-2.5 rounded-xl font-mono text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Card */}
      <MechaCard
        themeColor="cyan"
        title="University Administration & Records Management"
        subTitle="Full Administrative Operations — Student, Faculty, and Course CRUD operations with real-time editing, creation, deletion, and cohort tracking."
        badge="ADMINISTRATOR CONSOLE // ROLE: ADMIN"
        icon={<ShieldCheck className="w-6 h-6" />}
      >
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'dashboard', label: 'University Dashboard', icon: BarChart3 },
              { id: 'students', label: `Students (${students.length})`, icon: GraduationCap },
              { id: 'teachers', label: `Faculty (${teachers.length})`, icon: Users },
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

          {activeTab !== 'dashboard' && (
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
          )}
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
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Intervention Alerts</span>
              <div className="text-3xl font-bold font-mono text-red-400 mt-2">
                {students.filter((s) => s.riskTier?.includes('CRITICAL')).length}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 font-mono text-xs">
            <h3 className="font-bold text-slate-200 uppercase tracking-wider">Operations Log & Data Status</h3>
            <div className="space-y-2 text-slate-400">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <span>Roster synchronized ({students.length} students, {teachers.length} faculty, {courses.length} courses)</span>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <span>Full CRUD Enabled: Create, Read, Update/Edit, and Delete for all university records</span>
                <span className="text-cyan-400 font-bold">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Students Management */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-mono text-slate-200">Students Directory ({filteredStudents.length})</h3>
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
                  <th className="p-3">Attendance</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-950/60 transition-colors">
                    <td className="p-3 font-bold text-slate-100">{st.studentName}</td>
                    <td className="p-3 text-cyan-400">{st.rollNo}</td>
                    <td className="p-3 text-slate-300">{st.targetRole}</td>
                    <td className="p-3 font-bold text-emerald-400">{st.projectScore || 85}%</td>
                    <td className="p-3 text-slate-300">{st.attendancePct || 92}%</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          st.riskTier?.includes('CRITICAL')
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}
                      >
                        {st.riskTier || 'STABLE'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingStudent(st)}
                          className="p-1.5 text-cyan-400 hover:bg-cyan-950/80 border border-cyan-800/50 rounded-lg transition-all cursor-pointer"
                          title="Edit Student"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(st.id, st.studentName)}
                          className="p-1.5 text-red-400 hover:bg-red-950/80 border border-red-800/50 rounded-lg transition-all cursor-pointer"
                          title="Delete Student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
            <h3 className="text-sm font-bold font-mono text-slate-200">Faculty Members ({filteredTeachers.length})</h3>
            <button
              onClick={() => setShowAddTeacher(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-600/30"
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
                  <th className="p-3">Students</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredTeachers.map((tc) => (
                  <tr key={tc.id} className="hover:bg-slate-950/60 transition-colors">
                    <td className="p-3 font-bold text-slate-100">{tc.name}</td>
                    <td className="p-3 text-slate-400">{tc.email}</td>
                    <td className="p-3 text-purple-400">{tc.department}</td>
                    <td className="p-3 text-cyan-300">{tc.assignedCourseName || 'CS201 Data Structures'}</td>
                    <td className="p-3 text-slate-300">{tc.studentCount || 25}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingTeacher(tc)}
                          className="p-1.5 text-purple-400 hover:bg-purple-950/80 border border-purple-800/50 rounded-lg transition-all cursor-pointer"
                          title="Edit Faculty Member"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(tc.id, tc.name)}
                          className="p-1.5 text-red-400 hover:bg-red-950/80 border border-red-800/50 rounded-lg transition-all cursor-pointer"
                          title="Delete Faculty Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
            <h3 className="text-sm font-bold font-mono text-slate-200">University Courses ({filteredCourses.length})</h3>
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
                  <th className="p-3">Enrolled</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredCourses.map((cr) => (
                  <tr key={cr.id} className="hover:bg-slate-950/60 transition-colors">
                    <td className="p-3 font-bold text-amber-400">{cr.code}</td>
                    <td className="p-3 text-slate-100">{cr.name}</td>
                    <td className="p-3 text-purple-300">{cr.assignedTeacherName || 'Prof. Sharma'}</td>
                    <td className="p-3 text-slate-300">{cr.studentCount || 30}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingCourse(cr)}
                          className="p-1.5 text-amber-400 hover:bg-amber-950/80 border border-amber-800/50 rounded-lg transition-all cursor-pointer"
                          title="Edit Course"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(cr.id, cr.name)}
                          className="p-1.5 text-red-400 hover:bg-red-950/80 border border-red-800/50 rounded-lg transition-all cursor-pointer"
                          title="Delete Course"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= MODALS ================= */}

      {/* 1. Add Student Modal */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-5 w-full max-w-md space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-cyan-300 flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>Add New Student Profile</span>
              </h3>
              <button onClick={() => setShowAddStudent(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Student Name</label>
                <input
                  type="text"
                  placeholder="e.g. Maya Patel"
                  value={newStudent.studentName}
                  onChange={(e) => setNewStudent({ ...newStudent, studentName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Roll Number</label>
                <input
                  type="text"
                  placeholder="e.g. CS-2026-105"
                  value={newStudent.rollNo}
                  onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Email</label>
                <input
                  type="email"
                  placeholder="e.g. maya@eng.edu"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Target Degree & Track</label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech CSE - AI & Distributed Systems"
                  value={newStudent.targetRole}
                  onChange={(e) => setNewStudent({ ...newStudent, targetRole: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button onClick={() => setShowAddStudent(false)} className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300">
                Cancel
              </button>
              <button onClick={handleCreateStudent} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 font-bold rounded-xl text-slate-950">
                Create Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-5 w-full max-w-md space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-cyan-300 flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-cyan-400" />
                <span>Edit Student Record</span>
              </h3>
              <button onClick={() => setEditingStudent(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Student Name</label>
                <input
                  type="text"
                  value={editingStudent.studentName || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, studentName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase">Roll No</label>
                  <input
                    type="text"
                    value={editingStudent.rollNo || ''}
                    onChange={(e) => setEditingStudent({ ...editingStudent, rollNo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase">Score (%)</label>
                  <input
                    type="number"
                    value={editingStudent.projectScore ?? 85}
                    onChange={(e) => setEditingStudent({ ...editingStudent, projectScore: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase">Attendance (%)</label>
                  <input
                    type="number"
                    value={editingStudent.attendancePct ?? 90}
                    onChange={(e) => setEditingStudent({ ...editingStudent, attendancePct: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase">Risk Tier</label>
                  <select
                    value={editingStudent.riskTier || 'STABLE'}
                    onChange={(e) => setEditingStudent({ ...editingStudent, riskTier: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                  >
                    <option value="STABLE">STABLE</option>
                    <option value="NEEDS_REVIEW">NEEDS_REVIEW</option>
                    <option value="CRITICAL_INTERVENTION">CRITICAL</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Target Degree & Track</label>
                <input
                  type="text"
                  value={editingStudent.targetRole || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, targetRole: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button onClick={() => setEditingStudent(null)} className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300">
                Cancel
              </button>
              <button onClick={handleUpdateStudent} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 font-bold rounded-xl text-slate-950 flex items-center gap-1.5">
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Add Teacher Modal */}
      {showAddTeacher && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl p-5 w-full max-w-md space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-purple-300 flex items-center gap-2">
                <Plus className="w-4 h-4 text-purple-400" />
                <span>Add Faculty Member</span>
              </h3>
              <button onClick={() => setShowAddTeacher(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Faculty Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Ananya Iyer"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Email</label>
                <input
                  type="email"
                  placeholder="e.g. ananya@eng.edu"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Department</label>
                <input
                  type="text"
                  value={newTeacher.department}
                  onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Assigned Course</label>
                <input
                  type="text"
                  value={newTeacher.assignedCourseName}
                  onChange={(e) => setNewTeacher({ ...newTeacher, assignedCourseName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button onClick={() => setShowAddTeacher(false)} className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300">
                Cancel
              </button>
              <button onClick={handleCreateTeacher} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 font-bold rounded-xl text-white">
                Create Faculty
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Edit Teacher Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl p-5 w-full max-w-md space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-purple-300 flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-purple-400" />
                <span>Edit Faculty Record</span>
              </h3>
              <button onClick={() => setEditingTeacher(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Faculty Name</label>
                <input
                  type="text"
                  value={editingTeacher.name || ''}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Email</label>
                <input
                  type="email"
                  value={editingTeacher.email || ''}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Department</label>
                <input
                  type="text"
                  value={editingTeacher.department || ''}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, department: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Assigned Course</label>
                <input
                  type="text"
                  value={editingTeacher.assignedCourseName || ''}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, assignedCourseName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button onClick={() => setEditingTeacher(null)} className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300">
                Cancel
              </button>
              <button onClick={handleUpdateTeacher} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 font-bold rounded-xl text-white flex items-center gap-1.5">
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Add Course Modal */}
      {showAddCourse && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 w-full max-w-md space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-amber-300 flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Add University Course</span>
              </h3>
              <button onClick={() => setShowAddCourse(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Course Code</label>
                <input
                  type="text"
                  placeholder="e.g. CS305"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Course Name</label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Cloud Computing"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Lead Faculty</label>
                <input
                  type="text"
                  value={newCourse.assignedTeacherName}
                  onChange={(e) => setNewCourse({ ...newCourse, assignedTeacherName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button onClick={() => setShowAddCourse(false)} className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300">
                Cancel
              </button>
              <button onClick={handleCreateCourse} className="px-4 py-2 bg-amber-600 hover:bg-amber-500 font-bold rounded-xl text-slate-950">
                Create Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 w-full max-w-md space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-amber-300 flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-amber-400" />
                <span>Edit Course Record</span>
              </h3>
              <button onClick={() => setEditingCourse(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Course Code</label>
                <input
                  type="text"
                  value={editingCourse.code || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Course Name</label>
                <input
                  type="text"
                  value={editingCourse.name || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Lead Faculty</label>
                <input
                  type="text"
                  value={editingCourse.assignedTeacherName || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, assignedTeacherName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button onClick={() => setEditingCourse(null)} className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300">
                Cancel
              </button>
              <button onClick={handleUpdateCourse} className="px-4 py-2 bg-amber-600 hover:bg-amber-500 font-bold rounded-xl text-slate-950 flex items-center gap-1.5">
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
