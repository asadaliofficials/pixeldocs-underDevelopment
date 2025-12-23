import React from 'react';
import Editor from './Editor';
import Toolbar from './Toolbar';
import Navbar from './Navbar';
import { Room } from './Room';

interface DocumentPageProps {
	params: Promise<{ id: string }>;
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
	const { id } = await params;
	console.log(id);
	return (
		<div className='min-h-screen bg-[#FAFBFD]'>
			<div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden'>
				<Navbar />
				<Toolbar />
			</div>
			<div className='pt-[114px] print:pt-0'>
				<Room>
					<Editor />
				</Room>
			</div>
		</div>
	);
};

export default DocumentPage;
