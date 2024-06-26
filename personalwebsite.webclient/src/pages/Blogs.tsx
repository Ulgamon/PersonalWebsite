import AppOutlet from "@/components/app-outlet/AppOutlet.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { useTheme } from "@/context/theme-provider.tsx";
import light from "../assets/lightbg.webp";
import dark from "../assets/darkbg.webp";
import ShowBlogs from "@/components/blogs/ShowBlogs.tsx";
import { useTransition, animated } from "@react-spring/web";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { theme } = useTheme();
  const transition = useTransition(theme === "dark" ? dark : light, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    exitBeforeEnter: true,
  });
  return (
    <AppOutlet>
      <div className="w-full mx-auto relative -top-16 z-0">
        {transition((style, show) => (
          <animated.div
            style={{
              backgroundImage: `url("${show}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              ...style,
            }}
            className="w-full flex bg-center justify-center transition will-change-transform items-end mx-auto h-screen object-cover text-black text-4xl m-0 dark:text-white"
          >
            <div className="w-fit mx-auto mb-24">
              <h1 className="font-bold text-3xl md:text-6xl">Blog Posts</h1>
              <Breadcrumb className="text-xl font-semibold mx-1 my-2">
                <BreadcrumbList>
                  <BreadcrumbItem className="text-lg">
                    <BreadcrumbLink className="text-lg">
                      <Link to="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-lg" />
                  <BreadcrumbItem className="text-lg">
                    <BreadcrumbLink>Blog</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </animated.div>
        ))}
        <div className="max-w-[1200px] mx-auto min-h-screen">
          <ShowBlogs />
        </div>
      </div>
    </AppOutlet>
  );
};

export default Blogs;
