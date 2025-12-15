'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Editor = () => {
	const editor = useEditor({
		editorProps: {
			attributes: {
				class:
					'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
				style: 'padding-left: 56px; padding-right: 56px;',
			},
		},
		extensions: [StarterKit],
		content: '<p>Hello World! 🌎️</p>',
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
