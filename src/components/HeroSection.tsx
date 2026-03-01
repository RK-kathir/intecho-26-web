import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full">
        
        {/* 1. Rotating IEA Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <motion.img 
            src="/name-1.png" 
            alt="IEA Logo" 
            className="w-48 md:w-64 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </motion.div>

        {/* 2. Unified IEA Text (Matched Size & Font) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-center w-full"
        >
          <h1 
            /* THE FIX: Changed mobile size to text-[12vw] to prevent edge cutoffs */
            className="text-[12vw] sm:text-7xl md:text-[8rem] font-sans font-black tracking-[0.1em] uppercase whitespace-nowrap"
            style={{
              WebkitTextStroke: "3px #ff2d2d",
              color: "transparent",
              textShadow: "0 0 40px rgba(255,45,45,0.5)"
            }}
          >
            IEA
          </h1>
        </motion.div>

        {/* 3. Full Association Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10 text-center px-2"
        >
          <p className="font-heading text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.4em] text-gray-300">
            Instrumentation Engineers Association
          </p>
        </motion.div>

        {/* 4. "Presents" */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 text-center relative"
        >
          <p className="font-syne text-xs md:text-sm uppercase tracking-[0.6em] text-[#ff2d2d] font-bold">
            Presents
          </p>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-[#ff2d2d] to-transparent opacity-60"></div>
        </motion.div>

        {/* 5. Unified INTECHO'26 Text (Matched Size & Font) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }}
          className="mb-10 mt-6 text-center w-full"
        >
          <motion.h2
            animate={{ 
              scale: [1, 1.02, 1],
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            /* THE FIX: Changed mobile size to text-[11vw] to perfectly fit the screen width */
            className="text-[11vw] sm:text-6xl md:text-[8rem] font-sans font-black uppercase tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff2d2d] to-white drop-shadow-[0_0_20px_rgba(255,45,45,0.3)] whitespace-nowrap"
            style={{ backgroundSize: "200% auto" }}
          >
            INTECHO'26
          </motion.h2>
        </motion.div>

        {/* 6. Subtitle / Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <p className="font-body text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl mx-auto px-4 leading-relaxed">
            A national level technical symposium bringing together the brightest minds in engineering.
          </p>
        </motion.div>

        {/* 7. Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 md:mt-14 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4"
        >
          <a href="#passes" className="w-full sm:w-auto">
            <MagneticButton variant="solid" className="w-full sm:w-auto px-8 py-4 text-sm bg-[#ff2d2d] hover:bg-[#ff102a] text-white">
              Get Passes
            </MagneticButton>
          </a>
          <a href="#tech-events" className="w-full sm:w-auto">
            <MagneticButton variant="glass" className="w-full sm:w-auto px-8 py-4 text-sm bg-white/5 border border-white/10 hover:bg-white/10 text-white">
              Explore Events
            </MagneticButton>
          </a>
        </motion.div>
        
      </div>
    </section>
  );
};

export default HeroSection;
