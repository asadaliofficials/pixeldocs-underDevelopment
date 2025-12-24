'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';
import { Loader } from '@/components/Loader';
import { getDocuments, getUsers } from './actions';
import toast from 'react-hot-toast';
import { Id } from '../../../../convex/_generated/dataModel';

type User = {
	id: string;
	name: string;
	avatar: string;
};

export function Room({ children }: { children: ReactNode }) {
	const [users, setUsers] = useState<User[]>([]);
	const params = useParams();

	const fetchUsers = useMemo(
		() => async () => {
			try {
				const list = await getUsers();
				setUsers(list);
			} catch (error) {
				console.error(error);
				toast.error('Failed to fetch users');
			}
		},
		[]
	);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return (
		<LiveblocksProvider
			throttle={16}
			authEndpoint={async () => {
				const endpoint = '/api/liveblocks-auth';
				const room = params.id as string;
				const response = await fetch(endpoint, {
					method: 'POST',
					body: JSON.stringify({ room }),
				});
				return response.json();
			}}
			resolveUsers={({ userIds }) => {
				return userIds.map(userId => users.find(user => user.id === userId) ?? undefined);
			}}
			resolveMentionSuggestions={({ text }) => {
				let filteredUsers = users;

				if (text) {
					filteredUsers = users.filter(user =>
						user.name.toLowerCase().includes(text.toLowerCase())
					);
				}

				return filteredUsers.map(user => user.id);
			}}
			resolveRoomsInfo={async ({ roomIds }) => {
				const documents = await getDocuments(roomIds as Id<'documents'>[]);
				return documents.map(document => ({
					id: document.id,
					name: document.name,
				}));
			}}
		>
			<RoomProvider id={params.id as string} initialStorage={{ leftMargin: 56, rightMargin: 56 }}>
				<ClientSideSuspense fallback={<Loader label='Loading room...' />}>{children}</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
