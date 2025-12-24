import React, { useRef, useState } from 'react';
import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs';
import { Id } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { useDebounce } from '@/hooks/use-debounce';
import toast from 'react-hot-toast';
import { useStatus } from '@liveblocks/react';
import { LoaderIcon } from 'lucide-react';

interface DocumentInputProps {
	title: string;
	id: Id<'documents'>;
}

const DocumentInput = ({ title, id }: DocumentInputProps) => {
	const status = useStatus();
	const [value, setValue] = useState(title);

	const [isEditing, setIsEditing] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [isError, setIsError] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);

	const mutate = useMutation(api.documents.updateById);

	const debouncedUpdate = useDebounce((newValue: string) => {
		if (newValue === title) return;
		setIsPending(true);
		mutate({ id, title: newValue })
			.then(() => toast.success('Document updated'))
			.catch(() => toast.error('Failed to update document'))
			.finally(() => setIsPending(false));
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsPending(true);
		mutate({ id, title: value })
			.then(() => {
				toast.success('Document updated');
				setIsEditing(false);
			})
			.catch(() => toast.error('Failed to update document'))
			.finally(() => setIsPending(false));
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		debouncedUpdate(e.target.value);
	};

	const showLoader = isPending || status === 'connecting' || status === 'reconnecting';
	const showError = isError || status === 'disconnected';
	return (
		<div className='flex items-center gap-2'>
			{isEditing ? (
				<form onSubmit={handleSubmit} className='relative w-fit max-w-[50ch]'>
					<span className='invisible whitespace-pre px-1.5 text-lg'>{value || ' '}</span>
					<input
						ref={inputRef}
						value={value}
						onBlur={() => setIsEditing(false)}
						className='absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate'
						onChange={onChange}
					/>
				</form>
			) : (
				<span
					onClick={() => {
						setIsEditing(true);
						setTimeout(() => {
							inputRef.current?.focus();
						}, 0);
					}}
					className='text-lg px-1.5 cursor-pointer truncate'
				>
					{value || 'Untitled'}
				</span>
			)}
			{showError && <BsCloudSlash className='size-4' />}
			{!showError && showLoader && (
				<LoaderIcon className='size-4 animate-spin text-muted-foreground' />
			)}
			{!showError && !showLoader && <BsCloudCheck className='size-4' />}
		</div>
	);
};

export default DocumentInput;
