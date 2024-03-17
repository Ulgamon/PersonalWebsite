import AppOutlet from "@/components/app-outlet/AppOutlet";
import AboutSection from "@/components/home-sections/AboutSection";
import BlogsSection from "@/components/home-sections/BlogsSection";
import ContactSection from "@/components/home-sections/ContactSection";
import HeroSection from "@/components/home-sections/HeroSection";
import ProjectsSection from "@/components/home-sections/ProjectsSection";
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
      <ProjectsSection />
      <BlogsSection />
      <ContactSection />
    </AppOutlet>
  );
};

export default Home;
