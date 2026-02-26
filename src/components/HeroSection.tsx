import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import name1 from "@/assets/name-1.png";
import name2 from "@/assets/name-2.png";
import MagneticButton from "./MagneticButton";

const GLB_URL = "https://raw.githubusercontent.com/Loky848/iea-anime/main/iea%20logo%20in%203d_compressed.glb";

function HeroModel() {
  const { scene } = useGLTF(GLB_URL);
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    if (!ref.current) return;
    // Mouse-reactive rotation
    const mx = state.pointer.x * 0.3;
    const my = state.pointer.y * 0.2;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 + mx;
    ref.current.rotation.x = my * 0.5;
    // Gentle floating
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return <primitive ref={ref} object={scene} scale={2.2} />;
}

// Orbiting energy rings around the model
function EnergyRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.4;
      ring1.current.rotation.z = t * 0.2;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.3;
      ring2.current.rotation.x = Math.PI / 3 + t * 0.1;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.5;
      ring3.current.rotation.y = Math.PI / 4 + t * 0.15;
    }
  });

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[3, 0.008, 16, 100]} />
        <meshBasicMaterial color="#ff2d2d" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3.5, 0.006, 16, 100]} />
        <meshBasicMaterial color="#ff2d2d" transparent opacity={0.15} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#6a5acd" transparent opacity={0.2} />
      </mesh>
    </>
  );
}

// Floating orbs that react to pointer
function FloatingOrbs() {
  const group = useRef<THREE.Group>(null);

  const orbs = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      pos: [
        Math.sin(i * Math.PI * 2 / 8) * 4,
        Math.cos(i * Math.PI * 2 / 8) * 3,
        (Math.random() - 0.5) * 3
      ] as [number, number, number],
      scale: 0.06 + Math.random() * 0.08,
      speed: 0.5 + Math.random() * 0.5,
      color: i % 3 === 0 ? "#6a5acd" : "#ff2d2d",
    })), []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const t = state.clock.elapsedTime * orbs[i].speed;
      child.position.x = orbs[i].pos[0] + Math.sin(t) * 0.5;
      child.position.y = orbs[i].pos[1] + Math.cos(t * 0.7) * 0.4;
      child.position.z = orbs[i].pos[2] + Math.sin(t * 0.5) * 0.3;

      // React to mouse
      const dx = state.pointer.x * 2 - child.position.x;
      const dy = state.pointer.y * 2 - child.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        child.position.x -= dx * 0.02;
        child.position.y -= dy * 0.02;
      }
    });
  });

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos} scale={orb.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#ff2d2d" />
          <pointLight position={[-5, -3, 3]} intensity={1} color="#6a5acd" />
          <pointLight position={[0, -5, 5]} intensity={0.5} color="#ff2d2d" />
          <Suspense fallback={null}>
            <HeroModel />
          </Suspense>
          <EnergyRings />
          <FloatingOrbs />
        </Canvas>
      </div>

      {/* Foreground Glass Box */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, type: "spring", damping: 15 }}
        className="relative z-10 glass-strong rounded-2xl p-8 md:p-12 flex flex-col items-center gap-4 max-w-2xl mx-4 glow-red"
      >
        <motion.img
          src={name1}
          alt="INTECHO'26"
          className="w-[20rem] md:w-[25rem] h-auto"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="font-heading text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Instrumentation Engineering Association
        </p>
        <p className="font-body italic text-primary text-sm lowercase text-glow-red">presents</p>
        <motion.img
          src={name2}
          alt="IEA"
          className="w-[14rem] md:w-[20rem] h-auto"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-4 flex gap-4"
        >
          <MagneticButton variant="primary" onClick={() => scrollTo("passes")}>
            Get Your Pass
          </MagneticButton>
          <MagneticButton variant="glass" onClick={() => scrollTo("tech-events")}>
            Explore Events
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-muted-foreground text-xs font-body tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
