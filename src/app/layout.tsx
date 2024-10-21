'use client'

import "./globals.css";
import { Nunito } from "next/font/google"

import { Toaster } from "sonner"
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/react-query";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default function RootLayout({
  children,
  session
}: Readonly<{
  children: React.ReactNode;
  session: Session;
}>) {

  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/mdi_book-heart-outline.svg" />
      </head>
      <body className={`${nunito}`}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={session}>
            <Toaster richColors />
            {children}
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}