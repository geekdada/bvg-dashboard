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
    default: "text-sm",
    badge: "bg-black text-bvg-yellow px-2 py-1 rounded-sm text-base sm:text-lg font-medium tracking-wider inline-block"
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {formatTime(time)}
    </span>
  )
}