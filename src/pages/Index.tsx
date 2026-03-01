import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PassesSection from "@/components/PassesSection";
import CarouselSection from "@/components/CarouselSection";
import SponsorsSection from "@/components/SponsorsSection";
import AboutMIT from "@/components/AboutMIT";
import ContactSection from "@/components/ContactSection";
import ScrollToTop from "@/components/ScrollToTop";
import SectionDivider from "@/components/SectionDivider";
import pmaLogo from "@/assets/PMA logo.png";
import siemensLogo from "@/assets/Siemens logo.png";
import treasureHuntLogo from "@/assets/Treasure hunt.png";
import unoShowdownLogo from "@/assets/UNO showdown.png";
import chessLogo from "@/assets/Chess.png";
import twinTacticsLogo from "@/assets/Twin tactics.png";
import quizzardLogo from "@/assets/Quizzard.png";

// @ts-ignore
import Hyperspeed from "@/components/Hyperspeed";
import RotatingText from "@/components/RotatingText";

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
    leftCars: [0xff2d2d, 0xa90519, 0xff102a], 
    rightCars: [0x6a5acd, 0x483d8b, 0x7b68ee], 
    sticks: 0xff2d2d 
  }
};

const MobileFastLines = () => (
  <div className="absolute inset-0 flex justify-center w-full h-full">
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-[2px] h-[30vh] bg-gradient-to-b from-transparent via-[#ff2d2d] to-transparent opacity-40"
        style={{ left: `${Math.random() * 100}%` }}
        animate={{ y: ["-30vh", "130vh"] }}
        transition={{ duration: Math.random() * 0.8 + 0.5, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
      />
    ))}
    {Array.from({ length: 10 }).map((_, i) => (
      <motion.div
        key={`purple-${i}`}
        className="absolute w-[1px] h-[20vh] bg-gradient-to-b from-transparent via-[#6a5acd] to-transparent opacity-30"
        style={{ left: `${Math.random() * 100}%` }}
        animate={{ y: ["-20vh", "120vh"] }}
        transition={{ duration: Math.random() * 1 + 0.7, repeat: Infinity, ease: "linear", delay: Math.random() * 1.5 }}
      />
    ))}
  </div>
);

const techEvents = [
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=PC", title: "prompt clash", description: "Command. Create. Conquer. Master the art of AI prompting.", link: "https://docs.google.com/forms/d/e/1FAIpQLScIrj3nBV9k6puhdWuBRbyx1gdRcxDcKS9kqJ4ofEN92B3ymQ/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=CC", title: "code craze", description: "Unleash your coding prowess in this high-intensity hackathon.", link: "https://docs.google.com/forms/d/e/1FAIpQLSculCkJKPQp6PDi5ndc4YFgkTmi2D07FW-PFM12Lhs4xul85A/viewform?usp=dialog" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=QA", title: "quiz arena", description: "Test your ultimate technical knowledge in this high-stakes battle of wits.", link: "https://docs.google.com/forms/d/e/1FAIpQLSd5sMB0xBXFKvKJE71ULzYI8q4dezO5U8BEcjtnoszT7HaM3g/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=TG", title: "tech guess", description: "Test your technical vocabulary in this fast-paced guessing game.", link: "https://docs.google.com/forms/d/e/1FAIpQLSe4S3gbcyQJWmXNTBIqmNSd6RqfHOqIeTXnixgm-m7qQFuI5w/viewform?usp=publish-editor" },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=PP", title: "paper presentation", description: "Present your technical papers and innovative ideas.", link: "https://docs.google.com/forms/d/e/1FAIpQLSeLvZlgJaPGHpSBrGimyO0Jn2OCdZ5TFlnylSzClNvkNVHePQ/viewform?usp=publish-editor" },
];

const nonTechEvents = [
  { 
    image: treasureHuntLogo, 
    title: "treasure hunt", 
    description: "Solve clues and hunt for the hidden treasure.", 
    link: "https://docs.google.com/forms/d/e/1FAIpQLSeqs7HR1taI9vrmAHWeOp_zQoHlslMVb6vaArDA-9dx465J5g/viewform?usp=publish-editor" 
  },
  { 
    image: unoShowdownLogo, 
    title: "uno showdown", 
    description: "Battle it out in this classic card game.", 
    link: "https://docs.google.com/forms/d/e/1FAIpQLSeV5mmCdF4Wu8yMbIjQNgk2f0dPI5W9yg8UfiAdTAcMrw6XbA/viewform?usp=dialog" 
  },
  { 
    image: chessLogo, 
    title: "chess", 
    description: "Master the 64 squares in this strategic battle of minds.", 
    link: "https://docs.google.com/forms/d/e/1FAIpQLScLYE1E8NL-0vxqAerutnmLjEUmOpKaHJq-Y-axViVPc8cylQ/viewform?usp=publish-editor" 
  },
  { 
    image: twinTacticsLogo, 
    title: "twin tactics", 
    description: "Sync up and win in dual challenges.", 
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfIGsidDolEdkbgOP7QZxcO34awK-5WJj_U7OrPLCjWFoIUCg/viewform?usp=publish-editor" 
  },
  { 
    image: quizzardLogo, 
    title: "quizzard", 
    description: "Test your knowledge in this rapid-fire quiz.", 
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfLL6YvswrJTjl9_AywrXEjBsxpH5q_HjJfl9ibdlzZogS_Ww/viewform?usp=publish-editor" 
  }
];
const workshops = [
  { 
    image: pmaLogo, 
    title: "PMA Workshop", 
    description: "A hands-on workshop on Berghof PLC programming and EtherCAT communication. Learn how PLCs establish real-time device networks and witness a live rotary furnace automation demo in CODESYS.", 
    link: "https://docs.google.com/forms/d/e/1FAIpQLSerjUJLcNpGaIiolj0lB3V8kRmYhYyx-tmWR7sNcfp7Xj8SGA/viewform?usp=publish-editor" 
  },
  { 
    image: siemensLogo, 
    title: "Siemens Workshop", 
    description: "A 3-hour hands-on workshop introducing Industry 4.0 concepts using Siemens PLC and MTAB Mechatronics stations. Experience real-time automation across a complete smart manufacturing process.", 
    link: "https://docs.google.com/forms/d/e/1FAIpQLSeRFgzYUXG_F2hztiRHPivb8wk-BbbRvBHO9YdjPgQn8FUKAw/viewform?usp=publish-editor" 
  },
];
const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener("resize", checkDevice);

    // FIX: 6000ms ensures exactly 1.5 seconds for all 4 words!
    const timer = setTimeout(() => setShowIntro(false), 6000); 
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent overflow-x-hidden flex flex-col">
      
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#050505]">
        {isMobile ? (
          <MobileFastLines /> 
        ) : (
          <div className="absolute inset-0">
            <Hyperspeed effectOptions={hyperspeedOptions} />
          </div>
        )}
      </div>

      <AnimatePresence>
        {showIntro && (
          <motion.div 
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[999] bg-black flex items-center justify-center overflow-hidden"
          >
            <RotatingText
              texts={["COMMAND.", "CREATE.", "CONQUER.", "INTECHO'26"]}
              /* THE FIX: text-[8vw] forces the font to perfectly fit the screen width on mobile! */
              mainClassName="text-[8vw] md:text-6xl font-inter font-medium tracking-wide text-white uppercase text-center flex justify-center w-full px-4 whitespace-nowrap"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.03} 
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 25, stiffness: 150 }} 
              
              rotationInterval={1500}
              animatePresenceMode="popLayout" 
            />
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
