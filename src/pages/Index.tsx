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

// @ts-ignore
import Hyperspeed from "@/components/Hyperspeed";

// ------------------------------------------------------------------
// FIX: We MUST put the Hyperspeed options OUTSIDE the component 
// so React doesn't infinitely restart the 3D canvas!
// ------------------------------------------------------------------
const hyperspeedOptions = {
  distortion: "xyDistortion",
  length: 400,
  roadWidth: 9,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 3,
  carLightsFade: 0.4,
  totalSideLightSticks: 50,
  lightPairsPerRoadWay: 30,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.02, 0.05],
  lightStickHeight: [0.3, 0.7],
  movingAwaySpeed: [20, 50],
  movingCloserSpeed: [-150, -230],
  carLightsLength: [400 * 0.05, 400 * 0.2],
  carLightsRadius: [0.03, 0.08],
  carWidthPercentage: [0.1, 0.5],
  carShiftX: [-0.5, 0.5],
  carFloorSeparation: [0, 0.1],
  colors: {
    roadColor: 0x050505,
    islandColor: 0x0a0a0a,
    background: 0x050505,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    leftCars: [0xff2d2d, 0xa90519, 0xff102a], // Red lights
    rightCars: [0x6a5acd, 0x483d8b, 0x7b68ee], // Purple lights
    sticks: 0xff2d2d // Red light sticks
  }
};

// MOBILE ONLY: Custom NO-LAG CSS Hyperspeed Lines
const MobileFastLines = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#050505] flex justify-center">
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-[2px] h-[30vh] bg-gradient-to-b from-transparent via-[#ff2d2d] to-transparent opacity-40"
        style={{ left: `${Math.random() * 100}%` }}
        animate={{ y: ["-30vh", "130vh"] }}
        transition={{
          duration: Math.random() * 0.8 + 0.5,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2
        }}
      />
    ))}
    {Array.from({ length: 10 }).map((_, i) => (
      <motion.div
        key={`purple-${i}`}
        className="absolute w-[1px] h-[20vh] bg-gradient-to-b from-transparent via-[#6a5acd] to-transparent opacity-30"
        style={{ left: `${Math.random() * 100}%` }}
        animate={{ y: ["-20vh", "120vh"] }}
        transition={{
          duration: Math.random() * 1 + 0.7,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 1.5
        }}
      />
    ))}
  </div>
);

const techEvents = [
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=PC", title: "prompt clash", description: "Command. Create. Conquer. Master the art of AI prompting.", link: "https://docs.google.com/forms/d/e/1FAIpQLScIrj3nBV9k6puhdWuBRbyx1gdRcxDcKS9kqJ4ofEN92B3ymQ/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=CC", title: "code craze", description: "Unleash your coding prowess in this high-intensity hackathon.", link: "https://docs.google.com/forms/d/e/1FAIpQLSculCkJKPQp6PDi5ndc4YFgkTmi2D07FW-PFM12Lhs4xul85A/viewform?usp=dialog" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=IF", title: "quiz arena", description: "Transform your innovative concepts into viable prototypes.", link: "https://docs.google.com/forms/d/e/1FAIpQLSd5sMB0xBXFKvKJE71ULzYI8q4dezO5U8BEcjtnoszT7HaM3g/viewform?usp=publish-editor" },
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
  const [isMobile, setIsMobile] = useState(true); 

  useEffect(() => {
    // Detect mobile
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener("resize", checkDevice);

    const timer = setTimeout(() => setShowIntro(false), 2000); 
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden flex flex-col">
      
      {/* ---------------- BACKGROUND RENDERER ---------------- */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        {isMobile ? (
          <MobileFastLines /> 
        ) : (
          <div className="absolute inset-0">
            {/* Hyperspeed now pulls settings from the stable constant above */}
            <Hyperspeed effectOptions={hyperspeedOptions} />
          </div>
        )}
      </div>
      {/* --------------------------------------------------- */}

      <AnimatePresence>
        {showIntro && (
          <motion.div 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[999] bg-black flex items-center justify-center overflow-hidden"
          >
            <h1 className="text-5xl md:text-8xl font-syne font-bold text-white uppercase text-center">
              INTECHO'26
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <PassesSection />
      <SectionDivider />

      <CarouselSection id="tech-events" title="Technical Events" items={techEvents} showRegister={true} />
      <SectionDivider />
      <CarouselSection id="nontech-events" title="Non-Tech Events" items={nonTechEvents} showRegister={true} />
      <SectionDivider />
      <CarouselSection id="workshops" title="Workshops" items={workshops} showRegister={true} />
      
      <SectionDivider />
      <FoodSection />
      <SectionDivider />
      <SponsorsSection />
      <SectionDivider />
      <AboutMIT />
      <SectionDivider />
      <ContactSection />
      <ScrollToTop />

      <footer className="mt-auto py-8 bg-[#111] border-t border-white/10 text-center relative z-10 w-full">
        <p className="text-xs font-syne tracking-[0.2em] text-white/70 uppercase">
          Built with <span className="text-[#ff2d2d] font-bold">Kathirvel R</span>
        </p>
      </footer>
    </div>
  );
};

export default Index;
