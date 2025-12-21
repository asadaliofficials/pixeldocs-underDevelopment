import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import Navbar from './Navbar';
import TemplatesGallery from './TemplatesGallery';

const HomePage = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<div className='fixed top-0 left-0 right-0 z-10 h-16 p-4 bg-white'>
				<Navbar />
			</div>
			<div className='mt-16'>
				<TemplatesGallery />
			</div>
		</div>
	);
};

export default HomePage;
