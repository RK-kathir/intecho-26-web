import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

const foodItems = [
  { title: "Food", subtitle: "Traditional Tamil Cuisine" },
  { title: "Stay Facility I", subtitle: "Accommodation for 2" },
  { title: "Stay Facility II", subtitle: "Accommodation for 3" },
];

const FoodSection = () => {
  return (
    <section id="food" className="relative z-10 py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Food & Accommodation</h2>
        <p className="section-subtitle">Eat, Stay, Learn, Win!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {foodItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <TiltCard>
              <div className="glass rounded-xl overflow-hidden">
                <div className="w-full h-44 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm font-body">Image Placeholder</span>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-heading text-xl font-bold text-primary">{item.title}</h3>
                  <p className="font-body text-muted-foreground text-sm mt-1">{item.subtitle}</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FoodSection;
