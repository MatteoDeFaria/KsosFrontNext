import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ksos.me'),
  title: 'Ksos Leaderboard',
  description: 'Leaderboard By Matteo DE FARIA',
  creator: 'Matteo DE FARIA',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        href: '/favicon.ico',
      },
    ],
  },
  openGraph: {
    title: 'Ksos Leaderboard',
    description: 'Leaderboard By Matteo DE FARIA',
    url: 'https://ksos.me',
    siteName: 'Ksos Leaderboard',
    images: [
      {
        url: 'https://ksos.me/pacific_rim.jpeg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          <main>
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
