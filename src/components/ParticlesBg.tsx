import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Mouse-reactive particle field with dynamic connections
function ReactiveParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const count = 600;
  const mousePos = useRef(new THREE.Vector2(0, 0));
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const scrollY = useRef(0);

  const { viewport } = useThree();

  const [basePositions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [pos, vel];
  }, []);

  const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);
  const colors = useMemo(() => {
    const c = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      c[i * 3] = 1;
      c[i * 3 + 1] = 0.18 + Math.random() * 0.1;
      c[i * 3 + 2] = 0.18 + Math.random() * 0.1;
    }
    return c;
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = 0.02 + Math.random() * 0.04;
    }
    return s;
  }, []);

  // Line connections buffer
  const maxLines = 200;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), []);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Smooth mouse following
    mousePos.current.lerp(targetMouse.current, 0.05);
    const mx = mousePos.current.x * viewport.width * 0.5;
    const my = mousePos.current.y * viewport.height * 0.5;
    const time = state.clock.elapsedTime;
    const scroll = scrollY.current * 0.001;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const colAttr = pointsRef.current.geometry.attributes.color;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Drift motion
      positions[i3] += velocities[i3] + Math.sin(time * 0.3 + i) * 0.001;
      positions[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + i) * 0.001;
      positions[i3 + 2] += velocities[i3 + 2];

      // Wrap around boundaries
      if (positions[i3] > 15) positions[i3] = -15;
      if (positions[i3] < -15) positions[i3] = 15;
      if (positions[i3 + 1] > 15) positions[i3 + 1] = -15;
      if (positions[i3 + 1] < -15) positions[i3 + 1] = 15;

      // Mouse repulsion
      const dx = positions[i3] - mx;
      const dy = positions[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (3 - dist) * 0.01;
        positions[i3] += (dx / dist) * force;
        positions[i3 + 1] += (dy / dist) * force;
      }

      // Scroll parallax
      positions[i3 + 1] += Math.sin(scroll + i * 0.01) * 0.002;

      // Pulsing color intensity based on distance to mouse
      const brightness = dist < 4 ? 1 : 0.4;
      colors[i3] = brightness;
      colors[i3 + 1] = 0.18 * brightness;
      colors[i3 + 2] = 0.18 * brightness;
    }

    (posAttr as any).array = positions;
    posAttr.needsUpdate = true;
    (colAttr as any).array = colors;
    colAttr.needsUpdate = true;

    // Draw connection lines between nearby particles
    if (linesRef.current) {
      let lineIdx = 0;
      for (let i = 0; i < count && lineIdx < maxLines; i++) {
        for (let j = i + 1; j < count && lineIdx < maxLines; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const d = dx * dx + dy * dy + dz * dz;
          if (d < 2.5) {
            const alpha = 1 - d / 2.5;
            const li = lineIdx * 6;
            linePositions[li] = positions[i * 3];
            linePositions[li + 1] = positions[i * 3 + 1];
            linePositions[li + 2] = positions[i * 3 + 2];
            linePositions[li + 3] = positions[j * 3];
            linePositions[li + 4] = positions[j * 3 + 1];
            linePositions[li + 5] = positions[j * 3 + 2];
            lineColors[li] = 1 * alpha;
            lineColors[li + 1] = 0.18 * alpha;
            lineColors[li + 2] = 0.18 * alpha;
            lineColors[li + 3] = 1 * alpha;
            lineColors[li + 4] = 0.18 * alpha;
            lineColors[li + 5] = 0.18 * alpha;
            lineIdx++;
          }
        }
      }
      const lPosAttr = linesRef.current.geometry.attributes.position;
      const lColAttr = linesRef.current.geometry.attributes.color;
      (lPosAttr as any).array = linePositions;
      lPosAttr.needsUpdate = true;
      (lColAttr as any).array = lineColors;
      lColAttr.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIdx * 2);
    }

    // Slow global rotation
    pointsRef.current.rotation.y = time * 0.01;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={maxLines * 2} array={linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={maxLines * 2} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </>
  );
}

// Floating geometric wireframe shapes
function FloatingShapes() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.03;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  const shapes = useMemo(() => [
    { pos: [-6, 3, -5] as [number, number, number], geo: "octahedron", scale: 0.6 },
    { pos: [7, -2, -4] as [number, number, number], geo: "icosahedron", scale: 0.5 },
    { pos: [-4, -4, -6] as [number, number, number], geo: "tetrahedron", scale: 0.7 },
    { pos: [5, 4, -3] as [number, number, number], geo: "dodecahedron", scale: 0.4 },
  ], []);

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale}>
          {s.geo === "octahedron" && <octahedronGeometry args={[1, 0]} />}
          {s.geo === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
          {s.geo === "tetrahedron" && <tetrahedronGeometry args={[1, 0]} />}
          {s.geo === "dodecahedron" && <dodecahedronGeometry args={[1, 0]} />}
          <meshBasicMaterial color="#ff2d2d" wireframe transparent opacity={0.12} />
        </mesh>
      ))}
    </group>
  );
}

const ParticlesBg = () => {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "auto" }}
        gl={{ antialias: false, alpha: true }}
      >
        <ReactiveParticles />
        <FloatingShapes />
      </Canvas>
    </div>
  );
};

export default ParticlesBg;
