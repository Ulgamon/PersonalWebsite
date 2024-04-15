import { Button } from "../ui/button.tsx";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { Element, Link } from "react-scroll";
import { useTheme } from "@/context/theme-provider.tsx";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import csharp from "react-syntax-highlighter/dist/esm/languages/prism/csharp";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("charp", csharp);

const ReactCode = `import { useState, useEffect, useRef } from "react";
const useShowNavbar = () => {
  const [shouldShow, setShouldShow] = useState<boolean>(false);
  const scrollRef: React.MutableRefObject<number> = useRef<number>(0);

  useEffect(() => {
    const scrollListener = () => {
      setShouldShow(window.scrollY > 500 ? true : false);
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  });
  return shouldShow;
};

export default useShowNavbar;`;

const CSharpCode = `namespace PersonalWebsite.API.Data;

public partial class BlogPost
{
    public int Id { get; set; }
    public string ImgUrl { get; set; } = null!;
    public string BlogMdText { get; set; } = null!;
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public DateTime PublishedDate { get; set; }
    public bool Published { get; set; }
    public string Title { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public ApplicationUser User { get; set; } = null!;
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public ICollection<Category> Categories { get; set; } = new List<Category>();
}`;

const HeroSection = () => {
  const { theme } = useTheme();
  const transition = useTransition(theme, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    exitBeforeEnter: true,
  });
  const textProps = useSpring({
    from: {
      y: 100,
      opacity: 1,
    },
    to: {
      y: 0,
      opacity: 1,
    },
    config: {
      mass: 5,
      friction: 45,
    },
  });

  const imageProps = useSpring({
    from: {
      y: 100,
      opacity: 0,
    },
    to: {
      y: 0,
      opacity: 1,
    },
    config: {
      mass: 5,
      friction: 45,
    },
  });
  return (
    <Element name="home">
      <section
        id="home"
        className="h-[calc(100vh-4rem)] max-w-screen-customMaxWidth flex justify-center items-center mx-auto relative w-full overflow-hidden"
      >
        <animated.div style={textProps} className="px-5 lg:px-0">
          <h1 className="dark:text-themeBlue rounded-xl text-themeOrange text-xl md:text-2xl">
            Hello!
          </h1>
          <h2 className="text-4xl md:text-6xl my-3 font-bold">
            I'm Justin Ilić <br />
            <span className="dark:text-themeBlue rounded-xl text-themeOrange">
              A Fullstack Developer
            </span>
          </h2>
          <Link
            to="projects"
            smooth={true}
            spy={true}
            offset={-90}
            duration={400}
          >
            <Button className="mt-3" variant="default">
              See My Work
            </Button>
          </Link>
        </animated.div>

        <animated.div
          style={imageProps}
          className="lg:block hidden w-[600px] ms-5"
        >
          {transition((style, show) => (
            <animated.div style={style}>
              <SyntaxHighlighter
                PreTag="div"
                showLineNumbers={true}
                wrapLines={true}
                children={show === "dark" ? CSharpCode : ReactCode}
                language={show === "dark" ? "csharp" : "tsx"}
                className="rounded-xl text-xs"
                style={coldarkDark}
              />
            </animated.div>
          ))}
        </animated.div>
      </section>
    </Element>
  );
};

export default HeroSection;
