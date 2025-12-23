import React from 'react';
import { Id } from '../../convex/_generated/dataModel';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface props {
	documentId: Id<'documents'>;
	children: React.ReactNode;
}

const DeleteDialog = ({ documentId, children }: props) => {
	const deleteDocument = useMutation(api.documents.removeById);
	const [isRemoving, setIsRemoving] = React.useState(false);
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent onClick={e => e.stopPropagation()}>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your document and remove your
						data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={e => e.stopPropagation()}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={isRemoving}
						onClick={e => {
							e.stopPropagation();
							setIsRemoving(true);
							deleteDocument({ id: documentId }).finally(() => {
								setIsRemoving(false);
							});
						}}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteDialog;
