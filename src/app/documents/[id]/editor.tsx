'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { TableKit } from '@tiptap/extension-table';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import { FontFamily, TextStyle } from '@tiptap/extension-text-style';

import { useEditorStore } from '@/app/store/use-editor-store';

const Editor = () => {
	const { setEditor } = useEditorStore();
	const editor = useEditor({
		onCreate({ editor }) {
			setEditor(editor);
		},
		onDestroy() {
			setEditor(null);
		},
		onUpdate({ editor }) {
			setEditor(editor);
		},
		onSelectionUpdate({ editor }) {
			setEditor(editor);
		},
		onTransaction({ editor }) {
			setEditor(editor);
		},
		onFocus({ editor }) {
			setEditor(editor);
		},
		onBlur({ editor }) {
			setEditor(editor);
		},
		onContentError({ editor }) {
			setEditor(editor);
		},
		editorProps: {
			attributes: {
				class:
					'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
				style: 'padding-left: 56px; padding-right: 56px;',
			},
		},
		extensions: [
			StarterKit,
			TaskList,
			ImageResize,
			Image,
			FontFamily,
			TextStyle,
			TaskItem.configure({
				nested: true,
			}),
			TableKit.configure({
				table: { resizable: true },
			}),
		],
		content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
		// Don't render immediately on the server to avoid SSR issues
		immediatelyRender: false,
	});

	return (
		<div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 pirnt:p-0 print::bg-white print:overflow-visible">
			<div className="min-w-max flex justify-center w-204 py-4 mx-auto print:w-full print:min-w-0">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};

export default Editor;
