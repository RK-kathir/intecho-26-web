import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import ElectricBorder from "./ElectricBorder"; // Import your new component
import "./ElectricBorder.css"; // Ensure the CSS is imported

const passes = [
  // Added hex colors for the ElectricBorder
  { name: "Diamond Pass", price: "₹649", desc: "Unlock access to 4 events with premium perks!", tier: "diamond", color: "#eab308", link: "#" },
  { name: "gold Pass", price: "₹499", desc: "Join 3 events with exclusive benefits!", tier: "gold", color: "#d1d5db", link: "#" },
  { name: "silver Pass", price: "₹349", desc: "Experience 2 events with essential access!", tier: "silver", color: "#ea580c", link: "#" },
];

const tierStyles = {
  diamond: { icon: "👑" },
  gold: { icon: "⚡" },
  silver: { icon: "🔥" },
};

const PassesSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile to prevent the laggy canvas animation on phones
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <section id="passes" className="relative z-10 py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <div>
        <h2 className="section-title">Event Passes</h2>
        <p className="section-subtitle">Choose your pass and join the symposium</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {passes.map((pass) => {
          
          // The inner card content (used for both mobile and desktop)
          const CardContent = (
            <div className="rounded-2xl p-8 flex flex-col items-center gap-4 h-full bg-[#111]">
              <span className="text-4xl">{tierStyles[pass.tier].icon}</span>
              <h3 className="font-heading text-xl font-bold text-white">{pass.name}</h3>
              <span className="font-heading text-4xl font-extrabold text-[#ff2d2d]">{pass.price}</span>
              <p className="font-body text-gray-400 text-center text-xs">{pass.desc}</p>
              <a href={pass.link} className="mt-auto block w-full z-20">
                <MagneticButton variant="glass" className="w-full bg-black/50">Get Pass</MagneticButton>
              </a>
            </div>
          );

          return (
            <div key={pass.name} className="h-full">
              {isMobile ? (
                // MOBILE: Static border to prevent freezing
                <div 
                  className="h-full rounded-2xl p-[2px]" 
                  style={{ backgroundColor: pass.color }} // Simple colored border
                >
                  {CardContent}
                </div>
              ) : (
                // DESKTOP: Full Electric Border animation
                <ElectricBorder
                  color={pass.color}
                  speed={1}
                  chaos={0.12}
                  borderRadius={16}
                  className="h-full"
                >
                  {CardContent}
                </ElectricBorder>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PassesSection;
