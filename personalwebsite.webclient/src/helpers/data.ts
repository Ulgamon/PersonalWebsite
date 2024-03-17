export interface ResumeItem {
  duration: string;
  title: string;
  institution: string;
  description: string;
  link?: string;
}

export const resumeData: ResumeItem[] = [
  {
    duration: "Jan 2023 – Feb 2023",
    title: "JavaScript Algorithms and Data Structures",
    institution: "freeCodeCamp",
    description: "A course for learning JavaScript.",
    link: "https://www.freecodecamp.org/certification/Ulgamon/javascript-algorithms-and-data-structures",
  },
  {
    duration: "Jan 2023 – Nov 2023",
    title: "Responsive Web Design",
    institution: "freeCodeCamp",
    description: "A course for learning Responsive Web Design.",
    link: "https://www.freecodecamp.org/certification/Ulgamon/responsive-web-design",
  },
  {
    duration: "Dec 2022 – Dec 2023",
    title: "CS50x",
    institution: "Harvard",
    description: "A course for learning Computeer Science.",
    link: "https://certificates.cs50.io/b5ca7ada-0fd7-4fce-9b65-47af82a48413.pdf?size=letter",
  },
];
