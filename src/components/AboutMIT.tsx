import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const slides = [
  "https://placehold.co/600x400/1a1a2e/ff2d2d?text=MIT+Campus+1",
  "https://placehold.co/600x400/1a1a2e/ff2d2d?text=MIT+Campus+2",
  "https://placehold.co/600x400/1a1a2e/ff2d2d?text=MIT+Campus+3",
];

const aboutText = `Founded in 1949, Madras Institute of Technology (MIT) is a pioneering engineering institute in India, located in Chromepet, Chennai. It is renowned for its state-of-the-art facilities, housing over 3,000 students across various disciplines. MIT boasts a distinguished faculty with expertise in engineering and technology, leading research in fields like aerospace, robotics, and more. Notable alumni include Dr. APJ Abdul Kalam, a testament to MIT's legacy of excellence.`;

const AboutMIT = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about-mit" className="relative z-10 py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About MIT</h2>
        <p className="section-subtitle">Madras Institute of Technology — A Legacy of Excellence</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 mt-12">
        {/* Image Slider */}
        <div className="md:w-1/2 rounded-xl overflow-hidden relative aspect-[3/2]">
          {slides.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`MIT Campus ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: i === current ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            />
          ))}
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? "bg-primary" : "bg-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Text */}
        <div className="md:w-1/2 glass rounded-xl p-6 md:p-8 flex items-center">
          <p className="font-body text-foreground/80 leading-relaxed text-sm md:text-base">
            {aboutText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMIT;
