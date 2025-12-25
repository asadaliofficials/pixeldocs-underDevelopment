import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@liveblocks/react-ui/styles.css';
import '@liveblocks/react-tiptap/styles.css';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ConvexClientProvider } from '@/components/ConvexClientProvider';

const inter = Inter({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'PixelDocs | Your Personal Document Editor',
	description:
		'PixelDocs is a personal document editor that allows you to create and edit documents in real-time with your friends.',
	keywords: [
		'PixelDocs',
		'Document Editor',
		'Real-time Collaboration',
		'Document Management',
		'Document Sharing',
		'Document Editing',
		'Document Creation',
		'Document Management',
		'Document Sharing',
		'Document Editing',
		'Document Creation',
	],
	openGraph: {
		title: 'PixelDocs | Your Personal Document Editor',
		description:
			'PixelDocs is a personal document editor that allows you to create and edit documents in real-time with your friends.',
		url: 'https://pixeldocs-asad.vercel.app',
		siteName: 'PixelDocs',
		locale: 'en',
		type: 'website',
	},
	icons: {
		icon: '/logo.svg',
		shortcut: '/logo.svg',
		apple: '/logo.svg',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<NuqsAdapter>
					<ConvexClientProvider>{children}</ConvexClientProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
