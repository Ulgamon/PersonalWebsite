import MdxComponent from "@/components/mdxcomponent/MdxComponent";
import { useState } from "react";

function UpdateBlogPost() {
  const [markdown, setMarkdown] = useState<string>("");
  return (
    <main className="bg-gray-200 min-h-screen">
      <MdxComponent setParentValue={setMarkdown} defaultValue={markdown} />
    </main>
  );
}

export default UpdateBlogPost;
