import React from 'react';
import Editor from './editor';

const DocumentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	return (
		<div className='min-h-screen bg-[#FAFBFD]'>
		<Editor />
		</div>
	);
};

export default DocumentPage;
