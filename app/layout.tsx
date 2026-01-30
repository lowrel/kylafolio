import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kyla S. Lacson - Web Developer | IT Support Officer',
  description: 'Computer Science graduate eager to explore and adapt new skills, with a positive attitude and willingness to grow through experience.',
  keywords: 'web developer, IT support, computer science, Java, React, Laravel, PHP',
  authors: [{ name: 'Kyla S. Lacson' }],
  metadataBase: new URL('https://kyla-portfolio.vercel.app'),
  openGraph: {
    title: 'Kyla S. Lacson - Web Developer | IT Support Officer',
    description: 'Computer Science graduate with experience in web development and IT support',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}