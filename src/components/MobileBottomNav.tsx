import React from 'react';
import { PortalType } from '../types';
import { GraduationCap, Users, ShieldCheck, Home, Radio } from 'lucide-react';

interface MobileBottomNavProps {
  activePortal: PortalType | 'Landing';
  onPortalChange: (portal: PortalType | 'Landing') => void;
  onToggleA2AFeed: () => void;
  showA2AFeed: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activePortal,
  onPortalChange,
  onToggleA2AFeed,
  showA2AFeed,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 border-t border-cyan-500/30 backdrop-blur-xl px-2 py-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Landing Home */}
        <button
          onClick={() => onPortalChange('Landing')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
            activePortal === 'Landing'
              ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* Student Portal */}
        <button
          onClick={() => onPortalChange('Student')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
            activePortal === 'Student'
              ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <GraduationCap className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Student</span>
        </button>

        {/* Live A2A Feed */}
        <button
          onClick={onToggleA2AFeed}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
            showA2AFeed
              ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 font-bold animate-pulse scale-105'
              : 'text-emerald-400/80 hover:text-emerald-300'
          }`}
        >
          <div className="relative">
            <Radio className="w-5 h-5 mb-0.5 text-emerald-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-[10px] font-bold">A2A Trace</span>
        </button>

        {/* Teacher Portal */}
        <button
          onClick={() => onPortalChange('Teacher')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
            activePortal === 'Teacher'
              ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Teacher</span>
        </button>

        {/* Admin Portal */}
        <button
          onClick={() => onPortalChange('Admin')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
            activePortal === 'Admin'
              ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Admin</span>
        </button>
      </div>
    </div>
  );
};
