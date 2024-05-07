'use client'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  imagePlugin,
  InsertThematicBreak,
  MDXEditor,
  type MDXEditorProps, toolbarPlugin, UndoRedo, BoldItalicUnderlineToggles, diffSourcePlugin, ListsToggle, InsertImage
} from '@mdxeditor/editor'
import {useState} from "react";
import '@mdxeditor/editor/style.css'

export interface EditorProps extends Partial<MDXEditorProps> {
  name: string
  required?: boolean
}


/**
 * Editor 컴포넌트
 * ref: https://mdxeditor.dev/editor/docs/getting-started
 * @param name
 * @param required
 * @param editorProps
 * @constructor
 */
function Editor({ name, required, ...editorProps}: EditorProps) {

  const [value, onChange] = useState<string>(editorProps.markdown || '')

  async function handler(image: File) {
    // TODO
    console.log("image", image)
    return 'https'
  }

  return (
    <div className="border border-solid border-gray-300 rounded-lg">
      <MDXEditor
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          diffSourcePlugin({ viewMode: 'rich-text'}),
          imagePlugin({
            imageUploadHandler: handler
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <InsertThematicBreak />
                <InsertImage />
              </>
            )
          })
        ]}
        contentEditableClassName="h-96"
        {...editorProps}
        markdown={value}
        onChange={onChange}
      />
      <textarea name={name} required={required} value={value} readOnly hidden  />
    </div>
  )
}

export default Editor
