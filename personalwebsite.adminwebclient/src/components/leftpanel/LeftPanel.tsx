import CustomNavLink, {
  LinkMethod,
} from "@/components/customnavlink/CustomNavLink";
import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";

function LeftPanel() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem className="px-3" value="item-1">
        <AccordionTrigger>Blog Posts</AccordionTrigger>
        <AccordionContent>
          <ul>
            <CustomNavLink to="/blogposts" type={LinkMethod.GET}>
              Blog Posts
            </CustomNavLink>
            <CustomNavLink to="/createblogpost" type={LinkMethod.POST}>
              Blog Post
            </CustomNavLink>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="px-3" value="item-2">
        <AccordionTrigger>Comments</AccordionTrigger>
        <AccordionContent>
          <ul>
            <CustomNavLink to="/comments" type={LinkMethod.GET}>
              Comments
            </CustomNavLink>
            <CustomNavLink to="/createcomment" type={LinkMethod.POST}>
              Comment
            </CustomNavLink>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="px-3" value="item-3">
        <AccordionTrigger>Categories</AccordionTrigger>
        <AccordionContent>
          <ul>
            <CustomNavLink to="/categories" type={LinkMethod.GET}>
              Categories
            </CustomNavLink>
            <CustomNavLink to="/createcategory" type={LinkMethod.POST}>
              Category
            </CustomNavLink>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default LeftPanel;
