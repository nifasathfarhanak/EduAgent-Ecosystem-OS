import React, { useState } from 'react';
import { PortalType, LanguageType, UserProfile } from '../types';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { Crystal3DIcon } from './CyberVisuals';
import {
  BackgroundThemeId,
  BackgroundThemeSelector,
} from './SmartEducationBackground';
import {
  GraduationCap,
  Users,
  HeartHandshake,
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
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isPostLogin = currentUser !== null && activePortal !== 'Landing';

  const handleLangChange = (newLang: LanguageType) => {
    setLanguage(newLang);
    onLanguageChange(newLang);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-2xl border-b border-cyan-500/20 text-white shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all">
      {/* Top Accent Neon Line (Cyan to Magenta Gradient) */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 opacity-90 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Cyberpunk Capsule Navbar Container */}
        <div className="w-full flex items-center justify-between gap-4 bg-slate-950/80 border border-cyan-500/30 rounded-2xl px-4 py-2.5 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-400/50 transition-all">
          
          {/* Brand Logo & Title: EduAgent AST */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => onPortalChange('Landing')}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-pink-500 p-[1.5px] shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-cyan-400 border border-slate-950 rounded-full animate-ping" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-white font-mono bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                  EduAgent AST
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono font-bold tracking-wider uppercase">
                  AST-v4
                </span>
              </div>
            </div>
          </div>

          {/* Center: Top Nav Tech Icons */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 transition-colors cursor-default">
              <Crystal3DIcon type="cyan" className="w-4 h-4" />
              <span>Vertex AI</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-300 hover:text-blue-200 transition-colors cursor-default">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Gemini 3.7</span>
            </div>
            <div className="flex items-center gap-1.5 text-purple-300 hover:text-purple-200 transition-colors cursor-default">
              <Database className="w-3.5 h-3.5 text-purple-400" />
              <span>BigQuery Telemetry</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors cursor-default">
              <Crystal3DIcon type="emerald" className="w-4 h-4" />
              <span>Robotics SDK</span>
            </div>
          </div>

          {/* Right Section: AI Theme Switcher, Active Portal Badge, Language Pill & User Profile */}
          <div className="flex items-center gap-2.5">
            {/* Next-Gen AI Background Theme Customizer */}
            {onSelectTheme && (
              <BackgroundThemeSelector
                currentTheme={currentTheme}
                onSelectTheme={onSelectTheme}
              />
            )}

            {/* Post-Login Role Badge */}
            {isPostLogin && (
              <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 px-3 py-1 rounded-xl border border-slate-800 font-mono text-xs shadow-inner">
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
                {activePortal === 'Parent' && (
                  <span className="flex items-center gap-1.5 text-purple-300 font-bold">
                    <HeartHandshake className="w-3.5 h-3.5" /> Parent Active
                  </span>
                )}
              </div>
            )}

            {/* Neon Language Pill Selector (e.g. Tamil (T) / English) */}
            <div className="relative flex items-center gap-1.5 bg-slate-950/90 hover:bg-slate-900 border border-cyan-500/40 hover:border-cyan-300 rounded-xl px-3 py-1.5 shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all">
              <Globe className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <select
                value={language}
                onChange={(e) => handleLangChange(e.target.value as LanguageType)}
                className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer font-mono pr-1"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id} className="bg-slate-950 text-slate-100">
                    {lang.label} ({lang.nativeLabel.slice(0, 3)})
                  </option>
                ))}
              </select>
            </div>

            {/* Profile Dropdown & Logout (Post-Login) */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-xl px-2.5 py-1.5 transition-all text-left shadow-md"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-600 to-purple-600 text-white font-mono text-[10px] font-black flex items-center justify-center shadow">
                    {currentUser.avatar}
                  </div>
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
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};
