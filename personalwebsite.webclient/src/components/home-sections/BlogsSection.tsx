import { Element } from "react-scroll";
const BlogsSection = () => {
  return (
    <Element name="blogs">
      <section id="blogs" className="min-h-screen">
        <h3 className="text-5xl font-bold text-center">My Blogs</h3>
        <p className="text-center text-lg my-5">Most recent blog posts.</p>
      </section>
    </Element>
  );
};

export default BlogsSection;
