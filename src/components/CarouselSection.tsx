import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <section id={id} className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div>
        <h2 className="section-title">{title}</h2>
      </div>

      <div className="hidden md:flex absolute top-1/2 left-0 right-0 justify-between px-4 z-30 pointer-events-none">
        <button onClick={() => scroll("left")} className="p-2 bg-[#111] border border-white/10 rounded-full pointer-events-auto hover:bg-[#222] transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button onClick={() => scroll("right")} className="p-2 bg-[#111] border border-white/10 rounded-full pointer-events-auto hover:bg-[#222] transition-colors">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="relative mt-8">
        <div 
          ref={scrollRef} 
          className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {items.map((item) => (
            <div key={item.title} className="snap-center shrink-0 w-[260px] md:w-72">
              <div className="rounded-xl p-5 flex flex-col items-center gap-4 h-full border border-white/10 bg-[#111] shadow-lg">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-16 h-16 rounded-lg object-cover cursor-pointer" 
                  onClick={() => setModal(item)}
                />
                <h3 className="font-heading text-lg font-bold text-center capitalize text-white">{item.title}</h3>
                <p className="font-body text-xs text-gray-400 text-center line-clamp-2">{item.description}</p>
                
                {showRegister && item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full z-20">
                    <MagneticButton variant="solid" className="w-full text-xs py-2 bg-[#222] text-white">
                      Register
                    </MagneticButton>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <EventModal open={!!modal} onClose={() => setModal(null)} title={modal?.title || ""} description={modal?.description || ""} image={modal?.image || ""} />
    </section>
  );
};

export default CarouselSection;
