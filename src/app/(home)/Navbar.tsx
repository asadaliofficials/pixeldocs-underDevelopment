import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SearchInput from './SearchInput';
import { UserButton } from '@clerk/nextjs';

const Navbar = () => {
	return (
		<nav className='flex items-center justify-between h-full w-full'>
			<div className='flex gap-3 items-center shrink-0 pr-6'>
				<Link href='/'>
					<Image src='/logo.svg' alt='Logo' width={36} height={36} />
				</Link>
				<h3 className='text-xl'>Pixel Docs</h3>
			</div>
			<React.Suspense fallback={<div />}>
				<SearchInput />
			</React.Suspense>
			<UserButton />
		</nav>
	);
};

export default Navbar;
