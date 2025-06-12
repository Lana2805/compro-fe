import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UPT Pusat Bahasa',
  description: 'Website UPT Pusat Bahasa UIN Jakarta',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-white`}>
        <Header />
        <main className="min-h-screen px-4 pt-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
