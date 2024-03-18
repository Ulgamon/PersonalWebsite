import { resumeData } from "../../helpers/data";
import ResumeCard from "./ResumeCard";

const ResumeList = () => {
  return (
    <ul
      style={{ gridAutoRows: "1fr" }}
      className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 md:mx-16"
    >
      {resumeData.map((el) => (
        <li className="place-items-stretch" key={el.title}>
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
