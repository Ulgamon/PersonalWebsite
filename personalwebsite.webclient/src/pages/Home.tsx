import AppOutlet from "@/components/app-outlet/AppOutlet.tsx";
import AboutSection from "@/components/home-sections/AboutSection.tsx";
import BlogsSection from "@/components/home-sections/BlogsSection.tsx";
import ContactSection from "@/components/home-sections/ContactSection.tsx";
import HeroSection from "@/components/home-sections/HeroSection.tsx";
import ProjectsSection from "@/components/home-sections/ProjectsSection.tsx";
import ResumeSection from "@/components/home-sections/ResumeSection.tsx";
import SkillsSection from "@/components/home-sections/SkillsSection.tsx";

const Home = () => {
  return (
    <AppOutlet>
      <HeroSection />
      <AboutSection />
      <ResumeSection />
      <SkillsSection />
      <ProjectsSection />
      <BlogsSection />
      <ContactSection />
    </AppOutlet>
  );
};

export default Home;
