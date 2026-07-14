"use client";

import { useEffect, useRef } from "react";

type Node3D = {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
  phase: number;
};

function fibonacciSphere(count: number, radius: number): Node3D[] {
  const pts: Node3D[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    pts.push({
      x: x * radius,
      y: y * radius,
      z: z * radius,
      ox: x * radius,
      oy: y * radius,
      oz: z * radius,
      phase: Math.random() * Math.PI * 2,
    });
  }
  return pts;
}

/**
 * Interactive neural globe + ambient neuron field.
 * Strong cursor warp / magnetic links for a futuristic tech vibe.
 */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const mouse = { x: 0, y: 0, active: false, nx: 0, ny: 0 };
    let globe: Node3D[] = [];
    let field: { x: number; y: number; vx: number; vy: number; r: number; c: string }[] = [];
    let links: [number, number][] = [];
    let raf = 0;
    let rotY = 0;
    let rotX = 0.25;
    let targetRotX = 0.25;
    let targetRotY = 0;
    let time = 0;
    let w = 0;
    let h = 0;

    const COLORS = ["#00f0ff", "#2b59ff", "#8a2be2", "#5eead4", "#60a5fa"];

    const rebuild = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const radius = Math.min(w, h) * (w < 768 ? 0.28 : 0.32);
      const count = w < 768 ? 120 : 180;
      globe = fibonacciSphere(count, radius);

      // Precompute K nearest neighbors on sphere (keeps globe “wired”)
      links = [];
      const k = 4;
      for (let i = 0; i < globe.length; i++) {
        const dists: { j: number; d: number }[] = [];
        for (let j = i + 1; j < globe.length; j++) {
          const a = globe[i];
          const b = globe[j];
          const d =
            (a.ox - b.ox) ** 2 + (a.oy - b.oy) ** 2 + (a.oz - b.oz) ** 2;
          dists.push({ j, d });
        }
        dists.sort((u, v) => u.d - v.d);
        for (let n = 0; n < Math.min(k, dists.length); n++) {
          links.push([i, dists[n].j]);
        }
      }

      // Ambient free-floating neurons behind/around globe
      const fieldCount = Math.min(90, Math.floor((w * h) / 18000));
      field = Array.from({ length: fieldCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const onMove = (e: PointerEvent | MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      mouse.nx = (e.clientX / w) * 2 - 1;
      mouse.ny = (e.clientY / h) * 2 - 1;
      targetRotY = mouse.nx * 0.55;
      targetRotX = 0.2 + mouse.ny * 0.35;
    };

    const onLeave = () => {
      mouse.active = false;
      targetRotY = 0;
      targetRotX = 0.25;
    };

    const draw = () => {
      time += 0.016;
      rotY += (targetRotY - rotY) * 0.04 + 0.0035; // idle spin + mouse tilt
      rotX += (targetRotX - rotX) * 0.05;

      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.42;

      // Soft core glow of the globe
      const core = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.min(w, h) * 0.38);
      core.addColorStop(0, "rgba(43, 89, 255, 0.14)");
      core.addColorStop(0.45, "rgba(138, 43, 226, 0.06)");
      core.addColorStop(1, "transparent");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Cursor field bloom
      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        g.addColorStop(0, "rgba(0, 240, 255, 0.18)");
        g.addColorStop(0.4, "rgba(43, 89, 255, 0.08)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ambient field particles
      for (let i = 0; i < field.length; i++) {
        const p = field[i];
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 200) {
            const f = ((200 - dist) / 200) * 2.2;
            p.vx += (dx / dist) * f * 0.15;
            p.vy += (dy / dist) * f * 0.15;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // connect nearby field nodes
        for (let j = i + 1; j < field.length; j++) {
          const q = field[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - d / 110)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (md < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(138, 43, 226, ${0.35 * (1 - md / 180)})`;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.55;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Transform globe nodes for this frame
      const transformed = globe.map((n) => {
        const pulse = 1 + Math.sin(time * 1.2 + n.phase) * 0.025;
        let x = n.ox * pulse;
        let y = n.oy * pulse;
        let z = n.oz * pulse;

        // Rotate Y (idle spin + cursor yaw)
        {
          const c = Math.cos(rotY);
          const s = Math.sin(rotY);
          const nx = x * c + z * s;
          const nz = -x * s + z * c;
          x = nx;
          z = nz;
        }
        // Rotate X (cursor pitch)
        {
          const c = Math.cos(rotX);
          const s = Math.sin(rotX);
          const ny = y * c - z * s;
          const nz = y * s + z * c;
          y = ny;
          z = nz;
        }

        return { x, y, z, phase: n.phase } as Node3D;
      });

      const projectPt = (p: { x: number; y: number; z: number }) => {
        const perspective = 900;
        const scale = perspective / (perspective + p.z + 220);
        return {
          sx: cx + p.x * scale,
          sy: cy + p.y * scale,
          scale,
          depth: p.z,
        };
      };

      // Cursor push on projected globe nodes
      const projected = transformed.map((p) => {
        const pr = projectPt(p);
        let sx = pr.sx;
        let sy = pr.sy;
        if (mouse.active) {
          const dx = sx - mouse.x;
          const dy = sy - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 280) {
            const force = Math.pow(1 - dist / 280, 2) * 56;
            sx += (dx / dist) * force;
            sy += (dy / dist) * force;
          }
        }
        return { ...pr, sx, sy };
      });

      // Globe wires
      for (const [i, j] of links) {
        const a = projected[i];
        const b = projected[j];
        if (!a || !b) continue;
        if (a.depth > 120 && b.depth > 120) continue; // hide far back edges a bit
        const alpha = 0.08 + 0.22 * ((a.scale + b.scale) / 2);
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Latitude / longitude accent rings (tech globe feel)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = "rgba(43, 89, 255, 0.18)";
      ctx.lineWidth = 1;
      for (let ring = 0; ring < 3; ring++) {
        const rr = Math.min(w, h) * (0.18 + ring * 0.07);
        ctx.beginPath();
        ctx.ellipse(0, 0, rr, rr * (0.35 + Math.sin(rotX) * 0.15), rotY * 0.3, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // Globe nodes (front-most first-ish via alpha from depth)
      for (let i = 0; i < projected.length; i++) {
        const pr = projected[i];
        const depthFade = Math.max(0.25, Math.min(1, (pr.scale - 0.55) * 1.6));
        const nearMouse =
          mouse.active && Math.hypot(pr.sx - mouse.x, pr.sy - mouse.y) < 200
            ? 1 + (1 - Math.hypot(pr.sx - mouse.x, pr.sy - mouse.y) / 200) * 1.8
            : 1;
        const size = (1.6 + pr.scale * 1.4) * nearMouse;

        if (mouse.active) {
          const md = Math.hypot(pr.sx - mouse.x, pr.sy - mouse.y);
          if (md < 200 && pr.depth < 80) {
            ctx.beginPath();
            ctx.moveTo(pr.sx, pr.sy);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(138, 43, 226, ${0.4 * (1 - md / 200) * depthFade})`;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(pr.sx, pr.sy, size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.globalAlpha = 0.12 * depthFade * nearMouse;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pr.sx, pr.sy, size, 0, Math.PI * 2);
        ctx.globalAlpha = 0.7 * depthFade;
        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Cursor nucleus
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#00f0ff";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 16 + Math.sin(time * 4) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 240, 255, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 28 + Math.sin(time * 3) * 4, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(138, 43, 226, 0.25)";
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    rebuild();
    draw();

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", rebuild);
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", rebuild);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  );
}
