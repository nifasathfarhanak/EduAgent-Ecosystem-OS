import React, { useEffect, useRef } from 'react';

interface GalaxyWaveBackgroundProps {
  accentColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  speed?: number;
  particleDensity?: number;
}

/**
 * Continuous 3D Swirling Galaxy Wave & Cosmic Nebula Canvas
 * Features:
 * - Full-screen continuous logarithmic spiral arms (3 arms)
 * - Multi-layered harmonic wave resonance undulations
 * - 3D orbiting star dust particles swirling into and out of core
 * - Dynamic energy wave pulses across full viewport
 * - Glowing celestial event horizon with soft chromatic aberration
 */
export const FullScreenGalaxyWaveCanvas: React.FC<GalaxyWaveBackgroundProps> = ({
  accentColor = '#06b6d4',
  secondaryColor = '#a855f7',
  tertiaryColor = '#ec4899',
  speed = 1.0,
}) => {
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

    // Initialize Galaxy Particle Cloud (spiral vortex stars)
    const particleCount = Math.min(Math.floor((width * height) / 4500), 280);
    interface StarParticle {
      angle: number;
      distance: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
      layer: number;
      pulseOffset: number;
    }

    const starParticles: StarParticle[] = [];
    const colorPalette = [
      '#ffffff',
      '#67e8f9',
      '#06b6d4',
      '#38bdf8',
      '#a855f7',
      '#c084fc',
      '#f472b6',
      '#ec4899',
      '#34d399',
    ];

    const maxRadius = Math.sqrt(width * width + height * height) * 0.75;

    for (let i = 0; i < particleCount; i++) {
      // Logarithmic / Fibonacci distribution for natural galaxy disk density
      const distFraction = Math.pow(Math.random(), 1.8);
      const distance = 25 + distFraction * maxRadius;
      starParticles.push({
        angle: Math.random() * Math.PI * 2,
        distance,
        speed: (0.002 + (1 - distFraction) * 0.006) * speed,
        size: Math.random() * 2.2 + 0.6,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        alpha: Math.random() * 0.7 + 0.3,
        layer: Math.floor(Math.random() * 3),
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let t = 0;

    const render = () => {
      t += 0.015 * speed;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.45; // slightly above vertical center to gracefully frame the login elements

      // 1. Deep Space Cosmic Fog / Nebula Gradients
      const nebulaGrad1 = ctx.createRadialGradient(
        cx + Math.cos(t * 0.3) * 120,
        cy + Math.sin(t * 0.4) * 80,
        10,
        cx,
        cy,
        Math.max(width, height) * 0.7
      );
      nebulaGrad1.addColorStop(0, 'rgba(6, 182, 212, 0.18)');
      nebulaGrad1.addColorStop(0.3, 'rgba(168, 85, 247, 0.12)');
      nebulaGrad1.addColorStop(0.65, 'rgba(236, 72, 153, 0.05)');
      nebulaGrad1.addColorStop(1, 'rgba(2, 4, 10, 0)');

      ctx.fillStyle = nebulaGrad1;
      ctx.fillRect(0, 0, width, height);

      // 2. Full-Screen Revolving Galaxy Wave Arms (Continuous logarithmic spiral waves)
      const numArms = 3;
      const wavePoints = 140;

      for (let arm = 0; arm < numArms; arm++) {
        const baseAngle = (arm * (Math.PI * 2)) / numArms + t * 0.4;
        const armColor = arm === 0 ? accentColor : arm === 1 ? secondaryColor : tertiaryColor;

        ctx.save();
        ctx.beginPath();

        for (let j = 0; j < wavePoints; j++) {
          const ratio = j / wavePoints;
          const r = Math.pow(ratio, 1.25) * maxRadius;
          // Logarithmic spiral angle + harmonic wave oscillation
          const waveOsc = Math.sin(ratio * 12 - t * 2.5 + arm) * (18 + ratio * 35);
          const theta = baseAngle + ratio * 4.2 + (waveOsc / (r + 50));

          const x = cx + Math.cos(theta) * (r + waveOsc);
          const y = cy + Math.sin(theta) * ((r + waveOsc) * 0.62); // 0.62 perspective tilt for 3D depth

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Draw soft glowing spiral ribbon
        ctx.strokeStyle = armColor;
        ctx.lineWidth = 3.5;
        ctx.globalAlpha = 0.35 + Math.sin(t + arm) * 0.15;
        ctx.shadowColor = armColor;
        ctx.shadowBlur = 24;
        ctx.stroke();
        ctx.restore();

        // Second parallel resonant wave harmonic
        ctx.save();
        ctx.beginPath();
        for (let j = 0; j < wavePoints; j += 2) {
          const ratio = j / wavePoints;
          const r = Math.pow(ratio, 1.15) * maxRadius;
          const waveOsc = Math.cos(ratio * 16 + t * 2.8) * (12 + ratio * 20);
          const theta = baseAngle + 0.4 + ratio * 4.0 + (waveOsc / (r + 40));

          const x = cx + Math.cos(theta) * (r + waveOsc);
          const y = cy + Math.sin(theta) * ((r + waveOsc) * 0.62);

          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.25;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Full Continuous Swirling Wave Ribbons Across Entire Viewport Width
      const numRipples = 4;
      for (let rIdx = 0; rIdx < numRipples; rIdx++) {
        ctx.save();
        ctx.beginPath();
        const yBase = height * 0.25 + (rIdx * height * 0.18);
        const waveSpeed = t * (1.2 + rIdx * 0.3);

        ctx.moveTo(0, yBase);
        for (let x = 0; x <= width; x += 18) {
          // Complex harmonic continuous revolving wave formula
          const wave1 = Math.sin(x * 0.0035 + waveSpeed) * 35;
          const wave2 = Math.cos(x * 0.007 - waveSpeed * 0.8) * 20;
          const wave3 = Math.sin((x + cx) * 0.002 + t) * 15;
          const y = yBase + wave1 + wave2 + wave3;
          ctx.lineTo(x, y);
        }

        const waveColors = ['#06b6d4', '#a855f7', '#ec4899', '#38bdf8'];
        ctx.strokeStyle = waveColors[rIdx % waveColors.length];
        ctx.lineWidth = 1.2 + (rIdx % 2);
        ctx.globalAlpha = 0.18 + Math.sin(t + rIdx) * 0.08;
        ctx.shadowColor = waveColors[rIdx % waveColors.length];
        ctx.shadowBlur = 16;
        ctx.stroke();
        ctx.restore();
      }

      // 4. Orbiting Star Dust Galaxy Particles
      for (let i = 0; i < starParticles.length; i++) {
        const p = starParticles[i];
        // Swirl angle update
        p.angle += p.speed;

        // Wave undulation on distance from core
        const waveDist = p.distance + Math.sin(t * 2 + p.pulseOffset) * 12;
        const x = cx + Math.cos(p.angle) * waveDist;
        const y = cy + Math.sin(p.angle) * (waveDist * 0.62); // 3D tilt

        // Particle pulse
        const alpha = Math.max(0.1, p.alpha + Math.sin(t * 3 + p.pulseOffset) * 0.25);

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size > 2 ? 10 : 4;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Random subtle connecting micro-lasers for close orbital stars
        if (i % 5 === 0 && i < starParticles.length - 1) {
          const pNext = starParticles[i + 1];
          const nx = cx + Math.cos(pNext.angle) * pNext.distance;
          const ny = cy + Math.sin(pNext.angle) * (pNext.distance * 0.62);
          const dist = Math.hypot(x - nx, y - ny);
          if (dist < 75) {
            ctx.save();
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 75) * 0.18;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nx, ny);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // 5. Galaxy Core Singularity & Holographic Radiant Beams
      ctx.save();
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 260);
      coreGlow.addColorStop(0, '#ffffff');
      coreGlow.addColorStop(0.12, 'rgba(103, 232, 249, 0.9)');
      coreGlow.addColorStop(0.35, 'rgba(6, 182, 212, 0.45)');
      coreGlow.addColorStop(0.65, 'rgba(168, 85, 247, 0.18)');
      coreGlow.addColorStop(1, 'rgba(2, 4, 10, 0)');

      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 260, 0, Math.PI * 2);
      ctx.fill();

      // Core pulsing center
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 35;
      ctx.beginPath();
      ctx.arc(cx, cy, 7 + Math.sin(t * 4) * 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accentColor, secondaryColor, tertiaryColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
};
