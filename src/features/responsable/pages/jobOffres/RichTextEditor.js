import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Heading from '@tiptap/extension-heading'
import Blockquote from '@tiptap/extension-blockquote'
import Underline from '@tiptap/extension-underline'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="tiptap-toolbar mb-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'active' : ''}
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'active' : ''}
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'active' : ''}
      >
        <u>U</u>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading') ? 'active' : ''}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'active' : ''}
      >
        ❝
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        style={{ color: '#958DF1' }}
      >
        A
      </button>

      <input
  type="color"
  onChange={e => editor.chain().focus().setColor(e.target.value).run()}
  value={editor.getAttributes('textStyle').color || '#000000'}
/>

<button
  type="button"
  onClick={() => editor.chain().focus().toggleHighlight().run()}
  style={{ backgroundColor: '#FAF594' }}
>
  🌞
</button>
    </div>
  )
}

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Heading.configure({
        levels: [2],
      }),
      Blockquote,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="border rounded p-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="tiptap-content" />
    </div>
  )
}

export default RichTextEditor