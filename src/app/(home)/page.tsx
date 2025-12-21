'use client';
import React from 'react';
import Navbar from './Navbar';
import TemplatesGallery from './TemplatesGallery';
import { api } from '../../../convex/_generated/api';
import { useQuery } from 'convex/react';

const HomePage = () => {
	const documents = useQuery(api.documents.get);
	return (
		<div className='min-h-screen flex flex-col'>
			<div className='fixed top-0 left-0 right-0 z-10 h-16 p-4 bg-white'>
				<Navbar />
			</div>
			<div className='mt-16'>
				<TemplatesGallery />
				{documents === undefined ? (
					<div className='text-center mt-16 p-3'>Loading...</div>
				) : documents.length === 0 ? (
					<div className='text-center mt-16 p-3'>No documents found</div>
				) : (
					<div>
						{documents?.map(document => (
							<span key={document._id}>{document.title}</span>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
