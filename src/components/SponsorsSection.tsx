import { motion } from "framer-motion";

const sponsors = [
  {
    name: "Placka",
    logo: "https://i.ibb.co/KcXSCvgQ/placka.jpg",
    alt: "placka", 
    border: "0"
  },
  // If you get more sponsors in the future, just add them here like this:
  // { name: "Another Sponsor", logo: "IMAGE_URL_HERE", alt: "Sponsor Name" }
];

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <h2 className="section-title text-white">Our Sponsors</h2>
        <p className="section-subtitle">Proudly supported by our industry partners</p>
      </div>

      <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 md:gap-12 mt-10">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-xl p-6 flex justify-center items-center bg-[#111] border border-white/10 hover:border-[#ff2d2d]/50 hover:shadow-[0_0_20px_rgba(255,45,45,0.2)] transition-all duration-300 w-48 h-32 md:w-56 md:h-36"
          >
            <img 
              src={sponsor.logo} 
              alt={sponsor.alt} 
              className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SponsorsSection;
