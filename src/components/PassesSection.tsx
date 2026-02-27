import MagneticButton from "./MagneticButton";

// @ts-ignore
import ElectricBorder from "./ElectricBorder"; 

const passes = [
  { name: "Diamond Pass", price: "₹649", desc: "Unlock access to 4 events with premium perks!", tier: "diamond", color: "#eab308", link: "https://docs.google.com/forms/d/e/1FAIpQLScz9eZ_T_G8a1YYC23B8BTF7ESVbXSf14IQQfQvrFCgRgXoMA/viewform?usp=publish-editor" },
  { name: "gold Pass", price: "₹499", desc: "Join 3 events with exclusive benefits!", tier: "gold", color: "#d1d5db", link: "https://docs.google.com/forms/d/e/1FAIpQLSeF2N5ua5ZSaodUNc11JkuP6rupjhK4KmeBAXltUeP6RwHyQQ/viewform?usp=publish-editor" },
  { name: "silver Pass", price: "₹349", desc: "Experience 2 events with essential access!", tier: "silver", color: "#ea580c", link: "https://docs.google.com/forms/d/e/1FAIpQLSfkF3E5J0NivmEoeyFZMW7BvNd6Q-ULytFCTt5_yDpnK3GiZQ/viewform?usp=publish-editor" },
];

const tierStyles = {
  diamond: { icon: "👑" },
  gold: { icon: "⚡" },
  silver: { icon: "🔥" },
};

const PassesSection = () => {
  return (
    <section id="passes" className="relative z-10 py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <div>
        <h2 className="section-title">Event Passes</h2>
        <p className="section-subtitle">Choose your pass and join the symposium</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {passes.map((pass) => (
          <div key={pass.name} className="h-full">
            <ElectricBorder
              color={pass.color}
              speed={0.5}   
              chaos={0.08}  
              borderRadius={16}
              className="h-full"
            >
              <div className="rounded-2xl p-8 flex flex-col items-center gap-4 h-full bg-[#111]">
                <span className="text-4xl">{tierStyles[pass.tier].icon}</span>
                <h3 className="font-heading text-xl font-bold text-white">{pass.name}</h3>
                <span className="font-heading text-4xl font-extrabold text-[#ff2d2d]">{pass.price}</span>
                <p className="font-body text-gray-400 text-center text-xs">{pass.desc}</p>
                
                <a href={pass.link} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full z-20">
                  <MagneticButton variant="glass" className="w-full bg-black/50 text-white">Get Pass</MagneticButton>
                </a>
              </div>
            </ElectricBorder>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PassesSection;
