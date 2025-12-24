import { Id } from '../../../../convex/_generated/dataModel';
import { Document } from './Document';
import { api } from '../../../../convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { auth } from '@clerk/nextjs/server';

interface DocumentPageProps {
	params: Promise<{ id: Id<'documents'> }>;
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
	const { id } = await params;

	const { getToken } = await auth();
	const token = (await getToken({ template: 'convex' })) ?? undefined;

	if (!token) {
		throw new Error('Unauthorized');
	}

	const preloadedDocument = await preloadQuery(api.documents.getById, { id }, { token });
	return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentPage;
