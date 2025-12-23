'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Image from '@tiptap/extension-image';
import ResizeImage from 'tiptap-extension-resize-image';
import underLine from '@tiptap/extension-underline';
import fontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import { Color } from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';

// Custom Extension Imports
import { FontSizeExtension } from '@/extensions/font-size';
import { LineHeightExtension } from '@/extensions/line-height';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap';

import { useEditorStore } from '@/store/use-editor-store';
import { Ruler } from './Ruler';

const Editor = () => {
	const liveblocks = useLiveblocksExtension();
	const { setEditor } = useEditorStore();

	const editor = useEditor({
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class:
					'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
				style: 'padding-left: 56px; padding-right: 56px;',
			},
		},
		extensions: [
			liveblocks,
			StarterKit,
			FontSizeExtension,
			LineHeightExtension,
			TaskList,
			TaskItem.configure({ nested: true }),
			Table,
			TableRow,
			TableHeader,
			TableCell,
			Image,
			ResizeImage,
			underLine,
			fontFamily,
			TextStyle,
			TextAlign.configure({
				types: ['heading', 'paragraph', 'tableCell'],
			}),
			Highlight.configure({ multicolor: true }),
			Color,
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: 'https',
			}),
		],
		onCreate: ({ editor }) => {
			setEditor(editor);
		},
		onDestroy: () => {
			setEditor(null);
		},
		onUpdate: ({ editor }) => {
			setEditor(editor);
		},
		onSelectionUpdate: ({ editor }) => {
			setEditor(editor);
		},
		onTransaction: ({ editor }) => {
			setEditor(editor);
		},
		onFocus: ({ editor }) => {
			setEditor(editor);
		},
		onBlur: ({ editor }) => {
			setEditor(editor);
		},
		onContentError: ({ editor }) => {
			setEditor(editor);
		},
		content: '',
	});
	return (
		<div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
			<Ruler />
			<div className='min-w-max flex justify-center w-204 py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};

export default Editor;
