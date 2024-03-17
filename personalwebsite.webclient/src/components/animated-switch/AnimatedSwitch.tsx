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
  const { setTheme, theme } = useTheme();
  const springApi = useSpringRef();
  const transitionApi = useSpringRef();
  let booleanTheme: boolean = theme === "dark" ? false : true;

  const [props, api] = useSpring(
    () => ({
      ref: springApi,
      x: booleanTheme ? 0 : 40,
    }),
    [booleanTheme]
  );
  const transitions = useTransition(
    theme === "light" ? (
      <IoSunny className="h-5" />
    ) : (
      <IoMoon className="h-5" />
    ),
    {
      ref: transitionApi,
      from: { scale: 0 },
      enter: { scale: 1.0 },
      leave: { scale: 0 },
      exitBeforeEnter: true,
    },
  );

  useChain([transitionApi, springApi], [0, 1], 250);

  const clickHandler = () => {
    if (theme === "dark") {
      setTheme("light");
      booleanTheme = true;
    } else {
      setTheme("dark");
      booleanTheme = false;
    }
  };

  return (
    <button
      className={
        "w-20 h-9 block dark:bg-blue-300 rounded-xl bg-orange-200 " + className
      }
      onClick={clickHandler}
    >
      <animated.div style={props} className="h-6 w-min rounded-md mx-2">
        <div className="bg-white dark:bg-slate-900 shadow-lg m-0 p-0.5 px-1 rounded-md">
          {transitions((style, item) => (
            <animated.div style={style}>{item}</animated.div>
          ))}
        </div>
      </animated.div>
    </button>
  );
};

export default AnimatedSwitch;
