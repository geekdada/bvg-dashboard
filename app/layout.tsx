import type React from "react"
import "./globals.css"
import { Roboto } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const roboto = Roboto({
  weight: ["400", "500", "700"],
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
      <body className={`${roboto.className} bg-bvg-yellow dark:bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="min-h-screen">{children}</main>
          <footer className="py-6 text-center">
            <p className="text-xs text-black/50 dark:text-bvg-yellow/50 font-medium tracking-wide">
              #weilwirdichlieben
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
