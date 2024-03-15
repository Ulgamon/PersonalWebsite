import AppOutlet from "@/components/app-outlet/AppOutlet";
import AboutSection from "@/components/home-sections/AboutSection";
import ContactSection from "@/components/home-sections/ContactSection";
import HeroSection from "@/components/home-sections/HeroSection";
import ResumeSection from "@/components/home-sections/ResumeSection";
import ServicesSection from "@/components/home-sections/ServicesSection";
import SkillsSection from "@/components/home-sections/SkillsSection";

const Home = () => {
  return (
    <AppOutlet>
      <HeroSection />
      <AboutSection />
      <ResumeSection />
      <ServicesSection />
      <SkillsSection />
      <ContactSection />
    </AppOutlet>
  );
};

export default Home;
