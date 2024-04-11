import { useState, useEffect, useRef } from "react";
const useShowNavbar = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const scrollRef = useRef(0);

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

export default useShowNavbar;
