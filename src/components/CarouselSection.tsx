import { useState, useRef } from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import EventModal from "./EventModal";
import MagneticButton from "./MagneticButton";

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
        className="flex gap-6 mt-12 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 60, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12, type: "spring" }}
            className="snap-start shrink-0 w-72"
          >
            <TiltCard className="h-full">
              <motion.div
                className="glass rounded-xl p-6 flex flex-col items-center gap-4 h-full cursor-pointer transition-all duration-500 border border-transparent hover:border-primary/30"
                onClick={() => setModal(item)}
                whileHover={{
                  boxShadow: "0 0 30px rgba(255,45,45,0.2), 0 0 60px rgba(255,45,45,0.05)",
                  y: -5,
                }}
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <h3 className="font-heading text-lg font-bold text-foreground text-center">{item.title}</h3>
                <p className="font-body text-muted-foreground text-center text-xs leading-relaxed">{item.description}</p>
                {showRegister && (
                  <MagneticButton
                    variant="glass"
                    className="mt-auto text-xs"
                    onClick={() => setModal(item)}
                  >
                    Register
                  </MagneticButton>
                )}
              </motion.div>
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
