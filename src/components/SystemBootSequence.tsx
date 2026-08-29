import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { playBootAudio } from '../utils/audioEffects';
import {
  Cpu,
  Shield,
  Zap,
  Terminal,
  Activity,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Radio,
  ArrowRight,
  Database,
  Globe,
  Bot,
} from 'lucide-react';
import {
  VRStudentAvatar,
  TeacherRobotAvatar,
  ParentNetworkAvatar,
  RoboticEqualizer,
} from './CyberVisuals';

interface SystemBootSequenceProps {
  user: UserProfile;
  onComplete: () => void;
  onSkip?: () => void;
}

export const SystemBootSequence: React.FC<SystemBootSequenceProps> = ({
  user,
  onComplete,
  onSkip,
}) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isWarping, setIsWarping] = useState(false);

  const steps = [
    {
      label: 'ACADEMIC PROFILE AUTHENTICATED',
      sub: `Cadet Auth Key: 0x${Math.random().toString(16).substring(2, 8).toUpperCase()} // University Verified`,
      color: 'text-cyan-400',
      badge: 'AUTH OK',
    },
    {
      label: 'INITIALIZING GEMINI 3.7 NEURAL MATRIX',
      sub: 'Allocating 24-core TPU Pods • Multimodal Vision AST Pipeline',
      color: 'text-indigo-400',
      badge: 'AI CORE READY',
    },
    {
      label: 'CONNECTING BIGQUERY REAL-TIME TELEMETRY',
      sub: 'Synchronizing 200/200 student performance nodes • AST Risk Radar',
      color: 'text-pink-400',
      badge: 'TELEMETRY SYNCED',
    },
    {
      label: 'MOUNTING SPACED RETRIEVAL MEMORY (1-7-21-60d)',
      sub: 'Ebbinghaus forgetting curve optimizer • Adaptive flashcards ready',
      color: 'text-purple-400',
      badge: 'ENGINE LOADED',
    },
    {
      label: 'ALL SUBSYSTEMS NOMINAL. LAUNCHING WORKSPACE',
      sub: `Welcome Cadet ${user.name} • Portal clearance granted.`,
      color: 'text-emerald-400',
      badge: 'ONLINE',
    },
  ];

  useEffect(() => {
    playBootAudio('scan');

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const inc = Math.floor(Math.random() * 8) + 4;
        const nextVal = Math.min(100, prev + inc);
        return nextVal;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 22) {
      setStepIndex(0);
    } else if (progress < 45) {
      if (stepIndex < 1) {
        setStepIndex(1);
        playBootAudio('nodes');
        setLogs((l) => [
          ...l,
          `[${new Date().toLocaleTimeString()}] [GEMINI_CORE] TPU Node clusters allocated (2.8 TFLOPS).`,
        ]);
      }
    } else if (progress < 70) {
      if (stepIndex < 2) {
        setStepIndex(2);
        playBootAudio('nodes');
        setLogs((l) => [
          ...l,
          `[${new Date().toLocaleTimeString()}] [BIGQUERY_STREAM] Telemetry buffer connected (0 ms latency).`,
        ]);
      }
    } else if (progress < 90) {
      if (stepIndex < 3) {
        setStepIndex(3);
        playBootAudio('nodes');
        setLogs((l) => [
          ...l,
          `[${new Date().toLocaleTimeString()}] [AST_SPACED] Neural recall schedule calibrated: 1d, 7d, 21d, 60d intervals.`,
        ]);
      }
    } else if (progress >= 100) {
      if (stepIndex < 4) {
        setStepIndex(4);
        playBootAudio('launch');
        setLogs((l) => [
          ...l,
          `[${new Date().toLocaleTimeString()}] [SYSTEM] Workspace authorization confirmed. Initializing viewport...`,
        ]);
        setIsWarping(true);

        const timer = setTimeout(() => {
          onComplete();
        }, 750);
        return () => clearTimeout(timer);
      }
    }
  }, [progress, stepIndex, onComplete]);

  const handleManualSkip = () => {
    playBootAudio('launch');
    if (onSkip) onSkip();
    else onComplete();
  };

  const roleColor =
    user.role === 'Student'
      ? 'cyan'
      : user.role === 'Teacher'
      ? 'magenta'
      : 'purple';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-3xl transition-opacity duration-500 select-none p-4 ${
        isWarping ? 'opacity-90 scale-[1.02]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Holographic Hex Grid & Scanning Beam */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px]" />
        {/* Animated Scanning Laser Beam */}
        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#06b6d4] animate-pulse top-1/4" />
      </div>

      {/* Main Glassmorphic Cyber Console Frame */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-black/98 border-2 border-cyan-400/80 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(6,182,212,0.4),inset_0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-300/30 overflow-hidden font-mono">
        {/* Top Armor Bracket Lines */}
        <div className="absolute top-2 left-3 text-[10px] text-cyan-400 font-bold flex items-center gap-1.5 opacity-80">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>NEURAL UPLINK // BOOT_SEQUENCE.SYS</span>
        </div>
        <div className="absolute top-2 right-3 text-[10px] text-slate-400 flex items-center gap-2">
          <RoboticEqualizer active={true} color={roleColor} className="h-3" />
          <button
            onClick={handleManualSkip}
            className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/40 text-[9px] hover:text-white transition-all cursor-pointer"
          >
            SKIP SEQUENCE ⏩
          </button>
        </div>

        {/* User Identity Holographic Preview Card */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 shadow-inner">
          {/* Avatar Hologram */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
            {user.role === 'Student' && (
              <VRStudentAvatar className="w-full h-full drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
            )}
            {user.role === 'Teacher' && (
              <TeacherRobotAvatar className="w-full h-full drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]" />
            )}
            {user.role === 'Parent' && (
              <ParentNetworkAvatar className="w-full h-full drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
            )}
            {/* Spinning reticle frame */}
            <div className="absolute -inset-1 border-2 border-dashed border-cyan-400/60 rounded-full animate-spin-slow pointer-events-none" />
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider bg-cyan-950/80 border border-cyan-400/50 text-cyan-300">
                {user.role} CADET
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                ID: {user.email}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              {user.name}
            </h2>
            <p className="text-xs text-slate-400 font-sans">{user.title}</p>
          </div>
        </div>

        {/* Progress Bar & percentage */}
        <div className="mt-5 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-cyan-300 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <span>SYSTEM BOOT INITIALIZATION</span>
            </span>
            <span className="text-cyan-400 font-black text-sm tracking-wider">
              {progress}%
            </span>
          </div>

          <div className="relative w-full h-3.5 bg-slate-950 border border-cyan-500/50 rounded-full p-0.5 overflow-hidden shadow-[inset_0_0_12px_rgba(0,0,0,0.8)]">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-150 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            />
            {/* Animated scan stripe */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] bg-[length:40px_100%] animate-scan" />
          </div>
        </div>

        {/* Sequential Step Diagnostic Checklist */}
        <div className="mt-5 space-y-2">
          {steps.map((s, idx) => {
            const isCompleted = stepIndex > idx;
            const isCurrent = stepIndex === idx;

            return (
              <div
                key={idx}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 ${
                  isCompleted
                    ? 'bg-slate-900/80 border-emerald-500/40 text-slate-200'
                    : isCurrent
                    ? 'bg-cyan-950/50 border-cyan-400/80 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)] scale-[1.01]'
                    : 'bg-slate-950/40 border-slate-800/60 text-slate-600 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 animate-bounce" />
                  ) : isCurrent ? (
                    <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 animate-pulse" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
                  )}
                  <div>
                    <div className="text-xs font-bold font-mono tracking-tight">
                      {s.label}
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans hidden sm:block">
                      {s.sub}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[9px] px-2 py-0.5 rounded font-bold font-mono ${
                    isCompleted
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                      : isCurrent
                      ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-400/50 animate-pulse'
                      : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}
                >
                  {s.badge}
                </span>
              </div>
            );
          })}
        </div>

        {/* Live Terminal Log Stream in Console */}
        <div className="mt-4 p-3 bg-black/80 rounded-xl border border-slate-800/80 font-mono text-[10px] text-cyan-400/90 h-16 overflow-hidden relative">
          <div className="flex items-center justify-between text-[9px] text-slate-500 border-b border-slate-800 pb-1 mb-1">
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span>TERMINAL STREAM // KERNEL</span>
            </span>
            <span className="text-emerald-400 font-bold">READY</span>
          </div>
          <div className="space-y-0.5">
            {logs.slice(-2).map((log, lIdx) => (
              <div key={lIdx} className="truncate animate-pulse">
                {log}
              </div>
            ))}
            {logs.length === 0 && (
              <div className="text-slate-500 animate-pulse">
                &gt; Initializing authentication kernel and telemetry routing...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
