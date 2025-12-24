import React, { useEffect, useRef, useState } from 'react';
import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs';
import { LoaderIcon } from 'lucide-react';
import { useMutation } from 'convex/react';
import { useStatus } from '@liveblocks/react';
import toast from 'react-hot-toast';

import { Id } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';
import { useDebounce } from '@/hooks/use-debounce';

interface DocumentInputProps {
	title: string;
	id: Id<'documents'>;
}

const DocumentInput = ({ title, id }: DocumentInputProps) => {
	const status = useStatus();
	const mutate = useMutation(api.documents.updateById);

	const [value, setValue] = useState(title);
	const [isEditing, setIsEditing] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [isError, setIsError] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);

	const isConnected = status === 'connected';
	const isSyncing = status === 'connecting' || status === 'reconnecting';

	useEffect(() => {
		setValue(title);
		setIsEditing(false);
		setIsPending(false);
		setIsError(false);
	}, [title]);

	const updateTitle = async (newTitle: string) => {
		if (!isConnected || newTitle === title) return;

		setIsPending(true);
		setIsError(false);

		try {
			await mutate({ id, title: newTitle });
			toast.success('Document updated');
		} catch {
			setIsError(true);
			toast.error('Failed to update document');
		} finally {
			setIsPending(false);
		}
	};

	const debouncedUpdate = useDebounce(updateTitle);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateTitle(value);
		setIsEditing(false);
	};

	const handleBlur = () => {
		updateTitle(value);
		setIsEditing(false);
	};

	const showError = isError || status === 'disconnected';

	return (
		<div className='flex items-center gap-2'>
			{isEditing ? (
				<form onSubmit={handleSubmit} className='relative w-fit max-w-[50ch]'>
					{/* Width auto-sizing trick */}
					<span className='invisible whitespace-pre px-1.5 text-lg'>{value || ' '}</span>
					<input
						ref={inputRef}
						value={value}
						onChange={e => {
							setValue(e.target.value);
							debouncedUpdate(e.target.value);
						}}
						onBlur={handleBlur}
						className='absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate'
					/>
				</form>
			) : (
				<span
					onClick={() => {
						if (!isConnected) return;
						setIsEditing(true);
						setTimeout(() => inputRef.current?.focus(), 0);
					}}
					className='text-lg px-1.5 cursor-pointer truncate'
				>
					{title || 'Untitled'}
				</span>
			)}

			{showError && <BsCloudSlash className='size-4' />}
			{!showError && (isPending || isSyncing) && (
				<LoaderIcon className='size-4 animate-spin text-muted-foreground' />
			)}
			{!showError && !isPending && !isSyncing && <BsCloudCheck className='size-4' />}
		</div>
	);
};

export default DocumentInput;
