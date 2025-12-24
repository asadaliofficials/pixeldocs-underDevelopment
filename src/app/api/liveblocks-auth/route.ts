import { auth, currentUser } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { Liveblocks } from '@liveblocks/node';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
	secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
	const { sessionClaims } = await auth();

	if (!sessionClaims) {
		return new Response('Unauthorized', { status: 401 });
	}

	const user = await currentUser();

	if (!user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { room } = await req.json();

	const document = await convex.query(api.documents.getById, { id: room });

	if (!document) {
		return new Response('Document not found', { status: 404 });
	}

	const isOwner = document.ownerId === user.id;
	const isMember = !!(document.organizationId && document.organizationId === sessionClaims.o?.id);

	if (!isOwner && !isMember) {
		return new Response('Unauthorized', { status: 401 });
	}

	const session = liveblocks.prepareSession(user.id, {
		userInfo: {
			name:
				user.fullName ?? user.firstName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous',
			avatar: user.imageUrl ?? undefined,
		},
	});
	session.allow(room, session.FULL_ACCESS);
	const { body, status } = await session.authorize();

	return new Response(body, { status });
}
