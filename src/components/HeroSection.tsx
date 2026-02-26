import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import name1 from "@/assets/name-1.png";
import name2 from "@/assets/name-2.png";

const GLB_URL = "https://raw.githubusercontent.com/Loky848/iea-anime/main/iea%20logo%20in%203d_compressed.glb";

function HeroModel() {
  const { scene } = useGLTF(GLB_URL);
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return <primitive ref={ref} object={scene} scale={2} />;
}

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#ff2d2d" />
          <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#6a5acd" />
          <Suspense fallback={null}>
            <HeroModel />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Foreground Glass Box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 glass-strong rounded-2xl p-8 md:p-12 flex flex-col items-center gap-4 max-w-2xl mx-4"
      >
        <img src={name1} alt="INTECHO'26" className="w-[20rem] md:w-[25rem] h-auto" />
        <p className="font-heading text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Instrumentation Engineering Association
        </p>
        <p className="font-body italic text-primary text-sm lowercase">presents</p>
        <img src={name2} alt="IEA" className="w-[14rem] md:w-[20rem] h-auto" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
