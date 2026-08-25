import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, GraduationCap, Bot, Orbit, Cpu, Zap, Eye, Terminal } from 'lucide-react';

interface Props {
  interactive?: boolean;
  className?: string;
  showHoloHUD?: boolean;
  onOrbClick?: () => void;
}

export const SmartEducationRobotScene: React.FC<Props> = ({
  interactive = true,
  className = '',
  showHoloHUD = true,
  onOrbClick,
}) => {
  const [hoveredGalaxy, setHoveredGalaxy] = useState(false);
  const [pulseIndex, setPulseIndex] = useState(0);
  const [activeTelemetry, setActiveTelemetry] = useState('NEURAL_CORE_V4.9');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Canvas starfield & cyber city data streams
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.clientWidth;
      h = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Nebula dust and cyber data packets
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

    const colors = ['#06b6d4', '#38bdf8', '#a855f7', '#ec4899', '#818cf8'];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: Math.random() * 0.02 + 0.005,
        radius: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 160 + 30,
      });
    }

    let t = 0;
    const orbCenterX = w * 0.44;
    const orbCenterY = h * 0.42;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, w, h);

      // 1. Render Swirling Galaxy Particle Vortex at Hologram Center
      particles.forEach((p, idx) => {
        p.angle += p.speed;
        // Spiral orbital motion
        const currDist = p.distance + Math.sin(t + idx) * 8;
        const px = orbCenterX + Math.cos(p.angle) * currDist * 1.3;
        const py = orbCenterY + Math.sin(p.angle) * (currDist * 0.75);

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(t * 2 + idx));
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby galaxy particles
        if (idx % 3 === 0) {
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = 0.18;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(orbCenterX, orbCenterY);
          ctx.stroke();
        }
        ctx.restore();
      });

      // 2. Glowing Core Nebula at Orb Center
      ctx.save();
      const radGrad = ctx.createRadialGradient(
        orbCenterX,
        orbCenterY,
        5,
        orbCenterX,
        orbCenterY,
        140
      );
      radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      radGrad.addColorStop(0.2, 'rgba(6, 182, 212, 0.8)');
      radGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.4)');
      radGrad.addColorStop(0.8, 'rgba(236, 72, 153, 0.15)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(orbCenterX, orbCenterY, 140, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Cyber Circuit Board Floor Pulse (Under Robot)
      const robotPlatformX = w * 0.72;
      const robotPlatformY = h * 0.78;
      ctx.save();
      ctx.strokeStyle = '#06b6d4';
      ctx.globalAlpha = 0.35 + Math.sin(t * 3) * 0.15;
      ctx.lineWidth = 1.5;

      // Isometric glowing floor circuit
      for (let offset = -80; offset <= 80; offset += 30) {
        ctx.beginPath();
        ctx.moveTo(robotPlatformX - 140 + offset, robotPlatformY + offset * 0.4);
        ctx.lineTo(robotPlatformX + 140 + offset, robotPlatformY + offset * 0.4);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(robotPlatformX + offset * 1.5, robotPlatformY - 40);
        ctx.lineTo(robotPlatformX + offset * 1.5 - 60, robotPlatformY + 60);
        ctx.stroke();
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className={`relative w-full h-[480px] sm:h-[540px] md:h-[600px] lg:h-[640px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#030712] via-[#050d21] to-[#02040a] border-2 border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.45)] backdrop-blur-2xl ${className}`}
    >
      {/* 1. Cyber City Background Grid & Vertical Skyscrapers Glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <svg viewBox="0 0 1200 650" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cityTowerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="neonPinkTower" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.9" />
            </linearGradient>
            <pattern id="matrixPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect width="1200" height="650" fill="url(#matrixPattern)" />

          {/* Futuristic Skyline Silhouettes */}
          <g opacity="0.65">
            {/* Left Towers */}
            <rect x="30" y="240" width="45" height="340" fill="url(#cityTowerGrad)" stroke="#06b6d4" strokeWidth="0.8" />
            <rect x="85" y="190" width="55" height="390" fill="url(#cityTowerGrad)" stroke="#38bdf8" strokeWidth="0.8" />
            <rect x="150" y="270" width="40" height="310" fill="url(#neonPinkTower)" stroke="#ec4899" strokeWidth="0.8" />
            <rect x="200" y="210" width="60" height="370" fill="url(#cityTowerGrad)" stroke="#06b6d4" strokeWidth="0.8" />

            {/* Glowing Windows on Towers */}
            <line x1="95" y1="210" x2="130" y2="210" stroke="#67e8f9" strokeWidth="2" strokeDasharray="4 6" />
            <line x1="95" y1="230" x2="130" y2="230" stroke="#67e8f9" strokeWidth="2" strokeDasharray="4 6" />
            <line x1="95" y1="250" x2="130" y2="250" stroke="#67e8f9" strokeWidth="2" strokeDasharray="4 6" />
            <line x1="210" y1="230" x2="250" y2="230" stroke="#ec4899" strokeWidth="2" strokeDasharray="5 5" />
            <line x1="210" y1="260" x2="250" y2="260" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" />

            {/* Right Towers behind robot */}
            <rect x="940" y="230" width="50" height="350" fill="url(#neonPinkTower)" stroke="#ec4899" strokeWidth="0.8" />
            <rect x="1000" y="180" width="60" height="400" fill="url(#cityTowerGrad)" stroke="#06b6d4" strokeWidth="0.8" />
            <rect x="1070" y="260" width="45" height="320" fill="url(#cityTowerGrad)" stroke="#38bdf8" strokeWidth="0.8" />
            <rect x="1125" y="210" width="55" height="370" fill="url(#neonPinkTower)" stroke="#a855f7" strokeWidth="0.8" />
          </g>

          {/* Perspective Cyber Highways / Light Trails */}
          <g stroke="#06b6d4" strokeWidth="1.5" opacity="0.5">
            <line x1="0" y1="520" x2="1200" y2="520" stroke="#38bdf8" strokeWidth="2" />
            <line x1="0" y1="560" x2="1200" y2="560" stroke="#ec4899" strokeWidth="1.5" />
            <line x1="0" y1="610" x2="1200" y2="610" stroke="#06b6d4" strokeWidth="3" />
          </g>
        </svg>
      </div>

      {/* 2. Starfield & Swirling Galaxy Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 3. Floating Holographic "SMART EDUCATION" Neon Sign (Left Upper) */}
      {showHoloHUD && (
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 animate-fade-in pointer-events-auto">
          <div className="relative group p-4 sm:p-5 rounded-2xl bg-slate-950/80 border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.8),inset_0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-xl transition-all duration-300 hover:scale-105">
            
            {/* High-Tech Circuit Corner Brackets */}
            <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-cyan-300" />
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-cyan-300" />
            <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-cyan-300" />
            <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-cyan-300" />

            {/* Glowing Circuit Node Extension Lines */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex items-center">
              <span className="w-4 h-0.5 bg-cyan-400 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
            </div>

            <div className="flex items-center gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl md:text-3xl font-black font-mono tracking-wider text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,1)]">
                    SMART
                  </span>
                </div>
                <div className="text-lg sm:text-2xl md:text-3xl font-black font-mono tracking-widest text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,1)]">
                  EDUCATION
                </div>
              </div>

              {/* Glowing Holographic Graduation Cap */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.8)] group-hover:rotate-6 transition-transform">
                <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2] animate-bounce-slow" />
              </div>
            </div>

            {/* Sub-telemetry under sign */}
            <div className="mt-2 pt-2 border-t border-cyan-500/40 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-cyan-200">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                AUTONOMOUS EDTECH
              </span>
              <span className="text-purple-300 font-bold">V4.9 CORE</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Center Interactive Holographic Galaxy Orb with Concentric HUD Rings */}
      <div
        onClick={onOrbClick}
        onMouseEnter={() => setHoveredGalaxy(true)}
        onMouseLeave={() => setHoveredGalaxy(false)}
        className="absolute top-1/2 left-[38%] sm:left-[44%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 z-10 cursor-pointer group"
        title="Click to interact with the Smart AI Hologram"
      >
        {/* Holographic Gyroscope Concentric Rings */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full animate-[spin_60s_linear_infinite] group-hover:scale-105 transition-transform duration-500"
        >
          <defs>
            <radialGradient id="holoRingGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#02040a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer Segmented HUD Ring */}
          <circle
            cx="200"
            cy="200"
            r="185"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            strokeDasharray="30 15 60 15 15 15"
            className="drop-shadow-[0_0_15px_#06b6d4]"
          />

          {/* Middle Counter-Rotating Telemetry Ring */}
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="#ec4899"
            strokeWidth="1.8"
            strokeDasharray="12 28"
            className="animate-[spin_40s_linear_infinite_reverse] drop-shadow-[0_0_12px_#ec4899]"
          />

          {/* Inner Quantum Resonance Ring */}
          <circle
            cx="200"
            cy="200"
            r="115"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="80 20"
            className="drop-shadow-[0_0_10px_#38bdf8]"
          />

          {/* Crosshairs & Angle Marks */}
          <line x1="200" y1="10" x2="200" y2="35" stroke="#22d3ee" strokeWidth="2.5" />
          <line x1="200" y1="365" x2="200" y2="390" stroke="#22d3ee" strokeWidth="2.5" />
          <line x1="10" y1="200" x2="35" y2="200" stroke="#22d3ee" strokeWidth="2.5" />
          <line x1="365" y1="200" x2="390" y2="200" stroke="#22d3ee" strokeWidth="2.5" />
        </svg>

        {/* Floating Hologram Data Indicators */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-400/80 text-[10px] sm:text-xs font-mono font-black text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.8)] backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-cyan-300 animate-spin-slow" />
            <span>AI GALAXY MATRIX</span>
          </div>
          <p className="text-[9px] font-mono text-cyan-300/80 drop-shadow">
            STAR L6 • BigQuery Telemetry
          </p>
        </div>
      </div>

      {/* 5. Sleek Humanoid AI Robot Character (Standing on Illuminated Glass Circuit Floor) */}
      <div className="absolute bottom-0 right-2 sm:right-6 md:right-12 lg:right-16 w-56 sm:w-72 md:w-84 lg:w-96 h-[400px] sm:h-[480px] md:h-[530px] z-20 pointer-events-none">
        <svg
          viewBox="0 0 380 500"
          className="w-full h-full drop-shadow-[0_0_35px_rgba(6,182,212,0.65)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sleek Chrome Robot Armor Gradient */}
            <linearGradient id="chromeArmorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#e2e8f0" />
              <stop offset="60%" stopColor="#94a3b8" />
              <stop offset="90%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Glowing Cyan Visor & Eyes */}
            <linearGradient id="robotEyeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            {/* Internal Core Arc Reactor */}
            <radialGradient id="chestCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#22d3ee" />
              <stop offset="80%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>

            {/* Joint Servo Carbon */}
            <linearGradient id="jointServo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* Hologram Contact Point Beam */}
            <radialGradient id="touchBeamGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="30%" stopColor="#22d3ee" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#a855f7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Contact Laser Point between Robot Index Finger and Galaxy Hologram */}
          <circle cx="100" cy="180" r="18" fill="url(#touchBeamGlow)" className="animate-pulse" />
          <circle cx="100" cy="180" r="6" fill="#ffffff" />
          <line x1="100" y1="180" x2="60" y2="200" stroke="#67e8f9" strokeWidth="2.5" strokeDasharray="4 2" />
          <line x1="100" y1="180" x2="80" y2="140" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 3" />

          {/* 1. Extended Reaching Left Arm touching the hologram */}
          {/* Upper Arm */}
          <path
            d="M210 170 L155 180 L145 195 L200 188 Z"
            fill="url(#chromeArmorGrad)"
            stroke="#0284c7"
            strokeWidth="1.2"
          />
          {/* Forearm extending towards hologram */}
          <path
            d="M150 185 L108 182 L100 180 L142 195 Z"
            fill="url(#chromeArmorGrad)"
            stroke="#38bdf8"
            strokeWidth="1.2"
          />
          {/* Robotic Hand & Extended Index Finger touching the Holographic Galaxy */}
          <circle cx="102" cy="180" r="5" fill="#e2e8f0" stroke="#0284c7" strokeWidth="1" />
          <polygon points="102,178 96,180 102,183" fill="#ffffff" />

          {/* 2. Robot Head & Cyber Face */}
          <g>
            {/* Cranium / Helmet Contour */}
            <ellipse
              cx="230"
              cy="95"
              rx="28"
              ry="34"
              fill="url(#chromeArmorGrad)"
              stroke="#38bdf8"
              strokeWidth="1.8"
            />

            {/* Sleek Cyan Visor Faceplate */}
            <path
              d="M212 90 Q225 86 248 90 Q244 110 220 114 Z"
              fill="#020617"
              stroke="#22d3ee"
              strokeWidth="2"
            />

            {/* Glowing Cyber Eye Line */}
            <path
              d="M216 94 Q228 92 244 94"
              stroke="url(#robotEyeGlow)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_#22d3ee]"
            />

            {/* Ear Audio Sensors / Antenna Node */}
            <circle cx="204" cy="98" r="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="256" cy="98" r="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />

            {/* Neck Servo Struts with Glowing Fiber Optics */}
            <rect x="224" y="126" width="12" height="18" rx="3" fill="url(#jointServo)" stroke="#64748b" strokeWidth="1" />
            <line x1="227" y1="128" x2="227" y2="142" stroke="#06b6d4" strokeWidth="1.5" />
            <line x1="233" y1="128" x2="233" y2="142" stroke="#06b6d4" strokeWidth="1.5" />
          </g>

          {/* 3. Main Torso / Chassis with Glowing Arc Reactor & RoboS Core */}
          <g>
            {/* Upper Chest Armor Plates */}
            <path
              d="M195 144 L265 144 L275 220 L185 220 Z"
              fill="url(#chromeArmorGrad)"
              stroke="#0284c7"
              strokeWidth="1.8"
            />

            {/* Shoulder Armor Spheres */}
            <circle cx="190" cy="160" r="16" fill="url(#chromeArmorGrad)" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="270" cy="160" r="16" fill="url(#chromeArmorGrad)" stroke="#38bdf8" strokeWidth="1.5" />

            {/* Chest Center Arc Reactor / Energy Core */}
            <circle cx="230" cy="175" r="14" fill="url(#chestCore)" stroke="#67e8f9" strokeWidth="2" className="drop-shadow-[0_0_12px_#06b6d4]" />
            <circle cx="230" cy="175" r="6" fill="#ffffff" />

            {/* Torso Abdominal Ribs & Hydraulics */}
            <path d="M200 220 L260 220 L255 270 L205 270 Z" fill="url(#jointServo)" stroke="#38bdf8" strokeWidth="1.2" />
            <line x1="205" y1="235" x2="255" y2="235" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="208" y1="250" x2="252" y2="250" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Pelvis Joint */}
            <path d="M198 270 L262 270 L250 310 L210 310 Z" fill="url(#chromeArmorGrad)" stroke="#0284c7" strokeWidth="1.5" />
          </g>

          {/* 4. Right Arm (Resting by side) */}
          <path
            d="M272 170 L290 230 L280 290 L268 285 L276 230 L265 175 Z"
            fill="url(#chromeArmorGrad)"
            stroke="#0284c7"
            strokeWidth="1.2"
          />

          {/* 5. Legs & Grounded Stance on Glowing Platform */}
          {/* Left Leg */}
          <g>
            <path d="M210 310 L195 385 L205 450 L220 450 L218 385 L228 310 Z" fill="url(#chromeArmorGrad)" stroke="#0284c7" strokeWidth="1.5" />
            {/* Knee Joint */}
            <circle cx="206" cy="385" r="10" fill="url(#jointServo)" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Foot on illuminated glass */}
            <path d="M190 450 L225 450 L230 465 L180 465 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
          </g>

          {/* Right Leg */}
          <g>
            <path d="M242 310 L252 385 L245 450 L260 450 L268 385 L260 310 Z" fill="url(#chromeArmorGrad)" stroke="#0284c7" strokeWidth="1.5" />
            {/* Knee Joint */}
            <circle cx="260" cy="385" r="10" fill="url(#jointServo)" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Foot on illuminated glass */}
            <path d="M240 450 L275 450 L285 465 L235 465 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
          </g>

          {/* 6. Glowing Glass Circuit Floor Platform (Isometric Under Robot) */}
          <polygon
            points="140,465 330,465 370,490 100,490"
            fill="rgba(6, 182, 212, 0.15)"
            stroke="#22d3ee"
            strokeWidth="2"
            className="drop-shadow-[0_0_20px_#06b6d4]"
          />
          {/* Circuit tracks in the floor */}
          <line x1="160" y1="475" x2="310" y2="475" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="120" y1="485" x2="350" y2="485" stroke="#67e8f9" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 6. Floating Ambient Code & Telemetry HUD Windows in Background */}
      <div className="hidden lg:block absolute bottom-6 left-6 z-20 font-mono text-[10px] space-y-2 bg-slate-950/80 p-3 rounded-2xl border border-cyan-500/40 backdrop-blur-md text-slate-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
        <div className="flex items-center gap-2 text-cyan-300 font-bold border-b border-slate-800 pb-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>ROBOTIC TELEMETRY STREAM</span>
        </div>
        <div className="space-y-1 text-slate-400">
          <p className="text-emerald-400 font-bold">&gt; MODEL: GEMINI 3.7 FLASH // PRO-ACTIVE</p>
          <p>&gt; HOLOGRAPHIC ORB: CONNECTED (120 FPS)</p>
          <p>&gt; INTERACTIVE STAR MATRIX: ACTIVE</p>
          <p className="text-cyan-300">&gt; REAL-TIME RISK TELEMETRY: 0.00ms JITTER</p>
        </div>
      </div>
    </div>
  );
};
