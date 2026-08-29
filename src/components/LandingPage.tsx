import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  User,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
} from 'lucide-react';

export const demoUsers: UserProfile[] = [
  {
    name: 'Jordan Smith',
    email: 'jordan.smith@eng.edu',
    role: 'Student',
    title: 'B.Tech CS Student',
    avatar: 'JS',
    studentId: 'st-101',
  },
  {
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@eng.edu',
    role: 'Teacher',
    title: 'CS Professor & Mentor',
    avatar: 'SJ',
    teacherId: 'tc-101',
  },
  {
    name: 'University Registrar Admin',
    email: 'admin@eng.edu',
    role: 'Admin',
    title: 'Academic System Administrator',
    avatar: 'AD',
  },
];

interface Props {
  onLoginAs: (user: UserProfile) => void;
  currentTheme?: string;
  onSelectTheme?: (theme: any) => void;
}

export const LandingPage: React.FC<Props> = ({ onLoginAs }) => {
  const [selectedRole, setSelectedRole] = useState<'Student' | 'Teacher' | 'Admin'>('Student');
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  const handleRoleSignIn = (role: 'Student' | 'Teacher' | 'Admin') => {
    const matched = demoUsers.find((u) => u.role === role) || demoUsers[0];
    onLoginAs({
      ...matched,
      name: customName.trim() || matched.name,
      email: customEmail.trim() || matched.email,
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-6 px-4 font-sans select-none">
      <div className="w-full max-w-lg space-y-6">
        {/* Clean Header Badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-slate-950/80 border border-cyan-500/40 rounded-full px-4 py-1 text-xs font-mono text-cyan-300 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>EduAgent OS Academic Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            Sign In to EduAgent OS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Select your role to access your academic dashboard and RAG tools.
          </p>
        </div>

        {/* Role Selector Card */}
        <div className="bg-slate-950/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Role Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
            <button
              onClick={() => setSelectedRole('Student')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'Student'
                  ? 'bg-cyan-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student</span>
            </button>

            <button
              onClick={() => setSelectedRole('Teacher')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'Teacher'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Teacher</span>
            </button>

            <button
              onClick={() => setSelectedRole('Admin')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'Admin'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={selectedRole === 'Student' ? 'Jordan Smith' : selectedRole === 'Teacher' ? 'Dr. Sarah Jenkins' : 'University Admin'}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Academic Email</span>
              </label>
              <input
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder={selectedRole === 'Student' ? 'jordan.smith@eng.edu' : selectedRole === 'Teacher' ? 'sarah.jenkins@eng.edu' : 'admin@eng.edu'}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Sign-In Action Button */}
          <button
            onClick={() => handleRoleSignIn(selectedRole)}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-mono font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer active:scale-95"
          >
            <Lock className="w-4 h-4" />
            <span>Sign In as {selectedRole}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
