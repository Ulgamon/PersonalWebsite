import { resumeData } from "../../helpers/data";
import ResumeCard from "./ResumeCard";

const ResumeList = () => {
  return (
    <ul className="grid gap-2 auto-cols-max md:grid-cols-2 place-items-stretch lg:grid-cols-3 md:mx-16">
      {resumeData.map((el) => (
        <li key={el.title}>
          <ResumeCard
            description={el.description}
            duration={el.duration}
            institution={el.institution}
            title={el.title}
            link={el.link}
          />
        </li>
      ))}
    </ul>
  );
};

export default ResumeList;
