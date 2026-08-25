import React, { useState, useEffect, useRef } from 'react';
import { PortalType } from '../types';
import { Sparkles, Bot, Cpu, Orbit, Layers, Wand2 } from 'lucide-react';
import { FullScreenGalaxyWaveCanvas } from './FullScreenGalaxyWaveCanvas';

export type BackgroundThemeId = 'robotics' | 'smart-campus' | 'neural-brain' | 'cyber-matrix' | 'quantum-lab';

export interface BackgroundTheme {
  id: BackgroundThemeId;
  name: string;
  shortLabel: string;
  icon: string;
  imageUrl: string;
  overlayGradient: string;
  accentColor: string;
  glowColor: string;
  description: string;
}

export const BACKGROUND_THEMES: Record<BackgroundThemeId, BackgroundTheme> = {
  robotics: {
    id: 'robotics',
    name: 'Smart Education Holographic Robot',
    shortLabel: 'Smart Robot',
    icon: '🤖',
    // Futuristic cybernetic robot with glowing hologram in cyberpunk city
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=2560&q=85',
    overlayGradient: 'radial-gradient(ellipse at 50% 30%, rgba(6, 182, 212, 0.25), rgba(2, 6, 23, 0.9) 65%, #02040a 100%)',
    accentColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    description: 'Intelligent humanoid robot interacting with glowing galaxy holograms and smart education matrix.',
  },
  'smart-campus': {
    id: 'smart-campus',
    name: 'Next-Gen Smart Education Campus',
    shortLabel: 'Smart Campus',
    icon: '🏫',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2560&q=85',
    overlayGradient: 'radial-gradient(ellipse at 50% 25%, rgba(168, 85, 247, 0.22), rgba(2, 6, 23, 0.88) 65%, #02040a 100%)',
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    description: 'Futuristic collaborative STEM research campus with AI telemetry.',
  },
  'neural-brain': {
    id: 'neural-brain',
    name: 'Quantum AI Neural Mesh',
    shortLabel: 'Neural AI',
    icon: '🧬',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=2560&q=85',
    overlayGradient: 'radial-gradient(ellipse at 50% 35%, rgba(236, 72, 153, 0.22), rgba(2, 6, 23, 0.88) 65%, #02040a 100%)',
    accentColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.35)',
    description: 'Self-adapting cognitive neural networks & spaced retrieval engine.',
  },
  'cyber-matrix': {
    id: 'cyber-matrix',
    name: 'Cloud & Distributed Cyber Matrix',
    shortLabel: 'Cyber Grid',
    icon: '⚡',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2560&q=85',
    overlayGradient: 'radial-gradient(ellipse at 50% 30%, rgba(14, 165, 233, 0.22), rgba(2, 6, 23, 0.88) 65%, #02040a 100%)',
    accentColor: '#0ea5e9',
    glowColor: 'rgba(14, 165, 233, 0.35)',
    description: 'High-throughput cloud architecture with live diagram scanning.',
  },
  'quantum-lab': {
    id: 'quantum-lab',
    name: 'Futuristic AI Engineering Lab',
    shortLabel: 'AI Lab',
    icon: '🔬',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2560&q=85',
    overlayGradient: 'radial-gradient(ellipse at 50% 30%, rgba(16, 185, 129, 0.2), rgba(2, 6, 23, 0.88) 65%, #02040a 100%)',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    description: 'Hands-on engineering workstation with automated CI/CD grader.',
  },
};

interface Props {
  portal: PortalType | 'Landing';
  manualTheme?: BackgroundThemeId;
  onThemeChange?: (theme: BackgroundThemeId) => void;
}

export const SmartEducationBackground: React.FC<Props> = ({
  portal,
  manualTheme,
  onThemeChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Automatically select the optimal educational background based on portal, unless manually overridden
  const getDefaultThemeForPortal = (p: PortalType | 'Landing'): BackgroundThemeId => {
    switch (p) {
      case 'Student':
        return 'cyber-matrix';
      case 'Teacher':
        return 'neural-brain';
      case 'Parent':
        return 'smart-campus';
      case 'Landing':
      default:
        return 'robotics';
    }
  };

  const activeThemeId = manualTheme || getDefaultThemeForPortal(portal);
  const currentTheme = BACKGROUND_THEMES[activeThemeId] || BACKGROUND_THEMES.robotics;

  // Particle & holographic mesh animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for Futuristic Education Mesh
    const particlesCount = Math.min(Math.floor((width * height) / 22000), 55);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = [
      currentTheme.accentColor,
      '#06b6d4',
      '#a855f7',
      '#ec4899',
      '#38bdf8',
    ];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.45 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // 1. Perspective grid lines at bottom
      ctx.save();
      ctx.strokeStyle = `${currentTheme.accentColor}10`;
      ctx.lineWidth = 1;
      const horizonY = height * 0.68;
      const fovCenter = width * 0.5;

      for (let i = -12; i <= 12; i++) {
        ctx.beginPath();
        ctx.moveTo(fovCenter + i * 70, horizonY);
        ctx.lineTo(fovCenter + i * 220, height);
        ctx.stroke();
      }

      for (let y = horizonY; y < height; y += 36) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Animated Smart Education Light Beams
      ctx.save();
      const beamX = width * 0.5 + Math.sin(time * 0.4) * 140;
      const gradient = ctx.createRadialGradient(
        beamX,
        140,
        15,
        width * 0.5,
        200,
        Math.min(width * 0.65, 550)
      );
      gradient.addColorStop(0, `${currentTheme.accentColor}18`);
      gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.05)');
      gradient.addColorStop(1, 'rgba(2, 4, 10, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // 3. Connect close particles with neural cyber-lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.save();
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - dist / 115) * 0.22;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }

        // Draw particle node with glow
        ctx.save();
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none bg-[#02040a]">
      {/* 1. Cinematic High-Res AI Background Image with Smooth Crossfade */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <img
          src={currentTheme.imageUrl}
          alt={currentTheme.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.42] contrast-[1.18] saturate-[1.25] transition-all duration-1000"
        />
      </div>

      {/* 2. Optical Vignette & Multi-Stage Glassmorphic Gradients for Extreme Legibility */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: currentTheme.overlayGradient,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/75 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/80 via-transparent to-[#02040a]/90" />

      {/* 3. Full Continuous Swirling 3D Galaxy Wave Canvas */}
      <FullScreenGalaxyWaveCanvas
        accentColor={currentTheme.accentColor}
        secondaryColor="#a855f7"
        tertiaryColor="#ec4899"
        speed={1.1}
      />

      {/* 4. Dynamic Full-Screen Rotating AI Galaxy Matrix & Holographic Gyroscope */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Large Rotating Multi-Ring AI Galaxy Matrix */}
        <div className="relative w-[850px] h-[850px] sm:w-[1100px] sm:h-[1100px] lg:w-[1400px] lg:h-[1400px] opacity-45 sm:opacity-50">
          {/* Main Counter-Rotating Gyroscope Outer Ring with HUD Marks */}
          <svg
            viewBox="0 0 800 800"
            className="w-full h-full animate-[spin_45s_linear_infinite]"
          >
            <defs>
              <radialGradient id="galaxyCenterGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="20%" stopColor={currentTheme.accentColor} stopOpacity="0.5" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#02040a" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="orbitGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Central Soft Galaxy Nebula Glow */}
            <circle cx="400" cy="400" r="340" fill="url(#galaxyCenterGlow)" />

            {/* Outer Segmented HUD Orbit Ring */}
            <circle
              cx="400"
              cy="400"
              r="380"
              fill="none"
              stroke={currentTheme.accentColor}
              strokeWidth="2"
              strokeDasharray="40 20 80 20 20 20"
              style={{ filter: `drop-shadow(0 0 14px ${currentTheme.accentColor})` }}
            />

            {/* Middle Data Track Ring */}
            <circle
              cx="400"
              cy="400"
              r="320"
              fill="none"
              stroke="#ec4899"
              strokeWidth="1.5"
              strokeDasharray="16 32 48 16"
              style={{ filter: 'drop-shadow(0 0 10px #ec4899)' }}
            />

            {/* Inner High-Density Precision Orbit Ring */}
            <circle
              cx="400"
              cy="400"
              r="250"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="120 30"
              style={{ filter: 'drop-shadow(0 0 15px #38bdf8)' }}
            />

            {/* Core Neural Resonance Ring */}
            <circle
              cx="400"
              cy="400"
              r="170"
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
              strokeDasharray="25 15 50 15"
              style={{ filter: 'drop-shadow(0 0 10px #a855f7)' }}
            />

            {/* Crosshair Laser Alignments */}
            <line x1="400" y1="10" x2="400" y2="50" stroke={currentTheme.accentColor} strokeWidth="3" />
            <line x1="400" y1="750" x2="400" y2="790" stroke={currentTheme.accentColor} strokeWidth="3" />
            <line x1="10" y1="400" x2="50" y2="400" stroke={currentTheme.accentColor} strokeWidth="3" />
            <line x1="750" y1="400" x2="790" y2="400" stroke={currentTheme.accentColor} strokeWidth="3" />

            {/* Orbiting Satellite Data Nodes */}
            <circle cx="400" cy="20" r="6" fill="#22d3ee" style={{ filter: 'drop-shadow(0 0 8px #22d3ee)' }} />
            <circle cx="780" cy="400" r="5" fill="#f472b6" style={{ filter: 'drop-shadow(0 0 8px #f472b6)' }} />
            <circle cx="400" cy="780" r="6" fill="#a855f7" style={{ filter: 'drop-shadow(0 0 8px #a855f7)' }} />
            <circle cx="20" cy="400" r="5" fill="#34d399" style={{ filter: 'drop-shadow(0 0 8px #34d399)' }} />
          </svg>

          {/* Reverse Orbit Counter-Spin Ring */}
          <div className="absolute inset-12 animate-[spin_30s_linear_infinite_reverse] opacity-80">
            <svg viewBox="0 0 600 600" className="w-full h-full">
              <circle
                cx="300"
                cy="300"
                r="220"
                fill="none"
                stroke="url(#orbitGradCyan)"
                strokeWidth="2.5"
                strokeDasharray="60 40 10 40"
              />
              <circle
                cx="300"
                cy="300"
                r="140"
                fill="none"
                stroke="#67e8f9"
                strokeWidth="1.5"
                strokeDasharray="8 16"
              />
              {/* Planetary Nodes */}
              <circle cx="520" cy="300" r="7" fill="#67e8f9" style={{ filter: 'drop-shadow(0 0 10px #67e8f9)' }} />
              <circle cx="80" cy="300" r="5" fill="#ec4899" style={{ filter: 'drop-shadow(0 0 10px #ec4899)' }} />
            </svg>
          </div>
        </div>
      </div>

      {/* 4. Hexagonal Nano-Lattice Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(${currentTheme.accentColor} 1.5px, transparent 1.5px), radial-gradient(#a855f7 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
          backgroundPosition: '0 0, 22px 22px',
        }}
      />

      {/* 5. Trending Cyber Robotic Telemetry HUD Badges in Upper Corners */}
      <div className="hidden xl:block absolute top-20 left-8 text-[10px] font-mono space-y-1.5 backdrop-blur-md bg-slate-950/70 p-3 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
        <div className="flex items-center gap-2 text-cyan-300 font-bold">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>AI ROBOTIC MENTOR // ACTIVE HUD</span>
        </div>
        <div className="text-slate-400 flex items-center justify-between gap-4">
          <span>THEME:</span>
          <span className="text-cyan-200 font-bold">{currentTheme.name}</span>
        </div>
        <div className="text-slate-400 flex items-center justify-between gap-4">
          <span>CONTEXT:</span>
          <span className="text-purple-300 font-bold uppercase">{portal} PORTAL</span>
        </div>
        <div className="w-full h-0.5 bg-gradient-to-r from-cyan-500/60 to-transparent my-1" />
        <div className="text-emerald-400 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          <span>Autonomous Next-Gen EdTech v4.9</span>
        </div>
      </div>

      <div className="hidden xl:block absolute top-20 right-8 text-[10px] font-mono text-right space-y-1.5 backdrop-blur-md bg-slate-950/70 p-3 rounded-2xl border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
        <div className="flex items-center justify-end gap-2 text-purple-300 font-bold">
          <span>REAL-TIME COGNITIVE RADAR</span>
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
        </div>
        <div className="text-slate-400">STAR Evaluator • Spaced Retrieval (1-7-21-60d)</div>
        <div className="text-slate-400">Zero-Trust Multilingual A2A Mesh</div>
        <div className="w-full h-0.5 bg-gradient-to-l from-purple-500/60 to-transparent my-1 ml-auto" />
        <div className="text-cyan-400 font-medium">Smart AI Education Matrix • 100% Active</div>
      </div>

      {/* 6. Dynamic Canvas Mesh */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

/**
 * Interactive Background Theme Switcher Component
 * Gives users immediate one-click power to change the AI background
 */
export const BackgroundThemeSelector: React.FC<{
  currentTheme: BackgroundThemeId;
  onSelectTheme: (theme: BackgroundThemeId) => void;
}> = ({ currentTheme, onSelectTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block z-30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-950/90 hover:bg-slate-900 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 px-3.5 py-1.5 rounded-2xl font-mono text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer group"
        title="Customize Next-Gen AI Smart Education Background"
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
        <span className="font-bold flex items-center gap-1.5">
          <span>AI Theme:</span>
          <span className="text-white bg-cyan-950/80 px-2 py-0.5 rounded-lg border border-cyan-500/40">
            {BACKGROUND_THEMES[currentTheme]?.icon} {BACKGROUND_THEMES[currentTheme]?.shortLabel}
          </span>
        </span>
        <Wand2 className="w-3 h-3 text-pink-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-950/95 border-2 border-cyan-500/60 rounded-3xl p-3.5 shadow-[0_0_40px_rgba(6,182,212,0.5)] backdrop-blur-2xl z-50 space-y-2 animate-fade-in font-sans">
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2 px-1">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>Next-Gen AI Background Studio</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-500/40">
                5 AI Presets
              </span>
            </div>

            <p className="text-[11px] text-slate-300 px-1 font-sans">
              Select an attractive futuristic background suited for smart AI robotics and interactive engineering education:
            </p>

            <div className="space-y-1.5 pt-1">
              {(Object.keys(BACKGROUND_THEMES) as BackgroundThemeId[]).map((tId) => {
                const theme = BACKGROUND_THEMES[tId];
                const isSelected = currentTheme === tId;
                return (
                  <button
                    key={tId}
                    onClick={() => {
                      onSelectTheme(tId);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer group ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/90 to-purple-950/90 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] ring-1 ring-cyan-400'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/90 hover:border-cyan-500/50 hover:text-white'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border border-cyan-500/40 shadow relative">
                      <img
                        src={theme.imageUrl}
                        alt={theme.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <span className="absolute bottom-0.5 right-0.5 text-xs drop-shadow">
                        {theme.icon}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono font-bold truncate text-white">
                          {theme.name}
                        </h4>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 truncate font-sans">
                        {theme.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
