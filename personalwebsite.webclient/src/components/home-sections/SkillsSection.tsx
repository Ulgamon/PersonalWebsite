import { Element } from "react-scroll";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  IoLogoLinkedin,
  IoMail,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import {
  SiDotnet,
  SiCsharp,
  SiJavascript,
  SiReact,
  SiAmazonaws,
  SiHtml5,
  SiCss3,
  SiMicrosoftsqlserver,
  SiTypescript,
  SiMongodb,
  SiDocker,
  SiNodedotjs,
} from "react-icons/si";

const SkillsSection = () => {
  return (
    <Element name="skills">
      <section id="skills" className="">
        <h3 className="text-5xl font-bold text-center mb-10">Skills</h3>
        <ul className="grid grid-cols-2 gap-2 lg:gap-5 max-w-[500px] md:grid-cols-4 md:max-w-[900px] mx-auto sm:px-16 mb-20">
          <SkillsCard className="text-purple-800" text="ASP.NET">
            <SiDotnet />
          </SkillsCard>
          <SkillsCard className="text-indigo-600" text="C#">
            <SiCsharp />
          </SkillsCard>
          <SkillsCard className="text-blue-500" text="TypeScript">
            <SiTypescript />
          </SkillsCard>
          <SkillsCard className="text-sky-400" text="React">
            <SiReact />
          </SkillsCard>
          <SkillsCard className="text-neutral-400" text="MS SQL Server">
            <SiMicrosoftsqlserver />
          </SkillsCard>
          <SkillsCard text="Amazon Web Services">
            <SiAmazonaws />
          </SkillsCard>
          <SkillsCard className="text-yellow-400" text="JavaScript">
            <SiJavascript />
          </SkillsCard>
          <SkillsCard className="text-green-500" text="MongoDB">
            <SiMongodb />
          </SkillsCard>
          <SkillsCard className="text-red-600" text="HTML5">
            <SiHtml5 />
          </SkillsCard>
          <SkillsCard className="text-sky-600" text="CSS3">
            <SiCss3 />
          </SkillsCard>
          <SkillsCard className="text-green-700" text="Node.js">
            <SiNodedotjs />
          </SkillsCard>
          <SkillsCard className="text-sky-600" text="Docker">
            <SiDocker />
          </SkillsCard>
        </ul>
      </section>
    </Element>
  );
};

export default SkillsSection;

interface ISkillsCardProps {
  text: string;
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
}

const SkillsCard = ({ className, text, children }: ISkillsCardProps) => {
  return (
    <li className="mx-auto w-full">
      <Card className={"px-0 " + className}>
        <CardContent>
          <div className="text-7xl flex justify-center mt-7">{children}</div>
          <Button variant="link" className="px-0 flex mx-auto">
            {text}
          </Button>
        </CardContent>
      </Card>
    </li>
  );
};
