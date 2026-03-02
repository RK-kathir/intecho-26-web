import { motion } from "framer-motion";

import indianBankLogo from "@/assets/Indian bank logo.png";
import indusAutoLogo from "@/assets/Indusauto logo.png";
import pmaLogo from "@/assets/placka.png";

// 1. Separate the Title Sponsor from the rest
const titleSponsor = { name: "IndusAuto Technologies", logo: indusAutoLogo };
const otherSponsors = [
  { name: "Indian Bank", logo: indianBankLogo },
  { name: "placka", logo: placka },
];

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="py-20 px-4 md:px-8 relative max-w-7xl mx-auto w-full">
      {/* Main Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-syne font-bold text-white mb-4 uppercase">
          Our <span className="text-[#ff2d2d]">Sponsors</span>
        </h2>
        <div className="w-24 h-1 bg-[#ff2d2d] mx-auto rounded-full" />
      </motion.div>

      {/* --- TITLE SPONSOR HIGHLIGHT --- */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h3 className="text-xl md:text-2xl font-sans tracking-[0.3em] text-zinc-400 uppercase">Title Sponsor</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          /* THE HIGHLIGHT: Larger size, red glowing border, and intense drop shadow! */
          className="max-w-3xl mx-auto relative group bg-white/5 border-2 border-[#ff2d2d]/40 rounded-2xl overflow-hidden h-64 md:h-80 flex items-center justify-center hover:border-[#ff2d2d] transition-all shadow-[0_0_30px_rgba(255,45,45,0.15)] hover:shadow-[0_0_50px_rgba(255,45,45,0.3)] duration-500"
        >
          <img 
            src={titleSponsor.logo} 
            alt={titleSponsor.name} 
            className="w-full h-full object-contain p-8 md:p-12 group-hover:scale-105 transition-transform duration-700" 
          />
        </motion.div>
      </div>

      {/* --- CO-SPONSORS SECTION --- */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-6"
        >
          <h3 className="text-sm md:text-base font-sans tracking-[0.2em] text-zinc-500 uppercase">Co-Sponsors</h3>
        </motion.div>

        {/* 2-Column Grid for the remaining 2 sponsors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {otherSponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative group bg-white/5 border border-white/10 rounded-xl overflow-hidden h-48 md:h-56 flex items-center justify-center hover:border-white/30 transition-colors shadow-lg"
            >
              <img 
                src={sponsor.logo} 
                alt={sponsor.name} 
                className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500" 
              />
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default SponsorsSection;
