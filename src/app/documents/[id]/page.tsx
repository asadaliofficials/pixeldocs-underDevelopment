import React from 'react';
import Editor from './Editor';
import Toolbar from './Toolbar';

interface DocumentPageProps {
	params: Promise<{ id: string }>;
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
	const { id } = await params;
	console.log(id);
	return (
		<div className="min-h-screen bg-[#FAFBFD]">
			<Toolbar />
			<Editor />
		</div>
	);
};

export default DocumentPage;
