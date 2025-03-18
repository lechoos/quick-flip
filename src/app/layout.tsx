import type { Metadata } from 'next';
import { Anonymous_Pro, Inter } from 'next/font/google';
import './globals.scss';
import { ReactNode } from 'react';
import { Navigation } from '@/components/ui/Navigation';

const anonymousPro = Anonymous_Pro({
  variable: '--font-anonymous-pro',
  subsets: ['latin-ext'],
  weight: ['400', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quick Flip',
  description: 'Your best app to learn and practice Spanish. | La mejor aplicación para aprender y practicar español.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anonymousPro.variable} ${inter.variable} antialiased mx-auto`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
