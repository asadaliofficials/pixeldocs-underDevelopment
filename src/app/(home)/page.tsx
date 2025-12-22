'use client';
import React from 'react';
import Navbar from './Navbar';
import TemplatesGallery from './TemplatesGallery';
import { api } from '../../../convex/_generated/api';
import { usePaginatedQuery } from 'convex/react';
import DocumentsTable from './DocumentsTable';

const HomePage = () => {
	const { results, status, loadMore } = usePaginatedQuery(
		api.documents.get,
		{},
		{ initialNumItems: 10 }
	);
	return (
		<div className='min-h-screen flex flex-col'>
			<div className='fixed top-0 left-0 right-0 z-10 h-16 p-4 bg-white'>
				<Navbar />
			</div>
			<div className='mt-16'>
				<TemplatesGallery />
				<DocumentsTable documents={results} status={status} loadMore={loadMore} />
			</div>
		</div>
	);
};

export default HomePage;
