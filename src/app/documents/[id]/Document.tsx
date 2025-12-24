'use client';
import React from 'react';
import Editor from './Editor';
import Toolbar from './Toolbar';
import Navbar from './Navbar';
import { Room } from './Room';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Toaster } from 'react-hot-toast';

interface DocumentProps {
	preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export const Document = ({ preloadedDocument }: DocumentProps) => {
	const document = usePreloadedQuery(preloadedDocument);
	return (
		<Room>
			<div className='min-h-screen bg-[#FAFBFD]'>
				<div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden'>
					<Navbar data={document!} />
					<Toolbar />
				</div>
				<div className='pt-[114px] print:pt-0'>
					<Editor />
				</div>
			</div>
			<Toaster position='top-right' />
		</Room>
	);
};
