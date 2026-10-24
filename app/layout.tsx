import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kyla S. Lacson — Full-Stack Developer & IT Professional',
  description: 'Full-Stack Developer with 3+ years building scalable web systems for government and academic institutions. Specializing in Laravel, React, and modern web technologies.',
  keywords: 'Kyla Lacson, web developer, full-stack developer, Laravel, React, PHP, IT support, portfolio',
  authors: [{ name: 'Kyla S. Lacson' }],
  metadataBase: new URL('https://kylalacson.vercel.app'),
  openGraph: {
    title: 'Kyla S. Lacson — Full-Stack Developer',
    description: 'Full-Stack Developer building scalable web systems for government and academic institutions.',
    type: 'website',
    url: 'https://kylalacson.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyla S. Lacson — Full-Stack Developer',
    description: 'Full-Stack Developer building scalable web systems.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
