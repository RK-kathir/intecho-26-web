import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ieaLogo from "@/assets/iea-logo.png";

const navLinks = [
  "Home", "About", "Passes", "Events", "Workshops", "Food & Stay", "Sponsors", "About MIT", "Contact"
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const idMap: Record<string, string> = {
  "Home": "hero",
  "About": "about",
  "Passes": "passes",
  "Events": "tech-events",
  "Workshops": "workshops",
  "Food & Stay": "food",
  "Sponsors": "sponsors",
  "About MIT": "about-mit",
  "Contact": "contact",
};

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <img src={ieaLogo} alt="IEA Logo" className="h-10 w-auto" />

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(idMap[link])}
              className="font-body text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </button>
          ))}
        </nav>

        {/* 3D Animated Mobile toggle */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="lg:hidden relative z-[60] w-6 h-5 flex flex-col justify-between cursor-pointer focus:outline-none"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 9 : 0, rotateX: open ? 180 : 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="w-full h-[2px] bg-foreground origin-center shadow-[0_0_5px_rgba(255,255,255,0.5)]"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1, x: open ? -20 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-[2px] bg-foreground shadow-[0_0_5px_rgba(255,255,255,0.5)]"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -9 : 0, rotateX: open ? -180 : 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="w-full h-[2px] bg-foreground origin-center shadow-[0_0_5px_rgba(255,255,255,0.5)]"
          />
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-16 right-0 bottom-0 w-72 glass-strong flex flex-col gap-4 p-8 lg:hidden z-50 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]"
          >
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => { scrollTo(idMap[link]); setOpen(false); }}
                className="font-heading text-lg text-foreground hover:text-primary transition-colors text-left"
              >
                {link}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
