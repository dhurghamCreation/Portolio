import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "motion/react";
import {
  Sparkles,
  Waves,
  Atom,
  Rotate3d,
  Layers,
  Palette,
  Maximize2,
  RefreshCw,
} from "lucide-react";

type VisualMode = "galaxy" | "torus" | "wave" | "helix";

interface ColorTheme {
  id: string;
  name: string;
  primary: number;
  secondary: number;
  bgGlow: string;
}

const colorThemes: ColorTheme[] = [
  {
    id: "cyan",
    name: "Electric Cyan",
    primary: 0x38bdf8,
    secondary: 0x818cf8,
    bgGlow: "from-sky-500/10 to-blue-600/10",
  },
  {
    id: "violet",
    name: "Neon Violet",
    primary: 0xa855f7,
    secondary: 0xec4899,
    bgGlow: "from-purple-500/10 to-pink-600/10",
  },
  {
    id: "emerald",
    name: "Emerald Aurora",
    primary: 0x10b981,
    secondary: 0x06b6d4,
    bgGlow: "from-emerald-500/10 to-teal-600/10",
  },
  {
    id: "amber",
    name: "Solar Amber",
    primary: 0xf59e0b,
    secondary: 0xef4444,
    bgGlow: "from-amber-500/10 to-orange-600/10",
  },
];

export function InteractiveCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<VisualMode>("galaxy");
  const [activeTheme, setActiveTheme] = useState<ColorTheme>(colorThemes[0]);
  const [particleCount, setParticleCount] = useState(1600);
  const [rotationSpeed, setRotationSpeed] = useState(1);

  // References for live updates without scene rebuild
  const sceneRef = useRef<THREE.Scene | null>(null);
  const activeObjectsRef = useRef<THREE.Object3D[]>([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 55;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(activeTheme.primary, 3, 100);
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight);

    // Build mode geometries
    const buildModeGeometry = () => {
      // Clear previous mode objects
      while (mainGroup.children.length > 0) {
        const obj = mainGroup.children[0] as any;
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
          else obj.material.dispose();
        }
        mainGroup.remove(obj);
      }

      if (activeMode === "galaxy") {
        // --- 1. Logarithmic Spiral Galaxy ---
        const count = 1800;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const color1 = new THREE.Color(activeTheme.primary);
        const color2 = new THREE.Color(activeTheme.secondary);

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const radius = Math.random() * 32 + 2;
          const spinAngle = radius * 0.45;
          const branchAngle = ((i % 3) * (2 * Math.PI)) / 3;

          const randomX = (Math.random() - 0.5) * (radius * 0.15);
          const randomY = (Math.random() - 0.5) * (radius * 0.15);
          const randomZ = (Math.random() - 0.5) * (radius * 0.15);

          positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
          positions[i3 + 1] = randomY;
          positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

          const mixedColor = color1.clone().lerp(color2, radius / 35);
          colors[i3] = mixedColor.r;
          colors[i3 + 1] = mixedColor.g;
          colors[i3 + 2] = mixedColor.b;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const mat = new THREE.PointsMaterial({
          size: 0.75,
          vertexColors: true,
          blending: THREE.AdditiveBlending,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
        });

        const points = new THREE.Points(geo, mat);
        mainGroup.add(points);
      } else if (activeMode === "torus") {
        // --- 2. Geometric Quantum Torus ---
        const geo = new THREE.TorusKnotGeometry(12, 3.8, 140, 28);
        const mat = new THREE.MeshStandardMaterial({
          color: activeTheme.primary,
          emissive: 0x051525,
          roughness: 0.2,
          metalness: 0.85,
          wireframe: true,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mainGroup.add(mesh);

        // Core pulsating orb
        const coreGeo = new THREE.IcosahedronGeometry(5, 2);
        const coreMat = new THREE.MeshBasicMaterial({
          color: activeTheme.secondary,
          wireframe: true,
          transparent: true,
          opacity: 0.4,
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        mainGroup.add(coreMesh);
      } else if (activeMode === "wave") {
        // --- 3. Fluid Wave Grid ---
        const size = 34;
        const segments = 45;
        const geo = new THREE.PlaneGeometry(size, size, segments, segments);
        const mat = new THREE.MeshStandardMaterial({
          color: activeTheme.primary,
          wireframe: true,
          transparent: true,
          opacity: 0.75,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2.5;
        mainGroup.add(mesh);
      } else if (activeMode === "helix") {
        // --- 4. Double Helix Data Stream ---
        const pointsCount = 180;
        const p1Geo = new THREE.BufferGeometry();
        const p1Pos = new Float32Array(pointsCount * 3);
        const p2Pos = new Float32Array(pointsCount * 3);

        for (let i = 0; i < pointsCount; i++) {
          const t = (i / pointsCount) * Math.PI * 8;
          const y = (i - pointsCount / 2) * 0.28;
          const radius = 9;

          p1Pos[i * 3] = Math.cos(t) * radius;
          p1Pos[i * 3 + 1] = y;
          p1Pos[i * 3 + 2] = Math.sin(t) * radius;

          p2Pos[i * 3] = Math.cos(t + Math.PI) * radius;
          p2Pos[i * 3 + 1] = y;
          p2Pos[i * 3 + 2] = Math.sin(t + Math.PI) * radius;
        }

        p1Geo.setAttribute("position", new THREE.BufferAttribute(p1Pos, 3));
        const pMat1 = new THREE.PointsMaterial({
          size: 0.9,
          color: activeTheme.primary,
          blending: THREE.AdditiveBlending,
        });
        const points1 = new THREE.Points(p1Geo, pMat1);
        mainGroup.add(points1);

        const p2Geo = new THREE.BufferGeometry();
        p2Geo.setAttribute("position", new THREE.BufferAttribute(p2Pos, 3));
        const pMat2 = new THREE.PointsMaterial({
          size: 0.9,
          color: activeTheme.secondary,
          blending: THREE.AdditiveBlending,
        });
        const points2 = new THREE.Points(p2Geo, pMat2);
        mainGroup.add(points2);

        // Connecting rungs
        const rungPositions = new Float32Array((pointsCount / 3) * 6);
        let rIdx = 0;
        for (let i = 0; i < pointsCount; i += 3) {
          rungPositions[rIdx++] = p1Pos[i * 3];
          rungPositions[rIdx++] = p1Pos[i * 3 + 1];
          rungPositions[rIdx++] = p1Pos[i * 3 + 2];
          rungPositions[rIdx++] = p2Pos[i * 3];
          rungPositions[rIdx++] = p2Pos[i * 3 + 1];
          rungPositions[rIdx++] = p2Pos[i * 3 + 2];
        }
        const rungGeo = new THREE.BufferGeometry();
        rungGeo.setAttribute("position", new THREE.BufferAttribute(rungPositions, 3));
        const rungMat = new THREE.LineBasicMaterial({
          color: 0x94a3b8,
          transparent: true,
          opacity: 0.25,
        });
        const rungLines = new THREE.LineSegments(rungGeo, rungMat);
        mainGroup.add(rungLines);
      }
    };

    buildModeGeometry();

    // Mouse Drag Interaction
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let mouseVelocity = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouse.x;
      const deltaY = e.clientY - prevMouse.y;
      mouseVelocity.x = deltaX * 0.01;
      mouseVelocity.y = deltaY * 0.01;
      mainGroup.rotation.y += mouseVelocity.x;
      mainGroup.rotation.x += mouseVelocity.y;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Click pulse wave
    const onClick = () => {
      mainGroup.scale.set(1.15, 1.15, 1.15);
    };
    mount.addEventListener("click", onClick);

    // Responsive resize
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

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
      const time = clock.getElapsedTime() * rotationSpeed;

      // Base auto-rotation
      if (!isDragging) {
        mainGroup.rotation.y += delta * 0.3 * rotationSpeed;
        mainGroup.rotation.x += delta * 0.1 * rotationSpeed;
      }

      // Smooth decay for click pulse
      mainGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);

      // Wave mode vertex animation
      if (activeMode === "wave" && mainGroup.children[0]) {
        const mesh = mainGroup.children[0] as THREE.Mesh;
        const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
        if (posAttr) {
          const arr = posAttr.array as Float32Array;
          for (let i = 0; i < arr.length; i += 3) {
            const u = arr[i];
            const v = arr[i + 1];
            arr[i + 2] = Math.sin(u * 0.3 + time * 2) * Math.cos(v * 0.3 + time * 2) * 2.5;
          }
          posAttr.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      mount.removeEventListener("click", onClick);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      // Dispose
      while (mainGroup.children.length > 0) {
        const obj = mainGroup.children[0] as any;
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
          else obj.material.dispose();
        }
        mainGroup.remove(obj);
      }
      renderer.dispose();
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [activeMode, activeTheme, rotationSpeed]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950/70 border-y border-white/5">
      {/* Background ambient lighting */}
      <div className={`absolute inset-0 bg-gradient-to-br ${activeTheme.bgGlow} blur-3xl pointer-events-none transition-colors duration-700`} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-sky-400 mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Three.js WebGL Spatial Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-sky-200 to-indigo-300 bg-clip-text text-transparent">
              Interactive 3D Graphics Engine
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Real-time WebGL graphics powered by Three.js. Click, drag, and toggle geometry modes to explore procedural 3D math and particle mechanics.
          </p>
        </motion.div>

        {/* 3D Mode & Color Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 max-w-5xl mx-auto">
          {/* Mode Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-white/10 rounded-xl backdrop-blur-md">
            <button
              onClick={() => setActiveMode("galaxy")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeMode === "galaxy"
                  ? "bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>Galaxy Spiral</span>
            </button>
            <button
              onClick={() => setActiveMode("torus")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeMode === "torus"
                  ? "bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5" />
              <span>Quantum Knot</span>
            </button>
            <button
              onClick={() => setActiveMode("wave")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeMode === "wave"
                  ? "bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>Wave Grid</span>
            </button>
            <button
              onClick={() => setActiveMode("helix")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeMode === "helix"
                  ? "bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Data Helix</span>
            </button>
          </div>

          {/* Color Theme Selector */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 border border-white/10 rounded-xl backdrop-blur-md">
            <span className="text-xs text-slate-400 px-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-sky-400" />
              Theme:
            </span>
            {colorThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme)}
                className={`w-6 h-6 rounded-full border transition-all ${
                  activeTheme.id === theme.id ? "border-white scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                }`}
                style={{
                  background: `linear-gradient(135deg, #${theme.primary.toString(16).padStart(6, "0")}, #${theme.secondary.toString(16).padStart(6, "0")})`,
                }}
                title={theme.name}
              />
            ))}
          </div>
        </div>

        {/* 3D Canvas Box */}
        <div className="relative max-w-5xl mx-auto h-[480px] bg-slate-950/80 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl group">
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          />

          {/* Floating HUD info */}
          <div className="absolute top-4 left-4 flex items-center gap-3 pointer-events-none">
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-slate-300 backdrop-blur-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>WebGL Active • 60 FPS</span>
            </div>
            <div className="hidden sm:flex px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-slate-400 backdrop-blur-md">
              Drag to Orbit • Click to Pulse
            </div>
          </div>

          {/* Speed slider in bottom right HUD */}
          <div className="absolute bottom-4 right-4 flex items-center gap-3 p-2 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md text-xs text-slate-300 pointer-events-auto">
            <span>Rotation:</span>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.2"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="w-20 accent-sky-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
