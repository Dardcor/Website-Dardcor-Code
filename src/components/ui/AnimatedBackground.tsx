import { useEffect, useRef } from 'react';

interface Vec3 { x: number; y: number; z: number; }

function rotX(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}
function rotY(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
}
function project(p: Vec3, w: number, h: number, f: number) {
  const d = f + p.z;
  const s = d > 0.1 ? f / d : 0;
  return { sx: p.x * s + w / 2, sy: p.y * s + h / 2, scale: s };
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    const W = () => canvas.width;
    const H = () => canvas.height;

    // ─── Star colours (realistic space distribution) ───
    const starColors = [
      [255, 250, 245], // warm white
      [255, 245, 235], // warm
      [240, 240, 255], // cool white
      [220, 230, 255], // blue-white
      [200, 215, 255], // blue
      [255, 255, 255], // pure white
      [255, 240, 220], // yellow
    ];
    function pickColor() {
      return starColors[Math.floor(Math.random() * starColors.length)];
    }

    // ─── Stars: 3 depth layers ───
    const LAYERS = [
      { count: 300, spread: 3000, zMin: -1200, zMax: -600, sizeMin: 0.2, sizeMax: 0.6, brightMin: 0.15, brightMax: 0.35 },
      { count: 400, spread: 2000, zMin: -600, zMax: -200, sizeMin: 0.5, sizeMax: 1.5, brightMin: 0.3, brightMax: 0.6 },
      { count: 150, spread: 1200, zMin: -200, zMax: 100, sizeMin: 1.2, sizeMax: 2.8, brightMin: 0.5, brightMax: 0.9 },
    ];
    const stars: {
      x: number; y: number; z: number;
      size: number; bright: number; phase: number; speed: number;
      color: number[]; layer: number;
    }[] = [];
    for (let l = 0; l < LAYERS.length; l++) {
      const L = LAYERS[l];
      for (let i = 0; i < L.count; i++) {
        stars.push({
          x: (Math.random() - 0.5) * L.spread,
          y: (Math.random() - 0.5) * L.spread,
          z: L.zMin + Math.random() * (L.zMax - L.zMin),
          size: L.sizeMin + Math.random() * (L.sizeMax - L.sizeMin),
          bright: L.brightMin + Math.random() * (L.brightMax - L.brightMin),
          phase: Math.random() * Math.PI * 2,
          speed: 0.002 + Math.random() * 0.01,
          color: pickColor(),
          layer: l,
        });
      }
    }

    // ─── Milky Way dust ───
    const dustCount = 500;
    const dust: { x: number; y: number; z: number; size: number; bright: number; phase: number }[] = [];
    for (let i = 0; i < dustCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 200 + Math.random() * 800;
      dust.push({
        x: Math.cos(angle) * radius * (0.5 + Math.random() * 0.5),
        y: (Math.random() - 0.5) * 300,
        z: -900 - Math.random() * 400,
        size: 0.5 + Math.random() * 1.5,
        bright: 0.01 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // ─── Nebula ───
    const nebulae: {
      x: number; y: number; z: number; r: number;
      r2: number; hue: number; sat: number; light: number; op: number;
      dx: number; dy: number; phase: number;
    }[] = [];
    const nebHues = [250, 240, 220, 260, 230, 245, 255, 210];
    for (let i = 0; i < 10; i++) {
      nebulae.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1200,
        z: -1000 - Math.random() * 600,
        r: 300 + Math.random() * 500,
        r2: 150 + Math.random() * 300,
        hue: nebHues[i % nebHues.length],
        sat: 15 + Math.random() * 30,
        light: 45 + Math.random() * 25,
        op: 0.008 + Math.random() * 0.02,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // ─── Snakes ───
    const SNAKE_COUNT = 4, SEGS = 60, FOV = 700;
    const snakes = [
      { hue: 265, amp: 70, twist: 2.8, thick: 2.8, speed: 0.30, orX: 500, orY: 300, orS: 0.10, ph: 0, yOff: -60, bScale: 1.1 },
      { hue: 240, amp: 55, twist: 2.2, thick: 2.2, speed: 0.38, orX: 400, orY: 350, orS: 0.13, ph: 1.8, yOff: 40, bScale: 0.9 },
      { hue: 285, amp: 50, twist: 3.2, thick: 1.9, speed: 0.28, orX: 550, orY: 250, orS: 0.09, ph: 3.5, yOff: -20, bScale: 0.8 },
      { hue: 225, amp: 60, twist: 2.5, thick: 1.6, speed: 0.42, orX: 380, orY: 400, orS: 0.16, ph: 5.0, yOff: 70, bScale: 0.7 },
    ];
    const snakePts: Vec3[][] = snakes.map(() =>
      Array.from({ length: SEGS }, () => ({ x: 0, y: 0, z: 0 }))
    );

    // ─── Ambient particles ───
    const ambient: { x: number; y: number; z: number; size: number; ph: number; sp: number; hue: number }[] = [];
    for (let i = 0; i < 100; i++) {
      ambient.push({
        x: (Math.random() - 0.5) * 1800,
        y: (Math.random() - 0.5) * 1400,
        z: (Math.random() - 0.5) * 600,
        size: 1 + Math.random() * 4,
        ph: Math.random() * Math.PI * 2,
        sp: 0.15 + Math.random() * 0.4,
        hue: 240 + Math.random() * 50,
      });
    }

    // ─── Variable star reference for twinkle ───
    let lastTime = 0;

    // ─── Shooting stars ───
    const shooting: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; trail: { x: number; y: number }[] }[] = [];
    const MAX_SS = 6;

    // ─── Draw ───
    const animate = (time: number) => {
      const dt = lastTime ? Math.min((time - lastTime) / 16, 3) : 1;
      lastTime = time;
      const t = time * 0.001;
      const cw = W(), ch = H();
      ctx.clearRect(0, 0, cw, ch);

      const mx = mouseRef.current.x * 0.12;
      const my = mouseRef.current.y * 0.12;
      const rxa = my, rya = mx;

      // ── 1. Nebulae ──
      for (const neb of nebulae) {
        const nx = neb.x + Math.sin(t * neb.dx + neb.phase) * 120;
        const ny = neb.y + Math.cos(t * neb.dy + neb.phase) * 80;
        const r = rotY(rotX({ x: nx, y: ny, z: neb.z }, rxa * 0.2), rya * 0.2);
        const p = project(r, cw, ch, FOV + 500);
        if (p.scale < 0.03) continue;
        const grad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, neb.r * p.scale);
        grad.addColorStop(0, `hsla(${neb.hue}, ${neb.sat}%, ${neb.light}%, ${neb.op * p.scale})`);
        grad.addColorStop(0.4, `hsla(${neb.hue}, ${neb.sat}%, ${neb.light}%, ${neb.op * p.scale * 0.4})`);
        grad.addColorStop(1, `hsla(${neb.hue}, ${neb.sat}%, ${neb.light}%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, neb.r * p.scale, 0, Math.PI * 2);
        ctx.fill();

        // secondary lobe
        const grad2 = ctx.createRadialGradient(
          p.sx + 80 * p.scale, p.sy - 60 * p.scale, 0,
          p.sx + 80 * p.scale, p.sy - 60 * p.scale, neb.r2 * p.scale,
        );
        grad2.addColorStop(0, `hsla(${neb.hue + 15}, ${neb.sat}%, ${neb.light + 10}%, ${neb.op * p.scale * 0.5})`);
        grad2.addColorStop(1, `hsla(${neb.hue + 15}, ${neb.sat}%, ${neb.light + 10}%, 0)`);
        ctx.fillStyle = grad2;
        ctx.beginPath();
        ctx.arc(p.sx + 80 * p.scale, p.sy - 60 * p.scale, neb.r2 * p.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 2. Milky Way dust ──
      for (const d of dust) {
        const r = rotY(rotX({ x: d.x, y: d.y, z: d.z }, rxa * 0.4), rya * 0.4);
        const p = project(r, cw, ch, FOV + 400);
        if (p.scale < 0.02) continue;
        const a = d.bright * p.scale * (0.8 + 0.2 * Math.sin(t * 0.005 + d.phase));
        ctx.fillStyle = `rgba(200, 195, 230, ${a})`;
        ctx.fillRect(p.sx, p.sy, d.size * p.scale * 0.3, 1);
      }

      // ── 3. Stars (depth-sorted) ──
      const starData = stars.map((s) => {
        const r = rotY(rotX({ x: s.x, y: s.y, z: s.z }, rxa * (0.3 + s.layer * 0.2)), rya * (0.3 + s.layer * 0.2));
        return { star: s, depth: r.z, proj: project(r, cw, ch, FOV + 300) };
      });
      starData.sort((a, b) => a.depth - b.depth);

      for (const { star, proj } of starData) {
        if (proj.scale < 0.01) continue;
        const tw = 0.7 + 0.3 * Math.sin(t * star.speed + star.phase);
        const alpha = star.bright * tw * Math.min(1, proj.scale * 2.5);
        const sz = star.size * proj.scale;
        const [cr, cg, cb] = star.color;

        if (sz < 0.6) {
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha * 0.5})`;
          ctx.fillRect(proj.sx, proj.sy, 1, 1);
        } else {
          // glow
          const glowSize = sz * (2 + star.layer * 0.5);
          const grad = ctx.createRadialGradient(proj.sx, proj.sy, 0, proj.sx, proj.sy, glowSize);
          grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${alpha * 0.15})`);
          grad.addColorStop(0.3, `rgba(${cr}, ${cg}, ${cb}, ${alpha * 0.05})`);
          grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(proj.sx, proj.sy, glowSize, 0, Math.PI * 2);
          ctx.fill();

          // core
          ctx.beginPath();
          ctx.arc(proj.sx, proj.sy, sz * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
          ctx.fill();

          // bright core
          if (sz > 1.2) {
            ctx.beginPath();
            ctx.arc(proj.sx, proj.sy, sz * 0.15, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
            ctx.fill();
          }
        }
      }

      // ── 4. Snakes ──
      const allProj: { sx: number; sy: number; scale: number; hue: number; thick: number }[][] = [];

      for (let s = 0; s < SNAKE_COUNT; s++) {
        const sn = snakes[s];
        const pts = snakePts[s];

        // snake centre orbits across the screen
        const cx = Math.sin(t * sn.orS + sn.ph) * sn.orX;
        const cy = Math.cos(t * sn.orS * 0.7 + sn.ph * 1.3) * sn.orY + sn.yOff;
        const cz = Math.sin(t * sn.orS * 0.5 + sn.ph * 0.7) * 200;

        // direction angle for body alignment
        const da = Math.atan2(
          -Math.sin(t * sn.orS * 0.7 + sn.ph * 1.3) * sn.orY * 0.7 * sn.orS,
          Math.cos(t * sn.orS + sn.ph) * sn.orX * sn.orS,
        );

        for (let i = 0; i < SEGS; i++) {
          const p = i / (SEGS - 1) - 0.5;
          const w1 = Math.sin(p * Math.PI * sn.twist + t * sn.speed + sn.ph);
          const w2 = Math.cos(p * Math.PI * 1.8 + t * sn.speed * 0.8 + sn.ph * 1.1);
          const w3 = Math.sin(p * Math.PI * 0.9 + t * sn.speed * 0.5 + sn.ph * 0.6);

          const sx = p * 600 * sn.bScale;
          const sy = w1 * sn.amp * sn.bScale;
          const sz = w2 * 90 * sn.bScale + p * 250 * sn.bScale;

          // rotate body along travel direction
          const ca = Math.cos(da), sa = Math.sin(da);
          pts[i] = {
            x: cx + sx * ca - sz * sa + w3 * 35,
            y: cy + sy,
            z: cz + sx * sa + sz * ca + w3 * 45,
          };
        }

        // project
        const projected = pts.map((p) => {
          const r = rotY(rotX(p, rxa), rya);
          return project(r, cw, ch, FOV);
        });

        allProj.push(projected.map((p, i) => ({
          ...p, hue: sn.hue + (i / SEGS) * 25, thick: sn.thick,
        })));

        // glow passes
        for (let pass = 0; pass < 3; pass++) {
          const gf = pass === 0 ? 0.02 : pass === 1 ? 0.05 : 0.12;
          const wm = pass === 0 ? 10 : pass === 1 ? 5 : 2;
          ctx.beginPath();
          for (let i = 0; i < SEGS; i++) {
            const { sx, sy } = projected[i];
            if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
          }
          ctx.strokeStyle = `hsla(${sn.hue}, 40%, 55%, ${gf})`;
          ctx.lineWidth = sn.thick * wm;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }

        // main body
        ctx.beginPath();
        for (let i = 0; i < SEGS; i++) {
          const { sx, sy } = projected[i];
          if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `hsla(${sn.hue}, 40%, 58%, 0.15)`;
        ctx.lineWidth = sn.thick + 0.5;
        ctx.stroke();

        // body nodes
        for (let i = 0; i < SEGS; i += 3) {
          const { sx, sy, scale } = projected[i];
          if (scale < 0.04) continue;
          const na = Math.min(0.35, scale * 0.5);
          const ns = 1.8 * scale;
          ctx.beginPath();
          ctx.arc(sx, sy, ns * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${sn.hue + 12}, 35%, 62%, ${na * 0.15})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(sx, sy, ns * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${sn.hue + 12}, 40%, 68%, ${na * 0.45})`;
          ctx.fill();
        }
      }

      // ── 5. Inter-snake connections ──
      for (let s = 0; s < SNAKE_COUNT; s++) {
        const next = (s + 1) % SNAKE_COUNT;
        for (let i = 0; i < SEGS; i += 4) {
          const a = snakePts[s][i];
          const b = snakePts[next][i];
          const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 250) {
            const ra = rotY(rotX(a, rxa), rya);
            const rb = rotY(rotX(b, rxa), rya);
            const pa = project(ra, cw, ch, FOV);
            const pb = project(rb, cw, ch, FOV);
            const alpha = (1 - dist / 250) * 0.035;
            ctx.beginPath();
            ctx.moveTo(pa.sx, pa.sy);
            ctx.lineTo(pb.sx, pb.sy);
            ctx.strokeStyle = `hsla(265, 20%, 60%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // ── 6. Ambient floating dots ──
      for (const a of ambient) {
        const drift = Math.sin(t * a.sp + a.ph);
        const ap = { x: a.x + drift * 40, y: a.y + Math.cos(t * a.sp * 0.7 + a.ph) * 25, z: a.z + drift * 25 };
        const pos = rotY(rotX(ap, rxa * 0.5), rya * 0.5);
        const p = project(pos, cw, ch, FOV + 300);
        if (p.scale < 0.04) continue;
        const alpha = Math.min(0.25, p.scale * 0.4) * (0.5 + 0.5 * Math.sin(t * a.sp + a.ph + 1));
        const sz = a.size * p.scale * 0.3;
        if (sz > 0.3) {
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, sz, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${a.hue}, 15%, 55%, ${alpha})`;
          ctx.fill();
        }
      }

      // ── 7. Shooting stars ──
      if (shooting.length < MAX_SS && Math.random() < 0.004) {
        const angle = -0.7 + Math.random() * 0.5;
        const spd = 5 + Math.random() * 12;
        shooting.push({
          x: (Math.random() - 0.5) * cw * 1.8,
          y: -60 - Math.random() * 120,
          vx: Math.cos(angle) * spd * 1.3,
          vy: Math.sin(angle) * spd * 0.4 + spd * 0.7,
          life: 0,
          maxLife: 20 + Math.random() * 35,
          trail: [],
        });
      }
      for (let i = shooting.length - 1; i >= 0; i--) {
        const ss = shooting[i];
        ss.life += dt;
        ss.x += ss.vx * dt;
        ss.y += ss.vy * dt;
        ss.trail.push({ x: ss.x, y: ss.y });
        if (ss.trail.length > 30) ss.trail.shift();
        const alpha = 1 - ss.life / ss.maxLife;
        if (alpha <= 0 || ss.y > ch + 100) { shooting.splice(i, 1); continue; }
        for (let j = 1; j < ss.trail.length; j++) {
          const ta = (j / ss.trail.length) * alpha * 0.12;
          ctx.beginPath();
          ctx.moveTo(ss.trail[j - 1].x, ss.trail[j - 1].y);
          ctx.lineTo(ss.trail[j].x, ss.trail[j].y);
          ctx.strokeStyle = `hsla(265, 12%, 70%, ${ta})`;
          ctx.lineWidth = 1.8 * (j / ss.trail.length);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(265, 12%, 75%, ${alpha * 0.35})`;
        ctx.fill();
      }

      // ── 8. Soft vignette ──
      const vig = ctx.createRadialGradient(cw / 2, ch / 2, cw * 0.05, cw / 2, ch / 2, cw * 0.75);
      vig.addColorStop(0, 'rgba(248, 247, 252, 0)');
      vig.addColorStop(0.35, 'rgba(248, 247, 252, 0)');
      vig.addColorStop(0.7, 'rgba(248, 247, 252, 0.03)');
      vig.addColorStop(1, 'rgba(248, 247, 252, 0.35)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, cw, ch);

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / W() - 0.5) * 2,
        y: (e.clientY / H() - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
