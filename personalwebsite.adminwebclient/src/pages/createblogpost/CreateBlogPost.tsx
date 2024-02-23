import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  linkDialogPlugin,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
  linkPlugin,
  sandpackPlugin,
} from "@mdxeditor/editor";

function CreateBlogPost() {
  return (
    <main className="bg-gray-200 min-h-screen">
      <MDXEditor
        className="bg-gray-50 text-black"
        markdown={"# Hello World"}
        plugins={[
          headingsPlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          quotePlugin(),
          listsPlugin(),
          diffSourcePlugin(),
          sandpackPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                {" "}
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <BlockTypeSelect />
                  <CodeToggle />
                  <CreateLink />
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
        ]}
      />
    </main>
  );
}

export default CreateBlogPost;
