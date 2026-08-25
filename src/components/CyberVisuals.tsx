import React, { useState } from 'react';

/**
 * Nexus Autonomous 3D Cyberpunk & Robotic Vectors
 * Crafted for EduAgent AST - Autonomous Next-Gen EdTech Portal
 */

// 1. VR Student Avatar (Mecha cyber-suit, glowing dual-band VR visor & high-precision laser stylus)
export const VRStudentAvatar: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 320"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Background radial glow */}
      <radialGradient id="vrStudentGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
        <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#020617" stopOpacity="0" />
      </radialGradient>

      {/* Headset Visor Gradient */}
      <linearGradient id="visorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="35%" stopColor="#06b6d4" />
        <stop offset="70%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#818cf8" />
      </linearGradient>

      {/* Stylus Laser Gradient */}
      <linearGradient id="stylusLaser" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>

      {/* Robotic Mecha Armor Suit Gradient */}
      <linearGradient id="mechaSuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0369a1" />
        <stop offset="30%" stopColor="#0f172a" />
        <stop offset="70%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>

      {/* Carbon Fiber Texture Overlay */}
      <linearGradient id="carbonTrim" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>

      {/* Visor Glow Filter */}
      <filter id="neonVisorGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="7" result="blur1" />
        <feGaussianBlur stdDeviation="14" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Ambient Glow */}
    <circle cx="160" cy="160" r="145" fill="url(#vrStudentGlow)" />

    {/* Background Nexus Orbital Ticks */}
    <circle cx="160" cy="160" r="130" stroke="#06b6d4" strokeWidth="1" strokeDasharray="6 14" opacity="0.3" />
    <circle cx="160" cy="160" r="110" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="3 8" opacity="0.4" />

    {/* Robotic Shoulder Armor Plates */}
    <path
      d="M36 310 C36 235, 95 210, 138 206 L182 206 C225 210, 284 235, 284 310 Z"
      fill="url(#mechaSuitGrad)"
      stroke="#0284c7"
      strokeWidth="1.5"
    />

    {/* Mecha Collar Armor Plates & Servo Joints */}
    <polygon points="138,206 160,246 182,206" fill="#090d16" stroke="#38bdf8" strokeWidth="1.2" />
    <line x1="160" y1="246" x2="160" y2="310" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 2" />

    {/* Shoulder Armor Bevels (Left & Right) */}
    <path d="M50 310 L75 240 L105 230 L80 310 Z" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1" opacity="0.8" />
    <path d="M270 310 L245 240 L215 230 L240 310 Z" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1" opacity="0.8" />

    {/* Robotic Neck Joint with Cyber Conduits */}
    <path d="M142 175 L142 215 L178 215 L178 175 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
    <line x1="148" y1="180" x2="148" y2="210" stroke="#06b6d4" strokeWidth="1.5" opacity="0.8" />
    <line x1="172" y1="180" x2="172" y2="210" stroke="#06b6d4" strokeWidth="1.5" opacity="0.8" />

    {/* Student Cybernetic Head Profile */}
    <ellipse cx="160" cy="138" rx="46" ry="54" fill="#080c16" stroke="#38bdf8" strokeWidth="1" />

    {/* Modern Cybernetic Hair Contour */}
    <path
      d="M118 128 C108 78, 172 56, 206 88 C218 102, 212 128, 206 138 C196 108, 162 82, 128 108 Z"
      fill="#0c1322"
      stroke="#60a5fa"
      strokeWidth="1.2"
    />

    {/* VR Headset Mount Straps & Tech Nodes */}
    <path d="M114 133 L126 136 L126 148 L114 145 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
    <path d="M194 136 L206 133 L206 145 L194 148 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
    <circle cx="112" cy="139" r="4" fill="#090d16" stroke="#22d3ee" strokeWidth="1" />
    <circle cx="208" cy="139" r="4" fill="#090d16" stroke="#22d3ee" strokeWidth="1" />

    {/* 3D Angular Sleek Mecha VR Visor Frame */}
    <path
      d="M120 123 L200 123 C208 123, 214 131, 210 150 L204 163 C200 168, 192 170, 182 170 L138 170 C128 170, 120 168, 116 163 L110 150 C106 131, 112 123, 120 123 Z"
      fill="#020617"
      stroke="#22d3ee"
      strokeWidth="2.5"
    />

    {/* Glowing Neon Visor Screen with HUD */}
    <path
      d="M125 130 L195 130 C199 130, 203 134, 201 146 L197 156 C195 160, 189 162, 181 162 L139 162 C131 162, 125 160, 123 156 L119 146 C117 134, 121 130, 125 130 Z"
      fill="url(#visorGradient)"
      filter="url(#neonVisorGlow)"
    />

    {/* Specular Highlight Sheen */}
    <line x1="132" y1="135" x2="188" y2="135" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
    <line x1="136" y1="141" x2="175" y2="141" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

    {/* Visor HUD Mini Telemetry Lines */}
    <line x1="140" y1="152" x2="152" y2="152" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
    <circle cx="156" cy="152" r="1.5" fill="#ffffff" />
    <line x1="164" y1="152" x2="180" y2="152" stroke="#ffffff" strokeWidth="1" opacity="0.8" />

    {/* Robotic Stylus Arm & High-Precision Holographic Laser Pen */}
    <g transform="translate(196, 172) rotate(-24)">
      {/* Carbon Hand & Forearm */}
      <path d="M-10 60 L14 14 L26 17 L10 65 Z" fill="#0f172a" stroke="#0284c7" strokeWidth="1.2" />
      <circle cx="20" cy="14" r="7.5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />

      {/* Cyber Stylus Body */}
      <polygon points="20,10 88,-42 92,-38 24,16" fill="#334155" stroke="#38bdf8" strokeWidth="1.2" />
      
      {/* High-Energy Glowing Stylus Plasma Tip */}
      <polygon points="88,-42 106,-54 92,-38" fill="url(#stylusLaser)" filter="url(#neonVisorGlow)" />
      <circle cx="104" cy="-52" r="3.5" fill="#ffffff" />
      
      {/* Laser Particle Trail & Crosshair */}
      <line x1="106" y1="-54" x2="142" y2="-78" stroke="#22d3ee" strokeWidth="2" strokeDasharray="3 3" opacity="0.9" />
      <circle cx="142" cy="-78" r="4.5" fill="#67e8f9" filter="url(#neonVisorGlow)" />
      <circle cx="142" cy="-78" r="9" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
    </g>

    {/* Floating HUD Telemetry Readouts */}
    <rect x="42" y="65" width="45" height="2" fill="#06b6d4" opacity="0.8" />
    <rect x="42" y="71" width="30" height="2" fill="#06b6d4" opacity="0.5" />
    <rect x="42" y="77" width="38" height="2" fill="#06b6d4" opacity="0.6" />

    <circle cx="255" cy="65" r="2.5" fill="#38bdf8" opacity="0.9" />
    <circle cx="270" cy="80" r="3" fill="#06b6d4" opacity="0.7" />
    <circle cx="250" cy="95" r="2" fill="#22d3ee" opacity="0.9" />
  </svg>
);

// 2. Teacher Robot Avatar (Cutting-Edge Mecha Android with glowing cyan eyes, magenta accents & chest reactor)
export const TeacherRobotAvatar: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 320"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Background Magenta / Violet Glow */}
      <radialGradient id="botGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.45" />
        <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#020617" stopOpacity="0" />
      </radialGradient>

      {/* Titanium White Mecha Shell */}
      <linearGradient id="whiteShell" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="45%" stopColor="#e2e8f0" />
        <stop offset="85%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>

      {/* Deep Obsidian Face Screen */}
      <linearGradient id="visorBlack" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#090d16" />
        <stop offset="100%" stopColor="#010409" />
      </linearGradient>

      {/* Eye & Reactor Glow Filter */}
      <filter id="eyeGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" result="blur1" />
        <feGaussianBlur stdDeviation="10" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Ambient Glow */}
    <circle cx="160" cy="160" r="145" fill="url(#botGlow)" />

    {/* Floating Magnetic Shadow Ring */}
    <ellipse cx="160" cy="285" rx="65" ry="12" fill="#ec4899" opacity="0.3" filter="url(#eyeGlow)" />

    {/* Mecha Ear Pods / Quantum Communication Transceivers */}
    <rect x="74" y="108" width="18" height="38" rx="9" fill="url(#whiteShell)" stroke="#ec4899" strokeWidth="2" />
    <circle cx="83" cy="127" r="4.5" fill="#06b6d4" filter="url(#eyeGlow)" />

    <rect x="228" y="108" width="18" height="38" rx="9" fill="url(#whiteShell)" stroke="#ec4899" strokeWidth="2" />
    <circle cx="237" cy="127" r="4.5" fill="#06b6d4" filter="url(#eyeGlow)" />

    {/* Top High-Gain Beacon Antenna */}
    <path d="M160 68 L160 46" stroke="url(#whiteShell)" strokeWidth="4" strokeLinecap="round" />
    <circle cx="160" cy="42" r="7.5" fill="#ec4899" filter="url(#eyeGlow)" />
    <circle cx="160" cy="42" r="3" fill="#ffffff" />

    {/* Robot Head (Rounded Mecha Shell with Chamfered Precision) */}
    <rect
      x="84"
      y="62"
      width="152"
      height="128"
      rx="44"
      fill="url(#whiteShell)"
      stroke="#ec4899"
      strokeWidth="2.5"
    />

    {/* OLED Visor Screen */}
    <rect
      x="98"
      y="78"
      width="124"
      height="98"
      rx="32"
      fill="url(#visorBlack)"
      stroke="#1e293b"
      strokeWidth="2"
    />

    {/* Emotive Glowing Cyan Eyes */}
    <g filter="url(#eyeGlow)">
      {/* Left Eye */}
      <rect x="120" y="108" width="26" height="34" rx="13" fill="#22d3ee" />
      <circle cx="130" cy="116" r="4.5" fill="#ffffff" />

      {/* Right Eye */}
      <rect x="174" y="108" width="26" height="34" rx="13" fill="#22d3ee" />
      <circle cx="184" cy="116" r="4.5" fill="#ffffff" />
    </g>

    {/* Emotive Cheerful Cheeks */}
    <ellipse cx="112" cy="148" rx="7" ry="3.5" fill="#f43f5e" opacity="0.7" />
    <ellipse cx="208" cy="148" rx="7" ry="3.5" fill="#f43f5e" opacity="0.7" />

    {/* Robotic Articulated Neck Joint */}
    <rect x="144" y="190" width="32" height="14" rx="6" fill="#334155" stroke="#ec4899" strokeWidth="1" />

    {/* Mecha Android Torso / Chassis */}
    <path
      d="M108 202 L212 202 C228 202, 232 222, 224 252 L214 268 C208 274, 194 278, 180 278 L140 278 C126 278, 112 274, 106 268 L96 252 C88 222, 92 202, 108 202 Z"
      fill="url(#whiteShell)"
      stroke="#ec4899"
      strokeWidth="2.5"
    />

    {/* Chest Arc Reactor Core (Nexus Energy Matrix) */}
    <circle cx="160" cy="238" r="16" fill="#090d16" stroke="#22d3ee" strokeWidth="2" />
    <circle cx="160" cy="238" r="10" fill="#ec4899" filter="url(#eyeGlow)" />
    <polygon points="160,229 168,238 160,247 152,238" fill="#ffffff" />

    {/* Floating Magnetic Articulated Arms (Left & Right) */}
    <g transform="translate(66, 204) rotate(16)">
      <rect x="0" y="0" width="20" height="40" rx="10" fill="url(#whiteShell)" stroke="#ec4899" strokeWidth="2" />
      <circle cx="10" cy="30" r="4.5" fill="#334155" />
    </g>

    <g transform="translate(234, 204) rotate(-16)">
      <rect x="0" y="0" width="20" height="40" rx="10" fill="url(#whiteShell)" stroke="#ec4899" strokeWidth="2" />
      <circle cx="10" cy="30" r="4.5" fill="#334155" />
    </g>
  </svg>
);

// 3. Parent Network Avatar (Holographic Robotic Quantum Nodal Matrix)
export const ParentNetworkAvatar: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 320 320"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Background Purple / Indigo Radial Glow */}
      <radialGradient id="networkGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
        <stop offset="60%" stopColor="#6366f1" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#020617" stopOpacity="0" />
      </radialGradient>

      {/* Laser Glow Filter */}
      <filter id="purpleLaserGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Ambient Glow */}
    <circle cx="160" cy="160" r="145" fill="url(#networkGlow)" />

    {/* Outer Quantum Orbit Rings */}
    <circle cx="160" cy="160" r="120" stroke="#a855f7" strokeWidth="1.2" strokeDasharray="8 8" opacity="0.45" />
    <circle cx="160" cy="160" r="85" stroke="#06b6d4" strokeWidth="1" strokeDasharray="5 5" opacity="0.55" />

    {/* Interconnected Holographic Laser Conduits */}
    <g filter="url(#purpleLaserGlow)" strokeWidth="2">
      <line x1="160" y1="140" x2="90" y2="85" stroke="#a855f7" />
      <line x1="160" y1="140" x2="230" y2="85" stroke="#06b6d4" />
      <line x1="160" y1="140" x2="70" y2="185" stroke="#22d3ee" />
      <line x1="160" y1="140" x2="250" y2="185" stroke="#c084fc" />
      <line x1="160" y1="140" x2="160" y2="245" stroke="#a855f7" />

      {/* Outer Orbit Interlinks */}
      <line x1="90" y1="85" x2="230" y2="85" stroke="#a855f7" strokeOpacity="0.6" strokeDasharray="4 4" />
      <line x1="90" y1="85" x2="70" y2="185" stroke="#06b6d4" strokeOpacity="0.6" />
      <line x1="230" y1="85" x2="250" y2="185" stroke="#a855f7" strokeOpacity="0.6" />
      <line x1="70" y1="185" x2="160" y2="245" stroke="#c084fc" strokeOpacity="0.6" />
      <line x1="250" y1="185" x2="160" y2="245" stroke="#22d3ee" strokeOpacity="0.6" />
    </g>

    {/* Node 1: Student Satellite Node (Top-Left) */}
    <g transform="translate(90, 85)">
      <circle cx="0" cy="0" r="23" fill="#090d16" stroke="#06b6d4" strokeWidth="2" />
      <circle cx="0" cy="0" r="18" fill="#0891b2" fillOpacity="0.25" />
      <circle cx="0" cy="-4" r="6" fill="#22d3ee" />
      <path d="M-9 10 C-9 4, 9 4, 9 10 Z" fill="#22d3ee" />
    </g>

    {/* Node 2: Teacher Satellite Node (Top-Right) */}
    <g transform="translate(230, 85)">
      <circle cx="0" cy="0" r="23" fill="#090d16" stroke="#a855f7" strokeWidth="2" />
      <circle cx="0" cy="0" r="18" fill="#9333ea" fillOpacity="0.25" />
      <circle cx="0" cy="-4" r="6" fill="#c084fc" />
      <path d="M-9 10 C-9 4, 9 4, 9 10 Z" fill="#c084fc" />
    </g>

    {/* Node 3: School / Admin Node (Mid-Left) */}
    <g transform="translate(70, 185)">
      <circle cx="0" cy="0" r="21" fill="#090d16" stroke="#22d3ee" strokeWidth="2" />
      <circle cx="0" cy="0" r="16" fill="#06b6d4" fillOpacity="0.25" />
      <circle cx="0" cy="-3" r="5" fill="#67e8f9" />
      <path d="M-7 9 C-7 4, 7 4, 7 9 Z" fill="#67e8f9" />
    </g>

    {/* Node 4: AI Telemetry Node (Mid-Right) */}
    <g transform="translate(250, 185)">
      <circle cx="0" cy="0" r="21" fill="#090d16" stroke="#c084fc" strokeWidth="2" />
      <circle cx="0" cy="0" r="16" fill="#a855f7" fillOpacity="0.25" />
      <circle cx="0" cy="-3" r="5" fill="#e9d5ff" />
      <path d="M-7 9 C-7 4, 7 4, 7 9 Z" fill="#e9d5ff" />
    </g>

    {/* Node 5: Family Guardian Node (Bottom-Center) */}
    <g transform="translate(160, 245)">
      <circle cx="0" cy="0" r="23" fill="#090d16" stroke="#ec4899" strokeWidth="2" />
      <circle cx="0" cy="0" r="18" fill="#db2777" fillOpacity="0.25" />
      <circle cx="0" cy="-4" r="6" fill="#f472b6" />
      <path d="M-9 10 C-9 4, 9 4, 9 10 Z" fill="#f472b6" />
    </g>

    {/* Central Core: Autonomous Parent Guardian Quantum Nexus */}
    <g transform="translate(160, 140)">
      <circle cx="0" cy="0" r="40" fill="#090d16" stroke="#a855f7" strokeWidth="3" filter="url(#purpleLaserGlow)" />
      <circle cx="0" cy="0" r="34" fill="url(#networkGlow)" />

      {/* Holographic Parent & Child Silhouette */}
      <circle cx="-5" cy="-8" r="8" fill="#ffffff" />
      <path d="M-17 12 C-17 3, 7 3, 7 12 Z" fill="#ffffff" />
      <circle cx="10" cy="-2" r="5.5" fill="#38bdf8" />
      <path d="M2 13 C2 6, 18 6, 18 13 Z" fill="#38bdf8" />

      {/* Rotating Cyber Telemetry Ring */}
      <circle cx="0" cy="0" r="38" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="6 4" />
    </g>
  </svg>
);

// 4. 3D Faceted Glowing Crystal Icons
export const Crystal3DIcon: React.FC<{
  type: 'cyan' | 'blue' | 'purple' | 'magenta' | 'emerald' | 'amber';
  className?: string;
}> = ({ type, className = 'w-6 h-6' }) => {
  const getColors = () => {
    switch (type) {
      case 'cyan':
        return { face1: '#22d3ee', face2: '#06b6d4', face3: '#0891b2', edge: '#67e8f9' };
      case 'blue':
        return { face1: '#60a5fa', face2: '#3b82f6', face3: '#1d4ed8', edge: '#93c5fd' };
      case 'purple':
        return { face1: '#c084fc', face2: '#a855f7', face3: '#7e22ce', edge: '#e9d5ff' };
      case 'magenta':
        return { face1: '#f472b6', face2: '#ec4899', face3: '#be185d', edge: '#fbcfe8' };
      case 'emerald':
        return { face1: '#34d399', face2: '#10b981', face3: '#047857', edge: '#a7f3d0' };
      case 'amber':
      default:
        return { face1: '#fbbf24', face2: '#f59e0b', face3: '#b45309', edge: '#fde68a' };
    }
  };

  const colors = getColors();

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={`crystalGlow-${type}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#crystalGlow-${type})`}>
        {/* Top Facet */}
        <polygon points="32,6 56,22 32,32 8,22" fill={colors.face1} stroke={colors.edge} strokeWidth="1.2" />
        {/* Left Facet */}
        <polygon points="8,22 32,32 32,58 8,46" fill={colors.face2} stroke={colors.edge} strokeWidth="1.2" />
        {/* Right Facet */}
        <polygon points="32,32 56,22 56,46 32,58" fill={colors.face3} stroke={colors.edge} strokeWidth="1.2" />
        {/* Center Sparkle Core */}
        <circle cx="32" cy="32" r="3" fill="#ffffff" />
      </g>
    </svg>
  );
};

// 5. Robotic Circuit Wings (Cyberpunk circuit lines on sides of hero title)
export const CircuitWingLeft: React.FC<{ className?: string }> = ({ className = 'w-24 h-12' }) => (
  <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 20 L40 20 L55 5 L95 5 L105 20 L120 20"
      stroke="#06b6d4"
      strokeWidth="2"
      strokeOpacity="0.85"
    />
    <circle cx="40" cy="20" r="3.5" fill="#06b6d4" />
    <circle cx="95" cy="5" r="3.5" fill="#06b6d4" />
    <path d="M20 20 L30 35 L75 35" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.7" />
    <circle cx="75" cy="35" r="3" fill="#a855f7" />
  </svg>
);

export const CircuitWingRight: React.FC<{ className?: string }> = ({ className = 'w-24 h-12' }) => (
  <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M120 20 L80 20 L65 5 L25 5 L15 20 L0 20"
      stroke="#06b6d4"
      strokeWidth="2"
      strokeOpacity="0.85"
    />
    <circle cx="80" cy="20" r="3.5" fill="#06b6d4" />
    <circle cx="25" cy="5" r="3.5" fill="#06b6d4" />
    <path d="M100 20 L90 35 L45 35" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.7" />
    <circle cx="45" cy="35" r="3" fill="#a855f7" />
  </svg>
);

// 6. Robotic Equalizer Wave Bars (Animated live audio/servo telemetry)
export const RoboticEqualizer: React.FC<{
  active?: boolean;
  color?: 'cyan' | 'magenta' | 'purple' | 'emerald';
  className?: string;
}> = ({ active = true, color = 'cyan', className = 'h-4' }) => {
  const getColorClass = () => {
    switch (color) {
      case 'magenta':
        return 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]';
      case 'purple':
        return 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]';
      case 'emerald':
        return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]';
      case 'cyan':
      default:
        return 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]';
    }
  };

  const bg = getColorClass();

  return (
    <div className={`flex items-end gap-1 ${className}`}>
      {[40, 75, 55, 90, 65, 80, 45].map((height, i) => (
        <span
          key={i}
          className={`w-0.5 rounded-full ${bg} transition-all duration-300 ${
            active ? 'animate-pulse' : 'opacity-30'
          }`}
          style={{
            height: active ? `${height}%` : '20%',
            animationDelay: `${i * 120}ms`,
          }}
        />
      ))}
    </div>
  );
};

// 7. Interactive Robotic Biometric / Neural Link Scanner Pad (For Login & Auth)
export const RoboticBiometricScanner: React.FC<{
  label?: string;
  subLabel?: string;
  themeColor?: 'cyan' | 'pink' | 'purple';
  scanning?: boolean;
  onScan?: () => void;
}> = ({
  label = 'BIOMETRIC SCAN',
  subLabel = 'TOUCH TO ACTIVATE',
  themeColor = 'cyan',
  scanning = false,
  onScan,
}) => {
  const [activeScan, setActiveScan] = useState(scanning);

  const colors = {
    cyan: {
      border: 'border-cyan-400',
      text: 'text-cyan-300',
      laser: 'bg-cyan-400 shadow-[0_0_12px_#22d3ee]',
      glow: 'shadow-[0_0_25px_rgba(6,182,212,0.6)]',
      bg: 'bg-cyan-950/40 hover:bg-cyan-900/50',
      ring: 'stroke-cyan-400',
    },
    pink: {
      border: 'border-pink-500',
      text: 'text-pink-300',
      laser: 'bg-pink-400 shadow-[0_0_12px_#f472b6]',
      glow: 'shadow-[0_0_25px_rgba(236,72,153,0.6)]',
      bg: 'bg-pink-950/40 hover:bg-pink-900/50',
      ring: 'stroke-pink-400',
    },
    purple: {
      border: 'border-purple-500',
      text: 'text-purple-300',
      laser: 'bg-purple-400 shadow-[0_0_12px_#c084fc]',
      glow: 'shadow-[0_0_25px_rgba(168,85,247,0.6)]',
      bg: 'bg-purple-950/40 hover:bg-purple-900/50',
      ring: 'stroke-purple-400',
    },
  }[themeColor];

  const handleClick = () => {
    setActiveScan(true);
    if (onScan) onScan();
    setTimeout(() => {
      setActiveScan(false);
    }, 1200);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative w-full p-2.5 rounded-2xl border-2 ${colors.border} ${colors.bg} ${colors.glow} backdrop-blur-xl flex items-center justify-between gap-3 font-mono transition-all duration-300 group cursor-pointer overflow-hidden active:scale-95`}
    >
      {/* Laser Scan Sweep Animation */}
      {activeScan && (
        <div className={`absolute inset-x-0 h-1 ${colors.laser} animate-[pulse_0.4s_ease-in-out_infinite]`} style={{ top: '50%', transform: 'translateY(-50%)' }} />
      )}

      {/* Cyber Corner Markers */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white/60" />
      <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-white/60" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-white/60" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/60" />

      <div className="flex items-center gap-2.5">
        {/* Biometric Thumbprint / Retina Sensor */}
        <div className="relative w-8 h-8 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:border-white transition-colors">
          <svg viewBox="0 0 24 24" className={`w-5 h-5 ${colors.text}`} fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
            <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
            <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
            <path d="M2 12a10 10 0 0 1 18-6" />
            <path d="M2 16h.01" />
            <path d="M21.8 16c.2-2 .131-5.354 0-6" />
            <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
            <path d="M8.65 22c.21-.66.45-1.32.57-2" />
            <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
          </svg>
          {activeScan && (
            <span className="absolute inset-0 rounded-xl bg-white/20 animate-ping pointer-events-none" />
          )}
        </div>

        <div className="text-left">
          <div className={`text-[11px] font-black tracking-wider ${colors.text}`}>
            {label}
          </div>
          <div className="text-[9px] text-slate-400 font-sans">
            {activeScan ? 'AUTHENTICATING...' : subLabel}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[9px] font-bold px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-300">
        <span className={`w-1.5 h-1.5 rounded-full ${activeScan ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400 animate-pulse'}`} />
        <span>{activeScan ? 'SYNCING' : 'READY'}</span>
      </div>
    </button>
  );
};

// 8. Inside Robotic Telemetry & Pilot HUD Banner (Placed inside Student, Teacher, Parent views)
export const InsideRoboticTelemetryBar: React.FC<{
  portalType: 'STUDENT' | 'TEACHER' | 'PARENT';
  activeEntityName?: string;
  roleBadge?: string;
  telemetryStatus?: string;
}> = ({
  portalType,
  activeEntityName = 'Jordan Smith',
  roleBadge = 'Engineering Cadet',
  telemetryStatus = 'ASTRO-X ROBOT ONLINE // 0.00ms LATENCY',
}) => {
  const config = {
    STUDENT: {
      color: 'text-cyan-300',
      border: 'border-cyan-500/40',
      bg: 'from-slate-950/95 via-cyan-950/20 to-slate-950/95',
      badgeBg: 'bg-cyan-950/90 text-cyan-300 border-cyan-500/50',
      avatarIcon: '🤖',
      mechaId: 'MECHA-PILOT // STU-X9',
      coreName: 'ASTRO-X AI MENTOR',
    },
    TEACHER: {
      color: 'text-pink-300',
      border: 'border-pink-500/40',
      bg: 'from-slate-950/95 via-pink-950/20 to-slate-950/95',
      badgeBg: 'bg-pink-950/90 text-pink-300 border-pink-500/50',
      avatarIcon: '🦾',
      mechaId: 'NEXUS-COMMAND // TEA-CORE',
      coreName: 'BIGQUERY TELEMETRY RADAR',
    },
    PARENT: {
      color: 'text-purple-300',
      border: 'border-purple-500/40',
      bg: 'from-slate-950/95 via-purple-950/20 to-slate-950/95',
      badgeBg: 'bg-purple-950/90 text-purple-300 border-purple-500/50',
      avatarIcon: '🌐',
      mechaId: 'SYNAPSE-GUARDIAN // PAR-V4',
      coreName: 'MULTILINGUAL VOICE SYNAPSE',
    },
  }[portalType];

  return (
    <div className={`w-full rounded-2xl bg-gradient-to-r ${config.bg} border-2 ${config.border} p-3.5 shadow-[0_0_30px_rgba(6,182,212,0.2)] backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono relative overflow-hidden`}>
      {/* High-tech corner cut brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />

      {/* Left: Robotic Pilot Badge */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] relative">
          <span>{config.avatarIcon}</span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {config.mechaId}
            </span>
            <span className={`text-[9px] px-2 py-0.2 rounded border font-bold ${config.badgeBg}`}>
              {config.coreName}
            </span>
          </div>
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <span>{activeEntityName}</span>
            <span className="text-xs font-normal text-slate-400">({roleBadge})</span>
          </div>
        </div>
      </div>

      {/* Right: Live Telemetry Gauges & Equalizer */}
      <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
        <div className="hidden lg:flex items-center gap-3 text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NEURAL SYNC: <strong className="text-emerald-300">99.8%</strong></span>
          </div>
          <span>•</span>
          <div>
            CORE: <strong className="text-cyan-300">GEMINI 3.7 FLASH</strong>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 text-[10px]">
          <RoboticEqualizer active={true} color={portalType === 'STUDENT' ? 'cyan' : portalType === 'TEACHER' ? 'magenta' : 'purple'} className="h-3.5" />
          <span className="text-slate-300 font-bold">{telemetryStatus}</span>
        </div>
      </div>
    </div>
  );
};

// 9. Reusable Mecha Card Container with Futuristic Angle Cuts, Glowing Borders & Corner Brackets
export const MechaCard: React.FC<{
  children: React.ReactNode;
  themeColor?: 'cyan' | 'pink' | 'purple' | 'emerald' | 'amber';
  title?: string;
  subTitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  headerAction?: React.ReactNode;
  className?: string;
  id?: string;
}> = ({
  children,
  themeColor = 'cyan',
  title,
  subTitle,
  badge,
  icon,
  headerAction,
  className = '',
  id,
}) => {
  const styles = {
    cyan: {
      border: 'border-cyan-500/40 hover:border-cyan-400',
      glow: 'shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]',
      topLine: 'from-cyan-500 via-cyan-400 to-transparent',
      corner: 'border-cyan-400',
      badge: 'bg-cyan-950/90 text-cyan-300 border-cyan-500/50',
      iconBox: 'bg-cyan-950 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.35)]',
      title: 'text-cyan-300',
    },
    pink: {
      border: 'border-pink-500/40 hover:border-pink-400',
      glow: 'shadow-[0_0_30px_rgba(236,72,153,0.15)] hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]',
      topLine: 'from-pink-500 via-pink-400 to-transparent',
      corner: 'border-pink-400',
      badge: 'bg-pink-950/90 text-pink-300 border-pink-500/50',
      iconBox: 'bg-pink-950 border-pink-500/40 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.35)]',
      title: 'text-pink-300',
    },
    purple: {
      border: 'border-purple-500/40 hover:border-purple-400',
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]',
      topLine: 'from-purple-500 via-purple-400 to-transparent',
      corner: 'border-purple-400',
      badge: 'bg-purple-950/90 text-purple-300 border-purple-500/50',
      iconBox: 'bg-purple-950 border-purple-500/40 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.35)]',
      title: 'text-purple-300',
    },
    emerald: {
      border: 'border-emerald-500/40 hover:border-emerald-400',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]',
      topLine: 'from-emerald-500 via-emerald-400 to-transparent',
      corner: 'border-emerald-400',
      badge: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50',
      iconBox: 'bg-emerald-950 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)]',
      title: 'text-emerald-300',
    },
    amber: {
      border: 'border-amber-500/40 hover:border-amber-400',
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]',
      topLine: 'from-amber-500 via-amber-400 to-transparent',
      corner: 'border-amber-400',
      badge: 'bg-amber-950/90 text-amber-300 border-amber-500/50',
      iconBox: 'bg-amber-950 border-amber-500/40 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.35)]',
      title: 'text-amber-300',
    },
  }[themeColor];

  return (
    <div
      id={id}
      className={`relative bg-slate-950/90 border-2 ${styles.border} ${styles.glow} rounded-2xl p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* High-tech corner cut brackets */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${styles.corner}`} />
      <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${styles.corner}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${styles.corner}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${styles.corner}`} />

      {/* Top energy line */}
      <div className={`absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r ${styles.topLine}`} />

      {/* Card Header if title provided */}
      {(title || icon || headerAction) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-5">
          <div className="flex items-center gap-3">
            {icon && (
              <div className={`p-2.5 rounded-xl border ${styles.iconBox} flex items-center justify-center flex-shrink-0`}>
                {icon}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                {title && (
                  <h3 className={`text-base sm:text-lg font-black font-mono tracking-tight ${styles.title}`}>
                    {title}
                  </h3>
                )}
                {badge && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-bold ${styles.badge}`}>
                    {badge}
                  </span>
                )}
              </div>
              {subTitle && (
                <p className="text-xs text-slate-400 font-sans mt-0.5 leading-relaxed">
                  {subTitle}
                </p>
              )}
            </div>
          </div>

          {headerAction && (
            <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
              {headerAction}
            </div>
          )}
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// 10. Autonomous Robotic AI Co-Pilot HUD (Interactive 3D Robot Assistant for Student, Teacher & Parent)
export const RoboticAIPilotCard: React.FC<{
  mentorName?: string;
  mentorRole?: string;
  statusText?: string;
  neuralSyncPct?: number;
  speechBubble?: string;
  themeColor?: 'cyan' | 'pink' | 'purple';
  quickActions?: Array<{ label: string; onClick: () => void }>;
  className?: string;
}> = ({
  mentorName = 'Astro-X Autonomous AI Mentor',
  mentorRole = 'Gemini 3.7 Flash & Vertex AI Co-Pilot',
  statusText = 'Monitoring code AST, architecture topology & STAR interview readiness.',
  neuralSyncPct = 99.8,
  speechBubble = 'Cadet, I have calibrated your real-time learning telemetry. Select an engineering module to begin!',
  themeColor = 'cyan',
  quickActions = [],
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const colors = {
    cyan: {
      border: 'border-cyan-400',
      glow: 'shadow-[0_0_35px_rgba(6,182,212,0.3)]',
      badge: 'bg-cyan-950 text-cyan-300 border-cyan-500/60',
      text: 'text-cyan-300',
      bubbleBg: 'bg-cyan-950/80 border-cyan-500/50 text-cyan-100',
      btn: 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border-cyan-500/40',
    },
    pink: {
      border: 'border-pink-400',
      glow: 'shadow-[0_0_35px_rgba(236,72,153,0.3)]',
      badge: 'bg-pink-950 text-pink-300 border-pink-500/60',
      text: 'text-pink-300',
      bubbleBg: 'bg-pink-950/80 border-pink-500/50 text-pink-100',
      btn: 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border-pink-500/40',
    },
    purple: {
      border: 'border-purple-400',
      glow: 'shadow-[0_0_35px_rgba(168,85,247,0.3)]',
      badge: 'bg-purple-950 text-purple-300 border-purple-500/60',
      text: 'text-purple-300',
      bubbleBg: 'bg-purple-950/80 border-purple-500/50 text-purple-100',
      btn: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border-purple-500/40',
    },
  }[themeColor];

  return (
    <div
      className={`relative bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-slate-950/95 border-2 ${colors.border} ${colors.glow} rounded-3xl p-4 sm:p-5 backdrop-blur-2xl transition-all duration-300 overflow-hidden font-sans ${className}`}
    >
      {/* Circuit Wings Background */}
      <div className="absolute left-0 top-0 bottom-0 w-32 opacity-15 pointer-events-none">
        <CircuitWingLeft className="w-full h-full text-cyan-400" />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-32 opacity-15 pointer-events-none">
        <CircuitWingRight className="w-full h-full text-cyan-400" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: 3D Robot Head & Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
            <VRStudentAvatar className="w-full h-full drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-slate-950" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-black uppercase tracking-wider ${colors.badge}`}>
                AUTONOMOUS ROBOTIC CO-PILOT
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                NEURAL SYNC {neuralSyncPct}%
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white font-mono tracking-tight flex items-center gap-2 mt-0.5">
              <span>{mentorName}</span>
              <span className="text-xs font-normal text-slate-400">({mentorRole})</span>
            </h3>
            <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{statusText}</p>
          </div>
        </div>

        {/* Right: Audio Wave Equalizer & Toggle */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-[10px]">
            <RoboticEqualizer active={true} color={themeColor === 'cyan' ? 'cyan' : themeColor === 'pink' ? 'magenta' : 'purple'} className="h-4" />
            <span className="text-slate-300 font-bold">VOICE CO-PROCESSOR ACTIVE</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all cursor-pointer ${colors.btn}`}
          >
            {isExpanded ? 'Collapse HUD' : 'Expand HUD'}
          </button>
        </div>
      </div>

      {/* Expanded Holographic Speech Bubble & Quick Action Buttons */}
      {isExpanded && (
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 space-y-3">
          <div className={`p-3 rounded-2xl border ${colors.bubbleBg} text-xs leading-relaxed font-mono flex items-start gap-2.5 shadow-inner`}>
            <span className="text-base flex-shrink-0">💬</span>
            <div className="flex-1">
              <span className="font-bold text-white uppercase tracking-wider block text-[10px] mb-0.5">
                ASTRO-X AI GUIDANCE DIRECTIVE:
              </span>
              <span>{speechBubble}</span>
            </div>
          </div>

          {quickActions.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Quick Neural Directives:
              </span>
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={action.onClick}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 ${colors.btn}`}
                >
                  ⚡ {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 11. Futuristic Circular Telemetry Dial (Gauge with glowing arcs & metric scores)
export const MechaTelemetryDial: React.FC<{
  value: number;
  max?: number;
  label: string;
  subLabel?: string;
  themeColor?: 'cyan' | 'pink' | 'emerald' | 'purple' | 'amber';
  size?: number;
}> = ({
  value,
  max = 100,
  label,
  subLabel,
  themeColor = 'cyan',
  size = 110,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const strokeWidth = 8;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colors = {
    cyan: { stroke: '#22d3ee', glow: 'drop-shadow(0 0 8px #06b6d4)', text: 'text-cyan-300' },
    pink: { stroke: '#f472b6', glow: 'drop-shadow(0 0 8px #ec4899)', text: 'text-pink-300' },
    emerald: { stroke: '#34d399', glow: 'drop-shadow(0 0 8px #10b981)', text: 'text-emerald-300' },
    purple: { stroke: '#c084fc', glow: 'drop-shadow(0 0 8px #a855f7)', text: 'text-purple-300' },
    amber: { stroke: '#fbbf24', glow: 'drop-shadow(0 0 8px #f59e0b)', text: 'text-amber-300' },
  }[themeColor];

  return (
    <div className="flex flex-col items-center justify-center p-3 font-mono text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active glowing arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{ filter: colors.glow, transition: 'stroke-dashoffset 0.8s ease' }}
          />
        </svg>

        {/* Central Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-xl font-black ${colors.text}`}>{value}%</span>
          <span className="text-[8px] text-slate-400 font-bold uppercase">SCORE</span>
        </div>
      </div>

      <div className="mt-2">
        <div className="text-xs font-bold text-slate-200">{label}</div>
        {subLabel && <div className="text-[10px] text-slate-400">{subLabel}</div>}
      </div>
    </div>
  );
};

// 12. Animated BigQuery Radar Scan Sonar for Teacher Telemetry
export const RoboticRadarVisualizer: React.FC<{
  activeNodes?: number;
  criticalNodes?: number;
  moderateNodes?: number;
  className?: string;
}> = ({
  activeNodes = 200,
  criticalNodes = 2,
  moderateNodes = 1,
  className = '',
}) => {
  return (
    <div className={`relative w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-slate-950 border-2 border-pink-500/50 shadow-[0_0_35px_rgba(236,72,153,0.3)] flex items-center justify-center overflow-hidden font-mono flex-shrink-0 ${className}`}>
      {/* Concentric rings */}
      <div className="absolute w-36 h-36 rounded-full border border-pink-500/30" />
      <div className="absolute w-24 h-24 rounded-full border border-pink-500/40" />
      <div className="absolute w-12 h-12 rounded-full border border-pink-500/50" />

      {/* Axis crosshair */}
      <div className="absolute inset-x-0 h-[1px] bg-pink-500/30" />
      <div className="absolute inset-y-0 w-[1px] bg-pink-500/30" />

      {/* Rotating sweep cone */}
      <div
        className="absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]"
        style={{
          background: 'conic-gradient(from 0deg, rgba(236,72,153,0.4) 0deg, transparent 60deg, transparent 360deg)',
        }}
      />

      {/* Simulated Student Blips */}
      <div className="absolute top-8 left-14 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      <div className="absolute top-12 right-10 w-2 h-2 rounded-full bg-emerald-400" />
      <div className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-emerald-400" />
      
      <div className="absolute top-16 right-16 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shadow-[0_0_10px_#ef4444]" />
      <div className="absolute bottom-8 right-14 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shadow-[0_0_10px_#ef4444]" />

      <div className="absolute bottom-16 left-16 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />

      {/* Center Center Radar Node */}
      <div className="relative z-10 w-4 h-4 rounded-full bg-pink-500 border-2 border-white shadow-[0_0_12px_#ec4899]" />

      {/* Floating Status Tag */}
      <div className="absolute bottom-1 inset-x-0 text-center text-[8px] font-bold text-pink-300 bg-slate-950/80 py-0.5 border-t border-pink-500/40">
        SCAN: {activeNodes} NODES
      </div>
    </div>
  );
};


