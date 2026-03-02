import { motion } from "framer-motion";

// You can swap these out with your actual team photos from the assets folder later!
const teamMembers = [
  { name: "Student Name", role: "Chairperson", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=CH" },
  { name: "Student Name", role: "General secretary", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=VC" },
  { name: "Student Name", role: "Program Secretary", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=SEC" },
  { name: "Student Name", role: "Joint Treasurer", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=TR" },
  {name: "Student Name", role: "Event coordinator", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=TR" },
  {name: "Student Name", role: "Vice Chairperson", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=TR" },
  {name: "Student Name", role: "Head of Public realation", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=TR" },
  {name: "Student Name", role: "Head of report team", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=TR" },
  { name: "Student Name", role: "Joint secreetary", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=TR" },
  {name: "Student Name", role: "Head of editing team", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=TR" },
  {name: "Student Name", role: "PG represntative", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=TR" }
];

const OfficeBearers = () => {
  return (
    <section id="office-bearers" className="py-20 px-4 md:px-8 relative max-w-7xl mx-auto w-full">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-syne font-bold text-white mb-4 uppercase">
          IEA <span className="text-[#ff2d2d]">Office Bearers</span>
        </h2>
        <div className="w-24 h-1 bg-[#ff2d2d] mx-auto rounded-full" />
      </motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center group"
          >
            {/* Photo Container */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#ff2d2d] transition-colors duration-500 shadow-lg">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            {/* Name and Role */}
            <h3 className="text-xl font-sans font-bold text-white tracking-wide text-center">
              {member.name}
            </h3>
            <p className="text-sm font-sans tracking-[0.2em] text-[#ff2d2d] uppercase mt-2 text-center">
              {member.role}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OfficeBearers;
