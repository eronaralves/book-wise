'use client';

import "./globals.css";
import { Nunito } from "next/font/google";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "@/libs/react-query";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/mdi_book-heart-outline.svg" />
      </head>
      <body className={nunito.className}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Toaster richColors />
            {children}
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
