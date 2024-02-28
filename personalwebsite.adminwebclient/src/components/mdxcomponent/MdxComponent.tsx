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
  markdownShortcutPlugin,
  imagePlugin,
  InsertImage,
  tablePlugin,
  InsertTable,
  codeBlockPlugin,
  ListsToggle,
  frontmatterPlugin,
  InsertFrontmatter,
  codeMirrorPlugin,
  ConditionalContents,
  InsertCodeBlock,
  ChangeCodeMirrorLanguage,
} from "@mdxeditor/editor";

interface IMdxComponentProps {
  defaultValue: string;
  setParentValue: (value: string) => void;
}

function MdxComponent({ defaultValue, setParentValue }: IMdxComponentProps) {

  function changeHandler(markdown: string) {
    setParentValue(markdown);
  }
  return (
    <div className="w-full bg-gray-50 py-7">
      <MDXEditor
        onChange={changeHandler}
        className=" px-5 dark-theme rounded-none flex flex-col dark-editor"
        contentEditableClassName="prose"
        markdown={defaultValue}
        plugins={[
          codeBlockPlugin({ defaultCodeBlockLanguage: "tsx" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              css: "CSS",
              ts: "TypeScript",
              tsx: "TypeScript (React)",
              csharp: "CSharp",
              sql: "SQL",
              golang: "GOLANG",
            },
          }),
          headingsPlugin(),
          markdownShortcutPlugin(),
          frontmatterPlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          quotePlugin(),
          listsPlugin(),
          diffSourcePlugin({ viewMode: "rich-text" }),
          imagePlugin(),
          tablePlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper>
                  <InsertFrontmatter />
                  <BoldItalicUnderlineToggles />
                  <BlockTypeSelect />
                  <CodeToggle />
                  <CreateLink />
                  <InsertImage />
                  <InsertTable />
                  <ListsToggle />
                  <ConditionalContents
                    options={[
                      {
                        when: (editor) => editor?.editorType === "codeblock",
                        contents: () => <ChangeCodeMirrorLanguage />,
                      },

                      {
                        fallback: () => <InsertCodeBlock />,
                      },
                    ]}
                  />
                  <UndoRedo />
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}

export default MdxComponent;
