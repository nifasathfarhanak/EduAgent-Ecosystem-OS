import React from 'react';
import { PortalType, UserProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  VRStudentAvatar,
  TeacherRobotAvatar,
  ParentNetworkAvatar,
  Crystal3DIcon,
  CircuitWingLeft,
  CircuitWingRight,
  RoboticEqualizer,
  RoboticBiometricScanner,
} from './CyberVisuals';
import {
  BackgroundThemeId,
  BACKGROUND_THEMES,
} from './SmartEducationBackground';
import { RoboticMasterConsole } from './RoboticMasterConsole';
import {
  Sparkles,
  Eye,
  Search,
  Globe,
  Target,
  ArrowRight,
  Database,
  Cpu,
  Shield,
  Zap,
  Activity,
  Terminal,
  Radio,
  Wifi,
  Lock,
  Layers,
  Bot,
  Play,
  CheckCircle2,
  Sliders,
  Wand2,
  BookOpen,
  Mic,
  FileCode,
} from 'lucide-react';

interface Props {
  onLoginAs: (user: UserProfile) => void;
  currentTheme?: BackgroundThemeId;
  onSelectTheme?: (theme: BackgroundThemeId) => void;
}

export const demoUsers: UserProfile[] = [
  {
    name: 'Jordan Smith',
    email: 'jordan.smith@eng.edu',
    role: 'Student',
    title: 'Final Year CS - AI Cloud Specialist',
    avatar: 'JS',
    studentId: 'st-101',
  },
  {
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@eng.edu',
    role: 'Teacher',
    title: 'CS401 Machine Learning Lead',
    avatar: 'SJ',
    teacherId: 'tc-101',
  },
  {
    name: 'University Registrar Admin',
    email: 'admin@eng.edu',
    role: 'Admin',
    title: 'University Administrator & Registrar',
    avatar: 'AD',
  },
];

export const LandingPage: React.FC<Props> = ({
  onLoginAs,
  currentTheme = 'robotics',
  onSelectTheme,
}) => {
  const { t } = useLanguage();

  const handleStudentLogin = (agentId?: string) => {
    const id = agentId || 'ASD-Jordan-Smith';
    onLoginAs({
      ...demoUsers[0],
      email: id,
      name: id.replace('ASD-', '').replace('-', ' ') || 'Jordan Smith',
    });
  };

  const handleTeacherLogin = (agentId?: string) => {
    const id = agentId || 'ASD-Prof-Sharma';
    onLoginAs({
      ...demoUsers[1],
      email: id,
      name: id.replace('ASD-', '').replace('-', ' ') || 'Prof. Sharma',
    });
  };

  const handleParentLogin = (agentId?: string) => {
    const id = agentId || 'ASD-Parent';
    onLoginAs({
      ...demoUsers[2],
      email: id,
      name: id.replace('ASD-', '').replace('-', ' ') || 'Lakshmi Parent',
    });
  };

  return (
    <div className="relative space-y-10 py-2 select-none overflow-hidden font-sans">
      {/* 1. Hero Header Telemetry Ribbon */}
      <div className="relative text-center space-y-3 max-w-5xl mx-auto pt-1">
        {/* Top Autonomous Telemetry Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-950/80 border border-cyan-400/50 backdrop-blur-xl rounded-full px-4 py-1.5 shadow-[0_0_25px_rgba(6,182,212,0.4)] text-[11px] font-mono text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold tracking-wider uppercase">Nexus Autonomous AI Galaxy</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Gemini 3.7 Continuous Orbit</span>
        </div>

        {/* Main Title with Cyber Circuit Wings */}
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <CircuitWingLeft className="hidden md:block w-14 lg:w-24 h-8 flex-shrink-0" />

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight text-white font-mono leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.7)]">
              Next-Gen Autonomous EdTech Ecosystem
            </span>
          </h1>

          <CircuitWingRight className="hidden md:block w-14 lg:w-24 h-8 flex-shrink-0" />
        </div>

        <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed opacity-95">
          Enter the unified Robotic Command Space. Activate your Gemini 3.7 AI mentor, test the AI Galaxy Matrix, or launch BigQuery telemetry radar.
        </p>

        {/* AI Background Theme Switcher Bar */}
        {onSelectTheme && (
          <div className="pt-0.5">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-slate-950/75 border border-cyan-500/40 p-1.5 sm:p-2 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.3)] backdrop-blur-2xl">
              <div className="flex items-center gap-1.5 px-2 text-[11px] font-mono font-bold text-cyan-300 border-r border-slate-800 pr-3">
                <Wand2 className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                <span className="hidden sm:inline">Cosmic Theme:</span>
              </div>
              {(Object.keys(BACKGROUND_THEMES) as BackgroundThemeId[]).map((tId) => {
                const theme = BACKGROUND_THEMES[tId];
                const isSelected = currentTheme === tId;
                return (
                  <button
                    key={tId}
                    onClick={() => onSelectTheme(tId)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.8)] scale-105'
                        : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800/60'
                    }`}
                  >
                    <span>{theme.icon}</span>
                    <span>{theme.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. GRAND ROBOTIC COMMAND CONSOLE (Housing the Login Page, Robot, AI Galaxy Matrix, and Telemetry directly in that space) */}
      <div className="max-w-7xl mx-auto">
        <RoboticMasterConsole
          onLoginAs={onLoginAs}
          currentTheme={currentTheme}
          onSelectTheme={onSelectTheme}
        />
      </div>

      {/* 4. Interactive "Try Next-Gen AI Feature" Showcase Launchpad */}
      <div className="bg-gradient-to-b from-slate-950/90 to-slate-900/90 border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(6,182,212,0.3)] backdrop-blur-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/30 pb-4">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
              <span>Interactive Smart Education Launchpad</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono">
              Experience Trending AI Learning in Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select any capability below to immediately jump into a live, interactive test session.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-mono font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              All AI Agents Ready
            </span>
          </div>
        </div>

        {/* 4 Quick Launch Interactive Feature Pods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {/* Pod 1: Robotic Mock Interview */}
          <div
            onClick={() => handleStudentLogin()}
            className="group bg-slate-950/90 hover:bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-300 rounded-2xl p-4 space-y-3 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] transition-all transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Mic className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-500/30">
                  STAR L6
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">
                Robotic Voice Mock Interview
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                AI robotic interviewer asking real system design & behavioral questions with real-time audio scoring.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-cyan-400 border-t border-slate-900">
              <span>Try Interview</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pod 2: Vision Architecture Scanner */}
          <div
            onClick={() => handleStudentLogin()}
            className="group bg-slate-950/90 hover:bg-slate-900/90 border border-blue-500/40 hover:border-blue-300 rounded-2xl p-4 space-y-3 cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.45)] transition-all transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/50 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Eye className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded-md border border-blue-500/30">
                  Vision QA
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-mono group-hover:text-blue-300 transition-colors">
                Architecture Blueprint Vision
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scan handwritten diagrams, microservices, and whiteboard sketches for instant AI bottlenecks and fixes.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-blue-400 border-t border-slate-900">
              <span>Scan Blueprint</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pod 3: BigQuery Classroom Risk Radar */}
          <div
            onClick={() => handleTeacherLogin()}
            className="group bg-slate-950/90 hover:bg-slate-900/90 border border-pink-500/40 hover:border-pink-300 rounded-2xl p-4 space-y-3 cursor-pointer shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:shadow-[0_0_30px_rgba(236,72,153,0.45)] transition-all transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-pink-950 border border-pink-500/50 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                  <Database className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-pink-300 bg-pink-950/80 px-2 py-0.5 rounded-md border border-pink-500/30">
                  BigQuery
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-mono group-hover:text-pink-300 transition-colors">
                Classroom Risk Radar Lead
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prof. Sharma's real-time risk gauges tracking 200 students with automated AI 1-on-1 intervention plans.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-pink-400 border-t border-slate-900">
              <span>Launch Radar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pod 4: Multilingual Voice Parent Advisor */}
          <div
            onClick={() => handleParentLogin()}
            className="group bg-slate-950/90 hover:bg-slate-900/90 border border-purple-500/40 hover:border-purple-300 rounded-2xl p-4 space-y-3 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.45)] transition-all transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/50 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded-md border border-purple-500/30">
                  15+ Languages
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-mono group-hover:text-purple-300 transition-colors">
                Parental Voice Advisor
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Translate engineering milestones into simple, jargon-free native language audio summaries.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-purple-400 border-t border-slate-900">
              <span>Open Advisor</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Section Title: Agent-Led Learning Microservices */}
      <div className="text-center space-y-1 pt-4">
        <h3 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center justify-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <span>Agent-Led Learning Microservices</span>
        </h3>
      </div>

      {/* 6. Four Bottom Microservice Cards (Robotic Nodes with Crystal Icons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        
        {/* Microservice 1: Multimodal Vision */}
        <div className="bg-slate-950/90 border border-cyan-500/40 hover:border-cyan-300 rounded-2xl p-4 space-y-3 shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 flex flex-col justify-between group">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/90 border border-cyan-500/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Eye className="w-4 h-4 text-cyan-400" />
              </div>
              <Crystal3DIcon type="cyan" className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-black text-white font-mono flex items-center justify-between">
              <span>Multimodal Vision</span>
              <span className="text-[9px] text-cyan-400 font-normal">99.4% FPS</span>
            </h4>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Analytics, disengagement, diagrams, and rich real-time visual assessment
            </p>
          </div>

          <div className="pt-2.5 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-500">Agent Status</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>
        </div>

        {/* Microservice 2: BigQuery Analytics */}
        <div className="bg-slate-950/90 border border-cyan-500/40 hover:border-cyan-300 rounded-2xl p-4 space-y-3 shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 flex flex-col justify-between group">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-950/90 border border-blue-500/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Search className="w-4 h-4 text-blue-400" />
              </div>
              <Crystal3DIcon type="blue" className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-black text-white font-mono flex items-center justify-between">
              <span>BigQuery Analytics</span>
              <span className="text-[9px] text-blue-400 font-normal">1.8 TB/s</span>
            </h4>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Specialized 200 different reports on CS/Tech classroom risk telemetry
            </p>
          </div>

          <div className="pt-2.5 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-500">Agent Status</span>
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Optimizing
            </span>
          </div>
        </div>

        {/* Microservice 3: AI+Multilingual */}
        <div className="bg-slate-950/90 border border-cyan-500/40 hover:border-cyan-300 rounded-2xl p-4 space-y-3 shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 flex flex-col justify-between group">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-teal-950/90 border border-teal-500/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Globe className="w-4 h-4 text-teal-400" />
              </div>
              <Crystal3DIcon type="emerald" className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-black text-white font-mono flex items-center justify-between">
              <span>AI+Multilingual</span>
              <span className="text-[9px] text-teal-400 font-normal">15 Native</span>
            </h4>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Targeted automated notes in 15+ native language voice summaries
            </p>
          </div>

          <div className="pt-2.5 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-500">Agent Status</span>
            <span className="flex items-center gap-1.5 text-blue-400 font-bold bg-blue-950/40 px-2 py-0.5 rounded border border-blue-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Translating
            </span>
          </div>
        </div>

        {/* Microservice 4: Skill-Gap Matrix */}
        <div className="bg-slate-950/90 border border-cyan-500/40 hover:border-cyan-300 rounded-2xl p-4 space-y-3 shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 flex flex-col justify-between group">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-purple-950/90 border border-purple-500/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Target className="w-4 h-4 text-purple-400" />
              </div>
              <Crystal3DIcon type="purple" className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-black text-white font-mono flex items-center justify-between">
              <span>Skill-Gap Matrix</span>
              <span className="text-[9px] text-purple-400 font-normal">STAR L6</span>
            </h4>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Multi-perspective automated interview scoring & remedial gap closure
            </p>
          </div>

          <div className="pt-2.5 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-500">Agent Status</span>
            <span className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Training
            </span>
          </div>
        </div>

      </div>

      {/* 7. Nexus Autonomous Bottom Telemetry Bar */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-slate-200 font-bold">NEXUS AUTONOMOUS STREAM:</span>
          <span>Core Mesh Active • Model: Gemini 3.7 Flash & Trending Robotics AI</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Zero-Drift Telemetry
          </span>
          <span className="text-cyan-400">ADK 2.4 Ready</span>
          <span className="text-purple-400">MCP Multi-Node</span>
        </div>
      </div>
    </div>
  );
};
