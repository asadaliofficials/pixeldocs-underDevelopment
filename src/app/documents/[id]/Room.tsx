'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';
import { Loader } from '@/components/Loader';
import { getUsers } from './actions';
import toast from 'react-hot-toast';

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
			authEndpoint='/api/liveblocks-auth'
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
			resolveRoomsInfo={() => []}
		>
			<RoomProvider id={params.id as string}>
				<ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
