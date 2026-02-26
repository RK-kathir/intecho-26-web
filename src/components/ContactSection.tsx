import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contact" className="relative z-10 py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Contact & Location</h2>
        <p className="section-subtitle">Get in touch with us</p>
      </motion.div>

      <div className="mt-8 space-y-6">
        <div className="glass rounded-xl p-6">
          <p className="font-body text-foreground">
            Email:{" "}
            <a href="mailto:iea@institution.edu" className="text-primary hover:underline">
              iea@institution.edu
            </a>
          </p>
        </div>

        <div className="rounded-xl overflow-hidden glow-red">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.583965689396!2d80.13867377507583!3d12.93445898737747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f0565555555%3A0x83307613567d020d!2sDept.%20of%20Instrumentation%20Engg%2CMIT%20Campus%2CAU!5e0!3m2!1sen!2sin!4v1709485741234!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MIT Campus Location"
            className="rounded-xl"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="font-body text-muted-foreground text-xs">
          © 2026 INTECHO'26 — Instrumentation Engineering Association, MIT Chennai
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
