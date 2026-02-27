import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TiltCard from "./TiltCard";
import EventModal from "./EventModal";
import MagneticButton from "./MagneticButton";

const CarouselSection = ({ id, title, items, showRegister = false }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: "smooth" });
    }
  };

  return (
    <section id={id} className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="section-title">{title}</h2>
      </motion.div>

      {/* Navigation arrows (Desktop only to prevent accidental mobile taps) */}
      <div className="hidden md:flex absolute top-1/2 left-0 right-0 justify-between px-4 z-30 pointer-events-none">
        <button onClick={() => scroll("left")} className="p-2 bg-black/50 border border-white/10 rounded-full pointer-events-auto hover:bg-primary/50 transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button onClick={() => scroll("right")} className="p-2 bg-black/50 border border-white/10 rounded-full pointer-events-auto hover:bg-primary/50 transition-colors">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="relative mt-8">
        <div 
          ref={scrollRef} 
          className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: "none", transform: "translateZ(0)" }}
        >
          {items.map((item, i) => (
            <motion.div 
              key={item.title} 
              className="snap-center shrink-0 w-[260px] md:w-72 will-change-transform"
              // Optimized 2D Fade instead of laggy 3D flip
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <TiltCard className="h-full">
                <div className="glass rounded-xl p-5 flex flex-col items-center gap-4 h-full border border-white/5 bg-black/40">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-16 rounded-lg object-cover cursor-pointer" 
                    onClick={() => setModal(item)}
                  />
                  <h3 className="font-heading text-lg font-bold text-center capitalize text-foreground">{item.title}</h3>
                  <p className="font-body text-xs text-muted-foreground text-center line-clamp-2">{item.description}</p>
                  
                  {showRegister && item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full z-20">
                      <MagneticButton variant="glass" className="w-full text-xs py-2">
                        Register
                      </MagneticButton>
                    </a>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <EventModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ""} description={modal?.description || ""} image={modal?.image || ""} />
    </section>
  );
};

export default CarouselSection;
