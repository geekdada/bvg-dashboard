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
    default: "text-sm bvg-text",
    badge: "bg-black text-bvg-yellow dark:bg-bvg-yellow dark:text-black px-2 py-1 rounded text-base font-medium inline-block"
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {formatTime(time)}
    </span>
  )
}