import React, { useState, useEffect } from 'react';
import { PortalType, LanguageType, UserProfile } from '../types';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { Crystal3DIcon } from './CyberVisuals';
import { getEdgePointsState, EdgePointsState } from '../lib/edgePointsStore';
import {
  BackgroundThemeId,
  BackgroundThemeSelector,
} from './SmartEducationBackground';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  Globe,
  Sparkles,
  ChevronDown,
  LogOut,
  Lock,
  Cpu,
  Layers,
  Database,
  Terminal,
  Zap,
  Bot,
  User,
  Flame,
  Brain,
  Activity,
} from 'lucide-react';

interface Props {
  activePortal: PortalType | 'Landing';
  onPortalChange: (portal: PortalType | 'Landing') => void;
  activeLanguage: LanguageType;
  onLanguageChange: (language: LanguageType) => void;
  currentUser: UserProfile | null;
  onLoginAs: (user: UserProfile) => void;
  onLogout: () => void;
  currentTheme?: BackgroundThemeId;
  onSelectTheme?: (theme: BackgroundThemeId) => void;
  onOpenLogin?: () => void;
}

/**
 * Cyberpunk Header component for EduAgent AST
 * Features glowing capsule navigation, 3D tech icons, language pill & AI background switcher.
 */
export const Header: React.FC<Props> = ({
  activePortal,
  onPortalChange,
  activeLanguage,
  onLanguageChange,
  currentUser,
  onLogout,
  currentTheme = 'robotics',
  onSelectTheme,
  onOpenLogin,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [edgePointsState, setEdgePointsState] = useState<EdgePointsState>(() => getEdgePointsState());

  useEffect(() => {
    const handleUpdate = () => setEdgePointsState(getEdgePointsState());
    window.addEventListener('eduagent_edge_points_updated', handleUpdate);
    return () => window.removeEventListener('eduagent_edge_points_updated', handleUpdate);
  }, []);

  const isPostLogin = currentUser !== null && activePortal !== 'Landing';

  const handleLangChange = (newLang: LanguageType) => {
    setLanguage(newLang);
    onLanguageChange(newLang);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-2xl border-b border-cyan-500/20 text-white shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all">
      {/* Top Accent Neon Line (Cyan to Magenta Gradient) */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 opacity-90 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-2 sm:py-3 flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4">
        {/* Cyberpunk Capsule Navbar Container */}
        <div className="w-full flex items-center justify-between gap-1.5 sm:gap-4 bg-slate-950/85 border border-cyan-500/30 rounded-2xl px-2 sm:px-4 py-2 sm:py-2.5 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-400/50 transition-all max-w-full">
          
          {/* Brand Logo & Title: EduAgent AST */}
          <div
            className="flex items-center gap-1.5 sm:gap-3 cursor-pointer group select-none flex-shrink-0"
            onClick={() => onPortalChange('Landing')}
          >
            <div>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-sm sm:text-lg font-black tracking-tight text-white font-mono bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                  EduAgent<span className="hidden xs:inline"> AST</span>
                </span>
                <span className="hidden md:inline text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono font-bold tracking-wider uppercase">
                  Academic OS
                </span>
              </div>
            </div>
          </div>

          {/* Center: Top Nav Tech Icons */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 transition-colors cursor-default">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Adaptive AI</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-300 hover:text-blue-200 transition-colors cursor-default">
              <Brain className="w-3.5 h-3.5 text-blue-400" />
              <span>Smart Mentor</span>
            </div>
            <div className="flex items-center gap-1.5 text-purple-300 hover:text-purple-200 transition-colors cursor-default">
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              <span>Classroom Radar</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors cursor-default">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Learning Hub</span>
            </div>
          </div>

          {/* Right Section: AI Theme Switcher, Active Portal Badge, Language Pill & User Profile */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* On-Device Edge Points & Local LLM Status Pill */}
            <button
              onClick={() => onPortalChange('Student')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-cyan-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:scale-105 cursor-pointer"
              title="On-Device Local LLM Active • 2.5x Points Multiplier"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-white">⭐ {edgePointsState.totalPoints.toLocaleString()}</span>
              <span className="hidden xs:inline px-1 py-0.2 rounded bg-amber-500/30 text-amber-200 text-[9px] border border-amber-500/40">
                2.5x
              </span>
            </button>

            {/* Developer Spec & Architecture Portal Button */}
            <button
              onClick={() => onPortalChange(activePortal === 'Developer' ? 'Landing' : 'Developer')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all cursor-pointer shadow-sm ${
                activePortal === 'Developer'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.8)] scale-105'
                  : 'bg-slate-900/90 text-cyan-300 hover:text-cyan-100 hover:bg-slate-800 border-cyan-500/40 hover:border-cyan-300'
              }`}
              title="View Architecture Specs"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span className="hidden sm:inline">Overview</span>
            </button>

            {/* Next-Gen AI Background Theme Customizer */}
            {onSelectTheme && (
              <BackgroundThemeSelector
                currentTheme={currentTheme}
                onSelectTheme={onSelectTheme}
              />
            )}

            {/* Post-Login Role Badge */}
            {isPostLogin && (
              <div className="hidden md:flex items-center gap-2 bg-slate-900/90 px-3 py-1 rounded-xl border border-slate-800 font-mono text-xs shadow-inner">
                {activePortal === 'Student' && (
                  <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                    <GraduationCap className="w-3.5 h-3.5" /> Student Active
                  </span>
                )}
                {activePortal === 'Teacher' && (
                  <span className="flex items-center gap-1.5 text-pink-300 font-bold">
                    <Users className="w-3.5 h-3.5" /> Teacher Active
                  </span>
                )}
                {activePortal === 'Admin' && (
                  <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin Active
                  </span>
                )}
              </div>
            )}

            {/* Login / Profile Dropdown */}
            {currentUser ? (
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1 sm:gap-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-xl px-1.5 sm:px-2.5 py-1.5 transition-all text-left shadow-md cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-600 to-purple-600 text-white font-mono text-[10px] font-black flex items-center justify-center shadow flex-shrink-0">
                    {currentUser.avatar}
                  </div>
                  <span className="hidden sm:inline text-xs font-mono font-bold text-cyan-300">
                    {currentUser.role}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-950 border border-cyan-500/30 rounded-2xl shadow-2xl p-3 z-50 space-y-2.5 font-mono text-xs backdrop-blur-xl">
                    <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                      <div className="font-bold text-white flex items-center justify-between">
                        <span>{currentUser.name}</span>
                        <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded-full font-semibold">
                          {currentUser.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    {onOpenLogin && (
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onOpenLogin();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-cyan-300 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-900/50 flex items-center gap-2 transition-all font-bold"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Switch User Role</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onLogout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-900/50 flex items-center gap-2 transition-all font-bold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('exitLogout', 'Exit / Logout Account')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-2 sm:px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-black text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 whitespace-nowrap flex-shrink-0"
                title="Sign In / Authenticate Role"
              >
                <User className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
