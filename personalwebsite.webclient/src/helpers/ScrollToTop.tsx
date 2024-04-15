import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

interface IScrollToTop {
  children: JSX.Element | JSX.Element[] | string;
}
const ScrollToTop = ({ children }: IScrollToTop) => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash.length > 0) {
      console.log(hash);
      scroller.scrollTo(hash, {
        smooth: true,
        spy: true,
        offset: -90,
        duration: 400,
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;
