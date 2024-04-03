import imgUri from "../../assets/tempimg.png";
import cv from "../../assets/CV.pdf";
import { Button } from "../ui/button";
import { Element } from "react-scroll";

const AboutSection = () => {
  return (
    <Element name="about">
      <section
        id="about"
        className="min-h-screen max-w-screen-customMaxWidth w-full pt-10"
      >
        <div className="flex w-full mx-auto content-center justify-center">
          <img
            className="max-h-[600px] hidden md:block m-5"
            src={imgUri}
            alt="picture of me"
          />
          <div className="m-5">
            <h3 className="text-3xl sm:text-5xl my-4 font-bold">About Me</h3>
            <p className="max-w-[500px] my-4 text-lg">
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia.
            </p>
            <Button>
              <a href={cv} download>
                Download CV
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default AboutSection;
