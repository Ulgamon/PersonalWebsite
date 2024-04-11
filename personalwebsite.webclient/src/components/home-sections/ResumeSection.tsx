import ResumeList from "../resume/ResumeList.tsx";
import cv from "../../assets/CV.pdf";
import { Element } from "react-scroll";
import { Button } from "../ui/button.tsx";

const ResumeSection = () => {
  return (
    <Element className="max-w-screen-customMaxWidth mx-auto" name="resume">
      <section id="resume" className="mx-auto w-full px-1">
        <h3 className="text-3xl sm:text-5xl w-fit my-4 font-bold mx-auto">
          Resume
        </h3>
        <p className="max-w-[600px] mx-auto mt-4 mb-10 px-4">
          Here are the links to my certificates, showcasing my qualifications
          and expertise. Feel free to explore and verify my credentials.
          Additionally, you can download my CV to get a comprehensive overview
          of my background, skills, and accomplishments. I'm confident that my
          experience aligns well with your needs, and I look forward to the
          opportunity to collaborate with you. Thank you for visiting my website
          and considering my qualifications.
        </p>
        <ResumeList />
        <a href={cv} download>
          <Button className="w-fit mx-auto block my-5">Download CV</Button>
        </a>
      </section>
    </Element>
  );
};

export default ResumeSection;
