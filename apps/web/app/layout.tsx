import type { Metadata } from 'next';

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/modules/components/header/header";
import Footer from "@/modules/components/footer/footer";
import ReactQueryProvider from "@/lib/react-query";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "COOPERA-UFBA",
  description: "COOPERA-UFBA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen h-full`}>

        {/* Envolvendo toda a aplicação com ReactQueryProvider */}
        <UserProvider>
          <ReactQueryProvider>
            <TooltipProvider>
              <Header />
              {children}
              <Footer />
              <Toaster />
            </TooltipProvider>
          </ReactQueryProvider>
        </UserProvider>
      </body>
    </html>
  );
}
