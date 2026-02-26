import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

const passes = [
  { name: "Gold Pass", price: "₹600", desc: "Unlock access to 5 events with premium perks!", tier: "gold" },
  { name: "Silver Pass", price: "₹500", desc: "Join 4 events with exclusive benefits!", tier: "silver" },
  { name: "Bronze Pass", price: "₹400", desc: "Experience 3 events with essential access!", tier: "bronze" },
];

const tierGradients: Record<string, string> = {
  gold: "from-yellow-600/20 to-yellow-900/5",
  silver: "from-gray-400/20 to-gray-700/5",
  bronze: "from-orange-700/20 to-orange-900/5",
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {passes.map((pass, i) => (
          <motion.div
            key={pass.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <TiltCard className="h-full">
              <div className={`glass rounded-xl p-8 flex flex-col items-center gap-4 h-full bg-gradient-to-b ${tierGradients[pass.tier]}`}>
                <h3 className="font-heading text-2xl font-bold text-foreground">{pass.name}</h3>
                <span className="font-heading text-4xl font-extrabold text-primary text-glow-red">{pass.price}</span>
                <p className="font-body text-muted-foreground text-center text-sm">{pass.desc}</p>
                <button className="btn-glass mt-auto">Get Pass</button>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PassesSection;
