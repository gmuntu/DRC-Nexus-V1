import { useEffect, useRef } from 'react';

interface Mineral {
  symbol: string;
  name: string;
  atomicNumber: string;
  color: string;
}

const MINERALS: Mineral[] = [
  { symbol: 'Co', name: 'Cobalt', atomicNumber: '27', color: '#233876' },
  { symbol: 'Cu', name: 'Copper', atomicNumber: '29', color: '#1E2B58' },
  { symbol: 'Ta', name: 'Tantalum', atomicNumber: '73', color: '#334155' },
  { symbol: 'Li', name: 'Lithium', atomicNumber: '3', color: '#2563EB' },
  { symbol: 'Sn', name: 'Tin', atomicNumber: '50', color: '#475569' },
  { symbol: 'W', name: 'Tungsten', atomicNumber: '74', color: '#64748B' },
  { symbol: 'Nb', name: 'Niobium', atomicNumber: '41', color: '#1E3A8A' },
  { symbol: 'REE', name: 'Rare Earths', atomicNumber: '57', color: '#233876' },
  { symbol: 'Ge', name: 'Germanium', atomicNumber: '32', color: '#0284C7' },
  { symbol: 'Au', name: 'Gold', atomicNumber: '79', color: '#D97706' },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mineral: Mineral;
  scale: number;
  baseAlpha: number;
  alpha: number;
  pulsePhase: number;
  size: number;
}

export default function MineralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 200,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Create particles
    let particles: Particle[] = [];

    const initParticles = () => {
      const count = Math.floor((width * height) / 28000) + 18;
      particles = [];

      for (let i = 0; i < count; i++) {
        const mineral = MINERALS[Math.floor(Math.random() * MINERALS.length)];
        const scale = 0.65 + Math.random() * 0.6;
        const baseAlpha = 0.25 + Math.random() * 0.35;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -0.12 - Math.random() * 0.25,
          mineral,
          scale,
          baseAlpha,
          alpha: baseAlpha,
          pulsePhase: Math.random() * Math.PI * 2,
          size: 32 * scale,
        });
      }
    };

    initParticles();

    let wavePhase = 0;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep executive midnight navy canvas background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#090D16');
      bgGrad.addColorStop(0.5, '#0E1422');
      bgGrad.addColorStop(1, '#121A2B');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw horizontal wavy sine curves with subtle sapphire-slate glow
      wavePhase += 0.003;
      const waveCount = 24;
      const waveSpacing = height / (waveCount - 2);
      ctx.lineWidth = 1.1;

      for (let i = 0; i < waveCount; i++) {
        const yOffset = i * waveSpacing - 20;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(45, 68, 115, ${0.25 + (i % 2) * 0.18})`;

        for (let x = 0; x <= width + 20; x += 15) {
          const y = yOffset + Math.sin(x * 0.006 + i * 0.45 + wavePhase) * 22;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw connective lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const dxMouse = mouse.x - p1.x;
        const dyMouse = mouse.y - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius * 1.5) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              const lineAlpha = (1 - dist / 130) * (1 - distMouse / (mouse.radius * 1.5)) * 0.35;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(200, 169, 126, ${lineAlpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        p.pulsePhase += 0.02;
        p.x += Math.sin(p.pulsePhase) * 0.15;

        if (p.y < -50) {
          p.y = height + 50;
          p.x = Math.random() * width;
        }
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let isHovered = false;
        if (dist < mouse.radius) {
          isHovered = true;
          const proximityFactor = 1 - dist / mouse.radius;
          p.alpha = Math.min(0.95, p.baseAlpha + proximityFactor * 0.5);

          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        ctx.save();
        ctx.translate(p.x, p.y);

        const cardWidth = 38 * p.scale;
        const cardHeight = 36 * p.scale;

        if (isHovered) {
          ctx.shadowColor = 'rgba(200, 169, 126, 0.4)';
          ctx.shadowBlur = 14;
        }

        // Card background
        ctx.fillStyle = isHovered
          ? 'rgba(24, 34, 56, 0.95)'
          : `rgba(16, 23, 38, ${Math.max(0.7, p.alpha * 1.1)})`;
        ctx.strokeStyle = isHovered
          ? '#C8A97E'
          : `rgba(60, 85, 130, ${Math.max(0.4, p.alpha * 1.1)})`;
        ctx.lineWidth = isHovered ? 1.5 : 1;

        ctx.beginPath();
        ctx.roundRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 6 * p.scale);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Atomic number
        ctx.fillStyle = isHovered ? '#C8A97E' : `rgba(148, 163, 184, ${p.alpha * 1.2})`;
        ctx.font = `${Math.max(7, Math.floor(8 * p.scale))}px monospace`;
        ctx.textAlign = 'right';
        ctx.fillText(
          p.mineral.atomicNumber,
          cardWidth / 2 - 4 * p.scale,
          -cardHeight / 2 + 10 * p.scale
        );

        // Chemical Symbol
        ctx.fillStyle = isHovered ? '#FFFFFF' : `rgba(241, 245, 249, ${p.alpha * 1.3})`;
        ctx.font = `bold ${Math.max(10, Math.floor(13 * p.scale))}px 'Plus Jakarta Sans', sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(p.mineral.symbol, 0, -1 * p.scale);

        // Mineral Full Name
        ctx.fillStyle = isHovered ? '#C8A97E' : `rgba(148, 163, 184, ${p.alpha * 1.2})`;
        ctx.font = `${Math.max(6, Math.floor(7.5 * p.scale))}px sans-serif`;
        ctx.fillText(p.mineral.name, 0, cardHeight / 2 - 4 * p.scale);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
      style={{ opacity: 0.95 }}
    />
  );
}
