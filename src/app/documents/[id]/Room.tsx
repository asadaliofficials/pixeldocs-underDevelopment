'use client';

import { ReactNode } from 'react';
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';

export function Room({ children }: { children: ReactNode }) {
	const params = useParams();
	return (
		<LiveblocksProvider
			publicApiKey={'pk_dev_77h6w2z5SFZZ47qvrdokWTQPOP0jY_cq2VvGaG4qb2aCkfa9KwZbA7j_PfvUlcnG'}
		>
			<RoomProvider id={params.id as string}>
				<ClientSideSuspense fallback={<div>Loading…</div>}>{children}</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
