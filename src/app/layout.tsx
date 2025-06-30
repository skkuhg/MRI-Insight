import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MRI Insight - AI-Powered MRI Analysis',
  description: 'Upload, analyze, and understand MRI scans with AI-powered insights',
  keywords: ['MRI', 'medical imaging', 'AI analysis', 'healthcare', 'diagnostics'],
  authors: [{ name: 'MRI Insight Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased">
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
