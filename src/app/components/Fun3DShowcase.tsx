import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";
import {
  Rocket,
  Gamepad2,
  Brain,
  Carrot,
  Sparkles,
  Zap,
  RotateCw,
  Compass,
  ExternalLink,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "./ui/button";

type ArtifactId = "shuttle" | "gamepad" | "neural" | "veggie";

interface ArtifactConfig {
  id: ArtifactId;
  name: string;
  tagline: string;
  category: string;
  icon: typeof Rocket;
  accentColor: string;
  projectTitle: string;
  projectUrl: string;
  codeUrl: string;
  techStack: string[];
}

const artifacts: ArtifactConfig[] = [
  {
    id: "shuttle",
    name: "Galactic Explorer",
    tagline: "Cinematic Space Exploration Flight Engine",
    category: "Rust + Bevy Game Dev",
    icon: Rocket,
    accentColor: "#38bdf8",
    projectTitle: "Galactic-Explorer",
    projectUrl: "https://galactic-explorer-six.vercel.app/",
    codeUrl: "https://github.com/dhurghamCreation/Galactic-Explorer",
    techStack: ["Rust", "Bevy", "3D Math", "Orbital Physics"],
  },
  {
    id: "gamepad",
    name: "Arcade Game Console",
    tagline: "Retro Controls, Fast Loops & Interactive Polish",
    category: "Gameplay Engineering",
    icon: Gamepad2,
    accentColor: "#f43f5e",
    projectTitle: "TheTacticalEcho & croc-playtime",
    projectUrl: "https://tactical-3ag51vgq1-dhurgham-s-projects.vercel.app/",
    codeUrl: "https://github.com/dhurghamCreation/TheTacticalEcho",
    techStack: ["TypeScript", "HTML5 Canvas", "Game Mechanics"],
  },
  {
    id: "neural",
    name: "Quantum Neural Core",
    tagline: "LLM Security, KV-Cache Optimization & RAG Guard",
    category: "AI & ML Architecture",
    icon: Brain,
    accentColor: "#a855f7",
    projectTitle: "streamalign & llm-sentinel",
    projectUrl: "https://streamalign-gm7xbdgtzopbr73ditgspr.streamlit.app/",
    codeUrl: "https://github.com/dhurghamCreation/streamalign",
    techStack: ["Python", "PyTorch", "CUDA", "Security"],
  },
  {
    id: "veggie",
    name: "VeggieCraft 3D",
    tagline: "Playful Stylized 3D WebGL Organic Scene",
    category: "Creative Three.js",
    icon: Carrot,
    accentColor: "#10b981",
    projectTitle: "VeggieCraft3D",
    projectUrl: "https://interactive1-3d-animated-veggie.vercel.app",
    codeUrl: "https://github.com/dhurghamCreation/VeggieCraft3D",
    techStack: ["Three.js", "WebGL", "TypeScript", "3D Shaders"],
  },
];

export function Fun3DShowcase() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeArtifact, setActiveArtifact] = useState<ArtifactId>("shuttle");
  const [isWarping, setIsWarping] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [themeMode, setThemeMode] = useState<"cyber" | "aurora" | "sunset">("cyber");

  // Keep ref in sync for animation loop
  const activeArtifactRef = useRef<ArtifactId>("shuttle");
  const isWarpingRef = useRef(false);
  const autoRotateRef = useRef(true);

  useEffect(() => {
    activeArtifactRef.current = activeArtifact;
  }, [activeArtifact]);

  useEffect(() => {
    isWarpingRef.current = isWarping;
  }, [isWarping]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4, 34);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Root model anchor group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(20, 25, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xec4899, 1.8);
    dirLight2.position.set(-20, -10, -15);
    scene.add(dirLight2);

    // Dynamic Starfield / Warp Particles
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 120;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.6,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.6,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Floating Ground Pedestal Ring
    const pedestalGeo = new THREE.TorusGeometry(12, 0.2, 16, 80);
    const pedestalMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.rotation.x = Math.PI / 2;
    pedestal.position.y = -8;
    scene.add(pedestal);

    // --- PROCEDURAL 3D MODELS BUILDER ---
    let currentModelGroup = new THREE.Group();
    rootGroup.add(currentModelGroup);

    let propellorLeaf: THREE.Mesh | null = null;
    let exhaustParticles: THREE.Points | null = null;

    const buildModel = (id: ArtifactId) => {
      // Clear previous
      while (currentModelGroup.children.length > 0) {
        const child = currentModelGroup.children[0] as any;
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach((m: any) => m.dispose());
          else child.material.dispose();
        }
        currentModelGroup.remove(child);
      }
      propellorLeaf = null;
      exhaustParticles = null;

      if (id === "shuttle") {
        // --- 1. GALACTIC EXPLORER SPACE SHUTTLE ---
        const shuttle = new THREE.Group();

        // Main Sleek Fuselage
        const fuselageGeo = new THREE.ConeGeometry(3, 14, 8);
        const fuselageMat = new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          metalness: 0.8,
          roughness: 0.25,
          emissive: 0x0369a1,
          emissiveIntensity: 0.2,
        });
        const fuselage = new THREE.Mesh(fuselageGeo, fuselageMat);
        fuselage.rotation.x = Math.PI / 2;
        shuttle.add(fuselage);

        // Complete Cockpit Canopy & Upper Observation Window (Fully enclosed aerodynamic glass)
        const canopyGeo = new THREE.SphereGeometry(1.4, 32, 24);
        canopyGeo.scale(0.85, 0.72, 2.2);
        const canopyMat = new THREE.MeshPhysicalMaterial({
          color: 0x38bdf8,
          metalness: 0.15,
          roughness: 0.08,
          transmission: 0.7,
          thickness: 0.6,
          transparent: true,
          opacity: 0.95,
          emissive: 0x0284c7,
          emissiveIntensity: 0.35,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
        });
        const canopy = new THREE.Mesh(canopyGeo, canopyMat);
        canopy.position.set(0, 1.22, 1.5);
        canopy.rotation.x = -0.12;
        shuttle.add(canopy);

        // Canopy Base Collar / Mounting Frame (Seals canopy flush with fuselage)
        const canopyCollarGeo = new THREE.CylinderGeometry(1.22, 1.35, 0.28, 24);
        canopyCollarGeo.scale(0.85, 1, 2.2);
        const canopyCollarMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          metalness: 0.9,
          roughness: 0.25,
        });
        const canopyCollar = new THREE.Mesh(canopyCollarGeo, canopyCollarMat);
        canopyCollar.position.set(0, 0.95, 1.5);
        canopyCollar.rotation.x = -0.12;
        shuttle.add(canopyCollar);

        // Interior Flight Deck / Avionics Floor (Prevents hollow view)
        const floorGeo = new THREE.BoxGeometry(1.3, 0.1, 2.9);
        const floorMat = new THREE.MeshStandardMaterial({
          color: 0x090d16,
          metalness: 0.7,
          roughness: 0.5,
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.position.set(0, 1.0, 1.5);
        floor.rotation.x = -0.12;
        shuttle.add(floor);

        // Illuminated Pilot HUD Visor / Heads-up display in forward windshield
        const hudGeo = new THREE.PlaneGeometry(0.7, 0.45);
        const hudMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.85,
          side: THREE.DoubleSide,
        });
        const hud = new THREE.Mesh(hudGeo, hudMat);
        hud.position.set(0, 1.3, 2.5);
        hud.rotation.x = -0.28;
        shuttle.add(hud);

        // Canopy Reinforcement Window Struts
        const ribGeo = new THREE.TorusGeometry(1.15, 0.05, 8, 24, Math.PI);
        ribGeo.scale(0.85, 0.72, 1);
        const ribMat = new THREE.MeshStandardMaterial({
          color: 0x475569,
          metalness: 0.85,
          roughness: 0.3,
        });
        const frontStrut = new THREE.Mesh(ribGeo, ribMat);
        frontStrut.position.set(0, 1.08, 2.2);
        frontStrut.rotation.x = Math.PI / 2 - 0.22;
        shuttle.add(frontStrut);

        const midStrut = new THREE.Mesh(ribGeo, ribMat);
        midStrut.position.set(0, 1.25, 1.4);
        midStrut.rotation.x = Math.PI / 2 - 0.12;
        shuttle.add(midStrut);

        // Aerodynamic Nose Pitot Probe
        const probeGeo = new THREE.CylinderGeometry(0.08, 0.22, 1.4, 8);
        const probeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95 });
        const probe = new THREE.Mesh(probeGeo, probeMat);
        probe.rotation.x = Math.PI / 2;
        probe.position.set(0, 0, 7.5);
        shuttle.add(probe);

        // Swept Delta Wings
        const wingShape = new THREE.Shape();
        wingShape.moveTo(0, 0);
        wingShape.lineTo(9, -6);
        wingShape.lineTo(3, -6.5);
        wingShape.lineTo(0, -5);
        wingShape.lineTo(-3, -6.5);
        wingShape.lineTo(-9, -6);
        wingShape.closePath();

        const extrudeSettings = { depth: 0.35, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.1, bevelThickness: 0.1 };
        const wingGeo = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);
        const wingMat = new THREE.MeshStandardMaterial({
          color: 0x334155,
          metalness: 0.7,
          roughness: 0.3,
        });
        const wings = new THREE.Mesh(wingGeo, wingMat);
        wings.rotation.x = Math.PI / 2;
        wings.position.set(0, -0.2, 0);
        shuttle.add(wings);

        // Dual Engine Thruster Pods
        const podGeo = new THREE.CylinderGeometry(0.8, 1, 3.5, 12);
        const podMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 });
        
        const leftPod = new THREE.Mesh(podGeo, podMat);
        leftPod.rotation.x = Math.PI / 2;
        leftPod.position.set(-2.5, 0, -4.5);
        shuttle.add(leftPod);

        const rightPod = leftPod.clone();
        rightPod.position.x = 2.5;
        shuttle.add(rightPod);

        // Glowing Thruster Exhaust Flames
        const flameGeo = new THREE.ConeGeometry(0.7, 4, 12);
        const flameMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.85,
        });
        const leftFlame = new THREE.Mesh(flameGeo, flameMat);
        leftFlame.rotation.x = -Math.PI / 2;
        leftFlame.position.set(-2.5, 0, -7.5);
        shuttle.add(leftFlame);

        const rightFlame = leftFlame.clone();
        rightFlame.position.x = 2.5;
        shuttle.add(rightFlame);

        // Thruster Particle Exhaust
        const pCount = 80;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
          pPos[i * 3] = (Math.random() - 0.5) * 4;
          pPos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
          pPos[i * 3 + 2] = -7.5 - Math.random() * 8;
        }
        pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({
          size: 0.45,
          color: 0x67e8f9,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
        });
        exhaustParticles = new THREE.Points(pGeo, pMat);
        shuttle.add(exhaustParticles);

        currentModelGroup.add(shuttle);
      } else if (id === "gamepad") {
        // --- 2. RETRO ARCADE GAMEPAD CONSOLE ---
        const gamepad = new THREE.Group();

        // Main Controller Body
        const bodyGeo = new THREE.BoxGeometry(16, 7.5, 3.5);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          roughness: 0.35,
          metalness: 0.5,
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        gamepad.add(body);

        // D-pad Base
        const dpadMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.4 });
        const dpadVertGeo = new THREE.BoxGeometry(1.4, 4.2, 0.8);
        const dpadHorizGeo = new THREE.BoxGeometry(4.2, 1.4, 0.8);
        const dpadV = new THREE.Mesh(dpadVertGeo, dpadMat);
        dpadV.position.set(-4.5, 0, 1.8);
        gamepad.add(dpadV);
        const dpadH = new THREE.Mesh(dpadHorizGeo, dpadMat);
        dpadH.position.set(-4.5, 0, 1.8);
        gamepad.add(dpadH);

        // Action Buttons (A, B, X, Y)
        const btnGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.8, 16);
        const colors = [0xf43f5e, 0x38bdf8, 0x10b981, 0xfbbf24];
        const offsets = [
          { x: 5, y: -1.2 }, // A
          { x: 6.2, y: 0 },  // B
          { x: 3.8, y: 0 },  // X
          { x: 5, y: 1.2 },  // Y
        ];
        offsets.forEach((off, idx) => {
          const btnMat = new THREE.MeshStandardMaterial({
            color: colors[idx],
            emissive: colors[idx],
            emissiveIntensity: 0.5,
          });
          const btn = new THREE.Mesh(btnGeo, btnMat);
          btn.rotation.x = Math.PI / 2;
          btn.position.set(off.x, off.y, 1.8);
          gamepad.add(btn);
        });

        // Center Pixel Badge / Screen
        const screenGeo = new THREE.PlaneGeometry(4, 2.5);
        const screenMat = new THREE.MeshBasicMaterial({
          color: 0x1e293b,
          side: THREE.DoubleSide,
        });
        const screen = new THREE.Mesh(screenGeo, screenMat);
        screen.position.set(0, 0, 1.8);
        gamepad.add(screen);

        currentModelGroup.add(gamepad);
      } else if (id === "neural") {
        // --- 3. QUANTUM NEURAL CORE ---
        const neural = new THREE.Group();

        // Pulsing Central Core
        const coreGeo = new THREE.IcosahedronGeometry(4.5, 1);
        const coreMat = new THREE.MeshStandardMaterial({
          color: 0xa855f7,
          wireframe: true,
          emissive: 0x6b21a8,
          emissiveIntensity: 0.6,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        neural.add(core);

        // Inner glowing crystal
        const innerGeo = new THREE.OctahedronGeometry(2.5, 0);
        const innerMat = new THREE.MeshBasicMaterial({
          color: 0xf43f5e,
          wireframe: true,
        });
        const inner = new THREE.Mesh(innerGeo, innerMat);
        neural.add(inner);

        // Orbital Data Gyro Rings
        const ringGeo1 = new THREE.TorusGeometry(8.5, 0.25, 16, 80);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
        const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
        neural.add(ring1);

        const ringGeo2 = new THREE.TorusGeometry(10.5, 0.2, 16, 80);
        const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.5 });
        const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
        ring2.rotation.x = Math.PI / 2.5;
        ring2.rotation.y = Math.PI / 4;
        neural.add(ring2);

        // Synaptic Nodes Points
        const nodeCount = 140;
        const nGeo = new THREE.BufferGeometry();
        const nPos = new Float32Array(nodeCount * 3);
        for (let i = 0; i < nodeCount; i++) {
          const r = 5.5 + Math.random() * 4;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          nPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          nPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          nPos[i * 3 + 2] = r * Math.cos(phi);
        }
        nGeo.setAttribute("position", new THREE.BufferAttribute(nPos, 3));
        const nMat = new THREE.PointsMaterial({
          size: 0.5,
          color: 0x38bdf8,
          blending: THREE.AdditiveBlending,
        });
        const nodes = new THREE.Points(nGeo, nMat);
        neural.add(nodes);

        currentModelGroup.add(neural);
      } else if (id === "veggie") {
        // --- 4. VEGGIECRAFT 3D ROCKET ---
        const veggie = new THREE.Group();

        // Tapered Organic Carrot Rocket Body
        const carrotGeo = new THREE.ConeGeometry(3.2, 12, 16);
        const carrotMat = new THREE.MeshStandardMaterial({
          color: 0xf97316,
          roughness: 0.4,
          metalness: 0.2,
          emissive: 0x9a3412,
          emissiveIntensity: 0.2,
        });
        const carrot = new THREE.Mesh(carrotGeo, carrotMat);
        carrot.rotation.x = Math.PI; // point downwards like rocket
        veggie.add(carrot);

        // Green Propeller / Stem Leaves
        const leafGeo = new THREE.BoxGeometry(8, 0.4, 1.8);
        const leafMat = new THREE.MeshStandardMaterial({
          color: 0x22c55e,
          roughness: 0.3,
          emissive: 0x15803d,
          emissiveIntensity: 0.3,
        });
        propellorLeaf = new THREE.Mesh(leafGeo, leafMat);
        propellorLeaf.position.y = 6.2;
        veggie.add(propellorLeaf);

        // Rocket Thruster Cone
        const thrusterGeo = new THREE.CylinderGeometry(1.8, 2.4, 2, 16);
        const thrusterMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 });
        const thruster = new THREE.Mesh(thrusterGeo, thrusterMat);
        thruster.position.y = -6.5;
        veggie.add(thruster);

        // Cute Glow Rings
        const glowRingGeo = new THREE.TorusGeometry(3.5, 0.15, 12, 40);
        const glowRingMat = new THREE.MeshBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 0.8 });
        const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
        glowRing.rotation.x = Math.PI / 2;
        glowRing.position.y = 1;
        veggie.add(glowRing);

        currentModelGroup.add(veggie);
      }
    };

    buildModel(activeArtifact);

    // Mouse movement interactive look-at & banking
    let targetRotY = 0;
    let targetRotX = 0;
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        targetRotY += dx * 0.01;
        targetRotX += dy * 0.01;
        prevMouse = { x: e.clientX, y: e.clientY };
      } else {
        // Subtle banking toward mouse pointer
        const rect = mount.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        currentModelGroup.rotation.z = -normX * 0.4;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Click triggers active artifact animation
    const onCanvasClick = () => {
      currentModelGroup.scale.set(1.2, 1.2, 1.2);
    };
    mount.addEventListener("click", onCanvasClick);

    // Resize
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Performance Visibility Observer
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(mount);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth decay of click bounce
      currentModelGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);

      // Auto rotation
      if (autoRotateRef.current && !isDragging) {
        targetRotY += delta * 0.45;
      }

      // Smooth camera / group rotation damping
      currentModelGroup.rotation.y = THREE.MathUtils.lerp(currentModelGroup.rotation.y, targetRotY, 0.08);
      currentModelGroup.rotation.x = THREE.MathUtils.lerp(currentModelGroup.rotation.x, targetRotX, 0.08);

      // Gentle floating bob
      currentModelGroup.position.y = Math.sin(time * 2) * 0.8;

      // Special animations per model
      if (propellorLeaf) {
        propellorLeaf.rotation.y += delta * 12;
      }

      if (exhaustParticles) {
        const pArr = exhaustParticles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < pArr.length; i += 3) {
          pArr[i + 2] -= delta * (isWarpingRef.current ? 45 : 18);
          if (pArr[i + 2] < -20) {
            pArr[i + 2] = -7.5;
          }
        }
        exhaustParticles.geometry.attributes.position.needsUpdate = true;
      }

      // Warp speed starfield effect
      const starArr = starGeo.attributes.position.array as Float32Array;
      const starSpeed = isWarpingRef.current ? delta * 90 : delta * 12;
      for (let i = 2; i < starArr.length; i += 3) {
        starArr[i] += starSpeed;
        if (starArr[i] > 50) {
          starArr[i] = -50;
        }
      }
      starGeo.attributes.position.needsUpdate = true;

      // Dynamic FOV kick on warp
      const targetFov = isWarpingRef.current ? 65 : 45;
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.08);
      camera.updateProjectionMatrix();

      // Rotate pedestal ring
      pedestal.rotation.z += delta * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      mount.removeEventListener("click", onCanvasClick);
      window.removeEventListener("resize", onResize);
      observer.disconnect();

      starGeo.dispose();
      starMat.dispose();
      pedestalGeo.dispose();
      pedestalMat.dispose();

      while (currentModelGroup.children.length > 0) {
        const child = currentModelGroup.children[0] as any;
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach((m: any) => m.dispose());
          else child.material.dispose();
        }
        currentModelGroup.remove(child);
      }

      renderer.dispose();
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [activeArtifact]);

  const currentArtifact = artifacts.find((a) => a.id === activeArtifact) || artifacts[0];

  const handleWarp = () => {
    setIsWarping(true);
    setTimeout(() => setIsWarping(false), 2400);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-y border-white/10">
      {/* Dynamic atmospheric aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: currentArtifact.accentColor }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-white/15 text-xs text-sky-400 mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "10s" }} />
            <span>Interactive 3D Portfolio Deck</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-sky-200 to-indigo-300 bg-clip-text text-transparent">
              Live 3D Creations Showcase
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Interact with real-time 3D models representing my core disciplines — space flight engines, gameplay mechanics, neural architectures, and Three.js creative visuals.
          </p>
        </div>

        {/* 3D Artifact Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
          {artifacts.map((artifact) => {
            const Icon = artifact.icon;
            const isSelected = activeArtifact === artifact.id;
            return (
              <button
                key={artifact.id}
                onClick={() => setActiveArtifact(artifact.id)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left group ${
                  isSelected
                    ? "bg-slate-800/90 border-sky-400 shadow-lg shadow-sky-500/15"
                    : "bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-800/40"
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${artifact.accentColor}25`,
                    color: artifact.accentColor,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className={`text-xs font-bold truncate ${isSelected ? "text-white" : "text-slate-300"}`}>
                    {artifact.name}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">{artifact.category}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3D Interactive Stage Box */}
        <div className="relative max-w-5xl mx-auto h-[480px] sm:h-[540px] bg-slate-950/80 rounded-3xl border border-white/15 overflow-hidden shadow-2xl backdrop-blur-xl group">
          {/* Three.js Canvas Container */}
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            title="Drag to orbit in 3D • Click to bounce"
          />

          {/* Top HUD: Info Badge */}
          <div className="absolute top-5 left-5 right-5 flex items-start justify-between pointer-events-none">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md max-w-sm pointer-events-auto">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: currentArtifact.accentColor }}
                />
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                  {currentArtifact.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{currentArtifact.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{currentArtifact.tagline}</p>
            </div>

            {/* Orbit / Interactive Helper */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 border border-white/10 backdrop-blur-md text-xs text-slate-300">
              <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: "12s" }} />
              <span>Drag to rotate • Click to pulse</span>
            </div>
          </div>

          {/* Bottom HUD: Action Controls & Link */}
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            {/* Action Buttons */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <Button
                size="sm"
                onClick={handleWarp}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold shadow-lg shadow-sky-500/20 text-xs px-3.5 py-2"
              >
                <Zap className={`w-3.5 h-3.5 mr-1.5 ${isWarping ? "animate-bounce text-amber-300" : ""}`} />
                {isWarping ? "Warping Speed..." : "Action Boost"}
              </Button>

              <button
                onClick={() => setAutoRotate((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs backdrop-blur-md transition-all ${
                  autoRotate
                    ? "bg-slate-900/80 border-sky-400 text-sky-300"
                    : "bg-slate-900/60 border-white/10 text-slate-400 hover:text-white"
                }`}
                title="Toggle Auto-Rotation"
              >
                <RotateCw className={`w-3 h-3 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
                <span>Orbit</span>
              </button>
            </div>

            {/* Project Deep Link CTA */}
            <div className="pointer-events-auto flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md text-xs shadow-md"
                asChild
              >
                <a href={currentArtifact.projectUrl} target="_blank" rel="noopener noreferrer">
                  Launch {currentArtifact.projectTitle}
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Tech Stack Indicator Pill Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span className="text-xs text-slate-500">Related Tech:</span>
          {currentArtifact.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs bg-slate-900/60 border border-white/10 text-slate-300 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
