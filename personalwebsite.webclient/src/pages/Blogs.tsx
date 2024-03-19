import AppOutlet from "@/components/app-outlet/AppOutlet";

const Blogs = () => {
  return (
    <AppOutlet>
      <p className="w-full min-h-screen text-black text-4xl dark:text-white">
        BLOGS PAGE that will have the most recent blog posts, pagination, search
        modal and more
      </p>
    </AppOutlet>
  );
};

export default Blogs;
