import { SpringValue, useSpring } from "@react-spring/web";

interface IuseImageScale {
  scale: SpringValue<number>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

const useImageScale = (wantedScale: number = 1.2): IuseImageScale => {
  const [{ scale }, api] = useSpring(() => ({
    scale: 1,
  }));

  const handleMouseEnter = () => {
    api.start({
      scale: wantedScale,
    });
  };

  const handleMouseLeave = () => {
    api.start({
      scale: 1,
    });
  };

  return { scale, handleMouseEnter, handleMouseLeave };
};

export default useImageScale;
