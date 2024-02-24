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
  markdownShortcutPlugin,
  imagePlugin,
  InsertImage,
  tablePlugin,
  InsertTable,
  codeBlockPlugin,
  ListsToggle,
  frontmatterPlugin,
  InsertFrontmatter,
  InsertSandpack,
  SandpackConfig,
  codeMirrorPlugin,
  ConditionalContents,
  InsertCodeBlock,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
} from "@mdxeditor/editor";

function CreateBlogPost() {
  const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();
  const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: "react-ts",

    presets: [
      {
        label: "React",
        name: "react-ts",
        meta: "live react",
        sandpackTemplate: "react-ts",
        sandpackTheme: "light",
        snippetFileName: "/App.tsx",
        snippetLanguage: "tsx",
        initialSnippetContent: defaultSnippetContent,
      },
    ],
  };
  return (
    <main className="bg-gray-200 min-h-screen">
      <div className="w-full bg-gray-50 py-7">
        <MDXEditor
          className=" px-5 dark-theme rounded-none dark-editor"
          contentEditableClassName="prose"
          markdown={`# hELLO`}
          plugins={[
            codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
            sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
            codeMirrorPlugin({
              codeBlockLanguages: { js: "JavaScript", css: "CSS", typescript: "TypeScript" },
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
                          when: (editor) => editor?.editorType === "sandpack",
                          contents: () => <ShowSandpackInfo />,
                        },
                        {
                          fallback: () => (
                            <>
                              <InsertCodeBlock />
                              <InsertSandpack />
                            </>
                          ),
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
    </main>
  );
}

export default CreateBlogPost;
