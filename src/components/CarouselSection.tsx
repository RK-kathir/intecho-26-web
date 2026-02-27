import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TiltCard from "./TiltCard";
import EventModal from "./EventModal";
import MagneticButton from "./MagneticButton";

export interface CarouselItem {
  image: string;
  title: string;
  description: string;
  link?: string;
}

interface CarouselSectionProps {
  id: string;
  title: string;
  subtitle: string;
  items: CarouselItem[];
  showRegister?: boolean;
}

const CarouselSection = ({ id, title, subtitle, items, showRegister = false }: CarouselSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<CarouselItem | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id={id} className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </motion.div>

      {/* Navigation Arrows - Hidden on mobile to save space, but kept for desktop */}
      <div className="hidden md:flex absolute top-1/2 left-0 right-0 justify-between px-10 z-30 pointer-events-none">
        <button onClick={() => scroll("left")} className="p-3 glass rounded-full pointer-events-auto"><ChevronLeft /></button>
        <button onClick={() => scroll("right")} className="p-3 glass rounded-full pointer-events-auto"><ChevronRight /></button>
      </div>

      <div className="relative mt-12" style={{ perspective: "1000px" }}>
        <motion.div 
          ref={scrollRef} 
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar will-change-transform"
          style={{ transform: "translateZ(0)", scrollbarWidth: "none" }}
        >
          {items.map((item, i) => (
            <motion.div 
              key={item.title} 
              className="snap-center shrink-0 w-72 will-change-transform"
              initial={{ rotateY: 15, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard className="h-full">
                <div className="glass rounded-xl p-6 flex flex-col items-center gap-4 h-full border border-white/5 shadow-xl bg-black/20 will-change-transform">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-16 rounded-lg object-cover cursor-pointer" 
                    onClick={() => setModal(item)}
                  />
                  <h3 className="font-heading text-lg font-bold text-foreground text-center capitalize">{item.title}</h3>
                  <p className="font-body text-muted-foreground text-center text-xs leading-relaxed line-clamp-2">{item.description}</p>
                  
                  {showRegister && item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full z-30">
                      <MagneticButton variant="glass" className="w-full text-xs">Register Now</MagneticButton>
                    </a>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <EventModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ""} description={modal?.description || ""} image={modal?.image || ""} />
    </section>
  );
};

export default CarouselSection;
