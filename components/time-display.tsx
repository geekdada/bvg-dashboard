import { formatTime } from "@/lib/utils"

interface TimeDisplayProps {
  time?: string
  className?: string
  variant?: "default" | "badge"
}

export default function TimeDisplay({ time, className = "", variant = "default" }: TimeDisplayProps) {
  if (!time) return null

  const baseClasses = "font-mono tabular-nums"

  const variantClasses = {
    default: "text-sm text-foreground",
    badge: "inline-flex items-center rounded-full border border-primary/40 bg-primary px-3 py-1.5 text-sm font-semibold tracking-[0.16em] text-primary-foreground shadow-[0_18px_36px_-24px_hsl(var(--primary)/0.8)]"
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {formatTime(time)}
    </span>
  )
}