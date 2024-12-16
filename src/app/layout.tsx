import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Load the fonts
const geist = Geist({ subsets: ['latin'] });
const geistMono = Geist_Mono({ subsets: ['latin'] });

// Metadata type from Next.js (optional if needed for SEO/meta tags)
export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'A Next.js application with login functionality',
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${geist.className} ${geistMono.className}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
