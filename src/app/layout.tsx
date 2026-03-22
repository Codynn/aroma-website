"use client"; // Required to use usePathname

import type { Metadata, Viewport } from 'next'
import { Sora } from 'next/font/google'
import './globals.css'
import { usePathname } from "next/navigation";
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/lib/Providers'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { cn } from '@/lib/utils';

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable}`}>
      <body className="font-sora min-h-screen bg-white text-gray-900 antialiased flex flex-col">
        <QueryProvider>
          <Navbar />

          {/* Condition: If it's the home page, pt-0 (bleed). 
            If it's any other page (Product, etc.), pt-20 (80px) to clear the navbar.
          */}
          <main className={cn("flex-1", !isHome && "pt-[42px] lg:pt-16")}>
            {children}
          </main>

          <Toaster position="top-right" richColors closeButton duration={4000} />
        </QueryProvider>
        <Footer />
      </body>
    </html>
  )
}