import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import { Play, RotateCcw, Trophy, Shield } from "lucide-react";

interface Invader {
  x: number;
  y: number;
  width: number;
  height: number;
  alive: boolean;
  row: number;
  color: string;
}

interface Bullet {
  x: number;
  y: number;
  vy: number;
  fromPlayer: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

export const SpaceInvaders = () => {
  const { i18n } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("space_invaders_hi") || "0", 10);
  });

  const stateRef = useRef({
    isPlaying: false,
    isGameOver: false,
    score: 0,
    lives: 3,
    wave: 1,
    playerX: 0,
    playerWidth: 28,
    playerHeight: 14,
    bullets: [] as Bullet[],
    invaders: [] as Invader[],
    particles: [] as Particle[],
    invaderDir: 1,
    invaderSpeed: 30,
    lastShootTime: 0,
    lastInvaderShotTime: 0,
    animId: 0,
    keys: { left: false, right: false, shoot: false },
  });

  const initWave = (width: number, waveNum: number) => {
    const s = stateRef.current;
    s.invaders = [];
    const cols = Math.min(Math.floor(width / 48), 10);
    const startX = (width - cols * 44) / 2;
    const colors = ["#818cf8", "#6366f1", "#a855f7"];

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < cols; c++) {
        s.invaders.push({
          x: startX + c * 44,
          y: 20 + r * 26,
          width: 20,
          height: 14,
          alive: true,
          row: r,
          color: colors[r % colors.length],
        });
      }
    }
    s.invaderSpeed = 28 + waveNum * 6;
    s.invaderDir = 1;
  };

  const startGame = () => {
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width : 700;
    const s = stateRef.current;
    s.isPlaying = true;
    s.isGameOver = false;
    s.score = 0;
    s.lives = 3;
    s.wave = 1;
    s.playerX = width / 2 - s.playerWidth / 2;
    s.bullets = [];
    s.particles = [];
    initWave(width, 1);

    setScore(0);
    setLives(3);
    setWave(1);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const shootPlayer = () => {
    const s = stateRef.current;
    const now = performance.now();
    if (now - s.lastShootTime < 240) return;
    s.lastShootTime = now;

    s.bullets.push({
      x: s.playerX + s.playerWidth / 2,
      y: 155,
      vy: -400,
      fromPlayer: true,
    });
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        s.keys.left = true;
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        s.keys.right = true;
      }
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (!s.isPlaying || s.isGameOver) {
          startGame();
        } else {
          shootPlayer();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (e.code === "ArrowLeft" || e.code === "KeyA") s.keys.left = false;
      if (e.code === "ArrowRight" || e.code === "KeyD") s.keys.right = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Mouse / Touch controls
  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const s = stateRef.current;
    s.playerX = Math.max(0, Math.min(canvas.width - s.playerWidth, x - s.playerWidth / 2));
  };

  const handlePointerDown = () => {
    const s = stateRef.current;
    if (!s.isPlaying || s.isGameOver) {
      startGame();
    } else {
      shootPlayer();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 180);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
    };
    window.addEventListener("resize", handleResize);

    const s = stateRef.current;
    s.playerX = width / 2 - s.playerWidth / 2;
    initWave(width, 1);

    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Entirely Transparent Background to blend seamlessly with page
      ctx.clearRect(0, 0, width, height);

      // Subtle base line
      ctx.strokeStyle = "rgba(99, 102, 241, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height - 6);
      ctx.lineTo(width, height - 6);
      ctx.stroke();

      if (s.isPlaying && !s.isGameOver) {
        // Player keyboard movement
        if (s.keys.left) s.playerX -= 280 * dt;
        if (s.keys.right) s.playerX += 280 * dt;
        s.playerX = Math.max(0, Math.min(width - s.playerWidth, s.playerX));

        // Update Invaders movement
        let switchDir = false;
        const aliveInvaders = s.invaders.filter((inv) => inv.alive);

        if (aliveInvaders.length === 0) {
          // Next wave!
          s.wave += 1;
          setWave(s.wave);
          initWave(width, s.wave);
        } else {
          for (const inv of aliveInvaders) {
            inv.x += s.invaderDir * s.invaderSpeed * dt;
            if (inv.x + inv.width >= width - 8 || inv.x <= 8) {
              switchDir = true;
            }
            // Invaders reached bottom
            if (inv.y + inv.height >= height - 24) {
              s.isGameOver = true;
              s.isPlaying = false;
              setIsGameOver(true);
              setIsPlaying(false);
            }
          }

          if (switchDir) {
            s.invaderDir *= -1;
            for (const inv of aliveInvaders) {
              inv.y += 10;
            }
          }

          // Random enemy bullet
          if (now - s.lastInvaderShotTime > Math.max(900 - s.wave * 80, 400)) {
            const shooter = aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)];
            if (shooter) {
              s.bullets.push({
                x: shooter.x + shooter.width / 2,
                y: shooter.y + shooter.height,
                vy: 180 + s.wave * 15,
                fromPlayer: false,
              });
              s.lastInvaderShotTime = now;
            }
          }
        }

        // Update Bullets
        for (let i = s.bullets.length - 1; i >= 0; i--) {
          const b = s.bullets[i];
          b.y += b.vy * dt;

          // Player bullet hit invader
          if (b.fromPlayer) {
            for (const inv of aliveInvaders) {
              if (
                b.x >= inv.x &&
                b.x <= inv.x + inv.width &&
                b.y >= inv.y &&
                b.y <= inv.y + inv.height
              ) {
                inv.alive = false;
                s.bullets.splice(i, 1);
                const points = (3 - inv.row) * 10;
                s.score += points;
                setScore(s.score);

                // Spawn explosion particles
                for (let p = 0; p < 8; p++) {
                  s.particles.push({
                    x: inv.x + inv.width / 2,
                    y: inv.y + inv.height / 2,
                    vx: (Math.random() - 0.5) * 120,
                    vy: (Math.random() - 0.5) * 120,
                    alpha: 1,
                    color: inv.color,
                  });
                }

                // Update high score
                setHighScore((prev) => {
                  const next = Math.max(prev, s.score);
                  localStorage.setItem("space_invaders_hi", next.toString());
                  return next;
                });
                break;
              }
            }
          } else {
            // Enemy bullet hit player
            const py = height - 22;
            if (
              b.x >= s.playerX &&
              b.x <= s.playerX + s.playerWidth &&
              b.y >= py &&
              b.y <= py + s.playerHeight
            ) {
              s.bullets.splice(i, 1);
              s.lives -= 1;
              setLives(s.lives);

              // Player hit spark
              for (let p = 0; p < 12; p++) {
                s.particles.push({
                  x: s.playerX + s.playerWidth / 2,
                  y: py,
                  vx: (Math.random() - 0.5) * 140,
                  vy: -Math.random() * 80,
                  alpha: 1,
                  color: "#ef4444",
                });
              }

              if (s.lives <= 0) {
                s.isGameOver = true;
                s.isPlaying = false;
                setIsGameOver(true);
                setIsPlaying(false);
              }
            }
          }

          // Out of screen
          if (b.y < -10 || b.y > height + 10) {
            s.bullets.splice(i, 1);
          }
        }
      }

      // Update Particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.alpha -= dt * 2.5;
        if (p.alpha <= 0) {
          s.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fillRect(p.x, p.y, 2.5, 2.5);
        ctx.globalAlpha = 1;
      }

      // Draw Invaders (Retro Pixel Alien Sprites)
      for (const inv of s.invaders) {
        if (!inv.alive) continue;
        ctx.fillStyle = inv.color;

        // Pixel alien rendering
        const ix = inv.x;
        const iy = inv.y;
        // Head / antennae
        ctx.fillRect(ix + 3, iy, 4, 3);
        ctx.fillRect(ix + 13, iy, 4, 3);
        // Body core
        ctx.fillRect(ix + 2, iy + 3, 16, 7);
        // Eyes (clear pixels)
        ctx.clearRect(ix + 5, iy + 5, 2.5, 3);
        ctx.clearRect(ix + 12.5, iy + 5, 2.5, 3);
        // Legs
        ctx.fillRect(ix, iy + 9, 3, 5);
        ctx.fillRect(ix + 17, iy + 9, 3, 5);
        ctx.fillRect(ix + 6, iy + 10, 8, 3);
      }

      // Draw Bullets
      for (const b of s.bullets) {
        if (b.fromPlayer) {
          ctx.fillStyle = "#818cf8";
          ctx.fillRect(b.x - 1.5, b.y, 3, 8);
          // Laser glow
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(b.x - 0.75, b.y + 1, 1.5, 5);
        } else {
          ctx.fillStyle = "#f87171";
          ctx.fillRect(b.x - 1.5, b.y, 3, 6);
        }
      }

      // Draw Player Cannon
      const px = s.playerX;
      const py = height - 22;
      ctx.fillStyle = "#6366f1";

      // Cannon Base
      ctx.beginPath();
      ctx.roundRect(px, py + 5, s.playerWidth, 9, 3);
      ctx.fill();

      // Cannon Turret
      ctx.fillStyle = "#818cf8";
      ctx.fillRect(px + s.playerWidth / 2 - 2.5, py, 5, 6);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(px + s.playerWidth / 2 - 1, py, 2, 4);

      s.animId = requestAnimationFrame(loop);
    };

    s.animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(s.animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isEs = i18n.language.startsWith("es");

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      className="w-full max-w-4xl mx-auto relative select-none cursor-crosshair overflow-hidden group border-0 bg-transparent py-2"
    >
      {/* Seamless Floating Telemetry HUD */}
      <div className="flex items-center justify-between px-2 py-1 font-mono text-[11px] text-muted border-0 bg-transparent">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-fg tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            SPACE INVADERS
          </span>
          <span className="hidden sm:inline text-muted/60">WAVE {wave}</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 text-muted">
            <Trophy size={11} className="text-yellow-500" />
            <span>HI {highScore.toString().padStart(4, "0")}</span>
          </div>
          <span className="text-fg font-bold">SCORE {score.toString().padStart(4, "0")}</span>
          <div className="flex items-center gap-1 text-primary">
            {Array.from({ length: 3 }).map((_, i) => (
              <Shield
                key={i}
                size={11}
                className={i < lives ? "text-primary fill-primary" : "text-muted/30"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Transparent Embedded Game Canvas */}
      <div className="relative w-full h-[180px]">
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Start Game Prompt (Floating seamlessly) */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-border/60 backdrop-blur-sm font-mono text-xs text-muted group-hover:text-primary transition-colors shadow-sm">
              <Play size={13} className="text-primary fill-primary" />
              <span>
                {isEs
                  ? "Clic o Espacio para Iniciar (Mueve con el ratón o flechas)"
                  : "Click or Space to Play (Move mouse or arrow keys)"}
              </span>
            </div>
          </div>
        )}

        {/* Game Over Screen (Floating seamlessly) */}
        {isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg/50 backdrop-blur-[2px]">
            <div className="text-center space-y-1.5">
              <p className="font-mono text-xs font-bold text-red-400 tracking-widest uppercase">
                {isEs ? "INVASIÓN COMPLETADA — GAME OVER" : "INVASION COMPLETED — GAME OVER"}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono text-fg hover:border-primary/50 transition-colors">
                <RotateCcw size={11} className="text-primary" />
                <span>{isEs ? "Clic para revancha" : "Click to rematch"}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Understated Controls Hint */}
      <div className="px-2 pt-1 flex items-center justify-between font-mono text-[10px] text-muted/70">
        <span>[← → / MOUSE] {isEs ? "Mover cañón" : "Move ship"}</span>
        <span>[SPACE / CLICK] {isEs ? "Disparar láser" : "Shoot laser"}</span>
      </div>
    </div>
  );
};
