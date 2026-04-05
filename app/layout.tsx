import type React from 'react'
import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import ScrollToTop from '@/components/scroll-to-top'

const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata = {
  title: 'Berlin departures board',
  description: 'Real-time departures for Berlin public transport',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative min-h-dvh overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,233,0,0.12),_transparent_28%),radial-gradient(circle_at_20%_0,_rgba(0,102,179,0.18),_transparent_36%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_34%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,_rgba(255,233,0,0.08),_transparent)]" />
            <ScrollToTop />
            <main className="relative min-h-dvh">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
