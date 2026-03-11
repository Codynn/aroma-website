import type { Metadata, Viewport } from 'next'
import { Sora } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/lib/Providers'
import Navbar from '@/components/shared/Navbar'

// ── Fonts ─────────────────────────────────────────────────────────────────────

// Sora — headings & display text (available on Google Fonts)
const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
})





// ── Site Config ───────────────────────────────────────────────────────────────
const siteConfig = {
  name: 'Aroma Speciality Tea',
  shortName: 'Aroma Tea',
  tagline: 'Pure. Organic. Himalayan.',
  description:
    'Aroma Speciality Tea — Premium Himalayan teas sourced directly from the peaks of Nepal. Explore our collection of hand-picked organic teas including Golden Needles, White Needle Tip, and Golden Tips Normal.',
  url: 'https://www.aromateas.com',
  ogImage: '/images/og-image.png',
  keywords: [
    'Aroma Speciality Tea',
    'Himalayan tea Nepal',
    'organic tea Nepal',
    'Golden Needles tea',
    'White Needle Tip tea',
    'premium Nepal tea',
    'buy Himalayan tea online',
    'hand-picked organic tea',
    'specialty tea Nepal',
    'pure organic tea',
    'Golden Tips tea',
    'Nepal tea farm',
    'high altitude tea',
  ],
  locale: 'en_NP',
  twitter: '@aromatea',
  themeColor: '#4a7c3f', // tea-garden green
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: '/' },

  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — From the Peaks of Nepal to Your Cup`,
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitter,
    site: siteConfig.twitter,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
  },

  formatDetection: { telephone: false, email: false, address: false },
  applicationName: siteConfig.shortName,
  category: 'shopping',

  // Structured data hint for Google Shopping / rich results
  other: {
    'product:brand': siteConfig.name,
    'product:availability': 'in stock',
    'product:condition': 'new',
  },
}

// ── Viewport ──────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: siteConfig.themeColor },
    { media: '(prefers-color-scheme: dark)',  color: siteConfig.themeColor },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>

      <body className="font-candara min-h-screen bg-white text-gray-900 antialiased">
        <QueryProvider>

          {/* ── Navigation ── */}
          <Navbar />

          {/* ── Page Content ── */}
          <main className="flex-1">{children}</main>

          {/* ── Global Toast Notifications ── */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={4000}
          />

        </QueryProvider>

        {/* Footer outside Providers — no query/auth needed ── */}
        {/* <Footer /> */}
      </body>
    </html>
  )
}