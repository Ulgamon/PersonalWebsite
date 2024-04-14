import imgUri from "../../assets/final.webp";
import cv from "../../assets/CV.pdf";
import { Button } from "../ui/button.tsx";
import { Element } from "react-scroll";

const AboutSection = () => {
  return (
    <Element name="about">
      <section
        id="about"
        className="min-h-screen max-w-screen-customMaxWidth mx-auto w-full pt-10"
      >
        <div className="flex w-full mx-auto content-center justify-center">
          <img
            className="max-w-[400px] hidden lg:block m-5"
            src={imgUri}
            alt="picture of me"
          />
          <div className="m-5">
            <h3 className="text-3xl sm:text-5xl my-4 font-bold">About Me</h3>
            <p className="max-w-[500px] my-4">
              Welcome to my personal website! I'm Justin Ilić, a full stack
              developer based in Serbia. I have a deep love for playing guitar,
              basketball, programming, and calisthenics.
            </p>
            <p className="max-w-[500px] my-4">
              I believe in the power of continuous learning and innovation, and
              I'm passionate about creating impactful solutions that make a
              difference. Whether I'm crafting code, strumming chords on my
              guitar, shooting hoops on the basketball court, or challenging
              myself with calisthenics routines, I'm always seeking to improve
              and grow.
            </p>
            <p className="max-w-[500px] my-4">
              Through my work as a full stack developer, I aim to build
              user-friendly applications that enhance people's lives and
              experiences. When I'm not immersed in coding, you can find me
              exploring new places or enjoying quality time with friends and
              family.
            </p>
            <p className="max-w-[500px] my-4">
              Let's connect and explore the world together!
            </p>
            <a href={cv} download>
              <Button>Download CV</Button>
            </a>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default AboutSection;
