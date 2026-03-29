import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/lib/Providers";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ClientLayout from "@/components/shared/ClientWrapper"; // We will create this next

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

// ── Site Config ───────────────────────────────────────────────────────────────
const siteConfig = {
  name: "Aroma Tea",
  shortName: "Aroma Tea",
  tagline: "Pure. Organic. Himalayan.",
  description:
    "Aroma Speciality Tea — Premium Himalayan teas sourced directly from the peaks of Nepal. Explore our collection of hand-picked organic teas including Golden Needles, White Needle Tip, and Golden Tips Normal.",
  url: "https://aromateanepal.com.np/",
  ogImage: "/images/og-image.png",
  keywords: [
    "Aroma Speciality Tea",
    "Himalayan tea Nepal",
    "organic tea Nepal",
    "Golden Needles tea",
    "White Needle Tip tea",
    "premium Nepal tea",
    "buy Himalayan tea online",
    "hand-picked organic tea",
    "specialty tea Nepal",
    "pure organic tea",
    "Golden Tips tea",
    "Nepal tea farm",
    "high altitude tea",
  ],
  locale: "en_NP",
  twitter: "@aromatea",
  themeColor: "#4a7c3f",
};

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Aroma Tea" }],
  creator: "Aroma Tea",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitter,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className="font-sora min-h-screen bg-white text-gray-900 antialiased flex flex-col">
        <QueryProvider>
          <Navbar />

          {/* Use a Client Component for the pathname-based padding logic */}
          <ClientLayout>{children}</ClientLayout>

          <Toaster
            position="bottom-right"
            richColors
            closeButton
            duration={4000}
          />
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
