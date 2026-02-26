import { Suspense, lazy } from "react";
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

const ParticlesBg = lazy(() => import("@/components/ParticlesBg"));

const techEvents = [
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=CC", title: "Code Craze", description: "Unleash your coding prowess in this high-intensity hackathon." },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=PC", title: "Prompt Clash", description: "Master the art of AI prompting to generate the best results." },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=IF", title: "Idea Forge", description: "Transform your innovative concepts into viable prototypes." },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=TG", title: "Techguess", description: "Test your technical vocabulary in this fast-paced guessing game." },
];

const nonTechEvents = [
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=US", title: "Uno Showdown", description: "Battle it out in this classic card game." },
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=TT", title: "Twin Tactics", description: "Sync up and win in dual challenges." },
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=QZ", title: "Quizzard", description: "Test your knowledge in this rapid-fire quiz." },
  { image: "https://placehold.co/100/1a1a2e/6a5acd?text=TH", title: "Techhunt", description: "Solve clues and hunt for the treasure." },
];

const workshops = [
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=S", title: "Siemens", description: "Industrial automation and control workshop." },
  { image: "https://placehold.co/100/1a1a2e/ff2d2d?text=Y", title: "Yokogawa", description: "Advanced instrumentation and DCS systems." },
];

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
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
    </div>
  );
};

export default Index;
