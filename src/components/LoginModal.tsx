import React, { useState } from 'react';
import { UserProfile, PortalType } from '../types';
import { demoUsers } from './LandingPage';
import { GraduationCap, Users, ShieldCheck, X, ArrowRight, CheckCircle2, User, Key } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginAs: (user: UserProfile) => void;
}

export const LoginModal: React.FC<Props> = ({ isOpen, onClose, onLoginAs }) => {
  const [selectedRole, setSelectedRole] = useState<PortalType>('Student');
  const [studentId, setStudentId] = useState('st-101');
  const [teacherId, setTeacherId] = useState('tc-101');
  const [adminPasscode, setAdminPasscode] = useState('admin123');

  if (!isOpen) return null;

  const handleExecuteLogin = () => {
    if (selectedRole === 'Student') {
      const matched = demoUsers.find((u) => u.role === 'Student');
      onLoginAs(matched || {
        name: 'Jordan Smith',
        email: 'jordan.smith@eng.edu',
        role: 'Student',
        title: 'Final Year CS Student',
        avatar: 'JS',
        studentId: studentId || 'st-101',
      });
    } else if (selectedRole === 'Teacher') {
      const matched = demoUsers.find((u) => u.role === 'Teacher');
      onLoginAs(matched || {
        name: 'Dr. Sarah Jenkins',
        email: 'sarah.jenkins@eng.edu',
        role: 'Teacher',
        title: 'CS401 Machine Learning Lead',
        avatar: 'SJ',
        teacherId: teacherId || 'tc-101',
      });
    } else {
      const matched = demoUsers.find((u) => u.role === 'Admin');
      onLoginAs(matched || {
        name: 'University Registrar Admin',
        email: 'admin@eng.edu',
        role: 'Admin',
        title: 'University Administrator',
        avatar: 'AD',
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-950 border-2 border-cyan-500/40 rounded-3xl p-6 w-full max-w-lg space-y-5 font-mono text-xs shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">EduAgent University Authentication</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Tabs */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedRole('Student')}
            className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
              selectedRole === 'Student'
                ? 'bg-cyan-950 text-cyan-300 border-cyan-400 font-bold shadow-md ring-1 ring-cyan-400/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span>Student Portal</span>
          </button>

          <button
            onClick={() => setSelectedRole('Teacher')}
            className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
              selectedRole === 'Teacher'
                ? 'bg-purple-950 text-purple-300 border-purple-400 font-bold shadow-md ring-1 ring-purple-400/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Teacher Portal</span>
          </button>

          <button
            onClick={() => setSelectedRole('Admin')}
            className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
              selectedRole === 'Admin'
                ? 'bg-amber-950 text-amber-300 border-amber-400 font-bold shadow-md ring-1 ring-amber-400/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Form Inputs based on role */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3 font-sans">
          {selectedRole === 'Student' && (
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300 block">Student Account / Roll No</label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
              >
                <option value="st-101">Jordan Smith (AST-2026-089 — AI Cloud Architect)</option>
                <option value="st-102">Rohan Sharma (AST-2026-012 — AI Systems Engineer)</option>
                <option value="st-103">Ananya Verma (AST-2026-088 — Cybersecurity Lead)</option>
                <option value="st-104">Karthik Raja (AST-2026-095 — Database Architect)</option>
              </select>
              <p className="text-[11px] text-slate-400">
                Logging in will load your personal telemetry and lock student privacy to this profile.
              </p>
            </div>
          )}

          {selectedRole === 'Teacher' && (
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300 block">Faculty Educator ID</label>
              <select
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 font-mono focus:border-purple-500 focus:outline-none"
              >
                <option value="tc-101">Dr. Sarah Jenkins (CS401 Machine Learning Lead)</option>
                <option value="tc-102">Prof. Ramesh Sharma (CS302 Distributed Systems Lead)</option>
                <option value="tc-103">Dr. Priya Nair (CS501 Cybersecurity Lead)</option>
              </select>
              <p className="text-[11px] text-slate-400">
                Provides access to classroom risk radar and 1:1 AI mentoring script suggestions.
              </p>
            </div>
          )}

          {selectedRole === 'Admin' && (
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300 block">Administrator Key / Passcode</label>
              <input
                type="password"
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                placeholder="Enter admin passcode (e.g. admin123)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 font-mono focus:border-amber-500 focus:outline-none"
              />
              <p className="text-[11px] text-slate-400">
                Grants full CRUD administrative authority to add, update, and delete Students, Teachers, and Courses.
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleExecuteLogin}
          className={`w-full py-3 rounded-2xl font-mono font-bold text-slate-950 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
            selectedRole === 'Student'
              ? 'bg-cyan-500 hover:bg-cyan-400 shadow-cyan-500/30'
              : selectedRole === 'Teacher'
              ? 'bg-purple-500 hover:bg-purple-400 shadow-purple-500/30'
              : 'bg-amber-500 hover:bg-amber-400 shadow-amber-500/30'
          }`}
        >
          <span>Confirm & Launch {selectedRole} Portal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
