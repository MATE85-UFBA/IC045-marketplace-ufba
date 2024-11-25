import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/modules/components/header/header';
import Footer from '@/modules/components/footer/footer';
import ReactQueryProvider from '@/lib/react-query';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus",
  description: "Nexus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Header />
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
        <Footer />
      </body>
    </html>
  );
}
