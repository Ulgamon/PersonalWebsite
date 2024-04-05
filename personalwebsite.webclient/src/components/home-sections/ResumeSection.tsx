import ResumeList from "../resume/ResumeList";
import cv from "../../assets/CV.pdf";
import { Element } from "react-scroll";
import { Button } from "../ui/button";

const ResumeSection = () => {
  return (
    <Element className="max-w-screen-customMaxWidth mx-auto" name="resume">
      <section id="resume" className="mx-auto w-full px-1">
        <h3 className="text-3xl sm:text-5xl w-fit my-4 font-bold mx-auto">Resume</h3>
        <p className="text-lg max-w-[600px] mx-auto mt-4 mb-10">
          A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country, in which
          roasted parts of sentences fly into your mouth.
        </p>
        <ResumeList />
        <Button className="w-fit mx-auto block my-5">
          <a href={cv} download>
            Download CV
          </a>
        </Button>
      </section>
    </Element>
  );
};

export default ResumeSection;
