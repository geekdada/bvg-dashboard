import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "BVG Departures Dashboard",
  description: "Real-time departures for Berlin public transport",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted/20 via-background to-background">
            <ScrollToTop />
            <main className="min-h-screen">{children}</main>
            <footer className="py-6 text-center border-t border-border/40 mt-12">
              <p className="text-xs text-muted-foreground font-medium tracking-wide">
                #weilwirdichlieben
              </p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
