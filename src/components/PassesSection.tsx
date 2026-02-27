import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";

const passes = [
  { name: "diamond Pass", price: "₹649", desc: "Unlock access to 4 events with premium perks!", tier: "diamond" },
  { name: "gold Pass", price: "₹499", desc: "Join 3 events with exclusive benefits!", tier: "gold" },
  { name: "silver Pass", price: "₹349", desc: "Experience 2 events with essential access!", tier: "silver" },
];

const tierStyles: Record<string, { gradient: string; border: string; icon: string }> = {
  diamond: { gradient: "from-yellow-500/15 via-yellow-600/5 to-transparent", border: "border-yellow-500/20", icon: "👑" },
  gold: { gradient: "from-gray-300/15 via-gray-500/5 to-transparent", border: "border-gray-400/20", icon: "⚡" },
  silver: { gradient: "from-orange-600/15 via-orange-700/5 to-transparent", border: "border-orange-500/20", icon: "🔥" },
};

const PassesSection = () => {
  return (
    <section id="passes" className="relative z-10 py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Event Passes</h2>
        <p className="section-subtitle">Choose your pass and join the symposium</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {passes.map((pass, i) => (
          <motion.div
            key={pass.name}
            initial={{ opacity: 0, y: 60, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.2, type: "spring" }}
          >
            <TiltCard className="h-full">
              <div className={`glass rounded-2xl p-8 flex flex-col items-center gap-5 h-full bg-gradient-to-b ${tierStyles[pass.tier].gradient} ${tierStyles[pass.tier].border} border hover:glow-red-strong transition-all duration-500`}>
                <motion.span
                  className="text-4xl"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  style={{ display: "inline-block" }}
                >
                  {tierStyles[pass.tier].icon}
                </motion.span>
                <h3 className="font-heading text-2xl font-bold text-foreground">{pass.name}</h3>
                <motion.span
                  className="font-heading text-5xl font-extrabold text-primary text-glow-red"
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {pass.price}
                </motion.span>
                <p className="font-body text-muted-foreground text-center text-sm">{pass.desc}</p>
                <MagneticButton variant="glass" className="mt-auto">
                  Get Pass
                </MagneticButton>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PassesSection;
