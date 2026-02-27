import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import RotatingText from "./RotatingText";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <img 
            src="/iea-logo.png" 
            alt="IEA Logo" 
            className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center flex flex-col items-center"
        >
          {/* --- THE NEW ROTATING TEXT --- */}
          <div className="h-[80px] md:h-[120px] flex items-center justify-center overflow-hidden">
            <RotatingText
              texts={["INTECHO'26", "COMMAND.", "CREATE.", "CONQUER."]}
              mainClassName="text-6xl md:text-[8rem] font-syne font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 uppercase tracking-tighter"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.03}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3500}
            />
          </div>
          {/* ----------------------------- */}

          <p className="font-heading text-[0.65rem] md:text-[0.85rem] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400 text-center mt-6">
            Instrumentation Engineers Association
          </p>

          <p className="mt-6 md:mt-8 font-body text-base md:text-xl text-gray-300 max-w-2xl mx-auto px-4 leading-relaxed">
            A national level technical symposium bringing together the brightest minds in engineering.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4"
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
