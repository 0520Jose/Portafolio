import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeBackgroundProps {
  className?: string;
}

/**
 * Section-Specific Dynamic 3D Spatial Canvas
 *
 * Each view has a completely unique visual architecture:
 * 1. Hero (About): Cosmic distributed node constellation with rotating dual-icosahedron core.
 * 2. Projects: Perspective 3D CAD Blueprint Grid Floor with vertical architectural node pillars.
 * 3. Skills: 3D Fibonacci Neural Sphere with synaptic surface arcs and dual-axis gimbal rings.
 * 4. Contact: Radial Radar Beacon with expanding concentric pulse waves and telemetry streams.
 *
 * Includes smooth viewport weight transitions, mouse parallax, dark/light adaptation,
 * and strict 60 FPS WebGL lifecycle management.
 */
export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ className = "" }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 75);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const isDark = () => document.documentElement.classList.contains("dark");

    const updateFog = () => {
      const fogColor = isDark() ? 0x09090b : 0xf8fafc;
      scene.fog = new THREE.FogExp2(fogColor, 0.008);
    };
    updateFog();

    // Reusable Soft Glow Point Texture
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.25, "rgba(255, 255, 255, 0.85)");
      grad.addColorStop(0.55, "rgba(129, 140, 248, 0.5)");
      grad.addColorStop(0.85, "rgba(99, 102, 241, 0.1)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };
    const pointTexture = createCircleTexture();

    // ==============================================================
    // VIEW 1: HERO (About) — Cosmic Node Constellation & Icosahedron
    // ==============================================================
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    const heroNodeCount = 70;
    const heroPositions = new Float32Array(heroNodeCount * 3);
    const heroVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < heroNodeCount; i++) {
      heroPositions[i * 3] = (Math.random() - 0.5) * 130;
      heroPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      heroPositions[i * 3 + 2] = (Math.random() - 0.5) * 55;
      heroVelocities.push({
        x: (Math.random() - 0.5) * 0.035,
        y: (Math.random() - 0.5) * 0.035,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    const heroGeom = new THREE.BufferGeometry();
    heroGeom.setAttribute("position", new THREE.BufferAttribute(heroPositions, 3));

    const heroMat = new THREE.PointsMaterial({
      size: 3.2,
      map: pointTexture ?? undefined,
      color: 0x818cf8,
      transparent: true,
      opacity: isDark() ? 0.85 : 0.6,
      blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const heroPoints = new THREE.Points(heroGeom, heroMat);
    heroGroup.add(heroPoints);

    // Hero connection lines
    const heroMaxLines = heroNodeCount * 3;
    const heroLinePos = new Float32Array(heroMaxLines * 6);
    const heroLineCol = new Float32Array(heroMaxLines * 6);
    const heroLineGeom = new THREE.BufferGeometry();
    heroLineGeom.setAttribute("position", new THREE.BufferAttribute(heroLinePos, 3));
    heroLineGeom.setAttribute("color", new THREE.BufferAttribute(heroLineCol, 3));

    const heroLineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark() ? 0.35 : 0.25,
      blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const heroLines = new THREE.LineSegments(heroLineGeom, heroLineMat);
    heroGroup.add(heroLines);

    // Dual wireframe icosahedron
    const heroCore1 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(13, 1),
      new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: isDark() ? 0.15 : 0.09,
      })
    );
    heroCore1.position.set(30, -2, -10);
    heroGroup.add(heroCore1);

    const heroCore2 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(7, 0),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: isDark() ? 0.2 : 0.12,
      })
    );
    heroCore2.position.set(30, -2, -10);
    heroGroup.add(heroCore2);

    // ==============================================================
    // VIEW 2: PROJECTS — 3D CAD Blueprint Grid Floor & Node Pillars
    // ==============================================================
    const projectsGroup = new THREE.Group();
    projectsGroup.visible = false;
    scene.add(projectsGroup);

    // Perspective Blueprint Grid Floor (x: -90..90, z: -100..40) at y = -22
    const gridHelper = new THREE.GridHelper(160, 36, 0x0284c7, 0x1e293b);
    gridHelper.position.set(0, -22, -30);
    const gridMat = gridHelper.material as THREE.LineBasicMaterial;
    gridMat.transparent = true;
    gridMat.opacity = isDark() ? 0.32 : 0.22;
    projectsGroup.add(gridHelper);

    // Architectural Node Pillars (standing on the blueprint grid)
    const pillarCount = 20;
    const pillarPositions: THREE.Vector3[] = [];
    const pillarLinePositions = new Float32Array(pillarCount * 6);
    const pillarCapPositions = new Float32Array(pillarCount * 3);

    for (let p = 0; p < pillarCount; p++) {
      const px = ((p % 5) - 2) * 26 + (Math.random() - 0.5) * 8;
      const pz = (Math.floor(p / 5) - 2) * 24 + (Math.random() - 0.5) * 8 - 30;
      const height = 8 + Math.random() * 18;

      pillarPositions.push(new THREE.Vector3(px, -22 + height, pz));

      // Bottom point
      pillarLinePositions[p * 6] = px;
      pillarLinePositions[p * 6 + 1] = -22;
      pillarLinePositions[p * 6 + 2] = pz;
      // Top point
      pillarLinePositions[p * 6 + 3] = px;
      pillarLinePositions[p * 6 + 4] = -22 + height;
      pillarLinePositions[p * 6 + 5] = pz;

      // Cap point
      pillarCapPositions[p * 3] = px;
      pillarCapPositions[p * 3 + 1] = -22 + height;
      pillarCapPositions[p * 3 + 2] = pz;
    }

    const pillarLineGeom = new THREE.BufferGeometry();
    pillarLineGeom.setAttribute("position", new THREE.BufferAttribute(pillarLinePositions, 3));
    const pillarLineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: isDark() ? 0.45 : 0.3,
    });
    const pillarLines = new THREE.LineSegments(pillarLineGeom, pillarLineMat);
    projectsGroup.add(pillarLines);

    // Glowing Cap Beacons
    const pillarCapGeom = new THREE.BufferGeometry();
    pillarCapGeom.setAttribute("position", new THREE.BufferAttribute(pillarCapPositions, 3));
    const pillarCapMat = new THREE.PointsMaterial({
      size: 4.2,
      map: pointTexture ?? undefined,
      color: 0x67e8f9,
      transparent: true,
      opacity: isDark() ? 0.95 : 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pillarCaps = new THREE.Points(pillarCapGeom, pillarCapMat);
    projectsGroup.add(pillarCaps);

    // Connecting laser lines between adjacent pillar tops
    const laserPairs = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [5, 6], [6, 7], [7, 8], [8, 9],
      [10, 11], [11, 12], [12, 13], [13, 14],
      [0, 5], [5, 10], [1, 6], [6, 11], [2, 7], [7, 12], [3, 8], [8, 13],
    ];
    const laserPos = new Float32Array(laserPairs.length * 6);
    laserPairs.forEach(([a, b], idx) => {
      const pA = pillarPositions[a];
      const pB = pillarPositions[b];
      laserPos[idx * 6] = pA.x;
      laserPos[idx * 6 + 1] = pA.y;
      laserPos[idx * 6 + 2] = pA.z;
      laserPos[idx * 6 + 3] = pB.x;
      laserPos[idx * 6 + 4] = pB.y;
      laserPos[idx * 6 + 5] = pB.z;
    });
    const laserGeom = new THREE.BufferGeometry();
    laserGeom.setAttribute("position", new THREE.BufferAttribute(laserPos, 3));
    const laserMat = new THREE.LineBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: isDark() ? 0.3 : 0.2,
    });
    const laserSegments = new THREE.LineSegments(laserGeom, laserMat);
    projectsGroup.add(laserSegments);

    // ==============================================================
    // VIEW 3: SKILLS — 3D Fibonacci Neural Sphere & Gyroscope Gimbal
    // ==============================================================
    const skillsGroup = new THREE.Group();
    skillsGroup.visible = false;
    scene.add(skillsGroup);

    const sphereRadius = 22;
    const neuralNodeCount = 85;
    const neuralPositions = new Float32Array(neuralNodeCount * 3);
    const neuralCoords: THREE.Vector3[] = [];

    // Spherical Fibonacci distribution
    const phiGold = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < neuralNodeCount; i++) {
      const y = 1 - (i / (neuralNodeCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiGold * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const vec = new THREE.Vector3(x * sphereRadius, y * sphereRadius, z * sphereRadius);
      neuralCoords.push(vec);

      neuralPositions[i * 3] = vec.x;
      neuralPositions[i * 3 + 1] = vec.y;
      neuralPositions[i * 3 + 2] = vec.z;
    }

    const neuralGeom = new THREE.BufferGeometry();
    neuralGeom.setAttribute("position", new THREE.BufferAttribute(neuralPositions, 3));

    const neuralMat = new THREE.PointsMaterial({
      size: 3.6,
      map: pointTexture ?? undefined,
      color: 0xc084fc, // Violet
      transparent: true,
      opacity: isDark() ? 0.9 : 0.7,
      blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const neuralPoints = new THREE.Points(neuralGeom, neuralMat);
    skillsGroup.add(neuralPoints);

    // Neural Synaptic Chord Lines (connecting nearby nodes on the sphere)
    const maxChordLines = 180;
    const chordPos = new Float32Array(maxChordLines * 6);
    const chordCol = new Float32Array(maxChordLines * 6);
    let chordIdx = 0;

    for (let i = 0; i < neuralNodeCount; i++) {
      for (let j = i + 1; j < neuralNodeCount; j++) {
        const d = neuralCoords[i].distanceTo(neuralCoords[j]);
        if (d < 11.5 && chordIdx < maxChordLines) {
          const p = chordIdx * 6;
          chordPos[p] = neuralCoords[i].x;
          chordPos[p + 1] = neuralCoords[i].y;
          chordPos[p + 2] = neuralCoords[i].z;
          chordPos[p + 3] = neuralCoords[j].x;
          chordPos[p + 4] = neuralCoords[j].y;
          chordPos[p + 5] = neuralCoords[j].z;

          chordCol[p] = 0.65;
          chordCol[p + 1] = 0.51;
          chordCol[p + 2] = 0.98;

          chordCol[p + 3] = 0.35;
          chordCol[p + 4] = 0.75;
          chordCol[p + 5] = 0.98;

          chordIdx++;
        }
      }
    }

    const chordGeom = new THREE.BufferGeometry();
    chordGeom.setAttribute("position", new THREE.BufferAttribute(chordPos, 3));
    chordGeom.setAttribute("color", new THREE.BufferAttribute(chordCol, 3));
    chordGeom.setDrawRange(0, chordIdx * 2);

    const chordMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark() ? 0.38 : 0.25,
      blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const chordLines = new THREE.LineSegments(chordGeom, chordMat);
    skillsGroup.add(chordLines);

    // Dual-axis Gyroscope Gimbal Rings around the neural sphere
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: isDark() ? 0.14 : 0.08,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: isDark() ? 0.12 : 0.07,
    });

    const gimbalRing1 = new THREE.Mesh(new THREE.TorusGeometry(26, 0.3, 6, 48), ringMat1);
    const gimbalRing2 = new THREE.Mesh(new THREE.TorusGeometry(29, 0.3, 6, 48), ringMat2);
    skillsGroup.add(gimbalRing1);
    skillsGroup.add(gimbalRing2);

    // ==============================================================
    // VIEW 4: CONTACT — Radar Telemetry Beacon & Concentric Wave Rings
    // ==============================================================
    const contactGroup = new THREE.Group();
    contactGroup.visible = false;
    scene.add(contactGroup);

    // Concentric expanding Radar Signal Pulse Rings
    const radarRingCount = 5;
    const radarRings: THREE.Mesh[] = [];
    for (let r = 0; r < radarRingCount; r++) {
      const ringGeom = new THREE.RingGeometry(5 + r * 6, 5.4 + r * 6, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x10b981, // Emerald
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isDark() ? 0.12 : 0.08,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI * 0.45;
      contactGroup.add(ringMesh);
      radarRings.push(ringMesh);
    }

    // Rotating 360-degree Radar Scanning Line
    const scanLineGeom = new THREE.BufferGeometry();
    const scanLinePos = new Float32Array([0, 0, 0, 0, 36, 0]);
    scanLineGeom.setAttribute("position", new THREE.BufferAttribute(scanLinePos, 3));
    const scanLineMat = new THREE.LineBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: isDark() ? 0.4 : 0.25,
    });
    const scanLine = new THREE.Line(scanLineGeom, scanLineMat);
    scanLine.rotation.x = Math.PI * 0.45;
    contactGroup.add(scanLine);

    // Upward-drifting Telemetry Signal Particles
    const telemetryCount = 45;
    const telemetryPos = new Float32Array(telemetryCount * 3);
    const telemetrySpeeds: number[] = [];

    for (let t = 0; t < telemetryCount; t++) {
      telemetryPos[t * 3] = (Math.random() - 0.5) * 60;
      telemetryPos[t * 3 + 1] = -25 + Math.random() * 50;
      telemetryPos[t * 3 + 2] = (Math.random() - 0.5) * 30;
      telemetrySpeeds.push(0.08 + Math.random() * 0.12);
    }

    const telemetryGeom = new THREE.BufferGeometry();
    telemetryGeom.setAttribute("position", new THREE.BufferAttribute(telemetryPos, 3));

    const telemetryMat = new THREE.PointsMaterial({
      size: 2.8,
      map: pointTexture ?? undefined,
      color: 0x34d399,
      transparent: true,
      opacity: isDark() ? 0.8 : 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const telemetryPoints = new THREE.Points(telemetryGeom, telemetryMat);
    contactGroup.add(telemetryPoints);

    // ==============================================================
    // MOUSE PARALLAX & SECTION WEIGHT TRACKING
    // ==============================================================
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Section presence weights [hero, projects, skills, contact]
    let currentWeights = [1, 0, 0, 0];
    let targetWeights = [1, 0, 0, 0];

    const updateSectionWeights = () => {
      const vh = window.innerHeight;
      const getOverlap = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const top = Math.max(0, rect.top);
        const bottom = Math.min(vh, rect.bottom);
        return Math.max(0, bottom - top) / vh;
      };

      let s0 = getOverlap("about");
      let s1 = getOverlap("projects");
      let s2 = getOverlap("skills");
      let s3 = getOverlap("contact");

      // Dominance at boundaries
      if (window.scrollY < 80) {
        s0 = 1;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        s3 = 1;
      }

      const total = s0 + s1 + s2 + s3 || 1;
      targetWeights = [s0 / total, s1 / total, s2 / total, s3 / total];
    };

    window.addEventListener("scroll", updateSectionWeights, { passive: true });
    updateSectionWeights();

    // Resize handler
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateFog();
      updateSectionWeights();
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Dark/Light Theme Mutation Observer
    const observer = new MutationObserver(() => {
      updateFog();
      const dark = isDark();

      heroMat.opacity = dark ? 0.85 : 0.6;
      heroMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      heroLineMat.opacity = dark ? 0.35 : 0.25;
      heroLineMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      (heroCore1.material as THREE.Material).opacity = dark ? 0.15 : 0.09;
      (heroCore2.material as THREE.Material).opacity = dark ? 0.2 : 0.12;

      gridMat.opacity = dark ? 0.32 : 0.22;
      pillarLineMat.opacity = dark ? 0.45 : 0.3;
      pillarCapMat.opacity = dark ? 0.95 : 0.75;
      laserMat.opacity = dark ? 0.3 : 0.2;

      neuralMat.opacity = dark ? 0.9 : 0.7;
      neuralMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      chordMat.opacity = dark ? 0.38 : 0.25;
      ringMat1.opacity = dark ? 0.14 : 0.08;
      ringMat2.opacity = dark ? 0.12 : 0.07;

      radarRings.forEach((r) => {
        (r.material as THREE.MeshBasicMaterial).opacity = dark ? 0.12 : 0.08;
      });
      scanLineMat.opacity = dark ? 0.4 : 0.25;
      telemetryMat.opacity = dark ? 0.8 : 0.55;
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ==============================================================
    // ANIMATION LOOP
    // ==============================================================
    let animId = 0;
    let isVisible = true;
    const onVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      // Smooth section weights transition (lerp)
      for (let w = 0; w < 4; w++) {
        currentWeights[w] += (targetWeights[w] - currentWeights[w]) * 0.055;
      }

      // Smooth mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      const [wHero, wProjects, wSkills, wContact] = currentWeights;

      // Group visibility & opacity scaling
      heroGroup.visible = wHero > 0.01;
      projectsGroup.visible = wProjects > 0.01;
      skillsGroup.visible = wSkills > 0.01;
      contactGroup.visible = wContact > 0.01;

      // Interpolate camera position and target based on active section
      const targetCamX = (wProjects * -4 + wSkills * 6) + mouseX * 6;
      const targetCamY = (wProjects * 16 + wContact * -12) - mouseY * 4;
      const targetCamZ = wHero * 75 + wProjects * 68 + wSkills * 64 + wContact * 72;

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;

      const targetLookY = wProjects * -18;
      const targetLookZ = wProjects * -25;
      camera.lookAt(0, targetLookY, targetLookZ);

      // 1. Hero Animations
      if (heroGroup.visible) {
        const dark = isDark();
        heroMat.opacity = (dark ? 0.85 : 0.6) * wHero;
        (heroCore1.material as THREE.Material).opacity = (dark ? 0.15 : 0.09) * wHero;
        (heroCore2.material as THREE.Material).opacity = (dark ? 0.2 : 0.12) * wHero;

        if (!prefersReducedMotion) {
          heroGroup.position.y = (1 - wHero) * 15;
          heroCore1.rotation.x += 0.002;
          heroCore1.rotation.y += 0.003;
          heroCore2.rotation.x -= 0.004;
          heroCore2.rotation.z += 0.003;

          // Animate hero particles & lines
          const posArr = heroGeom.attributes.position.array as Float32Array;
          const linePos = heroLineGeom.attributes.position.array as Float32Array;
          const lineCol = heroLineGeom.attributes.color.array as Float32Array;
          let lIdx = 0;

          for (let i = 0; i < heroNodeCount; i++) {
            const i3 = i * 3;
            posArr[i3] += heroVelocities[i].x;
            posArr[i3 + 1] += heroVelocities[i].y;
            posArr[i3 + 2] += heroVelocities[i].z;

            if (Math.abs(posArr[i3]) > 65) heroVelocities[i].x *= -1;
            if (Math.abs(posArr[i3 + 1]) > 40) heroVelocities[i].y *= -1;
            if (Math.abs(posArr[i3 + 2]) > 27) heroVelocities[i].z *= -1;

            for (let j = i + 1; j < heroNodeCount; j++) {
              const j3 = j * 3;
              const dx = posArr[i3] - posArr[j3];
              const dy = posArr[i3 + 1] - posArr[j3 + 1];
              const dz = posArr[i3 + 2] - posArr[j3 + 2];
              const distSq = dx * dx + dy * dy + dz * dz;

              if (distSq < 22 * 22 && lIdx < heroMaxLines) {
                const p = lIdx * 6;
                linePos[p] = posArr[i3];
                linePos[p + 1] = posArr[i3 + 1];
                linePos[p + 2] = posArr[i3 + 2];
                linePos[p + 3] = posArr[j3];
                linePos[p + 4] = posArr[j3 + 1];
                linePos[p + 5] = posArr[j3 + 2];

                const alpha = (1 - Math.sqrt(distSq) / 22) * wHero;
                lineCol[p] = 0.5 * alpha;
                lineCol[p + 1] = 0.55 * alpha;
                lineCol[p + 2] = 0.98 * alpha;
                lineCol[p + 3] = 0.22 * alpha;
                lineCol[p + 4] = 0.74 * alpha;
                lineCol[p + 5] = 0.97 * alpha;
                lIdx++;
              }
            }
          }

          heroGeom.attributes.position.needsUpdate = true;
          heroLineGeom.attributes.position.needsUpdate = true;
          heroLineGeom.attributes.color.needsUpdate = true;
          heroLineGeom.setDrawRange(0, lIdx * 2);
        }
      }

      // 2. Projects Animations
      if (projectsGroup.visible) {
        const dark = isDark();
        gridMat.opacity = (dark ? 0.32 : 0.22) * wProjects;
        pillarLineMat.opacity = (dark ? 0.45 : 0.3) * wProjects;
        pillarCapMat.opacity = (dark ? 0.95 : 0.75) * wProjects;
        laserMat.opacity = (dark ? 0.3 : 0.2) * wProjects;

        if (!prefersReducedMotion) {
          // Slow blueprint floor drift
          gridHelper.position.z = -30 + ((time * 0.002) % 4.4);
          // Pulse pillar caps
          const capScale = 1 + Math.sin(time * 0.003) * 0.2;
          pillarCaps.scale.set(capScale, capScale, capScale);
        }
      }

      // 3. Skills Animations (Rotating Neural Fibonacci Sphere)
      if (skillsGroup.visible) {
        const dark = isDark();
        neuralMat.opacity = (dark ? 0.9 : 0.7) * wSkills;
        chordMat.opacity = (dark ? 0.38 : 0.25) * wSkills;
        ringMat1.opacity = (dark ? 0.14 : 0.08) * wSkills;
        ringMat2.opacity = (dark ? 0.12 : 0.07) * wSkills;

        if (!prefersReducedMotion) {
          skillsGroup.rotation.y = time * 0.0003;
          skillsGroup.rotation.x = Math.sin(time * 0.0002) * 0.15;

          gimbalRing1.rotation.x = time * 0.0005;
          gimbalRing1.rotation.y = time * 0.0003;
          gimbalRing2.rotation.y = -time * 0.0006;
          gimbalRing2.rotation.z = time * 0.0004;
        }
      }

      // 4. Contact Animations (Expanding Radar Wave Rings)
      if (contactGroup.visible) {
        const dark = isDark();
        scanLineMat.opacity = (dark ? 0.4 : 0.25) * wContact;
        telemetryMat.opacity = (dark ? 0.8 : 0.55) * wContact;

        if (!prefersReducedMotion) {
          radarRings.forEach((ring, idx) => {
            const cycle = ((time * 0.0006 + idx * (1 / radarRingCount)) % 1);
            const rScale = 0.6 + cycle * 1.5;
            ring.scale.set(rScale, rScale, 1);
            const mat = ring.material as THREE.MeshBasicMaterial;
            mat.opacity = (dark ? 0.18 : 0.1) * (1 - cycle) * wContact;
          });

          // Rotate scanning line
          scanLine.rotation.z = time * 0.0018;

          // Telemetry upward floating particles
          const tPos = telemetryGeom.attributes.position.array as Float32Array;
          for (let t = 0; t < telemetryCount; t++) {
            const t3 = t * 3 + 1;
            tPos[t3] += telemetrySpeeds[t];
            if (tPos[t3] > 32) {
              tPos[t3] = -25;
            }
          }
          telemetryGeom.attributes.position.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Clean Disposal
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", updateSectionWeights);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      pointTexture?.dispose();
      heroGeom.dispose();
      heroMat.dispose();
      heroLineGeom.dispose();
      heroLineMat.dispose();
      heroCore1.geometry.dispose();
      (heroCore1.material as THREE.Material).dispose();
      heroCore2.geometry.dispose();
      (heroCore2.material as THREE.Material).dispose();

      gridHelper.geometry.dispose();
      gridMat.dispose();
      pillarLineGeom.dispose();
      pillarLineMat.dispose();
      pillarCapGeom.dispose();
      pillarCapMat.dispose();
      laserGeom.dispose();
      laserMat.dispose();

      neuralGeom.dispose();
      neuralMat.dispose();
      chordGeom.dispose();
      chordMat.dispose();
      gimbalRing1.geometry.dispose();
      ringMat1.dispose();
      gimbalRing2.geometry.dispose();
      ringMat2.dispose();

      radarRings.forEach((r) => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      scanLineGeom.dispose();
      scanLineMat.dispose();
      telemetryGeom.dispose();
      telemetryMat.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
