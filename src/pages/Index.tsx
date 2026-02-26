import { Suspense, lazy, useState, useEffect } from "react";
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

const ParticlesBg = lazy(() => import("@/components/ParticlesBg"));

const techEvents = [
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=PC", title: "Prompt Clash", description: "Master the art of AI prompting to generate the best results.", link: "https://docs.google.com/forms/d/e/1FAIpQLScIrj3nBV9k6puhdWuBRbyx1gdRcxDcKS9kqJ4ofEN92B3ymQ/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=CC", title: "Code Craze", description: "Unleash your coding prowess in this high-intensity hackathon.", link: "https://docs.google.com/forms/d/e/1FAIpQLSculCkJKPQp6PDi5ndc4YFgkTmi2D07FW-PFM12Lhs4xul85A/viewform?usp=dialog" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=IF", title: "Idea Forge", description: "Transform your innovative concepts into viable prototypes.", link: "https://docs.google.com/forms/d/e/1FAIpQLSd5sMB0xBXFKvKJE71ULzYI8q4dezO5U8BEcjtnoszT7HaM3g/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=TQ", title: "Tech Quest", description: "Test your technical vocabulary in this fast-paced guessing game.", link: "https://docs.google.com/forms/d/e/1FAIpQLSe4S3gbcyQJWmXNTBIqmNSd6RqfHOqIeTXnixgm-m7qQFuI5w/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=PP", title: "Paper Presentation", description: "Present your technical papers and innovative ideas.", link: "https://docs.google.com/forms/d/e/1FAIpQLSeLvZlgJaPGHpSBrGimyO0Jn2OCdZ5TFlnylSzClNvkNVHePQ/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=CH", title: "Chess", description: "Master the 64 squares in this strategic battle of minds.", link: "https://docs.google.com/forms/d/e/1FAIpQLScLYE1E8NL-0vxqAerutnmLjEUmOpKaHJq-Y-axViVPc8cylQ/viewform?usp=publish-editor" },
];

const nonTechEvents = [
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=TH", title: "Treasure Hunt", description: "Solve clues and hunt for the hidden treasure.", link: "https://docs.google.com/forms/d/e/1FAIpQLSeqs7HR1taI9vrmAHWeOp_zQoHlslMVb6vaArDA-9dx465J5g/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=US", title: "Uno Showdown", description: "Battle it out in this classic card game.", link: "https://docs.google.com/forms/d/e/1FAIpQLSeV5mmCdF4Wu8yMbIjQNgk2f0dPI5W9yg8UfiAdTAcMrw6XbA/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=TT", title: "Twin Tactics", description: "Sync up and win in dual challenges.", link: "https://docs.google.com/forms/d/e/1FAIpQLSfIGsidDolEdkbgOP7QZxcO34awK-5WJj_U7OrPLCjWFoIUCg/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=QZ", title: "Quizzard", description: "Test your knowledge in this rapid-fire quiz.", link: "https://docs.google.com/forms/d/e/1FAIpQLSfLL6YvswrJTjl9_AywrXEjBsxpH5q_HjJfl9ibdlzZogS_Ww/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=LL", title: "Locked and Lost", description: "Find your way out in this thrilling escape challenge.", link: "https://docs.google.com/forms/d/e/1FAIpQLSfA1suzxHwYVEcXKvtM9PieacMfQIZremlPGxsgqT4WWoyY1Q/viewform?usp=publish-editor" },
];

const workshops = [
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=S", title: "Siemens", description: "Industrial automation and control workshop.", link: "#" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=Y", title: "Yokogawa", description: "Advanced instrumentation and DCS systems.", link: "#" },
];

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [shockActive, setShockActive] = useState(false);

  // Handle the intro screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Handle the Electric Shock background effect on click
  const handleInteraction = () => {
    setShockActive(true);
    setTimeout(() => setShockActive(false), 150);
  };

  return (
    <div 
      className="relative min-h-screen bg-background overflow-x-hidden"
      onClick={handleInteraction}
    >
      {/* Intro Animation Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] bg-black flex items-center justify-center"
          >
            <motion.h1
              initial={{ scale: 0.8, opacity: 0, textShadow: "0px 0px 0px rgba(255,45,45,0)" }}
              animate={{ scale: 1, opacity: 1, textShadow: "0px 0px 20px rgba(255,45,45,0.8)" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-4xl md:text-7xl font-syne font-bold text-white tracking-[0.3em] uppercase"
            >
              INTECHO'26
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Electric Shock Reactive Layer */}
      <AnimatePresence>
        {shockActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-[#ff2d2d]/10 to-transparent mix-blend-screen"
          />
        )}
      </AnimatePresence>

      <CursorGlow />
      <Suspense fallback={null}>
        <ParticlesBg />
      </Suspense>

      <Header />

      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <PassesSection />
      <SectionDivider />

      <CarouselSection
        id="tech-events"
        title="Technical Events"
        subtitle="Showcase your skills in various technical challenges"
        items={techEvents}
        showRegister
      />
      <SectionDivider />

      <CarouselSection
        id="nontech-events"
        title="Non-Tech Events"
        subtitle="Blend fun and tech in exciting challenges"
        items={nonTechEvents}
        showRegister
      />
      <SectionDivider />

      <CarouselSection
        id="workshops"
        title="Workshops"
        subtitle="Learn from industry experts"
        items={workshops}
        showRegister
      />
      <SectionDivider />
      <FoodSection />
      <SectionDivider />
      <SponsorsSection />
      <SectionDivider />
      <AboutMIT />
      <SectionDivider />
      <ContactSection />
      <ScrollToTop />

      {/* Built With Kathirvel R - Sticky Footer */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[50] pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(255,45,45,0.2)]">
          <p className="text-[10px] md:text-xs font-syne tracking-[0.2em] text-white/70 uppercase">
            Built with <span className="text-[#ff2d2d] font-bold drop-shadow-[0_0_5px_rgba(255,45,45,0.8)]">Kathirvel R</span>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Index;
