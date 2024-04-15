import CS50 from "../assets/education/CS50.webp"
import freeCodeCamp from "../assets/education/freecodecamp.webp"

export interface ResumeItem {
  image: string;
  duration: string;
  title: string;
  institution: string;
  description: string;
  link?: string;
}

export const resumeData: ResumeItem[] = [
  {
    image: CS50,
    duration: "Dec 2023 – Apr 2024",
    title: "CS50 SQL",
    institution: "Harvard University",
    description: "A course for learning relational databases.",
    link: "https://certificates.cs50.io/eda33862-03ec-4d52-bdde-9a4686ba9fe1.pdf?size=letter",
  },
  {
    image: freeCodeCamp,
    duration: "Feb 2023 – March 2024",
    title: "Front End Development Libraries",
    institution: "freeCodeCamp",
    description: "A course for learning React, jQuery, SCSS, and Bootstrap.",
    link: "https://www.freecodecamp.org/certification/Ulgamon/front-end-development-libraries",
  },
  {
    image: CS50,
    duration: "Dec 2022 – Dec 2023",
    title: "CS50x",
    institution: "Harvard University",
    description: "A course for learning how to think algorithmically and solve problems efficiently.",
    link: "https://certificates.cs50.io/b5ca7ada-0fd7-4fce-9b65-47af82a48413.pdf?size=letter",
  },
  {
    image: freeCodeCamp,
    duration: "Jan 2023 – Nov 2023",
    title: "Responsive Web Design",
    institution: "freeCodeCamp",
    description: "A course for learning HTML5 and CSS3.",
    link: "https://www.freecodecamp.org/certification/Ulgamon/responsive-web-design",
  },
  {
    image: freeCodeCamp,
    duration: "Jan 2023 – Feb 2023",
    title: "JavaScript Algorithms and Data Structures",
    institution: "freeCodeCamp",
    description: "A course for learning JavaScript.",
    link: "https://www.freecodecamp.org/certification/Ulgamon/javascript-algorithms-and-data-structures",
  },
];
