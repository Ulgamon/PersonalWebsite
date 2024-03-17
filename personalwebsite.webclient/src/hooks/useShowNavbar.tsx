import { useState, useEffect, useRef } from "react";
const useShowNavbar = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const scrollRef = useRef(0);

  useEffect(() => {
    const scrollListener: EventListener = window.addEventListener(
      "scroll",
      () => {
        if (scrollRef.current < window.scrollY) {
          setShouldShow(false);
        } else if (scrollRef.current > window.scrollY) {
          setShouldShow(window.scrollY > 500 ? true : false);
        }
        scrollRef.current = window.scrollY;
      }
    );

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  });
  return shouldShow;
};

export default useShowNavbar;
