import { motion } from "framer-motion";

import vishwaImg from "@/assets/vishwa.jpeg";
import kalaiImg from "@/assets/kalai.jpeg";
import pavithraImg from "@/assets/pavithra.jpeg";
import sanjayImg from "@/assets/sanjaykumar.jpeg";
import chockuImg from "@/assets/chocku.jpeg";
import praveenImg from "@/assets/praveen.jpeg";
import manotheethaImg from "@/assets/manotheetha.jpeg";
import jointSecImg from "@/assets/joint secretary.jpeg";
import maadeshImg from "@/assets/maadesh.jpeg";
import vasanthImg from "@/assets/vasanth.jpeg";
import karthiImg from "@/assets/karthikeyan.jpeg";

const teamMembers = [
  { name: "Vishwa", role: "Chairperson", image: vishwaImg },
  { name: "Karthikeyan", role: "Eventcoordinator", image: karthiImg },
  { name: "Chockalingam ", role: "Vice Chairperson", image: chockuImg },
  { name: "Kalai selvan", role: "General Secretary", image: kalaiImg },
  { name: "Pavithra", role: "Program Secretary", image: pavithraImg },
  { name: "Tharun kumar", role: "Joint Secretary", image: jointSecImg },
  { name: "Sanjay Kumar", role: "Joint Treasurer", image: sanjayImg },
  { name: "Praveen", role: "Head of Public Relation", image: praveenImg },
  { name: "Manotheetha", role: "Head of Report Team", image: manotheethaImg },
  { name: "Madesh", role: "Head of Editing Team", image: maadeshImg },
  { name: "Vasanth", role: "PG Representative", image: vasanthImg }
];

const marqueeItems = [...teamMembers, ...teamMembers];

const OfficeBearers = () => {
  return (
    <section id="office-bearers" className="py-20 relative w-full overflow-hidden">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4"
      >
        <h2 className="text-3xl md:text-5xl font-syne font-bold text-white mb-4 uppercase">
          IEA <span className="text-[#ff2d2d]">Office Bearers</span>
        </h2>
        <div className="w-24 h-1 bg-[#ff2d2d] mx-auto rounded-full" />
      </motion.div>

      {/* Infinite Scroll Marquee Container */}
      <div className="relative w-full flex overflow-hidden group">
        
        {/* Faded edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 px-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 60, // THE FIX: Increased from 30 to 60 to slow down the scroll
          }}
          style={{ width: "max-content" }}
        >
          {marqueeItems.map((member, index) => (
            <div 
              key={index}
              className="w-64 flex-shrink-0 bg-zinc-900 border border-white/10 rounded-2xl p-6 flex flex-col items-center hover:border-[#ff2d2d]/50 transition-colors shadow-lg"
            >
              {/* Name Above */}
              <h3 className="text-xl font-sans font-bold text-white tracking-wide text-center mb-4">
                {member.name}
              </h3>
              
              {/* Image Middle - THE FIX: Changed from circle to square and centered */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-2 border-[#ff2d2d]/30 mb-6 shadow-inner shrink-0 bg-black flex items-center justify-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {/* Post Below */}
              <p className="text-xs font-sans tracking-[0.15em] text-[#ff2d2d] uppercase text-center font-semibold h-8 flex items-center justify-center">
                {member.role}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OfficeBearers;
