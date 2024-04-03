import { Button } from "../ui/button";
import heroImage from "../../assets/tempimg.png";
import { useSpring, animated } from "@react-spring/web";
import { Element, Link } from "react-scroll";

const HeroSection = () => {
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
        className="min-h-screen max-w-screen-customMaxWidth mx-auto relative w-full overflow-hidden"
      >
        <animated.div
          style={textProps}
          className="absolute z-10 top-1/4 start-[10%]"
        >
          <h5 className="dark:text-themeBlue rounded-xl text-themeOrange font-semibold text-xl">
            HELLO!
          </h5>
          <h1 className="text-3xl md:text-6xl my-3 font-bold">
            I'm Justin Ilić <br />
            <span className="dark:text-themeBlue rounded-xl text-themeOrange">
              A Fullstack Developer
            </span>
          </h1>
          <Button className="mt-3" variant="default">
            <Link
              to="projects"
              smooth={true}
              spy={true}
              offset={-90}
              duration={400}
            >
              See My Work
            </Link>
          </Button>
        </animated.div>
        <animated.div
          style={imageProps}
          className="absolute z-0 end-[10%] bottom-0"
        >
          <img alt="image of me" src={heroImage} />
        </animated.div>
      </section>
    </Element>
  );
};

export default HeroSection;
