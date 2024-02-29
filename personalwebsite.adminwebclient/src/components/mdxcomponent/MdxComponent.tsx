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
import { useContext, useState } from "react";
import { Client, FileParameter, IClient } from "@/helpers/clients";
import { apiUrl } from "@/helpers/constants";
import { AuthContext } from "@/contexts/AuthContext/AuthContext";
import { useToast } from "../ui/use-toast";

interface IMdxComponentProps {
  defaultValue: string;
  setParentValue: (value: string) => void;
}

function MdxComponent({ defaultValue, setParentValue }: IMdxComponentProps) {
  const [value, setValue] = useState<string>(defaultValue);
  const { getCookie } = useContext(AuthContext);
  const { toast } = useToast();

  function changeHandler(markdown: string) {
    setValue(markdown);
    setParentValue(markdown);
  }

  async function imageUploadHandler(image: File): Promise<string | null> {
    // const formData = new FormData();
    const fileData: FileParameter = {
      data: image,
      fileName: image.name,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const client: IClient = new Client(apiUrl, {
      async fetch(url: RequestInfo, init: RequestInit) {
        const accessToken = getCookie();
        init.headers["Authorization"] = `Bearer ${accessToken}`;

        return fetch(url, init);
      },
    });
    try {
      const response = await client.image(fileData);
      toast({
        title: "Image upload successful",
        description: `You uploaded image: ${response.fileUrl} successfully.`,
      });
      if (response.fileUrl === undefined) return null;
      return new Promise<string | null>((resolve) => {
        resolve(response.fileUrl || null);
      });
    } catch (e: unknown) {
      let error: string = "";
      if (typeof e === "string") {
        error = e;
      } else if (e instanceof Error) {
        error = e.message;
      }
      toast({
        variant: "destructive",
        title: "Couldn't upload image!",
        description: error,
      });
      return null;
    }
  }

  return (
    <div className="w-full bg-gray-50 py-7">
      <MDXEditor
        onChange={changeHandler}
        className=" px-5 dark-theme rounded-none flex flex-col dark-editor"
        contentEditableClassName="prose"
        markdown={value}
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
          imagePlugin({ imageUploadHandler }),
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
