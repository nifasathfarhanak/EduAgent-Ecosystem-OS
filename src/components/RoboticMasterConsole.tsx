import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, PortalType } from '../types';
import { demoUsers } from './LandingPage';
import {
  Sparkles,
  GraduationCap,
  Bot,
  Orbit,
  Cpu,
  Zap,
  Eye,
  Terminal,
  ArrowRight,
  Fingerprint,
  Radio,
  Shield,
  Activity,
  Layers,
  Database,
  Globe,
  Mic,
  Play,
  CheckCircle2,
  Lock,
  Wand2,
} from 'lucide-react';
import {
  VRStudentAvatar,
  TeacherRobotAvatar,
  ParentNetworkAvatar,
  Crystal3DIcon,
  RoboticEqualizer,
  RoboticBiometricScanner,
} from './CyberVisuals';

interface RoboticMasterConsoleProps {
  onLoginAs: (user: UserProfile) => void;
  currentTheme?: string;
  onSelectTheme?: (theme: any) => void;
}

export const RoboticMasterConsole: React.FC<RoboticMasterConsoleProps> = ({
  onLoginAs,
  currentTheme = 'robotics',
  onSelectTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'parent' | 'showcase'>('student');
  const [studentAgentId, setStudentAgentId] = useState('ASD-Jordan-Smith');
  const [teacherAgentId, setTeacherAgentId] = useState('ASD-Prof-Sharma');
  const [parentAgentId, setParentAgentId] = useState('ASD-Parent');
  const [isOrbActive, setIsOrbActive] = useState(false);
  const [voiceSpoken, setVoiceSpoken] = useState(false);
  const [streamTick, setStreamTick] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Live telemetry stream rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setStreamTick((prev) => (prev + 1) % 100);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  // Swirling Particle Matrix Canvas inside the Console
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 750);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.clientWidth;
      h = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      speed: number;
      radius: number;
      alpha: number;
      color: string;
      angle: number;
      distance: number;
    }> = [];

    const colors = ['#06b6d4', '#38bdf8', '#a855f7', '#ec4899', '#34d399'];

    for (let i = 0; i < 85; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: Math.random() * 0.02 + 0.006,
        radius: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 150 + 20,
      });
    }

    let t = 0;
    const orbCenterX = w * 0.40;
    const orbCenterY = h * 0.35;

    const render = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      // Swirling Orbiting Stars
      particles.forEach((p, idx) => {
        p.angle += p.speed;
        const currDist = p.distance + Math.sin(t * 1.5 + idx) * 10;
        const px = orbCenterX + Math.cos(p.angle) * currDist * 1.35;
        const py = orbCenterY + Math.sin(p.angle) * (currDist * 0.72);

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(t * 2 + idx));
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (idx % 3 === 0) {
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = 0.15;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(orbCenterX, orbCenterY);
          ctx.stroke();
        }
        ctx.restore();
      });

      // Core Glowing Aura
      ctx.save();
      const radGrad = ctx.createRadialGradient(
        orbCenterX,
        orbCenterY,
        5,
        orbCenterX,
        orbCenterY,
        150
      );
      radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      radGrad.addColorStop(0.2, 'rgba(6, 182, 212, 0.85)');
      radGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.45)');
      radGrad.addColorStop(0.8, 'rgba(236, 72, 153, 0.15)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(orbCenterX, orbCenterY, 150, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleStudentSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = studentAgentId.trim() || 'ASD-Jordan-Smith';
    onLoginAs({
      ...demoUsers[0],
      email: cleanId,
      name: cleanId.replace('ASD-', '').replace('-', ' ') || 'Jordan Smith',
    });
  };

  const handleTeacherSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = teacherAgentId.trim() || 'ASD-Prof-Sharma';
    onLoginAs({
      ...demoUsers[1],
      email: cleanId,
      name: cleanId.replace('ASD-', '').replace('-', ' ') || 'Prof. Sharma',
    });
  };

  const handleParentSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = parentAgentId.trim() || 'ASD-Parent';
    onLoginAs({
      ...demoUsers[2],
      email: cleanId,
      name: cleanId.replace('ASD-', '').replace('-', ' ') || 'Lakshmi Parent',
    });
  };

  const triggerOrbVoice = () => {
    setIsOrbActive(true);
    setVoiceSpoken(true);
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(
          'Nexus Autonomous EdTech Matrix initialized. All robotic microservices and Gemini 3.7 neural engines are active.'
        );
        msg.rate = 1.05;
        msg.pitch = 1.0;
        window.speechSynthesis.speak(msg);
      } catch (err) {
        // Fallback gracefully
      }
    }
    setTimeout(() => {
      setIsOrbActive(false);
    }, 4500);
  };

  return (
    <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-b from-[#02050e]/95 via-[#030919]/95 to-[#010308]/98 border-[2.5px] border-cyan-400/70 shadow-[0_0_60px_rgba(6,182,212,0.45),inset_0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-2xl transition-all duration-300">
      
      {/* 1. Corner Tech Bracket Accents */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-3 border-l-3 border-cyan-300 pointer-events-none z-30" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-3 border-r-3 border-cyan-300 pointer-events-none z-30" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-3 border-l-3 border-cyan-300 pointer-events-none z-30" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-3 border-r-3 border-cyan-300 pointer-events-none z-30" />

      {/* Side Sensor Node Pins */}
      <div className="absolute -left-1 top-1/3 w-3 h-8 bg-cyan-400 rounded-r-md shadow-[0_0_12px_#06b6d4] pointer-events-none" />
      <div className="absolute -right-1 top-1/3 w-3 h-8 bg-cyan-400 rounded-l-md shadow-[0_0_12px_#06b6d4] pointer-events-none" />

      {/* 2. Cyber Skyline Background Vector Layer */}
      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1200 750" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cyberSkylineCyan" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="cyberSkylinePink" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#a855f7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Left Skyline */}
          <rect x="40" y="240" width="48" height="420" fill="url(#cyberSkylineCyan)" stroke="#06b6d4" strokeWidth="0.8" />
          <rect x="95" y="190" width="55" height="470" fill="url(#cyberSkylineCyan)" stroke="#38bdf8" strokeWidth="0.8" />
          <rect x="155" y="270" width="42" height="390" fill="url(#cyberSkylinePink)" stroke="#ec4899" strokeWidth="0.8" />
          <rect x="205" y="210" width="60" height="450" fill="url(#cyberSkylineCyan)" stroke="#06b6d4" strokeWidth="0.8" />

          {/* Right Skyline Behind Robot */}
          <rect x="860" y="260" width="48" height="400" fill="url(#cyberSkylineCyan)" stroke="#38bdf8" strokeWidth="0.8" />
          <rect x="915" y="210" width="55" height="450" fill="url(#cyberSkylineCyan)" stroke="#06b6d4" strokeWidth="0.8" />
          <rect x="975" y="170" width="60" height="490" fill="url(#cyberSkylinePink)" stroke="#ec4899" strokeWidth="0.8" />
          <rect x="1045" y="250" width="50" height="410" fill="url(#cyberSkylineCyan)" stroke="#38bdf8" strokeWidth="0.8" />

          {/* Perspective Cyber Highways Floor */}
          <line x1="0" y1="620" x2="1200" y2="620" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
          <line x1="0" y1="660" x2="1200" y2="660" stroke="#38bdf8" strokeWidth="1.5" opacity="0.4" />
          <line x1="0" y1="700" x2="1200" y2="700" stroke="#ec4899" strokeWidth="2.5" opacity="0.5" />
        </svg>
      </div>

      {/* 3. Swirling Star Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 4. Top Header Bar: SMART EDUCATION HUD + Role Portals Selector */}
      <div className="relative z-20 p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/30 bg-slate-950/60 backdrop-blur-md">
        {/* Top-Left Smart Education Badge (Matching Screenshot) */}
        <div className="inline-flex items-center gap-3 bg-slate-950/90 border-2 border-cyan-400 p-3 sm:p-3.5 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.8),inset_0_0_15px_rgba(6,182,212,0.3)]">
          <div className="space-y-0.5 text-left">
            <div className="text-lg sm:text-xl font-black font-mono tracking-wider text-cyan-300 drop-shadow-[0_0_10px_#22d3ee]">
              SMART
            </div>
            <div className="text-base sm:text-lg font-black font-mono tracking-widest text-cyan-400 drop-shadow-[0_0_12px_#06b6d4]">
              EDUCATION
            </div>
            <div className="pt-1 flex items-center gap-2 text-[9px] font-mono text-cyan-200">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                AUTONOMOUS EDTECH
              </span>
              <span className="text-purple-300 font-bold">V4.9 CORE</span>
            </div>
          </div>

          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-cyan-950/90 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.8)]">
            <GraduationCap className="w-6 h-6 stroke-[2.2] animate-bounce-slow" />
          </div>
        </div>

        {/* Portal Switching Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-cyan-500/40 backdrop-blur-xl">
          <button
            onClick={() => setActiveTab('student')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'student'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.8)] scale-105'
                : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/80'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Student Cadet</span>
          </button>

          <button
            onClick={() => setActiveTab('teacher')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'teacher'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.8)] scale-105'
                : 'text-slate-300 hover:text-pink-300 hover:bg-slate-800/80'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Faculty Command</span>
          </button>

          <button
            onClick={() => setActiveTab('parent')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'parent'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.8)] scale-105'
                : 'text-slate-300 hover:text-purple-300 hover:bg-slate-800/80'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Guardian Voice</span>
          </button>

          <button
            onClick={() => setActiveTab('showcase')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'showcase'
                ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.8)] scale-105'
                : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/80'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Try AI Showcase</span>
          </button>
        </div>
      </div>

      {/* 5. Main Center Stage: AI Galaxy Matrix + 3D Humanoid Robot + Integrated Login Cockpit */}
      <div className="relative z-20 p-5 sm:p-8 lg:p-10 min-h-[580px] flex flex-col justify-between">
        
        {/* Upper Visual Stage: Rotating Galaxy Matrix Sphere (Left/Center) & Standing Robot (Right) */}
        <div className="relative w-full h-[260px] sm:h-[300px] md:h-[340px] flex items-center justify-between pointer-events-none">
          
          {/* AI Galaxy Matrix Hologram Sphere (Matching Screenshot) */}
          <div
            onClick={triggerOrbVoice}
            className="pointer-events-auto absolute top-1/2 left-[30%] sm:left-[38%] md:left-[40%] -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 cursor-pointer group"
            title="Click to activate voice telemetry"
          >
            {/* Concentric Rotating HUD Rings */}
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full animate-[spin_55s_linear_infinite] group-hover:scale-105 transition-transform duration-500"
            >
              {/* Outer HUD Orbit */}
              <circle
                cx="200"
                cy="200"
                r="185"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeDasharray="35 15 70 15 20 20"
                className="drop-shadow-[0_0_18px_#06b6d4]"
              />

              {/* Counter Rotating Ring */}
              <circle
                cx="200"
                cy="200"
                r="150"
                fill="none"
                stroke="#ec4899"
                strokeWidth="1.8"
                strokeDasharray="15 25"
                className="animate-[spin_38s_linear_infinite_reverse] drop-shadow-[0_0_14px_#ec4899]"
              />

              {/* Inner Resonant Core Ring */}
              <circle
                cx="200"
                cy="200"
                r="115"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="90 25"
                className="drop-shadow-[0_0_12px_#38bdf8]"
              />

              {/* Crosshair Laser Ticks */}
              <line x1="200" y1="10" x2="200" y2="35" stroke="#22d3ee" strokeWidth="2.5" />
              <line x1="200" y1="365" x2="200" y2="390" stroke="#22d3ee" strokeWidth="2.5" />
              <line x1="10" y1="200" x2="35" y2="200" stroke="#22d3ee" strokeWidth="2.5" />
              <line x1="365" y1="200" x2="390" y2="200" stroke="#22d3ee" strokeWidth="2.5" />
            </svg>

            {/* AI Galaxy Matrix Center Badge (Screenshot Exact) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-400 text-[11px] sm:text-xs font-mono font-black text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.9)] backdrop-blur-md group-hover:border-cyan-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin-slow" />
                <span>AI GALAXY MATRIX</span>
              </div>
              <p className="text-[10px] font-mono text-cyan-300/90 drop-shadow">
                STAR L6 • BigQuery Telemetry
              </p>
              {isOrbActive && (
                <div className="text-[9px] font-mono text-emerald-300 animate-pulse font-bold">
                  ● VOICE TELEMETRY BROADCASTING
                </div>
              )}
            </div>
          </div>

          {/* 3D Humanoid Robot Standing on Platform & Pointing (Matching Screenshot) */}
          <div className="absolute right-0 sm:right-4 md:right-8 bottom-0 w-48 sm:w-64 md:w-76 lg:w-84 h-[240px] sm:h-[280px] md:h-[320px]">
            <svg
              viewBox="0 0 380 500"
              className="w-full h-full drop-shadow-[0_0_35px_rgba(6,182,212,0.7)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="chromeArmorMaster" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#e2e8f0" />
                  <stop offset="60%" stopColor="#94a3b8" />
                  <stop offset="90%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>

                <linearGradient id="eyeGlowMaster" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>

                <radialGradient id="chestCoreMaster" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#22d3ee" />
                  <stop offset="80%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#0f172a" />
                </radialGradient>

                <radialGradient id="touchBeamMaster" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="30%" stopColor="#22d3ee" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#a855f7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Pointing Laser Contact Beam towards AI Galaxy Matrix */}
              <circle cx="95" cy="180" r="18" fill="url(#touchBeamMaster)" className="animate-pulse" />
              <circle cx="95" cy="180" r="6" fill="#ffffff" />
              <line x1="95" y1="180" x2="50" y2="200" stroke="#67e8f9" strokeWidth="2.5" strokeDasharray="4 2" />
              <line x1="95" y1="180" x2="70" y2="140" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 3" />

              {/* Extended Left Arm pointing at orb */}
              <path d="M210 170 L155 180 L145 195 L200 188 Z" fill="url(#chromeArmorMaster)" stroke="#0284c7" strokeWidth="1.2" />
              <path d="M150 185 L105 182 L95 180 L142 195 Z" fill="url(#chromeArmorMaster)" stroke="#38bdf8" strokeWidth="1.2" />
              <circle cx="98" cy="180" r="5" fill="#e2e8f0" stroke="#0284c7" strokeWidth="1" />
              <polygon points="98,178 92,180 98,183" fill="#ffffff" />

              {/* Robot Head & Faceplate */}
              <g>
                <ellipse cx="230" cy="95" rx="28" ry="34" fill="url(#chromeArmorMaster)" stroke="#38bdf8" strokeWidth="1.8" />
                <path d="M212 90 Q225 86 248 90 Q244 110 220 114 Z" fill="#020617" stroke="#22d3ee" strokeWidth="2" />
                <path d="M216 94 Q228 92 244 94" stroke="url(#eyeGlowMaster)" strokeWidth="3.5" strokeLinecap="round" className="drop-shadow-[0_0_8px_#22d3ee]" />
                <circle cx="204" cy="98" r="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="256" cy="98" r="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="224" y="126" width="12" height="18" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                <line x1="227" y1="128" x2="227" y2="142" stroke="#06b6d4" strokeWidth="1.5" />
                <line x1="233" y1="128" x2="233" y2="142" stroke="#06b6d4" strokeWidth="1.5" />
              </g>

              {/* Torso & Arc Reactor */}
              <g>
                <path d="M195 144 L265 144 L275 220 L185 220 Z" fill="url(#chromeArmorMaster)" stroke="#0284c7" strokeWidth="1.8" />
                <circle cx="190" cy="160" r="16" fill="url(#chromeArmorMaster)" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="270" cy="160" r="16" fill="url(#chromeArmorMaster)" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="230" cy="175" r="14" fill="url(#chestCoreMaster)" stroke="#67e8f9" strokeWidth="2" className="drop-shadow-[0_0_14px_#06b6d4]" />
                <circle cx="230" cy="175" r="6" fill="#ffffff" />
                <path d="M200 220 L260 220 L255 270 L205 270 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
                <line x1="205" y1="235" x2="255" y2="235" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="208" y1="250" x2="252" y2="250" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M198 270 L262 270 L250 310 L210 310 Z" fill="url(#chromeArmorMaster)" stroke="#0284c7" strokeWidth="1.5" />
              </g>

              {/* Right Arm */}
              <path d="M272 170 L290 230 L280 290 L268 285 L276 230 L265 175 Z" fill="url(#chromeArmorMaster)" stroke="#0284c7" strokeWidth="1.2" />

              {/* Legs */}
              <g>
                <path d="M210 310 L195 385 L205 450 L220 450 L218 385 L228 310 Z" fill="url(#chromeArmorMaster)" stroke="#0284c7" strokeWidth="1.5" />
                <circle cx="206" cy="385" r="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <path d="M190 450 L225 450 L230 465 L180 465 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />

                <path d="M242 310 L252 385 L245 450 L260 450 L268 385 L260 310 Z" fill="url(#chromeArmorMaster)" stroke="#0284c7" strokeWidth="1.5" />
                <circle cx="260" cy="385" r="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <path d="M240 450 L275 450 L285 465 L235 465 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
              </g>

              {/* Illuminated Glass Floor Platform */}
              <polygon points="130,465 340,465 380,490 90,490" fill="rgba(6, 182, 212, 0.25)" stroke="#22d3ee" strokeWidth="2.5" className="drop-shadow-[0_0_25px_#06b6d4]" />
              <line x1="150" y1="475" x2="320" y2="475" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
              <line x1="110" y1="485" x2="360" y2="485" stroke="#67e8f9" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* 6. Embedded Interactive Portal Control Deck (Directly inside the Robotic UI) */}
        <div className="relative z-30 pt-6 pb-2">
          
          {/* TAB 1: Student Cadet Login Console */}
          {activeTab === 'student' && (
            <div className="bg-slate-950/90 border-2 border-cyan-400 rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(6,182,212,0.4)] backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-4 flex items-center gap-4 border-b lg:border-b-0 lg:border-r border-cyan-500/30 pb-4 lg:pb-0 lg:pr-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                  <VRStudentAvatar className="w-full h-full drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
                </div>
                <div className="space-y-1 text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400 text-[10px] font-mono text-cyan-300 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    MECHA-CORE // NX-STU-01
                  </div>
                  <h3 className="text-xl font-black text-cyan-300 font-mono tracking-tight">
                    Student Portal Gateway
                  </h3>
                  <p className="text-xs text-slate-300 font-sans">
                    AI Robotic Mentor, Multimodal Vision QA & STAR Voice Interviewer.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <RoboticBiometricScanner
                  label="NEURAL BIOMETRIC SCAN"
                  subLabel="TOUCH FOR INSTANT STUDENT LOGIN"
                  themeColor="cyan"
                  onScan={() => {
                    setStudentAgentId('ASD-Jordan-Smith');
                    setTimeout(() => handleStudentSubmit(), 500);
                  }}
                />
              </div>

              <div className="lg:col-span-4">
                <form onSubmit={handleStudentSubmit} className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-300 mb-1">
                      <span>Cadet Agent ID:</span>
                      <button
                        type="button"
                        onClick={() => setStudentAgentId('ASD-Jordan-Smith')}
                        className="text-cyan-400 hover:text-cyan-200 underline cursor-pointer"
                      >
                        Auto-Fill Demo ID
                      </button>
                    </div>
                    <input
                      type="text"
                      value={studentAgentId}
                      onChange={(e) => setStudentAgentId(e.target.value)}
                      placeholder="ASD-Jordan-Smith"
                      className="w-full bg-slate-900/90 text-slate-100 px-3.5 py-2 rounded-xl border border-cyan-500/60 text-xs font-mono focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40 shadow-inner"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-black rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.8)] hover:shadow-[0_0_35px_rgba(6,182,212,1)] flex items-center justify-center gap-2 font-mono text-xs transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Activate Student Pilot</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: Faculty Command Login Console */}
          {activeTab === 'teacher' && (
            <div className="bg-slate-950/90 border-2 border-pink-500 rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(236,72,153,0.4)] backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-4 flex items-center gap-4 border-b lg:border-b-0 lg:border-r border-pink-500/30 pb-4 lg:pb-0 lg:pr-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                  <TeacherRobotAvatar className="w-full h-full drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]" />
                </div>
                <div className="space-y-1 text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-950/80 border border-pink-400 text-[10px] font-mono text-pink-300 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                    MECHA-CORE // NX-TEA-99
                  </div>
                  <h3 className="text-xl font-black text-pink-400 font-mono tracking-tight">
                    Faculty Command Radar
                  </h3>
                  <p className="text-xs text-slate-300 font-sans">
                    Real-time BigQuery classroom telemetry, automated at-risk radar & AST logs.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <RoboticBiometricScanner
                  label="FACULTY RETINA SCAN"
                  subLabel="TOUCH FOR INSTANT TEACHER ACCESS"
                  themeColor="pink"
                  onScan={() => {
                    setTeacherAgentId('ASD-Prof-Sharma');
                    setTimeout(() => handleTeacherSubmit(), 500);
                  }}
                />
              </div>

              <div className="lg:col-span-4">
                <form onSubmit={handleTeacherSubmit} className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-300 mb-1">
                      <span>Faculty Agent ID:</span>
                      <button
                        type="button"
                        onClick={() => setTeacherAgentId('ASD-Prof-Sharma')}
                        className="text-pink-400 hover:text-pink-200 underline cursor-pointer"
                      >
                        Auto-Fill Demo ID
                      </button>
                    </div>
                    <input
                      type="text"
                      value={teacherAgentId}
                      onChange={(e) => setTeacherAgentId(e.target.value)}
                      placeholder="ASD-Prof-Sharma"
                      className="w-full bg-slate-900/90 text-slate-100 px-3.5 py-2 rounded-xl border border-pink-500/60 text-xs font-mono focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-400/40 shadow-inner"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-400 hover:to-pink-300 text-white font-black rounded-xl shadow-[0_0_25px_rgba(236,72,153,0.8)] hover:shadow-[0_0_35px_rgba(236,72,153,1)] flex items-center justify-center gap-2 font-mono text-xs transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Activate Faculty Radar</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: Guardian Voice Bridge Login Console */}
          {activeTab === 'parent' && (
            <div className="bg-slate-950/90 border-2 border-purple-500 rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(168,85,247,0.4)] backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-4 flex items-center gap-4 border-b lg:border-b-0 lg:border-r border-purple-500/30 pb-4 lg:pb-0 lg:pr-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                  <ParentNetworkAvatar className="w-full h-full drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
                </div>
                <div className="space-y-1 text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-400 text-[10px] font-mono text-purple-300 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                    MECHA-CORE // NX-PAR-SYNC
                  </div>
                  <h3 className="text-xl font-black text-purple-300 font-mono tracking-tight">
                    Guardian Voice Portal
                  </h3>
                  <p className="text-xs text-slate-300 font-sans">
                    15+ Indian languages audio synthesis, parent-teacher summaries & voice guidance.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <RoboticBiometricScanner
                  label="GUARDIAN VOICE SCAN"
                  subLabel="TOUCH FOR INSTANT PARENT ACCESS"
                  themeColor="purple"
                  onScan={() => {
                    setParentAgentId('ASD-Parent');
                    setTimeout(() => handleParentSubmit(), 500);
                  }}
                />
              </div>

              <div className="lg:col-span-4">
                <form onSubmit={handleParentSubmit} className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-300 mb-1">
                      <span>Guardian Agent ID:</span>
                      <button
                        type="button"
                        onClick={() => setParentAgentId('ASD-Parent')}
                        className="text-purple-400 hover:text-purple-200 underline cursor-pointer"
                      >
                        Auto-Fill Demo ID
                      </button>
                    </div>
                    <input
                      type="text"
                      value={parentAgentId}
                      onChange={(e) => setParentAgentId(e.target.value)}
                      placeholder="ASD-Parent"
                      className="w-full bg-slate-900/90 text-slate-100 px-3.5 py-2 rounded-xl border border-purple-500/60 text-xs font-mono focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-400/40 shadow-inner"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-black rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.8)] hover:shadow-[0_0_35px_rgba(168,85,247,1)] flex items-center justify-center gap-2 font-mono text-xs transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Activate Voice Bridge</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: Try AI Showcase Pods */}
          {activeTab === 'showcase' && (
            <div className="bg-slate-950/90 border-2 border-emerald-500/60 rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(16,185,129,0.3)] backdrop-blur-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                <div className="space-y-0.5 text-left">
                  <h4 className="text-base font-black font-mono text-emerald-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Instant Autonomous Microservice Launchers</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Click any pod to test that autonomous AI microservice with pre-configured telemetry.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  onClick={() => handleStudentSubmit()}
                  className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-300 text-left transition-all hover:scale-105 cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
                      <Mic className="w-4 h-4" />
                    </span>
                    <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/40">
                      L6 EVAL
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300">
                    STAR Voice Interviewer
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Real-time audio AI evaluation with rubrics.
                  </p>
                </button>

                <button
                  onClick={() => handleStudentSubmit()}
                  className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 hover:border-indigo-300 text-left transition-all hover:scale-105 cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                      <Eye className="w-4 h-4" />
                    </span>
                    <span className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-500/40">
                      MULTIMODAL
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                    Vision Architecture QA
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    System diagrams & code diagnostic solver.
                  </p>
                </button>

                <button
                  onClick={() => handleTeacherSubmit()}
                  className="p-3.5 rounded-2xl bg-pink-950/60 border border-pink-500/40 hover:border-pink-300 text-left transition-all hover:scale-105 cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 rounded-xl bg-pink-500/20 text-pink-300">
                      <Database className="w-4 h-4" />
                    </span>
                    <span className="text-[9px] font-mono font-bold text-pink-400 bg-pink-950 px-1.5 py-0.5 rounded border border-pink-500/40">
                      BIGQUERY
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-pink-300">
                    Classroom Risk Radar
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Automated dropout mitigation pipeline.
                  </p>
                </button>

                <button
                  onClick={() => handleParentSubmit()}
                  className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/40 hover:border-purple-300 text-left transition-all hover:scale-105 cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                      <Globe className="w-4 h-4" />
                    </span>
                    <span className="text-[9px] font-mono font-bold text-purple-400 bg-purple-950 px-1.5 py-0.5 rounded border border-purple-500/40">
                      15+ LANGS
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-purple-300">
                    Multilingual Audio Bridge
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Native Indian dialects speech synthesis.
                  </p>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* 7. Bottom Telemetry & Status HUD Strip (Screenshot Exact) */}
        <div className="relative z-20 pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-cyan-500/30 text-xs font-mono">
          
          {/* Bottom-Left Robotic Telemetry Stream (Matching Screenshot) */}
          <div className="p-3 rounded-xl bg-slate-950/90 border border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-md space-y-1 text-[10px] text-left">
            <div className="flex items-center gap-2 text-cyan-300 font-bold border-b border-cyan-500/30 pb-1">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>ROBOTIC TELEMETRY STREAM</span>
            </div>
            <div className="space-y-0.5 text-slate-300">
              <p className="text-emerald-400 font-bold">&gt; MODEL: GEMINI 3.7 FLASH // PRO-ACTIVE</p>
              <p>&gt; HOLOGRAPHIC ORB: CONNECTED (120 FPS)</p>
              <p>&gt; INTERACTIVE STAR MATRIX: ACTIVE</p>
              <p className="text-cyan-300">&gt; REAL-TIME RISK TELEMETRY: 0.00ms JITTER</p>
            </div>
          </div>

          {/* Bottom-Right Robotic Equalizer & System Node Health */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-3 rounded-xl border border-cyan-500/40 backdrop-blur-md">
            <div className="space-y-1 text-right">
              <div className="text-[10px] text-cyan-300 font-bold flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ALL MICROSERVICES SYNCED</span>
              </div>
              <p className="text-[9px] text-slate-400">
                Spaced Retrieval: 1d • 7d • 21d • 60d AST
              </p>
            </div>
            <RoboticEqualizer active={true} color="cyan" className="h-6" />
          </div>

        </div>

      </div>

    </div>
  );
};
