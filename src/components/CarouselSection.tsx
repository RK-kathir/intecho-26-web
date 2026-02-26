import { useState, useRef } from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import EventModal from "./EventModal";

export interface CarouselItem {
  image: string;
  title: string;
  description: string;
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

  return (
    <section id={id} className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </motion.div>

      <div
        ref={scrollRef}
        className="flex gap-6 mt-12 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="snap-start shrink-0 w-72"
          >
            <TiltCard className="h-full">
              <div
                className="glass rounded-xl p-6 flex flex-col items-center gap-4 h-full cursor-pointer hover:glow-red transition-shadow"
                onClick={() => setModal(item)}
              >
                <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                <h3 className="font-heading text-lg font-bold text-foreground text-center">{item.title}</h3>
                <p className="font-body text-muted-foreground text-center text-xs leading-relaxed">{item.description}</p>
                {showRegister && (
                  <button
                    className="btn-glass mt-auto text-xs"
                    onClick={(e) => { e.stopPropagation(); setModal(item); }}
                  >
                    Register
                  </button>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <EventModal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.title || ""}
        description={modal?.description || ""}
        image={modal?.image || ""}
      />
    </section>
  );
};

export default CarouselSection;
