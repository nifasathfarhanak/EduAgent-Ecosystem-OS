import React, { useEffect, useRef } from 'react';

/**
 * Nexus Autonomous Interactive Background
 * Features:
 * - Animated 3D Holographic Gyroscope / Nexus Core
 * - Hexagonal Cyber Lattice with Perspective Grid
 * - Floating Robotic Telemetry Satellites & Coordinate Nodes
 * - Responsive Stardust Particle Mesh
 * - Glowing Cyber-Circuit Energy Beams
 */
export const NexusAutonomousBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    // Particle nodes for Nexus Autonomous Mesh
    const particlesCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#06b6d4', '#3b82f6', '#a855f7', '#ec4899', '#22d3ee'];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle perspective grid lines at bottom
      ctx.save();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.04)';
      ctx.lineWidth = 1;
      const horizonY = height * 0.65;
      const fovCenter = width * 0.5;

      for (let i = -10; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(fovCenter + i * 80, horizonY);
        ctx.lineTo(fovCenter + i * 220, height);
        ctx.stroke();
      }

      for (let y = horizonY; y < height; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Draw animated Nexus Energy Pulses / Beams
      ctx.save();
      const beamX = width * 0.5 + Math.sin(time * 0.5) * 120;
      const gradient = ctx.createRadialGradient(
        beamX,
        180,
        10,
        width * 0.5,
        220,
        Math.min(width * 0.6, 500)
      );
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
      gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.04)');
      gradient.addColorStop(1, 'rgba(2, 6, 23, 0)');
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

          if (dist < 110) {
            ctx.save();
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - dist / 110) * 0.25;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }

        // Draw particle node with mini halo
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
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none bg-[#02040a]">
      {/* 1. Deep Space Nexus Base Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(2,6,23,0.85)_70%,#010308_100%)]" />

      {/* 2. Top-Center Nexus Autonomous Holographic Orb / Core */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none opacity-60">
        <div className="w-full h-full rounded-full bg-gradient-to-b from-cyan-500/20 via-purple-600/10 to-transparent blur-3xl animate-pulse-glow" />
      </div>

      {/* 3. Floating Autonomous HUD Gyro Rings (Center Top) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[650px] opacity-25 pointer-events-none">
        <svg viewBox="0 0 600 600" className="w-full h-full animate-[spin_60s_linear_infinite]">
          <circle
            cx="300"
            cy="300"
            r="260"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1"
            strokeDasharray="12 12"
          />
          <circle
            cx="300"
            cy="300"
            r="220"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1"
            strokeDasharray="6 20"
          />
          <circle
            cx="300"
            cy="300"
            r="170"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="40 10 10 10"
          />
          {/* Compass / Coordinate Ticks */}
          <line x1="300" y1="20" x2="300" y2="40" stroke="#22d3ee" strokeWidth="2" />
          <line x1="300" y1="560" x2="300" y2="580" stroke="#22d3ee" strokeWidth="2" />
          <line x1="20" y1="300" x2="40" y2="300" stroke="#22d3ee" strokeWidth="2" />
          <line x1="560" y1="300" x2="580" y2="300" stroke="#22d3ee" strokeWidth="2" />
        </svg>
      </div>

      {/* 4. Hexagonal Nano-Lattice Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#06b6d4 1.5px, transparent 1.5px), radial-gradient(#a855f7 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      {/* 5. Left & Right Robotic Autonomous Telemetry Corner Readouts */}
      <div className="hidden 2xl:block absolute top-24 left-8 text-[9px] font-mono text-cyan-500/40 space-y-1">
        <div className="flex items-center gap-1 text-cyan-400/60 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>NEXUS-AUTONOMOUS // SEC-01</span>
        </div>
        <div>LATENCY: 11ms • REFRESH: 120Hz</div>
        <div>SYS: 0x889F-NX • NEURAL: SYNC</div>
        <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent my-1" />
        <div>AUTONOMY ENGINE: L5 ACTIVE</div>
      </div>

      <div className="hidden 2xl:block absolute top-24 right-8 text-[9px] font-mono text-purple-400/40 space-y-1 text-right">
        <div className="flex items-center justify-end gap-1 text-purple-400/60 font-bold">
          <span>BIGQUERY TELEMETRY MESH</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        </div>
        <div>BANDWIDTH: 1.84 TB/S • MCP: ON</div>
        <div>NODES: 2,048 CLUSTERS // RUN</div>
        <div className="w-24 h-0.5 bg-gradient-to-l from-purple-500/50 to-transparent my-1 ml-auto" />
        <div>SECURITY: ZERO-TRUST SHIELD</div>
      </div>

      {/* 6. Dynamic Canvas Mesh */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
