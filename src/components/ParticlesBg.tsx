import { motion } from "framer-motion";

// Ultra-lightweight background that won't freeze the phone
const ParticlesBg = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      
      {/* Soft gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,45,45,0.08),rgba(255,255,255,0))]" />
      
      {/* A few lightweight floating CSS orbs instead of 600 complex WebGL particles */}
      <motion.div 
        className="absolute top-[15%] left-[15%] w-[0.25rem] h-[0.25rem] bg-white rounded-full shadow-[0_0_10px_white]"
        animate={{ y: ["0rem", "2rem", "0rem"], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute top-[40%] right-[20%] w-[0.35rem] h-[0.35rem] bg-[#ff2d2d] rounded-full shadow-[0_0_15px_#ff2d2d]"
        animate={{ y: ["0rem", "-3rem", "0rem"], opacity: [0.1, 0.6, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      <motion.div 
        className="absolute bottom-[25%] left-[35%] w-[0.3rem] h-[0.3rem] bg-[#6a5acd] rounded-full shadow-[0_0_12px_#6a5acd]"
        animate={{ y: ["0rem", "4rem", "0rem"], opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <motion.div 
        className="absolute bottom-[15%] right-[30%] w-[0.2rem] h-[0.2rem] bg-white rounded-full shadow-[0_0_8px_white]"
        animate={{ y: ["0rem", "-2rem", "0rem"], opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
    </div>
  );
};

export default ParticlesBg;
