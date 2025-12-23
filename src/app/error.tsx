'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangleIcon } from 'lucide-react';
import Link from 'next/link';

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center space-y-6'>
			<div className='text-center space-y-4'>
				<div className='flex justify-center'>
					<div className='bg-rose-100 p-3 rounded-full'>
						<AlertTriangleIcon className='size-10 text-rose-600' />
					</div>
				</div>
				<div className='space-y-2'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
						Something went wrong
					</h2>
					<p className='text-gray-500 dark:text-gray-400'>{error.message}</p>
				</div>
			</div>
			<div className='flex items-center gap-x-3'>
				<Button className='font-medium px-6' onClick={reset}>
					Try again
				</Button>
				<Button asChild variant='ghost' className='font-medium'>
					<Link href='/'>Back to home</Link>
				</Button>
			</div>
		</div>
	);
};

export default ErrorPage;
