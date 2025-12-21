import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import Navbar from './Navbar';

const HomePage = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<div className='fixed top-0 left-0 right-0 z-10 h-16 p-4 bg-white'>
				<Navbar />
			</div>
			<div className='mt-16 flex flex-col justify-center items-center'>
				<h1 className='text-4xl'>Home Page</h1>
				<Button>
					<Link href={'/documents/test'}>Edit Document</Link>
				</Button>
			</div>
		</div>
	);
};

export default HomePage;
