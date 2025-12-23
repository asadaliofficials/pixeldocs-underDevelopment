import DeleteDialog from '@/components/DeleteDialog';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';
import RenameDialog from '@/components/RenameDialog';

interface props {
	documentId: Id<'documents'>;
	title: string;
	onNewTab: (id: string) => void;
}
const DocumentMenu = ({ documentId, title, onNewTab }: props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={'ghost'} size={'icon'} className="rounded-full">
					<MoreVertical className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => onNewTab(documentId)}>
					<ExternalLinkIcon className="size-4 mr-2" />
					Open in new tab
				</DropdownMenuItem>
				<RenameDialog documentId={documentId} initialTitle={title}>
					<DropdownMenuItem onSelect={e => e.preventDefault()} onClick={e => e.stopPropagation()}>
						<FilePenIcon className="size-4 mr-2" />
						Rename
					</DropdownMenuItem>
				</RenameDialog>
				<DeleteDialog documentId={documentId}>
					<DropdownMenuItem onSelect={e => e.preventDefault()} onClick={e => e.stopPropagation()}>
						<TrashIcon className="size-4 mr-2" />
						Delete
					</DropdownMenuItem>
				</DeleteDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DocumentMenu;
