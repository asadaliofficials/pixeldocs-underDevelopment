'use client';
import { cn } from '@/lib/utils';
import { LucideIcon, Undo2Icon } from 'lucide-react';

import { useEditorStore } from '@/app/store/use-editor-store';

interface ToolbarButtonProps {
	onClick?: () => void;
	isActive?: boolean;
	icon: LucideIcon;
}

const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
				isActive && 'bg-neutral-200/80'
			)}
		>
			<Icon className="size-4" />
		</button>
	);
};

const Toolbar = () => {
	const { editor } = useEditorStore();
	console.log(editor);

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
		],
	];
	return (
		<div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-10 flex items-center gap-x-0.5 overflow-x-auto">
			{sections[0].map(item => (
				<ToolbarButton key={item.label} {...item} />
			))}
		</div>
	);
};

export default Toolbar;
