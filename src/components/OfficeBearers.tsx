import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Student Name", role: "Chairperson", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=CH" },
  { name: "Student Name", role: "General secretary", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=VC" },
  { name: "Student Name", role: "Program Secretary", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=SEC" },
  { name: "Student Name", role: "Joint Treasurer", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=TR" },
  { name: "Student Name", role: "Event coordinator", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=EC" },
  { name: "Student Name", role: "Vice Chairperson", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=VC2" },
  { name: "Student Name", role: "Head of Public relation", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=PR" },
  { name: "Student Name", role: "Head of report team", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=HR" },
  { name: "Student Name", role: "Joint secretary", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=JS" },
  { name: "Student Name", role: "Head of editing team", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=HE" },
  { name: "Student Name", role: "PG representative", image: "https://placehold.co/400x400/1a1a2e/ff2d2d?text=PG" }
];

const OfficeBearers = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    // If the user is hovering over the cards, pause the auto-scroll
    if (isHovered) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // If we reached the end, loop smoothly back to the beginning
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Otherwise, scroll right by roughly the width of one card
          scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 3000); // Scrolls every 3 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  // Manual button scroll logic
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollAmount = 300;

      if (direction === "left") {
        if (scrollLeft <= 0) {
          // If at the start and clicking left, jump to the end
          scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      } else {
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
           // If at the end and clicking right, jump to the start
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }
  };

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

      {/* Carousel Container with Buttons */}
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Scroll Button */}
        <button 
          onClick={() => scroll("left")}
          className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-10 bg-[#050505] border border-white/10 hover:border-[#ff2d2d] text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hidden sm:block shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Scrolling Cards */}
        <div 
          ref={scrollRef} 
          /* Tailwind trick to hide scrollbar but keep functionality */
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              /* Added min-width so the cards sit next to each other instead of stacking */
              className="flex flex-col items-center group snap-center min-w-[250px] sm:min-w-[280px]"
            >
              {/* Photo Container */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#ff2d2d] transition-colors duration-500 shadow-lg shrink-0">
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
              <p className="text-sm font-sans tracking-[0.2em] text-[#ff2d2d] uppercase mt-2 text-center h-10">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button 
          onClick={() => scroll("right")}
          className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-10 bg-[#050505] border border-white/10 hover:border-[#ff2d2d] text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hidden sm:block shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

    </section>
  );
};

export default OfficeBearers;
