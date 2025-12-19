'use client';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, Heading, LucideIcon } from 'lucide-react';
import React from 'react';

import {
	Undo2Icon,
	Redo2Icon,
	PrinterIcon,
	SpellCheckIcon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	MessageSquarePlusIcon,
	ListTodoIcon,
	RemoveFormattingIcon,
} from 'lucide-react';
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { type Level } from '@tiptap/extension-heading';

interface ToolbarButtonProps {
	onClick?: () => void;
	isActive?: boolean;
	icon: LucideIcon;
	label?: string;
}

const ToolbarButton = ({ onClick, isActive, icon: Icon, label }: ToolbarButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
				isActive ? 'bg-neutral-200/80' : ''
			)}
		>
			<Icon className="size-4" />
		</button>
	);
};

const FontFamilyButton = () => {
	const { editor } = useEditorStore();

	const fonts = [
		{ label: 'Arial', value: 'Arial' },
		{ label: 'Times New Roman', value: 'Times New Roman' },
		{ label: 'Courier New', value: 'Courier New' },
		{ label: 'Georgia', value: 'Georgia' },
		{ label: 'Verdana', value: 'Verdana' },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={
						'h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
					}
				>
					<span className="truncate">
						{editor?.getAttributes('textStyle').fontFamily || 'Arial'}
					</span>
					<ChevronDownIcon className="ml-2 size-4 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{fonts.map(({ label, value: fontValue }) => (
					<button
						onClick={() => editor?.chain().focus().setFontFamily(fontValue).run()}
						key={fontValue}
						className={cn(
							// Added px-2 for horizontal space and w-full for full-width hover
							'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
							editor?.getAttributes('textStyle').fontFamily === fontValue && 'bg-neutral-200/80'
						)}
						style={{ fontFamily: fontValue }}
					>
						<span className="text-sm">{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const HeadingButton = () => {
	const { editor } = useEditorStore();

	const headings = [
		{ label: 'Normal', value: 0, fontSize: '16px' },
		{ label: 'Heading 1', value: 1, fontSize: '36px' },
		{ label: 'Heading 2', value: 2, fontSize: '28px' },
		{ label: 'Heading 3', value: 3, fontSize: '24px' },
		{ label: 'Heading 4', value: 4, fontSize: '20px' },
		{ label: 'Heading 5', value: 5, fontSize: '18px' },
		{ label: 'Heading 6', value: 6, fontSize: '16px' },
	];

	const getCurrentHeading = () => {
		for (let level = 1; level <= 6; level++) {
			if (editor?.isActive('heading', { level })) {
				return `Heading ${level}`;
			}
		}
		return 'Normal';
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={
						'h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
					}
				>
					<span className="truncate">{getCurrentHeading()}</span>
					<ChevronDownIcon className="ml-2 size-4 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{headings.map(({ label, value, fontSize }) => (
					<button
						key={value}
						style={{ fontSize }}
						className={cn(
							'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
							(value === 0 && !editor?.isActive('heading')) ||
								(editor?.isActive('heading', { level: value }) && 'bg-neutral-200/80')
						)}
						onClick={() => {
							if (value === 0) {
								editor?.chain().focus().setParagraph().run();
							} else {
								editor
									?.chain()
									.focus()
									.toggleHeading({ level: value as Level })
									.run();
							}
						}}
					>
						{label}
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const Toolbar = () => {
	const { editor } = useEditorStore();
	const sections: {
		label: string;
		icon: LucideIcon;
		onClick: () => void;
		isActive?: boolean;
	}[][] = [
		[
			{
				label: 'Undo',
				icon: Undo2Icon,
				onClick: () => editor?.chain().focus().undo().run(),
			},
			{
				label: 'Redo',
				icon: Redo2Icon,
				onClick: () => editor?.chain().focus().redo().run(),
			},
			{
				label: 'Print',
				icon: PrinterIcon,
				onClick: () => window.print(),
			},
			{
				label: 'Spell Check',
				icon: SpellCheckIcon,
				onClick: () => {
					const current = editor?.view.dom.getAttribute('spellcheck');
					editor?.view.dom.setAttribute('spellcheck', current === 'false' ? 'true' : 'false');
				},
			},
		],
		[
			{
				label: 'Bold',
				icon: BoldIcon,
				isActive: editor?.isActive('bold'),
				onClick: () => {
					editor?.chain().focus().toggleBold().run();
				},
			},
			{
				label: 'Italic',
				icon: ItalicIcon,
				isActive: editor?.isActive('italic'),
				onClick: () => editor?.chain().focus().toggleItalic().run(),
			},
			{
				label: 'Underline',
				icon: UnderlineIcon,
				isActive: editor?.isActive('underline'),
				onClick: () => editor?.chain().focus().toggleUnderline().run(),
			},
		],
		[
			{
				label: 'Comment',
				icon: MessageSquarePlusIcon,
				isActive: false, // TODO: Enable this functionality
				onClick: () => console.log('TODO: Comment'),
			},
			{
				label: 'List Todo',
				icon: ListTodoIcon,
				isActive: editor?.isActive('taskList'),
				onClick: () => editor?.chain().focus().toggleTaskList().run(),
			},
			{
				label: 'Remove Formating',
				icon: RemoveFormattingIcon,
				onClick: () => editor?.chain().focus().unsetAllMarks().run(),
			},
		],
	];

	return (
		<div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-10 flex items-center gap-x-0.5 overflow-x-auto">
			{sections[0].map(tool => (
				<ToolbarButton key={tool.label} {...tool} />
			))}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<FontFamilyButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<HeadingButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{sections[1].map(tool => (
				<ToolbarButton key={tool.label} {...tool} />
			))}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{sections[2].map(tool => (
				<ToolbarButton key={tool.label} {...tool} />
			))}
		</div>
	);
};

export default Toolbar;
