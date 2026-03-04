import { motion } from "framer-motion";

// 1. All Sponsor Logos Imported
import indusAutoLogo from "@/assets/Indusauto logo.png";
import plackaLogo from "@/assets/placka.jpg";
import indianBankLogo from "@/assets/Indian bank logo.png";
import rajamsPressLogo from "@/assets/rajams press.png";
import bursterlogo from "@/assets/Burster logo.png";
import gantnerlogo from "@/assets/Gantner logo.png";
import pmalogo from "@/assets/PMA logo.png";
import alumnuslogo from "@/assets/alumnus logo.png";

// 2. Sponsor Data Categorized by Tier
const titleSponsor = { name: "IndusAuto Technologies", logo: indusAutoLogo };
const associateSponsor = {{ name: "Placka", logo: plackaLogo } , { name: "Gantner", logo: gantnerlogo } , { name: "Burster", logo: bursterlogo }];
const eventSponsors = [
  { name: "Indian Bank", logo: indianBankLogo },
  { name: "Alumni", logo: alumnuslogo}, // Placeholder for Alumnies
];
const certificateSponsor = { name: "Rajam Digital Prints", logo: rajamsPressLogo };

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="py-20 px-4 md:px-8 relative max-w-7xl mx-auto w-full">
      {/* Main Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h2 className="text-3xl md:text-5xl font-syne font-bold text-white mb-4 uppercase">
          Our <span className="text-[#ff2d2d]">Sponsors</span>
        </h2>
        <div className="w-24 h-1 bg-[#ff2d2d] mx-auto rounded-full" />
      </motion.div>

      {/* --- 1. TITLE SPONSOR (Extra Large + Red Glow) --- */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h3 className="text-xl md:text-2xl font-sans tracking-[0.3em] text-[#ff2d2d] uppercase font-bold">Title Sponsor</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto relative group bg-[#0a0a0a] border-2 border-[#ff2d2d]/50 rounded-2xl overflow-hidden h-64 md:h-80 flex items-center justify-center hover:border-[#ff2d2d] transition-all shadow-[0_0_40px_rgba(255,45,45,0.2)] hover:shadow-[0_0_60px_rgba(255,45,45,0.4)] duration-500"
        >
          <img 
            src={titleSponsor.logo} 
            alt={titleSponsor.name} 
            className="w-full h-full object-contain p-8 md:p-12 group-hover:scale-105 transition-transform duration-700" 
          />
        </motion.div>
      </div>

      {/* --- 2. ASSOCIATE SPONSOR (Large + Subtle Glow) --- */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h3 className="text-lg md:text-xl font-sans tracking-[0.25em] text-zinc-300 uppercase">Associate Sponsor</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto relative group bg-white/5 border border-white/20 rounded-2xl overflow-hidden h-56 md:h-64 flex items-center justify-center hover:border-white/50 transition-all shadow-lg duration-500"
        >
          <img 
            src={associateSponsor.logo} 
            alt={associateSponsor.name} 
            className="w-full h-full object-contain p-8 md:p-10 group-hover:scale-105 transition-transform duration-700" 
          />
        </motion.div>
      </div>

      {/* --- 3. EVENT SPONSORS (2-Column Grid) --- */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h3 className="text-base md:text-lg font-sans tracking-[0.2em] text-zinc-400 uppercase">Event Sponsors</h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {eventSponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
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

      {/* --- 4. CERTIFICATE SPONSOR (Medium Centered) --- */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h3 className="text-sm md:text-base font-sans tracking-[0.2em] text-zinc-500 uppercase">Certificate Sponsor</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto relative group bg-white/5 border border-white/10 rounded-xl overflow-hidden h-40 md:h-48 flex items-center justify-center hover:border-white/30 transition-colors shadow-lg"
        >
          <img 
            src={certificateSponsor.logo} 
            alt={certificateSponsor.name} 
            className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" 
          />
        </motion.div>
      </div>

    </section>
  );
};

export default SponsorsSection;
