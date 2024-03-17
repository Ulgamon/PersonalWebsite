// Need a track isScrolling down which can be determined with currentScroll - prevScroll > 0
// event listener in useEffectHook which fires every time user scrolls
// need to know if element is visible of if became visible

import { useState, useEffect, useRef } from "react";

const useAnimateOnScrollDown = () => {
  const [elementIsVisible, setElementIsVisible] = useState<boolean>(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [animateReset, setAnimateReset] = useState(true);
  const ref = useRef();
  const scrollRef = useRef(0);
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      const entry = entries[0];
      setElementIsVisible(entry.isIntersecting);
      if (scrollRef.current < ref.current?.offsetTop && !entry.isIntersecting) {
        setAnimateReset(true);
      }
    });

    observer.observe(ref.current);

    const scrollListener = window.addEventListener("scroll", () => {
      if (scrollRef.current < window.scrollY) {
        setIsScrollingDown(true);
      } else if (scrollRef.current > window.scrollY) {
        setIsScrollingDown(false);
      }
      scrollRef.current = window.scrollY;
    });

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [ref, scrollRef]);

  const shouldAnimate = elementIsVisible && isScrollingDown && animateReset;
  if (shouldAnimate) setAnimateReset(false);

  return { shouldAnimate, ref, animateReset };
};

export default useAnimateOnScrollDown;
