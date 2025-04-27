import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="tiptap-toolbar mb-2 d-flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'btn btn-primary btn-sm' : 'btn btn-outline-primary btn-sm'}
      >
        <strong>B</strong>
      </button>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'btn btn-primary btn-sm' : 'btn btn-outline-primary btn-sm'}
      >
        <em>I</em>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'btn btn-primary btn-sm' : 'btn btn-outline-primary btn-sm'}
      >
        <u>U</u>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'btn btn-primary btn-sm' : 'btn btn-outline-primary btn-sm'}
      >
        H2
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'btn btn-primary btn-sm' : 'btn btn-outline-primary btn-sm'}
      >
        ❝
      </button>

      <input
        type="color"
        onChange={e => editor.chain().focus().setColor(e.target.value).run()}
        value={editor.getAttributes('textStyle').color || '#000000'}
        style={{ height: '30px', width: '40px', border: 'none', background: 'none' }}
      />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className="btn btn-warning btn-sm"
      >
        🌞
      </button>
    </div>
  );
};

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Heading.configure({ levels: [2] }),
      Blockquote,
    ],
    content: value || '', // Valeur initiale
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // On renvoie l'HTML à chaque modification
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl p-2 min-h-[200px] border rounded',
      },
    },
  });

  return (
    <div className="border rounded p-3 bg-light">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
