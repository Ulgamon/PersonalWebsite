import AppOutlet from "@/components/app-outlet/AppOutlet";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTheme } from "@/context/theme-provider";
import light from "../assets/lightbg.jpg";
import dark from "../assets/darkbg.jpg";
import ShowBlogs from "@/components/blogs/ShowBlogs";

const Blogs = () => {
  const parallax = useRef<IParallax>(null!);
  const { theme } = useTheme();
  return (
    <AppOutlet>
      <div className="w-full mx-auto relative -top-16 z-0">
        {/* <Parallax
          ref={parallax}
          style={{ zIndex: 0 }}
          className="w-full z-0 top-0 left-0"
          pages={2}
        >
          <ParallaxLayer offset={0} speed={2.5}>
            <div className="w-full max-w-[1600px] mx-auto text-black text-4xl m-0 dark:text-white">
              <img
                src={background}
                alt="background min-h-screen w-full with some code on it"
              />
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={1} speed={1}>
            <p className="w-full text-black text-4xl m-0 dark:text-white">
              BLOGS PAGE that will have the most recent blog posts, pagination,
              search modal and more
            </p>
          </ParallaxLayer>
          <ParallaxLayer offset={2} speed={1}>
            <p className="w-full text-black text-4xl m-0 dark:text-white">
              BLOGS PAGE that will have the most recent blog posts, pagination,
              search modal and more
            </p>
          </ParallaxLayer>
        </Parallax> */}
        <div
          style={{
            backgroundImage: `url("${theme === "dark" ? dark : light}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="w-full flex justify-center transition will-change-transform items-end mx-auto h-screen object-cover text-black text-4xl m-0 dark:text-white"
        >
          {/* <img
            className="w-full h-screen object-cover"
            src={background}
            alt="background h-screen w-full with some code on it"
          /> */}
          <div className="w-fit mx-auto mb-24">
            <h1 className="font-bold text-7xl">Blog Posts</h1>
            <Breadcrumb className="text-xl font-semibold mx-1 my-2">
              <BreadcrumbList>
                <BreadcrumbItem className="text-lg">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-lg" />
                <BreadcrumbItem className="text-lg">
                  <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <div className="max-w-[1400px] min-h-screen">
          <ShowBlogs />
        </div>
      </div>
    </AppOutlet>
  );
};

export default Blogs;
