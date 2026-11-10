import { useEffect, useRef } from "react";

export const AmbientParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulse: number;
    }

    const particleCount = Math.min(36, Math.floor(width / 35));
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.6,
      speedX: (Math.random() - 0.5) * 0.18,
      speedY: (Math.random() - 0.5) * 0.18,
      opacity: Math.random() * 0.25 + 0.1,
      pulse: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const isDark = document.documentElement.classList.contains("dark");

      // Subtle atmospheric light beam following cursor
      const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
      glow.addColorStop(0, isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const particleRgb = isDark ? "240, 240, 245" : "30, 32, 38";

      for (const particle of particles) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += 0.012;

        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Soft physics-based proximity deflection
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          particle.x += (dx / dist) * force * 0.75;
          particle.y += (dy / dist) * force * 0.75;
        }

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        const dynamicOpacity = isDark
          ? particle.opacity * (0.7 + 0.3 * Math.sin(particle.pulse))
          : particle.opacity * 1.2 * (0.7 + 0.3 * Math.sin(particle.pulse));

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleRgb}, ${dynamicOpacity})`;
        ctx.fill();
      }

      if (!motionPreference.matches && !document.hidden) {
        animId = requestAnimationFrame(render);
      }
    };

    if (!motionPreference.matches) {
      animId = requestAnimationFrame(render);
    }

    const onVisibilityChange = () => {
      if (!document.hidden && !motionPreference.matches) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 dark:opacity-40 transition-opacity duration-700 motion-reduce:hidden"
      aria-hidden="true"
    />
  );
};
