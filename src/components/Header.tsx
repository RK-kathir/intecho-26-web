import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-16 right-0 bottom-0 w-72 glass-strong flex flex-col gap-4 p-8 lg:hidden"
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
