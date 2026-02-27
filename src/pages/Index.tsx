import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection"; 
import AboutSection from "@/components/AboutSection";
import PassesSection from "@/components/PassesSection";
import CarouselSection from "@/components/CarouselSection";
import FoodSection from "@/components/FoodSection";
import SponsorsSection from "@/components/SponsorsSection";
import AboutMIT from "@/components/AboutMIT";
import ContactSection from "@/components/ContactSection";
import ScrollToTop from "@/components/ScrollToTop";
import SectionDivider from "@/components/SectionDivider";
import CursorGlow from "@/components/CursorGlow";

// 2D CSS-Only Robot (Zero Lag)
const FlyingRobot = () => (
  <motion.div
    className="fixed pointer-events-none z-0 opacity-10 text-4xl will-change-transform"
    style={{ transform: "translateZ(0)" }}
    animate={{ x: ["-10vw", "110vw"], y: ["30vh", "30vh"] }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    🤖
  </motion.div>
);

const techEvents = [
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=PC", title: "prompt clash", description: "Command. Create. Conquer. Master the art of AI prompting.", link: "https://docs.google.com/forms/d/e/1FAIpQLScIrj3nBV9k6puhdWuBRbyx1gdRcxDcKS9kqJ4ofEN92B3ymQ/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=CC", title: "code craze", description: "Unleash your coding prowess in this high-intensity hackathon.", link: "https://docs.google.com/forms/d/e/1FAIpQLSculCkJKPQp6PDi5ndc4YFgkTmi2D07FW-PFM12Lhs4xul85A/viewform?usp=dialog" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=IF", title: "idea forge", description: "Transform your innovative concepts into viable prototypes.", link: "https://docs.google.com/forms/d/e/1FAIpQLSd5sMB0xBXFKvKJE71ULzYI8q4dezO5U8BEcjtnoszT7HaM3g/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=TG", title: "tech guess", description: "Test your technical vocabulary in this fast-paced guessing game.", link: "https://docs.google.com/forms/d/e/1FAIpQLSe4S3gbcyQJWmXNTBIqmNSd6RqfHOqIeTXnixgm-m7qQFuI5w/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=PP", title: "paper presentation", description: "Present your technical papers and innovative ideas.", link: "https://docs.google.com/forms/d/e/1FAIpQLSeLvZlgJaPGHpSBrGimyO0Jn2OCdZ5TFlnylSzClNvkNVHePQ/viewform?usp=publish-editor" },
];

const nonTechEvents = [
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=TH", title: "treasure hunt", description: "Solve clues and hunt for the hidden treasure.", link: "https://docs.google.com/forms/d/e/1FAIpQLSeqs7HR1taI9vrmAHWeOp_zQoHlslMVb6vaArDA-9dx465J5g/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=US", title: "uno showdown", description: "Battle it out in this classic card game.", link: "https://docs.google.com/forms/d/e/1FAIpQLSeV5mmCdF4Wu8yMbIjQNgk2f0dPI5W9yg8UfiAdTAcMrw6XbA/viewform?usp=dialog" },
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=CH", title: "chess", description: "Master the 64 squares in this strategic battle of minds.", link: "https://docs.google.com/forms/d/e/1FAIpQLScLYE1E8NL-0vxqAerutnmLjEUmOpKaHJq-Y-axViVPc8cylQ/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=TT", title: "twin tactics", description: "Sync up and win in dual challenges.", link: "https://docs.google.com/forms/d/e/1FAIpQLSfIGsidDolEdkbgOP7QZxcO34awK-5WJj_U7OrPLCjWFoIUCg/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=QZ", title: "quizzard", description: "Test your knowledge in this rapid-fire quiz.", link: "https://docs.google.com/forms/d/e/1FAIpQLSfLL6YvswrJTjl9_AywrXEjBsxpH5q_HjJfl9ibdlzZogS_Ww/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=LL", title: "locked and lost", description: "Find your way out in this thrilling escape challenge.", link: "https://docs.google.com/forms/d/e/1FAIpQLSfA1suzxHwYVEcXKvtM9PieacMfQIZremlPGxsgqT4WWoyY1Q/viewform?usp=publish-editor" },
];

const workshops = [
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=PMA", title: "PMA Workshop", description: "Professional management and automation workshop.", link: "https://docs.google.com/forms/d/e/1FAIpQLSerjUJLcNpGaIiolj0lB3V8kRmYhYyx-tmWR7sNcfp7Xj8SGA/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=S", title: "Siemens Workshop", description: "Industrial automation and control workshop.", link: "https://docs.google.com/forms/d/e/1FAIpQLSeRFgzYUXG_F2hztiRHPivb8wk-BbbRvBHO9YdjPgQn8FUKAw/viewform?usp=publish-editor" },
];

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [shockActive, setShockActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  const handleInteraction = () => {
    if (isMobile) return; // Completely disable electric shock on mobile to save battery/RAM
    setShockActive(true);
    setTimeout(() => setShockActive(false), 150);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden" onClick={handleInteraction}>
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[999] bg-black flex items-center justify-center overflow-hidden"
          >
            <motion.h1 
              initial={{ letterSpacing: "-0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.2em", opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-8xl font-syne font-bold text-white uppercase text-center"
            >
              INTECHO'26
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightweight Static Background replacing GLB */}
      <div className="fixed inset-0 z-[-1] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      </div>

      <FlyingRobot />
      {!isMobile && <CursorGlow />} {/* Glow only on laptop */}

      {/* Reduced Electric Effect for Laptop ONLY */}
      <AnimatePresence>
        {shockActive && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }} // Greatly reduced opacity
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-0 pointer-events-none bg-primary/20"
          />
        )}
      </AnimatePresence>

      <Header />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <PassesSection />
      <SectionDivider />

      <CarouselSection id="tech-events" title="Technical Events" items={techEvents} showRegister />
      <SectionDivider />
      <CarouselSection id="nontech-events" title="Non-Tech Events" items={nonTechEvents} showRegister />
      <SectionDivider />
      <CarouselSection id="workshops" title="Workshops" items={workshops} showRegister />
      
      <SectionDivider />
      <FoodSection />
      <SectionDivider />
      <SponsorsSection />
      <SectionDivider />
      <AboutMIT />
      <SectionDivider />
      <ContactSection />
      <ScrollToTop />

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[50] pointer-events-none">
        <div className="bg-black/60 border border-white/10 px-6 py-2 rounded-full">
          <p className="text-[10px] md:text-xs font-syne tracking-[0.2em] text-white/70 uppercase">
            Built with <span className="text-[#ff2d2d] font-bold">Kathirvel R</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
