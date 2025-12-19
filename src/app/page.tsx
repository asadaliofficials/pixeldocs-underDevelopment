import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const HomePage = () => {
	return (
		<div className="p-8 flex flex-col gap-4 w-screen h-screen justify-center items-center">
			<h1 className="text-4xl">Home Page</h1>
			<Button>
				<Link href={'/documents/test'}>Edit Document</Link>
			</Button>
		</div>
	);
};

export default HomePage;
