import { motion } from "framer-motion";

const sponsorGroups = [
  {
    label: "Title Sponsors",
    sponsors: ["Logo Placeholder", "Logo Placeholder"],
  },
  {
    label: "Associate Sponsors",
    sponsors: ["Logo Placeholder", "Logo Placeholder", "Logo Placeholder"],
  },
  {
    label: "Certificate Sponsor",
    sponsors: ["Logo Placeholder"],
    wide: true,
  },
];

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="relative z-10 py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Our Sponsors</h2>
        <p className="section-subtitle">Partners who make it all possible</p>
      </motion.div>

      {sponsorGroups.map((group, gi) => (
        <div key={group.label} className="mt-10">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">{group.label}</h3>
          <div className={`flex flex-wrap gap-4 ${group.wide ? "" : ""}`}>
            {group.sponsors.map((s, si) => (
              <motion.div
                key={`${gi}-${si}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: si * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`glass rounded-full px-8 py-4 flex items-center justify-center hover:glow-red-strong transition-shadow cursor-pointer ${
                  group.wide ? "w-full md:w-96" : "w-44"
                }`}
              >
                <span className="font-body text-muted-foreground text-sm">{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default SponsorsSection;
