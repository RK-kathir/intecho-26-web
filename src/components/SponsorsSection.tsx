import { motion } from "framer-motion";

// Import your exact logo files from the assets folder
import siemensLogo from "@/assets/Siemens logo.png";
import indianBankLogo from "@/assets/Indian bank logo.png";
import indusAutoLogo from "@/assets/Indusauto logo.png";
import pmaLogo from "@/assets/PMA logo.png";

const sponsors = [
  { name: "Siemens", logo: siemensLogo },
  { name: "Indian Bank", logo: indianBankLogo },
  { name: "IndusAuto", logo: indusAutoLogo },
  { name: "PMA", logo: pmaLogo },
];

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="py-20 px-4 md:px-8 relative max-w-7xl mx-auto w-full">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-syne font-bold text-white mb-4 uppercase">
          Our <span className="text-[#ff2d2d]">Sponsors</span>
        </h2>
        <div className="w-24 h-1 bg-[#ff2d2d] mx-auto rounded-full" />
      </motion.div>

      {/* Sponsors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            // Changed background slightly and kept the border
            className="relative group bg-white/5 border border-white/10 rounded-xl overflow-hidden h-48 md:h-56 flex items-center justify-center hover:border-[#ff2d2d]/50 transition-colors shadow-lg"
          >
            {/* THE FIX: Changed 'object-cover' to 'object-contain' and added 'p-6' padding */}
            <img 
              src={sponsor.logo} 
              alt={sponsor.name} 
              className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SponsorsSection;
