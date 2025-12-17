import React from 'react';
import Editor from './editor';
import Toolbar from './Toolbar';

const DocumentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	return (
		<div className="min-h-screen bg-[#FAFBFD]">
			<Toolbar />
			<Editor />
		</div>
	);
};

export default DocumentPage;
