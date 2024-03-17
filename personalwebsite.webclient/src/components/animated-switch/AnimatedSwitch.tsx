import { IoMoon, IoSunny } from "react-icons/io5";
import { useTheme } from "@/context/theme-provider";
import {
  useSpring,
  animated,
  useTransition,
  useSpringRef,
  useChain,
} from "@react-spring/web";
import { useState } from "react";

interface AnimatedSwitchProps {
  className: string;
}

const AnimatedSwitch = ({ className }: AnimatedSwitchProps) => {
  const [isInAnimation, setIsInAnimation] = useState<boolean>(false);
  const { setTheme, theme } = useTheme();
  const springApi = useSpringRef();
  const transitionApi = useSpringRef();

  const [props, __api] = useSpring(
    () => ({
      ref: springApi,
      x: theme === "light" ? 0 : 40,
    }),
    [theme]
  );
  const transitions = useTransition(theme, {
    ref: transitionApi,
    from: { scale: 0 },
    enter: { scale: 1.0 },
    leave: { scale: 0 },
    onChange: () => {
      setIsInAnimation(true);
    },
    onRest: () => {
      setIsInAnimation(false);
    },
    exitBeforeEnter: true,
  });

  useChain([transitionApi, springApi], [0, 1], 250);

  const clickHandler = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      disabled={isInAnimation}
      className={
        "w-20 h-9 block dark:bg-blue-300 rounded-xl disabled:cursor-pointer bg-orange-200 " +
        className
      }
      onClick={clickHandler}
    >
      <animated.div style={props} className="h-6 w-min rounded-md mx-2">
        <div className="bg-white dark:bg-slate-900 shadow-lg m-0 p-0.5 px-1 rounded-md">
          {transitions((style, item) => (
            <animated.div style={style}>
              {item === "light" ? (
                <IoSunny className="h-5" />
              ) : (
                <IoMoon className="h-5" />
              )}
            </animated.div>
          ))}
        </div>
      </animated.div>
    </button>
  );
};

export default AnimatedSwitch;
