'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="h-10 gap-2 px-3.5 bvg-btn-outline">
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
          Underground
        </span>
      </Button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-10 gap-2 px-3.5 bvg-btn-outline"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full transition-colors ${
          isDark ? 'bg-primary' : 'bg-foreground/70'
        }`}
      />
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
        {isDark ? 'Underground' : 'Daylight'}
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
