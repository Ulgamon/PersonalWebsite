import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import heroImage from "../../assets/tempimg.png";
import { useSpring, animated } from "@react-spring/web";

const HeroSection = () => {
  const textProps = useSpring({
    from: {
      x: -200,
    },
    to: {
      x: 0,
    },
    config: {
      mass: 5,
      friction: 45,
    },
  });

  const imageProps = useSpring({
    from: {
      x: 200,
    },
    to: {
      x: 0,
    },
    config: {
      mass: 5,
      friction: 45,
    },
  });
  return (
    <section id="hero" className="min-h-screen relative w-full overflow-hidden">
      <animated.div
        style={textProps}
        className="absolute z-10 top-1/4 start-[10%]"
      >
        <h5 className="dark:text-blue-300 rounded-xl text-orange-300 font-semibold text-xl">
          HELLO!
        </h5>
        <h1 className="text-6xl my-3 font-bold">
          Hi I'm Justin Ilić <br />{" "}
          <span className="dark:text-blue-300 rounded-xl text-orange-300">
            A Fullstack Developer
          </span>
        </h1>
        <Button className="mt-3" variant="default">
          <Link to="#works">See My Works</Link>
        </Button>
      </animated.div>
      <animated.div style={imageProps} className="absolute z-0 end-[10%]">
        <img alt="image of me" src={heroImage} />
      </animated.div>
    </section>
  );
};

export default HeroSection;
