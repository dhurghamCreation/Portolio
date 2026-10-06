import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Eye, Pause, Play } from "lucide-react";

export function ThreeHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(true);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
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

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a192f, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    // --- 1. Center Floating Crystal Icosahedron ---
    const icoGeometry = new THREE.IcosahedronGeometry(14, 1);
    const icoWireMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoWireMaterial);
    scene.add(icoMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(9, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Outer orbital ring
    const ringGeo = new THREE.TorusGeometry(26, 0.35, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.28,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.rotation.y = Math.PI / 6;
    scene.add(ringMesh);

    // Secondary tilted ring
    const ringGeo2 = new THREE.TorusGeometry(32, 0.25, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.2,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 4;
    scene.add(ringMesh2);

    // --- 2. Interactive Constellation Particles ---
    const particleCount = 280;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const rangeX = 140;
    const rangeY = 90;
    const rangeZ = 70;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * rangeX;
      positions[i * 3 + 1] = (Math.random() - 0.5) * rangeY;
      positions[i * 3 + 2] = (Math.random() - 0.5) * rangeZ;

      velocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Generate soft circular sprite for particles
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.3, "rgba(56,189,248,0.8)");
      gradient.addColorStop(1, "rgba(56,189,248,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.8,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Dynamic connection lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    const maxConnections = 120;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.04;
      mouseY = (event.clientY - windowHalfY) * 0.04;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Click pulse wave
    const handleClick = () => {
      icoMesh.scale.set(1.2, 1.2, 1.2);
      ringMesh.scale.set(1.15, 1.15, 1.15);
    };
    container.addEventListener("click", handleClick);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Pause rendering when off-screen for performance
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || !isPlayingRef.current) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera lerp with mouse
      targetCameraX += (mouseX - targetCameraX) * 0.04;
      targetCameraY += (-mouseY - targetCameraY) * 0.04;
      camera.position.x = targetCameraX;
      camera.position.y = targetCameraY;
      camera.lookAt(0, 0, 0);

      // Rotate central geometries
      icoMesh.rotation.x += delta * 0.25;
      icoMesh.rotation.y += delta * 0.35;
      innerMesh.rotation.x -= delta * 0.18;
      innerMesh.rotation.y -= delta * 0.25;

      ringMesh.rotation.z += delta * 0.3;
      ringMesh2.rotation.z -= delta * 0.22;

      // Decay scale pulse
      icoMesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
      ringMesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);

      // Float gently
      icoMesh.position.y = Math.sin(elapsedTime * 1.2) * 1.5;
      innerMesh.position.y = Math.sin(elapsedTime * 1.2) * 1.5;

      // Update particle positions
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      let lineIndex = 0;
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3] += velocities[i].x;
        posArray[i3 + 1] += velocities[i].y;
        posArray[i3 + 2] += velocities[i].z;

        // Boundary bounce
        if (Math.abs(posArray[i3]) > rangeX / 2) velocities[i].x *= -1;
        if (Math.abs(posArray[i3 + 1]) > rangeY / 2) velocities[i].y *= -1;
        if (Math.abs(posArray[i3 + 2]) > rangeZ / 2) velocities[i].z *= -1;

        // Connect nearby particles with lines
        if (lineIndex < maxConnections) {
          for (let j = i + 1; j < Math.min(i + 8, particleCount); j++) {
            const j3 = j * 3;
            const dx = posArray[i3] - posArray[j3];
            const dy = posArray[i3 + 1] - posArray[j3 + 1];
            const dz = posArray[i3 + 2] - posArray[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 18 && lineIndex < maxConnections) {
              const l6 = lineIndex * 6;
              linePosArray[l6] = posArray[i3];
              linePosArray[l6 + 1] = posArray[i3 + 1];
              linePosArray[l6 + 2] = posArray[i3 + 2];
              linePosArray[l6 + 3] = posArray[j3];
              linePosArray[l6 + 4] = posArray[j3 + 1];
              linePosArray[l6 + 5] = posArray[j3 + 2];
              lineIndex++;
            }
          }
        }
      }

      posAttr.needsUpdate = true;
      linePosAttr.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up all resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("click", handleClick);
      observer.disconnect();

      // Dispose Three.js objects
      icoGeometry.dispose();
      icoWireMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div ref={containerRef} className="w-full h-full pointer-events-auto" />
      
      {/* Interactive 3D Control Pill */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 text-xs backdrop-blur-md transition-all shadow-lg"
          title={isPlaying ? "Pause 3D scene" : "Play 3D scene"}
        >
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Three.js Space</span>
          {isPlaying ? <Pause className="w-3 h-3 ml-1" /> : <Play className="w-3 h-3 ml-1" />}
        </button>
      </div>

      {/* Atmospheric gradient overlay so DOM text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,25,47,0.7)_100%)] pointer-events-none" />
    </div>
  );
}
