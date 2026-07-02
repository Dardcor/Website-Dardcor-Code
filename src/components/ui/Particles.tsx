import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  hue: number;
}

const COLORS = [
  { hue: 260, sat: 70 }, // violet
  { hue: 190, sat: 80 }, // cyan
  { hue: 35, sat: 85 },  // amber
];

export default function Particles({ count = 50, mouseInfluence = true }: { count?: number; mouseInfluence?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  const initParticle = useCallback((w: number, h: number): Particle => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      life: 0,
      maxLife: Math.random() * 400 + 200,
      hue: color.hue,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const w = () => canvas.width;
    const h = () => canvas.height;

    const pArr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      pArr.push(initParticle(w(), h()));
    }
    particlesRef.current = pArr;

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    if (mouseInfluence) {
      window.addEventListener('mousemove', handleMouse, { passive: true });
    }

    let lastTime = 0;
    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 16, 3);
      lastTime = time;
      ctx.clearRect(0, 0, w(), h());

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;

        // Mouse influence — gentle push away
        if (mouseInfluence && mx > 0 && my > 0) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100 * 0.5;
            p.x += (dx / dist) * force * dt;
            p.y += (dy / dist) * force * dt;
          }
        }

        // Wrap around
        if (p.x < -10) p.x = w() + 10;
        if (p.x > w() + 10) p.x = -10;
        if (p.y < -10) p.y = h() + 10;
        if (p.y > h() + 10) p.y = -10;

        // Reset particle
        if (p.life > p.maxLife) {
          particles[i] = initParticle(w(), h());
          continue;
        }

        // Fade in/out
        const fadeIn = Math.min(p.life / 60, 1);
        const fadeOut = Math.min((p.maxLife - p.life) / 60, 1);
        const alpha = p.opacity * fadeIn * fadeOut;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${alpha})`;
        ctx.fill();
      }

      // Draw connections (within 150px)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const avgHue = (particles[i].hue + particles[j].hue) / 2;
            ctx.strokeStyle = `hsla(${avgHue}, 60%, 60%, ${0.04 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      if (mouseInfluence) {
        window.removeEventListener('mousemove', handleMouse);
      }
    };
  }, [count, initParticle, mouseInfluence]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
