import { formatTime } from "@/lib/utils"

interface TimeDisplayProps {
  time?: string
  className?: string
  variant?: "default" | "badge"
}

export default function TimeDisplay({ time, className = "", variant = "default" }: TimeDisplayProps) {
  if (!time) return null

  const baseClasses = "font-mono"

  const variantClasses = {
    default: "text-sm text-foreground",
    badge: "bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium inline-block tracking-wide shadow-sm"
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {formatTime(time)}
    </span>
  )
}