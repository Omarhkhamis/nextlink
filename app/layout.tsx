'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const result = await response.json();
        if (result.data?.favicon_url) {
          setFaviconUrl(result.data.favicon_url);
        }
      } catch (error) {
        console.error('Error fetching favicon:', error);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    if (faviconUrl) {
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) {
        link.href = faviconUrl;
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.href = faviconUrl;
        document.head.appendChild(newLink);
      }
    }
  }, [faviconUrl]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href={faviconUrl || '/favicon.ico'} />
      </head>
      <body className={`${inter.variable} font-sans bg-black text-white`}>
        <SessionProvider>
          {!isAdminRoute && <Navbar />}
          {children}
          {!isAdminRoute && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}
