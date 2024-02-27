import MdxComponent from "@/components/mdxcomponent/MdxComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

function UpdateBlogPost() {
  const [markdown, setMarkdown] = useState<string>("");
  return (
    <main className="bg-gray-200 min-h-screen">
      <MdxComponent setParentValue={setMarkdown} defaultValue={markdown} />
      <div className="flex justify-end p-5">
        <Button variant="outline" className="m-1">
          Save
        </Button>
        <Dialog>
          <DialogTrigger>
            <Button className="m-1">Publish</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              Are you absolutely sure you want to publish?
            </DialogHeader>
            <DialogDescription>
              This will publish your blog post look at it again you might find
              another mistake.
            </DialogDescription>
            <DialogFooter className="flex justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button>Publish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

export default UpdateBlogPost;
