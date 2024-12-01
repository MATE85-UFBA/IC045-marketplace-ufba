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
    <html lang="pt-br" className="h-full">
      <body className={`${inter.className} flex flex-col h-full`}>
        {/* Envolvendo toda a aplicação com ReactQueryProvider */}
        <ReactQueryProvider>
          <Header userType="empresa" /> {/* todo remover */}
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
