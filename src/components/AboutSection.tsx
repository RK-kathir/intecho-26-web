import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="relative z-10 py-20 px-4 md:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About IEA</h2>
        <p className="section-subtitle">The National Level Technical Symposium</p>

        <div className="glass rounded-xl p-6 md:p-10 mt-8">
          <p className="font-body text-foreground/80 leading-relaxed text-sm md:text-base">
            The annual national level inter college technical symposium of the department of instrumentation engineering,
            has its unique style of celebrating education. Participation in this technical symposium will expose students
            to a brand new level of instrumentation. The symposium has gained this reputation because of its quality and standards.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
