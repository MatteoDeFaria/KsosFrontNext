import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ksos Leaderboard',
  description: 'Leaderboard By Matteo DE FARIA',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        href: '/favicon.ico',
      },
    ],
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
