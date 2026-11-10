import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useTranslation } from "react-i18next";
import { Gamepad2, Sparkles, RotateCcw, Volume2, VolumeX } from "lucide-react";

// ==========================================
// SPACE INVADERS AUTHENTIC BITMAP MATRICES
// ==========================================

const SQUID_F1 = [
  "00011000",
  "00111100",
  "01111110",
  "11011011",
  "11111111",
  "00100100",
  "01011010",
  "10100101",
];

const SQUID_F2 = [
  "00011000",
  "00111100",
  "01111110",
  "11011011",
  "11111111",
  "00100100",
  "01000010",
  "00100100",
];

const CRAB_F1 = [
  "00100000100",
  "00010001000",
  "00111111100",
  "01101110110",
  "11111111111",
  "10111111101",
  "10100000101",
  "00011011000",
];

const CRAB_F2 = [
  "00100000100",
  "10010001001",
  "10111111101",
  "11101110111",
  "11111111111",
  "00111111100",
  "00100000100",
  "01000000010",
];

const OCTOPUS_F1 = [
  "000011110000",
  "011111111110",
  "111111111111",
  "111001100111",
  "111111111111",
  "000110011000",
  "001101101100",
  "110000000011",
];

const OCTOPUS_F2 = [
  "000011110000",
  "011111111110",
  "111111111111",
  "111001100111",
  "111111111111",
  "001100110000",
  "011011011000",
  "001100110000",
];

function buildVoxelAlienGeometry(
  map: string[],
  voxelW = 0.44,
  voxelH = 0.44,
  depth = 0.65
): THREE.BufferGeometry {
  const geometries: THREE.BufferGeometry[] = [];
  const rows = map.length;
  const cols = map[0].length;
  const baseBox = new THREE.BoxGeometry(voxelW, voxelH, depth);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (map[r][c] === "1") {
        const box = baseBox.clone();
        const x = (c - (cols - 1) / 2) * voxelW;
        const y = ((rows - 1) / 2 - r) * voxelH;
        box.translate(x, y, 0);
        geometries.push(box);
      }
    }
  }

  baseBox.dispose();
  if (geometries.length === 0) return new THREE.BufferGeometry();
  const merged = mergeGeometries(geometries);
  geometries.forEach((g) => g.dispose());
  return merged || new THREE.BufferGeometry();
}

interface Invader3D {
  mesh1: THREE.Mesh;
  mesh2: THREE.Mesh;
  group: THREE.Group;
  alive: boolean;
  row: number;
  col: number;
  type: number;
}

interface Bullet3D {
  mesh: THREE.Mesh;
  light?: THREE.PointLight;
  x: number;
  y: number;
  vy: number;
  fromPlayer: boolean;
}

interface Particle3D {
  mesh: THREE.Mesh;
  vx: number;
  vy: number;
  vz: number;
  rotSpeed: THREE.Vector3;
  life: number;
  maxLife: number;
}

interface SpaceInvadersProps {
  className?: string;
}

export const SpaceInvaders: React.FC<SpaceInvadersProps> = ({ className = "" }) => {
  const { i18n } = useTranslation();
  const mountRef = useRef<HTMLDivElement>(null);

  const [isManualControl, setIsManualControl] = useState(false);
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [isMuted, setIsMuted] = useState(true); // Default muted for unobtrusive ambient autoplay

  const isManualRef = useRef(false);
  isManualRef.current = isManualControl;

  const isMutedRef = useRef(true);
  isMutedRef.current = isMuted;

  const gameRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    playerGroup: null as THREE.Group | null,
    playerLight: null as THREE.PointLight | null,
    starField: null as THREE.Points | null,
    gridHelper: null as THREE.GridHelper | null,
    invaders: [] as Invader3D[],
    bullets: [] as Bullet3D[],
    particles: [] as Particle3D[],
    playerX: 0,
    targetPlayerX: 0,
    playerRoll: 0,
    playerSpeed: 42,
    invaderDir: 1,
    invaderSpeed: 10,
    lastShootTime: 0,
    lastInvaderShotTime: 0,
    lastAnimStepTime: 0,
    lastAiDecisionTime: 0,
    animStep: 0,
    animId: 0,
    score: 0,
    wave: 1,
    keys: { left: false, right: false, shoot: false },
  });

  const playSound = (type: "laser" | "explosion" | "hit" | "win") => {
    if (isMutedRef.current) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === "laser") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.1);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === "explosion") {
        osc.type = "square";
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "hit") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(130, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === "win") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523, now);
        osc.frequency.setValueAtTime(659, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch {
      // Audio suppression handled
    }
  };

  // Build authentic 3D Spacecraft
  const createPlayerShip = (): THREE.Group => {
    const ship = new THREE.Group();

    // 1. Armored chassis
    const baseGeo = new THREE.BoxGeometry(5.2, 1.4, 1.2);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x4338ca,
      metalness: 0.85,
      roughness: 0.25,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.set(0, -0.6, 0);
    ship.add(baseMesh);

    // 2. Mid fuselage
    const midGeo = new THREE.BoxGeometry(3.2, 1.6, 1.4);
    const midMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.9,
      roughness: 0.2,
    });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    midMesh.position.set(0, 0.2, 0.1);
    ship.add(midMesh);

    // 3. Laser cannons
    const turretGeo = new THREE.CylinderGeometry(0.35, 0.45, 2.8, 10);
    const turretMat = new THREE.MeshStandardMaterial({
      color: 0xe0e7ff,
      metalness: 0.95,
      roughness: 0.1,
    });
    const turretMesh = new THREE.Mesh(turretGeo, turretMat);
    turretMesh.rotation.x = Math.PI / 2;
    turretMesh.position.set(0, 1.6, 0.2);
    ship.add(turretMesh);

    const leftCannon = new THREE.Mesh(turretGeo.clone(), turretMat);
    leftCannon.scale.set(0.65, 0.75, 0.65);
    leftCannon.rotation.x = Math.PI / 2;
    leftCannon.position.set(-2.2, 0.8, 0);
    ship.add(leftCannon);

    const rightCannon = new THREE.Mesh(turretGeo.clone(), turretMat);
    rightCannon.scale.set(0.65, 0.75, 0.65);
    rightCannon.rotation.x = Math.PI / 2;
    rightCannon.position.set(2.2, 0.8, 0);
    ship.add(rightCannon);

    // 4. Glowing pilot cockpit
    const coreGeo = new THREE.SphereGeometry(0.6, 12, 12);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0ea5e9,
      emissiveIntensity: 1.4,
      roughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.scale.set(0.9, 1.4, 0.7);
    coreMesh.position.set(0, 0.4, 0.7);
    ship.add(coreMesh);

    // 5. Thruster Plasma Exits
    const thrusterGeo = new THREE.CylinderGeometry(0.35, 0.5, 0.7, 8);
    const thrusterMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const leftThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    leftThruster.rotation.x = Math.PI / 2;
    leftThruster.position.set(-1.2, -1.3, 0);
    ship.add(leftThruster);

    const rightThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    rightThruster.rotation.x = Math.PI / 2;
    rightThruster.position.set(1.2, -1.3, 0);
    ship.add(rightThruster);

    return ship;
  };

  const createExplosion = (x: number, y: number, z: number, colorHex: number) => {
    const g = gameRef.current;
    if (!g.scene) return;

    const count = 16;
    const geom = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const mat = new THREE.MeshBasicMaterial({ color: colorHex });

    for (let i = 0; i < count; i++) {
      const pMesh = new THREE.Mesh(geom, mat.clone());
      pMesh.position.set(x, y, z);
      g.scene.add(pMesh);

      const angle = Math.random() * Math.PI * 2;
      const speed = 8 + Math.random() * 16;
      const zSpeed = (Math.random() - 0.5) * 12;

      g.particles.push({
        mesh: pMesh,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        vz: zSpeed,
        rotSpeed: new THREE.Vector3(Math.random() * 8, Math.random() * 8, Math.random() * 8),
        life: 0,
        maxLife: 0.45 + Math.random() * 0.35,
      });
    }

    const flashLight = new THREE.PointLight(colorHex, 4, 20);
    flashLight.position.set(x, y, z + 2);
    g.scene.add(flashLight);
    setTimeout(() => {
      if (g.scene) g.scene.remove(flashLight);
      flashLight.dispose();
    }, 100);
  };

  const alienGeometriesRef = useRef<{
    squid1: THREE.BufferGeometry;
    squid2: THREE.BufferGeometry;
    crab1: THREE.BufferGeometry;
    crab2: THREE.BufferGeometry;
    octopus1: THREE.BufferGeometry;
    octopus2: THREE.BufferGeometry;
  } | null>(null);

  const initWave = (waveNum: number) => {
    const g = gameRef.current;
    if (!g.scene || !alienGeometriesRef.current) return;

    for (const inv of g.invaders) {
      g.scene.remove(inv.group);
    }
    g.invaders = [];

    const geoms = alienGeometriesRef.current;
    const cols = 8;
    const rows = 3;
    const spacingX = 6.4;
    const spacingY = 5.6;
    const startX = -((cols - 1) * spacingX) / 2;
    const startY = 22;

    const mats = [
      new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        emissive: 0x9333ea,
        emissiveIntensity: 0.65,
        metalness: 0.75,
        roughness: 0.3,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        emissive: 0x0891b2,
        emissiveIntensity: 0.65,
        metalness: 0.8,
        roughness: 0.25,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x059669,
        emissiveIntensity: 0.65,
        metalness: 0.75,
        roughness: 0.3,
      }),
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const type = r;
        const group = new THREE.Group();

        let geom1: THREE.BufferGeometry;
        let geom2: THREE.BufferGeometry;

        if (type === 0) {
          geom1 = geoms.squid1;
          geom2 = geoms.squid2;
        } else if (type === 1) {
          geom1 = geoms.crab1;
          geom2 = geoms.crab2;
        } else {
          geom1 = geoms.octopus1;
          geom2 = geoms.octopus2;
        }

        const mesh1 = new THREE.Mesh(geom1, mats[type]);
        const mesh2 = new THREE.Mesh(geom2, mats[type]);
        mesh2.visible = false;

        group.add(mesh1);
        group.add(mesh2);

        const gx = startX + c * spacingX;
        const gy = startY - r * spacingY;
        group.position.set(gx, gy, 0);
        g.scene.add(group);

        g.invaders.push({
          mesh1,
          mesh2,
          group,
          alive: true,
          row: r,
          col: c,
          type,
        });
      }
    }

    g.invaderSpeed = 7 + waveNum * 2.2;
    g.invaderDir = 1;
    g.wave = waveNum;
    setWave(waveNum);
  };

  const shootPlayer = () => {
    const g = gameRef.current;
    if (!g.scene) return;

    const now = performance.now();
    if (now - g.lastShootTime < 210) return;
    g.lastShootTime = now;

    const offsets = [-2.2, 2.2];
    const laserGeo = new THREE.CylinderGeometry(0.18, 0.18, 2.8, 8);
    const laserMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });

    offsets.forEach((offsetX) => {
      if (!g.scene) return;
      const mesh = new THREE.Mesh(laserGeo, laserMat);
      mesh.position.set(g.playerX + offsetX, -17.5, 0.4);
      mesh.rotation.x = Math.PI / 2;
      g.scene.add(mesh);

      const pLight = new THREE.PointLight(0x60a5fa, 2.5, 12);
      pLight.position.set(g.playerX + offsetX, -17.5, 1.0);
      g.scene.add(pLight);

      g.bullets.push({
        mesh,
        light: pLight,
        x: g.playerX + offsetX,
        y: -17.5,
        vy: 58,
        fromPlayer: true,
      });
    });

    playSound("laser");
  };

  const shootInvader = (invader: Invader3D) => {
    const g = gameRef.current;
    if (!g.scene) return;

    const rayGeo = new THREE.CylinderGeometry(0.24, 0.24, 2.0, 6);
    const rayMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
    const mesh = new THREE.Mesh(rayGeo, rayMat);
    mesh.position.set(invader.group.position.x, invader.group.position.y - 1.5, 0.2);
    mesh.rotation.x = Math.PI / 2;
    g.scene.add(mesh);

    const bLight = new THREE.PointLight(0xf43f5e, 2, 8);
    bLight.position.set(invader.group.position.x, invader.group.position.y - 1.5, 0.6);
    g.scene.add(bLight);

    g.bullets.push({
      mesh,
      light: bLight,
      x: invader.group.position.x,
      y: invader.group.position.y - 1.5,
      vy: -24 - g.wave * 2.2,
      fromPlayer: false,
    });
  };

  // Setup WebGL Scene and Autoplay Engine
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 700;
    const height = mount.clientHeight || 340;

    alienGeometriesRef.current = {
      squid1: buildVoxelAlienGeometry(SQUID_F1),
      squid2: buildVoxelAlienGeometry(SQUID_F2),
      crab1: buildVoxelAlienGeometry(CRAB_F1),
      crab2: buildVoxelAlienGeometry(CRAB_F2),
      octopus1: buildVoxelAlienGeometry(OCTOPUS_F1),
      octopus2: buildVoxelAlienGeometry(OCTOPUS_F2),
    };

    const scene = new THREE.Scene();
    // Seamless black atmospheric fog
    scene.fog = new THREE.FogExp2(0x000000, 0.015);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, -37, 29);
    camera.lookAt(0, 4, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xc7d2fe, 1.8);
    dirLight.position.set(15, -10, 35);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x4338ca, 0.8);
    backLight.position.set(-15, 30, 20);
    scene.add(backLight);

    // Grid Floor (Expansive full-screen arcade grid)
    const gridHelper = new THREE.GridHelper(240, 48, 0x6366f1, 0x1e1b4b);
    gridHelper.position.set(0, 0, -4);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    // Starfield across ultrawide screen
    const starCount = 520;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 260;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 160;
      starPos[i * 3 + 2] = -5 + Math.random() * 35;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.8,
      transparent: true,
      opacity: 0.65,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Player Spacecraft
    const playerGroup = createPlayerShip();
    playerGroup.position.set(0, -20, 0);
    scene.add(playerGroup);

    const playerLight = new THREE.PointLight(0x38bdf8, 2, 16);
    playerLight.position.set(0, -19, 2);
    scene.add(playerLight);

    const g = gameRef.current;
    g.scene = scene;
    g.camera = camera;
    g.renderer = renderer;
    g.playerGroup = playerGroup;
    g.playerLight = playerLight;
    g.starField = starField;
    g.gridHelper = gridHelper;

    // Start running wave 1 immediately (Autoplay)
    initWave(1);

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let lastTime = performance.now();
    const gameLoop = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Flow background stars and grid
      if (starField) {
        const positions = starField.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < starCount; i++) {
          positions[i * 3 + 1] -= dt * 24;
          if (positions[i * 3 + 1] < -50) {
            positions[i * 3 + 1] = 50;
          }
        }
        starField.geometry.attributes.position.needsUpdate = true;
      }

      if (gridHelper) {
        gridHelper.position.y = (gridHelper.position.y - dt * 10) % 4;
      }

      // Alternate alien walk animation frames
      if (now - g.lastAnimStepTime > 420) {
        g.lastAnimStepTime = now;
        g.animStep = g.animStep === 0 ? 1 : 0;
        for (const inv of g.invaders) {
          if (inv.alive) {
            inv.mesh1.visible = g.animStep === 0;
            inv.mesh2.visible = g.animStep === 1;
          }
        }
      }

      // ==========================================
      // AUTONOMOUS AI PLAYER MODE (Plays on its own)
      // ==========================================
      if (!isManualRef.current) {
        if (now - g.lastAiDecisionTime > 180) {
          g.lastAiDecisionTime = now;

          const aliveInvaders = g.invaders.filter((inv) => inv.alive);
          if (aliveInvaders.length > 0) {
            // Pick bottom-most or closest enemy
            const sortedByThreat = [...aliveInvaders].sort((a, b) => a.group.position.y - b.group.position.y);
            const target = sortedByThreat[0];

            let desiredX = target.group.position.x + (Math.sin(now * 0.003) * 2.0);

            // Avoid incoming enemy plasma bombs
            const incomingBomb = g.bullets.find(
              (b) => !b.fromPlayer && Math.abs(b.x - g.playerX) < 4.5 && b.y < 0 && b.y > -19
            );
            if (incomingBomb) {
              desiredX = incomingBomb.x > g.playerX ? g.playerX - 6 : g.playerX + 6;
            }

            g.targetPlayerX = Math.max(-27, Math.min(27, desiredX));

            // Autonomous fire
            if (Math.abs(target.group.position.x - g.playerX) < 3.8 || Math.random() < 0.4) {
              shootPlayer();
            }
          }
        }
      } else {
        // MANUAL PLAYER CONTROLS
        if (g.keys.left) {
          g.targetPlayerX = Math.max(g.targetPlayerX - g.playerSpeed * dt, -27);
        }
        if (g.keys.right) {
          g.targetPlayerX = Math.min(g.targetPlayerX + g.playerSpeed * dt, 27);
        }
      }

      // Smooth lerp movement and 3D banking roll
      const prevX = g.playerX;
      g.playerX += (g.targetPlayerX - g.playerX) * 14 * dt;
      const deltaVx = (g.playerX - prevX) / (dt || 0.016);

      if (playerGroup) {
        playerGroup.position.x = g.playerX;
        const targetRoll = -Math.max(Math.min(deltaVx * 0.025, 0.45), -0.45);
        g.playerRoll += (targetRoll - g.playerRoll) * 10 * dt;
        playerGroup.rotation.y = g.playerRoll;
        playerGroup.rotation.z = g.playerRoll * 0.7;

        if (playerLight) {
          playerLight.position.x = g.playerX;
        }
      }

      // Alien Movement & Step Down
      let minX = Infinity;
      let maxX = -Infinity;
      let aliveCount = 0;

      for (let i = 0; i < g.invaders.length; i++) {
        const inv = g.invaders[i];
        if (!inv.alive) continue;
        aliveCount++;

        inv.group.position.x += g.invaderDir * g.invaderSpeed * dt;
        inv.group.rotation.x = Math.sin(now * 0.003 + i) * 0.12;

        if (inv.group.position.x < minX) minX = inv.group.position.x;
        if (inv.group.position.x > maxX) maxX = inv.group.position.x;

        // Reset if invaders reached Earth
        if (inv.group.position.y <= -16) {
          createExplosion(g.playerX, -20, 0, 0xef4444);
          initWave(1);
          break;
        }
      }

      const boundary = 28;
      if (g.invaderDir === 1 && maxX > boundary) {
        g.invaderDir = -1;
        for (const inv of g.invaders) {
          if (inv.alive) inv.group.position.y -= 1.8;
        }
      } else if (g.invaderDir === -1 && minX < -boundary) {
        g.invaderDir = 1;
        for (const inv of g.invaders) {
          if (inv.alive) inv.group.position.y -= 1.8;
        }
      }

      // Wave Cleared -> Advance Automatically
      if (aliveCount === 0) {
        playSound("win");
        initWave(g.wave + 1);
      }

      // Enemy Plasma Attacks
      if (aliveCount > 0) {
        if (now - g.lastInvaderShotTime > Math.max(900 - g.wave * 100, 320)) {
          g.lastInvaderShotTime = now;
          const aliveInvaders = g.invaders.filter((inv) => inv.alive);
          if (aliveInvaders.length > 0) {
            const shooter = aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)];
            shootInvader(shooter);
          }
        }
      }

      // Update Bullets & Collisions
      for (let i = g.bullets.length - 1; i >= 0; i--) {
        const b = g.bullets[i];
        b.y += b.vy * dt;
        b.mesh.position.y = b.y;
        if (b.light) b.light.position.y = b.y;

        if (b.fromPlayer) {
          let hit = false;
          for (const inv of g.invaders) {
            if (!inv.alive) continue;
            const dist = Math.hypot(b.x - inv.group.position.x, b.y - inv.group.position.y);
            if (dist < 2.5) {
              inv.alive = false;
              scene.remove(inv.group);

              const colorHex = inv.type === 0 ? 0xc084fc : inv.type === 1 ? 0x22d3ee : 0x34d399;
              createExplosion(inv.group.position.x, inv.group.position.y, 0, colorHex);
              playSound("explosion");

              g.score += (3 - inv.type) * 100;
              setScore(g.score);

              hit = true;
              break;
            }
          }

          if (hit || b.y > 35) {
            scene.remove(b.mesh);
            if (b.light) scene.remove(b.light);
            b.mesh.geometry.dispose();
            g.bullets.splice(i, 1);
            continue;
          }
        } else {
          // Enemy hitting player
          const distToPlayer = Math.hypot(b.x - g.playerX, b.y - (-20));
          if (distToPlayer < 2.8) {
            createExplosion(g.playerX, -20, 0, 0xef4444);
            playSound("hit");

            scene.remove(b.mesh);
            if (b.light) scene.remove(b.light);
            b.mesh.geometry.dispose();
            g.bullets.splice(i, 1);
            continue;
          }

          if (b.y < -35) {
            scene.remove(b.mesh);
            if (b.light) scene.remove(b.light);
            b.mesh.geometry.dispose();
            g.bullets.splice(i, 1);
            continue;
          }
        }
      }

      // Update Particle Physics
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const p = g.particles[i];
        p.life += dt;
        p.mesh.position.x += p.vx * dt;
        p.mesh.position.y += p.vy * dt;
        p.mesh.position.z += p.vz * dt;
        p.mesh.rotation.x += p.rotSpeed.x * dt;
        p.mesh.rotation.y += p.rotSpeed.y * dt;

        const progress = p.life / p.maxLife;
        const scale = Math.max(1 - progress, 0.01);
        p.mesh.scale.set(scale, scale, scale);

        if (p.life >= p.maxLife) {
          scene.remove(p.mesh);
          p.mesh.geometry.dispose();
          g.particles.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
      g.animId = requestAnimationFrame(gameLoop);
    };

    g.animId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(g.animId);
      window.removeEventListener("resize", handleResize);

      for (const inv of g.invaders) {
        scene.remove(inv.group);
      }
      for (const b of g.bullets) {
        scene.remove(b.mesh);
        if (b.light) scene.remove(b.light);
        b.mesh.geometry.dispose();
      }
      for (const p of g.particles) {
        scene.remove(p.mesh);
        p.mesh.geometry.dispose();
      }

      if (alienGeometriesRef.current) {
        alienGeometriesRef.current.squid1.dispose();
        alienGeometriesRef.current.squid2.dispose();
        alienGeometriesRef.current.crab1.dispose();
        alienGeometriesRef.current.crab2.dispose();
        alienGeometriesRef.current.octopus1.dispose();
        alienGeometriesRef.current.octopus2.dispose();
      }

      renderer.dispose();
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Keyboard controls (Automatically switches to manual mode when keys are pressed)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        g.keys.left = true;
        if (!isManualRef.current) setIsManualControl(true);
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        g.keys.right = true;
        if (!isManualRef.current) setIsManualControl(true);
      }
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (!isManualRef.current) setIsManualControl(true);
        shootPlayer();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        g.keys.left = false;
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        g.keys.right = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Pointer movement tracking (Switches to manual mode on drag / click)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isManualRef.current) return;
    const mount = mountRef.current;
    if (!mount) return;
    const rect = mount.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(clientX / rect.width, 1));
    const worldX = (ratio - 0.5) * 54;
    gameRef.current.targetPlayerX = worldX;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only capture if not clicking an overlay control button
    if (!isManualRef.current) {
      setIsManualControl(true);
    }
    const mount = mountRef.current;
    if (mount) {
      const rect = mount.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(clientX / rect.width, 1));
      gameRef.current.targetPlayerX = (ratio - 0.5) * 54;
    }
    shootPlayer();
  };

  const isEs = i18n.language.startsWith("es");
  const isJa = i18n.language.startsWith("ja");

  const takeControlText = isJa ? "操作開始" : isEs ? "Tomar Control" : "Take Control";
  const autoModeText = isJa ? "自動操縦" : isEs ? "Modo Auto" : "Auto Mode";
  const returnAutoTitle = isJa ? "自動操縦に戻る" : isEs ? "Volver a modo automático" : "Return to Autoplay";
  const moveText = isJa ? "移動" : isEs ? "Maniobrar" : "Move";
  const fireText = isJa ? "発射" : isEs ? "Láser" : "Fire";
  const soundTitle = isJa
    ? (isMuted ? "音声を有効化" : "ミュート")
    : (isMuted ? "Activar sonido" : "Silenciar");

  return (
    <div
      className={`w-full relative select-none overflow-hidden my-6 border-0 ${className}`}
    >
      {/* Seamless Integrated Arcade Stage (Continuous Black Degradation, Zero Borders) */}
      <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border-0 bg-neutral-950 dark:bg-transparent shadow-xl dark:shadow-none">
        {/* Continuous Black Degradation Backdrop — solid pure black behind gameplay, softly fades to transparent at edges */}
        <div
          className="absolute inset-0 pointer-events-none bg-black"
          style={{
            maskImage:
              "radial-gradient(ellipse 92% 86% at 50% 50%, black 50%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 92% 86% at 50% 50%, black 50%, transparent 100%)",
          }}
        />

        {/* Canvas Mount with smooth radial edge feathering */}
        <div
          ref={mountRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          className="relative z-10 w-full h-full cursor-crosshair touch-none border-0"
          style={{
            maskImage:
              "radial-gradient(ellipse 96% 90% at 50% 50%, black 65%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 96% 90% at 50% 50%, black 65%, transparent 100%)",
          }}
        />

        {/* Minimalist Floating Status Bar (Top Left) — Zero Borders */}
        <div className="absolute top-4 left-6 z-20 flex items-center gap-3 font-mono text-[11px] pointer-events-none">
          <span className="text-neutral-300 font-medium tracking-wider">
            WAVE {wave} • {score.toString().padStart(5, "0")}
          </span>
        </div>

        {/* Minimalist Action Controls (Top Right) — Zero Borders */}
        <div className="absolute top-4 right-6 z-20 flex items-center gap-2">
          {!isManualControl ? (
            <button
              type="button"
              onClick={() => setIsManualControl(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-medium shadow-sm backdrop-blur-md transition-all hover:text-primary active:scale-95 cursor-pointer border-0"
            >
              <Gamepad2 size={13} className="text-primary animate-pulse" />
              <span>{takeControlText}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsManualControl(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-300 text-xs font-mono shadow-sm backdrop-blur-md transition-all hover:text-primary active:scale-95 cursor-pointer border-0"
              title={returnAutoTitle}
            >
              <RotateCcw size={12} />
              <span>{autoModeText}</span>
            </button>
          )}

          {/* Audio toggle — Zero Borders */}
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer shadow-xs border-0"
            title={soundTitle}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        </div>

        {/* Minimalist Architectural Instruction Keycaps (Bottom Center) — Zero Borders */}
        <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="inline-flex items-center gap-4 px-4 py-1.5 rounded-lg bg-black/60 backdrop-blur-md shadow-xs font-mono text-[11px] text-neutral-300 border-0">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded-md bg-white/15 text-[10px] text-neutral-200 font-semibold shadow-xs border-0">
                ←
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded-md bg-white/15 text-[10px] text-neutral-200 font-semibold shadow-xs border-0">
                →
              </kbd>
              <span className="text-[10px] uppercase tracking-wider">{moveText}</span>
            </span>

            <span className="w-1 h-1 rounded-full bg-neutral-600" />

            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-0.5 rounded-md bg-white/15 text-[10px] text-neutral-200 font-semibold shadow-xs border-0">
                SPACE
              </kbd>
              <span className="text-[10px] uppercase tracking-wider">{fireText}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
